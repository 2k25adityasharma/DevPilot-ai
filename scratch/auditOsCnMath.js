// scratch/auditOsCnMath.js
const reg = require('../js/data/interviewPrep/index.js');
reg.init();

const os = reg.getCategory('operatingSystems');
const cn = reg.getCategory('computerNetworks');

console.log('Auditing numerical/mathematical questions in OS (150 Qs) and CN (160 Qs)...');

function auditNumerical(questions, catName) {
  const flags = [];
  questions.forEach(q => {
    // If question contains numbers or calculations
    const isMath = /[0-9]+(?:\s*ms|\s*ns|\s*kb|\s*mb|\s*gb|\s*bits|\s*bytes|\s*hosts|\s*subnets|\/|\*|\+|\-|\=)/i.test(q.question);
    if (isMath) {
      const marked = q.options[q.correctAnswer];
      const exp = q.explanation;
      
      // Look for any contradiction in explanation
      // If explanation calculates a final value
      const match = exp.match(/=\s*([0-9]+(?:\.[0-9]+)?\s*(?:ms|ns|kb|mb|gb|hosts|bytes)?)/i);
      if (match) {
        const val = match[1].trim();
        if (!marked.includes(val) && !exp.includes(marked)) {
          flags.push({
            id: q.id,
            topic: q.topic,
            question: q.question,
            marked: marked,
            calculated: val,
            explanation: exp
          });
        }
      }
    }
  });
  return flags;
}

const osFlags = auditNumerical(os.questions, 'OS');
const cnFlags = auditNumerical(cn.questions, 'CN');

console.log(`OS numerical flags: ${osFlags.length}`);
osFlags.forEach(f => console.log(`[${f.id}] (${f.topic}) Q: ${f.question}\nMarked: "${f.marked}"\nCalc: "${f.calculated}"\nExp: ${f.explanation}\n`));

console.log(`CN numerical flags: ${cnFlags.length}`);
cnFlags.forEach(f => console.log(`[${f.id}] (${f.topic}) Q: ${f.question}\nMarked: "${f.marked}"\nCalc: "${f.calculated}"\nExp: ${f.explanation}\n`));
