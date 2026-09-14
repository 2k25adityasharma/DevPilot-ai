/**
 * DevPilot-AI - Consistency & Habit Tracker Controller
 * 
 * Central controller coordinating user-scoped authentication,
 * authoritative database persistence, mathematical streak calculations,
 * weekly momentum, 26-week heatmap, daily goals, weekly goals,
 * optimistic UI with failure rollback, and cross-tab/cloud realtime sync.
 */

(function () {
  'use strict';

  // In-Memory State for current authenticated user
  let habits = [];
  let completions = [];
  let dailyGoals = [];
  let weeklyGoals = [];

  // Temporary UI selection state
  let pendingManageHabitId = null;
  let selectedAddFrequency = 'daily';
  let selectedAddCustomDays = [1, 2, 3, 4, 5];
  let selectedEditFrequency = 'daily';
  let selectedEditCustomDays = [1, 2, 3, 4, 5];
  let selectedHeatmapDate = null;

  // DOM Elements cache
  let dom = {};

  document.addEventListener('DOMContentLoaded', async () => {
    cacheDomElements();
    bindEvents();

    // 1. Initialize Auth Session
    await AuthService.init();
    updateUserHeaderUI();

    // 2. Load User's Genuine Data
    await loadUserState();

    // 3. Listen for Realtime Events
    HabitService.onRealtimeChange(handleRealtimeSync);
    AuthService.onAuthStateChange(handleAuthChange);
  });

  function cacheDomElements() {
    dom = {
      // Header & Auth
      btnAccountSwitch: document.getElementById('btn-account-switch'),
      userAvatarBadge: document.getElementById('user-avatar-badge'),
      userNameBadge: document.getElementById('user-name-badge'),
      streakDisplay: document.getElementById('habit-streak-display'),
      todayDateBadge: document.getElementById('today-date-badge'),
      currentWeekBadge: document.getElementById('current-week-badge'),
      archivedHabitsCount: document.getElementById('archived-habits-count'),
      btnViewArchived: document.getElementById('btn-view-archived'),
      btnAddHabit: document.getElementById('btn-add-habit'),

      // Habits Checklist
      habitsListContainer: document.getElementById('habits-list-container'),
      habitsCompletedText: document.getElementById('habits-completed-text'),
      habitsPctText: document.getElementById('habits-pct-text'),
      habitsProgressBar: document.getElementById('habits-progress-bar'),

      // Daily Goals
      dailyGoalsDateBadge: document.getElementById('daily-goals-date-badge'),
      dailyGoalsCompletedText: document.getElementById('daily-goals-completed-text'),
      dailyGoalsPctText: document.getElementById('daily-goals-pct-text'),
      dailyGoalsProgressBar: document.getElementById('daily-goals-progress-bar'),
      dailyGoalsContainer: document.getElementById('daily-goals-container'),
      btnAddDailyGoal: document.getElementById('btn-add-daily-goal'),

      // Weekly Goals
      btnAddGoal: document.getElementById('btn-add-goal'),
      weeklyGoalsContainer: document.getElementById('weekly-goals-container'),

      // Weekly Momentum
      momentumComparisonChip: document.getElementById('momentum-comparison-chip'),
      momentumMessageText: document.getElementById('momentum-message-text'),
      statTotalDays: document.getElementById('stat-total-days'),
      statBestStreak: document.getElementById('stat-best-streak'),
      statCompletionPct: document.getElementById('stat-completion-pct'),

      // Heatmap
      habitHeatmapGrid: document.getElementById('habit-heatmap-grid'),
      heatmapTooltip: document.getElementById('heatmap-tooltip'),
      heatmapDayHistory: document.getElementById('heatmap-day-history'),

      // Insights
      habitInsightsContainer: document.getElementById('habit-insights-container'),

      // Modal 1: Add Habit
      modalAddHabit: document.getElementById('modal-add-habit'),
      formAddHabit: document.getElementById('form-add-habit'),
      habitTitleInput: document.getElementById('habit-title-input'),
      habitDescInput: document.getElementById('habit-desc-input'),
      habitCategoryInput: document.getElementById('habit-category-input'),
      habitCategoryChips: document.getElementById('habit-category-chips'),
      habitFreqButtons: document.querySelectorAll('#modal-add-habit .freq-chip'),
      habitCustomDaysRow: document.getElementById('habit-custom-days-row'),
      habitReminderInput: document.getElementById('habit-reminder-input'),
      btnCloseAddHabit: document.getElementById('btn-close-add-habit'),
      btnCancelAddHabit: document.getElementById('btn-cancel-add-habit'),

      // Modal 2: Edit Habit
      modalEditHabit: document.getElementById('modal-edit-habit'),
      formEditHabit: document.getElementById('form-edit-habit'),
      editHabitId: document.getElementById('edit-habit-id'),
      editHabitTitleInput: document.getElementById('edit-habit-title-input'),
      editHabitCategoryInput: document.getElementById('edit-habit-category-input'),
      editHabitFreqButtons: document.querySelectorAll('.edit-freq-chip'),
      editHabitCustomDaysRow: document.getElementById('edit-habit-custom-days-row'),
      editHabitReminderInput: document.getElementById('edit-habit-reminder-input'),
      btnCloseEditHabit: document.getElementById('btn-close-edit-habit'),
      btnCancelEditHabit: document.getElementById('btn-cancel-edit-habit'),

      // Modal 3: Add Daily Goal
      modalAddDailyGoal: document.getElementById('modal-add-daily-goal'),
      formAddDailyGoal: document.getElementById('form-add-daily-goal'),
      dailyGoalTitleInput: document.getElementById('daily-goal-title-input'),
      dailyGoalTargetInput: document.getElementById('daily-goal-target-input'),
      dailyGoalCategoryInput: document.getElementById('daily-goal-category-input'),
      btnCloseAddDailyGoal: document.getElementById('btn-close-add-daily-goal'),
      btnCancelAddDailyGoal: document.getElementById('btn-cancel-add-daily-goal'),

      // Modal 4: Add Weekly Goal
      modalAddGoal: document.getElementById('modal-add-goal'),
      formAddGoal: document.getElementById('form-add-goal'),
      goalTitleInput: document.getElementById('goal-title-input'),
      goalHabitSelect: document.getElementById('goal-habit-select'),
      goalTargetInput: document.getElementById('goal-target-input'),
      btnCloseAddGoal: document.getElementById('btn-close-add-goal'),
      btnCancelAddGoal: document.getElementById('btn-cancel-add-goal'),

      // Modal 5: Manage / Deactivate / Delete Habit
      modalConfirmDelete: document.getElementById('modal-confirm-delete'),
      deleteHabitTitle: document.getElementById('delete-habit-title'),
      btnActionEditHabit: document.getElementById('btn-action-edit-habit'),
      btnConfirmDeactivate: document.getElementById('btn-confirm-deactivate'),
      btnConfirmDeletePermanent: document.getElementById('btn-confirm-delete-permanent'),
      btnCancelDelete: document.getElementById('btn-cancel-delete'),

      // Modal 6: Inactive / Archived Habits
      modalInactiveHabits: document.getElementById('modal-inactive-habits'),
      inactiveHabitsList: document.getElementById('inactive-habits-list'),
      btnCloseInactiveModal: document.getElementById('btn-close-inactive-modal'),
      btnDismissInactive: document.getElementById('btn-dismiss-inactive'),

      // Modal 7: Auth Account Switcher
      modalAuthAccount: document.getElementById('modal-auth-account'),
      btnCloseAuthModal: document.getElementById('btn-close-auth-modal'),
      btnDismissAuth: document.getElementById('btn-dismiss-auth'),
      activeUserFullname: document.getElementById('active-user-fullname'),
      activeUserEmail: document.getElementById('active-user-email'),
      knownAccountsList: document.getElementById('known-accounts-list'),
      formAuthLogin: document.getElementById('form-auth-login'),
      authEmailInput: document.getElementById('auth-email-input'),
      authFullnameInput: document.getElementById('auth-fullname-input'),
      btnAuthSignout: document.getElementById('btn-auth-signout')
    };
  }

  // ==========================================================================
  // 1. DATA FETCHING & USER ISOLATION
  // ==========================================================================

  /**
   * Loads all records scoped to the active authenticated user.
   */
  async function loadUserState() {
    const todayStr = HabitsData.getTodayStr();
    const weekKey = HabitsData.getWeekId(todayStr);

    try {
      // Parallel fetch for speed
      const [fetchedHabits, fetchedCompletions, fetchedDailyGoals, fetchedWeeklyGoals] = await Promise.all([
        HabitService.getHabits(),
        HabitService.getCompletions(),
        HabitService.getDailyGoals(todayStr),
        HabitService.getWeeklyGoals(weekKey)
      ]);

      habits = fetchedHabits;
      completions = fetchedCompletions;
      dailyGoals = fetchedDailyGoals;
      weeklyGoals = fetchedWeeklyGoals;

      renderAll();
    } catch (err) {
      console.error('Error loading user habit state:', err);
      showToast('Error loading your habit data. Please try again.', 'error');
    }
  }

  function updateUserHeaderUI() {
    const user = AuthService.getCurrentUser();
    if (!user) return;

    if (dom.userAvatarBadge) dom.userAvatarBadge.textContent = user.avatar || user.fullName.charAt(0);
    if (dom.userNameBadge) dom.userNameBadge.textContent = user.fullName || user.email.split('@')[0];
    if (dom.activeUserFullname) dom.activeUserFullname.textContent = user.fullName;
    if (dom.activeUserEmail) dom.activeUserEmail.textContent = user.email;
  }

  /**
   * Realtime event listener: updates in-memory records and re-renders dynamically.
   */
  async function handleRealtimeSync(type, payload) {
    const todayStr = HabitsData.getTodayStr();
    const weekKey = HabitsData.getWeekId(todayStr);

    // Refresh affected collections
    if (type.startsWith('HABIT_')) {
      habits = await HabitService.getHabits();
    } else if (type === 'COMPLETION_CHANGED') {
      completions = await HabitService.getCompletions();
    } else if (type === 'DAILY_GOAL_CHANGED') {
      dailyGoals = await HabitService.getDailyGoals(todayStr);
    } else if (type === 'WEEKLY_GOAL_CHANGED') {
      weeklyGoals = await HabitService.getWeeklyGoals(weekKey);
    } else {
      // STORAGE_SYNC or general refresh
      await loadUserState();
      return;
    }

    renderAll();
  }

  /**
   * User switch / logout: wipe in-memory cache and re-fetch.
   */
  async function handleAuthChange(event, user) {
    habits = [];
    completions = [];
    dailyGoals = [];
    weeklyGoals = [];

    updateUserHeaderUI();
    showToast(`Session: ${user ? user.fullName : 'Guest'}`, 'info');
    await loadUserState();
  }

  // ==========================================================================
  // 2. RENDERING PIPELINE
  // ==========================================================================

  function renderAll() {
    const todayStr = HabitsData.getTodayStr();
    const todayDate = HabitsData.parseDate(todayStr);

    if (dom.todayDateBadge) {
      dom.todayDateBadge.textContent = todayDate.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });
    }

    if (dom.dailyGoalsDateBadge) {
      dom.dailyGoalsDateBadge.textContent = todayDate.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });
    }

    if (dom.currentWeekBadge) {
      dom.currentWeekBadge.textContent = HabitsData.getWeekId(todayStr);
    }

    renderStreakHeader();
    renderTodayProgress();
    renderHabitsList();
    renderDailyGoals();
    renderWeeklyGoals();
    renderWeeklyMomentum();
    renderHeatmap();
    renderHabitInsights();
    renderArchivedCount();
  }

  /**
   * Streak Header Badge
   */
  function renderStreakHeader() {
    if (!dom.streakDisplay) return;
    const overall = HabitsData.calculateOverallStreak(habits, completions);
    dom.streakDisplay.textContent = overall.milestoneText;

    if (overall.isAtRisk && overall.currentStreak > 0) {
      dom.streakDisplay.parentElement.className = 'flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-900 px-3.5 py-1.5 rounded-xl shadow-sm';
    } else {
      dom.streakDisplay.parentElement.className = 'flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-900 px-3.5 py-1.5 rounded-xl shadow-sm';
    }
  }

  /**
   * Habits Checklist Completion Progress
   */
  function renderTodayProgress() {
    const progress = HabitsData.calculateTodayProgress(habits, completions);

    if (dom.habitsCompletedText) dom.habitsCompletedText.textContent = progress.text;
    if (dom.habitsPctText) dom.habitsPctText.textContent = `${progress.pct}%`;
    if (dom.habitsProgressBar) dom.habitsProgressBar.style.width = `${progress.pct}%`;
  }

  /**
   * Habits Checklist Items
   */
  function renderHabitsList() {
    if (!dom.habitsListContainer) return;

    const todayStr = HabitsData.getTodayStr();
    const activeHabits = habits.filter(h => h.active !== false);

    if (activeHabits.length === 0) {
      dom.habitsListContainer.innerHTML = `
        <div class="text-center py-10 px-4 bg-slate-50/70 border border-dashed border-slate-200 rounded-xl">
          <span class="material-symbols-outlined text-4xl text-slate-300 mb-2">task_alt</span>
          <p class="font-bold text-sm text-slate-700">No active habits yet</p>
          <p class="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Click "+ Add Habit" to create your first trackable daily habit.
          </p>
          <button class="btn-primary text-xs py-2 px-4 mt-4 inline-flex items-center gap-1.5" onclick="window.openAddHabitModal()">
            <span class="material-symbols-outlined text-[16px]">add</span>
            <span>Add Your First Habit</span>
          </button>
        </div>
      `;
      return;
    }

    dom.habitsListContainer.innerHTML = activeHabits.map(habit => {
      const stats = HabitsData.calculateHabitStreak(habit, todayStr, completions);
      const isCompleted = stats.isCompletedToday;
      const isScheduled = stats.isScheduledToday;

      let frequencyBadge = '';
      const freq = habit.target_frequency || habit.targetFrequency || 'daily';
      if (freq === 'weekdays') {
        frequencyBadge = '<span class="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">Weekdays</span>';
      } else if (freq === 'custom') {
        frequencyBadge = '<span class="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">Custom</span>';
      }

      let reminderBadge = '';
      const reminder = habit.reminder_time || habit.reminderTime;
      if (reminder) {
        reminderBadge = `
          <span class="text-[11px] text-slate-400 flex items-center gap-0.5">
            <span class="material-symbols-outlined text-[13px]">alarm</span>
            ${escapeHtml(reminder)}
          </span>
        `;
      }

      let streakBadge = '';
      if (stats.currentStreak > 0) {
        streakBadge = `
          <span class="text-xs ${stats.isAtRisk ? 'text-amber-700 font-bold' : 'text-amber-600 font-semibold'} flex items-center gap-0.5">
            <span class="material-symbols-outlined text-[14px]" style='font-variation-settings: "FILL" 1;'>local_fire_department</span>
            ${stats.currentStreak}d streak
          </span>
        `;
      } else {
        streakBadge = `<span class="text-xs text-slate-400">0d streak</span>`;
      }

      let atRiskChip = '';
      if (stats.isAtRisk) {
        atRiskChip = `
          <span class="at-risk-badge" title="Complete today to maintain your streak!">
            <span class="material-symbols-outlined text-[12px]">timer</span>
            At risk today
          </span>
        `;
      }

      const restDayNotice = !isScheduled
        ? `<span class="text-[11px] font-medium text-slate-400 italic">(Rest day)</span>`
        : '';

      return `
        <div class="habit-item ${isCompleted ? 'is-completed' : ''}" data-id="${habit.id}">
          <div class="flex items-center gap-3 flex-1 min-w-0">
            <input 
              type="checkbox" 
              class="habit-checkbox" 
              id="chk-${habit.id}" 
              ${isCompleted ? 'checked' : ''} 
              onchange="window.toggleHabit('${habit.id}')"
              aria-label="Mark ${escapeHtml(habit.title)} completed"
            />
            <label for="chk-${habit.id}" class="cursor-pointer select-none flex-1 min-w-0">
              <div class="flex items-center gap-2 flex-wrap">
                <p class="habit-title font-semibold text-sm truncate text-slate-800">${escapeHtml(habit.title)}</p>
                ${restDayNotice}
                ${atRiskChip}
              </div>
              <div class="flex items-center gap-2 mt-1 flex-wrap">
                <span class="category-pill">${escapeHtml(habit.category || 'General')}</span>
                ${frequencyBadge}
                ${reminderBadge}
                <span class="text-slate-300">•</span>
                ${streakBadge}
                <span class="text-slate-300">•</span>
                <span class="text-[11px] text-slate-400">Best: ${stats.bestStreak}d</span>
              </div>
            </label>
          </div>
          <button 
            class="text-slate-400 hover:text-indigo-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors flex items-center justify-center shrink-0" 
            title="Manage Habit" 
            onclick="window.promptManageHabit('${habit.id}')"
            aria-label="Manage habit"
          >
            <span class="material-symbols-outlined text-[18px]">more_vert</span>
          </button>
        </div>
      `;
    }).join('');
  }

  /**
   * Daily Goals Section (Separate feature with numeric progress)
   */
  function renderDailyGoals() {
    if (!dom.dailyGoalsContainer) return;

    const summary = HabitsData.calculateDailyGoalsSummary(dailyGoals);

    if (dom.dailyGoalsCompletedText) dom.dailyGoalsCompletedText.textContent = summary.text;
    if (dom.dailyGoalsPctText) dom.dailyGoalsPctText.textContent = `${summary.pct}%`;
    if (dom.dailyGoalsProgressBar) dom.dailyGoalsProgressBar.style.width = `${summary.pct}%`;

    if (dailyGoals.length === 0) {
      dom.dailyGoalsContainer.innerHTML = `
        <div class="text-center py-6 px-4 bg-slate-50 border border-dashed border-slate-200 rounded-xl">
          <p class="text-xs text-slate-500 font-medium">No daily goals set for today.</p>
          <p class="text-[11px] text-slate-400 mt-0.5">Set quantitative targets like "3 DSA Questions" or "2 LeetCode Mediums".</p>
          <button class="text-xs font-semibold text-amber-600 hover:text-amber-700 mt-2 inline-flex items-center gap-1" onclick="window.openAddDailyGoalModal()">
            <span class="material-symbols-outlined text-[14px]">add</span>
            <span>Add Today's Goal</span>
          </button>
        </div>
      `;
      return;
    }

    dom.dailyGoalsContainer.innerHTML = dailyGoals.map(goal => {
      const isCompleted = goal.completed || goal.progress >= goal.target;
      const pct = Math.min(100, Math.round(((goal.progress || 0) / (goal.target || 1)) * 100));

      return `
        <div class="daily-goal-item ${isCompleted ? 'is-completed' : ''}" data-id="${goal.id}">
          <div class="flex items-center justify-between gap-2 mb-2">
            <div class="flex items-center gap-2 min-w-0">
              <button 
                class="w-5 h-5 rounded flex items-center justify-center text-xs transition-colors shrink-0 ${isCompleted ? 'bg-emerald-600 text-white' : 'border border-slate-300 text-slate-400 hover:border-emerald-600 hover:text-emerald-600'}"
                onclick="window.toggleDailyGoalComplete('${goal.id}')"
                title="${isCompleted ? 'Mark Incomplete' : 'Mark Complete'}"
              >
                <span class="material-symbols-outlined text-[14px]">check</span>
              </button>
              <div class="min-w-0">
                <p class="daily-goal-title font-semibold text-sm truncate text-slate-800">${escapeHtml(goal.title)}</p>
                <div class="flex items-center gap-2 text-[11px] text-slate-400">
                  <span class="category-pill text-[10px] py-0">${escapeHtml(goal.category || 'General')}</span>
                  <span>Target: ${goal.target}</span>
                </div>
              </div>
            </div>

            <!-- Numeric Counter & Controls -->
            <div class="flex items-center gap-1.5 shrink-0">
              <button 
                class="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold transition-colors disabled:opacity-40" 
                onclick="window.adjustDailyGoal('${goal.id}', -1)"
                ${goal.progress <= 0 ? 'disabled' : ''}
                title="Decrement Progress"
              >
                -
              </button>
              <span class="font-bold text-xs px-2 py-0.5 rounded bg-slate-50 border border-slate-200 min-w-[40px] text-center ${isCompleted ? 'text-emerald-700 font-extrabold' : 'text-slate-800'}">
                ${goal.progress || 0} / ${goal.target}
              </span>
              <button 
                class="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold transition-colors" 
                onclick="window.adjustDailyGoal('${goal.id}', 1)"
                title="Increment Progress"
              >
                +
              </button>
              <button 
                class="text-slate-300 hover:text-rose-600 p-1 rounded transition-colors ml-1" 
                title="Delete Goal" 
                onclick="window.deleteDailyGoal('${goal.id}')"
              >
                <span class="material-symbols-outlined text-[15px]">delete</span>
              </button>
            </div>
          </div>

          <!-- Progress Mini Bar -->
          <div class="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div class="h-full rounded-full transition-all duration-300 ${isCompleted ? 'bg-emerald-500' : 'bg-amber-500'}" style="width: ${pct}%;"></div>
          </div>
        </div>
      `;
    }).join('');
  }

  /**
   * Weekly Goals Section
   */
  function renderWeeklyGoals() {
    if (!dom.weeklyGoalsContainer) return;

    if (weeklyGoals.length === 0) {
      dom.weeklyGoalsContainer.innerHTML = `
        <div class="text-center py-6 px-4 bg-slate-50 border border-dashed border-slate-200 rounded-xl">
          <p class="text-xs text-slate-500 font-medium">No weekly goals set for this calendar week.</p>
          <button class="text-xs font-semibold text-indigo-600 hover:text-indigo-800 mt-2 inline-flex items-center gap-1" onclick="window.openAddGoalModal()">
            <span class="material-symbols-outlined text-[14px]">add</span>
            <span>+ Set a Weekly Goal</span>
          </button>
        </div>
      `;
      return;
    }

    dom.weeklyGoalsContainer.innerHTML = weeklyGoals.map((goal) => {
      const progress = HabitsData.calculateWeeklyGoalProgress(goal, habits, completions);
      const isCompleted = progress.isCompleted;

      return `
        <div class="goal-card ${isCompleted ? 'is-completed' : ''}">
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-lg ${isCompleted ? 'text-emerald-600' : 'text-indigo-600'}">
                ${isCompleted ? 'check_circle' : 'flag'}
              </span>
              <p class="font-semibold text-sm text-slate-800">${escapeHtml(goal.title)}</p>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold ${isCompleted ? 'text-emerald-700' : 'text-slate-600'}">
                ${progress.current} / ${progress.target}
              </span>
              <button 
                class="text-slate-300 hover:text-rose-600 p-1 rounded transition-colors" 
                title="Remove Goal" 
                onclick="window.removeWeeklyGoal('${goal.id}')"
              >
                <span class="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
          </div>

          <div class="w-full bg-slate-100 rounded-full h-2 overflow-hidden mb-1.5">
            <div 
              class="h-full rounded-full transition-all duration-300 ${isCompleted ? 'bg-emerald-500' : 'bg-indigo-600'}" 
              style="width: ${progress.pct}%;"
            ></div>
          </div>

          <div class="flex items-center justify-between text-[11px] text-slate-400">
            <span>${progress.pct}% completed</span>
            ${isCompleted ? '<span class="font-bold text-emerald-600 flex items-center gap-0.5"><span class="material-symbols-outlined text-[13px]">celebration</span> Target reached!</span>' : '<span>In progress</span>'}
          </div>
        </div>
      `;
    }).join('');
  }

  /**
   * Weekly Momentum Card (truthful copy & zero-division safety)
   */
  function renderWeeklyMomentum() {
    const momentum = HabitsData.calculateWeeklyMomentum(habits, completions);

    if (dom.momentumComparisonChip) {
      dom.momentumComparisonChip.textContent = momentum.diffText;
      if (momentum.diffPct > 0) {
        dom.momentumComparisonChip.className = 'text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200';
      } else if (momentum.diffPct < 0) {
        dom.momentumComparisonChip.className = 'text-xs font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200';
      } else {
        dom.momentumComparisonChip.className = 'text-xs font-bold px-2 py-0.5 rounded-full bg-slate-50 text-slate-700 border border-slate-200';
      }
    }

    if (dom.momentumMessageText) dom.momentumMessageText.textContent = momentum.message;
    if (dom.statTotalDays) dom.statTotalDays.textContent = momentum.totalDays;
    if (dom.statBestStreak) dom.statBestStreak.textContent = `${momentum.bestStreak}d`;
    if (dom.statCompletionPct) dom.statCompletionPct.textContent = `${momentum.overallCompletionPct}%`;
  }

  /**
   * 6-Month Heatmap Matrix
   */
  /**
   * 6-Month Heatmap Matrix
   */
  function renderHeatmap() {
    if (!dom.habitHeatmapGrid) return;

    const weeks = HabitsData.calculateHeatmapMatrix(habits, completions, 26, HabitsData.getTodayStr(), dailyGoals);
    if (!weeks || weeks.length === 0) return;

    // Default selected date to today if not yet chosen
    const todayStr = HabitsData.getTodayStr();
    if (!selectedHeatmapDate) {
      selectedHeatmapDate = todayStr;
    }

    // Mathematically anchor month labels to the exact week columns where each month starts
    const monthSpans = [];
    let currentMonth = -1;

    weeks.forEach((week, wIdx) => {
      for (let d = 0; d < week.length; d++) {
        const dObj = HabitsData.parseDate(week[d].date);
        const m = dObj.getMonth();
        if (m !== currentMonth) {
          currentMonth = m;
          const prev = monthSpans[monthSpans.length - 1];
          if (!prev || (wIdx - prev.colIndex >= 2)) {
            monthSpans.push({
              name: dObj.toLocaleDateString('en-US', { month: 'short' }),
              colIndex: wIdx
            });
          }
          break;
        }
      }
    });

    for (let i = 0; i < monthSpans.length; i++) {
      const startCol = monthSpans[i].colIndex;
      const endCol = (i + 1 < monthSpans.length) ? monthSpans[i + 1].colIndex : weeks.length;
      monthSpans[i].span = Math.max(1, endCol - startCol);
    }

    const monthHeadersHtml = `
      <div class="heatmap-months-row">
        ${monthSpans.map(m => `
          <span 
            class="heatmap-month-label" 
            style="grid-column: ${m.colIndex + 1} / span ${m.span};"
          >${m.name}</span>
        `).join('')}
      </div>
    `;

    const dayLabelsHtml = `
      <div class="heatmap-days-col">
        <span style="grid-row: 1;">Sun</span>
        <span style="grid-row: 3;">Tue</span>
        <span style="grid-row: 5;">Thu</span>
        <span style="grid-row: 7;">Sat</span>
      </div>
    `;

    const columnsHtml = weeks.map(week => {
      const cellsHtml = week.map(day => {
        const isSelected = (day.date === selectedHeatmapDate);
        return `
          <div 
            class="heatmap-cell ${day.levelClass} ${day.isToday ? 'is-today' : ''} ${isSelected ? 'is-selected' : ''} ${day.isFuture ? 'is-future' : ''}" 
            data-date="${day.date}"
            data-formatted="${day.formattedDate}"
            data-count="${day.count}"
            data-goals="${day.goalsCompletedCount || 0}"
            data-habits="${encodeURIComponent(JSON.stringify(day.completedHabits || []))}"
            role="button"
            tabindex="0"
            aria-label="${day.formattedDate}: ${day.count} habits completed"
          ></div>
        `;
      }).join('');

      return `<div class="heatmap-col">${cellsHtml}</div>`;
    }).join('');

    dom.habitHeatmapGrid.innerHTML = `
      ${monthHeadersHtml}
      <div class="heatmap-body">
        ${dayLabelsHtml}
        <div class="heatmap-grid-container">
          ${columnsHtml}
        </div>
      </div>
    `;

    attachHeatmapTooltips();
    renderDayHistory(selectedHeatmapDate);
  }

  function attachHeatmapTooltips() {
    const tooltip = dom.heatmapTooltip;
    if (!tooltip) return;

    const cells = dom.habitHeatmapGrid.querySelectorAll('.heatmap-cell');
    cells.forEach(cell => {
      // Cell Click: Select this day and show history in bullets
      cell.addEventListener('click', () => {
        const cellDate = cell.getAttribute('data-date');
        if (!cellDate) return;
        selectedHeatmapDate = cellDate;

        cells.forEach(c => c.classList.remove('is-selected'));
        cell.classList.add('is-selected');

        renderDayHistory(selectedHeatmapDate);
      });

      // Cell Hover: Smart floating tooltip with boundary clamping
      cell.addEventListener('mouseenter', () => {
        const dateStr = cell.getAttribute('data-formatted');
        const count = parseInt(cell.getAttribute('data-count'), 10) || 0;
        const goalsCount = parseInt(cell.getAttribute('data-goals'), 10) || 0;
        let habitsList = [];
        try {
          habitsList = JSON.parse(decodeURIComponent(cell.getAttribute('data-habits') || '[]'));
        } catch (err) {}

        let content = `<div class="font-semibold text-slate-100">${dateStr}</div><div class="text-[11px] text-slate-300 mt-0.5">${count} habit${count === 1 ? '' : 's'} completed</div>`;
        if (goalsCount > 0) {
          content += `<div class="text-[11px] text-indigo-300">${goalsCount} daily goal${goalsCount === 1 ? '' : 's'} completed</div>`;
        }
        if (habitsList.length > 0) {
          content += `<div class="mt-1.5 pt-1 border-t border-slate-700/80 text-[10px] text-slate-300 space-y-0.5">
            ${habitsList.slice(0, 3).map(h => '<div>✓ ' + escapeHtml(h) + '</div>').join('')}
            ${habitsList.length > 3 ? `<div class="text-slate-400 italic">+${habitsList.length - 3} more</div>` : ''}
          </div>`;
        }
        content += `<div class="mt-1 text-[9px] text-indigo-300/80 font-medium">Click to inspect day history</div>`;

        tooltip.innerHTML = content;
        tooltip.classList.add('visible');

        const rect = cell.getBoundingClientRect();
        const parentRect = dom.habitHeatmapGrid.getBoundingClientRect();

        let left = rect.left + (rect.width / 2) - parentRect.left + dom.habitHeatmapGrid.parentElement.scrollLeft;
        let top = rect.top - parentRect.top - 8;

        // Smart edge collision avoidance: flip below if close to the card top
        if (top < 40) {
          top = rect.bottom - parentRect.top + 8;
          tooltip.classList.add('flip-below');
          tooltip.style.transform = 'translate(-50%, 0)';
        } else {
          tooltip.classList.remove('flip-below');
          tooltip.style.transform = 'translate(-50%, -100%)';
        }

        // Horizontal boundary clamping
        const tooltipWidth = tooltip.offsetWidth || 150;
        const minLeft = (tooltipWidth / 2) + 6;
        const maxLeft = parentRect.width - (tooltipWidth / 2) - 6;
        if (left < minLeft) left = minLeft;
        else if (left > maxLeft && maxLeft > minLeft) left = maxLeft;

        tooltip.style.left = `${left}px`;
        tooltip.style.top = `${top}px`;
      });

      cell.addEventListener('mouseleave', () => {
        tooltip.classList.remove('visible');
      });
    });
  }

  /**
   * Interactive Day Activity History Breakdown (underneath heatmap)
   */
  function renderDayHistory(dateStr) {
    if (!dom.heatmapDayHistory) return;

    const targetDate = dateStr || HabitsData.getTodayStr();
    const todayStr = HabitsData.getTodayStr();
    const isToday = (targetDate === todayStr);
    const isFuture = HabitsData.diffDays(targetDate, todayStr) > 0;

    const targetDateObj = HabitsData.parseDate(targetDate);
    const formattedDate = targetDateObj.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    const isYesterday = (HabitsData.diffDays(todayStr, targetDate) === 1);
    const dayTag = isToday ? 'Today' : (isYesterday ? 'Yesterday' : '');

    // 1. Determine habit completions for this day
    const { byDate } = HabitsData.buildCompletionMaps(habits, completions);
    const completedHabitIds = byDate[targetDate] || new Set();

    // Completed habits
    const completedList = habits.filter(h => completedHabitIds.has(h.id));

    // Missed/Pending habits (active habits scheduled for this day but not completed)
    const missedList = isFuture ? [] : habits.filter(h => {
      if (h.active === false) return false;
      if (completedHabitIds.has(h.id)) return false;
      return HabitsData.isHabitScheduledOn(h, targetDate);
    });

    // Daily goals for this date
    const goalsForDate = (dailyGoals || []).filter(g => g.date === targetDate);

    // Stats
    const totalScheduled = completedList.length + missedList.length;
    const completedCount = completedList.length;
    const pct = totalScheduled > 0 ? Math.round((completedCount / totalScheduled) * 100) : 0;

    let badgeClass = 'bg-slate-100 text-slate-600 border border-slate-200';
    let badgeText = `${completedCount} of ${totalScheduled} completed (${pct}%)`;

    if (totalScheduled > 0 && completedCount === totalScheduled) {
      badgeClass = 'bg-emerald-50 text-emerald-700 border border-emerald-200';
      badgeText = `All completed! 🎉 (100%)`;
    } else if (completedCount > 0) {
      badgeClass = 'bg-indigo-50 text-indigo-700 border border-indigo-200';
    } else if (isFuture) {
      badgeClass = 'bg-slate-50 text-slate-400 border border-slate-200';
      badgeText = 'Upcoming';
    }

    let listContent = '';

    if (isFuture) {
      listContent = `
        <div class="py-2.5 px-3 rounded-lg bg-slate-50/70 border border-dashed border-slate-200 text-center">
          <p class="text-xs text-slate-400 italic">Future date — habit tracking has not occurred yet.</p>
        </div>
      `;
    } else if (completedList.length === 0 && missedList.length === 0 && goalsForDate.length === 0) {
      listContent = `
        <div class="py-3 px-3 rounded-lg bg-slate-50/70 border border-dashed border-slate-200 text-center">
          <p class="text-xs text-slate-500 font-medium">No habits were scheduled or completed on this date.</p>
          <p class="text-[11px] text-slate-400 mt-0.5">Click any other square in the heatmap above to inspect consistency history.</p>
        </div>
      `;
    } else {
      const itemsHtml = [];

      // Completed habits (Green checkmark bullet)
      completedList.forEach(h => {
        itemsHtml.push(`
          <div class="heatmap-history-item flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-emerald-50/60 border border-emerald-100 text-xs">
            <div class="flex items-center gap-2 min-w-0">
              <span class="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold shrink-0">✓</span>
              <span class="font-medium text-slate-800 truncate">${escapeHtml(h.title)}</span>
            </div>
            <div class="flex items-center gap-1.5 shrink-0">
              <span class="text-[10px] text-slate-500 bg-white/90 px-1.5 py-0.5 rounded border border-slate-100 font-medium">${escapeHtml(h.category || 'General')}</span>
              <span class="text-[10px] font-semibold text-emerald-700 bg-emerald-100/90 px-1.5 py-0.5 rounded">Completed</span>
            </div>
          </div>
        `);
      });

      // Missed or pending habits (Neutral/amber bullet)
      missedList.forEach(h => {
        const isPending = isToday;
        itemsHtml.push(`
          <div class="heatmap-history-item flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-slate-50/80 border border-slate-200/70 text-xs">
            <div class="flex items-center gap-2 min-w-0">
              <span class="w-4 h-4 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-[11px] shrink-0">○</span>
              <span class="${isPending ? 'font-medium text-slate-700' : 'text-slate-500'} truncate">${escapeHtml(h.title)}</span>
            </div>
            <div class="flex items-center gap-1.5 shrink-0">
              <span class="text-[10px] text-slate-400 bg-white px-1.5 py-0.5 rounded border border-slate-100 font-medium">${escapeHtml(h.category || 'General')}</span>
              <span class="text-[10px] font-medium ${isPending ? 'text-amber-700 bg-amber-50 border border-amber-200' : 'text-slate-500 bg-slate-100'} px-1.5 py-0.5 rounded">
                ${isPending ? 'Pending' : 'Missed'}
              </span>
            </div>
          </div>
        `);
      });

      // Daily goals for this day
      goalsForDate.forEach(g => {
        itemsHtml.push(`
          <div class="heatmap-history-item flex items-center justify-between py-1.5 px-2.5 rounded-lg ${g.completed ? 'bg-indigo-50/60 border border-indigo-100' : 'bg-slate-50/80 border border-slate-200/70'} text-xs">
            <div class="flex items-center gap-2 min-w-0">
              <span class="w-4 h-4 rounded-full ${g.completed ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-200 text-slate-500'} flex items-center justify-center text-[10px] font-bold shrink-0">🎯</span>
              <span class="font-medium ${g.completed ? 'text-indigo-950' : 'text-slate-700'} truncate">${escapeHtml(g.title)}</span>
            </div>
            <div class="flex items-center gap-1.5 shrink-0">
              <span class="text-[10px] font-semibold ${g.completed ? 'text-indigo-700 bg-indigo-100' : 'text-slate-500 bg-slate-100'} px-1.5 py-0.5 rounded">
                ${g.completed ? 'Goal Achieved' : 'In Progress'}
              </span>
            </div>
          </div>
        `);
      });

      listContent = `
        <div class="space-y-1.5 max-h-52 overflow-y-auto pr-0.5 custom-scrollbar">
          ${itemsHtml.join('')}
        </div>
      `;
    }

    dom.heatmapDayHistory.innerHTML = `
      <div class="flex items-center justify-between mb-2.5 flex-wrap gap-2">
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-indigo-600 text-base">event_available</span>
          <span class="text-xs font-bold text-slate-800">${formattedDate}</span>
          ${dayTag ? `<span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">${dayTag}</span>` : ''}
        </div>
        <span class="text-[11px] font-semibold px-2 py-0.5 rounded-full ${badgeClass}">
          ${badgeText}
        </span>
      </div>
      ${listContent}
    `;
  }

  /**
   * Habit Insights Card
   */
  function renderHabitInsights() {
    if (!dom.habitInsightsContainer) return;

    const insights = HabitsData.calculateHabitInsights(habits, completions);

    const mostConsistentTitle = insights.mostConsistent
      ? `${escapeHtml(insights.mostConsistent.title)}`
      : 'No data yet';
    const mostConsistentRate = insights.mostConsistent
      ? `${insights.mostConsistent.rate}%`
      : '—';

    const needsAttentionTitle = insights.needsAttention
      ? `${escapeHtml(insights.needsAttention.title)}`
      : (habits.length > 0 ? 'All habits consistent' : 'No data yet');
    const needsAttentionRate = insights.needsAttention
      ? `${insights.needsAttention.rate}%`
      : '—';

    dom.habitInsightsContainer.innerHTML = `
      <div class="insight-metric-card">
        <p class="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider flex items-center gap-1">
          <span class="material-symbols-outlined text-[15px]">verified</span>
          Most Consistent
        </p>
        <p class="text-sm font-bold text-slate-800 mt-1 truncate" title="${mostConsistentTitle}">${mostConsistentTitle}</p>
        <p class="text-xs text-emerald-600 font-semibold mt-0.5">${mostConsistentRate} completion</p>
      </div>

      <div class="insight-metric-card">
        <p class="text-[11px] font-semibold text-amber-700 uppercase tracking-wider flex items-center gap-1">
          <span class="material-symbols-outlined text-[15px]">priority_high</span>
          Needs Attention
        </p>
        <p class="text-sm font-bold text-slate-800 mt-1 truncate" title="${needsAttentionTitle}">${needsAttentionTitle}</p>
        <p class="text-xs text-amber-600 font-semibold mt-0.5">${needsAttentionRate} completion</p>
      </div>

      <div class="insight-metric-card">
        <p class="text-[11px] font-semibold text-indigo-700 uppercase tracking-wider flex items-center gap-1">
          <span class="material-symbols-outlined text-[15px]">event_available</span>
          Best Day
        </p>
        <p class="text-sm font-bold text-slate-800 mt-1">${insights.bestDay.name}</p>
        <p class="text-xs text-indigo-600 font-semibold mt-0.5">${insights.bestDay.rate}% avg completion</p>
      </div>

      <div class="insight-metric-card">
        <p class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
          <span class="material-symbols-outlined text-[15px]">event_busy</span>
          Weakest Day
        </p>
        <p class="text-sm font-bold text-slate-800 mt-1">${insights.weakestDay.name}</p>
        <p class="text-xs text-slate-500 font-semibold mt-0.5">${insights.weakestDay.rate}% avg completion</p>
      </div>

      <div class="insight-metric-card col-span-2 flex items-center justify-between">
        <div>
          <p class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Average Daily Completion</p>
          <p class="text-base font-bold text-slate-800 mt-0.5">${insights.averageCompletionPct}%</p>
        </div>
        <div class="text-right">
          <p class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Total Checkmarks</p>
          <p class="text-base font-bold text-indigo-600 mt-0.5">${insights.totalCheckmarks} logged</p>
        </div>
      </div>
    `;
  }

  function renderArchivedCount() {
    const count = habits.filter(h => h.active === false).length;
    if (dom.archivedHabitsCount) {
      dom.archivedHabitsCount.textContent = count;
    }
  }

  // ==========================================================================
  // 3. OPTIMISTIC HABIT COMPLETION
  // ==========================================================================

  /**
   * Toggles today's completion for a habit optimistically.
   * If backend persistence fails, rolls back state and informs the user.
   */
  window.toggleHabit = async function (habitId) {
    const todayStr = HabitsData.getTodayStr();
    const existingIdx = completions.findIndex(
      c => c.habit_id === habitId && c.completion_date === todayStr
    );

    const wasCompleted = existingIdx !== -1;
    const removedRecord = wasCompleted ? completions[existingIdx] : null;

    // 1. Optimistic UI update
    if (wasCompleted) {
      completions.splice(existingIdx, 1);
      showToast('Unchecked habit', 'info');
    } else {
      completions.push({
        id: `opt_${Date.now()}`,
        habit_id: habitId,
        completion_date: todayStr
      });
      showToast('Completed habit! 🔥', 'success');
    }

    renderAll();

    // 2. Async persistence
    try {
      await HabitService.toggleCompletion(habitId, todayStr);
    } catch (err) {
      console.error('Failed to toggle completion:', err);
      // Rollback optimistic state
      if (wasCompleted && removedRecord) {
        completions.push(removedRecord);
      } else {
        completions = completions.filter(c => !(c.habit_id === habitId && c.completion_date === todayStr));
      }
      renderAll();
      showToast('Could not save completion to database. Rolled back.', 'error');
    }
  };

  // ==========================================================================
  // 4. HABIT LIFECYCLE (CREATE, EDIT, ARCHIVE, RESTORE, DELETE)
  // ==========================================================================

  async function saveNewHabit() {
    const title = (dom.habitTitleInput ? dom.habitTitleInput.value : '').trim();
    if (!title) {
      showToast('Please enter a habit title.', 'error');
      return;
    }

    const category = (dom.habitCategoryInput ? dom.habitCategoryInput.value : '').trim() || 'General';
    const description = (dom.habitDescInput ? dom.habitDescInput.value : '').trim();
    const reminderTime = (dom.habitReminderInput ? dom.habitReminderInput.value : '').trim();

    try {
      const created = await HabitService.createHabit({
        title,
        category,
        description,
        targetFrequency: selectedAddFrequency,
        customDays: selectedAddFrequency === 'custom' ? [...selectedAddCustomDays] : [1, 2, 3, 4, 5],
        reminderTime
      });

      habits.unshift(created);
      closeAddHabitModal();
      renderAll();
      showToast(`Added habit: "${created.title}"`, 'success');
    } catch (err) {
      console.error('Failed to create habit:', err);
      showToast(err.message || 'Error creating habit.', 'error');
    }
  }

  window.promptManageHabit = function (habitId) {
    const habit = habits.find(h => h.id === habitId);
    if (!habit) return;

    pendingManageHabitId = habitId;
    if (dom.deleteHabitTitle) {
      dom.deleteHabitTitle.textContent = `Manage: "${habit.title}"`;
    }

    if (dom.modalConfirmDelete) {
      dom.modalConfirmDelete.classList.add('active');
    }
  };

  function closeManageModal() {
    pendingManageHabitId = null;
    if (dom.modalConfirmDelete) dom.modalConfirmDelete.classList.remove('active');
  }

  window.openEditHabitModal = function (habitId) {
    const habit = habits.find(h => h.id === habitId);
    if (!habit) return;

    closeManageModal();

    if (dom.editHabitId) dom.editHabitId.value = habit.id;
    if (dom.editHabitTitleInput) dom.editHabitTitleInput.value = habit.title;
    if (dom.editHabitCategoryInput) dom.editHabitCategoryInput.value = habit.category || '';
    if (dom.editHabitReminderInput) dom.editHabitReminderInput.value = habit.reminder_time || habit.reminderTime || '';

    selectedEditFrequency = habit.target_frequency || habit.targetFrequency || 'daily';
    selectedEditCustomDays = habit.custom_days || habit.customDays || [1, 2, 3, 4, 5];

    if (dom.editHabitFreqButtons) {
      dom.editHabitFreqButtons.forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-freq') === selectedEditFrequency);
      });
    }

    if (dom.editHabitCustomDaysRow) {
      dom.editHabitCustomDaysRow.classList.toggle('hidden', selectedEditFrequency !== 'custom');
      dom.editHabitCustomDaysRow.querySelectorAll('.edit-day-btn').forEach(btn => {
        const d = parseInt(btn.getAttribute('data-day'), 10);
        btn.classList.toggle('active', selectedEditCustomDays.includes(d));
      });
    }

    if (dom.modalEditHabit) dom.modalEditHabit.classList.add('active');
  };

  function closeEditHabitModal() {
    if (dom.modalEditHabit) dom.modalEditHabit.classList.remove('active');
  }

  async function saveEditHabit() {
    const id = dom.editHabitId ? dom.editHabitId.value : null;
    if (!id) return;

    const title = (dom.editHabitTitleInput ? dom.editHabitTitleInput.value : '').trim();
    if (!title) {
      showToast('Habit title cannot be empty.', 'error');
      return;
    }

    const category = (dom.editHabitCategoryInput ? dom.editHabitCategoryInput.value : '').trim() || 'General';
    const reminderTime = (dom.editHabitReminderInput ? dom.editHabitReminderInput.value : '').trim();

    try {
      const updated = await HabitService.updateHabit(id, {
        title,
        category,
        target_frequency: selectedEditFrequency,
        custom_days: selectedEditFrequency === 'custom' ? [...selectedEditCustomDays] : [1, 2, 3, 4, 5],
        reminder_time: reminderTime
      });

      const idx = habits.findIndex(h => h.id === id);
      if (idx !== -1) habits[idx] = updated;

      closeEditHabitModal();
      renderAll();
      showToast(`Updated habit: "${title}"`, 'success');
    } catch (err) {
      showToast(err.message || 'Error updating habit.', 'error');
    }
  }

  async function deactivateHabit(habitId) {
    const habit = habits.find(h => h.id === habitId);
    if (!habit) return;

    try {
      await HabitService.archiveHabit(habitId);
      habit.active = false;
      closeManageModal();
      renderAll();
      showToast(`Habit archived: "${habit.title}". History is preserved in analytics.`, 'info');
    } catch (err) {
      showToast('Error archiving habit.', 'error');
    }
  }

  async function deleteHabitPermanently(habitId) {
    const habit = habits.find(h => h.id === habitId);
    if (!habit) return;

    try {
      await HabitService.deleteHabit(habitId);
      habits = habits.filter(h => h.id !== habitId);
      completions = completions.filter(c => c.habit_id !== habitId);
      weeklyGoals = weeklyGoals.map(wg => (wg.habit_id === habitId ? { ...wg, habit_id: null } : wg));

      closeManageModal();
      renderAll();
      showToast(`Permanently deleted habit: "${habit.title}"`, 'error');
    } catch (err) {
      showToast('Error deleting habit.', 'error');
    }
  }

  window.reactivateHabit = async function (habitId) {
    const habit = habits.find(h => h.id === habitId);
    if (!habit) return;

    try {
      await HabitService.reactivateHabit(habitId);
      habit.active = true;
      renderAll();
      renderInactiveHabitsList();
      showToast(`Reactivated habit: "${habit.title}"`, 'success');
    } catch (err) {
      showToast('Error reactivating habit.', 'error');
    }
  };

  // ==========================================================================
  // 5. DAILY GOALS LIFECYCLE
  // ==========================================================================

  window.openAddDailyGoalModal = function () {
    if (dom.formAddDailyGoal) dom.formAddDailyGoal.reset();
    if (dom.modalAddDailyGoal) dom.modalAddDailyGoal.classList.add('active');
    setTimeout(() => {
      if (dom.dailyGoalTitleInput) dom.dailyGoalTitleInput.focus();
    }, 100);
  };

  function closeAddDailyGoalModal() {
    if (dom.modalAddDailyGoal) dom.modalAddDailyGoal.classList.remove('active');
  }

  async function saveNewDailyGoal() {
    const title = (dom.dailyGoalTitleInput ? dom.dailyGoalTitleInput.value : '').trim();
    if (!title) {
      showToast('Daily goal title is required.', 'error');
      return;
    }

    const target = parseInt(dom.dailyGoalTargetInput ? dom.dailyGoalTargetInput.value : '3', 10) || 3;
    const category = (dom.dailyGoalCategoryInput ? dom.dailyGoalCategoryInput.value : 'DSA').trim();

    try {
      const created = await HabitService.createDailyGoal({
        title,
        target,
        category,
        date: HabitsData.getTodayStr()
      });

      dailyGoals.push(created);
      closeAddDailyGoalModal();
      renderDailyGoals();
      renderHeatmap();
      showToast(`Daily goal added: "${title}"`, 'success');
    } catch (err) {
      showToast('Failed to add daily goal.', 'error');
    }
  }

  window.adjustDailyGoal = async function (id, delta) {
    try {
      const updated = await HabitService.adjustDailyGoalProgress(id, delta);
      const idx = dailyGoals.findIndex(g => g.id === id);
      if (idx !== -1) dailyGoals[idx] = updated;
      renderDailyGoals();
      renderHeatmap();
    } catch (err) {
      showToast('Could not update daily goal progress.', 'error');
    }
  };

  window.toggleDailyGoalComplete = async function (id) {
    try {
      const updated = await HabitService.toggleDailyGoalComplete(id);
      const idx = dailyGoals.findIndex(g => g.id === id);
      if (idx !== -1) dailyGoals[idx] = updated;
      renderDailyGoals();
      renderHeatmap();
    } catch (err) {
      showToast('Could not update daily goal.', 'error');
    }
  };

  window.deleteDailyGoal = async function (id) {
    try {
      await HabitService.deleteDailyGoal(id);
      dailyGoals = dailyGoals.filter(g => g.id !== id);
      renderDailyGoals();
      renderHeatmap();
      showToast('Daily goal removed.', 'info');
    } catch (err) {
      showToast('Could not remove daily goal.', 'error');
    }
  };

  // ==========================================================================
  // 6. WEEKLY GOALS LIFECYCLE
  // ==========================================================================

  window.openAddGoalModal = function () {
    if (dom.formAddGoal) dom.formAddGoal.reset();

    if (dom.goalHabitSelect) {
      const activeHabits = habits.filter(h => h.active !== false);
      dom.goalHabitSelect.innerHTML = `
        <option value="">General (Count all completed habits)</option>
        ${activeHabits.map(h => `<option value="${h.id}">Specific: ${escapeHtml(h.title)}</option>`).join('')}
      `;
    }

    if (dom.modalAddGoal) dom.modalAddGoal.classList.add('active');
    setTimeout(() => {
      if (dom.goalTitleInput) dom.goalTitleInput.focus();
    }, 100);
  };

  function closeAddGoalModal() {
    if (dom.modalAddGoal) dom.modalAddGoal.classList.remove('active');
  }

  async function saveNewWeeklyGoal() {
    const title = (dom.goalTitleInput ? dom.goalTitleInput.value : '').trim();
    if (!title) {
      showToast('Please enter a goal title.', 'error');
      return;
    }

    const habitId = dom.goalHabitSelect ? dom.goalHabitSelect.value : null;
    const target = parseInt(dom.goalTargetInput ? dom.goalTargetInput.value : '5', 10) || 5;

    try {
      const created = await HabitService.createWeeklyGoal({
        title,
        habitId: habitId || null,
        target,
        weekKey: HabitsData.getWeekId(HabitsData.getTodayStr())
      });

      weeklyGoals.push(created);
      closeAddGoalModal();
      renderWeeklyGoals();
      showToast(`Weekly goal added: "${title}"`, 'success');
    } catch (err) {
      showToast('Failed to add weekly goal.', 'error');
    }
  }

  window.removeWeeklyGoal = async function (id) {
    if (confirm('Remove this weekly goal?')) {
      try {
        await HabitService.deleteWeeklyGoal(id);
        weeklyGoals = weeklyGoals.filter(g => g.id !== id);
        renderWeeklyGoals();
        showToast('Weekly goal removed.', 'info');
      } catch (err) {
        showToast('Could not remove weekly goal.', 'error');
      }
    }
  };

  // ==========================================================================
  // 7. ARCHIVED HABITS MODAL
  // ==========================================================================

  function openInactiveHabitsModal() {
    renderInactiveHabitsList();
    if (dom.modalInactiveHabits) dom.modalInactiveHabits.classList.add('active');
  }

  function closeInactiveHabitsModal() {
    if (dom.modalInactiveHabits) dom.modalInactiveHabits.classList.remove('active');
  }

  function renderInactiveHabitsList() {
    if (!dom.inactiveHabitsList) return;

    const inactive = habits.filter(h => h.active === false);
    if (inactive.length === 0) {
      dom.inactiveHabitsList.innerHTML = `
        <div class="text-center py-8 text-slate-400">
          <span class="material-symbols-outlined text-3xl mb-1">check_circle</span>
          <p class="text-xs">No archived habits. All habits are currently active.</p>
        </div>
      `;
      return;
    }

    dom.inactiveHabitsList.innerHTML = inactive.map(habit => {
      const totalCompleted = completions.filter(c => c.habit_id === habit.id).length;

      return `
        <div class="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg">
          <div>
            <p class="text-sm font-semibold text-slate-800">${escapeHtml(habit.title)}</p>
            <p class="text-[11px] text-slate-400 mt-0.5">${escapeHtml(habit.category || 'General')} • ${totalCompleted} total completions</p>
          </div>
          <div class="flex items-center gap-2">
            <button 
              class="px-2.5 py-1 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-md transition-colors"
              onclick="window.reactivateHabit('${habit.id}')"
            >
              Restore
            </button>
            <button 
              class="text-slate-400 hover:text-rose-600 p-1 rounded"
              title="Delete permanently"
              onclick="window.deleteHabitFromArchive('${habit.id}')"
            >
              <span class="material-symbols-outlined text-[16px]">delete</span>
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  window.deleteHabitFromArchive = async function (habitId) {
    if (confirm('Permanently erase this habit and all its history? Cannot be undone.')) {
      await deleteHabitPermanently(habitId);
      renderInactiveHabitsList();
    }
  };

  // ==========================================================================
  // 8. AUTH ACCOUNT MODAL
  // ==========================================================================

  function openAuthAccountModal() {
    renderKnownAccountsList();
    updateUserHeaderUI();
    if (dom.modalAuthAccount) dom.modalAuthAccount.classList.add('active');
  }

  function closeAuthAccountModal() {
    if (dom.modalAuthAccount) dom.modalAuthAccount.classList.remove('active');
  }

  function renderKnownAccountsList() {
    if (!dom.knownAccountsList) return;
    const users = AuthService.listKnownUsers();
    const current = AuthService.getCurrentUser();

    dom.knownAccountsList.innerHTML = users.map(u => {
      const isActive = current && current.id === u.id;
      return `
        <div 
          class="flex items-center justify-between p-2.5 rounded-lg border cursor-pointer transition-colors ${isActive ? 'bg-indigo-50 border-indigo-300' : 'bg-white hover:bg-slate-50 border-slate-200'}"
          onclick="window.switchUserAccount('${u.id}')"
        >
          <div class="flex items-center gap-2.5">
            <span class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${isActive ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'}">
              ${u.avatar || u.fullName.charAt(0)}
            </span>
            <div>
              <p class="text-xs font-bold text-slate-800">${escapeHtml(u.fullName)}</p>
              <p class="text-[10px] text-slate-400 font-mono">${escapeHtml(u.email)}</p>
            </div>
          </div>
          ${isActive ? '<span class="text-[10px] font-bold text-indigo-700 bg-indigo-100 px-1.5 py-0.5 rounded">Active</span>' : '<span class="text-[10px] text-slate-400">Switch</span>'}
        </div>
      `;
    }).join('');
  }

  window.switchUserAccount = async function (userIdOrEmail) {
    closeAuthAccountModal();
    AuthService.switchAccount(userIdOrEmail);
  };

  // ==========================================================================
  // 9. EVENT BINDING
  // ==========================================================================

  function bindEvents() {
    // Auth Account Button
    if (dom.btnAccountSwitch) dom.btnAccountSwitch.addEventListener('click', openAuthAccountModal);
    if (dom.btnCloseAuthModal) dom.btnCloseAuthModal.addEventListener('click', closeAuthAccountModal);
    if (dom.btnDismissAuth) dom.btnDismissAuth.addEventListener('click', closeAuthAccountModal);

    if (dom.formAuthLogin) {
      dom.formAuthLogin.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = dom.authEmailInput ? dom.authEmailInput.value : '';
        const name = dom.authFullnameInput ? dom.authFullnameInput.value : '';
        if (email) {
          closeAuthAccountModal();
          await AuthService.signUp(email, 'password123', name);
        }
      });
    }

    if (dom.btnAuthSignout) {
      dom.btnAuthSignout.addEventListener('click', async () => {
        closeAuthAccountModal();
        await AuthService.signOut();
      });
    }

    // Add Habit Button & Modal
    window.openAddHabitModal = function () {
      if (dom.formAddHabit) dom.formAddHabit.reset();
      selectedAddFrequency = 'daily';
      if (dom.habitFreqButtons) {
        dom.habitFreqButtons.forEach(b => {
          b.classList.toggle('active', b.getAttribute('data-freq') === 'daily');
        });
      }
      if (dom.habitCustomDaysRow) dom.habitCustomDaysRow.classList.add('hidden');
      if (dom.modalAddHabit) dom.modalAddHabit.classList.add('active');
      setTimeout(() => {
        if (dom.habitTitleInput) dom.habitTitleInput.focus();
      }, 100);
    };

    function closeAddHabitModal() {
      if (dom.modalAddHabit) dom.modalAddHabit.classList.remove('active');
    }

    if (dom.btnAddHabit) dom.btnAddHabit.addEventListener('click', window.openAddHabitModal);
    if (dom.btnCloseAddHabit) dom.btnCloseAddHabit.addEventListener('click', closeAddHabitModal);
    if (dom.btnCancelAddHabit) dom.btnCancelAddHabit.addEventListener('click', closeAddHabitModal);

    // Quick chips for Add Habit Category
    if (dom.habitCategoryChips) {
      dom.habitCategoryChips.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
          const cat = btn.getAttribute('data-cat');
          if (dom.habitCategoryInput) dom.habitCategoryInput.value = cat;
        });
      });
    }

    // Frequency Selector for Add Habit
    if (dom.habitFreqButtons) {
      dom.habitFreqButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          dom.habitFreqButtons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          selectedAddFrequency = btn.getAttribute('data-freq');

          if (dom.habitCustomDaysRow) {
            dom.habitCustomDaysRow.classList.toggle('hidden', selectedAddFrequency !== 'custom');
          }
        });
      });
    }

    // Custom Days Selector for Add Habit
    if (dom.habitCustomDaysRow) {
      dom.habitCustomDaysRow.querySelectorAll('.day-selector-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const day = parseInt(btn.getAttribute('data-day'), 10);
          btn.classList.toggle('active');
          if (btn.classList.contains('active')) {
            if (!selectedAddCustomDays.includes(day)) selectedAddCustomDays.push(day);
          } else {
            selectedAddCustomDays = selectedAddCustomDays.filter(d => d !== day);
          }
        });
      });
    }

    if (dom.formAddHabit) {
      dom.formAddHabit.addEventListener('submit', (e) => {
        e.preventDefault();
        saveNewHabit();
      });
    }

    // Edit Habit Modal events
    if (dom.btnCloseEditHabit) dom.btnCloseEditHabit.addEventListener('click', closeEditHabitModal);
    if (dom.btnCancelEditHabit) dom.btnCancelEditHabit.addEventListener('click', closeEditHabitModal);

    if (dom.editHabitFreqButtons) {
      dom.editHabitFreqButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          dom.editHabitFreqButtons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          selectedEditFrequency = btn.getAttribute('data-freq');

          if (dom.editHabitCustomDaysRow) {
            dom.editHabitCustomDaysRow.classList.toggle('hidden', selectedEditFrequency !== 'custom');
          }
        });
      });
    }

    if (dom.editHabitCustomDaysRow) {
      dom.editHabitCustomDaysRow.querySelectorAll('.edit-day-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const day = parseInt(btn.getAttribute('data-day'), 10);
          btn.classList.toggle('active');
          if (btn.classList.contains('active')) {
            if (!selectedEditCustomDays.includes(day)) selectedEditCustomDays.push(day);
          } else {
            selectedEditCustomDays = selectedEditCustomDays.filter(d => d !== day);
          }
        });
      });
    }

    if (dom.formEditHabit) {
      dom.formEditHabit.addEventListener('submit', (e) => {
        e.preventDefault();
        saveEditHabit();
      });
    }

    // Manage Habit Modal actions
    if (dom.btnActionEditHabit) {
      dom.btnActionEditHabit.addEventListener('click', () => {
        if (pendingManageHabitId) window.openEditHabitModal(pendingManageHabitId);
      });
    }

    if (dom.btnConfirmDeactivate) {
      dom.btnConfirmDeactivate.addEventListener('click', () => {
        if (pendingManageHabitId) deactivateHabit(pendingManageHabitId);
      });
    }

    if (dom.btnConfirmDeletePermanent) {
      dom.btnConfirmDeletePermanent.addEventListener('click', () => {
        if (pendingManageHabitId) {
          if (confirm('Permanently delete this habit and all its history? This cannot be undone.')) {
            deleteHabitPermanently(pendingManageHabitId);
          }
        }
      });
    }

    if (dom.btnCancelDelete) dom.btnCancelDelete.addEventListener('click', closeManageModal);

    // Daily Goals Modal events
    if (dom.btnAddDailyGoal) dom.btnAddDailyGoal.addEventListener('click', window.openAddDailyGoalModal);
    if (dom.btnCloseAddDailyGoal) dom.btnCloseAddDailyGoal.addEventListener('click', closeAddDailyGoalModal);
    if (dom.btnCancelAddDailyGoal) dom.btnCancelAddDailyGoal.addEventListener('click', closeAddDailyGoalModal);

    if (dom.formAddDailyGoal) {
      dom.formAddDailyGoal.addEventListener('submit', (e) => {
        e.preventDefault();
        saveNewDailyGoal();
      });
    }

    // Weekly Goals Modal events
    if (dom.btnAddGoal) dom.btnAddGoal.addEventListener('click', window.openAddGoalModal);
    if (dom.btnCloseAddGoal) dom.btnCloseAddGoal.addEventListener('click', closeAddGoalModal);
    if (dom.btnCancelAddGoal) dom.btnCancelAddGoal.addEventListener('click', closeAddGoalModal);

    if (dom.formAddGoal) {
      dom.formAddGoal.addEventListener('submit', (e) => {
        e.preventDefault();
        saveNewWeeklyGoal();
      });
    }

    // Inactive / Archived Habits Modal events
    if (dom.btnViewArchived) dom.btnViewArchived.addEventListener('click', openInactiveHabitsModal);
    if (dom.btnCloseInactiveModal) dom.btnCloseInactiveModal.addEventListener('click', closeInactiveHabitsModal);
    if (dom.btnDismissInactive) dom.btnDismissInactive.addEventListener('click', closeInactiveHabitsModal);
  }

  function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

})();
