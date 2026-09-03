/**
 * DevPilot-AI - Code Snippet Vault Module
 */

const snippets = [
  {
    id: 's1',
    title: 'Robust Debounce with Cancellation',
    description: 'Delays function execution until after a designated wait time has elapsed since the last time it was invoked.',
    language: 'JavaScript',
    langClass: 'lang-js',
    code: `function debounce(fn, waitMs) {
  let timerId;
  const debounced = function(...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn.apply(this, args), waitMs);
  };
  debounced.cancel = () => clearTimeout(timerId);
  return debounced;
}`
  },
  {
    id: 's2',
    title: 'Fast I/O Template for Competitive Programming',
    description: 'Unsyncs C++ standard streams with C stdio and unties cin from cout for ultra-fast input processing.',
    language: 'C++',
    langClass: 'lang-cpp',
    code: `#include <bits/stdc++.h>
using namespace std;

void fastIO() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);
}

int main() {
    fastIO();
    // Your algorithm logic here
    return 0;
}`
  },
  {
    id: 's3',
    title: 'Modern CSS Glassmorphism Card',
    description: 'Sleek frosted-glass background card effect using backdrop-filter and subtle semi-transparent borders.',
    language: 'HTML/CSS',
    langClass: 'lang-html',
    code: `.glass-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
}`
  },
  {
    id: 's4',
    title: 'LRU Cache with OrderedDict',
    description: 'Python implementation of a fixed-size Least Recently Used (LRU) cache with O(1) read/write performance.',
    language: 'Python',
    langClass: 'lang-python',
    code: `from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity: int):
        self.cache = OrderedDict()
        self.capacity = capacity

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        self.cache.move_to_end(key)
        return self.cache[key]

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)`
  },
  {
    id: 's5',
    title: 'Async Retry with Exponential Backoff',
    description: 'Retries a promise-returning asynchronous operation multiple times with increasing delay intervals.',
    language: 'JavaScript',
    langClass: 'lang-js',
    code: `async function fetchWithRetry(fn, retries = 3, delay = 1000) {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) throw error;
    await new Promise(r => setTimeout(r, delay));
    return fetchWithRetry(fn, retries - 1, delay * 2);
  }
}`
  },
  {
    id: 's6',
    title: 'Dijkstra Shortest Path with Min-Heap',
    description: 'Finds single-source shortest paths in a non-negative weighted graph in O((V + E) log V).',
    language: 'C++',
    langClass: 'lang-cpp',
    code: `vector<int> dijkstra(int V, vector<vector<pair<int, int>>>& adj, int src) {
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;
    vector<int> dist(V, 1e9);
    
    dist[src] = 0;
    pq.push({0, src});
    
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue;
        for (auto& [v, weight] : adj[u]) {
            if (dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}`
  }
];

let activeLanguage = 'All';

document.addEventListener('DOMContentLoaded', () => {
  renderSnippets();
  initLanguageTabs();
  initSnippetSearch();
});

function renderSnippets(data = snippets) {
  const container = document.getElementById('snippets-grid');
  if (!container) return;

  const filtered = data.filter(s => {
    if (activeLanguage === 'All') return true;
    return s.language.toLowerCase().includes(activeLanguage.toLowerCase());
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full dev-card text-center py-12">
        <span class="material-symbols-outlined text-4xl text-outline mb-2">code_off</span>
        <h4 class="font-bold text-lg text-on-surface">No snippets found</h4>
        <p class="text-sm text-on-surface-variant mt-1">Try another language filter or search keyword.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map((s, idx) => `
    <div class="dev-card flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between mb-2">
          <h3 class="font-bold text-base text-on-surface">${escapeHtml(s.title)}</h3>
          <span class="badge badge-primary text-xs flex items-center gap-1">
            <span class="repo-lang-dot ${s.langClass}"></span>
            ${s.language}
          </span>
        </div>
        <p class="text-xs text-on-surface-variant mb-4 leading-relaxed">${escapeHtml(s.description)}</p>
      </div>

      <div class="code-block-wrapper">
        <div class="code-block-header">
          <div class="code-block-dots">
            <span class="code-dot code-dot-red"></span>
            <span class="code-dot code-dot-yellow"></span>
            <span class="code-dot code-dot-green"></span>
          </div>
          <button class="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors text-xs" onclick="copySnippetCode(${idx})">
            <span class="material-symbols-outlined text-[14px]">content_copy</span>
            <span>Copy Code</span>
          </button>
        </div>
        <pre class="code-content"><code>${escapeHtml(s.code)}</code></pre>
      </div>
    </div>
  `).join('');
}

window.copySnippetCode = function(idx) {
  const filtered = snippets.filter(s => {
    if (activeLanguage === 'All') return true;
    return s.language.toLowerCase().includes(activeLanguage.toLowerCase());
  });
  const item = filtered[idx] || snippets[idx];
  if (item) {
    copyToClipboard(item.code, `Copied "${item.title}" code to clipboard!`);
  }
};

function initLanguageTabs() {
  const tabs = document.querySelectorAll('.snippet-lang-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeLanguage = tab.getAttribute('data-lang') || 'All';
      renderSnippets();
    });
  });
}

function initSnippetSearch() {
  const searchInput = document.getElementById('snippets-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      const matched = snippets.filter(s => 
        (activeLanguage === 'All' || s.language.toLowerCase().includes(activeLanguage.toLowerCase())) &&
        (s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q) || s.code.toLowerCase().includes(q))
      );
      renderSnippets(matched);
    });
  }
}

function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
