/**
 * DevPilot-AI — Automated Validation Test Suite for Code Snippet Vault
 */

const assert = require('assert');
const { 
  SNIPPET_CATEGORIES, 
  SNIPPETS_DATA, 
  getSnippetById, 
  getRelatedSnippets 
} = require('../../js/data/snippetsData.js');

console.log('====================================================');
console.log(' DevPilot-AI: Validating Snippet Vault Dataset     ');
console.log('====================================================\n');

let passed = 0;
let total = 0;

function check(name, fn) {
  total++;
  try {
    fn();
    console.log(`✓ [PASS] ${name}`);
    passed++;
  } catch (err) {
    console.error(`✗ [FAIL] ${name}: ${err.message}`);
  }
}

// 1. Categories structure
check('TEST 1: Major snippet categories exist with subcategories', () => {
  assert.ok(Array.isArray(SNIPPET_CATEGORIES), 'SNIPPET_CATEGORIES must be an array');
  assert.ok(SNIPPET_CATEGORIES.length >= 8, `Expected at least 8 categories, got ${SNIPPET_CATEGORIES.length}`);
  
  const requiredCategories = [
    'DSA', 'Web Development', 'Backend', 'Database',
    'Computer Science', 'Git / Dev Tools', 'Python / AI', 'HTML/CSS'
  ];

  const categoryNames = SNIPPET_CATEGORIES.map(c => c.name);
  requiredCategories.forEach(cat => {
    assert.ok(categoryNames.includes(cat), `Missing required category: ${cat}`);
  });

  SNIPPET_CATEGORIES.forEach(c => {
    assert.ok(c.name && c.name.trim().length > 0, 'Category missing name');
    assert.ok(Array.isArray(c.subcategories) && c.subcategories.length > 0, `Category ${c.name} has no subcategories`);
  });
});

// 2. Preserved original snippets
check('TEST 2: Original snippets s1 through s6 are preserved with complete schema', () => {
  const originalIds = ['s1', 's2', 's3', 's4', 's5', 's6'];
  originalIds.forEach(id => {
    const s = getSnippetById(id);
    assert.ok(s, `Original snippet ${id} was not found!`);
    assert.ok(s.title && s.title.length > 0, `Snippet ${id} missing title`);
    assert.ok(s.code && s.code.length > 0, `Snippet ${id} missing code`);
    assert.ok(s.explanation && s.explanation.length > 0, `Snippet ${id} missing explanation`);
  });
});

// 3. Uniqueness of IDs
check('TEST 3: Every snippet has a globally unique ID', () => {
  const ids = new Set();
  SNIPPETS_DATA.forEach(s => {
    assert.ok(s.id && typeof s.id === 'string', `Invalid ID for snippet: ${JSON.stringify(s.title)}`);
    assert.ok(!ids.has(s.id), `Duplicate snippet ID found: ${s.id}`);
    ids.add(s.id);
  });
});

// 4. Strict Schema Validation for all snippets
check('TEST 4: All snippets adhere to full production schema', () => {
  const validDifficulties = ['Easy', 'Medium', 'Hard'];
  const validCategoryNames = SNIPPET_CATEGORIES.map(c => c.name);

  SNIPPETS_DATA.forEach(s => {
    assert.ok(s.title && s.title.trim().length >= 3, `Invalid or missing title for snippet ${s.id}`);
    assert.ok(validCategoryNames.includes(s.category), `Invalid category "${s.category}" for snippet ${s.id}`);
    assert.ok(s.subcategory && s.subcategory.trim().length > 0, `Missing subcategory for snippet ${s.id}`);
    assert.ok(s.language && s.language.trim().length > 0, `Missing language for snippet ${s.id}`);
    assert.ok(validDifficulties.includes(s.difficulty), `Invalid difficulty "${s.difficulty}" for snippet ${s.id}`);
    assert.ok(s.description && s.description.trim().length >= 10, `Missing or short description for snippet ${s.id}`);
    
    // Code validation
    assert.ok(s.code && s.code.trim().length >= 20, `Missing or too short code block for snippet ${s.id}`);
    assert.ok(!s.code.includes('// TODO') && !s.code.includes('// PLACEHOLDER'), `Snippet ${s.id} contains unfinished placeholder code`);

    // Explanation & complexity
    assert.ok(s.explanation && s.explanation.trim().length >= 10, `Missing explanation for snippet ${s.id}`);
    assert.ok(s.complexity && typeof s.complexity === 'object', `Missing complexity object for snippet ${s.id}`);
    assert.ok(s.complexity.time && s.complexity.time.length > 0, `Missing time complexity for snippet ${s.id}`);
    assert.ok(s.complexity.space && s.complexity.space.length > 0, `Missing space complexity for snippet ${s.id}`);

    // Use cases & common mistakes
    assert.ok(s.useCases && s.useCases.length > 0, `Missing useCases for snippet ${s.id}`);
    assert.ok(s.commonMistakes && s.commonMistakes.length > 0, `Missing commonMistakes for snippet ${s.id}`);

    // Tags
    assert.ok(Array.isArray(s.tags) && s.tags.length >= 2, `Snippet ${s.id} must have at least 2 tags`);
  });
});

// 5. Helper functions: getSnippetById and getRelatedSnippets
check('TEST 5: getSnippetById and getRelatedSnippets function correctly', () => {
  const s1 = getSnippetById('s1');
  assert.strictEqual(s1.id, 's1');
  assert.strictEqual(s1.language, 'JavaScript');

  const invalid = getSnippetById('non_existent_id');
  assert.strictEqual(invalid, null);

  const related = getRelatedSnippets(s1, 4);
  assert.ok(Array.isArray(related), 'getRelatedSnippets must return an array');
  assert.ok(related.length >= 1 && related.length <= 4, `Expected between 1 and 4 related items, got ${related.length}`);
  assert.ok(!related.some(r => r.id === 's1'), 'Related snippets must not include the current snippet');
});

// 6. Search simulation across Title, Code, and Tags
check('TEST 6: Search simulation matches Title, Code, and Tags', () => {
  function search(query) {
    const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
    return SNIPPETS_DATA.filter(s => {
      const titleLower = s.title.toLowerCase();
      const codeLower = s.code.toLowerCase();
      const descLower = s.description.toLowerCase();
      const tagsLower = (s.tags || []).join(' ').toLowerCase();
      const subcatLower = (s.subcategory || '').toLowerCase();
      const hayStack = `${titleLower} ${codeLower} ${descLower} ${tagsLower} ${subcatLower}`;

      return tokens.every(token => hayStack.includes(token));
    });
  }

  // Search by code token
  const debounceResults = search('clearTimeout timerId');
  assert.ok(debounceResults.length >= 1, 'Search for code token "clearTimeout timerId" should return snippets');
  assert.ok(debounceResults.some(s => s.id === 's1'), 'Search should return snippet s1');

  // Search by tag
  const graphResults = search('dijkstra');
  assert.ok(graphResults.length >= 1, 'Search for tag "dijkstra" should return snippets');
  assert.ok(graphResults.some(s => s.id === 's6'), 'Search should return snippet s6');

  // Search by title token
  const fastIoResults = search('Fast I/O');
  assert.ok(fastIoResults.length >= 1, 'Search for title "Fast I/O" should return snippet s2');
});

// 7. Domain Coverage Check
check('TEST 7: Every one of the 8 major domains has ample high-quality snippets', () => {
  const counts = {};
  SNIPPET_CATEGORIES.forEach(c => { counts[c.name] = 0; });
  SNIPPETS_DATA.forEach(s => {
    counts[s.category] = (counts[s.category] || 0) + 1;
  });

  SNIPPET_CATEGORIES.forEach(c => {
    assert.ok(counts[c.name] >= 3, `Domain ${c.name} has only ${counts[c.name]} snippets; expected at least 3`);
  });
});

// 8. Multi-Language Coverage Check
check('TEST 8: Wide programming language coverage across C++, JS, Python, SQL, HTML/CSS, Docker, Bash', () => {
  const langs = new Set(SNIPPETS_DATA.map(s => s.language));
  const expectedLangs = ['C++', 'JavaScript', 'Python', 'SQL', 'HTML/CSS', 'Docker', 'Bash'];

  expectedLangs.forEach(lang => {
    assert.ok(langs.has(lang), `Missing language representation for: ${lang}`);
  });
});

// 9. Saved & Recent Filter Logic Simulation
check('TEST 9: Saved and Recently Viewed filtering and MRU ordering logic', () => {
  const mockSavedIds = new Set(['s1', 's2', 's6']);
  const savedFiltered = SNIPPETS_DATA.filter(s => mockSavedIds.has(s.id));
  assert.strictEqual(savedFiltered.length, 3, 'Saved filter should return exact matching items');

  const mockRecentIds = ['dsa_two_pointers_3sum', 's5', 's1'];
  const recentFiltered = SNIPPETS_DATA.filter(s => mockRecentIds.includes(s.id));
  assert.strictEqual(recentFiltered.length, 3, 'Recent filter should find all recently viewed snippets');

  // Verify MRU sorting
  recentFiltered.sort((a, b) => mockRecentIds.indexOf(a.id) - mockRecentIds.indexOf(b.id));
  assert.strictEqual(recentFiltered[0].id, 'dsa_two_pointers_3sum');
  assert.strictEqual(recentFiltered[1].id, 's5');
  assert.strictEqual(recentFiltered[2].id, 's1');
});

console.log(`\nResults: ${passed} / ${total} tests passed.`);
if (passed !== total) {
  process.exit(1);
}
