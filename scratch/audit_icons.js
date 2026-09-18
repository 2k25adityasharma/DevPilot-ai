const fs = require('fs');
const path = require('path');

// Read icons.js to get known icon keys and aliases
const iconsCode = fs.readFileSync('js/core/icons.js', 'utf8');
const iconDataMatch = iconsCode.match(/var ICON_DATA\s*=\s*(\{[\s\S]*?\});/);
if (!iconDataMatch) {
  console.error('Could not find ICON_DATA in js/core/icons.js');
  process.exit(1);
}
const ICON_DATA = JSON.parse(iconDataMatch[1]);

const aliasMatch = iconsCode.match(/var ALIASES\s*=\s*(\{[\s\S]*?\});/);
const ALIASES = aliasMatch ? eval('(' + aliasMatch[1] + ')') : {};

console.log('Total icons in ICON_DATA:', Object.keys(ICON_DATA).length);
console.log('Total aliases:', Object.keys(ALIASES).length);

// Helper to check if icon exists
function hasIcon(name) {
  if (!name) return false;
  name = name.trim();
  return !!(ICON_DATA[name] || (ALIASES[name] && ICON_DATA[ALIASES[name]]));
}

// Scan all html and js files
function getAllFiles(dir, exts) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    if (file === 'node_modules' || file === '.git' || file === 'scratch') return;
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      results = results.concat(getAllFiles(full, exts));
    } else {
      if (exts.some(ext => file.endsWith(ext))) {
        results.push(full);
      }
    }
  });
  return results;
}

const files = [...getAllFiles('pages', ['.html', '.js']), ...getAllFiles('js', ['.js']), 'index.html'];
const foundIcons = new Set();
const missing = new Map();

files.forEach(f => {
  if (!fs.existsSync(f)) return;
  const content = fs.readFileSync(f, 'utf8');
  
  // 1. Check data-icon="..."
  const dataIconMatches = content.matchAll(/data-icon=["']([a-z0-9_]+)["']/g);
  for (const m of dataIconMatches) {
    foundIcons.add(m[1]);
    if (!hasIcon(m[1])) {
      if (!missing.has(m[1])) missing.set(m[1], []);
      missing.get(m[1]).push(f);
    }
  }

  // 2. Check <span class="material-symbols-outlined...">name</span>
  const spanMatches = content.matchAll(/class=["'][^"']*material-symbols-outlined[^"']*["'][^>]*>([a-z0-9_]+)<\/span>/g);
  for (const m of spanMatches) {
    foundIcons.add(m[1]);
    if (!hasIcon(m[1])) {
      if (!missing.has(m[1])) missing.set(m[1], []);
      missing.get(m[1]).push(f);
    }
  }

  // 3. Check setIcon(..., 'name')
  const setIconMatches = content.matchAll(/setIcon\([^,]+,\s*['"]([a-z0-9_]+)['"]\)/g);
  for (const m of setIconMatches) {
    foundIcons.add(m[1]);
    if (!hasIcon(m[1])) {
      if (!missing.has(m[1])) missing.set(m[1], []);
      missing.get(m[1]).push(f);
    }
  }

  // 4. Check renderIcon('name'...)
  const renderIconMatches = content.matchAll(/renderIcon\(\s*['"]([a-z0-9_]+)['"]/g);
  for (const m of renderIconMatches) {
    foundIcons.add(m[1]);
    if (!hasIcon(m[1])) {
      if (!missing.has(m[1])) missing.set(m[1], []);
      missing.get(m[1]).push(f);
    }
  }

  // 5. Check icon:\s*['"]([a-z0-9_]+)['"] in data objects
  const dataPropMatches = content.matchAll(/(?:icon|iconName)\s*:\s*['"]([a-z0-9_]+)['"]/g);
  for (const m of dataPropMatches) {
    // Only count if it's a potential icon string (exclude things like 'sm', 'lg', 'svg')
    const val = m[1];
    if (val !== 'default' && val !== 'custom' && val !== 'svg') {
      foundIcons.add(val);
      if (!hasIcon(val)) {
        if (!missing.has(val)) missing.set(val, []);
        missing.get(val).push(f);
      }
    }
  }
});

console.log('Total unique icons found in application (including data objects):', foundIcons.size);
console.log('Missing icons count:', missing.size);
if (missing.size > 0) {
  console.log('Missing icons list:');
  for (const [icon, flist] of missing.entries()) {
    console.log(' - ' + icon + ' (used in ' + flist.join(', ') + ')');
  }
} else {
  console.log('PERFECT! 100% of all icons found have matching SVG paths!');
}
