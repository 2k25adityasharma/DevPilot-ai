// scratch/auditAptitudeMath.js
const reg = require('../js/data/interviewPrep/index.js');
reg.init();

const apt = reg.getCategory('aptitude');

console.log('Auditing each Aptitude question for math consistency...');

const results = [];

apt.questions.forEach((q, i) => {
  const marked = q.options[q.correctAnswer];
  const exp = q.explanation;
  
  // Look for any notes in explanation like "Wait,", "Error", "typo", "incorrect"
  const suspiciousWords = ['wait', 'typo', 'correction', 'contradict', 'wrong', 'invalid'];
  const hasSuspicious = suspiciousWords.some(w => exp.toLowerCase().includes(w));
  
  if (hasSuspicious) {
    results.push({
      id: q.id,
      topic: q.topic,
      q: q.question,
      marked: marked,
      options: q.options,
      exp: exp
    });
  }
});

console.log('Suspicious explanations count:', results.length);
results.forEach(r => {
  console.log(`\n[${r.id}] (${r.topic})`);
  console.log(`  Question: ${r.q}`);
  console.log(`  Options: ${JSON.stringify(r.options)}`);
  console.log(`  Marked: ${r.marked}`);
  console.log(`  Explanation: ${r.exp}`);
});
