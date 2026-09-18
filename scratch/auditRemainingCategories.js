// scratch/auditRemainingCategories.js
const reg = require('../js/data/interviewPrep/index.js');
reg.init();

const catIds = [
  'web_development',
  'git_version_control',
  'cloud_devops',
  'ai_machine_learning',
  'system_design',
  'communication',
  'hrBehavioral'
];

console.log('Auditing remaining 7 categories (630 questions)...');

catIds.forEach(id => {
  const cat = reg.getCategory(id);
  if (!cat) {
    console.log(`Missing category: ${id}`);
    return;
  }
  let questionCount = (cat.questions || []).length;
  console.log(`Category: ${cat.title} (${id}) - ${questionCount} Qs`);

  // Check every question in category
  (cat.questions || []).forEach(q => {
    const marked = q.options[q.correctAnswer];
    const exp = q.explanation;
    
    // Check if options contains something like "Both A and B" or "All of the above"
    // and whether option shuffling or placement could affect it
    q.options.forEach((opt, idx) => {
      if (/both\s+[A-D]\s+and\s+[A-D]/i.test(opt) || /all\s+of\s+the\s+above/i.test(opt) || /none\s+of\s+the\s+above/i.test(opt)) {
        console.log(`  [Letter Reference in Option] ${q.id} (${q.topic}): Option ${idx} has "${opt}"`);
      }
    });
  });
});
