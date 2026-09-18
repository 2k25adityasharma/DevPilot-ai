// scratch/auditSqlDbms.js
const reg = require('../js/data/interviewPrep/index.js');
reg.init();

const sql = reg.getCategory('sql');
const dbms = reg.getCategory('dbms');

console.log('Auditing SQL (150 Qs) and DBMS (140 Qs)...');

const dialectDependent = [];
const sqlSemanticsCheck = [];

sql.questions.forEach(q => {
  const marked = q.options[q.correctAnswer];
  const text = q.question;
  const exp = q.explanation;
  
  // Check for dialect-specific keywords without declaring dialect
  const dialects = ['mysql', 'postgres', 'postgresql', 'oracle', 'sql server', 'sqlite'];
  const hasDialectWord = dialects.some(d => text.toLowerCase().includes(d) || exp.toLowerCase().includes(d));
  
  // If uses LIMIT / TOP without dialect specification in question
  if (text.includes('TOP ') && !hasDialectWord) {
    dialectDependent.push({ id: q.id, topic: q.topic, q: text, reason: 'Uses TOP without specifying T-SQL / SQL Server' });
  }
  if ((text.includes('NVL') || text.includes('IFNULL')) && !hasDialectWord) {
    dialectDependent.push({ id: q.id, topic: q.topic, q: text, reason: 'Uses NVL / IFNULL without specifying dialect' });
  }

  // Check NULL equality check question:
  // e.g. "WHERE col = NULL" vs "WHERE col IS NULL"
  if (text.includes('NULL') && marked.includes('= NULL')) {
    sqlSemanticsCheck.push({ id: q.id, topic: q.topic, q: text, marked, issue: 'Marked answer uses = NULL instead of IS NULL' });
  }
});

console.log(`Dialect dependent questions without context: ${dialectDependent.length}`);
dialectDependent.forEach(d => console.log(`[${d.id}] ${d.reason}: ${d.q.slice(0, 100)}`));

console.log(`SQL semantics issues: ${sqlSemanticsCheck.length}`);
sqlSemanticsCheck.forEach(s => console.log(`[${s.id}] ${s.issue}: ${s.q}`));
