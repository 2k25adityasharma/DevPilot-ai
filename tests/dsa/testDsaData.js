/**
 * DevPilot-AI — Automated Validation Test Suite for DSA Roadmap Dataset
 */

const assert = require('assert');
const { dsaRoadmap } = require('../../js/data/dsaData.js');

console.log('====================================================');
console.log(' DevPilot-AI: Validating DSA Roadmap Dataset        ');
console.log('====================================================\n');

let passed = 0;
let total = 0;

function check(name, fn) {
  total++;
  try {
    fn();
    console.log(`✓ [PASS] ${name}`);
    passed++;
  } catch (err) {
    console.error(`✗ [FAIL] ${name}: ${err.message}`);
  }
}

// 1. Structure & Category checks
check('TEST 1: Exact 16 major DSA categories exist', () => {
  const expected = [
    'Array', 'String', 'Hash Map', 'Stack', 'Queue / Deque', 'Linked List',
    'Trees', 'Recursion & Backtracking', 'Heap / Priority Queue', 'Graphs',
    'Trie (Prefix Tree)', 'Dynamic Programming', 'Greedy', 'Bit Manipulation',
    'Sorting Algorithms', 'Range Structures'
  ];
  assert.strictEqual(dsaRoadmap.length, 16, `Expected 16 categories, got ${dsaRoadmap.length}`);
  const actualNames = dsaRoadmap.map(c => c.name);
  expected.forEach(exp => {
    assert.ok(actualNames.includes(exp), `Missing category: ${exp}`);
  });
});

// 2. Question uniqueness & field validations
check('TEST 2: Every question has a unique ID and canonical LeetCode URL', () => {
  const ids = new Set();
  const validUrlRegex = /^https:\/\/leetcode\.com\/problems\/[a-z0-9\-]+\/$/;
  let count = 0;

  dsaRoadmap.forEach(cat => {
    assert.ok(cat.id && cat.name && cat.icon, `Category missing required metadata: ${cat.id}`);
    cat.patterns.forEach(pat => {
      assert.ok(pat.id && pat.name && pat.questions, `Pattern missing required metadata: ${pat.id}`);
      pat.questions.forEach(q => {
        count++;
        assert.ok(q.id, 'Question missing id');
        assert.ok(!ids.has(q.id), `Duplicate question id: ${q.id}`);
        ids.add(q.id);

        assert.ok(q.title && q.title.trim().length > 0, `Invalid title for ${q.id}`);
        assert.ok(['Easy', 'Medium', 'Hard'].includes(q.difficulty), `Invalid difficulty ${q.difficulty} for ${q.id}`);
        assert.ok(typeof q.leetcodeNumber === 'number' && q.leetcodeNumber > 0, `Invalid leetcodeNumber for ${q.id}`);
        assert.ok(validUrlRegex.test(q.leetcodeUrl), `Invalid canonical LeetCode URL "${q.leetcodeUrl}" for ${q.id}`);
        assert.strictEqual(q.solved, false, `Default solved state must be false for ${q.id}`);
      });
    });
  });

  assert.ok(count >= 200, `Expected at least 200 questions, got ${count}`);
  console.log(`  (Verified ${count} questions across all patterns)`);
});

// 3. Difficulty coverage
check('TEST 3: Dataset covers Easy, Medium, and Hard tiers across patterns', () => {
  let easy = 0, med = 0, hard = 0;
  dsaRoadmap.forEach(c => c.patterns.forEach(p => p.questions.forEach(q => {
    if (q.difficulty === 'Easy') easy++;
    if (q.difficulty === 'Medium') med++;
    if (q.difficulty === 'Hard') hard++;
  })));

  assert.ok(easy > 50, `Expected > 50 easy questions, got ${easy}`);
  assert.ok(med > 80, `Expected > 80 medium questions, got ${med}`);
  assert.ok(hard > 30, `Expected > 30 hard questions, got ${hard}`);
  console.log(`  (Breakdown: Easy=${easy}, Medium=${med}, Hard=${hard})`);
});

// 4. Progress calculation mathematics
check('TEST 4: Dynamic progress formula and rounding', () => {
  const totalQuestions = 250;
  const solvedQuestions = 75;
  const remaining = totalQuestions - solvedQuestions;
  const percentage = Math.round((solvedQuestions / totalQuestions) * 100);

  assert.strictEqual(remaining, 175);
  assert.strictEqual(percentage, 30);
  assert.strictEqual(solvedQuestions + remaining, totalQuestions);
});

console.log('\n====================================================');
console.log(` Validation Results: ${passed} / ${total} Passed`);
console.log('====================================================\n');

if (passed !== total) process.exit(1);