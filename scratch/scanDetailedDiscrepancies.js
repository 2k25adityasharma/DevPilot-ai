// scratch/scanDetailedDiscrepancies.js
const reg = require('../js/data/interviewPrep/index.js');
reg.init();

const aptitude = reg.getCategory('aptitude');
const reasoning = reg.getCategory('logicalReasoning');
const english = reg.getCategory('english');

console.log('=== SCANNING APTITUDE (200 Qs) ===');
// Check explanation numbers vs correct answer numbers
const letters = ['A', 'B', 'C', 'D'];

function checkCategory(cat) {
  const flags = [];
  (cat.questions || []).forEach(q => {
    const correctText = q.options[q.correctAnswer];
    const exp = q.explanation || '';

    // 1. Check if explanation contains another option's exact text while NOT containing the correct option's text
    const otherOptions = q.options.filter((opt, idx) => idx !== q.correctAnswer);
    let mentionsOther = null;
    for (let opt of otherOptions) {
      const cleanOpt = opt.trim();
      // If option is a specific phrase or number
      if (cleanOpt.length > 3 && exp.includes(cleanOpt) && !exp.includes(correctText.trim())) {
        mentionsOther = opt;
        break;
      }
    }

    if (mentionsOther) {
      flags.push({
        id: q.id,
        topic: q.topic,
        question: q.question,
        correctAnswer: q.correctAnswer,
        correctText: correctText,
        mentionsOther: mentionsOther,
        explanation: exp
      });
    }
  });
  return flags;
}

const aptFlags = checkCategory(aptitude);
console.log('Aptitude potential mismatches found:', aptFlags.length);
aptFlags.forEach(f => {
  console.log(`\n[${f.id}] (${f.topic}) Q: ${f.question}`);
  console.log(`  Marked [${f.correctAnswer}]: "${f.correctText}"`);
  console.log(`  Explanation mentions other: "${f.mentionsOther}"`);
  console.log(`  Explanation: ${f.explanation}`);
});

const lrFlags = checkCategory(reasoning);
console.log('\n=== SCANNING LOGICAL REASONING (120 Qs) ===');
console.log('LR potential mismatches found:', lrFlags.length);
lrFlags.forEach(f => {
  console.log(`\n[${f.id}] (${f.topic}) Q: ${f.question}`);
  console.log(`  Marked [${f.correctAnswer}]: "${f.correctText}"`);
  console.log(`  Explanation mentions other: "${f.mentionsOther}"`);
  console.log(`  Explanation: ${f.explanation}`);
});

const engFlags = checkCategory(english);
console.log('\n=== SCANNING ENGLISH (100 Qs) ===');
console.log('English potential mismatches found:', engFlags.length);
engFlags.forEach(f => {
  console.log(`\n[${f.id}] (${f.topic}) Q: ${f.question}`);
  console.log(`  Marked [${f.correctAnswer}]: "${f.correctText}"`);
  console.log(`  Explanation mentions other: "${f.mentionsOther}"`);
  console.log(`  Explanation: ${f.explanation}`);
});
