/**
 * DevPilot-AI - Modern GitHub Analyzer Engine
 * Integrates live with the GitHub Public REST API
 */

// Global analysis state
let currentAnalysisData = null;
let currentRepos = [];
let activeLangFilter = 'All';
let activeSortOption = 'stars';
let activeSearchQuery = '';

// Predefined Language Color Registry
const LANGUAGE_COLORS = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  C: '#555555',
  'C++': '#f34b7d',
  'C#': '#178600',
  Go: '#00ADD8',
  Rust: '#dea584',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Vue: '#41b883',
  Shell: '#89e051',
  Dart: '#00B4AB',
  SCSS: '#c6538c'
};

document.addEventListener('DOMContentLoaded', () => {
  initAnalyzerControls();
  checkUrlParameters();
});

// Check if username was passed via query param (e.g. ?user=torvalds)
function checkUrlParameters() {
  const urlParams = new URLSearchParams(window.location.search);
  const userParam = urlParams.get('user') || urlParams.get('username');
  if (userParam) {
    const input = document.getElementById('github-username-input');
    if (input) input.value = userParam;
    analyzeGitHubUser(userParam);
  }
}

function initAnalyzerControls() {
  const analyzeBtn = document.getElementById('btn-analyze-github');
  const usernameInput = document.getElementById('github-username-input');
  const sampleChips = document.querySelectorAll('.sample-user-chip');
  const exportBtn = document.getElementById('btn-export-report');
  const exportJsonBtn = document.getElementById('btn-export-json');

  if (analyzeBtn && usernameInput) {
    analyzeBtn.addEventListener('click', () => {
      const username = usernameInput.value.trim();
      if (username) analyzeGitHubUser(username);
      else showToast('Please enter a valid GitHub username', 'error');
    });

    usernameInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const username = usernameInput.value.trim();
        if (username) analyzeGitHubUser(username);
      }
    });
  }

  sampleChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const username = chip.getAttribute('data-username');
      if (username) {
        if (usernameInput) usernameInput.value = username;
        analyzeGitHubUser(username);
      }
    });
  });

  if (exportBtn) exportBtn.addEventListener('click', exportReport);
  if (exportJsonBtn) exportJsonBtn.addEventListener('click', exportReport);

  // Repo Search & Filter Listeners
  const repoSearch = document.getElementById('repo-list-search');
  const repoSort = document.getElementById('repo-list-sort');
  const repoLangFilter = document.getElementById('repo-list-lang-filter');

  if (repoSearch) {
    repoSearch.addEventListener('input', (e) => {
      activeSearchQuery = e.target.value.toLowerCase().trim();
      applyRepoFiltersAndRender();
    });
  }

  if (repoSort) {
    repoSort.addEventListener('change', (e) => {
      activeSortOption = e.target.value;
      applyRepoFiltersAndRender();
    });
  }

  if (repoLangFilter) {
    repoLangFilter.addEventListener('change', (e) => {
      activeLangFilter = e.target.value;
      applyRepoFiltersAndRender();
    });
  }
}

// State display management
function showState(stateName) {
  const states = ['initial', 'loading', 'error', 'ratelimit', 'content'];
  states.forEach(s => {
    const el = document.getElementById(`state-${s}`);
    if (el) {
      if (s === stateName) el.classList.add('active');
      else el.classList.remove('active');
    }
  });
}

// Get Auth Headers (Check if user configured a GitHub token in Settings)
function getApiHeaders() {
  const headers = {
    'Accept': 'application/vnd.github.v3+json'
  };
  try {
    const userSettings = Storage.get('user_settings');
    if (userSettings && userSettings.apiKeys && userSettings.apiKeys.githubToken) {
      const token = userSettings.apiKeys.githubToken.trim();
      if (token && !token.includes('mock')) {
        headers['Authorization'] = `token ${token}`;
      }
    }
  } catch (e) {
    console.warn('Could not read personal token from storage', e);
  }
  return headers;
}

/**
 * Main Analysis Orchestration Function
 */
async function analyzeGitHubUser(username) {
  const cleanUsername = username.replace(/^@/, '').trim();
  if (!cleanUsername) return;

  // Set URL query param smoothly
  const newUrl = `${window.location.pathname}?user=${encodeURIComponent(cleanUsername)}`;
  window.history.replaceState({ path: newUrl }, '', newUrl);

  showState('loading');
  const analyzeBtn = document.getElementById('btn-analyze-github');
  if (analyzeBtn) {
    analyzeBtn.disabled = true;
    analyzeBtn.innerHTML = `
      <span class="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
      <span>Analyzing...</span>
    `;
  }

  try {
    // 1. Fetch User Details
    const user = await fetchGitHubUser(cleanUsername);

    // 2. Fetch Repositories
    const repos = await fetchRepositories(cleanUsername, user.public_repos);

    // 3. Fetch Recent Public Events
    const events = await fetchEvents(cleanUsername);

    // 4. Compute Metrics
    const stats = calculateStats(repos, user);
    const languages = calculateLanguages(repos);
    const score = calculateDeveloperScore(user, repos, events, stats);
    const insights = generateInsights(user, repos, stats, languages, score);
    const suggestions = generateSuggestions(user, repos, stats, languages);

    // 5. Store current analysis state
    currentAnalysisData = {
      user,
      repos,
      events,
      stats,
      languages,
      score,
      insights,
      suggestions,
      analyzedAt: new Date().toISOString()
    };
    currentRepos = [...repos];

    // 6. Render All Dashboard Sections
    renderProfile(user, stats);
    renderScore(score);
    renderStats(stats, user);
    renderLanguages(languages);
    renderRepoAnalytics(stats, repos);
    renderTopRepo(stats.topRepo);
    renderTimeline(stats.oldestRepo, stats.latestRepo);
    renderActivity(events);
    renderInsights(insights);
    renderSuggestions(suggestions);
    populateRepoLanguageDropdown(languages);
    applyRepoFiltersAndRender();

    showState('content');
    showToast(`Successfully analyzed @${user.login}`, 'success');
  } catch (err) {
    console.error('GitHub API Error:', err);
    if (err.status === 404) {
      showErrorState(`GitHub user "@${cleanUsername}" was not found. Please check the spelling.`);
    } else if (err.status === 403 && err.isRateLimit) {
      showRateLimitState(err.resetTime);
    } else {
      showErrorState(err.message || 'An unexpected error occurred while fetching GitHub data.');
    }
  } finally {
    if (analyzeBtn) {
      analyzeBtn.disabled = false;
      analyzeBtn.innerHTML = `
        <span class="material-symbols-outlined text-[18px]">search_insights</span>
        <span>Analyze</span>
      `;
    }
  }
}

function showErrorState(message) {
  const msgEl = document.getElementById('error-message-text');
  if (msgEl) msgEl.textContent = message;
  showState('error');
}

function showRateLimitState(resetTime) {
  const timeEl = document.getElementById('ratelimit-reset-time');
  if (timeEl && resetTime) {
    const minutesLeft = Math.max(1, Math.round((new Date(resetTime * 1000) - new Date()) / 60000));
    timeEl.textContent = `Limit resets in ~${minutesLeft} minutes.`;
  }
  showState('ratelimit');
}

// --------------------------------------------------------------------------
// API Fetching Functions
// --------------------------------------------------------------------------

async function fetchGitHubUser(username) {
  const res = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, {
    headers: getApiHeaders()
  });

  if (!res.ok) {
    const error = new Error(res.statusText);
    error.status = res.status;
    if (res.status === 403 && res.headers.get('x-ratelimit-remaining') === '0') {
      error.isRateLimit = true;
      error.resetTime = Number(res.headers.get('x-ratelimit-reset'));
    }
    throw error;
  }

  return await res.json();
}

async function fetchRepositories(username, totalPublicRepos = 100) {
  // GitHub returns up to 100 items per page
  const perPage = 100;
  const res = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=${perPage}&sort=updated`, {
    headers: getApiHeaders()
  });

  if (!res.ok) {
    const error = new Error(res.statusText);
    error.status = res.status;
    throw error;
  }

  return await res.json();
}

async function fetchEvents(username) {
  try {
    const res = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/events/public?per_page=30`, {
      headers: getApiHeaders()
    });

    if (!res.ok) return [];
    return await res.json();
  } catch (e) {
    console.warn('Events fetch failed:', e);
    return [];
  }
}

// --------------------------------------------------------------------------
// Calculation & Analytics Algorithms
// --------------------------------------------------------------------------

function calculateStats(repos, user) {
  let totalStars = 0;
  let totalForks = 0;
  let openIssues = 0;
  let originalReposCount = 0;
  let forkedReposCount = 0;
  let archivedReposCount = 0;
  let topRepo = null;
  let mostForkedRepo = null;
  let oldestRepo = null;
  let latestRepo = null;

  if (Array.isArray(repos) && repos.length > 0) {
    topRepo = repos[0];
    mostForkedRepo = repos[0];
    oldestRepo = repos[0];
    latestRepo = repos[0];

    repos.forEach(repo => {
      const stars = repo.stargazers_count || 0;
      const forks = repo.forks_count || 0;
      const issues = repo.open_issues_count || 0;

      totalStars += stars;
      totalForks += forks;
      openIssues += issues;

      if (repo.fork) forkedReposCount++;
      else originalReposCount++;

      if (repo.archived) archivedReposCount++;

      if (stars > (topRepo.stargazers_count || 0)) {
        topRepo = repo;
      }
      if (forks > (mostForkedRepo.forks_count || 0)) {
        mostForkedRepo = repo;
      }

      // Timeline comparison
      if (new Date(repo.created_at) < new Date(oldestRepo.created_at)) {
        oldestRepo = repo;
      }
      if (new Date(repo.updated_at) > new Date(latestRepo.updated_at)) {
        latestRepo = repo;
      }
    });
  }

  return {
    totalStars,
    totalForks,
    openIssues,
    totalRepos: user.public_repos || repos.length,
    originalReposCount,
    forkedReposCount,
    archivedReposCount,
    topRepo,
    mostForkedRepo,
    oldestRepo,
    latestRepo
  };
}

function calculateLanguages(repos) {
  const langMap = {};
  let totalWithLang = 0;

  repos.forEach(repo => {
    if (repo.language) {
      langMap[repo.language] = (langMap[repo.language] || 0) + 1;
      totalWithLang++;
    }
  });

  const sortedLangs = Object.keys(langMap).map(lang => {
    const count = langMap[lang];
    const percentage = totalWithLang > 0 ? Math.round((count / totalWithLang) * 100) : 0;
    return {
      name: lang,
      count,
      percentage,
      color: LANGUAGE_COLORS[lang] || '#64748b'
    };
  }).sort((a, b) => b.count - a.count);

  return {
    languages: sortedLangs,
    primaryLanguage: sortedLangs[0] ? sortedLangs[0].name : 'N/A',
    totalLanguages: sortedLangs.length
  };
}

function calculateDeveloperScore(user, repos, events, stats) {
  // 1. Repository Quality Score (Max 25 pts)
  // Evaluates original repo count, description presence, and stars
  const repoCount = repos.length;
  const descCount = repos.filter(r => r.description && r.description.trim().length > 10).length;
  const descRatio = repoCount > 0 ? (descCount / repoCount) : 0;
  const originalRatio = repoCount > 0 ? (stats.originalReposCount / repoCount) : 0;
  const repoScore = Math.min(25, Math.round(
    (Math.min(repoCount, 20) / 20 * 8) + 
    (descRatio * 9) + 
    (originalRatio * 8)
  ));

  // 2. Activity Score (Max 25 pts)
  // Evaluates recent events, push density, and update recency
  const recentEventsCount = events.length;
  const pushEventsCount = events.filter(e => e.type === 'PushEvent').length;
  const lastActive = stats.latestRepo ? (new Date() - new Date(stats.latestRepo.updated_at)) / (1000 * 60 * 60 * 24) : 999;
  const recencyBonus = lastActive < 7 ? 8 : lastActive < 30 ? 5 : 2;
  const activityScore = Math.min(25, Math.round(
    (Math.min(recentEventsCount, 30) / 30 * 9) +
    (Math.min(pushEventsCount, 15) / 15 * 8) +
    recencyBonus
  ));

  // 3. Community & Profile Score (Max 25 pts)
  // Followers, Bio, Location, Website, and Public Gists
  const followers = user.followers || 0;
  const profileCompleteness = (user.bio ? 3 : 0) + (user.location ? 2 : 0) + (user.blog ? 2 : 0) + (user.company ? 2 : 0);
  const communityScore = Math.min(25, Math.round(
    (Math.min(followers, 100) / 100 * 12) +
    (Math.min(user.public_gists || 0, 10) / 10 * 4) +
    profileCompleteness
  ));

  // 4. Popularity & Reach Score (Max 25 pts)
  // Total Stars & Total Forks
  const stars = stats.totalStars;
  const forks = stats.totalForks;
  const popularityScore = Math.min(25, Math.round(
    (Math.min(stars, 150) / 150 * 15) +
    (Math.min(forks, 50) / 50 * 10)
  ));

  const totalScore = Math.min(100, repoScore + activityScore + communityScore + popularityScore);

  let rankTier = 'Novice Developer';
  if (totalScore >= 90) rankTier = 'Elite Architect';
  else if (totalScore >= 75) rankTier = 'Senior Contributor';
  else if (totalScore >= 60) rankTier = 'Proficient Developer';
  else if (totalScore >= 40) rankTier = 'Active Builder';

  return {
    totalScore,
    rankTier,
    repoScore: Math.round((repoScore / 25) * 100),
    activityScore: Math.round((activityScore / 25) * 100),
    communityScore: Math.round((communityScore / 25) * 100),
    popularityScore: Math.round((popularityScore / 25) * 100)
  };
}

function generateInsights(user, repos, stats, languages, score) {
  const insights = [];

  // Primary language insight
  if (languages.primaryLanguage !== 'N/A') {
    insights.push({
      icon: 'code',
      title: 'Strongest Tech Stack',
      text: `Your most prominent language is **${languages.primaryLanguage}**, featured in **${languages.languages[0].percentage}%** of your active repositories.`
    });
  }

  // Repository catalog insight
  insights.push({
    icon: 'inventory_2',
    title: 'Repository Architecture',
    text: `You maintain **${user.public_repos} public repositories** (${stats.originalReposCount} original, ${stats.forkedReposCount} forks).`
  });

  // Star traction insight
  if (stats.totalStars > 0) {
    insights.push({
      icon: 'star',
      title: 'Community Traction',
      text: `Your open-source work has earned **${stats.totalStars} total stars** and **${stats.totalForks} forks**, led by **${stats.topRepo ? stats.topRepo.name : 'your top project'}**.`
    });
  } else {
    insights.push({
      icon: 'rocket_launch',
      title: 'Open Source Growth',
      text: `Consider creating comprehensive README guides and social previews to attract community stars and contributors.`
    });
  }

  // Activity insights
  if (score.activityScore >= 70) {
    insights.push({
      icon: 'local_fire_department',
      title: 'High Commit Frequency',
      text: `Your recent push stream indicates consistent development momentum. Keep the streak going!`
    });
  } else {
    insights.push({
      icon: 'calendar_month',
      title: 'Consistency Opportunity',
      text: `Establishing a daily or weekly commit cadence will significantly boost your profile activity score.`
    });
  }

  return insights;
}

function generateSuggestions(user, repos, stats, languages) {
  const suggestions = [];

  // 1. Profile Optimization
  const hasBio = !!user.bio;
  const hasLink = !!user.blog;
  const hasLocation = !!user.location;
  if (!hasBio || !hasLink || !hasLocation) {
    suggestions.push({
      category: '📌 Profile Optimization',
      status: 'Incomplete Details',
      suggestion: 'Complete your profile bio, custom portfolio link, and location to increase recruiter discoverability.',
      priority: 'High',
      priorityClass: 'priority-high'
    });
  } else {
    suggestions.push({
      category: '📌 Profile Optimization',
      status: 'Well Structured',
      suggestion: 'Consider adding a personalized GitHub Profile README (`' + user.login + '/' + user.login + '`) with dynamic stats.',
      priority: 'Low',
      priorityClass: 'priority-low'
    });
  }

  // 2. Repository Quality
  const missingDesc = repos.filter(r => !r.description || r.description.trim().length === 0).length;
  if (missingDesc > 0) {
    suggestions.push({
      category: '📚 Repository Quality',
      status: `${missingDesc} Repos Missing Description`,
      suggestion: `Add clear 1-sentence descriptions and topic tags to all ${missingDesc} uncommented repositories.`,
      priority: 'High',
      priorityClass: 'priority-high'
    });
  } else {
    suggestions.push({
      category: '📚 Repository Quality',
      status: 'Clean Descriptions',
      suggestion: 'All repositories have descriptions. Add custom social preview cards in repo settings.',
      priority: 'Low',
      priorityClass: 'priority-low'
    });
  }

  // 3. Documentation
  suggestions.push({
    category: '📝 Documentation',
    status: 'Standard Docs',
    suggestion: 'Include architecture diagrams, live demo URLs, and MIT/Apache license files in your flagship repos.',
    priority: 'Medium',
    priorityClass: 'priority-medium'
  });

  // 4. Open Source
  if (stats.forkedReposCount > stats.originalReposCount) {
    suggestions.push({
      category: '🚀 Open Source',
      status: 'High Fork Ratio',
      suggestion: 'Build more standalone, original full-stack or algorithm repositories to showcase individual ownership.',
      priority: 'Medium',
      priorityClass: 'priority-medium'
    });
  } else {
    suggestions.push({
      category: '🚀 Open Source',
      status: 'High Original Output',
      suggestion: 'Publish npm packages or template boilerplates to drive higher cross-ecosystem adoption.',
      priority: 'Low',
      priorityClass: 'priority-low'
    });
  }

  // 5. Consistency
  suggestions.push({
    category: '🔥 Consistency',
    status: 'Steady Pulse',
    suggestion: 'Aim for at least 3-4 structured commits per week to maintain active green contribution streaks.',
    priority: 'Medium',
    priorityClass: 'priority-medium'
  });

  return suggestions;
}

// --------------------------------------------------------------------------
// UI Rendering Functions
// --------------------------------------------------------------------------

function renderProfile(user, stats) {
  // Basic info
  setSrc('user-avatar', user.avatar_url);
  setText('user-name', user.name || user.login);
  setText('user-login', `@${user.login}`);
  setText('user-bio', user.bio || 'Software Developer building modern applications.');
  
  // Profile button link
  const linkBtn = document.getElementById('user-github-link');
  if (linkBtn) linkBtn.href = user.html_url;

  // Metadata tags
  const locationEl = document.getElementById('user-location');
  const companyEl = document.getElementById('user-company');
  const blogEl = document.getElementById('user-blog');
  const joinedEl = document.getElementById('user-joined');

  if (locationEl) {
    locationEl.textContent = user.location || 'Remote';
    locationEl.parentElement.style.display = user.location ? 'flex' : 'none';
  }
  if (companyEl) {
    companyEl.textContent = user.company || '';
    companyEl.parentElement.style.display = user.company ? 'flex' : 'none';
  }
  if (blogEl) {
    let blog = user.blog || '';
    if (blog && !blog.startsWith('http')) blog = `https://${blog}`;
    blogEl.textContent = user.blog ? user.blog.replace(/^https?:\/\//, '') : '';
    blogEl.href = blog;
    blogEl.parentElement.style.display = user.blog ? 'flex' : 'none';
  }
  if (joinedEl) {
    const joinDate = new Date(user.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    joinedEl.textContent = `Joined ${joinDate}`;
  }

  // Profile Stats
  setText('user-stat-repos', user.public_repos);
  setText('user-stat-followers', user.followers);
  setText('user-stat-following', user.following);
  setText('user-stat-gists', user.public_gists);
}

function renderScore(score) {
  setText('score-overall-number', score.totalScore);
  setText('score-rank-tier', score.rankTier);

  // SVG Circular progress offset
  const circleProgress = document.getElementById('score-circle-progress');
  if (circleProgress) {
    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    circleProgress.style.strokeDasharray = `${circumference} ${circumference}`;
    const offset = circumference - (score.totalScore / 100 * circumference);
    circleProgress.style.strokeDashoffset = offset;
  }

  // Sub-scores
  setText('subscore-repo-text', `${score.repoScore}%`);
  setWidth('subscore-repo-bar', `${score.repoScore}%`);

  setText('subscore-activity-text', `${score.activityScore}%`);
  setWidth('subscore-activity-bar', `${score.activityScore}%`);

  setText('subscore-community-text', `${score.communityScore}%`);
  setWidth('subscore-community-bar', `${score.communityScore}%`);

  setText('subscore-popularity-text', `${score.popularityScore}%`);
  setWidth('subscore-popularity-bar', `${score.popularityScore}%`);
}

function renderStats(stats, user) {
  setText('card-stat-stars', stats.totalStars);
  setText('card-stat-forks', stats.totalForks);
  setText('card-stat-repos', stats.totalRepos);
  setText('card-stat-followers', user.followers);
}

function renderLanguages(languages) {
  const container = document.getElementById('languages-list-container');
  const barContainer = document.getElementById('languages-bar-container');
  if (!container) return;

  if (languages.languages.length === 0) {
    container.innerHTML = `<p class="text-xs text-slate-400">No primary languages detected.</p>`;
    if (barContainer) barContainer.innerHTML = '';
    return;
  }

  // Render Horizontal segmented bar
  if (barContainer) {
    barContainer.innerHTML = languages.languages.map(l => `
      <div class="lang-progress-segment" style="width: ${l.percentage}%; background-color: ${l.color};" title="${l.name}: ${l.percentage}%"></div>
    `).join('');
  }

  // Render Language List Rows
  container.innerHTML = languages.languages.map(l => `
    <div class="flex items-center justify-between py-1.5 border-b border-slate-100 last:border-none">
      <div class="flex items-center gap-2">
        <span class="repo-lang-dot" style="background-color: ${l.color};"></span>
        <span class="text-sm font-semibold text-slate-800">${escapeHtml(l.name)}</span>
      </div>
      <div class="flex items-center gap-3">
        <span class="text-xs text-slate-400">${l.count} ${l.count === 1 ? 'repo' : 'repos'}</span>
        <span class="text-xs font-bold text-slate-900 w-10 text-right">${l.percentage}%</span>
      </div>
    </div>
  `).join('');
}

function renderRepoAnalytics(stats, repos) {
  setText('repo-stat-total', stats.totalRepos);
  setText('repo-stat-original', stats.originalReposCount);
  setText('repo-stat-forked', stats.forkedReposCount);
  setText('repo-stat-archived', stats.archivedReposCount);
  setText('repo-stat-most-starred', stats.topRepo ? stats.topRepo.name : 'N/A');
  setText('repo-stat-most-forked', stats.mostForkedRepo ? stats.mostForkedRepo.name : 'N/A');
}

function renderTopRepo(topRepo) {
  const container = document.getElementById('top-repo-highlight-container');
  if (!container) return;

  if (!topRepo) {
    container.innerHTML = `<p class="text-xs text-slate-400">No public repositories available.</p>`;
    return;
  }

  const langColor = topRepo.language ? (LANGUAGE_COLORS[topRepo.language] || '#64748b') : '#64748b';
  const createdDate = new Date(topRepo.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const updatedDate = timeAgo(topRepo.updated_at);

  container.innerHTML = `
    <div class="dev-card top-repo-card p-5 sm:p-6 min-w-0">
      <div class="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-indigo-600 text-[20px]">star</span>
          <span class="badge badge-primary text-xs font-bold">Featured Top Project</span>
        </div>
        <a href="${topRepo.html_url}" target="_blank" class="btn-secondary text-xs py-1.5 px-3.5 flex items-center gap-1.5 shrink-0">
          <span class="material-symbols-outlined text-[15px]">open_in_new</span>
          <span>View on GitHub</span>
        </a>
      </div>

      <h3 class="text-lg sm:text-xl font-bold text-slate-900 hover:text-indigo-600 transition-colors break-words-anywhere">
        <a href="${topRepo.html_url}" target="_blank">${escapeHtml(topRepo.name)}</a>
      </h3>

      <p class="text-xs sm:text-sm text-slate-600 mt-2 mb-4 leading-relaxed break-words-anywhere">
        ${escapeHtml(topRepo.description || 'No description provided for this repository.')}
      </p>

      <div class="flex flex-wrap items-center justify-between gap-3 pt-3.5 border-t border-indigo-100/80 text-xs text-slate-600">
        <div class="flex flex-wrap items-center gap-3 sm:gap-4">
          ${topRepo.language ? `
            <span class="flex items-center gap-1.5 font-semibold text-slate-800 shrink-0">
              <span class="repo-lang-dot" style="background-color: ${langColor};"></span>
              ${escapeHtml(topRepo.language)}
            </span>
          ` : ''}
          <span class="flex items-center gap-1 shrink-0">
            <span class="material-symbols-outlined text-[16px] text-amber-500">star</span>
            <strong>${topRepo.stargazers_count}</strong> stars
          </span>
          <span class="flex items-center gap-1 shrink-0">
            <span class="material-symbols-outlined text-[16px] text-purple-600">fork_right</span>
            <strong>${topRepo.forks_count}</strong> forks
          </span>
          <span class="flex items-center gap-1 shrink-0">
            <span class="material-symbols-outlined text-[16px] text-slate-500">adjust</span>
            <strong>${topRepo.open_issues_count}</strong> issues
          </span>
        </div>

        <div class="flex flex-wrap items-center gap-2 sm:gap-3 text-slate-400 text-[11px] sm:text-xs">
          <span>Created ${createdDate}</span>
          <span>•</span>
          <span>Updated ${updatedDate}</span>
        </div>
      </div>
    </div>
  `;
}

function renderTimeline(oldestRepo, latestRepo) {
  const container = document.getElementById('repo-timeline-container');
  if (!container) return;

  if (!oldestRepo || !latestRepo) {
    container.innerHTML = `<p class="text-xs text-slate-400">Timeline data not available.</p>`;
    return;
  }

  const oldestDate = new Date(oldestRepo.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  const latestDate = new Date(latestRepo.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  container.innerHTML = `
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div class="p-4 bg-slate-50 border border-slate-200 rounded-xl min-w-0 flex flex-col justify-between">
        <div>
          <div class="flex items-center gap-2 text-indigo-600 mb-1.5">
            <span class="material-symbols-outlined text-[18px]">history_edu</span>
            <span class="text-[11px] font-bold uppercase tracking-wider">Oldest Repository</span>
          </div>
          <h4 class="font-bold text-sm text-slate-900 truncate">
            <a href="${oldestRepo.html_url}" target="_blank" class="hover:text-indigo-600" title="${escapeHtml(oldestRepo.name)}">${escapeHtml(oldestRepo.name)}</a>
          </h4>
        </div>
        <p class="text-xs text-slate-500 mt-2">Created: <strong class="text-slate-700">${oldestDate}</strong></p>
      </div>

      <div class="p-4 bg-slate-50 border border-slate-200 rounded-xl min-w-0 flex flex-col justify-between">
        <div>
          <div class="flex items-center gap-2 text-emerald-600 mb-1.5">
            <span class="material-symbols-outlined text-[18px]">update</span>
            <span class="text-[11px] font-bold uppercase tracking-wider">Latest Activity</span>
          </div>
          <h4 class="font-bold text-sm text-slate-900 truncate">
            <a href="${latestRepo.html_url}" target="_blank" class="hover:text-emerald-600" title="${escapeHtml(latestRepo.name)}">${escapeHtml(latestRepo.name)}</a>
          </h4>
        </div>
        <p class="text-xs text-slate-500 mt-2">Updated: <strong class="text-slate-700">${latestDate}</strong></p>
      </div>
    </div>
  `;
}

function renderActivity(events) {
  const container = document.getElementById('recent-activity-container');
  if (!container) return;

  if (!Array.isArray(events) || events.length === 0) {
    container.innerHTML = `
      <div class="text-center py-8 text-slate-400">
        <span class="material-symbols-outlined text-3xl mb-1">schedule</span>
        <p class="text-xs">No recent public events found for this account.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = events.slice(0, 10).map(e => {
    const parsed = parseGitHubEvent(e);
    return `
      <div class="timeline-item">
        <div class="timeline-dot">
          <span class="material-symbols-outlined text-[12px] text-indigo-600">${parsed.icon}</span>
        </div>
        <div class="dev-card p-3.5 min-w-0">
          <div class="flex flex-wrap items-center justify-between gap-2 mb-1">
            <div class="flex items-center gap-2 min-w-0 flex-1">
              <span class="event-badge ${parsed.badgeClass}">${parsed.label}</span>
              <a href="https://github.com/${e.repo.name}" target="_blank" class="text-xs font-bold text-slate-900 hover:text-indigo-600 truncate max-w-[200px]" title="${e.repo.name}">
                ${e.repo.name}
              </a>
            </div>
            <span class="text-[11px] text-slate-400 shrink-0">${timeAgo(e.created_at)}</span>
          </div>
          <p class="text-xs text-slate-600 leading-relaxed break-words-anywhere">${escapeHtml(parsed.description)}</p>
        </div>
      </div>
    `;
  }).join('');
}

function parseGitHubEvent(e) {
  switch (e.type) {
    case 'PushEvent': {
      const count = e.payload.commits ? e.payload.commits.length : 1;
      const msg = e.payload.commits && e.payload.commits[0] ? e.payload.commits[0].message : 'Pushed commits';
      return {
        label: 'Push',
        badgeClass: 'event-push',
        icon: 'commit',
        description: `Pushed ${count} ${count === 1 ? 'commit' : 'commits'}: "${msg.slice(0, 70)}"`
      };
    }
    case 'PullRequestEvent':
      return {
        label: 'Pull Request',
        badgeClass: 'event-pr',
        icon: 'call_merge',
        description: `${capitalize(e.payload.action || 'opened')} pull request #${e.payload.number || ''}`
      };
    case 'IssuesEvent':
      return {
        label: 'Issue',
        badgeClass: 'event-issue',
        icon: 'adjust',
        description: `${capitalize(e.payload.action || 'opened')} issue #${e.payload.issue ? e.payload.issue.number : ''}`
      };
    case 'WatchEvent':
      return {
        label: 'Starred',
        badgeClass: 'event-star',
        icon: 'star',
        description: `Starred repository ${e.repo.name}`
      };
    case 'ForkEvent':
      return {
        label: 'Fork',
        badgeClass: 'event-fork',
        icon: 'fork_right',
        description: `Forked repository to ${e.payload.forkee ? e.payload.forkee.full_name : ''}`
      };
    case 'CreateEvent':
      return {
        label: 'Create',
        badgeClass: 'event-create',
        icon: 'add_circle',
        description: `Created ${e.payload.ref_type || 'repository'} ${e.payload.ref || ''}`
      };
    default:
      return {
        label: e.type.replace('Event', ''),
        badgeClass: 'event-default',
        icon: 'bolt',
        description: `Activity recorded on ${e.repo.name}`
      };
  }
}

function renderInsights(insights) {
  const container = document.getElementById('ai-insights-container');
  if (!container) return;

  container.innerHTML = insights.map(i => `
    <div class="dev-card p-4 flex items-start gap-3.5 border-l-4 border-l-indigo-600 min-w-0">
      <div class="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
        <span class="material-symbols-outlined text-[18px]">${i.icon}</span>
      </div>
      <div class="min-w-0 flex-1">
        <h4 class="text-sm font-bold text-slate-900 mb-0.5 truncate">${escapeHtml(i.title)}</h4>
        <p class="text-xs text-slate-600 leading-relaxed break-words-anywhere">${formatMarkdown(i.text)}</p>
      </div>
    </div>
  `).join('');
}

function renderSuggestions(suggestions) {
  const container = document.getElementById('suggestions-container');
  if (!container) return;

  container.innerHTML = suggestions.map(s => `
    <div class="dev-card p-4 min-w-0 flex flex-col justify-between">
      <div>
        <div class="flex flex-wrap items-center justify-between gap-1.5 mb-2">
          <span class="text-xs font-bold text-slate-900">${escapeHtml(s.category)}</span>
          <span class="badge ${s.priorityClass} text-[10px] shrink-0">${s.priority} Priority</span>
        </div>
        <p class="text-xs font-semibold text-slate-700 mb-1">Status: <span class="text-slate-500 font-normal">${escapeHtml(s.status)}</span></p>
        <p class="text-xs text-slate-600 leading-relaxed break-words-anywhere">${escapeHtml(s.suggestion)}</p>
      </div>
    </div>
  `).join('');
}

// --------------------------------------------------------------------------
// Repositories List Filter, Search & Sort
// --------------------------------------------------------------------------

function populateRepoLanguageDropdown(languages) {
  const select = document.getElementById('repo-list-lang-filter');
  if (!select) return;

  select.innerHTML = `<option value="All">All Languages</option>` + languages.languages.map(l => `
    <option value="${escapeHtml(l.name)}">${escapeHtml(l.name)} (${l.count})</option>
  `).join('');
}

function applyRepoFiltersAndRender() {
  const container = document.getElementById('repos-list-grid');
  if (!container) return;

  let filtered = currentRepos.filter(r => {
    // Language filter
    if (activeLangFilter !== 'All' && r.language !== activeLangFilter) {
      return false;
    }
    // Search query filter
    if (activeSearchQuery) {
      const matchName = r.name.toLowerCase().includes(activeSearchQuery);
      const matchDesc = r.description && r.description.toLowerCase().includes(activeSearchQuery);
      const matchLang = r.language && r.language.toLowerCase().includes(activeSearchQuery);
      if (!matchName && !matchDesc && !matchLang) return false;
    }
    return true;
  });

  // Sort
  filtered.sort((a, b) => {
    switch (activeSortOption) {
      case 'stars':
        return (b.stargazers_count || 0) - (a.stargazers_count || 0);
      case 'forks':
        return (b.forks_count || 0) - (a.forks_count || 0);
      case 'updated':
        return new Date(b.updated_at) - new Date(a.updated_at);
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const countEl = document.getElementById('repos-filtered-count');
  if (countEl) countEl.textContent = `Showing ${filtered.length} of ${currentRepos.length} repositories`;

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full dev-card text-center py-10">
        <span class="material-symbols-outlined text-4xl text-slate-300 mb-2">folder_off</span>
        <h4 class="font-bold text-base text-slate-800">No matching repositories</h4>
        <p class="text-xs text-slate-500 mt-1">Try tweaking your search term or language filter.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(repo => {
    const langColor = repo.language ? (LANGUAGE_COLORS[repo.language] || '#64748b') : '#64748b';
    return `
      <div class="dev-card repo-card min-w-0">
        <div class="min-w-0">
          <div class="flex items-start justify-between gap-2 mb-2 min-w-0">
            <div class="flex items-center gap-1.5 min-w-0 flex-1">
              <span class="material-symbols-outlined text-indigo-600 text-[18px] shrink-0">folder</span>
              <a href="${repo.html_url}" target="_blank" class="font-bold text-sm text-slate-900 hover:text-indigo-600 transition-colors truncate min-w-0" title="${escapeHtml(repo.name)}">
                ${escapeHtml(repo.name)}
              </a>
            </div>
            <div class="flex items-center gap-1 shrink-0">
              ${repo.fork ? `<span class="badge badge-warning text-[10px]">Fork</span>` : ''}
              ${repo.archived ? `<span class="badge badge-neutral text-[10px]">Archived</span>` : ''}
            </div>
          </div>
          <p class="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed break-words-anywhere">
            ${escapeHtml(repo.description || 'No description provided.')}
          </p>
        </div>

        <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 min-w-0">
          <div class="flex items-center gap-1.5 min-w-0 truncate">
            ${repo.language ? `
              <span class="repo-lang-dot" style="background-color: ${langColor};"></span>
              <span class="font-medium text-slate-700 truncate">${escapeHtml(repo.language)}</span>
            ` : `<span class="text-slate-400">Plain</span>`}
          </div>

          <div class="flex items-center gap-3 shrink-0">
            <span class="flex items-center gap-0.5" title="Stars">
              <span class="material-symbols-outlined text-[14px] text-amber-500">star</span>
              ${repo.stargazers_count}
            </span>
            <span class="flex items-center gap-0.5" title="Forks">
              <span class="material-symbols-outlined text-[14px]">fork_right</span>
              ${repo.forks_count}
            </span>
            <a href="${repo.html_url}" target="_blank" class="text-indigo-600 hover:text-indigo-800 p-0.5" title="Open on GitHub">
              <span class="material-symbols-outlined text-[16px]">open_in_new</span>
            </a>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// --------------------------------------------------------------------------
// Report Export (JSON download)
// --------------------------------------------------------------------------

function exportReport() {
  if (!currentAnalysisData) {
    showToast('Please analyze a GitHub user first!', 'error');
    return;
  }

  const exportPayload = {
    generator: 'DevPilot-AI GitHub Analyzer',
    generatedAt: new Date().toISOString(),
    profile: {
      username: currentAnalysisData.user.login,
      name: currentAnalysisData.user.name,
      bio: currentAnalysisData.user.bio,
      location: currentAnalysisData.user.location,
      company: currentAnalysisData.user.company,
      blog: currentAnalysisData.user.blog,
      publicRepos: currentAnalysisData.user.public_repos,
      followers: currentAnalysisData.user.followers,
      following: currentAnalysisData.user.following
    },
    developerScore: currentAnalysisData.score,
    statistics: {
      totalStars: currentAnalysisData.stats.totalStars,
      totalForks: currentAnalysisData.stats.totalForks,
      openIssues: currentAnalysisData.stats.openIssues,
      originalRepos: currentAnalysisData.stats.originalReposCount,
      forkedRepos: currentAnalysisData.stats.forkedReposCount,
      archivedRepos: currentAnalysisData.stats.archivedReposCount
    },
    topLanguages: currentAnalysisData.languages.languages,
    topRepository: currentAnalysisData.stats.topRepo ? {
      name: currentAnalysisData.stats.topRepo.name,
      url: currentAnalysisData.stats.topRepo.html_url,
      stars: currentAnalysisData.stats.topRepo.stargazers_count,
      forks: currentAnalysisData.stats.topRepo.forks_count,
      language: currentAnalysisData.stats.topRepo.language
    } : null,
    aiInsights: currentAnalysisData.insights,
    suggestions: currentAnalysisData.suggestions
  };

  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportPayload, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `github-analysis-${currentAnalysisData.user.login}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();

  showToast(`Exported analysis report for @${currentAnalysisData.user.login}`, 'success');
}

// --------------------------------------------------------------------------
// Helper Utilities
// --------------------------------------------------------------------------

function setText(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val !== undefined && val !== null ? val : '';
}

function setSrc(id, url) {
  const el = document.getElementById(id);
  if (el && url) el.src = url;
}

function setWidth(id, widthVal) {
  const el = document.getElementById(id);
  if (el) el.style.width = widthVal;
}

function capitalize(s) {
  if (!s) return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function formatMarkdown(text) {
  if (!text) return '';
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>');
}
