/**
 * DevPilot-AI - Modern Reactive Dashboard Module
 * Fully Data-Driven Controller connecting the existing UI to authentic application state
 */

(function () {
  'use strict';

  // Component State
  let currentCalDate = new Date();
  let selectedDateStr = (typeof DashboardDataService !== 'undefined' && DashboardDataService.getTodayDateStr)
    ? DashboardDataService.getTodayDateStr()
    : new Date().toISOString().split('T')[0];
  let taskFilterMode = 'all'; // 'all' | 'active'
  let cachedGithubData = null;
  let isGithubLoading = false;
  let lastSyncTimestamp = Date.now();
  let isGlobalTimerSubscribed = false;

  document.addEventListener('DOMContentLoaded', () => {
    initDashboard();
  });

  /**
   * Main Dashboard Initializer
   */
  function initDashboard() {
    renderGreeting();
    renderStreak();
    renderMainGoal();
    renderContinueLearning();
    renderAISuggestion();
    renderLeetCodeAndNotesStats();
    renderRoadmapProgress();
    renderTasksSection();
    renderCalendar();
    renderRecentActivity();
    renderFooterProductivity();
    initEventListeners();
    initCrossPageSync();
    fetchAndRenderGitHub();
  }

  // ==========================================
  // 1. GREETING & DEVELOPER PROFILE
  // ==========================================
  function renderGreeting() {
    const greetingEl = document.getElementById('user-greeting');
    const subtitleEl = document.getElementById('user-greeting-subtitle');
    if (!greetingEl) return;

    const hour = new Date().getHours();
    let timeGreeting = 'Good Evening';
    if (hour >= 5 && hour < 12) timeGreeting = 'Good Morning';
    else if (hour >= 12 && hour < 17) timeGreeting = 'Good Afternoon';
    else if (hour >= 17 && hour < 22) timeGreeting = 'Good Evening';
    else timeGreeting = 'Good Night';

    let userName = 'Aditya';
    if (typeof Storage !== 'undefined') {
      const userSettings = Storage.get('user_settings', null);
      if (userSettings && userSettings.profile && userSettings.profile.fullName) {
        userName = userSettings.profile.fullName.split(' ')[0] || 'Aditya';
      }
    }

    greetingEl.textContent = `${timeGreeting}, ${userName}! 👋`;

    if (subtitleEl) {
      const streak = (typeof DashboardDataService !== 'undefined') ? DashboardDataService.getStreak() : { currentStreak: 0 };
      if (streak.currentStreak > 3) {
        subtitleEl.textContent = `On a ${streak.currentStreak}-day momentum streak! Keep building today...`;
      } else {
        subtitleEl.textContent = 'Stay consistent, keep building...';
      }
    }
  }

  // ==========================================
  // 2. MOMENTUM STREAK CARD
  // ==========================================
  function renderStreak() {
    const streakTitleEl = document.getElementById('streak-title');
    const streakCountEl = document.getElementById('streak-count');
    const streakSubtitleEl = document.getElementById('streak-subtitle');

    if (typeof DashboardDataService === 'undefined') return;
    const streak = DashboardDataService.getStreak();

    if (streakCountEl) {
      streakCountEl.textContent = streak.currentStreak;
    } else if (streakTitleEl) {
      streakTitleEl.innerHTML = `<span id="streak-count">${streak.currentStreak}</span> Day Streak`;
    }

    if (streakSubtitleEl) {
      if (streak.isExtendedToday) {
        streakSubtitleEl.textContent = 'Active today • Keep it up!';
      } else if (streak.currentStreak > 0) {
        streakSubtitleEl.textContent = 'Complete today\'s goal to maintain!';
      } else {
        streakSubtitleEl.textContent = 'Start your streak today!';
      }
    }
  }

  // ==========================================
  // 3. TODAY'S MAIN GOAL
  // ==========================================
  function renderMainGoal() {
    const titleEl = document.getElementById('main-goal-title');
    const priorityEl = document.getElementById('main-goal-priority');
    const progressTextEl = document.getElementById('goal-progress-text');
    const progressBarEl = document.getElementById('goal-progress-bar');
    const statusTextEl = document.getElementById('goal-status-text');

    if (typeof DashboardDataService === 'undefined') return;
    const mainGoal = DashboardDataService.getMainGoal(selectedDateStr);

    if (titleEl) titleEl.textContent = mainGoal.title;
    if (priorityEl) {
      const p = mainGoal.priority || 'Coding';
      priorityEl.textContent = p.startsWith('Priority:') ? p : `Priority: ${p}`;
    }
    if (progressTextEl) progressTextEl.textContent = `${mainGoal.completedCount}/${mainGoal.totalCount} Completed`;
    if (progressBarEl) progressBarEl.style.width = `${mainGoal.percentage}%`;

    if (statusTextEl) {
      if (mainGoal.percentage === 100) {
        statusTextEl.className = 'mt-3 text-label-sm font-label-sm text-[#10b981] flex items-center gap-1';
        statusTextEl.innerHTML = '<span class="material-symbols-outlined text-[14px]">check_circle</span> All daily goals completed today! 🎉';
      } else if (mainGoal.completedCount > 0) {
        statusTextEl.className = 'mt-3 text-label-sm font-label-sm text-primary flex items-center gap-1';
        statusTextEl.innerHTML = `<span class="material-symbols-outlined text-[14px]">trending_up</span> On track — ${mainGoal.totalCount - mainGoal.completedCount} task${mainGoal.totalCount - mainGoal.completedCount === 1 ? '' : 's'} remaining.`;
      } else {
        statusTextEl.className = 'mt-3 text-label-sm font-label-sm text-on-surface-variant flex items-center gap-1';
        statusTextEl.innerHTML = '<span class="material-symbols-outlined text-[14px]">schedule</span> Ready to begin today\'s development session.';
      }
    }
  }

  // ==========================================
  // 4. CONTINUE LEARNING CARD
  // ==========================================
  function renderContinueLearning() {
    const categoryEl = document.getElementById('continue-category');
    const titleEl = document.getElementById('continue-title');
    const percentEl = document.getElementById('continue-progress-percent');
    const barEl = document.getElementById('continue-progress-bar');
    const resumeBtn = document.getElementById('btn-resume-practice');

    if (typeof DashboardDataService === 'undefined') return;
    const nextItem = DashboardDataService.getNextDSAItem();

    if (categoryEl) {
      const cat = nextItem.category || 'Data Structures';
      const top = nextItem.topic || '';
      if (top && !cat.includes(top)) {
        categoryEl.textContent = `${cat} • ${top}`;
      } else {
        categoryEl.textContent = cat;
      }
    }
    if (titleEl) titleEl.textContent = nextItem.title;
    if (percentEl) {
      percentEl.textContent = `${nextItem.percentage}%`;
      if (nextItem.totalQuestions) {
        percentEl.title = `Overall DSA Progress: ${nextItem.totalSolved || 0}/${nextItem.totalQuestions} Solved (${nextItem.percentage}%)`;
      }
    }
    if (barEl) barEl.style.width = `${nextItem.percentage}%`;

    if (resumeBtn && nextItem.targetUrl) {
      resumeBtn.setAttribute('href', nextItem.targetUrl);
    }
  }

  // ==========================================
  // 5. AI SUGGESTION CARD
  // ==========================================
  function renderAISuggestion() {
    const textEl = document.getElementById('ai-suggestion-text');
    const topicEl = document.getElementById('ai-suggestion-topic');
    const badgeEl = document.getElementById('ai-suggestion-badge');
    const startBtn = document.getElementById('btn-start-learning');

    if (typeof DashboardDataService === 'undefined') return;
    const suggestion = DashboardDataService.getAISuggestion();

    if (textEl) textEl.textContent = suggestion.reason;
    if (topicEl) topicEl.textContent = suggestion.title;
    if (badgeEl) badgeEl.textContent = suggestion.badge;

    if (startBtn && suggestion.targetUrl) {
      startBtn.setAttribute('href', suggestion.targetUrl);
      startBtn.onclick = function () {
        if (suggestion && suggestion.chatPrompt) {
          try {
            localStorage.setItem('devpilot_prompt_to_run', suggestion.chatPrompt);
          } catch (e) {}
        }
      };
    }
  }

  // ==========================================
  // 6. GITHUB ACTIVITY CARD
  // ==========================================
  async function fetchAndRenderGitHub(forceRefresh = false) {
    const countEl = document.getElementById('github-commit-count');
    const eventsListEl = document.getElementById('github-events-list');
    const rangeBadgeEl = document.getElementById('github-range-badge');
    const userProfileLink = document.getElementById('github-user-profile-link');
    const usernameDisplay = document.getElementById('github-username-display');

    if (typeof DashboardDataService === 'undefined') return;

    // Immediately render current username from settings if available
    const currentSettings = typeof DashboardDataService.getGithubSettings === 'function'
      ? DashboardDataService.getGithubSettings()
      : { username: '2k25adityasharma' };
    if (usernameDisplay && currentSettings.username) {
      usernameDisplay.textContent = `@${currentSettings.username}`;
    }
    if (userProfileLink && currentSettings.username) {
      userProfileLink.href = `https://github.com/${encodeURIComponent(currentSettings.username)}`;
    }

    if (isGithubLoading && !forceRefresh) return;
    isGithubLoading = true;

    // Show initial or loading state if no cached data yet
    if (!cachedGithubData && eventsListEl) {
      eventsListEl.innerHTML = `
        <div class="flex items-center gap-2 py-2 text-outline text-label-sm animate-pulse">
          <span class="material-symbols-outlined text-[18px] animate-spin">sync</span>
          <span>Syncing real GitHub activity...</span>
        </div>
      `;
    }

    try {
      const data = await DashboardDataService.getGithubActivity(forceRefresh);
      cachedGithubData = data;

      if (data && data.username) {
        if (usernameDisplay) usernameDisplay.textContent = `@${data.username}`;
        if (userProfileLink) userProfileLink.href = `https://github.com/${encodeURIComponent(data.username)}`;
      }

      if (countEl) {
        countEl.textContent = data.weeklyCommits || data.totalCommitsCount || 0;
      }

      if (rangeBadgeEl) {
        rangeBadgeEl.textContent = data.isCached ? 'Cached' : 'This Week';
      }

      if (eventsListEl) {
        if (!data.events || data.events.length === 0) {
          eventsListEl.innerHTML = `
            <div class="py-3 text-center">
              <p class="text-label-sm text-outline">No recent commits found for @${escapeHtml(data.username)}.</p>
              <a href="pages/settings.html" class="inline-block mt-2 text-xs text-primary hover:underline font-medium">Update GitHub Username in Settings →</a>
            </div>
          `;
        } else {
          eventsListEl.innerHTML = data.events.slice(0, 3).map(event => `
            <div class="flex items-start gap-2 group">
              <span class="material-symbols-outlined text-[16px] text-outline mt-0.5 group-hover:text-primary transition-colors">
                ${event.type === 'PushEvent' ? 'commit' : (event.type === 'CreateEvent' ? 'add_circle' : 'update')}
              </span>
              <div class="min-w-0 flex-1">
                <p class="font-label-md text-label-md text-on-surface truncate font-medium">${escapeHtml(event.message)}</p>
                <p class="font-label-sm text-label-sm text-outline truncate">${escapeHtml(event.repo)} • ${escapeHtml(event.timeAgo)}</p>
              </div>
            </div>
          `).join('');
        }
      }
    } catch (err) {
      if (eventsListEl) {
        eventsListEl.innerHTML = `
          <div class="py-2">
            <p class="text-label-sm text-outline">Rate limit or offline. Showing cached state.</p>
            <button id="btn-retry-github" class="mt-2 text-xs text-primary hover:underline font-semibold flex items-center gap-1">
              <span class="material-symbols-outlined text-[14px]">refresh</span> Retry GitHub Sync
            </button>
          </div>
        `;
        const retryBtn = document.getElementById('btn-retry-github');
        if (retryBtn) {
          retryBtn.addEventListener('click', () => fetchAndRenderGitHub(true));
        }
      }
    } finally {
      isGithubLoading = false;
    }
  }

  // ==========================================
  // 7. LEETCODE & NOTES STATS
  // ==========================================
  function renderLeetCodeAndNotesStats() {
    const leetCodeEl = document.getElementById('stat-leetcode-count');
    const notesEl = document.getElementById('stat-notes-count');

    if (typeof DashboardDataService === 'undefined') return;

    const leetCodeCount = DashboardDataService.getLeetCodeCount();
    const notesCount = DashboardDataService.getNotesCount();

    if (leetCodeEl) leetCodeEl.textContent = leetCodeCount;
    if (notesEl) notesEl.textContent = notesCount;

    // Render LeetCode sparkline reflecting solved count
    const lcSparkline = document.getElementById('leetcode-sparkline');
    if (lcSparkline) {
      const heights = [3, 4, 2, 5, Math.min(6, Math.max(2, Math.round(leetCodeCount / 10)))];
      lcSparkline.innerHTML = heights.map((h, i) => `
        <div class="w-2 h-${h} ${i === heights.length - 1 ? 'bg-primary' : 'bg-primary/' + (30 + i * 10)} rounded-t transition-all duration-300"></div>
      `).join('');
    }

    // Render Notes sparkline reflecting notes count
    const notesSparkline = document.getElementById('notes-sparkline');
    if (notesSparkline) {
      const heights = [4, 2, 5, 3, Math.min(6, Math.max(2, Math.round(notesCount / 5)))];
      notesSparkline.innerHTML = heights.map((h, i) => `
        <div class="w-2 h-${h} ${i === heights.length - 1 ? 'bg-secondary-fixed-dim' : 'bg-secondary-fixed-dim/' + (40 + i * 10)} rounded-t transition-all duration-300"></div>
      `).join('');
    }
  }

  // ==========================================
  // 8. ROADMAP PROGRESS (Dynamic Courses & Interview Prep)
  // ==========================================
  function renderRoadmapProgress() {
    const listEl = document.getElementById('roadmap-progress-list');
    const milestoneEl = document.getElementById('roadmap-next-milestone');

    if (typeof DashboardDataService === 'undefined' || !listEl) return;
    const progress = DashboardDataService.getCareerRoadmapProgress();

    const colorClasses = [
      'bg-primary',
      'bg-indigo-600',
      'bg-[#10b981]',
      'bg-amber-500',
      'bg-tertiary-container'
    ];

    if (!progress.milestones || progress.milestones.length === 0) {
      listEl.innerHTML = `
        <p class="text-label-sm text-outline py-2">No active roadmap selected yet.</p>
      `;
    } else {
      listEl.innerHTML = progress.milestones.map((item, index) => {
        const colorClass = colorClasses[index % colorClasses.length];
        const linkUrl = item.url || '#';
        const badgeColor = item.type === 'dsa' 
          ? 'bg-primary/10 text-primary' 
          : item.type === 'career' 
            ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' 
            : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400';

        return `
          <a href="${linkUrl}" class="block group p-2.5 rounded-xl border border-outline-variant/40 hover:border-primary/40 hover:bg-surface-container-low transition-all cursor-pointer bg-surface-container-lowest/40">
            <div class="flex justify-between items-start text-label-sm font-label-sm mb-1">
              <div class="min-w-0 pr-2">
                <div class="flex items-center gap-1.5 flex-wrap">
                  <span class="text-on-surface font-semibold truncate group-hover:text-primary transition-colors">${escapeHtml(item.title)}</span>
                  ${item.badge ? `<span class="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${badgeColor}">${escapeHtml(item.badge)}</span>` : ''}
                </div>
                ${item.subtitle ? `<p class="text-[11px] text-on-surface-variant truncate mt-0.5">${escapeHtml(item.subtitle)}</p>` : ''}
              </div>
              <span class="text-on-surface font-semibold shrink-0 ml-2 group-hover:text-primary transition-colors">${item.percentage}%</span>
            </div>
            <div class="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden mb-1.5">
              <div class="h-full ${colorClass} rounded-full transition-all duration-500" style="width: ${item.percentage}%;"></div>
            </div>
            ${item.activePreview ? `
              <div class="flex items-center gap-1.5 text-[11px] text-on-surface-variant bg-surface-container/60 dark:bg-slate-800/60 px-2 py-1 rounded-md border border-outline-variant/30 truncate">
                <span class="material-symbols-outlined text-[13px] text-primary shrink-0">${item.previewIcon || 'info'}</span>
                <span class="truncate font-medium">${escapeHtml(item.activePreview)}</span>
              </div>
            ` : ''}
          </a>
        `;
      }).join('');
    }

    if (milestoneEl && progress.nextMilestone) {
      const milestoneTarget = progress.career?.roleId 
        ? `pages/roadmaps.html#role=${progress.career.roleId}` 
        : 'pages/roadmaps.html';
      milestoneEl.innerHTML = `
        <a href="${milestoneTarget}" class="flex items-center gap-2 hover:text-primary transition-colors truncate">
          <span class="material-symbols-outlined text-primary text-[16px] shrink-0">emoji_events</span>
          <span class="truncate">${escapeHtml(progress.nextMilestone)}</span>
        </a>
      `;
    }
  }

  // ==========================================
  // 9. TODAY'S TASKS LIST & FILTER
  // ==========================================
  function renderTasksSection() {
    const taskListEl = document.getElementById('task-list');
    const completedCountEl = document.getElementById('tasks-completed-count');
    const totalCountEl = document.getElementById('tasks-total-count');

    if (typeof DashboardDataService === 'undefined' || !taskListEl) return;
    const allGoals = DashboardDataService.getDailyGoals(selectedDateStr);

    const completed = allGoals.filter(g => g.completed).length;
    const total = allGoals.length;

    if (completedCountEl) completedCountEl.textContent = completed;
    if (totalCountEl) totalCountEl.textContent = total;

    let displayGoals = allGoals;
    if (taskFilterMode === 'active' && completed < total) {
      displayGoals = allGoals.filter(g => !g.completed);
    }

    if (displayGoals.length === 0) {
      taskListEl.innerHTML = `
        <div class="py-8 text-center flex flex-col items-center justify-center">
          <div class="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-outline mb-2">
            <span class="material-symbols-outlined text-2xl">check_circle</span>
          </div>
          <p class="font-label-md text-label-md text-on-surface font-medium">All caught up for this day!</p>
          <p class="text-label-sm text-outline mt-1 mb-4">No pending daily goals.</p>
          <a href="pages/habits.html" class="inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/10 hover:bg-primary/20 px-3 py-1.5 rounded-lg transition-colors">
            <span class="material-symbols-outlined text-[16px]">add</span> Add Daily Goals in Habits
          </a>
        </div>
      `;
      return;
    }

    taskListEl.innerHTML = displayGoals.map(goal => {
      const isChecked = !!goal.completed;
      const cardBg = isChecked ? 'hover:bg-surface-container-low' : 'bg-surface-container-lowest shadow-sm border-outline-variant/20 hover:bg-surface-container-low';
      const textClass = isChecked ? 'line-through text-on-surface-variant' : 'text-on-surface font-medium';
      const timeClass = isChecked ? 'text-outline' : 'text-primary';
      const timeLabel = isChecked ? 'Completed' : (goal.time || 'In Progress');

      return `
        <label class="flex items-start gap-3 p-3 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-outline-variant/30 ${cardBg} task-item" data-goal-id="${goal.id}">
          <div class="relative flex items-center justify-center mt-0.5">
            <input ${isChecked ? 'checked' : ''} class="peer appearance-none w-5 h-5 border-2 border-outline rounded-md checked:bg-primary checked:border-primary transition-all task-checkbox" type="checkbox" data-id="${goal.id}"/>
            <span class="material-symbols-outlined absolute text-white text-[16px] opacity-0 peer-checked:opacity-100 pointer-events-none">check</span>
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-label-md text-label-md ${textClass} truncate task-text">${escapeHtml(goal.title)}</p>
            <p class="font-label-sm text-label-sm ${timeClass} mt-0.5">${timeLabel}</p>
          </div>
          <span class="bg-surface-container px-2 py-1 rounded text-label-sm font-label-sm text-on-surface-variant shrink-0">${escapeHtml(goal.category || 'Goal')}</span>
        </label>
      `;
    }).join('');

    // Bind checkboxes
    taskListEl.querySelectorAll('.task-checkbox').forEach(cb => {
      cb.addEventListener('change', (e) => {
        const goalId = e.target.getAttribute('data-id');
        if (goalId && typeof DashboardDataService !== 'undefined') {
          DashboardDataService.toggleDailyGoal(goalId);
          // Re-render affected sections
          renderTasksSection();
          renderMainGoal();
          renderStreak();
          renderCalendar();
          renderRecentActivity();
          renderFooterProductivity();
        }
      });
    });
  }

  // ==========================================
  // 10. INTERACTIVE MINI CALENDAR
  // ==========================================
  function renderCalendar() {
    const monthTitleEl = document.getElementById('cal-month-title');
    const gridEl = document.getElementById('cal-grid');

    if (typeof DashboardDataService === 'undefined' || !gridEl) return;

    const calData = DashboardDataService.getCalendarData(
      currentCalDate.getFullYear(),
      currentCalDate.getMonth(),
      selectedDateStr
    );

    if (monthTitleEl) {
      monthTitleEl.textContent = calData.monthName;
    }

    gridEl.innerHTML = calData.days.map(day => {
      let cellClasses = 'py-1 rounded text-label-sm cursor-pointer transition-all relative select-none';

      if (day.isSelected) {
        cellClasses += ' bg-primary text-on-primary font-bold shadow-sm';
      } else if (day.isToday) {
        cellClasses += ' font-bold text-primary border border-primary/40 hover:bg-surface-container';
      } else if (!day.isCurrentMonth) {
        cellClasses += ' text-outline/50 hover:bg-surface-container/50';
      } else {
        cellClasses += ' text-on-surface hover:bg-surface-container';
      }

      const dotHtml = day.hasActivity && !day.isSelected
        ? '<span class="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#10b981] rounded-full"></span>'
        : '';

      return `
        <div class="${cellClasses}" data-date="${day.dateStr}" title="${day.dateStr}">
          ${day.dayNumber}
          ${dotHtml}
        </div>
      `;
    }).join('');

    // Bind day clicks
    gridEl.querySelectorAll('[data-date]').forEach(cell => {
      cell.addEventListener('click', () => {
        const clickedDate = cell.getAttribute('data-date');
        if (clickedDate) {
          selectedDateStr = clickedDate;
          renderCalendar();
          renderTasksSection();
          renderMainGoal();
        }
      });
    });
  }

  // ==========================================
  // 11. RECENT ACTIVITY TIMELINE
  // ==========================================
  async function renderRecentActivity() {
    const listEl = document.getElementById('recent-activity-list');
    if (typeof DashboardDataService === 'undefined' || !listEl) return;

    let activities = [];
    try {
      activities = await DashboardDataService.getRecentActivity();
    } catch (err) {
      activities = [];
    }

    if (!activities || !Array.isArray(activities) || activities.length === 0) {
      listEl.innerHTML = `
        <p class="text-label-sm text-outline py-2 pl-2">No recent activity logged yet.</p>
      `;
      return;
    }

    listEl.innerHTML = activities.slice(0, 5).map(act => {
      let dotColor = 'bg-primary';
      const type = act.source || act.type;
      if (type === 'github') dotColor = 'bg-[#10b981]';
      else if (type === 'dsa') dotColor = 'bg-indigo-600';
      else if (type === 'notes') dotColor = 'bg-amber-500';
      else if (type === 'timer') dotColor = 'bg-rose-500';

      const text = act.text || act.title || 'Recent Activity';
      const timeStr = act.timeAgo || act.subtitle || 'Recently';
      const sourceStr = act.source || act.type || 'System';

      return `
        <div class="relative group">
          <span class="absolute -left-5 top-1 w-2.5 h-2.5 rounded-full ${dotColor} border-2 border-surface transition-transform group-hover:scale-125"></span>
          <p class="font-label-md text-label-md text-on-surface leading-tight font-medium">${escapeHtml(text)}</p>
          <p class="font-label-sm text-label-sm text-outline mt-0.5">${escapeHtml(timeStr)} • ${escapeHtml(sourceStr)}</p>
        </div>
      `;
    }).join('');
  }

  // ==========================================
  // 12. PRODUCTIVITY SUMMARY & GLOBAL TIMER
  // ==========================================
  function renderFooterProductivity() {
    const focusTimeEl = document.getElementById('focus-time-display');
    const focusSubtextEl = document.getElementById('focus-time-subtext');
    const topSkillEl = document.getElementById('top-skill-display');
    const topSkillSubtextEl = document.getElementById('top-skill-subtext');
    const topSkillIconEl = document.getElementById('top-skill-icon');
    const tasksCompletedEl = document.getElementById('tasks-completed-count');
    const tasksTotalEl = document.getElementById('tasks-total-count');
    const tasksPercentEl = document.getElementById('tasks-percentage-subtext');
    const streakEl = document.getElementById('current-streak-display');
    const streakSubtextEl = document.getElementById('current-streak-subtext');
    const focusBtn = document.getElementById('start-focus-btn');
    const focusBtnText = document.getElementById('focus-btn-text');

    if (typeof DashboardDataService === 'undefined') return;

    // 1. Focus Time Today
    const focusStats = DashboardDataService.getFocusTimeToday();
    const timerState = (typeof window !== 'undefined' && window.GlobalTimer) ? window.GlobalTimer.getState() : null;

    if (focusTimeEl) {
      if (timerState && timerState.isRunning) {
        focusTimeEl.innerHTML = `${focusStats.displayStr} <span class="font-label-md text-label-md text-[#10b981] flex items-center ml-1.5"><span class="material-symbols-outlined text-[14px]">arrow_upward</span> In Session</span>`;
        if (focusSubtextEl) focusSubtextEl.innerHTML = '<span class="text-[#10b981] font-medium">Session in progress...</span>';
      } else if (focusStats.minutes > 0) {
        focusTimeEl.innerHTML = `${focusStats.displayStr} <span class="font-label-md text-label-md text-[#10b981] flex items-center ml-1.5"><span class="material-symbols-outlined text-[14px]">arrow_upward</span> Active</span>`;
        if (focusSubtextEl) {
          focusSubtextEl.innerHTML = `<span class="text-outline">${focusStats.sessionsCount} ${focusStats.sessionsCount === 1 ? 'session' : 'sessions'} today</span>`;
        }
      } else {
        focusTimeEl.textContent = '0m';
        if (focusSubtextEl) focusSubtextEl.innerHTML = '<span class="text-outline">0 sessions</span>';
      }
    }

    // 2. Top Skill (Weekly Weighted Score)
    const topSkill = DashboardDataService.getTopSkill('week');
    if (topSkillEl) {
      topSkillEl.textContent = topSkill.skill;
      topSkillEl.title = topSkill.skill;
    }
    if (topSkillSubtextEl) {
      topSkillSubtextEl.textContent = topSkill.subtext;
    }
    if (topSkillIconEl) {
      topSkillIconEl.textContent = topSkill.icon || 'data_object';
    }

    // 3. Tasks Completed Today
    const tasksSummary = DashboardDataService.getTodayTasksSummary();
    if (tasksCompletedEl) tasksCompletedEl.textContent = tasksSummary.completed;
    if (tasksTotalEl) tasksTotalEl.textContent = tasksSummary.total;
    if (tasksPercentEl) tasksPercentEl.textContent = `${tasksSummary.percentage}% today`;

    // 4. Current Streak
    const streakData = DashboardDataService.getStreak();
    if (streakEl) {
      streakEl.textContent = `${streakData.currentStreak} ${streakData.currentStreak === 1 ? 'day' : 'days'}`;
    }
    if (streakSubtextEl) {
      if (streakData.currentStreak > 0) {
        streakSubtextEl.innerHTML = '<span>🔥</span> <span>Consistent</span>';
      } else {
        streakSubtextEl.innerHTML = '<span class="text-outline">Start a streak!</span>';
      }
    }

    // 5. Global Timer Button State
    if (focusBtn && typeof window !== 'undefined' && window.GlobalTimer) {
      updateTimerButtonState(timerState, focusBtn, focusBtnText);

      // Subscribe to global timer state updates ONCE
      if (!isGlobalTimerSubscribed) {
        isGlobalTimerSubscribed = true;
        window.GlobalTimer.subscribe((newState) => {
          renderFooterProductivity();
        });
      }
    }
  }

  function updateTimerButtonState(state, btn, textEl) {
    if (!btn) return;
    const icon = btn.querySelector('.material-symbols-outlined');

    if (state && state.isRunning) {
      if (textEl) textEl.textContent = 'Pause Focus Session';
      if (icon) icon.textContent = 'pause';
      btn.classList.add('opacity-95');
    } else if (state && state.isPaused) {
      if (textEl) textEl.textContent = 'Resume Focus Session';
      if (icon) icon.textContent = 'play_arrow';
      btn.classList.remove('opacity-95');
    } else {
      if (textEl) textEl.textContent = 'Start Focus Session';
      if (icon) icon.textContent = 'timer';
      btn.classList.remove('opacity-95');
    }
  }

  // ==========================================
  // 14. EVENT LISTENERS
  // ==========================================
  function initEventListeners() {
    // Calendar month navigation
    const prevBtn = document.getElementById('cal-prev-btn');
    const nextBtn = document.getElementById('cal-next-btn');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentCalDate.setMonth(currentCalDate.getMonth() - 1);
        renderCalendar();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentCalDate.setMonth(currentCalDate.getMonth() + 1);
        renderCalendar();
      });
    }

    // Task filter toggle
    const filterBtn = document.getElementById('btn-filter-tasks');
    if (filterBtn) {
      filterBtn.addEventListener('click', () => {
        taskFilterMode = taskFilterMode === 'all' ? 'active' : 'all';
        filterBtn.classList.toggle('text-primary', taskFilterMode === 'active');
        renderTasksSection();
        if (typeof showToast === 'function') {
          showToast(taskFilterMode === 'active' ? 'Showing incomplete tasks' : 'Showing all tasks', 'info');
        }
      });
    }

    // Timer button action
    const focusBtn = document.getElementById('start-focus-btn');
    if (focusBtn) {
      focusBtn.addEventListener('click', () => {
        if (typeof window !== 'undefined' && window.GlobalTimer) {
          const state = window.GlobalTimer.getState();
          if (state && state.isRunning) {
            window.GlobalTimer.pause();
            if (typeof showToast === 'function') showToast('Focus session paused', 'info');
          } else if (state && state.isPaused) {
            window.GlobalTimer.resume();
            if (typeof showToast === 'function') showToast('Focus session resumed', 'info');
          } else {
            window.GlobalTimer.start('work');
            if (typeof showToast === 'function') showToast('Focus session started! Let\'s build.', 'success');
          }
        } else {
          window.location.href = 'pages/timer.html';
        }
      });
    }

    // Command palette triggers
    initCommandPalette();
  }

  function initCommandPalette() {
    const cmdPalette = document.getElementById('command-palette');
    const cmdInput = document.getElementById('command-input');
    const searchTrigger = document.getElementById('search-trigger');

    function openPalette() {
      if (cmdPalette) {
        cmdPalette.classList.remove('hidden');
        setTimeout(() => cmdInput && cmdInput.focus(), 50);
      }
    }

    function closePalette() {
      if (cmdPalette) cmdPalette.classList.add('hidden');
    }

    if (searchTrigger) searchTrigger.addEventListener('click', openPalette);

    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        openPalette();
      }
      if (e.key === 'Escape' && cmdPalette && !cmdPalette.classList.contains('hidden')) {
        closePalette();
      }
    });

    if (cmdPalette) {
      cmdPalette.addEventListener('click', (e) => {
        if (e.target === cmdPalette) closePalette();
      });
    }
  }

  // ==========================================
  // 15. CROSS-PAGE REALTIME SYNCHRONIZATION
  // ==========================================
  function initCrossPageSync() {
    // 1. Cross-tab window storage event listener
    window.addEventListener('storage', (e) => {
      if (!e.key) return;
      if (
        e.key.includes('habits') ||
        e.key.includes('dsa') ||
        e.key.includes('dev_notes') ||
        e.key.includes('timer') ||
        e.key.includes('user_settings') ||
        e.key.includes('github')
      ) {
        syncAllCards();
      }
    });

    // 2. Realtime BroadcastChannel
    if (typeof BroadcastChannel !== 'undefined') {
      try {
        const channel = new BroadcastChannel('devpilot_habits_realtime');
        channel.onmessage = () => {
          syncAllCards();
        };
      } catch (err) {}
    }

    // 3. Tab focus / visibility change sync
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        const now = Date.now();
        if (now - lastSyncTimestamp > 2000) {
          lastSyncTimestamp = now;
          syncAllCards();
        }
      }
    });
  }

  function syncAllCards() {
    renderGreeting();
    renderStreak();
    renderMainGoal();
    renderContinueLearning();
    renderAISuggestion();
    renderLeetCodeAndNotesStats();
    renderRoadmapProgress();
    renderTasksSection();
    renderCalendar();
    renderRecentActivity();
    renderFooterProductivity();
  }

  // Utility
  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

})();
