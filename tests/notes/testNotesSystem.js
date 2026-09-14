/**
 * Automated Test Suite for DevPilot-AI Developer Notes System
 * Verifies Categories, Subcategories, Starter Knowledge Base,
 * Search, Filtering, and Data Schema Integrity.
 */

const assert = require('assert');
const path = require('path');
const {
  NOTE_CATEGORIES,
  DEFAULT_NOTES,
  getCategoryById,
  getCategoryByName,
  getSubcategoriesForCategory,
  getCategoryColorClass,
  getCategoryShortName
} = require('../../js/data/notesData.js');

let passedTests = 0;
let totalTests = 0;

function test(description, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  PASS: ${description}`);
    passedTests++;
  } catch (err) {
    console.error(`  FAIL: ${description}`);
    console.error(`    ${err.message}`);
  }
}

console.log('====================================================');
console.log('Running DevPilot-AI Developer Notes System Test Suite');
console.log('====================================================\n');

// 1. Category System Verification
console.log('1. Category System Verification:');

test('Exactly 27 categories are registered', () => {
  assert.strictEqual(NOTE_CATEGORIES.length, 27, `Expected 27 categories, found ${NOTE_CATEGORIES.length}`);
});

const REQUIRED_CATEGORIES = [
  'DSA & Problem Solving',
  'C++',
  'JavaScript',
  'Web Development',
  'React',
  'Node.js & Express',
  'Backend Development',
  'SQL',
  'DBMS',
  'PostgreSQL',
  'Operating Systems',
  'Computer Networks',
  'OOP',
  'System Design',
  'Computer Science Fundamentals',
  'Aptitude',
  'English / Communication',
  'AI / ML',
  'Python',
  'Git & GitHub',
  'Linux',
  'Docker',
  'AWS / Cloud',
  'Interview Preparation',
  'Resume / Career',
  'Projects',
  'General Concepts'
];

test('All 27 required roadmap category names are present', () => {
  const categoryNames = new Set(NOTE_CATEGORIES.map(c => c.name));
  for (const cat of REQUIRED_CATEGORIES) {
    assert.ok(categoryNames.has(cat), `Missing required category: ${cat}`);
  }
});

test('Each category has a valid shortName, id, colorClass, and non-empty subcategories', () => {
  for (const cat of NOTE_CATEGORIES) {
    assert.ok(cat.id && typeof cat.id === 'string', `Category missing id: ${cat.name}`);
    assert.ok(cat.shortName && typeof cat.shortName === 'string', `Category missing shortName: ${cat.name}`);
    assert.ok(cat.colorClass && typeof cat.colorClass === 'string', `Category missing colorClass: ${cat.name}`);
    assert.ok(Array.isArray(cat.subcategories) && cat.subcategories.length > 0, `Category missing subcategories: ${cat.name}`);
  }
});

// 2. Subcategory Mappings Verification
console.log('\n2. Subcategories Verification:');

test('DSA has required subcategories', () => {
  const dsa = getCategoryByName('DSA & Problem Solving');
  const expected = ['Arrays', 'Strings', 'Sliding Window', 'Two Pointers', 'Binary Search', 'Trees', 'Heap / Priority Queue', 'Dynamic Programming'];
  for (const sub of expected) {
    assert.ok(dsa.subcategories.includes(sub), `DSA missing subcategory: ${sub}`);
  }
});

test('SQL has required subcategories', () => {
  const sql = getCategoryByName('SQL');
  const expected = ['SELECT', 'WHERE', 'GROUP BY', 'HAVING', 'JOINs', 'Subqueries', 'CTE', 'Window Functions'];
  for (const sub of expected) {
    assert.ok(sql.subcategories.includes(sub), `SQL missing subcategory: ${sub}`);
  }
});

test('DBMS has required subcategories', () => {
  const dbms = getCategoryByName('DBMS');
  const expected = ['Normalization', 'ACID', 'Transactions', 'Concurrency Control', 'Deadlocks', 'Indexing', 'B-Trees'];
  for (const sub of expected) {
    assert.ok(dbms.subcategories.includes(sub), `DBMS missing subcategory: ${sub}`);
  }
});

test('Aptitude has required subcategories', () => {
  const apt = getCategoryByName('Aptitude');
  const expected = ['Percentages', 'Profit & Loss', 'Ratio & Proportion', 'Average', 'Time & Work', 'Time Speed Distance'];
  for (const sub of expected) {
    assert.ok(apt.subcategories.includes(sub), `Aptitude missing subcategory: ${sub}`);
  }
});

// 3. Preservation of Original Notes
console.log('\n3. Preserved Original Notes Verification:');

test('The 6 original notes exist and have preserved IDs (n1 to n6)', () => {
  const ids = new Set(DEFAULT_NOTES.map(n => n.id));
  assert.ok(ids.has('n1'), 'Missing n1: Sliding Window');
  assert.ok(ids.has('n2'), 'Missing n2: React Concurrent Mode');
  assert.ok(ids.has('n3'), 'Missing n3: CAP Theorem');
  assert.ok(ids.has('n4'), 'Missing n4: JavaScript Event Loop');
  assert.ok(ids.has('n5'), 'Missing n5: Morris Traversal');
  assert.ok(ids.has('n6'), 'Missing n6: B-Trees vs LSM Trees');
});

test('Original notes are mapped into appropriate new categories and subcategories', () => {
  const n1 = DEFAULT_NOTES.find(n => n.id === 'n1');
  assert.strictEqual(n1.category, 'DSA & Problem Solving');
  assert.strictEqual(n1.subcategory, 'Sliding Window');

  const n2 = DEFAULT_NOTES.find(n => n.id === 'n2');
  assert.strictEqual(n2.category, 'React');

  const n3 = DEFAULT_NOTES.find(n => n.id === 'n3');
  assert.strictEqual(n3.category, 'System Design');

  const n4 = DEFAULT_NOTES.find(n => n.id === 'n4');
  assert.strictEqual(n4.category, 'JavaScript');

  const n5 = DEFAULT_NOTES.find(n => n.id === 'n5');
  assert.strictEqual(n5.category, 'DSA & Problem Solving');

  const n6 = DEFAULT_NOTES.find(n => n.id === 'n6');
  assert.strictEqual(n6.category, 'DBMS');
});

// 4. Starter Notes Quality & Technical Structure
console.log('\n4. Starter Notes Quality & Technical Structure:');

test('All starter notes have valid schema fields', () => {
  console.log(`    Total starter notes in vault: ${DEFAULT_NOTES.length}`);
  assert.ok(DEFAULT_NOTES.length >= 40, `Expected at least 40 starter notes, found ${DEFAULT_NOTES.length}`);
  for (const n of DEFAULT_NOTES) {
    assert.ok(n.id && typeof n.id === 'string', `Note missing id: ${JSON.stringify(n.title)}`);
    assert.ok(n.title && typeof n.title === 'string', `Note missing title: ${n.id}`);
    assert.ok(n.category && typeof n.category === 'string', `Note missing category: ${n.id}`);
    assert.ok(n.subcategory && typeof n.subcategory === 'string', `Note missing subcategory: ${n.id}`);
    assert.ok(Array.isArray(n.tags) && n.tags.length > 0, `Note missing tags: ${n.id}`);
    assert.ok(n.content && typeof n.content === 'string' && n.content.length > 50, `Note content too short: ${n.id}`);
    assert.ok(n.date && typeof n.date === 'string', `Note missing date: ${n.id}`);
  }
});

test('Notes include a QUICK REVISION section', () => {
  for (const n of DEFAULT_NOTES) {
    assert.ok(n.content.includes('QUICK REVISION'), `Note ${n.title} (${n.id}) missing QUICK REVISION`);
  }
});

test('High-yield interview concepts are tagged isInterviewImportant', () => {
  const interviewNotes = DEFAULT_NOTES.filter(n => n.isInterviewImportant);
  assert.ok(interviewNotes.length >= 10, `Expected at least 10 interview important notes, found ${interviewNotes.length}`);
  
  // Verify specific high-yield ones
  const titles = interviewNotes.map(n => n.title.toLowerCase());
  assert.ok(titles.some(t => t.includes('sliding window')), 'Sliding window should be interview important');
  assert.ok(titles.some(t => t.includes('event loop')), 'Event loop should be interview important');
  assert.ok(titles.some(t => t.includes('b-tree')), 'Indexing should be interview important');
  assert.ok(titles.some(t => t.includes('solid')), 'SOLID should be interview important');
  assert.ok(titles.some(t => t.includes('profit')), 'Profit & Loss should be interview important');
});

// 5. Search Engine & Multi-Field Query Simulation
console.log('\n5. Search Engine Simulation:');

function searchNotes(notes, { category = 'All', interviewOnly = false, query = '' }) {
  const q = query.toLowerCase().trim();
  return notes.filter(n => {
    if (category !== 'All') {
      const matchCat = NOTE_CATEGORIES.find(c => c.name.toLowerCase() === category.toLowerCase() || c.shortName.toLowerCase() === category.toLowerCase());
      const targetCatName = matchCat ? matchCat.name.toLowerCase() : category.toLowerCase();
      if ((n.category || '').toLowerCase() !== targetCatName) {
        return false;
      }
    }
    if (interviewOnly && !n.isInterviewImportant) {
      return false;
    }
    if (q) {
      const terms = q.split(/\s+/).filter(Boolean);
      const tagsStr = Array.isArray(n.tags) ? n.tags.join(' ') : (n.tags || '');
      const searchable = `${n.title || ''} ${n.content || ''} ${n.category || ''} ${n.subcategory || ''} ${tagsStr}`.toLowerCase();

      const matchesTerms = terms.every(term => searchable.includes(term));
      if (!matchesTerms) {
        return false;
      }
    }
    return true;
  });
}

test('Search "profit loss" finds Aptitude -> Profit & Loss notes', () => {
  const res = searchNotes(DEFAULT_NOTES, { query: 'profit loss' });
  assert.ok(res.length > 0, 'No notes found for "profit loss"');
  assert.strictEqual(res[0].category, 'Aptitude');
});

test('Search "normalization" finds DBMS -> Normalization notes', () => {
  const res = searchNotes(DEFAULT_NOTES, { query: 'normalization' });
  assert.ok(res.length > 0, 'No notes found for "normalization"');
  assert.strictEqual(res[0].category, 'DBMS');
});

test('Search "event loop" finds JavaScript notes', () => {
  const res = searchNotes(DEFAULT_NOTES, { query: 'event loop' });
  assert.ok(res.length > 0, 'No notes found for "event loop"');
  assert.strictEqual(res[0].category, 'JavaScript');
});

test('Search "join" finds SQL JOIN notes', () => {
  const res = searchNotes(DEFAULT_NOTES, { query: 'join' });
  assert.ok(res.length > 0, 'No notes found for "join"');
  assert.ok(res.some(n => n.category === 'SQL'));
});

test('Search "binary search" finds DSA notes', () => {
  const res = searchNotes(DEFAULT_NOTES, { query: 'binary search' });
  assert.ok(res.length > 0, 'No notes found for "binary search"');
  assert.strictEqual(res[0].category, 'DSA & Problem Solving');
});

test('Combined: Category = DBMS and Search = "index" returns only DBMS indexing notes', () => {
  const res = searchNotes(DEFAULT_NOTES, { category: 'DBMS', query: 'index' });
  assert.ok(res.length > 0, 'No notes found for Category=DBMS & Query=index');
  for (const n of res) {
    assert.strictEqual(n.category, 'DBMS');
  }
});

test('Combined: Interview Only + Category = Operating Systems', () => {
  const res = searchNotes(DEFAULT_NOTES, { category: 'Operating Systems', interviewOnly: true });
  assert.ok(res.length > 0, 'No interview important notes in OS');
  for (const n of res) {
    assert.strictEqual(n.category, 'Operating Systems');
    assert.strictEqual(n.isInterviewImportant, true);
  }
});

test('Tag search finds notes by hashtag keyword', () => {
  const res = searchNotes(DEFAULT_NOTES, { query: 'leetcode' });
  assert.ok(res.length > 0, 'Expected to find notes with tag "leetcode"');
  assert.ok(res.some(n => n.tags.includes('leetcode')));
});

// 6. Storage Lifecycle & Persistence Simulation
console.log('\n6. Storage Lifecycle & Persistence Simulation:');

test('Migration preserves legacy user notes with old tag property', () => {
  const legacyStorage = [
    {
      id: 'custom_old_note_1',
      title: 'My Custom Graph Note',
      tag: 'DSA',
      content: 'Custom graph content',
      date: '2026-01-01'
    }
  ];

  // Emulate initializeNotes logic
  const existingIds = new Set();
  const migrated = legacyStorage.map(n => {
    existingIds.add(n.id);
    let cat = n.category;
    if (!cat && n.tag) {
      switch (n.tag.toUpperCase()) {
        case 'DSA': cat = 'DSA & Problem Solving'; break;
        case 'WEBDEV': cat = 'Web Development'; break;
        case 'CONCEPTS': cat = 'System Design'; break;
        default: cat = 'General Concepts'; break;
      }
    }
    return {
      ...n,
      category: cat,
      subcategory: n.subcategory || 'General',
      difficulty: n.difficulty || '',
      isInterviewImportant: Boolean(n.isInterviewImportant),
      tags: n.tags || [n.tag.toLowerCase()],
      date: n.date
    };
  });

  DEFAULT_NOTES.forEach(seed => {
    if (!existingIds.has(seed.id)) {
      migrated.push(seed);
    }
  });

  const custom = migrated.find(n => n.id === 'custom_old_note_1');
  assert.ok(custom, 'Custom user note must be preserved');
  assert.strictEqual(custom.category, 'DSA & Problem Solving');
  assert.strictEqual(migrated.length, DEFAULT_NOTES.length + 1);
});

test('Creating, updating, and deleting notes in state maintains consistency', () => {
  let simulatedNotes = [...DEFAULT_NOTES];

  // 1. Create
  const newNote = {
    id: 'test_user_note_99',
    title: 'Sliding Window Maximum (LeetCode #239)',
    category: 'DSA & Problem Solving',
    subcategory: 'Sliding Window',
    tags: ['dsa', 'sliding-window', 'monotonic-queue'],
    difficulty: 'Hard',
    isInterviewImportant: true,
    content: '### Concept\nMonotonic deque.\n\n### QUICK REVISION\n- Linear time.',
    date: '2026-09-14'
  };
  simulatedNotes.unshift(newNote);
  assert.strictEqual(simulatedNotes[0].id, 'test_user_note_99');

  // Search finds newly created note
  const searchFound = searchNotes(simulatedNotes, { query: 'monotonic-queue' });
  assert.strictEqual(searchFound.length, 1);
  assert.strictEqual(searchFound[0].title, 'Sliding Window Maximum (LeetCode #239)');

  // 2. Edit
  const editIdx = simulatedNotes.findIndex(n => n.id === 'test_user_note_99');
  simulatedNotes[editIdx].title = 'Sliding Window Maximum (Monotonic Queue Optimal)';
  assert.strictEqual(simulatedNotes[editIdx].title, 'Sliding Window Maximum (Monotonic Queue Optimal)');

  // 3. Delete
  simulatedNotes = simulatedNotes.filter(n => n.id !== 'test_user_note_99');
  assert.strictEqual(simulatedNotes.some(n => n.id === 'test_user_note_99'), false);
  assert.strictEqual(simulatedNotes.length, DEFAULT_NOTES.length);
});

console.log('\n====================================================');
console.log(`Test Results: ${passedTests} passed, ${totalTests - passedTests} failed, Total: ${totalTests}`);
console.log('====================================================');

if (passedTests === totalTests) {
  console.log('All tests passed successfully!');
  process.exit(0);
} else {
  console.error('Some tests failed.');
  process.exit(1);
}
