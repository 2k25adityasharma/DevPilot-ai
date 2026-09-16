/**
 * DevPilot-AI — Career Roadmaps Controller
 * Manages intentional career commitment flow, multi-level sequential dependency locking,
 * route protection, locked topic previews, deliberate pause/change-career settings,
 * and node-based progress tracking.
 */

(function () {
  'use strict';

  // Fallback / direct progression engine lookup
  const engine = (typeof window !== 'undefined' && window.careerProgressionEngine)
    ? window.careerProgressionEngine
    : (typeof require === 'function' ? require('../core/careerProgressionEngine.js') : null);

  const STORAGE_KEY = 'career_roadmaps_progress';

  // Controller state
  let currentRoleId = null;
  let activeCategory = 'all';
  let searchQuery = '';
  let selectedDifficulty = 'all';
  let selectedProgress = 'all';
  let selectedSkillNode = null;

  // Wizard state for Career Commitment modal
  let wizardRole = null;
  let wizardStep = 1;
  let wizardAnswers = {
    goal: 'Build strong professional skills',
    experienceLevel: 'Beginner',
    sequenceConsent: true
  };

  function getAllCareerRoles() {
    if (typeof window !== 'undefined' && window.careerRoles) return window.careerRoles;
    if (typeof global !== 'undefined' && global.careerRoles) return global.careerRoles;
    return [];
  }

  function getAllCareerRoadmaps() {
    if (typeof window !== 'undefined' && window.careerRoadmaps) return window.careerRoadmaps;
    if (typeof global !== 'undefined' && global.careerRoadmaps) return global.careerRoadmaps;
    return {};
  }

  function getProgressState() {
    if (engine && typeof engine.getCareerState === 'function') {
      return engine.getCareerState();
    }
    if (typeof Storage !== 'undefined' && Storage.get) {
      return Storage.get(STORAGE_KEY, {});
    }
    try {
      const data = localStorage.getItem(`devpilot_${STORAGE_KEY}`);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      console.warn('Error accessing storage:', e);
      return {};
    }
  }

  function saveProgressState(state) {
    if (engine && typeof engine.saveCareerState === 'function') {
      engine.saveCareerState(state);
      return;
    }
    if (typeof Storage !== 'undefined' && Storage.set) {
      Storage.set(STORAGE_KEY, state);
      return;
    }
    try {
      localStorage.setItem(`devpilot_${STORAGE_KEY}`, JSON.stringify(state));
    } catch (e) {
      console.warn('Error saving storage:', e);
    }
  }

  /**
   * Helper: Escapes HTML strings
   */
  function escHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /**
   * Resolves real-time status of every node in a roadmap based on dependencies.
   * Returns a map where values are 'completed' | 'in-progress' | 'available' | 'locked'.
   * Fully backwards compatible with existing test assertions.
   */
  function resolveRoadmapNodeStatuses(roleId, roadmap) {
    const state = getProgressState();
    if (engine && typeof engine.resolveSequentialNodeStatuses === 'function') {
      const detailed = engine.resolveSequentialNodeStatuses(roleId, roadmap, state);
      const simple = {};
      for (const [k, v] of Object.entries(detailed)) {
        simple[k] = typeof v === 'object' ? v.status : v;
      }
      return simple;
    }

    const roleState = state[roleId] || { completed: [], inProgress: [], checklist: [] };
    const completedSet = new Set(roleState.completed || []);
    const inProgressSet = new Set(roleState.inProgress || []);
    const nodeStatusMap = {};

    roadmap.levels.forEach(level => {
      level.skills.forEach(skill => {
        if (completedSet.has(skill.id)) {
          nodeStatusMap[skill.id] = 'completed';
        } else if (inProgressSet.has(skill.id)) {
          nodeStatusMap[skill.id] = 'in-progress';
        }
      });
    });

    roadmap.levels.forEach(level => {
      level.skills.forEach(skill => {
        if (nodeStatusMap[skill.id]) return;
        const prereqs = skill.prerequisites || [];
        const allPrereqsMet = prereqs.every(prereqId => completedSet.has(prereqId));
        nodeStatusMap[skill.id] = allPrereqsMet ? 'available' : 'locked';
      });
    });

    return nodeStatusMap;
  }

  /**
   * Calculates progress percentage and counts for a role
   */
  function calculateRoleProgress(role) {
    const allRoadmaps = getAllCareerRoadmaps();
    const roadmap = allRoadmaps ? allRoadmaps[role.roadmapId] : null;
    if (!roadmap) return { percent: 0, completed: 0, total: 0 };

    let total = 0;
    roadmap.levels.forEach(lvl => {
      total += (lvl.skills || []).length;
    });

    if (total === 0) return { percent: 0, completed: 0, total: 0 };

    const state = getProgressState();
    const roleState = state[role.id] || { completed: [] };
    const completed = (roleState.completed || []).length;

    const percent = Math.min(100, Math.round((completed / total) * 100));
    return { percent, completed, total };
  }

  /**
   * Finds next recommended skill for a role
   */
  function findNextRecommendedSkill(roadmap, nodeStatusMap) {
    for (const level of roadmap.levels) {
      for (const skill of level.skills) {
        const s = typeof nodeStatusMap[skill.id] === 'object' ? nodeStatusMap[skill.id].status : nodeStatusMap[skill.id];
        if (s === 'in-progress') {
          return { skill, status: 'in-progress', levelName: level.name };
        }
      }
    }

    for (const level of roadmap.levels) {
      for (const skill of level.skills) {
        const s = typeof nodeStatusMap[skill.id] === 'object' ? nodeStatusMap[skill.id].status : nodeStatusMap[skill.id];
        if (s === 'available') {
          return { skill, status: 'available', levelName: level.name };
        }
      }
    }

    return null;
  }

  /**
   * Toggles skill node status (completed, in-progress, or available/reset).
   * Validates actions against the progression engine to block unauthorized skipping.
   */
  function setSkillStatus(roleId, skillId, newStatus) {
    const state = getProgressState();
    const allRoadmaps = getAllCareerRoadmaps();
    const role = (getAllCareerRoles()).find(r => r.id === roleId);
    const roadmap = role ? allRoadmaps[role.roadmapId] : null;

    // Validate action via progression engine
    if (engine && typeof engine.validateSkillAction === 'function') {
      const validation = engine.validateSkillAction(roleId, skillId, newStatus, state, roadmap);
      if (!validation.valid) {
        if (typeof showToast === 'function') {
          showToast(validation.error || 'Action not permitted on locked topic.', 'error');
        } else {
          console.warn('[SkillActionRejected]', validation.error);
        }
        return false;
      }
    }

    if (!state[roleId]) {
      state[roleId] = { completed: [], inProgress: [], checklist: [], completedProjects: [] };
    }

    const completed = new Set(state[roleId].completed || []);
    const inProgress = new Set(state[roleId].inProgress || []);
    const completedAt = state[roleId].completedAt || {};

    if (newStatus === 'completed') {
      completed.add(skillId);
      inProgress.delete(skillId);
      completedAt[skillId] = new Date().toISOString();
    } else if (newStatus === 'in-progress') {
      inProgress.add(skillId);
      completed.delete(skillId);
      delete completedAt[skillId];
    } else {
      completed.delete(skillId);
      inProgress.delete(skillId);
      delete completedAt[skillId];
    }

    state[roleId].completed = Array.from(completed);
    state[roleId].inProgress = Array.from(inProgress);
    state[roleId].completedAt = completedAt;

    // Check if 100% complete
    if (roadmap) {
      let totalSkills = 0;
      roadmap.levels.forEach(l => totalSkills += (l.skills || []).length);
      if (totalSkills > 0 && completed.size >= totalSkills) {
        state.activeCareerStatus = 'completed';
      }
    }

    saveProgressState(state);

    if (typeof showToast === 'function') {
      const msg = newStatus === 'completed'
        ? 'Skill marked as completed!'
        : newStatus === 'in-progress'
          ? 'Skill set to in-progress.'
          : 'Skill status reset.';
      showToast(msg, newStatus === 'completed' ? 'success' : 'info');
    }

    if (typeof document !== 'undefined' && typeof renderCurrentRoute === 'function') {
      renderCurrentRoute();
    }
    return true;
  }

  /**
   * Toggles job-ready checklist item
   */
  function toggleChecklistItem(roleId, itemId, checked) {
    const state = getProgressState();
    if (!state[roleId]) {
      state[roleId] = { completed: [], inProgress: [], checklist: [], completedProjects: [] };
    }

    const checklist = new Set(state[roleId].checklist || []);
    if (checked) {
      checklist.add(itemId);
    } else {
      checklist.delete(itemId);
    }

    state[roleId].checklist = Array.from(checklist);
    saveProgressState(state);
  }

  // =========================================================================
  // VIEW RENDERING: CATALOG
  // =========================================================================

  function renderCatalog() {
    const catalogContainer = document.getElementById('roadmaps-catalog-view');
    const detailContainer = document.getElementById('roadmaps-detail-view');

    if (!catalogContainer || !detailContainer) return;

    catalogContainer.classList.remove('hidden');
    detailContainer.classList.add('hidden');
    if (typeof window !== 'undefined' && window.scrollTo) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const roles = getAllCareerRoles();
    const query = searchQuery.trim().toLowerCase();
    const state = getProgressState();

    const filteredRoles = roles.filter(role => {
      if (activeCategory !== 'all' && role.category !== activeCategory) {
        return false;
      }
      if (selectedDifficulty !== 'all' && role.difficulty.toLowerCase() !== selectedDifficulty.toLowerCase()) {
        return false;
      }
      const { percent } = calculateRoleProgress(role);
      if (selectedProgress === 'not-started' && percent > 0) return false;
      if (selectedProgress === 'in-progress' && (percent === 0 || percent === 100)) return false;
      if (selectedProgress === 'completed' && percent < 100) return false;

      if (query) {
        const matchesTitle = role.title.toLowerCase().includes(query);
        const matchesDesc = (role.description || '').toLowerCase().includes(query);
        const matchesTagline = (role.tagline || '').toLowerCase().includes(query);
        const matchesTech = (role.featuredTech || []).some(t => t.toLowerCase().includes(query));
        if (!matchesTitle && !matchesDesc && !matchesTagline && !matchesTech) {
          return false;
        }
      }
      return true;
    });

    const grid = document.getElementById('role-cards-grid');
    const countEl = document.getElementById('catalog-results-count');

    if (countEl) {
      countEl.textContent = `${filteredRoles.length} ${filteredRoles.length === 1 ? 'Role' : 'Roles'} Available`;
    }

    if (!grid) return;

    if (filteredRoles.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full py-16 text-center">
          <span class="material-symbols-outlined text-5xl text-slate-300 dark:text-slate-600 mb-3">search_off</span>
          <h3 class="text-lg font-semibold text-slate-700 dark:text-slate-300">No career roadmaps found</h3>
          <p class="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
            Try adjusting your search query, clearing filters, or exploring another category.
          </p>
          <button id="btn-clear-all-filters" class="btn-secondary mt-4 text-xs py-2 px-4 inline-flex items-center gap-2">
            <span class="material-symbols-outlined text-sm">refresh</span>
            Reset Filters
          </button>
        </div>
      `;
      const resetBtn = document.getElementById('btn-clear-all-filters');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          searchQuery = '';
          activeCategory = 'all';
          selectedDifficulty = 'all';
          selectedProgress = 'all';
          const searchInput = document.getElementById('roadmap-search-input');
          if (searchInput) searchInput.value = '';
          const diffSelect = document.getElementById('filter-difficulty-select');
          if (diffSelect) diffSelect.value = 'all';
          const progSelect = document.getElementById('filter-progress-select');
          if (progSelect) progSelect.value = 'all';
          updateCategoryTabs();
          renderCatalog();
        });
      }
      return;
    }

    grid.innerHTML = filteredRoles.map(role => {
      const roleProg = calculateRoleProgress(role);
      const cardState = engine
        ? engine.getRoleCardState(role.id, state, roleProg)
        : (state.activeCareer === role.id ? 'ACTIVE' : (state.activeCareer ? 'LOCKED' : 'AVAILABLE'));

      const isCardActive = cardState === 'ACTIVE';
      const isCardLocked = cardState === 'LOCKED';
      const isCardPaused = cardState === 'PAUSED';
      const isCardCompleted = cardState === 'COMPLETED';

      const cardClassModifier = isCardActive
        ? 'active-career'
        : isCardLocked
          ? 'locked-career'
          : isCardPaused
            ? 'paused-career'
            : isCardCompleted
              ? 'completed-career'
              : '';

      const diffClass = role.difficulty.toLowerCase() === 'beginner'
        ? 'badge-diff-beginner'
        : role.difficulty.toLowerCase() === 'advanced'
          ? 'badge-diff-advanced'
          : 'badge-diff-intermediate';

      return `
        <div class="role-card group ${cardClassModifier}" data-role-id="${role.id}">
          <div>
            <!-- Top Header: Icon & Status Badge -->
            <div class="flex items-start justify-between gap-3 mb-3">
              <div class="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-200">
                <span class="material-symbols-outlined text-2xl">${role.icon || 'map'}</span>
              </div>

              ${isCardActive ? `
                <span class="card-status-badge active">
                  <span class="material-symbols-outlined text-[13px]">check_circle</span>
                  Active Roadmap
                </span>
              ` : isCardPaused ? `
                <span class="card-status-badge paused">
                  <span class="material-symbols-outlined text-[13px]">pause_circle</span>
                  Paused (${roleProg.percent}%)
                </span>
              ` : isCardCompleted ? `
                <span class="card-status-badge completed">
                  <span class="material-symbols-outlined text-[13px]">verified</span>
                  Completed
                </span>
              ` : isCardLocked ? `
                <span class="card-status-badge locked">
                  <span class="material-symbols-outlined text-[13px]">lock</span>
                  Locked
                </span>
              ` : `
                <span class="text-[11px] font-semibold uppercase px-2 py-0.5 rounded-md ${diffClass}">
                  ${role.difficulty}
                </span>
              `}
            </div>

            <!-- Role Title & Tagline -->
            <h3 class="text-base font-bold text-slate-900 dark:text-white tracking-tight mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              ${escHtml(role.title)}
            </h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
              ${escHtml(role.tagline || role.description)}
            </p>

            <!-- Featured Tech Chips -->
            <div class="flex flex-wrap gap-1.5 mb-5">
              ${(role.featuredTech || []).slice(0, 4).map(tech => `
                <span class="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  ${escHtml(tech)}
                </span>
              `).join('')}
              ${(role.featuredTech || []).length > 4 ? `
                <span class="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-50 dark:bg-slate-800/60 text-slate-400">
                  +${role.featuredTech.length - 4}
                </span>
              ` : ''}
            </div>
          </div>

          <!-- Footer: Progress Bar & Action Button -->
          <div class="pt-4 border-t border-slate-100 dark:border-slate-800/80">
            <div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
              <span class="font-medium">${roleProg.total} Skills</span>
              <span class="font-semibold ${roleProg.percent > 0 ? 'text-indigo-600 dark:text-indigo-400' : ''}">
                ${roleProg.percent}% Complete
              </span>
            </div>
            
            <div class="role-progress-bar-bg mb-3">
              <div class="role-progress-bar-fill ${isCardPaused ? 'bg-amber-500' : isCardCompleted ? 'bg-emerald-500' : ''}" style="width: ${roleProg.percent}%;"></div>
            </div>

            ${isCardActive ? `
              <a href="#role=${role.id}" class="w-full py-2 px-3 rounded-lg text-xs font-semibold text-center flex items-center justify-center gap-1.5 bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm transition-all">
                <span>Continue Roadmap</span>
                <span class="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            ` : isCardPaused ? `
              <a href="#role=${role.id}" class="w-full py-2 px-3 rounded-lg text-xs font-semibold text-center flex items-center justify-center gap-1.5 bg-amber-500 text-white hover:bg-amber-600 shadow-sm transition-all">
                <span>Resume Roadmap</span>
                <span class="material-symbols-outlined text-sm">play_arrow</span>
              </a>
            ` : isCardCompleted ? `
              <a href="#role=${role.id}" class="w-full py-2 px-3 rounded-lg text-xs font-semibold text-center flex items-center justify-center gap-1.5 bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm transition-all">
                <span>Review Roadmap</span>
                <span class="material-symbols-outlined text-sm">visibility</span>
              </a>
            ` : isCardLocked ? `
              <div class="space-y-1.5">
                <div class="text-[11px] text-slate-400 dark:text-slate-500 flex items-center gap-1 line-clamp-1">
                  <span class="material-symbols-outlined text-xs">lock</span>
                  <span>Complete or change active path to enter</span>
                </div>
                <button class="w-full py-2 px-3 rounded-lg text-xs font-semibold text-center flex items-center justify-center gap-1.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all btn-open-locked-card" data-role-id="${role.id}">
                  <span>View Locked Path</span>
                  <span class="material-symbols-outlined text-sm">visibility</span>
                </button>
              </div>
            ` : `
              <button class="w-full py-2 px-3 rounded-lg text-xs font-semibold text-center flex items-center justify-center gap-1.5 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all btn-start-career-flow" data-role-id="${role.id}">
                <span>Select Career Path</span>
                <span class="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            `}
          </div>
        </div>
      `;
    }).join('');

    // Bind card action buttons
    bindCatalogCardListeners();
  }

  function bindCatalogCardListeners() {
    // 1. Available Career -> Open Commitment Modal
    document.querySelectorAll('.btn-start-career-flow').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const roleId = btn.getAttribute('data-role-id');
        openCommitmentModal(roleId);
      });
    });

    // 2. Locked Career -> Open Informative Locked Modal
    document.querySelectorAll('.btn-open-locked-card').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const roleId = btn.getAttribute('data-role-id');
        openLockedCareerModal(roleId);
      });
    });
  }

  function updateCategoryTabs() {
    document.querySelectorAll('.category-tab-btn').forEach(btn => {
      const cat = btn.getAttribute('data-category');
      if (cat === activeCategory) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // =========================================================================
  // VIEW RENDERING: LOCKED CAREER SCREEN (ROUTE PROTECTION)
  // =========================================================================

  function renderCareerLockedScreen(targetRole, activeRole, activeProg) {
    const detailContainer = document.getElementById('roadmaps-detail-view');
    const catalogContainer = document.getElementById('roadmaps-catalog-view');
    if (!detailContainer) return;

    if (catalogContainer) catalogContainer.classList.add('hidden');
    detailContainer.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    detailContainer.innerHTML = `
      <div class="mb-6">
        <a href="#" class="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors py-1 px-2.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">
          <span class="material-symbols-outlined text-base">arrow_back</span>
          <span>Back to All Roadmaps</span>
        </a>
      </div>

      <div class="career-locked-screen max-w-2xl mx-auto">
        <div class="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60 flex items-center justify-center mx-auto mb-4 shadow-sm">
          <span class="material-symbols-outlined text-3xl">lock</span>
        </div>

        <h2 class="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
          ${escHtml(targetRole ? targetRole.title : 'This Career')} is Locked
        </h2>

        <p class="text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto leading-relaxed mb-6">
          You are currently committed to your active career path:
          <strong class="text-indigo-600 dark:text-indigo-400">${escHtml(activeRole ? activeRole.title : 'Active Career')}</strong>
          (${activeProg.percent}% completed).
        </p>

        <div class="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800 max-w-md mx-auto text-left mb-6">
          <div class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Why is this locked?</div>
          <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            DevPilot AI enforces focused progression so you master one discipline deeply before switching. You can change your active career path anytime without losing your saved progress.
          </p>
        </div>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
          ${activeRole ? `
            <a href="#role=${activeRole.id}" class="btn-primary text-xs py-2.5 px-5 flex items-center gap-2 w-full sm:w-auto justify-center">
              <span>Continue ${escHtml(activeRole.title)} Roadmap</span>
              <span class="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          ` : ''}

          <button id="btn-route-change-career" class="btn-secondary text-xs py-2.5 px-5 flex items-center gap-2 w-full sm:w-auto justify-center">
            <span class="material-symbols-outlined text-sm">swap_horiz</span>
            <span>Change Active Career</span>
          </button>
        </div>
      </div>
    `;

    const changeBtn = document.getElementById('btn-route-change-career');
    if (changeBtn) {
      changeBtn.addEventListener('click', () => {
        if (activeRole) {
          openChangeCareerModal(activeRole, activeProg);
        } else {
          window.location.hash = '';
        }
      });
    }
  }

  // =========================================================================
  // VIEW RENDERING: ROADMAP DETAIL
  // =========================================================================

  function renderRoadmapDetail(roleId) {
    const catalogContainer = document.getElementById('roadmaps-catalog-view');
    const detailContainer = document.getElementById('roadmaps-detail-view');

    if (!catalogContainer || !detailContainer) return;

    const role = (getAllCareerRoles()).find(r => r.id === roleId);
    if (!role) {
      if (typeof window !== 'undefined') window.location.hash = '';
      return;
    }

    const state = getProgressState();
    const activeCareerId = state.activeCareer;

    // ROUTE PROTECTION: If user tries to open a locked career via URL hash
    if (activeCareerId && activeCareerId !== roleId && state.activeCareerStatus !== 'completed') {
      const activeRole = (getAllCareerRoles()).find(r => r.id === activeCareerId);
      const activeProg = activeRole ? calculateRoleProgress(activeRole) : { percent: 0, completed: 0, total: 0 };
      renderCareerLockedScreen(role, activeRole, activeProg);
      return;
    }

    catalogContainer.classList.add('hidden');
    detailContainer.classList.remove('hidden');
    if (typeof window !== 'undefined' && window.scrollTo) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const roadmap = (getAllCareerRoadmaps())[role.roadmapId];
    if (!roadmap) {
      detailContainer.innerHTML = `
        <div class="p-8 text-center">
          <p class="text-sm text-slate-500">Roadmap content is being finalized for this role.</p>
          <a href="#" class="btn-secondary mt-4 inline-block">Back to All Roles</a>
        </div>
      `;
      return;
    }

    // Resolve node statuses and detailed prerequisite data
    const detailedNodeMap = engine && typeof engine.resolveSequentialNodeStatuses === 'function'
      ? engine.resolveSequentialNodeStatuses(role.id, roadmap, state)
      : {};
    const nodeStatusMap = resolveRoadmapNodeStatuses(role.id, roadmap);

    const { percent, completed, total } = calculateRoleProgress(role);
    const hereInfo = engine && typeof engine.getYouAreHereInfo === 'function'
      ? engine.getYouAreHereInfo(role.id, roadmap, state, detailedNodeMap)
      : null;

    const roleState = state[role.id] || { checklist: [] };
    const checkedItems = new Set(roleState.checklist || []);
    const isPaused = state.activeCareerStatus === 'paused';
    const isJobReady = engine ? engine.isJobReadyUnlocked(role.id, state, roadmap) : percent >= 80;

    const diffClass = role.difficulty.toLowerCase() === 'beginner'
      ? 'badge-diff-beginner'
      : role.difficulty.toLowerCase() === 'advanced'
        ? 'badge-diff-advanced'
        : 'badge-diff-intermediate';

    detailContainer.innerHTML = `
      <!-- Top Navigation & Roadmap Settings -->
      <div class="mb-6">
        <div class="flex items-center justify-between gap-4 mb-4">
          <div class="flex items-center gap-2">
            <a href="#" class="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors py-1.5 px-2.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">
              <span class="material-symbols-outlined text-base">arrow_back</span>
              <span>All Career Roadmaps</span>
            </a>
            <span class="text-slate-300 dark:text-slate-700">/</span>
            <span class="text-xs font-medium text-slate-600 dark:text-slate-300">${escHtml(role.title)}</span>
          </div>

          <!-- Roadmap Settings Menu -->
          <div class="relative">
            <button id="btn-roadmap-settings-toggle" class="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5 rounded-lg">
              <span class="material-symbols-outlined text-sm">settings</span>
              <span>Roadmap Settings</span>
              <span class="material-symbols-outlined text-xs">expand_more</span>
            </button>

            <div id="roadmap-settings-dropdown-menu" class="roadmap-settings-menu">
              ${isPaused ? `
                <button id="btn-menu-resume" class="roadmap-settings-item text-amber-600">
                  <span class="material-symbols-outlined text-base">play_arrow</span>
                  <span>Resume Roadmap</span>
                </button>
              ` : `
                <button id="btn-menu-pause" class="roadmap-settings-item">
                  <span class="material-symbols-outlined text-base">pause</span>
                  <span>Pause Roadmap</span>
                </button>
              `}
              <button id="btn-menu-change-career" class="roadmap-settings-item">
                <span class="material-symbols-outlined text-base">swap_horiz</span>
                <span>Change Career</span>
              </button>
              <div class="my-1 border-t border-slate-100 dark:border-slate-800"></div>
              <button id="btn-menu-reset-progress" class="roadmap-settings-item item-danger">
                <span class="material-symbols-outlined text-base">restart_alt</span>
                <span>Reset Progress</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Paused Alert Banner -->
        ${isPaused ? `
          <div class="mb-6 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                <span class="material-symbols-outlined text-lg">pause</span>
              </div>
              <div>
                <div class="text-xs font-bold text-amber-900 dark:text-amber-200 uppercase tracking-wider">Roadmap Currently Paused</div>
                <div class="text-xs text-amber-800 dark:text-amber-300">Your progress remains completely saved. Resume when you are ready to learn.</div>
              </div>
            </div>
            <button id="btn-banner-resume-roadmap" class="btn-warning text-xs py-2 px-4 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-semibold self-start sm:self-auto shrink-0 shadow-sm">
              Resume Roadmap
            </button>
          </div>
        ` : ''}

        <!-- Detail Header Card -->
        <div class="bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-6 shadow-sm">
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div class="flex-1">
              <div class="flex flex-wrap items-center gap-2.5 mb-2.5">
                <span class="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${diffClass}">
                  ${role.difficulty}
                </span>
                <span class="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1">
                  <span class="material-symbols-outlined text-sm text-slate-400">schedule</span>
                  Approx. ${role.estimatedWeeks || 24} Weeks
                </span>
                <span class="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1">
                  <span class="material-symbols-outlined text-sm text-slate-400">school</span>
                  5 Career Levels
                </span>
                <span class="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <span class="material-symbols-outlined text-sm">lock_open</span>
                  Active Career Roadmap
                </span>
              </div>

              <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                ${escHtml(role.title)}
              </h1>
              <p class="text-sm text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed max-w-3xl">
                ${escHtml(roadmap.description || role.description)}
              </p>
            </div>

            <!-- Real-time Progress Ring Widget -->
            <div class="shrink-0 bg-slate-50 dark:bg-slate-900/60 p-5 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center gap-5 min-w-[240px]">
              <div class="relative w-16 h-16 flex items-center justify-center shrink-0">
                <svg class="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path class="text-slate-200 dark:text-slate-700" stroke-width="3.5" stroke="currentColor" fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path class="${isPaused ? 'text-amber-500' : 'text-indigo-600 dark:text-indigo-500'} transition-all duration-700" stroke-dasharray="${percent}, 100" stroke-width="3.5" stroke-linecap="round" stroke="currentColor" fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <span class="absolute text-sm font-bold text-slate-800 dark:text-white">${percent}%</span>
              </div>

              <div>
                <span class="text-xs font-bold text-slate-400 uppercase tracking-wider block">Roadmap Progress</span>
                <div class="text-lg font-extrabold text-slate-900 dark:text-white mt-0.5">
                  ${completed} <span class="text-xs font-normal text-slate-400">/ ${total} Skills</span>
                </div>
                <span class="text-[11px] font-medium text-indigo-600 dark:text-indigo-400">
                  ${total - completed === 0 ? 'All skills mastered!' : `${total - completed} skills remaining`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- YOU ARE HERE Hero Indicator -->
      ${hereInfo ? `
        <div class="you-are-here-bar flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <span class="material-symbols-outlined text-xl">my_location</span>
            </div>
            <div>
              <div class="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                You Are Here • Level ${hereInfo.currentLevelNum}: ${escHtml(hereInfo.currentLevelName)}
              </div>
              <div class="text-sm font-bold text-slate-900 dark:text-white">
                Current: ${hereInfo.currentSkill ? escHtml(hereInfo.currentSkill.title) : 'All topics complete'}
              </div>
            </div>
          </div>

          <div class="flex flex-wrap items-center gap-3">
            ${hereInfo.nextSkill ? `
              <div class="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 bg-white/70 dark:bg-slate-800/70 py-1.5 px-3 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                <span class="text-slate-400 font-medium">Next:</span>
                <span class="font-semibold text-indigo-600 dark:text-indigo-400">${escHtml(hereInfo.nextSkill.title)}</span>
              </div>
            ` : ''}

            ${hereInfo.nextLockedMilestone ? `
              <div class="flex items-center gap-1.5 text-xs text-slate-400 bg-white/40 dark:bg-slate-900/40 py-1.5 px-3 rounded-lg border border-slate-200/40 dark:border-slate-800/40">
                <span class="material-symbols-outlined text-xs">lock</span>
                <span>Locked: ${escHtml(hereInfo.nextLockedMilestone.title)}</span>
              </div>
            ` : ''}

            ${hereInfo.currentSkill ? `
              <button class="btn-primary text-xs py-1.5 px-3 btn-inspect-skill" data-skill-id="${hereInfo.currentSkill.id}">
                Open Topic Guide
              </button>
            ` : ''}
          </div>
        </div>
      ` : ''}

      <!-- Roadmap Levels Timeline -->
      <div class="roadmap-timeline mb-12">
        ${roadmap.levels.map(level => `
          <div class="roadmap-level-section">
            <!-- Level Section Header -->
            <div class="roadmap-level-header">
              <div class="level-badge-pill">
                ${level.levelNum}
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <h3 class="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                    Level ${level.levelNum} — ${escHtml(level.name)}
                  </h3>
                  <span class="text-xs font-semibold text-slate-400 px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
                    ${level.skills.length} ${level.skills.length === 1 ? 'Topic' : 'Topics'}
                  </span>
                </div>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  ${escHtml(level.description)}
                </p>
              </div>
            </div>

            <!-- Skills Node Grid for this level -->
            <div class="skills-node-grid">
              ${level.skills.map(skill => {
                const detailed = detailedNodeMap[skill.id] || {};
                const status = detailed.status || nodeStatusMap[skill.id] || 'available';
                const statusIcon = status === 'completed'
                  ? 'check_circle'
                  : status === 'in-progress'
                    ? 'hourglass_top'
                    : status === 'locked'
                      ? 'lock'
                      : 'radio_button_unchecked';

                const statusLabel = status === 'completed'
                  ? 'Completed'
                  : status === 'in-progress'
                    ? 'In Progress'
                    : status === 'locked'
                      ? (detailed.reason || 'Locked (Prerequisite required)')
                      : 'Available to Learn';

                const importanceClass = skill.importance === 'essential'
                  ? 'importance-essential'
                  : skill.importance === 'recommended'
                    ? 'importance-recommended'
                    : 'importance-optional';

                return `
                  <div class="skill-card status-${status} group btn-inspect-skill" data-skill-id="${skill.id}">
                    <div>
                      <div class="flex items-start justify-between gap-3 mb-2">
                        <span class="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                          ${escHtml(skill.category)}
                        </span>
                        
                        <div class="flex items-center gap-1.5">
                          <span class="text-[10px] font-semibold px-2 py-0.5 rounded ${importanceClass}">
                            ${skill.importance}
                          </span>
                          <div class="status-icon-badge ${status}" title="${escHtml(statusLabel)}">
                            <span class="material-symbols-outlined text-sm">${statusIcon}</span>
                          </div>
                        </div>
                      </div>

                      <h4 class="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-1.5">
                        ${escHtml(skill.title)}
                      </h4>

                      <p class="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-3">
                        ${escHtml(skill.whyItMatters || skill.description || '')}
                      </p>
                    </div>

                    <!-- Card footer: Technologies & AI pill -->
                    <div class="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
                      <div class="flex items-center gap-1.5 text-[11px] text-slate-400">
                        <span class="material-symbols-outlined text-xs">schedule</span>
                        <span>${skill.estimatedTime || '1-2 weeks'}</span>
                      </div>

                      ${status === 'locked' ? `
                        <span class="text-[10px] font-semibold text-slate-400 flex items-center gap-1">
                          <span class="material-symbols-outlined text-xs">lock</span>
                          <span>Preview Available</span>
                        </span>
                      ` : skill.aiRelevance ? `
                        <span class="ai-relevance-pill" title="${skill.aiRelevance}">
                          <span class="material-symbols-outlined text-xs">auto_awesome</span>
                          <span>AI Relevance</span>
                        </span>
                      ` : ''}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Progressive Project Milestones -->
      ${roadmap.projects && roadmap.projects.length > 0 ? `
        <div class="mb-12 bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-6 shadow-sm">
          <div class="mb-6">
            <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/40 mb-1">
              <span class="material-symbols-outlined text-xs">rocket_launch</span>
              <span>PRACTICAL MILESTONE ROADMAP</span>
            </div>
            <h3 class="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              3 Progressive Industry Projects
            </h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Milestone projects validate real engineering ability. Each project unlocks sequentially as you complete its required prerequisite levels.
            </p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            ${roadmap.projects.map((proj, idx) => {
              const projectLockInfo = engine
                ? engine.getProjectLockStatus(role.id, idx, state, roadmap)
                : { isUnlocked: true, reason: 'Unlocked' };

              const diffClass = idx === 0
                ? 'badge-diff-beginner'
                : idx === 1
                  ? 'badge-diff-intermediate'
                  : 'badge-diff-advanced';
              const projectType = proj.type || (idx === 0 ? 'Beginner' : idx === 1 ? 'Intermediate' : 'Production / Job-Ready');

              return `
                <div class="project-card flex flex-col justify-between h-full bg-slate-50/50 dark:bg-slate-900/50 border ${projectLockInfo.isUnlocked ? 'border-slate-200/80 dark:border-slate-800 project-unlocked' : 'border-dashed border-slate-300 dark:border-slate-700 project-locked'} rounded-xl p-5 hover:border-indigo-300 dark:hover:border-indigo-700/60 transition-all">
                  <div>
                    <!-- Card Top Header -->
                    <div class="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-slate-100 dark:border-slate-800">
                      <div class="flex items-center gap-1.5">
                        <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${diffClass}">
                          ${projectType}
                        </span>
                        <span class="text-xs font-semibold text-slate-400">Project 0${idx + 1}</span>
                      </div>
                      ${projectLockInfo.isUnlocked ? `
                        <span class="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                          <span class="material-symbols-outlined text-xs">lock_open</span>
                          <span>Unlocked</span>
                        </span>
                      ` : `
                        <span class="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                          <span class="material-symbols-outlined text-xs">lock</span>
                          <span>Locked</span>
                        </span>
                      `}
                    </div>

                    ${!projectLockInfo.isUnlocked ? `
                      <div class="mb-3 p-2.5 rounded-lg bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/40 text-[11px] text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-sm">lock</span>
                        <span>${projectLockInfo.reason}</span>
                      </div>
                    ` : ''}

                    <!-- Project Title & Overview -->
                    <h4 class="text-base font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                      ${escHtml(proj.title)}
                    </h4>
                    <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                      ${escHtml(proj.description || proj.objective || '')}
                    </p>

                    <!-- Key Deliverables -->
                    ${proj.deliverables && proj.deliverables.length > 0 ? `
                      <div class="mb-4">
                        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                          <span class="material-symbols-outlined text-xs text-indigo-500">check_circle</span>
                          Core Deliverables
                        </span>
                        <ul class="space-y-1.5 text-xs text-slate-700 dark:text-slate-200">
                          ${proj.deliverables.map(d => `
                            <li class="flex items-start gap-1.5">
                              <span class="material-symbols-outlined text-xs text-indigo-500 mt-0.5 shrink-0">arrow_right</span>
                              <span>${escHtml(d)}</span>
                            </li>
                          `).join('')}
                        </ul>
                      </div>
                    ` : ''}

                    <!-- Engineering Requirements -->
                    ${proj.requirements && proj.requirements.length > 0 ? `
                      <div class="mb-4 bg-slate-100/70 dark:bg-slate-800/70 p-3 rounded-lg border border-slate-200/50 dark:border-slate-700/50">
                        <span class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                          <span class="material-symbols-outlined text-xs text-indigo-500">code</span>
                          Engineering Criteria
                        </span>
                        <ul class="space-y-1 text-[11px] text-slate-600 dark:text-slate-300">
                          ${proj.requirements.map(r => `
                            <li class="flex items-start gap-1.5">
                              <span class="material-symbols-outlined text-[11px] text-indigo-400 mt-0.5 shrink-0">check</span>
                              <span>${escHtml(r)}</span>
                            </li>
                          `).join('')}
                        </ul>
                      </div>
                    ` : ''}
                  </div>

                  <!-- Technologies Footer -->
                  <div class="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-1 mt-2">
                    ${(proj.technologies || []).map(t => `
                      <span class="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50">
                        ${escHtml(t)}
                      </span>
                    `).join('')}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      ` : ''}

      <!-- 9-Category Job-Ready Checklist -->
      ${renderJobReadySection(role, roadmap, checkedItems, isJobReady)}
    `;

    bindDetailEventListeners(role, roadmap, nodeStatusMap, detailedNodeMap, { percent, completed, total });
  }

  function renderJobReadySection(role, roadmap, checkedItems, isJobReady) {
    const checklistData = roadmap.checklist || roadmap.jobReadyChecklist || {};
    const CHECKLIST_CATEGORIES_CONFIG = [
      { key: 'technicalSkills', label: 'Technical Core Skills', icon: 'code', badge: 'Technical' },
      { key: 'projects', label: 'Milestone Projects', icon: 'folder_special', badge: 'Portfolio' },
      { key: 'csFundamentals', label: 'CS Fundamentals', icon: 'memory', badge: 'CS', link: 'dsa.html', linkText: 'DSA Roadmap' },
      { key: 'tools', label: 'Developer Tools & Workflows', icon: 'build', badge: 'Tools', link: 'snippets.html', linkText: 'Snippets' },
      { key: 'deployment', label: 'CI/CD & Cloud Deployment', icon: 'cloud_sync', badge: 'DevOps' },
      { key: 'portfolio', label: 'Engineering Portfolio & Demos', icon: 'web', badge: 'Showcase' },
      { key: 'github', label: 'GitHub & Open Source Hygiene', icon: 'hub', badge: 'GitHub', link: 'github.html', linkText: 'GitHub Analyzer' },
      { key: 'resume', label: 'ATS-Optimized Resume', icon: 'description', badge: 'Resume', link: 'resume.html', linkText: 'Resume Builder' },
      { key: 'interviewReadiness', label: 'Interview Readiness & Design', icon: 'psychology', badge: 'Interview', link: 'dsa.html', linkText: 'DSA Practice' }
    ];

    let totalItemsCount = 0;
    let checkedItemsCount = 0;

    CHECKLIST_CATEGORIES_CONFIG.forEach(cfg => {
      const rawItems = checklistData[cfg.key] || [];
      rawItems.forEach((item, idx) => {
        totalItemsCount++;
        const itemId = typeof item === 'object' && item.id ? item.id : `${role.id}-${cfg.key}-${idx}`;
        if (checkedItems.has(itemId)) {
          checkedItemsCount++;
        }
      });
    });

    if (totalItemsCount === 0) return '';
    const overallChecklistPct = Math.round((checkedItemsCount / totalItemsCount) * 100);

    return `
      <div class="mb-12 bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-6 shadow-sm">
        ${isJobReady ? `
          <div class="mb-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex items-start gap-3">
            <span class="material-symbols-outlined text-emerald-600 text-2xl mt-0.5">celebration</span>
            <div>
              <h4 class="text-sm font-bold text-emerald-900 dark:text-emerald-200 uppercase tracking-wide">
                🎉 Career Roadmap Complete
              </h4>
              <p class="text-xs text-emerald-800 dark:text-emerald-300 mt-0.5 leading-relaxed">
                Your roadmap is complete. You now have the recommended foundation and project evidence for this role. Complete the final checklist items below to polish your application readiness.
              </p>
            </div>
          </div>
        ` : ''}

        <!-- Checklist Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-900/40 mb-1">
              <span class="material-symbols-outlined text-xs">verified</span>
              <span>CAREER READINESS VERIFICATION</span>
            </div>
            <h3 class="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Job-Ready Launch Checklist
            </h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Complete these 9 verification categories to validate your technical mastery, projects, resume, and interview readiness before applying.
            </p>
          </div>

          <div class="flex flex-col items-start sm:items-end gap-1.5 shrink-0">
            <div class="flex items-center gap-2">
              <span id="checklist-progress-text" class="text-xs font-bold text-slate-700 dark:text-slate-200">
                ${checkedItemsCount} of ${totalItemsCount} items (${overallChecklistPct}%)
              </span>
              <span class="text-[10px] font-semibold text-slate-400 px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
                Saves Automatically
              </span>
            </div>
            <div class="w-48 bg-slate-100 dark:bg-slate-700/80 h-2 rounded-full overflow-hidden">
              <div id="checklist-progress-bar" class="bg-emerald-500 h-full rounded-full transition-all duration-300" style="width: ${overallChecklistPct}%"></div>
            </div>
          </div>
        </div>

        <!-- 9-Category Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          ${CHECKLIST_CATEGORIES_CONFIG.map(cfg => {
            const rawItems = checklistData[cfg.key] || [];
            if (rawItems.length === 0) return '';

            return `
              <div class="bg-slate-50/70 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200/60 dark:border-slate-800 flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-200/60 dark:border-slate-800">
                    <div class="flex items-center gap-2">
                      <span class="material-symbols-outlined text-indigo-500 text-base">${cfg.icon}</span>
                      <h4 class="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                        ${cfg.label}
                      </h4>
                    </div>
                    ${cfg.link ? `
                      <a href="${cfg.link}" class="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-0.5 shrink-0">
                        <span>${cfg.linkText}</span>
                        <span class="material-symbols-outlined text-xs">open_in_new</span>
                      </a>
                    ` : ''}
                  </div>

                  <div class="space-y-2">
                    ${rawItems.map((item, idx) => {
                      const itemId = typeof item === 'object' && item.id ? item.id : `${role.id}-${cfg.key}-${idx}`;
                      const itemLabel = typeof item === 'string' ? item : (item.label || item.title || '');
                      const isChecked = checkedItems.has(itemId);
                      const itemLink = typeof item === 'object' && item.link ? item.link : null;

                      return `
                        <div class="flex items-start justify-between gap-2">
                          <label class="flex items-start gap-2.5 cursor-pointer flex-1 group">
                            <input 
                              type="checkbox" 
                              class="mt-0.5 rounded text-indigo-600 border-slate-300 dark:border-slate-600 dark:bg-slate-700 focus:ring-indigo-500 checklist-checkbox shrink-0" 
                              data-item-id="${itemId}" 
                              ${isChecked ? 'checked' : ''}
                            />
                            <span class="text-xs text-slate-700 dark:text-slate-300 leading-snug group-hover:text-slate-900 dark:group-hover:text-white transition-colors ${isChecked ? 'line-through text-slate-400 dark:text-slate-500' : ''}">
                              ${escHtml(itemLabel)}
                            </span>
                          </label>
                          ${itemLink ? `
                            <a href="${itemLink}" class="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline shrink-0 ml-1 inline-flex items-center gap-0.5">
                              <span class="material-symbols-outlined text-xs">open_in_new</span>
                            </a>
                          ` : ''}
                        </div>
                      `;
                    }).join('')}
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  function bindDetailEventListeners(role, roadmap, nodeStatusMap, detailedNodeMap, roleProg) {
    // 1. Skill card click -> Open Skill Modal (supports both active learning & locked previews)
    document.querySelectorAll('.btn-inspect-skill').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const skillId = btn.getAttribute('data-skill-id');
        openSkillModal(role, roadmap, skillId, nodeStatusMap, detailedNodeMap);
      });
    });

    // 2. Checklist checkboxes
    document.querySelectorAll('.checklist-checkbox').forEach(box => {
      box.addEventListener('change', () => {
        const itemId = box.getAttribute('data-item-id');
        toggleChecklistItem(role.id, itemId, box.checked);
        const labelText = box.nextElementSibling;
        if (labelText) {
          if (box.checked) {
            labelText.classList.add('line-through', 'text-slate-400', 'dark:text-slate-500');
          } else {
            labelText.classList.remove('line-through', 'text-slate-400', 'dark:text-slate-500');
          }
        }

        const allBoxes = document.querySelectorAll('.checklist-checkbox');
        let currentChecked = 0;
        allBoxes.forEach(b => { if (b.checked) currentChecked++; });
        const pct = allBoxes.length > 0 ? Math.round((currentChecked / allBoxes.length) * 100) : 0;
        const countEl = document.getElementById('checklist-progress-text');
        const barEl = document.getElementById('checklist-progress-bar');
        if (countEl) countEl.textContent = `${currentChecked} of ${allBoxes.length} items (${pct}%)`;
        if (barEl) barEl.style.width = `${pct}%`;
      });
    });

    // 3. Roadmap Settings Menu toggle
    const settingsToggleBtn = document.getElementById('btn-roadmap-settings-toggle');
    const settingsMenu = document.getElementById('roadmap-settings-dropdown-menu');
    if (settingsToggleBtn && settingsMenu) {
      settingsToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        settingsMenu.classList.toggle('show');
      });

      document.addEventListener('click', () => {
        settingsMenu.classList.remove('show');
      });
    }

    // 4. Pause / Resume from Menu or Banner
    const pauseMenuBtn = document.getElementById('btn-menu-pause');
    if (pauseMenuBtn) {
      pauseMenuBtn.addEventListener('click', () => {
        if (engine) engine.pauseActiveCareer(role.id);
        if (typeof showToast === 'function') showToast('Roadmap paused. Your progress remains saved.', 'info');
        renderRoadmapDetail(role.id);
      });
    }

    const resumeMenuBtn = document.getElementById('btn-menu-resume');
    if (resumeMenuBtn) {
      resumeMenuBtn.addEventListener('click', () => {
        if (engine) engine.resumeActiveCareer(role.id);
        if (typeof showToast === 'function') showToast('Welcome back! Roadmap resumed.', 'success');
        renderRoadmapDetail(role.id);
      });
    }

    const bannerResumeBtn = document.getElementById('btn-banner-resume-roadmap');
    if (bannerResumeBtn) {
      bannerResumeBtn.addEventListener('click', () => {
        if (engine) engine.resumeActiveCareer(role.id);
        if (typeof showToast === 'function') showToast('Welcome back! Roadmap resumed.', 'success');
        renderRoadmapDetail(role.id);
      });
    }

    // 5. Change Career Modal trigger
    const changeCareerBtn = document.getElementById('btn-menu-change-career');
    if (changeCareerBtn) {
      changeCareerBtn.addEventListener('click', () => {
        openChangeCareerModal(role, roleProg);
      });
    }

    // 6. Reset Progress trigger
    const resetProgressBtn = document.getElementById('btn-menu-reset-progress');
    if (resetProgressBtn) {
      resetProgressBtn.addEventListener('click', () => {
        if (confirm(`Reset progress for ${role.title}? This will clear completed skills for this role, but keep your career commitment.`)) {
          if (engine) engine.resetCareerProgress(role.id);
          if (typeof showToast === 'function') showToast('Progress reset for ' + role.title, 'info');
          renderRoadmapDetail(role.id);
        }
      });
    }
  }

  // =========================================================================
  // SKILL DETAIL MODAL (Supports Active Learning & Locked Previews)
  // =========================================================================

  function openSkillModal(role, roadmap, skillId, nodeStatusMap, detailedNodeMap = {}) {
    let targetSkill = null;
    let targetLevel = null;

    for (const lvl of roadmap.levels) {
      for (const s of lvl.skills) {
        if (s.id === skillId) {
          targetSkill = s;
          targetLevel = lvl;
          break;
        }
      }
      if (targetSkill) break;
    }

    if (!targetSkill) return;

    selectedSkillNode = targetSkill;
    const detailed = detailedNodeMap[targetSkill.id] || {};
    const currentStatus = detailed.status || nodeStatusMap[targetSkill.id] || 'available';
    const isLocked = currentStatus === 'locked';

    const modalBackdrop = document.getElementById('skill-detail-modal');
    const modalContent = document.getElementById('skill-modal-body');
    if (!modalBackdrop || !modalContent) return;

    const prereqNodes = (targetSkill.prerequisites || []).map(pId => {
      for (const lvl of roadmap.levels) {
        for (const s of lvl.skills) {
          if (s.id === pId) return { ...s, isMet: nodeStatusMap[pId] === 'completed' };
        }
      }
      return { id: pId, title: pId, isMet: false };
    });

    const importanceClass = targetSkill.importance === 'essential'
      ? 'importance-essential'
      : targetSkill.importance === 'recommended'
        ? 'importance-recommended'
        : 'importance-optional';

    modalContent.innerHTML = `
      <div class="flex items-start justify-between gap-4 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div class="flex flex-wrap items-center gap-2 mb-1.5">
            <span class="text-xs font-semibold px-2.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/40">
              Level ${targetSkill.levelNum || 1} • ${targetLevel ? escHtml(targetLevel.name) : ''}
            </span>
            <span class="text-xs font-semibold px-2 py-0.5 rounded ${importanceClass}">
              ${targetSkill.importance}
            </span>
            <span class="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              ${targetSkill.difficulty || 'Intermediate'}
            </span>
            <span class="text-xs text-slate-400 flex items-center gap-1">
              <span class="material-symbols-outlined text-sm">schedule</span>
              ${targetSkill.estimatedTime || '1-2 weeks'}
            </span>
          </div>

          <h3 class="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            ${escHtml(targetSkill.title)}
          </h3>
          <span class="text-xs text-slate-500 dark:text-slate-400">
            Category: ${escHtml(targetSkill.category)}
          </span>
        </div>

        <button id="btn-close-skill-modal" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0" aria-label="Close modal">
          <span class="material-symbols-outlined text-xl">close</span>
        </button>
      </div>

      <!-- Locked Warning or Action Bar -->
      ${isLocked ? `
        <div class="bg-amber-50 dark:bg-amber-950/40 p-4 rounded-xl border border-amber-200 dark:border-amber-800/60 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="flex items-start gap-3">
            <span class="material-symbols-outlined text-amber-600 dark:text-amber-400 text-xl mt-0.5">lock</span>
            <div>
              <span class="text-[10px] font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider block">Locked Topic Preview</span>
              <p class="text-xs text-amber-900 dark:text-amber-200 font-medium mt-0.5">
                ${escHtml(detailed.reason || 'Complete earlier prerequisites in sequence to unlock this topic.')}
              </p>
            </div>
          </div>

          ${detailed.missingPrereqs && detailed.missingPrereqs.length > 0 ? `
            <button class="btn-primary text-xs py-1.5 px-3 btn-jump-to-prereq shrink-0" data-prereq-id="${detailed.missingPrereqs[0]}">
              <span>Go to Prerequisite</span>
              <span class="material-symbols-outlined text-xs">arrow_forward</span>
            </button>
          ` : ''}
        </div>
      ` : `
        <div class="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Current Status</span>
            <span class="text-sm font-bold capitalize ${currentStatus === 'completed' ? 'text-emerald-600' : currentStatus === 'in-progress' ? 'text-blue-600' : 'text-slate-700 dark:text-slate-200'}">
              ${currentStatus}
            </span>
          </div>

          <div class="flex items-center gap-2">
            ${currentStatus !== 'completed' ? `
              <button id="btn-modal-mark-completed" class="btn-primary text-xs py-2 px-3 flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 border-emerald-600 shadow-sm">
                <span class="material-symbols-outlined text-sm">check_circle</span>
                Mark Completed
              </button>
            ` : `
              <button id="btn-modal-mark-reset" class="btn-secondary text-xs py-2 px-3 flex items-center gap-1.5">
                <span class="material-symbols-outlined text-sm">restart_alt</span>
                Reset Status
              </button>
            `}

            ${currentStatus !== 'in-progress' && currentStatus !== 'completed' ? `
              <button id="btn-modal-mark-inprogress" class="btn-secondary text-xs py-2 px-3 flex items-center gap-1.5">
                <span class="material-symbols-outlined text-sm">hourglass_top</span>
                In Progress
              </button>
            ` : ''}
          </div>
        </div>
      `}

      <!-- Prerequisites -->
      <div class="mb-5">
        <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
          <span class="material-symbols-outlined text-sm">account_tree</span>
          Prerequisites
        </h4>
        ${prereqNodes.length > 0 ? `
          <div class="flex flex-wrap gap-2">
            ${prereqNodes.map(p => `
              <button class="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md border ${p.isMet ? 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/50' : 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700 cursor-pointer btn-jump-to-prereq'}" data-prereq-id="${p.id}">
                <span class="material-symbols-outlined text-xs ${p.isMet ? 'text-emerald-600' : 'text-slate-400'}">${p.isMet ? 'check_circle' : 'lock'}</span>
                <span>${escHtml(p.title)}</span>
              </button>
            `).join('')}
          </div>
        ` : `
          <p class="text-xs text-slate-500 italic">No previous prerequisites required. Safe to begin immediately.</p>
        `}
      </div>

      <!-- What to Learn -->
      <div class="mb-5">
        <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
          <span class="material-symbols-outlined text-sm">checklist</span>
          What to Learn
        </h4>
        <ul class="space-y-1.5 text-xs text-slate-700 dark:text-slate-200">
          ${(targetSkill.whatToLearn || []).map(item => `
            <li class="flex items-start gap-2">
              <span class="material-symbols-outlined text-sm text-indigo-500 mt-0.5 shrink-0">arrow_right</span>
              <span>${escHtml(item)}</span>
            </li>
          `).join('')}
        </ul>
      </div>

      <!-- Real-World Production Use -->
      ${targetSkill.productionUse ? `
        <div class="mb-5 bg-emerald-50/60 dark:bg-emerald-950/30 p-3.5 rounded-xl border border-emerald-200/80 dark:border-emerald-900/50">
          <h4 class="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider mb-1 flex items-center gap-1">
            <span class="material-symbols-outlined text-sm text-emerald-600">domain</span>
            Real-World Production Use
          </h4>
          <p class="text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed">
            ${escHtml(targetSkill.productionUse)}
          </p>
        </div>
      ` : ''}

      <!-- Why It Matters -->
      <div class="mb-5 bg-slate-50 dark:bg-slate-900/60 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800">
        <h4 class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
          <span class="material-symbols-outlined text-sm text-indigo-500">lightbulb</span>
          Why It Matters in Production
        </h4>
        <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          ${escHtml(targetSkill.whyItMatters || 'Essential knowledge applied routinely in professional codebases.')}
        </p>
      </div>

      <!-- Hands-On Practice Task -->
      ${targetSkill.handsOnTask || targetSkill.practice ? `
        <div class="mb-5">
          <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <span class="material-symbols-outlined text-sm">terminal</span>
            Hands-On Practice Task
          </h4>
          <div class="text-xs text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 p-3.5 rounded-xl font-mono leading-relaxed border border-slate-200/60 dark:border-slate-700">
            ${escHtml(targetSkill.handsOnTask || targetSkill.practice)}
          </div>
        </div>
      ` : ''}

      <!-- Curated Resources -->
      ${targetSkill.resources && targetSkill.resources.length > 0 ? `
        <div class="mb-2">
          <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
            <span class="material-symbols-outlined text-sm">library_books</span>
            Curated Resources & Documentation
          </h4>
          <div class="space-y-1.5">
            ${targetSkill.resources.map(res => `
              <a href="${res.url}" target="_blank" rel="noopener noreferrer" class="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800 transition-colors group">
                <div class="flex items-center gap-2">
                  <span class="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                    ${escHtml(res.type || 'link')}
                  </span>
                  <span class="text-xs font-medium text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    ${escHtml(res.title)}
                  </span>
                </div>
                <span class="material-symbols-outlined text-sm text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  open_in_new
                </span>
              </a>
            `).join('')}
          </div>
        </div>
      ` : ''}
    `;

    modalBackdrop.classList.add('active');

    const closeBtn = document.getElementById('btn-close-skill-modal');
    if (closeBtn) closeBtn.addEventListener('click', closeSkillModal);

    if (!isLocked) {
      const markCompletedBtn = document.getElementById('btn-modal-mark-completed');
      if (markCompletedBtn) {
        markCompletedBtn.addEventListener('click', () => {
          setSkillStatus(role.id, targetSkill.id, 'completed');
          closeSkillModal();
        });
      }

      const markInProgressBtn = document.getElementById('btn-modal-mark-inprogress');
      if (markInProgressBtn) {
        markInProgressBtn.addEventListener('click', () => {
          setSkillStatus(role.id, targetSkill.id, 'in-progress');
          closeSkillModal();
        });
      }

      const markResetBtn = document.getElementById('btn-modal-mark-reset');
      if (markResetBtn) {
        markResetBtn.addEventListener('click', () => {
          setSkillStatus(role.id, targetSkill.id, 'available');
          closeSkillModal();
        });
      }
    }

    // Go to Prerequisite button in locked preview
    modalContent.querySelectorAll('.btn-jump-to-prereq').forEach(jumpBtn => {
      jumpBtn.addEventListener('click', () => {
        const prereqId = jumpBtn.getAttribute('data-prereq-id');
        if (prereqId) {
          openSkillModal(role, roadmap, prereqId, nodeStatusMap, detailedNodeMap);
        }
      });
    });
  }

  function closeSkillModal() {
    const modalBackdrop = document.getElementById('skill-detail-modal');
    if (modalBackdrop) modalBackdrop.classList.remove('active');
    selectedSkillNode = null;
  }

  // =========================================================================
  // CAREER COMMITMENT MODAL FLOW (3 STEPS)
  // =========================================================================

  function openCommitmentModal(roleId) {
    const role = (getAllCareerRoles()).find(r => r.id === roleId);
    if (!role) return;

    wizardRole = role;
    wizardStep = 1;
    wizardAnswers = {
      goal: 'Build strong professional skills',
      experienceLevel: 'Beginner',
      sequenceConsent: true
    };

    renderCommitmentWizard();
    const modalBackdrop = document.getElementById('career-commitment-modal');
    if (modalBackdrop) modalBackdrop.classList.add('active');
  }

  function closeCommitmentModal() {
    const modalBackdrop = document.getElementById('career-commitment-modal');
    if (modalBackdrop) modalBackdrop.classList.remove('active');
    wizardRole = null;
  }

  function renderCommitmentWizard() {
    const modalBody = document.getElementById('commitment-modal-body');
    if (!modalBody || !wizardRole) return;

    const role = wizardRole;
    const roadmap = (getAllCareerRoadmaps())[role.roadmapId] || {};

    let contentHtml = '';

    if (wizardStep === 1) {
      // Step 1: Role Overview & What You Will Learn
      contentHtml = `
        <div class="step-indicator-bar">
          <div class="step-indicator-dot active">1. Understand Path</div>
          <div class="step-indicator-dot">2. Goals & Level</div>
          <div class="step-indicator-dot">3. Confirmation</div>
        </div>

        <div class="flex items-center gap-3 mb-4">
          <div class="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50 flex items-center justify-center shrink-0 shadow-sm">
            <span class="material-symbols-outlined text-2xl">${role.icon || 'map'}</span>
          </div>
          <div>
            <span class="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Career Path</span>
            <h3 class="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">${escHtml(role.title)}</h3>
          </div>
        </div>

        <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
          ${escHtml(role.tagline || role.description)}
        </p>

        <div class="mb-5 bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
          <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1">
            <span class="material-symbols-outlined text-sm text-emerald-500">checklist</span>
            What You Will Master:
          </h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-200">
            ${(role.featuredTech || []).concat(['Git & GitHub', 'System Architecture', 'Testing & QA', 'Deployment', 'Industry Capstone']).slice(0, 10).map(item => `
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-emerald-500 text-sm">check_circle</span>
                <span>${escHtml(item)}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="mb-6 bg-indigo-50/50 dark:bg-indigo-950/30 p-3.5 rounded-xl border border-indigo-100 dark:border-indigo-900/40">
          <div class="text-[11px] font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wide mb-1">Estimated Learning Sequence:</div>
          <div class="text-xs font-semibold text-indigo-900 dark:text-indigo-200 flex flex-wrap items-center gap-1">
            <span>Foundation</span>
            <span class="text-slate-400">→</span>
            <span>Core Skills</span>
            <span class="text-slate-400">→</span>
            <span>Advanced Architecture</span>
            <span class="text-slate-400">→</span>
            <span>Production Projects</span>
            <span class="text-slate-400">→</span>
            <span>Job Ready</span>
          </div>
        </div>

        <div class="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-800/40 text-xs text-amber-900 dark:text-amber-200 mb-6">
          Before starting, let's make sure this is the path you actually want to pursue.
        </div>

        <div class="flex items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <button id="btn-wizard-cancel" class="btn-secondary text-xs py-2.5 px-4">
            Cancel
          </button>
          <button id="btn-wizard-step1-continue" class="btn-primary text-xs py-2.5 px-5 flex items-center gap-1.5">
            <span>Continue</span>
            <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      `;
    } else if (wizardStep === 2) {
      // Step 2: 3 Short Commitment Questions
      contentHtml = `
        <div class="step-indicator-bar">
          <div class="step-indicator-dot completed">✓ Understand Path</div>
          <div class="step-indicator-dot active">2. Goals & Level</div>
          <div class="step-indicator-dot">3. Confirmation</div>
        </div>

        <h3 class="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-1">
          Commitment Questions
        </h3>
        <p class="text-xs text-slate-500 dark:text-slate-400 mb-5">
          These answers personalize your roadmap and track your intention.
        </p>

        <!-- Question 1 -->
        <div class="mb-5">
          <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
            1. What do you want to achieve with this roadmap?
          </label>
          <div class="space-y-2">
            ${[
              'Get an internship',
              'Get a full-time job',
              'Build strong professional skills',
              'Build projects / portfolio',
              'Explore this career'
            ].map(opt => `
              <div class="choice-card-option ${wizardAnswers.goal === opt ? 'selected' : ''}" data-type="goal" data-value="${opt}">
                <div class="custom-radio-circle"></div>
                <span class="text-xs font-medium text-slate-800 dark:text-slate-200">${opt}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Question 2 -->
        <div class="mb-5">
          <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
            2. How familiar are you with this field?
          </label>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            ${[
              'Beginner',
              'Some basics',
              'Intermediate',
              'Already working in this area'
            ].map(opt => `
              <div class="choice-card-option ${wizardAnswers.experienceLevel === opt ? 'selected' : ''}" data-type="experienceLevel" data-value="${opt}">
                <div class="custom-radio-circle"></div>
                <span class="text-xs font-medium text-slate-800 dark:text-slate-200">${opt}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Question 3 -->
        <div class="mb-6">
          <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
            3. Are you ready to follow this roadmap in sequence?
          </label>
          <div class="space-y-2">
            ${[
              { label: 'Yes, I want a structured path', val: true },
              { label: 'I want to explore before committing', val: false }
            ].map(opt => `
              <div class="choice-card-option ${wizardAnswers.sequenceConsent === opt.val ? 'selected' : ''}" data-type="sequenceConsent" data-value="${opt.val}">
                <div class="custom-radio-circle"></div>
                <span class="text-xs font-medium text-slate-800 dark:text-slate-200">${opt.label}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="flex items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <button id="btn-wizard-step2-back" class="btn-secondary text-xs py-2.5 px-4 flex items-center gap-1">
            <span class="material-symbols-outlined text-sm">arrow_back</span>
            <span>Back</span>
          </button>
          <button id="btn-wizard-step2-continue" class="btn-primary text-xs py-2.5 px-5 flex items-center gap-1.5">
            <span>Next: Final Confirmation</span>
            <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      `;
    } else if (wizardStep === 3) {
      // Step 3: Final Confirmation
      contentHtml = `
        <div class="step-indicator-bar">
          <div class="step-indicator-dot completed">✓ Understand Path</div>
          <div class="step-indicator-dot completed">✓ Goals & Level</div>
          <div class="step-indicator-dot active">3. Confirmation</div>
        </div>

        <div class="text-center max-w-md mx-auto mb-6">
          <span class="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block mb-1">
            You're about to start:
          </span>
          <h3 class="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
            ${role.title.toUpperCase()} ROADMAP
          </h3>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            This structured path will guide you through:
          </p>
        </div>

        <!-- Vertical Flow Tree -->
        <div class="max-w-xs mx-auto mb-6 bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
          <div class="space-y-2 text-center text-xs font-bold text-slate-700 dark:text-slate-200">
            <div class="py-1 px-3 bg-white dark:bg-slate-800 rounded-md shadow-xs">Foundation</div>
            <div class="text-slate-400 text-[10px]">↓</div>
            <div class="py-1 px-3 bg-white dark:bg-slate-800 rounded-md shadow-xs">Core Concepts</div>
            <div class="text-slate-400 text-[10px]">↓</div>
            <div class="py-1 px-3 bg-white dark:bg-slate-800 rounded-md shadow-xs">Advanced Architecture</div>
            <div class="text-slate-400 text-[10px]">↓</div>
            <div class="py-1 px-3 bg-white dark:bg-slate-800 rounded-md shadow-xs">Testing & Performance</div>
            <div class="text-slate-400 text-[10px]">↓</div>
            <div class="py-1 px-3 bg-white dark:bg-slate-800 rounded-md shadow-xs">3 Milestone Projects</div>
            <div class="text-slate-400 text-[10px]">↓</div>
            <div class="py-1 px-3 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 rounded-md border border-emerald-200 dark:border-emerald-800">Job Ready Verification</div>
          </div>
        </div>

        <!-- Notice -->
        <div class="p-3.5 bg-indigo-50/70 dark:bg-indigo-950/40 rounded-xl border border-indigo-100 dark:border-indigo-900/50 text-xs text-indigo-900 dark:text-indigo-200 mb-6 leading-relaxed">
          <div class="font-bold mb-0.5">Focus Commitment:</div>
          Starting this path will make it your <strong>ACTIVE CAREER ROADMAP</strong>. Other career roadmaps will be locked to preserve your focus. You can change your career later from Roadmap Settings without losing progress.
        </div>

        <div class="flex items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <button id="btn-wizard-step3-back" class="btn-secondary text-xs py-2.5 px-4 flex items-center gap-1">
            <span class="material-symbols-outlined text-sm">arrow_back</span>
            <span>Go Back</span>
          </button>
          <button id="btn-wizard-start-roadmap" class="btn-primary text-xs py-2.5 px-5 flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 shadow-md">
            <span>Start ${escHtml(role.title)} Roadmap</span>
            <span class="material-symbols-outlined text-sm">rocket_launch</span>
          </button>
        </div>
      `;
    }

    modalBody.innerHTML = contentHtml;
    bindWizardEventListeners();
  }

  function bindWizardEventListeners() {
    const cancelBtn = document.getElementById('btn-wizard-cancel');
    if (cancelBtn) cancelBtn.addEventListener('click', closeCommitmentModal);

    const step1Continue = document.getElementById('btn-wizard-step1-continue');
    if (step1Continue) {
      step1Continue.addEventListener('click', () => {
        wizardStep = 2;
        renderCommitmentWizard();
      });
    }

    const step2Back = document.getElementById('btn-wizard-step2-back');
    if (step2Back) {
      step2Back.addEventListener('click', () => {
        wizardStep = 1;
        renderCommitmentWizard();
      });
    }

    // Step 2 Question Choice Selection
    document.querySelectorAll('.choice-card-option').forEach(card => {
      card.addEventListener('click', () => {
        const type = card.getAttribute('data-type');
        let val = card.getAttribute('data-value');
        if (val === 'true') val = true;
        if (val === 'false') val = false;

        wizardAnswers[type] = val;

        // Re-render choices in step 2
        document.querySelectorAll(`.choice-card-option[data-type="${type}"]`).forEach(c => {
          c.classList.remove('selected');
        });
        card.classList.add('selected');
      });
    });

    const step2Continue = document.getElementById('btn-wizard-step2-continue');
    if (step2Continue) {
      step2Continue.addEventListener('click', () => {
        wizardStep = 3;
        renderCommitmentWizard();
      });
    }

    const step3Back = document.getElementById('btn-wizard-step3-back');
    if (step3Back) {
      step3Back.addEventListener('click', () => {
        wizardStep = 2;
        renderCommitmentWizard();
      });
    }

    // Final Start Roadmap Action
    const startRoadmapBtn = document.getElementById('btn-wizard-start-roadmap');
    if (startRoadmapBtn) {
      startRoadmapBtn.addEventListener('click', () => {
        if (!wizardRole) return;
        const committedRole = wizardRole;
        if (engine && typeof engine.commitToCareer === 'function') {
          engine.commitToCareer(committedRole.id, wizardAnswers);
        } else {
          const state = getProgressState();
          state.activeCareer = committedRole.id;
          state.activeCareerStatus = 'active';
          saveProgressState(state);
        }

        closeCommitmentModal();
        if (typeof showToast === 'function') {
          showToast(`Welcome to the ${committedRole.title} Roadmap! Let's start with Level 1.`, 'success');
        }
        window.location.hash = `#role=${committedRole.id}`;
      });
    }
  }

  // =========================================================================
  // LOCKED CAREER MODAL (When clicking a locked card in the catalog)
  // =========================================================================

  function openLockedCareerModal(targetRoleId) {
    const modalBackdrop = document.getElementById('career-locked-modal');
    const modalBody = document.getElementById('locked-modal-body');
    if (!modalBackdrop || !modalBody) return;

    const state = getProgressState();
    const activeCareerId = state.activeCareer;
    const targetRole = (getAllCareerRoles()).find(r => r.id === targetRoleId);
    const activeRole = (getAllCareerRoles()).find(r => r.id === activeCareerId);
    const activeProg = activeRole ? calculateRoleProgress(activeRole) : { percent: 0, completed: 0, total: 0 };

    modalBody.innerHTML = `
      <div class="text-center mb-5">
        <div class="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60 flex items-center justify-center mx-auto mb-3 shadow-xs">
          <span class="material-symbols-outlined text-2xl">lock</span>
        </div>
        <h3 class="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          ${escHtml(targetRole ? targetRole.title : 'Career')} is Locked
        </h3>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto leading-relaxed">
          You are currently committed to:
          <strong class="text-indigo-600 dark:text-indigo-400">${escHtml(activeRole ? activeRole.title : 'Active Roadmap')}</strong>
          (${activeProg.percent}% completed).
        </p>
      </div>

      <div class="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800 mb-5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
        To build real engineering expertise, DevPilot AI keeps you focused on one roadmap at a time. Complete your active path, or switch careers deliberately in Roadmap Settings.
      </div>

      <div class="flex flex-col sm:flex-row items-center justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800">
        <button id="btn-close-locked-modal" class="btn-secondary text-xs py-2 px-3.5 w-full sm:w-auto">
          Close
        </button>
        ${activeRole ? `
          <a href="#role=${activeRole.id}" id="btn-locked-continue-active" class="btn-primary text-xs py-2 px-4 w-full sm:w-auto text-center flex items-center justify-center gap-1.5">
            <span>Continue ${escHtml(activeRole.title)}</span>
            <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        ` : ''}
      </div>
    `;

    modalBackdrop.classList.add('active');

    const closeBtn = document.getElementById('btn-close-locked-modal');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modalBackdrop.classList.remove('active');
      });
    }

    const continueActive = document.getElementById('btn-locked-continue-active');
    if (continueActive) {
      continueActive.addEventListener('click', () => {
        modalBackdrop.classList.remove('active');
      });
    }
  }

  // =========================================================================
  // DELIBERATE CHANGE CAREER MODAL
  // =========================================================================

  function openChangeCareerModal(currentRole, currentProgress) {
    const modalBackdrop = document.getElementById('career-change-modal');
    const modalBody = document.getElementById('change-modal-body');
    if (!modalBackdrop || !modalBody) return;

    let selectedReason = "I discovered another career I prefer";

    modalBody.innerHTML = `
      <div class="flex items-start justify-between gap-4 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60 flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-xl">swap_horiz</span>
          </div>
          <div>
            <h3 class="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Change Your Active Career?
            </h3>
            <span class="text-xs text-slate-500 dark:text-slate-400">
              Current Path: <strong>${escHtml(currentRole.title)}</strong>
            </span>
          </div>
        </div>
        <button id="btn-close-change-modal" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-lg" aria-label="Close">
          <span class="material-symbols-outlined text-xl">close</span>
        </button>
      </div>

      <div class="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800 mb-5">
        <div class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Current Progress Preserved:</div>
        <div class="flex items-center gap-4 text-xs text-slate-700 dark:text-slate-200 font-semibold mb-3">
          <span>${currentProgress.percent}% of the roadmap</span>
          <span>•</span>
          <span>${currentProgress.completed} skills mastered</span>
        </div>
        <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          Changing your career will <strong>NOT</strong> delete your existing ${escHtml(currentRole.title)} progress. It will simply move another career into your active roadmap. You can switch back anytime and your progress will be restored.
        </p>
      </div>

      <div class="mb-6">
        <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
          Why are you changing?
        </label>
        <div class="space-y-2">
          ${[
            "This career isn't what I expected",
            "I discovered another career I prefer",
            "My career goal changed",
            "The roadmap is not a good fit",
            "I want to explore another path",
            "Other"
          ].map((reason, idx) => `
            <div class="choice-card-option ${idx === 1 ? 'selected' : ''} change-reason-option" data-reason="${reason}">
              <div class="custom-radio-circle"></div>
              <span class="text-xs font-medium text-slate-800 dark:text-slate-200">${reason}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="flex items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
        <button id="btn-change-modal-keep" class="btn-secondary text-xs py-2.5 px-4 font-semibold">
          Keep Current Career
        </button>
        <button id="btn-change-modal-continue" class="btn-primary text-xs py-2.5 px-5 bg-amber-600 hover:bg-amber-700 border-amber-600 font-semibold">
          Continue Changing Career
        </button>
      </div>
    `;

    modalBackdrop.classList.add('active');

    const closeBtn = document.getElementById('btn-close-change-modal');
    if (closeBtn) closeBtn.addEventListener('click', () => modalBackdrop.classList.remove('active'));

    const keepBtn = document.getElementById('btn-change-modal-keep');
    if (keepBtn) keepBtn.addEventListener('click', () => modalBackdrop.classList.remove('active'));

    modalBody.querySelectorAll('.change-reason-option').forEach(opt => {
      opt.addEventListener('click', () => {
        selectedReason = opt.getAttribute('data-reason');
        modalBody.querySelectorAll('.change-reason-option').forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
      });
    });

    const continueBtn = document.getElementById('btn-change-modal-continue');
    if (continueBtn) {
      continueBtn.addEventListener('click', () => {
        if (engine && typeof engine.changeActiveCareer === 'function') {
          engine.changeActiveCareer(null, selectedReason, currentProgress.percent);
        } else {
          const state = getProgressState();
          state.activeCareer = null;
          state.activeCareerStatus = 'available';
          saveProgressState(state);
        }

        modalBackdrop.classList.remove('active');
        if (typeof showToast === 'function') {
          showToast('Active career unassigned. Your previous progress was safely saved.', 'info');
        }
        window.location.hash = '';
      });
    }
  }

  // =========================================================================
  // ROUTING & CONTROLLER INITIALIZATION
  // =========================================================================

  function handleRoute() {
    const hash = window.location.hash || '';
    const match = hash.match(/#role=([a-zA-Z0-9_\-]+)/);

    if (match && match[1]) {
      currentRoleId = match[1];
      renderRoadmapDetail(currentRoleId);
    } else {
      currentRoleId = null;
      renderCatalog();
    }
  }

  function renderCurrentRoute() {
    if (currentRoleId) {
      renderRoadmapDetail(currentRoleId);
    } else {
      renderCatalog();
    }
  }

  function initRoadmapsPage() {
    const searchInput = document.getElementById('roadmap-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderCatalog();
      });
    }

    document.querySelectorAll('.category-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeCategory = btn.getAttribute('data-category') || 'all';
        updateCategoryTabs();
        renderCatalog();
      });
    });

    const diffSelect = document.getElementById('filter-difficulty-select');
    if (diffSelect) {
      diffSelect.addEventListener('change', (e) => {
        selectedDifficulty = e.target.value;
        renderCatalog();
      });
    }

    const progSelect = document.getElementById('filter-progress-select');
    if (progSelect) {
      progSelect.addEventListener('change', (e) => {
        selectedProgress = e.target.value;
        renderCatalog();
      });
    }

    // Modal backdrop clicks to dismiss
    ['skill-detail-modal', 'career-commitment-modal', 'career-locked-modal', 'career-change-modal'].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('click', (e) => {
          if (e.target === el) {
            el.classList.remove('active');
          }
        });
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        ['skill-detail-modal', 'career-commitment-modal', 'career-locked-modal', 'career-change-modal'].forEach(id => {
          const el = document.getElementById(id);
          if (el) el.classList.remove('active');
        });
      }
    });

    window.addEventListener('hashchange', handleRoute);
    handleRoute();
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initRoadmapsPage);
    } else {
      initRoadmapsPage();
    }
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      resolveRoadmapNodeStatuses,
      calculateRoleProgress,
      findNextRecommendedSkill,
      setSkillStatus,
      getProgressState,
      saveProgressState
    };
  }
})();
