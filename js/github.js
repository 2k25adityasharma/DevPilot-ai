/**
 * DevPilot-AI - Modern GitHub Analyzer Engine (v2.0)
 * Upgraded 100-Point Transparent Scoring Engine with Real GitHub REST API Integration
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

// Check if username was passed via query param (e.g. ?user=2k25adityasharma)
function checkUrlParameters() {
  const urlParams = new URLSearchParams(window.location.search);
  const userParam = urlParams.get('user') || urlParams.get('username');
  const input = document.getElementById('github-username-input');
  if (userParam) {
    if (input) input.value = userParam;
    analyzeGitHubUser(userParam);
  } else {
    if (input) input.value = '';
  }
}

function initAnalyzerControls() {
  const analyzeBtn = document.getElementById('btn-analyze-github');
  const usernameInput = document.getElementById('github-username-input');
  const sampleChips = document.querySelectorAll('.sample-user-chip');
  const exportBtn = document.getElementById('btn-export-report');
  const exportJsonBtn = document.getElementById('btn-export-json');
  const copyReportBtn = document.getElementById('btn-copy-report');

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

  if (exportBtn) exportBtn.addEventListener('click', exportTextReport);
  if (exportJsonBtn) exportJsonBtn.addEventListener('click', exportJsonReport);
  if (copyReportBtn) copyReportBtn.addEventListener('click', copyReportToClipboard);

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

// Get Auth Headers (Optional personal token from Settings for higher rate limits)
function getApiHeaders() {
  const headers = {
    'Accept': 'application/vnd.github.v3+json'
  };
  try {
    if (typeof Storage !== 'undefined' && Storage.get) {
      const userSettings = Storage.get('user_settings');
      if (userSettings && userSettings.apiKeys && userSettings.apiKeys.githubToken) {
        const token = userSettings.apiKeys.githubToken.trim();
        if (token && !token.includes('mock')) {
          headers['Authorization'] = `token ${token}`;
        }
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

    // 2. Fetch Repositories with pagination support
    const repos = await fetchRepositories(cleanUsername, user.public_repos);

    // 3. Fetch Recent Public Events
    const events = await fetchEvents(cleanUsername);

    // 4. Compute Metrics
    const stats = calculateStats(repos, user);
    const languages = calculateLanguages(repos);
    const topRepos = rankRepositories(repos);
    const score = calculateDeveloperScore(user, repos, events, stats, languages, topRepos);
    const insights = generateInsights(user, repos, stats, languages, score, topRepos);
    const suggestions = generateSuggestions(user, repos, stats, languages, score, topRepos);

    // 5. Store current analysis state
    currentAnalysisData = {
      user,
      repos,
      events,
      stats,
      languages,
      topRepos,
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
    renderTopRepositories(topRepos);
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
  const perPage = 100;
  const maxPages = Math.min(3, Math.ceil((totalPublicRepos || 100) / perPage));
  let allRepos = [];

  for (let page = 1; page <= maxPages; page++) {
    try {
      const res = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=${perPage}&page=${page}&sort=updated`, {
        headers: getApiHeaders()
      });

      if (!res.ok) {
        if (page === 1) {
          const error = new Error(res.statusText);
          error.status = res.status;
          throw error;
        }
        break;
      }

      const repos = await res.json();
      if (!Array.isArray(repos) || repos.length === 0) break;
      allRepos = allRepos.concat(repos);
      if (repos.length < perPage) break;
    } catch (err) {
      if (page === 1) throw err;
      break;
    }
  }

  return allRepos;
}

async function fetchEvents(username) {
  try {
    const res = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/events/public?per_page=100`, {
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
    totalLanguages: sortedLangs.length,
    totalWithLang
  };
}

/**
 * Score individual repository based on quality factors (0 to 15 points)
 */
function calculateSingleRepoScore(repo) {
  let score = 0;
  
  // 1. Description quality (+3 pts)
  if (repo.description && repo.description.trim().length >= 10) {
    score += 3;
  } else if (repo.description && repo.description.trim().length > 0) {
    score += 1.5;
  }

  // 2. Live Demo Deployment URL (+3 pts)
  if (repo.homepage && repo.homepage.trim().length > 0 && repo.homepage.startsWith('http')) {
    score += 3;
  }

  // 3. Code substance / Size (+3 pts)
  if (repo.size > 500) score += 3;
  else if (repo.size > 50) score += 2;
  else if (repo.size > 0) score += 1;

  // 4. Recency of updates (+2 pts)
  const daysSinceUpdate = repo.updated_at ? (new Date() - new Date(repo.updated_at)) / (1000 * 60 * 60 * 24) : 999;
  if (daysSinceUpdate < 90) score += 2;
  else if (daysSinceUpdate < 180) score += 1;

  // 5. Stars & Forks (+3 pts)
  const stars = repo.stargazers_count || 0;
  const forks = repo.forks_count || 0;
  if (stars >= 10 || forks >= 5) score += 3;
  else if (stars >= 1 || forks >= 1) score += 1.5;

  // 6. Topics & Tags (+1 pt)
  if (Array.isArray(repo.topics) && repo.topics.length > 0) {
    score += 1;
  }

  return Math.min(15, Math.round(score));
}

/**
 * Rank repositories using transparent quality formula
 */
function rankRepositories(repos) {
  if (!Array.isArray(repos) || repos.length === 0) return [];
  
  const scored = repos.map(repo => ({
    ...repo,
    projectScore: calculateSingleRepoScore(repo)
  }));

  // Sort descending by projectScore, then stargazers_count, then updated_at
  return scored.sort((a, b) => {
    if (b.projectScore !== a.projectScore) return b.projectScore - a.projectScore;
    if ((b.stargazers_count || 0) !== (a.stargazers_count || 0)) return (b.stargazers_count || 0) - (a.stargazers_count || 0);
    return new Date(b.updated_at) - new Date(a.updated_at);
  });
}

// --------------------------------------------------------------------------
// 100-Point Modular Scoring Engine (v2.0)
// --------------------------------------------------------------------------

/**
 * 1. Profile Quality (10 points max)
 */
function calculateProfileScore(user, repos) {
  let score = 0;
  const reasons = [];

  // Name (2 pts)
  if (user.name && user.name.trim().length > 0) {
    score += 2;
    reasons.push('Full name provided (+2)');
  } else {
    reasons.push('Name missing (0/2)');
  }

  // Bio (2 pts)
  if (user.bio && user.bio.trim().length > 0) {
    score += 2;
    reasons.push('Bio provided (+2)');
  } else {
    reasons.push('Bio missing (0/2)');
  }

  // Location (1 pt)
  if (user.location && user.location.trim().length > 0) {
    score += 1;
    reasons.push('Location listed (+1)');
  } else {
    reasons.push('Location missing (0/1)');
  }

  // Portfolio / Blog (2 pts)
  if (user.blog && user.blog.trim().length > 0) {
    score += 2;
    reasons.push('Portfolio/website linked (+2)');
  } else {
    reasons.push('Portfolio link missing (0/2)');
  }

  // Profile Completeness (up to 3 pts)
  let completeness = 0;
  if (user.avatar_url && !user.avatar_url.includes('identicons')) completeness += 1;
  if (user.company || user.twitter_username || user.hireable) completeness += 1;
  if (user.public_repos >= 3) completeness += 1;

  score += completeness;
  reasons.push(`Account completeness signals (+${completeness}/3)`);

  const finalScore = Math.min(10, Math.max(0, Math.round(score)));
  return {
    score: finalScore,
    max: 10,
    label: 'Profile Quality',
    why: reasons.join(' • ')
  };
}

/**
 * 2. Repository Quality (25 points max)
 */
function calculateRepositoryScore(repos, stats) {
  if (!Array.isArray(repos) || repos.length === 0) {
    return {
      score: 0,
      max: 25,
      label: 'Repository Quality',
      why: 'No public repositories found on this account.'
    };
  }

  const total = repos.length;
  const withDesc = repos.filter(r => r.description && r.description.trim().length >= 10).length;
  const withDemo = repos.filter(r => r.homepage && r.homepage.trim().length > 0 && r.homepage.startsWith('http')).length;
  const withSubstance = repos.filter(r => (r.size || 0) > 10).length;
  const recentUpdates = repos.filter(r => {
    const months = (new Date() - new Date(r.updated_at)) / (1000 * 60 * 60 * 24 * 30);
    return months <= 6;
  }).length;

  const descRatio = withDesc / total;
  const demoRatio = withDemo / total;
  const originalRatio = stats.originalReposCount / total;
  const substanceRatio = withSubstance / total;
  const recentRatio = recentUpdates / total;

  // Weighted calculation (max 25)
  const descPts = descRatio * 7;                     // up to 7 pts
  const demoPts = Math.min(5, demoRatio * 10);       // up to 5 pts
  const originalPts = originalRatio * 4;             // up to 4 pts
  const substancePts = substanceRatio * 4;           // up to 4 pts
  const recentPts = recentRatio * 5;                 // up to 5 pts

  const finalScore = Math.min(25, Math.max(0, Math.round(descPts + demoPts + originalPts + substancePts + recentPts)));

  return {
    score: finalScore,
    max: 25,
    label: 'Repository Quality',
    why: `${total} public repositories (${stats.originalReposCount} original). ${withDesc}/${total} have descriptions (${Math.round(descRatio * 100)}%), ${withDemo} live demo deployments, ${recentUpdates} updated within the last 6 months.`
  };
}

/**
 * 3. Development Activity (20 points max)
 * Measures active days distribution, unique repository breadth, activity time span consistency, and capped commit volume
 */
function calculateActivityScore(user, repos, events, stats) {
  if (!Array.isArray(events) || events.length === 0) {
    const lastActiveDays = stats.latestRepo ? (new Date() - new Date(stats.latestRepo.updated_at)) / (1000 * 60 * 60 * 24) : 999;
    const fallbackPts = lastActiveDays < 7 ? 6 : lastActiveDays < 30 ? 4 : lastActiveDays < 90 ? 2 : 1;
    return {
      score: fallbackPts,
      max: 20,
      label: 'Development Activity',
      why: `Evaluated from repository update timestamps: latest activity recorded ${stats.latestRepo ? timeAgo(stats.latestRepo.updated_at) : 'N/A'}.`
    };
  }

  const pushEvents = events.filter(e => e.type === 'PushEvent');
  const distinctRepos = new Set(events.map(e => e.repo.name)).size;
  const distinctDays = new Set(events.map(e => e.created_at.slice(0, 10))).size;

  // 1. Active Days Distribution (up to 7 pts)
  let activeDaysPts = 1.0;
  if (distinctDays >= 15) activeDaysPts = 7.0;
  else if (distinctDays >= 8) activeDaysPts = 6.0;
  else if (distinctDays >= 4) activeDaysPts = 4.5;
  else if (distinctDays >= 2) activeDaysPts = 2.5;

  // 2. Multi-Repository Breadth (up to 5 pts)
  let breadthPts = 1.5;
  if (distinctRepos >= 5) breadthPts = 5.0;
  else if (distinctRepos >= 3) breadthPts = 4.0;
  else if (distinctRepos === 2) breadthPts = 3.0;

  // 3. Consistency & Activity Time Span (up to 5 pts)
  const timestamps = events.map(e => new Date(e.created_at).getTime()).sort((a, b) => a - b);
  const timeSpanDays = (timestamps[timestamps.length - 1] - timestamps[0]) / (1000 * 60 * 60 * 24);
  let timeSpanPts = 1.0;
  if (timeSpanDays >= 30) timeSpanPts = 5.0;
  else if (timeSpanDays >= 14) timeSpanPts = 4.0;
  else if (timeSpanDays >= 7) timeSpanPts = 2.5;
  else if (timeSpanDays >= 3) timeSpanPts = 1.5;

  // 4. Commit / Push Volume (up to 3 pts - capped so volume alone cannot inflate score)
  let volumePts = 1.0;
  if (pushEvents.length >= 16) volumePts = 3.0;
  else if (pushEvents.length >= 6) volumePts = 2.0;

  const finalScore = Math.min(20, Math.max(0, Math.round(activeDaysPts + breadthPts + timeSpanPts + volumePts)));

  return {
    score: finalScore,
    max: 20,
    label: 'Development Activity',
    why: `${distinctDays} active days across ${distinctRepos} repositories spanning ~${Math.max(1, Math.round(timeSpanDays))} days (${pushEvents.length} push events).`
  };
}

/**
 * 4. Technology Stack (10 points max)
 * Evaluates primary language specialization, multi-project ecosystems, and codebase scale (not mere single-file diversity)
 */
function calculateTechnologyScore(languages, repos) {
  if (!languages || languages.totalLanguages === 0 || !Array.isArray(repos) || repos.length === 0) {
    return {
      score: 0,
      max: 10,
      label: 'Technology Stack',
      why: 'No detectable programming languages found in repositories.'
    };
  }

  const topLang = languages.languages[0];
  const totalSizeKB = repos.reduce((acc, r) => acc + (r.size || 0), 0);

  // 1. Primary Language Depth & Specialization (up to 3.5 pts)
  let primaryDepth = 1.0;
  if (topLang) {
    const topLangRepos = repos.filter(r => r.language === topLang.name);
    const topLangSizeKB = topLangRepos.reduce((acc, r) => acc + (r.size || 0), 0);
    if (topLangRepos.length >= 8 || topLangSizeKB > 25600) primaryDepth = 3.5;
    else if (topLangRepos.length >= 4 || topLangSizeKB > 5120) primaryDepth = 2.5;
    else if (topLangRepos.length >= 2) primaryDepth = 1.5;
  }

  // 2. Multi-Stack Ecosystem Breadth (up to 3.5 pts)
  // Requires established language ecosystems with multiple repositories each
  const langRepoCounts = {};
  repos.forEach(r => {
    if (r.language) langRepoCounts[r.language] = (langRepoCounts[r.language] || 0) + 1;
  });
  const establishedLangs = Object.keys(langRepoCounts).filter(l => langRepoCounts[l] >= 2).length;

  let breadthPts = 1.0;
  if (establishedLangs >= 4) breadthPts = 3.5;
  else if (establishedLangs === 3) breadthPts = 2.5;
  else if (establishedLangs === 2) breadthPts = 1.5;

  // 3. Codebase Scale & Production Architecture (up to 3.0 pts)
  let scalePts = 0.5;
  if (totalSizeKB > 102400) scalePts = 3.0;      // > 100MB
  else if (totalSizeKB > 25600) scalePts = 2.0;  // > 25MB
  else if (totalSizeKB > 5120) scalePts = 1.0;   // > 5MB

  const finalScore = Math.min(10, Math.max(0, Math.round(primaryDepth + breadthPts + scalePts)));

  return {
    score: finalScore,
    max: 10,
    label: 'Technology Stack',
    why: `Primary language: ${languages.primaryLanguage} (${topLang ? topLang.count : 0} repos). ${establishedLangs} multi-project language stack${establishedLangs === 1 ? '' : 's'} (${Math.round(totalSizeKB / 1024 * 10) / 10} MB total code).`
  };
}

/**
 * 5. Community & Presence (10 points max)
 * Strictly scales with real social proof (followers, stars received, forks received)
 */
function calculateCommunityScore(user, events, stats) {
  const followers = user.followers || 0;
  const stars = stats.totalStars || 0;
  const forks = stats.totalForks || 0;
  const following = user.following || 0;

  let score = 0;

  // 1. Base profile presence (0.5 pt)
  if (user.public_repos > 0) score += 0.5;

  // 2. Followers (up to 4.0 pts)
  if (followers >= 100) score += 4.0;
  else if (followers >= 25) score += 3.0;
  else if (followers >= 6) score += 2.0;
  else if (followers >= 1) score += 1.0;

  // 3. Stars Received from Community (up to 3.0 pts)
  if (stars >= 50) score += 3.0;
  else if (stars >= 10) score += 2.0;
  else if (stars >= 1) score += 1.0;

  // 4. Forks Received by Others (up to 2.0 pts)
  if (forks >= 20) score += 2.0;
  else if (forks >= 3) score += 1.0;
  else if (forks >= 1) score += 0.5;

  // 5. Following network connection (0.5 pt)
  if (following >= 1) score += 0.5;

  const finalScore = Math.min(10, Math.max(0, Math.round(score)));

  return {
    score: finalScore,
    max: 10,
    label: 'Community & Presence',
    why: `${followers} follower${followers === 1 ? '' : 's'}, ${stars} star${stars === 1 ? '' : 's'}, ${forks} fork${forks === 1 ? '' : 's'} received.`
  };
}

/**
 * 6. Project Quality (15 points max)
 */
function calculateProjectScore(topRepos) {
  if (!Array.isArray(topRepos) || topRepos.length === 0) {
    return {
      score: 0,
      max: 15,
      label: 'Project Quality',
      why: 'No public projects available to evaluate.'
    };
  }

  const r1 = topRepos[0] ? (topRepos[0].projectScore / 15) * 7 : 0;  // up to 7 pts
  const r2 = topRepos[1] ? (topRepos[1].projectScore / 15) * 5 : 0;  // up to 5 pts
  const r3 = topRepos[2] ? (topRepos[2].projectScore / 15) * 3 : 0;  // up to 3 pts

  const finalScore = Math.min(15, Math.max(0, Math.round(r1 + r2 + r3)));
  const topName = topRepos[0] ? topRepos[0].name : 'N/A';

  return {
    score: finalScore,
    max: 15,
    label: 'Project Quality',
    why: `Top projects (led by '${topName}') evaluated on live demo deployments, descriptions, file size, and maintenance.`
  };
}

/**
 * 7. Documentation (5 points max)
 */
function calculateDocumentationScore(user, repos) {
  if (!Array.isArray(repos) || repos.length === 0) {
    return {
      score: 0,
      max: 5,
      label: 'Documentation',
      why: 'No repositories available to evaluate documentation.'
    };
  }

  const total = repos.length;
  const withDesc = repos.filter(r => r.description && r.description.trim().length >= 10).length;
  const withDemo = repos.filter(r => r.homepage && r.homepage.trim().length > 0 && r.homepage.startsWith('http')).length;
  const withTopics = repos.filter(r => Array.isArray(r.topics) && r.topics.length > 0).length;

  const descRatio = withDesc / total;
  const demoRatio = withDemo / total;

  let score = (descRatio * 2.5) + (Math.min(1.5, demoRatio * 3));
  if (withTopics > 0) score += 1.0;

  const finalScore = Math.min(5, Math.max(0, Math.round(score)));

  return {
    score: finalScore,
    max: 5,
    label: 'Documentation',
    why: `${withDesc}/${total} repositories have descriptions; ${withDemo} have live deployment links.`
  };
}

/**
 * 8. Open Source & Collaboration (5 points max)
 * Strictly measures PRs, public issue contributions, and external community adoption (NOT personal repository ownership)
 */
function calculateOpenSourceScore(repos, events, stats) {
  let score = 0;
  const reasons = [];

  const prEvents = Array.isArray(events) ? events.filter(e => e.type === 'PullRequestEvent').length : 0;
  const issueEvents = Array.isArray(events) ? events.filter(e => e.type === 'IssuesEvent' || e.type === 'IssueCommentEvent').length : 0;
  const forksReceived = stats.totalForks || 0;
  const hasForkedContribution = stats.forkedReposCount > 0;

  // 1. Pull Requests submitted to open-source projects (up to 2.5 pts)
  if (prEvents >= 3) {
    score += 2.5;
    reasons.push(`${prEvents} PRs submitted (+2.5)`);
  } else if (prEvents >= 1) {
    score += 1.5;
    reasons.push(`${prEvents} PR submitted (+1.5)`);
  }

  // 2. Public Issue Collaboration & Triage (up to 1.5 pts)
  if (issueEvents >= 3) {
    score += 1.5;
    reasons.push(`${issueEvents} issue contributions (+1.5)`);
  } else if (issueEvents >= 1) {
    score += 0.8;
    reasons.push(`${issueEvents} issue contribution (+0.8)`);
  }

  // 3. Forks Received by Other Developers / Upstream Open-Source (up to 1.0 pt)
  if (forksReceived >= 3) {
    score += 1.0;
    reasons.push(`${forksReceived} forks by other developers (+1.0)`);
  } else if (forksReceived >= 1) {
    score += 0.5;
    reasons.push(`${forksReceived} fork received (+0.5)`);
  } else if (hasForkedContribution) {
    score += 0.5;
    reasons.push('Forked repositories present (+0.5)');
  }

  const finalScore = Math.min(5, Math.max(0, Math.round(score)));

  return {
    score: finalScore,
    max: 5,
    label: 'Open Source',
    why: reasons.length > 0 ? reasons.join(' • ') : 'No external pull requests, public issue contributions, or upstream forks recorded.'
  };
}

/**
 * Master Developer Score Calculation (Exactly 100 points maximum)
 */
function calculateDeveloperScore(user, repos, events, stats, languages, topRepos) {
  const profile = calculateProfileScore(user, repos);
  const repository = calculateRepositoryScore(repos, stats);
  const activity = calculateActivityScore(user, repos, events, stats);
  const technology = calculateTechnologyScore(languages, repos);
  const community = calculateCommunityScore(user, events, stats);
  const project = calculateProjectScore(topRepos);
  const documentation = calculateDocumentationScore(user, repos);
  const openSource = calculateOpenSourceScore(repos, events, stats);

  const totalScore = Math.min(100, Math.max(0,
    profile.score + repository.score + activity.score + technology.score +
    community.score + project.score + documentation.score + openSource.score
  ));

  // Tiers:
  // 0–30   → Beginner
  // 31–50  → Developing
  // 51–70  → Good
  // 71–85  → Strong
  // 86–100 → Excellent
  let tier = 'Beginner';
  let tierClass = 'tier-beginner';
  if (totalScore >= 86) {
    tier = 'Excellent';
    tierClass = 'tier-excellent';
  } else if (totalScore >= 71) {
    tier = 'Strong';
    tierClass = 'tier-strong';
  } else if (totalScore >= 51) {
    tier = 'Good';
    tierClass = 'tier-good';
  } else if (totalScore >= 31) {
    tier = 'Developing';
    tierClass = 'tier-developing';
  }

  return {
    totalScore,
    tier,
    tierClass,
    breakdown: {
      profile,
      repository,
      activity,
      technology,
      community,
      project,
      documentation,
      openSource
    }
  };
}

// --------------------------------------------------------------------------
// Truthful Data-Driven Insights & Suggestions
// --------------------------------------------------------------------------

function generateInsights(user, repos, stats, languages, score, topRepos) {
  const insights = [];

  // 1. Strongest Technology
  if (languages.primaryLanguage !== 'N/A') {
    const topLang = languages.languages[0];
    insights.push({
      icon: 'code',
      title: 'Strongest Technology',
      text: `**${languages.primaryLanguage}** is your most-used language, powering **${topLang ? topLang.percentage : 0}%** of your public code across ${topLang ? topLang.count : 0} repositories.`
    });
  }

  // 2. Repository Strength
  insights.push({
    icon: 'inventory_2',
    title: 'Repository Architecture',
    text: `You maintain **${user.public_repos} original public repositories** on GitHub with structured multi-project development.`
  });

  // 3. Development Momentum
  if (score.breakdown.activity.score >= 12) {
    insights.push({
      icon: 'local_fire_department',
      title: 'Active Development Momentum',
      text: `Your recent GitHub activity indicates continued development and frequent commit iterations.`
    });
  } else {
    insights.push({
      icon: 'schedule',
      title: 'Development Cadence',
      text: `Establishing a steady weekly commit routine will help build a strong public contribution record.`
    });
  }

  // 4. Community Traction
  if (stats.totalStars > 0 || user.followers > 5) {
    insights.push({
      icon: 'star',
      title: 'Community Traction',
      text: `Your open-source work has earned **${stats.totalStars} stars** and connected with **${user.followers} followers**.`
    });
  } else {
    insights.push({
      icon: 'diversity_3',
      title: 'Community Building',
      text: `Your projects currently have limited GitHub community traction. Adding live deployment links and detailed READMEs will attract contributors.`
    });
  }

  return insights;
}

function generateSuggestions(user, repos, stats, languages, score, topRepos) {
  const suggestions = [];

  const total = repos.length;
  const missingDesc = repos.filter(r => !r.description || r.description.trim().length === 0).length;
  const missingDemo = repos.filter(r => !r.homepage || r.homepage.trim().length === 0).length;
  const missingTopics = repos.filter(r => !Array.isArray(r.topics) || r.topics.length === 0).length;

  // 1. Missing Descriptions
  if (missingDesc > 0) {
    suggestions.push({
      category: '📚 Repository Descriptions',
      status: `${missingDesc} of ${total} Repos Missing Description`,
      suggestion: `${missingDesc} of your ${total} repositories have no description. Add concise descriptions to improve discoverability and recruiter appeal.`,
      priority: 'High',
      priorityClass: 'priority-high'
    });
  }

  // 2. Live Demo Deployments
  if (missingDemo > 0) {
    suggestions.push({
      category: '🚀 Live Deployments',
      status: `${missingDemo} of ${total} Repos Without Demo Link`,
      suggestion: `${missingDemo} projects have no homepage/demo link. Add live preview URLs (e.g. Vercel, Netlify, GitHub Pages) to interactive repositories.`,
      priority: 'Medium',
      priorityClass: 'priority-medium'
    });
  }

  // 3. Profile Completeness
  if (!user.bio || !user.blog || !user.location) {
    const missing = [];
    if (!user.bio) missing.push('Bio');
    if (!user.blog) missing.push('Portfolio/Website');
    if (!user.location) missing.push('Location');
    suggestions.push({
      category: '📌 Profile Optimization',
      status: `${missing.join(', ')} Incomplete`,
      suggestion: `Your GitHub profile is missing: ${missing.join(', ')}. Complete these fields in your GitHub settings to reach 10/10 Profile Quality.`,
      priority: 'High',
      priorityClass: 'priority-high'
    });
  }

  // 4. Topic Tags
  if (missingTopics > 0) {
    suggestions.push({
      category: '🏷️ Discoverability & Topics',
      status: `${missingTopics} Repos Lack Topic Tags`,
      suggestion: `Add relevant technology topics (e.g., 'javascript', 'tailwindcss', 'web-development') to your repository settings for GitHub search ranking.`,
      priority: 'Medium',
      priorityClass: 'priority-medium'
    });
  }

  // 5. Documentation & README
  suggestions.push({
    category: '📝 Documentation Standards',
    status: 'Flagship Repositories',
    suggestion: `Ensure your top projects (such as '${topRepos[0] ? topRepos[0].name : 'your flagship project'}') include setup guides, feature lists, and live screenshots.`,
    priority: 'Low',
    priorityClass: 'priority-low'
  });

  return suggestions;
}

// --------------------------------------------------------------------------
// UI Rendering Functions
// --------------------------------------------------------------------------

function renderProfile(user, stats) {
  setSrc('user-avatar', user.avatar_url);
  setText('user-name', user.name || user.login);
  setText('user-login', `@${user.login}`);
  setText('user-bio', user.bio || 'Software Developer building modern applications.');
  
  const linkBtn = document.getElementById('user-github-link');
  if (linkBtn) linkBtn.href = user.html_url;

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

  setText('user-stat-repos', user.public_repos);
  setText('user-stat-followers', user.followers);
  setText('user-stat-following', user.following);
  setText('user-stat-gists', user.public_gists);
}

function renderScore(score) {
  setText('score-overall-number', score.totalScore);
  
  const tierEl = document.getElementById('score-rank-tier');
  if (tierEl) {
    tierEl.textContent = score.tier;
    tierEl.className = `badge ${score.tierClass} text-xs font-bold transition-all`;
  }

  // SVG Circular progress gauge offset (radius 70 => circumference 439.82)
  const circleProgress = document.getElementById('score-circle-progress');
  if (circleProgress) {
    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    circleProgress.style.strokeDasharray = `${circumference} ${circumference}`;
    const offset = circumference - (score.totalScore / 100 * circumference);
    circleProgress.style.strokeDashoffset = offset;
  }

  // Render 8-category breakdown with progress bars & expandable explanations
  const breakdownContainer = document.getElementById('score-breakdown-container');
  if (breakdownContainer) {
    const b = score.breakdown;
    const categories = [
      { key: 'profile', label: 'Profile Quality', data: b.profile, color: 'bg-indigo-600' },
      { key: 'repository', label: 'Repository Quality', data: b.repository, color: 'bg-indigo-600' },
      { key: 'activity', label: 'Development Activity', data: b.activity, color: 'bg-emerald-500' },
      { key: 'technology', label: 'Technology Stack', data: b.technology, color: 'bg-blue-500' },
      { key: 'community', label: 'Community & Presence', data: b.community, color: 'bg-amber-500' },
      { key: 'project', label: 'Project Quality', data: b.project, color: 'bg-purple-500' },
      { key: 'documentation', label: 'Documentation', data: b.documentation, color: 'bg-teal-500' },
      { key: 'openSource', label: 'Open Source', data: b.openSource, color: 'bg-rose-500' }
    ];

    breakdownContainer.innerHTML = categories.map(cat => {
      const pct = Math.round((cat.data.score / cat.data.max) * 100);
      return `
        <div class="score-cat-item group" onclick="this.classList.toggle('expanded')" title="Click to view explanation">
          <div class="flex items-center justify-between font-semibold text-slate-700 mb-1">
            <span class="flex items-center gap-1">
              <span>${cat.label}</span>
              <span class="material-symbols-outlined text-[14px] text-slate-400 group-hover:text-indigo-600 transition-colors">info</span>
            </span>
            <span class="text-slate-900 font-bold">${cat.data.score} / ${cat.data.max}</span>
          </div>
          <div class="sub-score-bar-bg">
            <div class="sub-score-bar-fill ${cat.color}" style="width: ${pct}%;"></div>
          </div>
          <div class="score-cat-why">
            <strong>Why:</strong> ${escapeHtml(cat.data.why)}
          </div>
        </div>
      `;
    }).join('');
  }
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

/**
 * Render Top 3 Repositories (Ranked by Project Quality)
 */
function renderTopRepositories(topRepos) {
  const container = document.getElementById('top-repo-highlight-container');
  if (!container) return;

  if (!Array.isArray(topRepos) || topRepos.length === 0) {
    container.innerHTML = `<p class="text-xs text-slate-400">No public repositories available.</p>`;
    return;
  }

  const top3 = topRepos.slice(0, 3);
  const rankLabels = [
    { rank: '#1 Flagship Project', badgeClass: 'bg-amber-50 text-amber-700 border-amber-200', icon: 'military_tech' },
    { rank: '#2 Core Project', badgeClass: 'bg-slate-100 text-slate-700 border-slate-300', icon: 'workspace_premium' },
    { rank: '#3 Notable Project', badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200', icon: 'stars' }
  ];

  container.innerHTML = `
    <div class="space-y-4">
      <div class="flex items-center justify-between mb-1">
        <h4 class="font-bold text-base text-slate-900 flex items-center gap-2">
          <span class="material-symbols-outlined text-amber-500">star</span>
          <span>Top Highlighted Repositories</span>
        </h4>
        <span class="text-xs text-slate-400">Ranked by Quality & Depth</span>
      </div>

      ${top3.map((repo, idx) => {
        const meta = rankLabels[idx] || rankLabels[2];
        const langColor = repo.language ? (LANGUAGE_COLORS[repo.language] || '#64748b') : '#64748b';
        const updatedDate = timeAgo(repo.updated_at);
        const isFlagship = idx === 0;

        return `
          <div class="dev-card ${isFlagship ? 'top-repo-card border-indigo-200 bg-gradient-to-br from-white via-indigo-50/20 to-white' : ''} p-5 min-w-0">
            <div class="flex flex-wrap items-center justify-between gap-3 mb-2.5">
              <div class="flex items-center gap-2 min-w-0">
                <span class="badge ${meta.badgeClass} text-xs font-bold flex items-center gap-1 shrink-0">
                  <span class="material-symbols-outlined text-[14px]">${meta.icon}</span>
                  <span>${meta.rank}</span>
                </span>
                <span class="badge badge-primary text-[10px] shrink-0 font-semibold">Quality: ${repo.projectScore}/15 pts</span>
              </div>

              <div class="flex items-center gap-2 shrink-0">
                ${repo.homepage ? `
                  <a href="${repo.homepage}" target="_blank" class="btn-primary text-xs py-1.5 px-3 flex items-center gap-1 shrink-0" title="Open Live Demo">
                    <span class="material-symbols-outlined text-[14px]">launch</span>
                    <span>Live Demo</span>
                  </a>
                ` : ''}
                <a href="${repo.html_url}" target="_blank" class="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1 shrink-0">
                  <span class="material-symbols-outlined text-[14px]">open_in_new</span>
                  <span>GitHub</span>
                </a>
              </div>
            </div>

            <h3 class="text-base sm:text-lg font-bold text-slate-900 hover:text-indigo-600 transition-colors break-words-anywhere">
              <a href="${repo.html_url}" target="_blank">${escapeHtml(repo.name)}</a>
            </h3>

            <p class="text-xs sm:text-sm text-slate-600 mt-1.5 mb-3.5 leading-relaxed break-words-anywhere line-clamp-2 sm:line-clamp-3">
              ${escapeHtml(repo.description || 'No description provided for this repository.')}
            </p>

            <div class="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs text-slate-600">
              <div class="flex flex-wrap items-center gap-3 sm:gap-4">
                ${repo.language ? `
                  <span class="flex items-center gap-1.5 font-semibold text-slate-800 shrink-0">
                    <span class="repo-lang-dot" style="background-color: ${langColor};"></span>
                    ${escapeHtml(repo.language)}
                  </span>
                ` : ''}
                <span class="flex items-center gap-1 shrink-0">
                  <span class="material-symbols-outlined text-[15px] text-amber-500">star</span>
                  <strong>${repo.stargazers_count || 0}</strong> stars
                </span>
                <span class="flex items-center gap-1 shrink-0">
                  <span class="material-symbols-outlined text-[15px] text-purple-600">fork_right</span>
                  <strong>${repo.forks_count || 0}</strong> forks
                </span>
                <span class="flex items-center gap-1 shrink-0 text-slate-500">
                  <span class="material-symbols-outlined text-[15px]">folder_open</span>
                  ${Math.round((repo.size || 0) / 1024 * 10) / 10} MB
                </span>
              </div>

              <div class="text-slate-400 text-[11px]">
                <span>Updated ${updatedDate}</span>
              </div>
            </div>
          </div>
        `;
      }).join('')}
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
      const count = e.payload && e.payload.commits ? e.payload.commits.length : 1;
      const msg = e.payload && e.payload.commits && e.payload.commits[0] ? e.payload.commits[0].message : 'Pushed commits';
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
              ${repo.stargazers_count || 0}
            </span>
            <span class="flex items-center gap-0.5" title="Forks">
              <span class="material-symbols-outlined text-[14px]">fork_right</span>
              ${repo.forks_count || 0}
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
// Report Export (JSON v2.0 & Text Summary Developer Report)
// --------------------------------------------------------------------------

function generateTextReport(d) {
  const user = d.user;
  const score = d.score;
  const b = score.breakdown;
  const stats = d.stats;
  const langs = d.languages;
  const topRepo = d.topRepos && d.topRepos[0] ? d.topRepos[0] : null;

  let report = '';
  report += `DEV PILOT AI\n`;
  report += `GitHub Developer Report\n`;
  report += `────────────────────────\n\n`;
  report += `@${user.login}\n\n`;
  report += `Developer Score\n`;
  report += `      ${score.totalScore} / 100\n`;
  report += `   ${score.tier}\n\n`;
  report += `────────────────────────\n`;
  report += `PROFILE\n`;
  report += `Repositories       ${user.public_repos}\n`;
  report += `Followers          ${user.followers}\n`;
  report += `Following          ${user.following}\n\n`;
  report += `────────────────────────\n`;
  report += `SCORE BREAKDOWN\n\n`;
  report += `Repository Quality     ${(b.repository ? b.repository.score : 0).toString().padStart(2)}/25\n`;
  report += `Development Activity   ${(b.activity ? b.activity.score : 0).toString().padStart(2)}/20\n`;
  report += `Project Quality        ${(b.project ? b.project.score : 0).toString().padStart(2)}/15\n`;
  report += `Technology Stack       ${(b.technology ? b.technology.score : 0).toString().padStart(2)}/10\n`;
  report += `Profile Quality        ${(b.profile ? b.profile.score : 0).toString().padStart(2)}/10\n`;
  report += `Community              ${(b.community ? b.community.score : 0).toString().padStart(2)}/10\n`;
  report += `Documentation          ${(b.documentation ? b.documentation.score : 0).toString().padStart(2)}/5\n`;
  report += `Open Source            ${(b.openSource ? b.openSource.score : 0).toString().padStart(2)}/5\n\n`;
  report += `────────────────────────\n`;
  report += `TOP TECHNOLOGIES\n\n`;
  if (langs && langs.languages) {
    langs.languages.slice(0, 4).forEach(l => {
      report += `${l.name.padEnd(16)} ${l.percentage}%\n`;
    });
  }
  report += `\n────────────────────────\n`;
  report += `TOP PROJECTS\n\n`;
  if (topRepo) {
    report += `${topRepo.name}\n`;
    report += `⭐ ${topRepo.stargazers_count || 0}   🍴 ${topRepo.forks_count || 0}\n`;
    report += `${topRepo.language || 'Plain'}\n\n`;
  }
  report += `────────────────────────\n`;
  report += `INSIGHTS\n\n`;
  if (langs && langs.primaryLanguage && langs.primaryLanguage !== 'N/A') {
    report += `✓ Strongest Technology: ${langs.primaryLanguage}\n`;
  }
  report += `✓ ${stats.originalReposCount || user.public_repos} original repositories\n`;
  if (stats.totalStars < 5) {
    report += `⚠ Community traction is low\n`;
  } else {
    report += `✓ Community traction established\n`;
  }
  if (b.activity && b.activity.score >= 10) {
    report += `✓ Recent development activity\n`;
  } else {
    report += `⚠ Low recent commit frequency\n`;
  }
  report += `\n────────────────────────\n`;
  report += `RECOMMENDATIONS\n\n`;
  if (Array.isArray(d.suggestions)) {
    d.suggestions.forEach((s, idx) => {
      const cleanCategory = s.category.replace(/^[^\w\s]+/, '').trim();
      report += `${idx + 1}. ${cleanCategory}\n`;
    });
  }
  report += `\nGenerated by DevPilot AI\n`;

  return report;
}

function exportTextReport() {
  if (!currentAnalysisData) {
    showToast('Please analyze a GitHub user first!', 'error');
    return;
  }

  const d = currentAnalysisData;
  const textContent = generateTextReport(d);

  const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
  const downloadUrl = URL.createObjectURL(blob);
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', downloadUrl);
  downloadAnchor.setAttribute('download', `github-report-${d.user.login}.txt`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  URL.revokeObjectURL(downloadUrl);

  showToast(`Downloaded text report for @${d.user.login} (.txt)`, 'success');
}

function exportJsonReport() {
  if (!currentAnalysisData) {
    showToast('Please analyze a GitHub user first!', 'error');
    return;
  }

  const d = currentAnalysisData;
  const exportPayload = {
    scoreVersion: '2.0',
    generator: 'DevPilot-AI GitHub Analyzer',
    generatedAt: new Date().toISOString(),
    profile: {
      username: d.user.login,
      name: d.user.name,
      bio: d.user.bio,
      location: d.user.location,
      company: d.user.company,
      blog: d.user.blog,
      publicRepos: d.user.public_repos,
      followers: d.user.followers,
      following: d.user.following
    },
    statistics: {
      totalStars: d.stats.totalStars,
      totalForks: d.stats.totalForks,
      openIssues: d.stats.openIssues,
      totalRepos: d.stats.totalRepos,
      originalRepos: d.stats.originalReposCount,
      forkedRepos: d.stats.forkedReposCount,
      archivedRepos: d.stats.archivedReposCount
    },
    developerScore: {
      totalScore: d.score.totalScore,
      tier: d.score.tier,
      breakdown: {
        profile: d.score.breakdown.profile.score,
        repositories: d.score.breakdown.repository.score,
        activity: d.score.breakdown.activity.score,
        technology: d.score.breakdown.technology.score,
        community: d.score.breakdown.community.score,
        projects: d.score.breakdown.project.score,
        documentation: d.score.breakdown.documentation.score,
        openSource: d.score.breakdown.openSource.score
      },
      detailedBreakdown: d.score.breakdown
    },
    topLanguages: d.languages.languages,
    topRepositories: (d.topRepos || []).slice(0, 3).map(r => ({
      name: r.name,
      description: r.description,
      language: r.language,
      stars: r.stargazers_count,
      forks: r.forks_count,
      score: r.projectScore,
      url: r.html_url,
      homepage: r.homepage,
      updatedAt: r.updated_at
    })),
    recentActivity: d.events.slice(0, 10).map(e => parseGitHubEvent(e)),
    insights: d.insights,
    suggestions: d.suggestions,
    textReport: generateTextReport(d)
  };

  const blob = new Blob([JSON.stringify(exportPayload, null, 2)], { type: 'application/json;charset=utf-8' });
  const downloadUrl = URL.createObjectURL(blob);
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', downloadUrl);
  downloadAnchor.setAttribute('download', `github-analysis-${d.user.login}-v2.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  URL.revokeObjectURL(downloadUrl);

  showToast(`Downloaded JSON data for @${d.user.login} (.json)`, 'success');
}

function copyReportToClipboard() {
  if (!currentAnalysisData) {
    showToast('Please analyze a GitHub user first!', 'error');
    return;
  }

  const d = currentAnalysisData;
  const textContent = generateTextReport(d);
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(textContent).then(() => {
      showToast(`Copied @${d.user.login}'s report to clipboard!`, 'success');
    }).catch(() => {
      fallbackCopyText(textContent);
    });
  } else {
    fallbackCopyText(textContent);
  }
}

function fallbackCopyText(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  try {
    document.execCommand('copy');
    showToast('Copied report to clipboard!', 'success');
  } catch (err) {
    showToast('Failed to copy to clipboard', 'error');
  }
  document.body.removeChild(textArea);
}

// Default export alias
function exportReport() {
  exportTextReport();
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
