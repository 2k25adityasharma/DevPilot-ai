// scratch/auditCoaSe.js
const reg = require('../js/data/interviewPrep/index.js');
reg.init();

const coa = reg.getCategory('computer_organization');
const se = reg.getCategory('software_engineering');

console.log('Auditing COA (120 Qs) and SE (140 Qs)...');

function auditCategory(cat) {
  const flags = [];
  cat.questions.forEach(q => {
    const marked = q.options[q.correctAnswer];
    const exp = q.explanation;

    // Check if explanation mentions any conflicting number or formula
    // For cyclomatic complexity V(G) = E - N + 2P
    if (q.question.includes('Cyclomatic') || q.question.includes('McCabe')) {
      if (q.options.some(o => o.includes('V(G)')) && !marked.includes('E - N + 2P') && !marked.includes('E - N + 2')) {
        // Check if question asks for formula
        if (q.question.includes('formula')) {
          flags.push({ id: q.id, issue: 'Cyclomatic formula check', marked, exp });
        }
      }
    }
  });
  return flags;
}

const coaFlags = auditCategory(coa);
const seFlags = auditCategory(se);

console.log('COA flags:', coaFlags.length);
console.log('SE flags:', seFlags.length);
seFlags.forEach(f => console.log(f));
