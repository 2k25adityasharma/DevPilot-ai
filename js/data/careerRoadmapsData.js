/**
 * DevPilot-AI — Career Roadmaps Central Registry
 * Aggregates all 20 role-specific career roadmaps into a unified dataset.
 * Supports both Browser (via window.careerRoadmapsRegistry or script tags) and Node.js (via require).
 */

(function () {
  'use strict';

  const ROLE_MODULE_KEYS = [
    'frontend',
    'backend',
    'fullstack',
    'mobile',
    'game',
    'web3',
    'embedded',
    'dataAnalyst',
    'dataEngineer',
    'dataScientist',
    'aiEngineer',
    'aiResearch',
    'genAI',
    'mlops',
    'devops',
    'cloud',
    'sre',
    'cloudSecurity',
    'cybersecurity',
    'qaSdet'
  ];

  // Internal dictionary of roadmaps
  const roadmaps = {};
  const uniqueRoadmaps = [];

  // Helper to normalize skill object for backward & forward compatibility
  function normalizeSkill(skill, levelNum) {
    if (!skill) return;
    if (typeof skill.levelNum === 'undefined') {
      skill.levelNum = levelNum;
    }
    // Normalize difficulty / level
    if (!skill.difficulty) {
      if (typeof skill.level === 'string' && ['beginner', 'intermediate', 'advanced'].includes(skill.level.toLowerCase())) {
        skill.difficulty = skill.level.charAt(0).toUpperCase() + skill.level.slice(1).toLowerCase();
      } else {
        skill.difficulty = levelNum <= 1 ? 'Beginner' : levelNum <= 3 ? 'Intermediate' : 'Advanced';
      }
    }
    // Backward compatibility for tests/views expecting lowercase skill.level
    if (!skill.level || skill.level.startsWith('Level')) {
      skill.rawLevelName = skill.level;
      skill.level = skill.difficulty.toLowerCase();
    }
    // Normalize importance to lowercase 'essential', 'recommended', or 'optional'
    const imp = (skill.importance || 'essential').toLowerCase();
    if (imp === 'core' || imp === 'essential') {
      skill.importance = 'essential';
    } else if (imp === 'recommended' || imp === 'high') {
      skill.importance = 'recommended';
    } else {
      skill.importance = 'optional';
    }

    // Ensure arrays
    if (!Array.isArray(skill.prerequisites)) skill.prerequisites = [];
    if (!Array.isArray(skill.whatToLearn)) skill.whatToLearn = [];
    if (!Array.isArray(skill.resources)) skill.resources = [];
    if (!Array.isArray(skill.technologies) || skill.technologies.length === 0) {
      skill.technologies = [skill.category || 'Engineering'];
    }
  }

  function registerRoadmap(rawRoadmap) {
    if (!rawRoadmap || !rawRoadmap.title) return;

    // Normalize levels & skills
    if (Array.isArray(rawRoadmap.levels)) {
      rawRoadmap.levels.forEach((lvl, idx) => {
        if (!lvl.levelNum) lvl.levelNum = idx + 1;
        if (Array.isArray(lvl.skills)) {
          lvl.skills.forEach(skill => normalizeSkill(skill, lvl.levelNum));
        }
      });
    }

    // Normalize projects
    if (Array.isArray(rawRoadmap.projects)) {
      rawRoadmap.projects.forEach((proj, idx) => {
        if (!proj.description && proj.objective) proj.description = proj.objective;
        if (!proj.type && proj.difficulty) proj.type = proj.difficulty;
        if (!proj.type) proj.type = idx === 0 ? 'Beginner' : idx === 1 ? 'Intermediate' : 'Production';
      });
    } else {
      rawRoadmap.projects = [];
    }

    // Normalize checklist
    if (!rawRoadmap.checklist && rawRoadmap.jobReadyChecklist) {
      rawRoadmap.checklist = rawRoadmap.jobReadyChecklist;
    }
    if (rawRoadmap.checklist && !rawRoadmap.jobReadyChecklist) {
      rawRoadmap.jobReadyChecklist = rawRoadmap.checklist;
    }

    // Ensure technical array alias in checklist for tests
    if (rawRoadmap.jobReadyChecklist && rawRoadmap.jobReadyChecklist.technicalSkills && !rawRoadmap.jobReadyChecklist.technical) {
      rawRoadmap.jobReadyChecklist.technical = rawRoadmap.jobReadyChecklist.technicalSkills.map((item, idx) => ({
        id: `${rawRoadmap.roadmapId || 'role'}-tech-${idx + 1}`,
        label: typeof item === 'string' ? item : item.label || item.title || '',
        checked: false
      }));
    }

    // Track unique roadmap
    if (!uniqueRoadmaps.some(r => r.roleId === rawRoadmap.roleId || r.title === rawRoadmap.title)) {
      uniqueRoadmaps.push(rawRoadmap);
    }

    // Register under multiple indexing keys for resilient lookup
    const keysToRegister = new Set();
    if (rawRoadmap.roadmapId) {
      keysToRegister.add(rawRoadmap.roadmapId);
      keysToRegister.add(rawRoadmap.roadmapId.toLowerCase());
    }
    if (rawRoadmap.roleId) {
      keysToRegister.add(rawRoadmap.roleId);
      keysToRegister.add(rawRoadmap.roleId.toLowerCase());
    }

    // Aliases for specific known role identifiers
    const aliases = {
      'frontend': ['frontend-developer', 'frontend'],
      'backend': ['backend-developer', 'backend'],
      'fullstack': ['full-stack-developer', 'fullstack'],
      'mobile': ['mobile-developer', 'mobile'],
      'game': ['game-developer', 'game'],
      'web3': ['web3-developer', 'web3'],
      'embedded': ['embedded-systems-engineer', 'embedded'],
      'dataAnalyst': ['data-analyst', 'dataAnalyst', 'data_analyst'],
      'dataEngineer': ['data-engineer', 'dataEngineer', 'data_engineer'],
      'dataScientist': ['data-scientist', 'dataScientist', 'data_scientist'],
      'aiEngineer': ['ai-engineer', 'aiEngineer', 'ai_engineer'],
      'aiResearch': ['ai-research-engineer', 'ai-research', 'aiResearch'],
      'genAI': ['llm-genai-engineer', 'llm-genai', 'genai', 'genAI'],
      'mlops': ['mlops-engineer', 'mlops'],
      'devops': ['devops-engineer', 'devops'],
      'cloud': ['cloud-engineer', 'cloud'],
      'sre': ['sre-engineer', 'site-reliability-engineer', 'sre'],
      'cloudSecurity': ['cloud-security-engineer', 'cloud-security', 'cloudSecurity'],
      'cybersecurity': ['cybersecurity-analyst', 'cybersecurity'],
      'qaSdet': ['qa-sdet-engineer', 'qa-sdet', 'qaSdet', 'qasdet']
    };

    for (const [modKey, aliasList] of Object.entries(aliases)) {
      if (rawRoadmap.roadmapId === modKey || rawRoadmap.roleId === aliasList[0]) {
        aliasList.forEach(alias => keysToRegister.add(alias));
      }
    }

    keysToRegister.forEach(key => {
      roadmaps[key] = rawRoadmap;
    });
  }

  // Load modules depending on runtime environment
  if (typeof module !== 'undefined' && module.exports && typeof require === 'function') {
    // Node.js runtime: require each role file
    ROLE_MODULE_KEYS.forEach(key => {
      try {
        const mod = require(`./careerRoadmaps/${key}.js`);
        registerRoadmap(mod);
      } catch (err) {
        console.warn(`[CareerRoadmapsData] Could not load ./careerRoadmaps/${key}.js:`, err.message);
      }
    });
  } else if (typeof window !== 'undefined') {
    // Browser runtime: check window.careerRoadmapsRegistry
    const registry = window.careerRoadmapsRegistry || {};
    Object.keys(registry).forEach(key => {
      registerRoadmap(registry[key]);
    });
  }

  /**
   * Safe getter for roadmap by role ID, roadmap ID, or slug
   */
  function getRoadmap(identifier) {
    if (!identifier) return null;
    const cleanId = String(identifier).trim();
    if (roadmaps[cleanId]) return roadmaps[cleanId];
    if (roadmaps[cleanId.toLowerCase()]) return roadmaps[cleanId.toLowerCase()];

    // Search by title or partial match
    return uniqueRoadmaps.find(r => 
      (r.roleId && r.roleId.toLowerCase() === cleanId.toLowerCase()) ||
      (r.roadmapId && r.roadmapId.toLowerCase() === cleanId.toLowerCase()) ||
      (r.title && r.title.toLowerCase() === cleanId.toLowerCase())
    ) || null;
  }

  /**
   * Get all unique roadmaps
   */
  function getAllRoadmaps() {
    return uniqueRoadmaps;
  }

  /**
   * Get roadmaps filtered by category
   */
  function getRoadmapsByCategory(category) {
    if (!category || category === 'all') return uniqueRoadmaps;
    return uniqueRoadmaps.filter(r => r.category === category);
  }

  // Expose to Browser
  if (typeof window !== 'undefined') {
    window.careerRoadmaps = roadmaps;
    window.getRoadmap = getRoadmap;
    window.getAllRoadmaps = getAllRoadmaps;
    window.getRoadmapsByCategory = getRoadmapsByCategory;
  }

  // Expose to CommonJS / Node.js
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      careerRoadmaps: roadmaps,
      getRoadmap,
      getAllRoadmaps,
      getRoadmapsByCategory
    };
  }
})();
