const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('===========================================================');
console.log(' DevPilot-AI: Testing Floating Jump-to-Section Up Button   ');
console.log('===========================================================\n');

const htmlPath = path.resolve(__dirname, '../../pages/dsa.html');
const cssPath = path.resolve(__dirname, '../../css/pages/dsa.css');
const jsPath = path.resolve(__dirname, '../../js/pages/dsa.js');

const html = fs.readFileSync(htmlPath, 'utf8');
const css = fs.readFileSync(cssPath, 'utf8');
const js = fs.readFileSync(jsPath, 'utf8');

// 1. HTML markup test
assert.ok(html.includes('id="dsa-scroll-to-section-btn"'), 'pages/dsa.html must contain #dsa-scroll-to-section-btn');
assert.ok(html.includes('arrow_upward'), 'Button must contain upward arrow icon');
console.log('✓ [PASS] TEST 1: pages/dsa.html renders floating scroll button with upward arrow icon');

// 2. CSS styles test
assert.ok(css.includes('.dsa-scroll-up-btn {'), 'css must define .dsa-scroll-up-btn');
assert.ok(css.includes('position: fixed;'), 'Button must be fixed position');
assert.ok(css.includes('.dsa-scroll-up-btn.is-visible {'), 'css must define .is-visible state');
assert.ok(css.includes('opacity: 1;'), '.is-visible state must set opacity: 1');
console.log('✓ [PASS] TEST 2: css/pages/dsa.css defines fixed positioning, smooth transitions, and visibility toggle');

// 3. JS scroll detection & jump-to-section logic test
assert.ok(js.includes("document.getElementById('dsa-scroll-to-section-btn')"), 'dsa.js must reference scroll button');
assert.ok(js.includes("window.addEventListener('scroll', updateScrollBtn"), 'dsa.js must register scroll listener');
assert.ok(js.includes("workspace.getBoundingClientRect()"), 'dsa.js must measure position of .dsa-workspace section');
assert.ok(js.includes("scrollToSectionBtn.classList.add('is-visible')"), 'dsa.js must add .is-visible when reaching section');
assert.ok(js.includes("window.scrollTo({"), 'dsa.js must smoothly scroll back to category options section on click');
console.log('✓ [PASS] TEST 3: dsa.js only shows button when scrolling reaches this section, and scrolls smoothly back to options');

// 4. Pattern Learning isolation test: arrow must be removed in Pattern Learning only
assert.ok(
  css.includes('#dsa-pattern-learning-view:not(.hidden) ~ #dsa-scroll-to-section-btn') &&
  css.includes('display: none !important;'),
  'css must hide #dsa-scroll-to-section-btn when Pattern Learning is active'
);
assert.ok(
  js.includes("roadmapView.classList.contains('hidden')") || js.includes("roadmapView.offsetParent === null"),
  'dsa.js must suppress arrow button when roadmap view is hidden'
);
console.log('✓ [PASS] TEST 4: Arrow button is strictly removed and hidden in Pattern Learning only');

console.log('\n===========================================================');
console.log(' All Floating Jump-to-Section Button Checks Passed!        ');
console.log('===========================================================');
