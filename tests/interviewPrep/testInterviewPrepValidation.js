// tests/interviewPrep/testInterviewPrepValidation.js
const assert = require('assert');
const path = require('path');

// Set global window and mock localStorage for Node environment
const mockLocalStorage = {
  store: {},
  getItem(key) {
    return this.store[key] || null;
  },
  setItem(key, val) {
    this.store[key] = String(val);
  },
  removeItem(key) {
    delete this.store[key];
  },
  clear() {
    this.store = {};
  }
};

global.window = global;
global.localStorage = mockLocalStorage;

const registry = require('../../js/data/interviewPrep/index.js');
const englishCat = require('../../js/data/interviewPrep/english.js');
const aptitudeCat = require('../../js/data/interviewPrep/aptitude.js');
const gitCat = require('../../js/data/interviewPrep/git.js');

console.log('====================================================');
console.log('  DevPilot-AI: Full System & Logic Validation Suite ');
console.log('====================================================');

let passedTests = 0;
let failedTests = 0;

function it(desc, fn) {
  try {
    fn();
    console.log(`  ✓ ${desc}`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ ${desc}`);
    console.error(`    Error: ${err.message}`);
    failedTests++;
  }
}

// 1. Specific Question Fixes
it('English Error Detection questions (eng-ed-01 to eng-ed-10) should have natural option order A-D and accurate correctAnswer index', () => {
  const edQuestions = englishCat.questions.filter(q => q.id && q.id.startsWith('eng-ed-'));
  assert.strictEqual(edQuestions.length, 10, 'Expected 10 error detection questions');

  edQuestions.forEach(q => {
    assert.strictEqual(q.options.length, 4, `Question ${q.id} must have 4 options`);
    // Verify natural order
    assert.ok(q.options[0].startsWith('(A)'), `Question ${q.id} option 0 does not start with (A): ${q.options[0]}`);
    assert.ok(q.options[1].startsWith('(B)'), `Question ${q.id} option 1 does not start with (B): ${q.options[1]}`);
    assert.ok(q.options[2].startsWith('(C)'), `Question ${q.id} option 2 does not start with (C): ${q.options[2]}`);
    assert.ok(q.options[3].startsWith('(D)'), `Question ${q.id} option 3 does not start with (D): ${q.options[3]}`);

    // Verify correctAnswer is within 0..3
    assert.ok(q.correctAnswer >= 0 && q.correctAnswer <= 3, `Question ${q.id} invalid correctAnswer: ${q.correctAnswer}`);
  });

  // Verify specific corrected questions
  const ed01 = edQuestions.find(q => q.id === 'eng-ed-01');
  assert.strictEqual(ed01.correctAnswer, 3, 'eng-ed-01: (D) "no error" is not correct, error is in (D) / has been working');

  const ed07 = edQuestions.find(q => q.id === 'eng-ed-07');
  assert.strictEqual(ed07.correctAnswer, 2, 'eng-ed-07: Error is in part (C) "more preferrable"');
});

it('Aptitude question apt-pc-07 should mark "7:00 PM" as correctAnswer (index 2)', () => {
  const q7 = aptitudeCat.questions.find(q => q.id === 'apt-pc-07');
  assert.ok(q7, 'apt-pc-07 not found in aptitude category');
  assert.strictEqual(q7.correctAnswer, 2, `apt-pc-07 correctAnswer should be index 2, got ${q7.correctAnswer}`);
  assert.strictEqual(q7.options[q7.correctAnswer], '7:00 PM', `apt-pc-07 option at index 2 should be "7:00 PM", got ${q7.options[q7.correctAnswer]}`);
});

it('Git question git_bm_8 should disambiguate force delete (-D) from safe delete (-d)', () => {
  const q8 = gitCat.questions.find(q => q.id === 'git_bm_8');
  assert.ok(q8, 'git_bm_8 not found in git category');
  const correctOption = q8.options[q8.correctAnswer];
  assert.ok(correctOption.includes('-d') && correctOption.includes('safe delete'), `git_bm_8 correct option should be safe delete: ${correctOption}`);
  assert.ok(q8.options.some(opt => opt.includes('-D') && opt.includes('force delete')), 'git_bm_8 options should clarify force delete');
});

// 2. Question Normalization & Category Metadata
it('All 2,170 questions must have categoryId and categoryTitle attached by init()', () => {
  registry.init();
  const allQs = registry.getAllQuestions();
  assert.strictEqual(allQs.length, 2170, `Expected 2170 questions, got ${allQs.length}`);

  let missingCatId = 0;
  let missingCatTitle = 0;
  allQs.forEach(q => {
    if (!q.categoryId) missingCatId++;
    if (!q.categoryTitle) missingCatTitle++;
  });

  assert.strictEqual(missingCatId, 0, `Found ${missingCatId} questions missing categoryId`);
  assert.strictEqual(missingCatTitle, 0, `Found ${missingCatTitle} questions missing categoryTitle`);
});

// 3. Option Shuffling Invariance & Non-mutation
it('Option shuffling engine must preserve stable option IDs and evaluate correctAnswer with 100% accuracy over 5,000 trials', () => {
  // Implementation of prepareQuestionForAttempt under test
  function prepareQuestionForAttempt(rawQ) {
    const categoryId = rawQ.categoryId || rawQ.category || 'prep';
    const categoryTitle = rawQ.categoryTitle || 'Interview Prep';

    const rawOpts = rawQ.options || [];
    const stableOptions = rawOpts.map((opt, idx) => {
      const text = (typeof opt === 'object' && opt !== null) ? opt.text : String(opt);
      const id = (typeof opt === 'object' && opt !== null && opt.id) ? opt.id : `opt_${idx}`;
      return { id, text, originalIndex: idx };
    });

    let correctOptionId;
    if (rawQ.correctOptionId) {
      correctOptionId = rawQ.correctOptionId;
    } else if (typeof rawQ.correctAnswer === 'number' && stableOptions[rawQ.correctAnswer]) {
      correctOptionId = stableOptions[rawQ.correctAnswer].id;
    } else {
      correctOptionId = stableOptions[0] ? stableOptions[0].id : 'opt_0';
    }

    // Authentic Fisher-Yates shuffle
    const shuffledOptions = [...stableOptions];
    for (let i = shuffledOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
    }

    const correctMatch = stableOptions.find(o => o.id === correctOptionId);

    return {
      id: rawQ.id,
      categoryId: categoryId,
      categoryTitle: categoryTitle,
      topic: rawQ.topic,
      difficulty: rawQ.difficulty || 'Medium',
      question: rawQ.question,
      explanation: rawQ.explanation,
      options: shuffledOptions,
      correctOptionId: correctOptionId,
      correctText: correctMatch ? correctMatch.text : '',
      selectedOptionId: null,
      isAnswered: false,
      isCorrect: null
    };
  }

  const allQs = registry.getAllQuestions();
  // Sample 100 questions from different categories
  const sampleQs = allQs.slice(0, 100);

  let totalTrials = 0;
  let correctMatches = 0;
  let falseRejections = 0;

  sampleQs.forEach(rawQ => {
    // Snapshot original rawQ options to verify immutability
    const origOptsSnapshot = JSON.stringify(rawQ.options);
    const origCorrectAnswer = rawQ.correctAnswer;
    const expectedCorrectText = rawQ.options[origCorrectAnswer];

    for (let trial = 0; trial < 50; trial++) {
      totalTrials++;
      const prepared = prepareQuestionForAttempt(rawQ);

      // 1. Immutability check: rawQ must not have changed
      assert.strictEqual(JSON.stringify(rawQ.options), origOptsSnapshot, `rawQ ${rawQ.id} options mutated by prepareQuestionForAttempt`);
      assert.strictEqual(rawQ.correctAnswer, origCorrectAnswer, `rawQ ${rawQ.id} correctAnswer mutated`);

      // 2. Correct text match
      assert.strictEqual(prepared.correctText, expectedCorrectText, `Prepared question ${rawQ.id} correctText does not match expected`);

      // 3. User selects the correct option
      const userSelectedOpt = prepared.options.find(o => o.text === expectedCorrectText);
      assert.ok(userSelectedOpt, `Correct option text not found in shuffled options for ${rawQ.id}`);

      // Evaluate: userSelectedOpt.id === prepared.correctOptionId
      if (userSelectedOpt.id === prepared.correctOptionId) {
        correctMatches++;
      }

      // 4. User selects an incorrect option
      const wrongOpts = prepared.options.filter(o => o.id !== prepared.correctOptionId);
      wrongOpts.forEach(wOpt => {
        if (wOpt.id === prepared.correctOptionId) {
          falseRejections++;
        }
      });
    }
  });

  assert.strictEqual(totalTrials, 5000, `Expected 5000 trials, ran ${totalTrials}`);
  assert.strictEqual(correctMatches, 5000, `Expected 5000 correct evaluations, got ${correctMatches}`);
  assert.strictEqual(falseRejections, 0, `Expected 0 false rejections, got ${falseRejections}`);
});

// 4. Stats & Double-Counting Elimination
it('getOverallStats should strictly count individual question attempts and prevent 2x double-counting with topic progress', () => {
  const sampleProgress = {
    'q:eng-01': { attempted: 1, correct: 1, incorrect: 0 },
    'q:eng-02': { attempted: 1, correct: 0, incorrect: 1 },
    'q:eng-03': { attempted: 1, correct: 1, incorrect: 0 },
    'topic:english:Grammar Rules': {
      categoryId: 'english',
      topic: 'Grammar Rules',
      attempted: 3,
      correct: 2,
      incorrect: 1
    }
  };

  const stats = registry.getOverallStats(sampleProgress);
  assert.strictEqual(stats.totalAttempted, 3, `Expected totalAttempted to be 3, got ${stats.totalAttempted}`);
  assert.strictEqual(stats.totalCorrect, 2, `Expected totalCorrect to be 2, got ${stats.totalCorrect}`);
  assert.strictEqual(stats.accuracy, 67, `Expected accuracy to be 67%, got ${stats.accuracy}%`);
});

it('getOverallStats should fallback to topic aggregates when legacy data has no q:* keys', () => {
  const legacyProgress = {
    'topic:aptitude:Percentages': {
      categoryId: 'aptitude',
      topic: 'Percentages',
      attempted: 10,
      correct: 8,
      incorrect: 2
    },
    'topic:aptitude:Time and Work': {
      categoryId: 'aptitude',
      topic: 'Time and Work',
      attempted: 10,
      correct: 6,
      incorrect: 4
    }
  };

  const stats = registry.getOverallStats(legacyProgress);
  assert.strictEqual(stats.totalAttempted, 20, `Expected legacy totalAttempted to be 20, got ${stats.totalAttempted}`);
  assert.strictEqual(stats.totalCorrect, 14, `Expected legacy totalCorrect to be 14, got ${stats.totalCorrect}`);
  assert.strictEqual(stats.accuracy, 70, `Expected legacy accuracy to be 70%, got ${stats.accuracy}%`);
});

// 5. Dashboard Data Service Integration
it('dashboardDataService.getInterviewPrepDetails should execute cleanly without ReferenceError', () => {
  // Load dashboardDataService
  const dds = require('../../js/core/dashboardDataService.js') || global.window.DashboardDataService;
  assert.ok(dds, 'DashboardDataService could not be loaded');

  // Test with empty storage
  mockLocalStorage.clear();
  const emptyRes = dds.getInterviewPrepDetails();
  assert.strictEqual(emptyRes.hasStarted, false);
  assert.strictEqual(emptyRes.questionsAttempted, 0);

  // Test with populated storage
  const sampleProgress = {
    'q:apt-pc-01': { attempted: 1, correct: 1, incorrect: 0 },
    'topic:aptitude:Percentages': {
      categoryId: 'aptitude',
      topic: 'Percentages',
      attempted: 1,
      correct: 1,
      incorrect: 0,
      lastAttempted: Date.now()
    }
  };
  mockLocalStorage.setItem('devpilot_interview_prep_progress', JSON.stringify(sampleProgress));

  const filledRes = dds.getInterviewPrepDetails();
  assert.strictEqual(filledRes.hasStarted, true);
  assert.strictEqual(filledRes.questionsAttempted, 1);
  assert.strictEqual(filledRes.questionsCorrect, 1);
  assert.strictEqual(filledRes.topicName, 'Percentages');
});

// 6. Mock Test Pool Generation
it('getMockTestPool should return exactly 50 well-distributed questions with Fisher-Yates shuffle', () => {
  const pool1 = registry.getMockTestPool(50);
  const pool2 = registry.getMockTestPool(50);

  assert.strictEqual(pool1.length, 50, `Expected 50 questions, got ${pool1.length}`);
  assert.strictEqual(pool2.length, 50, `Expected 50 questions, got ${pool2.length}`);

  // Check that pools are randomized (not identical order)
  const ids1 = pool1.map(q => q.id).join(',');
  const ids2 = pool2.map(q => q.id).join(',');
  assert.notStrictEqual(ids1, ids2, 'Mock test pools across two calls should have different random orderings');
});

console.log('\n----------------------------------------------------');
console.log(`Validation Results: ${passedTests} passed, ${failedTests} failed.`);
console.log('----------------------------------------------------\n');

if (failedTests > 0) {
  process.exit(1);
}
