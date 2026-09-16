/**
 * DevPilot-AI - Consistency & Habit Tracker Data & Statistics Engine
 * 
 * Provides pure, centralized calculation functions for:
 * - Local-timezone date manipulation (preventing UTC boundary errors)
 * - Normalized completion integration (idempotent, user-scoped records)
 * - Consecutive individual habit streak with "at risk" detection
 * - All-time best streaks across arbitrary historical gaps
 * - Overall consistency streak across all user habits
 * - Real-time today completion percentages
 * - Daily goals progress and summary statistics
 * - Weekly momentum calculation with zero-division safety and truthful copy
 * - 26-week (6-month) consistency heatmap matrix
 * - Data-driven habit insights (most consistent, needs attention, best/weakest days)
 * - Weekly goal auto-synchronization
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.HabitsData = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // ==========================================
  // 1. DATE NORMALIZATION & UTILITIES
  // ==========================================

  /**
   * Returns 'YYYY-MM-DD' formatted string for a given Date or ISO string in local time.
   * Avoids UTC slicing bugs (e.g. toISOString().slice(0, 10)).
   */
  function formatDate(d) {
    if (!d) return '';
    const date = d instanceof Date ? d : new Date(d);
    if (isNaN(date.getTime())) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
   * Parses 'YYYY-MM-DD' safely into a local Date object set to midday to avoid DST drift.
   */
  function parseDate(dateStr) {
    if (!dateStr || typeof dateStr !== 'string') return new Date();
    const parts = dateStr.split('-');
    if (parts.length !== 3) return new Date(dateStr);
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    return new Date(year, month, day, 12, 0, 0);
  }

  /**
   * Adds/subtracts days to a 'YYYY-MM-DD' string or Date, returns 'YYYY-MM-DD'.
   */
  function addDays(dateInput, numDays) {
    const d = dateInput instanceof Date ? new Date(dateInput.getTime()) : parseDate(dateInput);
    d.setDate(d.getDate() + numDays);
    return formatDate(d);
  }

  /**
   * Returns today's normalized local calendar date string 'YYYY-MM-DD'.
   */
  function getTodayStr() {
    return formatDate(new Date());
  }

  /**
   * Returns difference in calendar days between dateStr1 and dateStr2 (date1 - date2).
   */
  function diffDays(dateStr1, dateStr2) {
    const d1 = parseDate(dateStr1);
    const d2 = parseDate(dateStr2);
    const msPerDay = 1000 * 60 * 60 * 24;
    return Math.round((d1.getTime() - d2.getTime()) / msPerDay);
  }

  /**
   * Returns ISO calendar week identifier, e.g. '2026-W38'.
   */
  function getWeekId(dateInput) {
    const d = dateInput instanceof Date ? new Date(dateInput.getTime()) : parseDate(dateInput);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart = new Date(d.getFullYear(), 0, 1);
    const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return `${d.getFullYear()}-W${String(weekNo).padStart(2, '0')}`;
  }

  /**
   * Returns array of 7 dates ['YYYY-MM-DD', ...] for the calendar week (Monday to Sunday) containing dateInput.
   */
  function getWeekDates(dateInput) {
    const d = dateInput instanceof Date ? new Date(dateInput.getTime()) : parseDate(dateInput);
    const day = d.getDay(); // 0 is Sun, 1 is Mon...
    const diffToMon = (day === 0 ? -6 : 1) - day;
    const monday = new Date(d);
    monday.setDate(d.getDate() + diffToMon);

    const dates = [];
    for (let i = 0; i < 7; i++) {
      const cur = new Date(monday);
      cur.setDate(monday.getDate() + i);
      dates.push(formatDate(cur));
    }
    return dates;
  }

  /**
   * Checks if a habit is scheduled on a given calendar date.
   */
  function isHabitScheduledOn(habit, dateStr) {
    if (!habit || habit.active === false) return false;
    const freq = habit.target_frequency || habit.targetFrequency || 'daily';
    const dayOfWeek = parseDate(dateStr).getDay(); // 0 is Sun, 6 is Sat

    if (freq === 'daily') return true;
    if (freq === 'weekdays') return dayOfWeek >= 1 && dayOfWeek <= 5;
    if (freq === 'custom') {
      const customDays = habit.custom_days || habit.customDays;
      if (Array.isArray(customDays)) {
        return customDays.includes(dayOfWeek);
      }
    }
    return true;
  }

  // ==========================================
  // COMPLETION DATA NORMALIZER HELPER
  // ==========================================

  /**
   * Converts various completion inputs (array of rows or object map) into a quick-lookup map:
   * Returns `{ [habitId]: { [dateStr]: true } }` and `{ [dateStr]: Set<habitId> }`.
   */
  function buildCompletionMaps(habits = [], completions = null) {
    const byHabit = {};
    const byDate = {};

    // If completions array was passed directly (from database table habit_completions)
    if (Array.isArray(completions)) {
      completions.forEach(c => {
        const hId = c.habit_id;
        const d = c.completion_date;
        if (!hId || !d) return;

        if (!byHabit[hId]) byHabit[hId] = {};
        byHabit[hId][d] = true;

        if (!byDate[d]) byDate[d] = new Set();
        byDate[d].add(hId);
      });
      return { byHabit, byDate };
    }

    // Otherwise extract from each habit's completionHistory (for backward compatibility)
    habits.forEach(h => {
      const hId = h.id;
      if (!byHabit[hId]) byHabit[hId] = {};

      const history = h.completionHistory || {};
      Object.entries(history).forEach(([d, done]) => {
        if (done) {
          byHabit[hId][d] = true;
          if (!byDate[d]) byDate[d] = new Set();
          byDate[d].add(hId);
        }
      });
    });

    return { byHabit, byDate };
  }

  // ==========================================
  // 2. STREAK CALCULATIONS
  // ==========================================

  /**
   * Calculates current streak, best streak, and 'at risk' status for an individual habit.
   * 
   * Current streak:
   * Number of consecutive scheduled days completed ending today.
   * If today is incomplete:
   * Alive from yesterday (or most recent eligible day), but flagged as isAtRisk = true.
   * If yesterday (or most recent eligible day) was missed: streak = 0.
   */
  function calculateHabitStreak(habit, refDate = getTodayStr(), completions = null) {
    if (!habit) {
      return { currentStreak: 0, bestStreak: 0, isAtRisk: false, isCompletedToday: false, isScheduledToday: false };
    }

    let history = {};
    if (Array.isArray(completions)) {
      completions.forEach(c => {
        if (c.habit_id === habit.id) {
          history[c.completion_date] = true;
        }
      });
    } else if (habit.completionHistory) {
      history = habit.completionHistory;
    }

    const today = formatDate(refDate);
    let currentStreak = 0;
    let isAtRisk = false;

    const isTodayScheduled = isHabitScheduledOn(habit, today);
    const isTodayCompleted = Boolean(history[today]);

    if (isTodayScheduled && isTodayCompleted) {
      currentStreak = 1;
      let checkDate = addDays(today, -1);
      while (true) {
        if (isHabitScheduledOn(habit, checkDate)) {
          if (history[checkDate]) {
            currentStreak++;
            checkDate = addDays(checkDate, -1);
          } else {
            break;
          }
        } else {
          // Scheduled rest day: skip without breaking
          checkDate = addDays(checkDate, -1);
          if (diffDays(today, checkDate) > 730) break;
        }
      }
      isAtRisk = false;
    } else {
      // Today is incomplete or not scheduled yet. Check backwards.
      let checkDate = addDays(today, -1);
      let foundScheduled = false;

      while (diffDays(today, checkDate) <= 14) {
        if (isHabitScheduledOn(habit, checkDate)) {
          foundScheduled = true;
          if (history[checkDate]) {
            currentStreak = 1;
            isAtRisk = isTodayScheduled;
            let prevDate = addDays(checkDate, -1);
            while (true) {
              if (isHabitScheduledOn(habit, prevDate)) {
                if (history[prevDate]) {
                  currentStreak++;
                  prevDate = addDays(prevDate, -1);
                } else {
                  break;
                }
              } else {
                prevDate = addDays(prevDate, -1);
                if (diffDays(today, prevDate) > 730) break;
              }
            }
          } else {
            // Most recent scheduled day was missed!
            currentStreak = 0;
            isAtRisk = false;
          }
          break;
        }
        checkDate = addDays(checkDate, -1);
      }

      if (!foundScheduled) {
        currentStreak = 0;
        isAtRisk = false;
      }
    }

    const bestStreak = calculateBestStreak(habit, currentStreak, history);

    return {
      currentStreak,
      bestStreak,
      isAtRisk,
      isCompletedToday: isTodayCompleted,
      isScheduledToday: isTodayScheduled
    };
  }

  /**
   * Calculates the longest consecutive sequence of scheduled days completed across all history.
   */
  function calculateBestStreak(habit, knownCurrentStreak = 0, historyObj = null) {
    const history = historyObj || habit.completionHistory || {};
    const completedDates = Object.keys(history)
      .filter(d => history[d])
      .sort();

    if (completedDates.length === 0) return knownCurrentStreak;

    let maxStreak = 0;
    let runningStreak = 0;

    const startDate = completedDates[0];
    const endDate = completedDates[completedDates.length - 1];
    let curDate = startDate;

    while (diffDays(endDate, curDate) >= 0) {
      if (isHabitScheduledOn(habit, curDate)) {
        if (history[curDate]) {
          runningStreak++;
          if (runningStreak > maxStreak) {
            maxStreak = runningStreak;
          }
        } else {
          runningStreak = 0;
        }
      }
      curDate = addDays(curDate, 1);
    }

    return Math.max(maxStreak, knownCurrentStreak);
  }

  // Streak threshold: day counts only if this % of habits completed
  const STREAK_THRESHOLD_PCT = 75;

  /**
   * Calculates overall daily consistency streak across all habits.
   * A day counts only if >= 75% of scheduled habits were completed.
   */
  function calculateOverallStreak(habits = [], completions = null, refDate = getTodayStr()) {
    const activeHabits = habits.filter(h => h.active !== false);
    const today = formatDate(refDate);

    const { byHabit } = buildCompletionMaps(activeHabits, completions);

    /**
     * Returns the completion % for active habits on a given date.
     * Returns null if no habits were scheduled that day (don't penalize).
     */
    function getDayCompletionPct(dateStr) {
      const scheduled = activeHabits.filter(h => isHabitScheduledOn(h, dateStr));
      if (scheduled.length === 0) return null; // rest day — neutral
      const done = scheduled.filter(h => byHabit[h.id] && byHabit[h.id][dateStr]).length;
      return Math.round((done / scheduled.length) * 100);
    }

    function dayCountsForStreak(dateStr) {
      const pct = getDayCompletionPct(dateStr);
      if (pct === null) return false; // no scheduled habits = rest day, doesn't count
      return pct >= STREAK_THRESHOLD_PCT;
    }

    const isTodayDone = dayCountsForStreak(today);
    const todayPct = getDayCompletionPct(today) || 0;
    let currentStreak = 0;
    let isAtRisk = false;

    if (isTodayDone) {
      currentStreak = 1;
      let checkDate = addDays(today, -1);
      let safety = 0;
      while (safety++ < 730) {
        const pct = getDayCompletionPct(checkDate);
        if (pct === null) {
          // rest day — skip without breaking streak
          checkDate = addDays(checkDate, -1);
          continue;
        }
        if (pct >= STREAK_THRESHOLD_PCT) {
          currentStreak++;
          checkDate = addDays(checkDate, -1);
        } else {
          break;
        }
      }
      isAtRisk = false;
    } else {
      // Today not yet at threshold. Check if yesterday kept streak alive.
      let checkDate = addDays(today, -1);
      let safety = 0;
      while (safety++ < 14) {
        const pct = getDayCompletionPct(checkDate);
        if (pct === null) {
          checkDate = addDays(checkDate, -1);
          continue;
        }
        if (pct >= STREAK_THRESHOLD_PCT) {
          // Yesterday (or recent scheduled day) passed — streak alive but at risk
          currentStreak = 1;
          isAtRisk = true;
          let prev = addDays(checkDate, -1);
          let s2 = 0;
          while (s2++ < 730) {
            const p2 = getDayCompletionPct(prev);
            if (p2 === null) { prev = addDays(prev, -1); continue; }
            if (p2 >= STREAK_THRESHOLD_PCT) {
              currentStreak++;
              prev = addDays(prev, -1);
            } else break;
          }
        } else {
          currentStreak = 0;
          isAtRisk = false;
        }
        break;
      }
    }

    // Best overall streak in history
    const { byDate } = buildCompletionMaps(activeHabits, completions);
    const allDatesWithActivity = Object.keys(byDate)
      .filter(d => byDate[d] && byDate[d].size > 0)
      .sort();

    let bestOverallStreak = 0;
    if (allDatesWithActivity.length > 0) {
      let run = 0;
      let cur = allDatesWithActivity[0];
      const last = allDatesWithActivity[allDatesWithActivity.length - 1];
      let safety = 0;
      while (diffDays(last, cur) >= 0 && safety++ < 1000) {
        const pct = getDayCompletionPct(cur);
        if (pct === null) {
          cur = addDays(cur, 1);
          continue;
        }
        if (pct >= STREAK_THRESHOLD_PCT) {
          run++;
          if (run > bestOverallStreak) bestOverallStreak = run;
        } else {
          run = 0;
        }
        cur = addDays(cur, 1);
      }
    }
    bestOverallStreak = Math.max(bestOverallStreak, currentStreak);

    // Active days (days where >=1 habit was completed)
    const totalActiveDays = allDatesWithActivity.length;

    // Dynamic milestone copy
    let milestoneText = '';
    if (currentStreak >= 100) milestoneText = '100 Day Milestone 🏆';
    else if (currentStreak >= 30) milestoneText = '30 Day Milestone 🏆';
    else if (currentStreak >= 14) milestoneText = '2 Week Streak 🔥';
    else if (currentStreak >= 7) milestoneText = '1 Week Streak 🔥';
    else if (currentStreak > 0) milestoneText = `${currentStreak} Day Streak 🔥`;
    else milestoneText = 'Start a streak today!';

    if (isAtRisk && currentStreak > 0) {
      milestoneText += ' ⚠️ At risk today';
    }

    return {
      currentStreak,
      bestStreak: bestOverallStreak,
      isAtRisk,
      milestoneText,
      totalActiveDays,
      todayPct,
      streakThreshold: STREAK_THRESHOLD_PCT
    };
  }

  // ==========================================
  // 3. TODAY PROGRESS
  // ==========================================

  /**
   * Calculates today's progress for active scheduled habits.
   */
  function calculateTodayProgress(habits = [], completions = null, refDate = getTodayStr()) {
    const today = formatDate(refDate);
    const activeHabits = habits.filter(h => h.active !== false && isHabitScheduledOn(h, today));

    const total = activeHabits.length;
    if (total === 0) {
      return { total: 0, completed: 0, pct: 0, text: '0 of 0 Completed' };
    }

    const { byHabit } = buildCompletionMaps(activeHabits, completions);

    let completed = 0;
    activeHabits.forEach(h => {
      if (byHabit[h.id] && byHabit[h.id][today]) {
        completed++;
      }
    });

    const pct = Math.round((completed / total) * 100);

    return {
      total,
      completed,
      pct,
      text: `${completed} of ${total} Completed`
    };
  }

  // ==========================================
  // 4. DAILY GOALS SUMMARY
  // ==========================================

  /**
   * Calculates summary statistics for today's daily goals.
   */
  function calculateDailyGoalsSummary(dailyGoals = []) {
    const total = dailyGoals.length;
    if (total === 0) {
      return { total: 0, completed: 0, pct: 0, text: '0 of 0 Completed' };
    }

    const completed = dailyGoals.filter(g => g.completed).length;
    const pct = Math.round((completed / total) * 100);

    return {
      total,
      completed,
      pct,
      text: `${completed} of ${total} Completed`
    };
  }

  // ==========================================
  // 5. WEEKLY MOMENTUM & SUMMARY
  // ==========================================

  /**
   * Calculates weekly momentum from the last 7 calendar days vs previous 7 calendar days.
   * Completely handles zero-division cleanly (no NaN or Infinity).
   */
  function calculateWeeklyMomentum(habits = [], completions = null, refDate = getTodayStr()) {
    const today = formatDate(refDate);
    const activeHabits = habits.filter(h => h.active !== false);

    const { byHabit } = buildCompletionMaps(activeHabits, completions);

    // Current 7-day period: days 0 to -6
    let curCompleted = 0;
    let curPossible = 0;
    for (let i = 0; i < 7; i++) {
      const dateStr = addDays(today, -i);
      activeHabits.forEach(h => {
        if (isHabitScheduledOn(h, dateStr)) {
          curPossible++;
          if (byHabit[h.id] && byHabit[h.id][dateStr]) {
            curCompleted++;
          }
        }
      });
    }

    // Previous 7-day period: days -7 to -13
    let prevCompleted = 0;
    let prevPossible = 0;
    for (let i = 7; i < 14; i++) {
      const dateStr = addDays(today, -i);
      activeHabits.forEach(h => {
        if (isHabitScheduledOn(h, dateStr)) {
          prevPossible++;
          if (byHabit[h.id] && byHabit[h.id][dateStr]) {
            prevCompleted++;
          }
        }
      });
    }

    const curPct = curPossible > 0 ? Math.round((curCompleted / curPossible) * 100) : 0;
    const prevPct = prevPossible > 0 ? Math.round((prevCompleted / prevPossible) * 100) : 0;

    let diffPct = 0;
    let diffText = 'Baseline week';

    if (prevPossible === 0 || prevPct === 0) {
      if (curPct > 0) {
        diffPct = curPct;
        diffText = 'New activity this week';
      } else {
        diffPct = 0;
        diffText = 'Baseline week';
      }
    } else {
      diffPct = curPct - prevPct;
      diffText = diffPct >= 0 ? `+${diffPct}% vs previous week` : `${diffPct}% vs previous week`;
    }

    // Truthful message based strictly on real user data
    let message = '';
    if (curPossible === 0) {
      message = 'Add your first developer habit above to start tracking consistency.';
    } else if (curCompleted === 0) {
      message = 'No habits completed yet this week. Check off your first habit today!';
    } else if (curPct === 100) {
      message = 'Flawless consistency this week — 100% of scheduled habits completed!';
    } else if (diffPct > 15) {
      message = `High momentum! You're up +${diffPct}% compared to last week.`;
    } else if (diffPct > 0) {
      message = `Momentum improving (+${diffPct}% vs last week). Keep the daily rhythm going!`;
    } else if (diffPct === 0 && curPct >= 70) {
      message = `Solid consistency maintained at ${curPct}% completion this week.`;
    } else if (diffPct < 0 && curPct >= 50) {
      message = `Consistency dipped slightly (${diffPct}% vs last week), but still well on track.`;
    } else if (diffPct < 0) {
      message = `Momentum dropped this week (${diffPct}% vs last week). Complete today's checklist to recover!`;
    } else {
      message = 'Building momentum. Daily consistency compounds over time.';
    }

    const overallStats = calculateOverallStreak(habits, completions, refDate);

    // Active window completion % (last 30 days)
    let windowPossible = 0;
    let windowCompleted = 0;
    for (let i = 0; i < 30; i++) {
      const dateStr = addDays(today, -i);
      activeHabits.forEach(h => {
        if (isHabitScheduledOn(h, dateStr)) {
          windowPossible++;
          if (byHabit[h.id] && byHabit[h.id][dateStr]) {
            windowCompleted++;
          }
        }
      });
    }
    const overallCompletionPct = windowPossible > 0 ? Math.round((windowCompleted / windowPossible) * 100) : 0;

    return {
      currentCompleted: curCompleted,
      currentPossible: curPossible,
      currentPct: curPct,
      prevPct,
      diffPct,
      diffText,
      message,
      totalDays: overallStats.totalActiveDays,
      bestStreak: overallStats.bestStreak,
      overallCompletionPct
    };
  }

  // ==========================================
  // 6. 6-MONTH HEATMAP MATRIX
  // ==========================================

  /**
   * Generates a 26-week calendar matrix (182 days ending on current week's Saturday).
   * Dynamically groups actual completions and intensities.
   */
  function calculateHeatmapMatrix(habits = [], completions = null, numWeeks = 26, refDate = getTodayStr(), dailyGoals = []) {
    const today = formatDate(refDate);
    const todayDate = parseDate(today);

    // Align to the end of the current week (Saturday)
    const dayOfWeek = todayDate.getDay();
    const daysUntilSaturday = 6 - dayOfWeek;
    const endCalendarDate = addDays(today, daysUntilSaturday);

    const totalDays = numWeeks * 7;
    const startCalendarDate = addDays(endCalendarDate, -(totalDays - 1));

    const { byDate } = buildCompletionMaps(habits, completions);

    // Map habit ID to title for tooltip display
    const titleMap = {};
    habits.forEach(h => { titleMap[h.id] = h.title; });

    // Also map daily goals completions by date
    const dailyGoalsByDate = {};
    if (Array.isArray(dailyGoals)) {
      dailyGoals.forEach(g => {
        if (g.completed && g.date) {
          dailyGoalsByDate[g.date] = (dailyGoalsByDate[g.date] || 0) + 1;
        }
      });
    }

    const weeks = [];
    let curDate = startCalendarDate;

    for (let w = 0; w < numWeeks; w++) {
      const daysInWeek = [];
      for (let d = 0; d < 7; d++) {
        const dateStr = curDate;
        const isFuture = diffDays(dateStr, today) > 0;
        const habitIds = byDate[dateStr] || new Set();
        const count = isFuture ? 0 : habitIds.size;
        const goalsCompletedCount = isFuture ? 0 : (dailyGoalsByDate[dateStr] || 0);

        const completedHabits = [];
        habitIds.forEach(id => {
          completedHabits.push(titleMap[id] || 'Habit');
        });

        const totalActivity = count + goalsCompletedCount;

        // Intensity:
        // 0 -> l0
        // 1 -> l1
        // 2 -> l2
        // 3 -> l3
        // 4+ -> l4
        let levelClass = 'heatmap-l0';
        if (!isFuture) {
          if (totalActivity >= 4) levelClass = 'heatmap-l4';
          else if (totalActivity === 3) levelClass = 'heatmap-l3';
          else if (totalActivity === 2) levelClass = 'heatmap-l2';
          else if (totalActivity === 1) levelClass = 'heatmap-l1';
        }

        const dateObj = parseDate(dateStr);
        const formattedDate = dateObj.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        });

        daysInWeek.push({
          date: dateStr,
          formattedDate,
          count,
          completedHabits,
          goalsCompletedCount,
          totalActivity,
          levelClass,
          isToday: dateStr === today,
          isFuture
        });

        curDate = addDays(curDate, 1);
      }
      weeks.push(daysInWeek);
    }

    return weeks;
  }

  // ==========================================
  // 7. HABIT INSIGHTS
  // ==========================================

  /**
   * Generates actionable insights from actual historical completion records.
   * Handles empty accounts gracefully without mock data.
   */
  function calculateHabitInsights(habits = [], completions = null, refDate = getTodayStr()) {
    const activeHabits = habits.filter(h => h.active !== false);
    const today = formatDate(refDate);

    if (activeHabits.length === 0) {
      return {
        mostConsistent: null,
        needsAttention: null,
        bestDay: { name: 'None', rate: 0 },
        weakestDay: { name: 'None', rate: 0 },
        averageCompletionPct: 0,
        totalCheckmarks: 0,
        activeCount: 0
      };
    }

    const { byHabit } = buildCompletionMaps(activeHabits, completions);

    let totalCheckmarks = 0;
    const habitPerformances = activeHabits.map(h => {
      let eligibleDays = 0;
      let completedDays = 0;

      for (let i = 0; i < 60; i++) {
        const dateStr = addDays(today, -i);
        if (isHabitScheduledOn(h, dateStr)) {
          eligibleDays++;
          if (byHabit[h.id] && byHabit[h.id][dateStr]) {
            completedDays++;
          }
        }
      }

      if (byHabit[h.id]) {
        totalCheckmarks += Object.keys(byHabit[h.id]).length;
      }

      const rate = eligibleDays > 0 ? Math.round((completedDays / eligibleDays) * 100) : 0;
      return {
        id: h.id,
        title: h.title,
        category: h.category,
        rate,
        completedDays,
        eligibleDays
      };
    });

    if (totalCheckmarks === 0) {
      return {
        mostConsistent: null,
        needsAttention: null,
        bestDay: { name: 'None', rate: 0 },
        weakestDay: { name: 'None', rate: 0 },
        averageCompletionPct: 0,
        totalCheckmarks: 0,
        activeCount: activeHabits.length
      };
    }

    habitPerformances.sort((a, b) => b.rate - a.rate);
    const mostConsistent = habitPerformances[0];

    // Check if ALL habits scheduled for today are completed → show "All Done!" instead
    const todayStr = today;
    const habitsScheduledToday = activeHabits.filter(h => isHabitScheduledOn(h, todayStr));
    const allDoneToday = habitsScheduledToday.length > 0 &&
      habitsScheduledToday.every(h => byHabit[h.id] && byHabit[h.id][todayStr]);

    // needsAttention: only show when 2+ habits exist AND the worst is genuinely struggling (<70%)
    // AND not all habits are done today (avoid flagging when user just finished everything)
    // Avoids falsely flagging a user's only habit as "needing attention"
    let needsAttention = null;
    if (!allDoneToday && habitPerformances.length >= 2) {
      const worst = habitPerformances[habitPerformances.length - 1];
      // Only flag if meaningfully behind (< 70% completion AND at least 3 eligible days of data)
      if (worst.rate < 70 && worst.eligibleDays >= 3) {
        needsAttention = worst;
      }
    }

    // Day of week analysis (0 = Sun, 6 = Sat)
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayStats = dayNames.map((name, idx) => ({ name, dayIndex: idx, possible: 0, completed: 0 }));

    for (let i = 0; i < 60; i++) {
      const dateStr = addDays(today, -i);
      const d = parseDate(dateStr);
      const dayIdx = d.getDay();

      activeHabits.forEach(h => {
        if (isHabitScheduledOn(h, dateStr)) {
          dayStats[dayIdx].possible++;
          if (byHabit[h.id] && byHabit[h.id][dateStr]) {
            dayStats[dayIdx].completed++;
          }
        }
      });
    }

    const dayRates = dayStats.map(s => ({
      name: s.name,
      rate: s.possible > 0 ? Math.round((s.completed / s.possible) * 100) : 0,
      possible: s.possible
    })).filter(s => s.possible > 0);

    dayRates.sort((a, b) => b.rate - a.rate);
    const bestDay = dayRates.length > 0 ? dayRates[0] : { name: 'Weekday', rate: 0 };
    const weakestDay = dayRates.length > 1 ? dayRates[dayRates.length - 1] : dayRates[0] || { name: 'Weekend', rate: 0 };

    let totalEligibleAll = 0;
    let totalCompletedAll = 0;
    habitPerformances.forEach(hp => {
      totalEligibleAll += hp.eligibleDays;
      totalCompletedAll += hp.completedDays;
    });
    const averageCompletionPct = totalEligibleAll > 0 ? Math.round((totalCompletedAll / totalEligibleAll) * 100) : 0;

    return {
      mostConsistent,
      needsAttention,
      bestDay,
      weakestDay,
      averageCompletionPct,
      totalCheckmarks,
      activeCount: activeHabits.length
    };
  }

  // ==========================================
  // 8. WEEKLY GOALS ENGINE
  // ==========================================

  /**
   * Calculates progress for a weekly goal for the current calendar week.
   */
  function calculateWeeklyGoalProgress(goal, habits = [], completions = null, refDate = getTodayStr()) {
    if (!goal) return { current: 0, target: 5, pct: 0, isCompleted: false };

    const target = goal.target || 5;

    // If goal progress is manually tracked or already has a progress number
    if (typeof goal.progress === 'number' && goal.progress > 0 && !goal.habit_id && !goal.habitId) {
      const current = goal.progress;
      const pct = Math.min(100, Math.round((current / target) * 100));
      return { current, target, pct, isCompleted: current >= target };
    }

    const weekDates = getWeekDates(refDate);
    const { byHabit, byDate } = buildCompletionMaps(habits, completions);
    let current = 0;

    const linkedHabitId = goal.habit_id || goal.habitId;
    if (linkedHabitId) {
      if (byHabit[linkedHabitId]) {
        weekDates.forEach(dateStr => {
          if (byHabit[linkedHabitId][dateStr]) {
            current++;
          }
        });
      }
    } else {
      // General habit count in this week
      weekDates.forEach(dateStr => {
        if (byDate[dateStr]) {
          current += byDate[dateStr].size;
        }
      });
    }

    // Use max of calculated completions and any explicit numeric progress
    current = Math.max(current, goal.progress || 0);
    const pct = Math.min(100, Math.round((current / target) * 100));

    return {
      current,
      target,
      pct,
      isCompleted: current >= target
    };
  }

  // ==========================================
  // 9. COLLISION-SAFE UNIQUE ID GENERATOR
  // ==========================================

  /**
   * Collision-safe permanent unique identifier generator.
   * Leverages crypto.randomUUID() when available, with a monotonic timestamp + random fallback.
   */
  function generateUniqueId(prefix = '') {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      const uuid = crypto.randomUUID();
      return prefix ? `${prefix}_${uuid}` : uuid;
    }
    const rand1 = Math.random().toString(36).substring(2, 9);
    const rand2 = Math.random().toString(36).substring(2, 9);
    const time = Date.now().toString(36);
    return prefix ? `${prefix}_${time}_${rand1}${rand2}` : `${time}-${rand1}-${rand2}`;
  }

  // ==========================================
  // 10. HEATMAP DYNAMIC MONTH LABELS
  // ==========================================

  /**
   * Calculates dynamic month headers across the heatmap week columns.
   * Ensures no visible month is skipped (fixing the April erasure bug),
   * prevents label collisions, handles year boundaries, and ensures
   * total spans align with the 26-week columns.
   */
  function calculateHeatmapMonthSpans(weeks = []) {
    if (!Array.isArray(weeks) || weeks.length === 0) return [];

    const monthStarts = [];
    let lastMonth = -1;

    weeks.forEach((week, wIdx) => {
      for (let d = 0; d < week.length; d++) {
        const dObj = parseDate(week[d].date);
        const m = dObj.getMonth();
        if (m !== lastMonth) {
          lastMonth = m;
          monthStarts.push({
            name: dObj.toLocaleDateString('en-US', { month: 'short' }),
            monthIndex: m,
            colIndex: wIdx,
            year: dObj.getFullYear()
          });
          break;
        }
      }
    });

    if (monthStarts.length === 0) return [];

    // Filter out initial partial month if it only spans 1 column before the next month starts,
    // which causes label collisions and suppresses the first full month.
    let filtered = [];
    if (monthStarts.length >= 2 && (monthStarts[1].colIndex - monthStarts[0].colIndex < 2)) {
      // Keep from the first full month, but anchor at column 0 so totalSpan covers all columns
      filtered = monthStarts.slice(1);
      if (filtered.length > 0) {
        filtered[0].colIndex = 0;
      }
    } else {
      filtered = [...monthStarts];
    }

    // Calculate exact spans
    for (let i = 0; i < filtered.length; i++) {
      const startCol = filtered[i].colIndex;
      const endCol = (i + 1 < filtered.length) ? filtered[i + 1].colIndex : weeks.length;
      filtered[i].span = Math.max(1, endCol - startCol);
    }

    return filtered;
  }

  // ==========================================
  // 11. LEGACY MIGRATION & SEEDING (Dev/Demo Only)
  // ==========================================

  /**
   * Safely migrates existing legacy habits stored in localStorage without injecting mock data.
   * If storedHabits is empty, returns empty array [].
   * Never uses array index as identity.
   */
  function migrateLegacyHabits(storedHabits, refDate = getTodayStr()) {
    if (!Array.isArray(storedHabits) || storedHabits.length === 0) {
      return [];
    }

    const today = formatDate(refDate);

    return storedHabits.map((h) => {
      const habitId = (h && h.id && String(h.id).trim()) || generateUniqueId('h');

      if (h && typeof h.completionHistory === 'object' && Object.keys(h.completionHistory).length > 0) {
        return {
          id: habitId,
          title: h.title || 'Untitled Habit',
          category: h.category || 'General',
          description: h.description || '',
          createdAt: h.createdAt || addDays(today, -30),
          active: h.active !== false,
          targetFrequency: h.targetFrequency || h.target_frequency || 'daily',
          customDays: h.customDays || h.custom_days || [1, 2, 3, 4, 5],
          reminderTime: h.reminderTime || h.reminder_time || '',
          completionHistory: h.completionHistory
        };
      }

      // Legacy format migration
      const legacyStreak = parseInt(h.streak, 10) || (h.completed ? 1 : 0);
      const isCompletedToday = Boolean(h.completed);
      const history = {};

      if (isCompletedToday) {
        for (let i = 0; i < legacyStreak; i++) {
          history[addDays(today, -i)] = true;
        }
      } else {
        for (let i = 1; i <= legacyStreak; i++) {
          history[addDays(today, -i)] = true;
        }
      }

      return {
        id: habitId,
        title: h.title || 'Untitled Habit',
        category: h.category || 'General',
        description: h.description || '',
        createdAt: h.createdAt || addDays(today, Math.max(30, legacyStreak + 10)),
        active: h.active !== false,
        targetFrequency: h.targetFrequency || h.target_frequency || 'daily',
        customDays: h.customDays || h.custom_days || [1, 2, 3, 4, 5],
        reminderTime: h.reminderTime || h.reminder_time || '',
        completionHistory: history
      };
    });
  }

  return {
    formatDate,
    parseDate,
    addDays,
    getTodayStr,
    diffDays,
    getWeekId,
    getWeekDates,
    isHabitScheduledOn,
    buildCompletionMaps,
    calculateHabitStreak,
    calculateBestStreak,
    calculateOverallStreak,
    calculateTodayProgress,
    calculateDailyGoalsSummary,
    calculateWeeklyMomentum,
    calculateHeatmapMatrix,
    calculateHeatmapMonthSpans,
    calculateHabitInsights,
    calculateWeeklyGoalProgress,
    generateUniqueId,
    migrateLegacyHabits
  };
});
