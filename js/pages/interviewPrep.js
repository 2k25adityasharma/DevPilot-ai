/**
 * DevPilot-AI — Interview Preparation Controller
 * Coordinates category browsing, question engine, mock test with live timer,
 * weak topic tracking, checklists, and GD/HR prep.
 */

(function () {
  'use strict';

  const STORAGE_PROGRESS_KEY = 'devpilot_interview_prep_progress';
  const STORAGE_CHECKLISTS_KEY = 'devpilot_interview_prep_checklists';
  const STORAGE_RECENT_KEY = 'devpilot_interview_prep_recent';

  const state = {
    currentMode: 'categories', // 'categories' | 'quiz' | 'mockTest' | 'technical' | 'weakTopics' | 'checklists' | 'gdHr'
    activeCategory: null,
    activeTopic: null,
    searchQuery: '',
    
    // Quiz Engine State
    quiz: {
      questions: [],
      currentIndex: 0,
      selectedOption: null,
      isAnswered: false,
      userAnswers: [], // { questionId, selectedIndex, correctIndex, isCorrect }
      sessionStats: { correct: 0, incorrect: 0, total: 0 },
      sourceMode: 'category' // 'category' | 'weakTopics' | 'mixed'
    },

    // Mock Test State
    mockTest: {
      active: false,
      questions: [],
      currentIndex: 0,
      answers: {}, // questionIndex: selectedOption
      timeRemaining: 3600, // 60 minutes in seconds
      timerInterval: null
    },

    // Persistent storage
    progress: {},
    checklists: {},
    recentActivity: null
  };

  function init() {
    loadStorage();
    setupEventListeners();
    updateMetrics();
    renderMode(state.currentMode);
    handleUrlParams();
  }

  function handleUrlParams() {
    try {
      if (typeof window === 'undefined' || !window.location || !window.location.search) return;
      const params = new URLSearchParams(window.location.search);
      const catId = params.get('cat');
      const topic = params.get('topic');         // active subsection (for highlighting)
      const autoStart = params.get('start');     // 'quiz' → auto-start quiz

      if (catId && window.interviewPrepRegistry) {
        const cat = window.interviewPrepRegistry.getCategory(catId);
        if (cat) {
          // Always open the category view so the user sees sections & subsections
          openCategoryModal(cat);

          if (topic) {
            if (autoStart === 'quiz') {
              // Explicit deep-link: jump straight to the quiz
              startTopicQuiz(catId, topic);
            } else {
              // Highlight the active topic row and scroll to it so the user
              // can see exactly where they left off without forcing the quiz
              requestAnimationFrame(() => {
                const list = document.getElementById('ipTopicList');
                if (!list) return;
                const items = list.querySelectorAll('.ip-topic-item');
                items.forEach(item => {
                  const nameEl = item.querySelector('.ip-topic-name');
                  if (nameEl && nameEl.textContent.trim().toLowerCase() === topic.trim().toLowerCase()) {
                    item.classList.add('ring-2', 'ring-primary', 'ring-offset-1');
                    item.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
                });
              });
            }
          }
        }
      }
    } catch (e) {
      console.warn('Error handling URL params in interviewPrep:', e);
    }
  }

  function loadStorage() {
    try {
      const p = localStorage.getItem(STORAGE_PROGRESS_KEY);
      state.progress = p ? JSON.parse(p) : {};
    } catch (e) {
      state.progress = {};
    }

    try {
      const c = localStorage.getItem(STORAGE_CHECKLISTS_KEY);
      state.checklists = c ? JSON.parse(c) : {};
    } catch (e) {
      state.checklists = {};
    }

    try {
      const r = localStorage.getItem(STORAGE_RECENT_KEY);
      state.recentActivity = r ? JSON.parse(r) : null;
    } catch (e) {
      state.recentActivity = null;
    }
  }

  function saveProgress() {
    try {
      localStorage.setItem(STORAGE_PROGRESS_KEY, JSON.stringify(state.progress));
    } catch (e) {}
  }

  function saveChecklists() {
    try {
      localStorage.setItem(STORAGE_CHECKLISTS_KEY, JSON.stringify(state.checklists));
    } catch (e) {}
  }

  function saveRecent(categoryId, topic) {
    state.recentActivity = { categoryId, topic, timestamp: Date.now() };
    try {
      localStorage.setItem(STORAGE_RECENT_KEY, JSON.stringify(state.recentActivity));
    } catch (e) {}
    renderRecentBanner();
  }

  function setupEventListeners() {
    // Mode tabs
    document.querySelectorAll('.ip-mode-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        const mode = e.currentTarget.dataset.mode;
        if (mode) switchMode(mode);
      });
    });

    // Search bar
    const searchInput = document.getElementById('ipSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value.trim().toLowerCase();
        if (state.currentMode === 'categories' || state.currentMode === 'technical') {
          renderCategoriesGrid();
        }
      });
    }
  }

  function switchMode(newMode) {
    if (state.mockTest.active && newMode !== 'mockTest') {
      if (!confirm('You have an active Mock Placement Test in progress. Switching modes will abort this test. Are you sure?')) {
        return;
      }
      abortMockTest();
    }

    state.currentMode = newMode;
    document.querySelectorAll('.ip-mode-tab').forEach(t => {
      t.classList.toggle('active', t.dataset.mode === newMode);
    });

    renderMode(newMode);
  }

  function renderMode(mode) {
    const mainContainer = document.getElementById('ipMainContent');
    if (!mainContainer) return;

    renderRecentBanner();

    switch (mode) {
      case 'categories':
        renderCategoriesView(false);
        break;
      case 'technical':
        renderCategoriesView(true);
        break;
      case 'mockTest':
        renderMockTestView();
        break;
      case 'weakTopics':
        renderWeakTopicsView();
        break;
      case 'checklists':
        renderChecklistsView();
        break;
      case 'gdHr':
        renderGdHrView();
        break;
      case 'quiz':
        renderQuizView();
        break;
      default:
        renderCategoriesView(false);
    }
  }

  function renderRecentBanner() {
    const banner = document.getElementById('ipResumeBanner');
    if (!banner) return;

    if (!state.recentActivity || !window.interviewPrepRegistry) {
      banner.classList.add('hidden');
      return;
    }

    const cat = window.interviewPrepRegistry.getCategory(state.recentActivity.categoryId);
    if (!cat) {
      banner.classList.add('hidden');
      return;
    }

    banner.classList.remove('hidden');
    banner.className = 'dev-card p-4 mb-6 flex items-center justify-between flex-wrap gap-4 bg-indigo-50/50 dark:bg-indigo-950/30 border-indigo-200/60 dark:border-indigo-800/60';
    banner.innerHTML = `
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
          <span class="material-symbols-outlined text-2xl">${cat.icon || 'history'}</span>
        </div>
        <div>
          <div class="text-xs text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider">Jump Back In</div>
          <div class="text-sm font-bold text-on-surface">${state.recentActivity.topic || cat.title}</div>
        </div>
      </div>
      <button id="ipResumeBtn" class="btn-primary text-xs py-2 px-4 flex items-center gap-1.5">
        <span>Continue Practice</span>
        <span class="material-symbols-outlined text-xs">arrow_forward</span>
      </button>
    `;

    document.getElementById('ipResumeBtn').addEventListener('click', () => {
      startTopicQuiz(cat.id, state.recentActivity.topic);
    });
  }

  // ==========================================================
  // CATEGORIES VIEW (Browse & Topic Drilldown)
  // ==========================================================
  function renderCategoriesView(technicalOnly = false) {
    const mainContainer = document.getElementById('ipMainContent');
    if (!mainContainer) return;

    const categories = window.interviewPrepRegistry.getAllCategories();
    const techCategoryIds = [
      'programming', 'oop', 'dbms', 'sql', 'operatingSystems', 'computerNetworks',
      'computer_organization', 'software_engineering', 'system_design',
      'web_development', 'git_version_control', 'cloud_devops', 'ai_machine_learning'
    ];

    const filtered = categories.filter(c => {
      if (technicalOnly && !techCategoryIds.includes(c.id)) return false;
      if (!state.searchQuery) return true;
      const matchTitle = c.title.toLowerCase().includes(state.searchQuery);
      const matchDesc = c.description.toLowerCase().includes(state.searchQuery);
      const matchTopics = c.topics && c.topics.some(t => t.toLowerCase().includes(state.searchQuery));
      return matchTitle || matchDesc || matchTopics;
    });

    mainContainer.innerHTML = `
      <div class="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h2 class="text-xl font-bold text-on-surface" style="font-family: 'Plus Jakarta Sans', system-ui, sans-serif;">
            ${technicalOnly ? 'Technical Interview Tracks' : 'Placement & Interview Categories'}
          </h2>
          <p class="text-sm text-on-surface-variant mt-0.5">
            ${technicalOnly ? 'Deep-dive into programming languages, CS fundamentals, system design, and modern stacks.' : 'Select any category to practice authentic MCQs topic-by-topic with detailed explanations.'}
          </p>
        </div>
        <div class="badge badge-neutral text-xs px-3 py-1.5 font-medium">
          Showing ${filtered.length} ${technicalOnly ? 'Technical Tracks' : 'Categories'} • ${technicalOnly ? '1,570' : '2,170'} Questions
        </div>
      </div>
      <div class="ip-categories-grid" id="ipCategoriesGrid"></div>
    `;

    const grid = document.getElementById('ipCategoriesGrid');
    filtered.forEach(cat => {
      const card = document.createElement('div');
      card.className = 'ip-cat-card dev-card dev-card-interactive';

      // Calculate category progress
      let catAttempted = 0;
      let catCorrect = 0;
      if (cat.questions) {
        cat.questions.forEach(q => {
          const prog = state.progress[`q:${q.id}`];
          if (prog) {
            catAttempted += prog.attempted || 0;
            catCorrect += prog.correct || 0;
          }
        });
      }
      const catAccuracy = catAttempted > 0 ? Math.round((catCorrect / catAttempted) * 100) : 0;

      card.innerHTML = `
        <div>
          <div class="ip-cat-header">
            <div class="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-100 dark:border-indigo-900/50">
              <span class="material-symbols-outlined text-2xl" style='font-variation-settings: "FILL" 1;'>${cat.icon || 'school'}</span>
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="ip-cat-title truncate">${cat.title}</h3>
              <span class="badge badge-neutral text-xs">
                ${cat.topics ? cat.topics.length : 0} Topics • ${cat.totalQuestions} MCQs
              </span>
            </div>
          </div>
          <p class="ip-cat-desc">${cat.description}</p>
        </div>

        <div>
          ${catAttempted > 0 ? `
            <div class="mb-3">
              <div class="flex justify-between text-xs text-on-surface-variant mb-1">
                <span>Accuracy</span>
                <span class="font-semibold text-on-surface">${catAccuracy}% (${catCorrect}/${catAttempted})</span>
              </div>
              <div class="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                <div class="h-full ${catAccuracy >= 75 ? 'bg-emerald-500' : catAccuracy >= 50 ? 'bg-amber-500' : 'bg-red-500'}" style="width: ${catAccuracy}%"></div>
              </div>
            </div>
          ` : ''}

          <div class="ip-cat-actions">
            <button class="btn-primary flex-1 text-xs py-2 px-3.5 ip-open-cat-btn" data-cat="${cat.id}">
              <span>Explore Topics</span>
              <span class="material-symbols-outlined text-xs">arrow_forward</span>
            </button>
            <button class="btn-secondary text-xs py-2 px-3 ip-start-all-btn" data-cat="${cat.id}" title="Practice all questions randomly">
              <span class="material-symbols-outlined text-xs">shuffle</span>
            </button>
          </div>
        </div>
      `;

      card.querySelector('.ip-open-cat-btn').addEventListener('click', () => openCategoryModal(cat));
      card.querySelector('.ip-start-all-btn').addEventListener('click', () => startCategoryQuiz(cat.id));

      grid.appendChild(card);
    });
  }

  function openCategoryModal(cat) {
    const mainContainer = document.getElementById('ipMainContent');
    if (!mainContainer) return;

    // ✅ Update recent activity when user opens any category,
    //    so the dashboard always shows the correct section even without starting a quiz.
    saveRecent(cat.id, state.recentActivity?.topic && state.recentActivity?.categoryId === cat.id
      ? state.recentActivity.topic   // keep the active topic if same category
      : null);                       // clear topic if switching to a new category

    mainContainer.innerHTML = `
      <div class="mb-6">
        <button id="ipBackToCats" class="inline-flex items-center gap-1.5 text-sm font-medium text-on-surface-variant hover:text-primary mb-4 transition">
          <span class="material-symbols-outlined text-sm">arrow_back</span>
          <span>Back to All Categories</span>
        </button>
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-100 dark:border-indigo-900/50 shrink-0">
            <span class="material-symbols-outlined text-2xl" style='font-variation-settings: "FILL" 1;'>${cat.icon}</span>
          </div>
          <div>
            <h2 class="text-2xl font-bold text-on-surface">${cat.title}</h2>
            <p class="text-sm text-on-surface-variant mt-0.5">${cat.description}</p>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-between border-b border-outline-variant pb-3 mb-4 flex-wrap gap-2">
        <div class="text-sm font-semibold text-on-surface">Choose a Topic to Practice (10 MCQs each)</div>
        <button id="ipShuffleAllTopicBtn" class="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5">
          <span class="material-symbols-outlined text-xs">shuffle</span>
          <span>Practice All Topics (Random)</span>
        </button>
      </div>

      <div class="ip-topic-list" id="ipTopicList"></div>
    `;

    document.getElementById('ipBackToCats').addEventListener('click', () => renderMode(state.currentMode));
    document.getElementById('ipShuffleAllTopicBtn').addEventListener('click', () => startCategoryQuiz(cat.id));

    const list = document.getElementById('ipTopicList');
    cat.topics.forEach(topicName => {
      const topicQs = cat.questions.filter(q => q.topic && q.topic.toLowerCase() === topicName.toLowerCase());
      
      const tKey = `topic:${cat.id}:${topicName}`;
      const prog = state.progress[tKey] || { attempted: 0, correct: 0 };
      const accuracy = prog.attempted > 0 ? Math.round((prog.correct / prog.attempted) * 100) : 0;

      const item = document.createElement('div');
      item.className = 'ip-topic-item dev-card p-3.5';
      item.innerHTML = `
        <div class="flex items-center gap-3 min-w-0">
          <div class="w-8 h-8 rounded-lg bg-surface-container text-primary flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-base">quiz</span>
          </div>
          <div class="min-w-0">
            <div class="ip-topic-name text-sm font-semibold text-on-surface truncate">${topicName}</div>
            <div class="text-xs text-on-surface-variant">${topicQs.length} Questions • ${prog.attempted > 0 ? `${prog.correct}/${prog.attempted} Correct (${accuracy}%)` : 'Not attempted yet'}</div>
          </div>
        </div>
        <div class="flex items-center gap-2">
          ${prog.attempted > 0 ? `
            <span class="badge ${accuracy >= 70 ? 'badge-success' : 'badge-warning'}">
              ${accuracy}%
            </span>
          ` : ''}
          <button class="btn-primary text-xs py-1.5 px-3 ip-start-topic-btn">
            <span>Start</span>
            <span class="material-symbols-outlined text-xs">play_arrow</span>
          </button>
        </div>
      `;

      item.querySelector('.ip-start-topic-btn').addEventListener('click', () => {
        startTopicQuiz(cat.id, topicName);
      });

      list.appendChild(item);
    });
  }

  // ==========================================================
  // QUESTION ENGINE (Interactive Quiz & Immediate Feedback)
  // ==========================================================
  function startTopicQuiz(categoryId, topicName) {
    const cat = window.interviewPrepRegistry.getCategory(categoryId);
    if (!cat) return;

    const topicQuestions = cat.questions.filter(q => q.topic && q.topic.toLowerCase() === topicName.toLowerCase());
    if (topicQuestions.length === 0) {
      alert('No questions available for this topic.');
      return;
    }

    state.activeCategory = cat;
    state.activeTopic = topicName;
    state.quiz.questions = [...topicQuestions];
    state.quiz.currentIndex = 0;
    state.quiz.selectedOption = null;
    state.quiz.isAnswered = false;
    state.quiz.userAnswers = [];
    state.quiz.sessionStats = { correct: 0, incorrect: 0, total: topicQuestions.length };
    state.quiz.sourceMode = 'category';

    saveRecent(categoryId, topicName);
    state.currentMode = 'quiz';
    renderQuizView();
  }

  function startCategoryQuiz(categoryId) {
    const cat = window.interviewPrepRegistry.getCategory(categoryId);
    if (!cat || !cat.questions || cat.questions.length === 0) return;

    // Pick 20 random questions from category
    const shuffled = [...cat.questions].sort(() => 0.5 - Math.random()).slice(0, 20);

    state.activeCategory = cat;
    state.activeTopic = 'All Topics (Mixed)';
    state.quiz.questions = shuffled;
    state.quiz.currentIndex = 0;
    state.quiz.selectedOption = null;
    state.quiz.isAnswered = false;
    state.quiz.userAnswers = [];
    state.quiz.sessionStats = { correct: 0, incorrect: 0, total: shuffled.length };
    state.quiz.sourceMode = 'mixed';

    saveRecent(categoryId, 'All Topics');
    state.currentMode = 'quiz';
    renderQuizView();
  }

  function startWeakTopicsQuiz() {
    const weakList = window.interviewPrepRegistry.getWeakTopics(state.progress);
    if (weakList.length === 0) {
      alert('No weak topics identified yet. Keep practicing to discover areas for improvement!');
      return;
    }

    // Collect questions from weak topics
    const pool = [];
    weakList.forEach(w => {
      const qs = window.interviewPrepRegistry.getQuestionsByTopic(w.categoryId, w.topic);
      pool.push(...qs);
    });

    const shuffled = pool.sort(() => 0.5 - Math.random()).slice(0, 15);

    state.activeCategory = { id: 'weak_topics', title: 'Weak Topics Drill', icon: 'healing' };
    state.activeTopic = 'Targeted Practice';
    state.quiz.questions = shuffled;
    state.quiz.currentIndex = 0;
    state.quiz.selectedOption = null;
    state.quiz.isAnswered = false;
    state.quiz.userAnswers = [];
    state.quiz.sessionStats = { correct: 0, incorrect: 0, total: shuffled.length };
    state.quiz.sourceMode = 'weakTopics';

    state.currentMode = 'quiz';
    renderQuizView();
  }

  function renderQuizView() {
    const mainContainer = document.getElementById('ipMainContent');
    if (!mainContainer) return;

    const q = state.quiz.questions[state.quiz.currentIndex];
    if (!q) {
      renderQuizResults();
      return;
    }

    const total = state.quiz.questions.length;
    const currentNum = state.quiz.currentIndex + 1;
    const progressPercent = Math.round((currentNum / total) * 100);

    mainContainer.innerHTML = `
      <div class="max-w-3xl mx-auto">
        <!-- Header Bar -->
        <div class="flex items-center justify-between mb-4">
          <button id="ipExitQuizBtn" class="inline-flex items-center gap-1.5 text-sm font-medium text-on-surface-variant hover:text-primary transition">
            <span class="material-symbols-outlined text-sm">close</span>
            <span>Exit Practice</span>
          </button>
          <div class="badge badge-primary px-3 py-1 font-semibold">
            ${state.activeCategory ? state.activeCategory.title : 'Interview Prep'} • ${state.activeTopic || q.topic}
          </div>
        </div>

        <!-- Question Card -->
        <div class="dev-card p-6 sm:p-8 mb-6">
          <!-- Progress Bar -->
          <div class="ip-quiz-progress-bar">
            <div class="ip-quiz-progress-fill" style="width: ${progressPercent}%"></div>
          </div>

          <div class="ip-quiz-header">
            <div class="flex items-center gap-2">
              <span class="text-sm font-bold text-on-surface">Question ${currentNum} of ${total}</span>
              <span class="badge ${
                q.difficulty === 'Easy' ? 'badge-success' :
                q.difficulty === 'Hard' ? 'badge-warning' : 'badge-neutral'
              }">${q.difficulty || 'Medium'}</span>
            </div>
            <div class="text-xs text-on-surface-variant">
              Score: <span class="text-emerald-600 dark:text-emerald-400 font-bold">${state.quiz.sessionStats.correct}</span> Correct, <span class="text-red-500 font-bold">${state.quiz.sessionStats.incorrect}</span> Incorrect
            </div>
          </div>

          <!-- Question Prompt -->
          <div class="ip-question-text">${q.question}</div>

          <!-- Options Grid -->
          <div class="ip-options-grid" id="ipOptionsGrid"></div>

          <!-- Explanation Box (Appears after answer) -->
          <div id="ipExplanationBox" class="hidden"></div>

          <!-- Action Footer -->
          <div class="flex items-center justify-between pt-4 border-t border-outline-variant mt-6 flex-wrap gap-3">
            <div class="text-xs text-on-surface-variant">Select an option to immediately view solution & explanation.</div>
            <button id="ipNextQuestionBtn" class="btn-primary text-sm py-2 px-5 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5" disabled>
              <span>${currentNum === total ? 'Finish Practice' : 'Next Question'}</span>
              <span class="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    `;

    document.getElementById('ipExitQuizBtn').addEventListener('click', () => {
      if (confirm('Are you sure you want to exit this practice session?')) {
        renderMode('categories');
      }
    });

    const optionsGrid = document.getElementById('ipOptionsGrid');
    const letters = ['A', 'B', 'C', 'D'];

    q.options.forEach((optText, idx) => {
      const btn = document.createElement('button');
      btn.className = 'ip-option-btn';
      btn.innerHTML = `
        <div class="ip-option-badge">${letters[idx]}</div>
        <div class="flex-1">${optText}</div>
      `;

      btn.addEventListener('click', () => handleOptionSelection(idx));
      optionsGrid.appendChild(btn);
    });

    document.getElementById('ipNextQuestionBtn').addEventListener('click', () => {
      state.quiz.currentIndex++;
      state.quiz.selectedOption = null;
      state.quiz.isAnswered = false;
      renderQuizView();
    });
  }

  function handleOptionSelection(selectedIndex) {
    if (state.quiz.isAnswered) return; // Prevent multiple clicks

    state.quiz.isAnswered = true;
    state.quiz.selectedOption = selectedIndex;

    const q = state.quiz.questions[state.quiz.currentIndex];
    const isCorrect = (selectedIndex === q.correctAnswer);

    // Update session stats
    if (isCorrect) {
      state.quiz.sessionStats.correct++;
    } else {
      state.quiz.sessionStats.incorrect++;
    }

    // Save individual question attempt
    const qKey = `q:${q.id}`;
    if (!state.progress[qKey]) {
      state.progress[qKey] = { attempted: 0, correct: 0, incorrect: 0 };
    }
    state.progress[qKey].attempted++;
    if (isCorrect) state.progress[qKey].correct++;
    else state.progress[qKey].incorrect++;

    // Save topic attempt
    if (state.activeCategory && q.topic) {
      const tKey = `topic:${state.activeCategory.id}:${q.topic}`;
      if (!state.progress[tKey]) {
        state.progress[tKey] = {
          categoryId: state.activeCategory.id,
          topic: q.topic,
          attempted: 0,
          correct: 0,
          incorrect: 0
        };
      }
      state.progress[tKey].attempted++;
      if (isCorrect) state.progress[tKey].correct++;
      else state.progress[tKey].incorrect++;
      // ✅ Track last-attempted timestamp so dashboard picks the most RECENT topic
      state.progress[tKey].lastAttempted = Date.now();
      // Also update recent so dashboard reflects the exact topic being practiced
      saveRecent(state.activeCategory.id, q.topic);
    }

    saveProgress();
    updateMetrics();

    // Style the options
    const optionsGrid = document.getElementById('ipOptionsGrid');
    const buttons = optionsGrid.querySelectorAll('.ip-option-btn');

    buttons.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === q.correctAnswer) {
        btn.classList.add('correct-option');
      } else if (idx === selectedIndex && !isCorrect) {
        btn.classList.add('incorrect-option');
      }
    });

    // Reveal explanation panel
    const explanationBox = document.getElementById('ipExplanationBox');
    if (explanationBox) {
      explanationBox.className = 'ip-explanation-panel';
      explanationBox.innerHTML = `
        <div class="ip-explanation-title ${isCorrect ? 'text-emerald-400' : 'text-red-400'}">
          <span class="material-symbols-outlined">${isCorrect ? 'check_circle' : 'cancel'}</span>
          <span>${isCorrect ? 'Correct! Well Done.' : 'Incorrect.'}</span>
        </div>
        <div class="ip-explanation-text">
          <p class="mb-2"><strong>Correct Answer:</strong> Option ${['A', 'B', 'C', 'D'][q.correctAnswer]} — ${q.options[q.correctAnswer]}</p>
          <p>${q.explanation}</p>
        </div>
      `;
    }

    // Enable Next Question Button
    const nextBtn = document.getElementById('ipNextQuestionBtn');
    if (nextBtn) nextBtn.disabled = false;
  }

  // ==========================================================
  // QUIZ RESULTS SCREEN & MORE PRACTICE MENU
  // ==========================================================
  function renderQuizResults() {
    const mainContainer = document.getElementById('ipMainContent');
    if (!mainContainer) return;

    const stats = state.quiz.sessionStats;
    const accuracy = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;

    let scoreColor = '#10b981';
    if (accuracy < 50) scoreColor = '#ef4444';
    else if (accuracy < 75) scoreColor = '#f59e0b';

    mainContainer.innerHTML = `
      <div class="dev-card p-8 text-center max-w-lg mx-auto">
        <div class="ip-score-circle" style="--score-color: ${scoreColor}; --score-percent: ${accuracy};">
          <div class="ip-score-inner">
            <span class="text-3xl font-extrabold text-on-surface">${accuracy}%</span>
            <span class="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Accuracy</span>
          </div>
        </div>

        <h2 class="text-2xl font-bold text-on-surface mb-1">Session Complete!</h2>
        <p class="text-sm text-on-surface-variant mb-6">
          ${accuracy >= 80 ? 'Outstanding performance! You have a solid grasp of this material.' :
            accuracy >= 60 ? 'Good effort! Review the explanations to reinforce your understanding.' :
            'Keep going! Repeated practice on weak points is the key to interview mastery.'}
        </p>

        <div class="grid grid-cols-3 gap-3 my-6">
          <div class="bg-surface-container-low border border-outline-variant rounded-xl p-3">
            <div class="text-2xl font-bold text-on-surface">${stats.total}</div>
            <div class="text-xs text-on-surface-variant">Questions</div>
          </div>
          <div class="bg-surface-container-low border border-outline-variant rounded-xl p-3">
            <div class="text-2xl font-bold text-emerald-600 dark:text-emerald-400">${stats.correct}</div>
            <div class="text-xs text-on-surface-variant">Correct</div>
          </div>
          <div class="bg-surface-container-low border border-outline-variant rounded-xl p-3">
            <div class="text-2xl font-bold text-red-500">${stats.incorrect}</div>
            <div class="text-xs text-on-surface-variant">Incorrect</div>
          </div>
        </div>

        <!-- More Practice Action Menu -->
        <div class="flex flex-col gap-3 mt-6">
          <button id="ipRetryTopicBtn" class="btn-primary w-full py-2.5 px-4 text-sm font-semibold flex items-center justify-center gap-2">
            <span class="material-symbols-outlined text-sm">replay</span>
            <span>Retry This Topic</span>
          </button>
          <button id="ipPracticeWeakBtn" class="btn-secondary w-full py-2.5 px-4 text-sm font-medium flex items-center justify-center gap-2">
            <span class="material-symbols-outlined text-sm">healing</span>
            <span>Practice Weak Topics</span>
          </button>
          <button id="ipBackToCategoryBtn" class="btn-secondary w-full py-2.5 px-4 text-sm font-medium flex items-center justify-center gap-2">
            <span class="material-symbols-outlined text-sm">grid_view</span>
            <span>Back to All Categories</span>
          </button>
        </div>
      </div>
    `;

    document.getElementById('ipRetryTopicBtn').addEventListener('click', () => {
      if (state.activeCategory && state.activeTopic) {
        startTopicQuiz(state.activeCategory.id, state.activeTopic);
      } else {
        renderMode('categories');
      }
    });

    document.getElementById('ipPracticeWeakBtn').addEventListener('click', () => {
      startWeakTopicsQuiz();
    });

    document.getElementById('ipBackToCategoryBtn').addEventListener('click', () => {
      renderMode('categories');
    });
  }

  // ==========================================================
  // 60-MINUTE MOCK PLACEMENT TEST ENGINE
  // ==========================================================
  function renderMockTestView() {
    const mainContainer = document.getElementById('ipMainContent');
    if (!mainContainer) return;

    if (!state.mockTest.active) {
      // Full-Width Landing Screen matching 18 Categories width & typography
      mainContainer.innerHTML = `
        <div class="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <h2 class="text-xl font-bold text-on-surface" style="font-family: 'Plus Jakarta Sans', system-ui, sans-serif;">
              60-Minute Full Assessment Mock Test
            </h2>
            <p class="text-sm text-on-surface-variant mt-0.5">
              Simulate authentic campus recruitment tests and technical screening rounds under timed exam conditions.
            </p>
          </div>
          <div class="badge badge-neutral text-xs px-3 py-1.5 font-medium">
            50 Questions • 60 Minutes • Tier-1 Exam Pattern
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <!-- Main Overview Card (8 cols) -->
          <div class="lg:col-span-8 space-y-6">
            <div class="dev-card p-6">
              <div class="flex items-center gap-3.5 mb-4">
                <div class="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-100 dark:border-emerald-900/40">
                  <span class="material-symbols-outlined text-2xl" style='font-variation-settings: "FILL" 1;'>timer</span>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-on-surface" style="font-family: 'Plus Jakarta Sans', system-ui, sans-serif;">Full-Length Campus Placement Assessment</h3>
                  <p class="text-xs text-on-surface-variant">Real exam conditions • Strict 60-minute countdown • Comprehensive analytics</p>
                </div>
              </div>
              
              <p class="text-sm text-on-surface-variant mb-6 leading-relaxed">
                This comprehensive mock assessment accurately replicates the pattern of major campus recruitment drives (TCS, Infosys, Cognizant, Wipro, Amazon, product startups). Questions are dynamically sampled across Quantitative Aptitude, Verbal Reasoning, Core Computer Science (OS, DBMS, CN), Programming & OOP, and Modern Tech Stacks.
              </p>

              <!-- 3 Stat Metrics -->
              <div class="grid grid-cols-3 gap-4 mb-6">
                <div class="bg-surface-container-low border border-outline-variant rounded-xl p-4 text-center">
                  <div class="text-2xl font-bold text-emerald-600 dark:text-emerald-400">50</div>
                  <div class="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mt-1">Questions</div>
                </div>
                <div class="bg-surface-container-low border border-outline-variant rounded-xl p-4 text-center">
                  <div class="text-2xl font-bold text-indigo-600 dark:text-indigo-400">60</div>
                  <div class="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mt-1">Minutes</div>
                </div>
                <div class="bg-surface-container-low border border-outline-variant rounded-xl p-4 text-center">
                  <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">Detailed</div>
                  <div class="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mt-1">Score Report</div>
                </div>
              </div>

              <!-- Action Button -->
              <button id="ipStartMockBtn" class="btn-primary w-full py-3 px-6 text-base font-bold flex items-center justify-center gap-2">
                <span class="material-symbols-outlined">play_arrow</span>
                <span>Start 60-Minute Mock Test</span>
              </button>
            </div>

            <!-- Exam Instructions & Tips Card -->
            <div class="dev-card p-6">
              <h4 class="text-sm font-bold text-on-surface uppercase tracking-wider mb-4 flex items-center gap-2" style="font-family: 'Plus Jakarta Sans', system-ui, sans-serif;">
                <span class="material-symbols-outlined text-indigo-600 dark:text-indigo-400 text-base">info</span>
                Examination Rules & Navigation Guidelines
              </h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-on-surface-variant">
                <div class="flex items-start gap-2.5">
                  <span class="material-symbols-outlined text-emerald-500 text-base shrink-0">check_circle</span>
                  <span><strong>One Question at a Time:</strong> Use the sidebar Question Navigator to freely jump between any of the 50 questions.</span>
                </div>
                <div class="flex items-start gap-2.5">
                  <span class="material-symbols-outlined text-emerald-500 text-base shrink-0">check_circle</span>
                  <span><strong>No Negative Marking:</strong> Attempt all questions (+1 mark for correct, 0 for unattempted/incorrect).</span>
                </div>
                <div class="flex items-start gap-2.5">
                  <span class="material-symbols-outlined text-emerald-500 text-base shrink-0">check_circle</span>
                  <span><strong>Auto-Submit on Timer:</strong> When the 60-minute timer hits 00:00, your test will automatically finalize and score.</span>
                </div>
                <div class="flex items-start gap-2.5">
                  <span class="material-symbols-outlined text-emerald-500 text-base shrink-0">check_circle</span>
                  <span><strong>In-Depth Explanations:</strong> Detailed step-by-step solutions and category breakdown unlock immediately after submission.</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Breakdown Column (4 cols) -->
          <div class="lg:col-span-4 space-y-6">
            <div class="dev-card p-6">
              <h4 class="text-sm font-bold text-on-surface uppercase tracking-wider mb-4 flex items-center gap-2" style="font-family: 'Plus Jakarta Sans', system-ui, sans-serif;">
                <span class="material-symbols-outlined text-indigo-600 dark:text-indigo-400 text-base">pie_chart</span>
                Section-by-Section Distribution
              </h4>
              <div class="space-y-3 text-xs">
                <div class="flex justify-between items-center p-3 rounded-lg bg-surface-container-low border border-outline-variant">
                  <span class="font-medium text-on-surface flex items-center gap-2">
                    <span class="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                    Quantitative Aptitude
                  </span>
                  <span class="font-bold text-on-surface">10 Qs</span>
                </div>
                <div class="flex justify-between items-center p-3 rounded-lg bg-surface-container-low border border-outline-variant">
                  <span class="font-medium text-on-surface flex items-center gap-2">
                    <span class="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                    Verbal & Logical Reasoning
                  </span>
                  <span class="font-bold text-on-surface">10 Qs</span>
                </div>
                <div class="flex justify-between items-center p-3 rounded-lg bg-surface-container-low border border-outline-variant">
                  <span class="font-medium text-on-surface flex items-center gap-2">
                    <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    Programming & OOP
                  </span>
                  <span class="font-bold text-on-surface">10 Qs</span>
                </div>
                <div class="flex justify-between items-center p-3 rounded-lg bg-surface-container-low border border-outline-variant">
                  <span class="font-medium text-on-surface flex items-center gap-2">
                    <span class="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                    DBMS, SQL & Networks
                  </span>
                  <span class="font-bold text-on-surface">10 Qs</span>
                </div>
                <div class="flex justify-between items-center p-3 rounded-lg bg-surface-container-low border border-outline-variant">
                  <span class="font-medium text-on-surface flex items-center gap-2">
                    <span class="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                    Core CS & Modern Tech
                  </span>
                  <span class="font-bold text-on-surface">10 Qs</span>
                </div>
              </div>
            </div>

            <div class="dev-card p-6 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/20 dark:to-purple-950/20 border-indigo-200/50 dark:border-indigo-800/50">
              <div class="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2">
                <span class="material-symbols-outlined text-sm">military_tech</span>
                Placement Benchmark
              </div>
              <p class="text-xs text-on-surface-variant leading-relaxed">
                Scoring <strong>38/50 (76%+)</strong> is the target benchmark for campus placement shortlists at Microsoft, Amazon, and top product engineering firms.
              </p>
            </div>
          </div>
        </div>
      `;

      document.getElementById('ipStartMockBtn').addEventListener('click', startMockTest);
      return;
    }

    // Active Mock Test Screen
    renderActiveMockTest();
  }

  function startMockTest() {
    const pool = window.interviewPrepRegistry.getMockTestPool(50);
    state.mockTest.active = true;
    state.mockTest.questions = pool;
    state.mockTest.currentIndex = 0;
    state.mockTest.answers = {};
    state.mockTest.timeRemaining = 3600;

    // Start timer
    if (state.mockTest.timerInterval) clearInterval(state.mockTest.timerInterval);
    state.mockTest.timerInterval = setInterval(() => {
      state.mockTest.timeRemaining--;
      updateMockTimerDisplay();
      if (state.mockTest.timeRemaining <= 0) {
        clearInterval(state.mockTest.timerInterval);
        finishMockTest(true);
      }
    }, 1000);

    renderActiveMockTest();
  }

  function renderActiveMockTest() {
    const mainContainer = document.getElementById('ipMainContent');
    if (!mainContainer) return;

    const q = state.mockTest.questions[state.mockTest.currentIndex];
    const total = state.mockTest.questions.length;
    const currentNum = state.mockTest.currentIndex + 1;
    const currentSelected = state.mockTest.answers[state.mockTest.currentIndex];

    mainContainer.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <!-- Question Main Area -->
        <div class="lg:col-span-3">
          <div class="dev-card p-6 sm:p-8">
            <div class="flex items-center justify-between pb-3 border-b border-outline-variant mb-4 flex-wrap gap-2">
              <div class="flex items-center gap-2">
                <span class="badge badge-primary font-semibold uppercase text-xs">
                  ${q.categoryTitle || q.categoryId || 'General'}
                </span>
                <span class="text-xs text-on-surface-variant">${q.topic || ''}</span>
              </div>
              <div id="ipMockTimer" class="ip-timer-badge">
                <span class="material-symbols-outlined text-sm">timer</span>
                <span id="ipTimerDigits">60:00</span>
              </div>
            </div>

            <div class="text-sm font-semibold text-on-surface-variant mb-2">Question ${currentNum} of ${total}</div>
            <div class="ip-question-text">${q.question}</div>

            <div class="ip-options-grid" id="ipMockOptionsGrid"></div>

            <div class="flex items-center justify-between pt-4 border-t border-outline-variant mt-6 flex-wrap gap-2">
              <button id="ipPrevMockBtn" class="btn-secondary text-sm py-2 px-4 flex items-center gap-1" ${currentNum === 1 ? 'disabled style="opacity: 0.4;"' : ''}>
                <span class="material-symbols-outlined text-sm">arrow_back</span>
                <span>Previous</span>
              </button>
              <div class="flex gap-2">
                <button id="ipClearMockBtn" class="btn-secondary text-xs py-2 px-3">
                  Clear
                </button>
                <button id="ipNextMockBtn" class="btn-primary text-sm py-2 px-5 flex items-center gap-1">
                  <span>${currentNum === total ? 'Review' : 'Next'}</span>
                  <span class="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar / Question Navigator -->
        <div class="lg:col-span-1">
          <div class="dev-card p-4">
            <div class="flex items-center justify-between mb-3">
              <div class="text-sm font-bold text-on-surface">Questions</div>
              <div class="text-xs text-on-surface-variant">${Object.keys(state.mockTest.answers).length} of ${total} Answered</div>
            </div>

            <div class="ip-qnav-grid mb-4" id="ipMockQNavGrid"></div>

            <button id="ipSubmitMockTestBtn" class="btn-primary w-full py-2.5 px-4 text-sm font-bold flex items-center justify-center gap-2">
              <span class="material-symbols-outlined text-sm">check_circle</span>
              <span>Submit Test</span>
            </button>
          </div>
        </div>
      </div>
    `;

    updateMockTimerDisplay();

    // Render Options
    const optionsGrid = document.getElementById('ipMockOptionsGrid');
    const letters = ['A', 'B', 'C', 'D'];
    q.options.forEach((optText, idx) => {
      const btn = document.createElement('button');
      btn.className = `ip-option-btn ${currentSelected === idx ? 'selected-option' : ''}`;
      btn.innerHTML = `
        <div class="ip-option-badge">${letters[idx]}</div>
        <div class="flex-1">${optText}</div>
      `;
      btn.addEventListener('click', () => {
        state.mockTest.answers[state.mockTest.currentIndex] = idx;
        renderActiveMockTest();
      });
      optionsGrid.appendChild(btn);
    });

    // Render Navigator buttons
    const navGrid = document.getElementById('ipMockQNavGrid');
    for (let i = 0; i < total; i++) {
      const navBtn = document.createElement('button');
      navBtn.className = 'ip-qnav-btn';
      if (i === state.mockTest.currentIndex) navBtn.classList.add('current');
      if (state.mockTest.answers[i] !== undefined) navBtn.classList.add('answered');
      navBtn.textContent = i + 1;
      navBtn.addEventListener('click', () => {
        state.mockTest.currentIndex = i;
        renderActiveMockTest();
      });
      navGrid.appendChild(navBtn);
    }

    document.getElementById('ipPrevMockBtn').addEventListener('click', () => {
      if (state.mockTest.currentIndex > 0) {
        state.mockTest.currentIndex--;
        renderActiveMockTest();
      }
    });

    document.getElementById('ipNextMockBtn').addEventListener('click', () => {
      if (state.mockTest.currentIndex < total - 1) {
        state.mockTest.currentIndex++;
        renderActiveMockTest();
      }
    });

    document.getElementById('ipClearMockBtn').addEventListener('click', () => {
      delete state.mockTest.answers[state.mockTest.currentIndex];
      renderActiveMockTest();
    });

    document.getElementById('ipSubmitMockTestBtn').addEventListener('click', () => {
      const answeredCount = Object.keys(state.mockTest.answers).length;
      if (confirm(`You have answered ${answeredCount} of ${total} questions. Are you sure you want to submit your mock test?`)) {
        finishMockTest(false);
      }
    });
  }

  function updateMockTimerDisplay() {
    const timerDigits = document.getElementById('ipTimerDigits');
    const timerBadge = document.getElementById('ipMockTimer');
    if (!timerDigits) return;

    const mins = Math.floor(state.mockTest.timeRemaining / 60);
    const secs = state.mockTest.timeRemaining % 60;
    timerDigits.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

    if (timerBadge) {
      if (state.mockTest.timeRemaining <= 300) { // 5 minutes remaining
        timerBadge.classList.add('warning');
      } else {
        timerBadge.classList.remove('warning');
      }
    }
  }

  function finishMockTest(isTimeout = false) {
    if (state.mockTest.timerInterval) clearInterval(state.mockTest.timerInterval);
    state.mockTest.active = false;

    // Evaluate answers
    let correct = 0;
    const categoryBreakdown = {};

    state.mockTest.questions.forEach((q, idx) => {
      const userAnswer = state.mockTest.answers[idx];
      const isCorrect = (userAnswer === q.correctAnswer);
      if (isCorrect) correct++;

      const catTitle = q.categoryTitle || 'General';
      if (!categoryBreakdown[catTitle]) {
        categoryBreakdown[catTitle] = { total: 0, correct: 0 };
      }
      categoryBreakdown[catTitle].total++;
      if (isCorrect) categoryBreakdown[catTitle].correct++;
    });

    const total = state.mockTest.questions.length;
    const accuracy = Math.round((correct / total) * 100);

    const mainContainer = document.getElementById('ipMainContent');
    if (!mainContainer) return;

    mainContainer.innerHTML = `
      <div class="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h2 class="text-xl font-bold text-on-surface" style="font-family: 'Plus Jakarta Sans', system-ui, sans-serif;">
            Mock Assessment Diagnostic Report
          </h2>
          <p class="text-sm text-on-surface-variant mt-0.5">
            Comprehensive evaluation across all 50 questions with section-wise performance analysis.
          </p>
        </div>
        <div class="badge ${accuracy >= 70 ? 'badge-success' : 'badge-warning'} text-xs px-3 py-1.5 font-semibold">
          ${accuracy >= 75 ? 'Placement Ready (75%+)' : accuracy >= 50 ? 'Intermediate Score' : 'Needs Reinforcement'}
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Main Score Card (7 cols) -->
        <div class="lg:col-span-7">
          <div class="dev-card p-6 sm:p-8 text-center">
            <div class="badge badge-primary px-3 py-1 font-semibold mb-4 inline-flex items-center gap-1.5">
              <span class="material-symbols-outlined text-xs">assessment</span>
              <span>Mock Placement Test Final Score</span>
            </div>

            <div class="ip-score-circle mx-auto my-3" style="--score-color: ${accuracy >= 70 ? '#10b981' : accuracy >= 40 ? '#f59e0b' : '#ef4444'}; --score-percent: ${accuracy};">
              <div class="ip-score-inner">
                <span class="text-3xl font-extrabold text-on-surface">${accuracy}%</span>
                <span class="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Accuracy</span>
              </div>
            </div>

            <h3 class="text-2xl font-bold text-on-surface mb-1" style="font-family: 'Plus Jakarta Sans', system-ui, sans-serif;">
              ${accuracy >= 75 ? 'Placement Ready!' : accuracy >= 50 ? 'Promising Foundation' : 'Needs Practice'}
            </h3>
            <p class="text-sm text-on-surface-variant mb-6 leading-relaxed max-w-md mx-auto">
              ${isTimeout ? 'Time expired! ' : ''}You scored <strong>${correct}</strong> correct answers out of 50 total questions under real-time conditions.
            </p>

            <div class="grid grid-cols-3 gap-3 mb-6">
              <div class="bg-surface-container-low border border-outline-variant rounded-xl p-3 text-center">
                <div class="text-2xl font-bold text-on-surface">50</div>
                <div class="text-xs text-on-surface-variant mt-1">Total Questions</div>
              </div>
              <div class="bg-surface-container-low border border-outline-variant rounded-xl p-3 text-center">
                <div class="text-2xl font-bold text-emerald-600 dark:text-emerald-400">${correct}</div>
                <div class="text-xs text-on-surface-variant mt-1">Correct</div>
              </div>
              <div class="bg-surface-container-low border border-outline-variant rounded-xl p-3 text-center">
                <div class="text-2xl font-bold text-red-500">${total - correct}</div>
                <div class="text-xs text-on-surface-variant mt-1">Incorrect / Skipped</div>
              </div>
            </div>

            <div class="flex gap-3 flex-wrap">
              <button id="ipRetakeMockBtn" class="btn-primary flex-1 py-2.5 px-4 text-sm font-semibold flex items-center justify-center gap-2">
                <span class="material-symbols-outlined text-sm">replay</span>
                <span>Retake Mock Test</span>
              </button>
              <button id="ipBackToPrepBtn" class="btn-secondary flex-1 py-2.5 px-4 text-sm font-medium flex items-center justify-center gap-2">
                <span class="material-symbols-outlined text-sm">grid_view</span>
                <span>Back to 18 Categories</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Section Breakdown Column (5 cols) -->
        <div class="lg:col-span-5 space-y-6">
          <div class="dev-card p-6">
            <h4 class="text-sm font-bold text-on-surface uppercase tracking-wider mb-4 flex items-center gap-2" style="font-family: 'Plus Jakarta Sans', system-ui, sans-serif;">
              <span class="material-symbols-outlined text-indigo-600 dark:text-indigo-400 text-base">pie_chart</span>
              Performance by Section
            </h4>
            <div class="space-y-4">
              ${Object.keys(categoryBreakdown).map(cat => {
                const b = categoryBreakdown[cat];
                const acc = Math.round((b.correct / b.total) * 100);
                return `
                  <div>
                    <div class="flex justify-between text-xs text-on-surface-variant mb-1.5">
                      <span class="font-medium text-on-surface">${cat}</span>
                      <span class="font-bold text-on-surface">${b.correct}/${b.total} (${acc}%)</span>
                    </div>
                    <div class="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                      <div class="h-full ${acc >= 70 ? 'bg-emerald-500' : acc >= 50 ? 'bg-amber-500' : 'bg-red-500'}" style="width: ${acc}%"></div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <div class="dev-card p-5 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/20 dark:to-purple-950/20 border-indigo-200/50 dark:border-indigo-800/50">
            <div class="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1.5">
              <span class="material-symbols-outlined text-sm">lightbulb</span>
              Smart Practice Recommendation
            </div>
            <p class="text-xs text-on-surface-variant leading-relaxed">
              Review missed questions in your lowest scoring sections by heading over to the <strong>Weak Topics</strong> tab for targeted revision.
            </p>
          </div>
        </div>
      </div>
    `;

    document.getElementById('ipRetakeMockBtn').addEventListener('click', startMockTest);
    document.getElementById('ipBackToPrepBtn').addEventListener('click', () => renderMode('categories'));
  }

  function abortMockTest() {
    if (state.mockTest.timerInterval) clearInterval(state.mockTest.timerInterval);
    state.mockTest.active = false;
    state.mockTest.answers = {};
  }

  // ==========================================================
  // WEAK TOPICS VIEW
  // ==========================================================
  function renderWeakTopicsView() {
    const mainContainer = document.getElementById('ipMainContent');
    if (!mainContainer) return;

    const weakList = window.interviewPrepRegistry.getWeakTopics(state.progress);

    mainContainer.innerHTML = `
      <div class="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h2 class="text-xl font-bold text-on-surface" style="font-family: 'Plus Jakarta Sans', system-ui, sans-serif;">
            Smart Weak Topics Diagnosis
          </h2>
          <p class="text-sm text-on-surface-variant mt-0.5">
            DevPilot AI analyzes your practice history and highlights topics where accuracy is below 60%.
          </p>
        </div>
        <div class="flex items-center gap-3">
          <div class="badge badge-neutral text-xs px-3 py-1.5 font-medium">
            ${weakList.length > 0 ? `${weakList.length} Topics Need Revision` : 'All Topics On Track'}
          </div>
          ${weakList.length > 0 ? `
            <button id="ipStartWeakDrillBtn" class="btn-primary px-4 py-1.5 text-xs font-semibold flex items-center gap-1.5">
              <span class="material-symbols-outlined text-xs">healing</span>
              <span>Drill All Weak Topics</span>
            </button>
          ` : ''}
        </div>
      </div>
      <div id="ipWeakTopicsContainer"></div>
    `;

    const container = document.getElementById('ipWeakTopicsContainer');
    if (weakList.length === 0) {
      container.innerHTML = `
        <div class="space-y-6">
          <div class="dev-card p-6 sm:p-8 flex items-center justify-between flex-wrap gap-6 bg-gradient-to-r from-emerald-50/50 to-indigo-50/30 dark:from-emerald-950/20 dark:to-indigo-950/10 border-emerald-200/60 dark:border-emerald-900/40">
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-200 dark:border-emerald-800">
                <span class="material-symbols-outlined text-3xl" style='font-variation-settings: "FILL" 1;'>verified</span>
              </div>
              <div>
                <h3 class="text-lg font-bold text-on-surface" style="font-family: 'Plus Jakarta Sans', system-ui, sans-serif;">No Weak Topics Detected Yet</h3>
                <p class="text-sm text-on-surface-variant mt-1 max-w-2xl leading-relaxed">
                  Great job! You haven't accumulated low-scoring topics yet. As you practice questions across the 18 placement categories, DevPilot will dynamically isolate topics where your accuracy drops below 60% so you can target them here.
                </p>
              </div>
            </div>
            <button class="btn-primary px-5 py-2.5 text-sm font-semibold flex items-center gap-2" onclick="document.querySelector('[data-mode=\\'categories\\']').click()">
              <span>Browse 18 Categories</span>
              <span class="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          <!-- 3 Diagnostic Cards in 3-column grid matching 18 Categories -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div class="dev-card p-6">
              <div class="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3 border border-indigo-100 dark:border-indigo-900/40">
                <span class="material-symbols-outlined text-xl">quiz</span>
              </div>
              <h4 class="text-base font-bold text-on-surface mb-1" style="font-family: 'Plus Jakarta Sans', system-ui, sans-serif;">1. Continuous Practice</h4>
              <p class="text-xs text-on-surface-variant leading-relaxed">Attempt topic-wise questions across Quantitative Aptitude, Verbal Reasoning, Core CS, and Tech tracks.</p>
            </div>

            <div class="dev-card p-6">
              <div class="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3 border border-amber-100 dark:border-amber-900/40">
                <span class="material-symbols-outlined text-xl">analytics</span>
              </div>
              <h4 class="text-base font-bold text-on-surface mb-1" style="font-family: 'Plus Jakarta Sans', system-ui, sans-serif;">2. Real-Time Tracking</h4>
              <p class="text-xs text-on-surface-variant leading-relaxed">DevPilot calculates your accuracy in real-time. Any topic with accuracy under 60% is automatically flagged for revision.</p>
            </div>

            <div class="dev-card p-6">
              <div class="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3 border border-emerald-100 dark:border-emerald-900/40">
                <span class="material-symbols-outlined text-xl">healing</span>
              </div>
              <h4 class="text-base font-bold text-on-surface mb-1" style="font-family: 'Plus Jakarta Sans', system-ui, sans-serif;">3. Focused Drills</h4>
              <p class="text-xs text-on-surface-variant leading-relaxed">Launch 1-click targeted drills on your weak topics to review explanations and turn weaknesses into strengths.</p>
            </div>
          </div>
        </div>
      `;
      return;
    }

    if (document.getElementById('ipStartWeakDrillBtn')) {
      document.getElementById('ipStartWeakDrillBtn').addEventListener('click', startWeakTopicsQuiz);
    }

    const grid = document.createElement('div');
    grid.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5';
    weakList.forEach(w => {
      const card = document.createElement('div');
      card.className = 'dev-card p-5 flex flex-col justify-between gap-4 border border-red-200 dark:border-red-900/40';
      card.innerHTML = `
        <div>
          <div class="flex items-center justify-between gap-2 mb-2">
            <span class="badge badge-warning text-[11px] uppercase">${w.categoryTitle}</span>
            <span class="text-xs font-bold text-red-500">${w.accuracy}% Accuracy</span>
          </div>
          <h4 class="text-base font-bold text-on-surface" style="font-family: 'Plus Jakarta Sans', system-ui, sans-serif;">${w.topic}</h4>
          <p class="text-xs text-on-surface-variant mt-1">${w.incorrectCount} mistakes across ${w.attempted} attempts</p>
          
          <div class="w-full h-1.5 bg-surface-container rounded-full overflow-hidden mt-3">
            <div class="h-full bg-red-500 rounded-full" style="width: ${w.accuracy}%"></div>
          </div>
        </div>

        <button class="btn-primary w-full text-xs py-2 px-3.5 flex items-center justify-center gap-1.5 ip-drill-topic-btn">
          <span class="material-symbols-outlined text-xs">healing</span>
          <span>Practice This Topic</span>
        </button>
      `;

      card.querySelector('.ip-drill-topic-btn').addEventListener('click', () => {
        startTopicQuiz(w.categoryId, w.topic);
      });

      grid.appendChild(card);
    });

    container.appendChild(grid);
  }

  // ==========================================================
  // CORE SUBJECT CHECKLISTS VIEW
  // ==========================================================
  function renderChecklistsView() {
    const mainContainer = document.getElementById('ipMainContent');
    if (!mainContainer) return;

    const checklists = window.interviewPrepRegistry.getChecklists();
    const subjects = Object.keys(checklists);

    mainContainer.innerHTML = `
      <div class="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h2 class="text-xl font-bold text-on-surface" style="font-family: 'Plus Jakarta Sans', system-ui, sans-serif;">
            Core CS Subject Checklists
          </h2>
          <p class="text-sm text-on-surface-variant mt-0.5">
            Track and review critical placement concepts across the 8 core computer science subjects.
          </p>
        </div>
        <div class="badge badge-neutral text-xs px-3 py-1.5 font-medium">
          8 Core Subjects • 160 Essential Concepts
        </div>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5" id="ipChecklistsList"></div>
    `;

    const list = document.getElementById('ipChecklistsList');
    subjects.forEach(subjKey => {
      const subject = checklists[subjKey];
      const items = subject.items || [];

      // Count checked items
      const userChecks = state.checklists[subjKey] || {};
      const checkedCount = Object.values(userChecks).filter(Boolean).length;
      const progressPercent = items.length > 0 ? Math.round((checkedCount / items.length) * 100) : 0;

      const card = document.createElement('div');
      card.className = 'ip-checklist-card dev-card p-0 overflow-hidden';
      card.innerHTML = `
        <div class="ip-checklist-header">
          <div class="flex items-center gap-3 min-w-0">
            <div class="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-100 dark:border-indigo-900/40">
              <span class="material-symbols-outlined text-xl">${subject.icon || 'checklist'}</span>
            </div>
            <div class="min-w-0">
              <h3 class="text-base font-bold text-on-surface truncate" style="font-family: 'Plus Jakarta Sans', system-ui, sans-serif;">${subject.title}</h3>
              <p class="text-xs text-on-surface-variant">${items.length} Essential Concepts</p>
            </div>
          </div>
          <div class="flex items-center gap-3 shrink-0">
            <div class="text-right">
              <div class="text-xs font-bold text-on-surface ip-chk-count">${checkedCount} / ${items.length}</div>
              <div class="text-xs text-on-surface-variant ip-chk-pct">${progressPercent}% Completed</div>
            </div>
            <span class="material-symbols-outlined text-on-surface-variant transition transform ip-chk-chevron">expand_more</span>
          </div>
        </div>
        <div class="ip-checklist-items hidden"></div>
      `;

      const header = card.querySelector('.ip-checklist-header');
      const itemsContainer = card.querySelector('.ip-checklist-items');
      const chevron = card.querySelector('.ip-chk-chevron');

      // Populate items
      items.forEach(item => {
        const isChecked = !!userChecks[item.id];
        const row = document.createElement('div');
        row.className = 'ip-chk-item';
        row.innerHTML = `
          <div class="ip-chk-box ${isChecked ? 'checked' : ''}" data-item-id="${item.id}">
            ${isChecked ? '<span class="material-symbols-outlined text-xs">check</span>' : ''}
          </div>
          <div class="flex-1 min-w-0">
            <span class="text-sm text-on-surface ip-chk-label ${isChecked ? 'checked' : ''}">${item.label}</span>
            ${item.important ? '<span class="ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-500 border border-amber-500/30">MUST KNOW</span>' : ''}
          </div>
        `;

        row.querySelector('.ip-chk-box').addEventListener('click', (e) => {
          e.stopPropagation();
          const targetBox = e.currentTarget;
          const label = row.querySelector('.ip-chk-label');

          if (!state.checklists[subjKey]) state.checklists[subjKey] = {};
          const nowChecked = !state.checklists[subjKey][item.id];
          state.checklists[subjKey][item.id] = nowChecked;
          saveChecklists();
          updateMetrics();

          targetBox.classList.toggle('checked', nowChecked);
          targetBox.innerHTML = nowChecked ? '<span class="material-symbols-outlined text-xs">check</span>' : '';
          label.classList.toggle('checked', nowChecked);

          // Update header count
          const newCheckedCount = Object.values(state.checklists[subjKey]).filter(Boolean).length;
          const newPct = Math.round((newCheckedCount / items.length) * 100);
          header.querySelector('.ip-chk-count').textContent = `${newCheckedCount} / ${items.length}`;
          header.querySelector('.ip-chk-pct').textContent = `${newPct}% Completed`;
        });

        itemsContainer.appendChild(row);
      });

      header.addEventListener('click', () => {
        const isHidden = itemsContainer.classList.contains('hidden');
        itemsContainer.classList.toggle('hidden', !isHidden);
        chevron.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
      });

      list.appendChild(card);
    });
  }

  // ==========================================================
  // GD & HR INTERVIEW VIEW
  // ==========================================================
  function renderGdHrView() {
    const mainContainer = document.getElementById('ipMainContent');
    if (!mainContainer) return;

    const commCat = window.interviewPrepRegistry.getCategory('communication');
    const hrCat = window.interviewPrepRegistry.getCategory('hrBehavioral');

    const gdTopics = commCat && commCat.gdTopics ? commCat.gdTopics : [];
    const hrQuestions = hrCat && hrCat.hrQuestions ? hrCat.hrQuestions : [];

    mainContainer.innerHTML = `
      <div class="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h2 class="text-xl font-bold text-on-surface" style="font-family: 'Plus Jakarta Sans', system-ui, sans-serif;">
            Group Discussion & HR Behavioral Round Preparation
          </h2>
          <p class="text-sm text-on-surface-variant mt-0.5">
            Master campus GD rounds with structured arguments and ace behavioral interviews using the STAR framework.
          </p>
        </div>
        <div class="badge badge-neutral text-xs px-3 py-1.5 font-medium">
          15 GD Topics • 15 STAR Behavioral Guides
        </div>
      </div>

      <div class="filter-tabs mb-6" id="ipGdHrSubTabs">
        <button id="ipTabGD" class="filter-tab active">
          <span class="material-symbols-outlined text-[18px]">groups</span>
          <span>Group Discussion Topics (${gdTopics.length})</span>
        </button>
        <button id="ipTabHR" class="filter-tab">
          <span class="material-symbols-outlined text-[18px]">psychology</span>
          <span>HR Interview Questions & STAR Framework (${hrQuestions.length})</span>
        </button>
      </div>

      <div id="ipGdContent" class="grid grid-cols-1 lg:grid-cols-2 gap-5"></div>
      <div id="ipHrContent" class="grid grid-cols-1 lg:grid-cols-2 gap-5 hidden"></div>
    `;

    const tabGD = document.getElementById('ipTabGD');
    const tabHR = document.getElementById('ipTabHR');
    const gdContent = document.getElementById('ipGdContent');
    const hrContent = document.getElementById('ipHrContent');

    tabGD.addEventListener('click', () => {
      tabGD.classList.add('active');
      tabHR.classList.remove('active');
      gdContent.classList.remove('hidden');
      hrContent.classList.add('hidden');
    });

    tabHR.addEventListener('click', () => {
      tabHR.classList.add('active');
      tabGD.classList.remove('active');
      hrContent.classList.remove('hidden');
      gdContent.classList.add('hidden');
    });

    // Render GD topics
    gdTopics.forEach(gd => {
      const card = document.createElement('div');
      card.className = 'ip-gd-card dev-card';
      card.innerHTML = `
        <div class="flex items-center justify-between mb-3 flex-wrap gap-2">
          <h3 class="text-lg font-bold text-on-surface">${gd.title}</h3>
          <span class="badge badge-primary">${gd.category}</span>
        </div>
        <div class="bg-surface-container-low p-3 rounded-lg border border-outline-variant text-xs text-on-surface mb-4">
          <strong class="text-primary">Strong Opening Statement:</strong> "${gd.openingStatement}"
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div class="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30 p-3 rounded-xl">
            <h5 class="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2">Points In Favor / Opportunities</h5>
            <ul class="text-xs text-on-surface-variant space-y-1.5 list-disc list-inside">
              ${(gd.pointsInFavor || []).map(p => `<li>${p}</li>`).join('')}
            </ul>
          </div>
          <div class="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 p-3 rounded-xl">
            <h5 class="text-xs font-bold text-red-500 dark:text-red-400 uppercase tracking-wider mb-2">Points Against / Challenges</h5>
            <ul class="text-xs text-on-surface-variant space-y-1.5 list-disc list-inside">
              ${(gd.pointsAgainst || []).map(p => `<li>${p}</li>`).join('')}
            </ul>
          </div>
        </div>
        <div class="bg-surface-container-low p-3 rounded-xl text-xs text-on-surface-variant border border-outline-variant">
          <strong class="text-on-surface">Balanced Conclusion:</strong> ${gd.conclusion}
        </div>
      `;
      gdContent.appendChild(card);
    });

    // Render HR questions
    hrQuestions.forEach(hr => {
      const card = document.createElement('div');
      card.className = 'ip-hr-card dev-card';
      card.innerHTML = `
        <div class="flex items-start justify-between gap-4 mb-3">
          <div>
            <span class="text-xs font-bold text-primary uppercase tracking-wider">${hr.category}</span>
            <h3 class="text-lg font-bold text-on-surface mt-0.5" style="font-family: 'Plus Jakarta Sans', system-ui, sans-serif;">"${hr.question}"</h3>
          </div>
        </div>
        <div class="bg-surface-container-low p-3 rounded-xl border border-outline-variant text-xs text-on-surface mb-4">
          <strong class="text-purple-600 dark:text-purple-400">What the Interviewer is Evaluating:</strong> ${hr.evaluatingFor}
        </div>
        <div class="ip-star-grid">
          <div class="ip-star-box">
            <div class="ip-star-letter">S</div>
            <div class="text-xs font-bold text-on-surface mb-1">Situation</div>
            <p class="text-xs text-on-surface-variant">${hr.starGuide.situation}</p>
          </div>
          <div class="ip-star-box">
            <div class="ip-star-letter">T</div>
            <div class="text-xs font-bold text-on-surface mb-1">Task</div>
            <p class="text-xs text-on-surface-variant">${hr.starGuide.task}</p>
          </div>
          <div class="ip-star-box">
            <div class="ip-star-letter">A</div>
            <div class="text-xs font-bold text-on-surface mb-1">Action</div>
            <p class="text-xs text-on-surface-variant">${hr.starGuide.action}</p>
          </div>
          <div class="ip-star-box">
            <div class="ip-star-letter">R</div>
            <div class="text-xs font-bold text-on-surface mb-1">Result</div>
            <p class="text-xs text-on-surface-variant">${hr.starGuide.result}</p>
          </div>
        </div>
        <div class="mt-4 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 text-xs text-amber-900 dark:text-amber-300">
          <strong>Common Trap to Avoid:</strong> ${hr.commonTraps}
        </div>
      `;
      hrContent.appendChild(card);
    });
  }

  // ==========================================================
  // METRICS & STATS UPDATE
  // ==========================================================
  function updateMetrics() {
    if (!window.interviewPrepRegistry) return;
    const stats = window.interviewPrepRegistry.getOverallStats(state.progress);

    const elAttempted = document.getElementById('ipStatAttempted');
    const elAccuracy = document.getElementById('ipStatAccuracy');
    const elCategories = document.getElementById('ipStatCategories');
    const elChecklists = document.getElementById('ipStatChecklists');

    if (elAttempted) elAttempted.textContent = stats.totalAttempted;
    if (elAccuracy) elAccuracy.textContent = `${stats.accuracy}%`;
    if (elCategories) elCategories.textContent = `${stats.categoriesCount} Available`;

    // Count checked checklist items across subjects
    let totalChecked = 0;
    Object.values(state.checklists).forEach(subj => {
      totalChecked += Object.values(subj).filter(Boolean).length;
    });
    if (elChecklists) elChecklists.textContent = `${totalChecked} Checked`;
  }

  // Global exports
  window.interviewPrepController = {
    init,
    switchMode,
    startTopicQuiz,
    startCategoryQuiz,
    startMockTest
  };

  // Run on DOM loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
