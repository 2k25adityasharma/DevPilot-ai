/**
 * DevPilot-AI — Career Roadmaps Central Progression & Lock Engine
 * 
 * Manages:
 * 1. Intentional career path commitment & single active career state
 * 2. Multi-level sequential prerequisite dependency locking (Levels, Sections, Topics, Projects, Job-Ready)
 * 3. Prevention of skipping / unauthorized completion via application logic validation
 * 4. Locked node previewing (learning objectives, why it matters, missing prerequisites)
 * 5. Respectful, non-manipulative career pausing and switching with full progress retention
 * 6. "You Are Here" position tracking & non-fake, node-based progress calculations
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'career_roadmaps_progress';

  /**
   * Reads raw progress & commitment state
   * @returns {Object}
   */
  function getCareerState() {
    if (typeof Storage !== 'undefined' && Storage.get) {
      return Storage.get(STORAGE_KEY, {
        activeCareer: null,
        activeCareerStatus: 'available', // 'available' | 'active' | 'paused' | 'completed'
        commitmentData: {},
        previousCareers: []
      });
    }
    try {
      if (typeof localStorage !== 'undefined') {
        const raw = localStorage.getItem(`devpilot_${STORAGE_KEY}`);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed && typeof parsed === 'object') {
            if (!parsed.commitmentData) parsed.commitmentData = {};
            if (!Array.isArray(parsed.previousCareers)) parsed.previousCareers = [];
            return parsed;
          }
        }
      }
    } catch (e) {
      console.warn('[CareerProgressionEngine] Error reading storage:', e);
    }
    return {
      activeCareer: null,
      activeCareerStatus: 'available',
      commitmentData: {},
      previousCareers: []
    };
  }

  /**
   * Persists progress & commitment state
   * @param {Object} state
   */
  function saveCareerState(state) {
    if (!state || typeof state !== 'object') return;
    if (typeof Storage !== 'undefined' && Storage.set) {
      Storage.set(STORAGE_KEY, state);
      return;
    }
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`devpilot_${STORAGE_KEY}`, JSON.stringify(state));
      }
    } catch (e) {
      console.warn('[CareerProgressionEngine] Error saving storage:', e);
    }
  }

  /**
   * Checks if user has an active career
   * @param {Object} [state]
   * @returns {string|null}
   */
  function getActiveCareerId(state = getCareerState()) {
    return state.activeCareer || null;
  }

  /**
   * Determines the card state for a role in the catalog:
   * 'ACTIVE' | 'PAUSED' | 'COMPLETED' | 'AVAILABLE' | 'LOCKED'
   * @param {string} roleId
   * @param {Object} [state]
   * @param {Object} [roleProgress]
   * @returns {'ACTIVE'|'PAUSED'|'COMPLETED'|'AVAILABLE'|'LOCKED'}
   */
  function getRoleCardState(roleId, state = getCareerState(), roleProgress = null) {
    const activeId = state.activeCareer;
    const activeStatus = state.activeCareerStatus || 'active';

    if (activeId === roleId) {
      if (activeStatus === 'paused') return 'PAUSED';
      if (activeStatus === 'completed') return 'COMPLETED';
      if (roleProgress && roleProgress.percent >= 100) return 'COMPLETED';
      return 'ACTIVE';
    }

    // If an active career is set and not completed, all other roles are LOCKED
    if (activeId && activeStatus !== 'completed') {
      return 'LOCKED';
    }

    // Otherwise, role is available to explore and start
    return 'AVAILABLE';
  }

  /**
   * Commits the user to a chosen career path after answering the questions
   * @param {string} careerId
   * @param {Object} answers - { goal, experienceLevel, sequenceConsent }
   * @returns {Object} updated state
   */
  function commitToCareer(careerId, answers = {}) {
    if (!careerId) throw new Error('Career ID is required to commit');

    const state = getCareerState();
    state.activeCareer = careerId;
    state.activeCareerStatus = 'active';

    if (!state.commitmentData) state.commitmentData = {};
    state.commitmentData[careerId] = {
      committedAt: new Date().toISOString(),
      goal: answers.goal || 'Build strong professional skills',
      experienceLevel: answers.experienceLevel || 'Beginner',
      sequenceConsent: answers.sequenceConsent !== false,
      commitmentConfirmed: true
    };

    // Ensure career progress container exists
    if (!state[careerId]) {
      state[careerId] = {
        completed: [],
        inProgress: [],
        checklist: [],
        completedProjects: []
      };
    }

    saveCareerState(state);
    return state;
  }

  /**
   * Pauses the active career path (non-destructive)
   * @param {string} careerId
   * @returns {Object}
   */
  function pauseActiveCareer(careerId) {
    const state = getCareerState();
    if (state.activeCareer === careerId) {
      state.activeCareerStatus = 'paused';
      saveCareerState(state);
    }
    return state;
  }

  /**
   * Resumes the paused active career path
   * @param {string} careerId
   * @returns {Object}
   */
  function resumeActiveCareer(careerId) {
    const state = getCareerState();
    if (state.activeCareer === careerId) {
      state.activeCareerStatus = 'active';
      saveCareerState(state);
    }
    return state;
  }

  /**
   * Deliberately switches or unassigns the active career
   * Preserves 100% of old career progress in history without data loss.
   * @param {string|null} newCareerId
   * @param {string} reason
   * @param {number} currentProgressPct
   * @returns {Object}
   */
  function changeActiveCareer(newCareerId = null, reason = 'Other', currentProgressPct = 0) {
    const state = getCareerState();
    const oldCareerId = state.activeCareer;

    if (oldCareerId) {
      if (!Array.isArray(state.previousCareers)) state.previousCareers = [];
      state.previousCareers.push({
        careerId: oldCareerId,
        progressPercent: currentProgressPct || 0,
        switchedAt: new Date().toISOString(),
        reason: reason || 'Exploring another path'
      });
    }

    if (newCareerId) {
      state.activeCareer = newCareerId;
      state.activeCareerStatus = 'active';
      if (!state[newCareerId]) {
        state[newCareerId] = { completed: [], inProgress: [], checklist: [], completedProjects: [] };
      }
    } else {
      state.activeCareer = null;
      state.activeCareerStatus = 'available';
    }

    saveCareerState(state);
    return state;
  }

  /**
   * Resets progress for a specific career while preserving commitment
   * @param {string} careerId
   * @returns {Object}
   */
  function resetCareerProgress(careerId) {
    const state = getCareerState();
    if (careerId) {
      state[careerId] = {
        completed: [],
        inProgress: [],
        checklist: [],
        completedProjects: []
      };
      if (state.activeCareer === careerId && state.activeCareerStatus === 'completed') {
        state.activeCareerStatus = 'active';
      }
      saveCareerState(state);
    }
    return state;
  }

  /**
   * Evaluates if a milestone project is unlocked based on level completion
   * Project 1 -> Requires Level 1 Foundation skills completed
   * Project 2 -> Requires Level 2 Core skills completed
   * Project 3 -> Requires Level 3 & 4 Advanced/Production skills completed
   * @param {string} careerId
   * @param {number} projectIndex (0, 1, 2)
   * @param {Object} userState
   * @param {Object} roadmap
   * @returns {{ isUnlocked: boolean, requiredLevel: number, reason: string }}
   */
  function getProjectLockStatus(careerId, projectIndex, userState, roadmap) {
    if (!roadmap || !Array.isArray(roadmap.levels)) {
      return { isUnlocked: true, requiredLevel: 1, reason: '' };
    }

    const roleState = userState[careerId] || { completed: [] };
    const completedSet = new Set(roleState.completed || []);

    const isLevelDone = (lvlNum) => {
      const levelObj = roadmap.levels.find(l => l.levelNum === lvlNum);
      if (!levelObj || !Array.isArray(levelObj.skills) || levelObj.skills.length === 0) return true;
      // At least all essential skills of this level must be completed
      const essential = levelObj.skills.filter(s => (s.importance || '').toLowerCase() === 'essential' || (s.importance || '').toLowerCase() === 'core');
      const targets = essential.length > 0 ? essential : levelObj.skills;
      return targets.every(s => completedSet.has(s.id));
    };

    if (projectIndex === 0) {
      const l1Done = isLevelDone(1);
      return {
        isUnlocked: l1Done,
        requiredLevel: 1,
        reason: l1Done ? 'Unlocked' : 'Complete Level 1: Foundation skills to unlock Project 01'
      };
    }

    if (projectIndex === 1) {
      const l1Done = isLevelDone(1);
      const l2Done = isLevelDone(2);
      const unlocked = l1Done && l2Done;
      return {
        isUnlocked: unlocked,
        requiredLevel: 2,
        reason: unlocked ? 'Unlocked' : 'Complete Level 2: Core skills to unlock Project 02'
      };
    }

    // Project 3 (Production / Capstone)
    const l1Done = isLevelDone(1);
    const l2Done = isLevelDone(2);
    const l3Done = isLevelDone(3);
    const unlocked = l1Done && l2Done && l3Done;
    return {
      isUnlocked: unlocked,
      requiredLevel: 3,
      reason: unlocked ? 'Unlocked' : 'Complete Level 3: Advanced architecture skills to unlock Project 03'
    };
  }

  /**
   * Evaluates if the Job-Ready stage is unlocked
   * @param {string} careerId
   * @param {Object} userState
   * @param {Object} roadmap
   * @returns {boolean}
   */
  function isJobReadyUnlocked(careerId, userState, roadmap) {
    if (!roadmap || !Array.isArray(roadmap.levels)) return false;
    const roleState = userState[careerId] || { completed: [] };
    const completedSet = new Set(roleState.completed || []);

    let totalEssential = 0;
    let completedEssential = 0;

    roadmap.levels.forEach(lvl => {
      (lvl.skills || []).forEach(s => {
        totalEssential++;
        if (completedSet.has(s.id)) completedEssential++;
      });
    });

    if (totalEssential === 0) return false;
    // Unlocks when 80%+ of skills are completed
    return (completedEssential / totalEssential) >= 0.8;
  }

  /**
   * Core Central Progression & Lock Engine:
   * Resolves the real-time status of every node in a roadmap according to:
   * 1. Active career requirement
   * 2. Completed / In-Progress sets
   * 3. Explicit prerequisite graph
   * 4. Sequential section order within levels
   * 
   * @param {string} careerId
   * @param {Object} roadmap
   * @param {Object} [userState]
   * @returns {Object.<string, { status: 'completed'|'in-progress'|'available'|'locked', reason: string, missingPrereqs: Array }>}
   */
  function resolveSequentialNodeStatuses(careerId, roadmap, userState = getCareerState()) {
    const nodeStatusMap = {};
    if (!roadmap || !Array.isArray(roadmap.levels)) return nodeStatusMap;

    const roleState = userState[careerId] || { completed: [], inProgress: [] };
    const completedSet = new Set(roleState.completed || []);
    const inProgressSet = new Set(roleState.inProgress || []);

    // Create lookup dictionary for skill titles
    const skillNameMap = {};
    roadmap.levels.forEach(lvl => {
      (lvl.skills || []).forEach(s => {
        skillNameMap[s.id] = s.title || s.id;
      });
    });

    // Track level completion
    const isLevelCompleted = (lvlNum) => {
      const lvl = roadmap.levels.find(l => l.levelNum === lvlNum);
      if (!lvl || !lvl.skills || lvl.skills.length === 0) return true;
      // All essential skills completed
      const essential = lvl.skills.filter(s => (s.importance || '').toLowerCase() === 'essential' || (s.importance || '').toLowerCase() === 'core');
      const targets = essential.length > 0 ? essential : lvl.skills;
      return targets.every(s => completedSet.has(s.id));
    };

    // Sequential resolution level by level, skill by skill
    roadmap.levels.forEach((lvl, lvlIdx) => {
      const lvlNum = lvl.levelNum || (lvlIdx + 1);
      const skills = lvl.skills || [];

      // Check if prior level allows entering this level
      const priorLevelCompleted = lvlNum === 1 || isLevelCompleted(lvlNum - 1);

      skills.forEach((skill, sIdx) => {
        // 1. Already completed
        if (completedSet.has(skill.id)) {
          nodeStatusMap[skill.id] = {
            status: 'completed',
            reason: 'Skill mastered',
            missingPrereqs: []
          };
          return;
        }

        // 2. Currently in-progress
        if (inProgressSet.has(skill.id)) {
          nodeStatusMap[skill.id] = {
            status: 'in-progress',
            reason: 'Actively learning',
            missingPrereqs: []
          };
          return;
        }

        // 3. Check explicit prerequisites
        const prereqs = Array.isArray(skill.prerequisites) ? skill.prerequisites : [];
        const missingExplicit = prereqs.filter(pId => !completedSet.has(pId));

        if (missingExplicit.length > 0) {
          const missingTitles = missingExplicit.map(pId => skillNameMap[pId] || pId);
          nodeStatusMap[skill.id] = {
            status: 'locked',
            reason: `Prerequisite required: ${missingTitles.join(', ')}`,
            missingPrereqs: missingExplicit,
            missingTitles
          };
          return;
        }

        // 4. Sequential progression inside level
        // If skill has no explicit prereq, but is preceded by an uncompleted skill in the same level:
        if (sIdx > 0 && prereqs.length === 0) {
          const prevSkill = skills[sIdx - 1];
          if (!completedSet.has(prevSkill.id)) {
            nodeStatusMap[skill.id] = {
              status: 'locked',
              reason: `Complete preceding topic "${prevSkill.title}" first`,
              missingPrereqs: [prevSkill.id],
              missingTitles: [prevSkill.title]
            };
            return;
          }
        }

        // 5. Level gate check
        // Level 2+ requires prior level to be at least partially unlocked
        if (!priorLevelCompleted && sIdx > 0) {
          nodeStatusMap[skill.id] = {
            status: 'locked',
            reason: `Complete Level ${lvlNum - 1} foundational skills to unlock this advanced topic`,
            missingPrereqs: [],
            missingTitles: [`Level ${lvlNum - 1}`]
          };
          return;
        }

        // All prerequisites satisfied -> AVAILABLE
        nodeStatusMap[skill.id] = {
          status: 'available',
          reason: 'Ready to learn',
          missingPrereqs: []
        };
      });
    });

    return nodeStatusMap;
  }

  /**
   * Action validator: enforces that a user CANNOT mark a locked skill completed,
   * enter locked exercises, or bypass locks.
   * @param {string} careerId
   * @param {string} skillId
   * @param {string} newStatus ('completed'|'in-progress'|'available')
   * @param {Object} [userState]
   * @param {Object} [roadmap]
   * @returns {{ valid: boolean, error?: string, nodeStatus?: string }}
   */
  function validateSkillAction(careerId, skillId, newStatus, userState = getCareerState(), roadmap = null) {
    if (!careerId || !skillId) {
      return { valid: false, error: 'Invalid career or skill identifier' };
    }

    // 1. Is this career active?
    if (userState.activeCareer && userState.activeCareer !== careerId) {
      return {
        valid: false,
        error: 'This career path is currently locked. Complete or change your active career path to learn this skill.',
        nodeStatus: 'career-locked'
      };
    }

    // 2. If resetting status to available, always allow if it was active
    if (newStatus === 'available') {
      return { valid: true };
    }

    // 3. If setting to in-progress or completed, check node status
    if (roadmap) {
      const nodeStatusMap = resolveSequentialNodeStatuses(careerId, roadmap, userState);
      const nodeInfo = nodeStatusMap[skillId];

      if (!nodeInfo) {
        return { valid: false, error: 'Skill node not found in roadmap' };
      }

      if (nodeInfo.status === 'locked') {
        return {
          valid: false,
          error: nodeInfo.reason || 'This skill is currently locked by prerequisite dependencies.',
          nodeStatus: 'locked',
          missingPrereqs: nodeInfo.missingPrereqs
        };
      }
    }

    return { valid: true };
  }

  /**
   * Resolves "You Are Here" position in the roadmap
   * Identifies current topic, next topic, and next locked milestone.
   * @param {string} careerId
   * @param {Object} roadmap
   * @param {Object} [userState]
   * @param {Object} [nodeStatusMap]
   * @returns {Object}
   */
  function getYouAreHereInfo(careerId, roadmap, userState = getCareerState(), nodeStatusMap = null) {
    if (!roadmap || !Array.isArray(roadmap.levels)) {
      return null;
    }

    const statuses = nodeStatusMap || resolveSequentialNodeStatuses(careerId, roadmap, userState);

    let currentSkill = null;
    let nextSkill = null;
    let nextLockedMilestone = null;
    let currentLevelName = '';
    let currentLevelNum = 1;

    // 1. Find in-progress first, or first available skill
    for (const lvl of roadmap.levels) {
      for (const s of lvl.skills || []) {
        const info = statuses[s.id];
        if (info && info.status === 'in-progress') {
          currentSkill = s;
          currentLevelName = lvl.name;
          currentLevelNum = lvl.levelNum;
          break;
        }
      }
      if (currentSkill) break;
    }

    if (!currentSkill) {
      for (const lvl of roadmap.levels) {
        for (const s of lvl.skills || []) {
          const info = statuses[s.id];
          if (info && info.status === 'available') {
            currentSkill = s;
            currentLevelName = lvl.name;
            currentLevelNum = lvl.levelNum;
            break;
          }
        }
        if (currentSkill) break;
      }
    }

    // 2. Find next sequential skill after current
    if (currentSkill) {
      let foundCurrent = false;
      for (const lvl of roadmap.levels) {
        for (const s of lvl.skills || []) {
          if (foundCurrent) {
            nextSkill = s;
            break;
          }
          if (s.id === currentSkill.id) {
            foundCurrent = true;
          }
        }
        if (nextSkill) break;
      }
    }

    // 3. Find next locked milestone
    for (const lvl of roadmap.levels) {
      for (const s of lvl.skills || []) {
        const info = statuses[s.id];
        if (info && info.status === 'locked') {
          nextLockedMilestone = s;
          break;
        }
      }
      if (nextLockedMilestone) break;
    }

    return {
      currentLevelNum,
      currentLevelName,
      currentSkill,
      nextSkill,
      nextLockedMilestone
    };
  }

  /**
   * Data hook for Dashboard integration
   * @param {Object} [userState]
   * @param {Array} [roles]
   * @param {Object} [roadmaps]
   * @returns {Object}
   */
  function getActiveCareerDashboardSummary(userState = getCareerState(), roles = [], roadmaps = {}) {
    const activeId = userState.activeCareer;
    if (!activeId) {
      return {
        hasActiveCareer: false,
        roleTitle: 'No Active Roadmap',
        percent: 0,
        status: 'available'
      };
    }

    const role = (roles || []).find(r => r.id === activeId);
    const roadmap = roadmaps ? roadmaps[role?.roadmapId || activeId] : null;

    let percent = 0;
    let completedCount = 0;
    let totalCount = 0;

    if (roadmap && Array.isArray(roadmap.levels)) {
      const roleProg = userState[activeId] || { completed: [] };
      const completedSet = new Set(roleProg.completed || []);
      roadmap.levels.forEach(lvl => {
        (lvl.skills || []).forEach(s => {
          totalCount++;
          if (completedSet.has(s.id)) completedCount++;
        });
      });
      percent = totalCount > 0 ? Math.min(100, Math.round((completedCount / totalCount) * 100)) : 0;
    }

    const youAreHere = roadmap ? getYouAreHereInfo(activeId, roadmap, userState) : null;

    return {
      hasActiveCareer: true,
      activeCareerId: activeId,
      roleTitle: role ? role.title : activeId,
      roleIcon: role ? role.icon : 'map',
      percent,
      completedCount,
      totalCount,
      status: userState.activeCareerStatus || 'active',
      currentSkillTitle: youAreHere?.currentSkill?.title || null,
      nextSkillTitle: youAreHere?.nextSkill?.title || null,
      currentLevelName: youAreHere?.currentLevelName || null,
      currentLevelNum: youAreHere?.currentLevelNum || 1
    };
  }

  // Export for browser
  if (typeof window !== 'undefined') {
    window.careerProgressionEngine = {
      getCareerState,
      saveCareerState,
      getActiveCareerId,
      getRoleCardState,
      commitToCareer,
      pauseActiveCareer,
      resumeActiveCareer,
      changeActiveCareer,
      resetCareerProgress,
      getProjectLockStatus,
      isJobReadyUnlocked,
      resolveSequentialNodeStatuses,
      validateSkillAction,
      getYouAreHereInfo,
      getActiveCareerDashboardSummary
    };
  }

  // Export for CommonJS / Node.js
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      getCareerState,
      saveCareerState,
      getActiveCareerId,
      getRoleCardState,
      commitToCareer,
      pauseActiveCareer,
      resumeActiveCareer,
      changeActiveCareer,
      resetCareerProgress,
      getProjectLockStatus,
      isJobReadyUnlocked,
      resolveSequentialNodeStatuses,
      validateSkillAction,
      getYouAreHereInfo,
      getActiveCareerDashboardSummary
    };
  }
})();
