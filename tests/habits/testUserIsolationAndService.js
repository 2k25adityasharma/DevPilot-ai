/**
 * DevPilot-AI - Automated Test: User Isolation, Idempotent Completions & Data Access
 */

const assert = require('assert');
const path = require('path');

// Mock localStorage for Node.js environment
const storageStore = {};
global.localStorage = {
  getItem: (key) => storageStore[key] || null,
  setItem: (key, val) => { storageStore[key] = String(val); },
  removeItem: (key) => { delete storageStore[key]; },
  clear: () => { Object.keys(storageStore).forEach(k => delete storageStore[k]); }
};

// Mock BroadcastChannel for Node.js environment
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
    console.error(`✗ [FAIL] ${testName}: ${err.message}`);
    failCount++;
  }
}

async function runAll() {
  console.log('====================================================');
  console.log(' DevPilot-AI: Testing User Isolation & Service Layer');
  console.log('====================================================\n');

  // Test 1: User A Session Init
  await runTest('User A initializes session and creates habit', async () => {
    await AuthService.switchAccount('00000000-0000-4000-a000-000000000001'); // Aditya
    const userA = AuthService.getCurrentUser();
    assert.strictEqual(userA.email, 'aditya@devpilot.ai');

    const habitA = await HabitService.createHabit({
      title: 'Solve 2 LeetCode Problems',
      category: 'DSA'
    });
    assert.strictEqual(habitA.title, 'Solve 2 LeetCode Problems');
    assert.strictEqual(habitA.user_id, userA.id);

    // Complete habit for today
    const toggleRes = await HabitService.toggleCompletion(habitA.id, '2026-09-14');
    assert.strictEqual(toggleRes.completed, true);

    const habitsA = await HabitService.getHabits();
    assert.strictEqual(habitsA.length, 1);
    assert.strictEqual(habitsA[0].title, 'Solve 2 LeetCode Problems');

    const compsA = await HabitService.getCompletions();
    assert.strictEqual(compsA.length, 1);
  });

  // Test 2: User B Switch & Strict Isolation
  await runTest('User B logs in and sees ZERO records from User A', async () => {
    await AuthService.switchAccount('00000000-0000-4000-a000-000000000002'); // Alex Chen
    const userB = AuthService.getCurrentUser();
    assert.strictEqual(userB.email, 'alex.developer@example.com');

    // User B must have 0 habits and 0 completions
    const habitsB = await HabitService.getHabits();
    assert.strictEqual(habitsB.length, 0, 'User B must NOT see User A habits');

    const compsB = await HabitService.getCompletions();
    assert.strictEqual(compsB.length, 0, 'User B must NOT see User A completions');

    // User B creates their own habit
    const habitB = await HabitService.createHabit({
      title: 'Study Go Concurrency',
      category: 'Backend'
    });
    assert.strictEqual(habitB.user_id, userB.id);

    const habitsBAfter = await HabitService.getHabits();
    assert.strictEqual(habitsBAfter.length, 1);
    assert.strictEqual(habitsBAfter[0].title, 'Study Go Concurrency');
  });

  // Test 3: Switch back to User A
  await runTest('Switching back to User A restores User A data completely', async () => {
    await AuthService.switchAccount('00000000-0000-4000-a000-000000000001'); // Aditya
    const userA = AuthService.getCurrentUser();
    assert.strictEqual(userA.email, 'aditya@devpilot.ai');

    const habitsA = await HabitService.getHabits();
    assert.strictEqual(habitsA.length, 1);
    assert.strictEqual(habitsA[0].title, 'Solve 2 LeetCode Problems');

    const compsA = await HabitService.getCompletions();
    assert.strictEqual(compsA.length, 1);
  });

  // Test 4: Idempotency of completions
  await runTest('Toggling habit completion is idempotent and prevents duplicates', async () => {
    const habitsA = await HabitService.getHabits();
    const habitId = habitsA[0].id;
    const dateStr = '2026-09-14';

    // Currently completed -> toggle should uncheck
    const toggle1 = await HabitService.toggleCompletion(habitId, dateStr);
    assert.strictEqual(toggle1.completed, false);
    let comps = await HabitService.getCompletions();
    assert.strictEqual(comps.length, 0);

    // Toggle again -> should complete
    const toggle2 = await HabitService.toggleCompletion(habitId, dateStr);
    assert.strictEqual(toggle2.completed, true);
    comps = await HabitService.getCompletions();
    assert.strictEqual(comps.length, 1);
    assert.strictEqual(comps[0].completion_date, dateStr);
  });

  // Test 5: Daily Goals CRUD & Numeric Progress
  await runTest('Daily goals support numeric targets, increments, and completion toggle', async () => {
    const dg = await HabitService.createDailyGoal({
      title: '3 LeetCode Mediums',
      target: 3,
      category: 'DSA',
      date: '2026-09-14'
    });
    assert.strictEqual(dg.target, 3);
    assert.strictEqual(dg.progress, 0);
    assert.strictEqual(dg.completed, false);

    // Increment progress by 1 -> 1 / 3
    const inc1 = await HabitService.adjustDailyGoalProgress(dg.id, 1);
    assert.strictEqual(inc1.progress, 1);
    assert.strictEqual(inc1.completed, false);

    // Increment progress by 2 -> 3 / 3 (auto completes)
    const inc2 = await HabitService.adjustDailyGoalProgress(dg.id, 2);
    assert.strictEqual(inc2.progress, 3);
    assert.strictEqual(inc2.completed, true);

    // Toggle complete
    const toggled = await HabitService.toggleDailyGoalComplete(dg.id);
    assert.strictEqual(toggled.completed, false);

    // Delete
    const deleted = await HabitService.deleteDailyGoal(dg.id);
    assert.strictEqual(deleted, true);
    const remaining = await HabitService.getDailyGoals('2026-09-14');
    assert.strictEqual(remaining.length, 0);
  });

  console.log(`\n====================================================`);
  console.log(` Service Integration: ${passCount} Passed, ${failCount} Failed`);
  console.log(`====================================================`);

  if (failCount > 0) process.exit(1);
}

runAll().catch(err => {
  console.error(err);
  process.exit(1);
});
