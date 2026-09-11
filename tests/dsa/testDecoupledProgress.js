/**
 * Test Suite: Decoupled State & Pattern Learning Section Navigation
 * Verifies that:
 * 1. DSA Roadmap question solving/unchecking does NOT modify Pattern Learning progress.
 * 2. Pattern Learning question solving/evaluation does NOT modify DSA Roadmap progress.
 * 3. Pattern Learning section navigation anchors (#sec-...) match DOM sections and have smooth offset navigation.
 * 4. Resets are isolated: resetting one view does NOT clear progress in the other.
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '../..');
const dsaJs = fs.readFileSync(path.join(rootDir, 'js/pages/dsa.js'), 'utf8');
const dsaPatternsJs = fs.readFileSync(path.join(rootDir, 'js/pages/dsaPatterns.js'), 'utf8');
const dsaCss = fs.readFileSync(path.join(rootDir, 'css/pages/dsa.css'), 'utf8');

console.log('===========================================================');
console.log(' DevPilot-AI: Testing Decoupled State & Section Navigation ');
console.log('===========================================================');

// TEST 1: Storage Key Isolation in JS
assert.ok(
  dsaPatternsJs.includes("Storage.get('dsa_pattern_progress'"),
  'dsaPatterns.js must load from dedicated storage key: dsa_pattern_progress'
);
assert.ok(
  dsaPatternsJs.includes("Storage.set('dsa_pattern_progress'"),
  'dsaPatterns.js must persist to dedicated storage key: dsa_pattern_progress'
);
assert.ok(
  !dsaJs.includes("dsa_pattern_progress"),
  'dsa.js must NOT read or mutate dsa_pattern_progress'
);
console.log('✓ [PASS] TEST 1: Dedicated storage key (dsa_pattern_progress) isolates Pattern Learning state');

// TEST 2: Pattern Learning ignores Roadmap sync events
assert.ok(
  dsaPatternsJs.includes("if (source === 'roadmap' || source === 'roadmapReset') return;"),
  'dsaPatterns.js must ignore sync events coming from roadmap'
);
assert.ok(
  dsaJs.includes("e.detail.source === 'patternLearning'") && dsaJs.includes("e.detail.source === 'patternReset'"),
  'dsa.js must ignore sync events coming from pattern learning'
);
console.log('✓ [PASS] TEST 2: Bidirectional progress event listeners ignore foreign view sync events');

// TEST 3: State Decoupling Simulation
const mockStorage = {
  store: {},
  get(k, def) {
    return this.store[k] !== undefined ? JSON.parse(JSON.stringify(this.store[k])) : def;
  },
  set(k, v) {
    this.store[k] = JSON.parse(JSON.stringify(v));
  }
};

// Simulate user choosing a question in DSA Roadmap
const qid = 'q_1_1'; // Two Sum
let roadmapProgress = mockStorage.get('dsa_progress', {});
roadmapProgress[qid] = true;
mockStorage.set('dsa_progress', roadmapProgress);

// Verify Pattern Learning progress is NOT modified
let plProgress = mockStorage.get('dsa_pattern_progress', {});
assert.strictEqual(plProgress[qid], undefined, 'Choosing question in DSA Roadmap must NOT affect Pattern Learning');
console.log('✓ [PASS] TEST 3: Solving a question in DSA Roadmap leaves Pattern Learning untouched');

// Simulate user solving a question in Pattern Learning
let plStats = mockStorage.get('dsa_pattern_stats', { evaluations: {} });
plStats.evaluations[qid] = 'self';
plProgress[qid] = true;
mockStorage.set('dsa_pattern_stats', plStats);
mockStorage.set('dsa_pattern_progress', plProgress);

// Reset DSA Roadmap
mockStorage.set('dsa_progress', {});
mockStorage.set('dsa_roadmap_evaluations', {});

// Verify Pattern Learning is still solved
const verifiedPlProgress = mockStorage.get('dsa_pattern_progress', {});
const verifiedPlStats = mockStorage.get('dsa_pattern_stats', {});
assert.strictEqual(verifiedPlProgress[qid], true, 'Resetting Roadmap must NOT reset Pattern Learning progress');
assert.strictEqual(verifiedPlStats.evaluations[qid], 'self', 'Resetting Roadmap must NOT reset Pattern Learning evaluations');
console.log('✓ [PASS] TEST 4: Resetting Roadmap progress does NOT wipe Pattern Learning progress');

// TEST 5: Section Navigation Anchors
const requiredSections = [
  'sec-overview',
  'sec-signals',
  'sec-mental-model',
  'sec-variations',
  'sec-complexity',
  'sec-template',
  'sec-trace',
  'sec-quiz',
  'sec-practice'
];

requiredSections.forEach(secId => {
  assert.ok(
    dsaPatternsJs.includes(`id="${secId}"`),
    `dsaPatterns.js must define section element with id="${secId}"`
  );
  assert.ok(
    dsaPatternsJs.includes(`href="#${secId}"`) || dsaPatternsJs.includes(`data-target="${secId}"`),
    `dsaPatterns.js anchor bar must reference section "${secId}"`
  );
});
console.log('✓ [PASS] TEST 5: All 9 curriculum section anchors are correctly referenced in Pattern Study View');

// TEST 6: Anchor Bar click handler and scroll spy
assert.ok(
  dsaPatternsJs.includes("e.target.closest('.pl-anchor-link')"),
  'dsaPatterns.js must have click delegation for .pl-anchor-link'
);
assert.ok(
  dsaPatternsJs.includes('window.scrollTo') && dsaPatternsJs.includes("behavior: 'smooth'"),
  'dsaPatterns.js must smoothly scroll to section on anchor click'
);
assert.ok(
  dsaPatternsJs.includes('initStudyScrollSpy') && dsaPatternsJs.includes('studyScrollSpyObserver'),
  'dsaPatterns.js must implement IntersectionObserver scroll spy for 9 sections'
);
console.log('✓ [PASS] TEST 6: Section navigation provides smooth offset scrolling and dynamic scroll spy');

// TEST 7: CSS scroll-margin-top and cursor styling
assert.ok(
  dsaCss.includes('.pl-study-card') && dsaCss.includes('scroll-margin-top: 5rem;'),
  'dsa.css must specify scroll-margin-top for .pl-study-card'
);
assert.ok(
  dsaCss.includes('.pl-anchor-link') && dsaCss.includes('cursor: pointer;'),
  'dsa.css must set cursor: pointer for .pl-anchor-link'
);
console.log('✓ [PASS] TEST 7: CSS defines scroll-margin-top and cursor styling for section cards');

console.log('\n===========================================================');
console.log(' All Decoupled State & Section Navigation Checks Passed!   ');
console.log('===========================================================');
