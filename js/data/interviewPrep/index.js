/**
 * DevPilot-AI — Interview Preparation Central Registry
 * Aggregates all 18 placement & interview preparation categories,
 * questions, checklists, case studies, and test pool generators.
 */

if (typeof window === 'undefined' && typeof global !== 'undefined') {
  global.window = global;
}

(function () {
  'use strict';

  const registry = {
    categories: {},
    checklists: null,

    init() {
      // Normalization map for various category IDs
      const categorySources = [
        // Attached to window.interviewPrepData
        ...(typeof window !== 'undefined' && window.interviewPrepData ? Object.values(window.interviewPrepData) : []),
        // Attached directly to window
        (typeof window !== 'undefined' && window.interviewPrepCO) || null,
        (typeof window !== 'undefined' && window.interviewPrepSE) || null,
        (typeof window !== 'undefined' && window.interviewPrepSystemDesign) || null,
        (typeof window !== 'undefined' && window.interviewPrepWebDev) || null,
        (typeof window !== 'undefined' && window.interviewPrepGit) || null,
        (typeof window !== 'undefined' && window.interviewPrepCloudDevOps) || null,
        (typeof window !== 'undefined' && window.interviewPrepAiMl) || null,
      ].filter(Boolean);

      // In Node.js environment, require modules directly
      if (categorySources.length === 0 && typeof require !== 'undefined') {
        const catFiles = [
          './aptitude.js', './english.js', './logicalReasoning.js', './communication.js',
          './hrBehavioral.js', './programming.js', './oop.js', './dbms.js', './sql.js',
          './operatingSystems.js', './computerNetworks.js', './computerOrganization.js',
          './softwareEngineering.js', './systemDesign.js', './webDevelopment.js',
          './git.js', './cloudDevOps.js', './aiMl.js'
        ];
        catFiles.forEach(f => {
          try {
            const mod = require(f);
            if (mod && (mod.id || mod.category)) {
              categorySources.push(mod);
            }
          } catch (e) {
            // Node test environment might require through relative path
          }
        });

        try {
          const chk = require('./checklists.js');
          if (chk) {
            this.checklists = chk.checklists || chk;
          }
        } catch (e) {}
      }

      // Populate registry categories
      categorySources.forEach(cat => {
        const id = cat.id || cat.category;
        if (id) {
          // Normalize GD practice topics
          let normalizedGD = [];
          if (cat.practiceTopics || cat.gdTopics) {
            const rawGD = cat.practiceTopics || cat.gdTopics;
            normalizedGD = rawGD.map(g => ({
              id: g.id,
              title: g.title,
              category: g.category,
              openingStatement: g.openingApproach || g.openingStatement || '',
              pointsInFavor: g.pointsFor || g.pointsInFavor || [],
              pointsAgainst: g.pointsAgainst || [],
              examples: g.examples || [],
              conclusion: g.conclusionStrategy || g.conclusion || ''
            }));
          }

          // Normalize HR questions
          let normalizedHR = [];
          if (cat.coreQuestions || cat.hrQuestions) {
            const rawHR = cat.coreQuestions || cat.hrQuestions;
            normalizedHR = rawHR.map(h => ({
              id: h.id,
              question: h.question,
              category: h.category || 'HR Behavioral',
              evaluatingFor: h.whatInterviewerIsEvaluating || h.evaluatingFor || '',
              goodAnswerStructure: h.goodAnswerStructure || '',
              commonTraps: h.whatToAvoid || h.commonTraps || '',
              starGuide: h.starGuide || {
                situation: 'Set the context and problem you faced in your project or academic coursework.',
                task: 'Explain your specific objective, responsibilities, and challenges.',
                action: h.goodAnswerStructure || 'Describe the specific steps, technologies, and reasoning you implemented.',
                result: h.exampleAnswerFramework || 'Highlight quantifiable outcomes, metrics, and lessons learned.'
              },
              exampleAnswerFramework: h.exampleAnswerFramework || ''
            }));
          }

          // Normalize structure
          this.categories[id] = {
            id: id,
            title: cat.title || id,
            icon: cat.icon || 'quiz',
            description: cat.description || '',
            topics: cat.topics || (cat.totalTopics ? Object.keys(cat.topics || {}) : []),
            questions: cat.questions || [],
            caseStudies: cat.caseStudies || [],
            gdTopics: normalizedGD,
            hrQuestions: normalizedHR,
            totalQuestions: (cat.questions ? cat.questions.length : 0)
          };
        }
      });

      // Load checklists if available on window
      if (typeof window !== 'undefined' && window.interviewPrepChecklists) {
        this.checklists = window.interviewPrepChecklists.checklists || window.interviewPrepChecklists;
      }
    },

    getAllCategories() {
      this.ensureInitialized();
      return Object.values(this.categories);
    },

    getCategory(categoryId) {
      this.ensureInitialized();
      // Support aliases
      const aliasMap = {
        'aptitude': 'aptitude',
        'english': 'english',
        'logical': 'logicalReasoning',
        'logicalReasoning': 'logicalReasoning',
        'communication': 'communication',
        'hr': 'hrBehavioral',
        'hrBehavioral': 'hrBehavioral',
        'programming': 'programming',
        'oop': 'oop',
        'dbms': 'dbms',
        'sql': 'sql',
        'os': 'operatingSystems',
        'operatingSystems': 'operatingSystems',
        'cn': 'computerNetworks',
        'networks': 'computerNetworks',
        'computerNetworks': 'computerNetworks',
        'co': 'computer_organization',
        'computer_organization': 'computer_organization',
        'se': 'software_engineering',
        'software_engineering': 'software_engineering',
        'systemDesign': 'system_design',
        'system_design': 'system_design',
        'web': 'web_development',
        'web_development': 'web_development',
        'git': 'git_version_control',
        'git_version_control': 'git_version_control',
        'cloud': 'cloud_devops',
        'cloud_devops': 'cloud_devops',
        'ai': 'ai_machine_learning',
        'ai_machine_learning': 'ai_machine_learning'
      };

      const resolvedId = aliasMap[categoryId] || categoryId;
      return this.categories[resolvedId] || null;
    },

    getAllQuestions() {
      this.ensureInitialized();
      const all = [];
      Object.values(this.categories).forEach(cat => {
        if (cat.questions && Array.isArray(cat.questions)) {
          cat.questions.forEach(q => {
            all.push({ ...q, categoryId: cat.id, categoryTitle: cat.title });
          });
        }
      });
      return all;
    },

    getQuestionsByTopic(categoryId, topicName) {
      const cat = this.getCategory(categoryId);
      if (!cat || !cat.questions) return [];
      return cat.questions.filter(q => q.topic && q.topic.toLowerCase() === topicName.toLowerCase());
    },

    getChecklists() {
      this.ensureInitialized();
      if (!this.checklists && typeof window !== 'undefined' && window.interviewPrepChecklists) {
        this.checklists = window.interviewPrepChecklists.checklists || window.interviewPrepChecklists;
      }
      return this.checklists || {};
    },

    /**
     * Generate 50 balanced questions for the 60-Minute Mock Placement Test
     */
    getMockTestPool(count = 50) {
      this.ensureInitialized();
      const pool = [];

      const pickRandom = (arr, n) => {
        const shuffled = [...arr].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, n);
      };

      const getCatQs = (id) => {
        const cat = this.getCategory(id);
        if (!cat || !cat.questions) return [];
        return cat.questions.map(q => ({ ...q, categoryId: cat.id, categoryTitle: cat.title }));
      };

      // 1. Aptitude (10 questions)
      pool.push(...pickRandom(getCatQs('aptitude'), 10));

      // 2. English (5 questions)
      pool.push(...pickRandom(getCatQs('english'), 5));

      // 3. Logical Reasoning (5 questions)
      pool.push(...pickRandom(getCatQs('logicalReasoning'), 5));

      // 4. Programming & Coding (5 questions)
      pool.push(...pickRandom(getCatQs('programming'), 5));

      // 5. OOP (5 questions)
      pool.push(...pickRandom(getCatQs('oop'), 5));

      // 6. DBMS & SQL (5 questions total: 3 DBMS, 2 SQL)
      pool.push(...pickRandom(getCatQs('dbms'), 3));
      pool.push(...pickRandom(getCatQs('sql'), 2));

      // 7. OS & Networks (5 questions total: 3 OS, 2 Networks)
      pool.push(...pickRandom(getCatQs('operatingSystems'), 3));
      pool.push(...pickRandom(getCatQs('computerNetworks'), 2));

      // 8. Core CS: CO, SE, System Design (5 questions: 2 CO, 2 SE, 1 System Design)
      pool.push(...pickRandom(getCatQs('computer_organization'), 2));
      pool.push(...pickRandom(getCatQs('software_engineering'), 2));
      pool.push(...pickRandom(getCatQs('system_design'), 1));

      // 9. Tech Tracks: Web, Git, Cloud, AI (5 questions: 2 Web, 1 Git, 1 Cloud, 1 AI)
      pool.push(...pickRandom(getCatQs('web_development'), 2));
      pool.push(...pickRandom(getCatQs('git_version_control'), 1));
      pool.push(...pickRandom(getCatQs('cloud_devops'), 1));
      pool.push(...pickRandom(getCatQs('ai_machine_learning'), 1));

      // If pool has fewer than requested due to missing categories, fill from all
      if (pool.length < count) {
        const all = this.getAllQuestions();
        const remaining = pickRandom(all.filter(q => !pool.some(p => p.id === q.id)), count - pool.length);
        pool.push(...remaining);
      }

      // Shuffle final pool
      return pool.sort(() => 0.5 - Math.random()).slice(0, count);
    },

    /**
     * Detect weak topics based on user's progress history
     * @param {Object} progressMap stored in localStorage
     */
    getWeakTopics(progressMap = {}) {
      this.ensureInitialized();
      const weakList = [];
      const allQs = this.getAllQuestions();

      // Group question results by category and topic
      const topicStats = {};
      Object.keys(progressMap).forEach(key => {
        // key format: topic:categoryId:topicName or q:questionId
        const stat = progressMap[key];
        if (stat && stat.topic && stat.categoryId) {
          const tKey = `${stat.categoryId}:::${stat.topic}`;
          if (!topicStats[tKey]) {
            topicStats[tKey] = {
              categoryId: stat.categoryId,
              topic: stat.topic,
              attempted: 0,
              correct: 0,
              incorrect: 0
            };
          }
          topicStats[tKey].attempted += (stat.attempted || 0);
          topicStats[tKey].correct += (stat.correct || 0);
          topicStats[tKey].incorrect += (stat.incorrect || 0);
        }
      });

      Object.values(topicStats).forEach(item => {
        if (item.attempted >= 3) {
          const accuracy = Math.round((item.correct / item.attempted) * 100);
          if (accuracy < 60 || item.incorrect > item.correct) {
            const cat = this.getCategory(item.categoryId);
            weakList.push({
              categoryId: item.categoryId,
              categoryTitle: cat ? cat.title : item.categoryId,
              categoryIcon: cat ? cat.icon : 'help',
              topic: item.topic,
              attempted: item.attempted,
              accuracy: accuracy,
              incorrectCount: item.incorrect
            });
          }
        }
      });

      return weakList.sort((a, b) => a.accuracy - b.accuracy);
    },

    /**
     * Compute overall stats from progressMap
     */
    getOverallStats(progressMap = {}) {
      this.ensureInitialized();
      let totalAttempted = 0;
      let totalCorrect = 0;
      let completedTopicsCount = 0;

      const totalAvailable = this.getAllQuestions().length;

      Object.values(progressMap).forEach(stat => {
        if (stat.attempted) {
          totalAttempted += stat.attempted;
          totalCorrect += (stat.correct || 0);
        }
        if (stat.completed) {
          completedTopicsCount++;
        }
      });

      const accuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;

      return {
        totalAvailable,
        totalAttempted,
        totalCorrect,
        totalIncorrect: totalAttempted - totalCorrect,
        accuracy,
        completedTopicsCount,
        categoriesCount: Object.keys(this.categories).length
      };
    },

    ensureInitialized() {
      if (Object.keys(this.categories).length === 0) {
        this.init();
      }
    }
  };

  // Auto initialize
  registry.init();

  // Expose to window
  if (typeof window !== 'undefined') {
    window.interviewPrepRegistry = registry;
  }

  // Expose to CommonJS / Node.js
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = registry;
  }
})();
