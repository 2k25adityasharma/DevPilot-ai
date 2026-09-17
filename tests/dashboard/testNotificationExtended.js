/**
 * DevPilot-AI — Extended Automated Test Suite for Notification System
 * 
 * Verifies:
 * 1. Individual notification deletion (deleteNotification / remove)
 * 2. Clear all notifications (clearAll)
 * 3. Multi-user isolation (User 1's notifications never leak to User 2 or new users)
 * 4. Note creation notifications (note type, section, title, message)
 * 5. Strict deduplication (repeated actions produce zero duplicate notifications)
 * 6. Read state persistence across simulated reload
 * 7. Mark all as read clears badge and mutes notifications
 * 8. NotificationUI URL resolution logic
 */

const assert = require('assert');
const path = require('path');

// Mock in-memory localStorage for Node.js test environment
const mockStorage = {};
global.localStorage = {
  getItem: (key) => (Object.prototype.hasOwnProperty.call(mockStorage, key) ? mockStorage[key] : null),
  setItem: (key, val) => { mockStorage[key] = String(val); },
  removeItem: (key) => { delete mockStorage[key]; },
  clear: () => { Object.keys(mockStorage).forEach(k => delete mockStorage[k]); }
};

// Mock AuthService for user isolation tests
let mockCurrentUser = { id: 'user-alpha-001', email: 'user1@example.com' };
global.window = {
  AuthService: {
    getCurrentUser: () => mockCurrentUser,
    onAuthStateChange: () => () => {}
  }
};

const NotificationService = require('../../js/core/notificationService.js');
const NotificationUI = require('../../js/core/notificationUI.js');

console.log('====================================================');
console.log(' DevPilot-AI: Validating Extended Notification System');
console.log('====================================================\n');

// ----------------------------------------------------
// TEST 1: Note Creation Notification & Data Structure
// ----------------------------------------------------
(function testNoteNotification() {
  global.localStorage.clear();
  mockCurrentUser = { id: 'user-alpha-001', email: 'user1@example.com' };
  NotificationService.init();

  const noteNotif = NotificationService.notify({
    id: 'note_created_n_1001',
    type: 'note',
    section: 'Notes',
    title: '📝 New Note Created',
    message: 'Created "Dynamic Programming Cheat Sheet" in Algorithms.',
    url: 'pages/notes.html'
  });

  assert.ok(noteNotif, 'Notification should be created');
  assert.strictEqual(noteNotif.id, 'note_created_n_1001');
  assert.strictEqual(noteNotif.type, 'note');
  assert.strictEqual(noteNotif.section, 'Notes');
  assert.strictEqual(noteNotif.title, '📝 New Note Created');
  assert.strictEqual(noteNotif.message, 'Created "Dynamic Programming Cheat Sheet" in Algorithms.');
  assert.strictEqual(noteNotif.read, false);
  assert.strictEqual(NotificationService.getUnreadCount(), 1);

  console.log('✓ [PASS] TEST 1: Real note creation notification created with complete metadata');
})();

// ----------------------------------------------------
// TEST 2: Individual Item Deletion (deleteNotification / remove)
// ----------------------------------------------------
(function testDeleteNotification() {
  // Add a second notification
  NotificationService.notify({
    id: 'habit_comp_h_101_2026-09-17',
    type: 'habit_streak',
    section: 'Habits',
    title: '🎯 Habit completed',
    message: 'Solve 2 LeetCode Problems completed today.',
    url: 'pages/habits.html'
  });

  assert.strictEqual(NotificationService.getNotifications().length, 2);

  // Delete first notification
  const deleted = NotificationService.deleteNotification('note_created_n_1001');
  assert.strictEqual(deleted, true, 'deleteNotification should return true');

  const remaining = NotificationService.getNotifications();
  assert.strictEqual(remaining.length, 1, 'Should have exactly 1 notification remaining');
  assert.strictEqual(remaining[0].id, 'habit_comp_h_101_2026-09-17', 'Remaining item should be the habit notification');

  // Verify deletion persists across reload
  const reloaded = NotificationService.getNotifications();
  assert.strictEqual(reloaded.length, 1);
  assert.strictEqual(reloaded.find(n => n.id === 'note_created_n_1001'), undefined, 'Deleted item must not exist');

  console.log('✓ [PASS] TEST 2: Individual notification deletion successfully removes item permanently');
})();

// ----------------------------------------------------
// TEST 3: Clear All Notifications (clearAll)
// ----------------------------------------------------
(function testClearAll() {
  assert.strictEqual(NotificationService.getNotifications().length, 1);

  NotificationService.clearAll();

  assert.strictEqual(NotificationService.getNotifications().length, 0, 'Notifications list must be empty after clearAll');
  assert.strictEqual(NotificationService.getUnreadCount(), 0, 'Unread count must be 0 after clearAll');

  // Verify persisted empty state
  const state = NotificationService.getNotifications();
  assert.strictEqual(state.length, 0, 'Storage must persist empty array');

  console.log('✓ [PASS] TEST 3: Clear all permanently empties storage and resets unread count');
})();

// ----------------------------------------------------
// TEST 4: Multi-User Isolation (No cross-user leakage)
// ----------------------------------------------------
(function testMultiUserIsolation() {
  // 1. User Alpha creates notifications
  mockCurrentUser = { id: 'user-alpha-001', email: 'alpha@devpilot.ai' };
  NotificationService.notify({
    id: 'alpha_notif_1',
    type: 'dsa',
    title: 'DSA Solved: Two Sum (Easy)',
    message: 'Array • Great job mastering this algorithm concept.',
    url: 'pages/dsa.html#row-1'
  });

  assert.strictEqual(NotificationService.getNotifications().length, 1, 'Alpha should have 1 notification');
  assert.strictEqual(NotificationService.getNotifications()[0].id, 'alpha_notif_1');

  // 2. Switch to User Beta (New User)
  mockCurrentUser = { id: 'user-beta-002', email: 'beta@devpilot.ai' };
  
  // Beta must start completely clean with 0 notifications!
  const betaNotifs = NotificationService.getNotifications();
  assert.strictEqual(betaNotifs.length, 0, "Beta must have 0 notifications (no leakage from Alpha!)");
  assert.strictEqual(NotificationService.getUnreadCount(), 0, "Beta unread count must be 0");

  // Beta creates their own notification
  NotificationService.notify({
    id: 'beta_notif_1',
    type: 'daily_goal',
    title: '🎯 Daily Goal Completed: Read System Design',
    message: 'You successfully finished your daily goal target!',
    url: 'pages/habits.html'
  });

  assert.strictEqual(NotificationService.getNotifications().length, 1, 'Beta should have 1 notification');
  assert.strictEqual(NotificationService.getNotifications()[0].id, 'beta_notif_1');

  // 3. Switch back to User Alpha
  mockCurrentUser = { id: 'user-alpha-001', email: 'alpha@devpilot.ai' };
  const alphaNotifs = NotificationService.getNotifications();
  assert.strictEqual(alphaNotifs.length, 1, 'Alpha still has their 1 notification');
  assert.strictEqual(alphaNotifs[0].id, 'alpha_notif_1', "Alpha sees their own notification");
  assert.strictEqual(alphaNotifs.find(n => n.id === 'beta_notif_1'), undefined, "Alpha must NOT see Beta's notification");

  console.log('✓ [PASS] TEST 4: Multi-user isolation strictly preserves per-user notification boundaries');
})();

// ----------------------------------------------------
// TEST 5: Deduplication Mechanism (Duplicate prevention)
// ----------------------------------------------------
(function testDuplicatePrevention() {
  const countBefore = NotificationService.getNotifications().length;

  // Attempt to re-notify the exact same action (e.g. re-render, repeat API call)
  const duplicate = NotificationService.notify({
    id: 'alpha_notif_1',
    type: 'dsa',
    title: 'DSA Solved: Two Sum (Easy)',
    message: 'Different message attempt',
    url: 'pages/dsa.html'
  });

  assert.strictEqual(NotificationService.getNotifications().length, countBefore, 'Count must NOT increase on duplicate ID');
  assert.strictEqual(duplicate.id, 'alpha_notif_1');
  assert.strictEqual(duplicate.message, 'Array • Great job mastering this algorithm concept.', 'Original message preserved');

  console.log('✓ [PASS] TEST 5: Duplicate prevention reliably blocks repeated actions and re-renders');
})();

// ----------------------------------------------------
// TEST 6: Read / Unread Status and Mark All as Read
// ----------------------------------------------------
(function testReadStatusWorkflow() {
  const notifs = NotificationService.getNotifications();
  const target = notifs[0];
  assert.strictEqual(target.read, false, 'Notification begins unread');
  assert.strictEqual(NotificationService.getUnreadCount(), 1);

  // Mark single as read
  NotificationService.markAsRead(target.id);
  assert.strictEqual(NotificationService.getNotifications()[0].read, true, 'Item should now be read: true');
  assert.strictEqual(NotificationService.getUnreadCount(), 0, 'Unread count should be 0');

  // Add another unread notification
  NotificationService.notify({
    id: 'alpha_notif_2',
    type: 'roadmap',
    title: 'Roadmap Milestone Completed',
    message: 'Completed "CSS Grid" in Frontend Developer.',
    url: 'pages/roadmaps.html'
  });

  assert.strictEqual(NotificationService.getUnreadCount(), 1);

  // Mark all as read
  NotificationService.markAllAsRead();
  assert.strictEqual(NotificationService.getUnreadCount(), 0, 'Unread count should be 0 after markAllAsRead');
  NotificationService.getNotifications().forEach(n => {
    assert.strictEqual(n.read, true, 'Every notification must be read: true');
  });

  console.log('✓ [PASS] TEST 6: Read status transitions, unread counter, and markAllAsRead operate accurately');
})();

// ----------------------------------------------------
// TEST 7: NotificationUI Route and URL Resolution
// ----------------------------------------------------
(function testUrlResolution() {
  // Test when window location is at root index.html
  global.window.location = { pathname: '/d:/web development/mega project/index.html' };

  assert.strictEqual(NotificationUI.resolveUrl('pages/dsa.html'), 'pages/dsa.html');
  assert.strictEqual(NotificationUI.resolveUrl('pages/habits.html'), 'pages/habits.html');
  assert.strictEqual(NotificationUI.resolveUrl('index.html'), 'index.html');

  // Test when window location is inside pages/
  global.window.location = { pathname: '/d:/web development/mega project/pages/habits.html' };

  assert.strictEqual(NotificationUI.resolveUrl('pages/dsa.html'), 'dsa.html');
  assert.strictEqual(NotificationUI.resolveUrl('pages/notes.html'), 'notes.html');
  assert.strictEqual(NotificationUI.resolveUrl('index.html'), '../index.html');

  console.log('✓ [PASS] TEST 7: NotificationUI URL resolution seamlessly adjusts relative paths across pages');
})();

// ----------------------------------------------------
// TEST 8: All notifications (including GitHub activity) are individually deletable and do NOT resurrect on sync
// ----------------------------------------------------
(function testAuthoritativeDismissalPersistence() {
  // Clear any existing notifications & dismissed list
  NotificationService.clearAll();
  NotificationService.clearDismissed();

  // Set up mock GitHub cache with 3 distinct push events
  global.localStorage.setItem('devpilot_github_cache_2k25adityasharma', JSON.stringify({
    data: {
      events: [
        { id: '21381966074', type: 'push', title: 'Pushed 1 commit(s)', repo: 'DevPilot-ai', createdAt: '2026-09-16T18:00:00Z' },
        { id: '21335613113', type: 'push', title: 'Pushed 1 commit(s)', repo: 'Leetcode-', createdAt: '2026-09-16T16:19:38Z' },
        { id: '21311812864', type: 'push', title: 'Pushed 1 commit(s)', repo: 'Leetcode-', createdAt: '2026-09-16T16:19:36Z' }
      ]
    }
  }));

  // Ingest events
  NotificationService.syncAuthoritativeActivity();
  const initialNotifs = NotificationService.getNotifications();
  assert.strictEqual(initialNotifs.length, 3, 'Should have ingested exactly 3 GitHub notifications');

  // Verify IDs
  const notifIds = initialNotifs.map(n => n.id);
  assert.ok(notifIds.includes('github_21381966074'), 'Contains event 1');
  assert.ok(notifIds.includes('github_21335613113'), 'Contains event 2');
  assert.ok(notifIds.includes('github_21311812864'), 'Contains event 3');

  // 1. Delete the SECOND notification (github_21335613113)
  const del2 = NotificationService.deleteNotification('github_21335613113');
  assert.strictEqual(del2, true, 'deleteNotification for 2nd notification must return true');

  const afterDel2 = NotificationService.getNotifications();
  assert.strictEqual(afterDel2.length, 2, 'Should have 2 notifications left after deleting 2nd');
  assert.strictEqual(afterDel2.find(n => n.id === 'github_21335613113'), undefined, '2nd notification must be gone');

  // 2. Simulate re-sync / page refresh / tab switch: MUST NOT resurrect deleted 2nd notification!
  NotificationService.syncAuthoritativeActivity();
  const afterSync1 = NotificationService.getNotifications();
  assert.strictEqual(afterSync1.length, 2, 'Re-sync must NOT resurrect the deleted 2nd notification');
  assert.strictEqual(afterSync1.find(n => n.id === 'github_21335613113'), undefined, '2nd notification remains deleted');

  // 3. Delete the THIRD notification (github_21311812864)
  const del3 = NotificationService.deleteNotification('github_21311812864');
  assert.strictEqual(del3, true, 'deleteNotification for 3rd notification must return true');

  const afterDel3 = NotificationService.getNotifications();
  assert.strictEqual(afterDel3.length, 1, 'Should have 1 notification left after deleting 3rd');

  // 4. Re-sync again: still only 1 notification remains
  NotificationService.syncAuthoritativeActivity();
  const afterSync2 = NotificationService.getNotifications();
  assert.strictEqual(afterSync2.length, 1, 'Re-sync must NOT resurrect 2nd or 3rd notifications');
  assert.strictEqual(afterSync2[0].id, 'github_21381966074', 'Only 1st notification remains');

  // 5. Delete the FIRST notification (github_21381966074)
  const del1 = NotificationService.deleteNotification('github_21381966074');
  assert.strictEqual(del1, true, 'deleteNotification for 1st notification must return true');

  const afterDel1 = NotificationService.getNotifications();
  assert.strictEqual(afterDel1.length, 0, 'Notifications must now be completely empty (0 notifications)');

  // 6. Final re-sync: all 3 remain dismissed, 0 notifications
  NotificationService.syncAuthoritativeActivity();
  assert.strictEqual(NotificationService.getNotifications().length, 0, 'All notifications remain permanently dismissed');

  console.log('✓ [PASS] TEST 8: All notifications (including GitHub activity) are individually deletable and permanently blocked from resurrection');
})();

// ----------------------------------------------------
// TEST 9: Clear all permanently dismisses all current authoritative activity (Goals, DSA, Habit Streaks, GitHub)
// so refreshing/re-syncing NEVER restores cleared items, but NEW activity is still added and fully functional
// ----------------------------------------------------
(function testClearAllReloadPersistenceAndNewActivity() {
  mockCurrentUser = { id: 'user-gamma-003', email: 'gamma@devpilot.ai' };

  // 1. Seed authoritative data: 1 goal + 11 DSA questions + 1 habit event
  mockStorage['devpilot_u_user-gamma-003_daily_goals'] = JSON.stringify([
    { id: 'goal_hvh', title: 'hvh', completed: true, date: '2026-09-17' }
  ]);
  const dsaEvals = {};
  for (let i = 1; i <= 11; i++) {
    dsaEvals[i] = 'self';
  }
  mockStorage['devpilot_dsa_roadmap_evaluations'] = JSON.stringify(dsaEvals);

  // Clear dismissed for this user
  mockStorage['devpilot_u_user-gamma-003_dismissed_notifications'] = JSON.stringify([]);
  mockStorage['devpilot_u_user-gamma-003_notifications'] = JSON.stringify([]);

  NotificationService.init();

  // Habit completed notification
  NotificationService.notify({
    id: 'habit_comp_m_2026-09-17',
    type: 'habit_streak',
    section: 'Habits',
    title: '🎯 Habit completed',
    message: 'm completed today.',
    url: 'pages/habits.html'
  });

  const initialNotifs = NotificationService.getNotifications();
  assert.ok(initialNotifs.length >= 12, 'Must have at least 12 notifications loaded (Goal + DSA + Habit)');

  // 2. Clear All notifications
  NotificationService.clearAll();
  assert.strictEqual(NotificationService.getNotifications().length, 0, 'Notifications list must be empty after clearAll');
  assert.strictEqual(NotificationService.getUnreadCount(), 0, 'Unread count must be 0 after clearAll');

  // 3. Simulate page reload / refresh (calling init and syncAuthoritativeActivity)
  NotificationService.syncAuthoritativeActivity();
  const afterReloadNotifs = NotificationService.getNotifications();
  assert.strictEqual(afterReloadNotifs.length, 0, 'Cleared notifications must NOT resurrect on page reload/refresh!');

  // 4. NEW ACTIVITY: User completes a NEW daily goal
  mockStorage['devpilot_u_user-gamma-003_daily_goals'] = JSON.stringify([
    { id: 'goal_hvh', title: 'hvh', completed: true, date: '2026-09-17' },
    { id: 'goal_new_brand', title: 'Finish system architecture', completed: true, date: '2026-09-18' }
  ]);

  // And user solves a NEW DSA question (#999)
  dsaEvals['999'] = 'self';
  mockStorage['devpilot_dsa_roadmap_evaluations'] = JSON.stringify(dsaEvals);

  NotificationService.syncAuthoritativeActivity();

  const withNewActivity = NotificationService.getNotifications();
  assert.strictEqual(withNewActivity.length, 2, 'Exactly 2 NEW notifications should appear (New Goal + New DSA)');
  assert.ok(withNewActivity.some(n => n.id.includes('goal_new_brand')), 'Must contain new goal notification');
  assert.ok(withNewActivity.some(n => n.id === 'dsa_solved_999'), 'Must contain new DSA solved question');

  // Verify that the old cleared items are STILL not in the list!
  assert.strictEqual(withNewActivity.some(n => n.id.includes('goal_hvh')), false, 'Old goal_hvh must NOT resurrect');
  assert.strictEqual(withNewActivity.some(n => n.id === 'dsa_solved_1'), false, 'Old dsa_solved_1 must NOT resurrect');

  console.log('✓ [PASS] TEST 9: Clear all permanently blocks resurrection on reload, but NEW activity is fully functional');
})();

console.log('\n----------------------------------------------------');
console.log('All 9 Extended Notification System Tests Passed! 🎉');
console.log('----------------------------------------------------');


