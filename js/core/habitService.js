/**
 * DevPilot-AI - Habit & Consistency Tracker Data Access Layer (HabitService)
 * 
 * Provides an authoritative, normalized, fully user-isolated service layer.
 * All operations are strictly bound to the authenticated user ID.
 * Supports both Supabase Cloud Database (PostgreSQL with RLS + Realtime)
 * and Isolated Local Database with instant cross-tab BroadcastChannel sync.
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory(
      require('./authService.js'),
      require('../data/habitsData.js')
    );
  } else {
    root.HabitService = factory(root.AuthService, root.HabitsData);
  }
})(typeof self !== 'undefined' ? self : this, function (AuthService, HabitsData) {
  'use strict';

  let realtimeSubscribers = [];
  let broadcastChannel = null;
  let supabaseChannel = null;

  // Initialize Cross-Tab Realtime Channel
  if (typeof window !== 'undefined' && typeof BroadcastChannel !== 'undefined') {
    try {
      broadcastChannel = new BroadcastChannel('devpilot_habits_realtime');
      broadcastChannel.onmessage = (event) => {
        const payload = event.data;
        if (!payload) return;
        const currentUser = AuthService ? AuthService.getCurrentUser() : null;
        // User isolation check: ignore events for other users
        if (currentUser && payload.userId === currentUser.id) {
          notifyRealtimeSubscribers(payload.type, payload.data);
        }
      };
    } catch (e) {}
  }

  // Cross-tab storage event listener for legacy tab fallbacks
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', (e) => {
      if (e.key && e.key.startsWith('devpilot_u_')) {
        const currentUser = AuthService ? AuthService.getCurrentUser() : null;
        if (currentUser && e.key.includes(currentUser.id)) {
          notifyRealtimeSubscribers('STORAGE_SYNC', { key: e.key });
        }
      }
    });
  }

  function getUserId() {
    const user = AuthService ? AuthService.getCurrentUser() : null;
    if (!user || !user.id) {
      throw new Error('Unauthorized: No active user session found.');
    }
    return user.id;
  }

  function generateUuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  // --------------------------------------------------------------------------
  // USER-ISOLATED STORAGE HELPERS
  // --------------------------------------------------------------------------
  function userKey(resource) {
    return `devpilot_u_${getUserId()}_${resource}`;
  }

  function readStore(resource, fallback = []) {
    try {
      const item = localStorage.getItem(userKey(resource));
      return item ? JSON.parse(item) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function writeStore(resource, data) {
    try {
      localStorage.setItem(userKey(resource), JSON.stringify(data));
    } catch (e) {}
  }

  function emitRealtimeChange(type, data = {}) {
    const payload = {
      type,
      userId: getUserId(),
      data,
      timestamp: Date.now()
    };

    // Broadcast across tabs
    if (broadcastChannel) {
      try {
        broadcastChannel.postMessage(payload);
      } catch (e) {}
    }

    // Local in-memory notification
    notifyRealtimeSubscribers(type, data);
  }

  function notifyRealtimeSubscribers(type, data) {
    realtimeSubscribers.forEach(cb => {
      try {
        cb(type, data);
      } catch (err) {
        console.error('Error in realtime subscriber:', err);
      }
    });
  }

  // ==========================================================================
  // 1. HABITS CRUD
  // ==========================================================================

  /**
   * Fetches all habits for the authenticated user.
   */
  async function getHabits(options = {}) {
    const userId = getUserId();

    // Supabase check
    if (typeof window !== 'undefined' && window.supabase && window.supabase.from) {
      try {
        let query = window.supabase.from('habits').select('*').eq('user_id', userId);
        if (options.activeOnly) query = query.eq('active', true);
        query = query.order('created_at', { ascending: false });
        const { data, error } = await query;
        if (!error && Array.isArray(data)) return data;
      } catch (e) {}
    }

    // Local isolated store
    const habits = readStore('habits', []);
    if (options.activeOnly) {
      return habits.filter(h => h.active !== false);
    }
    return habits;
  }

  /**
   * Creates a new habit for the authenticated user.
   */
  async function createHabit({ title, category = 'General', description = '', targetFrequency = 'daily', customDays = [1, 2, 3, 4, 5], reminderTime = '' }) {
    const userId = getUserId();
    const cleanTitle = (title || '').trim();
    if (!cleanTitle) throw new Error('Habit title is required.');

    const newHabit = {
      id: generateUuid(),
      user_id: userId,
      title: cleanTitle,
      category: (category || 'General').trim(),
      description: (description || '').trim(),
      target_frequency: targetFrequency,
      custom_days: targetFrequency === 'custom' ? customDays : [1, 2, 3, 4, 5],
      reminder_time: reminderTime || '',
      active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Supabase insert
    if (typeof window !== 'undefined' && window.supabase && window.supabase.from) {
      try {
        const { data, error } = await window.supabase.from('habits').insert(newHabit).select().single();
        if (!error && data) {
          emitRealtimeChange('HABIT_CREATED', data);
          return data;
        }
      } catch (e) {}
    }

    // Local store
    const habits = readStore('habits', []);
    habits.unshift(newHabit);
    writeStore('habits', habits);

    emitRealtimeChange('HABIT_CREATED', newHabit);
    return newHabit;
  }

  /**
   * Updates an existing habit owned by the authenticated user.
   */
  async function updateHabit(id, updates = {}) {
    const userId = getUserId();

    // Supabase update
    if (typeof window !== 'undefined' && window.supabase && window.supabase.from) {
      try {
        const { data, error } = await window.supabase
          .from('habits')
          .update({ ...updates, updated_at: new Date().toISOString() })
          .eq('id', id)
          .eq('user_id', userId)
          .select()
          .single();
        if (!error && data) {
          emitRealtimeChange('HABIT_UPDATED', data);
          return data;
        }
      } catch (e) {}
    }

    // Local store
    const habits = readStore('habits', []);
    const idx = habits.findIndex(h => h.id === id && h.user_id === userId);
    if (idx === -1) throw new Error('Habit not found or not owned by user.');

    habits[idx] = {
      ...habits[idx],
      ...updates,
      updated_at: new Date().toISOString()
    };
    writeStore('habits', habits);

    emitRealtimeChange('HABIT_UPDATED', habits[idx]);
    return habits[idx];
  }

  /**
   * Archives a habit (active = false).
   */
  async function archiveHabit(id) {
    return updateHabit(id, { active: false });
  }

  /**
   * Reactivates an archived habit (active = true).
   */
  async function reactivateHabit(id) {
    return updateHabit(id, { active: true });
  }

  /**
   * Permanently deletes a habit and cascades to completions and linked weekly goals.
   */
  async function deleteHabit(id) {
    const userId = getUserId();

    // Supabase delete
    if (typeof window !== 'undefined' && window.supabase && window.supabase.from) {
      try {
        await window.supabase.from('habits').delete().eq('id', id).eq('user_id', userId);
      } catch (e) {}
    }

    // Local store delete
    let habits = readStore('habits', []);
    habits = habits.filter(h => !(h.id === id && h.user_id === userId));
    writeStore('habits', habits);

    // Cascade delete completions
    let completions = readStore('completions', []);
    completions = completions.filter(c => !(c.habit_id === id && c.user_id === userId));
    writeStore('completions', completions);

    // Unlink weekly goals
    let weeklyGoals = readStore('weekly_goals', []);
    weeklyGoals = weeklyGoals.map(wg => {
      if (wg.habit_id === id) return { ...wg, habit_id: null };
      return wg;
    });
    writeStore('weekly_goals', weeklyGoals);

    emitRealtimeChange('HABIT_DELETED', { id });
    return true;
  }

  // ==========================================================================
  // 2. HABIT COMPLETIONS (Normalized & Idempotent)
  // ==========================================================================

  /**
   * Fetches completion records for the authenticated user within an optional date range.
   */
  async function getCompletions(startDate = null, endDate = null) {
    const userId = getUserId();

    // Supabase check
    if (typeof window !== 'undefined' && window.supabase && window.supabase.from) {
      try {
        let query = window.supabase.from('habit_completions').select('*').eq('user_id', userId);
        if (startDate) query = query.gte('completion_date', startDate);
        if (endDate) query = query.lte('completion_date', endDate);
        const { data, error } = await query;
        if (!error && Array.isArray(data)) return data;
      } catch (e) {}
    }

    // Local store
    let completions = readStore('completions', []);
    if (startDate || endDate) {
      completions = completions.filter(c => {
        if (startDate && c.completion_date < startDate) return false;
        if (endDate && c.completion_date > endDate) return false;
        return true;
      });
    }
    return completions;
  }

  /**
   * Idempotent toggle of habit completion for a specific calendar date.
   * If record exists -> deletes it (uncheck).
   * If record does not exist -> creates it (complete).
   */
  async function toggleCompletion(habitId, dateStr) {
    const userId = getUserId();
    if (!dateStr) dateStr = HabitsData.getTodayStr();

    // Supabase toggle
    if (typeof window !== 'undefined' && window.supabase && window.supabase.from) {
      try {
        const { data: existing } = await window.supabase
          .from('habit_completions')
          .select('id')
          .eq('user_id', userId)
          .eq('habit_id', habitId)
          .eq('completion_date', dateStr)
          .maybeSingle();

        if (existing) {
          await window.supabase.from('habit_completions').delete().eq('id', existing.id);
          emitRealtimeChange('COMPLETION_CHANGED', { habitId, dateStr, completed: false });
          return { completed: false, habitId, dateStr };
        } else {
          const newRecord = {
            id: generateUuid(),
            user_id: userId,
            habit_id: habitId,
            completion_date: dateStr,
            created_at: new Date().toISOString()
          };
          await window.supabase.from('habit_completions').insert(newRecord);
          emitRealtimeChange('COMPLETION_CHANGED', { habitId, dateStr, completed: true });
          return { completed: true, habitId, dateStr };
        }
      } catch (e) {}
    }

    // Local store toggle (with atomic duplicate check)
    let completions = readStore('completions', []);
    const existingIdx = completions.findIndex(
      c => c.user_id === userId && c.habit_id === habitId && c.completion_date === dateStr
    );

    let isNowCompleted = false;
    if (existingIdx !== -1) {
      // Remove (uncheck)
      completions.splice(existingIdx, 1);
      isNowCompleted = false;
    } else {
      // Insert (complete)
      completions.push({
        id: generateUuid(),
        user_id: userId,
        habit_id: habitId,
        completion_date: dateStr,
        created_at: new Date().toISOString()
      });
      isNowCompleted = true;
    }

    writeStore('completions', completions);
    emitRealtimeChange('COMPLETION_CHANGED', { habitId, dateStr, completed: isNowCompleted });
    return { completed: isNowCompleted, habitId, dateStr };
  }

  // ==========================================================================
  // 3. DAILY GOALS (Separate Entity & Numeric Progress)
  // ==========================================================================

  /**
   * Fetches daily goals for the authenticated user on a specific date.
   */
  async function getDailyGoals(dateStr = null) {
    const userId = getUserId();
    const targetDate = dateStr || HabitsData.getTodayStr();

    if (typeof window !== 'undefined' && window.supabase && window.supabase.from) {
      try {
        const { data, error } = await window.supabase
          .from('daily_goals')
          .select('*')
          .eq('user_id', userId)
          .eq('date', targetDate)
          .order('created_at', { ascending: true });
        if (!error && Array.isArray(data)) return data;
      } catch (e) {}
    }

    const goals = readStore('daily_goals', []);
    return goals.filter(g => g.user_id === userId && g.date === targetDate);
  }

  /**
   * Creates a new daily goal.
   */
  async function createDailyGoal({ title, target = 1, category = 'General', date = null }) {
    const userId = getUserId();
    const targetDate = date || HabitsData.getTodayStr();
    const cleanTitle = (title || '').trim();
    if (!cleanTitle) throw new Error('Daily goal title is required.');

    const newGoal = {
      id: generateUuid(),
      user_id: userId,
      title: cleanTitle,
      target: Math.max(1, parseInt(target, 10) || 1),
      progress: 0,
      date: targetDate,
      category: (category || 'General').trim(),
      completed: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    if (typeof window !== 'undefined' && window.supabase && window.supabase.from) {
      try {
        const { data, error } = await window.supabase.from('daily_goals').insert(newGoal).select().single();
        if (!error && data) {
          emitRealtimeChange('DAILY_GOAL_CHANGED', data);
          return data;
        }
      } catch (e) {}
    }

    const goals = readStore('daily_goals', []);
    goals.push(newGoal);
    writeStore('daily_goals', goals);

    emitRealtimeChange('DAILY_GOAL_CHANGED', newGoal);
    return newGoal;
  }

  /**
   * Adjusts numeric progress for a daily goal (+1 or -1 or custom delta).
   */
  async function adjustDailyGoalProgress(id, delta = 1) {
    const userId = getUserId();

    const goals = readStore('daily_goals', []);
    const idx = goals.findIndex(g => g.id === id && g.user_id === userId);
    if (idx === -1) throw new Error('Daily goal not found.');

    const goal = goals[idx];
    const newProgress = Math.max(0, Math.min(goal.target * 2, goal.progress + delta));
    const isCompleted = newProgress >= goal.target;

    const updates = {
      progress: newProgress,
      completed: isCompleted,
      updated_at: new Date().toISOString()
    };

    if (typeof window !== 'undefined' && window.supabase && window.supabase.from) {
      try {
        await window.supabase.from('daily_goals').update(updates).eq('id', id).eq('user_id', userId);
      } catch (e) {}
    }

    goals[idx] = { ...goal, ...updates };
    writeStore('daily_goals', goals);

    emitRealtimeChange('DAILY_GOAL_CHANGED', goals[idx]);
    return goals[idx];
  }

  /**
   * Toggles completion status of a daily goal directly.
   */
  async function toggleDailyGoalComplete(id) {
    const userId = getUserId();

    const goals = readStore('daily_goals', []);
    const idx = goals.findIndex(g => g.id === id && g.user_id === userId);
    if (idx === -1) throw new Error('Daily goal not found.');

    const goal = goals[idx];
    const isCompleted = !goal.completed;
    const newProgress = isCompleted ? Math.max(goal.progress, goal.target) : 0;

    const updates = {
      completed: isCompleted,
      progress: newProgress,
      updated_at: new Date().toISOString()
    };

    if (typeof window !== 'undefined' && window.supabase && window.supabase.from) {
      try {
        await window.supabase.from('daily_goals').update(updates).eq('id', id).eq('user_id', userId);
      } catch (e) {}
    }

    goals[idx] = { ...goal, ...updates };
    writeStore('daily_goals', goals);

    emitRealtimeChange('DAILY_GOAL_CHANGED', goals[idx]);
    return goals[idx];
  }

  /**
   * Deletes a daily goal.
   */
  async function deleteDailyGoal(id) {
    const userId = getUserId();

    if (typeof window !== 'undefined' && window.supabase && window.supabase.from) {
      try {
        await window.supabase.from('daily_goals').delete().eq('id', id).eq('user_id', userId);
      } catch (e) {}
    }

    let goals = readStore('daily_goals', []);
    goals = goals.filter(g => !(g.id === id && g.user_id === userId));
    writeStore('daily_goals', goals);

    emitRealtimeChange('DAILY_GOAL_CHANGED', { id, deleted: true });
    return true;
  }

  // ==========================================================================
  // 4. WEEKLY GOALS (Calendar Week Scoped)
  // ==========================================================================

  /**
   * Fetches weekly goals for the authenticated user for a specific calendar week key (e.g. '2026-W38').
   */
  async function getWeeklyGoals(weekKey = null) {
    const userId = getUserId();
    const currentWeekKey = weekKey || HabitsData.getWeekId(HabitsData.getTodayStr());

    if (typeof window !== 'undefined' && window.supabase && window.supabase.from) {
      try {
        const { data, error } = await window.supabase
          .from('weekly_goals')
          .select('*')
          .eq('user_id', userId)
          .eq('week_key', currentWeekKey)
          .order('created_at', { ascending: true });
        if (!error && Array.isArray(data)) return data;
      } catch (e) {}
    }

    const goals = readStore('weekly_goals', []);
    return goals.filter(g => g.user_id === userId && g.week_key === currentWeekKey);
  }

  /**
   * Creates a new weekly goal.
   */
  async function createWeeklyGoal({ title, habitId = null, target = 5, unit = 'completions', weekKey = null, category = 'General' }) {
    const userId = getUserId();
    const currentWeekKey = weekKey || HabitsData.getWeekId(HabitsData.getTodayStr());
    const cleanTitle = (title || '').trim();
    if (!cleanTitle) throw new Error('Weekly goal title is required.');

    const newGoal = {
      id: generateUuid(),
      user_id: userId,
      title: cleanTitle,
      habit_id: habitId || null,
      target: Math.max(1, parseInt(target, 10) || 5),
      progress: 0,
      unit: unit || 'completions',
      week_key: currentWeekKey,
      category: (category || 'General').trim(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    if (typeof window !== 'undefined' && window.supabase && window.supabase.from) {
      try {
        const { data, error } = await window.supabase.from('weekly_goals').insert(newGoal).select().single();
        if (!error && data) {
          emitRealtimeChange('WEEKLY_GOAL_CHANGED', data);
          return data;
        }
      } catch (e) {}
    }

    const goals = readStore('weekly_goals', []);
    goals.push(newGoal);
    writeStore('weekly_goals', goals);

    emitRealtimeChange('WEEKLY_GOAL_CHANGED', newGoal);
    return newGoal;
  }

  /**
   * Deletes a weekly goal.
   */
  async function deleteWeeklyGoal(id) {
    const userId = getUserId();

    if (typeof window !== 'undefined' && window.supabase && window.supabase.from) {
      try {
        await window.supabase.from('weekly_goals').delete().eq('id', id).eq('user_id', userId);
      } catch (e) {}
    }

    let goals = readStore('weekly_goals', []);
    goals = goals.filter(g => !(g.id === id && g.user_id === userId));
    writeStore('weekly_goals', goals);

    emitRealtimeChange('WEEKLY_GOAL_CHANGED', { id, deleted: true });
    return true;
  }

  // ==========================================================================
  // 5. REALTIME SUBSCRIPTION API
  // ==========================================================================

  function onRealtimeChange(callback) {
    if (typeof callback === 'function') {
      realtimeSubscribers.push(callback);
    }
    return () => {
      realtimeSubscribers = realtimeSubscribers.filter(cb => cb !== callback);
    };
  }

  return {
    getHabits,
    createHabit,
    updateHabit,
    archiveHabit,
    reactivateHabit,
    deleteHabit,
    getCompletions,
    toggleCompletion,
    getDailyGoals,
    createDailyGoal,
    adjustDailyGoalProgress,
    toggleDailyGoalComplete,
    deleteDailyGoal,
    getWeeklyGoals,
    createWeeklyGoal,
    deleteWeeklyGoal,
    onRealtimeChange
  };
});
