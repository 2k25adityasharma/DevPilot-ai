/**
 * DevPilot-AI - Consistency & Habit Tracker Controller
 * 
 * Central controller coordinating real-time state persistence,
 * mathematical streak calculations, weekly momentum, 26-week heatmap,
 * habit insights, weekly goals auto-synchronization, and habit lifecycle.
 */

(function () {
  'use strict';

  // State
  let habits = [];
  let weeklyGoals = [];
  let pendingDeleteHabitId = null;
  let selectedFrequency = 'daily';
  let selectedCustomDays = [1, 2, 3, 4, 5]; // Mon-Fri default

  // DOM Elements cache
  let dom = {};

  document.addEventListener('DOMContentLoaded', () => {
    cacheDomElements();
    loadState();
    bindEvents();
    renderAll();
  });

  function cacheDomElements() {
    dom = {
      // Header
      streakDisplay: document.getElementById('habit-streak-display'),
      todayDateBadge: document.getElementById('today-date-badge'),
      currentWeekBadge: document.getElementById('current-week-badge'),
      archivedHabitsCount: document.getElementById('archived-habits-count'),
      btnViewArchived: document.getElementById('btn-view-archived'),
      btnAddHabit: document.getElementById('btn-add-habit'),
      btnAddGoal: document.getElementById('btn-add-goal'),

      // Checklist & Progress
      habitsListContainer: document.getElementById('habits-list-container'),
      habitsCompletedText: document.getElementById('habits-completed-text'),
      habitsPctText: document.getElementById('habits-pct-text'),
      habitsProgressBar: document.getElementById('habits-progress-bar'),

      // Weekly Momentum
      momentumComparisonChip: document.getElementById('momentum-comparison-chip'),
      momentumMessageText: document.getElementById('momentum-message-text'),
      statTotalDays: document.getElementById('stat-total-days'),
      statBestStreak: document.getElementById('stat-best-streak'),
      statCompletionPct: document.getElementById('stat-completion-pct'),

      // Heatmap
      habitHeatmapGrid: document.getElementById('habit-heatmap-grid'),
      heatmapTooltip: document.getElementById('heatmap-tooltip'),

      // Insights
      habitInsightsContainer: document.getElementById('habit-insights-container'),

      // Weekly Goals
      weeklyGoalsContainer: document.getElementById('weekly-goals-container'),

      // Modals
      modalAddHabit: document.getElementById('modal-add-habit'),
      formAddHabit: document.getElementById('form-add-habit'),
      habitTitleInput: document.getElementById('habit-title-input'),
      habitCategoryInput: document.getElementById('habit-category-input'),
      habitCategoryChips: document.getElementById('habit-category-chips'),
      habitFreqButtons: document.querySelectorAll('#modal-add-habit .freq-chip'),
      habitCustomDaysRow: document.getElementById('habit-custom-days-row'),
      habitReminderInput: document.getElementById('habit-reminder-input'),
      btnCloseAddHabit: document.getElementById('btn-close-add-habit'),
      btnCancelAddHabit: document.getElementById('btn-cancel-add-habit'),

      modalAddGoal: document.getElementById('modal-add-goal'),
      formAddGoal: document.getElementById('form-add-goal'),
      goalTitleInput: document.getElementById('goal-title-input'),
      goalHabitSelect: document.getElementById('goal-habit-select'),
      goalTargetInput: document.getElementById('goal-target-input'),
      btnCloseAddGoal: document.getElementById('btn-close-add-goal'),
      btnCancelAddGoal: document.getElementById('btn-cancel-add-goal'),

      modalConfirmDelete: document.getElementById('modal-confirm-delete'),
      deleteHabitTitle: document.getElementById('delete-habit-title'),
      btnConfirmDeactivate: document.getElementById('btn-confirm-deactivate'),
      btnConfirmDeletePermanent: document.getElementById('btn-confirm-delete-permanent'),
      btnCancelDelete: document.getElementById('btn-cancel-delete'),

      modalInactiveHabits: document.getElementById('modal-inactive-habits'),
      inactiveHabitsList: document.getElementById('inactive-habits-list'),
      btnCloseInactiveModal: document.getElementById('btn-close-inactive-modal'),
      btnDismissInactive: document.getElementById('btn-dismiss-inactive')
    };
  }

  // ==========================================
  // 1. STATE MANAGEMENT & LOCAL STORAGE
  // ==========================================

  function loadState() {
    const rawHabits = Storage.get('dev_habits');
    habits = HabitsData.migrateLegacyHabits(rawHabits);
    saveHabits();

    const rawGoals = Storage.get('weekly_goals');
    if (Array.isArray(rawGoals) && rawGoals.length > 0) {
      weeklyGoals = rawGoals;
    } else {
      weeklyGoals = HabitsData.generateStarterWeeklyGoals(habits);
      saveWeeklyGoals();
    }
  }

  function saveHabits() {
    Storage.set('dev_habits', habits);
  }

  function saveWeeklyGoals() {
    Storage.set('weekly_goals', weeklyGoals);
  }

  // ==========================================
  // 2. MAIN RENDERING PIPELINE
  // ==========================================

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

    if (dom.currentWeekBadge) {
      dom.currentWeekBadge.textContent = HabitsData.getWeekId(todayStr);
    }

    renderStreakHeader();
    renderTodayProgress();
    renderHabitsList();
    renderWeeklyMomentum();
    renderHeatmap();
    renderHabitInsights();
    renderWeeklyGoals();
    renderArchivedCount();
  }

  /**
   * Header Streak Badge & Dynamic Milestone
   */
  function renderStreakHeader() {
    if (!dom.streakDisplay) return;
    const overall = HabitsData.calculateOverallStreak(habits);
    dom.streakDisplay.textContent = overall.milestoneText;

    if (overall.isAtRisk && overall.currentStreak > 0) {
      dom.streakDisplay.parentElement.classList.remove('bg-amber-50', 'border-amber-200', 'text-amber-900');
      dom.streakDisplay.parentElement.classList.add('bg-orange-50', 'border-orange-200', 'text-orange-900');
    } else {
      dom.streakDisplay.parentElement.classList.remove('bg-orange-50', 'border-orange-200', 'text-orange-900');
      dom.streakDisplay.parentElement.classList.add('bg-amber-50', 'border-amber-200', 'text-amber-900');
    }
  }

  /**
   * Today's Habit Checklist Completion Progress
   */
  function renderTodayProgress() {
    const progress = HabitsData.calculateTodayProgress(habits);

    if (dom.habitsCompletedText) dom.habitsCompletedText.textContent = progress.text;
    if (dom.habitsPctText) dom.habitsPctText.textContent = `${progress.pct}%`;
    if (dom.habitsProgressBar) dom.habitsProgressBar.style.width = `${progress.pct}%`;
  }

  /**
   * Active Habits Checklist Items
   */
  function renderHabitsList() {
    if (!dom.habitsListContainer) return;

    const todayStr = HabitsData.getTodayStr();
    const activeHabits = habits.filter(h => h.active !== false);

    if (activeHabits.length === 0) {
      dom.habitsListContainer.innerHTML = `
        <div class="text-center py-10 px-4 bg-slate-50/70 border border-dashed border-slate-200 rounded-xl">
          <span class="material-symbols-outlined text-4xl text-slate-300 mb-2">task_alt</span>
          <p class="font-bold text-sm text-slate-700">No active developer habits</p>
          <p class="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Click "+ Add Habit" to start building your daily consistency system.
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
      const stats = HabitsData.calculateHabitStreak(habit, todayStr);
      const isCompleted = stats.isCompletedToday;
      const isScheduled = stats.isScheduledToday;

      let frequencyBadge = '';
      if (habit.targetFrequency === 'weekdays') {
        frequencyBadge = '<span class="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">Weekdays</span>';
      } else if (habit.targetFrequency === 'custom') {
        frequencyBadge = '<span class="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">Custom</span>';
      }

      let reminderBadge = '';
      if (habit.reminderTime) {
        reminderBadge = `
          <span class="text-[11px] text-slate-400 flex items-center gap-0.5">
            <span class="material-symbols-outlined text-[13px]">alarm</span>
            ${escapeHtml(habit.reminderTime)}
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
            class="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors flex items-center justify-center shrink-0" 
            title="Options / Deactivate Habit" 
            onclick="window.promptDeleteHabit('${habit.id}')"
            aria-label="Deactivate habit"
          >
            <span class="material-symbols-outlined text-[18px]">more_vert</span>
          </button>
        </div>
      `;
    }).join('');
  }

  /**
   * Weekly Momentum Card & Truthful Data-Driven Copy
   */
  function renderWeeklyMomentum() {
    const momentum = HabitsData.calculateWeeklyMomentum(habits);

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

    if (dom.momentumMessageText) {
      dom.momentumMessageText.textContent = momentum.message;
    }

    if (dom.statTotalDays) dom.statTotalDays.textContent = momentum.totalDays;
    if (dom.statBestStreak) dom.statBestStreak.textContent = `${momentum.bestStreak}d`;
    if (dom.statCompletionPct) dom.statCompletionPct.textContent = `${momentum.overallCompletionPct}%`;
  }

  /**
   * 6-Month (26 Weeks) Consistency Heatmap Matrix
   */
  function renderHeatmap() {
    if (!dom.habitHeatmapGrid) return;

    const weeks = HabitsData.calculateHeatmapMatrix(habits, 26);
    if (!weeks || weeks.length === 0) return;

    // Build month labels along the top
    let lastMonth = -1;
    const monthSpans = [];
    weeks.forEach((week, wIdx) => {
      const firstDay = HabitsData.parseDate(week[0].date);
      const m = firstDay.getMonth();
      if (m !== lastMonth && wIdx < 25) {
        monthSpans.push({
          name: firstDay.toLocaleDateString('en-US', { month: 'short' }),
          colIndex: wIdx
        });
        lastMonth = m;
      }
    });

    const monthHeadersHtml = `
      <div class="heatmap-months-row">
        ${monthSpans.map(m => `<span class="heatmap-month-label">${m.name}</span>`).join('')}
      </div>
    `;

    // Weekday column labels (Mon, Wed, Fri)
    const dayLabelsHtml = `
      <div class="heatmap-days-col">
        <span>Sun</span>
        <span>Tue</span>
        <span>Thu</span>
        <span>Sat</span>
      </div>
    `;

    // Columns grid
    const columnsHtml = weeks.map((week, wIdx) => {
      const cellsHtml = week.map(day => `
        <div 
          class="heatmap-cell ${day.levelClass} ${day.isToday ? 'is-today' : ''} ${day.isFuture ? 'is-future' : ''}" 
          data-date="${day.date}"
          data-formatted="${day.formattedDate}"
          data-count="${day.count}"
          data-habits="${encodeURIComponent(JSON.stringify(day.completedHabits || []))}"
        ></div>
      `).join('');

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
  }

  /**
   * Heatmap Tooltip Hover & Click Events
   */
  function attachHeatmapTooltips() {
    const tooltip = dom.heatmapTooltip;
    if (!tooltip) return;

    const cells = dom.habitHeatmapGrid.querySelectorAll('.heatmap-cell');
    cells.forEach(cell => {
      cell.addEventListener('mouseenter', (e) => {
        const dateStr = cell.getAttribute('data-formatted');
        const count = parseInt(cell.getAttribute('data-count'), 10) || 0;
        let habitsList = [];
        try {
          habitsList = JSON.parse(decodeURIComponent(cell.getAttribute('data-habits') || '[]'));
        } catch (err) {}

        let content = `<strong>${dateStr}</strong><br/>${count} habit${count === 1 ? '' : 's'} completed`;
        if (habitsList.length > 0) {
          content += `<br/><span style="opacity:0.8; font-size:10px;">${habitsList.slice(0, 3).map(h => '• ' + escapeHtml(h)).join('<br/>')}</span>`;
        }

        tooltip.innerHTML = content;
        tooltip.classList.add('visible');

        const rect = cell.getBoundingClientRect();
        const parentRect = dom.habitHeatmapGrid.getBoundingClientRect();

        tooltip.style.left = `${rect.left + (rect.width / 2) - parentRect.left + dom.habitHeatmapGrid.parentElement.scrollLeft}px`;
        tooltip.style.top = `${rect.top - parentRect.top - 6}px`;
      });

      cell.addEventListener('mouseleave', () => {
        tooltip.classList.remove('visible');
      });
    });
  }

  /**
   * Habit Insights Card (Real Data Analytics)
   */
  function renderHabitInsights() {
    if (!dom.habitInsightsContainer) return;

    const insights = HabitsData.calculateHabitInsights(habits);

    const mostConsistentTitle = insights.mostConsistent
      ? `${escapeHtml(insights.mostConsistent.title)}`
      : 'No data yet';
    const mostConsistentRate = insights.mostConsistent
      ? `${insights.mostConsistent.rate}%`
      : '—';

    const needsAttentionTitle = insights.needsAttention
      ? `${escapeHtml(insights.needsAttention.title)}`
      : 'All habits consistent';
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

  /**
   * Weekly Goals Section & Progress Auto-Sync
   */
  function renderWeeklyGoals() {
    if (!dom.weeklyGoalsContainer) return;

    if (weeklyGoals.length === 0) {
      dom.weeklyGoalsContainer.innerHTML = `
        <div class="text-center py-6 px-4 bg-slate-50 border border-dashed border-slate-200 rounded-xl">
          <p class="text-xs text-slate-500">No active weekly goals set for this week.</p>
          <button class="text-xs font-semibold text-indigo-600 hover:text-indigo-800 mt-2" onclick="window.openAddGoalModal()">
            + Set a Weekly Goal
          </button>
        </div>
      `;
      return;
    }

    dom.weeklyGoalsContainer.innerHTML = weeklyGoals.map((goal, idx) => {
      const progress = HabitsData.calculateWeeklyGoalProgress(goal, habits);
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
                onclick="window.removeWeeklyGoal(${idx})"
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

  function renderArchivedCount() {
    const count = habits.filter(h => h.active === false).length;
    if (dom.archivedHabitsCount) {
      dom.archivedHabitsCount.textContent = count;
    }
  }

  // ==========================================
  // 3. EVENT HANDLERS & USER ACTIONS
  // ==========================================

  function bindEvents() {
    // Add Habit Button & Modal
    if (dom.btnAddHabit) dom.btnAddHabit.addEventListener('click', openAddHabitModal);
    if (dom.btnCloseAddHabit) dom.btnCloseAddHabit.addEventListener('click', closeAddHabitModal);
    if (dom.btnCancelAddHabit) dom.btnCancelAddHabit.addEventListener('click', closeAddHabitModal);

    // Category quick chips
    if (dom.habitCategoryChips) {
      dom.habitCategoryChips.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
          const cat = btn.getAttribute('data-cat');
          if (dom.habitCategoryInput) dom.habitCategoryInput.value = cat;
        });
      });
    }

    // Frequency selector
    if (dom.habitFreqButtons) {
      dom.habitFreqButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          dom.habitFreqButtons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          selectedFrequency = btn.getAttribute('data-freq');

          if (dom.habitCustomDaysRow) {
            if (selectedFrequency === 'custom') {
              dom.habitCustomDaysRow.classList.remove('hidden');
            } else {
              dom.habitCustomDaysRow.classList.add('hidden');
            }
          }
        });
      });
    }

    // Custom day selector buttons
    if (dom.habitCustomDaysRow) {
      dom.habitCustomDaysRow.querySelectorAll('.day-selector-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const day = parseInt(btn.getAttribute('data-day'), 10);
          btn.classList.toggle('active');
          if (btn.classList.contains('active')) {
            if (!selectedCustomDays.includes(day)) selectedCustomDays.push(day);
          } else {
            selectedCustomDays = selectedCustomDays.filter(d => d !== day);
          }
        });
      });
    }

    // Form submit: Add Habit
    if (dom.formAddHabit) {
      dom.formAddHabit.addEventListener('submit', (e) => {
        e.preventDefault();
        saveNewHabit();
      });
    }

    // Add Weekly Goal Modal
    if (dom.btnAddGoal) dom.btnAddGoal.addEventListener('click', openAddGoalModal);
    if (dom.btnCloseAddGoal) dom.btnCloseAddGoal.addEventListener('click', closeAddGoalModal);
    if (dom.btnCancelAddGoal) dom.btnCancelAddGoal.addEventListener('click', closeAddGoalModal);

    if (dom.formAddGoal) {
      dom.formAddGoal.addEventListener('submit', (e) => {
        e.preventDefault();
        saveNewGoal();
      });
    }

    // Deactivate / Delete Confirmation Modal
    if (dom.btnConfirmDeactivate) {
      dom.btnConfirmDeactivate.addEventListener('click', () => {
        if (pendingDeleteHabitId) deactivateHabit(pendingDeleteHabitId);
      });
    }

    if (dom.btnConfirmDeletePermanent) {
      dom.btnConfirmDeletePermanent.addEventListener('click', () => {
        if (pendingDeleteHabitId) deleteHabitPermanently(pendingDeleteHabitId);
      });
    }

    if (dom.btnCancelDelete) {
      dom.btnCancelDelete.addEventListener('click', () => {
        closeDeleteModal();
      });
    }

    // Archived Habits View Modal
    if (dom.btnViewArchived) dom.btnViewArchived.addEventListener('click', openInactiveHabitsModal);
    if (dom.btnCloseInactiveModal) dom.btnCloseInactiveModal.addEventListener('click', closeInactiveHabitsModal);
    if (dom.btnDismissInactive) dom.btnDismissInactive.addEventListener('click', closeInactiveHabitsModal);
  }

  // ==========================================
  // 4. HABIT LIFECYCLE (TOGGLE, ADD, DEACTIVATE, DELETE)
  // ==========================================

  /**
   * Toggles today's completion status for a habit.
   * Recalculates all dependent statistics and persists immediately.
   */
  window.toggleHabit = function (habitId) {
    const habit = habits.find(h => h.id === habitId);
    if (!habit) return;

    if (!habit.completionHistory) habit.completionHistory = {};
    const todayStr = HabitsData.getTodayStr();

    if (habit.completionHistory[todayStr]) {
      delete habit.completionHistory[todayStr];
      showToast(`Unchecked: ${habit.title}`, 'info');
    } else {
      habit.completionHistory[todayStr] = true;
      showToast(`Completed: ${habit.title}! 🔥`, 'success');
    }

    saveHabits();
    renderAll();
  };

  /**
   * Add Habit Form Validation and Submission
   */
  function saveNewHabit() {
    const title = (dom.habitTitleInput ? dom.habitTitleInput.value : '').trim();
    if (!title) {
      showToast('Please enter a habit title.', 'error');
      return;
    }

    // Check for duplicate active habit title
    const duplicate = habits.find(h => h.active !== false && h.title.toLowerCase() === title.toLowerCase());
    if (duplicate) {
      showToast('An active habit with this name already exists.', 'warning');
      return;
    }

    const category = (dom.habitCategoryInput ? dom.habitCategoryInput.value : '').trim() || 'General';
    const reminderTime = (dom.habitReminderInput ? dom.habitReminderInput.value : '').trim();
    const todayStr = HabitsData.getTodayStr();

    const newHabit = {
      id: `h_${Date.now()}`,
      title,
      category,
      createdAt: todayStr,
      active: true,
      targetFrequency: selectedFrequency,
      customDays: selectedFrequency === 'custom' ? [...selectedCustomDays] : [1, 2, 3, 4, 5],
      reminderTime,
      completionHistory: {}
    };

    habits.unshift(newHabit);
    saveHabits();
    closeAddHabitModal();
    renderAll();
    showToast(`Added habit: "${title}"`, 'success');
  }

  /**
   * Prompts the user with the safe Deactivate vs Delete modal.
   */
  window.promptDeleteHabit = function (habitId) {
    const habit = habits.find(h => h.id === habitId);
    if (!habit) return;

    pendingDeleteHabitId = habitId;
    if (dom.deleteHabitTitle) {
      dom.deleteHabitTitle.textContent = `Manage: "${habit.title}"`;
    }

    if (dom.modalConfirmDelete) {
      dom.modalConfirmDelete.classList.add('active');
    }
  };

  function closeDeleteModal() {
    pendingDeleteHabitId = null;
    if (dom.modalConfirmDelete) dom.modalConfirmDelete.classList.remove('active');
  }

  /**
   * Deactivates a habit: preserves all historical completions, heatmap data, and stats,
   * but removes it from today's active checklist.
   */
  function deactivateHabit(habitId) {
    const habit = habits.find(h => h.id === habitId);
    if (!habit) return;

    habit.active = false;
    saveHabits();
    closeDeleteModal();
    renderAll();
    showToast(`Habit paused: "${habit.title}". History is preserved in analytics.`, 'info');
  }

  /**
   * Permanently deletes a habit and all its history.
   */
  function deleteHabitPermanently(habitId) {
    const idx = habits.findIndex(h => h.id === habitId);
    if (idx === -1) return;

    const title = habits[idx].title;
    habits.splice(idx, 1);

    // Also remove any weekly goal bound directly to this habit
    weeklyGoals = weeklyGoals.filter(g => g.habitId !== habitId);
    saveWeeklyGoals();

    saveHabits();
    closeDeleteModal();
    renderAll();
    showToast(`Permanently erased: "${title}"`, 'error');
  }

  /**
   * Reactivates an archived habit.
   */
  window.reactivateHabit = function (habitId) {
    const habit = habits.find(h => h.id === habitId);
    if (!habit) return;

    habit.active = true;
    saveHabits();
    renderAll();
    renderInactiveHabitsList();
    showToast(`Reactivated: "${habit.title}"`, 'success');
  };

  // ==========================================
  // 5. WEEKLY GOALS ACTIONS
  // ==========================================

  function saveNewGoal() {
    const title = (dom.goalTitleInput ? dom.goalTitleInput.value : '').trim();
    if (!title) {
      showToast('Please enter a goal title.', 'error');
      return;
    }

    const habitId = dom.goalHabitSelect ? dom.goalHabitSelect.value : '';
    const target = parseInt(dom.goalTargetInput ? dom.goalTargetInput.value : '5', 10) || 5;
    const todayStr = HabitsData.getTodayStr();

    const newGoal = {
      id: `wg_${Date.now()}`,
      title,
      habitId: habitId || null,
      target,
      weekId: HabitsData.getWeekId(todayStr),
      createdAt: todayStr
    };

    weeklyGoals.push(newGoal);
    saveWeeklyGoals();
    closeAddGoalModal();
    renderWeeklyGoals();
    showToast(`Weekly goal added: "${title}"`, 'success');
  }

  window.removeWeeklyGoal = function (idx) {
    if (confirm('Remove this weekly goal?')) {
      weeklyGoals.splice(idx, 1);
      saveWeeklyGoals();
      renderWeeklyGoals();
      showToast('Weekly goal removed.', 'info');
    }
  };

  // ==========================================
  // 6. MODAL UTILITIES & INACTIVE LIST
  // ==========================================

  window.openAddHabitModal = function () {
    if (dom.formAddHabit) dom.formAddHabit.reset();
    selectedFrequency = 'daily';
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

  window.openAddGoalModal = function () {
    if (dom.formAddGoal) dom.formAddGoal.reset();

    // Populate habit select dropdown with active habits
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
      const totalCompleted = habit.completionHistory
        ? Object.values(habit.completionHistory).filter(Boolean).length
        : 0;

      return `
        <div class="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg">
          <div>
            <p class="text-sm font-semibold text-slate-800">${escapeHtml(habit.title)}</p>
            <p class="text-[11px] text-slate-400 mt-0.5">${escapeHtml(habit.category)} • ${totalCompleted} total completions</p>
          </div>
          <div class="flex items-center gap-2">
            <button 
              class="px-2.5 py-1 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-md transition-colors"
              onclick="window.reactivateHabit('${habit.id}')"
            >
              Reactivate
            </button>
            <button 
              class="text-slate-400 hover:text-rose-600 p-1 rounded"
              title="Delete permanently"
              onclick="window.promptDeleteHabit('${habit.id}')"
            >
              <span class="material-symbols-outlined text-[16px]">delete</span>
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  // ==========================================
  // 7. UTILITIES
  // ==========================================

  function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

})();
