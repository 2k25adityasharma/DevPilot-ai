/**
 * DevPilot-AI — Notification Event Service (NotificationService)
 * 
 * Reusable, central notification and milestone event system for DevPilot.
 * Powered by REAL DevPilot user activity:
 * - Daily Goals completed
 * - Habit completed / streak milestone
 * - DSA question solved
 * - Career Roadmap milestone completed
 * - Interview Prep section completed
 * - New meaningful GitHub activity (commits / pushes)
 * - Resume analysis completed
 * - Important system/account notification
 * 
 * Strictly excludes:
 * - Page loads, route navigation, timer ticks/start/stop, data syncs, auto-saves.
 * 
 * Supports both Browser and Node.js environments.
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.NotificationService = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // Constants
  const STORAGE_KEY_BASE = 'notifications';
  const DISMISSED_KEY_BASE = 'dismissed_notifications';
  const MAX_NOTIFICATIONS = 50;

  const ALLOWED_TYPES = new Set([
    'daily_goal',
    'habit_streak',
    'dsa',
    'roadmap',
    'interview_prep',
    'note',
    'github',
    'resume',
    'system'
  ]);

  const SECTION_CONFIG = {
    daily_goal: {
      section: 'Daily Goals',
      icon: 'task_alt',
      iconBgClass: 'bg-emerald-100 text-emerald-600',
      defaultUrl: 'pages/habits.html'
    },
    habit_streak: {
      section: 'Habits',
      icon: 'local_fire_department',
      iconBgClass: 'bg-orange-100 text-orange-600',
      defaultUrl: 'pages/habits.html'
    },
    dsa: {
      section: 'DSA Roadmap',
      icon: 'alt_route',
      iconBgClass: 'bg-indigo-100 text-indigo-600',
      defaultUrl: 'pages/dsa.html'
    },
    roadmap: {
      section: 'Career Roadmaps',
      icon: 'map',
      iconBgClass: 'bg-purple-100 text-purple-600',
      defaultUrl: 'pages/roadmaps.html'
    },
    interview_prep: {
      section: 'Interview Prep',
      icon: 'work',
      iconBgClass: 'bg-sky-100 text-sky-600',
      defaultUrl: 'pages/interviewPrep.html'
    },
    note: {
      section: 'Notes',
      icon: 'edit_note',
      iconBgClass: 'bg-emerald-100 text-emerald-700',
      defaultUrl: 'pages/notes.html'
    },
    github: {
      section: 'GitHub',
      icon: 'code',
      iconBgClass: 'bg-slate-100 text-slate-700',
      defaultUrl: 'pages/github.html'
    },
    resume: {
      section: 'Resume Analyzer',
      icon: 'description',
      iconBgClass: 'bg-amber-100 text-amber-600',
      defaultUrl: 'pages/resume.html'
    },
    system: {
      section: 'System',
      icon: 'notifications',
      iconBgClass: 'bg-primary/10 text-primary',
      defaultUrl: 'index.html'
    }
  };

  // State
  let listeners = [];
  let isInitialized = false;

  // Helpers
  function getStorage() {
    if (typeof window !== 'undefined' && window.Storage && typeof window.Storage.get === 'function') {
      return window.Storage;
    }
    return {
      get: function (key, def = null) {
        try {
          if (typeof localStorage === 'undefined') return def;
          const val = localStorage.getItem(`devpilot_${key}`);
          return val ? JSON.parse(val) : def;
        } catch (e) {
          return def;
        }
      },
      set: function (key, val) {
        try {
          if (typeof localStorage === 'undefined') return;
          localStorage.setItem(`devpilot_${key}`, JSON.stringify(val));
        } catch (e) {}
      }
    };
  }

  function getUserId() {
    if (typeof window !== 'undefined' && window.AuthService && typeof window.AuthService.getCurrentUser === 'function') {
      const user = window.AuthService.getCurrentUser();
      if (user && user.id) return user.id;
    }
    return '00000000-0000-4000-a000-000000000001';
  }

  function getStorageKey() {
    const userId = getUserId();
    return `u_${userId}_${STORAGE_KEY_BASE}`;
  }

  function getDismissedStorageKey() {
    const userId = getUserId();
    return `u_${userId}_${DISMISSED_KEY_BASE}`;
  }

  function getDismissedIds() {
    const storage = getStorage();
    const key = getDismissedStorageKey();
    let data = storage.get(key, null);
    if (Array.isArray(data)) return new Set(data.map(String));
    if (typeof window === 'undefined') {
      data = storage.get(DISMISSED_KEY_BASE, null);
      if (Array.isArray(data)) return new Set(data.map(String));
    }
    return new Set();
  }

  function addDismissedId(id) {
    if (id === null || id === undefined || id === '') return;
    const set = getDismissedIds();
    set.add(String(id).trim());
    saveDismissedIds(set);
  }

  function addDismissedIds(ids) {
    if (!Array.isArray(ids) || ids.length === 0) return;
    const set = getDismissedIds();
    ids.forEach(id => {
      if (id !== null && id !== undefined && id !== '') {
        set.add(String(id).trim());
      }
    });
    saveDismissedIds(set);
  }

  function saveDismissedIds(idSet) {
    const storage = getStorage();
    const key = getDismissedStorageKey();
    const arr = Array.from(idSet).slice(-500);
    storage.set(key, arr);
    if (typeof window === 'undefined') {
      storage.set(DISMISSED_KEY_BASE, arr);
    }
  }

  function clearDismissed() {
    const storage = getStorage();
    const key = getDismissedStorageKey();
    storage.set(key, []);
    if (typeof window === 'undefined') {
      storage.set(DISMISSED_KEY_BASE, []);
    }
  }

  function formatTimeAgo(timestamp) {
    if (!timestamp) return 'Recently';
    const date = new Date(timestamp);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 45) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  function loadStoredNotifications() {
    const storage = getStorage();
    const key = getStorageKey();
    let data = storage.get(key, null);
    if (Array.isArray(data)) return data;
    // In Node test or legacy environment without auth:
    if (typeof window === 'undefined') {
      data = storage.get(STORAGE_KEY_BASE, null);
      if (Array.isArray(data)) return data;
    }
    return [];
  }

  function saveStoredNotifications(notifications) {
    const storage = getStorage();
    const key = getStorageKey();
    storage.set(key, notifications);
    // In Node test or legacy environment, also sync to base key
    if (typeof window === 'undefined') {
      storage.set(STORAGE_KEY_BASE, notifications);
    }
  }

  function emitChange() {
    const notifications = getNotifications();
    const unreadCount = getUnreadCount();
    listeners.forEach(fn => {
      try {
        fn({ notifications, unreadCount });
      } catch (e) {
        console.error('Error in NotificationService listener:', e);
      }
    });

    if (typeof BroadcastChannel !== 'undefined') {
      try {
        const channel = new BroadcastChannel('devpilot_notifications_sync');
        channel.postMessage({ type: 'NOTIFICATIONS_CHANGED', unreadCount, timestamp: Date.now() });
        channel.close();
      } catch (e) {}
    }
  }

  // ============================================================
  // PUBLIC API
  // ============================================================

  /**
   * Subscribe to notification state updates
   * @param {Function} callback - ({ notifications, unreadCount }) => void
   * @returns {Function} unsubscribe function
   */
  function subscribe(callback) {
    if (typeof callback !== 'function') return () => {};
    listeners.push(callback);
    return () => {
      listeners = listeners.filter(fn => fn !== callback);
    };
  }

  /**
   * Get all notifications with formatted relative time
   */
  function getNotifications() {
    const items = loadStoredNotifications();
    return items.map(item => ({
      ...item,
      timeAgo: formatTimeAgo(item.timestamp)
    })).sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
  }

  /**
   * Get count of unread notifications
   */
  function getUnreadCount() {
    const items = loadStoredNotifications();
    return items.filter(item => !item.read).length;
  }

  /**
   * Dispatch a new notification.
   * Drops duplicate IDs, enforces allowed meaningful categories.
   */
  function notify(data) {
    if (!data || !data.id || !data.title) return null;

    const type = data.type || 'system';
    if (!ALLOWED_TYPES.has(type)) {
      // Ignore disallowed or noisy event types (e.g. page_view, timer, sync)
      return null;
    }

    const items = loadStoredNotifications();
    const existingIndex = items.findIndex(n => String(n.id) === String(data.id));
    if (existingIndex !== -1) {
      // Already present — do not duplicate!
      return items[existingIndex];
    }

    const typeDefaults = SECTION_CONFIG[type] || SECTION_CONFIG.system;
    const textMsg = String(data.message || data.description || '').trim();
    const notification = {
      id: String(data.id),
      type,
      section: data.section || typeDefaults.section,
      title: String(data.title).trim(),
      message: textMsg,
      description: textMsg,
      timestamp: Number.isFinite(data.timestamp) ? data.timestamp : Date.now(),
      url: data.url || data.navTarget || typeDefaults.defaultUrl,
      icon: data.icon || typeDefaults.icon,
      iconBgClass: data.iconBgClass || typeDefaults.iconBgClass,
      read: !!data.read
    };

    // Prepend and cap to maximum length
    items.unshift(notification);
    if (items.length > MAX_NOTIFICATIONS) {
      items.length = MAX_NOTIFICATIONS;
    }

    saveStoredNotifications(items);
    emitChange();
    return notification;
  }

  /**
   * Mark a specific notification as read
   */
  function markAsRead(id) {
    if (!id) return false;
    const items = loadStoredNotifications();
    const item = items.find(n => String(n.id) === String(id));
    if (!item) return false;
    if (item.read) return true; // Already read

    item.read = true;
    saveStoredNotifications(items);
    emitChange();
    return true;
  }

  /**
   * Mark all notifications as read
   */
  function markAllAsRead() {
    const items = loadStoredNotifications();
    let changed = false;
    items.forEach(n => {
      if (!n.read) {
        n.read = true;
        changed = true;
      }
    });

    if (changed) {
      saveStoredNotifications(items);
      emitChange();
    }
    return items.length;
  }

  /**
   * Delete / remove a single notification permanently
   * @param {string} id
   * @returns {boolean}
   */
  function deleteNotification(id) {
    if (id === null || id === undefined || id === '') return false;
    const targetId = String(id).trim();

    // 1. Permanently record in dismissed list so authoritative sync won't recreate it
    addDismissedId(targetId);

    // 2. Remove all matching instances from stored list
    const items = loadStoredNotifications();
    const remaining = items.filter(n => String(n.id).trim() !== targetId);
    const changed = remaining.length !== items.length;

    if (changed) {
      saveStoredNotifications(remaining);
    }
    emitChange();
    return true;
  }

  /**
   * Clear all notifications permanently
   */
  function clearAll() {
    const items = loadStoredNotifications();
    const idsToDismiss = items.map(n => String(n.id).trim()).filter(Boolean);
    addDismissedIds(idsToDismiss);
    saveStoredNotifications([]);
    emitChange();
  }

  /**
   * Scan authoritative real DevPilot activity and ingest milestones
   * without creating fake notifications for new users.
   */
  function syncAuthoritativeActivity() {
    const storage = getStorage();
    const userId = getUserId();
    const currentItems = loadStoredNotifications();
    const dismissedIds = getDismissedIds();
    const knownIds = new Set(currentItems.map(n => String(n.id)));

    const shouldSkip = (notifId) => knownIds.has(notifId) || dismissedIds.has(notifId);

    const newNotifications = [];

    // 1. DAILY GOALS (Completed goals)
    try {
      let goals = storage.get(`u_${userId}_daily_goals`, null);
      if (!Array.isArray(goals)) goals = storage.get('daily_goals', []);
      if (Array.isArray(goals)) {
        goals.forEach(goal => {
          if (!goal || !goal.id) return;
          const isDone = !!goal.completed || (goal.target && Number(goal.progress) >= Number(goal.target));
          if (!isDone) return;

          const dateStamp = goal.completed_at || goal.updated_at || goal.completedAt || 'today';
          const notifId = `goal_${goal.id}_${dateStamp}`;
          if (shouldSkip(notifId)) return;

          newNotifications.push({
            id: notifId,
            type: 'daily_goal',
            section: 'Daily Goals',
            title: `Daily Goal Completed: ${goal.title}`,
            description: goal.description || 'You successfully finished your daily goal target!',
            url: 'pages/habits.html',
            icon: 'task_alt',
            iconBgClass: 'bg-emerald-100 text-emerald-600',
            timestamp: new Date(goal.completed_at || goal.updated_at || goal.completedAt || Date.now()).getTime(),
            read: false
          });
          knownIds.add(notifId);
        });
      }
    } catch (e) {}

    // 2. HABIT STREAK MILESTONES
    try {
      let streakCount = 0;
      if (typeof window !== 'undefined' && window.DashboardDataService && typeof window.DashboardDataService.getStreak === 'function') {
        const s = window.DashboardDataService.getStreak();
        streakCount = s ? s.count || 0 : 0;
      } else {
        const completions = storage.get('habits_completions', []);
        if (Array.isArray(completions) && completions.length > 0) {
          streakCount = completions.length;
        }
      }

      // Only notify for notable streak milestones (>= 3 days)
      if (streakCount >= 3) {
        const milestoneKey = streakCount >= 30 ? 30 : streakCount >= 14 ? 14 : streakCount >= 7 ? 7 : 3;
        const notifId = `streak_milestone_${milestoneKey}`;
        if (!shouldSkip(notifId)) {
          newNotifications.push({
            id: notifId,
            type: 'habit_streak',
            section: 'Habits',
            title: `🔥 ${streakCount} Day Streak Milestone!`,
            description: `Impressive consistency! You've maintained your daily focus streak for ${streakCount} days.`,
            url: 'pages/habits.html',
            icon: 'local_fire_department',
            iconBgClass: 'bg-orange-100 text-orange-600',
            timestamp: Date.now(),
            read: false
          });
          knownIds.add(notifId);
        }
      }
    } catch (e) {}

    // 3. DSA ROADMAP SOLVED PROBLEMS
    try {
      const evaluations = storage.get('dsa_roadmap_evaluations', {}) || {};
      const solvedIds = Object.keys(evaluations);
      if (solvedIds.length > 0) {
        let roadmap = [];
        if (typeof window !== 'undefined' && Array.isArray(window.dsaRoadmap)) {
          roadmap = window.dsaRoadmap;
        } else if (typeof require !== 'undefined') {
          try {
            const mod = require('../data/dsaData.js');
            roadmap = mod.dsaRoadmap || [];
          } catch (e) {}
        }

        solvedIds.forEach(qId => {
          const notifId = `dsa_solved_${qId}`;
          if (shouldSkip(notifId)) return;

          let foundQ = null;
          if (Array.isArray(roadmap)) {
            for (const cat of roadmap) {
              for (const pat of cat.patterns || []) {
                const match = (pat.questions || []).find(q => String(q.id) === String(qId));
                if (match) {
                  foundQ = { ...match, category: cat.name, pattern: pat.name };
                  break;
                }
              }
              if (foundQ) break;
            }
          }

          const qTitle = foundQ ? foundQ.title : `Question #${qId}`;
          const qDiff = foundQ ? ` (${foundQ.difficulty})` : '';
          const qPattern = foundQ ? `${foundQ.pattern || foundQ.category} • ` : '';

          newNotifications.push({
            id: notifId,
            type: 'dsa',
            section: 'DSA Roadmap',
            title: `DSA Solved: ${qTitle}${qDiff}`,
            description: `${qPattern}Great job mastering this algorithm concept.`,
            url: `pages/dsa.html#row-${qId}`,
            icon: 'alt_route',
            iconBgClass: 'bg-indigo-100 text-indigo-600',
            timestamp: Date.now() - 3600000,
            read: false
          });
          knownIds.add(notifId);
        });
      }
    } catch (e) {}

    // 4. CAREER ROADMAP PROGRESSION
    try {
      const careerState = storage.get('career_roadmaps_progress', {}) || {};
      Object.keys(careerState).forEach(roleId => {
        const roleState = careerState[roleId];
        const completedAt = roleState && roleState.completedAt;
        if (!completedAt || typeof completedAt !== 'object') return;

        Object.keys(completedAt).forEach(skillId => {
          const notifId = `career_${roleId}_${skillId}`;
          if (shouldSkip(notifId)) return;

          const date = completedAt[skillId];
          newNotifications.push({
            id: notifId,
            type: 'roadmap',
            section: 'Career Roadmaps',
            title: `Roadmap Milestone Completed`,
            description: `Advanced your curriculum in ${roleId.replace(/-/g, ' ')} with skill ID: ${skillId}.`,
            url: 'pages/roadmaps.html',
            icon: 'map',
            iconBgClass: 'bg-purple-100 text-purple-600',
            timestamp: new Date(date || Date.now()).getTime(),
            read: false
          });
          knownIds.add(notifId);
        });
      });
    } catch (e) {}

    // 5. INTERVIEW PREP COMPLETED SECTIONS
    try {
      const interviewProgress = storage.get('interview_prep_progress', {}) || {};
      Object.values(interviewProgress).forEach(item => {
        if (!item || !item.completed) return;
        const topic = item.topic || 'Practice Topic';
        const notifId = `interview_${item.categoryId || 'prep'}_${topic}`;
        if (shouldSkip(notifId)) return;

        newNotifications.push({
          id: notifId,
          type: 'interview_prep',
          section: 'Interview Prep',
          title: `Interview Prep: ${topic}`,
          description: `Completed question revision and practice checklist.`,
          url: 'pages/interviewPrep.html',
          icon: 'work',
          iconBgClass: 'bg-sky-100 text-sky-600',
          timestamp: Number(item.lastAttempted || Date.now()),
          read: false
        });
        knownIds.add(notifId);
      });
    } catch (e) {}

    // 6. RESUME ANALYSIS COMPLETED
    try {
      const analysis = storage.get('resume_analysis', null);
      if (analysis && (analysis.overallScore !== undefined || analysis.matchScore !== undefined)) {
        const score = analysis.overallScore !== undefined ? analysis.overallScore : analysis.matchScore;
        const dateStamp = analysis.analysisDate || analysis.timestamp || 'latest';
        const notifId = `resume_analysis_${dateStamp}`;
        if (!shouldSkip(notifId)) {
          newNotifications.push({
            id: notifId,
            type: 'resume',
            section: 'Resume Analyzer',
            title: `Resume Analysis Completed (${score}/100)`,
            description: `ATS score and actionable feedback generated for your resume.`,
            url: 'pages/resume.html',
            icon: 'description',
            iconBgClass: 'bg-amber-100 text-amber-600',
            timestamp: new Date(analysis.analysisDate || analysis.timestamp || Date.now()).getTime(),
            read: false
          });
          knownIds.add(notifId);
        }
      }
    } catch (e) {}

    // 7. GITHUB ACTIVITY (Push / Commits)
    try {
      const settings = storage.get('github_settings', null);
      const username = (settings && settings.username) ? settings.username : '2k25adityasharma';
      const cache = storage.get(`github_cache_${username}`, null);
      if (cache && cache.data && Array.isArray(cache.data.events)) {
        cache.data.events
          .filter(evt => evt && evt.type === 'push')
          .slice(0, 3)
          .forEach((evt, idx) => {
            const rawId = evt.id ? String(evt.id) : (evt.createdAt ? `${evt.repo || 'repo'}_${new Date(evt.createdAt).getTime()}` : `${idx}`);
            const notifId = `github_${rawId}`;
            if (shouldSkip(notifId)) return;

            newNotifications.push({
              id: notifId,
              type: 'github',
              section: 'GitHub',
              title: evt.title || 'Pushed new commits',
              description: `Real code activity detected in GitHub repository.`,
              url: 'pages/github.html',
              icon: 'code',
              iconBgClass: 'bg-slate-100 text-slate-700',
              timestamp: new Date(evt.createdAt || Date.now()).getTime(),
              read: false
            });
            knownIds.add(notifId);
          });
      }
    } catch (e) {}

    if (newNotifications.length > 0) {
      // Sort new notifications descending by timestamp
      newNotifications.sort((a, b) => b.timestamp - a.timestamp);
      const merged = [...newNotifications, ...currentItems].slice(0, MAX_NOTIFICATIONS);
      saveStoredNotifications(merged);
      emitChange();
      return newNotifications.length;
    }

    return 0;
  }

  /**
   * Initialize service
   */
  function init() {
    if (!isInitialized) {
      isInitialized = true;
      if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
        // 1. Hook into custom DevPilot activity events
        window.addEventListener('devpilot:activity', (e) => {
          if (e && e.detail) notify(e.detail);
        });

        // 2. Real-time DSA question solve events
        const handleDsaSync = (e) => {
          if (!e || !e.detail) return;
          const { qid, isChecked } = e.detail;
          if (isChecked && qid) {
            let qTitle = `Question #${qid}`;
            let qDiff = '';
            if (Array.isArray(window.dsaRoadmap)) {
              for (const cat of window.dsaRoadmap) {
                for (const pat of cat.patterns || []) {
                  const match = (pat.questions || []).find(q => String(q.id) === String(qid));
                  if (match) {
                    qTitle = match.title;
                    qDiff = match.difficulty ? ` (${match.difficulty})` : '';
                    break;
                  }
                }
                if (qDiff) break;
              }
            }
            notify({
              id: `dsa_solved_${qid}`,
              type: 'dsa',
              section: 'DSA Roadmap',
              title: `DSA Solved: ${qTitle}${qDiff}`,
              message: 'Great job mastering this algorithm concept.',
              url: `pages/dsa.html#row-${qid}`
            });
          }
        };

        window.addEventListener('dsaProgressSync', handleDsaSync);
        window.addEventListener('dsaRoadmapProgressSync', handleDsaSync);

        // 3. Multi-tab Broadcast Channels
        if (typeof BroadcastChannel !== 'undefined') {
          try {
            const notifChannel = new BroadcastChannel('devpilot_notifications_sync');
            notifChannel.onmessage = () => {
              emitChange();
            };

            const habitsChannel = new BroadcastChannel('devpilot_habits_sync');
            habitsChannel.onmessage = (e) => {
              if (e && e.data && e.data.type === 'COMPLETION_CHANGED' && e.data.data && e.data.data.completed) {
                const habitId = e.data.data.habitId;
                const dateStr = e.data.data.dateStr || new Date().toISOString().split('T')[0];
                notify({
                  id: `habit_comp_${habitId}_${dateStr}`,
                  type: 'habit_streak',
                  section: 'Habits',
                  title: '🎯 Habit completed',
                  message: 'Habit completed today.',
                  url: 'pages/habits.html'
                });
              }
            };

            const authChannel = new BroadcastChannel('devpilot_auth_sync');
            authChannel.onmessage = () => {
              syncAuthoritativeActivity();
              emitChange();
            };
          } catch (e) {}
        }

        // 4. User account switch listener
        if (window.AuthService && typeof window.AuthService.onAuthStateChange === 'function') {
          window.AuthService.onAuthStateChange(() => {
            syncAuthoritativeActivity();
            emitChange();
          });
        }
      }
    }
    syncAuthoritativeActivity();
    return {
      notifications: getNotifications(),
      unreadCount: getUnreadCount()
    };
  }

  return {
    init,
    subscribe,
    notify,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    remove: deleteNotification,
    clearAll,
    getNotifications,
    getUnreadCount,
    syncAuthoritativeActivity,
    getDismissedIds,
    clearDismissed,
    formatTimeAgo
  };
});
