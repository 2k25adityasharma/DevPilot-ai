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

    // 11. Practice questions mapping: exactly 10 questions (5 Easy, 3 Medium, 2 Hard)
    assert.ok(Array.isArray(pat.practiceQuestionIds) && pat.practiceQuestionIds.length === 10,
      `Pattern ${pat.id} must have exactly 10 practice questions, got ${pat.practiceQuestionIds?.length}`);
    
    const qMap = new Map(dsaAllQuestions.map(q => [q.id, q]));
    const patternQs = pat.practiceQuestionIds.map(qid => qMap.get(qid));
    assert.ok(patternQs.every(Boolean), `Pattern ${pat.id} has invalid question IDs`);

    const eCount = patternQs.filter(q => q.difficulty === 'Easy').length;
    const mCount = patternQs.filter(q => q.difficulty === 'Medium').length;
    const hCount = patternQs.filter(q => q.difficulty === 'Hard').length;
    assert.strictEqual(eCount, 5, `Pattern ${pat.id} must have exactly 5 Easy questions, got ${eCount}`);
    assert.strictEqual(mCount, 3, `Pattern ${pat.id} must have exactly 3 Medium questions, got ${mCount}`);
    assert.strictEqual(hCount, 2, `Pattern ${pat.id} must have exactly 2 Hard questions, got ${hCount}`);
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
  assert.ok(html.includes('id="pl-solve-modal"'), 'Missing pl-solve-modal');
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
  assert.ok(css.includes('.pl-solve-opt-btn'), 'Missing .pl-solve-opt-btn CSS');
  assert.ok(css.includes('.pl-eval-pill'), 'Missing .pl-eval-pill CSS');
});

// TEST 9: Pattern Practice & Mastery Increment Logic
runTest('TEST 9: Solving 1 question increments Practiced Patterns, solving all 10 questions masters pattern', () => {
  let dsaProgress = {};
  let patternStats = { viewed: {}, quizzes: {}, weak: {} };

  function calculatePatternMastery(pattern) {
    const questionIds = pattern.practiceQuestionIds || [];
    let solvedCount = 0;
    questionIds.forEach(qid => {
      if (dsaProgress[qid]) solvedCount++;
    });

    const isAllSolved = questionIds.length > 0 && solvedCount >= questionIds.length;
    if (isAllSolved) return 'Mastered';
    if (patternStats.weak[pattern.id]) return 'Weak';
    if (solvedCount > 0) return 'Practicing';
    if (patternStats.viewed[pattern.id] || patternStats.quizzes[pattern.id]) return 'Learning';
    return 'Not Started';
  }

  function getMetrics() {
    let practicedCount = 0;
    let masteredCount = 0;
    dsaPatternsRoadmap.forEach(pat => {
      const questionIds = pat.practiceQuestionIds || [];
      let solvedCount = 0;
      questionIds.forEach(qid => {
        if (dsaProgress[qid]) solvedCount++;
      });
      const isAllSolved = questionIds.length > 0 && solvedCount >= questionIds.length;
      const mastery = calculatePatternMastery(pat);
      const isWeak = mastery === 'Weak';
      if (!isWeak && (solvedCount >= 1 || mastery === 'Practicing' || mastery === 'Mastered')) {
        practicedCount++;
      }
      if (!isWeak && (isAllSolved || mastery === 'Mastered')) {
        masteredCount++;
      }
    });
    return { practicedCount, masteredCount };
  }

  // 1. Initially 0
  let m = getMetrics();
  assert.strictEqual(m.practicedCount, 0, 'Initially practicedCount must be 0');
  assert.strictEqual(m.masteredCount, 0, 'Initially masteredCount must be 0');

  // 2. Solve 1 question of Pattern 1 -> mastery is 'Practicing', counted as Practiced Pattern!
  const pat1 = dsaPatternsRoadmap[1];
  dsaProgress[pat1.practiceQuestionIds[0]] = true;
  m = getMetrics();
  assert.strictEqual(calculatePatternMastery(pat1), 'Practicing');
  assert.strictEqual(m.practicedCount, 1, 'Solving 1 question must increment practicedCount to 1');
  assert.strictEqual(m.masteredCount, 0, 'Solving 1 question does not master pattern yet');

  // 3. Complete all 10 questions of Pattern 1 -> Practiced = 1, Mastered = 1
  pat1.practiceQuestionIds.slice(1).forEach(qid => dsaProgress[qid] = true);
  m = getMetrics();
  assert.strictEqual(calculatePatternMastery(pat1), 'Mastered');
  assert.strictEqual(m.practicedCount, 1, 'Practiced remains 1');
  assert.strictEqual(m.masteredCount, 1, 'Solving all 10 questions must increment masteredCount to 1');

  // 4. Solve 1 question of Pattern 2 -> Practiced = 2, Mastered = 1
  const pat2 = dsaPatternsRoadmap[2];
  dsaProgress[pat2.practiceQuestionIds[0]] = true;
  m = getMetrics();
  assert.strictEqual(calculatePatternMastery(pat2), 'Practicing');
  assert.strictEqual(m.practicedCount, 2, 'Solving 1 question of 2nd pattern must increment practicedCount to 2');
  assert.strictEqual(m.masteredCount, 1, 'Mastered remains 1');

  // 5. Complete all 10 questions of Pattern 2 -> Practiced = 2, Mastered = 2
  pat2.practiceQuestionIds.slice(1).forEach(qid => dsaProgress[qid] = true);
  m = getMetrics();
  assert.strictEqual(calculatePatternMastery(pat2), 'Mastered');
  assert.strictEqual(m.practicedCount, 2, 'Practiced remains 2');
  assert.strictEqual(m.masteredCount, 2, 'Mastered becomes 2');
});

// TEST 10: Weak Pattern Detection (>= 5 crosses OR > 3 AI/other help solves)
runTest('TEST 10: Pattern is flagged Weak when >= 5 crosses or > 3 AI/help solves are recorded', () => {
  let dsaProgress = {};
  let patternStats = { viewed: {}, quizzes: {}, weak: {}, evaluations: {} };

  function evaluatePattern(pattern) {
    const questionIds = pattern.practiceQuestionIds || [];
    const evaluations = patternStats.evaluations || {};
    let crossCount = 0;
    let helpCount = 0;
    let selfCount = 0;
    let solvedCount = 0;

    questionIds.forEach(qid => {
      const ev = evaluations[qid];
      if (ev === 'cross') crossCount++;
      if (ev === 'help') helpCount++;
      if (ev === 'self') selfCount++;
      if (dsaProgress[qid]) solvedCount++;
    });

    const isWeakByEvaluation = crossCount >= 5 || helpCount > 3;
    const isWeak = isWeakByEvaluation || !!patternStats.weak[pattern.id];
    const isAllSolved = questionIds.length > 0 && solvedCount >= questionIds.length;

    let mastery = 'Not Started';
    if (isWeak) mastery = 'Weak';
    else if (isAllSolved) mastery = 'Mastered';
    else if (solvedCount > 0) mastery = 'Practicing';
    else if (patternStats.viewed[pattern.id]) mastery = 'Learning';

    return { mastery, isWeak, crossCount, helpCount, selfCount, solvedCount };
  }

  const pat = dsaPatternsRoadmap[0];
  const qids = pat.practiceQuestionIds;

  // Case 1: 5 crosses -> MUST BE WEAK (5 crosses rule)
  qids.slice(0, 5).forEach(qid => {
    patternStats.evaluations[qid] = 'cross';
  });
  let res = evaluatePattern(pat);
  assert.strictEqual(res.crossCount, 5, 'Must have 5 crosses');
  assert.strictEqual(res.isWeak, true, 'Pattern with 5 crosses must be weak');
  assert.strictEqual(res.mastery, 'Weak', 'Mastery status must be Weak when 5 crosses');

  // Case 2: Reduce to 4 crosses -> not weak by crosses alone
  delete patternStats.evaluations[qids[4]];
  res = evaluatePattern(pat);
  assert.strictEqual(res.crossCount, 4, 'Must have 4 crosses');
  assert.strictEqual(res.isWeak, false, 'Pattern with 4 crosses and 0 help must NOT be weak');

  // Case 3: 4 AI help solves -> MUST BE WEAK (> 3 AI help rule)
  // Add 4 AI help solves (qids[4], qids[5], qids[6], qids[7])
  qids.slice(4, 8).forEach(qid => {
    patternStats.evaluations[qid] = 'help';
    dsaProgress[qid] = true;
  });
  res = evaluatePattern(pat);
  assert.strictEqual(res.helpCount, 4, 'Must have 4 AI help solves');
  assert.strictEqual(res.isWeak, true, 'Pattern with >3 AI help solves must be weak');
  assert.strictEqual(res.mastery, 'Weak', 'Mastery status must be Weak when >3 AI help');

  // Case 4: Exactly 3 AI help solves and 7 self solves (all 10 solved) -> MUST BE MASTERED (not weak since help <= 3 and crosses < 5)
  patternStats.evaluations = {};
  dsaProgress = {};
  // 3 AI help
  qids.slice(0, 3).forEach(qid => {
    patternStats.evaluations[qid] = 'help';
    dsaProgress[qid] = true;
  });
  // 7 100% self
  qids.slice(3, 10).forEach(qid => {
    patternStats.evaluations[qid] = 'self';
    dsaProgress[qid] = true;
  });
  res = evaluatePattern(pat);
  assert.strictEqual(res.helpCount, 3, 'Must have exactly 3 help solves');
  assert.strictEqual(res.crossCount, 0, 'Must have 0 crosses');
  assert.strictEqual(res.isWeak, false, 'Pattern with 3 help solves is NOT weak (threshold is > 3)');
  assert.strictEqual(res.mastery, 'Mastered', 'Pattern with all 10 solved and <=3 help must be Mastered');
});

// TEST 11: 4-Tier Honesty Evaluation Modal & Dedicated Blur Popups in HTML
runTest('TEST 11: pages/dsa.html includes 4 honesty tiers, pl-locked-modal, and pl-excessive-help-modal', () => {
  const dsaHtmlPath = path.join(rootDir, 'pages/dsa.html');
  const html = fs.readFileSync(dsaHtmlPath, 'utf8');

  // Check 4 honesty evaluation option data attributes
  assert.ok(html.includes('data-solve-type="self"'), 'Missing data-solve-type="self"');
  assert.ok(html.includes('data-solve-type="help30"'), 'Missing data-solve-type="help30"');
  assert.ok(html.includes('data-solve-type="help50"'), 'Missing data-solve-type="help50"');
  assert.ok(html.includes('data-solve-type="cross"'), 'Missing data-solve-type="cross"');

  // Check new blur modal dialogs
  assert.ok(html.includes('id="pl-locked-modal"'), 'Missing pl-locked-modal');
  assert.ok(html.includes('id="pl-btn-locked-goto"'), 'Missing pl-btn-locked-goto');
  assert.ok(html.includes('id="pl-excessive-help-modal"'), 'Missing pl-excessive-help-modal');
  assert.ok(html.includes('id="pl-excessive-help-count"'), 'Missing pl-excessive-help-count');
  assert.ok(html.includes('id="pl-btn-excessive-review"'), 'Missing pl-btn-excessive-review');
});

// TEST 12: Sequential 1 to 10 Progression & Lock Logic
runTest('TEST 12: Sequential progression logic enforces Question 1 unlocked and Questions 2..10 locked until previous are evaluated', () => {
  const questions = [
    { id: 'q-1', title: 'Two Sum' },
    { id: 'q-2', title: 'Valid Palindrome' },
    { id: 'q-3', title: '3Sum' },
    { id: 'q-4', title: 'Container With Most Water' },
    { id: 'q-5', title: 'Trapping Rain Water' }
  ];

  let evaluations = {};
  let dsaProgress = {};

  function isQuestionLocked(idx) {
    if (idx === 0) return false;
    const prevQuestions = questions.slice(0, idx);
    return !prevQuestions.every(prev => {
      const ev = evaluations[prev.id];
      return (ev && ev.length > 0) || !!dsaProgress[prev.id];
    });
  }

  // 1. Initially: Q1 is unlocked, Q2..Q5 are locked
  assert.strictEqual(isQuestionLocked(0), false, 'Q1 (index 0) must be unlocked initially');
  assert.strictEqual(isQuestionLocked(1), true, 'Q2 (index 1) must be locked initially');
  assert.strictEqual(isQuestionLocked(2), true, 'Q3 (index 2) must be locked initially');
  assert.strictEqual(isQuestionLocked(3), true, 'Q4 (index 3) must be locked initially');

  // 2. Evaluate Q1 with 'self' -> Q2 unlocks, Q3..Q5 remain locked
  evaluations['q-1'] = 'self';
  dsaProgress['q-1'] = true;
  assert.strictEqual(isQuestionLocked(0), false, 'Q1 remains unlocked');
  assert.strictEqual(isQuestionLocked(1), false, 'Q2 must unlock after Q1 is evaluated');
  assert.strictEqual(isQuestionLocked(2), true, 'Q3 remains locked');

  // 3. Evaluate Q2 with 'help30' -> Q3 unlocks
  evaluations['q-2'] = 'help30';
  dsaProgress['q-2'] = true;
  assert.strictEqual(isQuestionLocked(2), false, 'Q3 must unlock after Q2 is evaluated');
  assert.strictEqual(isQuestionLocked(3), true, 'Q4 remains locked');

  // 4. Evaluate Q3 with 'cross' -> Q4 unlocks
  evaluations['q-3'] = 'cross';
  assert.strictEqual(isQuestionLocked(3), false, 'Q4 must unlock after Q3 is attempted (cross)');

  // 5. Reset Q2 to unattempted -> Q3, Q4, Q5 lock again!
  delete evaluations['q-2'];
  delete dsaProgress['q-2'];
  assert.strictEqual(isQuestionLocked(1), false, 'Q2 is unlocked since Q1 is done');
  assert.strictEqual(isQuestionLocked(2), true, 'Q3 locks again because Q2 was cleared');
  assert.strictEqual(isQuestionLocked(3), true, 'Q4 locks again because sequence broke at Q2');
});

// TEST 13: Non-100% Options (>= 2 Selections Threshold) Flags Pattern as Weak
runTest('TEST 13: Selecting non-100% options (30%, 50%, cross) on >= 2 questions flags pattern as Weak', () => {
  const pat = dsaPatternsRoadmap[1];
  const qids = pat.practiceQuestionIds;
  let patternStats = { viewed: { [pat.id]: true }, quizzes: {}, weak: {}, evaluations: {} };
  let dsaProgress = {};

  function checkWeak() {
    let crossCount = 0;
    let helpCount = 0;
    let selfCount = 0;
    let solvedCount = 0;

    qids.forEach(qid => {
      const ev = patternStats.evaluations[qid];
      if (ev === 'cross') crossCount++;
      if (ev === 'help' || ev === 'help30' || ev === 'help50') helpCount++;
      if (ev === 'self') selfCount++;
      if (dsaProgress[qid]) solvedCount++;
    });

    const nonSelfCount = crossCount + helpCount;
    return {
      crossCount,
      helpCount,
      nonSelfCount,
      isWeak: crossCount >= 2 || helpCount >= 2 || nonSelfCount >= 2
    };
  }

  // 1. 8 self, 1 help30, 1 cross -> nonSelfCount = 2 (>= 2) -> flags as Weak!
  patternStats.evaluations[qids[0]] = 'self';
  patternStats.evaluations[qids[1]] = 'self';
  patternStats.evaluations[qids[2]] = 'self';
  patternStats.evaluations[qids[3]] = 'self';
  patternStats.evaluations[qids[4]] = 'self';
  patternStats.evaluations[qids[5]] = 'self';
  patternStats.evaluations[qids[6]] = 'self';
  patternStats.evaluations[qids[7]] = 'self';
  patternStats.evaluations[qids[8]] = 'help30';
  patternStats.evaluations[qids[9]] = 'cross';

  let status = checkWeak();
  assert.strictEqual(status.nonSelfCount, 2, 'Must have 2 non-100% solves');
  assert.strictEqual(status.isWeak, true, 'Must be flagged as Weak because nonSelfCount (2) >= 2');

  // 2. Reduce non-self count to 1 (change qids[9] to 'self') -> not weak
  patternStats.evaluations[qids[9]] = 'self';
  status = checkWeak();
  assert.strictEqual(status.nonSelfCount, 1, 'Must have 1 non-100% solve');
  assert.strictEqual(status.isWeak, false, 'Should NOT be weak when nonSelfCount < 2');
});

// TEST 14: CSS Rules for Locked Rows, Pills, and Honesty Badges
runTest('TEST 14: css/pages/dsa.css contains styling rules for locked questions, 30%/50% pills, and sequence badges', () => {
  const cssPath = path.join(rootDir, 'css/pages/dsa.css');
  const css = fs.readFileSync(cssPath, 'utf8');

  assert.ok(css.includes('.dsa-question-row.is-locked'), 'Missing .dsa-question-row.is-locked CSS');
  assert.ok(css.includes('.dsa-checkbox-custom.dsa-checkbox-locked'), 'Missing .dsa-checkbox-locked CSS');
  assert.ok(css.includes('.pl-seq-badge'), 'Missing .pl-seq-badge CSS');
  assert.ok(css.includes('.pl-locked-pill'), 'Missing .pl-locked-pill CSS');
  assert.ok(css.includes('.pl-locked-btn'), 'Missing .pl-locked-btn CSS');
  assert.ok(css.includes('.pl-eval-pill-help30'), 'Missing .pl-eval-pill-help30 CSS');
  assert.ok(css.includes('.pl-eval-pill-help50'), 'Missing .pl-eval-pill-help50 CSS');
});

// TEST 15: Evaluation Checkbox Box Styling & Exact Modal Icon Synchronization
runTest('TEST 15: Question evaluation boxes match modal selection icons (verified, psychology, smart_toy, content_paste_off) without duplicate CSS checkmarks', () => {
  const cssPath = path.join(rootDir, 'css/pages/dsa.css');
  const css = fs.readFileSync(cssPath, 'utf8');

  assert.ok(css.includes('.pl-eval-box'), 'Missing .pl-eval-box CSS');
  assert.ok(css.includes('.pl-eval-box-self'), 'Missing .pl-eval-box-self CSS');
  assert.ok(css.includes('.pl-eval-box-help30'), 'Missing .pl-eval-box-help30 CSS');
  assert.ok(css.includes('.pl-eval-box-help50'), 'Missing .pl-eval-box-help50 CSS');
  assert.ok(css.includes('.pl-eval-box-cross'), 'Missing .pl-eval-box-cross CSS');
  assert.ok(css.includes('.pl-eval-box::after'), 'Missing .pl-eval-box::after suppression CSS');
  assert.ok(css.includes('display: none !important'), 'Missing display: none !important on ::after');

  const jsPath = path.join(rootDir, 'js/pages/dsaPatterns.js');
  const js = fs.readFileSync(jsPath, 'utf8');

  assert.ok(js.includes('verified'), 'dsaPatterns.js must render verified icon for self evaluation');
  assert.ok(js.includes('psychology'), 'dsaPatterns.js must render psychology icon for help30 evaluation');
  assert.ok(js.includes('smart_toy'), 'dsaPatterns.js must render smart_toy icon for help50 evaluation');
  assert.ok(js.includes('content_paste_off'), 'dsaPatterns.js must render content_paste_off icon for cross evaluation');
});

console.log('\n================================================================');
console.log(` Test Results: ${passedTests} / ${totalTests} Passed`);
console.log('================================================================\n');

assert.strictEqual(passedTests, totalTests, `Not all tests passed!`);
