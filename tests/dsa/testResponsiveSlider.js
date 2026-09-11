const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('====================================================');
console.log(' DevPilot-AI: Validating DSA Responsive Slider Fix  ');
console.log('====================================================\n');

const cssPath = path.resolve(__dirname, '../../css/pages/dsa.css');
const jsPath = path.resolve(__dirname, '../../js/pages/dsa.js');

const css = fs.readFileSync(cssPath, 'utf8');
const js = fs.readFileSync(jsPath, 'utf8');

// Test 1: Desktop layout preservation
console.log('Checking Desktop Layout (> 1099px)...');
assert.ok(css.includes('.dsa-nav-sidebar {'), 'Desktop sidebar styles must exist');
assert.ok(css.includes('grid-template-columns: 290px 1fr;'), 'Desktop workspace must retain 290px 1fr grid');
assert.ok(css.includes('position: sticky;'), 'Desktop sidebar must be sticky');
console.log('✓ [PASS] Desktop sidebar layout is untouched and sticky with 290px 1fr workspace');

// Test 2: Responsive CSS rules in @media (max-width: 1099px)
console.log('\nChecking Tablet/Responsive breakpoint (max-width: 1099px)...');
const tabletBreakpointIdx = css.indexOf('@media (max-width: 1099px)');
assert.ok(tabletBreakpointIdx !== -1, 'Must contain @media (max-width: 1099px)');
const tabletBlock = css.substring(tabletBreakpointIdx, tabletBreakpointIdx + 2500);

assert.ok(tabletBlock.includes('overflow-x: auto'), 'Responsive category nav must have overflow-x: auto');
assert.ok(tabletBlock.includes('flex-wrap: nowrap'), 'Responsive category nav must prevent wrapping');
assert.ok(tabletBlock.includes('flex-direction: row'), 'Responsive category nav must align items horizontally');
assert.ok(tabletBlock.includes('flex-shrink: 0'), 'Category item must have flex-shrink: 0');
assert.ok(tabletBlock.includes('white-space: nowrap'), 'Category item must have white-space: nowrap');
console.log('✓ [PASS] @media (max-width: 1099px) correctly defines single-row horizontal slider');

// Test 3: Responsive CSS rules in @media (max-width: 480px)
console.log('\nChecking Mobile Small breakpoint (max-width: 480px)...');
const mobileBreakpointIdx = css.indexOf('@media (max-width: 480px)');
assert.ok(mobileBreakpointIdx !== -1, 'Must contain @media (max-width: 480px)');
const mobileBlock = css.substring(mobileBreakpointIdx, mobileBreakpointIdx + 800);

assert.ok(!mobileBlock.includes('.dsa-nav-list {\n    grid-template-columns: 1fr') && !mobileBlock.includes('.dsa-nav-list { grid-template-columns: 1fr'), 'Mobile small must NOT force 1fr grid stacking on slider');
assert.ok(mobileBlock.includes('overflow-x: auto'), 'Mobile small must retain overflow-x: auto');
assert.ok(mobileBlock.includes('flex-wrap: nowrap'), 'Mobile small must retain flex-wrap: nowrap');
console.log('✓ [PASS] @media (max-width: 480px) keeps single-row horizontal slider without vertical grid collapse');

// Test 4: JS detection and dynamic synchronization
console.log('\nChecking JS Viewport Detection & Dynamic Event Handling...');
assert.ok(js.includes('handleResponsiveLayout();'), 'init() must call handleResponsiveLayout() on direct load');
assert.ok(js.includes("window.addEventListener('resize', handleResponsiveLayout);"), 'attachEventListeners() must handle window resize');
assert.ok(js.includes('dom.sidebarNavList.classList.add(\'dsa-nav-slider\')'), 'Must add dsa-nav-slider on <= 1099px');
assert.ok(js.includes('dom.sidebarNavList.classList.remove(\'dsa-nav-slider\')'), 'Must remove dsa-nav-slider on > 1099px');
assert.ok(js.includes("item.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })"), 'ScrollSpy must center active item in horizontal slider track');
console.log('✓ [PASS] Direct load initialization and window resize listeners dynamically maintain slider state');

console.log('\n====================================================');
console.log(' All 4 Responsive Slider Tests Passed!              ');
console.log('====================================================');
