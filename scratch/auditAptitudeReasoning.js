// scratch/auditAptitudeReasoning.js
const reg = require('../js/data/interviewPrep/index.js');
reg.init();

const apt = reg.getCategory('aptitude');
const lr = reg.getCategory('logicalReasoning');

console.log('Auditing Aptitude (200 questions) and Logical Reasoning (120 questions)...');

const issues = [];

function auditQuestions(questions, categoryName) {
  questions.forEach((q, idx) => {
    const optText = q.options[q.correctAnswer];
    const exp = q.explanation;
    
    // Check 1: Explanation should mention the correct option value or key concept
    // Check 2: Explanation must not conclude with a different option value
    
    // Check for obvious mismatches in numbers:
    // If the marked answer is a pure number or percentage, e.g. "20%", does the explanation conclude with something else?
    const numMatch = optText.match(/^([0-9]+(?:\.[0-9]+)?%?)$/);
    if (numMatch) {
      const val = numMatch[1];
      // If the explanation has a final answer pattern like "= X" or "Answer is X"
      const finalValMatch = exp.match(/(?:=|is|results in|gives|hence|therefore)\s+([0-9]+(?:\.[0-9]+)?%?)(?:\s*\.|\s*$|\s*\()/i);
      if (finalValMatch) {
        const finalExpVal = finalValMatch[1];
        if (finalExpVal !== val && !exp.includes(val)) {
          issues.push({
            id: q.id,
            category: categoryName,
            topic: q.topic,
            question: q.question,
            markedAnswer: optText,
            possibleExplanationAnswer: finalExpVal,
            explanation: exp
          });
        }
      }
    }
  });
}

auditQuestions(apt.questions, 'aptitude');
auditQuestions(lr.questions, 'logicalReasoning');

console.log(`Found ${issues.length} potential calculation/value mismatches.`);
issues.forEach(i => {
  console.log(`\n[${i.id}] (${i.topic})`);
  console.log(`  Q: ${i.question}`);
  console.log(`  Marked: ${i.markedAnswer}`);
  console.log(`  Exp value: ${i.possibleExplanationAnswer}`);
  console.log(`  Exp: ${i.explanation}`);
});
