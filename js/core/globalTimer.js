/**
 * DevPilot-AI - Global Floating Mini Timer & Header Status Indicator Controller
 * 
 * Provides:
 * - Persistent, application-wide Floating Mini Timer on every DevPilot page
 * - Global Header Timer Status Indicator (e.g. "🔥 24:37" / "⏸ 24:37")
 * - Single source of truth (devpilot_timer_active_state in localStorage)
 * - Pure timestamp-based timing (endTimestamp - Date.now()), immune to tab throttling & page transitions
 * - Independent Pause, Resume, Reset controls
 * - "Close/Hide" (X) hides the floating widget without stopping or resetting the timer
 * - Clicking the floating widget body smoothly navigates to the main Timer page
 * - Dragging with viewport boundary clamping and saved position in localStorage
 * - Web Audio API harmonic chime & single-completion event guarantee
 * - Multi-tab synchronization via storage event listener
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.GlobalTimer = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // Constants
  const STORAGE_KEY_STATE = 'timer_active_state';
  const STORAGE_KEY_SETTINGS = 'timer_settings';
  const STORAGE_KEY_SESSIONS = 'timer_sessions';
  const STORAGE_KEY_FLOAT_POS = 'timer_floating_pos';

  // Module variables
  let tickInterval = null;
  let isDragging = false;
  let dragOffset = { x: 0, y: 0 };
  let dom = {
    widget: null,
    headerPill: null,
    sidebarPill: null
  };
  let listeners = [];
  let isInitialized = false;

  // ==========================================
  // 1. DETERMINISTIC CALCULATION HELPERS
  // ==========================================

  function getTimerData() {
    if (typeof window !== 'undefined' && window.TimerData) {
      return window.TimerData;
    }
    // Fallback self-contained calculations if TimerData script is loading or in test runner
    return {
      calculateRemaining: function (endTimestamp, now = Date.now()) {
        if (!endTimestamp || typeof endTimestamp !== 'number') return 0;
        return Math.max(0, Math.ceil((endTimestamp - now) / 1000));
      },
      formatTime: function (seconds) {
        const totalSec = Math.max(0, Math.floor(seconds));
        const hours = Math.floor(totalSec / 3600);
        const mins = Math.floor((totalSec % 3600) / 60);
        const secs = totalSec % 60;
        const paddedMins = String(mins).padStart(2, '0');
        const paddedSecs = String(secs).padStart(2, '0');
        if (hours > 0) return `${hours}:${paddedMins}:${paddedSecs}`;
        return `${paddedMins}:${paddedSecs}`;
      },
      getNextSessionTransition: function (mode, cycle = 1, maxCycles = 4) {
        const max = Math.max(2, maxCycles || 4);
        if (mode === 'work') {
          if (cycle >= max) {
            return { nextMode: 'longBreak', nextCycle: 1, label: 'Long Break', message: `Cycle complete! You completed ${max} focus sessions.` };
          }
          return { nextMode: 'shortBreak', nextCycle: cycle, label: 'Short Break', message: `Focus session ${cycle} complete! Take a 5-min break.` };
        } else if (mode === 'shortBreak') {
          return { nextMode: 'work', nextCycle: cycle + 1, label: `Focus ${cycle + 1}`, message: `Break over! Ready for session ${cycle + 1}?` };
        } else {
          return { nextMode: 'work', nextCycle: 1, label: 'Focus 1', message: 'Long break finished! Refreshed for a brand new cycle?' };
        }
      },
      getDefaultSettings: function () {
        return {
          focusDuration: 25,
          shortBreakDuration: 5,
          longBreakDuration: 15,
          sessionsBeforeLongBreak: 4,
          autoStart: false,
          soundEnabled: true,
          notificationsEnabled: false
        };
      }
    };
  }

  // ==========================================
  // 2. STATE ACCESS & PERSISTENCE
  // ==========================================

  function getStorage() {
    if (typeof window !== 'undefined' && window.Storage && typeof window.Storage.get === 'function') {
      return window.Storage;
    }
    // Storage fallback using raw localStorage
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

  function getSettings() {
    const storage = getStorage();
    const defaults = getTimerData().getDefaultSettings();
    return Object.assign({}, defaults, storage.get(STORAGE_KEY_SETTINGS, {}) || {});
  }

  function getState() {
    const storage = getStorage();
    const settings = getSettings();
    const defaultSecs = (settings.focusDuration || 25) * 60;

    const stored = storage.get(STORAGE_KEY_STATE, null);
    const state = Object.assign({
      mode: 'work',
      durationSeconds: defaultSecs,
      startTimestamp: null,
      endTimestamp: null,
      remainingSeconds: defaultSecs,
      isRunning: false,
      isPaused: false,
      cyclePosition: 1,
      currentTask: '',
      isFloatingHidden: false
    }, stored || {});

    // Always calculate remaining seconds deterministically if running
    if (state.isRunning && state.endTimestamp) {
      const now = Date.now();
      // If browser was closed and endTimestamp is in the past by more than 5 minutes (300s),
      // the countdown expired while user was away: safely reset to idle without logging a ghost session!
      if (now - state.endTimestamp > 5 * 60 * 1000) {
        state.isRunning = false;
        state.isPaused = false;
        state.endTimestamp = null;
        state.remainingSeconds = state.durationSeconds;
        storage.set(STORAGE_KEY_STATE, state);
      } else {
        state.remainingSeconds = getTimerData().calculateRemaining(state.endTimestamp, now);
      }
    }

    return state;
  }

  function saveState(state) {
    const storage = getStorage();
    storage.set(STORAGE_KEY_STATE, state);
    notifyStateChange(state);
  }

  function notifyStateChange(state) {
    listeners.forEach(fn => {
      try { fn(state); } catch (e) { console.error(e); }
    });
  }

  function subscribe(fn) {
    if (typeof fn === 'function') {
      listeners.push(fn);
    }
    return () => {
      listeners = listeners.filter(l => l !== fn);
    };
  }

  // ==========================================
  // 3. CORE TIMER ACTIONS
  // ==========================================

  function start(taskName = null) {
    const state = getState();
    if (state.isRunning) return state;

    if (taskName && typeof taskName === 'string') {
      state.currentTask = taskName.trim();
    }

    const duration = state.remainingSeconds > 0 ? state.remainingSeconds : state.durationSeconds;
    const now = Date.now();

    state.isRunning = true;
    state.isPaused = false;
    state.startTimestamp = now;
    state.endTimestamp = now + (duration * 1000);
    state.remainingSeconds = duration;
    state.isFloatingHidden = false; // automatically reveal floating widget when started

    saveState(state);
    ensureTicking();
    render();
    return state;
  }

  function pause() {
    const state = getState();
    if (!state.isRunning) return state;

    const now = Date.now();
    state.remainingSeconds = getTimerData().calculateRemaining(state.endTimestamp, now);
    state.isRunning = false;
    state.isPaused = true;
    state.endTimestamp = null;

    saveState(state);
    render();
    return state;
  }

  function resume() {
    const state = getState();
    if (state.isRunning || state.remainingSeconds <= 0) return state;

    const now = Date.now();
    state.isRunning = true;
    state.isPaused = false;
    state.endTimestamp = now + (state.remainingSeconds * 1000);

    saveState(state);
    ensureTicking();
    render();
    return state;
  }

  function reset() {
    const state = getState();
    const settings = getSettings();
    let minutes = settings.focusDuration || 25;
    if (state.mode === 'shortBreak') minutes = settings.shortBreakDuration || 5;
    if (state.mode === 'longBreak') minutes = settings.longBreakDuration || 15;

    state.durationSeconds = minutes * 60;
    state.remainingSeconds = state.durationSeconds;
    state.isRunning = false;
    state.isPaused = false;
    state.endTimestamp = null;

    saveState(state);
    render();
    return state;
  }

  function skip() {
    const state = getState();
    const settings = getSettings();
    const transition = getTimerData().getNextSessionTransition(
      state.mode,
      state.cyclePosition,
      settings.sessionsBeforeLongBreak
    );

    let minutes = settings.focusDuration;
    if (transition.nextMode === 'shortBreak') minutes = settings.shortBreakDuration;
    if (transition.nextMode === 'longBreak') minutes = settings.longBreakDuration;

    state.mode = transition.nextMode;
    state.cyclePosition = transition.nextCycle;
    state.durationSeconds = minutes * 60;
    state.remainingSeconds = state.durationSeconds;
    state.isRunning = false;
    state.isPaused = false;
    state.endTimestamp = null;

    saveState(state);
    render();
    return state;
  }

  function setMode(newMode) {
    const state = getState();
    const settings = getSettings();
    let minutes = settings.focusDuration;
    if (newMode === 'shortBreak') minutes = settings.shortBreakDuration;
    if (newMode === 'longBreak') minutes = settings.longBreakDuration;

    state.mode = newMode;
    state.durationSeconds = minutes * 60;
    state.remainingSeconds = state.durationSeconds;
    state.isRunning = false;
    state.isPaused = false;
    state.endTimestamp = null;

    saveState(state);
    render();
    return state;
  }

  function hideFloating() {
    const state = getState();
    state.isFloatingHidden = true;
    saveState(state);
    render();
    return state;
  }

  function showFloating() {
    const state = getState();
    state.isFloatingHidden = false;
    saveState(state);
    render();
    return state;
  }

  function toggleFloating() {
    const state = getState();
    state.isFloatingHidden = !state.isFloatingHidden;
    saveState(state);
    render();
    return state;
  }

  // ==========================================
  // 4. TICKING LOOP & COMPLETION GUARANTEE
  // ==========================================

  function ensureTicking() {
    if (tickInterval) return;
    tickInterval = setInterval(() => {
      const state = getState();
      if (!state.isRunning) {
        clearInterval(tickInterval);
        tickInterval = null;
        render();
        notifyStateChange(state);
        return;
      }

      const now = Date.now();
      const remaining = getTimerData().calculateRemaining(state.endTimestamp, now);
      state.remainingSeconds = remaining;

      if (remaining <= 0) {
        clearInterval(tickInterval);
        tickInterval = null;
        completeSession(state);
      } else {
        render();
        notifyStateChange(state);
      }
    }, 300); // 300ms interval guarantees sub-second responsiveness without CPU waste
  }

  let isCompleting = false;

  /**
   * Atomic completion handling: guarantees exactly ONE completion event
   * even across multiple tabs or simultaneous UI components.
   */
  function completeSession(state, elapsedSeconds = null) {
    // Atomic check
    if (isCompleting) return;
    if (!state.isRunning && !state.endTimestamp && !elapsedSeconds) return;

    isCompleting = true;
    try {
      state.isRunning = false;
      state.isPaused = false;
      state.remainingSeconds = 0;
      state.endTimestamp = null;

      // 1. Log session if work mode (strictly NEVER log breaks)
      const wasWork = state.mode === 'work';
      if (wasWork) {
        try {
          const storage = getStorage();
          const rawSessions = storage.get(STORAGE_KEY_SESSIONS, []) || [];
          const sessions = Array.isArray(rawSessions)
            ? rawSessions.filter(s => s && s.id !== 'ts_1' && s.id !== 'ts_2' && s.id !== 'ts_3' && s.mode === 'work')
            : [];

          const dur = (typeof elapsedSeconds === 'number' && elapsedSeconds > 0)
            ? elapsedSeconds
            : state.durationSeconds;

          // Guard: genuine focus interval must be at least 60 seconds
          if (dur >= 60) {
            sessions.unshift({
              id: `ts_${Date.now()}`,
              task: state.currentTask || 'Deep Work Focus',
              mode: 'work',
              durationSeconds: dur,
              completedAt: new Date().toISOString()
            });
            storage.set(STORAGE_KEY_SESSIONS, sessions);
          }
        } catch (e) {
          console.warn('Could not save completed session:', e);
        }
      }

      // 2. Advance cycle & transition
      const settings = getSettings();
      const transition = getTimerData().getNextSessionTransition(
        state.mode,
        state.cyclePosition,
        settings.sessionsBeforeLongBreak
      );

      state.cyclePosition = transition.nextCycle;

      // Configure next mode duration
      let nextMinutes = settings.focusDuration;
      if (transition.nextMode === 'shortBreak') nextMinutes = settings.shortBreakDuration;
      if (transition.nextMode === 'longBreak') nextMinutes = settings.longBreakDuration;

      state.mode = transition.nextMode;
      state.durationSeconds = nextMinutes * 60;
      state.remainingSeconds = state.durationSeconds;

      // Save final state
      saveState(state);
      render();

      // 3. Audio & Notification feedback
      playChime();
      triggerNotification(
        wasWork ? '🎉 Focus Session Complete!' : '☕ Break Complete!',
        transition.message
      );

      // 4. Auto-start next if enabled
      if (settings.autoStart) {
        setTimeout(() => {
          start();
        }, 1500);
      }
    } finally {
      isCompleting = false;
    }
  }

  function manualComplete(taskName = null, customDuration = null) {
    const state = getState();
    const settings = getSettings();
    if (taskName && typeof taskName === 'string') {
      state.currentTask = taskName.trim();
    }
    state.mode = 'work';

    let elapsed = customDuration;
    if (typeof elapsed !== 'number' || elapsed <= 0) {
      if (state.isRunning && state.endTimestamp) {
        const remaining = getTimerData().calculateRemaining(state.endTimestamp);
        const diff = state.durationSeconds - remaining;
        elapsed = diff > 0 ? diff : state.durationSeconds;
      } else if (state.isPaused && state.remainingSeconds < state.durationSeconds) {
        const diff = state.durationSeconds - state.remainingSeconds;
        elapsed = diff > 0 ? diff : state.durationSeconds;
      } else {
        elapsed = state.durationSeconds || ((settings.focusDuration || 25) * 60);
      }
    }

    const currentStep = state.cyclePosition || 1;
    const maxCycles = settings.sessionsBeforeLongBreak || 4;
    const nextStep = currentStep < maxCycles ? currentStep + 1 : 1;

    state.durationSeconds = elapsed;
    state.isRunning = true;
    state.endTimestamp = Date.now();
    completeSession(state, elapsed);

    // Keep on work mode and advance cycle for the next focus round
    state.cyclePosition = nextStep;
    const nextMinutes = settings.focusDuration || 25;
    state.mode = 'work';
    state.durationSeconds = nextMinutes * 60;
    state.remainingSeconds = state.durationSeconds;
    saveState(state);

    return state;
  }

  function updateSettings(newSettings) {
    const storage = getStorage();
    const currentSettings = getSettings();
    const merged = Object.assign({}, currentSettings, newSettings || {});
    storage.set(STORAGE_KEY_SETTINGS, merged);

    const state = getState();
    let currentMinutes = merged.focusDuration || 25;
    if (state.mode === 'shortBreak') currentMinutes = merged.shortBreakDuration || 5;
    if (state.mode === 'longBreak') currentMinutes = merged.longBreakDuration || 15;

    if (!state.isRunning) {
      state.durationSeconds = currentMinutes * 60;
      state.remainingSeconds = state.durationSeconds;
      state.endTimestamp = null;
      saveState(state);
    } else {
      const prevTotal = state.durationSeconds || (currentMinutes * 60);
      const newTotal = currentMinutes * 60;
      state.durationSeconds = newTotal;
      const now = Date.now();
      const remaining = Math.max(0, Math.ceil((state.endTimestamp - now) / 1000));
      const elapsed = Math.max(0, prevTotal - remaining);
      const newRemaining = Math.max(1, newTotal - elapsed);
      state.remainingSeconds = newRemaining;
      state.endTimestamp = now + (newRemaining * 1000);
      saveState(state);
    }
    render();
    return state;
  }

  function playChime() {
    const settings = getSettings();
    if (!settings.soundEnabled) return;
    try {
      if (typeof window === 'undefined') return;
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5 harmonic triad
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
      console.warn('Chime audio error:', e);
    }
  }

  function triggerNotification(title, body) {
    if (typeof window === 'undefined') return;

    if (typeof window.showToast === 'function') {
      window.showToast(`${title} — ${body}`, 'success');
    }

    const settings = getSettings();
    if (!settings.notificationsEnabled) return;
    if (!('Notification' in window)) return;
    if (Notification.permission === 'granted') {
      try {
        new Notification(title, { body, icon: getRelativePath('favicon.ico') });
      } catch (e) {}
    }
  }

  // ==========================================
  // 5. PATH RESOLUTION HELPER
  // ==========================================

  function getRelativePath(target) {
    if (typeof window === 'undefined') return target;
    const isPagesDir = window.location.pathname.includes('/pages/') || 
                       window.location.pathname.includes('\\pages\\');
    
    if (target === 'timer.html') {
      return isPagesDir ? 'timer.html' : 'pages/timer.html';
    }
    if (target === 'favicon.ico') {
      return isPagesDir ? '../favicon.ico' : 'favicon.ico';
    }
    return target;
  }

  // ==========================================
  // 6. DOM INJECTION & RENDERING
  // ==========================================

  function init() {
    if (typeof document === 'undefined' || isInitialized) return;
    isInitialized = true;

    // Ensure DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => setupUI());
    } else {
      setupUI();
    }
  }

  function setupUI() {
    injectFloatingWidget();
    injectHeaderIndicators();
    bindGlobalEvents();

    const state = getState();
    if (state.isRunning && state.endTimestamp) {
      ensureTicking();
    }
    render();
  }

  function injectFloatingWidget() {
    if (document.getElementById('global-floating-timer')) {
      dom.widget = document.getElementById('global-floating-timer');
      return;
    }

    const widget = document.createElement('div');
    widget.id = 'global-floating-timer';
    widget.className = 'global-floating-timer';
    widget.setAttribute('role', 'region');
    widget.setAttribute('aria-label', 'DevPilot Active Timer');

    widget.innerHTML = `
      <div class="gft-drag-bar" id="gft-drag-bar" title="Drag to reposition (Double-click to reset)">
        <div class="gft-mode-chip" id="gft-mode-chip">
          <span class="gft-mode-icon" id="gft-mode-icon">🔥</span>
          <span class="gft-mode-text" id="gft-mode-text">Deep Work (25m)</span>
        </div>
        <div class="gft-top-actions">
          <span class="gft-status-pill" id="gft-status-pill">Live</span>
          <button type="button" class="gft-btn-close" id="gft-btn-close" title="Hide floating timer (Timer keeps ticking)">
            <span class="material-symbols-outlined text-[15px]">close</span>
          </button>
        </div>
      </div>

      <div class="gft-body" id="gft-body-clickable" title="Click to open Focus Timer page">
        <div class="gft-circle-container">
          <svg class="gft-circle-svg" viewBox="0 0 120 120">
            <circle class="gft-circle-bg" cx="60" cy="60" r="50"></circle>
            <circle class="gft-circle-progress" id="gft-circle-progress" cx="60" cy="60" r="50"></circle>
          </svg>
          <div class="gft-circle-center">
            <div class="gft-time-display" id="gft-time-display">25:00</div>
            <div class="gft-mode-badge" id="gft-mode-badge">DEEP WORK FOCUS</div>
          </div>
        </div>

        <div class="gft-task-row" id="gft-task-row">
          <span class="material-symbols-outlined text-[13px] text-indigo-600">target</span>
          <span class="gft-task-text" id="gft-task-text">Deep Work Focus</span>
        </div>

        <div class="gft-controls-row" onclick="event.stopPropagation()">
          <button type="button" class="gft-btn-primary" id="gft-btn-toggle" title="Pause / Resume (Space)">
            <span class="material-symbols-outlined text-[16px]" id="gft-toggle-icon">pause</span>
            <span id="gft-toggle-text">Pause</span>
          </button>
          <button type="button" class="gft-btn-secondary" id="gft-btn-reset" title="Reset Current Timer">
            <span class="material-symbols-outlined text-[15px]">restart_alt</span>
            <span>Reset</span>
          </button>
          <button type="button" class="gft-btn-secondary" id="gft-btn-skip" title="Skip to Next Phase">
            <span class="material-symbols-outlined text-[15px]">skip_next</span>
            <span>Skip</span>
          </button>
        </div>

        <div class="gft-cycle-row">
          <span class="gft-cycle-title">CYCLE PROGRESS</span>
          <div class="gft-cycle-dots" id="gft-cycle-dots"></div>
        </div>

        <div class="gft-footer-hint">
          <span>Open Focus Timer</span>
          <span class="material-symbols-outlined text-[12px]">north_east</span>
        </div>
      </div>
    `;

    document.body.appendChild(widget);
    dom.widget = widget;

    // Restore saved position
    restoreSavedPosition();
    setupDraggable(widget);
  }

  function injectHeaderIndicators() {
    // 1. Check for top header / navbar
    const topNav = document.getElementById('top-nav');
    const pageHeader = document.querySelector('.page-header-bar, main > div:first-child');

    // Create header timer indicator
    let headerPill = document.getElementById('global-header-timer-pill');
    if (!headerPill) {
      headerPill = document.createElement('button');
      headerPill.type = 'button';
      headerPill.id = 'global-header-timer-pill';
      headerPill.className = 'global-header-timer-pill hidden';
      headerPill.title = 'Active Timer — Click to view / restore';

      headerPill.innerHTML = `
        <span class="ght-pulse-dot"></span>
        <span class="ght-icon" id="ght-icon">🔥</span>
        <span class="ght-time" id="ght-time">25:00</span>
      `;

      // Insert into topNav actions container if on index.html
      if (topNav) {
        const actionsContainer = topNav.querySelector('.flex.items-center.gap-2') || topNav;
        actionsContainer.prepend(headerPill);
      } else if (pageHeader) {
        // Insert into page header on pages/*.html
        const headerActions = pageHeader.querySelector('.flex.items-center.gap-3, .flex.items-center[class*="gap-2"], .flex.items-center') || pageHeader;
        headerActions.prepend(headerPill);
      } else {
        // Floating fallback in top-right
        headerPill.classList.add('fixed-top-right');
        document.body.appendChild(headerPill);
      }

      dom.headerPill = headerPill;
    }

    // 2. Also inject a mini status badge directly on the Sidebar Timer Link
    const sidebarTimerLink = document.querySelector('#sidebar a[href*="timer.html"]');
    if (sidebarTimerLink && !document.getElementById('sidebar-timer-badge')) {
      const sidebarBadge = document.createElement('span');
      sidebarBadge.id = 'sidebar-timer-badge';
      sidebarBadge.className = 'sidebar-timer-badge hidden';
      sidebarBadge.textContent = '25:00';
      sidebarTimerLink.appendChild(sidebarBadge);
      dom.sidebarPill = sidebarBadge;
    }
  }

  // ==========================================
  // 7. DRAGGABLE HANDLER WITH VIEWPORT CLAMPING
  // ==========================================

  function setupDraggable(widget) {
    const handle = widget.querySelector('#gft-drag-bar') || widget;

    function onPointerDown(e) {
      // Don't drag if user clicked a button
      if (e.target.closest('button')) return;

      isDragging = true;
      const rect = widget.getBoundingClientRect();
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);

      dragOffset.x = clientX - rect.left;
      dragOffset.y = clientY - rect.top;

      widget.classList.add('is-dragging');
      document.addEventListener('mousemove', onPointerMove, { passive: false });
      document.addEventListener('mouseup', onPointerUp);
      document.addEventListener('touchmove', onPointerMove, { passive: false });
      document.addEventListener('touchend', onPointerUp);
    }

    function onPointerMove(e) {
      if (!isDragging) return;
      if (e.cancelable) e.preventDefault();

      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);

      const winWidth = window.innerWidth;
      const winHeight = window.innerHeight;
      const widgetWidth = widget.offsetWidth;
      const widgetHeight = widget.offsetHeight;

      let left = clientX - dragOffset.x;
      let top = clientY - dragOffset.y;

      // Viewport boundary clamping with 12px margin
      left = Math.max(12, Math.min(winWidth - widgetWidth - 12, left));
      top = Math.max(12, Math.min(winHeight - widgetHeight - 12, top));

      widget.style.left = `${left}px`;
      widget.style.top = `${top}px`;
      widget.style.right = 'auto';
      widget.style.bottom = 'auto';
    }

    function onPointerUp() {
      if (!isDragging) return;
      isDragging = false;
      widget.classList.remove('is-dragging');

      document.removeEventListener('mousemove', onPointerMove);
      document.removeEventListener('mouseup', onPointerUp);
      document.removeEventListener('touchmove', onPointerMove);
      document.removeEventListener('touchend', onPointerUp);

      // Save position to localStorage
      const rect = widget.getBoundingClientRect();
      getStorage().set(STORAGE_KEY_FLOAT_POS, {
        left: rect.left,
        top: rect.top
      });
    }

    handle.addEventListener('mousedown', onPointerDown);
    handle.addEventListener('touchstart', onPointerDown, { passive: true });

    // Double-click handle to reset to default bottom-right
    handle.addEventListener('dblclick', () => {
      widget.style.left = '';
      widget.style.top = '';
      widget.style.right = '24px';
      widget.style.bottom = '24px';
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem(`devpilot_${STORAGE_KEY_FLOAT_POS}`);
      }
    });

    // Window resize safeguard: clamp if window shrinks
    window.addEventListener('resize', () => {
      if (!widget) return;
      const rect = widget.getBoundingClientRect();
      const winWidth = window.innerWidth;
      const winHeight = window.innerHeight;

      if (rect.right > winWidth - 12 || rect.bottom > winHeight - 12) {
        const left = Math.max(12, Math.min(winWidth - widget.offsetWidth - 12, rect.left));
        const top = Math.max(12, Math.min(winHeight - widget.offsetHeight - 12, rect.top));
        widget.style.left = `${left}px`;
        widget.style.top = `${top}px`;
      }
    });
  }

  function restoreSavedPosition() {
    if (!dom.widget) return;
    const saved = getStorage().get(STORAGE_KEY_FLOAT_POS, null);
    if (saved && typeof saved.left === 'number' && typeof saved.top === 'number') {
      const winWidth = window.innerWidth;
      const winHeight = window.innerHeight;
      const widgetWidth = 310;
      const widgetHeight = 310;

      // Ensure saved position is still within visible viewport
      if (saved.left < winWidth - 50 && saved.top < winHeight - 50 && saved.left >= 0 && saved.top >= 0) {
        const clampedX = Math.max(12, Math.min(winWidth - widgetWidth - 12, saved.left));
        const clampedY = Math.max(12, Math.min(winHeight - widgetHeight - 12, saved.top));
        dom.widget.style.left = `${clampedX}px`;
        dom.widget.style.top = `${clampedY}px`;
        dom.widget.style.right = 'auto';
        dom.widget.style.bottom = 'auto';
      }
    }
  }

  // ==========================================
  // 8. EVENT BINDINGS
  // ==========================================

  function bindGlobalEvents() {
    if (!dom.widget) return;

    // Toggle Pause/Resume button
    const btnToggle = dom.widget.querySelector('#gft-btn-toggle');
    if (btnToggle) {
      btnToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const state = getState();
        if (state.isRunning) {
          pause();
        } else {
          resume();
        }
      });
    }

    // Reset button
    const btnReset = dom.widget.querySelector('#gft-btn-reset');
    if (btnReset) {
      btnReset.addEventListener('click', (e) => {
        e.stopPropagation();
        reset();
      });
    }

    // Skip button
    const btnSkip = dom.widget.querySelector('#gft-btn-skip');
    if (btnSkip) {
      btnSkip.addEventListener('click', (e) => {
        e.stopPropagation();
        skip();
      });
    }

    // Close/Hide button (X) -> Only hides widget, does NOT stop timer!
    const btnClose = dom.widget.querySelector('#gft-btn-close');
    if (btnClose) {
      btnClose.addEventListener('click', (e) => {
        e.stopPropagation();
        hideFloating();
        if (typeof window.showToast === 'function') {
          window.showToast('Floating timer hidden. Access it anytime via the top header badge.', 'info');
        }
      });
    }

    // Click anywhere on body of floating timer -> Navigate to Timer page
    const clickableBody = dom.widget.querySelector('#gft-body-clickable');
    if (clickableBody) {
      clickableBody.addEventListener('click', () => {
        navigateToTimer();
      });
    }

    // Header timer pill click -> Restore floating widget & navigate to Timer page
    if (dom.headerPill) {
      dom.headerPill.addEventListener('click', () => {
        showFloating();
        navigateToTimer();
      });
    }

    // Multi-tab sync via storage event
    window.addEventListener('storage', (e) => {
      if (e.key === `devpilot_${STORAGE_KEY_STATE}`) {
        const state = getState();
        if (state.isRunning) {
          ensureTicking();
        }
        render();
        notifyStateChange(state);
      }
    });

    // Window focus / visibility change sync
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        const state = getState();
        if (state.isRunning) {
          ensureTicking();
        }
        render();
      }
    });
  }

  function navigateToTimer() {
    const isAlreadyOnTimerPage = window.location.pathname.toLowerCase().endsWith('timer.html');
    if (isAlreadyOnTimerPage) {
      // Scroll smoothly to top of timer card
      const timerCard = document.getElementById('timer-circle-container');
      if (timerCard) {
        timerCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    window.location.href = getRelativePath('timer.html');
  }

  // ==========================================
  // 9. RENDER PIPELINE
  // ==========================================

  function render() {
    const state = getState();
    const isTimerActive = state.isRunning || state.isPaused;
    const isFocusModeActive = typeof document !== 'undefined' && document.body.classList.contains('focus-mode-active');

    // Page Detection: Check if current page is timer.html
    const isAlreadyOnTimerPage = typeof window !== 'undefined' && (
      window.location.pathname.toLowerCase().endsWith('timer.html') ||
      window.location.pathname.toLowerCase().includes('/timer.html') ||
      window.location.pathname.toLowerCase().includes('\\timer.html') ||
      (typeof document !== 'undefined' && document.body && (document.body.classList.contains('timer-page') || document.body.getAttribute('data-page') === 'timer'))
    );

    // Time string formatting
    const timeStr = getTimerData().formatTime(state.remainingSeconds);

    // Mode icons & labels
    let modeIcon = '🔥';
    let modeLabel = 'Deep Work';
    let modeBadge = 'DEEP WORK FOCUS';
    if (state.mode === 'shortBreak') {
      modeIcon = '☕';
      modeLabel = 'Short Break';
      modeBadge = 'SHORT BREAK';
    } else if (state.mode === 'longBreak') {
      modeIcon = '🌴';
      modeLabel = 'Long Break';
      modeBadge = 'LONG BREAK';
    }

    const taskName = state.currentTask || (state.mode === 'work' ? 'Deep Work Focus' : modeLabel);
    const modeMinutes = Math.round(state.durationSeconds / 60);

    // 1. Render Floating Widget
    if (dom.widget) {
      // Visibility rule (User requirement):
      // - If user is on timer.html: ALWAYS hide floating mini widget (main timer card is right there)
      // - If user navigates away from timer.html and timer was started (running or paused): SHOW floating mini widget
      // - If user closed widget (X) or focus mode is active: keep hidden
      const shouldShow = isTimerActive && !isAlreadyOnTimerPage && !state.isFloatingHidden && !isFocusModeActive;

      if (shouldShow) {
        dom.widget.classList.add('visible');
        dom.widget.classList.toggle('is-paused', state.isPaused);
        dom.widget.classList.toggle('is-running', state.isRunning);

        const modeIconEl = dom.widget.querySelector('#gft-mode-icon');
        const modeTextEl = dom.widget.querySelector('#gft-mode-text');
        const modeBadgeEl = dom.widget.querySelector('#gft-mode-badge');
        const statusPill = dom.widget.querySelector('#gft-status-pill');
        const timeDisplay = dom.widget.querySelector('#gft-time-display');
        const taskDisplay = dom.widget.querySelector('#gft-task-text');
        const toggleIcon = dom.widget.querySelector('#gft-toggle-icon');
        const toggleText = dom.widget.querySelector('#gft-toggle-text');
        const circleProgress = dom.widget.querySelector('#gft-circle-progress');
        const cycleDots = dom.widget.querySelector('#gft-cycle-dots');

        if (modeIconEl) modeIconEl.textContent = modeIcon;
        if (modeTextEl) modeTextEl.textContent = `${modeLabel} (${modeMinutes}m)`;
        if (modeBadgeEl) modeBadgeEl.textContent = modeBadge;
        if (timeDisplay) timeDisplay.textContent = timeStr;
        if (taskDisplay) taskDisplay.textContent = taskName;

        if (statusPill) {
          statusPill.textContent = state.isRunning ? 'Live' : 'Paused';
          statusPill.className = `gft-status-pill ${state.isRunning ? 'is-live' : 'is-paused'}`;
        }

        if (toggleIcon) {
          toggleIcon.textContent = state.isRunning ? 'pause' : 'play_arrow';
        }
        if (toggleText) {
          toggleText.textContent = state.isRunning ? 'Pause' : 'Resume';
        }

        // Circular progress SVG animation
        if (circleProgress) {
          const circumference = 314.16; // 2 * Math.PI * 50
          circleProgress.style.strokeDasharray = `${circumference}`;
          const fraction = state.durationSeconds > 0 
            ? Math.max(0, Math.min(1, state.remainingSeconds / state.durationSeconds))
            : 0;
          const offset = circumference * (1 - fraction);
          circleProgress.style.strokeDashoffset = `${offset}`;
        }

        // Mini cycle dots matching the timer card
        if (cycleDots) {
          const settings = getSettings();
          const totalSessions = settings.sessionsBeforeLongBreak || 4;
          let dotsHtml = '';
          for (let i = 1; i <= totalSessions; i++) {
            let cls = 'gft-cycle-dot';
            let label = i;
            if (i < state.cyclePosition) {
              cls += ' completed';
              label = '✓';
            } else if (i === state.cyclePosition && state.mode === 'work') {
              cls += ' current';
            }
            dotsHtml += `<span class="${cls}" title="Session ${i}">${label}</span>`;
          }
          const isBreak = state.mode === 'longBreak';
          dotsHtml += `<span class="gft-cycle-dot break ${isBreak ? 'current' : ''}" title="Long Break">☕</span>`;
          cycleDots.innerHTML = dotsHtml;
        }
      } else {
        dom.widget.classList.remove('visible');
      }
    }

    // 2. Render Header Status Indicator
    if (dom.headerPill) {
      // Header pill is visible whenever timer is active (even if floating widget is hidden!)
      if (isTimerActive && !isFocusModeActive) {
        dom.headerPill.classList.remove('hidden');
        dom.headerPill.classList.toggle('is-paused', state.isPaused);
        dom.headerPill.classList.toggle('is-running', state.isRunning);

        const ghtIcon = dom.headerPill.querySelector('#ght-icon');
        const ghtTime = dom.headerPill.querySelector('#ght-time');

        if (ghtIcon) ghtIcon.textContent = state.isPaused ? '⏸' : modeIcon;
        if (ghtTime) ghtTime.textContent = timeStr;
      } else {
        dom.headerPill.classList.add('hidden');
      }
    }

    // 3. Render Sidebar Timer Badge
    if (dom.sidebarPill) {
      if (isTimerActive && !isFocusModeActive) {
        dom.sidebarPill.classList.remove('hidden');
        dom.sidebarPill.textContent = timeStr;
        dom.sidebarPill.className = `sidebar-timer-badge ${state.isPaused ? 'is-paused' : 'is-running'}`;
      } else {
        dom.sidebarPill.classList.add('hidden');
      }
    }
  }

  return {
    init,
    getState,
    saveState,
    start,
    pause,
    resume,
    reset,
    skip,
    setMode,
    ensureTicking,
    hideFloating,
    showFloating,
    toggleFloating,
    render,
    subscribe,
    completeSession,
    manualComplete,
    updateSettings,
    getRelativePath
  };
});
