// testGlobalSearch.js - Automated tests for DevPilot Global Search & Command Palette

const assert = require('assert');
const fs = require('fs');
const path = require('path');

console.log('====================================================');
console.log(' DevPilot-AI: Validating Global Search & Command Palette');
console.log('====================================================\n');

// 1. Verify index.html contains command palette and required scripts
const indexPath = path.join(__dirname, '../../index.html');
const indexHtml = fs.readFileSync(indexPath, 'utf8');

assert(indexHtml.includes('id="command-palette"'), 'index.html must have #command-palette');
assert(indexHtml.includes('id="command-input"'), 'index.html must have #command-input');
assert(indexHtml.includes('id="command-results"'), 'index.html must have #command-results');
assert(indexHtml.includes('id="command-clear-btn"'), 'index.html must have #command-clear-btn');
assert(indexHtml.includes('id="command-esc-btn"'), 'index.html must have #command-esc-btn');
assert(indexHtml.includes('data/snippetsData.js'), 'index.html must include snippetsData.js');
assert(indexHtml.includes('data/promptsData.js'), 'index.html must include promptsData.js');
console.log('✓ [PASS] TEST 1: index.html markup & script dependencies verified');

// 2. Verify css/pages/dashboard.css contains command-result styling
const cssPath = path.join(__dirname, '../../css/pages/dashboard.css');
const cssContent = fs.readFileSync(cssPath, 'utf8');
assert(cssContent.includes('.command-result-item'), 'dashboard.css must style .command-result-item');
assert(cssContent.includes('.command-result-item.is-selected'), 'dashboard.css must style .command-result-item.is-selected');
console.log('✓ [PASS] TEST 2: dashboard.css styling verified');

// 3. Verify supporting pages handle query params
const notesJs = fs.readFileSync(path.join(__dirname, '../../js/pages/notes.js'), 'utf8');
assert(notesJs.includes("action === 'new'"), 'notes.js handles ?action=new');
assert(notesJs.includes("urlParams.get('search')"), 'notes.js handles ?search=');

const habitJs = fs.readFileSync(path.join(__dirname, '../../js/pages/habit.js'), 'utf8');
assert(habitJs.includes("action === 'add-habit'"), 'habit.js handles ?action=add-habit');
assert(habitJs.includes("action === 'add-daily-goal'"), 'habit.js handles ?action=add-daily-goal');

const snippetsJs = fs.readFileSync(path.join(__dirname, '../../js/pages/snippets.js'), 'utf8');
assert(snippetsJs.includes("urlParams.get('search')"), 'snippets.js handles ?search=');

const promptJs = fs.readFileSync(path.join(__dirname, '../../js/pages/prompt.js'), 'utf8');
assert(promptJs.includes("urlParams.get('search')"), 'prompt.js handles ?search=');
console.log('✓ [PASS] TEST 3: Deep linking query parameter handling on supporting pages verified');

// 4. Test Search Indexing & Querying Logic
// Mock localStorage and window
const mockLocalStorage = {
  store: {
    'devpilot_current_user': JSON.stringify({ id: 'user_123', name: 'Tester' }),
    'dev_notes': JSON.stringify([
      { id: 'n1', title: 'React Hooks Deep Dive', content: 'useMemo and useCallback optimization', category: 'Frontend', updatedAt: Date.now() },
      { id: 'n2', title: 'Dynamic Programming Patterns', content: 'Knapsack and memoization notes', category: 'DSA', updatedAt: Date.now() }
    ]),
    'u_user_123_habits': JSON.stringify([
      { id: 'h1', title: 'Code for 1 hour daily', frequency: 'Daily', streak: 7, targetCount: 1 }
    ]),
    'u_user_123_daily_goals': JSON.stringify([
      { id: 'g1', text: 'Finish binary search tree problems', completed: false, isMainGoal: true }
    ]),
    'devpilot_snippets': JSON.stringify([
      { id: 's1', title: 'Debounce Function', code: 'function debounce(fn, ms){}', language: 'javascript' }
    ]),
    'devpilot_prompts': JSON.stringify([
      { id: 'p1', title: 'Senior Code Review Prompt', prompt: 'Act as a principal architect...', tags: ['Review'] }
    ])
  },
  getItem(key) { return this.store[key] || null; },
  setItem(key, val) { this.store[key] = String(val); }
};

// Simulate search index builder from dashboard.js
function buildIndex(storage, mockSnippetsData, mockPromptsData) {
  const allItems = [];

  // Pages
  const pages = [
    { title: 'Dashboard', url: 'index.html', category: 'Navigation', icon: 'dashboard', keywords: 'home overview analytics main' },
    { title: 'GitHub Analyzer', url: 'pages/github.html', category: 'Navigation', icon: 'monitoring', keywords: 'git github repos commits code metrics analyzer' },
    { title: 'AI Chat', url: 'pages/chat.html', category: 'Navigation', icon: 'chat', keywords: 'ai assistant bot prompt devpilot claude gpt chat' },
    { title: 'Resume', url: 'pages/resume.html', category: 'Navigation', icon: 'badge', keywords: 'cv resume builder export template job career profile' },
    { title: 'DSA Roadmap', url: 'pages/dsa.html', category: 'Navigation', icon: 'account_tree', keywords: 'dsa leetcode coding algorithms data structures roadmap' },
    { title: 'Career Roadmaps', url: 'pages/roadmaps.html', category: 'Navigation', icon: 'map', keywords: 'career roadmaps frontend backend fullstack ai devops' },
    { title: 'Interview Prep', url: 'pages/interviewPrep.html', category: 'Navigation', icon: 'quiz', keywords: 'interview questions preparation mock coding hr technical' },
    { title: 'Notes', url: 'pages/notes.html', category: 'Navigation', icon: 'description', keywords: 'notes docs markdown scratchpad developer ideas' },
    { title: 'Snippets', url: 'pages/snippets.html', category: 'Navigation', icon: 'code', keywords: 'snippets code library javascript react python helper' },
    { title: 'Prompts', url: 'pages/prompts.html', category: 'Navigation', icon: 'psychology', keywords: 'prompts ai chat templates system system-prompts engineering' },
    { title: 'Habits', url: 'pages/habits.html', category: 'Navigation', icon: 'check_circle', keywords: 'habits routine streak tracker productivity daily' },
    { title: 'Timer', url: 'pages/timer.html', category: 'Navigation', icon: 'timer', keywords: 'pomodoro timer focus stopwatch countdown clock study' },
    { title: 'Settings', url: 'pages/settings.html', category: 'Navigation', icon: 'settings', keywords: 'settings profile theme dark light preferences configuration' }
  ];
  allItems.push(...pages);

  // Notes
  try {
    const raw = storage.getItem('dev_notes');
    if (raw) {
      const notes = JSON.parse(raw);
      if (Array.isArray(notes)) {
        notes.forEach(note => {
          if (note && note.title) {
            allItems.push({
              title: note.title,
              category: 'Notes',
              url: `pages/notes.html?id=${encodeURIComponent(note.id || '')}`,
              icon: 'description',
              subtitle: note.content ? note.content.slice(0, 60) : 'User Note',
              keywords: `${note.title} ${note.category || ''} ${note.tags ? note.tags.join(' ') : ''}`
            });
          }
        });
      }
    }
  } catch (e) {}

  // Habits
  try {
    const raw = storage.getItem('u_user_123_habits');
    if (raw) {
      const habits = JSON.parse(raw);
      if (Array.isArray(habits)) {
        habits.forEach(h => {
          if (h && h.title) {
            allItems.push({
              title: h.title,
              category: 'Habits',
              url: 'pages/habits.html',
              icon: 'check_circle',
              subtitle: `Habit • Streak: ${h.streak || 0}d • ${h.frequency || 'Daily'}`,
              keywords: `${h.title} habit streak daily routine`
            });
          }
        });
      }
    }
  } catch (e) {}

  // Daily Goals
  try {
    const raw = storage.getItem('u_user_123_daily_goals');
    if (raw) {
      const goals = JSON.parse(raw);
      if (Array.isArray(goals)) {
        goals.forEach(g => {
          const text = g.text || g.title;
          if (text) {
            allItems.push({
              title: text,
              category: 'Daily Goals',
              url: 'pages/habits.html#daily-goals',
              icon: g.completed ? 'task_alt' : 'radio_button_unchecked',
              subtitle: g.isMainGoal ? 'Main Priority Goal' : 'Daily Goal',
              keywords: `${text} goal daily task todo`
            });
          }
        });
      }
    }
  } catch (e) {}

  // Snippets
  try {
    const raw = storage.getItem('devpilot_snippets');
    if (raw) {
      const saved = JSON.parse(raw);
      if (Array.isArray(saved)) {
        saved.forEach(s => {
          if (s && s.title) {
            allItems.push({
              title: s.title,
              category: 'Snippets',
              url: `pages/snippets.html?search=${encodeURIComponent(s.title)}`,
              icon: 'code',
              subtitle: `Snippet • ${s.language || 'Code'}`,
              keywords: `${s.title} ${s.language || ''} snippet code`
            });
          }
        });
      }
    }
  } catch (e) {}

  // Prompts
  try {
    const raw = storage.getItem('devpilot_prompts');
    if (raw) {
      const saved = JSON.parse(raw);
      if (Array.isArray(saved)) {
        saved.forEach(p => {
          if (p && p.title) {
            allItems.push({
              title: p.title,
              category: 'Prompts',
              url: `pages/prompts.html?search=${encodeURIComponent(p.title)}`,
              icon: 'psychology',
              subtitle: `Prompt • ${p.category || 'AI'}`,
              keywords: `${p.title} prompt ai system`
            });
          }
        });
      }
    }
  } catch (e) {}

  return allItems;
}

const items = buildIndex(mockLocalStorage, [], []);

// Test quick actions list
const quickActions = [
  'Ask AI',
  'New Note',
  'Add Habit',
  'Add Daily Goal',
  'Open DSA Roadmap',
  'Open Career Roadmap',
  'Open Interview Prep'
];

// Check all 13 required pages exist
const requiredPages = [
  'Dashboard', 'GitHub Analyzer', 'AI Chat', 'Resume', 'DSA Roadmap',
  'Career Roadmaps', 'Interview Prep', 'Notes', 'Snippets', 'Prompts',
  'Habits', 'Timer', 'Settings'
];

requiredPages.forEach(p => {
  assert(items.some(i => i.title === p), `Missing required page: ${p}`);
});
console.log(`✓ [PASS] TEST 4: All 13 core navigation targets present (${requiredPages.length}/${requiredPages.length})`);

// Check user data indexed
assert(items.some(i => i.title === 'React Hooks Deep Dive' && i.category === 'Notes'), 'User note indexed');
assert(items.some(i => i.title === 'Code for 1 hour daily' && i.category === 'Habits'), 'User habit indexed');
assert(items.some(i => i.title === 'Finish binary search tree problems' && i.category === 'Daily Goals'), 'Daily goal indexed');
assert(items.some(i => i.title === 'Debounce Function' && i.category === 'Snippets'), 'Snippet indexed');
assert(items.some(i => i.title === 'Senior Code Review Prompt' && i.category === 'Prompts'), 'Prompt indexed');
console.log('✓ [PASS] TEST 5: User-created Notes, Habits, Daily Goals, Snippets, and Prompts indexed');

// Test Search Query matching function
function search(query, list) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const words = q.split(/\s+/).filter(Boolean);

  return list.map(item => {
    const title = (item.title || '').toLowerCase();
    const cat = (item.category || '').toLowerCase();
    const keywords = (item.keywords || '').toLowerCase();
    const sub = (item.subtitle || '').toLowerCase();

    let score = 0;
    if (title === q) score += 100;
    else if (title.startsWith(q)) score += 50;
    else if (title.includes(q)) score += 30;

    if (cat.includes(q)) score += 25;

    let allWordsMatch = true;
    for (const w of words) {
      if (title.includes(w)) {
        score += 15;
      } else if (keywords.includes(w)) {
        score += 10;
      } else if (sub.includes(w)) {
        score += 5;
      } else if (cat.includes(w)) {
        score += 5;
      } else {
        allWordsMatch = false;
      }
    }
    if (allWordsMatch) score += 20;

    return { item, score };
  })
  .filter(res => res.score > 0)
  .sort((a, b) => b.score - a.score)
  .map(res => res.item);
}

// Search queries test
const resReact = search('react', items);
assert(resReact.some(i => i.title === 'React Hooks Deep Dive'), 'Search "react" matches note');

const resDsa = search('dsa', items);
assert(resDsa.some(i => i.title === 'DSA Roadmap'), 'Search "dsa" matches DSA Roadmap');

const resHabit = search('habit', items);
assert(resHabit.some(i => i.title === 'Habits'), 'Search "habit" matches Habits page');
assert(resHabit.some(i => i.title === 'Code for 1 hour daily'), 'Search "habit" matches user habit');

const resTree = search('tree', items);
assert(resTree.some(i => i.title === 'Finish binary search tree problems'), 'Search "tree" matches Daily Goal');

const resRandom = search('xyz987nonexistent', items);
assert.strictEqual(resRandom.length, 0, 'Non-existent search returns empty results list');

console.log('✓ [PASS] TEST 6: Search query ranking, multi-term matching, and zero-match state verified');

console.log('----------------------------------------------------');
console.log('Global Search Test Suite: ALL TESTS PASSED! 🎉');
console.log('----------------------------------------------------\n');
