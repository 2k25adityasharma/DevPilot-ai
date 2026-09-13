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
    banner.innerHTML = `
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
          <span class="material-symbols-outlined">${cat.icon || 'history'}</span>
        </div>
        <div>
          <div class="text-xs text-blue-400 font-semibold uppercase tracking-wider">Jump Back In</div>
          <div class="text-sm font-medium text-white">${state.recentActivity.topic || cat.title}</div>
        </div>
      </div>
      <button id="ipResumeBtn" class="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition flex items-center gap-1.5 shadow-md">
        <span>Continue Practice</span>
        <span class="material-symbols-outlined text-sm">arrow_forward</span>
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
          <h2 class="text-xl font-bold text-white">${technicalOnly ? 'Technical Interview Categories' : 'Placement & Interview Categories'}</h2>
          <p class="text-sm text-gray-400">Select any category to practice authentic MCQs topic-by-topic with detailed explanations.</p>
        </div>
        <div class="text-xs text-gray-500 bg-gray-900 border border-gray-800 px-3 py-1.5 rounded-full">
          Showing ${filtered.length} categories • 2,170 Questions
        </div>
      </div>
      <div class="ip-categories-grid" id="ipCategoriesGrid"></div>
    `;

    const grid = document.getElementById('ipCategoriesGrid');
    filtered.forEach(cat => {
      const card = document.createElement('div');
      card.className = 'ip-cat-card';

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
            <div class="ip-cat-icon">
              <span class="material-symbols-outlined text-2xl">${cat.icon || 'school'}</span>
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="ip-cat-title truncate">${cat.title}</h3>
              <span class="text-xs px-2 py-0.5 rounded bg-gray-800 text-gray-400 font-medium">
                ${cat.topics ? cat.topics.length : 0} Topics • ${cat.totalQuestions} MCQs
              </span>
            </div>
          </div>
          <p class="ip-cat-desc">${cat.description}</p>
        </div>

        <div>
          ${catAttempted > 0 ? `
            <div class="mb-3">
              <div class="flex justify-between text-xs text-gray-400 mb-1">
                <span>Accuracy</span>
                <span class="font-semibold text-white">${catAccuracy}% (${catCorrect}/${catAttempted})</span>
              </div>
              <div class="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div class="h-full ${catAccuracy >= 75 ? 'bg-emerald-500' : catAccuracy >= 50 ? 'bg-amber-500' : 'bg-red-500'}" style="width: ${catAccuracy}%"></div>
              </div>
            </div>
          ` : ''}

          <div class="ip-cat-actions">
            <button class="flex-1 py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition ip-open-cat-btn" data-cat="${cat.id}">
              <span>Explore Topics</span>
              <span class="material-symbols-outlined text-xs">arrow_forward</span>
            </button>
            <button class="py-2 px-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-medium transition ip-start-all-btn" data-cat="${cat.id}" title="Practice all questions randomly">
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

    mainContainer.innerHTML = `
      <div class="mb-6">
        <button id="ipBackToCats" class="inline-flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-white mb-4 transition">
          <span class="material-symbols-outlined text-sm">arrow_back</span>
          <span>Back to All Categories</span>
        </button>
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
            <span class="material-symbols-outlined text-2xl">${cat.icon}</span>
          </div>
          <div>
            <h2 class="text-2xl font-bold text-white">${cat.title}</h2>
            <p class="text-sm text-gray-400">${cat.description}</p>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-between border-b border-gray-800 pb-3 mb-4">
        <div class="text-sm font-semibold text-gray-300">Choose a Topic to Practice (10 MCQs each)</div>
        <button id="ipShuffleAllTopicBtn" class="text-xs px-3 py-1.5 rounded bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 border border-blue-500/30 flex items-center gap-1">
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
      item.className = 'ip-topic-item';
      item.innerHTML = `
        <div class="flex items-center gap-3 min-w-0">
          <div class="w-8 h-8 rounded bg-gray-800 text-gray-400 flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-base">quiz</span>
          </div>
          <div class="min-w-0">
            <div class="ip-topic-name truncate">${topicName}</div>
            <div class="text-xs text-gray-500">${topicQs.length} Questions • ${prog.attempted > 0 ? `${prog.correct}/${prog.attempted} Correct (${accuracy}%)` : 'Not attempted yet'}</div>
          </div>
        </div>
        <div class="flex items-center gap-2">
          ${prog.attempted > 0 ? `
            <span class="text-xs font-semibold px-2 py-0.5 rounded ${accuracy >= 70 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}">
              ${accuracy}%
            </span>
          ` : ''}
          <button class="px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium flex items-center gap-1 transition ip-start-topic-btn">
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
          <button id="ipExitQuizBtn" class="inline-flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-white transition">
            <span class="material-symbols-outlined text-sm">close</span>
            <span>Exit Practice</span>
          </button>
          <div class="text-xs font-semibold px-2.5 py-1 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
            ${state.activeCategory ? state.activeCategory.title : 'Interview Prep'} • ${state.activeTopic || q.topic}
          </div>
        </div>

        <!-- Question Card -->
        <div class="ip-quiz-card">
          <!-- Progress Bar -->
          <div class="ip-quiz-progress-bar">
            <div class="ip-quiz-progress-fill" style="width: ${progressPercent}%"></div>
          </div>

          <div class="ip-quiz-header">
            <div class="flex items-center gap-2">
              <span class="text-sm font-bold text-white">Question ${currentNum} of ${total}</span>
              <span class="text-xs px-2 py-0.5 rounded font-medium ${
                q.difficulty === 'Easy' ? 'bg-emerald-500/20 text-emerald-400' :
                q.difficulty === 'Hard' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'
              }">${q.difficulty || 'Medium'}</span>
            </div>
            <div class="text-xs text-gray-400">
              Score: <span class="text-emerald-400 font-bold">${state.quiz.sessionStats.correct}</span> Correct, <span class="text-red-400 font-bold">${state.quiz.sessionStats.incorrect}</span> Incorrect
            </div>
          </div>

          <!-- Question Prompt -->
          <div class="ip-question-text">${q.question}</div>

          <!-- Options Grid -->
          <div class="ip-options-grid" id="ipOptionsGrid"></div>

          <!-- Explanation Box (Appears after answer) -->
          <div id="ipExplanationBox" class="hidden"></div>

          <!-- Action Footer -->
          <div class="flex items-center justify-between pt-4 border-t border-gray-800 mt-6">
            <div class="text-xs text-gray-500">Select an option to immediately view solution & explanation.</div>
            <button id="ipNextQuestionBtn" class="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold flex items-center gap-1.5 transition" disabled>
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
      <div class="ip-results-card">
        <div class="ip-score-circle" style="--score-color: ${scoreColor}; --score-percent: ${accuracy};">
          <div class="ip-score-inner">
            <span class="text-3xl font-extrabold text-white">${accuracy}%</span>
            <span class="text-xs text-gray-400 uppercase tracking-wider font-semibold">Accuracy</span>
          </div>
        </div>

        <h2 class="text-2xl font-bold text-white mb-1">Session Complete!</h2>
        <p class="text-sm text-gray-400 mb-6">
          ${accuracy >= 80 ? 'Outstanding performance! You have a solid grasp of this material.' :
            accuracy >= 60 ? 'Good effort! Review the explanations to reinforce your understanding.' :
            'Keep going! Repeated practice on weak points is the key to interview mastery.'}
        </p>

        <div class="ip-results-grid">
          <div class="ip-results-stat">
            <div class="text-2xl font-bold text-white">${stats.total}</div>
            <div class="text-xs text-gray-400">Questions</div>
          </div>
          <div class="ip-results-stat">
            <div class="text-2xl font-bold text-emerald-400">${stats.correct}</div>
            <div class="text-xs text-gray-400">Correct</div>
          </div>
          <div class="ip-results-stat">
            <div class="text-2xl font-bold text-red-400">${stats.incorrect}</div>
            <div class="text-xs text-gray-400">Incorrect</div>
          </div>
        </div>

        <!-- More Practice Action Menu -->
        <div class="ip-more-practice-menu">
          <button id="ipRetryTopicBtn" class="w-full py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm flex items-center justify-center gap-2 transition shadow-md">
            <span class="material-symbols-outlined text-sm">replay</span>
            <span>Retry This Topic</span>
          </button>
          <button id="ipPracticeWeakBtn" class="w-full py-2.5 px-4 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 font-medium text-sm flex items-center justify-center gap-2 transition">
            <span class="material-symbols-outlined text-sm">healing</span>
            <span>Practice Weak Topics</span>
          </button>
          <button id="ipBackToCategoryBtn" class="w-full py-2.5 px-4 rounded-lg border border-gray-700 hover:border-gray-600 text-gray-300 font-medium text-sm flex items-center justify-center gap-2 transition">
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
      // Landing Screen
      mainContainer.innerHTML = `
        <div class="max-w-2xl mx-auto">
          <div class="ip-mock-banner">
            <div class="flex items-center gap-3 mb-3">
              <span class="material-symbols-outlined text-3xl text-emerald-400">timer</span>
              <h2 class="text-2xl font-bold text-white">Full-Length Placement Mock Test</h2>
            </div>
            <p class="text-gray-300 text-sm mb-6 leading-relaxed">
              Simulate actual campus recruitment and technical screening tests. This comprehensive assessment spans 50 questions across Quantitative Aptitude, Verbal Ability, Logical Reasoning, Core CS, and Modern Tech Stacks under real-time constraints.
            </p>

            <div class="grid grid-cols-3 gap-3 mb-6">
              <div class="bg-gray-900/80 border border-gray-800 rounded-lg p-3 text-center">
                <div class="text-xl font-bold text-emerald-400">50</div>
                <div class="text-xs text-gray-400">Questions</div>
              </div>
              <div class="bg-gray-900/80 border border-gray-800 rounded-lg p-3 text-center">
                <div class="text-xl font-bold text-blue-400">60</div>
                <div class="text-xs text-gray-400">Minutes</div>
              </div>
              <div class="bg-gray-900/80 border border-gray-800 rounded-lg p-3 text-center">
                <div class="text-xl font-bold text-purple-400">Comprehensive</div>
                <div class="text-xs text-gray-400">Score Report</div>
              </div>
            </div>

            <div class="bg-gray-900/60 rounded-lg p-4 border border-gray-800 mb-6 text-xs text-gray-300 space-y-2">
              <div class="font-semibold text-white">Test Breakdown:</div>
              <div class="flex justify-between"><span>• Quantitative Aptitude</span><span class="text-gray-400">10 Questions</span></div>
              <div class="flex justify-between"><span>• Verbal & Logical Reasoning</span><span class="text-gray-400">10 Questions</span></div>
              <div class="flex justify-between"><span>• Programming & OOP</span><span class="text-gray-400">10 Questions</span></div>
              <div class="flex justify-between"><span>• DBMS, SQL & Networks</span><span class="text-gray-400">10 Questions</span></div>
              <div class="flex justify-between"><span>• Core CS & Modern Tech</span><span class="text-gray-400">10 Questions</span></div>
            </div>

            <button id="ipStartMockBtn" class="w-full py-3 px-6 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30">
              <span class="material-symbols-outlined">play_arrow</span>
              <span>Start 60-Minute Mock Test</span>
            </button>
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
          <div class="ip-quiz-card">
            <div class="flex items-center justify-between pb-3 border-b border-gray-800 mb-4">
              <div class="flex items-center gap-2">
                <span class="text-xs px-2.5 py-1 rounded bg-blue-500/20 text-blue-400 font-semibold uppercase">
                  ${q.categoryTitle || q.categoryId || 'General'}
                </span>
                <span class="text-xs text-gray-400">${q.topic || ''}</span>
              </div>
              <div id="ipMockTimer" class="ip-timer-badge">
                <span class="material-symbols-outlined text-sm">timer</span>
                <span id="ipTimerDigits">60:00</span>
              </div>
            </div>

            <div class="text-sm font-semibold text-gray-400 mb-2">Question ${currentNum} of ${total}</div>
            <div class="ip-question-text">${q.question}</div>

            <div class="ip-options-grid" id="ipMockOptionsGrid"></div>

            <div class="flex items-center justify-between pt-4 border-t border-gray-800 mt-6">
              <button id="ipPrevMockBtn" class="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm font-medium transition flex items-center gap-1" ${currentNum === 1 ? 'disabled style="opacity: 0.4;"' : ''}>
                <span class="material-symbols-outlined text-sm">arrow_back</span>
                <span>Previous</span>
              </button>
              <div class="flex gap-2">
                <button id="ipClearMockBtn" class="px-3 py-2 rounded-lg border border-gray-800 hover:bg-gray-800 text-gray-400 text-xs font-medium transition">
                  Clear
                </button>
                <button id="ipNextMockBtn" class="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition flex items-center gap-1">
                  <span>${currentNum === total ? 'Review' : 'Next'}</span>
                  <span class="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar / Question Navigator -->
        <div class="lg:col-span-1">
          <div class="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <div class="flex items-center justify-between mb-3">
              <div class="text-sm font-bold text-white">Questions</div>
              <div class="text-xs text-gray-400">${Object.keys(state.mockTest.answers).length} of ${total} Answered</div>
            </div>

            <div class="ip-qnav-grid mb-4" id="ipMockQNavGrid"></div>

            <button id="ipSubmitMockTestBtn" class="w-full py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold transition flex items-center justify-center gap-2">
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
      <div class="max-w-2xl mx-auto">
        <div class="ip-results-card">
          <div class="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 font-semibold mb-3">
            <span class="material-symbols-outlined text-xs">assessment</span>
            <span>Mock Placement Test Results</span>
          </div>

          <div class="ip-score-circle" style="--score-color: ${accuracy >= 70 ? '#10b981' : accuracy >= 40 ? '#f59e0b' : '#ef4444'}; --score-percent: ${accuracy};">
            <div class="ip-score-inner">
              <span class="text-3xl font-extrabold text-white">${accuracy}%</span>
              <span class="text-xs text-gray-400 uppercase tracking-wider font-semibold">Accuracy</span>
            </div>
          </div>

          <h2 class="text-2xl font-bold text-white mb-1">${accuracy >= 75 ? 'Placement Ready!' : accuracy >= 50 ? 'Promising Score' : 'Needs Practice'}</h2>
          <p class="text-sm text-gray-400 mb-6">
            ${isTimeout ? 'Time expired! ' : ''}You answered ${correct} out of 50 questions correctly.
          </p>

          <div class="ip-results-grid mb-6">
            <div class="ip-results-stat">
              <div class="text-2xl font-bold text-white">50</div>
              <div class="text-xs text-gray-400">Total Questions</div>
            </div>
            <div class="ip-results-stat">
              <div class="text-2xl font-bold text-emerald-400">${correct}</div>
              <div class="text-xs text-gray-400">Correct</div>
            </div>
            <div class="ip-results-stat">
              <div class="text-2xl font-bold text-red-400">${total - correct}</div>
              <div class="text-xs text-gray-400">Incorrect / Skipped</div>
            </div>
          </div>

          <!-- Category Breakdown -->
          <div class="text-left bg-gray-900 border border-gray-800 rounded-lg p-4 mb-6">
            <h4 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Performance by Section</h4>
            <div class="space-y-3">
              ${Object.keys(categoryBreakdown).map(cat => {
                const b = categoryBreakdown[cat];
                const acc = Math.round((b.correct / b.total) * 100);
                return `
                  <div>
                    <div class="flex justify-between text-xs text-gray-300 mb-1">
                      <span>${cat}</span>
                      <span class="font-semibold text-white">${b.correct}/${b.total} (${acc}%)</span>
                    </div>
                    <div class="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div class="h-full ${acc >= 70 ? 'bg-emerald-500' : acc >= 50 ? 'bg-amber-500' : 'bg-red-500'}" style="width: ${acc}%"></div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <div class="flex gap-3">
            <button id="ipRetakeMockBtn" class="flex-1 py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition">
              Take Another Mock Test
            </button>
            <button id="ipBackToPrepBtn" class="flex-1 py-2.5 px-4 rounded-lg border border-gray-700 hover:bg-gray-800 text-gray-300 font-medium text-sm transition">
              Back to Overview
            </button>
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
      <div class="mb-6 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 class="text-xl font-bold text-white">Smart Weak Topics Diagnosis</h2>
          <p class="text-sm text-gray-400">DevPilot analyzes your practice history and identifies topics where accuracy is below 60%.</p>
        </div>
        ${weakList.length > 0 ? `
          <button id="ipStartWeakDrillBtn" class="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-sm font-semibold transition flex items-center gap-1.5 shadow-md">
            <span class="material-symbols-outlined text-sm">healing</span>
            <span>Drill All Weak Topics</span>
          </button>
        ` : ''}
      </div>
      <div id="ipWeakTopicsContainer"></div>
    `;

    const container = document.getElementById('ipWeakTopicsContainer');
    if (weakList.length === 0) {
      container.innerHTML = `
        <div class="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center max-w-lg mx-auto">
          <div class="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-4">
            <span class="material-symbols-outlined text-3xl">verified</span>
          </div>
          <h3 class="text-lg font-bold text-white mb-2">No Weak Topics Detected</h3>
          <p class="text-sm text-gray-400 mb-6">
            You haven't accumulated low-scoring topics yet! Attempt more questions across the 18 placement categories, and DevPilot will highlight areas where you need reinforcement.
          </p>
          <button class="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition" onclick="document.querySelector('[data-mode=\\'categories\\']').click()">
            Browse Categories
          </button>
        </div>
      `;
      return;
    }

    if (document.getElementById('ipStartWeakDrillBtn')) {
      document.getElementById('ipStartWeakDrillBtn').addEventListener('click', startWeakTopicsQuiz);
    }

    const grid = document.createElement('div');
    grid.className = 'grid grid-cols-1 md:grid-cols-2 gap-4';
    weakList.forEach(w => {
      const card = document.createElement('div');
      card.className = 'bg-gray-900 border border-red-900/30 rounded-xl p-4 flex items-center justify-between gap-4';
      card.innerHTML = `
        <div class="min-w-0">
          <div class="flex items-center gap-2 mb-1">
            <span class="material-symbols-outlined text-red-400 text-sm">warning</span>
            <span class="text-xs font-semibold text-gray-400 uppercase">${w.categoryTitle}</span>
          </div>
          <h4 class="text-base font-semibold text-white truncate">${w.topic}</h4>
          <div class="text-xs text-red-400 mt-1">Accuracy: ${w.accuracy}% (${w.incorrectCount} mistakes across ${w.attempted} attempts)</div>
        </div>
        <button class="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shrink-0 transition ip-drill-topic-btn">
          Practice
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
      <div class="mb-6">
        <h2 class="text-xl font-bold text-white">Core CS Subject Checklists</h2>
        <p class="text-sm text-gray-400">Track and review critical placement concepts across the 8 core computer science subjects.</p>
      </div>
      <div class="space-y-4" id="ipChecklistsList"></div>
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
      card.className = 'ip-checklist-card';
      card.innerHTML = `
        <div class="ip-checklist-header">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined">${subject.icon || 'checklist'}</span>
            </div>
            <div>
              <h3 class="text-base font-bold text-white">${subject.title}</h3>
              <p class="text-xs text-gray-400">${items.length} Essential Concepts</p>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <div class="text-right">
              <div class="text-xs font-bold text-white">${checkedCount} / ${items.length}</div>
              <div class="text-xs text-gray-400">${progressPercent}% Completed</div>
            </div>
            <span class="material-symbols-outlined text-gray-400 transition transform ip-chk-chevron">expand_more</span>
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
            <span class="text-sm text-gray-200 ip-chk-label ${isChecked ? 'checked' : ''}">${item.label}</span>
            ${item.important ? '<span class="ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">MUST KNOW</span>' : ''}
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
          header.querySelector('.text-xs.font-bold').textContent = `${newCheckedCount} / ${items.length}`;
          header.querySelector('.text-xs.text-gray-400').textContent = `${newPct}% Completed`;
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
      <div class="mb-6">
        <h2 class="text-xl font-bold text-white">Group Discussion & HR Behavioral Round Preparation</h2>
        <p class="text-sm text-gray-400">Master campus GD rounds with structured arguments and ace behavioral interviews using the STAR framework.</p>
      </div>

      <div class="flex gap-4 border-b border-gray-800 pb-3 mb-6">
        <button id="ipTabGD" class="text-sm font-bold text-white border-b-2 border-blue-500 pb-2">
          Group Discussion Topics (${gdTopics.length})
        </button>
        <button id="ipTabHR" class="text-sm font-semibold text-gray-400 hover:text-white pb-2">
          HR Interview Questions & STAR Framework (${hrQuestions.length})
        </button>
      </div>

      <div id="ipGdContent" class="space-y-4"></div>
      <div id="ipHrContent" class="space-y-4 hidden"></div>
    `;

    const tabGD = document.getElementById('ipTabGD');
    const tabHR = document.getElementById('ipTabHR');
    const gdContent = document.getElementById('ipGdContent');
    const hrContent = document.getElementById('ipHrContent');

    tabGD.addEventListener('click', () => {
      tabGD.className = 'text-sm font-bold text-white border-b-2 border-blue-500 pb-2';
      tabHR.className = 'text-sm font-semibold text-gray-400 hover:text-white pb-2';
      gdContent.classList.remove('hidden');
      hrContent.classList.add('hidden');
    });

    tabHR.addEventListener('click', () => {
      tabHR.className = 'text-sm font-bold text-white border-b-2 border-blue-500 pb-2';
      tabGD.className = 'text-sm font-semibold text-gray-400 hover:text-white pb-2';
      hrContent.classList.remove('hidden');
      gdContent.classList.add('hidden');
    });

    // Render GD topics
    gdTopics.forEach(gd => {
      const card = document.createElement('div');
      card.className = 'ip-gd-card';
      card.innerHTML = `
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-lg font-bold text-white">${gd.title}</h3>
          <span class="text-xs px-2.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30 font-medium">${gd.category}</span>
        </div>
        <div class="bg-gray-900/60 p-3 rounded-lg border border-gray-800 text-xs text-gray-300 mb-4">
          <strong class="text-blue-400">Strong Opening Statement:</strong> "${gd.openingStatement}"
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div class="bg-emerald-950/20 border border-emerald-900/30 p-3 rounded-lg">
            <h5 class="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">Points In Favor / Opportunities</h5>
            <ul class="text-xs text-gray-300 space-y-1.5 list-disc list-inside">
              ${(gd.pointsInFavor || []).map(p => `<li>${p}</li>`).join('')}
            </ul>
          </div>
          <div class="bg-red-950/20 border border-red-900/30 p-3 rounded-lg">
            <h5 class="text-xs font-bold text-red-400 uppercase tracking-wider mb-2">Points Against / Challenges</h5>
            <ul class="text-xs text-gray-300 space-y-1.5 list-disc list-inside">
              ${(gd.pointsAgainst || []).map(p => `<li>${p}</li>`).join('')}
            </ul>
          </div>
        </div>
        <div class="bg-gray-900/40 p-3 rounded-lg text-xs text-gray-400">
          <strong class="text-gray-300">Balanced Conclusion:</strong> ${gd.conclusion}
        </div>
      `;
      gdContent.appendChild(card);
    });

    // Render HR questions
    hrQuestions.forEach(hr => {
      const card = document.createElement('div');
      card.className = 'ip-hr-card';
      card.innerHTML = `
        <div class="flex items-start justify-between gap-4 mb-3">
          <div>
            <span class="text-xs font-semibold text-blue-400 uppercase tracking-wider">${hr.category}</span>
            <h3 class="text-lg font-bold text-white mt-0.5">"${hr.question}"</h3>
          </div>
        </div>
        <div class="bg-gray-900/80 p-3 rounded-lg border border-gray-800 text-xs text-gray-300 mb-4">
          <strong class="text-purple-400">What the Interviewer is Evaluating:</strong> ${hr.evaluatingFor}
        </div>
        <div class="ip-star-grid">
          <div class="ip-star-box">
            <div class="ip-star-letter">S</div>
            <div class="text-xs font-bold text-gray-200 mb-1">Situation</div>
            <p class="text-xs text-gray-400">${hr.starGuide.situation}</p>
          </div>
          <div class="ip-star-box">
            <div class="ip-star-letter">T</div>
            <div class="text-xs font-bold text-gray-200 mb-1">Task</div>
            <p class="text-xs text-gray-400">${hr.starGuide.task}</p>
          </div>
          <div class="ip-star-box">
            <div class="ip-star-letter">A</div>
            <div class="text-xs font-bold text-gray-200 mb-1">Action</div>
            <p class="text-xs text-gray-400">${hr.starGuide.action}</p>
          </div>
          <div class="ip-star-box">
            <div class="ip-star-letter">R</div>
            <div class="text-xs font-bold text-gray-200 mb-1">Result</div>
            <p class="text-xs text-gray-400">${hr.starGuide.result}</p>
          </div>
        </div>
        <div class="mt-4 p-3 rounded-lg bg-amber-950/20 border border-amber-900/30 text-xs text-amber-300">
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
