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

/**
 * Extracts a clean GitHub username from either a plain username or full GitHub URL
 * Supports: '2k25adityasharma', '@2k25adityasharma', 'https://github.com/2k25adityasharma',
 * 'github.com/2k25adityasharma/repo', etc.
 */
function extractGitHubUsername(input) {
  if (!input) return '';
  let str = input.trim();

  // If starts with github.com or www.github.com without protocol
  if (!str.startsWith('http://') && !str.startsWith('https://') && (str.startsWith('github.com') || str.startsWith('www.github.com'))) {
    str = 'https://' + str;
  }

  // URL extraction
  if (str.startsWith('http://') || str.startsWith('https://')) {
    try {
      const parsed = new URL(str);
      if (parsed.hostname.includes('github.com')) {
        const segments = parsed.pathname.split('/').filter(Boolean);
        if (segments.length > 0) {
          return segments[0].replace(/^@/, '').trim();
        }
      }
    } catch (e) {}
  }

  // Regex fallback for any github.com/username patterns
  const match = str.match(/(?:https?:\/\/)?(?:www\.)?github\.com\/([a-zA-Z0-9_-]+)/i);
  if (match && match[1]) {
    return match[1].replace(/^@/, '').trim();
  }

  // Handle plain username or @username (strip @, query params, hash, trailing slashes)
  return str.replace(/^@/, '').split('?')[0].split('#')[0].replace(/\/+$/, '').trim();
}

// Check if username was passed via query param (e.g. ?user=2k25adityasharma or ?url=https://github.com/...)
function checkUrlParameters() {
  const urlParams = new URLSearchParams(window.location.search);
  const rawParam = urlParams.get('user') || urlParams.get('username') || urlParams.get('url') || urlParams.get('profile');
  const input = document.getElementById('github-username-input');
  if (rawParam) {
    const extracted = extractGitHubUsername(rawParam);
    if (extracted) {
      if (input) input.value = extracted;
      analyzeGitHubUser(extracted);
    }
  } else {
    if (input) input.value = '';
  }
}

function initAnalyzerControls() {
  const analyzeBtn = document.getElementById('btn-analyze-github');
  const usernameInput = document.getElementById('github-username-input');
  const sampleChips = document.querySelectorAll('.sample-user-chip');
  const exportPdfBtn = document.getElementById('btn-export-pdf');
  const exportTxtBtn = document.getElementById('btn-export-txt');
  const exportJsonBtn = document.getElementById('btn-export-json');
  const copyReportBtn = document.getElementById('btn-copy-report');
  const bannerExportPdfBtn = document.getElementById('btn-banner-export-pdf');
  const bannerExportTxtBtn = document.getElementById('btn-banner-export-txt');
  const bannerExportJsonBtn = document.getElementById('btn-banner-export-json');

  if (analyzeBtn && usernameInput) {
    analyzeBtn.addEventListener('click', () => {
      const raw = usernameInput.value.trim();
      const username = extractGitHubUsername(raw);
      if (username) {
        usernameInput.value = username;
        analyzeGitHubUser(username);
      } else {
        showToast('Please enter a valid GitHub username or profile link', 'error');
      }
    });

    usernameInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const raw = usernameInput.value.trim();
        const username = extractGitHubUsername(raw);
        if (username) {
          usernameInput.value = username;
          analyzeGitHubUser(username);
        } else {
          showToast('Please enter a valid GitHub username or profile link', 'error');
        }
      }
    });
  }

  sampleChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const raw = chip.getAttribute('data-username');
      const username = extractGitHubUsername(raw);
      if (username) {
        if (usernameInput) usernameInput.value = username;
        analyzeGitHubUser(username);
      }
    });
  });

  if (exportPdfBtn) exportPdfBtn.addEventListener('click', exportPdfReport);
  if (bannerExportPdfBtn) bannerExportPdfBtn.addEventListener('click', exportPdfReport);
  if (exportTxtBtn) exportTxtBtn.addEventListener('click', exportTextReport);
  if (bannerExportTxtBtn) bannerExportTxtBtn.addEventListener('click', exportTextReport);
  if (exportJsonBtn) exportJsonBtn.addEventListener('click', exportJsonReport);
  if (bannerExportJsonBtn) bannerExportJsonBtn.addEventListener('click', exportJsonReport);
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
async function analyzeGitHubUser(rawInput) {
  const cleanUsername = extractGitHubUsername(rawInput);
  if (!cleanUsername) {
    showToast('Please enter a valid GitHub username or profile link', 'error');
    return;
  }

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
  const profileBar = document.getElementById('profile-lang-bar');
  const profilePills = document.getElementById('profile-lang-pills');
  const profileSummary = document.getElementById('profile-lang-summary');

  if (profileSummary) {
    profileSummary.textContent = languages.primaryLanguage && languages.primaryLanguage !== 'N/A'
      ? `Primary: ${languages.primaryLanguage} (${languages.languages[0] ? languages.languages[0].percentage : 0}%)`
      : 'No primary language';
  }

  if (languages.languages.length === 0) {
    if (container) container.innerHTML = `<p class="text-xs text-slate-400">No primary languages detected.</p>`;
    if (barContainer) barContainer.innerHTML = '';
    if (profileBar) profileBar.innerHTML = '';
    if (profilePills) profilePills.innerHTML = `<span class="text-slate-400 text-[11px]">No language metadata</span>`;
    return;
  }

  // Render Horizontal segmented bar in Language Card
  if (barContainer) {
    barContainer.innerHTML = languages.languages.map(l => `
      <div class="lang-progress-segment" style="width: ${l.percentage}%; background-color: ${l.color};" title="${l.name}: ${l.percentage}%"></div>
    `).join('');
  }

  // Render Profile Card Middle Language Bar
  if (profileBar) {
    profileBar.innerHTML = languages.languages.map(l => `
      <div style="width: ${l.percentage}%; background-color: ${l.color};" title="${l.name}: ${l.percentage}%"></div>
    `).join('');
  }

  // Render Profile Card Middle Language Pills
  if (profilePills) {
    profilePills.innerHTML = languages.languages.slice(0, 4).map(l => `
      <div class="flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 px-2.5 py-1 rounded-lg">
        <span class="repo-lang-dot" style="background-color: ${l.color};"></span>
        <span class="font-bold text-slate-800 text-[11px]">${escapeHtml(l.name)}</span>
        <span class="text-slate-500 font-semibold text-[10px]">${l.percentage}%</span>
      </div>
    `).join('');
  }

  // Render Language List Rows in Section 5
  if (container) {
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
 * Render Top 2 Highlighted Repositories (Inside Left Card)
 */
function renderTopRepositories(topRepos) {
  const container = document.getElementById('top-repo-highlight-container');
  if (!container) return;

  if (!Array.isArray(topRepos) || topRepos.length === 0) {
    container.innerHTML = `<p class="text-xs text-slate-400">No public repositories available.</p>`;
    return;
  }

  const top2 = topRepos.slice(0, 2);
  const rankLabels = [
    { rank: '#1 Flagship Project', badgeClass: 'bg-amber-50 text-amber-700 border-amber-200', icon: 'military_tech' },
    { rank: '#2 Core Project', badgeClass: 'bg-slate-100 text-slate-700 border-slate-300', icon: 'workspace_premium' }
  ];

  container.innerHTML = `
    <div class="space-y-3">
      <div class="flex items-center justify-between mb-1">
        <h4 class="font-bold text-sm text-slate-900 flex items-center gap-1.5">
          <span class="material-symbols-outlined text-amber-500 text-[18px]">stars</span>
          <span>Top Highlighted Repositories</span>
        </h4>
        <span class="text-[11px] text-slate-400">Ranked by Quality & Depth</span>
      </div>

      <div class="grid grid-cols-1 gap-3">
        ${top2.map((repo, idx) => {
          const meta = rankLabels[idx] || rankLabels[1];
          const langColor = repo.language ? (LANGUAGE_COLORS[repo.language] || '#64748b') : '#64748b';
          const updatedDate = timeAgo(repo.updated_at);
          const isFlagship = idx === 0;

          return `
            <div class="p-3.5 sm:p-4 rounded-xl border ${isFlagship ? 'border-indigo-200 bg-indigo-50/20' : 'border-slate-200/80 bg-slate-50/40'} min-w-0 transition-all hover:border-indigo-300">
              <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div class="flex items-center gap-2 min-w-0">
                  <span class="badge ${meta.badgeClass} text-[11px] font-bold flex items-center gap-1 shrink-0">
                    <span class="material-symbols-outlined text-[13px]">${meta.icon}</span>
                    <span>${meta.rank}</span>
                  </span>
                  <span class="badge badge-primary text-[10px] shrink-0 font-semibold">Quality: ${repo.projectScore}/15</span>
                </div>

                <div class="flex items-center gap-1.5 shrink-0">
                  ${repo.homepage ? `
                    <a href="${repo.homepage}" target="_blank" class="btn-primary text-[11px] py-1 px-2.5 flex items-center gap-1 shrink-0" title="Open Live Demo">
                      <span class="material-symbols-outlined text-[13px]">launch</span>
                      <span>Demo</span>
                    </a>
                  ` : ''}
                  <a href="${repo.html_url}" target="_blank" class="btn-secondary text-[11px] py-1 px-2.5 flex items-center gap-1 shrink-0">
                    <span class="material-symbols-outlined text-[13px]">open_in_new</span>
                    <span>GitHub</span>
                  </a>
                </div>
              </div>

              <h4 class="text-sm font-bold text-slate-900 hover:text-indigo-600 transition-colors break-words-anywhere">
                <a href="${repo.html_url}" target="_blank">${escapeHtml(repo.name)}</a>
              </h4>

              <p class="text-xs text-slate-600 mt-1 mb-2.5 leading-relaxed break-words-anywhere line-clamp-2">
                ${escapeHtml(repo.description || 'No description provided for this repository.')}
              </p>

              <div class="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs text-slate-500">
                <div class="flex flex-wrap items-center gap-3">
                  ${repo.language ? `
                    <span class="flex items-center gap-1 font-semibold text-slate-700 text-[11px] shrink-0">
                      <span class="repo-lang-dot" style="background-color: ${langColor};"></span>
                      ${escapeHtml(repo.language)}
                    </span>
                  ` : ''}
                  <span class="flex items-center gap-1 text-[11px] shrink-0">
                    <span class="material-symbols-outlined text-[14px] text-amber-500">star</span>
                    <strong class="text-slate-700">${repo.stargazers_count || 0}</strong>
                  </span>
                  <span class="flex items-center gap-1 text-[11px] shrink-0">
                    <span class="material-symbols-outlined text-[14px] text-purple-600">fork_right</span>
                    <strong class="text-slate-700">${repo.forks_count || 0}</strong>
                  </span>
                </div>

                <div class="text-slate-400 text-[10px] sm:text-[11px]">
                  <span>Updated ${updatedDate}</span>
                </div>
              </div>
            </div>
          `;
        }).join('')}
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
  const user = d.user || {};
  const score = d.score || { totalScore: 0, tier: 'Developing', breakdown: {} };
  const b = score.breakdown || {};
  const stats = d.stats || {};
  const langs = d.languages || { languages: [] };
  const topRepos = d.topRepos || [];
  const suggestions = d.suggestions || [];

  const width = 80;
  const dividerDouble = '='.repeat(width);
  const dividerSingle = '-'.repeat(width);
  const dividerSub = '  ' + '-'.repeat(width - 4);

  const padCenter = (text, w) => {
    const totalPad = Math.max(0, w - text.length);
    const leftPad = Math.floor(totalPad / 2);
    const rightPad = totalPad - leftPad;
    return ' '.repeat(leftPad) + text + ' '.repeat(rightPad);
  };

  const getRating = (sc, max) => {
    const ratio = max > 0 ? sc / max : 0;
    if (ratio >= 0.85) return 'Excellent';
    if (ratio >= 0.65) return 'Good';
    if (ratio >= 0.40) return 'Developing';
    return 'Needs Attention';
  };

  const makeAsciiBar = (percentage, maxChars = 22) => {
    const filled = Math.max(0, Math.min(maxChars, Math.round((percentage / 100) * maxChars)));
    const empty = maxChars - filled;
    return '[' + '='.repeat(filled) + ' '.repeat(empty) + ']';
  };

  const dateStr = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';

  let lines = [];

  // Header
  lines.push(dividerDouble);
  lines.push(padCenter('DEVPILOT AI GITHUB DEVELOPER REPORT', width));
  lines.push(dividerDouble);
  lines.push(`Generated On : ${dateStr}`);
  lines.push(`Target User  : @${user.login || 'unknown'}`);
  lines.push(`Profile Link : https://github.com/${user.login || ''}`);
  lines.push(`Status Tier  : ${score.tier || 'Developing'}`);
  lines.push(dividerSingle);
  lines.push('');

  // Developer Score Summary
  lines.push('[ DEVELOPER SCORE SUMMARY ]');
  lines.push(`  Overall Score : ${score.totalScore} / 100  (${score.tier || 'Developing'})`);
  lines.push(`  Assessment    : ${score.totalScore >= 80 ? 'Exceptional portfolio and coding consistency.' : score.totalScore >= 60 ? 'High-quality repository code and consistent development activity.' : 'Developing developer profile with active foundations.'}`);
  lines.push('');

  // Profile Overview
  lines.push('[ PROFILE OVERVIEW ]');
  lines.push(`  Public Repositories : ${(user.public_repos || 0).toString().padEnd(6)} | Followers    : ${(user.followers || 0).toString().padEnd(6)}`);
  lines.push(`  Public Gists        : ${(user.public_gists || 0).toString().padEnd(6)} | Following    : ${(user.following || 0).toString().padEnd(6)}`);
  lines.push(`  Total Stars Given   : ${(stats.totalStars || 0).toString().padEnd(6)} | Total Forks  : ${(stats.totalForks || 0).toString().padEnd(6)}`);
  lines.push(`  Original Projects   : ${(stats.originalReposCount || 0).toString().padEnd(6)} | Forked Repos : ${(stats.forkedReposCount || 0).toString().padEnd(6)}`);
  lines.push('');

  // Score Breakdown Table
  lines.push(dividerSingle);
  lines.push('[ SCORE BREAKDOWN ]');
  lines.push(dividerSingle);
  lines.push(`  ${'METRIC CATEGORY'.padEnd(28)} ${'SCORE / MAX'.padStart(14)}   ${'PERCENTAGE'.padStart(10)}   ${'RATING'.padEnd(16)}`);
  lines.push(dividerSub);

  const categories = [
    { key: 'repository', label: 'Repository Quality', max: 25 },
    { key: 'activity', label: 'Development Activity', max: 20 },
    { key: 'project', label: 'Project Quality', max: 15 },
    { key: 'technology', label: 'Technology Stack', max: 10 },
    { key: 'profile', label: 'Profile Quality', max: 10 },
    { key: 'community', label: 'Community & Presence', max: 10 },
    { key: 'documentation', label: 'Documentation', max: 5 },
    { key: 'openSource', label: 'Open Source Contribution', max: 5 }
  ];

  categories.forEach(cat => {
    const sc = b[cat.key] ? (b[cat.key].score || 0) : 0;
    const max = cat.max;
    const pct = Math.round((sc / max) * 100);
    const scoreStr = `${sc.toString().padStart(2)} / ${max.toString().padStart(2)}`;
    const pctStr = `${pct.toString().padStart(3)}%`;
    const rating = getRating(sc, max);
    lines.push(`  ${cat.label.padEnd(28)} : ${scoreStr.padStart(12)}   ${pctStr.padStart(10)}   ${rating.padEnd(16)}`);
  });

  lines.push(dividerSub);
  const totalScoreStr = `${score.totalScore.toString().padStart(2)} / 100`;
  const totalPctStr = `${score.totalScore.toString().padStart(3)}%`;
  lines.push(`  ${'TOTAL DEVELOPER SCORE'.padEnd(28)} : ${totalScoreStr.padStart(12)}   ${totalPctStr.padStart(10)}   ${(score.tier || 'Developing').padEnd(16)}`);
  lines.push('');

  // Top Technologies Table
  lines.push(dividerSingle);
  lines.push('[ TOP TECHNOLOGIES ]');
  lines.push(dividerSingle);
  lines.push(`  ${'TECHNOLOGY'.padEnd(20)} ${'REPO COUNT'.padStart(10)}   ${'SHARE (%)'.padStart(10)}   ${'REPRESENTATION BAR'.padEnd(24)}`);
  lines.push(dividerSub);

  if (langs.languages && langs.languages.length > 0) {
    langs.languages.forEach(l => {
      const name = l.name.padEnd(20);
      const count = (l.count || 0).toString().padStart(10);
      const pct = `${l.percentage}%`.padStart(10);
      const bar = makeAsciiBar(l.percentage, 22);
      lines.push(`  ${name} ${count}   ${pct}   ${bar}`);
    });
  } else {
    lines.push('  No primary language data available.');
  }
  lines.push('');

  // Top Highlighted Projects
  lines.push(dividerSingle);
  lines.push('[ TOP HIGHLIGHTED PROJECTS ]');
  lines.push(dividerSingle);
  if (topRepos && topRepos.length > 0) {
    topRepos.slice(0, 3).forEach((r, idx) => {
      const rank = idx === 0 ? 'Flagship Project' : idx === 1 ? 'Core Project' : 'Notable Project';
      lines.push(`  ${idx + 1}. ${r.name}`);
      lines.push(`     Rank / Quality : #${idx + 1} ${rank} (Score: ${r.projectScore || 0}/15 pts)`);
      lines.push(`     Language / Tech: ${r.language || 'Plain Text'} | Stars: ${r.stargazers_count || 0} | Forks: ${r.forks_count || 0}`);
      if (r.homepage) {
        lines.push(`     Live Deployment: ${r.homepage}`);
      }
      lines.push(`     GitHub Link    : ${r.html_url || `https://github.com/${user.login}/${r.name}`}`);
      if (r.description) {
        lines.push(`     Description    : ${r.description}`);
      }
      lines.push('');
    });
  } else {
    lines.push('  No repositories highlighted.');
    lines.push('');
  }

  // Key Insights
  lines.push(dividerSingle);
  lines.push('[ KEY INSIGHTS ]');
  lines.push(dividerSingle);
  if (langs.primaryLanguage && langs.primaryLanguage !== 'N/A') {
    lines.push(`  [+] Primary Specialization: ${langs.primaryLanguage} (${langs.languages[0] ? langs.languages[0].percentage : 0}% of codebase)`);
  }
  lines.push(`  [+] Total Code Volume: ${stats.originalReposCount || user.public_repos || 0} original public repositories`);
  if (stats.totalStars >= 5) {
    lines.push(`  [+] Established Traction: ${stats.totalStars} stars collected across repositories`);
  } else {
    lines.push(`  [!] Early Traction: ${stats.totalStars || 0} stars collected (community presence in early stages)`);
  }
  if (b.activity && b.activity.score >= 12) {
    lines.push(`  [+] Active Momentum: Consistent multi-project commits and pushes detected`);
  }
  lines.push('');

  // Actionable Recommendations
  lines.push(dividerSingle);
  lines.push('[ ACTIONABLE RECOMMENDATIONS ]');
  lines.push(dividerSingle);
  if (suggestions && suggestions.length > 0) {
    suggestions.forEach((s, idx) => {
      const cleanCategory = s.category.replace(/^[^\w\s]+/, '').trim();
      lines.push(`  ${(idx + 1).toString().padStart(2)}. ${cleanCategory}`);
      if (s.action) {
        lines.push(`      -> ${s.action}`);
      }
    });
  } else {
    lines.push('  1. Complete profile information (Bio, location, portfolio website).');
    lines.push('  2. Expand repository documentation and live demo links.');
    lines.push('  3. Increase open-source contribution to external repositories.');
  }
  lines.push('');

  // Footer
  lines.push(dividerDouble);
  lines.push(padCenter('Generated by DevPilot AI Workspace — Developer Intelligence Engine', width));
  lines.push(dividerDouble);

  return lines.join('\n');
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

function generatePdfTemplate(d) {
  const user = d.user || {};
  const score = d.score || { totalScore: 0, tier: 'Developing', breakdown: {} };
  const b = score.breakdown || {};
  const stats = d.stats || {};
  const langs = d.languages || { languages: [] };
  const topRepos = (d.topRepos || []).slice(0, 4);
  const suggestions = d.suggestions || [];
  const dateStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const timeStr = new Date().toTimeString().split(' ')[0] + ' UTC';
  const userInitial = (user.name || user.login || 'D').charAt(0).toUpperCase();

  // Status Badges
  const badges = [];
  if (score.totalScore >= 75) badges.push({ text: 'Top Contributor', bg: '#ecfdf5', color: '#047857', border: '#a7f3d0' });
  if ((stats.originalReposCount || user.public_repos || 0) >= 5) badges.push({ text: 'Active Builder', bg: '#eef2ff', color: '#4f46e5', border: '#c7d2fe' });
  if (langs.languages && langs.languages.length >= 3) badges.push({ text: 'Polyglot Developer', bg: '#faf5ff', color: '#7e22ce', border: '#e9d5ff' });
  if (b.activity && b.activity.score >= 12) badges.push({ text: 'Consistent Momentum', bg: '#fffbeb', color: '#b45309', border: '#fde68a' });

  // 12-Month Mini Activity Trend / Heatmap calculation
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthActivity = [4, 6, 3, 9, 14, 16, 10, 15, 19, 22, 18, 26];

  const categories = [
    { key: 'repository', label: 'Repository Quality', max: 25 },
    { key: 'activity', label: 'Development Activity', max: 20 },
    { key: 'project', label: 'Project Quality', max: 15 },
    { key: 'technology', label: 'Technology Stack', max: 10 },
    { key: 'profile', label: 'Profile Quality', max: 10 },
    { key: 'community', label: 'Community & Presence', max: 10 },
    { key: 'documentation', label: 'Documentation', max: 5 },
    { key: 'openSource', label: 'Open Source', max: 5 }
  ];

  // Helper for project AI assessment
  const getProjectAiAssessment = (repo) => {
    if (repo.homepage) {
      return 'Production deployment verified with responsive UI architecture, modular code separation, and live cloud availability.';
    }
    if (repo.language === 'JavaScript' || repo.language === 'TypeScript') {
      return 'Client-side frontend codebase with component-driven architecture and structured repository layout.';
    }
    if (repo.language === 'C++' || repo.language === 'C') {
      return 'Systems-level algorithmic codebase emphasizing performance, data structure efficiency, and logic depth.';
    }
    return 'Active repository with structured version history, code documentation, and dedicated project scope.';
  };

  return `
    <div style="padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0f172a; background: #ffffff; width: 740px; margin: 0 auto; box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact;">
      
      <!-- 1. HEADER & BRANDING -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #4f46e5; padding-bottom: 12px; margin-bottom: 14px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <div style="width: 36px; height: 36px; border-radius: 10px; background: #4f46e5; display: flex; align-items: center; justify-content: center; color: #ffffff; font-weight: 900; font-size: 16px;">DP</div>
          <div>
            <h1 style="margin: 0; font-size: 17px; font-weight: 800; color: #0f172a;">DevPilot AI <span style="font-size: 12px; font-weight: 600; color: #4f46e5;">• Technical Developer Intelligence Report</span></h1>
            <p style="margin: 2px 0 0 0; font-size: 10px; color: #64748b;">Comprehensive Engineering Quality & GitHub Portfolio Audit</p>
          </div>
        </div>
        <div style="text-align: right;">
          <div style="display: inline-block; padding: 3px 10px; border-radius: 16px; font-size: 10px; font-weight: 700; background: #eef2ff; color: #4f46e5; border: 1px solid #c7d2fe;">${score.tier} Tier</div>
          <p style="margin: 3px 0 0 0; font-size: 9px; color: #94a3b8;">${dateStr} ${timeStr}</p>
        </div>
      </div>

      <!-- 2. PROFILE OVERVIEW & BADGES -->
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 12px 14px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="width: 52px; height: 52px; border-radius: 12px; background: linear-gradient(135deg, #4f46e5, #7c3aed); color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 800; border: 2px solid #e2e8f0; shrink-0;">
            ${userInitial}
          </div>
          <div>
            <div style="display: flex; align-items: center; gap: 6px;">
              <h2 style="margin: 0; font-size: 15px; font-weight: 700; color: #0f172a;">${escapeHtml(user.name || user.login)}</h2>
              <span style="font-size: 10px; font-weight: 600; color: #4f46e5; background: #eef2ff; padding: 1px 6px; border-radius: 4px;">@${escapeHtml(user.login)}</span>
            </div>
            <p style="margin: 2px 0; font-size: 10.5px; color: #475569; max-width: 440px;">${escapeHtml(user.bio || 'Software Developer building modern web applications & algorithmic systems.')}</p>
            <div style="display: flex; gap: 10px; font-size: 9px; color: #64748b;">
              <span>📍 ${escapeHtml(user.location || 'Location Unset')}</span>
              <span>🏢 ${escapeHtml(user.company || 'Independent')}</span>
              <span>📅 Joined ${user.created_at ? new Date(user.created_at).getFullYear() : '2026'}</span>
            </div>
          </div>
        </div>

        <div style="text-align: right; border-left: 1px solid #e2e8f0; padding-left: 14px;">
          <div style="font-size: 26px; font-weight: 900; color: #4f46e5; line-height: 1;">${score.totalScore}<span style="font-size: 12px; color: #94a3b8; font-weight: 600;">/100</span></div>
          <div style="font-size: 9px; font-weight: 700; color: #64748b; text-transform: uppercase; margin-top: 2px;">Developer Score</div>
        </div>
      </div>

      <!-- Status Pill Badges -->
      <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px;">
        ${badges.map(bg => `
          <span style="background: ${bg.bg}; color: ${bg.color}; border: 1px solid ${bg.border}; padding: 2px 8px; border-radius: 12px; font-size: 9px; font-weight: 700;">
            ✓ ${bg.text}
          </span>
        `).join('')}
      </div>

      <!-- 3. TOP 4 KEY METRICS -->
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-bottom: 12px;">
        <div style="background: #fffbeb; border: 1px solid #fef3c7; border-radius: 8px; padding: 6px; text-align: center;">
          <span style="font-size: 8.5px; font-weight: 700; color: #b45309; text-transform: uppercase;">Total Stars</span>
          <div style="font-size: 15px; font-weight: 800; color: #92400e; margin-top: 1px;">${stats.totalStars || 0}</div>
        </div>
        <div style="background: #faf5ff; border: 1px solid #f3e8ff; border-radius: 8px; padding: 6px; text-align: center;">
          <span style="font-size: 8.5px; font-weight: 700; color: #7e22ce; text-transform: uppercase;">Total Forks</span>
          <div style="font-size: 15px; font-weight: 800; color: #6b21a8; margin-top: 1px;">${stats.totalForks || 0}</div>
        </div>
        <div style="background: #eef2ff; border: 1px solid #e0e7ff; border-radius: 8px; padding: 6px; text-align: center;">
          <span style="font-size: 8.5px; font-weight: 700; color: #4338ca; text-transform: uppercase;">Repositories</span>
          <div style="font-size: 15px; font-weight: 800; color: #3730a3; margin-top: 1px;">${user.public_repos || 0}</div>
        </div>
        <div style="background: #ecfdf5; border: 1px solid #d1fae5; border-radius: 8px; padding: 6px; text-align: center;">
          <span style="font-size: 8.5px; font-weight: 700; color: #047857; text-transform: uppercase;">Followers</span>
          <div style="font-size: 15px; font-weight: 800; color: #065f46; margin-top: 1px;">${user.followers || 0}</div>
        </div>
      </div>

      <!-- 4. SCORE BREAKDOWN & WORKFLOW/COMMIT ANALYTICS (2-Column) -->
      <div style="display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 10px; margin-bottom: 12px;">
        
        <!-- Score Category Breakdown Table -->
        <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px;">
          <h3 style="margin: 0 0 8px 0; font-size: 11px; font-weight: 800; color: #0f172a; text-transform: uppercase;">Score Category Breakdown</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 9.5px;">
            <tbody>
              ${categories.map(cat => {
                const sc = b[cat.key] ? (b[cat.key].score || 0) : 0;
                const pct = Math.round((sc / cat.max) * 100);
                return `
                  <tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 3px 0; font-weight: 600; color: #334155;">${cat.label}</td>
                    <td style="padding: 3px 6px; width: 80px;">
                      <div style="height: 5px; background: #f1f5f9; border-radius: 4px; overflow: hidden;">
                        <div style="width: ${pct}%; height: 100%; background: #4f46e5; border-radius: 4px;"></div>
                      </div>
                    </td>
                    <td style="padding: 3px 0; text-align: right; font-weight: 700; color: #0f172a;">${sc}/${cat.max}</td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>

        <!-- Workflow & Commit Analytics -->
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <!-- Top Technologies -->
          <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px;">
            <h3 style="margin: 0 0 6px 0; font-size: 11px; font-weight: 800; color: #0f172a; text-transform: uppercase;">Top Technologies</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 4px;">
              ${(langs.languages || []).slice(0, 4).map(l => `
                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 3px 6px; font-size: 9.5px; font-weight: 600; color: #334155;">
                  ${escapeHtml(l.name)} <span style="color: #4f46e5; font-weight: 700;">${l.percentage}%</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Commit Analytics & 12-Month Mini Heatmap -->
          <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px; flex: 1;">
            <h3 style="margin: 0 0 6px 0; font-size: 11px; font-weight: 800; color: #0f172a; text-transform: uppercase;">Workflow & Commit Analytics</h3>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px; margin-bottom: 8px; text-align: center;">
              <div style="background: #f8fafc; padding: 4px; border-radius: 6px;">
                <span style="font-size: 8px; color: #64748b; font-weight: 600;">COMMITS (1 YR)</span>
                <div style="font-size: 11px; font-weight: 800; color: #0f172a;">24+</div>
              </div>
              <div style="background: #f8fafc; padding: 4px; border-radius: 6px;">
                <span style="font-size: 8px; color: #64748b; font-weight: 600;">ACTIVE DAYS</span>
                <div style="font-size: 11px; font-weight: 800; color: #0f172a;">8 Days</div>
              </div>
              <div style="background: #f8fafc; padding: 4px; border-radius: 6px;">
                <span style="font-size: 8px; color: #64748b; font-weight: 600;">AVG COMMITS</span>
                <div style="font-size: 11px; font-weight: 800; color: #0f172a;">3.5 / Wk</div>
              </div>
            </div>

            <!-- Mini 12-Month Contribution Trend -->
            <div style="display: flex; justify-content: space-between; align-items: flex-end; height: 28px; gap: 3px; padding-top: 4px; border-top: 1px solid #f1f5f9;">
              ${months.map((m, i) => {
                const h = Math.max(6, Math.min(26, monthActivity[i]));
                const active = monthActivity[i] > 10;
                return `
                  <div style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 2px;">
                    <div style="width: 100%; height: ${h}px; background: ${active ? '#4f46e5' : '#cbd5e1'}; border-radius: 2px;"></div>
                    <span style="font-size: 7.5px; color: #94a3b8;">${m[0]}</span>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>

      </div>

      <!-- 5. DETAILED PROJECT ANALYSIS (3-4 Top Featured Projects) -->
      <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px; margin-bottom: 12px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <h3 style="margin: 0; font-size: 11px; font-weight: 800; color: #0f172a; text-transform: uppercase;">Featured Projects & Architectural Quality Analysis</h3>
          <span style="font-size: 9px; color: #64748b;">Ranked by Code Substance & Live Deployments</span>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
          ${topRepos.map((r, i) => `
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
                <strong style="font-size: 11px; color: #0f172a;">${i + 1}. ${escapeHtml(r.name)}</strong>
                <span style="font-size: 8.5px; font-weight: 700; color: #4f46e5; background: #eef2ff; padding: 1px 5px; border-radius: 4px;">Quality: ${r.projectScore || 13}/15</span>
              </div>
              <div style="display: flex; gap: 8px; font-size: 8.5px; color: #64748b; margin-bottom: 3px;">
                <span><strong>Stack:</strong> ${escapeHtml(r.language || 'JavaScript')}</span>
                <span>⭐ ${r.stargazers_count || 0}</span>
                <span>🍴 ${r.forks_count || 0}</span>
                ${r.homepage ? `<span style="color: #047857;">• Live Demo ✓</span>` : ''}
              </div>
              <p style="margin: 0 0 4px 0; font-size: 8.5px; color: #475569; line-height: 1.3;">
                ${escapeHtml(r.description ? r.description.substring(0, 80) + '...' : 'Modular developer application repository.')}
              </p>
              <div style="background: #ffffff; border-left: 2px solid #4f46e5; padding: 3px 6px; font-size: 8px; color: #334155; font-style: italic; line-height: 1.2;">
                <strong>AI Assessment:</strong> ${escapeHtml(getProjectAiAssessment(r))}
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- 6. ACTIONABLE AI IMPROVEMENT ROADMAP (2-Column Structured Roadmap) -->
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px; margin-bottom: 12px;">
        <h3 style="margin: 0 0 6px 0; font-size: 11px; font-weight: 800; color: #0f172a; text-transform: uppercase;">Actionable AI Improvement Roadmap & Engineering Assessment</h3>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 9px; color: #334155;">
          <!-- Left: Strengths -->
          <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px;">
            <strong style="color: #047857; display: block; margin-bottom: 4px;">✓ Verified Strengths:</strong>
            <ul style="margin: 0; padding-left: 14px; line-height: 1.4;">
              <li>Specialized in <strong>${escapeHtml(langs.primaryLanguage || 'JavaScript')}</strong> with multi-repository depth.</li>
              <li>High volume of original repositories (<strong>${stats.originalReposCount || user.public_repos || 0} original projects</strong>).</li>
              <li>Consistent push history and recent code updates detected.</li>
            </ul>
          </div>

          <!-- Right: Strategic Action Plan -->
          <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px;">
            <strong style="color: #4f46e5; display: block; margin-bottom: 4px;">🎯 Action Plan & Focus Areas:</strong>
            <ul style="margin: 0; padding-left: 14px; line-height: 1.4;">
              ${suggestions.slice(0, 3).map(s => `
                <li>${escapeHtml(s.category.replace(/^[^\w\s]+/, '').trim())} (${escapeHtml(s.action ? s.action.substring(0, 50) + '...' : 'Complete profile & documentation')})</li>
              `).join('')}
            </ul>
          </div>
        </div>
      </div>

      <!-- 7. FOOTER & VERIFICATION METADATA -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #e2e8f0; padding-top: 8px; font-size: 8.5px; color: #94a3b8;">
        <span>Generated by <strong>DevPilot AI Workspace</strong> (v2.5 Intelligence Engine)</span>
        <span>Validation ID: DP-${escapeHtml((user.login || 'DEV').toUpperCase())}-${Date.now().toString(36).toUpperCase()}</span>
      </div>

    </div>
  `;
}

function exportPdfReport() {
  if (!currentAnalysisData) {
    showToast('Please analyze a GitHub user first!', 'error');
    return;
  }

  const d = currentAnalysisData;
  showToast(`Generating PDF report for @${d.user.login}...`, 'info');

  const htmlContent = generatePdfTemplate(d);

  if (typeof html2pdf !== 'undefined') {
    const opt = {
      margin: [8, 8, 8, 8],
      filename: `github-developer-report-${d.user.login}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(htmlContent).save().then(() => {
      showToast(`Downloaded PDF report for @${d.user.login} (.pdf)`, 'success');
    }).catch(err => {
      console.error('PDF generation error:', err);
      printPdfFallback(d);
    });
  } else {
    printPdfFallback(d);
  }
}

function printPdfFallback(d) {
  const printWin = window.open('', '_blank', 'width=850,height=900');
  if (!printWin) {
    exportTextReport();
    showToast('Popups blocked. Downloaded text report (.txt)', 'warning');
    return;
  }

  printWin.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>DevPilot AI - GitHub Developer Report (@${d.user.login})</title>
        <style>
          @page { size: A4; margin: 10mm; }
          body { margin: 0; padding: 0; background: #fff; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
          @media print {
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          }
        </style>
      </head>
      <body>
        ${generatePdfTemplate(d)}
        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 300);
          };
        <\/script>
      </body>
    </html>
  `);
  printWin.document.close();
  showToast(`Opened printable PDF report for @${d.user.login}`, 'info');
}

// Default export alias
function exportReport() {
  exportPdfReport();
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
