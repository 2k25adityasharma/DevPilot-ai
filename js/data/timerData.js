/**
 * DevPilot-AI - Pomodoro Focus Timer Data & Calculation Engine
 * 
 * Provides pure, deterministic calculation functions for:
 * - Timestamp-based countdown calculations immune to background tab throttling
 * - MM:SS / HH:MM:SS time formatting
 * - Clamped SVG stroke-dashoffset progress calculations
 * - Pomodoro cycle transitions (Focus -> Short Break -> Focus -> Long Break)
 * - Real-time statistics aggregation for today and week
 * - Default settings, custom duration validation, and session history persistence
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.TimerData = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {

  // ==========================================
  // 1. DATE NORMALIZATION & FORMATTING
  // ==========================================

  /**
   * Returns 'YYYY-MM-DD' formatted string for a given Date or ISO string in local time.
   */
  function formatDate(d) {
    const date = d instanceof Date ? d : new Date(d);
    if (isNaN(date.getTime())) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
   * Formats seconds into MM:SS (or HH:MM:SS if >= 3600).
   */
  function formatTime(seconds) {
    const totalSec = Math.max(0, Math.floor(seconds));
    const hours = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;

    const paddedMins = String(mins).padStart(2, '0');
    const paddedSecs = String(secs).padStart(2, '0');

    if (hours > 0) {
      return `${hours}:${paddedMins}:${paddedSecs}`;
    }
    return `${paddedMins}:${paddedSecs}`;
  }

  /**
   * Formats a timestamp into a human-readable time string, e.g. "10:25 AM".
   */
  function formatTimestamp(isoOrEpoch) {
    const d = new Date(isoOrEpoch);
    if (isNaN(d.getTime())) return '';
    return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  }

  // ==========================================
  // 2. TIMESTAMP COUNTDOWN ENGINE
  // ==========================================

  /**
   * Calculates exact remaining seconds from an end timestamp.
   * Immune to setInterval throttling in inactive browser tabs.
   */
  function calculateRemaining(endTimestamp, now = Date.now()) {
    if (!endTimestamp || typeof endTimestamp !== 'number') return 0;
    const diffMs = endTimestamp - now;
    return Math.max(0, Math.ceil(diffMs / 1000));
  }

  /**
   * Calculates progress fraction between 0.0 and 1.0.
   */
  function calculateProgressFraction(remainingSeconds, totalSeconds) {
    if (!totalSeconds || totalSeconds <= 0) return 0;
    const fraction = remainingSeconds / totalSeconds;
    return Math.max(0, Math.min(1, fraction));
  }

  /**
   * Calculates strokeDashoffset for circular SVG timer.
   */
  function calculateStrokeDashoffset(fraction, radius = 120) {
    const circumference = 2 * Math.PI * radius;
    // Clamped fraction: 1 = full time remaining, 0 = no time remaining
    const offset = circumference - (fraction * circumference);
    return {
      circumference,
      offset: Math.max(0, Math.min(circumference, offset))
    };
  }

  // ==========================================
  // 3. POMODORO CYCLE TRANSITION LOGIC
  // ==========================================

  /**
   * Determines the next timer mode and cycle position following a completed or skipped session.
   * 
   * Standard Flow:
   * Focus (1) -> Short Break -> Focus (2) -> Short Break -> Focus (3) -> Short Break -> Focus (4) -> Long Break -> Focus (1)
   */
  function getNextSessionTransition(currentMode, currentCycle = 1, sessionsBeforeLongBreak = 4) {
    const maxCycles = Math.max(2, sessionsBeforeLongBreak || 4);

    if (currentMode === 'work') {
      if (currentCycle >= maxCycles) {
        // Fourth (or configured max) focus session leads to Long Break!
        return {
          nextMode: 'longBreak',
          nextCycle: 1, // Will reset to 1 after long break
          isCycleComplete: true,
          label: 'Long Break',
          message: `Cycle complete! You've completed ${maxCycles} focus sessions. Time for a well-deserved rest.`
        };
      } else {
        // Intermediary focus session leads to Short Break
        return {
          nextMode: 'shortBreak',
          nextCycle: currentCycle,
          isCycleComplete: false,
          label: 'Short Break',
          message: `Focus session ${currentCycle} complete! Take a quick 5-minute break.`
        };
      }
    } else if (currentMode === 'shortBreak') {
      // Short break finished -> advance to next Focus session
      const nextCycle = currentCycle + 1;
      return {
        nextMode: 'work',
        nextCycle,
        isCycleComplete: false,
        label: `Focus ${nextCycle}`,
        message: `Break over! Ready for Focus session ${nextCycle} of ${maxCycles}?`
      };
    } else {
      // Long break finished -> start fresh cycle
      return {
        nextMode: 'work',
        nextCycle: 1,
        isCycleComplete: false,
        label: 'Focus 1',
        message: `Long break finished! Refreshed and ready for a brand new cycle?`
      };
    }
  }

  // ==========================================
  // 4. TODAY'S FOCUS STATISTICS ENGINE
  // ==========================================

  /**
   * Aggregates real session history for today and this week.
   */
  function calculateTodayStats(sessions = [], refDate = new Date()) {
    const todayStr = formatDate(refDate);

    // Calculate start of current week (Monday)
    const refD = refDate instanceof Date ? new Date(refDate.getTime()) : new Date(refDate);
    const day = refD.getDay(); // 0 is Sun, 1 is Mon...
    const diffToMon = (day === 0 ? -6 : 1) - day;
    const monday = new Date(refD);
    monday.setDate(refD.getDate() + diffToMon);
    const mondayStr = formatDate(monday);

    let todayFocusCount = 0;
    let todayFocusSeconds = 0;
    let weekFocusCount = 0;
    let totalFocusSeconds = 0;
    let longestSessionSeconds = 0;
    let lastCompletedSession = null;

    const todaySessionsList = [];

    sessions.forEach(s => {
      if (!s || !s.completedAt) return;
      const sDateStr = formatDate(s.completedAt);
      const isWork = s.mode === 'work';
      const durationSec = s.durationSeconds || 0;

      if (isWork) {
        totalFocusSeconds += durationSec;
        if (durationSec > longestSessionSeconds) {
          longestSessionSeconds = durationSec;
        }

        // Current week comparison
        if (sDateStr >= mondayStr && sDateStr <= todayStr) {
          weekFocusCount++;
        }

        // Today comparison
        if (sDateStr === todayStr) {
          todayFocusCount++;
          todayFocusSeconds += durationSec;
          todaySessionsList.push(s);
        }
      }

      if (!lastCompletedSession || new Date(s.completedAt) > new Date(lastCompletedSession.completedAt)) {
        lastCompletedSession = s;
      }
    });

    // Sort today's sessions newest first
    todaySessionsList.sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));

    const todayFocusMinutes = todayFocusSeconds > 0 ? Math.max(1, Math.round(todayFocusSeconds / 60)) : 0;
    const totalFocusMinutes = totalFocusSeconds > 0 ? Math.max(1, Math.round(totalFocusSeconds / 60)) : 0;

    return {
      todayFocusCount,
      todayFocusMinutes,
      weekFocusCount,
      totalFocusMinutes,
      longestSessionMinutes: Math.round(longestSessionSeconds / 60),
      todaySessionsList,
      lastCompletedSession
    };
  }

  // ==========================================
  // 5. SETTINGS & DURATION VALIDATION
  // ==========================================

  /**
   * Default timer configuration.
   */
  function getDefaultSettings() {
    return {
      focusDuration: 25, // minutes
      shortBreakDuration: 5,
      longBreakDuration: 15,
      sessionsBeforeLongBreak: 4,
      autoStart: false,
      soundEnabled: true,
      notificationsEnabled: false
    };
  }

  /**
   * Validates duration within allowable bounds.
   */
  function validateDuration(val, min = 1, max = 120, defaultVal = 25) {
    const num = parseInt(val, 10);
    if (isNaN(num) || num < min) return min;
    if (num > max) return max;
    return num;
  }

  /**
   * Starter sessions: returns empty array as users log real sessions themselves.
   */
  function generateStarterSessions() {
    return [];
  }

  return {
    formatDate,
    formatTime,
    formatTimestamp,
    calculateRemaining,
    calculateProgressFraction,
    calculateStrokeDashoffset,
    getNextSessionTransition,
    calculateTodayStats,
    getDefaultSettings,
    validateDuration,
    generateStarterSessions
  };
});
