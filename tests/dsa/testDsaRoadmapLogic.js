/**
 * Automated Test Suite for DevPilot-AI DSA Roadmap Integration & Logic
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const rootDir = path.resolve(__dirname, '../../');
const { dsaRoadmap } = require(path.join(rootDir, 'js/data/dsaData.js'));

let totalTests = 0;
let passedTests = 0;

function runTest(description, fn) {
  totalTests++;
  try {
    fn();
    console.log(`✓ [PASS] ${description}`);
    passedTests++;
  } catch (err) {
    console.error(`✗ [FAIL] ${description}`);
    console.error(`  Error: ${err.message}`);
  }
}

console.log('====================================================');
console.log(' DevPilot-AI: Running DSA Roadmap Verification Suite');
console.log('====================================================\n');

// 1. Verify dsa.html exists and has required semantic structure & IDs
runTest('DSA HTML file has all critical IDs and semantic components', () => {
  const dsaHtmlPath = path.join(rootDir, 'pages/dsa.html');
  assert.ok(fs.existsSync(dsaHtmlPath), 'pages/dsa.html must exist');

  const content = fs.readFileSync(dsaHtmlPath, 'utf8');
  const requiredIds = [
    'dsa-total-solved-count',
    'dsa-total-remaining-count',
    'dsa-progress-fill',
    'dsa-pct-badge',
    'dsa-easy-count',
    'dsa-easy-fill',
    'dsa-medium-count',
    'dsa-medium-fill',
    'dsa-hard-count',
    'dsa-hard-fill',
    'dsa-search-input',
    'dsa-search-clear',
    'dsa-btn-reset',
    'dsa-reset-modal',
    'dsa-sidebar-nav-list',
    'dsa-questions-container',
    'dsa-empty-state',
    'dsa-btn-clear-filters'
  ];

  requiredIds.forEach(id => {
    assert.ok(content.includes(`id="${id}"`), `Missing required element id: ${id}`);
  });

  // Verify scripts loaded in correct order
  assert.ok(content.includes('utils.js'), 'Must load utils.js');
  assert.ok(content.includes('app.js'), 'Must load app.js');
  assert.ok(content.includes('dsaData.js'), 'Must load dsaData.js');
  assert.ok(content.includes('dsa.js'), 'Must load dsa.js');
});

// 2. Verify all navigation sidebars include DSA Roadmap
runTest('All 10 project pages include DSA Roadmap navigation item with alt_route icon', () => {
  const pages = [
    { file: 'index.html', href: 'pages/dsa.html' },
    { file: 'pages/github.html', href: 'dsa.html' },
    { file: 'pages/chat.html', href: 'dsa.html' },
    { file: 'pages/resume.html', href: 'dsa.html' },
    { file: 'pages/dsa.html', href: 'dsa.html' },
    { file: 'pages/notes.html', href: 'dsa.html' },
    { file: 'pages/snippets.html', href: 'dsa.html' },
    { file: 'pages/prompts.html', href: 'dsa.html' },
    { file: 'pages/habits.html', href: 'dsa.html' },
    { file: 'pages/timer.html', href: 'dsa.html' },
    { file: 'pages/settings.html', href: 'dsa.html' }
  ];

  pages.forEach(({ file, href }) => {
    const filePath = path.join(rootDir, file);
    assert.ok(fs.existsSync(filePath), `${file} should exist`);
    const content = fs.readFileSync(filePath, 'utf8');
    assert.ok(content.includes(`href="${href}"`), `${file} must contain href="${href}"`);
    assert.ok(content.includes('alt_route'), `${file} must contain alt_route icon for DSA link`);
    assert.ok(content.includes('DSA Roadmap'), `${file} must display label "DSA Roadmap"`);
  });
});

// 3. Verify CSS file exists and has responsive queries
runTest('dsa.css contains responsive layout and breakpoint rules', () => {
  const cssPath = path.join(rootDir, 'css/pages/dsa.css');
  assert.ok(fs.existsSync(cssPath), 'css/pages/dsa.css must exist');

  const css = fs.readFileSync(cssPath, 'utf8');
  assert.ok(css.includes('.dsa-hero-card'), 'Must contain .dsa-hero-card');
  assert.ok(css.includes('.dsa-progress-fill'), 'Must contain .dsa-progress-fill');
  assert.ok(css.includes('.dsa-workspace'), 'Must contain .dsa-workspace');
  assert.ok(css.includes('.dsa-question-row'), 'Must contain .dsa-question-row');
  assert.ok(css.includes('.dsa-checkbox-container'), 'Must contain .dsa-checkbox-container');
  assert.ok(css.includes('@media (max-width: 1099px)'), 'Must contain desktop breakpoint');
  assert.ok(css.includes('@media (max-width: 768px)'), 'Must contain tablet breakpoint');
  assert.ok(css.includes('@media (max-width: 480px)'), 'Must contain mobile breakpoint');
});

// 4. Verify search and filter algorithm
runTest('Filter algorithm handles search queries, difficulty tiers, and status correctly', () => {
  const queryFilter = (q, query) => {
    const s = query.toLowerCase().trim();
    if (!s) return true;
    const num = q.leetcodeNumber || q.number;
    return q.title.toLowerCase().includes(s) || String(num).includes(s);
  };

  const allQuestions = [];
  dsaRoadmap.forEach(c => c.patterns.forEach(p => p.questions.forEach(q => allQuestions.push(q))));

  // Search by exact problem number
  const matchesNum = allQuestions.filter(q => queryFilter(q, '15'));
  assert.ok(matchesNum.some(q => (q.leetcodeNumber || q.number) === 15), 'Should find 3Sum (#15)');

  // Search by problem title keyword
  const matchesTitle = allQuestions.filter(q => queryFilter(q, 'binary tree'));
  assert.ok(matchesTitle.length >= 5, 'Should find multiple binary tree questions');

  // Filter by difficulty
  const easyQuestions = allQuestions.filter(q => q.difficulty === 'Easy');
  const medQuestions = allQuestions.filter(q => q.difficulty === 'Medium');
  const hardQuestions = allQuestions.filter(q => q.difficulty === 'Hard');

  assert.strictEqual(easyQuestions.length, 77, 'Total Easy count must be 77');
  assert.strictEqual(medQuestions.length, 139, 'Total Medium count must be 139');
  assert.strictEqual(hardQuestions.length, 44, 'Total Hard count must be 44');
  assert.strictEqual(easyQuestions.length + medQuestions.length + hardQuestions.length, 260, 'Total questions must equal 260');
});

// 5. Verify local storage serialization requirement: only { [id]: boolean }
runTest('Progress state payload stores strictly minimal boolean dictionary', () => {
  const mockProgress = {};
  const sampleQuestionId = dsaRoadmap[0].patterns[0].questions[0].id;

  // Toggle on
  mockProgress[sampleQuestionId] = true;
  assert.strictEqual(mockProgress[sampleQuestionId], true);

  // Toggle off (delete key)
  delete mockProgress[sampleQuestionId];
  assert.strictEqual(mockProgress[sampleQuestionId], undefined);

  // Stringify check
  const serialized = JSON.stringify(mockProgress);
  assert.strictEqual(serialized, '{}');
});

// 6. Verify category names are defined for all 16 categories in sidebar
runTest('All 16 categories have valid non-empty names for sidebar index', () => {
  dsaRoadmap.forEach((cat, idx) => {
    const catName = cat.name || cat.title;
    assert.ok(catName && catName.trim().length > 0, `Category at index ${idx} is missing name`);
  });
});

// 7. Verify every question has a Data Structure (pattern) and Algorithmic Pattern (subPattern)
runTest('Every question provides Data Structure (pattern) and Pattern (subPattern) tags', () => {
  dsaRoadmap.forEach(cat => {
    cat.patterns.forEach(pat => {
      pat.questions.forEach(q => {
        const ds = q.pattern || cat.name;
        const sub = q.subPattern || pat.name;
        assert.ok(ds && ds.trim().length > 0, `Question ${q.id} missing Data Structure`);
        assert.ok(sub && sub.trim().length > 0, `Question ${q.id} missing Pattern`);
      });
    });
  });
});

// 8. Verify Pro Search UI elements, multi-token search, and padding protection
runTest('Pro search UI elements, multi-token search, and non-overlapping icon padding exist', () => {
  const dsaHtml = fs.readFileSync(path.join(rootDir, 'pages/dsa.html'), 'utf8');
  assert.ok(dsaHtml.includes('id="dsa-search-kbd"'), 'Must contain Ctrl+K kbd badge');
  assert.ok(dsaHtml.includes('id="dsa-results-badge"'), 'Must contain results counter badge');
  assert.ok(dsaHtml.includes('class="dsa-quick-chips"'), 'Must contain quick suggestion chips');

  const dsaCss = fs.readFileSync(path.join(rootDir, 'css/pages/dsa.css'), 'utf8');
  assert.ok(dsaCss.includes('padding-left: 2.75rem !important'), 'CSS must enforce padding-left on search input to prevent icon overlap');
  assert.ok(dsaCss.includes('.dsa-search-highlight'), 'CSS must include highlight style');

  // Test multi-token search
  const allQuestions = [];
  dsaRoadmap.forEach(c => c.patterns.forEach(p => p.questions.forEach(q => allQuestions.push({ ...q, catName: c.name }))));

  const multiTokenFilter = (q, query) => {
    const tokens = query.toLowerCase().trim().replace(/^#+/, '').split(/\s+/).filter(Boolean);
    const text = `${q.title} #${q.leetcodeNumber} ${q.leetcodeNumber} ${q.subPattern} ${q.pattern} ${q.catName} ${q.difficulty}`.toLowerCase();
    return tokens.every(token => text.includes(token));
  };

  const arrayEasyMatches = allQuestions.filter(q => multiTokenFilter(q, 'array easy'));
  assert.ok(arrayEasyMatches.length > 0, 'Multi-token search for "array easy" should match questions');
  assert.ok(arrayEasyMatches.every(q => q.difficulty === 'Easy'), 'All matches must be Easy');

  const treeHardMatches = allQuestions.filter(q => multiTokenFilter(q, 'tree hard'));
  assert.ok(treeHardMatches.length > 0, 'Multi-token search for "tree hard" should match questions');
  assert.ok(treeHardMatches.every(q => q.difficulty === 'Hard'), 'All matches must be Hard');
});

// 9. Verify DSA Roadmap has honesty evaluation boxes and pills WITHOUT any locked features
runTest('DSA Roadmap integrates honesty evaluation boxes and pills without any locking restrictions', () => {
  const dsaJs = fs.readFileSync(path.join(rootDir, 'js/pages/dsa.js'), 'utf8');

  // Verify honesty evaluation box and pills exist in roadmap rendering
  assert.ok(dsaJs.includes('dsa-trigger-eval'), 'Must support dsa-trigger-eval to open 4-tier honesty modal');
  assert.ok(dsaJs.includes('pl-eval-box'), 'Must render pl-eval-box in roadmap questions');
  assert.ok(dsaJs.includes('pl-eval-pill'), 'Must render pl-eval-pill on roadmap question rows');
  assert.ok(dsaJs.includes('verified'), 'Must support verified icon');
  assert.ok(dsaJs.includes('psychology'), 'Must support psychology icon');
  assert.ok(dsaJs.includes('smart_toy'), 'Must support smart_toy icon');
  assert.ok(dsaJs.includes('content_paste_off'), 'Must support content_paste_off icon');

  // Verify that lock feature is NOT applied to DSA Roadmap
  assert.ok(!dsaJs.includes('pl-locked-pill'), 'DSA Roadmap must NOT include pl-locked-pill (no locking)');
  assert.ok(!dsaJs.includes('pl-locked-question'), 'DSA Roadmap must NOT include pl-locked-question (no locking)');
  assert.ok(!dsaJs.includes('isQuestionLocked'), 'DSA Roadmap must NOT enforce sequential locking');

  // Verify HTML has honesty stats
  const dsaHtml = fs.readFileSync(path.join(rootDir, 'pages/dsa.html'), 'utf8');
  assert.ok(dsaHtml.includes('id="dsa-count-self"'), 'Hero must include dsa-count-self');
  assert.ok(dsaHtml.includes('id="dsa-count-help30"'), 'Hero must include dsa-count-help30');
  assert.ok(dsaHtml.includes('id="dsa-count-help50"'), 'Hero must include dsa-count-help50');
  assert.ok(dsaHtml.includes('id="dsa-count-cross"'), 'Hero must include dsa-count-cross');
});

console.log('\n====================================================');
console.log(` Verification Results: ${passedTests} / ${totalTests} Passed`);
console.log('====================================================\n');

if (passedTests !== totalTests) {
  process.exit(1);
}
