/**
 * DevPilot-AI — DSA Problem Detail & Revision Controller
 * Handles:
 * - Internal Problem Detail view lifecycle (15-section pedagogical model)
 * - Multi-language code tabs (Python, C++, Java, JS) & synchronized line-by-line explanations
 * - Code copy with clipboard feedback
 * - Progressive hint disclosures (Hint 1, 2, 3 + Reveal Approach)
 * - Independent status states: Solved, Review, In Progress, Not Started
 * - Personal notes per question (autosaved in Storage)
 * - Contextual previous/next problem navigation
 * - Revision mode dashboard & review filters
 * - Single source of truth synchronization with dsa_progress, dsa_pattern_stats, dsa_reviews
 */

(function () {
  'use strict';

  window.DsaProblemController = {};

  // State
  let currentQuestionId = null;
  let currentExplanation = null;
  let currentLanguage = 'python';
  let currentContextList = [];
  let currentContextIndex = -1;
  let currentSourceView = 'roadmap';
  let revisionFilter = 'all';

  // DOM Elements
  let dom = {
    detailView: null,
    roadmapView: null,
    patternsView: null,
    revisionView: null,
    tabRoadmap: null,
    tabPatterns: null,
    tabRevision: null
  };

  /**
   * Initializes the Problem Detail Controller
   */
  function init() {
    dom.detailView = document.getElementById('dsa-problem-detail-view');
    dom.roadmapView = document.getElementById('dsa-roadmap-view');
    dom.patternsView = document.getElementById('dsa-pattern-learning-view');
    dom.tabRoadmap = document.getElementById('tab-btn-roadmap');
    dom.tabPatterns = document.getElementById('tab-btn-patterns');

    // Load preferred language if saved
    currentLanguage = Storage.get('dsa_preferred_lang', 'python');

    if (dom.tabRoadmap) {
      dom.tabRoadmap.addEventListener('click', () => {
        if (dom.detailView && !dom.detailView.classList.contains('hidden')) {
          closeProblemDetail();
        }
      });
    }

    if (dom.tabPatterns) {
      dom.tabPatterns.addEventListener('click', () => {
        if (dom.detailView && !dom.detailView.classList.contains('hidden')) {
          closeProblemDetail();
        }
      });
    }

    // Listen for progress & review updates
    window.addEventListener('dsaProgressSync', onProgressSync);
    window.addEventListener('dsaReviewSync', onReviewSync);
  }

  /**
   * Switch between top-level views: 'roadmap' | 'patterns'
   */
  function switchToView(viewName) {
    if (dom.detailView) dom.detailView.classList.add('hidden');

    if (dom.tabRoadmap) dom.tabRoadmap.classList.toggle('active', viewName === 'roadmap');
    if (dom.tabPatterns) dom.tabPatterns.classList.toggle('active', viewName === 'patterns');

    if (dom.roadmapView) dom.roadmapView.classList.toggle('hidden', viewName !== 'roadmap');
    if (dom.patternsView) dom.patternsView.classList.toggle('hidden', viewName !== 'patterns');

    currentSourceView = viewName;
  }

  /**
   * Opens the Problem Detail view for a specific question
   * @param {string} qid - Unique question ID (e.g. 'lc-367', 'arr-tp-01')
   * @param {Array} [contextList] - Array of questions or question IDs from active filter
   * @param {string} [sourceView='roadmap'] - Origin view
   */
  function openProblemDetail(qid, contextList, sourceView) {
    if (!qid) return;

    if (!window.DsaProblemDatabase || typeof window.DsaProblemDatabase.getExplanation !== 'function') {
      console.error('Problem database not loaded');
      return;
    }

    const exp = window.DsaProblemDatabase.getExplanation(qid);
    if (!exp) {
      console.warn('No explanation found for question', qid);
      return;
    }

    currentQuestionId = qid;
    currentExplanation = exp;
    if (sourceView) currentSourceView = sourceView;

    // Resolve context list for previous/next navigation
    if (Array.isArray(contextList) && contextList.length > 0) {
      currentContextList = contextList.map(item => typeof item === 'string' ? item : item.id);
      currentContextIndex = currentContextList.indexOf(qid);
    } else {
      currentContextList = [qid];
      currentContextIndex = 0;
    }

    // Hide other views and display question explanation view
    if (dom.roadmapView) dom.roadmapView.classList.add('hidden');
    if (dom.patternsView) dom.patternsView.classList.add('hidden');
    if (dom.detailView) {
      dom.detailView.classList.remove('hidden');
      renderProblemDetailContent();
    }

    // Smooth scroll to top of page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Closes Problem Detail view and returns to originating view
   */
  function closeProblemDetail() {
    if (dom.detailView) dom.detailView.classList.add('hidden');
    switchToView(currentSourceView);

    // Notify other views to refresh any progress/review updates
    window.dispatchEvent(new CustomEvent('dsaProgressSync', {
      detail: { qid: currentQuestionId, source: 'problemDetailClose' }
    }));
  }

  /**
   * Renders the complete 15-section problem detail view
   */
  function renderProblemDetailContent() {
    if (!dom.detailView || !currentExplanation) return;

    const exp = currentExplanation;
    const qid = exp.id;

    // Retrieve storage states
    const progress = Storage.get('dsa_progress', {}) || {};
    const reviews = Storage.get('dsa_reviews', {}) || {};
    const notesData = Storage.get('dsa_notes', {}) || {};
    const hintsData = Storage.get('dsa_hints', {}) || {};
    const patternStats = Storage.get('dsa_pattern_stats', {}) || {};
    const evaluations = patternStats.evaluations || {};

    const isSolved = !!progress[qid];
    const isInReview = !!reviews[qid];
    const userNotes = notesData[qid] || '';
    const questionHints = hintsData[qid] || { revealed: [], approachRevealed: false };
    const evalType = evaluations[qid] || (isSolved ? 'self' : null);

    const diffClass = (exp.difficulty || 'Easy').toLowerCase();
    const statusBadgeClass = isSolved ? 'dp-badge-status-solved' : 'dp-badge-status-unsolved';
    const statusBadgeText = isSolved ? '✓ Solved' : '○ Not Started';
    const qEv = evaluations[qid];

    let evalBadgeHtml = '';
    if (qEv === 'help30' || qEv === 'help') {
      evalBadgeHtml = `
        <span class="dp-badge-pill dp-badge-quality-help30" title="Solved with ~30% AI or hint assistance">
          <span class="material-symbols-outlined text-[13px]">psychology</span>
          <span>~30% Help</span>
        </span>
      `;
    } else if (qEv === 'help50') {
      evalBadgeHtml = `
        <span class="dp-badge-pill dp-badge-quality-help50" title="Solved with ~50% AI or editorial assistance">
          <span class="material-symbols-outlined text-[13px]">smart_toy</span>
          <span>~50% Help</span>
        </span>
      `;
    } else if (qEv === 'cross') {
      evalBadgeHtml = `
        <span class="dp-badge-pill dp-badge-quality-cross" title="Direct solution copied / pasted">
          <span class="material-symbols-outlined text-[13px]">content_paste_off</span>
          <span>Copied Solution</span>
        </span>
      `;
    } else if (qEv === 'self') {
      evalBadgeHtml = `
        <span class="dp-badge-pill dp-badge-quality-self" title="100% Solved independently on your own">
          <span class="material-symbols-outlined text-[13px]">verified</span>
          <span>100% Self</span>
        </span>
      `;
    }



    // Update status badge if progress
    let finalStatusBadgeClass = statusBadgeClass;
    let finalStatusBadgeText = statusBadgeText;
    if (questionHints.revealed.length > 0 || evalType) {
      finalStatusBadgeText = '🟡 In Progress';
      finalStatusBadgeClass = 'dp-badge-status-review';
    }

    // Previous & Next navigation buttons state
    const hasPrev = currentContextIndex > 0;
    const hasNext = currentContextIndex >= 0 && currentContextIndex < currentContextList.length - 1;
    const prevQid = hasPrev ? currentContextList[currentContextIndex - 1] : null;
    const nextQid = hasNext ? currentContextList[currentContextIndex + 1] : null;

    // Generate Walkthrough HTML Table if available
    let walkthroughTableHtml = '';
    if (exp.walkthrough && exp.walkthrough.tableHeaders && exp.walkthrough.tableRows) {
      walkthroughTableHtml = `
        <div class="dp-table-wrap custom-scrollbar">
          <table class="dp-walkthrough-table">
            <thead>
              <tr>
                ${exp.walkthrough.tableHeaders.map(h => `<th>${escapeHtml(h)}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${exp.walkthrough.tableRows.map(row => `
                <tr>
                  ${row.map(cell => `<td>${escapeHtml(cell)}</td>`).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    }

    // Edge Cases HTML Grid
    const edgeCasesHtml = (exp.edgeCases || []).map(ec => `
      <div class="dp-edge-case-card">
        <div class="dp-edge-case-title">${escapeHtml(ec.case)} → ${escapeHtml(ec.expected)}</div>
        <div class="dp-edge-case-exp">${escapeHtml(ec.explanation)}</div>
      </div>
    `).join('');

    // Recognition signals HTML
    const signalsHtml = (exp.recognitionSignals || []).map(sig => `
      <div class="dp-signal-item">
        <span class="material-symbols-outlined">radar</span>
        <span>${escapeHtml(sig)}</span>
      </div>
    `).join('');

    // Approach numbered steps HTML
    const approachHtml = (exp.approach || []).map((step, idx) => `
      <li class="dp-approach-step">
        <span class="dp-step-index">${idx + 1}</span>
        <div>${escapeHtml(step.replace(/^\d+\.\s*/, ''))}</div>
      </li>
    `).join('');

    // Common mistakes HTML
    const mistakesHtml = (exp.commonMistakes || []).map(m => `
      <li class="dp-mistake-item">
        <span class="material-symbols-outlined">close</span>
        <span>${escapeHtml(m)}</span>
      </li>
    `).join('');

    // Build complete markup
    dom.detailView.innerHTML = `
      <div class="dsa-problem-view-container">

        <!-- Top Navigation Bar -->
        <div class="dp-breadcrumb-bar">
          <button class="dp-btn-back" id="dp-btn-back-nav">
            <span class="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Back to ${currentSourceView === 'patterns' ? 'Pattern Learning' : 'DSA Roadmap'}</span>
          </button>
          <div class="dp-actions-toolbar">
            <a href="${exp.leetcodeUrl}" target="_blank" rel="noopener noreferrer" class="dp-btn-action dp-btn-leetcode" id="dp-btn-open-leetcode" title="Solve on canonical LeetCode problem page">
              <span>Open on LeetCode</span>
              <span class="material-symbols-outlined text-[16px]">open_in_new</span>
            </a>
            <button class="dp-btn-action dp-btn-solve-rate" id="dp-btn-rate-solve" title="Mark solved or update solve evaluation">
              <span class="material-symbols-outlined text-[16px]">verified</span>
              <span>${isSolved ? '✓ Solved' : 'Mark as Solved'}</span>
            </button>
          </div>
        </div>

        <!-- Question Header Card (Starting cleanly with Question Number & Title) -->
        <div class="dp-header-card">
          <div class="dp-header-top">
            <div class="dp-title-group">
              <h1 class="dp-problem-title">
                <span class="dp-problem-num">#${exp.leetcodeNumber}.</span>
                <span>${escapeHtml(exp.title)}</span>
              </h1>
              <div class="dp-badges-row mt-2">
                <span class="dp-badge-pill dp-badge-diff-${diffClass}">
                  <span class="material-symbols-outlined text-[13px]">speed</span>
                  <span>${exp.difficulty}</span>
                </span>
                <span class="dp-badge-pill dp-badge-pattern">
                  <span class="material-symbols-outlined text-[13px]">alt_route</span>
                  <span>${escapeHtml(exp.pattern)}</span>
                </span>
                <span class="dp-badge-pill dp-badge-cat">
                  <span class="material-symbols-outlined text-[13px]">schema</span>
                  <span>${escapeHtml(exp.category)}</span>
                </span>
                ${exp.subPattern && exp.subPattern !== exp.pattern ? `
                  <span class="dp-badge-pill dp-badge-subpattern">
                    <span class="material-symbols-outlined text-[13px]">psychology</span>
                    <span>${escapeHtml(exp.subPattern)}</span>
                  </span>
                ` : ''}
                <span class="dp-badge-pill ${statusBadgeClass}" id="dp-status-badge">
                  <span>${statusBadgeText}</span>
                </span>
                ${evalBadgeHtml}
              </div>
            </div>
          </div>
        </div>

        <!-- Hint System -->
        <div class="dp-hints-card" id="dp-hints-section">
          <div class="dp-hints-header">
            <div class="dp-hints-title">
              <span class="material-symbols-outlined text-amber-500">lightbulb</span>
              <span>Need a Hint?</span>
              <span class="dp-hints-badge" id="dp-hints-badge">${questionHints.revealed.length} of ${(exp.hints || []).length} Hints Used</span>
            </div>
            <div class="dp-hints-buttons">
              ${(exp.hints || []).map((_, i) => `
                <button class="dp-hint-trigger ${questionHints.revealed.includes(i + 1) ? 'revealed' : ''}" data-hint-idx="${i + 1}">
                  <span>Hint ${i + 1}</span>
                </button>
              `).join('')}
              <button class="dp-hint-trigger ${questionHints.approachRevealed ? 'revealed' : ''}" id="dp-btn-reveal-approach">
                <span class="material-symbols-outlined text-[14px]">psychology</span>
                <span>Reveal Approach</span>
              </button>
            </div>
          </div>

          <!-- Hint Boxes -->
          ${(exp.hints || []).map((hintText, i) => `
            <div class="dp-hint-box ${questionHints.revealed.includes(i + 1) ? 'open' : ''}" id="dp-hint-box-${i + 1}">
              <strong>💡 Hint ${i + 1}:</strong> ${escapeHtml(hintText)}
            </div>
          `).join('')}
        </div>

        <!-- 15-Section Step-by-Step Thought Process -->
        <div class="dp-sections-container">

          <!-- 1. Understand the Problem -->
          <section class="dp-section-card" id="dp-sec-understand">
            <h3 class="dp-section-title">
              <span class="dp-sec-num">1</span>
              <span>Understand the Problem</span>
            </h3>
            <div class="dp-section-content leading-relaxed">
              ${escapeHtml(exp.problemUnderstanding)}
            </div>
          </section>

          <!-- 2. Why This Problem Matters -->
          <section class="dp-section-card" id="dp-sec-why-matters">
            <h3 class="dp-section-title">
              <span class="dp-sec-num">2</span>
              <span>Why This Problem Matters</span>
            </h3>
            <div class="dp-section-content leading-relaxed">
              ${escapeHtml(exp.whyItMatters)}
            </div>
          </section>

          <!-- 3. Identify the Pattern -->
          <section class="dp-section-card" id="dp-sec-identify-pattern">
            <h3 class="dp-section-title">
              <span class="dp-sec-num">3</span>
              <span>Identify the Pattern: <span class="text-indigo-600">${escapeHtml(exp.pattern)}</span></span>
            </h3>
            <div class="dp-section-content leading-relaxed">
              ${escapeHtml(exp.patternExplanation)}
            </div>
          </section>

          <!-- 4. Recognition Signals -->
          <section class="dp-section-card" id="dp-sec-signals">
            <h3 class="dp-section-title">
              <span class="dp-sec-num">4</span>
              <span>Recognition Signals</span>
            </h3>
            <div class="dp-signals-grid">
              ${signalsHtml}
            </div>
          </section>

          <!-- 5. Thought Process -->
          <section class="dp-section-card" id="dp-sec-thought-process">
            <h3 class="dp-section-title">
              <span class="dp-sec-num">5</span>
              <span>Thought Process (How a Developer Should Think)</span>
            </h3>
            <div class="dp-section-content bg-slate-50 p-4 rounded-lg border border-slate-200">
              <p class="italic text-slate-700">${escapeHtml(exp.thoughtProcess)}</p>
            </div>
          </section>

          <!-- 6. Approach -->
          <section class="dp-section-card" id="dp-sec-approach">
            <h3 class="dp-section-title">
              <span class="dp-sec-num">6</span>
              <span>Approach (Step-by-Step Solution)</span>
            </h3>
            <ul class="dp-approach-list">
              ${approachHtml}
            </ul>
          </section>

          <!-- 7. Algorithm -->
          <section class="dp-section-card" id="dp-sec-algorithm">
            <h3 class="dp-section-title">
              <span class="dp-sec-num">7</span>
              <span>Algorithm</span>
            </h3>
            <div class="dp-section-content font-mono text-xs bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto whitespace-pre">
${escapeHtml(exp.algorithm)}
            </div>
          </section>

          <!-- 8. Pseudocode -->
          <section class="dp-section-card" id="dp-sec-pseudocode">
            <h3 class="dp-section-title">
              <span class="dp-sec-num">8</span>
              <span>Pseudocode (Language Independent)</span>
            </h3>
            <pre class="dp-code-pre bg-slate-900 text-slate-100 rounded-lg p-4 font-mono text-xs overflow-x-auto"><code>${escapeHtml(exp.pseudocode)}</code></pre>
          </section>

          <!-- 9. Example Walkthrough -->
          <section class="dp-section-card" id="dp-sec-walkthrough">
            <h3 class="dp-section-title">
              <span class="dp-sec-num">9</span>
              <span>Example Walkthrough & Trace Table</span>
            </h3>
            <p class="text-sm font-semibold text-slate-700 mb-2">Input: <span class="font-mono text-indigo-600">${escapeHtml((exp.walkthrough && exp.walkthrough.input) || 'Canonical input')}</span></p>
            <p class="text-xs text-slate-500 mb-3">${escapeHtml((exp.walkthrough && exp.walkthrough.description) || '')}</p>
            ${walkthroughTableHtml}
          </section>

          <!-- 10. Edge Cases -->
          <section class="dp-section-card" id="dp-sec-edge-cases">
            <h3 class="dp-section-title">
              <span class="dp-sec-num">10</span>
              <span>Edge Cases & Boundary Tests</span>
            </h3>
            <div class="dp-edge-cases-grid">
              ${edgeCasesHtml}
            </div>
          </section>

          <!-- 11. Multi-Language Code -->
          <section class="dp-section-card" id="dp-sec-code">
            <h3 class="dp-section-title">
              <span class="dp-sec-num">11</span>
              <span>Multi-Language Code Implementation</span>
            </h3>
            <div class="dp-code-container">
              <div class="dp-code-header">
                <div class="dp-lang-tabs" role="tablist" aria-label="Programming Language">
                  <button class="dp-lang-tab ${currentLanguage === 'python' ? 'active' : ''}" data-code-lang="python">Python</button>
                  <button class="dp-lang-tab ${currentLanguage === 'cpp' ? 'active' : ''}" data-code-lang="cpp">C++</button>
                  <button class="dp-lang-tab ${currentLanguage === 'java' ? 'active' : ''}" data-code-lang="java">Java</button>
                  <button class="dp-lang-tab ${currentLanguage === 'javascript' ? 'active' : ''}" data-code-lang="javascript">JavaScript</button>
                </div>
                <button class="dp-btn-copy" id="dp-btn-copy-code" aria-label="Copy Code">
                  <span class="material-symbols-outlined text-[15px]">content_copy</span>
                  <span id="dp-copy-label">Copy Code</span>
                </button>
              </div>
              <pre class="dp-code-pre custom-scrollbar"><code id="dp-code-block">${escapeHtml(exp.code[currentLanguage] || '')}</code></pre>
            </div>

            <!-- 12. Code Explanation (Synchronized with active language) -->
            <div class="dp-explanation-card" id="dp-explanation-container">
              <div class="dp-explanation-title">
                <span class="material-symbols-outlined text-[16px]">menu_book</span>
                <span id="dp-expl-lang-label">12. Code Explanation (${getLanguageDisplay(currentLanguage)})</span>
              </div>
              <ul class="dp-explanation-list" id="dp-explanation-list">
                ${renderExplanationItems(exp.codeExplanation[currentLanguage] || [])}
              </ul>
            </div>
          </section>

          <!-- 13. Complexity Analysis -->
          <section class="dp-section-card" id="dp-sec-complexity">
            <h3 class="dp-section-title">
              <span class="dp-sec-num">13</span>
              <span>Complexity Analysis</span>
            </h3>
            <div class="dp-complexity-row">
              <div class="dp-complexity-card">
                <div class="dp-complexity-label">Time Complexity</div>
                <div class="dp-complexity-value dp-time-val">${escapeHtml(exp.timeComplexity)}</div>
                <div class="dp-complexity-desc">Optimal interview runtime minimizing search passes.</div>
              </div>
              <div class="dp-complexity-card">
                <div class="dp-complexity-label">Space Complexity</div>
                <div class="dp-complexity-value dp-space-val">${escapeHtml(exp.spaceComplexity)}</div>
                <div class="dp-complexity-desc">Auxiliary memory allocation during algorithm execution.</div>
              </div>
            </div>
          </section>

          <!-- 14. Common Mistakes -->
          <section class="dp-section-card" id="dp-sec-mistakes">
            <h3 class="dp-section-title">
              <span class="dp-sec-num">14</span>
              <span>Common Mistakes & Gotchas to Avoid</span>
            </h3>
            <ul class="dp-mistakes-list">
              ${mistakesHtml}
            </ul>
          </section>

          <!-- 15. Key Takeaway -->
          <section class="dp-section-card" id="dp-sec-takeaway">
            <h3 class="dp-section-title">
              <span class="dp-sec-num">15</span>
              <span>Key Takeaway</span>
            </h3>
            <div class="dp-takeaway-box flex items-start gap-3">
              <span class="material-symbols-outlined text-indigo-600 text-[22px] shrink-0 mt-0.5">emoji_objects</span>
              <div>${escapeHtml(exp.takeaway)}</div>
            </div>
          </section>

        </div>

        <!-- Personal Notes Section -->
        <div class="dp-notes-card" id="dp-notes-section">
          <div class="dp-notes-header">
            <div class="dp-notes-title">
              <span class="material-symbols-outlined text-indigo-600">edit_note</span>
              <span>📝 My Personal Notes</span>
            </div>
            <span class="dp-notes-status" id="dp-notes-save-status">Saved</span>
          </div>
          <p class="text-xs text-slate-500 mb-2">Reflect on what you learned: "What mistake did I make?", "What pattern did I recognize?", "Key formula to remember":</p>
          <textarea class="dp-notes-textarea" id="dp-notes-input" placeholder="Type personal notes, tricks, or edge cases to remember for this question...">${escapeHtml(userNotes)}</textarea>
        </div>

        <!-- Previous / Next Problem Navigation Footer -->
        <div class="dp-nav-footer">
          <button class="dp-nav-btn" id="dp-btn-prev" ${hasPrev ? '' : 'disabled'}>
            <span class="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Previous Problem</span>
          </button>

          <span class="text-xs font-semibold text-slate-500" id="dp-nav-count">
            Problem ${currentContextIndex + 1} of ${currentContextList.length}
          </span>

          <button class="dp-nav-btn" id="dp-btn-next" ${hasNext ? '' : 'disabled'}>
            <span>Next Problem</span>
            <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>

      </div>
    `;

    // Attach listeners for interactive elements inside problem detail
    attachDetailEventListeners();
  }

  /**
   * Helper: Render line-by-line explanation items
   */
  function renderExplanationItems(items) {
    if (!items || items.length === 0) {
      return `<li class="dp-explanation-item">Detailed code explanation available for this implementation.</li>`;
    }
    return items.map(item => `
      <li class="dp-explanation-item">
        <span class="material-symbols-outlined">check_circle</span>
        <span>${escapeHtml(item)}</span>
      </li>
    `).join('');
  }

  /**
   * Helper: Return display name for language
   */
  function getLanguageDisplay(lang) {
    switch (lang) {
      case 'cpp': return 'C++';
      case 'java': return 'Java';
      case 'javascript': return 'JavaScript';
      case 'python':
      default: return 'Python';
    }
  }

  /**
   * Attach interactive listeners inside Problem Detail view
   */
  function attachDetailEventListeners() {
    const exp = currentExplanation;
    const qid = exp.id;

    // 1. Breadcrumb & Back buttons
    const crumbHome = document.getElementById('dp-crumb-home');
    const btnBack = document.getElementById('dp-btn-back-nav');
    if (crumbHome) crumbHome.addEventListener('click', (e) => { e.preventDefault(); closeProblemDetail(); });
    if (btnBack) btnBack.addEventListener('click', closeProblemDetail);

    // 2. Language Tab switching
    const langTabs = document.querySelectorAll('.dp-lang-tab');
    langTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const lang = tab.dataset.codeLang;
        if (!lang || lang === currentLanguage) return;

        currentLanguage = lang;
        Storage.set('dsa_preferred_lang', lang);

        langTabs.forEach(t => t.classList.toggle('active', t.dataset.codeLang === lang));

        // Update code snippet
        const codeBlock = document.getElementById('dp-code-block');
        if (codeBlock && exp.code && exp.code[lang]) {
          codeBlock.textContent = exp.code[lang];
        }

        // Update explanation dynamically
        const explTitle = document.getElementById('dp-expl-lang-label');
        if (explTitle) explTitle.textContent = `12. Code Explanation (${getLanguageDisplay(lang)})`;

        const explList = document.getElementById('dp-explanation-list');
        if (explList && exp.codeExplanation && exp.codeExplanation[lang]) {
          explList.innerHTML = renderExplanationItems(exp.codeExplanation[lang]);
        }
      });
    });

    // 3. Copy Code Button
    const copyBtn = document.getElementById('dp-btn-copy-code');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const codeText = (exp.code && exp.code[currentLanguage]) || '';
        if (typeof copyToClipboard === 'function') {
          copyToClipboard(codeText, `${getLanguageDisplay(currentLanguage)} solution copied to clipboard!`);
        } else if (navigator.clipboard) {
          navigator.clipboard.writeText(codeText);
        }

        const label = document.getElementById('dp-copy-label');
        if (label) label.textContent = 'Copied!';
        setTimeout(() => {
          if (label) label.textContent = 'Copy Code';
        }, 2000);
      });
    }

    // 4. Hints trigger buttons
    const hintTriggers = document.querySelectorAll('.dp-hint-trigger[data-hint-idx]');
    hintTriggers.forEach(btn => {
      btn.addEventListener('click', () => {
        const hintIdx = parseInt(btn.dataset.hintIdx, 10);
        const box = document.getElementById(`dp-hint-box-${hintIdx}`);
        if (!box) return;

        const isOpen = box.classList.contains('open');
        if (isOpen) {
          box.classList.remove('open');
          btn.classList.remove('revealed');
        } else {
          box.classList.add('open');
          btn.classList.add('revealed');

          // Save hint disclosure
          const hintsData = Storage.get('dsa_hints', {}) || {};
          if (!hintsData[qid]) hintsData[qid] = { revealed: [], approachRevealed: false };
          if (!hintsData[qid].revealed.includes(hintIdx)) {
            hintsData[qid].revealed.push(hintIdx);
          }
          Storage.set('dsa_hints', hintsData);

          // Update badge
          const badge = document.getElementById('dp-hints-badge');
          if (badge) {
            badge.textContent = `${hintsData[qid].revealed.length} of ${(exp.hints || []).length} Hints Used`;
          }
        }
      });
    });

    // 5. Reveal Approach button
    const btnRevealApproach = document.getElementById('dp-btn-reveal-approach');
    if (btnRevealApproach) {
      btnRevealApproach.addEventListener('click', () => {
        const approachSec = document.getElementById('dp-sec-approach');
        if (approachSec) {
          approachSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
          approachSec.classList.add('pl-row-highlight');
          setTimeout(() => approachSec.classList.remove('pl-row-highlight'), 2000);
        }

        const hintsData = Storage.get('dsa_hints', {}) || {};
        if (!hintsData[qid]) hintsData[qid] = { revealed: [], approachRevealed: false };
        hintsData[qid].approachRevealed = true;
        Storage.set('dsa_hints', hintsData);

        btnRevealApproach.classList.add('revealed');
      });
    }

    // 6. Review Later toggle
    const btnReview = document.getElementById('dp-btn-toggle-review');
    if (btnReview) {
      btnReview.addEventListener('click', () => {
        const reviews = Storage.get('dsa_reviews', {}) || {};
        const isNowInReview = !reviews[qid];

        if (isNowInReview) {
          reviews[qid] = true;
        } else {
          delete reviews[qid];
        }
        Storage.set('dsa_reviews', reviews);

        btnReview.classList.toggle('in-review', isNowInReview);
        const textSpan = document.getElementById('dp-review-btn-text');
        if (textSpan) {
          textSpan.textContent = isNowInReview ? '★ In Review' : '☆ Review Later';
        }
        const iconSpan = btnReview.querySelector('.material-symbols-outlined');
        if (iconSpan) {
          iconSpan.textContent = isNowInReview ? 'star' : 'star_border';
        }

        if (typeof showToast === 'function') {
          showToast(isNowInReview ? 'Problem marked for revision (★ In Review)' : 'Problem removed from revision list', 'info');
        }

        window.dispatchEvent(new CustomEvent('dsaReviewSync', {
          detail: { qid, isInReview: isNowInReview }
        }));
      });
    }

    // 7. Rate Solve / Mark Solved button
    const btnRateSolve = document.getElementById('dp-btn-rate-solve');
    if (btnRateSolve) {
      btnRateSolve.addEventListener('click', () => {
        if (window.DsaPatternController && typeof window.DsaPatternController.openSolveEvaluationModal === 'function') {
          window.DsaPatternController.openSolveEvaluationModal(qid);
        } else {
          window.dispatchEvent(new CustomEvent('openDsaSolveModal', { detail: { qid } }));
        }
      });
    }

    // 7b. Revision Notice Re-rate button
    const btnNoticeReEval = document.getElementById('dp-btn-notice-re-eval');
    if (btnNoticeReEval) {
      btnNoticeReEval.addEventListener('click', () => {
        if (window.DsaPatternController && typeof window.DsaPatternController.openSolveEvaluationModal === 'function') {
          window.DsaPatternController.openSolveEvaluationModal(qid);
        } else {
          window.dispatchEvent(new CustomEvent('openDsaSolveModal', { detail: { qid } }));
        }
      });
    }

    // 8. Personal Notes Auto-Saving
    const notesInput = document.getElementById('dp-notes-input');
    const notesStatus = document.getElementById('dp-notes-save-status');
    if (notesInput) {
      let timeoutId = null;
      notesInput.addEventListener('input', () => {
        if (notesStatus) notesStatus.textContent = 'Saving...';
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          const notesData = Storage.get('dsa_notes', {}) || {};
          const val = notesInput.value.trim();
          if (val) {
            notesData[qid] = val;
          } else {
            delete notesData[qid];
          }
          Storage.set('dsa_notes', notesData);
          if (notesStatus) notesStatus.textContent = 'All changes saved ✓';
        }, 600);
      });
    }

    // 9. Previous & Next problem navigation
    const btnPrev = document.getElementById('dp-btn-prev');
    if (btnPrev && currentContextIndex > 0) {
      btnPrev.addEventListener('click', () => {
        const targetQid = currentContextList[currentContextIndex - 1];
        openProblemDetail(targetQid, currentContextList, currentSourceView);
      });
    }

    const btnNext = document.getElementById('dp-btn-next');
    if (btnNext && currentContextIndex < currentContextList.length - 1) {
      btnNext.addEventListener('click', () => {
        const targetQid = currentContextList[currentContextIndex + 1];
        openProblemDetail(targetQid, currentContextList, currentSourceView);
      });
    }
  }

  /**
   * Renders the Dedicated Revision Dashboard
   */
  function renderRevisionDashboard() {
    if (!dom.revisionView) return;

    const progress = Storage.get('dsa_progress', {}) || {};
    const reviews = Storage.get('dsa_reviews', {}) || {};
    const hintsData = Storage.get('dsa_hints', {}) || {};
    const patternStats = Storage.get('dsa_pattern_stats', {}) || {};
    const evaluations = patternStats.evaluations || {};

    const allQuestions = window.dsaAllQuestions || [];

    // Filter problems that need revision:
    // 1. Starred in Review Later
    // 2. Solved with ~30% AI / Hint Help
    // 3. Solved with ~50% AI / Editorial Help
    // 4. Solved with Copy / Paste (cross)
    // 5. Questions where hints were used
    // 6. Questions in patterns flagged as weak
    const reviewLaterList = allQuestions.filter(q => !!reviews[q.id]);
    const help30List = allQuestions.filter(q => evaluations[q.id] === 'help30' || evaluations[q.id] === 'help');
    const help50List = allQuestions.filter(q => evaluations[q.id] === 'help50');
    const crossList = allQuestions.filter(q => evaluations[q.id] === 'cross');
    const hintsUsedList = allQuestions.filter(q => hintsData[q.id] && (hintsData[q.id].revealed || []).length > 0);
    const weakPatternList = allQuestions.filter(q => patternStats.weak && patternStats.weak[q.patternId]);

    // Unique combined set of all questions needing revision
    const allRevisionMap = new Map();
    [...reviewLaterList, ...help30List, ...help50List, ...crossList, ...hintsUsedList, ...weakPatternList].forEach(q => {
      allRevisionMap.set(q.id, q);
    });
    const allRevisionQuestions = Array.from(allRevisionMap.values());

    // Filter by active revision tab
    let displayList = allRevisionQuestions;
    if (revisionFilter === 'starred') displayList = reviewLaterList;
    else if (revisionFilter === 'help30') displayList = help30List;
    else if (revisionFilter === 'help50') displayList = help50List;
    else if (revisionFilter === 'cross') displayList = crossList;
    else if (revisionFilter === 'hints-used') displayList = hintsUsedList;
    else if (revisionFilter === 'weak-patterns') displayList = weakPatternList;

    dom.revisionView.innerHTML = `
      <div class="dp-revision-container">
        <!-- Header -->
        <div class="mb-6">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold mb-2">
            <span class="material-symbols-outlined text-[16px]">history_edu</span>
            <span>Personal Revision Hub</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">📌 Revision Mode</h2>
          <p class="text-slate-600 text-sm mt-1">Review flagged problems, re-attempt ~30% and ~50% assisted solves to reach 100% Self Mastery, and reinforce weak patterns.</p>
        </div>

        <!-- 6 Revision Stats Cards -->
        <div class="dp-revision-stats-grid">
          <div class="dp-rev-stat-card cursor-pointer hover:border-amber-400 transition-colors" data-rev-filter="starred" title="Click to filter Starred problems">
            <div class="dp-rev-stat-icon bg-amber-50 text-amber-600 border border-amber-200">
              <span class="material-symbols-outlined">star</span>
            </div>
            <div>
              <div class="dp-rev-stat-num">${reviewLaterList.length}</div>
              <div class="dp-rev-stat-label">Review Later (★)</div>
            </div>
          </div>

          <div class="dp-rev-stat-card cursor-pointer hover:border-amber-500 transition-colors" data-rev-filter="help30" title="Click to filter 30% Help problems">
            <div class="dp-rev-stat-icon bg-amber-50 text-amber-600 border border-amber-300">
              <span class="material-symbols-outlined">psychology</span>
            </div>
            <div>
              <div class="dp-rev-stat-num text-amber-600">${help30List.length}</div>
              <div class="dp-rev-stat-label">~30% AI Help</div>
            </div>
          </div>

          <div class="dp-rev-stat-card cursor-pointer hover:border-orange-500 transition-colors" data-rev-filter="help50" title="Click to filter 50% Help problems">
            <div class="dp-rev-stat-icon bg-orange-50 text-orange-600 border border-orange-300">
              <span class="material-symbols-outlined">smart_toy</span>
            </div>
            <div>
              <div class="dp-rev-stat-num text-orange-600">${help50List.length}</div>
              <div class="dp-rev-stat-label">~50% Editorial Help</div>
            </div>
          </div>

          <div class="dp-rev-stat-card cursor-pointer hover:border-rose-500 transition-colors" data-rev-filter="cross" title="Click to filter Copied problems">
            <div class="dp-rev-stat-icon bg-rose-50 text-rose-600 border border-rose-200">
              <span class="material-symbols-outlined">content_paste_off</span>
            </div>
            <div>
              <div class="dp-rev-stat-num text-rose-600">${crossList.length}</div>
              <div class="dp-rev-stat-label">Copied Solves</div>
            </div>
          </div>

          <div class="dp-rev-stat-card cursor-pointer hover:border-indigo-500 transition-colors" data-rev-filter="hints-used" title="Click to filter Hint-assisted problems">
            <div class="dp-rev-stat-icon bg-indigo-50 text-indigo-600 border border-indigo-200">
              <span class="material-symbols-outlined">lightbulb</span>
            </div>
            <div>
              <div class="dp-rev-stat-num">${hintsUsedList.length}</div>
              <div class="dp-rev-stat-label">Hints Opened</div>
            </div>
          </div>

          <div class="dp-rev-stat-card cursor-pointer hover:border-purple-500 transition-colors" data-rev-filter="weak-patterns" title="Click to filter Weak Pattern problems">
            <div class="dp-rev-stat-icon bg-purple-50 text-purple-600 border border-purple-200">
              <span class="material-symbols-outlined">warning</span>
            </div>
            <div>
              <div class="dp-rev-stat-num">${Object.keys(patternStats.weak || {}).length}</div>
              <div class="dp-rev-stat-label">Weak Patterns</div>
            </div>
          </div>
        </div>

        <!-- Revision Filter Chips -->
        <div class="dp-rev-chips" role="group" aria-label="Filter revision problems">
          <button class="dp-rev-chip ${revisionFilter === 'all' ? 'active' : ''}" data-rev-filter="all">
            All Revision (${allRevisionQuestions.length})
          </button>
          <button class="dp-rev-chip ${revisionFilter === 'starred' ? 'active' : ''}" data-rev-filter="starred">
            ★ Starred (${reviewLaterList.length})
          </button>
          <button class="dp-rev-chip dp-rev-chip-help30 ${revisionFilter === 'help30' ? 'active' : ''}" data-rev-filter="help30">
            <span class="material-symbols-outlined text-[14px]">psychology</span>
            <span>~30% Help (${help30List.length})</span>
          </button>
          <button class="dp-rev-chip dp-rev-chip-help50 ${revisionFilter === 'help50' ? 'active' : ''}" data-rev-filter="help50">
            <span class="material-symbols-outlined text-[14px]">smart_toy</span>
            <span>~50% Help (${help50List.length})</span>
          </button>
          <button class="dp-rev-chip dp-rev-chip-cross ${revisionFilter === 'cross' ? 'active' : ''}" data-rev-filter="cross">
            <span class="material-symbols-outlined text-[14px]">content_paste_off</span>
            <span>Copied (${crossList.length})</span>
          </button>
          <button class="dp-rev-chip ${revisionFilter === 'hints-used' ? 'active' : ''}" data-rev-filter="hints-used">
            <span class="material-symbols-outlined text-[14px]">lightbulb</span>
            <span>Used Hints (${hintsUsedList.length})</span>
          </button>
          <button class="dp-rev-chip ${revisionFilter === 'weak-patterns' ? 'active' : ''}" data-rev-filter="weak-patterns">
            <span class="material-symbols-outlined text-[14px]">warning</span>
            <span>Weak Patterns (${weakPatternList.length})</span>
          </button>
        </div>

        <!-- Problems List -->
        <div class="dsa-question-list bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
          ${displayList.length > 0 ? displayList.map(q => {
            const isSolved = !!progress[q.id];
            const isStarred = !!reviews[q.id];
            const ev = evaluations[q.id];
            const diffClass = (q.difficulty || 'Easy').toLowerCase();

            let evalBadgeHtml = '';
            if (ev === 'help30' || ev === 'help') {
              evalBadgeHtml = `<span class="pl-eval-pill pl-eval-pill-help30" title="Solved with ~30% AI Help"><span class="material-symbols-outlined text-[12px]">psychology</span> 30% Help</span>`;
            } else if (ev === 'help50') {
              evalBadgeHtml = `<span class="pl-eval-pill pl-eval-pill-help50" title="Solved with ~50% AI/Editorial Help"><span class="material-symbols-outlined text-[12px]">smart_toy</span> 50% Help</span>`;
            } else if (ev === 'cross') {
              evalBadgeHtml = `<span class="pl-eval-pill pl-eval-pill-cross" title="Direct Solution Copied"><span class="material-symbols-outlined text-[12px]">content_paste_off</span> Copied</span>`;
            } else if (ev === 'self') {
              evalBadgeHtml = `<span class="pl-eval-pill pl-eval-pill-self" title="100% Solved on my own"><span class="material-symbols-outlined text-[12px]">verified</span> Self</span>`;
            }

            return `
              <div class="dsa-question-row cursor-pointer hover:bg-slate-50 transition-colors" data-open-detail="${q.id}">
                <div class="dsa-question-left">
                  <span class="material-symbols-outlined text-[18px] cursor-pointer ${isStarred ? 'text-amber-500' : 'text-slate-300'}" data-toggle-star="${q.id}" title="${isStarred ? 'Remove from Review' : 'Mark for Review'}">
                    ${isStarred ? 'star' : 'star_border'}
                  </span>
                  <span class="dsa-lc-num">#${q.leetcodeNumber}</span>
                  <div class="dsa-question-info">
                    <div class="dsa-question-title-wrap">
                      <span class="dsa-question-title font-semibold text-slate-800">${escapeHtml(q.title)}</span>
                    </div>
                    <div class="dsa-question-tags">
                      <span class="dsa-tag-ds">
                        <span class="material-symbols-outlined text-[12px]">schema</span>
                        <span>${escapeHtml(q.category)}</span>
                      </span>
                      <span class="dsa-tag-pattern">
                        <span class="material-symbols-outlined text-[12px]">alt_route</span>
                        <span>${escapeHtml(q.pattern)}</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="dsa-question-right">
                  ${evalBadgeHtml}
                  <span class="dsa-badge-diff dsa-badge-${diffClass}">${q.difficulty}</span>
                  <div class="dp-rev-row-actions">
                    <button class="dp-btn-re-rate" data-re-eval-qid="${q.id}" title="Re-attempt or re-rate solve quality">
                      <span class="material-symbols-outlined text-[13px]">refresh</span>
                      <span>Re-rate</span>
                    </button>
                    <button class="btn-primary text-xs py-1 px-3 inline-flex items-center gap-1" data-open-detail="${q.id}">
                      <span>Study</span>
                      <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            `;
          }).join('') : `
            <div class="text-center py-12">
              <span class="material-symbols-outlined text-4xl text-slate-300 mb-2">checklist_rtl</span>
              <h3 class="text-base font-bold text-slate-700">No Revision Problems Found</h3>
              <p class="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Problems marked with '☆ Review Later' or solved with ~30% and ~50% help automatically appear here for practice!
              </p>
            </div>
          `}
        </div>
      </div>
    `;

    // Attach revision filter listeners
    dom.revisionView.querySelectorAll('[data-rev-filter]').forEach(btn => {
      btn.addEventListener('click', () => {
        revisionFilter = btn.dataset.revFilter;
        renderRevisionDashboard();
      });
    });

    // Attach star toggle listener
    dom.revisionView.querySelectorAll('[data-toggle-star]').forEach(starEl => {
      starEl.addEventListener('click', (e) => {
        e.stopPropagation();
        const qid = starEl.dataset.toggleStar;
        const reviews = Storage.get('dsa_reviews', {}) || {};
        const isNowStarred = !reviews[qid];
        if (isNowStarred) reviews[qid] = true;
        else delete reviews[qid];
        Storage.set('dsa_reviews', reviews);
        window.dispatchEvent(new CustomEvent('dsaReviewSync', { detail: { qid, isInReview: isNowStarred } }));
        renderRevisionDashboard();
      });
    });

    // Attach re-rate button listener
    dom.revisionView.querySelectorAll('[data-re-eval-qid]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const qid = btn.dataset.reEvalQid;
        if (window.DsaPatternController && typeof window.DsaPatternController.openSolveEvaluationModal === 'function') {
          window.DsaPatternController.openSolveEvaluationModal(qid);
        } else {
          window.dispatchEvent(new CustomEvent('openDsaSolveModal', { detail: { qid } }));
        }
      });
    });

    // Attach click listener to open problem detail
    dom.revisionView.querySelectorAll('[data-open-detail]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const qid = el.dataset.openDetail;
        if (qid) {
          openProblemDetail(qid, displayList, 'revision');
        }
      });
    });
  }

  /**
   * Handle progress synchronization from roadmap or pattern learning
   */
  function onProgressSync(e) {
    if (dom.detailView && !dom.detailView.classList.contains('hidden') && currentQuestionId) {
      renderProblemDetail(currentQuestionId);
    }
    if (dom.revisionView && !dom.revisionView.classList.contains('hidden')) {
      renderRevisionDashboard();
    }
  }

  /**
   * Handle review toggle synchronization
   */
  function onReviewSync(e) {
    if (dom.revisionView && !dom.revisionView.classList.contains('hidden')) {
      renderRevisionDashboard();
    }
  }

  // Public API
  window.DsaProblemController.openProblemDetail = openProblemDetail;
  window.DsaProblemController.closeProblemDetail = closeProblemDetail;
  window.DsaProblemController.switchToView = switchToView;
  window.DsaProblemController.renderRevisionDashboard = renderRevisionDashboard;

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
