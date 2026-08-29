/**
 * DevPilot-AI - AI Prompt Library Module
 */

const promptLibrary = [
  {
    id: 'p1',
    title: 'Root Cause & Asynchronous Race Condition Debugger',
    category: 'Debugging',
    description: 'Pinpoints elusive concurrency bugs, stale state closures in React, and unhandled promise rejections.',
    promptText: `Act as a Principal Software Engineer. I am encountering an intermittent bug in the following code snippet. 

Please perform a root-cause analysis:
1. Identify race conditions, stale closures, or unhandled promise rejections.
2. Provide a line-by-line explanation of why the failure occurs.
3. Rewrite the code using defensive programming and optimal error boundaries.

Code:
[PASTE YOUR CODE HERE]`
  },
  {
    id: 'p2',
    title: 'Clean Architecture & SOLID Refactoring',
    category: 'Code Refactoring',
    description: 'Transforms monolithic functions into decoupled, testable modules conforming to SOLID principles.',
    promptText: `Analyze the following function/module and refactor it for production maintainability:

Requirements:
- Apply Single Responsibility (SRP) and Open/Closed (OCP) principles.
- Decouple I/O and side-effects from pure domain logic.
- Add comprehensive TypeScript interface definitions.
- Provide unit tests using Jest/Vitest with edge-case test coverage.

Code:
[PASTE YOUR CODE HERE]`
  },
  {
    id: 'p3',
    title: 'Distributed System Architecture & Scale Assessment',
    category: 'System Design',
    description: 'Designs resilient high-throughput cloud architectures handling millions of concurrent requests.',
    promptText: `Act as a Senior Cloud Architect. Design a scalable, fault-tolerant system for:
Target: [E.g., Real-time Chat / Video Streaming / Rate Limiter]

Please break down:
1. High-Level Architecture (Load Balancer, API Gateway, Microservices, Caching Layer).
2. Data Model & Database Choice (SQL vs NoSQL vs LSM-tree).
3. Handling High Concurrency & Partition Tolerances (CAP theorem trade-offs).
4. Monitoring, rate-limiting, and graceful degradation strategies.`
  },
  {
    id: 'p4',
    title: 'DSA Time & Space Complexity Optimizer ($O(N)$)',
    category: 'DSA Practice',
    description: 'Refactors brute-force algorithm solutions into optimal time/space complexity approaches.',
    promptText: `Here is a DSA problem and my current solution:
Problem: [PROBLEM DESCRIPTION OR LEETCODE LINK]
My Solution: [PASTE YOUR CODE HERE]

Please:
1. Calculate the exact Big-O Time & Auxiliary Space complexity.
2. Propose an optimal approach (e.g., Sliding Window, Monotonic Stack, Two Pointers, or DP).
3. Write clean, commented code implementing the optimal approach.
4. Walk through an edge-case test trace.`
  },
  {
    id: 'p5',
    title: 'Unit Test Suite Generator with Edge Cases',
    category: 'Debugging',
    description: 'Generates comprehensive unit tests covering boundary values, null checks, and error branches.',
    promptText: `Generate a comprehensive test suite using Vitest/Jest for this module.
Ensure you test:
- Happy paths with typical valid inputs.
- Boundary conditions (empty arrays, max integer values, null/undefined).
- Expected throws and rejection handling.
- Mocking external network requests or timer dependencies.

Code:
[PASTE YOUR CODE HERE]`
  },
  {
    id: 'p6',
    title: 'REST to GraphQL Schema & Resolver Migration',
    category: 'Code Refactoring',
    description: 'Translates legacy REST endpoints into strongly typed GraphQL SDL schemas and resolvers.',
    promptText: `Translate the following REST API endpoints into clean GraphQL SDL schemas and type-safe query/mutation resolvers:

REST Endpoints:
[LIST ENDPOINTS & RESPONSES]

Include:
- Type Definitions & Custom Scalars.
- Query and Mutation schemas.
- DataLoader optimization to solve N+1 query problem.`
  }
];

let activeCategory = 'All';

document.addEventListener('DOMContentLoaded', () => {
  renderPrompts();
  initCategoryTabs();
  initPromptSearch();
});

function renderPrompts(data = promptLibrary) {
  const container = document.getElementById('prompts-grid');
  if (!container) return;

  const filtered = data.filter(p => {
    if (activeCategory === 'All') return true;
    return p.category.toLowerCase() === activeCategory.toLowerCase();
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full dev-card text-center py-12">
        <span class="material-symbols-outlined text-4xl text-outline mb-2">search_off</span>
        <h4 class="font-bold text-lg text-on-surface">No prompts found</h4>
        <p class="text-sm text-on-surface-variant mt-1">Try another category or search term.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map((p, idx) => `
    <div class="dev-card prompt-card">
      <div class="mb-3">
        <div class="flex items-center justify-between mb-2">
          <span class="badge badge-primary text-xs">${escapeHtml(p.category)}</span>
          <span class="text-xs text-on-surface-variant flex items-center gap-1">
            <span class="material-symbols-outlined text-[14px]">bolt</span> Ready to use
          </span>
        </div>
        <h3 class="font-bold text-base text-on-surface mb-1">${escapeHtml(p.title)}</h3>
        <p class="text-xs text-on-surface-variant leading-relaxed">${escapeHtml(p.description)}</p>
      </div>

      <div class="prompt-text-box mb-4">
        <p class="text-xs text-slate-700 whitespace-pre-line">${escapeHtml(p.promptText)}</p>
      </div>

      <div class="flex items-center gap-2 pt-3 border-t border-outline-variant mt-auto">
        <button class="btn-secondary flex-1 text-xs py-2" onclick="copyPromptText(${idx})">
          <span class="material-symbols-outlined text-[16px]">content_copy</span>
          <span>Copy Prompt</span>
        </button>
        <button class="btn-primary flex-1 text-xs py-2" onclick="runPromptInChat(${idx})">
          <span class="material-symbols-outlined text-[16px]">play_arrow</span>
          <span>Run in AI Chat</span>
        </button>
      </div>
    </div>
  `).join('');
}

window.copyPromptText = function(idx) {
  const filtered = promptLibrary.filter(p => {
    if (activeCategory === 'All') return true;
    return p.category.toLowerCase() === activeCategory.toLowerCase();
  });
  const item = filtered[idx] || promptLibrary[idx];
  if (item) {
    copyToClipboard(item.promptText, `Prompt "${item.title}" copied to clipboard!`);
  }
};

window.runPromptInChat = function(idx) {
  const filtered = promptLibrary.filter(p => {
    if (activeCategory === 'All') return true;
    return p.category.toLowerCase() === activeCategory.toLowerCase();
  });
  const item = filtered[idx] || promptLibrary[idx];
  if (item) {
    localStorage.setItem('devpilot_prompt_to_run', item.promptText);
    showToast('Redirecting to AI Chat...', 'info');
    setTimeout(() => {
      window.location.href = 'chat.html';
    }, 400);
  }
};

function initCategoryTabs() {
  const tabs = document.querySelectorAll('.prompt-cat-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeCategory = tab.getAttribute('data-cat') || 'All';
      renderPrompts();
    });
  });
}

function initPromptSearch() {
  const searchInput = document.getElementById('prompts-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      const matched = promptLibrary.filter(p => 
        (activeCategory === 'All' || p.category.toLowerCase() === activeCategory.toLowerCase()) &&
        (p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.promptText.toLowerCase().includes(q))
      );
      renderPrompts(matched);
    });
  }
}

function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
