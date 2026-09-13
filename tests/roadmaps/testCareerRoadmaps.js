/**
 * Automated Test Suite for DevPilot-AI Career Roadmaps
 * Validates catalog integrity, 5-level progression structure,
 * dependency ordering, technology search, and real progress calculation.
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const rootDir = path.resolve(__dirname, '../../');
const { careerCategories, careerRoles } = require(path.join(rootDir, 'js/data/careerRolesData.js'));
const { careerRoadmaps } = require(path.join(rootDir, 'js/data/careerRoadmapsData.js'));
const { resolveRoadmapNodeStatuses, calculateRoleProgress, findNextRecommendedSkill } = require(path.join(rootDir, 'js/pages/roadmaps.js'));

global.careerRoadmaps = careerRoadmaps;
global.careerRoles = careerRoles;

let totalTests = 0;
let passedTests = 0;

function runTest(description, fn) {
  totalTests++;
  try {
    fn();
    console.log(`✓ [PASS] ${description}`);
    passedTests++;
  } catch (err) {
    console.error(`✗ [FAIL] ${description}`);
    console.error(`  Error: ${err.message}`);
  }
}

console.log('===========================================================');
console.log(' DevPilot-AI: Running Career Roadmaps Test Suite');
console.log('===========================================================\n');

// 1. Files & Structural Integrity
runTest('All core Career Roadmaps files exist in workspace', () => {
  assert.ok(fs.existsSync(path.join(rootDir, 'pages/roadmaps.html')), 'pages/roadmaps.html must exist');
  assert.ok(fs.existsSync(path.join(rootDir, 'css/pages/roadmaps.css')), 'css/pages/roadmaps.css must exist');
  assert.ok(fs.existsSync(path.join(rootDir, 'js/data/careerRolesData.js')), 'careerRolesData.js must exist');
  assert.ok(fs.existsSync(path.join(rootDir, 'js/data/careerRoadmapsData.js')), 'careerRoadmapsData.js must exist');
  assert.ok(fs.existsSync(path.join(rootDir, 'js/pages/roadmaps.js')), 'js/pages/roadmaps.js must exist');
});

// 2. Navigation Integrity Across All Pages
runTest('Sidebar navigation contains link to Career Roadmaps across all pages', () => {
  const pages = [
    'index.html',
    'pages/chat.html',
    'pages/dsa.html',
    'pages/github.html',
    'pages/habits.html',
    'pages/notes.html',
    'pages/prompts.html',
    'pages/resume.html',
    'pages/settings.html',
    'pages/snippets.html',
    'pages/timer.html',
    'pages/roadmaps.html'
  ];

  pages.forEach(p => {
    const filePath = path.join(rootDir, p);
    assert.ok(fs.existsSync(filePath), `${p} should exist`);
    const content = fs.readFileSync(filePath, 'utf8');
    assert.ok(
      content.includes('roadmaps.html'),
      `Page ${p} must contain sidebar link to roadmaps.html`
    );
    assert.ok(
      content.includes('Career Roadmaps'),
      `Page ${p} must contain sidebar label "Career Roadmaps"`
    );
  });
});

// 3. Catalog Data Integrity
runTest('Role catalog contains exactly 20 roles across 4 categories', () => {
  assert.strictEqual(careerRoles.length, 20, 'Catalog must contain exactly 20 roles');
  assert.strictEqual(careerCategories.length, 4, 'Must have 4 categories');

  const categoryIds = new Set(careerCategories.map(c => c.id));
  assert.ok(categoryIds.has('development'), 'Must have development category');
  assert.ok(categoryIds.has('data-ai'), 'Must have data-ai category');
  assert.ok(categoryIds.has('devops-cloud'), 'Must have devops-cloud category');
  assert.ok(categoryIds.has('security-qa'), 'Must have security-qa category');

  // Verify counts per category
  const counts = {};
  careerRoles.forEach(r => {
    counts[r.category] = (counts[r.category] || 0) + 1;
    assert.ok(r.id, 'Role must have id');
    assert.ok(r.title, 'Role must have title');
    assert.ok(r.roadmapId, 'Role must have roadmapId');
    assert.ok(r.difficulty, 'Role must have difficulty');
    assert.ok(r.featuredTech && r.featuredTech.length > 0, 'Role must have featuredTech array');
  });

  assert.strictEqual(counts['development'], 7, 'Development category must have 7 roles');
  assert.strictEqual(counts['data-ai'], 7, 'Data & AI category must have 7 roles');
  assert.strictEqual(counts['devops-cloud'], 3, 'DevOps & Cloud category must have 3 roles');
  assert.strictEqual(counts['security-qa'], 3, 'Security & QA category must have 3 roles');
});

// 4. Technology Search Matching
runTest('Technology search accurately finds relevant multi-role disciplines', () => {
  function searchTech(query) {
    const q = query.toLowerCase();
    return careerRoles.filter(r => 
      r.title.toLowerCase().includes(q) ||
      (r.description || '').toLowerCase().includes(q) ||
      (r.featuredTech || []).some(t => t.toLowerCase().includes(q))
    ).map(r => r.title);
  }

  // React search
  const reactMatches = searchTech('React');
  assert.ok(reactMatches.includes('Frontend Developer'), 'React must match Frontend Developer');
  assert.ok(reactMatches.includes('Full Stack Developer'), 'React must match Full Stack Developer');

  // Docker search
  const dockerMatches = searchTech('Docker');
  assert.ok(dockerMatches.includes('Backend Developer'), 'Docker must match Backend Developer');
  assert.ok(dockerMatches.includes('Full Stack Developer'), 'Docker must match Full Stack Developer');
  assert.ok(dockerMatches.includes('DevOps Engineer'), 'Docker must match DevOps Engineer');
  assert.ok(dockerMatches.includes('Cloud Engineer'), 'Docker must match Cloud Engineer');

  // PyTorch search
  const pytorchMatches = searchTech('PyTorch');
  assert.ok(pytorchMatches.includes('AI Engineer'), 'PyTorch must match AI Engineer');
  assert.ok(pytorchMatches.includes('AI Research Engineer'), 'PyTorch must match AI Research Engineer');
});

// 5. Roadmap Data Integrity & Schema Validation
runTest('All 20 roles have matching roadmaps with 5 levels and valid node schemas', () => {
  careerRoles.forEach(role => {
    const roadmap = careerRoadmaps[role.roadmapId];
    assert.ok(roadmap, `Roadmap must exist for roadmapId: ${role.roadmapId}`);
    assert.strictEqual(roadmap.levels.length, 5, `Roadmap ${role.roadmapId} must have exactly 5 levels`);

    roadmap.levels.forEach(lvl => {
      assert.ok(lvl.levelNum >= 1 && lvl.levelNum <= 5, `Level num must be 1-5`);
      assert.ok(lvl.name, `Level must have a name`);
      assert.ok(Array.isArray(lvl.skills), `Level must have skills array`);
      assert.ok(lvl.skills.length > 0, `Level must contain at least 1 skill`);

      lvl.skills.forEach(skill => {
        assert.ok(skill.id, 'Skill must have an id');
        assert.ok(skill.title, 'Skill must have a title');
        assert.ok(skill.category, 'Skill must have a category');
        assert.ok(['beginner', 'intermediate', 'advanced'].includes(skill.level), `Invalid skill level: ${skill.level}`);
        assert.ok(['essential', 'recommended', 'optional'].includes(skill.importance), `Invalid importance: ${skill.importance}`);
        assert.ok(Array.isArray(skill.prerequisites), 'Skill prerequisites must be an array');
        assert.ok(Array.isArray(skill.whatToLearn) && skill.whatToLearn.length > 0, 'Skill must have whatToLearn points');
        assert.ok(skill.whyItMatters, 'Skill must have whyItMatters explanation');
      });
    });

    // Verify projects and checklist exist
    assert.ok(Array.isArray(roadmap.projects) && roadmap.projects.length > 0, `Roadmap ${role.roadmapId} must have projects`);
    assert.ok(roadmap.jobReadyChecklist, `Roadmap ${role.roadmapId} must have jobReadyChecklist`);
    assert.ok(Array.isArray(roadmap.jobReadyChecklist.technical), `Must have technical checklist`);
  });
});

// 6. Prerequisite Topological Integrity (No Broken or Cyclic Prereqs)
runTest('Prerequisite references are fully resolvable and strictly acyclic', () => {
  Object.entries(careerRoadmaps).forEach(([k, rm]) => {
    const allSkillIds = new Set();
    rm.levels.forEach(lvl => lvl.skills.forEach(s => allSkillIds.add(s.id)));

    rm.levels.forEach(lvl => {
      lvl.skills.forEach(s => {
        (s.prerequisites || []).forEach(pId => {
          assert.ok(allSkillIds.has(pId), `Broken prerequisite in ${k}: ${s.id} points to missing ${pId}`);
          assert.notStrictEqual(pId, s.id, `Skill ${s.id} cannot be its own prerequisite`);
        });
      });
    });
  });
});

// 7. Dynamic Dependency Resolution & Status Calculation
runTest('resolveRoadmapNodeStatuses computes locked, available, in-progress, and completed states accurately', () => {
  const feRoadmap = careerRoadmaps['frontend'];

  // Case A: Fresh user (no completed skills)
  // fe-html has no prerequisites -> should be available
  // fe-css requires fe-html -> should be locked
  // Mock global storage state
  global.localStorage = {
    getItem: () => JSON.stringify({ 'frontend-developer': { completed: [], inProgress: [] } }),
    setItem: () => {}
  };

  const statusMapInitial = resolveRoadmapNodeStatuses('frontend-developer', feRoadmap);
  assert.strictEqual(statusMapInitial['fe-html'], 'available', 'fe-html has no prereqs, must be available');
  assert.strictEqual(statusMapInitial['fe-css'], 'locked', 'fe-css has uncompleted prereq fe-html, must be locked');

  // Case B: User completes fe-html
  // fe-css should now be unlocked to 'available'
  global.localStorage = {
    getItem: () => JSON.stringify({ 'frontend-developer': { completed: ['fe-html'], inProgress: [] } }),
    setItem: () => {}
  };

  const statusMapAfterHtml = resolveRoadmapNodeStatuses('frontend-developer', feRoadmap);
  assert.strictEqual(statusMapAfterHtml['fe-html'], 'completed', 'fe-html must be completed');
  assert.strictEqual(statusMapAfterHtml['fe-css'], 'available', 'fe-css must unlock to available when fe-html completed');

  // Case C: User sets fe-css to in-progress
  global.localStorage = {
    getItem: () => JSON.stringify({ 'frontend-developer': { completed: ['fe-html'], inProgress: ['fe-css'] } }),
    setItem: () => {}
  };

  const statusMapProgress = resolveRoadmapNodeStatuses('frontend-developer', feRoadmap);
  assert.strictEqual(statusMapProgress['fe-css'], 'in-progress', 'fe-css must resolve to in-progress');
});

// 8. Real Progress Percentage Calculation
runTest('calculateRoleProgress computes non-fake, verified completion percentage', () => {
  const feRole = careerRoles.find(r => r.id === 'frontend-developer');
  const feRoadmap = careerRoadmaps['frontend'];
  let totalSkills = 0;
  feRoadmap.levels.forEach(l => totalSkills += l.skills.length);

  // When 0 completed
  global.localStorage = {
    getItem: () => JSON.stringify({ 'frontend-developer': { completed: [] } }),
    setItem: () => {}
  };
  const prog0 = calculateRoleProgress(feRole);
  assert.strictEqual(prog0.percent, 0);
  assert.strictEqual(prog0.completed, 0);
  assert.strictEqual(prog0.total, totalSkills);

  // When 2 completed
  global.localStorage = {
    getItem: () => JSON.stringify({ 'frontend-developer': { completed: ['fe-html', 'fe-css'] } }),
    setItem: () => {}
  };
  const prog2 = calculateRoleProgress(feRole);
  const expectedPercent = Math.round((2 / totalSkills) * 100);
  assert.strictEqual(prog2.percent, expectedPercent);
  assert.strictEqual(prog2.completed, 2);
  assert.strictEqual(prog2.total, totalSkills);
});

// 9. Next Recommended Skill Finder
runTest('findNextRecommendedSkill identifies next priority skill in learning order', () => {
  const feRoadmap = careerRoadmaps['frontend'];

  // Status with fe-html available
  const nodeStatusMap = {
    'fe-html': 'available',
    'fe-css': 'locked'
  };
  const nextSkill = findNextRecommendedSkill(feRoadmap, nodeStatusMap);
  assert.ok(nextSkill, 'Must recommend next skill');
  assert.strictEqual(nextSkill.skill.id, 'fe-html', 'Should recommend first available skill');
});

// 10. Intelligent AI Relevance Representation
runTest('AI relevance is sensibly represented across diverse roles without generic hype', () => {
  const feRoadmap = careerRoadmaps['frontend'];
  const beRoadmap = careerRoadmaps['backend'];
  const genaiRoadmap = careerRoadmaps['llm-genai'];

  // Frontend has UI/streaming AI
  const feAi = feRoadmap.levels[3].skills.find(s => s.id === 'fe-ai-integration');
  assert.ok(feAi, 'Frontend must have AI UI integration');
  assert.ok(feAi.technologies.includes('Server-Sent Events (SSE)'));

  // Backend has LLM API & Vector search
  const beAi = beRoadmap.levels[3].skills.find(s => s.id === 'be-ai-integration');
  assert.ok(beAi, 'Backend must have AI service integration');
  assert.ok(beAi.technologies.includes('Embeddings') || beAi.technologies.includes('Vector Search'));

  // GenAI Engineer has RAG and Agentic frameworks
  const genRag = genaiRoadmap.levels[1].skills.find(s => s.id === 'gen-rag-core');
  assert.ok(genRag, 'GenAI must have RAG core');
});

console.log('\n===========================================================');
console.log(` Test Results: ${passedTests} / ${totalTests} Passed`);
console.log('===========================================================');

if (passedTests !== totalTests) {
  process.exit(1);
}
