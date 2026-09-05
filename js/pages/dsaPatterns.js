/**
 * DevPilot-AI — DSA Pattern Learning Controller
 * Handles Pattern Learning dashboard metrics, Today's Pattern recommendation,
 * Weak Patterns detection, Pattern Catalog filtering/search, Dedicated Pattern
 * Study View (12-point curriculum, C++ copy, walkthrough trace, inline quiz),
 * 'Identify the Pattern' Training Arena, and bidirectional progress synchronization.
 */

(function () {
  'use strict';

  // Global namespace for pattern controller
  window.DsaPatternController = {};

  // State
  let dsaProgress = {};
  let patternStats = {};
  let currentPattern = null;
  let currentArenaIndex = 0;
  let arenaScore = { correct: 0, total: 0, streak: 0 };

  const catalogFilterState = {
    search: '',
    category: 'all',
    mastery: 'all'
  };

  // DOM Elements cache
  let dom = {};

  /**
   * Initializes the Pattern Learning Module
   */
  function init() {
    // Check data availability
    if (!window.dsaPatternsRoadmap || !window.dsaAllQuestions) {
      console.warn('Pattern Learning data not loaded yet.');
      return;
    }

    // Load progress from Storage
    dsaProgress = Storage.get('dsa_progress', {}) || {};
    patternStats = Storage.get('dsa_pattern_stats', {
      viewed: {},
      quizzes: {},
      weak: {}
    }) || { viewed: {}, quizzes: {}, weak: {} };

    // Cache elements
    dom = {
      // Main container & views
      container: document.getElementById('dsa-pattern-learning-view'),
      roadmapView: document.getElementById('dsa-roadmap-view'),
      tabRoadmap: document.getElementById('tab-btn-roadmap'),
      tabPatterns: document.getElementById('tab-btn-patterns'),

      // Dashboard stats
      metricLearned: document.getElementById('pl-stat-learned'),
      metricPracticed: document.getElementById('pl-stat-practiced'),
      metricMastered: document.getElementById('pl-stat-mastered'),
      metricWeak: document.getElementById('pl-stat-weak'),

      // Reset Modal & Buttons
      btnReset: document.getElementById('pl-btn-reset'),
      resetModal: document.getElementById('pl-reset-modal'),
      btnCancelReset: document.getElementById('pl-btn-cancel-reset'),
      btnConfirmReset: document.getElementById('pl-btn-confirm-reset'),

      // Weak patterns banner/section
      weakBanner: document.getElementById('pl-weak-section'),
      weakChipsList: document.getElementById('pl-weak-chips'),

      // Arena launcher
      btnLaunchArena: document.getElementById('pl-btn-launch-arena'),
      arenaModal: document.getElementById('pl-arena-modal'),
      btnCloseArena: document.getElementById('pl-arena-close'),
      arenaContainer: document.getElementById('pl-arena-content'),

      // Catalog view
      catalogSection: document.getElementById('pl-catalog-section'),
      catalogSearch: document.getElementById('pl-catalog-search'),
      catalogClearSearch: document.getElementById('pl-catalog-search-clear'),
      categoryChipsContainer: document.getElementById('pl-category-chips'),
      masteryFilterSegments: document.querySelectorAll('[data-pl-mastery]'),
      patternCardsGrid: document.getElementById('pl-pattern-cards-grid'),
      catalogCountBadge: document.getElementById('pl-catalog-count-badge'),
      catalogEmptyState: document.getElementById('pl-catalog-empty'),

      // Dedicated Pattern Study View
      studyViewSection: document.getElementById('pl-study-view-section'),
      btnBackToCatalog: document.getElementById('pl-btn-back-catalog'),
      studyViewContainer: document.getElementById('pl-study-container')
    };

    // Render components
    renderDashboard();
    renderCategoryChips();
    renderPatternCatalog();

    // Attach listeners
    attachEventListeners();

    // Listen for progress updates across views
    window.addEventListener('dsaProgressSync', onProgressSync);
  }

  /**
   * Calculates the mastery level for a pattern:
   * 'Not Started' | 'Learning' | 'Practicing' | 'Mastered' | 'Weak'
   */
  function calculatePatternMastery(pattern) {
    const pid = pattern.id;
    const isWeak = !!patternStats.weak[pid];
    const isViewed = !!patternStats.viewed[pid];
    const quizRecord = patternStats.quizzes[pid];

    // Count solved questions for this pattern
    const questionIds = pattern.practiceQuestionIds || [];
    let solvedCount = 0;
    questionIds.forEach(qid => {
      if (dsaProgress[qid]) solvedCount++;
    });

    if (isWeak) return 'Weak';
    if (quizRecord && quizRecord.accuracy >= 80 && solvedCount >= 3) return 'Mastered';
    if (solvedCount > 0) return 'Practicing';
    if (isViewed || quizRecord) return 'Learning';
    return 'Not Started';
  }

  /**
   * Counts solved questions for a given pattern
   */
  function getPatternSolvedCount(pattern) {
    const questionIds = pattern.practiceQuestionIds || [];
    let solved = 0;
    questionIds.forEach(qid => {
      if (dsaProgress[qid]) solved++;
    });
    return { solved, total: questionIds.length };
  }

  /**
   * Renders dashboard metrics, Today's Pattern recommendation, and weak pattern notices
   */
  function renderDashboard() {
    const patterns = window.dsaPatternsRoadmap || [];
    let learnedCount = 0;
    let practicedCount = 0;
    let masteredCount = 0;
    const weakPatternsList = [];

    patterns.forEach(pat => {
      const mastery = calculatePatternMastery(pat);
      if (mastery === 'Mastered') masteredCount++;
      if (mastery === 'Practicing' || mastery === 'Mastered') practicedCount++;
      if (mastery !== 'Not Started') learnedCount++;
      if (mastery === 'Weak' || patternStats.weak[pat.id]) weakPatternsList.push(pat);
    });

    if (dom.metricLearned) dom.metricLearned.textContent = `${learnedCount} / ${patterns.length}`;
    if (dom.metricPracticed) dom.metricPracticed.textContent = `${practicedCount} / ${patterns.length}`;
    if (dom.metricMastered) dom.metricMastered.textContent = `${masteredCount} / ${patterns.length}`;
    if (dom.metricWeak) dom.metricWeak.textContent = `${weakPatternsList.length}`;

    // Weak patterns banner
    if (dom.weakBanner && dom.weakChipsList) {
      if (weakPatternsList.length > 0) {
        dom.weakBanner.classList.remove('hidden');
        dom.weakChipsList.innerHTML = weakPatternsList.map(pat => `
          <button class="pl-weak-chip" data-study-pattern="${pat.id}">
            <span class="material-symbols-outlined text-[14px] text-amber-500">warning</span>
            <span>${escapeHtml(pat.name)}</span>
            <span class="pl-weak-chip-arrow material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        `).join('');
      } else {
        dom.weakBanner.classList.add('hidden');
      }
    }
  }

  /**
   * Smart Today's Pattern recommendation logic:
   * Recommends a weak pattern first, or lowest mastery / unstarted pattern, rotated by date
   */
  function renderTodayRecommendation(patterns, weakPatternsList) {
    if (!patterns || patterns.length === 0) return;

    let target = null;

    // Priority 1: Weak pattern
    if (weakPatternsList.length > 0) {
      target = weakPatternsList[0];
    } else {
      // Priority 2: Not Started or Learning pattern rotated by day of year
      const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
      const unmastered = patterns.filter(p => calculatePatternMastery(p) !== 'Mastered');
      if (unmastered.length > 0) {
        target = unmastered[dayOfYear % unmastered.length];
      } else {
        target = patterns[dayOfYear % patterns.length];
      }
    }

    if (target && dom.todayPatternTitle) {
      dom.todayPatternTitle.textContent = target.name;
      if (dom.todayPatternCategory) dom.todayPatternCategory.textContent = target.categoryName;
      if (dom.todayPatternOneLiner) dom.todayPatternOneLiner.textContent = target.oneLiner;
      
      if (dom.todayPatternSignals) {
        const sigs = target.recognitionSignals ? target.recognitionSignals.slice(0, 3) : [];
        dom.todayPatternSignals.innerHTML = sigs.map(s => `
          <span class="pl-tag-signal">
            <span class="material-symbols-outlined text-[12px]">radar</span>
            <span>${escapeHtml(s)}</span>
          </span>
        `).join('');
      }

      if (dom.todayBtnStudy) {
        dom.todayBtnStudy.dataset.studyPattern = target.id;
      }
    }
  }

  /**
   * Renders the category chips filter bar
   */
  function renderCategoryChips() {
    if (!dom.categoryChipsContainer) return;

    const categories = [
      { id: 'all', name: 'All Categories' },
      { id: 'array', name: 'Array' },
      { id: 'string', name: 'String' },
      { id: 'hash-map', name: 'Hash Map' },
      { id: 'stack', name: 'Stack' },
      { id: 'queue-deque', name: 'Queue / Deque' },
      { id: 'linked-list', name: 'Linked List' },
      { id: 'trees', name: 'Trees' },
      { id: 'recursion', name: 'Recursion' },
      { id: 'heap', name: 'Heap' },
      { id: 'graphs', name: 'Graphs' },
      { id: 'trie', name: 'Trie' },
      { id: 'dp', name: 'DP' },
      { id: 'greedy', name: 'Greedy' },
      { id: 'bit-manipulation', name: 'Bit Manipulation' },
      { id: 'sorting', name: 'Sorting' },
      { id: 'range-structures', name: 'Range Structures' }
    ];

    dom.categoryChipsContainer.innerHTML = categories.map(cat => `
      <button type="button" class="pl-category-chip ${catalogFilterState.category === cat.id ? 'active' : ''}" data-cat="${cat.id}">
        ${escapeHtml(cat.name)}
      </button>
    `).join('');
  }

  /**
   * Renders the Pattern Catalog grid of pattern cards
   */
  function renderPatternCatalog() {
    if (!dom.patternCardsGrid) return;

    const patterns = window.dsaPatternsRoadmap || [];
    const query = catalogFilterState.search.trim().toLowerCase();
    const catFilter = catalogFilterState.category;
    const masteryFilter = catalogFilterState.mastery;

    const filtered = patterns.filter(pat => {
      // 1. Category check
      if (catFilter !== 'all' && pat.categoryId !== catFilter) return false;

      // 2. Mastery check
      const mastery = calculatePatternMastery(pat);
      if (masteryFilter !== 'all') {
        if (masteryFilter === 'mastered' && mastery !== 'Mastered') return false;
        if (masteryFilter === 'practiced' && mastery !== 'Practicing' && mastery !== 'Mastered') return false;
        if (masteryFilter === 'learned' && mastery === 'Not Started') return false;
        if (masteryFilter === 'weak' && mastery !== 'Weak' && !patternStats.weak[pat.id]) return false;
        if (masteryFilter === 'not-started' && mastery !== 'Not Started') return false;
        if (masteryFilter === 'in-progress' && !['Learning', 'Practicing'].includes(mastery)) return false;
      }

      // 3. Search query check (name, category, oneliner, recognition signals)
      if (query) {
        const inName = pat.name.toLowerCase().includes(query);
        const inCat = pat.categoryName.toLowerCase().includes(query);
        const inDesc = (pat.oneLiner || '').toLowerCase().includes(query);
        const inSignals = (pat.recognitionSignals || []).some(s => s.toLowerCase().includes(query));
        if (!inName && !inCat && !inDesc && !inSignals) return false;
      }

      return true;
    });

    if (dom.catalogCountBadge) {
      dom.catalogCountBadge.textContent = `${filtered.length} Patterns`;
    }

    if (filtered.length === 0) {
      dom.patternCardsGrid.innerHTML = '';
      if (dom.catalogEmptyState) dom.catalogEmptyState.classList.remove('hidden');
      return;
    }

    if (dom.catalogEmptyState) dom.catalogEmptyState.classList.add('hidden');

    dom.patternCardsGrid.innerHTML = filtered.map(pat => {
      const mastery = calculatePatternMastery(pat);
      const solvedStats = getPatternSolvedCount(pat);
      const pct = solvedStats.total > 0 ? Math.round((solvedStats.solved / solvedStats.total) * 100) : 0;
      const masteryClass = `mastery-${mastery.toLowerCase().replace(/\s+/g, '-')}`;
      const signals = pat.recognitionSignals ? pat.recognitionSignals.slice(0, 2) : [];

      return `
        <article class="pl-pattern-card" data-pattern-id="${pat.id}">
          <div class="pl-card-header">
            <div class="pl-card-title-group">
              <span class="pl-cat-badge" style="border-left: 3px solid ${pat.color || '#6366F1'};">
                <span class="material-symbols-outlined text-[14px]">${pat.icon || 'alt_route'}</span>
                <span>${escapeHtml(pat.categoryName)}</span>
              </span>
              <h3 class="pl-card-title">${escapeHtml(pat.name)}</h3>
            </div>
            <span class="pl-mastery-badge ${masteryClass}">${mastery}</span>
          </div>

          <p class="pl-card-oneliner">${escapeHtml(pat.oneLiner || '')}</p>

          <div class="pl-card-meta-row">
            <span class="pl-pill-complexity" title="Time & Space Complexity">
              <span class="material-symbols-outlined text-[13px]">speed</span>
              <span>${escapeHtml(pat.complexity ? pat.complexity.time : 'O(N)')} / ${escapeHtml(pat.complexity ? pat.complexity.space : 'O(1)')}</span>
            </span>
            <span class="pl-pill-qcount" title="Available Problems in Pattern">
              <span class="material-symbols-outlined text-[13px]">checklist</span>
              <span>${pat.totalQuestions || solvedStats.total} Qs</span>
            </span>
          </div>

          <div class="pl-signals-preview">
            <span class="pl-signals-label">Trigger Signals:</span>
            <div class="pl-signals-chips">
              ${signals.map(s => `<span class="pl-signal-chip">${escapeHtml(s)}</span>`).join('')}
            </div>
          </div>

          <div class="pl-card-footer">
            <div class="pl-progress-mini-bar">
              <div class="pl-progress-mini-fill" style="width: ${pct}%;"></div>
            </div>
            <div class="pl-footer-actions">
              <span class="pl-solved-ratio">${solvedStats.solved}/${solvedStats.total} Solved</span>
              <button class="pl-btn-study" data-study-pattern="${pat.id}">
                <span>Study Pattern</span>
                <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  /**
   * Opens the Dedicated Pattern View for a specific pattern ID
   */
  function openPatternStudyView(patternId) {
    const patterns = window.dsaPatternsRoadmap || [];
    const pat = patterns.find(p => p.id === patternId);
    if (!pat) return;

    currentPattern = pat;

    // Mark pattern as viewed in stats
    patternStats.viewed[pat.id] = true;
    Storage.set('dsa_pattern_stats', patternStats);
    renderDashboard();

    // Hide catalog section, show study section
    if (dom.catalogSection) dom.catalogSection.classList.add('hidden');
    if (dom.studyViewSection) dom.studyViewSection.classList.remove('hidden');

    renderPatternStudyContent(pat);

    // Scroll to top of study view smoothly
    window.scrollTo({ top: 120, behavior: 'smooth' });
  }

  /**
   * Closes the Dedicated Pattern View and returns to the catalog
   */
  function closePatternStudyView() {
    currentPattern = null;
    if (dom.studyViewSection) dom.studyViewSection.classList.add('hidden');
    if (dom.catalogSection) dom.catalogSection.classList.remove('hidden');
    renderPatternCatalog();
    renderDashboard();
  }

  /**
   * Renders the full 12-point curriculum inside the Dedicated Pattern Study View
   */
  function renderPatternStudyContent(pat) {
    if (!dom.studyViewContainer) return;

    const mastery = calculatePatternMastery(pat);
    const solvedStats = getPatternSolvedCount(pat);
    const allQuestions = window.dsaAllQuestions || [];
    const patternQuestions = allQuestions.filter(q => q.patternId === pat.id);

    // Render curriculum content
    dom.studyViewContainer.innerHTML = `
      <!-- Study View Hero Header -->
      <div class="pl-study-hero">
        <div class="pl-study-hero-left">
          <div class="pl-study-cat-pill">
            <span class="material-symbols-outlined text-[16px]">${pat.icon || 'alt_route'}</span>
            <span>${escapeHtml(pat.categoryName)} Category</span>
          </div>
          <h2 class="pl-study-title">${escapeHtml(pat.name)}</h2>
          <p class="pl-study-oneliner">${escapeHtml(pat.oneLiner || '')}</p>
        </div>
        <div class="pl-study-hero-right">
          <div class="pl-study-mastery-card">
            <span class="pl-study-mastery-label">Mastery Status</span>
            <span class="pl-mastery-badge mastery-${mastery.toLowerCase().replace(/\s+/g, '-')} text-sm px-3 py-1">${mastery}</span>
            <span class="pl-study-solved-stat text-xs text-slate-500 mt-2">${solvedStats.solved} / ${solvedStats.total} Practice Problems Solved</span>
          </div>
        </div>
      </div>

      <!-- Quick Section Anchor Navigation -->
      <div class="pl-study-anchor-bar custom-scrollbar">
        <a href="#sec-overview" class="pl-anchor-link active">1. Overview & When to Use</a>
        <a href="#sec-signals" class="pl-anchor-link">2. Recognition Signals</a>
        <a href="#sec-mental-model" class="pl-anchor-link">3. Core Idea & Model</a>
        <a href="#sec-variations" class="pl-anchor-link">4. Variations</a>
        <a href="#sec-complexity" class="pl-anchor-link">5. Complexity & Pitfalls</a>
        <a href="#sec-template" class="pl-anchor-link">6. C++ Code Template</a>
        <a href="#sec-trace" class="pl-anchor-link">7. Walkthrough Trace</a>
        <a href="#sec-quiz" class="pl-anchor-link">8. Pattern Recognition Quiz</a>
        <a href="#sec-practice" class="pl-anchor-link">9. Practice Problems (${patternQuestions.length})</a>
      </div>

      <!-- 1. What is it & When to Use -->
      <section class="pl-study-card" id="sec-overview">
        <h3 class="pl-study-section-title">
          <span class="material-symbols-outlined text-indigo-600">help_outline</span>
          <span>1. What is this Pattern & When to Use It?</span>
        </h3>
        <div class="pl-prose-text mb-4">
          <p><strong>What it is:</strong> ${escapeHtml(pat.whatIsIt || '')}</p>
        </div>
        <div class="pl-alert-box pl-alert-info">
          <span class="material-symbols-outlined text-indigo-600 shrink-0">check_circle</span>
          <div>
            <strong>When to use this pattern:</strong>
            <p class="mt-1 text-sm">${escapeHtml(pat.whenToUse || '')}</p>
          </div>
        </div>
      </section>

      <!-- 2. Recognition Signals / Keywords -->
      <section class="pl-study-card" id="sec-signals">
        <h3 class="pl-study-section-title">
          <span class="material-symbols-outlined text-indigo-600">radar</span>
          <span>2. Problem Recognition Signals & Trigger Keywords</span>
        </h3>
        <p class="text-sm text-slate-600 mb-3">When reading LeetCode problem statements, look for these explicit cues:</p>
        <div class="pl-signals-grid">
          ${(pat.recognitionSignals || []).map(sig => `
            <div class="pl-signal-item">
              <span class="material-symbols-outlined text-indigo-600 text-[18px]">bolt</span>
              <span class="font-medium text-slate-800 text-sm">${escapeHtml(sig)}</span>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- 3. Core Idea & Intuitive Mental Model -->
      <section class="pl-study-card" id="sec-mental-model">
        <h3 class="pl-study-section-title">
          <span class="material-symbols-outlined text-indigo-600">psychology</span>
          <span>3. Core Idea & Intuitive Mental Model</span>
        </h3>
        <div class="pl-mental-model-box">
          <span class="material-symbols-outlined text-indigo-600 text-2xl shrink-0">lightbulb</span>
          <div class="text-slate-800 text-sm leading-relaxed">
            ${escapeHtml(pat.coreIdea || '')}
          </div>
        </div>
      </section>

      <!-- 4. Common Variations & Sub-patterns -->
      <section class="pl-study-card" id="sec-variations">
        <h3 class="pl-study-section-title">
          <span class="material-symbols-outlined text-indigo-600">hub</span>
          <span>4. Common Variations & Sub-Patterns</span>
        </h3>
        <div class="pl-variations-grid">
          ${(pat.variations || []).map((v, i) => `
            <div class="pl-variation-card">
              <div class="pl-var-header">
                <span class="pl-var-badge">Variation ${i + 1}</span>
                <h4 class="pl-var-title">${escapeHtml(v.name)}</h4>
              </div>
              <p class="pl-var-desc">${escapeHtml(v.desc)}</p>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- 5. Time & Space Complexity + Pitfalls -->
      <section class="pl-study-card" id="sec-complexity">
        <h3 class="pl-study-section-title">
          <span class="material-symbols-outlined text-indigo-600">timer</span>
          <span>5. Big-O Complexity & Common Pitfalls</span>
        </h3>
        <div class="pl-complexity-row mb-6">
          <div class="pl-comp-card">
            <span class="pl-comp-label">Time Complexity</span>
            <span class="pl-comp-val text-indigo-600">${escapeHtml(pat.complexity ? pat.complexity.time : 'O(N)')}</span>
            <span class="pl-comp-note">${escapeHtml(pat.complexity ? pat.complexity.note : 'Optimal linear pass')}</span>
          </div>
          <div class="pl-comp-card">
            <span class="pl-comp-label">Space Complexity</span>
            <span class="pl-comp-val text-emerald-600">${escapeHtml(pat.complexity ? pat.complexity.space : 'O(1)')}</span>
            <span class="pl-comp-note">Auxiliary memory allocation</span>
          </div>
        </div>

        <h4 class="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
          <span class="material-symbols-outlined text-amber-500 text-[18px]">warning</span>
          <span>Common Mistakes & Gotchas to Avoid:</span>
        </h4>
        <ul class="pl-pitfalls-list">
          ${(pat.pitfalls || []).map(p => `
            <li class="pl-pitfall-item">
              <span class="material-symbols-outlined text-red-500 text-[16px] shrink-0">close</span>
              <span class="text-sm text-slate-700">${escapeHtml(p)}</span>
            </li>
          `).join('')}
        </ul>
      </section>

      <!-- 6. C++ Code Template -->
      <section class="pl-study-card" id="sec-template">
        <div class="flex items-center justify-between gap-3 mb-3">
          <h3 class="pl-study-section-title mb-0">
            <span class="material-symbols-outlined text-indigo-600">code</span>
            <span>6. High-Quality C++ Code Template</span>
          </h3>
          <button class="pl-btn-copy-code" id="pl-btn-copy-cpp" aria-label="Copy C++ Template">
            <span class="material-symbols-outlined text-[16px]">content_copy</span>
            <span id="pl-copy-text">Copy Code</span>
          </button>
        </div>
        <div class="pl-code-block-container">
          <pre class="pl-code-pre custom-scrollbar"><code id="pl-cpp-code">${escapeHtml(pat.cppTemplate || '')}</code></pre>
        </div>
      </section>

      <!-- 7. Step-by-Step Walkthrough Trace -->
      <section class="pl-study-card" id="sec-trace">
        <h3 class="pl-study-section-title">
          <span class="material-symbols-outlined text-indigo-600">footprint</span>
          <span>7. Concrete Walkthrough Trace</span>
        </h3>
        <p class="text-sm font-semibold text-slate-800 mb-3">${escapeHtml(pat.walkthrough ? pat.walkthrough.problem : 'Canonical Example')}</p>
        <div class="pl-trace-steps-container">
          ${((pat.walkthrough && pat.walkthrough.steps) || []).map(s => `
            <div class="pl-trace-step-item">
              <div class="pl-trace-step-num">Step ${s.step}</div>
              <div class="pl-trace-step-content">
                <div class="pl-trace-step-state font-mono text-xs text-indigo-700 bg-indigo-50 px-2 py-1 rounded inline-block mb-1">${escapeHtml(s.state)}</div>
                <div class="pl-trace-step-action text-sm text-slate-700">${escapeHtml(s.action)}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- 8. Pattern Recognition Quiz -->
      <section class="pl-study-card" id="sec-quiz">
        <h3 class="pl-study-section-title">
          <span class="material-symbols-outlined text-indigo-600">quiz</span>
          <span>8. Pattern Recognition Quiz (${(pat.quizzes || []).length} Scenarios)</span>
        </h3>
        <p class="text-sm text-slate-600 mb-4">Select the most optimal pattern for each problem scenario to reinforce pattern identification:</p>
        <div class="pl-quiz-list">
          ${(pat.quizzes || []).map((q, qIndex) => `
            <div class="pl-quiz-card" id="quiz-card-${pat.id}-${qIndex}">
              <div class="pl-quiz-question-text">
                <strong>Scenario ${qIndex + 1}:</strong> ${escapeHtml(q.scenario)}
              </div>
              <div class="pl-quiz-options-grid">
                ${q.options.map((opt, optIndex) => `
                  <button class="pl-quiz-opt-btn" data-quiz-pat="${pat.id}" data-quiz-index="${qIndex}" data-opt-index="${optIndex}">
                    <span class="pl-opt-letter">${String.fromCharCode(65 + optIndex)}</span>
                    <span class="pl-opt-text">${escapeHtml(opt)}</span>
                  </button>
                `).join('')}
              </div>
              <div class="pl-quiz-feedback hidden" id="quiz-feedback-${pat.id}-${qIndex}">
                <div class="pl-feedback-header"></div>
                <p class="pl-feedback-expl text-sm text-slate-700 mt-1"></p>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- 9. Practice Questions -->
      <section class="pl-study-card" id="sec-practice">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <h3 class="pl-study-section-title mb-0">
            <span class="material-symbols-outlined text-indigo-600">checklist</span>
            <span>9. Practice Problems (${patternQuestions.length} Problems)</span>
          </h3>
          <span class="text-xs text-slate-500">Solved state syncs seamlessly with your Roadmap</span>
        </div>
        <div class="pl-practice-questions-list" id="pl-practice-list">
          ${renderPracticeQuestionsList(patternQuestions)}
        </div>
      </section>
    `;

    // Attach copy button listener
    const copyBtn = document.getElementById('pl-btn-copy-cpp');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const codeText = pat.cppTemplate || '';
        if (typeof copyToClipboard === 'function') {
          copyToClipboard(codeText, 'C++ Code Template copied to clipboard!');
        } else {
          navigator.clipboard.writeText(codeText);
        }
        const copyLabel = document.getElementById('pl-copy-text');
        if (copyLabel) copyLabel.textContent = 'Copied!';
        setTimeout(() => {
          if (copyLabel) copyLabel.textContent = 'Copy Code';
        }, 2000);
      });
    }

    // Attach quiz option listeners
    const quizOptions = dom.studyViewContainer.querySelectorAll('.pl-quiz-opt-btn');
    quizOptions.forEach(btn => {
      btn.addEventListener('click', onQuizOptionClick);
    });
  }

  /**
   * Generates HTML for practice questions inside the study view
   */
  function renderPracticeQuestionsList(questions) {
    if (!questions || questions.length === 0) {
      return `<p class="text-sm text-slate-500 py-4 text-center">No questions found for this pattern.</p>`;
    }

    return questions.map(q => {
      const isSolved = !!dsaProgress[q.id];
      const diffClass = (q.difficulty || 'easy').toLowerCase();
      const lcNum = q.leetcodeNumber || '';
      const lcUrl = q.leetcodeUrl || '#';
      const signals = q.signals ? q.signals.join(' • ') : '';

      return `
        <div class="dsa-question-row ${isSolved ? 'is-solved' : ''}" id="pl-qrow-${q.id}">
          <div class="dsa-question-left">
            <label class="dsa-checkbox-container" title="Mark as solved">
              <input type="checkbox" class="dsa-checkbox-input pl-question-check" data-qid="${q.id}" ${isSolved ? 'checked' : ''} aria-label="Mark ${escapeHtml(q.title)} as solved"/>
              <span class="dsa-checkbox-custom"></span>
            </label>
            <span class="dsa-lc-num">#${lcNum}</span>
            <div class="dsa-question-info">
              <div class="dsa-question-title-wrap">
                <span class="dsa-question-title" title="${escapeHtml(q.title)}">${escapeHtml(q.title)}</span>
              </div>
              ${signals ? `<div class="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5"><span class="material-symbols-outlined text-[12px] text-indigo-500">radar</span><span>${escapeHtml(signals)}</span></div>` : ''}
            </div>
          </div>
          <div class="dsa-question-right">
            <span class="dsa-badge-diff dsa-badge-${diffClass}">${q.difficulty}</span>
            <a href="${lcUrl}" target="_blank" rel="noopener noreferrer" class="dsa-btn-leetcode" aria-label="Open ${escapeHtml(q.title)} on LeetCode">
              <span>Solve</span>
              <span class="material-symbols-outlined">open_in_new</span>
            </a>
          </div>
        </div>
      `;
    }).join('');
  }

  /**
   * Handles quiz option selection in pattern study view
   */
  function onQuizOptionClick(e) {
    const btn = e.currentTarget;
    const patId = btn.dataset.quizPat;
    const qIndex = parseInt(btn.dataset.quizIndex, 10);
    const optIndex = parseInt(btn.dataset.optIndex, 10);

    const patterns = window.dsaPatternsRoadmap || [];
    const pat = patterns.find(p => p.id === patId);
    if (!pat || !pat.quizzes || !pat.quizzes[qIndex]) return;

    const quiz = pat.quizzes[qIndex];
    const isCorrect = optIndex === quiz.correctIndex;

    const card = document.getElementById(`quiz-card-${patId}-${qIndex}`);
    const feedback = document.getElementById(`quiz-feedback-${patId}-${qIndex}`);
    if (!card || !feedback) return;

    // Disable all options in this quiz card
    const allBtns = card.querySelectorAll('.pl-quiz-opt-btn');
    allBtns.forEach((b, idx) => {
      b.disabled = true;
      if (idx === quiz.correctIndex) {
        b.classList.add('correct');
      } else if (idx === optIndex && !isCorrect) {
        b.classList.add('wrong');
      }
    });

    // Show feedback
    feedback.classList.remove('hidden');
    const headerEl = feedback.querySelector('.pl-feedback-header');
    const explEl = feedback.querySelector('.pl-feedback-expl');

    if (isCorrect) {
      feedback.className = 'pl-quiz-feedback is-correct';
      if (headerEl) headerEl.innerHTML = `<span class="material-symbols-outlined text-emerald-600 text-[18px]">check_circle</span> <strong class="text-emerald-800">Spot On! Correct Pattern.</strong>`;
    } else {
      feedback.className = 'pl-quiz-feedback is-wrong';
      if (headerEl) headerEl.innerHTML = `<span class="material-symbols-outlined text-rose-600 text-[18px]">cancel</span> <strong class="text-rose-800">Not Quite Optimal.</strong>`;
    }

    if (explEl) explEl.textContent = quiz.explanation;

    // Save quiz attempt
    if (!patternStats.quizzes[patId]) {
      patternStats.quizzes[patId] = { correct: 0, total: 0, accuracy: 0 };
    }
    patternStats.quizzes[patId].total++;
    if (isCorrect) patternStats.quizzes[patId].correct++;
    patternStats.quizzes[patId].accuracy = Math.round((patternStats.quizzes[patId].correct / patternStats.quizzes[patId].total) * 100);

    if (patternStats.quizzes[patId].accuracy < 60) {
      patternStats.weak[patId] = true;
    } else {
      delete patternStats.weak[patId];
    }

    Storage.set('dsa_pattern_stats', patternStats);
    renderDashboard();
  }

  /**
   * "🎯 Identify the Pattern" Training Arena
   */
  function openTrainingArena() {
    if (!dom.arenaModal || !dom.arenaContainer) return;

    dom.arenaModal.classList.remove('hidden');
    dom.arenaModal.classList.add('open');
    currentArenaIndex = 0;
    arenaScore = { correct: 0, total: 0, streak: 0 };
    renderArenaDrill();
  }

  function closeTrainingArena() {
    if (dom.arenaModal) {
      dom.arenaModal.classList.remove('open');
      dom.arenaModal.classList.add('hidden');
    }
    renderDashboard();
  }

  function renderArenaDrill() {
    const drills = window.dsaArenaDrills || [];
    if (drills.length === 0 || !dom.arenaContainer) return;

    if (currentArenaIndex >= drills.length) {
      // Completed all drills
      renderArenaSummary();
      return;
    }

    const drill = drills[currentArenaIndex];
    const accuracy = arenaScore.total > 0 ? Math.round((arenaScore.correct / arenaScore.total) * 100) : 100;

    dom.arenaContainer.innerHTML = `
      <div class="pl-arena-header">
        <div class="pl-arena-counter">
          <span class="material-symbols-outlined text-indigo-600 text-[18px]">psychology</span>
          <span>Drill ${currentArenaIndex + 1} of ${drills.length}</span>
        </div>
        <div class="pl-arena-score-bar">
          <span class="pl-arena-streak"><span class="material-symbols-outlined text-amber-500 text-[16px]">local_fire_department</span> Streak: ${arenaScore.streak}</span>
          <span class="pl-arena-acc">Accuracy: ${accuracy}%</span>
        </div>
      </div>

      <div class="pl-arena-question-box">
        <h4 class="pl-arena-qtitle">${escapeHtml(drill.title)}</h4>
        <p class="pl-arena-qsnippet">${escapeHtml(drill.snippet)}</p>
        <div class="pl-arena-constraints">
          <span class="material-symbols-outlined text-[14px] text-slate-500">lock</span>
          <span>Constraints: ${escapeHtml(drill.constraints)}</span>
        </div>
      </div>

      <div class="pl-arena-prompt">Which DSA pattern best solves this problem optimally?</div>

      <div class="pl-arena-options-grid" id="pl-arena-opts">
        ${drill.options.map((opt, i) => `
          <button class="pl-arena-opt-btn" data-drill-opt="${i}">
            <span class="pl-arena-opt-key">${String.fromCharCode(65 + i)}</span>
            <span class="pl-arena-opt-name">${escapeHtml(opt)}</span>
          </button>
        `).join('')}
      </div>

      <div class="pl-arena-feedback-box hidden" id="pl-arena-feedback">
        <div class="pl-arena-fb-title"></div>
        <p class="pl-arena-fb-expl"></p>
        <div class="pl-arena-fb-hint"></div>
        <button class="pl-btn-arena-next" id="pl-btn-arena-next">
          <span>Next Drill</span>
          <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </div>
    `;

    // Attach click listeners to arena options
    const optBtns = dom.arenaContainer.querySelectorAll('.pl-arena-opt-btn');
    optBtns.forEach(btn => {
      btn.addEventListener('click', onArenaOptionSelect);
    });
  }

  function onArenaOptionSelect(e) {
    const drills = window.dsaArenaDrills || [];
    const drill = drills[currentArenaIndex];
    const selected = parseInt(e.currentTarget.dataset.drillOpt, 10);
    const isCorrect = selected === drill.correctIndex;

    arenaScore.total++;
    if (isCorrect) {
      arenaScore.correct++;
      arenaScore.streak++;
    } else {
      arenaScore.streak = 0;
    }

    // Disable buttons
    const allBtns = dom.arenaContainer.querySelectorAll('.pl-arena-opt-btn');
    allBtns.forEach((b, idx) => {
      b.disabled = true;
      if (idx === drill.correctIndex) b.classList.add('correct');
      else if (idx === selected && !isCorrect) b.classList.add('wrong');
    });

    const feedback = document.getElementById('pl-arena-feedback');
    if (feedback) {
      feedback.classList.remove('hidden');
      feedback.className = `pl-arena-feedback-box ${isCorrect ? 'correct' : 'wrong'}`;

      const titleEl = feedback.querySelector('.pl-arena-fb-title');
      const explEl = feedback.querySelector('.pl-arena-fb-expl');
      const hintEl = feedback.querySelector('.pl-arena-fb-hint');

      if (titleEl) {
        titleEl.innerHTML = isCorrect ?
          `<span class="material-symbols-outlined text-emerald-600">check_circle</span> <span>Spot on! Optimal Choice.</span>` :
          `<span class="material-symbols-outlined text-rose-600">cancel</span> <span>Incorrect Pattern</span>`;
      }
      if (explEl) explEl.textContent = drill.explanation;
      if (hintEl) hintEl.innerHTML = `<strong>💡 Recognition Pro-Tip:</strong> ${escapeHtml(drill.hint)}`;

      const nextBtn = document.getElementById('pl-btn-arena-next');
      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          currentArenaIndex++;
          renderArenaDrill();
        });
      }
    }
  }

  function renderArenaSummary() {
    const accuracy = arenaScore.total > 0 ? Math.round((arenaScore.correct / arenaScore.total) * 100) : 0;
    dom.arenaContainer.innerHTML = `
      <div class="pl-arena-summary-card">
        <div class="pl-arena-summary-trophy">
          <span class="material-symbols-outlined text-4xl text-amber-500">military_tech</span>
        </div>
        <h3 class="text-xl font-extrabold text-slate-900 mt-3">Training Arena Complete!</h3>
        <p class="text-sm text-slate-600 mt-1">You identified patterns across real-world problem scenarios.</p>

        <div class="pl-arena-summary-stats mt-6">
          <div class="pl-summary-stat-box">
            <span class="text-2xl font-black text-indigo-600">${arenaScore.correct} / ${arenaScore.total}</span>
            <span class="text-xs text-slate-500 mt-1">Correct Choices</span>
          </div>
          <div class="pl-summary-stat-box">
            <span class="text-2xl font-black text-emerald-600">${accuracy}%</span>
            <span class="text-xs text-slate-500 mt-1">Accuracy</span>
          </div>
          <div class="pl-summary-stat-box">
            <span class="text-2xl font-black text-amber-600">${arenaScore.streak}</span>
            <span class="text-xs text-slate-500 mt-1">Best Streak</span>
          </div>
        </div>

        <div class="mt-6 flex items-center justify-center gap-3">
          <button class="btn-secondary text-sm py-2 px-4" id="pl-btn-arena-restart">
            <span class="material-symbols-outlined text-[18px]">replay</span>
            <span>Train Again</span>
          </button>
          <button class="btn-primary text-sm py-2 px-4" id="pl-btn-arena-finish">
            <span>Back to Dashboard</span>
          </button>
        </div>
      </div>
    `;

    document.getElementById('pl-btn-arena-restart')?.addEventListener('click', () => {
      currentArenaIndex = 0;
      arenaScore = { correct: 0, total: 0, streak: 0 };
      renderArenaDrill();
    });

    document.getElementById('pl-btn-arena-finish')?.addEventListener('click', closeTrainingArena);
  }

  /**
   * Question Checkbox Toggle Handler with Bidirectional Synchronization
   */
  function onQuestionCheckboxChange(e) {
    const checkbox = e.target.closest('.dsa-checkbox-input');
    if (!checkbox) return;

    const qid = checkbox.dataset.qid;
    if (!qid) return;

    const isChecked = checkbox.checked;
    dsaProgress = Storage.get('dsa_progress', {}) || {};

    if (isChecked) {
      dsaProgress[qid] = true;
    } else {
      delete dsaProgress[qid];
    }

    // Persist to localStorage
    Storage.set('dsa_progress', dsaProgress);

    // Update row styling
    const row = document.getElementById(`pl-qrow-${qid}`);
    if (row) {
      if (isChecked) row.classList.add('is-solved');
      else row.classList.remove('is-solved');
    }

    // Notify roadmap view and other components
    const event = new CustomEvent('dsaProgressSync', { detail: { qid, isChecked, source: 'patternLearning' } });
    window.dispatchEvent(event);

    renderDashboard();
  }

  /**
   * Sync event listener when Roadmap modifies progress
   */
  function onProgressSync(e) {
    dsaProgress = Storage.get('dsa_progress', {}) || {};
    const { qid, isChecked, source } = e.detail || {};

    if (source === 'patternLearning') return; // Already handled locally

    // Update practice questions checkbox if visible
    if (qid) {
      const check = document.querySelector(`.pl-question-check[data-qid="${qid}"]`);
      if (check) check.checked = isChecked;
      const row = document.getElementById(`pl-qrow-${qid}`);
      if (row) {
        if (isChecked) row.classList.add('is-solved');
        else row.classList.remove('is-solved');
      }
    }

    renderDashboard();
    if (!currentPattern) {
      renderPatternCatalog();
    }
  }

  /**
   * Attaches interactive event listeners
   */
  function attachEventListeners() {
    // 1. Dual View Tab Pill Switching (Roadmap vs Pattern Learning)
    if (dom.tabRoadmap && dom.tabPatterns) {
      dom.tabRoadmap.addEventListener('click', () => {
        dom.tabRoadmap.classList.add('active');
        dom.tabPatterns.classList.remove('active');
        if (dom.roadmapView) dom.roadmapView.classList.remove('hidden');
        if (dom.container) dom.container.classList.add('hidden');
      });

      dom.tabPatterns.addEventListener('click', () => {
        dom.tabPatterns.classList.add('active');
        dom.tabRoadmap.classList.remove('active');
        if (dom.roadmapView) dom.roadmapView.classList.add('hidden');
        if (dom.container) dom.container.classList.remove('hidden');
        renderDashboard();
        renderPatternCatalog();
      });
    }

    // 2. Delegated study pattern clicks across cards and recommendations
    document.addEventListener('click', (e) => {
      const studyBtn = e.target.closest('[data-study-pattern]');
      if (studyBtn) {
        const pid = studyBtn.dataset.studyPattern;
        if (pid) {
          // Switch to Pattern Learning tab if in Roadmap
          if (dom.tabPatterns && !dom.tabPatterns.classList.contains('active')) {
            dom.tabPatterns.click();
          }
          openPatternStudyView(pid);
        }
      }
    });

    // 3. Back to catalog button
    if (dom.btnBackToCatalog) {
      dom.btnBackToCatalog.addEventListener('click', closePatternStudyView);
    }

    // 4. Catalog Search Input
    if (dom.catalogSearch) {
      dom.catalogSearch.addEventListener('input', (e) => {
        catalogFilterState.search = e.target.value;
        if (dom.catalogClearSearch) {
          if (catalogFilterState.search) dom.catalogClearSearch.classList.add('visible');
          else dom.catalogClearSearch.classList.remove('visible');
        }
        renderPatternCatalog();
      });
    }

    if (dom.catalogClearSearch) {
      dom.catalogClearSearch.addEventListener('click', () => {
        catalogFilterState.search = '';
        if (dom.catalogSearch) {
          dom.catalogSearch.value = '';
          dom.catalogSearch.focus();
        }
        dom.catalogClearSearch.classList.remove('visible');
        renderPatternCatalog();
      });
    }

    // 5. Category Chips selection
    if (dom.categoryChipsContainer) {
      dom.categoryChipsContainer.addEventListener('click', (e) => {
        const chip = e.target.closest('.pl-category-chip');
        if (!chip) return;

        const cat = chip.dataset.cat;
        catalogFilterState.category = cat;

        dom.categoryChipsContainer.querySelectorAll('.pl-category-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');

        renderPatternCatalog();
      });
    }

    // 6. Mastery segmented filter
    if (dom.masteryFilterSegments) {
      dom.masteryFilterSegments.forEach(btn => {
        btn.addEventListener('click', () => {
          dom.masteryFilterSegments.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          catalogFilterState.mastery = btn.dataset.plMastery;
          renderPatternCatalog();
        });
      });
    }

    // 7. Arena Launcher
    if (dom.btnLaunchArena) {
      dom.btnLaunchArena.addEventListener('click', openTrainingArena);
    }

    if (dom.btnCloseArena) {
      dom.btnCloseArena.addEventListener('click', closeTrainingArena);
    }

    if (dom.arenaModal) {
      dom.arenaModal.addEventListener('click', (e) => {
        if (e.target === dom.arenaModal) closeTrainingArena();
      });
    }

    // 8. Quick Pattern Filters Chips
    const quickChips = document.querySelectorAll('[data-pl-quick-filter]');
    quickChips.forEach(chip => {
      chip.addEventListener('click', () => {
        quickChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const filterVal = chip.dataset.plQuickFilter;
        if (filterVal === 'all') {
          catalogFilterState.search = '';
          if (dom.catalogSearch) dom.catalogSearch.value = '';
        } else {
          catalogFilterState.search = filterVal;
          if (dom.catalogSearch) dom.catalogSearch.value = filterVal;
        }
        if (dom.catalogClearSearch) {
          dom.catalogClearSearch.classList.toggle('visible', !!catalogFilterState.search);
        }
        renderPatternCatalog();
      });
    });

    // 9. Reset Pattern Learning Modal Controls
    if (dom.btnReset && dom.resetModal) {
      dom.btnReset.addEventListener('click', () => {
        dom.resetModal.classList.remove('hidden');
        dom.resetModal.classList.add('open');
      });
    }

    if (dom.btnCancelReset && dom.resetModal) {
      dom.btnCancelReset.addEventListener('click', () => {
        dom.resetModal.classList.remove('open');
        dom.resetModal.classList.add('hidden');
      });
    }

    if (dom.resetModal) {
      dom.resetModal.addEventListener('click', (e) => {
        if (e.target === dom.resetModal) {
          dom.resetModal.classList.remove('open');
          dom.resetModal.classList.add('hidden');
        }
      });
    }

    if (dom.btnConfirmReset && dom.resetModal) {
      dom.btnConfirmReset.addEventListener('click', () => {
        patternStats = { viewed: {}, quizzes: {}, weak: {} };
        Storage.set('dsa_pattern_stats', patternStats);
        dom.resetModal.classList.remove('open');
        dom.resetModal.classList.add('hidden');
        renderDashboard();
        renderPatternCatalog();
        if (typeof showToast === 'function') {
          showToast('Pattern learning progress has been reset successfully.', 'info');
        }
        window.dispatchEvent(new CustomEvent('dsaProgressSync', {
          detail: { source: 'patternReset' }
        }));
      });
    }

    // 10. Delegated Practice Question Checkbox toggling inside study view
    if (dom.studyViewContainer) {
      dom.studyViewContainer.addEventListener('change', onQuestionCheckboxChange);
    }
  }

  // Expose API on namespace
  window.DsaPatternController = {
    init,
    openPatternStudyView,
    closePatternStudyView,
    openTrainingArena
  };

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
