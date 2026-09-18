// scratch/findNearDuplicates.js
const reg = require('../js/data/interviewPrep/index.js');
reg.init();

const allQs = reg.getAllQuestions();

console.log('Searching for near-duplicate questions across all 2,170 questions...');

function diceCoefficient(str1, str2) {
  const s1 = str1.toLowerCase().replace(/[^a-z0-9]/g, ' ').replace(/\s+/g, ' ').trim();
  const s2 = str2.toLowerCase().replace(/[^a-z0-9]/g, ' ').replace(/\s+/g, ' ').trim();
  if (s1 === s2) return 1;
  if (s1.length < 2 || s2.length < 2) return 0;
  
  const getBigrams = (str) => {
    const bigrams = new Map();
    for (let i = 0; i < str.length - 1; i++) {
      const bg = str.slice(i, i + 2);
      bigrams.set(bg, (bigrams.get(bg) || 0) + 1);
    }
    return bigrams;
  };
  
  const b1 = getBigrams(s1);
  const b2 = getBigrams(s2);
  let intersection = 0;
  for (let [bg, count] of b1.entries()) {
    if (b2.has(bg)) {
      intersection += Math.min(count, b2.get(bg));
    }
  }
  return (2.0 * intersection) / (s1.length - 1 + s2.length - 1);
}

const nearDupes = [];

for (let i = 0; i < allQs.length; i++) {
  for (let j = i + 1; j < allQs.length; j++) {
    const q1 = allQs[i];
    const q2 = allQs[j];
    // Don't compare if questions are very short or error detection
    if (q1.question.length < 15 || q2.question.length < 15) continue;
    
    const similarity = diceCoefficient(q1.question, q2.question);
    if (similarity >= 0.88) {
      nearDupes.push({
        id1: q1.id,
        cat1: q1.categoryId || q1.category,
        topic1: q1.topic,
        id2: q2.id,
        cat2: q2.categoryId || q2.category,
        topic2: q2.topic,
        similarity: Math.round(similarity * 100),
        q1: q1.question,
        q2: q2.question
      });
    }
  }
}

console.log(`Found ${nearDupes.length} near-duplicate question pairs:`);
nearDupes.forEach(d => {
  console.log(`\n[${d.similarity}% Similar] [${d.id1}] (${d.cat1} - ${d.topic1}) vs [${d.id2}] (${d.cat2} - ${d.topic2})`);
  console.log(`  Q1: ${d.q1}`);
  console.log(`  Q2: ${d.q2}`);
});
