/**
 * DevPilot-AI — Automated Test Suite for Notification System & Top Navigation
 * 
 * Verifies:
 * 1. Clean empty state for new users (zero fake/mock notifications)
 * 2. Real DevPilot milestone ingestion (Daily Goals, DSA, Habits, Roadmaps, Interview Prep, GitHub, Resume)
 * 3. Prevention of duplicate notifications on re-sync and page refresh
 * 4. Rejection of noisy non-milestones (timer, navigation, page load, sync)
 * 5. Mark as read & Mark all as read state management and persistence
 * 6. Top navigation markup: Notification bell, Ask AI -> chat.html, Settings -> settings.html
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');

// Mock localStorage for Node.js environment
const mockStorage = {};
global.localStorage = {
  getItem: (key) => (Object.prototype.hasOwnProperty.call(mockStorage, key) ? mockStorage[key] : null),
  setItem: (key, val) => { mockStorage[key] = String(val); },
  removeItem: (key) => { delete mockStorage[key]; },
  clear: () => { Object.keys(mockStorage).forEach(k => delete mockStorage[k]); }
};

const NotificationService = require('../../js/core/notificationService.js');

console.log('====================================================');
console.log(' DevPilot-AI: Validating Notification System');
console.log('====================================================\n');

// ----------------------------------------------------
// TEST 1: New user with no activity sees clean empty state
// ----------------------------------------------------
(function testNewUserEmptyState() {
  global.localStorage.clear();

  const state = NotificationService.init();
  assert.strictEqual(state.notifications.length, 0, 'New user must have 0 notifications');
  assert.strictEqual(state.unreadCount, 0, 'New user unread count must be 0');
  assert.deepStrictEqual(NotificationService.getNotifications(), [], 'getNotifications must return empty array');

  console.log('✓ [PASS] TEST 1: New user starts clean with 0 notifications (no mock/fake items)');
})();

// ----------------------------------------------------
// TEST 2: Ingestion of REAL DevPilot activity milestones
// ----------------------------------------------------
(function testRealMilestoneIngestion() {
  global.localStorage.clear();

  // 1. Simulate a completed Daily Goal
  global.localStorage.setItem('devpilot_daily_goals', JSON.stringify([
    {
      id: 'dg_leet_trees',
      title: 'Complete 3 Tree Problems',
      completed: true,
      target: 3,
      progress: 3,
      completed_at: '2026-09-17T00:00:00.000Z'
    }
  ]));

  // 2. Simulate a solved DSA problem in roadmap evaluations
  global.localStorage.setItem('devpilot_dsa_roadmap_evaluations', JSON.stringify({
    '15': { solved: true, quality: 'self', completedAt: '2026-09-16T22:00:00.000Z' }
  }));

  // 3. Simulate habit streak completions (>= 3 days)
  global.localStorage.setItem('devpilot_habits_completions', JSON.stringify([
    '2026-09-14', '2026-09-15', '2026-09-16', '2026-09-17'
  ]));

  // 4. Simulate career roadmap milestone
  global.localStorage.setItem('devpilot_career_roadmaps_progress', JSON.stringify({
    'frontend-developer': {
      completedAt: {
        'skill_css_grid': '2026-09-16T20:00:00.000Z'
      }
    }
  }));

  // 5. Simulate interview prep completed section
  global.localStorage.setItem('devpilot_interview_prep_progress', JSON.stringify({
    'os_virtual_memory': {
      completed: true,
      categoryId: 'operating-systems',
      topic: 'Virtual Memory & Paging',
      lastAttempted: Date.now() - 10000
    }
  }));

  // 6. Simulate completed Resume Analysis
  global.localStorage.setItem('devpilot_resume_analysis', JSON.stringify({
    overallScore: 88,
    analysisDate: '2026-09-16T18:00:00.000Z'
  }));

  // 7. Simulate GitHub push activity in cache
  global.localStorage.setItem('devpilot_github_cache_2k25adityasharma', JSON.stringify({
    data: {
      events: [
        {
          id: 'gh_push_999',
          type: 'push',
          title: 'Pushed 4 commits to DevPilot-ai',
          repo: '2k25adityasharma/DevPilot-ai',
          createdAt: new Date().toISOString()
        }
      ]
    }
  }));

  // Run sync
  const syncedCount = NotificationService.syncAuthoritativeActivity();
  assert.ok(syncedCount >= 6, `Should sync at least 6 meaningful milestones, got ${syncedCount}`);

  const notifs = NotificationService.getNotifications();
  const unreadCount = NotificationService.getUnreadCount();

  assert.strictEqual(notifs.length, syncedCount, 'Notification count should match synced milestones');
  assert.strictEqual(unreadCount, syncedCount, 'All newly synced milestones start unread');

  // Verify sections
  const sections = new Set(notifs.map(n => n.section));
  assert.ok(sections.has('Daily Goals'), 'Must include Daily Goals milestone');
  assert.ok(sections.has('DSA Roadmap'), 'Must include DSA Roadmap milestone');
  assert.ok(sections.has('Habits'), 'Must include Habits streak milestone');
  assert.ok(sections.has('Career Roadmaps'), 'Must include Career Roadmaps milestone');
  assert.ok(sections.has('Interview Prep'), 'Must include Interview Prep milestone');
  assert.ok(sections.has('Resume Analyzer'), 'Must include Resume Analyzer milestone');
  assert.ok(sections.has('GitHub'), 'Must include GitHub activity milestone');

  console.log('✓ [PASS] TEST 2: Authoritative milestones ingested from Goals, DSA, Habits, Career, Interview, Resume, and GitHub');
})();

// ----------------------------------------------------
// TEST 3: Deduplication across syncs and page refreshes
// ----------------------------------------------------
(function testDeduplication() {
  const initialCount = NotificationService.getNotifications().length;

  // Run sync again
  const secondSync = NotificationService.syncAuthoritativeActivity();
  assert.strictEqual(secondSync, 0, 'Second sync must ingest 0 new items because all are already known');

  const afterCount = NotificationService.getNotifications().length;
  assert.strictEqual(afterCount, initialCount, 'Notification count must remain identical after re-sync');

  // Direct notify with existing ID
  const existingId = NotificationService.getNotifications()[0].id;
  const duplicateAttempt = NotificationService.notify({
    id: existingId,
    type: 'daily_goal',
    title: 'Duplicate Title',
    section: 'Daily Goals'
  });

  assert.notStrictEqual(duplicateAttempt.title, 'Duplicate Title', 'Existing notification should not be overwritten');
  assert.strictEqual(NotificationService.getNotifications().length, initialCount, 'No duplicates allowed');

  console.log('✓ [PASS] TEST 3: Deduplication strictly prevents duplicate notifications');
})();

// ----------------------------------------------------
// TEST 4: Non-meaningful / noisy events are rejected
// ----------------------------------------------------
(function testNoiseRejection() {
  const beforeCount = NotificationService.getNotifications().length;

  const rejected1 = NotificationService.notify({
    id: 'page_open_1',
    type: 'page_view',
    title: 'Opened Dashboard Page'
  });
  assert.strictEqual(rejected1, null, 'page_view events must be rejected');

  const rejected2 = NotificationService.notify({
    id: 'timer_tick_1',
    type: 'timer_tick',
    title: 'Focus session started'
  });
  assert.strictEqual(rejected2, null, 'timer events must be rejected');

  const rejected3 = NotificationService.notify({
    id: 'sync_auto_1',
    type: 'auto_save',
    title: 'Auto-saved notes'
  });
  assert.strictEqual(rejected3, null, 'auto_save events must be rejected');

  assert.strictEqual(NotificationService.getNotifications().length, beforeCount, 'Rejected events must not enter notification store');

  console.log('✓ [PASS] TEST 4: Noisy events (page views, timer ticks, auto-saves) are strictly rejected');
})();

// ----------------------------------------------------
// TEST 5: "Mark as read" single item and persistence
// ----------------------------------------------------
(function testMarkAsRead() {
  const notifs = NotificationService.getNotifications();
  const first = notifs[0];
  const initialUnread = NotificationService.getUnreadCount();

  assert.strictEqual(first.read, false, 'First item should be unread initially');

  // Mark first as read
  const success = NotificationService.markAsRead(first.id);
  assert.strictEqual(success, true, 'markAsRead should return true');

  const updatedNotifs = NotificationService.getNotifications();
  const updatedFirst = updatedNotifs.find(n => n.id === first.id);
  assert.strictEqual(updatedFirst.read, true, 'Target notification must now have read: true');
  assert.strictEqual(NotificationService.getUnreadCount(), initialUnread - 1, 'Unread count must decrease by 1');

  // Simulate page refresh by re-syncing: read status must persist!
  NotificationService.syncAuthoritativeActivity();
  const afterRefreshFirst = NotificationService.getNotifications().find(n => n.id === first.id);
  assert.strictEqual(afterRefreshFirst.read, true, 'Read state must persist across sync / page refresh');

  console.log('✓ [PASS] TEST 5: Mark as read updates item and persists after simulated refresh');
})();

// ----------------------------------------------------
// TEST 6: "Mark all as read"
// ----------------------------------------------------
(function testMarkAllAsRead() {
  assert.ok(NotificationService.getUnreadCount() > 0, 'Should have unread items before markAllAsRead');

  const count = NotificationService.markAllAsRead();
  assert.ok(count > 0, 'markAllAsRead should return total count');

  assert.strictEqual(NotificationService.getUnreadCount(), 0, 'Unread count must be 0 after markAllAsRead');
  NotificationService.getNotifications().forEach(n => {
    assert.strictEqual(n.read, true, `Item ${n.id} must be marked as read`);
  });

  console.log('✓ [PASS] TEST 6: Mark all as read updates all items and clears unread count');
})();

// ----------------------------------------------------
// TEST 7: Observer subscription emits on changes
// ----------------------------------------------------
(function testSubscription() {
  let callbackFired = false;
  let observedUnread = null;

  const unsubscribe = NotificationService.subscribe(({ notifications, unreadCount }) => {
    callbackFired = true;
    observedUnread = unreadCount;
  });

  // Trigger a new notification
  NotificationService.notify({
    id: 'test_obs_notif_1',
    type: 'system',
    title: 'Account Security Check',
    description: 'All workspace security preferences are up to date.',
    section: 'System'
  });

  assert.strictEqual(callbackFired, true, 'Subscriber callback should be called on notify');
  assert.strictEqual(observedUnread, 1, 'Observer should receive updated unread count');

  unsubscribe();
  console.log('✓ [PASS] TEST 7: Observer subscription pattern notifies UI on state changes');
})();

// ----------------------------------------------------
// TEST 8: Verify Top Navigation Markup in index.html
// ----------------------------------------------------
(function testTopNavigationHtml() {
  const indexPath = path.resolve(__dirname, '../../index.html');
  const html = fs.readFileSync(indexPath, 'utf8');

  // Notification Bell elements
  assert.ok(html.includes('id="notification-bell-btn"'), 'index.html must have notification-bell-btn');
  assert.ok(html.includes('id="notification-unread-badge"'), 'index.html must have notification-unread-badge');
  assert.ok(html.includes('id="notification-panel"'), 'index.html must have notification-panel');
  assert.ok(html.includes('id="notification-mark-all-read"'), 'index.html must have notification-mark-all-read');
  assert.ok(html.includes('id="notification-list"'), 'index.html must have notification-list');

  // Settings in slider / top nav
  assert.ok(html.includes('id="top-nav-settings-btn"'), 'index.html must have top-nav-settings-btn');
  assert.ok(html.includes('href="pages/settings.html"'), 'top-nav-settings-btn must link to pages/settings.html');

  // Ask AI connected to chat
  assert.ok(html.includes('id="top-nav-ask-ai-btn"'), 'index.html must have top-nav-ask-ai-btn');
  assert.ok(html.includes('href="pages/chat.html"'), 'top-nav-ask-ai-btn must link to pages/chat.html');

  // Script include
  assert.ok(html.includes('src="js/core/notificationService.js"'), 'index.html must load notificationService.js');

  console.log('✓ [PASS] TEST 8: index.html markup correctly specifies notification dropdown, Ask AI -> chat.html, and Settings -> settings.html');
})();

console.log('\n----------------------------------------------------');
console.log('All 8 Notification System Tests Passed Cleanly! 🎉');
console.log('----------------------------------------------------');
