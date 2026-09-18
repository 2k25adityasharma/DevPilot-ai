// scratch/fullQuestionAudit.js
const fs = require('fs');
const path = require('path');

global.window = global;

const registry = require('../js/data/interviewPrep/index.js');
registry.init();

const categories = registry.getAllCategories();
const allQuestions = registry.getAllQuestions();

console.log('Total Categories:', categories.length);
console.log('Total Questions:', allQuestions.length);

const categoryCounts = {};
const topicCounts = {};

categories.forEach(cat => {
  categoryCounts[cat.id] = {
    title: cat.title,
    count: (cat.questions || []).length
  };
  (cat.questions || []).forEach(q => {
    const t = q.topic || 'Unspecified';
    const key = `${cat.id} ||| ${t}`;
    topicCounts[key] = (topicCounts[key] || 0) + 1;
  });
});

// Structural & Quality Checks
const structuralIssues = [];
const duplicateQuestions = [];
const duplicateOptions = [];
const explanationContradictions = [];
const optionAnomalies = [];
const difficultyMismatches = [];

const letters = ['A', 'B', 'C', 'D'];
const seenIds = new Map();
const seenQuestionTexts = new Map();

function normalizeText(str) {
  return String(str || '').toLowerCase().replace(/[^a-z0-9]/g, ' ').replace(/\s+/g, ' ').trim();
}

allQuestions.forEach((q, idx) => {
  // 1. ID uniqueness
  if (!q.id) {
    structuralIssues.push({ id: `index_${idx}`, issue: 'Missing ID' });
  } else if (seenIds.has(q.id)) {
    structuralIssues.push({ id: q.id, issue: `Duplicate ID, first seen at index ${seenIds.get(q.id)}` });
  } else {
    seenIds.set(q.id, idx);
  }

  // 2. Question text
  if (!q.question || typeof q.question !== 'string' || q.question.trim().length === 0) {
    structuralIssues.push({ id: q.id, issue: 'Empty or non-string question text' });
  }

  // 3. Duplicate Question Text detection
  const normQ = normalizeText(q.question);
  if (seenQuestionTexts.has(normQ)) {
    duplicateQuestions.push({
      originalId: seenQuestionTexts.get(normQ).id,
      duplicateId: q.id,
      category1: seenQuestionTexts.get(normQ).category,
      category2: q.categoryId || q.category,
      question: q.question
    });
  } else {
    seenQuestionTexts.set(normQ, { id: q.id, category: q.categoryId || q.category });
  }

  // 4. Options validation
  if (!Array.isArray(q.options)) {
    structuralIssues.push({ id: q.id, issue: 'Options is not an array' });
  } else {
    if (q.options.length !== 4) {
      structuralIssues.push({ id: q.id, issue: `Options length is ${q.options.length}, expected 4` });
    }
    const optNorms = new Set();
    q.options.forEach((opt, oIdx) => {
      if (opt === undefined || opt === null || String(opt).trim().length === 0) {
        structuralIssues.push({ id: q.id, issue: `Option ${oIdx} is empty` });
      } else {
        const normOpt = normalizeText(opt);
        if (optNorms.has(normOpt)) {
          duplicateOptions.push({ id: q.id, optionIndex: oIdx, optionText: opt });
        }
        optNorms.add(normOpt);

        // Check placeholder text
        if (/^(option [1-4]|placeholder|lorem ipsum|todo|tbd)$/i.test(String(opt).trim())) {
          optionAnomalies.push({ id: q.id, issue: `Option ${oIdx} contains placeholder text: "${opt}"` });
        }
      }
    });
  }

  // 5. Correct Answer validation
  if (typeof q.correctAnswer !== 'number' || !Number.isInteger(q.correctAnswer)) {
    structuralIssues.push({ id: q.id, issue: `correctAnswer is not an integer: ${q.correctAnswer}` });
  } else if (q.correctAnswer < 0 || q.correctAnswer > 3) {
    structuralIssues.push({ id: q.id, issue: `correctAnswer out of range 0..3: ${q.correctAnswer}` });
  }

  // 6. Category & Topic
  if (!q.categoryId && !q.category) {
    structuralIssues.push({ id: q.id, issue: 'Missing categoryId' });
  }
  if (!q.topic || typeof q.topic !== 'string' || q.topic.trim().length === 0) {
    structuralIssues.push({ id: q.id, issue: 'Missing or empty topic' });
  }

  // 7. Explanation validation
  if (!q.explanation || typeof q.explanation !== 'string' || q.explanation.trim().length === 0) {
    structuralIssues.push({ id: q.id, issue: 'Missing or empty explanation' });
  } else {
    // Check if explanation explicitly names a different option letter
    // E.g. "Option C is correct" when correctAnswer === 0 (A)
    const exp = q.explanation;
    const currentCorrectLetter = letters[q.correctAnswer];
    const otherLetters = letters.filter(l => l !== currentCorrectLetter);

    // Look for patterns like "Option B is correct", "correct answer is (C)", "Option D provides"
    const optionLetterMatch = exp.match(/\b(?:option|choice)\s+([A-D])\b/i) || exp.match(/\b\(([A-D])\)\s+is\s+the\s+correct\b/i);
    if (optionLetterMatch) {
      const mentionedLetter = optionLetterMatch[1].toUpperCase();
      if (mentionedLetter !== currentCorrectLetter) {
        explanationContradictions.push({
          id: q.id,
          category: q.categoryId || q.category,
          topic: q.topic,
          question: q.question,
          markedLetter: currentCorrectLetter,
          markedAnswerText: q.options ? q.options[q.correctAnswer] : '',
          explanationMentionedLetter: mentionedLetter,
          explanationMentionedText: q.options ? q.options[letters.indexOf(mentionedLetter)] : '',
          explanationSnippet: exp.slice(0, 200),
          fullExplanation: exp
        });
      }
    }
  }

  // 8. Difficulty
  const validDiffs = ['Easy', 'Medium', 'Hard'];
  if (q.difficulty && !validDiffs.includes(q.difficulty)) {
    structuralIssues.push({ id: q.id, issue: `Invalid difficulty: ${q.difficulty}` });
  }
});

const report = {
  totalQuestions: allQuestions.length,
  categoryCounts,
  topicCounts,
  structuralIssuesCount: structuralIssues.length,
  structuralIssues,
  duplicateQuestionsCount: duplicateQuestions.length,
  duplicateQuestions,
  duplicateOptionsCount: duplicateOptions.length,
  duplicateOptions,
  explanationContradictionsCount: explanationContradictions.length,
  explanationContradictions,
  optionAnomaliesCount: optionAnomalies.length,
  optionAnomalies
};

fs.writeFileSync(path.join(__dirname, 'audit_results.json'), JSON.stringify(report, null, 2), 'utf8');

console.log('Audit Summary:');
console.log('Structural Issues:', structuralIssues.length);
console.log('Duplicate Questions:', duplicateQuestions.length);
console.log('Duplicate Options inside same Q:', duplicateOptions.length);
console.log('Explanation Letter Contradictions:', explanationContradictions.length);
console.log('Option Anomalies:', optionAnomalies.length);
