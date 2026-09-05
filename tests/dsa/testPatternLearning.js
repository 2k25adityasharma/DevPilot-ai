/**
 * DevPilot-AI — Automated Validation Suite for Pattern Learning & 1000+ Questions
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const rootDir = path.resolve(__dirname, '../../');
const { dsaRoadmap } = require(path.join(rootDir, 'js/data/dsaData.js'));
const { dsaPatternsRoadmap, dsaAllQuestions, dsaArenaDrills } = require(path.join(rootDir, 'js/data/dsaPatternsData.js'));

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

console.log('================================================================');
console.log(' DevPilot-AI: Running Pattern Learning & 1000+ Questions Test Suite');
console.log('================================================================\n');

// TEST 1: Dataset Volume & 1000+ Authentic Questions
runTest('TEST 1: Dataset contains at least 1,000 authentic LeetCode problems', () => {
  assert.ok(Array.isArray(dsaAllQuestions), 'dsaAllQuestions must be an array');
  assert.ok(dsaAllQuestions.length >= 1000, `Expected >= 1000 questions, got ${dsaAllQuestions.length}`);
  console.log(`  (Verified total question count: ${dsaAllQuestions.length})`);
});

// TEST 2: Canonical URLs, Unique IDs, and Problem Metadata
runTest('TEST 2: Every question has unique ID, positive LC number, valid URL, and difficulty', () => {
  const ids = new Set();
  const validUrlRegex = /^https:\/\/leetcode\.com\/problems\/[a-z0-9\-]+\/$/;
  let easyCount = 0, medCount = 0, hardCount = 0;

  dsaAllQuestions.forEach((q, idx) => {
    assert.ok(q.id, `Question at index ${idx} missing id`);
    assert.ok(!ids.has(q.id), `Duplicate question ID detected: ${q.id}`);
    ids.add(q.id);

    assert.ok(typeof q.title === 'string' && q.title.trim().length > 0, `Invalid title for question ${q.id}`);
    assert.ok(['Easy', 'Medium', 'Hard'].includes(q.difficulty), `Invalid difficulty ${q.difficulty} for question ${q.id}`);
    assert.ok(typeof q.leetcodeNumber === 'number' && q.leetcodeNumber > 0, `Invalid leetcodeNumber ${q.leetcodeNumber} for ${q.id}`);
    assert.ok(validUrlRegex.test(q.leetcodeUrl), `Invalid canonical URL "${q.leetcodeUrl}" for question ${q.id}`);
    assert.ok(q.category && q.categoryId, `Missing category info for ${q.id}`);
    assert.ok(q.pattern && q.patternId, `Missing pattern info for ${q.id}`);
    assert.strictEqual(q.solved, false, `Default solved state must be false for ${q.id}`);

    if (q.difficulty === 'Easy') easyCount++;
    if (q.difficulty === 'Medium') medCount++;
    if (q.difficulty === 'Hard') hardCount++;
  });

  console.log(`  (Tier breakdown: Easy=${easyCount}, Medium=${medCount}, Hard=${hardCount})`);
  assert.ok(easyCount >= 200, `Expected >= 200 Easy, got ${easyCount}`);
  assert.ok(medCount >= 400, `Expected >= 400 Medium, got ${medCount}`);
  assert.ok(hardCount >= 100, `Expected >= 100 Hard, got ${hardCount}`);
});

// TEST 3: 100% Backward Compatibility with Existing 260 Questions
runTest('TEST 3: Retains all 260 existing questions and exact IDs from dsaRoadmap', () => {
  const existingMap = new Map();
  dsaRoadmap.forEach(cat => {
    cat.patterns.forEach(pat => {
      pat.questions.forEach(q => {
        existingMap.set(q.id, q);
      });
    });
  });

  assert.strictEqual(existingMap.size, 260, `Expected 260 original questions, got ${existingMap.size}`);

  const allQuestionsMap = new Map(dsaAllQuestions.map(q => [q.id, q]));

  existingMap.forEach((origQ, qid) => {
    assert.ok(allQuestionsMap.has(qid), `Missing original question ID: ${qid}`);
    const matched = allQuestionsMap.get(qid);
    assert.strictEqual(matched.title, origQ.title, `Title mismatch for ${qid}`);
    assert.strictEqual(matched.difficulty, origQ.difficulty, `Difficulty mismatch for ${qid}`);
    assert.strictEqual(matched.leetcodeNumber, origQ.leetcodeNumber, `LC number mismatch for ${qid}`);
  });
  console.log(`  (All 260 original questions verified present with identical IDs)`);
});

// TEST 4: Coverage of all 16 DSA Categories in Questions
runTest('TEST 4: Questions cover all 16 major DSA categories', () => {
  const expectedCategories = [
    'Array', 'String', 'Hash Map', 'Stack', 'Queue / Deque', 'Linked List',
    'Trees', 'Recursion & Backtracking', 'Heap / Priority Queue', 'Graphs',
    'Trie (Prefix Tree)', 'Dynamic Programming', 'Greedy', 'Bit Manipulation',
    'Sorting Algorithms', 'Range Structures'
  ];

  const presentCats = new Set(dsaAllQuestions.map(q => q.category));
  expectedCategories.forEach(exp => {
    assert.ok(presentCats.has(exp), `Category "${exp}" has no questions assigned!`);
  });
});

// TEST 5: Complete 12-Point Curriculum for Patterns
runTest('TEST 5: Pattern learning curriculum contains all 28+ patterns with full 12-point guides', () => {
  assert.ok(Array.isArray(dsaPatternsRoadmap), 'dsaPatternsRoadmap must be array');
  assert.ok(dsaPatternsRoadmap.length >= 28, `Expected >= 28 patterns, got ${dsaPatternsRoadmap.length}`);

  dsaPatternsRoadmap.forEach((pat, idx) => {
    // 1. Basic identifiers
    assert.ok(pat.id && pat.name, `Pattern at ${idx} missing id/name`);
    assert.ok(pat.categoryId && pat.categoryName, `Pattern ${pat.id} missing category`);
    assert.ok(pat.oneLiner && pat.oneLiner.length > 10, `Pattern ${pat.id} missing oneLiner`);
    
    // 2. What is it & When to use
    assert.ok(pat.whatIsIt && pat.whatIsIt.length > 20, `Pattern ${pat.id} missing whatIsIt`);
    assert.ok(pat.whenToUse && pat.whenToUse.length > 20, `Pattern ${pat.id} missing whenToUse`);

    // 3. Recognition signals
    assert.ok(Array.isArray(pat.recognitionSignals) && pat.recognitionSignals.length >= 3,
      `Pattern ${pat.id} must have >= 3 recognition signals, got ${pat.recognitionSignals?.length}`);

    // 4. Core idea & Mental model
    assert.ok(pat.coreIdea && pat.coreIdea.length > 20, `Pattern ${pat.id} missing coreIdea`);

    // 5. Common variations
    assert.ok(Array.isArray(pat.variations) && pat.variations.length >= 2,
      `Pattern ${pat.id} must have >= 2 variations, got ${pat.variations?.length}`);

    // 6. Time & space complexity
    assert.ok(pat.complexity && pat.complexity.time && pat.complexity.space,
      `Pattern ${pat.id} missing complexity`);

    // 7. Pitfalls / Common mistakes
    assert.ok(Array.isArray(pat.pitfalls) && pat.pitfalls.length >= 2,
      `Pattern ${pat.id} must have >= 2 pitfalls`);

    // 8. C++ Code template
    assert.ok(pat.cppTemplate && pat.cppTemplate.includes('#include'),
      `Pattern ${pat.id} missing C++ code template`);

    // 9. Step-by-step walkthrough trace
    assert.ok(pat.walkthrough && pat.walkthrough.problem && Array.isArray(pat.walkthrough.steps) && pat.walkthrough.steps.length >= 2,
      `Pattern ${pat.id} missing valid walkthrough trace`);

    // 10. Pattern recognition quizzes
    assert.ok(Array.isArray(pat.quizzes) && pat.quizzes.length >= 1,
      `Pattern ${pat.id} missing quiz questions`);
    pat.quizzes.forEach((qz, qidx) => {
      assert.ok(qz.scenario && qz.options && qz.options.length === 4,
        `Quiz ${qidx} in ${pat.id} must have scenario and exactly 4 options`);
      assert.ok(typeof qz.correctIndex === 'number' && qz.correctIndex >= 0 && qz.correctIndex < 4,
        `Quiz ${qidx} in ${pat.id} has invalid correctIndex`);
      assert.ok(qz.explanation && qz.explanation.length > 10,
        `Quiz ${qidx} in ${pat.id} missing explanation`);
    });

    // 11. Practice questions mapping
    assert.ok(Array.isArray(pat.practiceQuestionIds) && pat.practiceQuestionIds.length > 0,
      `Pattern ${pat.id} has no practice questions linked`);
  });
});

// TEST 6: "🎯 Identify the Pattern" Training Arena Drills
runTest('TEST 6: Training Arena has at least 30 drills with scenarios, options, and explanations', () => {
  assert.ok(Array.isArray(dsaArenaDrills), 'dsaArenaDrills must be array');
  assert.ok(dsaArenaDrills.length >= 30, `Expected >= 30 arena drills, got ${dsaArenaDrills.length}`);

  const drillIds = new Set();
  dsaArenaDrills.forEach((d, idx) => {
    assert.ok(d.id && !drillIds.has(d.id), `Duplicate or missing drill id at index ${idx}`);
    drillIds.add(d.id);

    assert.ok(d.title && d.snippet && d.constraints, `Drill ${d.id} missing content`);
    assert.ok(Array.isArray(d.options) && d.options.length === 4, `Drill ${d.id} must have exactly 4 options`);
    assert.ok(typeof d.correctIndex === 'number' && d.correctIndex >= 0 && d.correctIndex < 4, `Drill ${d.id} invalid correctIndex`);
    assert.ok(d.explanation && d.hint, `Drill ${d.id} missing explanation or hint`);
  });
});

// TEST 7: HTML & DOM Structure Integration
runTest('TEST 7: pages/dsa.html contains view switcher tabs, both views, and all pattern elements', () => {
  const dsaHtmlPath = path.join(rootDir, 'pages/dsa.html');
  const html = fs.readFileSync(dsaHtmlPath, 'utf8');

  // Dual view tabs
  assert.ok(html.includes('id="tab-btn-roadmap"'), 'Missing tab-btn-roadmap');
  assert.ok(html.includes('id="tab-btn-patterns"'), 'Missing tab-btn-patterns');

  // View containers
  assert.ok(html.includes('id="dsa-roadmap-view"'), 'Missing dsa-roadmap-view');
  assert.ok(html.includes('id="dsa-pattern-learning-view"'), 'Missing dsa-pattern-learning-view');

  // Dashboard stats
  assert.ok(html.includes('id="pl-stat-learned"'), 'Missing pl-stat-learned');
  assert.ok(html.includes('id="pl-stat-practiced"'), 'Missing pl-stat-practiced');
  assert.ok(html.includes('id="pl-stat-mastered"'), 'Missing pl-stat-mastered');
  assert.ok(html.includes('id="pl-stat-weak"'), 'Missing pl-stat-weak');

  // Reset, quick filters & arena
  assert.ok(!html.includes('id="pl-today-card"'), 'pl-today-card must be removed');
  assert.ok(html.includes('id="pl-btn-reset"'), 'Missing pl-btn-reset');
  assert.ok(html.includes('id="pl-reset-modal"'), 'Missing pl-reset-modal');
  assert.ok(html.includes('id="pl-quick-chips"'), 'Missing pl-quick-chips');
  assert.ok(html.includes('id="pl-btn-launch-arena"'), 'Missing pl-btn-launch-arena');
  assert.ok(html.includes('id="pl-arena-modal"'), 'Missing pl-arena-modal');

  // Catalog
  assert.ok(html.includes('id="pl-catalog-search"'), 'Missing pl-catalog-search');
  assert.ok(html.includes('id="pl-category-chips"'), 'Missing pl-category-chips');
  assert.ok(html.includes('id="pl-pattern-cards-grid"'), 'Missing pl-pattern-cards-grid');

  // Study View
  assert.ok(html.includes('id="pl-study-view-section"'), 'Missing pl-study-view-section');
  assert.ok(html.includes('id="pl-btn-back-catalog"'), 'Missing pl-btn-back-catalog');
  assert.ok(html.includes('id="pl-study-container"'), 'Missing pl-study-container');

  // Scripts inclusion
  assert.ok(html.includes('src="../js/data/dsaPatternsData.js"'), 'Missing dsaPatternsData.js script inclusion');
  assert.ok(html.includes('src="../js/pages/dsaPatterns.js"'), 'Missing dsaPatterns.js script inclusion');
});

// TEST 8: CSS Rules for Pattern Learning
runTest('TEST 8: css/pages/dsa.css contains styling rules for Pattern Learning and Arena', () => {
  const cssPath = path.join(rootDir, 'css/pages/dsa.css');
  const css = fs.readFileSync(cssPath, 'utf8');

  assert.ok(css.includes('.dsa-view-switcher'), 'Missing .dsa-view-switcher CSS');
  assert.ok(css.includes('.dsa-tab-pill'), 'Missing .dsa-tab-pill CSS');
  assert.ok(css.includes('.pl-stats-grid'), 'Missing .pl-stats-grid CSS');
  assert.ok(css.includes('.pl-today-card'), 'Missing .pl-today-card CSS');
  assert.ok(css.includes('.pl-pattern-cards-grid'), 'Missing .pl-pattern-cards-grid CSS');
  assert.ok(css.includes('.pl-pattern-card'), 'Missing .pl-pattern-card CSS');
  assert.ok(css.includes('.pl-study-hero'), 'Missing .pl-study-hero CSS');
  assert.ok(css.includes('.pl-code-block-container'), 'Missing .pl-code-block-container CSS');
  assert.ok(css.includes('.pl-arena-options-grid'), 'Missing .pl-arena-options-grid CSS');
});

console.log('\n================================================================');
console.log(` Test Results: ${passedTests} / ${totalTests} Passed`);
console.log('================================================================\n');

assert.strictEqual(passedTests, totalTests, `Not all tests passed!`);
