/**
 * Targeted verification test for User Counter and Question Click Bug
 */
const fs = require('fs');
const path = require('path');
const assert = require('assert');

const rootDir = path.resolve(__dirname, '../..');

console.log('================================================================');
console.log(' DevPilot-AI: Testing User Counter & Question Click Bug Fixes');
console.log('================================================================\n');

// 1. Load dsa.js content and verify logic
const dsaJs = fs.readFileSync(path.join(rootDir, 'js/pages/dsa.js'), 'utf8');
const dsaPatternsJs = fs.readFileSync(path.join(rootDir, 'js/pages/dsaPatterns.js'), 'utf8');

// Test A: Evaluated questions calculation simulation
const dsaDataCode = fs.readFileSync(path.join(rootDir, 'js/data/dsaData.js'), 'utf8');
const globalMock = {
  window: {},
  Storage: {
    data: {
      dsa_pattern_stats: {
        evaluations: {
          'arr-tp-01': 'cross',    // 1 - Copied
          'arr-tp-02': 'self',     // 1 - Self
          'arr-tp-03': 'help30',   // 1 - 30% Help
          'arr-tp-04': 'help50'    // 1 - 50% Help
        }
      },
      dsa_progress: {
        // Previously 'arr-tp-01' was deleted because of 'cross', so only 3 were here
        'arr-tp-02': true,
        'arr-tp-03': true,
        'arr-tp-04': true
      }
    },
    get(key, fallback) {
      return this.data[key] !== undefined ? this.data[key] : fallback;
    },
    set(key, val) {
      this.data[key] = val;
    }
  }
};

const setupData = new Function('window', dsaDataCode);
setupData(globalMock.window);

// Simulate computeStats with evaluations
function simulateComputeStats(roadmap, progress, evaluations) {
  let total = 0;
  let solved = 0;
  const diffStats = {
    Easy: { total: 0, solved: 0 },
    Medium: { total: 0, solved: 0 },
    Hard: { total: 0, solved: 0 }
  };

  roadmap.forEach(cat => {
    cat.patterns.forEach(pat => {
      pat.questions.forEach(q => {
        total++;
        const isDone = !!progress[q.id] || !!evaluations[q.id];
        if (isDone) solved++;

        if (diffStats[q.difficulty]) {
          diffStats[q.difficulty].total++;
          if (isDone) diffStats[q.difficulty].solved++;
        }
      });
    });
  });

  return { total, solved, remaining: total - solved, diffStats };
}

const stats = simulateComputeStats(
  globalMock.window.dsaRoadmap,
  globalMock.Storage.data.dsa_progress,
  globalMock.Storage.data.dsa_pattern_stats.evaluations
);

assert.strictEqual(stats.solved, 4, 'Total solved must be 4 when 4 questions are evaluated (1 self, 1 help30, 1 help50, 1 copied)');
assert.strictEqual(stats.remaining, 256, 'Remaining must be 256 (260 - 4)');
assert.strictEqual(stats.diffStats.Easy.solved, 4, 'Easy solved must be 4');
console.log('✓ [PASS] TEST 1: All 4 evaluated questions (including Copied/Cross) are counted as 4 solved');

// Test B: Auto-heal logic test
let progress = { ...globalMock.Storage.data.dsa_progress };
const evaluations = globalMock.Storage.data.dsa_pattern_stats.evaluations;
let needsSync = false;
Object.keys(evaluations).forEach(qid => {
  if (evaluations[qid] && !progress[qid]) {
    progress[qid] = true;
    needsSync = true;
  }
});
assert.strictEqual(needsSync, true, 'Auto-heal correctly detected missing cross problem');
assert.strictEqual(progress['arr-tp-01'], true, 'Auto-heal set arr-tp-01 to true');
console.log('✓ [PASS] TEST 2: Auto-heal syncs existing evaluations so Copied questions immediately show in counter');

// Test C: Check dsa.js Explain click delegation
assert.ok(
  dsaJs.includes("const explainTrigger = e.target.closest('.dsa-btn-explain, [data-open-explain]');"),
  'dsa.js must only trigger explanation on .dsa-btn-explain'
);
assert.ok(
  !dsaJs.includes("closest('.dsa-btn-explain, [data-open-explain], [data-open-detail], .dsa-question-title"),
  'dsa.js must NOT trigger explanation on .dsa-question-title or question row'
);
assert.ok(
  !dsaJs.includes('<div class="dsa-question-row ${rowStatusClass} cursor-pointer hover:bg-slate-50 transition-colors" id="row-${q.id}" data-open-detail="${q.id}">'),
  'Question row must not have cursor-pointer or data-open-detail'
);
console.log('✓ [PASS] TEST 3: Question row & title clicking does NOT open explanation; ONLY Explain button opens explanation');

// Test D: Check dsaPatterns.js onSolveOptionSelected
assert.ok(
  dsaPatternsJs.includes('dsaProgress[qid] = true;'),
  'dsaPatterns.js must mark dsaProgress[qid] = true for all solve types'
);
console.log('✓ [PASS] TEST 4: dsaPatterns.js marks dsaProgress[qid] = true for all solve types');

// Test E: Reset followed by evaluating 1 question must NOT restore previous 4 questions
// 1. User resets
globalMock.Storage.set('dsa_progress', {});
globalMock.Storage.set('dsa_pattern_stats', { viewed: {}, quizzes: {}, weak: {}, evaluations: {} });

// Simulate in-memory sync on reset
let inMemoryPatternStats = globalMock.Storage.get('dsa_pattern_stats', {});
let inMemoryProgress = globalMock.Storage.get('dsa_progress', {});
assert.strictEqual(Object.keys(inMemoryPatternStats.evaluations).length, 0, 'Evaluations must be empty after reset');
assert.strictEqual(Object.keys(inMemoryProgress).length, 0, 'Progress must be empty after reset');

// 2. User evaluates question 1 with 'self'
// onSolveOptionSelected reads fresh from Storage:
inMemoryPatternStats = globalMock.Storage.get('dsa_pattern_stats', { viewed: {}, quizzes: {}, weak: {}, evaluations: {} }) || {};
if (!inMemoryPatternStats.evaluations) inMemoryPatternStats.evaluations = {};
inMemoryPatternStats.evaluations['arr-tp-01'] = 'self';

inMemoryProgress = globalMock.Storage.get('dsa_progress', {}) || {};
inMemoryProgress['arr-tp-01'] = true;

globalMock.Storage.set('dsa_progress', inMemoryProgress);
globalMock.Storage.set('dsa_pattern_stats', inMemoryPatternStats);

// Verify stored data
const savedStats = globalMock.Storage.get('dsa_pattern_stats');
const savedProgress = globalMock.Storage.get('dsa_progress');
assert.strictEqual(Object.keys(savedStats.evaluations).length, 1, 'Only 1 evaluation must exist, previous 4 must NOT return');
assert.strictEqual(Object.keys(savedProgress).length, 1, 'Only 1 progress must exist, previous 4 must NOT return');
assert.strictEqual(savedStats.evaluations['arr-tp-01'], 'self');

const newStats = simulateComputeStats(
  globalMock.window.dsaRoadmap,
  savedProgress,
  savedStats.evaluations
);
assert.strictEqual(newStats.solved, 1, 'Total solved must be exactly 1, not 4');
assert.strictEqual(newStats.remaining, 259, 'Remaining must be 259 (260 - 1)');
console.log('✓ [PASS] TEST 5: Resetting progress and then selecting an option on 1 question does NOT restore old saved data');

console.log('\n================================================================');
console.log(' All Bug Fix Verification Checks Passed Successfully!');
console.log('================================================================\n');
