/**
 * DevPilot-AI - Consistency & Habit Tracker Data & Statistics Engine
 * 
 * Provides pure, centralized calculation functions for:
 * - Normalized date manipulation without timezone discrepancies
 * - Consecutive current streaks with "at risk" detection
 * - All-time best streaks across arbitrary historical gaps
 * - Real-time today completion percentages
 * - Weekly momentum calculation with truthful comparative copy
 * - 26-week (6-month) consistency heatmap matrix
 * - Data-driven habit insights (most consistent, needs attention, best/weakest days)
 * - Weekly goal auto-synchronization
 * - Safe legacy data migration & realistic starter habits
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.HabitsData = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {

  // ==========================================
  // 1. DATE NORMALIZATION & UTILITIES
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
   * Parses 'YYYY-MM-DD' safely into a local Date object.
   */
  function parseDate(dateStr) {
    if (!dateStr || typeof dateStr !== 'string') return new Date();
    const parts = dateStr.split('-');
    if (parts.length !== 3) return new Date(dateStr);
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    return new Date(year, month, day, 12, 0, 0); // midday to avoid daylight savings edge cases
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
   * Returns today's normalized date string 'YYYY-MM-DD'.
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
   * Returns ISO week identifier, e.g. '2026-W37'.
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
   * Checks if a habit is scheduled on a given date.
   */
  function isHabitScheduledOn(habit, dateStr) {
    if (!habit || habit.active === false) return false;
    const freq = habit.targetFrequency || 'daily';
    const dayOfWeek = parseDate(dateStr).getDay(); // 0 is Sun, 6 is Sat

    if (freq === 'daily') return true;
    if (freq === 'weekdays') return dayOfWeek >= 1 && dayOfWeek <= 5;
    if (freq === 'custom' && Array.isArray(habit.customDays)) {
      return habit.customDays.includes(dayOfWeek);
    }
    return true;
  }

  // ==========================================
  // 2. STREAK CALCULATIONS
  // ==========================================

  /**
   * Calculates current streak and 'at risk' status for an individual habit.
   * 
   * Current streak:
   * Number of consecutive required days completed ending today.
   * If today is incomplete:
   * Streak represents the consecutive completed run ending at the most recent eligible day,
   * but flagged as isAtRisk = true.
   * If yesterday (or most recent eligible day) was missed: streak = 0.
   */
  function calculateHabitStreak(habit, refDate = getTodayStr()) {
    if (!habit) return { currentStreak: 0, bestStreak: 0, isAtRisk: false };

    const history = habit.completionHistory || {};
    const today = formatDate(refDate);

    let currentStreak = 0;
    let isAtRisk = false;

    // Determine if today is an eligible scheduled day
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
            break; // streak ended
          }
        } else {
          // Non-scheduled rest day: skip without breaking
          checkDate = addDays(checkDate, -1);
          // Safety cap to prevent infinite loop
          if (diffDays(today, checkDate) > 730) break;
        }
      }
      isAtRisk = false;
    } else {
      // Today is incomplete or not scheduled yet.
      // Look back to the most recent scheduled day.
      let checkDate = addDays(today, -1);
      let foundScheduled = false;

      while (diffDays(today, checkDate) <= 14) {
        if (isHabitScheduledOn(habit, checkDate)) {
          foundScheduled = true;
          if (history[checkDate]) {
            // Streak is alive from past, but at risk today if today is scheduled!
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
            // Most recent scheduled day was missed! Streak is broken.
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

    const bestStreak = calculateBestStreak(habit, currentStreak);

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
  function calculateBestStreak(habit, knownCurrentStreak = 0) {
    if (!habit || !habit.completionHistory) return knownCurrentStreak;
    const history = habit.completionHistory;
    const completedDates = Object.keys(history)
      .filter(d => history[d])
      .sort();

    if (completedDates.length === 0) return 0;

    let maxStreak = 0;
    let runningStreak = 0;

    // Scan all dates from the earliest completed date to the latest
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

  /**
   * Calculates overall daily consistency streak across all habits.
   * A day counts if at least one habit was completed on that date.
   */
  function calculateOverallStreak(habits = [], refDate = getTodayStr()) {
    const activeHabits = habits.filter(h => h.active !== false);
    const today = formatDate(refDate);

    // Build unified day -> count map
    const dailyCounts = {};
    activeHabits.forEach(h => {
      if (!h.completionHistory) return;
      Object.entries(h.completionHistory).forEach(([dateStr, done]) => {
        if (done) {
          dailyCounts[dateStr] = (dailyCounts[dateStr] || 0) + 1;
        }
      });
    });

    const isTodayDone = (dailyCounts[today] || 0) > 0;
    let currentStreak = 0;
    let isAtRisk = false;

    if (isTodayDone) {
      currentStreak = 1;
      let checkDate = addDays(today, -1);
      while ((dailyCounts[checkDate] || 0) > 0) {
        currentStreak++;
        checkDate = addDays(checkDate, -1);
      }
    } else {
      const yesterday = addDays(today, -1);
      if ((dailyCounts[yesterday] || 0) > 0) {
        currentStreak = 1;
        isAtRisk = true;
        let checkDate = addDays(yesterday, -1);
        while ((dailyCounts[checkDate] || 0) > 0) {
          currentStreak++;
          checkDate = addDays(checkDate, -1);
        }
      } else {
        currentStreak = 0;
        isAtRisk = false;
      }
    }

    // Best overall streak in history
    const allDatesWithActivity = Object.keys(dailyCounts)
      .filter(d => dailyCounts[d] > 0)
      .sort();

    let bestOverallStreak = 0;
    if (allDatesWithActivity.length > 0) {
      let run = 0;
      let cur = allDatesWithActivity[0];
      const last = allDatesWithActivity[allDatesWithActivity.length - 1];

      while (diffDays(last, cur) >= 0) {
        if ((dailyCounts[cur] || 0) > 0) {
          run++;
          if (run > bestOverallStreak) bestOverallStreak = run;
        } else {
          run = 0;
        }
        cur = addDays(cur, 1);
      }
    }
    bestOverallStreak = Math.max(bestOverallStreak, currentStreak);

    // Dynamic milestone message
    let milestoneText = '';
    if (currentStreak >= 100) milestoneText = '100 day milestone 🏆';
    else if (currentStreak >= 30) milestoneText = '30 day milestone 🏆';
    else if (currentStreak >= 14) milestoneText = '2 week streak 🔥';
    else if (currentStreak >= 7) milestoneText = '1 week streak 🔥';
    else if (currentStreak > 0) milestoneText = `${currentStreak} Day Streak 🔥`;
    else milestoneText = 'Start a streak today!';

    if (isAtRisk && currentStreak > 0) {
      milestoneText += ' (At risk today)';
    }

    return {
      currentStreak,
      bestStreak: bestOverallStreak,
      isAtRisk,
      milestoneText,
      totalActiveDays: allDatesWithActivity.length
    };
  }

  // ==========================================
  // 3. TODAY PROGRESS
  // ==========================================

  /**
   * Calculates today's progress for active scheduled habits.
   */
  function calculateTodayProgress(habits = [], refDate = getTodayStr()) {
    const today = formatDate(refDate);
    const activeHabits = habits.filter(h => h.active !== false && isHabitScheduledOn(h, today));

    const total = activeHabits.length;
    if (total === 0) {
      return { total: 0, completed: 0, pct: 0, text: '0 of 0 Completed' };
    }

    const completed = activeHabits.filter(h => h.completionHistory && h.completionHistory[today]).length;
    const pct = Math.round((completed / total) * 100);

    return {
      total,
      completed,
      pct,
      text: `${completed} of ${total} Completed`
    };
  }

  // ==========================================
  // 4. WEEKLY MOMENTUM & SUMMARY
  // ==========================================

  /**
   * Calculates weekly momentum from the last 7 calendar days vs previous 7 calendar days.
   */
  function calculateWeeklyMomentum(habits = [], refDate = getTodayStr()) {
    const today = formatDate(refDate);
    const activeHabits = habits.filter(h => h.active !== false);

    // Current 7-day period: today and previous 6 days
    let curCompleted = 0;
    let curPossible = 0;
    for (let i = 0; i < 7; i++) {
      const dateStr = addDays(today, -i);
      activeHabits.forEach(h => {
        if (isHabitScheduledOn(h, dateStr)) {
          curPossible++;
          if (h.completionHistory && h.completionHistory[dateStr]) {
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
          if (h.completionHistory && h.completionHistory[dateStr]) {
            prevCompleted++;
          }
        }
      });
    }

    const curPct = curPossible > 0 ? Math.round((curCompleted / curPossible) * 100) : 0;
    const prevPct = prevPossible > 0 ? Math.round((prevCompleted / prevPossible) * 100) : 0;
    const diffPct = curPct - prevPct;

    // Truthful message based only on actual user data
    let message = '';
    if (curPossible === 0) {
      message = 'Add developer habits to start tracking weekly consistency.';
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
      message = 'Building momentum. Consistency compounds over time.';
    }

    const diffText = diffPct >= 0 ? `+${diffPct}% vs previous week` : `${diffPct}% vs previous week`;

    // Overall stats across all history for the bottom row
    const overallStats = calculateOverallStreak(habits, refDate);

    // Total possible and completed instances over the active history window (last 30 days)
    let windowPossible = 0;
    let windowCompleted = 0;
    for (let i = 0; i < 30; i++) {
      const dateStr = addDays(today, -i);
      activeHabits.forEach(h => {
        if (isHabitScheduledOn(h, dateStr)) {
          windowPossible++;
          if (h.completionHistory && h.completionHistory[dateStr]) {
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
  // 5. 6-MONTH HEATMAP MATRIX
  // ==========================================

  /**
   * Generates a 26-week calendar matrix (182 days ending on current week's Saturday or today).
   * Returns array of columns (weeks), each containing 7 day objects.
   */
  function calculateHeatmapMatrix(habits = [], numWeeks = 26, refDate = getTodayStr()) {
    const today = formatDate(refDate);
    const todayDate = parseDate(today);

    // Align to the end of the current week (Saturday)
    const dayOfWeek = todayDate.getDay(); // 0 is Sun, 6 is Sat
    const daysUntilSaturday = 6 - dayOfWeek;
    const endCalendarDate = addDays(today, daysUntilSaturday);

    const totalDays = numWeeks * 7;
    const startCalendarDate = addDays(endCalendarDate, -(totalDays - 1));

    // Aggregate completion counts and active habit titles by date
    const dayMap = {};

    habits.forEach(h => {
      if (!h.completionHistory) return;
      Object.entries(h.completionHistory).forEach(([dateStr, done]) => {
        if (done) {
          if (!dayMap[dateStr]) {
            dayMap[dateStr] = { count: 0, completedHabits: [] };
          }
          dayMap[dateStr].count++;
          dayMap[dateStr].completedHabits.push(h.title);
        }
      });
    });

    const weeks = [];
    let curDate = startCalendarDate;

    for (let w = 0; w < numWeeks; w++) {
      const daysInWeek = [];
      for (let d = 0; d < 7; d++) {
        const dateStr = curDate;
        const isFuture = diffDays(dateStr, today) > 0;
        const info = dayMap[dateStr] || { count: 0, completedHabits: [] };
        const count = isFuture ? 0 : info.count;

        // Intensity level:
        // 0 -> l0
        // 1 -> l1
        // 2 -> l2
        // 3 -> l3
        // 4+ -> l4
        let levelClass = 'heatmap-l0';
        if (!isFuture) {
          if (count >= 4) levelClass = 'heatmap-l4';
          else if (count === 3) levelClass = 'heatmap-l3';
          else if (count === 2) levelClass = 'heatmap-l2';
          else if (count === 1) levelClass = 'heatmap-l1';
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
          completedHabits: info.completedHabits,
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
  // 6. HABIT INSIGHTS
  // ==========================================

  /**
   * Generates actionable insights from historical completion history:
   * - Most Consistent Habit
   * - Needs Attention / Most Missed
   * - Best Day of Week
   * - Weakest Day of Week
   * - Average Daily Completion Rate
   * - Total Completed Habit Instances
   */
  function calculateHabitInsights(habits = [], refDate = getTodayStr()) {
    const activeHabits = habits.filter(h => h.active !== false);
    const today = formatDate(refDate);

    if (activeHabits.length === 0) {
      return {
        mostConsistent: null,
        needsAttention: null,
        bestDay: { name: 'N/A', rate: 0 },
        weakestDay: { name: 'N/A', rate: 0 },
        averageCompletionPct: 0,
        totalCheckmarks: 0,
        activeCount: 0
      };
    }

    // 1. Per-habit stats over the last 60 days
    let totalCheckmarks = 0;
    const habitPerformances = activeHabits.map(h => {
      let eligibleDays = 0;
      let completedDays = 0;

      for (let i = 0; i < 60; i++) {
        const dateStr = addDays(today, -i);
        if (isHabitScheduledOn(h, dateStr)) {
          eligibleDays++;
          if (h.completionHistory && h.completionHistory[dateStr]) {
            completedDays++;
          }
        }
      }

      // Lifetime checkmarks
      if (h.completionHistory) {
        Object.values(h.completionHistory).forEach(done => {
          if (done) totalCheckmarks++;
        });
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

    habitPerformances.sort((a, b) => b.rate - a.rate);
    const mostConsistent = habitPerformances[0];
    const needsAttention = habitPerformances.length > 1 ? habitPerformances[habitPerformances.length - 1] : null;

    // 2. Day of Week analysis (Sunday 0 to Saturday 6)
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayStats = dayNames.map((name, idx) => ({ name, dayIndex: idx, possible: 0, completed: 0 }));

    for (let i = 0; i < 60; i++) {
      const dateStr = addDays(today, -i);
      const d = parseDate(dateStr);
      const dayIdx = d.getDay();

      activeHabits.forEach(h => {
        if (isHabitScheduledOn(h, dateStr)) {
          dayStats[dayIdx].possible++;
          if (h.completionHistory && h.completionHistory[dateStr]) {
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

    // 3. Average completion across all evaluated days
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
  // 7. WEEKLY GOALS ENGINE
  // ==========================================

  /**
   * Calculates progress for a weekly goal for the current calendar week.
   */
  function calculateWeeklyGoalProgress(goal, habits = [], refDate = getTodayStr()) {
    if (!goal) return { current: 0, target: 5, pct: 0, isCompleted: false };

    const weekDates = getWeekDates(refDate);
    let current = 0;

    if (goal.habitId) {
      // Linked to a specific habit
      const habit = habits.find(h => h.id === goal.habitId);
      if (habit && habit.completionHistory) {
        weekDates.forEach(dateStr => {
          if (habit.completionHistory[dateStr]) {
            current++;
          }
        });
      }
    } else {
      // General habit completion count across all habits
      weekDates.forEach(dateStr => {
        habits.forEach(h => {
          if (h.completionHistory && h.completionHistory[dateStr]) {
            current++;
          }
        });
      });
    }

    const target = goal.target || 5;
    const pct = Math.min(100, Math.round((current / target) * 100));

    return {
      current,
      target,
      pct,
      isCompleted: current >= target
    };
  }

  // ==========================================
  // 8. DATA SEEDING & MIGRATION
  // ==========================================

  /**
   * Generates authentic, realistic 90-day completion histories for the starter developer habits.
   * Gives a natural active streak, high weekly momentum, and an authentic heatmap.
   */
  function generateStarterHabits(refDate = getTodayStr()) {
    const today = formatDate(refDate);

    // Helper to generate consistent daily history
    function buildHistory(activeStreakDays, missRateWeekday, missRateWeekend) {
      const history = {};
      // 1. Fill current active streak ending today
      for (let i = 0; i < activeStreakDays; i++) {
        const d = addDays(today, -i);
        history[d] = true;
      }
      // 2. Add an intentional gap right before the current streak
      const gapDate = addDays(today, -activeStreakDays);
      history[gapDate] = false;

      // 3. Fill the previous 75 days with realistic developer consistency
      for (let i = activeStreakDays + 1; i <= 90; i++) {
        const d = addDays(today, -i);
        const dayOfWeek = parseDate(d).getDay();
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        // Pseudo-random deterministic hash based on date string
        const hash = (d.split('-').reduce((acc, part) => acc * 31 + parseInt(part, 10), 7) % 100) / 100;
        const threshold = isWeekend ? missRateWeekend : missRateWeekday;
        history[d] = hash > threshold;
      }
      return history;
    }

    return [
      {
        id: 'h1',
        title: 'Solve 2 LeetCode Problems',
        category: 'DSA',
        createdAt: addDays(today, -90),
        active: true,
        targetFrequency: 'daily',
        reminderTime: '08:00',
        completionHistory: buildHistory(12, 0.15, 0.30)
      },
      {
        id: 'h2',
        title: 'Revise JS Event Loop & Promises',
        category: 'WebDev',
        createdAt: addDays(today, -90),
        active: true,
        targetFrequency: 'daily',
        reminderTime: '10:00',
        completionHistory: buildHistory(8, 0.18, 0.35)
      },
      {
        id: 'h3',
        title: 'Push 1 Production Commit to GitHub',
        category: 'DevOps',
        createdAt: addDays(today, -90),
        active: true,
        targetFrequency: 'daily',
        reminderTime: '18:00',
        completionHistory: buildHistory(14, 0.10, 0.25)
      },
      {
        id: 'h4',
        title: 'Complete 2 Pomodoro Focus Sessions',
        category: 'Focus',
        createdAt: addDays(today, -90),
        active: true,
        targetFrequency: 'weekdays',
        reminderTime: '14:00',
        completionHistory: buildHistory(5, 0.20, 0.80)
      },
      {
        id: 'h5',
        title: 'Read 1 High Scalability Architecture Article',
        category: 'System Design',
        createdAt: addDays(today, -90),
        active: true,
        targetFrequency: 'daily',
        reminderTime: '21:00',
        completionHistory: buildHistory(7, 0.22, 0.40)
      }
    ];
  }

  /**
   * Safely migrates existing habits stored in localStorage into the new schema.
   * If a habit only has `{ id, title, category, completed, streak }`,
   * it builds an authentic completionHistory preserving its streak and today's status.
   */
  function migrateLegacyHabits(storedHabits, refDate = getTodayStr()) {
    if (!Array.isArray(storedHabits) || storedHabits.length === 0) {
      return generateStarterHabits(refDate);
    }

    const today = formatDate(refDate);

    return storedHabits.map((h, idx) => {
      // Already has valid completionHistory
      if (h && typeof h.completionHistory === 'object' && Object.keys(h.completionHistory).length > 0) {
        return {
          id: h.id || `h_${Date.now()}_${idx}`,
          title: h.title || 'Untitled Habit',
          category: h.category || 'General',
          createdAt: h.createdAt || addDays(today, -30),
          active: h.active !== false,
          targetFrequency: h.targetFrequency || 'daily',
          customDays: h.customDays || [1, 2, 3, 4, 5],
          reminderTime: h.reminderTime || '',
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
        // Uncompleted today, but streak was alive up to yesterday
        for (let i = 1; i <= legacyStreak; i++) {
          history[addDays(today, -i)] = true;
        }
      }

      return {
        id: h.id || `h_${Date.now()}_${idx}`,
        title: h.title || 'Untitled Habit',
        category: h.category || 'General',
        createdAt: h.createdAt || addDays(today, Math.max(30, legacyStreak + 10)),
        active: h.active !== false,
        targetFrequency: h.targetFrequency || 'daily',
        customDays: h.customDays || [1, 2, 3, 4, 5],
        reminderTime: h.reminderTime || '',
        completionHistory: history
      };
    });
  }

  /**
   * Default starter weekly goals.
   */
  function generateStarterWeeklyGoals(habits = [], refDate = getTodayStr()) {
    const weekId = getWeekId(refDate);
    const dsaHabit = habits.find(h => h.category === 'DSA') || habits[0];
    const devopsHabit = habits.find(h => h.category === 'DevOps') || habits[2];
    const systemDesignHabit = habits.find(h => h.category === 'System Design') || habits[4];

    return [
      {
        id: 'wg_1',
        title: 'Solve DSA 5 times this week',
        habitId: dsaHabit ? dsaHabit.id : null,
        target: 5,
        weekId,
        createdAt: formatDate(refDate)
      },
      {
        id: 'wg_2',
        title: 'Push 5 GitHub Production Commits',
        habitId: devopsHabit ? devopsHabit.id : null,
        target: 5,
        weekId,
        createdAt: formatDate(refDate)
      },
      {
        id: 'wg_3',
        title: 'Study System Design 4 times',
        habitId: systemDesignHabit ? systemDesignHabit.id : null,
        target: 4,
        weekId,
        createdAt: formatDate(refDate)
      }
    ];
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
    calculateHabitStreak,
    calculateBestStreak,
    calculateOverallStreak,
    calculateTodayProgress,
    calculateWeeklyMomentum,
    calculateHeatmapMatrix,
    calculateHabitInsights,
    calculateWeeklyGoalProgress,
    generateStarterHabits,
    migrateLegacyHabits,
    generateStarterWeeklyGoals
  };
});
