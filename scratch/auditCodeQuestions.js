// scratch/auditCodeQuestions.js
const reg = require('../js/data/interviewPrep/index.js');
reg.init();

const allQs = reg.getAllQuestions();

console.log('Finding and inspecting all code-based questions...');

const codeQs = [];

allQs.forEach(q => {
  const isCode = q.question.includes('```') || 
                 q.question.includes('void ') || 
                 q.question.includes('int ') || 
                 q.question.includes('def ') || 
                 q.question.includes('function') || 
                 q.question.includes('SELECT ') || 
                 q.question.includes('class ') ||
                 q.question.includes('for(') || 
                 q.question.includes('while(') ||
                 q.question.includes('Output') ||
                 q.question.includes('output of');
  if (isCode) {
    codeQs.push({
      id: q.id,
      category: q.categoryId || q.category,
      topic: q.topic,
      question: q.question,
      markedAnswer: q.options[q.correctAnswer],
      explanation: q.explanation
    });
  }
});

console.log(`Found ${codeQs.length} code-related questions.`);

// Check for any JavaScript snippets that can be evaluated directly
const jsSnippetEvalIssues = [];

codeQs.forEach(c => {
  // If question asks "What is the output of the following JavaScript code?"
  if (c.question.toLowerCase().includes('javascript') && (c.question.includes('console.log') || c.question.includes('typeof') || c.question.includes('==='))) {
    // Try to extract snippet between backticks or code markers
    const codeMatch = c.question.match(/```(?:js|javascript)?\s*([\s\S]*?)```/) || c.question.match(/`([^`]+)`/);
    if (codeMatch) {
      const snippet = codeMatch[1].trim();
      try {
        // Run safely in an isolated VM if it's pure logic
        const vm = require('vm');
        let captured = [];
        const sandbox = {
          console: { log: (...args) => captured.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')) }
        };
        vm.createContext(sandbox);
        // Only run if not infinite loop or dom
        if (!snippet.includes('document') && !snippet.includes('window') && !snippet.includes('prompt')) {
          vm.runInContext(snippet, sandbox, { timeout: 100 });
          const actualOutput = captured.join('\n').trim();
          if (actualOutput && !c.markedAnswer.includes(actualOutput) && !c.explanation.includes(actualOutput)) {
            jsSnippetEvalIssues.push({
              id: c.id,
              snippet,
              actualOutput,
              markedAnswer: c.markedAnswer,
              explanation: c.explanation
            });
          }
        }
      } catch (err) {
        // Snippet might have intentional syntax errors or be pseudo-code
      }
    }
  }
});

console.log(`JS snippet discrepancies: ${jsSnippetEvalIssues.length}`);
jsSnippetEvalIssues.forEach(j => {
  console.log(`\n[${j.id}] Snippet:\n${j.snippet}`);
  console.log(`  Actual output: "${j.actualOutput}"`);
  console.log(`  Marked answer: "${j.markedAnswer}"`);
});
