/**
 * DevPilot-AI — Central Dashboard Data Aggregation Service (DashboardDataService)
 * 
 * Single Source of Truth aggregator for the DevPilot AI Dashboard.
 * Reads directly from authoritative application services:
 * - Habits & Daily Goals: HabitService & HabitsData
 * - DSA Roadmap: window.dsaRoadmap & Storage (dsa_progress, dsa_roadmap_evaluations)
 * - Career Roadmaps: window.careerProgressionEngine & careerRoles/Roadmaps
 * - Interview Prep: devpilot_interview_prep_progress & interviewPrepRegistry
 * - Notes: Storage (dev_notes) & DEFAULT_NOTES
 * - Timer: Storage (timer_sessions) & TimerData
 * - GitHub: GitHub REST API (public events) with localStorage caching & Settings
 * 
 * Supports both Browser and Node.js environments.
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.DashboardDataService = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // Constants
  const STORAGE_KEY_GITHUB_SETTINGS = 'github_settings';
  const STORAGE_KEY_GITHUB_CACHE_PREFIX = 'github_cache_';
  // No default GitHub username — users must explicitly configure their own
  const GITHUB_CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes cache

  // Helpers
  function getStorage() {
    if (typeof window !== 'undefined' && window.Storage && typeof window.Storage.get === 'function') {
      return window.Storage;
    }
    return {
      get: function (key, def = null) {
        try {
          if (typeof localStorage === 'undefined') return def;
          const val = localStorage.getItem(`devpilot_${key}`);
          return val ? JSON.parse(val) : def;
        } catch (e) {
          return def;
        }
      },
      set: function (key, val) {
        try {
          if (typeof localStorage === 'undefined') return;
          localStorage.setItem(`devpilot_${key}`, JSON.stringify(val));
        } catch (e) {}
      }
    };
  }

  function getHabitService() {
    if (typeof window !== 'undefined' && window.HabitService) {
      return window.HabitService;
    }
    if (typeof require !== 'undefined') {
      try { return require('./habitService.js'); } catch (e) {}
    }
    return null;
  }

  function getHabitsData() {
    if (typeof window !== 'undefined' && window.HabitsData) {
      return window.HabitsData;
    }
    if (typeof require !== 'undefined') {
      try { return require('../data/habitsData.js'); } catch (e) {}
    }
    return null;
  }

  function getTimerData() {
    if (typeof window !== 'undefined' && window.TimerData) {
      return window.TimerData;
    }
    if (typeof require !== 'undefined') {
      try { return require('../data/timerData.js'); } catch (e) {}
    }
    return null;
  }

  function getDsaRoadmap() {
    if (typeof window !== 'undefined' && Array.isArray(window.dsaRoadmap)) {
      return window.dsaRoadmap;
    }
    if (typeof require !== 'undefined') {
      try {
        const mod = require('../data/dsaData.js');
        return mod.dsaRoadmap || (typeof window !== 'undefined' ? window.dsaRoadmap : []);
      } catch (e) {}
    }
    return [];
  }

  function getCareerEngine() {
    if (typeof window !== 'undefined' && window.careerProgressionEngine) {
      return window.careerProgressionEngine;
    }
    if (typeof require !== 'undefined') {
      try { return require('./careerProgressionEngine.js'); } catch (e) {}
    }
    return null;
  }

  function getCareerRoles() {
    if (typeof window !== 'undefined' && Array.isArray(window.careerRoles)) {
      return window.careerRoles;
    }
    if (typeof require !== 'undefined') {
      try {
        const mod = require('../data/careerRolesData.js');
        return mod.careerRoles || [];
      } catch (e) {}
    }
    return [];
  }

  function getCareerRoadmaps() {
    if (typeof window !== 'undefined' && window.careerRoadmaps) {
      return window.careerRoadmaps;
    }
    if (typeof require !== 'undefined') {
      try {
        const mod = require('../data/careerRoadmapsData.js');
        return mod.careerRoadmaps || {};
      } catch (e) {}
    }
    return {};
  }

  /**
   * Gets the roadmap object for a specific role ID.
   * Uses lazy getRoadmap() getter (via window.getRoadmap) which re-reads the
   * registry on every call, ensuring late-loaded roadmap scripts are found.
   */
  function getRoadmapForRole(roleId, role) {
    if (!roleId) return null;

    // Try the lazy getRoadmap() function first (most robust)
    if (typeof window !== 'undefined' && typeof window.getRoadmap === 'function') {
      const rm = window.getRoadmap(role?.roadmapId || roleId);
      if (rm) return rm;
    }

    // Fallback: static careerRoadmaps dict
    const roadmaps = getCareerRoadmaps();
    return roadmaps[role?.roadmapId || roleId]
      || roadmaps[roleId]
      || roadmaps[roleId.toLowerCase()]
      || null;
  }

  function getInterviewRegistry() {
    if (typeof window !== 'undefined' && window.interviewPrepRegistry) {
      if (typeof window.interviewPrepRegistry.ensureInitialized === 'function') {
        window.interviewPrepRegistry.ensureInitialized();
      } else if (typeof window.interviewPrepRegistry.init === 'function') {
        window.interviewPrepRegistry.init();
      }
      return window.interviewPrepRegistry;
    }
    if (typeof require !== 'undefined') {
      try {
        const mod = require('../data/interviewPrep/index.js');
        if (mod) {
          if (typeof mod.ensureInitialized === 'function') {
            mod.ensureInitialized();
          } else if (typeof mod.init === 'function') {
            mod.init();
          }
          return mod;
        }
      } catch (e) {}
    }
    return null;
  }

  function getTodayDateStr() {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function getUserId() {
    const auth = (typeof window !== 'undefined' && window.AuthService)
      ? window.AuthService
      : (typeof AuthService !== 'undefined' ? AuthService : null);

    if (auth && typeof auth.getCurrentUser === 'function') {
      try {
        const u = auth.getCurrentUser();
        if (u && u.id) return u.id;
      } catch (e) {}
    }
    return '00000000-0000-4000-a000-000000000001';
  }

  // ==========================================
  // 1. STREAK
  // ==========================================
  function getStreak() {
    const habitsData = getHabitsData();
    const storage = getStorage();
    const userId = getUserId();

    // Read habits
    let habits = storage.get(`devpilot_u_${userId}_habits`, null);
    if (!Array.isArray(habits)) {
      habits = storage.get(`u_${userId}_habits`, null);
    }
    if (!Array.isArray(habits)) {
      habits = storage.get('habits_data', []);
    }
    if (!Array.isArray(habits)) habits = [];

    // Read completions
    let completions = storage.get(`devpilot_u_${userId}_completions`, null);
    if (!Array.isArray(completions)) {
      completions = storage.get(`u_${userId}_completions`, null);
    }
    if (!Array.isArray(completions)) {
      completions = storage.get('habits_completions', []);
    }
    if (!Array.isArray(completions)) completions = [];

    const todayStr = habitsData && typeof habitsData.getTodayStr === 'function'
      ? habitsData.getTodayStr()
      : getTodayDateStr();

    if (habitsData && typeof habitsData.calculateOverallStreak === 'function') {
      try {
        const streakInfo = habitsData.calculateOverallStreak(habits, completions, todayStr);
        const isExtendedToday = !streakInfo.isAtRisk && (streakInfo.currentStreak || 0) > 0;
        return {
          currentStreak: streakInfo.currentStreak || 0,
          isAtRisk: !!streakInfo.isAtRisk,
          isExtendedToday
        };
      } catch (e) {}
    }

    return { currentStreak: 0, isAtRisk: false, isExtendedToday: false };
  }

  // ==========================================
  // 2. DAILY GOALS & TODAY'S MAIN GOAL
  // ==========================================
  function getDailyGoals(dateStr = null) {
    const targetDate = dateStr || getTodayDateStr();
    const storage = getStorage();
    const userId = getUserId();

    let goals = storage.get(`u_${userId}_daily_goals`, null);
    if (!Array.isArray(goals)) {
      goals = storage.get(`devpilot_u_${userId}_daily_goals`, null);
    }
    if (!Array.isArray(goals) && userId === '00000000-0000-4000-a000-000000000001') {
      goals = storage.get('daily_goals', null);
    }

    if (!Array.isArray(goals)) {
      // No goals exist yet for this user — return empty (no fake/seed data)
      goals = [];
    }

    // Return goals matching target date only
    return goals.filter(g => g.date === targetDate);
  }

  function getMainGoal(dateStr = null) {
    const goals = getDailyGoals(dateStr);

    if (!Array.isArray(goals) || goals.length === 0) {
      return {
        hasGoal: false,
        title: 'No goals set for today',
        priority: 'Daily Focus',
        completedCount: 0,
        totalCount: 0,
        percentage: 0,
        percent: 0,
        statusText: 'Add your first goal to kick off your day.'
      };
    }

    const totalCount = goals.length;
    const completedCount = goals.filter(g => g.completed).length;
    const percent = Math.round((completedCount / totalCount) * 100);

    // Prioritize high priority or first incomplete goal
    let mainGoal = goals.find(g => g.category && g.category.toLowerCase().includes('coding') && !g.completed);
    if (!mainGoal) mainGoal = goals.find(g => !g.completed);
    if (!mainGoal) mainGoal = goals[0];

    let statusText = 'Ready to begin today\'s tasks.';
    if (percent === 100) {
      statusText = 'All goals completed today! 🎉';
    } else if (percent > 0) {
      statusText = 'On track to finish today.';
    }

    const priorityLabel = mainGoal.category || 'High';

    return {
      hasGoal: true,
      id: mainGoal.id,
      title: mainGoal.title,
      priority: priorityLabel,
      completedCount,
      totalCount,
      percentage: percent,
      percent,
      statusText
    };
  }

  function toggleDailyGoal(id) {
    const storage = getStorage();
    const userId = getUserId();
    const primaryKey = `devpilot_u_${userId}_daily_goals`;
    const fallbackKey = `u_${userId}_daily_goals`;

    let goals = storage.get(primaryKey, null);
    if (!Array.isArray(goals)) goals = storage.get(fallbackKey, null);
    if (!Array.isArray(goals)) goals = storage.get('daily_goals', []);
    if (!Array.isArray(goals)) goals = [];

    const targetGoal = goals.find(g => g.id === id);
    if (targetGoal) {
      targetGoal.completed = !targetGoal.completed;
      targetGoal.progress = targetGoal.completed ? (targetGoal.target || 1) : 0;
      targetGoal.updated_at = new Date().toISOString();
      storage.set(primaryKey, goals);
      storage.set(fallbackKey, goals);

      // Notify other pages and components via BroadcastChannel
      try {
        if (typeof BroadcastChannel !== 'undefined') {
          const channel = new BroadcastChannel('devpilot_habits_realtime');
          channel.postMessage({
            type: 'DAILY_GOAL_CHANGED',
            userId,
            data: targetGoal,
            timestamp: Date.now()
          });
        }
      } catch (e) {}

      return targetGoal;
    }
    return null;
  }

  // ==========================================
  // 3. DSA ROADMAP — NEXT UNFINISHED PROBLEM & STATS
  // ==========================================
  function getNextDSAItem() {
    const roadmap = getDsaRoadmap();
    const storage = getStorage();
    const progress = storage.get('dsa_progress', {}) || {};
    const evaluations = storage.get('dsa_roadmap_evaluations', {}) || {};
    const dsaStats = getDSAProgress();
    const totalPercentage = dsaStats.percentage;

    // Not started: roadmap data unavailable or user has never solved anything
    if (!Array.isArray(roadmap) || roadmap.length === 0 || dsaStats.solved === 0) {
      return {
        hasStarted: false,
        isComplete: false,
        hasData: false,
        title: '',
        problemTitle: '',
        category: 'Data Structures & Algorithms',
        categoryName: 'Data Structures & Algorithms',
        topic: '',
        patternName: '',
        difficulty: '',
        leetcodeNumber: '',
        problemId: null,
        percentage: 0,
        percent: 0,
        totalSolved: dsaStats.solved,
        totalQuestions: dsaStats.total,
        patternPercentage: 0,
        patternSolved: 0,
        patternTotal: 0,
        targetUrl: 'pages/dsa.html'
      };
    }

    let nextProblem = null;
    let nextCategory = null;
    let nextPattern = null;
    let patternSolved = 0;
    let patternTotal = 0;

    for (const cat of roadmap) {
      for (const pat of cat.patterns || []) {
        let pSolved = 0;
        let pTotal = 0;
        let pFirstUnsolved = null;

        for (const q of pat.questions || []) {
          pTotal++;
          const isDone = Boolean(progress[q.id] || evaluations[q.id]);
          if (isDone) {
            pSolved++;
          } else if (!pFirstUnsolved) {
            pFirstUnsolved = q;
          }
        }

        if (pFirstUnsolved && !nextProblem) {
          nextProblem = pFirstUnsolved;
          nextCategory = cat;
          nextPattern = pat;
          patternSolved = pSolved;
          patternTotal = pTotal;
          break;
        }
      }
      if (nextProblem) break;
    }

    if (!nextProblem) {
      return {
        hasStarted: true,
        isComplete: true,
        hasData: true,
        title: 'All DSA Problems Solved 🎉',
        problemTitle: 'All DSA Problems Solved 🎉',
        category: 'DSA Roadmap',
        categoryName: 'DSA Roadmap',
        topic: 'All Patterns Complete',
        patternName: 'All Patterns Complete',
        difficulty: 'Complete',
        leetcodeNumber: '',
        problemId: null,
        percentage: 100,
        percent: 100,
        totalSolved: dsaStats.solved,
        totalQuestions: dsaStats.total,
        patternPercentage: 100,
        patternSolved: 0,
        patternTotal: 0,
        targetUrl: 'pages/dsa.html'
      };
    }

    const catName = nextCategory.title || nextCategory.name || 'Data Structures';
    const patName = nextPattern.name || 'General';
    const patternPercent = patternTotal > 0 ? Math.round((patternSolved / patternTotal) * 100) : 0;

    return {
      hasStarted: true,
      isComplete: false,
      hasData: true,
      title: nextProblem.title,
      problemTitle: nextProblem.title,
      category: catName,
      categoryName: `${catName} • ${patName}`,
      topic: patName,
      patternName: patName,
      difficulty: nextProblem.difficulty || 'Easy',
      leetcodeNumber: nextProblem.leetcodeNumber || nextProblem.number || nextProblem.id,
      problemId: nextProblem.id,
      percentage: totalPercentage, // Total DSA roadmap progress (real DSA progress, matching roadmap widget)
      percent: totalPercentage,
      totalSolved: dsaStats.solved,
      totalQuestions: dsaStats.total,
      patternPercentage: patternPercent,
      patternSolved,
      patternTotal,
      targetUrl: `pages/dsa.html#row-${nextProblem.id}`
    };
  }

  function getDSAProgress() {
    const roadmap = getDsaRoadmap();
    const storage = getStorage();
    const progress = storage.get('dsa_progress', {}) || {};
    const evaluations = storage.get('dsa_roadmap_evaluations', {}) || {};

    let total = 0;
    let solved = 0;
    const diffStats = {
      Easy: { total: 0, solved: 0 },
      Medium: { total: 0, solved: 0 },
      Hard: { total: 0, solved: 0 }
    };

    if (Array.isArray(roadmap)) {
      roadmap.forEach(cat => {
        (cat.patterns || []).forEach(pat => {
          (pat.questions || []).forEach(q => {
            total++;
            const diff = q.difficulty || 'Medium';
            if (diffStats[diff]) diffStats[diff].total++;

            if (progress[q.id] || evaluations[q.id]) {
              solved++;
              if (diffStats[diff]) diffStats[diff].solved++;
            }
          });
        });
      });
    }

    return {
      total,
      solved,
      percentage: total > 0 ? (solved > 0 ? Math.max(1, Math.round((solved / total) * 100)) : 0) : 0,
      diffStats
    };
  }

  function getLeetCodeCount() {
    return getDSAProgress().solved;
  }

  // ==========================================
  // 4. CAREER ROADMAP & INTERVIEW PROGRESS
  // ==========================================
  function getInterviewPrepDetails() {
    let recent = null;
    let progressMap = {};

    try {
      if (typeof localStorage !== 'undefined') {
        const rawRecent = localStorage.getItem('devpilot_interview_prep_recent');
        if (rawRecent) recent = JSON.parse(rawRecent);

        const rawProg = localStorage.getItem('devpilot_interview_prep_progress');
        if (rawProg) progressMap = JSON.parse(rawProg);
      }
    } catch (e) {}

    // Find active / recent category & topic
    let categoryId = recent && recent.categoryId ? recent.categoryId : null;
    let topicName = recent && recent.topic ? recent.topic : null;

    // If no recent, check progressMap for any topic practiced
    if (!categoryId && progressMap && typeof progressMap === 'object') {
      const topicKeys = Object.keys(progressMap).filter(k => k.startsWith('topic:'));
      if (topicKeys.length > 0) {
        const sorted = topicKeys.sort((a, b) => {
          const statA = progressMap[a] || {};
          const statB = progressMap[b] || {};
          return (statB.attempted || 0) - (statA.attempted || 0);
        });
        const parts = sorted[0].split(':');
        if (parts.length >= 3) {
          categoryId = parts[1];
          topicName = parts[2];
        }
      }
    }

    // Brand-new user: no interview activity yet — signal not started
    if (!categoryId) {
      return {
        hasStarted: false,
        categoryId: null,
        categoryTitle: 'Interview Prep',
        categoryIcon: 'quiz',
        topicName: '',
        questionsTotal: 0,
        questionsAttempted: 0,
        questionsCorrect: 0,
        percentage: 0,
        nextQuestion: ''
      };
    }

    let categoryTitle = 'Operating Systems';
    let categoryIcon = 'memory';
    let questions = [];
    let nextQuestion = '';

    const registry = getInterviewRegistry();
    if (registry && typeof registry.getCategory === 'function') {
      const cat = registry.getCategory(categoryId);
      if (cat) {
        categoryTitle = cat.title || categoryTitle;
        categoryIcon = cat.icon || categoryIcon;
        if (topicName && topicName !== 'All Topics' && typeof registry.getQuestionsByTopic === 'function') {
          questions = registry.getQuestionsByTopic(categoryId, topicName) || [];
        }
        if (questions.length === 0 && Array.isArray(cat.questions) && cat.questions.length > 0) {
          if (!topicName || topicName === 'All Topics') {
            topicName = cat.questions[0].topic || 'Core Fundamentals';
          }
          questions = cat.questions.filter(q => q.topic && q.topic.toLowerCase() === topicName.toLowerCase());
          if (questions.length === 0) questions = cat.questions.slice(0, 10);
        }
      }
    }

    // Calculate topic stats
    const tKey = `topic:${categoryId}:${topicName}`;
    const topicProg = progressMap[tKey] || { attempted: 0, correct: 0 };
    const topicTotal = questions.length > 0 ? questions.length : 10;
    const topicAttempted = topicProg.attempted || 0;
    const topicCorrect = topicProg.correct || 0;
    const topicPercent = topicTotal > 0 ? Math.min(100, Math.round((topicAttempted / topicTotal) * 100)) : 0;

    // Pick active or next unattempted question
    if (questions.length > 0) {
      const unattempted = questions.find(q => {
        const qStat = progressMap[`q:${q.id}`];
        return !qStat || !qStat.attempted;
      });
      if (unattempted && unattempted.question) {
        nextQuestion = unattempted.question;
      } else if (questions[0] && questions[0].question) {
        nextQuestion = questions[0].question;
      }
    }

    return {
      hasStarted: true,
      categoryId,
      categoryTitle,
      categoryIcon,
      topicName: topicName || 'Core Fundamentals',
      questionsTotal: topicTotal,
      questionsAttempted: topicAttempted,
      questionsCorrect: topicCorrect,
      percentage: topicPercent,
      nextQuestion
    };
  }

  function getCareerRoadmapProgress() {
    const engine = getCareerEngine();
    const roles = getCareerRoles();
    const roadmaps = getCareerRoadmaps();
    const dsaProgress = getDSAProgress();
    const interviewDetails = getInterviewPrepDetails();

    const rawState = engine && typeof engine.getCareerState === 'function' ? engine.getCareerState() : {};
    const state = (rawState && typeof rawState === 'object') ? rawState : {};

    // Career section: ONLY show if user explicitly activated a role
    const hasActiveCareer = !!(state.activeCareer);
    let activeCareerId = state.activeCareer || null;

    // If no active career explicitly set, check if user has ANY progress on any role
    // (handles legacy data where activeCareer flag may not have been set)
    if (!activeCareerId && roles && roles.length > 0) {
      for (const r of roles) {
        if (state[r.id] && Array.isArray(state[r.id].completed) && state[r.id].completed.length > 0) {
          activeCareerId = r.id;
          break;
        }
      }
      // If STILL none → user has never started career roadmap
    }

    const role = activeCareerId
      ? ((roles || []).find(r => r.id === activeCareerId) || null)
      : null;
    const roleTitle = role ? role.title : '';

    // Use lazy getRoadmapForRole() to handle any script load order
    const roadmap = activeCareerId ? getRoadmapForRole(activeCareerId, role) : null;

    let careerTotalSkills = 0;
    let careerCompletedSkills = 0;
    let careerPercent = 0;
    let currentLevelName = 'Foundation';
    let currentLevelNum = 1;
    let nextSkillTitle = '';

    if (roadmap && Array.isArray(roadmap.levels)) {
      const roleProg = state[activeCareerId] || { completed: [] };
      const completedSet = new Set(roleProg.completed || []);

      roadmap.levels.forEach(lvl => {
        (lvl.skills || []).forEach(s => {
          careerTotalSkills++;
          if (completedSet.has(s.id)) {
            careerCompletedSkills++;
          }
        });
      });

      careerPercent = careerTotalSkills > 0
        ? Math.min(100, Math.round((careerCompletedSkills / careerTotalSkills) * 100))
        : 0;

      if (engine && typeof engine.getYouAreHereInfo === 'function') {
        try {
          const here = engine.getYouAreHereInfo(activeCareerId, roadmap, state);
          if (here) {
            currentLevelName = here.currentLevelName || currentLevelName;
            currentLevelNum = here.currentLevelNum || 1;
            if (here.nextSkill && here.nextSkill.title) {
              nextSkillTitle = here.nextSkill.title;
            } else if (here.currentSkill && here.currentSkill.title) {
              nextSkillTitle = here.currentSkill.title;
            }
          }
        } catch (e) {}
      }
    }

    const dsaSolved = typeof dsaProgress.solved === 'number' ? dsaProgress.solved : 0;
    const dsaTotal = typeof dsaProgress.total === 'number' ? dsaProgress.total : 240;
    const dsaPercentage = typeof dsaProgress.percentage === 'number' ? dsaProgress.percentage : 0;
    const nextDSA = getNextDSAItem();
    const dsaNextText = nextDSA && nextDSA.problemTitle ? `Next: ${nextDSA.problemTitle}` : 'Practice Algorithmic Patterns';
    const careerNextText = nextSkillTitle ? `Next: ${nextSkillTitle}` : 'Explore Role Roadmap';

    // Build milestones conditionally — only include sections the user has actually started
    const milestones = [];

    // 1. DSA — only if user has solved at least one problem
    if (dsaSolved > 0 || nextDSA.hasStarted) {
      milestones.push({
        title: 'Data Structures & Algorithms',
        percentage: dsaPercentage,
        subtitle: `${dsaSolved} / ${dsaTotal} Problems Solved`,
        activePreview: dsaNextText,
        previewIcon: 'code',
        type: 'dsa',
        badge: 'DSA',
        url: 'pages/dsa.html'
      });
    }

    // 2. Career Roadmap — only if user explicitly activated a role OR has progress
    if (activeCareerId) {
      // Build per-level breakdown for rich card display
      const careerLevels = [];
      if (roadmap && Array.isArray(roadmap.levels)) {
        const roleProg = state[activeCareerId] || { completed: [] };
        const completedSet = new Set(roleProg.completed || []);
        roadmap.levels.forEach(lvl => {
          const lvlSkills = lvl.skills || [];
          const lvlCompleted = lvlSkills.filter(s => completedSet.has(s.id)).length;
          const lvlTotal = lvlSkills.length;
          const lvlPercent = lvlTotal > 0 ? Math.round((lvlCompleted / lvlTotal) * 100) : 0;
          careerLevels.push({
            num: lvl.levelNum || 1,
            name: lvl.name || `Level ${lvl.levelNum}`,
            completed: lvlCompleted,
            total: lvlTotal,
            percent: lvlPercent,
            isActive: lvl.levelNum === currentLevelNum
          });
        });
      }

      milestones.push({
        title: `Career: ${roleTitle}`,
        percentage: careerPercent,
        subtitle: `Level ${currentLevelNum}: ${currentLevelName} • ${careerCompletedSkills}/${careerTotalSkills} Skills`,
        activePreview: careerNextText,
        previewIcon: 'school',
        type: 'career',
        badge: 'Career',
        roleId: activeCareerId,
        url: `pages/roadmaps.html#role=${activeCareerId}`,
        isCommitted: hasActiveCareer,
        levels: careerLevels,
        currentLevelNum,
        currentLevelName,
        totalSkills: careerTotalSkills,
        completedSkills: careerCompletedSkills
      });
    }

    // 3. Interview Prep — only if user has actually attempted questions
    if (interviewDetails.hasStarted && interviewDetails.questionsAttempted > 0) {
      const interviewNextText = interviewDetails.nextQuestion ? `Q: ${interviewDetails.nextQuestion}` : 'Continue Interview Prep';
      milestones.push({
        title: `Interview: ${interviewDetails.categoryTitle}`,
        percentage: interviewDetails.percentage,
        subtitle: `Subsection: ${interviewDetails.topicName} • ${interviewDetails.questionsAttempted}/${interviewDetails.questionsTotal} Qs`,
        question: interviewDetails.nextQuestion,
        activePreview: interviewNextText,
        previewIcon: 'quiz',
        type: 'interview',
        badge: 'Interview',
        categoryId: interviewDetails.categoryId,
        topicName: interviewDetails.topicName,
        url: `pages/interviewPrep.html?cat=${interviewDetails.categoryId}&topic=${encodeURIComponent(interviewDetails.topicName || '')}`
      });
    }

    const nextMilestone = nextSkillTitle
      ? `${nextSkillTitle}${roleTitle ? ` (${roleTitle})` : ''}`
      : (milestones.length > 0 ? 'Keep progressing on your active roadmap' : null);

    return {
      hasActiveCareer,
      roleTitle,
      percent: careerPercent,
      activeCareerId,
      milestones,
      nextMilestone,
      career: {
        roleId: activeCareerId,
        roleTitle,
        percentage: careerPercent,
        completedSkills: careerCompletedSkills,
        totalSkills: careerTotalSkills,
        currentLevelName,
        currentLevelNum,
        nextSkillTitle
      },
      interviewPrep: {
        section: interviewDetails.categoryTitle,
        subSection: interviewDetails.topicName,
        question: interviewDetails.nextQuestion,
        percentage: interviewDetails.percentage,
        attempted: interviewDetails.questionsAttempted,
        total: interviewDetails.questionsTotal,
        categoryId: interviewDetails.categoryId
      }
    };
  }

  // ==========================================
  // 5. INTERVIEW PREP PROGRESS
  // ==========================================
  function getInterviewPrepProgress() {
    let progressMap = {};
    try {
      if (typeof localStorage !== 'undefined') {
        const raw = localStorage.getItem('devpilot_interview_prep_progress');
        if (raw) progressMap = JSON.parse(raw);
      }
    } catch (e) {}

    let totalAttempted = 0;
    let totalCorrect = 0;
    let completedTopicsCount = 0;

    Object.values(progressMap).forEach(stat => {
      if (stat && stat.attempted) {
        totalAttempted += stat.attempted;
        totalCorrect += (stat.correct || 0);
      }
      if (stat && stat.completed) {
        completedTopicsCount++;
      }
    });

    const accuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;
    // Normalized baseline across the 18 categories (~2,170 questions)
    const estimatedTotalQuestions = 2170;
    const progressPercent = Math.min(100, Math.round((totalAttempted / Math.max(1, 150)) * 100)); // Scaled milestone of 150 practice MCQs

    return {
      totalAttempted,
      totalCorrect,
      accuracy,
      completedTopicsCount,
      percent: totalAttempted > 0 ? Math.max(5, progressPercent) : 0,
      totalAvailable: estimatedTotalQuestions
    };
  }

  // ==========================================
  // 6. NOTES COUNT
  // ==========================================
  function getNotesCount() {
    const storage = getStorage();
    // Only read from the actual user-saved notes store — never fall back to template data
    const storedNotes = storage.get('dev_notes', null);
    if (Array.isArray(storedNotes)) {
      return storedNotes.length;
    }
    // No notes saved yet
    return 0;
  }

  // ==========================================
  // 7. GITHUB SETTINGS & ACTIVITY ENGINE
  // ==========================================
  function getGithubSettings() {
    const storage = getStorage();
    const stored = storage.get(STORAGE_KEY_GITHUB_SETTINGS, null);
    if (stored && stored.username && stored.username.trim()) {
      return { username: stored.username.trim(), isConfigured: true };
    }
    // No username configured — user has never set up GitHub
    return { username: '', isConfigured: false };
  }

  function setGithubSettings(username) {
    const storage = getStorage();
    const cleanUser = (username || '').trim().replace(/^@/, '');
    const settingsObj = { username: cleanUser, isConfigured: !!cleanUser };
    storage.set(STORAGE_KEY_GITHUB_SETTINGS, settingsObj);
    return settingsObj;
  }

  async function getGithubActivity(forceRefresh = false) {
    const { username } = getGithubSettings();
    const cacheKey = `${STORAGE_KEY_GITHUB_CACHE_PREFIX}${username}`;
    const storage = getStorage();

    // 1. Check local cache unless forceRefresh
    if (!forceRefresh) {
      const cached = storage.get(cacheKey, null);
      if (cached && cached.timestamp && (Date.now() - cached.timestamp < GITHUB_CACHE_TTL_MS)) {
        return { ...cached.data, fromCache: true, username };
      }
    }

    // 2. Fetch fresh public events from GitHub REST API
    try {
      const url = `https://api.github.com/users/${encodeURIComponent(username)}/events/public?per_page=30`;
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('GitHub API rate limit reached (60/hr). Please wait or retry in a few minutes.');
        }
        if (response.status === 404) {
          throw new Error(`GitHub user "${username}" was not found.`);
        }
        throw new Error(`GitHub API returned status ${response.status}`);
      }

      const events = await response.json();
      if (!Array.isArray(events)) {
        throw new Error('Invalid response format from GitHub');
      }

      // 3. Process Events & Count Commits This Week
      const now = new Date();
      // Start of current week (Monday at 00:00:00)
      const dayOfWeek = now.getDay();
      const diffToMon = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;
      const monday = new Date(now);
      monday.setDate(now.getDate() + diffToMon);
      monday.setHours(0, 0, 0, 0);

      let commitsThisWeek = 0;
      const formattedEvents = [];

      events.forEach(evt => {
        const evtDate = new Date(evt.created_at);
        const repoName = (evt.repo && evt.repo.name) ? evt.repo.name.split('/')[1] || evt.repo.name : 'repository';

        if (evt.type === 'PushEvent') {
          const commits = (evt.payload && Array.isArray(evt.payload.commits)) ? evt.payload.commits : [];
          const commitCount = (evt.payload && evt.payload.size) || commits.length || 1;

          if (evtDate >= monday) {
            commitsThisWeek += commitCount;
          }

          const topCommitMsg = commits.length > 0 ? commits[0].message.split('\n')[0] : `Pushed ${commitCount} commit(s)`;
          formattedEvents.push({
            id: evt.id,
            type: 'push',
            icon: 'commit',
            title: topCommitMsg,
            repo: repoName,
            createdAt: evt.created_at,
            timeAgoStr: formatTimeAgo(evt.created_at),
            url: `https://github.com/${evt.repo ? evt.repo.name : username}`
          });
        } else if (evt.type === 'PullRequestEvent') {
          const pr = evt.payload && evt.payload.pull_request;
          const action = evt.payload && evt.payload.action;
          formattedEvents.push({
            id: evt.id,
            type: 'pr',
            icon: 'merge',
            title: pr ? `${action || 'Updated'} PR: ${pr.title}` : 'Pull Request Activity',
            repo: repoName,
            createdAt: evt.created_at,
            timeAgoStr: formatTimeAgo(evt.created_at),
            url: pr ? pr.html_url : `https://github.com/${evt.repo ? evt.repo.name : username}`
          });
        } else if (evt.type === 'CreateEvent') {
          const refType = evt.payload ? evt.payload.ref_type : 'branch';
          formattedEvents.push({
            id: evt.id,
            type: 'create',
            icon: 'add_circle',
            title: `Created ${refType} ${evt.payload && evt.payload.ref ? evt.payload.ref : ''}`.trim(),
            repo: repoName,
            createdAt: evt.created_at,
            timeAgoStr: formatTimeAgo(evt.created_at),
            url: `https://github.com/${evt.repo ? evt.repo.name : username}`
          });
        } else if (evt.type === 'IssuesEvent') {
          const issue = evt.payload && evt.payload.issue;
          formattedEvents.push({
            id: evt.id,
            type: 'issue',
            icon: 'bug_report',
            title: issue ? `Issue: ${issue.title}` : 'Issue updated',
            repo: repoName,
            createdAt: evt.created_at,
            timeAgoStr: formatTimeAgo(evt.created_at),
            url: issue ? issue.html_url : `https://github.com/${evt.repo ? evt.repo.name : username}`
          });
        } else if (evt.type === 'WatchEvent' || evt.type === 'ForkEvent') {
          formattedEvents.push({
            id: evt.id,
            type: 'star',
            icon: 'star',
            title: evt.type === 'ForkEvent' ? 'Forked repository' : 'Starred repository',
            repo: repoName,
            createdAt: evt.created_at,
            timeAgoStr: formatTimeAgo(evt.created_at),
            url: `https://github.com/${evt.repo ? evt.repo.name : username}`
          });
        }
      });

      const resultData = {
        username,
        commitsThisWeek,
        weeklyCommits: commitsThisWeek,
        events: formattedEvents.slice(0, 5),
        updatedAt: Date.now()
      };

      // Save to cache
      storage.set(cacheKey, {
        timestamp: Date.now(),
        data: resultData
      });

      return { ...resultData, fromCache: false };
    } catch (err) {
      console.warn('[DashboardDataService] Error loading GitHub activity:', err);
      // If we have stale cache, return it with error indicator
      const cached = storage.get(cacheKey, null);
      if (cached && cached.data) {
        return { ...cached.data, fromCache: true, isStale: true, error: err.message, username };
      }
      return {
        username,
        commitsThisWeek: 0,
        weeklyCommits: 0,
        events: [],
        error: err.message,
        updatedAt: Date.now()
      };
    }
  }

  // ==========================================
  // 8. RECENT ACTIVITY STREAM
  // ==========================================
  async function getRecentActivity() {
    const storage = getStorage();
    const activities = [];

    // 1. GitHub Activity (Highest priority)
    try {
      const gh = await getGithubActivity();
      if (gh && Array.isArray(gh.events)) {
        gh.events.slice(0, 3).forEach(evt => {
          activities.push({
            id: `gh_${evt.id}`,
            source: 'github',
            type: 'github',
            title: evt.title,
            text: evt.title,
            subtitle: `${evt.repo} • ${evt.timeAgoStr}`,
            timeAgo: evt.timeAgoStr,
            dotColor: '#10b981', // Emerald
            timestamp: new Date(evt.createdAt).getTime(),
            url: evt.url
          });
        });
      }
    } catch (e) {}

    // 2. Real Solved LeetCode / DSA Problems
    try {
      const evaluations = storage.get('dsa_roadmap_evaluations', {}) || {};
      const roadmap = getDsaRoadmap();
      const solvedIds = Object.keys(evaluations);

      if (solvedIds.length > 0 && Array.isArray(roadmap)) {
        // Take latest solved question
        const latestId = solvedIds[solvedIds.length - 1];
        let foundQ = null;
        for (const cat of roadmap) {
          for (const pat of cat.patterns || []) {
            const match = (pat.questions || []).find(q => String(q.id) === String(latestId));
            if (match) { foundQ = match; break; }
          }
          if (foundQ) break;
        }

        if (foundQ) {
          activities.push({
            id: `dsa_${foundQ.id}`,
            source: 'dsa',
            type: 'dsa',
            title: `Solved ${foundQ.title}`,
            text: `Solved ${foundQ.title}`,
            subtitle: `#${foundQ.leetcodeNumber || foundQ.id} • DSA Roadmap`,
            timeAgo: 'Recently',
            dotColor: '#4f46e5', // Indigo
            timestamp: Date.now() - (2 * 3600 * 1000), // Recent within today
            url: `pages/dsa.html#row-${foundQ.id}`
          });
        }
      }
    } catch (e) {}

    // 3. Real Notes Created
    try {
      const notes = storage.get('dev_notes', []);
      if (Array.isArray(notes) && notes.length > 0) {
        const latestNote = notes[0];
        activities.push({
          id: `note_${latestNote.id}`,
          source: 'notes',
          type: 'notes',
          title: `Created Note: ${latestNote.title}`,
          text: `Created Note: ${latestNote.title}`,
          subtitle: `${latestNote.category || 'General'} • Notes Knowledge Base`,
          timeAgo: formatTimeAgo(latestNote.createdAt),
          dotColor: '#f59e0b', // Amber
          timestamp: latestNote.createdAt ? new Date(latestNote.createdAt).getTime() : Date.now() - (5 * 3600 * 1000),
          url: 'pages/notes.html'
        });
      }
    } catch (e) {}

    // 4. Real Focus Timer Sessions
    try {
      const sessions = storage.get('timer_sessions', []);
      if (Array.isArray(sessions) && sessions.length > 0) {
        const latestSession = sessions[0];
        const durMin = Math.round((latestSession.durationSeconds || 1500) / 60);
        activities.push({
          id: `timer_${latestSession.id}`,
          source: 'timer',
          type: 'timer',
          title: `Completed ${durMin}m Focus: ${latestSession.task || 'Deep Work'}`,
          text: `Completed ${durMin}m Focus: ${latestSession.task || 'Deep Work'}`,
          subtitle: `Pomodoro Timer • ${formatTimeAgo(latestSession.completedAt)}`,
          timeAgo: formatTimeAgo(latestSession.completedAt),
          dotColor: '#8b5cf6', // Violet
          timestamp: new Date(latestSession.completedAt).getTime(),
          url: 'pages/timer.html'
        });
      }
    } catch (e) {}

    // Sort newest first and limit to 4 items
    activities.sort((a, b) => b.timestamp - a.timestamp);

    // Return empty array for fresh users — dashboard will show intentional empty state
    return activities.slice(0, 4);
  }

  // ==========================================
  // 9. AI SUGGESTION ENGINE (Deterministic)
  // ==========================================
  function getAISuggestion() {
    const nextDSA = getNextDSAItem();
    const career = getCareerRoadmapProgress();
    const interviewProg = getInterviewPrepProgress();

    // Check if user has ANY real activity to base a suggestion on
    const hasDSAActivity = nextDSA.hasStarted === true;
    const hasCareerActivity = !!(career.activeCareerId);
    const hasInterviewActivity = interviewProg.totalAttempted > 0;
    const hasAnyActivity = hasDSAActivity || hasCareerActivity || hasInterviewActivity;

    // New user: no activity → return empty state signal
    if (!hasAnyActivity) {
      return {
        hasActivity: false,
        track: '',
        icon: 'auto_awesome',
        badge: '',
        description: '',
        reason: '',
        topic: '',
        title: '',
        subtext: '',
        buttonText: 'Get Started',
        chatPrompt: null,
        targetUrl: 'pages/dsa.html'
      };
    }

    // Priority 1: If active career track has an upcoming skill
    if (career.hasActiveCareer && career.career && career.career.nextSkillTitle) {
      const nextSkill = career.career.nextSkillTitle;
      const chatPrompt = `Explain the core concepts and implementation best practices for "${nextSkill}" in ${career.roleTitle}.`;
      return {
        hasActivity: true,
        track: 'Career Roadmap',
        icon: 'alt_route',
        badge: 'Career Milestone',
        description: `Advance your ${career.roleTitle} roadmap by mastering this core milestone.`,
        reason: `Advance your ${career.roleTitle} roadmap by mastering this core milestone.`,
        topic: nextSkill,
        title: nextSkill,
        subtext: `Level ${career.career.currentLevelNum} • ${career.roleTitle}`,
        buttonText: 'Ask AI to Explain',
        chatPrompt,
        careerUrl: 'pages/roadmaps.html',
        targetUrl: `pages/chat.html?prompt=${encodeURIComponent(chatPrompt)}`
      };
    }

    // Priority 2: Next unfinished DSA problem (only if user has actually started DSA)
    if (hasDSAActivity && nextDSA.problemId && !nextDSA.isComplete) {
      const chatPrompt = `How to solve "${nextDSA.problemTitle}"? Please explain the intuition, optimal approach, and provide clean JavaScript code with time & space complexity.`;
      return {
        hasActivity: true,
        track: 'DSA Mastery',
        icon: 'psychology',
        badge: 'Recommended Problem',
        description: `Based on your DSA learning flow, solving this will strengthen your ${nextDSA.patternName} intuition.`,
        reason: `Based on your DSA learning flow, solving this will strengthen your ${nextDSA.patternName} intuition.`,
        topic: `${nextDSA.problemTitle}`,
        title: `${nextDSA.problemTitle}`,
        subtext: `${nextDSA.categoryName} • ${nextDSA.difficulty}`,
        buttonText: 'Ask AI to Solve',
        chatPrompt,
        dsaUrl: nextDSA.targetUrl,
        targetUrl: `pages/chat.html?prompt=${encodeURIComponent(chatPrompt)}`
      };
    }

    // Priority 3: Career activity exists — suggest exploring career skills
    if (hasCareerActivity && career.roleTitle) {
      const chatPrompt = `What are the most important skills for a ${career.roleTitle} and how should I learn them systematically?`;
      return {
        hasActivity: true,
        track: 'Career Roadmap',
        icon: 'alt_route',
        badge: 'Career Growth',
        description: `Continue building your ${career.roleTitle} skill set.`,
        reason: `Continue building your ${career.roleTitle} skill set.`,
        topic: `${career.roleTitle} Skills`,
        title: `${career.roleTitle} Skills`,
        subtext: 'Career roadmap in progress',
        buttonText: 'Ask AI',
        chatPrompt,
        targetUrl: `pages/chat.html?prompt=${encodeURIComponent(chatPrompt)}`
      };
    }

    // Priority 4: Interview activity exists
    const fallbackPrompt = 'What are the most important interview topics for software engineers and how should I prepare?';
    return {
      hasActivity: true,
      track: 'Interview Prep',
      icon: 'quiz',
      badge: 'Interview Practice',
      description: 'Keep practicing interview questions to build confidence.',
      reason: 'Keep practicing interview questions to build confidence.',
      topic: 'Interview Preparation',
      title: 'Interview Preparation',
      subtext: 'Based on your recent practice',
      buttonText: 'Ask AI',
      chatPrompt: fallbackPrompt,
      targetUrl: `pages/chat.html?prompt=${encodeURIComponent(fallbackPrompt)}`
    };
  }

  // ==========================================
  // 10. CALENDAR DATA ENGINE
  // ==========================================
  function getCalendarData(year, month, selectedDateStr = null) {
    const now = new Date();
    const curYear = year !== undefined && year !== null ? year : now.getFullYear();
    const curMonth = month !== undefined && month !== null ? month : now.getMonth(); // 0-indexed

    const todayStr = getTodayDateStr();
    const activeDate = selectedDateStr || todayStr;

    // Month title (e.g. "October 2026")
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const monthTitle = `${monthNames[curMonth]} ${curYear}`;

    // Days in current month
    const firstDayOfMonth = new Date(curYear, curMonth, 1).getDay(); // 0 is Sun, 1 is Mon...
    const daysInMonth = new Date(curYear, curMonth + 1, 0).getDate();

    // Days in previous month
    const daysInPrevMonth = new Date(curYear, curMonth, 0).getDate();

    // Collect habit completions from storage for activity dots
    const storage = getStorage();
    const activeDatesSet = new Set();
    const completions = storage.get('habits_completions', []);
    if (Array.isArray(completions)) {
      completions.forEach(c => {
        if (c && c.completion_date) activeDatesSet.add(c.completion_date);
        else if (typeof c === 'string') activeDatesSet.add(c);
      });
    }

    const cells = [];

    // Previous month trailing days
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const dayNum = daysInPrevMonth - i;
      const prevMonthIdx = curMonth === 0 ? 11 : curMonth - 1;
      const prevYear = curMonth === 0 ? curYear - 1 : curYear;
      const dateStr = `${prevYear}-${String(prevMonthIdx + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;

      cells.push({
        dayNum,
        dayNumber: dayNum,
        dateStr,
        isCurrentMonth: false,
        isToday: dateStr === todayStr,
        isSelected: dateStr === activeDate,
        hasActivity: activeDatesSet.has(dateStr)
      });
    }

    // Current month days
    for (let dayNum = 1; dayNum <= daysInMonth; dayNum++) {
      const dateStr = `${curYear}-${String(curMonth + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;

      cells.push({
        dayNum,
        dayNumber: dayNum,
        dateStr,
        isCurrentMonth: true,
        isToday: dateStr === todayStr,
        isSelected: dateStr === activeDate,
        hasActivity: activeDatesSet.has(dateStr)
      });
    }

    // Next month leading days to complete grid (multiples of 7)
    const remainingSlots = (7 - (cells.length % 7)) % 7;
    for (let dayNum = 1; dayNum <= remainingSlots; dayNum++) {
      const nextMonthIdx = curMonth === 11 ? 0 : curMonth + 1;
      const nextYear = curMonth === 11 ? curYear + 1 : curYear;
      const dateStr = `${nextYear}-${String(nextMonthIdx + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;

      cells.push({
        dayNum,
        dayNumber: dayNum,
        dateStr,
        isCurrentMonth: false,
        isToday: dateStr === todayStr,
        isSelected: dateStr === activeDate,
        hasActivity: activeDatesSet.has(dateStr)
      });
    }

    return {
      year: curYear,
      month: curMonth,
      monthName: monthTitle,
      monthTitle,
      selectedDate: activeDate,
      days: cells,
      cells
    };
  }

  // ==========================================
  // 11. TODAY FOCUS TIME
  // ==========================================
  function getFocusTimeToday() {
    const storage = getStorage();
    const userId = getUserId();

    // Check user-scoped key first, then fallback
    let rawSessions = storage.get(`u_${userId}_timer_sessions`, null);
    if (!Array.isArray(rawSessions)) {
      rawSessions = storage.get(`devpilot_u_${userId}_timer_sessions`, null);
    }
    if (!Array.isArray(rawSessions) && userId === '00000000-0000-4000-a000-000000000001') {
      rawSessions = storage.get('timer_sessions', []);
    }
    if (!Array.isArray(rawSessions)) rawSessions = [];

    const sessions = rawSessions.map(s => {
      if (!s) return null;
      const durationSeconds = s.durationSeconds || (s.durationMinutes ? s.durationMinutes * 60 : 0);
      const completedAt = s.completedAt || s.date || new Date().toISOString();
      return Object.assign({}, s, {
        durationSeconds,
        completedAt,
        mode: s.mode || 'work'
      });
    }).filter(Boolean);

    const timerData = getTimerData();

    if (timerData && typeof timerData.calculateTodayStats === 'function') {
      const stats = timerData.calculateTodayStats(sessions);
      const minutes = stats.todayFocusMinutes || 0;
      const hours = Math.floor(minutes / 60);
      const remMins = minutes % 60;

      let displayStr = '0m';
      if (hours > 0 && remMins > 0) {
        displayStr = `${hours}h ${remMins}m`;
      } else if (hours > 0) {
        displayStr = `${hours}h`;
      } else if (minutes > 0) {
        displayStr = `${minutes}m`;
      }

      return {
        minutes,
        displayStr,
        sessionsCount: stats.todayFocusCount || 0
      };
    }

    return { minutes: 0, displayStr: '0m', sessionsCount: 0 };
  }

  // ==========================================
  // 12. TODAY TASKS SUMMARY
  // ==========================================
  // ==========================================
  // HABIT TASK FUNCTIONS (for Today's Tasks)
  // ==========================================

  /**
   * Returns today's applicable Developer Habits as task objects.
   * Respects scheduling (daily / weekdays / custom days) and active state.
   */
  function getTodayHabitTasks(dateStr = null) {
    const targetDate = dateStr || getTodayDateStr();
    const storage = getStorage();
    const userId = getUserId();
    const habitsData = getHabitsData();

    // Read habits
    let habits = storage.get(`devpilot_u_${userId}_habits`, null);
    if (!Array.isArray(habits)) habits = storage.get(`u_${userId}_habits`, null);
    if (!Array.isArray(habits) && userId === '00000000-0000-4000-a000-000000000001') {
      habits = storage.get('habits_data', null);
    }
    if (!Array.isArray(habits)) habits = [];

    // Read completions
    let completions = storage.get(`devpilot_u_${userId}_completions`, null);
    if (!Array.isArray(completions)) completions = storage.get(`u_${userId}_completions`, null);
    if (!Array.isArray(completions) && userId === '00000000-0000-4000-a000-000000000001') {
      completions = storage.get('habits_completions', null);
    }
    if (!Array.isArray(completions)) completions = [];

    // Build completion lookup: { habitId: { date: true } }
    const completionMap = {};
    completions.forEach(c => {
      if (!c || !c.habit_id || !c.completion_date) return;
      if (!completionMap[c.habit_id]) completionMap[c.habit_id] = {};
      completionMap[c.habit_id][c.completion_date] = true;
    });

    // Filter habits scheduled for targetDate
    const activeHabits = habits.filter(h => h.active !== false);
    const scheduledHabits = habitsData && typeof habitsData.isHabitScheduledOn === 'function'
      ? activeHabits.filter(h => habitsData.isHabitScheduledOn(h, targetDate))
      : activeHabits; // fallback: all active habits if HabitsData unavailable

    return scheduledHabits.map(h => {
      const isCompleted = !!(completionMap[h.id] && completionMap[h.id][targetDate]);
      return {
        id: h.id,
        title: h.title,
        category: h.category || 'Habit',
        completed: isCompleted,
        source: 'habit', // discriminator
        time: h.reminder_time || h.reminderTime || '',
        habitId: h.id
      };
    });
  }

  /**
   * Returns merged task list: Developer Habits first, then Daily Goals.
   * Each item has a `source` field: 'habit' | 'goal'.
   */
  function getMergedTodayTasks(dateStr = null) {
    const targetDate = dateStr || getTodayDateStr();
    const habits = getTodayHabitTasks(targetDate);
    const goals = getDailyGoals(targetDate);
    const goalsWithSource = (Array.isArray(goals) ? goals : []).map(g => ({ ...g, source: 'goal' }));

    const allTasks = [...habits, ...goalsWithSource];
    const total = allTasks.length;
    const completed = allTasks.filter(t => !!t.completed).length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      habits,
      goals: goalsWithSource,
      allTasks,
      total,
      completed,
      percentage
    };
  }

  /**
   * Toggles a Developer Habit completion for a specific date.
   * Mirrors HabitService.toggleCompletion logic but available synchronously in DashboardDataService.
   */
  function toggleHabitCompletion(habitId, dateStr) {
    const storage = getStorage();
    const userId = getUserId();

    // Try HabitService first (async, but we still fire it for Supabase sync)
    const hs = getHabitService();
    if (hs && typeof hs.toggleCompletion === 'function') {
      try { hs.toggleCompletion(habitId, dateStr); } catch (e) {}
    }

    // Sync local store update
    const primaryKey = `devpilot_u_${userId}_completions`;
    const fallbackKey = `u_${userId}_completions`;
    let completions = storage.get(primaryKey, null);
    if (!Array.isArray(completions)) completions = storage.get(fallbackKey, null);
    if (!Array.isArray(completions)) completions = storage.get('habits_completions', []);
    if (!Array.isArray(completions)) completions = [];

    const existingIdx = completions.findIndex(
      c => c.habit_id === habitId && c.completion_date === dateStr
    );

    let isNowCompleted = false;
    if (existingIdx !== -1) {
      completions.splice(existingIdx, 1);
      isNowCompleted = false;
    } else {
      completions.push({
        id: `hc_${Date.now()}`,
        user_id: userId,
        habit_id: habitId,
        completion_date: dateStr,
        created_at: new Date().toISOString()
      });
      isNowCompleted = true;
    }

    storage.set(primaryKey, completions);
    storage.set(fallbackKey, completions);

    // Broadcast to other pages
    try {
      if (typeof BroadcastChannel !== 'undefined') {
        const channel = new BroadcastChannel('devpilot_habits_realtime');
        channel.postMessage({
          type: 'COMPLETION_CHANGED',
          userId,
          data: { habitId, dateStr, completed: isNowCompleted },
          timestamp: Date.now()
        });
        channel.close();
      }
    } catch (e) {}

    return { completed: isNowCompleted, habitId, dateStr };
  }

  function getTodayTasksSummary() {
    const todayStr = getTodayDateStr();
    const merged = getMergedTodayTasks(todayStr);
    return {
      completed: merged.completed,
      total: merged.total,
      percentage: merged.percentage,
      fractionText: `${merged.completed} / ${merged.total}`,
      percentageText: `${merged.percentage}% today`
    };
  }

  // ==========================================
  // 13. TOP SKILL ENGINE (WEIGHTED ACTIVITY SCORE)
  // ==========================================
  function getTopSkill(timeframe = 'week') {
    const storage = getStorage();
    const userId = getUserId();
    const todayDate = new Date();
    const todayStr = getTodayDateStr();

    // Calculate Monday of current week
    const refD = new Date(todayDate.getTime());
    const dayOfWeek = refD.getDay(); // 0 is Sun, 1 is Mon...
    const diffToMon = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;
    const monday = new Date(refD);
    monday.setDate(refD.getDate() + diffToMon);
    const mondayYear = monday.getFullYear();
    const mondayMonth = String(monday.getMonth() + 1).padStart(2, '0');
    const mondayDay = String(monday.getDate()).padStart(2, '0');
    const mondayStr = `${mondayYear}-${mondayMonth}-${mondayDay}`;

    // Preferred language for DSA
    const preferredLang = (storage.get('dsa_preferred_lang', 'cpp') || 'cpp').toLowerCase();
    let dsaSkillName = 'DSA in C++';
    if (preferredLang === 'python') dsaSkillName = 'DSA in Python';
    else if (preferredLang === 'javascript' || preferredLang === 'js') dsaSkillName = 'DSA in JavaScript';
    else if (preferredLang === 'java') dsaSkillName = 'DSA in Java';
    else if (preferredLang === 'typescript' || preferredLang === 'ts') dsaSkillName = 'DSA in TypeScript';

    const skillsMap = {};

    function registerActivity(skillName, options = {}) {
      if (!skillName) return;
      const cleanName = String(skillName).trim();
      if (!cleanName) return;

      const normKey = cleanName.toLowerCase();
      if (!skillsMap[normKey]) {
        let icon = 'terminal';
        if (/dsa|leetcode|algorithm|data struct/i.test(cleanName)) icon = 'data_object';
        else if (/frontend|react|vue|css|html|ui/i.test(cleanName)) icon = 'devices';
        else if (/backend|node|express|api|database|sql/i.test(cleanName)) icon = 'dns';
        else if (/system design|architecture|scalability/i.test(cleanName)) icon = 'architecture';
        else if (/focus|deep work|study/i.test(cleanName)) icon = 'psychology';

        skillsMap[normKey] = {
          name: cleanName,
          focusMinutes: 0,
          activitiesCount: 0,
          score: 0,
          icon
        };
      }

      const entry = skillsMap[normKey];
      const pts = options.points || 0;
      const mins = options.focusMinutes || 0;
      const acts = options.activities || 1;

      entry.score += pts;
      entry.focusMinutes += mins;
      entry.activitiesCount += acts;
    }

    // 1. Focus Sessions this week
    let rawSessions = storage.get(`u_${userId}_timer_sessions`, null);
    if (!Array.isArray(rawSessions)) rawSessions = storage.get(`devpilot_u_${userId}_timer_sessions`, null);
    if (!Array.isArray(rawSessions) && userId === '00000000-0000-4000-a000-000000000001') rawSessions = storage.get('timer_sessions', []);
    if (Array.isArray(rawSessions)) {
      rawSessions.forEach(s => {
        if (!s || s.mode !== 'work') return;
        const durSec = s.durationSeconds || (s.durationMinutes ? s.durationMinutes * 60 : 0);
        if (durSec < 60) return; // ignore sub-minute intervals
        const compAt = s.completedAt || s.date || '';
        const sDateStr = compAt.slice(0, 10);
        if (sDateStr && (sDateStr < mondayStr || sDateStr > todayStr)) return; // not this week

        let skillName = s.skill || s.skillTag || null;
        if (!skillName && s.task) {
          const taskLower = s.task.toLowerCase();
          if (/\b(dsa|leetcode|algorithm|tree|graph|binary search|dp)\b/.test(taskLower)) skillName = dsaSkillName;
          else if (/\b(javascript|typescript|js|ts)\b/.test(taskLower)) skillName = 'JavaScript';
          else if (/\b(react|frontend|css|html|tailwind|vue|next)\b/.test(taskLower)) skillName = 'Frontend Development';
          else if (/\b(node|backend|express|api|sql|database|postgres|mongo)\b/.test(taskLower)) skillName = 'Backend Development';
          else if (/\b(system design|architecture|caching|microservices)\b/.test(taskLower)) skillName = 'System Design';
          else if (/\b(python|django|fastapi)\b/.test(taskLower)) skillName = 'Python';
          else if (/\b(c\+\+|cpp)\b/.test(taskLower)) skillName = 'C++';
          else if (/\b(java|spring)\b/.test(taskLower)) skillName = 'Java';
          else skillName = s.task.length > 24 ? s.task.slice(0, 24) : s.task;
        }
        if (!skillName) skillName = 'Focus & Deep Work';

        const focusMins = Math.round(durSec / 60);
        // 1.5 points per 15 minutes of focus (e.g. 1 hour = 6 points)
        const points = (focusMins / 15) * 1.5;
        registerActivity(skillName, { points, focusMinutes: focusMins, activities: 1 });
      });
    }

    // 2. Completed Daily Goals this week
    let rawDailyGoals = storage.get(`u_${userId}_daily_goals`, null);
    if (!Array.isArray(rawDailyGoals)) rawDailyGoals = storage.get(`devpilot_u_${userId}_daily_goals`, null);
    if (!Array.isArray(rawDailyGoals) && userId === '00000000-0000-4000-a000-000000000001') rawDailyGoals = storage.get('daily_goals', []);
    if (Array.isArray(rawDailyGoals)) {
      rawDailyGoals.forEach(g => {
        if (!g || !g.completed) return;
        const gDate = g.date || todayStr;
        if (gDate < mondayStr || gDate > todayStr) return; // not this week

        let skillName = null;
        const cat = (g.category || '').toLowerCase();
        if (cat === 'coding' || cat === 'dsa') skillName = dsaSkillName;
        else if (cat === 'frontend') skillName = 'Frontend Development';
        else if (cat === 'backend') skillName = 'Backend Development';
        else if (cat === 'system design') skillName = 'System Design';
        else if (g.title) {
          const tLower = g.title.toLowerCase();
          if (/\b(dsa|leetcode|graphs?|trees?|dp)\b/.test(tLower)) skillName = dsaSkillName;
          else if (/\b(react|frontend|css|ui)\b/.test(tLower)) skillName = 'Frontend Development';
          else if (/\b(system design|cache|scaling)\b/.test(tLower)) skillName = 'System Design';
          else if (/\b(javascript|typescript|js|ts)\b/.test(tLower)) skillName = 'JavaScript';
          else skillName = g.category || 'Problem Solving';
        } else {
          skillName = g.category || 'Problem Solving';
        }

        registerActivity(skillName, { points: 2, activities: 1 });
      });
    }

    // 3. Completed Habits this week
    let habits = storage.get(`u_${userId}_habits`, null);
    if (!Array.isArray(habits)) habits = storage.get(`devpilot_u_${userId}_habits`, null);
    if (!Array.isArray(habits) && userId === '00000000-0000-4000-a000-000000000001') habits = storage.get('habits_data', []);
    if (!Array.isArray(habits)) habits = [];

    let completions = storage.get(`u_${userId}_completions`, null);
    if (!Array.isArray(completions)) completions = storage.get(`devpilot_u_${userId}_completions`, null);
    if (!Array.isArray(completions) && userId === '00000000-0000-4000-a000-000000000001') completions = storage.get('habits_completions', []);
    if (!Array.isArray(completions)) completions = [];

    const habitsMap = {};
    habits.forEach(h => { if (h && h.id) habitsMap[h.id] = h; });

    completions.forEach(c => {
      if (!c || !c.completion_date) return;
      if (c.completion_date < mondayStr || c.completion_date > todayStr) return; // not this week
      const h = habitsMap[c.habit_id];
      if (!h) return;

      let skillName = null;
      const cat = (h.category || '').toLowerCase();
      if (cat === 'dsa' || cat === 'coding') skillName = dsaSkillName;
      else if (cat === 'frontend') skillName = 'Frontend Development';
      else if (cat === 'backend') skillName = 'Backend Development';
      else if (cat === 'system design') skillName = 'System Design';
      else skillName = h.title || h.category || 'Development Practice';

      registerActivity(skillName, { points: 2, activities: 1 });
    });

    // 4. Completed DSA Questions
    const dsaProgress = storage.get('dsa_progress', {}) || {};
    const dsaEvals = storage.get('dsa_roadmap_evaluations', {}) || {};
    const solvedIds = new Set();
    Object.keys(dsaProgress).forEach(k => {
      const val = dsaProgress[k];
      if (val === true || (val && val.solved)) solvedIds.add(k);
    });
    Object.keys(dsaEvals).forEach(k => {
      const val = dsaEvals[k];
      if (val === true || (val && val.passed)) solvedIds.add(k);
    });

    if (solvedIds.size > 0) {
      // 3 points per solved problem, +1 activity count each
      registerActivity(dsaSkillName, { points: solvedIds.size * 3, activities: solvedIds.size });
    }

    // 5. Career Roadmap Progress
    try {
      const careerProgRaw = storage.get('career_roadmaps_progress', null);
      if (careerProgRaw && careerProgRaw.activeCareer) {
        const activeId = careerProgRaw.activeCareer;
        const roleProg = careerProgRaw[activeId] || {};
        const completedNodes = Array.isArray(roleProg.completed) ? roleProg.completed : [];
        if (completedNodes.length > 0) {
          let roleTitle = 'Software Engineering';
          if (activeId.includes('frontend')) roleTitle = 'Frontend Development';
          else if (activeId.includes('backend')) roleTitle = 'Backend Development';
          else if (activeId.includes('fullstack')) roleTitle = 'Full Stack Development';
          else if (activeId.includes('devops')) roleTitle = 'DevOps & Cloud';
          else if (activeId.includes('mobile')) roleTitle = 'Mobile Development';

          registerActivity(roleTitle, { points: completedNodes.length * 3, activities: completedNodes.length });
        }
      }
    } catch (e) {}

    // Evaluate winner
    const allSkills = Object.values(skillsMap);
    if (allSkills.length === 0) {
      return {
        hasActivity: false,
        skill: 'No activity yet',
        subtext: '0 activities this week',
        icon: 'data_object',
        score: 0,
        activitiesCount: 0
      };
    }

    allSkills.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return b.activitiesCount - a.activitiesCount;
    });

    const top = allSkills[0];
    if (top.activitiesCount === 0 || top.score <= 0) {
      return {
        hasActivity: false,
        skill: 'No activity yet',
        subtext: '0 activities this week',
        icon: 'data_object',
        score: 0,
        activitiesCount: 0
      };
    }

    return {
      hasActivity: true,
      skill: top.name,
      subtext: `${top.activitiesCount} ${top.activitiesCount === 1 ? 'activity' : 'activities'} this week`,
      icon: top.icon,
      score: Math.round(top.score * 10) / 10,
      activitiesCount: top.activitiesCount
    };
  }

  // ==========================================
  // 14. UTILITIES
  // ==========================================
  function formatTimeAgo(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  return {
    getStreak,
    getDailyGoals,
    getMainGoal,
    toggleDailyGoal,
    getNextDSAItem,
    getDSAProgress,
    getLeetCodeCount,
    getCareerRoadmapProgress,
    getInterviewPrepProgress,
    getInterviewPrepDetails,
    getNotesCount,
    getGithubSettings,
    setGithubSettings,
    getGithubActivity,
    getRecentActivity,
    getAISuggestion,
    getCalendarData,
    getFocusTimeToday,
    getTodayTasksSummary,
    getTodayHabitTasks,
    getMergedTodayTasks,
    toggleHabitCompletion,
    getTopSkill,
    getTodayDateStr
  };
});

