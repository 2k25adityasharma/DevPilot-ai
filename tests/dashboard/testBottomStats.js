/**
 * DevPilot-AI - Automated Test Suite for Dashboard Bottom Summary Statistics
 * Validates: Focus Time Today, Top Skill with weighted scoring, Tasks Completed, Current Streak, and User Isolation
 */

const assert = require('assert');

// Mock browser globals & localStorage
const store = {};
global.localStorage = {
  getItem: (k) => (k in store ? store[k] : null),
  setItem: (k, v) => { store[k] = String(v); },
  removeItem: (k) => { delete store[k]; },
  clear: () => { Object.keys(store).forEach(k => delete store[k]); }
};

global.window = {
  addEventListener: () => {},
  removeEventListener: () => {},
  Storage: {
    get: (key, def = null) => {
      const v = global.localStorage.getItem(`devpilot_${key}`);
      return v ? JSON.parse(v) : def;
    },
    set: (key, val) => {
      global.localStorage.setItem(`devpilot_${key}`, JSON.stringify(val));
    }
  }
};

// Require core modules
const AuthService = require('../../js/core/authService.js');
const TimerData = require('../../js/data/timerData.js');
const HabitsData = require('../../js/data/habitsData.js');
const HabitService = require('../../js/core/habitService.js');
const DashboardDataService = require('../../js/core/dashboardDataService.js');

global.AuthService = AuthService;
global.TimerData = TimerData;
global.HabitsData = HabitsData;
global.HabitService = HabitService;

console.log('====================================================');
console.log(' DevPilot-AI: Testing Dashboard Bottom Stats');
console.log('====================================================\n');

let passedTests = 0;
let totalTests = 0;

async function runTest(name, fn) {
  totalTests++;
  try {
    await fn();
    console.log(`✓ [PASS] TEST ${totalTests}: ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`✗ [FAIL] TEST ${totalTests}: ${name}`);
    console.error(err);
    process.exitCode = 1;
  }
}

async function runAll() {
// TEST 1: New User Empty State
// ------------------------------------------------------------------
runTest('New user with zero activity starts with clean empty states', async () => {
  global.localStorage.clear();
  await AuthService.switchAccount('00000000-0000-4000-a000-000000000002'); // Alex Chen (fresh)

  const focusStats = DashboardDataService.getFocusTimeToday();
  assert.strictEqual(focusStats.minutes, 0);
  assert.strictEqual(focusStats.displayStr, '0m');
  assert.strictEqual(focusStats.sessionsCount, 0);

  const topSkill = DashboardDataService.getTopSkill('week');
  assert.strictEqual(topSkill.hasActivity, false);
  assert.strictEqual(topSkill.skill, 'No activity yet');
  assert.strictEqual(topSkill.subtext, '0 activities this week');
  assert.strictEqual(topSkill.icon, 'data_object');

  const tasks = DashboardDataService.getTodayTasksSummary();
  assert.strictEqual(tasks.completed, 0);
  assert.strictEqual(tasks.total, 0);
  assert.strictEqual(tasks.percentage, 0);
  assert.strictEqual(tasks.fractionText, '0 / 0');
  assert.strictEqual(tasks.percentageText, '0% today');

  const streak = DashboardDataService.getStreak();
  assert.strictEqual(streak.currentStreak, 0);
});

// ------------------------------------------------------------------
// TEST 2: Focus Time Today (Multi-session, sub-hour, local date)
// ------------------------------------------------------------------
runTest('Focus Time Today calculates completed focus minutes and formats correctly', async () => {
  global.localStorage.clear();
  await AuthService.switchAccount('00000000-0000-4000-a000-000000000001');
  const user = AuthService.getCurrentUser();
  const userId = user.id;

  const nowIso = new Date().toISOString();

  // Add 3 sessions: 25 min (1500s), 40 min (2400s), 30 min (1800s) = 95 min = 1h 35m
  const sessions = [
    { id: 'ts_1', mode: 'work', durationSeconds: 1500, completedAt: nowIso, task: 'DSA practice' },
    { id: 'ts_2', mode: 'work', durationSeconds: 2400, completedAt: nowIso, task: 'System Design' },
    { id: 'ts_3', mode: 'work', durationSeconds: 1800, completedAt: nowIso, task: 'JavaScript' },
    { id: 'ts_break', mode: 'shortBreak', durationSeconds: 300, completedAt: nowIso } // breaks should NOT count
  ];

  window.Storage.set(`u_${userId}_timer_sessions`, sessions);

  const stats = DashboardDataService.getFocusTimeToday();
  assert.strictEqual(stats.minutes, 95);
  assert.strictEqual(stats.displayStr, '1h 35m');
  assert.strictEqual(stats.sessionsCount, 3);

  // Sub-hour session (e.g. single 35m session)
  window.Storage.set(`u_${userId}_timer_sessions`, [
    { id: 'ts_sub', mode: 'work', durationSeconds: 2100, completedAt: nowIso, task: 'Clean Code' }
  ]);

  const subStats = DashboardDataService.getFocusTimeToday();
  assert.strictEqual(subStats.minutes, 35);
  assert.strictEqual(subStats.displayStr, '35m');
  assert.strictEqual(subStats.sessionsCount, 1);
});

// ------------------------------------------------------------------
// TEST 3: Top Skill Weighted Scoring (Focus time vs Tasks)
// ------------------------------------------------------------------
runTest('Top Skill correctly weights focus time and tasks instead of simple count', async () => {
  global.localStorage.clear();
  await AuthService.switchAccount('00000000-0000-4000-a000-000000000001');
  const user = AuthService.getCurrentUser();
  const userId = user.id;
  const nowIso = new Date().toISOString();

  // Scenario: JavaScript has 2 hours of focus time (120 mins => 8 points).
  // DSA has 2 completed tasks (4 points).
  // JavaScript should WIN over DSA despite DSA having tasks.
  const sessions = [
    { id: 'ts_js1', mode: 'work', durationSeconds: 3600, completedAt: nowIso, task: 'JavaScript Async / Await' },
    { id: 'ts_js2', mode: 'work', durationSeconds: 3600, completedAt: nowIso, task: 'JavaScript Promises' }
  ];
  window.Storage.set(`devpilot_u_${userId}_timer_sessions`, sessions);

  const dailyGoals = [
    { id: 'dg_1', title: 'Two Pointers DSA', category: 'DSA', completed: true, date: DashboardDataService.getTodayDateStr() },
    { id: 'dg_2', title: 'Binary Search DSA', category: 'DSA', completed: true, date: DashboardDataService.getTodayDateStr() }
  ];
  window.Storage.set(`devpilot_u_${userId}_daily_goals`, dailyGoals);

  const topSkill = DashboardDataService.getTopSkill('week');
  assert.strictEqual(topSkill.hasActivity, true);
  assert.strictEqual(topSkill.skill, 'JavaScript');
  assert.strictEqual(topSkill.activitiesCount, 2);
  assert.strictEqual(topSkill.subtext, '2 activities this week');

  // Now, user solves 10 DSA questions (10 * 3 = 30 points)
  const dsaProgress = {};
  for (let i = 1; i <= 10; i++) {
    dsaProgress[`q_${i}`] = { solved: true };
  }
  window.Storage.set('dsa_progress', dsaProgress);
  window.Storage.set('dsa_preferred_lang', 'cpp');

  const newTopSkill = DashboardDataService.getTopSkill('week');
  assert.strictEqual(newTopSkill.hasActivity, true);
  assert.strictEqual(newTopSkill.skill, 'DSA in C++');
  assert.strictEqual(newTopSkill.activitiesCount, 12); // 10 questions + 2 daily goals
});

// ------------------------------------------------------------------
// TEST 4: Tasks Completed Today & Percentage Calculation
// ------------------------------------------------------------------
runTest('Tasks Completed reflects today goals, fraction text, and percentage', async () => {
  global.localStorage.clear();
  await AuthService.switchAccount('00000000-0000-4000-a000-000000000001');
  const user = AuthService.getCurrentUser();
  const userId = user.id;
  const todayStr = DashboardDataService.getTodayDateStr();

  const dailyGoals = [
    { id: 'dg_1', title: 'Review PRs', date: todayStr, completed: true },
    { id: 'dg_2', title: 'Solve Graph Problem', date: todayStr, completed: true },
    { id: 'dg_3', title: 'Write Tests', date: todayStr, completed: false }
  ];
  window.Storage.set(`devpilot_u_${userId}_daily_goals`, dailyGoals);

  const summary = DashboardDataService.getTodayTasksSummary();
  assert.strictEqual(summary.completed, 2);
  assert.strictEqual(summary.total, 3);
  assert.strictEqual(summary.percentage, 67);
  assert.strictEqual(summary.fractionText, '2 / 3');
  assert.strictEqual(summary.percentageText, '67% today');

  // Toggle third goal to complete
  DashboardDataService.toggleDailyGoal('dg_3');
  const updated = DashboardDataService.getTodayTasksSummary();
  assert.strictEqual(updated.completed, 3);
  assert.strictEqual(updated.total, 3);
  assert.strictEqual(updated.percentage, 100);
  assert.strictEqual(updated.percentageText, '100% today');
});

// ------------------------------------------------------------------
// TEST 5: Current Streak Synchronization
// ------------------------------------------------------------------
runTest('Current Streak is derived from actual habit completions', async () => {
  global.localStorage.clear();
  await AuthService.switchAccount('00000000-0000-4000-a000-000000000001');
  const user = AuthService.getCurrentUser();
  const userId = user.id;
  const todayStr = DashboardDataService.getTodayDateStr();

  const habits = [
    { id: 'h_1', title: 'Daily Coding', frequency: 'daily', created_at: '2026-09-01' }
  ];
  const completions = [
    { habit_id: 'h_1', completion_date: todayStr }
  ];

  window.Storage.set(`devpilot_u_${userId}_habits`, habits);
  window.Storage.set(`devpilot_u_${userId}_completions`, completions);

  const streak = DashboardDataService.getStreak();
  assert.strictEqual(streak.currentStreak, 1);
  assert.strictEqual(streak.isExtendedToday, true);
});

// ------------------------------------------------------------------
// TEST 6: Multi-User Data Isolation
// ------------------------------------------------------------------
runTest('User switching provides complete isolation of bottom statistics', async () => {
  global.localStorage.clear();

  // Setup User A (Aditya) with 45m focus and React tasks
  await AuthService.switchAccount('00000000-0000-4000-a000-000000000001');
  const userA = AuthService.getCurrentUser();
  const todayStr = DashboardDataService.getTodayDateStr();
  const nowIso = new Date().toISOString();

  window.Storage.set(`devpilot_u_${userA.id}_timer_sessions`, [
    { id: 'ts_a', mode: 'work', durationSeconds: 2700, completedAt: nowIso, task: 'React UI' }
  ]);
  window.Storage.set(`devpilot_u_${userA.id}_daily_goals`, [
    { id: 'dg_a1', title: 'Build Header', date: todayStr, completed: true }
  ]);

  const statsA = DashboardDataService.getFocusTimeToday();
  const skillA = DashboardDataService.getTopSkill('week');
  const tasksA = DashboardDataService.getTodayTasksSummary();

  assert.strictEqual(statsA.displayStr, '45m');
  assert.strictEqual(skillA.skill, 'Frontend Development');
  assert.strictEqual(tasksA.fractionText, '1 / 1');

  // Switch to User B (Alex)
  await AuthService.switchAccount('00000000-0000-4000-a000-000000000002');

  const statsB = DashboardDataService.getFocusTimeToday();
  const skillB = DashboardDataService.getTopSkill('week');
  const tasksB = DashboardDataService.getTodayTasksSummary();

  assert.strictEqual(statsB.displayStr, '0m');
  assert.strictEqual(skillB.skill, 'No activity yet');
  assert.strictEqual(tasksB.fractionText, '0 / 0');

  console.log('\n====================================================');
  console.log(` Test Execution Finished: ${passedTests} Passed, ${totalTests - passedTests} Failed`);
  console.log('====================================================\n');
}

runAll();
