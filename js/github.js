/**
 * DevPilot-AI - GitHub Activity Module
 */

const mockGitHubData = {
  user: {
    username: 'adityasharma-dev',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    status: 'Connected',
    profileUrl: 'https://github.com'
  },
  stats: {
    totalCommits: 124,
    pullRequests: 14,
    openIssues: 2,
    repositories: 8
  },
  commits: [
    {
      id: 'c1',
      hash: 'a7b3e92',
      message: 'feat: implement real-time markdown & code syntax parsing in AI chat',
      repo: 'devpilot-ai-core',
      branch: 'main',
      timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString()
    },
    {
      id: 'c2',
      hash: 'f491bc8',
      message: 'fix: resolve circular countdown stroke alignment in focus timer',
      repo: 'devpilot-ai-core',
      branch: 'fix/timer-svg',
      timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString()
    },
    {
      id: 'c3',
      hash: 'e82a170',
      message: 'refactor: extract reactive CV preview state into separate module',
      repo: 'resume-craft-engine',
      branch: 'main',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString()
    },
    {
      id: 'c4',
      hash: '90cd31a',
      message: 'docs: update leetcode solutions repository with sliding window patterns',
      repo: 'dsa-mastery-vault',
      branch: 'master',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
    },
    {
      id: 'c5',
      hash: '3bc941d',
      message: 'feat: add local storage sync for developer habit checklist',
      repo: 'devpilot-ai-core',
      branch: 'feat/habit-tracker',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString()
    }
  ],
  repos: [
    {
      name: 'devpilot-ai-core',
      description: 'Intelligent developer companion dashboard featuring AI coding assistant, habit trackers, and snippet vault.',
      language: 'JavaScript',
      langClass: 'lang-js',
      stars: 48,
      forks: 12,
      isPrivate: false,
      updatedAt: '2 hours ago'
    },
    {
      name: 'dsa-mastery-vault',
      description: 'Curated repository containing 250+ optimized DSA solutions in C++ & JavaScript with time complexity notes.',
      language: 'C++',
      langClass: 'lang-cpp',
      stars: 124,
      forks: 35,
      isPrivate: false,
      updatedAt: 'Yesterday'
    },
    {
      name: 'resume-craft-engine',
      description: 'Reactive front-end ATS-friendly resume builder with instant preview and PDF export utilities.',
      language: 'TypeScript',
      langClass: 'lang-ts',
      stars: 89,
      forks: 19,
      isPrivate: false,
      updatedAt: '3 days ago'
    },
    {
      name: 'fullstack-saas-starter',
      description: 'Production-ready starter boilerplate featuring authentication, database schema, and dark mode design.',
      language: 'Python',
      langClass: 'lang-python',
      stars: 215,
      forks: 64,
      isPrivate: false,
      updatedAt: '5 days ago'
    },
    {
      name: 'modern-web-components',
      description: 'A rich library of accessible, beautifully animated UI components built with Tailwind & vanilla JavaScript.',
      language: 'HTML/CSS',
      langClass: 'lang-html',
      stars: 67,
      forks: 8,
      isPrivate: false,
      updatedAt: '1 week ago'
    },
    {
      name: 'rust-algo-visualizer',
      description: 'High-performance WebAssembly algorithm visualizer exploring graph traversal and sorting techniques.',
      language: 'Rust',
      langClass: 'lang-rust',
      stars: 142,
      forks: 28,
      isPrivate: false,
      updatedAt: '2 weeks ago'
    }
  ]
};

document.addEventListener('DOMContentLoaded', () => {
  renderGitHubStats();
  renderTimeline();
  renderRepos();
  initGitHubActions();
});

function renderGitHubStats() {
  const commitsEl = document.getElementById('stat-commits');
  const prsEl = document.getElementById('stat-prs');
  const issuesEl = document.getElementById('stat-issues');
  const reposEl = document.getElementById('stat-repos');

  if (commitsEl) commitsEl.textContent = mockGitHubData.stats.totalCommits;
  if (prsEl) prsEl.textContent = mockGitHubData.stats.pullRequests;
  if (issuesEl) issuesEl.textContent = mockGitHubData.stats.openIssues;
  if (reposEl) reposEl.textContent = mockGitHubData.stats.repositories;
}

function renderTimeline() {
  const container = document.getElementById('activity-timeline');
  if (!container) return;

  container.innerHTML = mockGitHubData.commits.map(commit => `
    <div class="timeline-item">
      <div class="timeline-dot">
        <span class="material-symbols-outlined text-[12px] text-primary" style='font-variation-settings: "FILL" 1;'>commit</span>
      </div>
      <div class="dev-card p-4">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div class="flex items-center gap-2">
            <span class="font-semibold text-sm text-on-surface hover:text-primary cursor-pointer">${commit.repo}</span>
            <span class="badge badge-neutral text-xs flex items-center gap-1">
              <span class="material-symbols-outlined text-[14px]">alt_route</span>
              ${commit.branch}
            </span>
          </div>
          <div class="flex items-center gap-2">
            <span class="commit-hash">${commit.hash}</span>
            <span class="text-xs text-on-surface-variant">${timeAgo(commit.timestamp)}</span>
          </div>
        </div>
        <p class="text-sm text-on-surface">${escapeHtml(commit.message)}</p>
      </div>
    </div>
  `).join('');
}

function renderRepos(filteredRepos = mockGitHubData.repos) {
  const container = document.getElementById('repos-grid');
  if (!container) return;

  container.innerHTML = filteredRepos.map(repo => `
    <div class="dev-card repo-card">
      <div>
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-primary">folder</span>
            <h4 class="font-bold text-base text-on-surface hover:text-primary transition-colors cursor-pointer">${repo.name}</h4>
          </div>
          <span class="badge ${repo.isPrivate ? 'badge-warning' : 'badge-neutral'} text-xs">
            ${repo.isPrivate ? 'Private' : 'Public'}
          </span>
        </div>
        <p class="text-xs text-on-surface-variant line-clamp-2 mb-4 leading-relaxed">${repo.description}</p>
      </div>

      <div class="flex items-center justify-between pt-3 border-t border-outline-variant text-xs text-on-surface-variant">
        <div class="flex items-center gap-1.5">
          <span class="repo-lang-dot ${repo.langClass}"></span>
          <span class="font-medium">${repo.language}</span>
        </div>
        <div class="flex items-center gap-3">
          <span class="flex items-center gap-1 hover:text-primary cursor-pointer" title="Stars">
            <span class="material-symbols-outlined text-[14px]">star</span>
            ${repo.stars}
          </span>
          <span class="flex items-center gap-1 hover:text-primary cursor-pointer" title="Forks">
            <span class="material-symbols-outlined text-[14px]">fork_right</span>
            ${repo.forks}
          </span>
          <a href="https://github.com" target="_blank" class="text-primary hover:text-primary-hover p-1" title="Open on GitHub">
            <span class="material-symbols-outlined text-[16px]">open_in_new</span>
          </a>
        </div>
      </div>
    </div>
  `).join('');
}

function initGitHubActions() {
  const refreshBtn = document.getElementById('btn-refresh-github');
  const searchInput = document.getElementById('repo-search-input');

  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      refreshBtn.classList.add('animate-spin');
      setTimeout(() => {
        refreshBtn.classList.remove('animate-spin');
        showToast('GitHub activity data refreshed!', 'success');
      }, 600);
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      const filtered = mockGitHubData.repos.filter(r => 
        r.name.toLowerCase().includes(q) || 
        r.description.toLowerCase().includes(q) || 
        r.language.toLowerCase().includes(q)
      );
      renderRepos(filtered);
    });
  }
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
