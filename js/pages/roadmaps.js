/**
 * DevPilot-AI — Career Roadmaps Controller
 * Manages URL hash routing, role catalog filtering, real progress calculation,
 * dependency resolution, skill detail inspection, and localStorage persistence.
 */

(function () {
  'use strict';

  // State keys
  const STORAGE_KEY = 'career_roadmaps_progress';

  // Controller state
  let currentRoleId = null;
  let activeCategory = 'all';
  let searchQuery = '';
  let selectedDifficulty = 'all';
  let selectedProgress = 'all';
  let selectedSkillNode = null;

  // Global Storage abstraction fallback
  function getProgressState() {
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
   * Resolves real-time status of every node in a roadmap based on dependencies
   */
  function resolveRoadmapNodeStatuses(roleId, roadmap) {
    const state = getProgressState();
    const roleState = state[roleId] || { completed: [], inProgress: [], checklist: [] };
    const completedSet = new Set(roleState.completed || []);
    const inProgressSet = new Set(roleState.inProgress || []);

    const nodeStatusMap = {};

    // First pass: resolve completed and in-progress
    roadmap.levels.forEach(level => {
      level.skills.forEach(skill => {
        if (completedSet.has(skill.id)) {
          nodeStatusMap[skill.id] = 'completed';
        } else if (inProgressSet.has(skill.id)) {
          nodeStatusMap[skill.id] = 'in-progress';
        }
      });
    });

    // Second pass: resolve available vs locked based on prerequisites
    roadmap.levels.forEach(level => {
      level.skills.forEach(skill => {
        if (nodeStatusMap[skill.id]) return; // already completed or in-progress

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
    const allRoadmaps = (typeof window !== 'undefined' && window.careerRoadmaps)
      ? window.careerRoadmaps
      : (typeof global !== 'undefined' && global.careerRoadmaps ? global.careerRoadmaps : {});
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
    // 1. First look for any skill currently in-progress
    for (const level of roadmap.levels) {
      for (const skill of level.skills) {
        if (nodeStatusMap[skill.id] === 'in-progress') {
          return { skill, status: 'in-progress', levelName: level.name };
        }
      }
    }

    // 2. Otherwise find the first available skill in dependency order
    for (const level of roadmap.levels) {
      for (const skill of level.skills) {
        if (nodeStatusMap[skill.id] === 'available') {
          return { skill, status: 'available', levelName: level.name };
        }
      }
    }

    // 3. If all completed
    return null;
  }

  /**
   * Toggles skill node status (completed, in-progress, or available/reset)
   */
  function setSkillStatus(roleId, skillId, newStatus) {
    const state = getProgressState();
    if (!state[roleId]) {
      state[roleId] = { completed: [], inProgress: [], checklist: [] };
    }

    const completed = new Set(state[roleId].completed || []);
    const inProgress = new Set(state[roleId].inProgress || []);

    if (newStatus === 'completed') {
      completed.add(skillId);
      inProgress.delete(skillId);
    } else if (newStatus === 'in-progress') {
      inProgress.add(skillId);
      completed.delete(skillId);
    } else {
      // reset
      completed.delete(skillId);
      inProgress.delete(skillId);
    }

    state[roleId].completed = Array.from(completed);
    state[roleId].inProgress = Array.from(inProgress);

    saveProgressState(state);

    // Trigger toast notification
    if (typeof showToast === 'function') {
      const msg = newStatus === 'completed' 
        ? 'Skill marked as completed!' 
        : newStatus === 'in-progress' 
          ? 'Skill set to in-progress.' 
          : 'Skill status reset.';
      showToast(msg, newStatus === 'completed' ? 'success' : 'info');
    }

    // Re-render current view
    renderCurrentRoute();
  }

  /**
   * Toggles job-ready checklist item
   */
  function toggleChecklistItem(roleId, itemId, checked) {
    const state = getProgressState();
    if (!state[roleId]) {
      state[roleId] = { completed: [], inProgress: [], checklist: [] };
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
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const roles = window.careerRoles || [];
    const query = searchQuery.trim().toLowerCase();

    // Filter roles
    const filteredRoles = roles.filter(role => {
      // Category filter
      if (activeCategory !== 'all' && role.category !== activeCategory) {
        return false;
      }

      // Difficulty filter
      if (selectedDifficulty !== 'all' && role.difficulty.toLowerCase() !== selectedDifficulty.toLowerCase()) {
        return false;
      }

      // Progress filter
      const { percent } = calculateRoleProgress(role);
      if (selectedProgress === 'not-started' && percent > 0) return false;
      if (selectedProgress === 'in-progress' && (percent === 0 || percent === 100)) return false;
      if (selectedProgress === 'completed' && percent < 100) return false;

      // Search matching (Title, Description, Tagline, or Featured Technologies)
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
      const { percent, completed, total } = calculateRoleProgress(role);
      const diffClass = role.difficulty.toLowerCase() === 'beginner' 
        ? 'badge-diff-beginner' 
        : role.difficulty.toLowerCase() === 'advanced' 
          ? 'badge-diff-advanced' 
          : 'badge-diff-intermediate';

      return `
        <div class="role-card group" data-role-id="${role.id}">
          <div>
            <!-- Header row: Icon, Category & Difficulty -->
            <div class="flex items-start justify-between gap-3 mb-3">
              <div class="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-200">
                <span class="material-symbols-outlined text-2xl">${role.icon || 'map'}</span>
              </div>
              <span class="text-[11px] font-semibold uppercase px-2 py-0.5 rounded-md ${diffClass}">
                ${role.difficulty}
              </span>
            </div>

            <!-- Role Title & Tagline -->
            <h3 class="text-base font-bold text-slate-900 dark:text-white tracking-tight mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              ${role.title}
            </h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
              ${role.tagline || role.description}
            </p>

            <!-- Featured Tech Chips -->
            <div class="flex flex-wrap gap-1.5 mb-5">
              ${(role.featuredTech || []).slice(0, 4).map(tech => `
                <span class="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  ${tech}
                </span>
              `).join('')}
              ${(role.featuredTech || []).length > 4 ? `
                <span class="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-50 dark:bg-slate-800/60 text-slate-400">
                  +${role.featuredTech.length - 4}
                </span>
              ` : ''}
            </div>
          </div>

          <!-- Footer: Progress & Action -->
          <div class="pt-4 border-t border-slate-100 dark:border-slate-800/80">
            <div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
              <span class="font-medium">${total} Skills</span>
              <span class="font-semibold ${percent > 0 ? 'text-indigo-600 dark:text-indigo-400' : ''}">${percent}% Complete</span>
            </div>
            
            <div class="role-progress-bar-bg mb-4">
              <div class="role-progress-bar-fill" style="width: ${percent}%;"></div>
            </div>

            <a href="#role=${role.id}" class="w-full py-2 px-3 rounded-lg text-xs font-semibold text-center flex items-center justify-center gap-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 transition-all duration-200">
              <span>View Roadmap</span>
              <span class="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>
        </div>
      `;
    }).join('');
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
  // VIEW RENDERING: ROADMAP DETAIL
  // =========================================================================

  function renderRoadmapDetail(roleId) {
    const catalogContainer = document.getElementById('roadmaps-catalog-view');
    const detailContainer = document.getElementById('roadmaps-detail-view');

    if (!catalogContainer || !detailContainer) return;

    catalogContainer.classList.add('hidden');
    detailContainer.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const role = (window.careerRoles || []).find(r => r.id === roleId);
    if (!role) {
      // invalid role ID, redirect to catalog
      window.location.hash = '';
      return;
    }

    const roadmap = (window.careerRoadmaps || {})[role.roadmapId];
    if (!roadmap) {
      detailContainer.innerHTML = `
        <div class="p-8 text-center">
          <p class="text-sm text-slate-500">Roadmap content is being finalized for this role.</p>
          <a href="#" class="btn-secondary mt-4 inline-block">Back to All Roles</a>
        </div>
      `;
      return;
    }

    const nodeStatusMap = resolveRoadmapNodeStatuses(role.id, roadmap);
    const { percent, completed, total } = calculateRoleProgress(role);
    const nextSkillInfo = findNextRecommendedSkill(roadmap, nodeStatusMap);

    const state = getProgressState();
    const roleState = state[role.id] || { checklist: [] };
    const checkedItems = new Set(roleState.checklist || []);

    const diffClass = role.difficulty.toLowerCase() === 'beginner' 
      ? 'badge-diff-beginner' 
      : role.difficulty.toLowerCase() === 'advanced' 
        ? 'badge-diff-advanced' 
        : 'badge-diff-intermediate';

    detailContainer.innerHTML = `
      <!-- Detail Sticky / Top Header -->
      <div class="mb-6">
        <div class="flex items-center gap-2 mb-4">
          <a href="#" class="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors py-1.5 px-2.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">
            <span class="material-symbols-outlined text-base">arrow_back</span>
            <span>All Career Roadmaps</span>
          </a>
          <span class="text-slate-300 dark:text-slate-700">/</span>
          <span class="text-xs font-medium text-slate-600 dark:text-slate-300">${role.title}</span>
        </div>

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
              </div>

              <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                ${role.title}
              </h1>
              <p class="text-sm text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed max-w-3xl">
                ${roadmap.description || role.description}
              </p>
            </div>

            <!-- Real-time Progress Widget -->
            <div class="shrink-0 bg-slate-50 dark:bg-slate-900/60 p-5 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center gap-5 min-w-[240px]">
              <div class="relative w-16 h-16 flex items-center justify-center shrink-0">
                <svg class="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path class="text-slate-200 dark:text-slate-700" stroke-width="3.5" stroke="currentColor" fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path class="text-indigo-600 dark:text-indigo-500 transition-all duration-700" stroke-dasharray="${percent}, 100" stroke-width="3.5" stroke-linecap="round" stroke="currentColor" fill="none"
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

          <!-- Next Recommended Skill Callout -->
          ${nextSkillInfo ? `
            <div class="mt-6 pt-5 border-t border-slate-100 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-indigo-50/60 dark:bg-indigo-950/30 rounded-xl p-4 border border-indigo-100/80 dark:border-indigo-900/40">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <span class="material-symbols-outlined text-lg">play_arrow</span>
                </div>
                <div>
                  <span class="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">
                    Next Recommended Skill • Level ${nextSkillInfo.skill.levelNum} (${nextSkillInfo.levelName})
                  </span>
                  <h4 class="text-sm font-bold text-slate-900 dark:text-white">
                    ${nextSkillInfo.skill.title}
                  </h4>
                </div>
              </div>

              <button class="btn-primary text-xs py-2 px-3.5 shrink-0 self-start sm:self-auto btn-inspect-skill" data-skill-id="${nextSkillInfo.skill.id}">
                Open Skill Guide
              </button>
            </div>
          ` : `
            <div class="mt-6 pt-5 border-t border-slate-100 dark:border-slate-700/60 text-center py-2">
              <span class="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-1.5">
                <span class="material-symbols-outlined text-base">verified</span>
                You have completed all skills in this roadmap! Review your Job-Ready Checklist below.
              </span>
            </div>
          `}
        </div>
      </div>

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
                    Level ${level.levelNum} — ${level.name}
                  </h3>
                  <span class="text-xs font-semibold text-slate-400 px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
                    ${level.skills.length} ${level.skills.length === 1 ? 'Topic' : 'Topics'}
                  </span>
                </div>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  ${level.description}
                </p>
              </div>
            </div>

            <!-- Skills Node Grid for this level -->
            <div class="skills-node-grid">
              ${level.skills.map(skill => {
                const status = nodeStatusMap[skill.id] || 'available';
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
                      ? 'Locked (Prereqs required)'
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
                          ${skill.category}
                        </span>
                        
                        <div class="flex items-center gap-1.5">
                          <span class="text-[10px] font-semibold px-2 py-0.5 rounded ${importanceClass}">
                            ${skill.importance}
                          </span>
                          <div class="status-icon-badge ${status}" title="${statusLabel}">
                            <span class="material-symbols-outlined text-sm">${statusIcon}</span>
                          </div>
                        </div>
                      </div>

                      <h4 class="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-1.5">
                        ${skill.title}
                      </h4>

                      <p class="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-3">
                        ${skill.whyItMatters || skill.description || ''}
                      </p>
                    </div>

                    <!-- Card footer: Technologies & AI pill -->
                    <div class="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
                      <div class="flex items-center gap-1.5 text-[11px] text-slate-400">
                        <span class="material-symbols-outlined text-xs">schedule</span>
                        <span>${skill.estimatedTime || '1-2 weeks'}</span>
                      </div>

                      ${skill.aiRelevance ? `
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
            <span class="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block mb-1">
              Practical Milestone Projects
            </span>
            <h3 class="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Progressive Project Roadmap
            </h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Employers hire developers who build real software. Complete these milestone projects to apply roadmap skills in order.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            ${roadmap.projects.map((proj, idx) => `
              <div class="project-card flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between gap-2 mb-3">
                    <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${idx === 0 ? 'badge-diff-beginner' : idx === 1 ? 'badge-diff-intermediate' : 'badge-diff-advanced'}">
                      ${proj.type}
                    </span>
                    <span class="text-xs font-semibold text-slate-400">Project 0${idx + 1}</span>
                  </div>

                  <h4 class="text-sm font-bold text-slate-900 dark:text-white mb-2">
                    ${proj.title}
                  </h4>
                  <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                    ${proj.description}
                  </p>

                  <div class="mb-4">
                    <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Deliverables:</span>
                    <ul class="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                      ${(proj.deliverables || []).map(d => `
                        <li class="flex items-start gap-1.5">
                          <span class="material-symbols-outlined text-xs text-indigo-500 mt-0.5 shrink-0">check</span>
                          <span>${d}</span>
                        </li>
                      `).join('')}
                    </ul>
                  </div>
                </div>

                <div class="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-1">
                  ${(proj.technologies || []).map(t => `
                    <span class="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                      ${t}
                    </span>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Job Ready Checklist -->
      ${roadmap.jobReadyChecklist ? `
        <div class="mb-12 bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-6 shadow-sm">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <span class="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block mb-1">
                Final Career Verification
              </span>
              <h3 class="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Job-Ready Launch Checklist
              </h3>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Verify that your skills, projects, and developer profile are prepared before applying to positions.
              </p>
            </div>
            <div class="text-xs font-semibold text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg shrink-0 self-start sm:self-auto">
              Saves Automatically
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Technical Skills Checklist -->
            <div>
              <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <span class="material-symbols-outlined text-sm text-indigo-500">code</span>
                Technical Core Skills
              </h4>
              <div class="space-y-1">
                ${(roadmap.jobReadyChecklist.technical || []).map(item => `
                  <label class="checklist-item">
                    <input type="checkbox" class="rounded text-indigo-600 border-slate-300 dark:border-slate-600 dark:bg-slate-700 focus:ring-indigo-500 checklist-checkbox" data-item-id="${item.id}" ${checkedItems.has(item.id) ? 'checked' : ''}>
                    <span class="text-xs text-slate-700 dark:text-slate-200 leading-normal ${checkedItems.has(item.id) ? 'line-through text-slate-400 dark:text-slate-500' : ''}">${item.label}</span>
                  </label>
                `).join('')}
              </div>
            </div>

            <!-- Projects Checklist -->
            <div>
              <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <span class="material-symbols-outlined text-sm text-indigo-500">folder_special</span>
                Project Deliverables
              </h4>
              <div class="space-y-1 mb-6">
                ${(roadmap.jobReadyChecklist.projects || []).map(item => `
                  <label class="checklist-item">
                    <input type="checkbox" class="rounded text-indigo-600 border-slate-300 dark:border-slate-600 dark:bg-slate-700 focus:ring-indigo-500 checklist-checkbox" data-item-id="${item.id}" ${checkedItems.has(item.id) ? 'checked' : ''}>
                    <span class="text-xs text-slate-700 dark:text-slate-200 leading-normal ${checkedItems.has(item.id) ? 'line-through text-slate-400 dark:text-slate-500' : ''}">${item.label}</span>
                  </label>
                `).join('')}
              </div>

              <!-- CS Fundamentals & Career Tool Links -->
              <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <span class="material-symbols-outlined text-sm text-indigo-500">rocket_launch</span>
                CS Fundamentals & DevPilot Tools
              </h4>
              <div class="space-y-1">
                ${(roadmap.jobReadyChecklist.csFundamentals || []).concat(roadmap.jobReadyChecklist.career || []).map(item => `
                  <div class="checklist-item flex items-center justify-between">
                    <label class="flex items-start gap-2 cursor-pointer flex-1">
                      <input type="checkbox" class="rounded text-indigo-600 border-slate-300 dark:border-slate-600 dark:bg-slate-700 focus:ring-indigo-500 checklist-checkbox" data-item-id="${item.id}" ${checkedItems.has(item.id) ? 'checked' : ''}>
                      <span class="text-xs text-slate-700 dark:text-slate-200 ${checkedItems.has(item.id) ? 'line-through text-slate-400 dark:text-slate-500' : ''}">${item.label}</span>
                    </label>
                    ${item.link ? `
                      <a href="${item.link}" class="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline shrink-0 ml-2 inline-flex items-center gap-0.5">
                        <span>Open</span>
                        <span class="material-symbols-outlined text-xs">open_in_new</span>
                      </a>
                    ` : ''}
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      ` : ''}
    `;

    // Bind event listeners for skill cards and checklist items
    bindDetailEventListeners(role, roadmap, nodeStatusMap);
  }

  function bindDetailEventListeners(role, roadmap, nodeStatusMap) {
    // Skill card click -> Open Skill Modal
    document.querySelectorAll('.btn-inspect-skill').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const skillId = btn.getAttribute('data-skill-id');
        openSkillModal(role, roadmap, skillId, nodeStatusMap);
      });
    });

    // Checklist checkboxes
    document.querySelectorAll('.checklist-checkbox').forEach(box => {
      box.addEventListener('change', (e) => {
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
      });
    });
  }

  // =========================================================================
  // SKILL DETAIL MODAL
  // =========================================================================

  function openSkillModal(role, roadmap, skillId, nodeStatusMap) {
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
    const currentStatus = nodeStatusMap[targetSkill.id] || 'available';

    const modalBackdrop = document.getElementById('skill-detail-modal');
    if (!modalBackdrop) return;

    const modalContent = document.getElementById('skill-modal-body');
    if (!modalContent) return;

    // Prerequisite nodes lookup
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
      <div class="flex items-start justify-between gap-4 mb-4">
        <div>
          <div class="flex flex-wrap items-center gap-2 mb-1.5">
            <span class="text-xs font-semibold px-2.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/40">
              Level ${targetSkill.levelNum} • ${targetLevel ? targetLevel.name : ''}
            </span>
            <span class="text-xs font-semibold px-2 py-0.5 rounded ${importanceClass}">
              ${targetSkill.importance}
            </span>
            <span class="text-xs text-slate-400 flex items-center gap-1">
              <span class="material-symbols-outlined text-sm">schedule</span>
              ${targetSkill.estimatedTime || '1-2 weeks'}
            </span>
          </div>

          <h3 class="text-xl font-bold text-slate-900 dark:text-white">
            ${targetSkill.title}
          </h3>
          <span class="text-xs text-slate-500 dark:text-slate-400">
            Category: ${targetSkill.category}
          </span>
        </div>

        <button id="btn-close-skill-modal" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <span class="material-symbols-outlined text-xl">close</span>
        </button>
      </div>

      <!-- Current Status Banner & Action Buttons -->
      <div class="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Current Status</span>
          <span class="text-sm font-bold capitalize ${currentStatus === 'completed' ? 'text-emerald-600' : currentStatus === 'in-progress' ? 'text-blue-600' : currentStatus === 'locked' ? 'text-slate-400' : 'text-slate-700 dark:text-slate-200'}">
            ${currentStatus === 'locked' ? 'Locked (Prerequisites not yet met)' : currentStatus}
          </span>
        </div>

        <div class="flex items-center gap-2">
          ${currentStatus !== 'completed' ? `
            <button id="btn-modal-mark-completed" class="btn-primary text-xs py-2 px-3 flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 border-emerald-600">
              <span class="material-symbols-outlined text-sm">check_circle</span>
              Mark Completed
            </button>
          ` : `
            <button id="btn-modal-mark-reset" class="btn-secondary text-xs py-2 px-3 flex items-center gap-1.5">
              <span class="material-symbols-outlined text-sm">restart_alt</span>
              Reset
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

      <!-- Prerequisites -->
      <div class="mb-5">
        <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
          <span class="material-symbols-outlined text-sm">account_tree</span>
          Prerequisites
        </h4>
        ${prereqNodes.length > 0 ? `
          <div class="flex flex-wrap gap-2">
            ${prereqNodes.map(p => `
              <span class="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md border ${p.isMet ? 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/50' : 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'}">
                <span class="material-symbols-outlined text-xs ${p.isMet ? 'text-emerald-600' : 'text-slate-400'}">${p.isMet ? 'check_circle' : 'lock'}</span>
                <span>${p.title}</span>
              </span>
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
              <span>${item}</span>
            </li>
          `).join('')}
        </ul>
      </div>

      <!-- Why It Matters -->
      <div class="mb-5 bg-slate-50 dark:bg-slate-900/60 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800">
        <h4 class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
          <span class="material-symbols-outlined text-sm text-indigo-500">lightbulb</span>
          Why It Matters in Production
        </h4>
        <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          ${targetSkill.whyItMatters || 'Essential knowledge applied routinely in professional codebases.'}
        </p>
      </div>

      <!-- AI Relevance -->
      ${targetSkill.aiRelevance ? `
        <div class="mb-5 bg-fuchsia-50/70 dark:bg-fuchsia-950/30 p-3.5 rounded-xl border border-fuchsia-200/80 dark:border-fuchsia-900/50">
          <h4 class="text-xs font-bold text-fuchsia-700 dark:text-fuchsia-300 uppercase tracking-wider mb-1 flex items-center gap-1">
            <span class="material-symbols-outlined text-sm">auto_awesome</span>
            AI Relevance & Workflow
          </h4>
          <p class="text-xs text-fuchsia-900 dark:text-fuchsia-200 leading-relaxed">
            ${targetSkill.aiRelevance}
          </p>
        </div>
      ` : ''}

      <!-- Practice Task -->
      ${targetSkill.practice ? `
        <div class="mb-4">
          <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <span class="material-symbols-outlined text-sm">terminal</span>
            Hands-On Practice Task
          </h4>
          <p class="text-xs text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 p-3 rounded-lg font-mono leading-relaxed">
            ${targetSkill.practice}
          </p>
        </div>
      ` : ''}
    `;

    modalBackdrop.classList.add('active');

    // Bind modal actions
    const closeBtn = document.getElementById('btn-close-skill-modal');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeSkillModal);
    }

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

  function closeSkillModal() {
    const modalBackdrop = document.getElementById('skill-detail-modal');
    if (modalBackdrop) {
      modalBackdrop.classList.remove('active');
    }
    selectedSkillNode = null;
  }

  // =========================================================================
  // ROUTING & INITIALIZATION
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
    // 1. Search input listener
    const searchInput = document.getElementById('roadmap-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderCatalog();
      });
    }

    // 2. Category tab buttons
    document.querySelectorAll('.category-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeCategory = btn.getAttribute('data-category') || 'all';
        updateCategoryTabs();
        renderCatalog();
      });
    });

    // 3. Difficulty filter select
    const diffSelect = document.getElementById('filter-difficulty-select');
    if (diffSelect) {
      diffSelect.addEventListener('change', (e) => {
        selectedDifficulty = e.target.value;
        renderCatalog();
      });
    }

    // 4. Progress filter select
    const progSelect = document.getElementById('filter-progress-select');
    if (progSelect) {
      progSelect.addEventListener('change', (e) => {
        selectedProgress = e.target.value;
        renderCatalog();
      });
    }

    // 5. Modal backdrop click to close
    const modalBackdrop = document.getElementById('skill-detail-modal');
    if (modalBackdrop) {
      modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) {
          closeSkillModal();
        }
      });
    }

    // 6. Escape key to close modal
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeSkillModal();
      }
    });

    // 7. Listen to URL hash change
    window.addEventListener('hashchange', handleRoute);

    // Initial render
    handleRoute();
  }

  // Self-initialize on DOMContentLoaded
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initRoadmapsPage);
    } else {
      initRoadmapsPage();
    }
  }

  // Export for testing
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      resolveRoadmapNodeStatuses,
      calculateRoleProgress,
      findNextRecommendedSkill
    };
  }
})();
