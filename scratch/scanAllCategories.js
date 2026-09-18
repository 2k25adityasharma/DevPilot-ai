// scratch/scanAllCategories.js
const reg = require('../js/data/interviewPrep/index.js');
reg.init();

const allCategories = reg.getAllCategories();
const allQuestions = reg.getAllQuestions();

console.log('Scanning all 2,170 questions across 18 categories for explanation contradictions & option mismatches...');

const flags = [];

allQuestions.forEach(q => {
  const correctText = (q.options && q.options[q.correctAnswer]) || '';
  const exp = q.explanation || '';

  // 1. Check if explanation says "Option X is correct" or "Answer: X" where X != letter of correctAnswer
  const letters = ['A', 'B', 'C', 'D'];
  const curLetter = letters[q.correctAnswer];

  // Regex looking for explicit statements like "Option B is correct", "Choice C is correct", "correct answer is (D)"
  const regexList = [
    /\b(?:Option|Choice)\s+([A-D])\s+(?:is\s+correct|is\s+the\s+correct|is\s+right)/i,
    /\bcorrect\s+(?:option|choice|answer)\s+is\s+(?:Option\s+|Choice\s+)?([A-D])\b/i,
    /\bAnswer\s*:\s*([A-D])\b/i
  ];

  for (let re of regexList) {
    const match = exp.match(re);
    if (match) {
      const statedLetter = match[1].toUpperCase();
      if (statedLetter !== curLetter) {
        flags.push({
          id: q.id,
          category: q.categoryId || q.category,
          topic: q.topic,
          question: q.question,
          currentCorrectIndex: q.correctAnswer,
          currentCorrectLetter: curLetter,
          currentCorrectText: correctText,
          statedLetter: statedLetter,
          statedText: q.options[letters.indexOf(statedLetter)],
          explanation: exp
        });
      }
    }
  }
});

console.log('Total explicit letter/answer contradiction flags:', flags.length);
flags.forEach(f => {
  console.log(`\n[${f.id}] (${f.category} - ${f.topic})`);
  console.log(`  Q: ${f.question}`);
  console.log(`  Current answer [${f.currentCorrectLetter}]: "${f.currentCorrectText}"`);
  console.log(`  Explanation states [${f.statedLetter}]: "${f.statedText}"`);
  console.log(`  Explanation: ${f.explanation}`);
});
