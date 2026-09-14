/**
 * DevPilot-AI - Pomodoro Focus Timer Controller
 * 
 * Production-grade timer controller featuring:
 * - Timestamp-based countdown calculations (immune to background tab throttling)
 * - Reload persistence (restores exact remaining time and active task)
 * - 4-step Pomodoro cycle progression (Focus -> Break -> Focus -> Long Break)
 * - Web Audio API harmonic chime (zero external audio file dependency)
 * - Desktop notifications
 * - Task labeling & Today's sessions history logging
 * - Today's Focus real statistical tracking
 * - Distraction-free Fullscreen / Focus Mode
 * - Keyboard shortcuts (Space, R, S, 1, 2, 3, F)
 */

(function () {
  'use strict';

  // State
  let settings = {};
  let activeState = {};
  let sessions = [];
  let timerInterval = null;
  let nextPendingTransition = null;

  // Cached DOM elements
  let dom = {};

  document.addEventListener('DOMContentLoaded', () => {
    cacheDomElements();
    loadSettings();
    loadSessions();
    loadActiveState();
    bindEvents();
    renderAll();
    setupVisibilityListeners();
  });

  function cacheDomElements() {
    dom = {
      // Header & Actions
      completedRoundsCount: document.getElementById('completed-rounds-count'),
      btnExitFocusMode: document.getElementById('btn-exit-focus-mode'),
      btnExitFocusTop: document.getElementById('btn-exit-focus-top'),
      btnExitFocusCenter: document.getElementById('btn-exit-focus-center'),
      btnFocusMode: document.getElementById('btn-focus-mode'),
      btnShortcuts: document.getElementById('btn-shortcuts'),
      btnTimerSettings: document.getElementById('btn-timer-settings'),
      focusModeTaskText: document.getElementById('focus-mode-task-text'),
      focusModeTaskPill: document.getElementById('focus-mode-task-pill'),

      // Task
      taskInput: document.getElementById('task-input'),
      taskSuggestionsRow: document.getElementById('task-suggestions-row'),
      activeTaskDisplay: document.getElementById('active-task-display'),
      activeTaskText: document.getElementById('active-task-text'),

      // Modes
      modeBtns: document.querySelectorAll('.timer-mode-btn'),
      modeBtnWork: document.getElementById('mode-btn-work'),
      modeBtnShort: document.getElementById('mode-btn-short'),
      modeBtnLong: document.getElementById('mode-btn-long'),
      modeWorkMin: document.getElementById('mode-work-min'),
      modeShortMin: document.getElementById('mode-short-min'),
      modeLongMin: document.getElementById('mode-long-min'),

      // Clock Display
      timerCircleContainer: document.getElementById('timer-circle-container'),
      timerCircleProgress: document.getElementById('timer-circle-progress'),
      timerTimeDisplay: document.getElementById('timer-time-display'),
      timerModeBadge: document.getElementById('timer-mode-badge'),

      // Controls
      btnTimerStart: document.getElementById('btn-timer-start'),
      btnTimerComplete: document.getElementById('btn-timer-complete'),
      timerStartIcon: document.getElementById('timer-start-icon'),
      timerStartText: document.getElementById('timer-start-text'),
      btnTimerReset: document.getElementById('btn-timer-reset'),
      btnTimerSkip: document.getElementById('btn-timer-skip'),

      // Cycle Indicators
      cycleFractionText: document.getElementById('cycle-fraction-text'),
      roundsIndicators: document.getElementById('rounds-indicators'),

      // Stats
      statTodaySessions: document.getElementById('stat-today-sessions'),
      statTodayMinutes: document.getElementById('stat-today-minutes'),
      statCyclePosition: document.getElementById('stat-cycle-position'),
      statWeekSessions: document.getElementById('stat-week-sessions'),

      // Sessions History
      sessionsHistoryList: document.getElementById('sessions-history-list'),
      btnClearHistory: document.getElementById('btn-clear-history'),

      // Modals
      modalTimerSettings: document.getElementById('modal-timer-settings'),
      formTimerSettings: document.getElementById('form-timer-settings'),
      settingFocusDur: document.getElementById('setting-focus-dur'),
      settingShortDur: document.getElementById('setting-short-dur'),
      settingLongDur: document.getElementById('setting-long-dur'),
      settingCycles: document.getElementById('setting-cycles'),
      settingSound: document.getElementById('setting-sound'),
      settingNotifications: document.getElementById('setting-notifications'),
      settingAutostart: document.getElementById('setting-autostart'),
      btnCloseSettings: document.getElementById('btn-close-settings'),
      btnCancelSettings: document.getElementById('btn-cancel-settings'),

      modalSessionCompleted: document.getElementById('modal-session-completed'),
      completedModalTitle: document.getElementById('completed-modal-title'),
      completedModalMsg: document.getElementById('completed-modal-msg'),
      btnModalStartNext: document.getElementById('btn-modal-start-next'),
      btnModalStartNextText: document.getElementById('btn-modal-start-next-text'),
      btnModalSkipNext: document.getElementById('btn-modal-skip-next'),

      modalShortcuts: document.getElementById('modal-shortcuts'),
      btnCloseShortcuts: document.getElementById('btn-close-shortcuts')
    };
  }

  // ==========================================
  // 1. STATE PERSISTENCE & INITIALIZATION
  // ==========================================

  function loadSettings() {
    const stored = Storage.get('timer_settings');
    settings = Object.assign({}, TimerData.getDefaultSettings(), stored || {});
    updateModeLabels();
  }

  function saveSettings() {
    Storage.set('timer_settings', settings);
    updateModeLabels();
  }

  function updateModeLabels() {
    if (dom.modeWorkMin) dom.modeWorkMin.textContent = settings.focusDuration;
    if (dom.modeShortMin) dom.modeShortMin.textContent = settings.shortBreakDuration;
    if (dom.modeLongMin) dom.modeLongMin.textContent = settings.longBreakDuration;
  }

  function loadSessions() {
    const stored = Storage.get('timer_sessions');
    if (Array.isArray(stored)) {
      // Clean out any legacy starter fake sessions (ts_1, ts_2, ts_3)
      sessions = stored.filter(s => s && s.id !== 'ts_1' && s.id !== 'ts_2' && s.id !== 'ts_3');
    } else {
      sessions = [];
    }
    Storage.set('timer_sessions', sessions);
  }

  function saveSessions() {
    Storage.set('timer_sessions', sessions);
    renderTodayStats();
    renderSessionsHistory();
  }

  function loadActiveState() {
    const stored = Storage.get('timer_active_state');
    const defaultDuration = (settings.focusDuration || 25) * 60;

    activeState = Object.assign({
      mode: 'work',
      durationSeconds: defaultDuration,
      startTimestamp: null,
      endTimestamp: null,
      remainingSeconds: defaultDuration,
      isRunning: false,
      isPaused: false,
      cyclePosition: 1,
      currentTask: ''
    }, stored || {});

    // Resume running timer if page reloaded during an active countdown
    if (activeState.isRunning && activeState.endTimestamp) {
      const remaining = TimerData.calculateRemaining(activeState.endTimestamp);
      if (remaining > 0) {
        activeState.remainingSeconds = remaining;
        startTicking();
      } else {
        // Finished while browser was closed / refreshed
        activeState.remainingSeconds = 0;
        activeState.isRunning = false;
        activeState.isPaused = false;
        setTimeout(() => handleTimerCompletion(), 300);
      }
    } else if (activeState.isPaused) {
      // Kept paused with remaining time
      activeState.isRunning = false;
    } else {
      // Clean idle state
      activeState.isRunning = false;
      activeState.isPaused = false;
      activeState.endTimestamp = null;
    }

    if (activeState.currentTask && dom.taskInput) {
      dom.taskInput.value = activeState.currentTask;
    }

    // Subscribe to external state changes from GlobalTimer or other tabs
    if (typeof window.GlobalTimer !== 'undefined') {
      window.GlobalTimer.subscribe((updatedState) => {
        activeState = Object.assign({}, activeState, updatedState);
        loadSessions();
        renderAll();
      });
    }
  }

  function saveActiveState() {
    Storage.set('timer_active_state', activeState);
    if (typeof window.GlobalTimer !== 'undefined') {
      window.GlobalTimer.render();
    }
  }

  // ==========================================
  // 2. RENDERING PIPELINE
  // ==========================================

  function renderAll() {
    renderModeButtons();
    renderTimerDisplay();
    renderControls();
    renderCycleSteps();
    renderTodayStats();
    renderSessionsHistory();
    renderTaskDisplay();
  }

  function renderModeButtons() {
    if (!dom.modeBtns) return;
    dom.modeBtns.forEach(btn => {
      const mode = btn.getAttribute('data-mode');
      btn.classList.toggle('active', mode === activeState.mode);
    });
  }

  function renderTimerDisplay() {
    const timeStr = TimerData.formatTime(activeState.remainingSeconds);
    if (dom.timerTimeDisplay) dom.timerTimeDisplay.textContent = timeStr;
    document.title = `${timeStr} - DevPilot Focus Timer`;

    // Mode badge
    if (dom.timerModeBadge) {
      let label = 'Deep Work Focus';
      if (activeState.mode === 'shortBreak') label = 'Short Break Rest';
      if (activeState.mode === 'longBreak') label = 'Long Break Recovery';
      dom.timerModeBadge.textContent = label;
    }

    // SVG Progress Ring
    if (dom.timerCircleProgress) {
      const fraction = TimerData.calculateProgressFraction(
        activeState.remainingSeconds,
        activeState.durationSeconds
      );
      const strokeData = TimerData.calculateStrokeDashoffset(fraction, 120);

      dom.timerCircleProgress.style.strokeDasharray = `${strokeData.circumference} ${strokeData.circumference}`;
      dom.timerCircleProgress.style.strokeDashoffset = strokeData.offset;

      let color = '#4f46e5'; // Indigo
      if (activeState.mode === 'shortBreak') color = '#10b981'; // Emerald
      if (activeState.mode === 'longBreak') color = '#f59e0b'; // Amber
      dom.timerCircleProgress.style.stroke = color;
    }
  }

  function renderControls() {
    if (dom.btnTimerStart) {
      if (activeState.isRunning) {
        if (dom.timerStartText) dom.timerStartText.textContent = 'Pause';
        if (dom.timerStartIcon) dom.timerStartIcon.textContent = 'pause';
        dom.btnTimerStart.classList.remove('btn-primary');
        dom.btnTimerStart.classList.add('btn-secondary');
        if (dom.timerCircleContainer) dom.timerCircleContainer.classList.add('is-running');
      } else if (activeState.isPaused) {
        if (dom.timerStartText) dom.timerStartText.textContent = 'Resume';
        if (dom.timerStartIcon) dom.timerStartIcon.textContent = 'play_arrow';
        dom.btnTimerStart.classList.add('btn-primary');
        dom.btnTimerStart.classList.remove('btn-secondary');
        if (dom.timerCircleContainer) dom.timerCircleContainer.classList.remove('is-running');
      } else {
        let label = 'Start Focus';
        if (activeState.mode !== 'work') label = 'Start Break';
        if (dom.timerStartText) dom.timerStartText.textContent = label;
        if (dom.timerStartIcon) dom.timerStartIcon.textContent = 'play_arrow';
        dom.btnTimerStart.classList.add('btn-primary');
        dom.btnTimerStart.classList.remove('btn-secondary');
        if (dom.timerCircleContainer) dom.timerCircleContainer.classList.remove('is-running');
      }
    }
  }

  function renderCycleSteps() {
    const maxCycles = settings.sessionsBeforeLongBreak || 4;
    const current = Math.min(maxCycles, Math.max(1, activeState.cyclePosition || 1));

    if (dom.cycleFractionText) {
      dom.cycleFractionText.textContent = `Session ${current} of ${maxCycles}`;
    }

    if (dom.roundsIndicators) {
      let html = '';
      for (let i = 1; i <= maxCycles; i++) {
        let statusClass = '';
        let icon = 'radio_button_unchecked';

        if (i < current) {
          statusClass = 'completed';
          icon = 'check_circle';
        } else if (i === current) {
          statusClass = 'current';
          icon = 'radio_button_checked';
        }

        html += `
          <button type="button" class="cycle-step-pill ${statusClass}" data-cycle-step="${i}" title="Pomodoro Focus Session ${i} of ${maxCycles}">
            <span class="material-symbols-outlined text-[14px]">${icon}</span>
            <span>Focus ${i}</span>
          </button>
        `;
      }

      // Long break step
      const isLongBreak = activeState.mode === 'longBreak';
      html += `
        <button type="button" class="cycle-step-pill ${isLongBreak ? 'current' : ''}" data-cycle-mode="longBreak" title="Long Break Recovery">
          <span class="material-symbols-outlined text-[14px]">local_cafe</span>
          <span>Long Break</span>
        </button>
      `;

      dom.roundsIndicators.innerHTML = html;
    }
  }

  function renderTodayStats() {
    const stats = TimerData.calculateTodayStats(sessions);

    if (dom.completedRoundsCount) dom.completedRoundsCount.textContent = stats.todayFocusCount;
    if (dom.statTodaySessions) dom.statTodaySessions.textContent = stats.todayFocusCount;
    if (dom.statTodayMinutes) dom.statTodayMinutes.textContent = stats.todayFocusMinutes;
    if (dom.statCyclePosition) {
      dom.statCyclePosition.textContent = `${activeState.cyclePosition || 1} / ${settings.sessionsBeforeLongBreak || 4}`;
    }
    if (dom.statWeekSessions) dom.statWeekSessions.textContent = stats.weekFocusCount;
  }

  function renderSessionsHistory() {
    if (!dom.sessionsHistoryList) return;

    const stats = TimerData.calculateTodayStats(sessions);
    // STRICTLY FILTER: Only work sessions, never break or long break!
    const todaySessions = stats.todaySessionsList.filter(s => s && s.mode === 'work');

    if (todaySessions.length === 0) {
      dom.sessionsHistoryList.innerHTML = `
        <div class="text-center py-7 text-slate-400 bg-slate-50/70 border border-dashed border-slate-200 rounded-xl">
          <span class="material-symbols-outlined text-3xl mb-1 text-slate-400">hourglass_empty</span>
          <p class="text-xs font-semibold text-slate-600">No focus intervals completed yet today.</p>
          <p class="text-[11px] text-slate-400 mt-1">Type your focus task above and hit "Start Focus" to log real sessions!</p>
        </div>
      `;
      return;
    }

    dom.sessionsHistoryList.innerHTML = todaySessions.map(session => {
      const timeStr = TimerData.formatTimestamp(session.completedAt);
      const secs = session.durationSeconds || 1500;
      let durationBadge = '';
      let durSubtitle = '';

      if (secs < 60) {
        durationBadge = `+${secs}s Focus`;
        durSubtitle = `${secs} sec`;
      } else {
        const mins = Math.round(secs / 60);
        durationBadge = `+${mins}m Focus`;
        durSubtitle = `${mins} min`;
      }

      return `
        <div class="session-history-item group" data-id="${session.id}">
          <div class="flex items-center gap-2.5 flex-1 min-w-0">
            <span class="material-symbols-outlined text-emerald-600 text-lg shrink-0">check_circle</span>
            <div class="truncate">
              <p class="text-xs font-bold text-slate-800 truncate">${escapeHtml(session.task || 'Deep Work Focus')}</p>
              <p class="text-[11px] text-slate-400 mt-0.5">${durSubtitle} • ${timeStr}</p>
            </div>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <span class="text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
              ${durationBadge}
            </span>
            <button type="button" class="btn-delete-single-session text-slate-300 hover:text-rose-500 p-0.5 rounded transition-colors" data-id="${session.id}" title="Delete this session">
              <span class="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  function renderTaskDisplay() {
    const taskName = activeState.currentTask || (activeState.mode === 'work' ? 'Deep Work Focus' : (activeState.mode === 'shortBreak' ? 'Short Break' : 'Long Break'));

    if (dom.activeTaskDisplay && dom.activeTaskText) {
      if (activeState.currentTask) {
        dom.activeTaskText.textContent = activeState.currentTask;
        dom.activeTaskDisplay.classList.remove('hidden');
      } else {
        dom.activeTaskDisplay.classList.add('hidden');
      }
    }

    if (dom.focusModeTaskText) {
      dom.focusModeTaskText.textContent = taskName;
    }
  }

  // ==========================================
  // 3. TIMER ACTIONS (START, PAUSE, RESET, SKIP)
  // ==========================================

  function startTimer() {
    if (activeState.isRunning) return; // double-click protection

    // Capture task if user typed one
    if (dom.taskInput && dom.taskInput.value.trim()) {
      activeState.currentTask = dom.taskInput.value.trim();
    }

    if (typeof window.GlobalTimer !== 'undefined') {
      activeState = window.GlobalTimer.start(activeState.currentTask);
    } else {
      activeState.isRunning = true;
      activeState.isPaused = false;
      activeState.isFloatingHidden = false; // Reveal floating widget globally
      activeState.startTimestamp = Date.now();
      activeState.endTimestamp = Date.now() + (activeState.remainingSeconds * 1000);
      saveActiveState();
      startTicking();
    }

    renderControls();
    renderTaskDisplay();
    renderTimerDisplay();

    let label = 'Deep Work Focus';
    if (activeState.mode === 'shortBreak') label = 'Short Break';
    if (activeState.mode === 'longBreak') label = 'Long Break';
    showToast(`${label} started!`, 'info');
  }

  function pauseTimer() {
    if (!activeState.isRunning) return;

    if (typeof window.GlobalTimer !== 'undefined') {
      activeState = window.GlobalTimer.pause();
    } else {
      clearInterval(timerInterval);
      timerInterval = null;
      activeState.isRunning = false;
      activeState.isPaused = true;
      activeState.remainingSeconds = TimerData.calculateRemaining(activeState.endTimestamp);
      activeState.endTimestamp = null;
      saveActiveState();
    }

    renderControls();
    renderTimerDisplay();
    renderTaskDisplay();

    showToast('Timer paused', 'info');
  }

  function resetTimer() {
    if (typeof window.GlobalTimer !== 'undefined') {
      activeState = window.GlobalTimer.reset();
    } else {
      if (activeState.isRunning) pauseTimer();
      activeState.isRunning = false;
      activeState.isPaused = false;
      activeState.endTimestamp = null;
      activeState.remainingSeconds = activeState.durationSeconds;
      saveActiveState();
    }

    renderAll();
    showToast('Timer reset', 'info');
  }

  function skipTimer() {
    if (activeState.isRunning) pauseTimer();

    const maxCycles = settings.sessionsBeforeLongBreak || 4;
    const current = activeState.cyclePosition || 1;
    activeState.cyclePosition = current < maxCycles ? current + 1 : 1;
    activeState.mode = 'work';
    activeState.durationSeconds = (settings.focusDuration || 25) * 60;
    activeState.remainingSeconds = activeState.durationSeconds;
    activeState.isRunning = false;
    activeState.isPaused = false;
    activeState.endTimestamp = null;

    saveActiveState();
    renderAll();
    showToast(`Skipped to Focus ${activeState.cyclePosition} of ${maxCycles}`, 'info');
  }

  function setTimerMode(newMode, notify = true) {
    if (activeState.isRunning && notify) {
      if (!confirm('A session is actively running. Switch mode and reset?')) return;
    }

    if (typeof window.GlobalTimer !== 'undefined') {
      activeState = window.GlobalTimer.setMode(newMode);
    } else {
      let minutes = settings.focusDuration;
      if (newMode === 'shortBreak') minutes = settings.shortBreakDuration;
      if (newMode === 'longBreak') minutes = settings.longBreakDuration;

      activeState.mode = newMode;
      activeState.durationSeconds = minutes * 60;
      activeState.remainingSeconds = activeState.durationSeconds;
      activeState.isRunning = false;
      activeState.isPaused = false;
      activeState.endTimestamp = null;
      saveActiveState();
    }

    renderAll();
  }

  // ==========================================
  // 4. TICKING LOOP & ACCURATE TIME SYNCHRONIZATION
  // ==========================================

  function startTicking() {
    if (timerInterval) clearInterval(timerInterval);

    timerInterval = setInterval(() => {
      const remaining = TimerData.calculateRemaining(activeState.endTimestamp);
      activeState.remainingSeconds = remaining;
      renderTimerDisplay();

      if (remaining <= 0) {
        clearInterval(timerInterval);
        timerInterval = null;
        activeState.remainingSeconds = 0;
        activeState.isRunning = false;
        activeState.isPaused = false;
        activeState.endTimestamp = null;
        saveActiveState();
        handleTimerCompletion();
      }
    }, 250); // Frequent tick ensures smooth responsive display
  }

  function setupVisibilityListeners() {
    // Sync accurately whenever user returns to tab
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && activeState.isRunning && activeState.endTimestamp) {
        const remaining = TimerData.calculateRemaining(activeState.endTimestamp);
        activeState.remainingSeconds = remaining;
        renderTimerDisplay();
        if (remaining <= 0) {
          clearInterval(timerInterval);
          timerInterval = null;
          activeState.remainingSeconds = 0;
          activeState.isRunning = false;
          activeState.isPaused = false;
          activeState.endTimestamp = null;
          saveActiveState();
          handleTimerCompletion();
        }
      }
    });

    window.addEventListener('focus', () => {
      if (activeState.isRunning && activeState.endTimestamp) {
        const remaining = TimerData.calculateRemaining(activeState.endTimestamp);
        activeState.remainingSeconds = remaining;
        renderTimerDisplay();
      }
    });
  }

  // ==========================================
  // 5. SESSION COMPLETION & CYCLE ADVANCEMENT
  // ==========================================

  function handleTimerCompletion(customTaskName = null) {
    playChime();

    const wasWorkSession = activeState.mode === 'work';
    const taskName = customTaskName || 
                     (dom.taskInput && dom.taskInput.value.trim()) || 
                     activeState.currentTask || 
                     'Deep Work Focus';

    // 1. If focus mode finished, log real completed session
    if (wasWorkSession) {
      const completedSession = {
        id: `ts_${Date.now()}`,
        task: taskName,
        mode: 'work',
        durationSeconds: activeState.durationSeconds,
        completedAt: new Date().toISOString()
      };

      sessions.unshift(completedSession);
      saveSessions();
    }

    // 2. Compute next transition
    const transition = TimerData.getNextSessionTransition(
      activeState.mode,
      activeState.cyclePosition,
      settings.sessionsBeforeLongBreak
    );

    activeState.cyclePosition = transition.nextCycle;
    nextPendingTransition = transition;

    // Trigger notification
    triggerBrowserNotification(
      wasWorkSession ? 'Focus Session Complete! 🎉' : 'Break Finished! ☕',
      transition.message
    );

    renderAll();

    // 3. Auto-start or show completion modal
    if (settings.autoStart) {
      showToast(transition.message, 'success');
      setTimeout(() => {
        setTimerMode(transition.nextMode, false);
        startTimer();
      }, 1500);
    } else {
      showCompletionModal(transition, wasWorkSession);
    }
  }

  function completeSessionManually() {
    // 1. Guard against break logging: Breaks must NEVER be logged to Today's Sessions!
    if (activeState.mode !== 'work') {
      showToast('Break finished! Switched to Deep Work focus mode.', 'info');
      setTimerMode('work', false);
      resetTimer();
      return;
    }

    const typedTask = (dom.taskInput && dom.taskInput.value.trim()) || 
                      activeState.currentTask || 
                      'Deep Work Focus';

    activeState.currentTask = typedTask;

    // 2. Real-time Elapsed Duration:
    // Determine the exact number of seconds the user actually spent focusing!
    let elapsedSeconds = 0;
    if (activeState.isRunning && activeState.endTimestamp) {
      const remaining = TimerData.calculateRemaining(activeState.endTimestamp);
      const diff = activeState.durationSeconds - remaining;
      elapsedSeconds = diff > 0 ? diff : activeState.durationSeconds;
    } else if (activeState.isPaused && activeState.remainingSeconds < activeState.durationSeconds) {
      const diff = activeState.durationSeconds - activeState.remainingSeconds;
      elapsedSeconds = diff > 0 ? diff : activeState.durationSeconds;
    } else if (activeState.remainingSeconds === 0) {
      elapsedSeconds = activeState.durationSeconds;
    } else {
      // User clicked Complete & Log without running (manual full session logging)
      elapsedSeconds = activeState.durationSeconds || ((settings.focusDuration || 25) * 60);
    }

    if (activeState.isRunning) {
      pauseTimer();
    }

    // 3. Save to sessions with EXACT elapsed time (strictly 'work' mode, never breaks)
    const completedSession = {
      id: `ts_${Date.now()}`,
      task: typedTask,
      mode: 'work',
      durationSeconds: elapsedSeconds,
      completedAt: new Date().toISOString()
    };

    sessions.unshift(completedSession);
    saveSessions();

    // 4. Advance Cycle!
    const maxCycles = settings.sessionsBeforeLongBreak || 4;
    const currentCompleted = activeState.cyclePosition || 1;
    let nextCycle = currentCompleted + 1;
    let isFullCycleFinished = false;

    if (currentCompleted >= maxCycles) {
      isFullCycleFinished = true;
      nextCycle = 1; // Cycle complete, wrap back to 1
    }

    activeState.cyclePosition = nextCycle;

    // 5. Reset timer back to full focus duration ready for the next round (do NOT jump into breaks)
    activeState.mode = 'work';
    activeState.durationSeconds = (settings.focusDuration || 25) * 60;
    activeState.remainingSeconds = activeState.durationSeconds;
    activeState.isRunning = false;
    activeState.isPaused = false;
    activeState.endTimestamp = null;

    saveActiveState();
    playChime();
    renderAll();

    const formattedDur = elapsedSeconds < 60 ? `${elapsedSeconds}s` : `${Math.round(elapsedSeconds / 60)}m`;
    if (isFullCycleFinished) {
      showToast(`🎉 Full ${maxCycles}-session cycle complete! Saved "${typedTask}" (+${formattedDur} Focus).`, 'success');
    } else {
      showToast(`🎉 Session ${currentCompleted} logged (+${formattedDur} Focus)! Cycle advanced to Focus ${nextCycle} of ${maxCycles}.`, 'success');
    }
  }

  function showCompletionModal(transition, wasWork) {
    if (dom.completedModalTitle) {
      dom.completedModalTitle.textContent = wasWork
        ? '🎉 Focus Session Complete!'
        : '☕ Break Complete!';
    }
    if (dom.completedModalMsg) {
      dom.completedModalMsg.textContent = transition.message;
    }
    if (dom.btnModalStartNextText) {
      dom.btnModalStartNextText.textContent = `Start ${transition.label}`;
    }

    if (dom.modalSessionCompleted) {
      dom.modalSessionCompleted.classList.add('active');
    }
  }

  function closeCompletionModal() {
    if (dom.modalSessionCompleted) {
      dom.modalSessionCompleted.classList.remove('active');
    }
  }

  // ==========================================
  // 6. SYNTHETIC WEB AUDIO CHIME & NOTIFICATIONS
  // ==========================================

  /**
   * Generates a rich, pleasant 3-tone harmonic chime using Web Audio API.
   * Zero external MP3 files, zero 404s, works completely offline.
   */
  function playChime() {
    if (!settings.soundEnabled) return;
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;

      const ctx = new AudioContextClass();
      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5 major triad

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);

        gain.gain.setValueAtTime(0.001, ctx.currentTime + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + idx * 0.12 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.12 + 0.85);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.12);
        osc.stop(ctx.currentTime + idx * 0.12 + 0.9);
      });
    } catch (e) {
      console.warn('AudioContext chime error:', e);
    }
  }

  function triggerBrowserNotification(title, body) {
    if (!settings.notificationsEnabled) return;
    if (!('Notification' in window)) return;

    if (Notification.permission === 'granted') {
      try {
        new Notification(title, {
          body,
          icon: '../favicon.ico'
        });
      } catch (e) {}
    }
  }

  // ==========================================
  // 7. FULLSCREEN / FOCUS MODE & KEYBOARD SHORTCUTS
  // ==========================================

  function toggleFocusMode() {
    const isActive = document.body.classList.toggle('focus-mode-active');
    renderTaskDisplay();
    if (isActive) {
      showToast('Focus Mode activated (Press Esc to exit)', 'info');
      try {
        if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen().catch((err) => {
            console.warn('Fullscreen request rejected or unavailable:', err);
          });
        }
      } catch (e) {}
    } else {
      try {
        if (document.fullscreenElement && document.exitFullscreen) {
          document.exitFullscreen().catch(() => {});
        }
      } catch (e) {}
    }
    if (typeof window.GlobalTimer !== 'undefined') {
      window.GlobalTimer.render();
    }
  }

  function exitFocusMode() {
    if (!document.body.classList.contains('focus-mode-active')) return;
    document.body.classList.remove('focus-mode-active');
    try {
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    } catch (e) {}
    if (typeof window.GlobalTimer !== 'undefined') {
      window.GlobalTimer.render();
    }
    showToast('Exited Focus Mode', 'info');
  }

  function handleKeyboardShortcuts(e) {
    // Ignore when typing inside input or textarea
    const tag = e.target.tagName.toLowerCase();
    if (tag === 'input' || tag === 'textarea' || tag === 'select') return;

    if (e.code === 'Space') {
      e.preventDefault();
      if (activeState.isRunning) {
        pauseTimer();
      } else {
        startTimer();
      }
    } else if (e.code === 'KeyR') {
      e.preventDefault();
      resetTimer();
    } else if (e.code === 'KeyS') {
      e.preventDefault();
      skipTimer();
    } else if (e.code === 'Digit1') {
      e.preventDefault();
      setTimerMode('work');
    } else if (e.code === 'Digit2') {
      e.preventDefault();
      setTimerMode('shortBreak');
    } else if (e.code === 'Digit3') {
      e.preventDefault();
      setTimerMode('longBreak');
    } else if (e.code === 'KeyF') {
      e.preventDefault();
      toggleFocusMode();
    } else if (e.code === 'Escape') {
      if (document.body.classList.contains('focus-mode-active')) {
        exitFocusMode();
      }
      closeSettingsModal();
      closeCompletionModal();
      closeShortcutsModal();
    }
  }

  // ==========================================
  // 8. EVENT BINDINGS
  // ==========================================

  function bindEvents() {
    // Mode Buttons
    if (dom.modeBtns) {
      dom.modeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const mode = btn.getAttribute('data-mode');
          if (mode) setTimerMode(mode);
        });
      });
    }

    // Main Timer Buttons
    if (dom.btnTimerStart) {
      dom.btnTimerStart.addEventListener('click', () => {
        if (activeState.isRunning) {
          pauseTimer();
        } else {
          startTimer();
        }
      });
    }

    if (dom.btnTimerReset) dom.btnTimerReset.addEventListener('click', resetTimer);
    if (dom.btnTimerSkip) dom.btnTimerSkip.addEventListener('click', skipTimer);

    // Focus Mode
    if (dom.btnFocusMode) dom.btnFocusMode.addEventListener('click', toggleFocusMode);
    if (dom.btnExitFocusMode) dom.btnExitFocusMode.addEventListener('click', exitFocusMode);
    if (dom.btnExitFocusTop) dom.btnExitFocusTop.addEventListener('click', exitFocusMode);
    if (dom.btnExitFocusCenter) dom.btnExitFocusCenter.addEventListener('click', exitFocusMode);

    // Fullscreen exit sync (e.g. user pressed browser ESC)
    document.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement && document.body.classList.contains('focus-mode-active')) {
        document.body.classList.remove('focus-mode-active');
        if (typeof window.GlobalTimer !== 'undefined') {
          window.GlobalTimer.render();
        }
      }
    });

    // Complete & Log Session Button
    if (dom.btnTimerComplete) {
      dom.btnTimerComplete.addEventListener('click', completeSessionManually);
    }

    // Cycle Step Pills Interactive Switching
    if (dom.roundsIndicators) {
      dom.roundsIndicators.addEventListener('click', (e) => {
        const pill = e.target.closest('.cycle-step-pill');
        if (!pill) return;
        const step = pill.getAttribute('data-cycle-step');
        if (step) {
          const stepNum = parseInt(step, 10);
          activeState.cyclePosition = stepNum;
          setTimerMode('work', false);
          resetTimer();
          showToast(`Switched to Focus ${stepNum} of ${settings.sessionsBeforeLongBreak || 4}`, 'info');
        } else if (pill.getAttribute('data-cycle-mode') === 'longBreak') {
          setTimerMode('longBreak', false);
        }
      });
    }

    // Task Input & Suggestions
    if (dom.taskInput) {
      dom.taskInput.addEventListener('input', (e) => {
        const val = e.target.value;
        activeState.currentTask = val.trim();
        saveActiveState();
      });
    }

    if (dom.taskSuggestionsRow) {
      dom.taskSuggestionsRow.querySelectorAll('.task-suggestion-chip').forEach(btn => {
        btn.addEventListener('click', () => {
          const task = btn.getAttribute('data-task');
          if (task) {
            if (dom.taskInput) dom.taskInput.value = task;
            activeState.currentTask = task;
            saveActiveState();
            showToast(`Task set: "${task}"`, 'info');
          }
        });
      });
    }

    // Clear History
    if (dom.btnClearHistory) {
      dom.btnClearHistory.addEventListener('click', () => {
        if (confirm('Clear today\'s completed focus sessions history?')) {
          const todayStr = TimerData.formatDate(new Date());
          sessions = sessions.filter(s => TimerData.formatDate(s.completedAt) !== todayStr);
          saveSessions();
          renderTodayStats();
          renderSessionsHistory();
          showToast('Today\'s session history cleared', 'info');
        }
      });
    }

    // Single Session Deletion
    if (dom.sessionsHistoryList) {
      dom.sessionsHistoryList.addEventListener('click', (e) => {
        const delBtn = e.target.closest('.btn-delete-single-session');
        if (delBtn) {
          const id = delBtn.getAttribute('data-id');
          if (id) {
            sessions = sessions.filter(s => s.id !== id);
            saveSessions();
            showToast('Session removed', 'info');
          }
        }
      });
    }

    // Settings Modal
    if (dom.btnTimerSettings) dom.btnTimerSettings.addEventListener('click', openSettingsModal);
    if (dom.btnCloseSettings) dom.btnCloseSettings.addEventListener('click', closeSettingsModal);
    if (dom.btnCancelSettings) dom.btnCancelSettings.addEventListener('click', closeSettingsModal);

    if (dom.formTimerSettings) {
      dom.formTimerSettings.addEventListener('submit', (e) => {
        e.preventDefault();
        saveTimerSettingsFromForm();
      });
    }

    // Completion Modal
    if (dom.btnModalStartNext) {
      dom.btnModalStartNext.addEventListener('click', () => {
        closeCompletionModal();
        if (nextPendingTransition) {
          setTimerMode(nextPendingTransition.nextMode, false);
          startTimer();
          nextPendingTransition = null;
        }
      });
    }

    if (dom.btnModalSkipNext) {
      dom.btnModalSkipNext.addEventListener('click', () => {
        closeCompletionModal();
        if (nextPendingTransition) {
          setTimerMode(nextPendingTransition.nextMode, false);
          nextPendingTransition = null;
        }
      });
    }

    // Shortcuts Modal
    if (dom.btnShortcuts) dom.btnShortcuts.addEventListener('click', openShortcutsModal);
    if (dom.btnCloseShortcuts) dom.btnCloseShortcuts.addEventListener('click', closeShortcutsModal);

    // Keyboard Shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
  }

  // ==========================================
  // 9. MODAL HANDLERS
  // ==========================================

  function openSettingsModal() {
    if (dom.settingFocusDur) dom.settingFocusDur.value = settings.focusDuration;
    if (dom.settingShortDur) dom.settingShortDur.value = settings.shortBreakDuration;
    if (dom.settingLongDur) dom.settingLongDur.value = settings.longBreakDuration;
    if (dom.settingCycles) dom.settingCycles.value = settings.sessionsBeforeLongBreak;
    if (dom.settingSound) dom.settingSound.checked = settings.soundEnabled;
    if (dom.settingNotifications) dom.settingNotifications.checked = settings.notificationsEnabled;
    if (dom.settingAutostart) dom.settingAutostart.checked = settings.autoStart;

    if (dom.modalTimerSettings) dom.modalTimerSettings.classList.add('active');
  }

  function closeSettingsModal() {
    if (dom.modalTimerSettings) dom.modalTimerSettings.classList.remove('active');
  }

  function saveTimerSettingsFromForm() {
    const focusDur = TimerData.validateDuration(dom.settingFocusDur.value, 1, 90, 25);
    const shortDur = TimerData.validateDuration(dom.settingShortDur.value, 1, 30, 5);
    const longDur = TimerData.validateDuration(dom.settingLongDur.value, 1, 60, 15);
    const cycles = parseInt(dom.settingCycles.value, 10) || 4;

    const sound = dom.settingSound ? dom.settingSound.checked : true;
    const autoStart = dom.settingAutostart ? dom.settingAutostart.checked : false;
    let notifications = dom.settingNotifications ? dom.settingNotifications.checked : false;

    // Request notification permission if user enabled it
    if (notifications && 'Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().then(perm => {
        if (perm !== 'granted') {
          showToast('Notification permission not granted', 'warning');
        }
      });
    }

    settings.focusDuration = focusDur;
    settings.shortBreakDuration = shortDur;
    settings.longBreakDuration = longDur;
    settings.sessionsBeforeLongBreak = cycles;
    settings.soundEnabled = sound;
    settings.notificationsEnabled = notifications;
    settings.autoStart = autoStart;

    saveSettings();
    closeSettingsModal();

    // If timer is not currently running, update duration immediately
    if (!activeState.isRunning) {
      let currentMinutes = settings.focusDuration;
      if (activeState.mode === 'shortBreak') currentMinutes = settings.shortBreakDuration;
      if (activeState.mode === 'longBreak') currentMinutes = settings.longBreakDuration;

      activeState.durationSeconds = currentMinutes * 60;
      activeState.remainingSeconds = activeState.durationSeconds;
      saveActiveState();
      renderAll();
    }

    showToast('Timer preferences saved', 'success');
  }

  function openShortcutsModal() {
    if (dom.modalShortcuts) dom.modalShortcuts.classList.add('active');
  }

  function closeShortcutsModal() {
    if (dom.modalShortcuts) dom.modalShortcuts.classList.remove('active');
  }

  function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

})();
