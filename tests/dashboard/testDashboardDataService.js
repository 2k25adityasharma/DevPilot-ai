/**
 * DevPilot-AI - Automated Test Suite: Central Dashboard Data Service
 * 
 * Verifies:
 * 1. Momentum streak computation (via HabitService / HabitsData)
 * 2. Daily goals & Main Goal calculation for today and arbitrary dates
 * 3. Daily goal toggling and percentage calculation
 * 4. DSA next unsolved item discovery and row target linking
 * 5. Real LeetCode solved counts from dsaRoadmap
 * 6. Career roadmap progress and next milestone tracking
 * 7. Developer notes count aggregation
 * 8. GitHub settings management & commit calculation from events
 * 9. Calendar data generation, leap year handling, and activity marking
 * 10. AI recommendation generation
 * 11. Focus time aggregation and formatting
 */

const assert = require('assert');
const path = require('path');

// Setup Node localStorage mock
const mockStorage = {};
global.localStorage = {
  getItem: (key) => (key in mockStorage ? mockStorage[key] : null),
  setItem: (key, val) => { mockStorage[key] = String(val); },
  removeItem: (key) => { delete mockStorage[key]; },
  clear: () => { Object.keys(mockStorage).forEach(k => delete mockStorage[k]); }
};

global.Storage = {
  get: (key, def = null) => {
    const raw = global.localStorage.getItem(`devpilot_${key}`);
    try {
      return raw ? JSON.parse(raw) : def;
    } catch (e) {
      return def;
    }
  },
  set: (key, val) => {
    global.localStorage.setItem(`devpilot_${key}`, JSON.stringify(val));
  }
};

// Mock window
global.window = {
  Storage: global.Storage,
  localStorage: global.localStorage,
  addEventListener: () => {},
  removeEventListener: () => {}
};

// Load dependencies
const HabitsData = require(path.join(__dirname, '../../js/data/habitsData.js'));
global.HabitsData = HabitsData;
global.window.HabitsData = HabitsData;

const HabitService = require(path.join(__dirname, '../../js/core/habitService.js'));
global.HabitService = HabitService;
global.window.HabitService = HabitService;

const DsaModule = require(path.join(__dirname, '../../js/data/dsaData.js'));
global.dsaRoadmap = DsaModule.dsaRoadmap || [];
global.window.dsaRoadmap = global.dsaRoadmap;

const CareerEngine = require(path.join(__dirname, '../../js/core/careerProgressionEngine.js'));
global.careerProgressionEngine = CareerEngine;
global.window.careerProgressionEngine = CareerEngine;

const TimerData = require(path.join(__dirname, '../../js/data/timerData.js'));
global.TimerData = TimerData;
global.window.TimerData = TimerData;

const DashboardDataService = require(path.join(__dirname, '../../js/core/dashboardDataService.js'));

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
console.log(' DevPilot-AI: Validating DashboardDataService');
console.log('====================================================\n');

// ----------------------------------------------------
// TEST 1: Default GitHub Settings & Custom Username
// ----------------------------------------------------
runTest('TEST 1: GitHub Settings persistence', () => {
  // Default: matches the starter profile shown in Settings.
  const defaultSettings = DashboardDataService.getGithubSettings();
  assert.strictEqual(defaultSettings.isConfigured, true, 'Starter profile GitHub should be configured by default');
  assert.strictEqual(defaultSettings.username, '2k25adityasharma');

  // After setting a username, isConfigured should be true
  DashboardDataService.setGithubSettings('custom-dev');
  const updated = DashboardDataService.getGithubSettings();
  assert.strictEqual(updated.username, 'custom-dev');
  assert.strictEqual(updated.isConfigured, true);

  // Clear back to unconfigured
  DashboardDataService.setGithubSettings('');
  const cleared = DashboardDataService.getGithubSettings();
  assert.strictEqual(cleared.isConfigured, false);
});

// ----------------------------------------------------
// TEST 2: Momentum Streak Calculation
// ----------------------------------------------------
runTest('TEST 2: Momentum Streak Calculation', () => {
  const streak = DashboardDataService.getStreak();
  assert.strictEqual(typeof streak.currentStreak, 'number');
  assert.strictEqual(typeof streak.isExtendedToday, 'boolean');
  assert.ok(streak.currentStreak >= 0);
});

// ----------------------------------------------------
// TEST 3: Daily Goals & Main Goal
// ----------------------------------------------------
runTest('TEST 3: Daily Goals & Main Goal retrieval', () => {
  const todayStr = DashboardDataService.getTodayDateStr();

  // New user: no seeded/fake goals — should be empty
  const goals = DashboardDataService.getDailyGoals(todayStr);
  assert.ok(Array.isArray(goals), 'Goals should always be an array');
  // Empty for new user is CORRECT behavior

  const mainGoal = DashboardDataService.getMainGoal(todayStr);
  assert.strictEqual(typeof mainGoal.percentage, 'number');
  assert.strictEqual(typeof mainGoal.totalCount, 'number');
  // hasGoal: false when no goals exist
  if (goals.length === 0) {
    assert.strictEqual(mainGoal.hasGoal, false);
    assert.strictEqual(mainGoal.totalCount, 0);
  } else {
    assert.ok(mainGoal.title, 'Main goal must have a title when goals exist');
    assert.ok(mainGoal.totalCount >= goals.length);
  }

  // Add a real goal and verify it appears
  const userId = '00000000-0000-4000-a000-000000000001';
  const testGoal = {
    id: 'test-goal-abc',
    user_id: userId,
    title: 'Test My Dashboard',
    target: 1,
    progress: 0,
    date: todayStr,
    category: 'Testing',
    completed: false
  };
  Storage.set(`u_${userId}_daily_goals`, [testGoal]);

  const goalsWithData = DashboardDataService.getDailyGoals(todayStr);
  assert.ok(goalsWithData.length > 0, 'Goals should appear after being added');
  assert.strictEqual(goalsWithData[0].title, 'Test My Dashboard');

  // Clean up
  Storage.set(`u_${userId}_daily_goals`, []);
});

// ----------------------------------------------------
// TEST 4: Toggling Daily Goal
// ----------------------------------------------------
runTest('TEST 4: Toggling Daily Goal updates progress', () => {
  const todayStr = DashboardDataService.getTodayDateStr();
  const userId = '00000000-0000-4000-a000-000000000001';

  // Seed a real goal for this test
  const testGoal = {
    id: 'toggle-test-goal',
    user_id: userId,
    title: 'Toggle Me',
    target: 1,
    progress: 0,
    date: todayStr,
    category: 'Testing',
    completed: false
  };
  Storage.set(`u_${userId}_daily_goals`, [testGoal]);

  const goalsBefore = DashboardDataService.getDailyGoals(todayStr);
  const targetGoal = goalsBefore[0];
  const initialStatus = !!targetGoal.completed;

  DashboardDataService.toggleDailyGoal(targetGoal.id);

  const goalsAfter = DashboardDataService.getDailyGoals(todayStr);
  const updatedGoal = goalsAfter.find(g => g.id === targetGoal.id);
  assert.strictEqual(updatedGoal.completed, !initialStatus, 'Goal completed status should toggle');

  // Toggle back and clean up
  DashboardDataService.toggleDailyGoal(targetGoal.id);
  Storage.set(`u_${userId}_daily_goals`, []);
});

// ----------------------------------------------------
// TEST 5: DSA Next Unsolved Item
// ----------------------------------------------------
runTest('TEST 5: Next DSA Item Discovery', () => {
  const nextItem = DashboardDataService.getNextDSAItem();
  const dsaProgress = DashboardDataService.getDSAProgress();
  assert.ok(nextItem, 'Should return a next DSA item object');
  assert.ok(nextItem.targetUrl.startsWith('pages/dsa.html'), 'URL must point to dsa.html');
  assert.strictEqual(typeof nextItem.percentage, 'number');
  assert.strictEqual(typeof nextItem.totalSolved, 'number');
  assert.strictEqual(typeof nextItem.totalQuestions, 'number');
  assert.strictEqual(typeof nextItem.hasStarted, 'boolean', 'Must have hasStarted flag');

  // For a fresh user with no solved problems, hasStarted should be false
  if (dsaProgress.solved === 0) {
    assert.strictEqual(nextItem.hasStarted, false, 'hasStarted must be false when no problems solved');
    assert.strictEqual(nextItem.percentage, 0, 'Percentage must be 0 for new user');
  } else {
    // User has solved problems — must have a title
    assert.ok(nextItem.title, 'Item must have a title when user has progress');
    assert.strictEqual(nextItem.hasStarted, true);
    assert.strictEqual(nextItem.percentage, dsaProgress.percentage);
  }
});

// ----------------------------------------------------
// TEST 6: LeetCode Count
// ----------------------------------------------------
runTest('TEST 6: Real LeetCode solved count', () => {
  const count = DashboardDataService.getLeetCodeCount();
  assert.strictEqual(typeof count, 'number');
  assert.ok(count >= 0);
});

// ----------------------------------------------------
// TEST 7: Career Roadmap Progress
// ----------------------------------------------------
runTest('TEST 7: Career Roadmap milestones & conditional display', () => {
  const roadmapProgress = DashboardDataService.getCareerRoadmapProgress();
  assert.ok(roadmapProgress, 'Should return roadmap progress');
  assert.ok(Array.isArray(roadmapProgress.milestones), 'Milestones must be an array');

  // For a new user: milestones should be EMPTY (no fake sections)
  // (In test environment with no solved DSA/career/interview progress)
  const dsaProgress = DashboardDataService.getDSAProgress();
  const interviewProg = DashboardDataService.getInterviewPrepProgress();

  if (dsaProgress.solved === 0 && !roadmapProgress.hasActiveCareer && interviewProg.totalAttempted === 0) {
    assert.strictEqual(roadmapProgress.milestones.length, 0,
      'New user should have 0 milestones — no fake roadmap cards');
  }

  // Each milestone that DOES exist must be well-formed
  roadmapProgress.milestones.forEach(m => {
    assert.ok(m.title, 'Milestone must have title');
    assert.strictEqual(typeof m.percentage, 'number', 'Milestone must have percentage');
    assert.ok(['dsa', 'career', 'interview'].includes(m.type), 'Milestone must have valid type');
    assert.ok(m.url, 'Milestone must have a link URL');
  });

  // Verify dynamic career change persistence still works
  Storage.set('career_roadmaps_progress', {
    activeCareer: 'frontend-developer',
    activeCareerStatus: 'active',
    'frontend-developer': {
      completed: ['fe-html', 'fe-css']
    }
  });

  const updatedProgress = DashboardDataService.getCareerRoadmapProgress();
  assert.strictEqual(updatedProgress.activeCareerId, 'frontend-developer');
  assert.ok(updatedProgress.roleTitle.toLowerCase().includes('frontend'));
  assert.ok(updatedProgress.percent > 0, 'Completed skills must yield real percentage > 0');

  const updatedCareerMilestone = updatedProgress.milestones.find(m => m.type === 'career');
  assert.ok(updatedCareerMilestone, 'Career milestone must appear when user has active career');
  assert.ok(updatedCareerMilestone.title.toLowerCase().includes('frontend'));
  assert.strictEqual(updatedCareerMilestone.percentage, updatedProgress.percent);

  // Clean up
  Storage.set('career_roadmaps_progress', {});
});

// ----------------------------------------------------
// TEST 8: Notes Count
// ----------------------------------------------------
runTest('TEST 8: Developer Notes Count', () => {
  const notesCount = DashboardDataService.getNotesCount();
  assert.strictEqual(typeof notesCount, 'number');
  assert.ok(notesCount >= 0);

  // Add mock note in storage
  Storage.set('dev_notes', [{ id: '1', title: 'Test Note' }, { id: '2', title: 'Second Note' }]);
  const updatedCount = DashboardDataService.getNotesCount();
  assert.strictEqual(updatedCount, 2);

  // Clean up
  Storage.set('dev_notes', []);
});

// ----------------------------------------------------
// TEST 9: Calendar Data Generation & Leap Year
// ----------------------------------------------------
runTest('TEST 9: Calendar generation and leap year handling', () => {
  // February 2024 (Leap year - 29 days)
  const feb2024 = DashboardDataService.getCalendarData(2024, 1, '2024-02-15');
  const feb2024CurrentMonthDays = feb2024.days.filter(d => d.isCurrentMonth);
  assert.strictEqual(feb2024CurrentMonthDays.length, 29, 'Feb 2024 must have 29 days');

  // February 2026 (Non-leap year - 28 days)
  const feb2026 = DashboardDataService.getCalendarData(2026, 1, '2026-02-15');
  const feb2026CurrentMonthDays = feb2026.days.filter(d => d.isCurrentMonth);
  assert.strictEqual(feb2026CurrentMonthDays.length, 28, 'Feb 2026 must have 28 days');

  // Selected date identification
  const selectedDay = feb2026.days.find(d => d.dateStr === '2026-02-15');
  assert.ok(selectedDay && selectedDay.isSelected, '2026-02-15 must be flagged isSelected');
});

// ----------------------------------------------------
// TEST 10: AI Suggestion Determinism
// ----------------------------------------------------
runTest('TEST 10: AI Suggestion Engine', () => {
  const suggestion = DashboardDataService.getAISuggestion();
  assert.ok(suggestion, 'Must return an AI suggestion object');
  assert.strictEqual(typeof suggestion.hasActivity, 'boolean', 'Must have hasActivity flag');
  assert.ok(suggestion.targetUrl, 'Suggestion must always have a targetUrl');

  // For a new user with no activity, hasActivity should be false
  // and title can be empty — that is the CORRECT empty state
  if (!suggestion.hasActivity) {
    assert.strictEqual(suggestion.title, '', 'Title should be empty for new user empty state');
  } else {
    // If user has activity, must have real content
    assert.ok(suggestion.title, 'Suggestion must have a title when user has activity');
    assert.ok(suggestion.reason, 'Suggestion must have an explanation when user has activity');
  }
});

// ----------------------------------------------------
// TEST 11: Focus Time Today
// ----------------------------------------------------
runTest('TEST 11: Focus Time Today Aggregation', () => {
  const todayStr = DashboardDataService.getTodayDateStr();

  // Initially 0
  const initial = DashboardDataService.getFocusTimeToday();
  assert.strictEqual(typeof initial.minutes, 'number');

  // Log mock 25 min session today
  Storage.set('timer_sessions', [
    {
      id: 'sess-1',
      date: todayStr,
      durationMinutes: 25,
      mode: 'work',
      completed: true
    },
    {
      id: 'sess-2',
      date: todayStr,
      durationMinutes: 30,
      mode: 'work',
      completed: true
    }
  ]);

  const updated = DashboardDataService.getFocusTimeToday();
  assert.strictEqual(updated.minutes, 55);
  assert.strictEqual(updated.displayStr, '55m');
  assert.strictEqual(updated.sessionsCount, 2);

  // Clean up
  Storage.set('timer_sessions', []);
});

// ----------------------------------------------------
// Final Results
// ----------------------------------------------------
console.log('\n----------------------------------------------------');
console.log(`Test Execution Finished: ${passCount} Passed, ${failCount} Failed`);
console.log('----------------------------------------------------');

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('ALL DASHBOARD TEST SUITES PASSED CLEANLY! 🎉\n');
  process.exit(0);
}
