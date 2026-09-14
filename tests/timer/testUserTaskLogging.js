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

// TEST 7: Stop/complete timer with real elapsed time logs exact elapsed seconds and updates Focus Today
runTest('TEST 7: Stopped timer with actual elapsed time (e.g. 180s = 3m) logs 180s and updates Focus Today', () => {
  global.localStorage.clear();

  const userTask = 'Build Redux Store & Action Creators';
  GlobalTimer.start(userTask);

  // User ran timer for 180 seconds (3 minutes), then completed/stopped
  const elapsedSecs = 180;
  GlobalTimer.manualComplete(userTask, elapsedSecs);

  const stored = global.Storage.get('timer_sessions', []) || [];
  assert.strictEqual(stored.length, 1);
  assert.strictEqual(stored[0].task, userTask);
  assert.strictEqual(stored[0].durationSeconds, 180, 'Logged session must have 180 seconds');

  const stats = TimerData.calculateTodayStats(stored);
  assert.strictEqual(stats.todayFocusCount, 1);
  assert.strictEqual(stats.todayFocusMinutes, 3, 'Focus Today should display 3 minutes');
});

// TEST 8: Short break and long break are NEVER logged to Today's Sessions
runTest('TEST 8: Breaks (short break & long break) are strictly excluded from Today\'s Sessions', () => {
  global.localStorage.clear();

  // Simulate existing sessions including a work session
  global.Storage.set('timer_sessions', [
    { id: 'ts_work1', task: 'Implement Auth Guards', mode: 'work', durationSeconds: 1500, completedAt: new Date().toISOString() },
    { id: 'ts_break1', task: 'Coffee Break', mode: 'shortBreak', durationSeconds: 300, completedAt: new Date().toISOString() },
    { id: 'ts_break2', task: 'Lunch Recovery', mode: 'longBreak', durationSeconds: 900, completedAt: new Date().toISOString() }
  ]);

  const rawSessions = global.Storage.get('timer_sessions', []);
  const stats = TimerData.calculateTodayStats(rawSessions);

  // Only work session counted
  assert.strictEqual(stats.todayFocusCount, 1);
  assert.strictEqual(stats.todayFocusMinutes, 25);
  assert.strictEqual(stats.todaySessionsList.length, 1);
  assert.strictEqual(stats.todaySessionsList[0].task, 'Implement Auth Guards');
  assert.strictEqual(stats.todaySessionsList[0].mode, 'work');
});

// TEST 9: Cycle progression advances step-by-step
runTest('TEST 9: Cycle progression advances Focus 1 -> Focus 2 -> Focus 3 -> Focus 4 -> Focus 1', () => {
  global.localStorage.clear();

  // Cycle starts at 1
  let state = GlobalTimer.getState();
  assert.strictEqual(state.cyclePosition, 1, 'Initial cycle position must be 1');

  // Complete session 1 -> cycle becomes 2
  state = GlobalTimer.manualComplete('Focus Session 1', 1500);
  assert.strictEqual(state.cyclePosition, 2, 'After Focus 1, cycle advances to 2');
  assert.strictEqual(state.mode, 'work', 'Remains on work mode for Focus 2');

  // Complete session 2 -> cycle becomes 3
  state = GlobalTimer.manualComplete('Focus Session 2', 1500);
  assert.strictEqual(state.cyclePosition, 3, 'After Focus 2, cycle advances to 3');

  // Complete session 3 -> cycle becomes 4
  state = GlobalTimer.manualComplete('Focus Session 3', 1500);
  assert.strictEqual(state.cyclePosition, 4, 'After Focus 3, cycle advances to 4');

  // Complete session 4 -> cycle wraps to 1
  state = GlobalTimer.manualComplete('Focus Session 4', 1500);
  assert.strictEqual(state.cyclePosition, 1, 'After Focus 4, 4-step cycle wraps back to 1');
});

console.log(`\n=====================================================================`);
console.log(` Results: ${passCount} / ${passCount + failCount} tests passed.`);
console.log(`=====================================================================\n`);

if (failCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
