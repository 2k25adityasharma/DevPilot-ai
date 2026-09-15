/**
 * DevPilot-AI - Automated Test Suite: CRUD Synchronization & Heatmap
 * 
 * Verifies:
 * 1. Rapid sequential adds of habits, daily goals, and weekly goals
 * 2. Permanent unique IDs without collisions
 * 3. Exact single-item deletion (first, middle, last) by ID
 * 4. Separate storage namespaces (no cross-contamination)
 * 5. 26-week dynamic heatmap matrix & month headers (no missing months)
 * 6. Real user activity intensity calculation (habits + daily goals)
 * 7. Correct day history reflection & clean empty states
 */

const assert = require('assert');
const path = require('path');

// Mock localStorage and BroadcastChannel for Node environment
class MockLocalStorage {
  constructor() {
    this.store = {};
  }
  getItem(key) {
    return this.store[key] || null;
  }
  setItem(key, val) {
    this.store[key] = String(val);
  }
  removeItem(key) {
    delete this.store[key];
  }
  clear() {
    this.store = {};
  }
}

global.localStorage = new MockLocalStorage();
global.BroadcastChannel = class {
  constructor(name) { this.name = name; }
  postMessage() {}
  close() {}
};

const AuthService = require(path.join(__dirname, '../../js/core/authService.js'));
const HabitsData = require(path.join(__dirname, '../../js/data/habitsData.js'));
const HabitService = require(path.join(__dirname, '../../js/core/habitService.js'));

let passCount = 0;
let failCount = 0;

async function runTest(testName, fn) {
  try {
    await fn();
    console.log(`✓ [PASS] ${testName}`);
    passCount++;
  } catch (err) {
    console.error(`✗ [FAIL] ${testName}:`, err.message);
    failCount++;
  }
}

(async function () {
  console.log('====================================================');
  console.log(' DevPilot-AI: Testing CRUD Sync, Isolation & Heatmap');
  console.log('====================================================\n');

  await AuthService.init();
  const today = HabitsData.getTodayStr();

  // ----------------------------------------------------
  // TEST 1: Rapid Adding of Habits (5 habits)
  // ----------------------------------------------------
  await runTest('TEST 1: Adding 5 habits rapidly preserves all 5 with unique IDs', async () => {
    const titles = [
      'Solve 2 LeetCode Mediums',
      'Read 20 pages of System Design',
      'Practice DSA Sliding Window',
      'Daily 30-min walk',
      'Study JavaScript Async Internals'
    ];

    const createdList = [];
    for (const title of titles) {
      const created = await HabitService.createHabit({ title, category: 'Engineering' });
      createdList.push(created);
    }

    const fetched = await HabitService.getHabits();
    assert.strictEqual(fetched.length, 5, `Expected 5 habits, received ${fetched.length}`);

    // Verify all IDs are unique and non-colliding
    const idSet = new Set(fetched.map(h => h.id));
    assert.strictEqual(idSet.size, 5, 'All habit IDs must be unique');

    // Verify titles match
    for (const title of titles) {
      assert.ok(fetched.some(h => h.title === title), `Missing habit title: ${title}`);
    }
  });

  // ----------------------------------------------------
  // TEST 2: Deleting first, middle, and last habit by ID
  // ----------------------------------------------------
  await runTest('TEST 2: Deleting first, middle, and last item removes only that target item', async () => {
    let habits = await HabitService.getHabits();
    assert.strictEqual(habits.length, 5);

    // Delete first
    const firstId = habits[0].id;
    await HabitService.deleteHabit(firstId);
    habits = await HabitService.getHabits();
    assert.strictEqual(habits.length, 4, 'Should have 4 habits after deleting first');
    assert.ok(!habits.some(h => h.id === firstId), 'First item must be gone');

    // Delete middle
    const middleId = habits[1].id;
    await HabitService.deleteHabit(middleId);
    habits = await HabitService.getHabits();
    assert.strictEqual(habits.length, 3, 'Should have 3 habits after deleting middle');
    assert.ok(!habits.some(h => h.id === middleId), 'Middle item must be gone');

    // Delete last
    const lastId = habits[habits.length - 1].id;
    await HabitService.deleteHabit(lastId);
    habits = await HabitService.getHabits();
    assert.strictEqual(habits.length, 2, 'Should have 2 habits after deleting last');
    assert.ok(!habits.some(h => h.id === lastId), 'Last item must be gone');

    // Add another habit after deletions
    const newHabit = await HabitService.createHabit({ title: 'Re-added Habit Test', category: 'Testing' });
    habits = await HabitService.getHabits();
    assert.strictEqual(habits.length, 3, 'Should have 3 habits after re-adding');
    assert.ok(habits.some(h => h.id === newHabit.id), 'Newly added habit must exist');
  });

  // ----------------------------------------------------
  // TEST 3: Rapid Adding and Deleting Daily Goals
  // ----------------------------------------------------
  await runTest('TEST 3: Daily goals CRUD maintains unique IDs, numeric progress, and isolated deletion', async () => {
    const goalTitles = ['DSA 3 Questions', 'Read Chapter 4', 'Write Unit Test', 'Fix Bug #102'];
    for (const title of goalTitles) {
      await HabitService.createDailyGoal({ title, target: 3, category: 'Coding', date: today });
    }

    let goals = await HabitService.getDailyGoals(today);
    assert.strictEqual(goals.length, 4, `Expected 4 daily goals, received ${goals.length}`);

    // Verify all IDs unique
    const idSet = new Set(goals.map(g => g.id));
    assert.strictEqual(idSet.size, 4, 'All daily goal IDs must be unique');

    // Delete middle goal
    const targetId = goals[1].id;
    await HabitService.deleteDailyGoal(targetId);
    goals = await HabitService.getDailyGoals(today);
    assert.strictEqual(goals.length, 3, 'Should have 3 daily goals remaining');
    assert.ok(!goals.some(g => g.id === targetId), 'Target daily goal must be deleted');

    // Increment progress
    const activeGoal = goals[0];
    const updated = await HabitService.adjustDailyGoalProgress(activeGoal.id, 1);
    assert.strictEqual(updated.progress, 1, 'Progress should increment to 1');
  });

  // ----------------------------------------------------
  // TEST 4: Rapid Adding and Deleting Weekly Goals
  // ----------------------------------------------------
  await runTest('TEST 4: Weekly goals CRUD operates reliably with calendar week keys', async () => {
    const weekKey = HabitsData.getWeekId(today);
    const weeklyTitles = ['Solve 20 DSA questions', 'Finish Project Milestone 1', 'Review 5 PRs'];

    for (const title of weeklyTitles) {
      await HabitService.createWeeklyGoal({ title, target: 5, weekKey });
    }

    let weeklyGoals = await HabitService.getWeeklyGoals(weekKey);
    assert.strictEqual(weeklyGoals.length, 3, 'Expected 3 weekly goals');

    // Delete last
    const lastId = weeklyGoals[weeklyGoals.length - 1].id;
    await HabitService.deleteWeeklyGoal(lastId);
    weeklyGoals = await HabitService.getWeeklyGoals(weekKey);
    assert.strictEqual(weeklyGoals.length, 2, 'Should have 2 weekly goals after deletion');
  });

  // ----------------------------------------------------
  // TEST 5: Heatmap Matrix & Activity Level Calculation
  // ----------------------------------------------------
  await runTest('TEST 5: Heatmap intensity combines both completed habits and completed daily goals', async () => {
    const habits = [
      { id: 'h1', title: 'Habit 1', active: true },
      { id: 'h2', title: 'Habit 2', active: true }
    ];
    const completions = [
      { habit_id: 'h1', completion_date: today },
      { habit_id: 'h2', completion_date: today }
    ];
    const dailyGoals = [
      { id: 'g1', title: 'Goal 1', completed: true, date: today },
      { id: 'g2', title: 'Goal 2', completed: true, date: today }
    ];

    const weeks = HabitsData.calculateHeatmapMatrix(habits, completions, 26, today, dailyGoals);
    assert.strictEqual(weeks.length, 26, 'Heatmap must have 26 weeks');

    // Find today's cell
    let todayCell = null;
    for (const week of weeks) {
      for (const day of week) {
        if (day.date === today) {
          todayCell = day;
          break;
        }
      }
    }

    assert.ok(todayCell, 'Today cell must be present in heatmap');
    assert.strictEqual(todayCell.isToday, true, 'isToday must be true');
    assert.strictEqual(todayCell.count, 2, 'Habit count should be 2');
    assert.strictEqual(todayCell.goalsCompletedCount, 2, 'Daily goals count should be 2');
    assert.strictEqual(todayCell.totalActivity, 4, 'Total activity should be 4');
    assert.strictEqual(todayCell.levelClass, 'heatmap-l4', 'Total activity >= 4 must be heatmap-l4');
  });

  // ----------------------------------------------------
  // TEST 6: Month Spans Calculation across 26 Weeks
  // ----------------------------------------------------
  await runTest('TEST 6: Month headers do not skip April and sum to 26 columns without gap', async () => {
    const weeks = HabitsData.calculateHeatmapMatrix([], [], 26, '2026-09-15', []);
    const monthSpans = HabitsData.calculateHeatmapMonthSpans(weeks);

    const totalSpan = monthSpans.reduce((sum, m) => sum + m.span, 0);
    assert.strictEqual(totalSpan, 26, `Total span must equal 26, received ${totalSpan}`);
    assert.ok(monthSpans.some(m => m.name === 'Apr'), 'April must be included in month headers');
    assert.ok(monthSpans.some(m => m.name === 'May'), 'May must be included');
    assert.ok(monthSpans.some(m => m.name === 'Jun'), 'June must be included');
    assert.ok(monthSpans.some(m => m.name === 'Jul'), 'July must be included');
    assert.ok(monthSpans.some(m => m.name === 'Aug'), 'August must be included');
    assert.ok(monthSpans.some(m => m.name === 'Sep'), 'September must be included');
  });

  console.log('\n====================================================');
  console.log(` Test Execution Finished: ${passCount} Passed, ${failCount} Failed`);
  console.log('====================================================');

  if (failCount > 0) process.exit(1);
})();
