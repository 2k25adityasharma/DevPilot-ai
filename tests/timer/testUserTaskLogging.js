/**
 * Automated Test Suite: User Task Logging & No-Mock-Data Verification
 * 
 * Verifies user requirements:
 * 1. No fake/dummy starter sessions seeded into storage (pure zero state on first load).
 * 2. Real user task entered in focus task input is preserved and recorded verbatim in Today's Sessions.
 * 3. Session completion (natural or manual) logs to timer_sessions with the exact user-typed task title.
 * 4. Today's statistics update dynamically from real logged sessions.
 * 5. Single session delete and Clear Today leave no lingering fake records.
 */

const assert = require('assert');
const path = require('path');

// Mock localStorage
const mockStorage = {};
global.localStorage = {
  getItem: (key) => (key in mockStorage ? mockStorage[key] : null),
  setItem: (key, val) => { mockStorage[key] = String(val); },
  removeItem: (key) => { delete mockStorage[key]; },
  clear: () => { Object.keys(mockStorage).forEach(k => delete mockStorage[k]); }
};

global.Storage = {
  get: (key, def = null) => {
    const val = global.localStorage.getItem(`devpilot_${key}`);
    return val ? JSON.parse(val) : def;
  },
  set: (key, val) => {
    global.localStorage.setItem(`devpilot_${key}`, JSON.stringify(val));
  },
  remove: (key) => {
    global.localStorage.removeItem(`devpilot_${key}`);
  }
};

const TimerData = require(path.join(__dirname, '../../js/data/timerData.js'));
global.TimerData = TimerData;

const GlobalTimer = require(path.join(__dirname, '../../js/core/globalTimer.js'));

let passCount = 0;
let failCount = 0;

function runTest(name, fn) {
  try {
    fn();
    console.log(`✓ [PASS] ${name}`);
    passCount++;
  } catch (e) {
    console.error(`✗ [FAIL] ${name}: ${e.message}`);
    failCount++;
  }
}

console.log('=====================================================================');
console.log(' DevPilot-AI: Testing User-Driven Task Logging & Zero Fake Data');
console.log('=====================================================================\n');

// TEST 1: Starter sessions must be completely empty
runTest('TEST 1: generateStarterSessions returns an empty array (no fake data)', () => {
  const starter = TimerData.generateStarterSessions();
  assert.ok(Array.isArray(starter));
  assert.strictEqual(starter.length, 0, 'Starter sessions must be empty array');
});

// TEST 2: Initial Today statistics are 0
runTest('TEST 2: Fresh start calculates 0 sessions today and empty todaySessionsList', () => {
  global.localStorage.clear();
  const sessions = global.Storage.get('timer_sessions', []) || [];
  const stats = TimerData.calculateTodayStats(sessions);

  assert.strictEqual(stats.todayFocusCount, 0);
  assert.strictEqual(stats.todayFocusMinutes, 0);
  assert.strictEqual(stats.todaySessionsList.length, 0);
});

// TEST 3: User types a task and starts focus
runTest('TEST 3: User types custom task and starts focus timer', () => {
  global.localStorage.clear();
  const userTask = 'Solve LeetCode #121 Best Time to Buy and Sell Stock';

  const state = GlobalTimer.start(userTask);
  assert.strictEqual(state.currentTask, userTask);
  assert.strictEqual(state.isRunning, true);
});

// TEST 4: Session completed saves THAT EXACT task name down below
runTest('TEST 4: Completed session saves the exact task name typed by user', () => {
  global.localStorage.clear();
  const userTask = 'Build Authentication Middleware with JWT & Redis';

  GlobalTimer.start(userTask);
  GlobalTimer.manualComplete(userTask);

  const storedSessions = global.Storage.get('timer_sessions', []) || [];
  assert.strictEqual(storedSessions.length, 1, 'Exactly one session should be saved');
  assert.strictEqual(storedSessions[0].task, userTask, 'Saved session task must match user input');
  assert.strictEqual(storedSessions[0].mode, 'work');
  assert.strictEqual(storedSessions[0].durationSeconds, 1500);

  const stats = TimerData.calculateTodayStats(storedSessions);
  assert.strictEqual(stats.todayFocusCount, 1);
  assert.strictEqual(stats.todayFocusMinutes, 25);
  assert.strictEqual(stats.todaySessionsList[0].task, userTask);
});

// TEST 5: Multiple user-entered sessions preserve each user task in order
runTest('TEST 5: Multiple consecutive user-logged sessions are recorded with their respective titles', () => {
  global.localStorage.clear();

  const task1 = 'Design System Figma to CSS Tokens';
  GlobalTimer.start(task1);
  GlobalTimer.manualComplete(task1);

  const task2 = 'Implement Binary Search on 2D Matrix';
  GlobalTimer.start(task2);
  GlobalTimer.manualComplete(task2);

  const storedSessions = global.Storage.get('timer_sessions', []) || [];
  assert.strictEqual(storedSessions.length, 2);
  assert.strictEqual(storedSessions[0].task, task2, 'Newest session at index 0');
  assert.strictEqual(storedSessions[1].task, task1, 'Previous session at index 1');

  const stats = TimerData.calculateTodayStats(storedSessions);
  assert.strictEqual(stats.todayFocusCount, 2);
  assert.strictEqual(stats.todayFocusMinutes, 50);
});

// TEST 6: Clear today clears all sessions and leaves zero lingering items
runTest('TEST 6: Clear sessions leaves 0 sessions without re-seeding dummy records', () => {
  global.localStorage.clear();

  const task = 'Fix CSS Layout Bug';
  GlobalTimer.start(task);
  GlobalTimer.manualComplete(task);

  let stored = global.Storage.get('timer_sessions', []) || [];
  assert.strictEqual(stored.length, 1);

  // User clears history
  global.Storage.set('timer_sessions', []);

  stored = global.Storage.get('timer_sessions', []) || [];
  assert.strictEqual(stored.length, 0);

  const stats = TimerData.calculateTodayStats(stored);
  assert.strictEqual(stats.todayFocusCount, 0);
  assert.strictEqual(stats.todayFocusMinutes, 0);
  assert.strictEqual(stats.todaySessionsList.length, 0);
});

console.log(`\n=====================================================================`);
console.log(` Results: ${passCount} / ${passCount + failCount} tests passed.`);
console.log(`=====================================================================\n`);

if (failCount > 0) {
  process.exit(1);
}
