/**
 * DevPilot-AI - Automated Test Suite: Consistency & Habit Tracker System
 * 
 * Verifies:
 * 1. Habit schema and legacy migration
 * 2. Consecutive daily streak & at-risk state
 * 3. Broken streak reset behavior
 * 4. All-time best streak across arbitrary historical gaps
 * 5. Today's completion percentage & fraction text
 * 6. Unchecking recalculation from actual history (no blind decrements)
 * 7. Weekly momentum calculation (+X% vs previous week) and truthful messages
 * 8. 26-week (6-month) heatmap matrix & intensity levels (l0 to l4)
 * 9. Data-driven habit insights (most consistent, needs attention, best day, weakest day)
 * 10. Weekly goals auto-synchronization with linked habits
 * 11. Habit deactivation vs deletion (preserving historical data in analytics)
 */

const assert = require('assert');
const path = require('path');

// Import centralized habit engine
const HabitsData = require(path.join(__dirname, '../../js/data/habitsData.js'));

let passCount = 0;
let failCount = 0;

function runTest(testName, fn) {
  try {
    fn();
    console.log(`✓ [PASS] ${testName}`);
    passCount++;
  } catch (err) {
    console.error(`✗ [FAIL] ${testName}: ${err.message}`);
    failCount++;
  }
}

console.log('====================================================');
console.log(' DevPilot-AI: Validating Consistency & Habit Tracker');
console.log('====================================================\n');

// ----------------------------------------------------
// TEST 1: Habit Schema & Legacy Migration
// ----------------------------------------------------
runTest('TEST 1: Legacy habits safely migrate and acquire valid completionHistory', () => {
  const legacyHabits = [
    { id: 'h1', title: 'Solve 2 LeetCode Problems', category: 'DSA', completed: true, streak: 12 },
    { id: 'h2', title: 'Revise JS Event Loop', category: 'WebDev', completed: false, streak: 8 }
  ];

  const migrated = HabitsData.migrateLegacyHabits(legacyHabits, '2026-09-14');
  assert.strictEqual(migrated.length, 2, 'Must preserve both habits');

  const h1 = migrated[0];
  assert.strictEqual(h1.title, 'Solve 2 LeetCode Problems');
  assert.strictEqual(h1.active, true);
  assert.ok(h1.completionHistory, 'Must have completionHistory map');
  assert.strictEqual(h1.completionHistory['2026-09-14'], true, 'Today must be marked true if completed');
  assert.strictEqual(h1.completionHistory['2026-09-13'], true, 'Yesterday must be true');

  const h2 = migrated[1];
  assert.strictEqual(h2.completionHistory['2026-09-14'], undefined, 'Today must not be marked true if completed is false');
  assert.strictEqual(h2.completionHistory['2026-09-13'], true, 'Previous streak ending yesterday must be preserved');
});

// ----------------------------------------------------
// TEST 2: Consecutive Daily Streak & At-Risk Status
// ----------------------------------------------------
runTest('TEST 2: Consecutive streak ending today vs at-risk when incomplete', () => {
  const refDate = '2026-09-14';

  // Case A: Completed today, yesterday, 2 days ago, 3 days ago -> streak = 4
  const completedHabit = {
    id: 'h_test1',
    title: 'DSA Practice',
    active: true,
    targetFrequency: 'daily',
    completionHistory: {
      '2026-09-14': true,
      '2026-09-13': true,
      '2026-09-12': true,
      '2026-09-11': true,
      '2026-09-10': false
    }
  };

  const statsA = HabitsData.calculateHabitStreak(completedHabit, refDate);
  assert.strictEqual(statsA.currentStreak, 4, 'Current streak should be 4');
  assert.strictEqual(statsA.isAtRisk, false, 'Not at risk because completed today');
  assert.strictEqual(statsA.isCompletedToday, true);

  // Case B: Incomplete today, but completed yesterday, 2 days ago -> streak = 3, at risk
  const incompleteHabit = {
    id: 'h_test2',
    title: 'Commit to GitHub',
    active: true,
    targetFrequency: 'daily',
    completionHistory: {
      '2026-09-13': true,
      '2026-09-12': true,
      '2026-09-11': true,
      '2026-09-10': false
    }
  };

  const statsB = HabitsData.calculateHabitStreak(incompleteHabit, refDate);
  assert.strictEqual(statsB.currentStreak, 3, 'Streak alive from yesterday should be 3');
  assert.strictEqual(statsB.isAtRisk, true, 'Must be marked at risk today');
  assert.strictEqual(statsB.isCompletedToday, false);
});

// ----------------------------------------------------
// TEST 3: Broken Streak Resets to 0
// ----------------------------------------------------
runTest('TEST 3: Streak resets to 0 when previous eligible day was missed', () => {
  const refDate = '2026-09-14';

  // Missed today (Sep 14) AND missed yesterday (Sep 13), even if Sep 12 was completed
  const brokenHabit = {
    id: 'h_broken',
    title: 'Daily Reading',
    active: true,
    targetFrequency: 'daily',
    completionHistory: {
      '2026-09-12': true,
      '2026-09-11': true,
      '2026-09-10': true
    }
  };

  const stats = HabitsData.calculateHabitStreak(brokenHabit, refDate);
  assert.strictEqual(stats.currentStreak, 0, 'Current streak must be 0 because yesterday was missed');
  assert.strictEqual(stats.isAtRisk, false, 'Not at risk because streak is already broken');
});

// ----------------------------------------------------
// TEST 4: Best Streak Across Historical Gaps
// ----------------------------------------------------
runTest('TEST 4: Best streak correctly finds maximum run (3 -> 4 -> 5 -> 2 -> 8 => best = 8)', () => {
  // Build history with distinct runs: run of 3, gap, run of 5, gap, run of 8, gap, current run of 2
  const history = {};

  // Run 1: 3 days (days 50-48 ago)
  history['2026-07-26'] = true;
  history['2026-07-27'] = true;
  history['2026-07-28'] = true;

  // Run 2: 5 days (days 40-36 ago)
  history['2026-08-05'] = true;
  history['2026-08-06'] = true;
  history['2026-08-07'] = true;
  history['2026-08-08'] = true;
  history['2026-08-09'] = true;

  // Run 3: 8 days (days 25-18 ago)
  history['2026-08-20'] = true;
  history['2026-08-21'] = true;
  history['2026-08-22'] = true;
  history['2026-08-23'] = true;
  history['2026-08-24'] = true;
  history['2026-08-25'] = true;
  history['2026-08-26'] = true;
  history['2026-08-27'] = true;

  // Current run: 2 days (today & yesterday)
  history['2026-09-13'] = true;
  history['2026-09-14'] = true;

  const habit = {
    id: 'h_max',
    title: 'LeetCode',
    active: true,
    targetFrequency: 'daily',
    completionHistory: history
  };

  const stats = HabitsData.calculateHabitStreak(habit, '2026-09-14');
  assert.strictEqual(stats.currentStreak, 2, 'Current streak should be 2');
  assert.strictEqual(stats.bestStreak, 8, 'Best streak must be 8 despite current streak being 2');
});

// ----------------------------------------------------
// TEST 5: Today's Completion Calculation
// ----------------------------------------------------
runTest('TEST 5: Today completion accurately calculates fraction and percentage', () => {
  const refDate = '2026-09-14';

  const sampleHabits = [
    { id: '1', active: true, targetFrequency: 'daily', completionHistory: { '2026-09-14': true } },
    { id: '2', active: true, targetFrequency: 'daily', completionHistory: { '2026-09-14': true } },
    { id: '3', active: true, targetFrequency: 'daily', completionHistory: { '2026-09-14': false } },
    { id: '4', active: false, targetFrequency: 'daily', completionHistory: { '2026-09-14': true } } // inactive shouldn't count in today's active total
  ];

  const progress = HabitsData.calculateTodayProgress(sampleHabits, refDate);
  assert.strictEqual(progress.total, 3, 'Only 3 active habits scheduled today');
  assert.strictEqual(progress.completed, 2, '2 completed active habits today');
  assert.strictEqual(progress.pct, 67, 'Math.round(2/3 * 100) = 67%');
  assert.strictEqual(progress.text, '2 of 3 Completed');
});

// ----------------------------------------------------
// TEST 6: Unchecking Recalculates Without Blind Decrements
// ----------------------------------------------------
runTest('TEST 6: Unchecking today recalculates streaks directly from remaining history', () => {
  const habit = {
    id: 'h_uncheck',
    title: 'System Design',
    active: true,
    targetFrequency: 'daily',
    completionHistory: {
      '2026-09-14': true,
      '2026-09-13': true,
      '2026-09-12': true
    }
  };

  // Initially checked today: streak = 3
  let stats = HabitsData.calculateHabitStreak(habit, '2026-09-14');
  assert.strictEqual(stats.currentStreak, 3);
  assert.strictEqual(stats.isCompletedToday, true);

  // User unchecks today
  delete habit.completionHistory['2026-09-14'];

  // Recalculate
  stats = HabitsData.calculateHabitStreak(habit, '2026-09-14');
  assert.strictEqual(stats.currentStreak, 2, 'Current streak remains 2 ending at yesterday');
  assert.strictEqual(stats.isAtRisk, true, 'Marked at risk today');
  assert.strictEqual(stats.isCompletedToday, false);
  assert.strictEqual(stats.bestStreak, 2, 'Best streak reflects remaining history');
});

// ----------------------------------------------------
// TEST 7: Weekly Momentum Comparison & Truthful Copy
// ----------------------------------------------------
runTest('TEST 7: Weekly momentum calculates 7-day difference and produces truthful copy', () => {
  const refDate = '2026-09-14';

  // 1 active habit completed on 5 days in the last 7 days (days 0 to -6),
  // and completed on only 2 days in previous 7 days (days -7 to -13)
  const habit = {
    id: 'h_mom',
    active: true,
    targetFrequency: 'daily',
    completionHistory: {
      '2026-09-14': true,
      '2026-09-13': true,
      '2026-09-12': true,
      '2026-09-11': true,
      '2026-09-10': true,
      // Previous week
      '2026-09-07': true,
      '2026-09-06': true
    }
  };

  const momentum = HabitsData.calculateWeeklyMomentum([habit], refDate);
  assert.strictEqual(momentum.currentCompleted, 5);
  assert.strictEqual(momentum.currentPossible, 7);
  assert.strictEqual(momentum.currentPct, 71); // 5/7 = 71%
  assert.strictEqual(momentum.prevPct, 29); // 2/7 = 29%
  assert.strictEqual(momentum.diffPct, 42); // 71 - 29 = +42%
  assert.strictEqual(momentum.diffText, '+42% vs previous week');
  assert.ok(momentum.message.includes('+42%') || momentum.message.includes('High momentum'), 'Truthful message contains actual diff percentage');
  assert.ok(!momentum.message.includes('top 5%'), 'Must NOT claim fake cross-user top 5% status');
});

// ----------------------------------------------------
// TEST 8: 26-Week Heatmap Matrix & Intensity Levels
// ----------------------------------------------------
runTest('TEST 8: Heatmap matrix generates 26 columns with correct intensity levels (l0 to l4)', () => {
  const refDate = '2026-09-14';

  const habitA = { id: 'a', completionHistory: { '2026-09-14': true, '2026-09-13': true } };
  const habitB = { id: 'b', completionHistory: { '2026-09-14': true, '2026-09-13': true } };
  const habitC = { id: 'c', completionHistory: { '2026-09-14': true } };
  const habitD = { id: 'd', completionHistory: { '2026-09-14': true } };

  const matrix = HabitsData.calculateHeatmapMatrix([habitA, habitB, habitC, habitD], 26, refDate);
  assert.strictEqual(matrix.length, 26, 'Must generate exactly 26 columns');
  assert.strictEqual(matrix[0].length, 7, 'Each week must have 7 days');

  // Find today's cell
  let todayCell = null;
  matrix.forEach(week => {
    week.forEach(day => {
      if (day.date === refDate) todayCell = day;
    });
  });

  assert.ok(todayCell, 'Today cell must exist in matrix');
  assert.strictEqual(todayCell.count, 4, '4 habits completed today');
  assert.strictEqual(todayCell.levelClass, 'heatmap-l4', '4 completed habits should be heatmap-l4');
  assert.strictEqual(todayCell.isToday, true);
});

// ----------------------------------------------------
// TEST 9: Data-Driven Habit Insights
// ----------------------------------------------------
runTest('TEST 9: Habit Insights accurately identifies most consistent and needs attention habits', () => {
  const refDate = '2026-09-14';

  const strongHabit = {
    id: 'h_strong',
    title: 'LeetCode',
    active: true,
    targetFrequency: 'daily',
    completionHistory: {}
  };
  // Fill strong habit with 50/60 days completed
  for (let i = 0; i < 50; i++) {
    strongHabit.completionHistory[HabitsData.addDays(refDate, -i)] = true;
  }

  const weakHabit = {
    id: 'h_weak',
    title: 'Read Scalability Articles',
    active: true,
    targetFrequency: 'daily',
    completionHistory: {}
  };
  // Fill weak habit with 10/60 days completed
  for (let i = 0; i < 10; i++) {
    weakHabit.completionHistory[HabitsData.addDays(refDate, -i)] = true;
  }

  const insights = HabitsData.calculateHabitInsights([strongHabit, weakHabit], refDate);
  assert.strictEqual(insights.mostConsistent.title, 'LeetCode');
  assert.strictEqual(insights.needsAttention.title, 'Read Scalability Articles');
  assert.ok(insights.mostConsistent.rate > insights.needsAttention.rate);
  assert.ok(insights.totalCheckmarks >= 60);
});

// ----------------------------------------------------
// TEST 10: Weekly Goals Auto-Sync with Habits
// ----------------------------------------------------
runTest('TEST 10: Weekly goals automatically track completions in the current calendar week', () => {
  const refDate = '2026-09-14'; // Mon, Sep 14, 2026

  const habit = {
    id: 'h_goal_sync',
    title: 'DSA Practice',
    active: true,
    targetFrequency: 'daily',
    completionHistory: {
      '2026-09-14': true // Monday of current week completed
    }
  };

  const goal = {
    id: 'g1',
    title: 'Complete DSA 5 times',
    habitId: 'h_goal_sync',
    target: 5
  };

  const progress1 = HabitsData.calculateWeeklyGoalProgress(goal, [habit], refDate);
  assert.strictEqual(progress1.current, 1, '1 day completed this week');
  assert.strictEqual(progress1.pct, 20, '1/5 = 20%');
  assert.strictEqual(progress1.isCompleted, false);

  // Add 4 more days in current week (Tue, Wed, Thu, Fri)
  habit.completionHistory['2026-09-15'] = true;
  habit.completionHistory['2026-09-16'] = true;
  habit.completionHistory['2026-09-17'] = true;
  habit.completionHistory['2026-09-18'] = true;

  const progress2 = HabitsData.calculateWeeklyGoalProgress(goal, [habit], refDate);
  assert.strictEqual(progress2.current, 5, '5 days completed this week');
  assert.strictEqual(progress2.pct, 100, '5/5 = 100%');
  assert.strictEqual(progress2.isCompleted, true);
});

// ----------------------------------------------------
// TEST 11: Habit Deactivation Preserves Historical Analytics
// ----------------------------------------------------
runTest('TEST 11: Deactivated habit is excluded from today but preserved in heatmap and total active days', () => {
  const refDate = '2026-09-14';

  const activeHabit = {
    id: 'h_active',
    title: 'Daily Coding',
    active: true,
    targetFrequency: 'daily',
    completionHistory: { '2026-09-14': true }
  };

  const deactivatedHabit = {
    id: 'h_deactivated',
    title: 'Old Fitness Routine',
    active: false, // deactivated!
    targetFrequency: 'daily',
    completionHistory: {
      '2026-09-10': true,
      '2026-09-09': true,
      '2026-09-08': true
    }
  };

  // Today's checklist progress: deactivated habit must not count
  const todayProgress = HabitsData.calculateTodayProgress([activeHabit, deactivatedHabit], refDate);
  assert.strictEqual(todayProgress.total, 1, 'Deactivated habit should not be included in today checklist');

  // Heatmap matrix: deactivated habit history must be preserved
  const heatmap = HabitsData.calculateHeatmapMatrix([activeHabit, deactivatedHabit], 26, refDate);
  let pastCellCount = 0;
  heatmap.forEach(w => w.forEach(d => {
    if (d.date === '2026-09-10') pastCellCount = d.count;
  }));
  assert.strictEqual(pastCellCount, 1, 'Historical completions of deactivated habit must remain in heatmap');
});

console.log(`\nResults: ${passCount} / ${passCount + failCount} tests passed.`);
if (failCount > 0) {
  process.exit(1);
}
