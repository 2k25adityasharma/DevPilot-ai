// scratch/auditProgramming.js
const reg = require('../js/data/interviewPrep/index.js');
reg.init();

const prog = reg.getCategory('programming');
const oop = reg.getCategory('oop');

console.log('Auditing Programming (140 Qs) and OOP (120 Qs)...');

function checkCodeOutput(questions) {
  const flags = [];
  questions.forEach(q => {
    // Check if question asks for output
    const isOutputQ = /output|result|print|display|return/i.test(q.question);
    const marked = q.options[q.correctAnswer];
    const exp = q.explanation;
    
    // Check if explanation mentions output that does not match marked
    if (isOutputQ) {
      // Look for phrases like "output is X", "prints X", "returns X"
      const match = exp.match(/(?:output is|prints|returns|result is|evaluates to)\s+([^\.,;\n]+)/i);
      if (match) {
        const stated = match[1].trim();
        // If stated does not match marked and is among other options
        const otherOpt = q.options.find((o, idx) => idx !== q.correctAnswer && (o.trim() === stated || stated === `"${o.trim()}"` || stated === `'${o.trim()}'`));
        if (otherOpt) {
          flags.push({
            id: q.id,
            topic: q.topic,
            question: q.question,
            marked: marked,
            statedInExp: stated,
            otherMatchingOption: otherOpt,
            explanation: exp
          });
        }
      }
    }
  });
  return flags;
}

const progFlags = checkCodeOutput(prog.questions);
const oopFlags = checkCodeOutput(oop.questions);

console.log(`Programming flags: ${progFlags.length}`);
progFlags.forEach(f => console.log(`[${f.id}] Q: ${f.question}\nMarked: ${f.marked}\nExp mentions: ${f.statedInExp}\nMatch: ${f.otherMatchingOption}\nExp: ${f.explanation}\n`));

console.log(`OOP flags: ${oopFlags.length}`);
oopFlags.forEach(f => console.log(`[${f.id}] Q: ${f.question}\nMarked: ${f.marked}\nExp mentions: ${f.statedInExp}\nMatch: ${f.otherMatchingOption}\nExp: ${f.explanation}\n`));
