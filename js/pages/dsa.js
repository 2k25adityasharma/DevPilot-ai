/**
 * DevPilot-AI - DSA Roadmap Controller
 * Handles progress tracking, smart search engine, multi-level filtering,
 * local storage synchronization, live statistics, and interactive problem rendering.
 */

(function () {
  'use strict';

  // State
  let progress = {};
  let patternStats = {};
  let reviews = {};
  let currentVisibleQuestionsList = [];
  const filterState = {
    search: '',
    difficulty: 'all',
    status: 'all',
    quality: 'all'
  };

  // DOM Elements cache
  let dom = {};

  /**
   * Initializes the DSA Roadmap page
   */
  function init() {
    // Verify dataset availability
    if (!window.dsaRoadmap || !Array.isArray(window.dsaRoadmap)) {
      console.error('DSA Roadmap data not found. Please ensure dsaData.js is loaded.');
      return;
    }

    // Load progress, reviews, and roadmap evaluations from Storage
    progress = Storage.get('dsa_progress', {}) || {};
    reviews = Storage.get('dsa_reviews', {}) || {};

    // Cache elements
    dom = {
      totalSolvedCount: document.getElementById('dsa-total-solved-count'),
      totalRemainingCount: document.getElementById('dsa-total-remaining-count'),
      progressFill: document.getElementById('dsa-progress-fill'),
      pctBadge: document.getElementById('dsa-pct-badge'),
      easyCount: document.getElementById('dsa-easy-count'),
      easyFill: document.getElementById('dsa-easy-fill'),
      mediumCount: document.getElementById('dsa-medium-count'),
      mediumFill: document.getElementById('dsa-medium-fill'),
      hardCount: document.getElementById('dsa-hard-count'),
      hardFill: document.getElementById('dsa-hard-fill'),
      statSelf: document.getElementById('dsa-count-self'),
      statHelp30: document.getElementById('dsa-count-help30'),
      statHelp50: document.getElementById('dsa-count-help50'),
      statCross: document.getElementById('dsa-count-cross'),
      chipSelf: document.getElementById('dsa-stat-self'),
      chipHelp30: document.getElementById('dsa-stat-help30'),
      chipHelp50: document.getElementById('dsa-stat-help50'),
      chipCross: document.getElementById('dsa-stat-cross'),
      searchInput: document.getElementById('dsa-search-input'),
      searchClearBtn: document.getElementById('dsa-search-clear'),
      searchKbd: document.getElementById('dsa-search-kbd'),
      resultsBadge: document.getElementById('dsa-results-badge'),
      quickChips: document.querySelectorAll('[data-quick-filter]'),
      diffSegments: document.querySelectorAll('[data-filter-diff]'),
      statusSegments: document.querySelectorAll('[data-filter-status]'),
      resetBtn: document.getElementById('dsa-btn-reset'),
      resetModal: document.getElementById('dsa-reset-modal'),
      cancelResetBtn: document.getElementById('dsa-btn-cancel-reset'),
      confirmResetBtn: document.getElementById('dsa-btn-confirm-reset'),
      sidebarNavList: document.getElementById('dsa-sidebar-nav-list'),
      questionsContainer: document.getElementById('dsa-questions-container'),
      emptyState: document.getElementById('dsa-empty-state'),
      btnClearFilters: document.getElementById('dsa-btn-clear-filters')
    };

    // Initial renders
    renderSidebarNav();
    updateProgressUI();
    renderQuestions();
    handleResponsiveLayout();

    // Attach event listeners
    attachEventListeners();
    setupScrollSpy();
  }

  /**
   * Computes overall statistics from roadmap data and current progress
   */
  function computeStats() {
    let total = 0;
    let solved = 0;
    const diffStats = {
      Easy: { total: 0, solved: 0 },
      Medium: { total: 0, solved: 0 },
      Hard: { total: 0, solved: 0 }
    };
    const evaluations = Storage.get('dsa_roadmap_evaluations', {}) || {};

    window.dsaRoadmap.forEach(cat => {
      cat.patterns.forEach(pat => {
        pat.questions.forEach(q => {
          total++;
          const isDone = !!progress[q.id] || !!evaluations[q.id];
          if (isDone) solved++;

          if (diffStats[q.difficulty]) {
            diffStats[q.difficulty].total++;
            if (isDone) diffStats[q.difficulty].solved++;
          }
        });
      });
    });

    const pct = total > 0 ? Math.round((solved / total) * 100) : 0;

    return {
      total,
      solved,
      remaining: total - solved,
      pct,
      diffStats
    };
  }

  /**
   * Computes statistics for a specific category
   */
  function computeCategoryStats(cat) {
    let total = 0;
    let solved = 0;
    const evaluations = Storage.get('dsa_roadmap_evaluations', {}) || {};

    cat.patterns.forEach(pat => {
      pat.questions.forEach(q => {
        total++;
        if (progress[q.id] || evaluations[q.id]) solved++;
      });
    });

    return { total, solved };
  }

  /**
   * Updates all progress counters and progress bars in real time
   */
  function updateProgressUI() {
    const stats = computeStats();

    if (dom.totalSolvedCount) {
      dom.totalSolvedCount.textContent = `${stats.solved} / ${stats.total}`;
    }
    if (dom.totalRemainingCount) {
      dom.totalRemainingCount.textContent = `${stats.remaining} remaining`;
    }
    if (dom.progressFill) {
      dom.progressFill.style.width = `${stats.pct}%`;
    }
    if (dom.pctBadge) {
      dom.pctBadge.textContent = `${stats.pct}%`;
    }

    // Difficulty breakdown
    ['Easy', 'Medium', 'Hard'].forEach(diff => {
      const diffKey = diff.toLowerCase();
      const countEl = dom[`${diffKey}Count`];
      const fillEl = dom[`${diffKey}Fill`];
      const data = stats.diffStats[diff];

      if (countEl && data) {
        countEl.textContent = `${data.solved} / ${data.total}`;
      }
      if (fillEl && data) {
        const diffPct = data.total > 0 ? (data.solved / data.total) * 100 : 0;
        fillEl.style.width = `${diffPct}%`;
      }
    });

    // Update honesty breakdown counts
    let countSelf = 0;
    let countHelp30 = 0;
    let countHelp50 = 0;
    let countCross = 0;

    const evaluations = Storage.get('dsa_roadmap_evaluations', {}) || {};
    window.dsaRoadmap.forEach(cat => {
      cat.patterns.forEach(pat => {
        pat.questions.forEach(q => {
          const ev = evaluations[q.id];
          if (ev === 'self') countSelf++;
          else if (ev === 'help30' || ev === 'help') countHelp30++;
          else if (ev === 'help50') countHelp50++;
          else if (ev === 'cross') countCross++;
          else if (progress[q.id]) countSelf++;
        });
      });
    });

    if (dom.statSelf) dom.statSelf.textContent = countSelf;
    if (dom.statHelp30) dom.statHelp30.textContent = countHelp30;
    if (dom.statHelp50) dom.statHelp50.textContent = countHelp50;
    if (dom.statCross) dom.statCross.textContent = countCross;

    // Update sidebar counts
    window.dsaRoadmap.forEach(cat => {
      const countBadge = document.getElementById(`nav-count-${cat.id}`);
      if (countBadge) {
        const catStats = computeCategoryStats(cat);
        countBadge.textContent = `${catStats.solved}/${catStats.total}`;
      }

      const catBadge = document.getElementById(`cat-badge-${cat.id}`);
      if (catBadge) {
        const catStats = computeCategoryStats(cat);
        catBadge.textContent = `${catStats.solved} / ${catStats.total} Solved`;
        if (catStats.solved === catStats.total && catStats.total > 0) {
          catBadge.classList.add('all-solved');
        } else {
          catBadge.classList.remove('all-solved');
        }
      }
    });
  }

  /**
   * Renders the sidebar navigation index for the 16 roadmap categories
   */
  function renderSidebarNav() {
    if (!dom.sidebarNavList) return;

    dom.sidebarNavList.innerHTML = window.dsaRoadmap.map((cat, idx) => {
      const catStats = computeCategoryStats(cat);
      const indexStr = String(idx + 1).padStart(2, '0');
      const catName = cat.name || cat.title || 'Category';

      return `
        <a href="#category-${cat.id}" class="dsa-nav-item" data-category-id="${cat.id}">
          <div class="dsa-nav-item-left">
            <span class="dsa-nav-num">${indexStr}</span>
            <span class="dsa-nav-name" title="${escapeHtml(catName)}">${escapeHtml(catName)}</span>
          </div>
          <span class="dsa-nav-count" id="nav-count-${cat.id}">${catStats.solved}/${catStats.total}</span>
        </a>
      `;
    }).join('');

    // Smooth scrolling on click
    dom.sidebarNavList.querySelectorAll('.dsa-nav-item').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Update active link styling
          dom.sidebarNavList.querySelectorAll('.dsa-nav-item').forEach(el => el.classList.remove('is-active'));
          link.classList.add('is-active');
        }
      });
    });
  }

  /**
   * Highlights matching search tokens in text for a Pro Searcher experience
   */
  function highlightMatch(text, searchStr) {
    if (!searchStr || !searchStr.trim()) return escapeHtml(text);
    const cleanQuery = searchStr.trim().replace(/^#+/, '').trim();
    if (!cleanQuery) return escapeHtml(text);

    const tokens = cleanQuery.split(/\s+/).filter(t => t.length > 0);
    if (!tokens.length) return escapeHtml(text);

    const pattern = tokens.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
    try {
      const regex = new RegExp(`(${pattern})`, 'gi');
      const parts = text.split(regex);
      return parts.map(part => {
        if (tokens.some(t => t.toLowerCase() === part.toLowerCase())) {
          return `<mark class="dsa-search-highlight">${escapeHtml(part)}</mark>`;
        }
        return escapeHtml(part);
      }).join('');
    } catch (e) {
      return escapeHtml(text);
    }
  }

  /**
   * Filters and renders question categories and rows with Smart Search matching
   */
  function renderQuestions() {
    if (!dom.questionsContainer) return;

    const rawQuery = filterState.search.toLowerCase().trim();
    const cleanTokens = rawQuery.replace(/^#+/, '').split(/\s+/).filter(Boolean);
    let visibleCategoriesCount = 0;
    let visibleQuestionsCount = 0;
    currentVisibleQuestionsList = [];

    const categoriesHtml = window.dsaRoadmap.map((cat, catIdx) => {
      const catStats = computeCategoryStats(cat);
      const catIndexStr = String(catIdx + 1).padStart(2, '0');
      const catName = cat.name || cat.title || 'Category';

      // Filter patterns and questions
      const matchingPatterns = cat.patterns.map(pat => {
        const matchingQuestions = pat.questions.filter(q => {
          const lcNum = q.leetcodeNumber || q.number || '';
          const dsName = q.pattern || catName;
          const patName = q.subPattern || pat.name || '';

          // Multi-token Smart Search filter
          if (cleanTokens.length > 0) {
            const searchableStr = `${q.title} #${lcNum} ${lcNum} ${patName} ${dsName} ${catName} ${q.difficulty}`.toLowerCase();
            const matchesAllTokens = cleanTokens.every(token => searchableStr.includes(token));
            if (!matchesAllTokens) {
              return false;
            }
          }

          // Difficulty filter
          if (filterState.difficulty !== 'all') {
            if (q.difficulty.toLowerCase() !== filterState.difficulty.toLowerCase()) {
              return false;
            }
          }

          // Status filter
          const roadmapEvaluations = Storage.get('dsa_roadmap_evaluations', {}) || {};
          const ev = roadmapEvaluations[q.id];
          const isSolved = !!progress[q.id] || !!ev;
          const isReviewed = !!reviews[q.id] || ev === 'help30' || ev === 'help' || ev === 'help50' || ev === 'cross';
          if (filterState.status === 'solved' && !isSolved) return false;
          if (filterState.status === 'unsolved' && isSolved) return false;
          if (filterState.status === 'review' && !isReviewed) return false;

          // Solve Quality filter (Self, 30% Help, 50% Help, Copied)
          if (filterState.quality !== 'all') {
            if (filterState.quality === 'self' && !(ev === 'self' || (!ev && isSolved))) return false;
            if (filterState.quality === 'help30' && !(ev === 'help30' || ev === 'help')) return false;
            if (filterState.quality === 'help50' && ev !== 'help50') return false;
            if (filterState.quality === 'cross' && ev !== 'cross') return false;
          }

          currentVisibleQuestionsList.push(q);
          return true;
        });

        visibleQuestionsCount += matchingQuestions.length;

        return {
          ...pat,
          visibleQuestions: matchingQuestions
        };
      }).filter(pat => pat.visibleQuestions.length > 0);

      // If no patterns have matching questions, skip this category
      if (matchingPatterns.length === 0) {
        return '';
      }

      visibleCategoriesCount++;

      const patternsHtml = matchingPatterns.map(pat => {
        const questionsHtml = pat.visibleQuestions.map(q => {
          const roadmapEvaluations = Storage.get('dsa_roadmap_evaluations', {}) || {};
          const ev = roadmapEvaluations[q.id];
          const isSolved = !!progress[q.id] || !!ev;
          const isReviewed = !!reviews[q.id];
          const diffClass = q.difficulty.toLowerCase();
          const lcNum = q.leetcodeNumber || q.number || '';
          const lcUrl = q.leetcodeUrl || q.url || '#';
          const dsName = q.pattern || catName;
          const patName = q.subPattern || pat.name || 'General';
          const titleHtml = highlightMatch(q.title, filterState.search);

          // Checkbox Box Custom Styling & Exact Modal Evaluation Icon (NO LOCKS ON ROADMAP)
          let boxCustomClass = 'pl-eval-box';
          let boxIconHtml = '';
          let evalPillHtml = '';
          let rowStatusClass = '';

          if (ev === 'self') {
            rowStatusClass = 'is-solved status-self';
            boxCustomClass += ' pl-eval-box-self dsa-checkbox-checked';
            boxIconHtml = '<span class="material-symbols-outlined text-[15px] leading-none text-white">verified</span>';
            evalPillHtml = `
              <button class="pl-eval-pill pl-eval-pill-self dsa-trigger-eval cursor-pointer" data-qid="${q.id}" title="Click to change solve evaluation">
                <span class="material-symbols-outlined text-[14px]">verified</span>
                <span>100% Self</span>
              </button>
            `;
          } else if (ev === 'help30' || ev === 'help') {
            rowStatusClass = 'is-solved status-help';
            boxCustomClass += ' pl-eval-box-help30 dsa-checkbox-checked';
            boxIconHtml = '<span class="material-symbols-outlined text-[15px] leading-none text-white">psychology</span>';
            evalPillHtml = `
              <button class="pl-eval-pill pl-eval-pill-help30 dsa-trigger-eval cursor-pointer" data-qid="${q.id}" title="Click to change solve evaluation">
                <span class="material-symbols-outlined text-[14px]">psychology</span>
                <span>30% Help</span>
              </button>
            `;
          } else if (ev === 'help50') {
            rowStatusClass = 'is-solved status-help50';
            boxCustomClass += ' pl-eval-box-help50 dsa-checkbox-checked';
            boxIconHtml = '<span class="material-symbols-outlined text-[15px] leading-none text-white">smart_toy</span>';
            evalPillHtml = `
              <button class="pl-eval-pill pl-eval-pill-help50 dsa-trigger-eval cursor-pointer" data-qid="${q.id}" title="Click to change solve evaluation">
                <span class="material-symbols-outlined text-[14px]">smart_toy</span>
                <span>50% Help</span>
              </button>
            `;
          } else if (ev === 'cross') {
            rowStatusClass = 'is-solved status-cross';
            boxCustomClass += ' pl-eval-box-cross dsa-checkbox-cross';
            boxIconHtml = '<span class="material-symbols-outlined text-[15px] leading-none text-white">content_paste_off</span>';
            evalPillHtml = `
              <button class="pl-eval-pill pl-eval-pill-cross dsa-trigger-eval cursor-pointer" data-qid="${q.id}" title="Click to change solve evaluation">
                <span class="material-symbols-outlined text-[14px]">content_paste_off</span>
                <span>Cross ✗</span>
              </button>
            `;
          } else if (isSolved) {
            rowStatusClass = 'is-solved status-self';
            boxCustomClass += ' pl-eval-box-self dsa-checkbox-checked';
            boxIconHtml = '<span class="material-symbols-outlined text-[15px] leading-none text-white">verified</span>';
            evalPillHtml = `
              <button class="pl-eval-pill pl-eval-pill-self dsa-trigger-eval cursor-pointer" data-qid="${q.id}" title="Click to change solve evaluation">
                <span class="material-symbols-outlined text-[14px]">verified</span>
                <span>100% Self</span>
              </button>
            `;
          } else {
            boxCustomClass += ' pl-eval-box-empty';
            boxIconHtml = '';
            evalPillHtml = `
              <button class="pl-eval-pill pl-eval-pill-unattempted dsa-trigger-eval cursor-pointer" data-qid="${q.id}" title="Click to evaluate your solve">
                <span class="material-symbols-outlined text-[14px]">rate_review</span>
                <span>Rate Solve</span>
              </button>
            `;
          }

          return `
            <div class="dsa-question-row ${rowStatusClass} hover:bg-slate-50 transition-colors" id="row-${q.id}">
              <div class="dsa-question-left">
                <button class="dsa-checkbox-container dsa-trigger-eval cursor-pointer border-0 bg-transparent p-0" data-qid="${q.id}" title="Rate how you solved this problem" aria-label="Evaluate solve for ${escapeHtml(q.title)}">
                  <span class="dsa-checkbox-custom ${boxCustomClass}">
                    ${boxIconHtml}
                  </span>
                </button>
                <span class="dsa-lc-num">#${lcNum}</span>
                <div class="dsa-question-info">
                  <div class="dsa-question-title-wrap">
                    <span class="dsa-question-title font-medium text-on-surface" title="${escapeHtml(q.title)}">${titleHtml}</span>
                    ${isReviewed ? `<span class="inline-flex items-center text-amber-500 ml-1.5" title="In Review (★)"><span class="material-symbols-outlined text-[15px]">star</span></span>` : ''}
                  </div>
                  <div class="dsa-question-tags">
                    <span class="dsa-tag-ds" title="Data Structure: ${escapeHtml(dsName)}">
                      <span class="material-symbols-outlined text-[12px]">schema</span>
                      <span>${escapeHtml(dsName)}</span>
                    </span>
                    <span class="dsa-tag-pattern" title="Pattern: ${escapeHtml(patName)}">
                      <span class="material-symbols-outlined text-[12px]">alt_route</span>
                      <span>${escapeHtml(patName)}</span>
                    </span>
                  </div>
                </div>
              </div>
              <div class="dsa-question-right">
                ${evalPillHtml}
                <span class="dsa-badge-diff dsa-badge-${diffClass}">${q.difficulty}</span>
                <a href="${lcUrl}" target="_blank" rel="noopener noreferrer" class="dsa-btn-leetcode" title="Solve on LeetCode" aria-label="Solve ${escapeHtml(q.title)} on LeetCode">
                  <span>Solve</span>
                  <span class="material-symbols-outlined text-[14px]">open_in_new</span>
                </a>
              </div>
            </div>
          `;
        }).join('');

        return `
          <div class="dsa-pattern-group">
            <div class="dsa-pattern-group-header">
              <div class="dsa-pattern-title-area">
                <h4 class="dsa-pattern-title">${escapeHtml(pat.name)}</h4>
                ${pat.tip ? `<span class="dsa-pattern-tip">• ${escapeHtml(pat.tip)}</span>` : ''}
              </div>
              <span class="dsa-pattern-count-badge">${pat.visibleQuestions.length} Problem${pat.visibleQuestions.length > 1 ? 's' : ''}</span>
            </div>
            <div class="dsa-question-list">
              ${questionsHtml}
            </div>
          </div>
        `;
      }).join('');

      return `
        <article class="dsa-category-card" id="category-${cat.id}">
          <header class="dsa-category-header">
            <div class="dsa-category-title-wrap">
              <span class="dsa-category-index-badge">${catIndexStr}</span>
              <div>
                <h3 class="dsa-category-name">
                  ${cat.icon ? `<span class="material-symbols-outlined text-indigo-600 text-xl">${cat.icon}</span>` : ''}
                  <span>${escapeHtml(catName)}</span>
                </h3>
                <p class="dsa-category-desc">${escapeHtml(cat.description || '')}</p>
              </div>
            </div>
            <span class="dsa-category-meta-badge ${catStats.solved === catStats.total && catStats.total > 0 ? 'all-solved' : ''}" id="cat-badge-${cat.id}">
              ${catStats.solved} / ${catStats.total} Solved
            </span>
          </header>
          <div class="dsa-category-body">
            ${patternsHtml}
          </div>
        </article>
      `;
    }).join('');

    dom.questionsContainer.innerHTML = categoriesHtml;

    // Update results counter badge
    if (dom.resultsBadge) {
      const stats = computeStats();
      const totalRoadmapQuestions = stats.total || 260;
      const isFiltered = filterState.search || filterState.difficulty !== 'all' || filterState.status !== 'all' || filterState.quality !== 'all';
      if (filterState.quality !== 'all') {
        const qualityLabels = {
          self: '100% Self',
          help30: '30% Help',
          help50: '50% Help',
          cross: 'Copied'
        };
        dom.resultsBadge.textContent = `${visibleQuestionsCount} of ${totalRoadmapQuestions} (${qualityLabels[filterState.quality] || filterState.quality})`;
      } else if (isFiltered) {
        dom.resultsBadge.textContent = `${visibleQuestionsCount} of ${totalRoadmapQuestions} Problems`;
      } else {
        dom.resultsBadge.textContent = `${totalRoadmapQuestions} Problems`;
      }
    }

    // Show/hide empty state
    if (visibleCategoriesCount === 0) {
      if (dom.emptyState) dom.emptyState.classList.remove('hidden');
      if (dom.questionsContainer) dom.questionsContainer.classList.add('hidden');
    } else {
      if (dom.emptyState) dom.emptyState.classList.add('hidden');
      if (dom.questionsContainer) dom.questionsContainer.classList.remove('hidden');
    }
  }

  /**
   * Attaches interactive event listeners
   */
  function attachEventListeners() {
    // 1. Delegated click on questions container to open Problem Detail or Honesty Evaluation
    if (dom.questionsContainer) {
      dom.questionsContainer.addEventListener('click', (e) => {
        // Direct LeetCode external solve link should open target="_blank"
        if (e.target.closest('.dsa-btn-leetcode')) return;

        // Honesty evaluation modal trigger
        const evalTrigger = e.target.closest('.dsa-trigger-eval');
        if (evalTrigger) {
          e.preventDefault();
          e.stopPropagation();

          const qid = evalTrigger.dataset.qid;
          if (!qid) return;

          if (window.DsaPatternController && typeof window.DsaPatternController.openSolveEvaluationModal === 'function') {
            window.DsaPatternController.openSolveEvaluationModal(qid, 'roadmap');
          } else {
            window.dispatchEvent(new CustomEvent('openDsaSolveModal', { detail: { qid, context: 'roadmap' } }));
          }
          return;
        }

        // Question explanation trigger (ONLY when clicking dedicated Explain button)
        const explainTrigger = e.target.closest('.dsa-btn-explain, [data-open-explain]');
        if (explainTrigger) {
          e.preventDefault();
          e.stopPropagation();

          const qid = explainTrigger.dataset.openExplain || explainTrigger.dataset.openDetail || explainTrigger.dataset.qid;
          if (qid && window.DsaProblemController && typeof window.DsaProblemController.openProblemDetail === 'function') {
            window.DsaProblemController.openProblemDetail(qid, currentVisibleQuestionsList, 'roadmap');
          }
          return;
        }
      });

      // Backward-compatible change listener if an input checkbox is used
      dom.questionsContainer.addEventListener('change', (e) => {
        const checkbox = e.target.closest('.dsa-checkbox-input');
        if (!checkbox) return;

        const qid = checkbox.dataset.qid;
        if (!qid) return;

        const isChecked = checkbox.checked;
        if (isChecked) {
          progress[qid] = true;
        } else {
          delete progress[qid];
        }

        Storage.set('dsa_progress', progress);

        window.dispatchEvent(new CustomEvent('dsaProgressSync', {
          detail: { qid, isChecked, source: 'roadmap' }
        }));

        updateProgressUI();
        renderQuestions();
      });
    }

    // Helper: update clear icon & kbd shortcut visibility
    function updateSearchControls() {
      const hasText = filterState.search.trim().length > 0;
      if (dom.searchClearBtn) {
        dom.searchClearBtn.classList.toggle('visible', hasText);
      }
      if (dom.searchKbd) {
        dom.searchKbd.style.display = hasText ? 'none' : 'inline-flex';
      }
    }

    // Helper: sync quick filter chips active state
    function syncQuickChips() {
      if (!dom.quickChips) return;
      const currentQuery = filterState.search.trim().toLowerCase();
      dom.quickChips.forEach(chip => {
        const chipVal = chip.dataset.quickFilter.toLowerCase();
        if (currentQuery === chipVal) {
          chip.classList.add('active');
        } else {
          chip.classList.remove('active');
        }
      });
    }

    // Helper: clear search
    function clearSearch() {
      if (dom.searchInput) {
        dom.searchInput.value = '';
      }
      filterState.search = '';
      updateSearchControls();
      syncQuickChips();
      renderQuestions();
    }

    // 2. Search input filtering
    if (dom.searchInput) {
      dom.searchInput.addEventListener('input', (e) => {
        filterState.search = e.target.value;
        updateSearchControls();
        syncQuickChips();
        renderQuestions();
      });
    }

    // Clear search button
    if (dom.searchClearBtn) {
      dom.searchClearBtn.addEventListener('click', () => {
        clearSearch();
        if (dom.searchInput) dom.searchInput.focus();
      });
    }

    // 3. Quick filter suggestion chips
    if (dom.quickChips) {
      dom.quickChips.forEach(chip => {
        chip.addEventListener('click', () => {
          const val = chip.dataset.quickFilter;
          if (filterState.search.trim().toLowerCase() === val.toLowerCase()) {
            clearSearch();
          } else {
            filterState.search = val;
            if (dom.searchInput) {
              dom.searchInput.value = val;
              dom.searchInput.focus();
            }
            updateSearchControls();
            syncQuickChips();
            renderQuestions();
          }
        });
      });
    }

    // 4. Global Keyboard Shortcuts (Ctrl+K, Cmd+K, /, Esc)
    document.addEventListener('keydown', (e) => {
      // Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (dom.searchInput) {
          dom.searchInput.focus();
          dom.searchInput.select();
        }
      } else if (e.key === '/' && document.activeElement !== dom.searchInput && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) {
        e.preventDefault();
        if (dom.searchInput) {
          dom.searchInput.focus();
        }
      } else if (e.key === 'Escape' && document.activeElement === dom.searchInput) {
        e.preventDefault();
        clearSearch();
        dom.searchInput.blur();
      }
    });

    // 5. Difficulty Segment Filter
    if (dom.diffSegments) {
      dom.diffSegments.forEach(btn => {
        btn.addEventListener('click', () => {
          dom.diffSegments.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          filterState.difficulty = btn.dataset.filterDiff;
          renderQuestions();
        });
      });
    }

    // 6. Status Segment Filter
    if (dom.statusSegments) {
      dom.statusSegments.forEach(btn => {
        btn.addEventListener('click', () => {
          dom.statusSegments.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          filterState.status = btn.dataset.filterStatus;
          renderQuestions();
        });
      });
    }

    // 6b. Solve Quality filter chips
    function updateQualityChipsUI() {
      [
        { el: dom.chipSelf, quality: 'self' },
        { el: dom.chipHelp30, quality: 'help30' },
        { el: dom.chipHelp50, quality: 'help50' },
        { el: dom.chipCross, quality: 'cross' }
      ].forEach(({ el, quality }) => {
        if (el) {
          el.classList.toggle('is-active', filterState.quality === quality);
        }
      });
    }

    [
      { el: dom.chipSelf, quality: 'self', label: '100% Self' },
      { el: dom.chipHelp30, quality: 'help30', label: '~30% AI Help' },
      { el: dom.chipHelp50, quality: 'help50', label: '~50% Editorial Help' },
      { el: dom.chipCross, quality: 'cross', label: 'Copied Solution' }
    ].forEach(({ el, quality, label }) => {
      if (el) {
        el.classList.add('is-interactive');
        el.setAttribute('role', 'button');
        el.setAttribute('tabindex', '0');
        el.setAttribute('title', `Click to filter problems solved with ${label}`);
        el.addEventListener('click', () => {
          filterState.quality = (filterState.quality === quality) ? 'all' : quality;
          updateQualityChipsUI();
          renderQuestions();
        });
      }
    });

    // 7. Clear Filters button in empty state
    if (dom.btnClearFilters) {
      dom.btnClearFilters.addEventListener('click', () => {
        filterState.search = '';
        filterState.difficulty = 'all';
        filterState.status = 'all';
        filterState.quality = 'all';
        updateQualityChipsUI();

        if (dom.searchInput) dom.searchInput.value = '';
        updateSearchControls();
        syncQuickChips();

        if (dom.diffSegments) {
          dom.diffSegments.forEach(b => {
            if (b.dataset.filterDiff === 'all') b.classList.add('active');
            else b.classList.remove('active');
          });
        }

        if (dom.statusSegments) {
          dom.statusSegments.forEach(b => {
            if (b.dataset.filterStatus === 'all') b.classList.add('active');
            else b.classList.remove('active');
          });
        }

        renderQuestions();
      });
    }

    // 8. Reset Progress Modal Controls
    if (dom.resetBtn && dom.resetModal) {
      dom.resetBtn.addEventListener('click', () => {
        dom.resetModal.classList.remove('hidden');
        dom.resetModal.classList.add('open');
      });
    }

    if (dom.cancelResetBtn && dom.resetModal) {
      dom.cancelResetBtn.addEventListener('click', () => {
        dom.resetModal.classList.remove('open');
        dom.resetModal.classList.add('hidden');
      });
    }

    // Close modal if clicked outside modal content
    if (dom.resetModal) {
      dom.resetModal.addEventListener('click', (e) => {
        if (e.target === dom.resetModal) {
          dom.resetModal.classList.remove('open');
          dom.resetModal.classList.add('hidden');
        }
      });
    }

    // Confirm Reset
    if (dom.confirmResetBtn && dom.resetModal) {
      dom.confirmResetBtn.addEventListener('click', () => {
        Storage.remove('dsa_progress');
        Storage.set('dsa_progress', {});
        Storage.set('dsa_roadmap_evaluations', {});
        progress = {};
        dom.resetModal.classList.remove('open');
        dom.resetModal.classList.add('hidden');
        updateProgressUI();
        renderQuestions();
        if (typeof showToast === 'function') {
          showToast('All DSA progress has been reset successfully.', 'info');
        }
        window.dispatchEvent(new CustomEvent('dsaProgressSync', {
          detail: { source: 'roadmapReset' }
        }));
      });
    }

    // 9. Roadmap progress sync listeners
    window.addEventListener('dsaRoadmapProgressSync', () => {
      progress = Storage.get('dsa_progress', {}) || {};
      reviews = Storage.get('dsa_reviews', {}) || {};
      updateProgressUI();
      renderQuestions();
    });

    window.addEventListener('dsaProgressSync', (e) => {
      if (e.detail && (e.detail.source === 'patternLearning' || e.detail.source === 'patternReset')) {
        // Pattern Learning changes must NEVER affect DSA Roadmap!
        return;
      }
      if (e.detail && e.detail.source === 'roadmap') return;
      if (e.detail && e.detail.source === 'roadmapReset') {
        progress = {};
        updateProgressUI();
        renderQuestions();
        return;
      }
      progress = Storage.get('dsa_progress', {}) || {};
      reviews = Storage.get('dsa_reviews', {}) || {};
      updateProgressUI();
      renderQuestions();
    });

    // 10. Review status sync listener
    window.addEventListener('dsaReviewSync', () => {
      reviews = Storage.get('dsa_reviews', {}) || {};
      renderQuestions();
    });

    // 11. Viewport detection and responsive layout listener
    window.addEventListener('resize', handleResponsiveLayout);

    // 12. Category slider navigation arrows (Prev/Next)
    const navPrevBtn = document.getElementById('dsa-nav-prev');
    const navNextBtn = document.getElementById('dsa-nav-next');
    if (navPrevBtn && dom.sidebarNavList) {
      navPrevBtn.addEventListener('click', () => {
        dom.sidebarNavList.scrollBy({ left: -220, behavior: 'smooth' });
      });
    }
    if (navNextBtn && dom.sidebarNavList) {
      navNextBtn.addEventListener('click', () => {
        dom.sidebarNavList.scrollBy({ left: 220, behavior: 'smooth' });
      });
    }

    // 13. Floating Jump-to-Section Up Button (Appears only when reaching this section)
    const scrollToSectionBtn = document.getElementById('dsa-scroll-to-section-btn');
    if (scrollToSectionBtn) {
      function updateScrollBtn() {
        const roadmapView = document.getElementById('dsa-roadmap-view');
        // Arrow button is only for Roadmap category options; never show in Pattern Learning
        if (!roadmapView || roadmapView.classList.contains('hidden') || roadmapView.offsetParent === null) {
          scrollToSectionBtn.classList.remove('is-visible');
          return;
        }

        const workspace = document.querySelector('.dsa-workspace');
        if (!workspace) return;
        const rect = workspace.getBoundingClientRect();
        // Appears only when the user scrolls down to reach this category options section
        if (rect.top <= 120) {
          scrollToSectionBtn.classList.add('is-visible');
        } else {
          scrollToSectionBtn.classList.remove('is-visible');
        }
      }

      window.addEventListener('scroll', updateScrollBtn, { passive: true });
      updateScrollBtn();

      scrollToSectionBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const workspace = document.querySelector('.dsa-workspace');
        if (workspace) {
          const topOffset = workspace.getBoundingClientRect().top + window.pageYOffset - 16;
          window.scrollTo({
            top: Math.max(0, topOffset),
            behavior: 'smooth'
          });
        }
      });
    }
  }

  /**
   * Detects current viewport width on initial render and window resize,
   * ensuring the responsive horizontal category/pattern slider is properly initialized.
   */
  function handleResponsiveLayout() {
    const isMobileOrTablet = window.innerWidth <= 1099;
    if (dom.sidebarNavList) {
      if (isMobileOrTablet) {
        dom.sidebarNavList.classList.add('dsa-nav-slider');
      } else {
        dom.sidebarNavList.classList.remove('dsa-nav-slider');
      }
    }
  }

  /**
   * Sets up ScrollSpy to highlight the active category in the sidebar nav
   */
  function setupScrollSpy() {
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const categoryId = entry.target.id.replace('category-', '');
          const navItems = document.querySelectorAll('.dsa-nav-item');
          navItems.forEach(item => {
            if (item.dataset.categoryId === categoryId) {
              item.classList.add('is-active');
              // When in responsive slider mode, scroll active category item smoothly into center
              if (dom.sidebarNavList && window.innerWidth <= 1099) {
                item.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
              }
            } else {
              item.classList.remove('is-active');
            }
          });
        }
      });
    }, {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    });

    // Observe all category cards
    document.querySelectorAll('.dsa-category-card').forEach(card => {
      observer.observe(card);
    });
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
