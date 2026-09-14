/**
 * Builder script to generate js/data/promptsData.js
 * Compiles all modular prompt files into a single production data file.
 */
const fs = require('fs');
const path = require('path');

const preservedPrompts = require('./promptBuilders/preservedPrompts.js');
const dsaPrompts = require('./promptBuilders/dsaPrompts.js');
const jsPrompts = require('./promptBuilders/jsPrompts.js');
const reactPrompts = require('./promptBuilders/reactPrompts.js');
const nodeExpressPrompts = require('./promptBuilders/nodeExpressPrompts.js');
const databasePrompts = require('./promptBuilders/databasePrompts.js');
const coreCsPrompts = require('./promptBuilders/coreCsPrompts.js');
const systemDesignPrompts = require('./promptBuilders/systemDesignPrompts.js');
const engineeringPrompts = require('./promptBuilders/engineeringPrompts.js');
const debuggingPrompts = require('./promptBuilders/debuggingPrompts.js');
const aiMlPrompts = require('./promptBuilders/aiMlPrompts.js');
const devopsCloudPrompts = require('./promptBuilders/devopsCloudPrompts.js');
const careerPrompts = require('./promptBuilders/careerPrompts.js');

const PROMPT_CATEGORIES = [
  {
    name: 'Development',
    subcategories: [
      'JavaScript', 'React', 'Node.js', 'Express.js',
      'Python', 'FastAPI', 'HTML/CSS', 'REST API', 'Full Stack Development'
    ]
  },
  {
    name: 'DSA & Interview',
    subcategories: [
      'DSA Practice', 'DSA Debugging', 'Complexity Analysis',
      'LeetCode Hints', 'LeetCode Review', 'Competitive Programming',
      'Interview Questions', 'No-Spoiler Mentorship'
    ]
  },
  {
    name: 'Database',
    subcategories: [
      'SQL', 'PostgreSQL', 'MongoDB', 'DBMS',
      'Database Design', 'Query Optimization'
    ]
  },
  {
    name: 'Core Computer Science',
    subcategories: [
      'OOP', 'Operating Systems', 'Computer Networks',
      'DBMS Concepts', 'Computer Architecture'
    ]
  },
  {
    name: 'Engineering',
    subcategories: [
      'Code Refactoring', 'Clean Code', 'SOLID', 'Design Patterns',
      'System Design', 'API Design', 'Architecture Review',
      'Performance Optimization', 'Security Review', 'Testing', 'Code Review'
    ]
  },
  {
    name: 'DevOps / Cloud',
    subcategories: [
      'Git', 'GitHub', 'Linux', 'Docker',
      'AWS', 'CI/CD', 'Deployment', 'Production Debugging'
    ]
  },
  {
    name: 'AI / ML',
    subcategories: [
      'Python AI/ML', 'Machine Learning', 'Data Analysis',
      'AI Integration', 'LLM Applications', 'Prompt Engineering',
      'RAG', 'AI API Integration'
    ]
  },
  {
    name: 'Career',
    subcategories: [
      'Resume', 'Resume ATS Optimization', 'LinkedIn',
      'Interview Preparation', 'HR Interview', 'Technical Interview',
      'Project Explanation', 'Behavioral Questions', 'Career Roadmap'
    ]
  }
];

const PROMPT_COLLECTIONS = [
  { id: 'all', name: '✨ All Prompts', filterType: 'all', icon: 'apps' },
  { id: 'leetcode-mastery', name: '🔥 LeetCode Mastery', filterType: 'category', target: 'DSA & Interview', icon: 'alt_route' },
  { id: 'js-deep-dive', name: '💻 JavaScript Deep Dive', filterType: 'subcategory', target: 'JavaScript', icon: 'code' },
  { id: 'react-mastery', name: '⚛️ React & Frontend', filterType: 'subcategory', target: 'React', icon: 'web' },
  { id: 'fullstack-dev', name: '🌐 Full Stack Dev', filterType: 'subcategory', target: 'Full Stack Development', icon: 'layers' },
  { id: 'sql-dbms', name: '🗄 SQL & DBMS Interview', filterType: 'category', target: 'Database', icon: 'database' },
  { id: 'core-cs', name: '🧠 Core CS Interview', filterType: 'category', target: 'Core Computer Science', icon: 'memory' },
  { id: 'sys-design', name: '🏗 System Design', filterType: 'subcategory', target: 'System Design', icon: 'account_tree' },
  { id: 'debugging-toolkit', name: '🐛 Debugging Toolkit', filterType: 'useCase', target: 'Debugging', icon: 'pest_control' },
  { id: 'cloud-devops', name: '☁️ Cloud & DevOps', filterType: 'category', target: 'DevOps / Cloud', icon: 'cloud' },
  { id: 'ai-ml-dev', name: '🤖 AI/ML Development', filterType: 'category', target: 'AI / ML', icon: 'smart_toy' },
  { id: 'resume-career', name: '📄 Resume & Career', filterType: 'category', target: 'Career', icon: 'description' },
  { id: 'tech-interview', name: '🎯 Technical Interview', filterType: 'difficulty', target: 'Interview', icon: 'psychology' }
];

const allPromptLists = [
  ...preservedPrompts,
  ...dsaPrompts,
  ...jsPrompts,
  ...reactPrompts,
  ...nodeExpressPrompts,
  ...databasePrompts,
  ...coreCsPrompts,
  ...systemDesignPrompts,
  ...engineeringPrompts,
  ...debuggingPrompts,
  ...aiMlPrompts,
  ...devopsCloudPrompts,
  ...careerPrompts
];

console.log(`Total raw prompts collected: ${allPromptLists.length}`);

// Validation & Normalization
const seenIds = new Set();
const validDifficulties = ['Beginner', 'Easy', 'Intermediate', 'Advanced', 'Interview'];

const normalizedPrompts = allPromptLists.map((p, idx) => {
  if (!p.id || typeof p.id !== 'string') {
    throw new Error(`Prompt at index ${idx} missing valid ID: ${JSON.stringify(p.title)}`);
  }
  if (seenIds.has(p.id)) {
    throw new Error(`Duplicate prompt ID found: ${p.id}`);
  }
  seenIds.add(p.id);

  if (!p.title || p.title.trim().length < 3) {
    throw new Error(`Invalid title for prompt ${p.id}`);
  }
  if (!p.category || !p.subcategory) {
    throw new Error(`Missing category or subcategory for prompt ${p.id}`);
  }
  if (!p.description || p.description.trim().length < 10) {
    throw new Error(`Missing or too short description for prompt ${p.id}`);
  }
  
  const promptText = p.prompt || p.promptText;
  if (!promptText || promptText.trim().length < 30) {
    throw new Error(`Missing or too short prompt text for prompt ${p.id}`);
  }

  // Ensure no old placeholder string remains
  if (promptText.includes('[PASTE YOUR CODE HERE]')) {
    throw new Error(`Prompt ${p.id} still contains legacy placeholder [PASTE YOUR CODE HERE]`);
  }

  // Extract variables if not provided
  let variables = p.variables;
  if (!Array.isArray(variables) || variables.length === 0) {
    const matched = promptText.match(/\{\{[A-Z0-9_]+\}\}/g);
    variables = matched ? Array.from(new Set(matched)) : [];
  }

  // Validate difficulty
  const difficulty = p.difficulty || 'Intermediate';
  if (!validDifficulties.includes(difficulty)) {
    throw new Error(`Invalid difficulty "${difficulty}" for prompt ${p.id}`);
  }

  const tags = Array.isArray(p.tags) && p.tags.length >= 2 ? p.tags : ['prompt', 'developer', p.category.toLowerCase()];

  return {
    id: p.id,
    title: p.title.trim(),
    category: p.category.trim(),
    subcategory: p.subcategory.trim(),
    description: p.description.trim(),
    prompt: promptText.trim(),
    promptText: promptText.trim(), // backward compatibility
    tags: tags,
    difficulty: difficulty,
    useCase: p.useCase || 'General Engineering',
    variables: variables,
    expectedOutput: p.expectedOutput || 'Actionable technical analysis and production-ready code',
    tips: p.tips || 'Customize the variable values before executing in AI Chat for maximal contextual precision.'
  };
});

console.log(`Successfully normalized ${normalizedPrompts.length} prompts.`);

// Code template for js/data/promptsData.js
const fileContent = `/**
 * DevPilot-AI - AI Prompt Library Vault Dataset
 * Static structured dataset containing 130+ engineered developer prompts across 8 core domains.
 */

const PROMPT_CATEGORIES = ${JSON.stringify(PROMPT_CATEGORIES, null, 2)};

const PROMPT_COLLECTIONS = ${JSON.stringify(PROMPT_COLLECTIONS, null, 2)};

const PROMPTS_DATA = ${JSON.stringify(normalizedPrompts, null, 2)};

// Helper functions
function getPromptById(id) {
  return PROMPTS_DATA.find(p => p.id === id) || null;
}

function getRelatedPrompts(currentPrompt, limit = 4) {
  if (!currentPrompt) return [];
  return PROMPTS_DATA
    .filter(p => p.id !== currentPrompt.id)
    .map(p => {
      let score = 0;
      if (p.subcategory === currentPrompt.subcategory) score += 5;
      if (p.category === currentPrompt.category) score += 3;
      if (p.useCase === currentPrompt.useCase) score += 2;
      if (Array.isArray(p.tags) && Array.isArray(currentPrompt.tags)) {
        const overlap = p.tags.filter(t => currentPrompt.tags.includes(t)).length;
        score += overlap * 2;
      }
      return { prompt: p, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.prompt);
}

// Export for browser and Node.js environments
if (typeof window !== 'undefined') {
  window.PROMPT_CATEGORIES = PROMPT_CATEGORIES;
  window.PROMPT_COLLECTIONS = PROMPT_COLLECTIONS;
  window.PROMPTS_DATA = PROMPTS_DATA;
  window.getPromptById = getPromptById;
  window.getRelatedPrompts = getRelatedPrompts;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    PROMPT_CATEGORIES,
    PROMPT_COLLECTIONS,
    PROMPTS_DATA,
    getPromptById,
    getRelatedPrompts
  };
}
`;

const outputPath = path.join(__dirname, '../js/data/promptsData.js');
fs.writeFileSync(outputPath, fileContent, 'utf8');
console.log(`Wrote js/data/promptsData.js successfully (${(fileContent.length / 1024).toFixed(1)} KB)!`);
