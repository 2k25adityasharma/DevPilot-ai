// scripts/interviewPrep/updateSidebars.js
const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '../../');

// 1. Update index.html
const indexPath = path.join(rootDir, 'index.html');
if (fs.existsSync(indexPath)) {
  let indexContent = fs.readFileSync(indexPath, 'utf8');
  if (!indexContent.includes('interviewPrep.html')) {
    const target = 'href="pages/roadmaps.html">\n<span class="material-symbols-outlined shrink-0">map</span>\n<span class="text-sm font-medium sidebar-text">Career Roadmaps</span>\n<span class="tooltip-text">Career Roadmaps</span>\n</a>';
    const replacement = target + '\n<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors duration-200 border-l-[3px] border-transparent tooltip relative group" href="pages/interviewPrep.html">\n<span class="material-symbols-outlined shrink-0">work</span>\n<span class="text-sm font-medium sidebar-text">Interview Prep</span>\n<span class="tooltip-text">Interview Prep</span>\n</a>';

    if (indexContent.includes(target)) {
      indexContent = indexContent.replace(target, replacement);
      fs.writeFileSync(indexPath, indexContent);
      console.log('Updated index.html sidebar');
    } else {
      console.log('Target not found exactly in index.html, checking regex');
      const re = /(href=["']pages\/roadmaps\.html["'][\s\S]*?<\/a>)/i;
      if (re.test(indexContent)) {
        indexContent = indexContent.replace(re, '$1\n<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors duration-200 border-l-[3px] border-transparent tooltip relative group" href="pages/interviewPrep.html">\n<span class="material-symbols-outlined shrink-0">work</span>\n<span class="text-sm font-medium sidebar-text">Interview Prep</span>\n<span class="tooltip-text">Interview Prep</span>\n</a>');
        fs.writeFileSync(indexPath, indexContent);
        console.log('Updated index.html via regex');
      }
    }
  } else {
    console.log('index.html already has interviewPrep.html link');
  }
}

// 2. Update pages/*.html
const pagesDir = path.join(rootDir, 'pages');
const pages = fs.readdirSync(pagesDir);

pages.forEach(file => {
  if (!file.endsWith('.html') || file === 'interviewPrep.html') return;
  const p = path.join(pagesDir, file);
  let html = fs.readFileSync(p, 'utf8');

  if (html.includes('interviewPrep.html')) {
    console.log(`${file} already has interviewPrep.html link`);
    return;
  }

  // Look for roadmaps.html link pattern in pages
  // Pattern 1: inactive roadmaps link
  // Pattern 2: active roadmaps link (in roadmaps.html itself)
  const re = /(<a\s+class="[^"]*"\s+href="roadmaps\.html"[\s\S]*?<\/a>)/i;
  const match = html.match(re);

  if (match) {
    const linkStr = match[1];
    const newLink = `\n        <a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200 border-l-[3px] border-transparent tooltip relative group" href="interviewPrep.html">\n          <span class="material-symbols-outlined shrink-0">work</span>\n          <span class="text-sm font-medium sidebar-text">Interview Prep</span>\n          <span class="tooltip-text">Interview Prep</span>\n        </a>`;
    html = html.replace(linkStr, linkStr + newLink);
    fs.writeFileSync(p, html);
    console.log(`Updated sidebar in pages/${file}`);
  } else {
    console.log(`Could not find roadmaps.html link in pages/${file}`);
  }
});
