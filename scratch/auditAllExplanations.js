// scratch/auditAllExplanations.js
const reg = require('../js/data/interviewPrep/index.js');
reg.init();

const allQs = reg.getAllQuestions();

console.log('Searching all 2,170 questions for scratch notes, author doubts, or suspicious words in explanations...');

const patterns = [
  /\bwait\b/i,
  /\btypo\b/i,
  /\btodo\b/i,
  /\bfixme\b/i,
  /\bcorrection\b/i,
  /\bcontradict\b/i,
  /\bcheck\s+again\b/i,
  /\bshould\s+be\b/i,
  /\bwrong\b/i
];

const flagged = [];

allQs.forEach(q => {
  const exp = q.explanation || '';
  for (let p of patterns) {
    if (p.test(exp)) {
      flagged.push({
        id: q.id,
        category: q.categoryId || q.category,
        topic: q.topic,
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        pattern: p.toString(),
        explanation: exp
      });
      break;
    }
  }
});

console.log(`Total questions with suspicious words in explanation: ${flagged.length}`);
flagged.forEach(f => {
  console.log(`\n[${f.id}] (${f.category} - ${f.topic})`);
  console.log(`  Q: ${f.question}`);
  console.log(`  Marked [${f.correctAnswer}]: "${f.options[f.correctAnswer]}"`);
  console.log(`  Pattern: ${f.pattern}`);
  console.log(`  Explanation: ${f.explanation}`);
});
