// scratch/deepVerifyAptitude.js
const reg = require('../js/data/interviewPrep/index.js');
reg.init();

const apt = reg.getCategory('aptitude');
const lr = reg.getCategory('logicalReasoning');

function cleanNum(str) {
  return String(str || '').replace(/[,₹$%°]/g, '').trim().toLowerCase();
}

function verifyCategory(cat) {
  const missingInExp = [];
  (cat.questions || []).forEach(q => {
    const optText = q.options[q.correctAnswer];
    const exp = q.explanation;
    
    // Normalize option text to find in explanation
    const cOpt = cleanNum(optText);
    const cExp = cleanNum(exp);

    // If optText contains numbers or words
    const tokens = cOpt.split(/\s+/).filter(t => t.length > 0);
    const primaryToken = tokens[0];

    if (!cExp.includes(cOpt) && !cExp.includes(primaryToken)) {
      missingInExp.push({
        id: q.id,
        topic: q.topic,
        question: q.question,
        correctAnswerIndex: q.correctAnswer,
        options: q.options,
        markedAnswer: optText,
        explanation: exp
      });
    }
  });
  return missingInExp;
}

const aptMissing = verifyCategory(apt);
console.log(`Aptitude questions where marked option is NOT referenced in explanation: ${aptMissing.length}`);
aptMissing.forEach(m => {
  console.log(`\n[${m.id}] (${m.topic})`);
  console.log(`  Question: ${m.question}`);
  console.log(`  Options: ${JSON.stringify(m.options)}`);
  console.log(`  Marked [${m.correctAnswerIndex}]: "${m.markedAnswer}"`);
  console.log(`  Explanation: ${m.explanation}`);
});

const lrMissing = verifyCategory(lr);
console.log(`\nLogical Reasoning questions where marked option is NOT referenced in explanation: ${lrMissing.length}`);
lrMissing.forEach(m => {
  console.log(`\n[${m.id}] (${m.topic})`);
  console.log(`  Question: ${m.question}`);
  console.log(`  Options: ${JSON.stringify(m.options)}`);
  console.log(`  Marked [${m.correctAnswerIndex}]: "${m.markedAnswer}"`);
  console.log(`  Explanation: ${m.explanation}`);
});
