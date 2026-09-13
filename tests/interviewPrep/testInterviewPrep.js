// tests/interviewPrep/testInterviewPrep.js
const assert = require('assert');
const path = require('path');

// Set global window for Node environment
global.window = global;

const registry = require('../../js/data/interviewPrep/index.js');

console.log('====================================================');
console.log('  DevPilot-AI: Interview Prep Automated Test Suite  ');
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

// 1. Categories Verification
it('Should load all 18 placement & interview categories', () => {
  const cats = registry.getAllCategories();
  assert.strictEqual(cats.length, 18, `Expected 18 categories, got ${cats.length}`);
});

it('Each category should have valid metadata and question array', () => {
  const cats = registry.getAllCategories();
  cats.forEach(c => {
    assert.ok(c.id, 'Category missing id');
    assert.ok(c.title, `Category ${c.id} missing title`);
    assert.ok(c.icon, `Category ${c.id} missing icon`);
    assert.ok(Array.isArray(c.questions), `Category ${c.id} questions is not array`);
    assert.ok(c.questions.length > 0, `Category ${c.id} has 0 questions`);
  });
});

// 2. Question Count Verification
it('Should have total question count of at least 2,000 authentic MCQs', () => {
  const allQs = registry.getAllQuestions();
  assert.ok(allQs.length >= 2000, `Expected at least 2000 questions, got ${allQs.length}`);
  console.log(`    Total questions verified: ${allQs.length}`);
});

// 3. Question Schema Validation
it('Every single question must have unique ID, 4 options, valid correctAnswer (0-3), and detailed explanation', () => {
  const allQs = registry.getAllQuestions();
  const seenIds = new Set();
  const validDifficulties = ['Easy', 'Medium', 'Hard'];

  allQs.forEach((q, idx) => {
    // Unique ID
    assert.ok(q.id, `Question at index ${idx} missing id`);
    assert.ok(!seenIds.has(q.id), `Duplicate question id found: ${q.id}`);
    seenIds.add(q.id);

    // Non-empty question
    assert.ok(typeof q.question === 'string' && q.question.trim().length > 5, `Question ${q.id} text too short`);

    // 4 options
    assert.ok(Array.isArray(q.options), `Question ${q.id} options not array`);
    assert.strictEqual(q.options.length, 4, `Question ${q.id} must have exactly 4 options, got ${q.options.length}`);
    q.options.forEach((opt, optIdx) => {
      assert.ok(typeof opt === 'string' && opt.trim().length > 0, `Question ${q.id} option ${optIdx} empty`);
    });

    // Valid correctAnswer index (0 to 3)
    assert.ok(Number.isInteger(q.correctAnswer), `Question ${q.id} correctAnswer must be integer`);
    assert.ok(q.correctAnswer >= 0 && q.correctAnswer <= 3, `Question ${q.id} correctAnswer out of range 0-3: ${q.correctAnswer}`);

    // Explanation
    assert.ok(typeof q.explanation === 'string' && q.explanation.trim().length > 10, `Question ${q.id} explanation missing or too short`);

    // Difficulty
    if (q.difficulty) {
      assert.ok(validDifficulties.map(d => d.toLowerCase()).includes(q.difficulty.toLowerCase()), `Question ${q.id} has invalid difficulty: ${q.difficulty}`);
    }
  });
});

// 4. Checklists Verification
it('Should provide comprehensive checklists for 8 core CS subjects', () => {
  const chk = registry.getChecklists();
  const subjects = Object.keys(chk);
  assert.strictEqual(subjects.length, 8, `Expected 8 core CS checklists, got ${subjects.length}`);

  subjects.forEach(s => {
    const subj = chk[s];
    assert.ok(subj.title, `Checklist ${s} missing title`);
    assert.ok(Array.isArray(subj.items) && subj.items.length >= 8, `Checklist ${s} has too few items`);
    subj.items.forEach(item => {
      assert.ok(item.id, `Checklist item missing id in ${s}`);
      assert.ok(item.label, `Checklist item missing label in ${s}`);
      assert.strictEqual(typeof item.important, 'boolean', `Checklist item ${item.id} missing boolean important`);
    });
  });
});

// 5. System Design Case Studies Verification
it('System Design should provide at least 10 complete end-to-end case studies', () => {
  const sd = registry.getCategory('system_design');
  assert.ok(sd, 'System Design category not found');
  assert.ok(Array.isArray(sd.caseStudies), 'System Design caseStudies is not array');
  assert.strictEqual(sd.caseStudies.length, 10, `Expected 10 case studies, got ${sd.caseStudies.length}`);

  sd.caseStudies.forEach(cs => {
    assert.ok(cs.title, `Case study missing title: ${cs.id}`);
    assert.ok(cs.problemStatement, `Case study missing problemStatement: ${cs.id}`);
    assert.ok(Array.isArray(cs.functionalRequirements) && cs.functionalRequirements.length > 0, `Missing functional requirements: ${cs.id}`);
    assert.ok(Array.isArray(cs.nonFunctionalRequirements) && cs.nonFunctionalRequirements.length > 0, `Missing nonFunctional requirements: ${cs.id}`);
    assert.ok(Array.isArray(cs.coreComponents) && cs.coreComponents.length > 0, `Missing core components: ${cs.id}`);
    assert.ok(cs.dataSchema, `Missing dataSchema: ${cs.id}`);
    assert.ok(Array.isArray(cs.stepByStepArchitecture) && cs.stepByStepArchitecture.length > 0, `Missing architecture steps: ${cs.id}`);
  });
});

// 6. GD & HR Content Verification
it('Communication & HR categories should provide rich GD topics and STAR interview guides', () => {
  const comm = registry.getCategory('communication');
  assert.ok(comm && comm.gdTopics && comm.gdTopics.length === 10, 'Expected 10 GD topics in communication');
  comm.gdTopics.forEach(gd => {
    assert.ok(gd.title && gd.openingStatement && gd.conclusion, `Incomplete GD topic: ${gd.id}`);
    assert.ok(Array.isArray(gd.pointsInFavor) && Array.isArray(gd.pointsAgainst), `Missing points in GD topic: ${gd.id}`);
  });

  const hr = registry.getCategory('hrBehavioral');
  assert.ok(hr && hr.hrQuestions && hr.hrQuestions.length === 10, 'Expected 10 comprehensive HR questions');
  hr.hrQuestions.forEach(h => {
    assert.ok(h.question && h.evaluatingFor && h.starGuide, `Incomplete HR question: ${h.id}`);
    assert.ok(h.starGuide.situation && h.starGuide.task && h.starGuide.action && h.starGuide.result, `Incomplete STAR guide: ${h.id}`);
  });
});

// 7. 60-Minute Mock Test Generator Verification
it('Mock Test Pool should generate 50 balanced questions spanning all test sections', () => {
  const pool = registry.getMockTestPool(50);
  assert.strictEqual(pool.length, 50, `Expected exactly 50 mock test questions, got ${pool.length}`);

  // Check categories represented
  const catSet = new Set(pool.map(q => q.categoryId));
  assert.ok(catSet.has('aptitude'), 'Mock test missing Aptitude');
  assert.ok(catSet.has('english'), 'Mock test missing English');
  assert.ok(catSet.has('logicalReasoning'), 'Mock test missing Logical Reasoning');
  assert.ok(catSet.has('programming'), 'Mock test missing Programming');
  assert.ok(catSet.has('oop'), 'Mock test missing OOP');
});

// 8. Weak Topics Diagnosis Verification
it('Weak topics detection should accurately isolate topics with low accuracy', () => {
  const mockProgress = {
    'topic:dbms:Indexing & B/B+ Trees': {
      categoryId: 'dbms',
      topic: 'Indexing & B/B+ Trees',
      attempted: 10,
      correct: 3,
      incorrect: 7
    },
    'topic:operatingSystems:Process Scheduling': {
      categoryId: 'operatingSystems',
      topic: 'Process Scheduling',
      attempted: 10,
      correct: 9,
      incorrect: 1
    }
  };

  const weak = registry.getWeakTopics(mockProgress);
  assert.strictEqual(weak.length, 1, `Expected 1 weak topic, got ${weak.length}`);
  assert.strictEqual(weak[0].topic, 'Indexing & B/B+ Trees');
  assert.strictEqual(weak[0].accuracy, 30);
});

console.log('\n----------------------------------------------------');
console.log(`Test Results: ${passedTests} passed, ${failedTests} failed.`);
console.log('----------------------------------------------------\n');

if (failedTests > 0) {
  process.exit(1);
}
