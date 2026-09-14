/**
 * DevPilot-AI — Automated Validation Test Suite for AI Prompt Vault
 */

const assert = require('assert');
const {
  PROMPT_CATEGORIES,
  PROMPT_COLLECTIONS,
  PROMPTS_DATA,
  getPromptById,
  getRelatedPrompts
} = require('../../js/data/promptsData.js');

console.log('====================================================');
console.log(' DevPilot-AI: Validating AI Prompt Vault Dataset   ');
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

// 1. Categories & Subcategories
check('TEST 1: Major prompt categories and subcategories exist', () => {
  assert.ok(Array.isArray(PROMPT_CATEGORIES), 'PROMPT_CATEGORIES must be an array');
  assert.ok(PROMPT_CATEGORIES.length >= 8, `Expected at least 8 domains, got ${PROMPT_CATEGORIES.length}`);

  const requiredDomains = [
    'Development', 'DSA & Interview', 'Database',
    'Core Computer Science', 'Engineering', 'DevOps / Cloud',
    'AI / ML', 'Career'
  ];

  const categoryNames = PROMPT_CATEGORIES.map(c => c.name);
  requiredDomains.forEach(domain => {
    assert.ok(categoryNames.includes(domain), `Missing required domain: ${domain}`);
  });

  PROMPT_CATEGORIES.forEach(c => {
    assert.ok(c.name && c.name.trim().length > 0, 'Category missing name');
    assert.ok(Array.isArray(c.subcategories) && c.subcategories.length > 0, `Category ${c.name} has no subcategories`);
  });
});

// 2. Curated Preset Collections
check('TEST 2: Preset prompt collections are properly configured', () => {
  assert.ok(Array.isArray(PROMPT_COLLECTIONS), 'PROMPT_COLLECTIONS must be an array');
  assert.ok(PROMPT_COLLECTIONS.length >= 10, `Expected at least 10 curated collections, got ${PROMPT_COLLECTIONS.length}`);

  PROMPT_COLLECTIONS.forEach(col => {
    assert.ok(col.id && typeof col.id === 'string', 'Collection missing id');
    assert.ok(col.name && typeof col.name === 'string', 'Collection missing name');
    assert.ok(['all', 'category', 'subcategory', 'useCase', 'difficulty'].includes(col.filterType), `Invalid filterType: ${col.filterType}`);
  });
});

// 3. Preserved Original Prompts
check('TEST 3: Original prompts p1 to p6 are preserved and enriched without legacy placeholders', () => {
  const originalIds = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6'];

  originalIds.forEach(id => {
    const p = getPromptById(id);
    assert.ok(p, `Original prompt ${id} not found in PROMPTS_DATA!`);
    assert.ok(p.title && p.title.length > 0, `Prompt ${id} missing title`);
    assert.ok(p.prompt && p.prompt.length > 0, `Prompt ${id} missing prompt body`);
    assert.ok(!p.prompt.includes('[PASTE YOUR CODE HERE]'), `Prompt ${id} contains legacy placeholder [PASTE YOUR CODE HERE]`);
    assert.ok(Array.isArray(p.variables) && p.variables.length > 0, `Prompt ${id} should have extracted variables`);
  });
});

// 4. Unique IDs Constraint
check('TEST 4: Every prompt has a globally unique ID', () => {
  const ids = new Set();
  PROMPTS_DATA.forEach(p => {
    assert.ok(p.id && typeof p.id === 'string', `Invalid ID for prompt: ${p.title}`);
    assert.ok(!ids.has(p.id), `Duplicate prompt ID found: ${p.id}`);
    ids.add(p.id);
  });
});

// 5. Strict Schema Validation for all prompts
check('TEST 5: All 140+ prompts adhere to strict production schema', () => {
  const validDifficulties = ['Beginner', 'Easy', 'Intermediate', 'Advanced', 'Interview'];
  const validCategoryNames = PROMPT_CATEGORIES.map(c => c.name);

  assert.ok(PROMPTS_DATA.length >= 120, `Expected at least 120 prompts, got ${PROMPTS_DATA.length}`);

  PROMPTS_DATA.forEach(p => {
    assert.ok(p.title && p.title.trim().length >= 3, `Invalid or missing title for prompt ${p.id}`);
    assert.ok(validCategoryNames.includes(p.category), `Invalid category "${p.category}" for prompt ${p.id}`);
    assert.ok(p.subcategory && p.subcategory.trim().length > 0, `Missing subcategory for prompt ${p.id}`);
    assert.ok(validDifficulties.includes(p.difficulty), `Invalid difficulty "${p.difficulty}" for prompt ${p.id}`);
    assert.ok(p.description && p.description.trim().length >= 10, `Description too short for prompt ${p.id}`);
    
    // Prompt text & backwards compatibility
    assert.ok(p.prompt && p.prompt.trim().length >= 30, `Prompt text too short for prompt ${p.id}`);
    assert.strictEqual(p.prompt, p.promptText, `prompt and promptText must match for prompt ${p.id}`);

    // No lazy placeholders
    assert.ok(!p.prompt.includes('[PASTE YOUR CODE HERE]'), `Prompt ${p.id} contains lazy placeholder`);
    assert.ok(!p.prompt.includes('// TODO'), `Prompt ${p.id} contains TODO`);

    // Variables validation
    assert.ok(Array.isArray(p.variables), `Prompt ${p.id} variables must be an array`);
    p.variables.forEach(v => {
      assert.ok(/^\{\{[A-Z0-9_]+\}\}$/.test(v), `Invalid variable format "${v}" in prompt ${p.id}`);
    });

    // UseCase & ExpectedOutput
    assert.ok(p.useCase && p.useCase.trim().length > 0, `Missing useCase for prompt ${p.id}`);
    assert.ok(p.expectedOutput && p.expectedOutput.trim().length > 0, `Missing expectedOutput for prompt ${p.id}`);

    // Tags
    assert.ok(Array.isArray(p.tags) && p.tags.length >= 2, `Prompt ${p.id} must have at least 2 tags`);
  });
});

// 6. Helper functions: getPromptById and getRelatedPrompts
check('TEST 6: getPromptById and getRelatedPrompts return relevant recommendations', () => {
  const p1 = getPromptById('p1');
  assert.strictEqual(p1.id, 'p1');

  const invalid = getPromptById('non_existent_prompt_id');
  assert.strictEqual(invalid, null);

  const related = getRelatedPrompts(p1, 4);
  assert.ok(Array.isArray(related), 'getRelatedPrompts must return an array');
  assert.ok(related.length >= 1 && related.length <= 4, `Expected 1-4 related prompts, got ${related.length}`);
  assert.ok(!related.some(r => r.id === 'p1'), 'Related prompts must not include the current prompt');
});

// 7. Search Simulation across Title, Description, Body, and Tags
check('TEST 7: Multi-token search simulation correctly matches keywords', () => {
  function search(query) {
    const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
    return PROMPTS_DATA.filter(p => {
      const titleLower = p.title.toLowerCase();
      const descLower = p.description.toLowerCase();
      const bodyLower = (p.prompt || p.promptText || '').toLowerCase();
      const tagsLower = (p.tags || []).join(' ').toLowerCase();
      const subcatLower = (p.subcategory || '').toLowerCase();
      const varsLower = (p.variables || []).join(' ').toLowerCase();

      const haystack = `${titleLower} ${descLower} ${bodyLower} ${tagsLower} ${subcatLower} ${varsLower}`;
      return tokens.every(token => haystack.includes(token));
    });
  }

  // Search "promise"
  const promiseResults = search('promise');
  assert.ok(promiseResults.length >= 3, `Expected multiple promise prompts, got ${promiseResults.length}`);

  // Search "leetcode"
  const leetcodeResults = search('leetcode');
  assert.ok(leetcodeResults.length >= 5, `Expected multiple leetcode prompts, got ${leetcodeResults.length}`);

  // Search "docker"
  const dockerResults = search('docker');
  assert.ok(dockerResults.length >= 2, `Expected multiple docker prompts, got ${dockerResults.length}`);

  // Search "system design"
  const sysDesignResults = search('system design');
  assert.ok(sysDesignResults.length >= 5, `Expected multiple system design prompts, got ${sysDesignResults.length}`);
});

// 8. Variable Substitution Engine
check('TEST 8: Variable detection and string substitution engine', () => {
  const prompt = getPromptById('p1');
  assert.ok(prompt.variables.includes('{{CODE}}'));

  const customValues = {
    '{{CODE}}': 'const x = await fetchUser();',
    '{{ERROR_OR_SYMPTOM}}': 'Unhandled rejection in background thread'
  };

  let substituted = prompt.prompt;
  Object.entries(customValues).forEach(([varName, val]) => {
    substituted = substituted.split(varName).join(val);
  });

  assert.ok(substituted.includes('const x = await fetchUser();'), 'Substituted text should contain custom code');
  assert.ok(substituted.includes('Unhandled rejection in background thread'), 'Substituted text should contain custom symptom');
  assert.ok(!substituted.includes('{{CODE}}'), 'Substituted text should have no raw {{CODE}} left');
});

// 9. Preset Collections Coverage
check('TEST 9: Every preset collection matches relevant items', () => {
  PROMPT_COLLECTIONS.forEach(col => {
    if (col.id === 'all') return;
    const matches = PROMPTS_DATA.filter(p => {
      if (col.filterType === 'category') return p.category.toLowerCase() === col.target.toLowerCase();
      if (col.filterType === 'subcategory') return p.subcategory.toLowerCase() === col.target.toLowerCase();
      if (col.filterType === 'useCase') return (p.useCase || '').toLowerCase() === col.target.toLowerCase();
      if (col.filterType === 'difficulty') return (p.difficulty || '').toLowerCase() === col.target.toLowerCase();
      return false;
    });
    assert.ok(matches.length >= 1, `Collection "${col.name}" has 0 matching prompts!`);
  });
});

// 10. Saved & Recently Used logic
check('TEST 10: Saved and Recently Used MRU filtering logic', () => {
  const mockSavedIds = new Set(['p1', 'p2', 'dsa-no-spoiler-level1']);
  const savedFiltered = PROMPTS_DATA.filter(p => mockSavedIds.has(p.id));
  assert.strictEqual(savedFiltered.length, 3, 'Saved filter should return exact matching items');

  const mockRecentIds = ['sys-design-url-shortener', 'p3', 'p1'];
  const recentFiltered = PROMPTS_DATA.filter(p => mockRecentIds.includes(p.id));
  assert.strictEqual(recentFiltered.length, 3, 'Recent filter should find all matching prompts');

  recentFiltered.sort((a, b) => mockRecentIds.indexOf(a.id) - mockRecentIds.indexOf(b.id));
  assert.strictEqual(recentFiltered[0].id, 'sys-design-url-shortener');
  assert.strictEqual(recentFiltered[1].id, 'p3');
  assert.strictEqual(recentFiltered[2].id, 'p1');
});

console.log(`\nResults: ${passed} / ${total} tests passed.`);
if (passed !== total) {
  process.exit(1);
}
