/**
 * DevPilot-AI - Code Snippet Vault Controller
 * Handles Multi-Category/Language Filtering, Multi-Field Search,
 * Reliable Copy, Favorites, Recently Viewed History & Deep Learning Modal.
 */

// Fallback dataset if snippetsData.js is loaded asynchronously
const fallbackSnippets = typeof SNIPPETS_DATA !== 'undefined' ? SNIPPETS_DATA : [];
const fallbackCategories = typeof SNIPPET_CATEGORIES !== 'undefined' ? SNIPPET_CATEGORIES : [];

// State Management
let allSnippets = fallbackSnippets;
let activeCategory = 'All';
let activeLanguage = 'All';
let filterSavedOnly = false;
let filterRecentOnly = false;
let searchQuery = '';
let currentModalSnippet = null;

// Persistent User Storage
let savedSnippetIds = new Set(Storage.get('saved_snippets', []));
let recentSnippetIds = Storage.get('recent_snippets', []); // Array of IDs in MRU order

document.addEventListener('DOMContentLoaded', () => {
  initSnippetsData();
  initCategoryUI();
  initToolbarFilters();
  initSearch();
  initDetailsModal();
  updateSavedCount();
  renderSnippets();
});

/**
 * Initializes the snippets dataset and syncs with global data vault.
 */
function initSnippetsData() {
  if (typeof SNIPPETS_DATA !== 'undefined' && Array.isArray(SNIPPETS_DATA)) {
    allSnippets = SNIPPETS_DATA;
  }
}

/**
 * Builds category tabs and category jump dropdown.
 */
function initCategoryUI() {
  const tabsContainer = document.getElementById('snippet-category-tabs');
  const dropdown = document.getElementById('snippet-category-dropdown');
  const categories = typeof SNIPPET_CATEGORIES !== 'undefined' ? SNIPPET_CATEGORIES : fallbackCategories;

  if (tabsContainer) {
    const tabsHtml = [
      `<button class="filter-tab snippet-cat-tab active" data-category="All">All Categories</button>`
    ];
    categories.forEach(cat => {
      tabsHtml.push(`
        <button class="filter-tab snippet-cat-tab" data-category="${escapeHtml(cat.name)}">
          ${escapeHtml(cat.name)}
        </button>
      `);
    });
    tabsContainer.innerHTML = tabsHtml.join('');

    tabsContainer.addEventListener('click', (e) => {
      const tab = e.target.closest('.snippet-cat-tab');
      if (!tab) return;
      selectCategory(tab.getAttribute('data-category') || 'All');
    });
  }

  if (dropdown) {
    const optionsHtml = [
      `<option value="All">All Domains (${categories.length} Categories)</option>`
    ];
    categories.forEach(cat => {
      optionsHtml.push(`<option value="${escapeHtml(cat.name)}">${escapeHtml(cat.name)}</option>`);
    });
    dropdown.innerHTML = optionsHtml.join('');

    dropdown.addEventListener('change', (e) => {
      selectCategory(e.target.value);
    });
  }
}

/**
 * Selects a category and synchronizes tabs and dropdown.
 */
function selectCategory(catName) {
  activeCategory = catName;

  const tabs = document.querySelectorAll('.snippet-cat-tab');
  tabs.forEach(t => {
    if (t.getAttribute('data-category') === catName) {
      t.classList.add('active');
      t.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' });
    } else {
      t.classList.remove('active');
    }
  });

  const dropdown = document.getElementById('snippet-category-dropdown');
  if (dropdown && dropdown.value !== catName) {
    dropdown.value = catName;
  }

  renderSnippets();
}

/**
 * Initializes language tabs, saved filter, and recent filter.
 */
function initToolbarFilters() {
  const langTabs = document.querySelectorAll('.snippet-lang-tab');
  langTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      langTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeLanguage = tab.getAttribute('data-lang') || 'All';
      renderSnippets();
    });
  });

  const savedBtn = document.getElementById('btn-filter-saved');
  if (savedBtn) {
    savedBtn.addEventListener('click', () => {
      filterSavedOnly = !filterSavedOnly;
      if (filterSavedOnly) filterRecentOnly = false; // Mutually exclusive quick view
      updateQuickFilterButtons();
      renderSnippets();
    });
  }

  const recentBtn = document.getElementById('btn-filter-recent');
  const clearHistoryBtn = document.getElementById('btn-clear-history');

  if (recentBtn) {
    recentBtn.addEventListener('click', () => {
      filterRecentOnly = !filterRecentOnly;
      if (filterRecentOnly) filterSavedOnly = false;
      updateQuickFilterButtons();
      renderSnippets();
    });
  }

  if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener('click', () => {
      if (confirm('Clear recently viewed snippets history?')) {
        recentSnippetIds = [];
        Storage.set('recent_snippets', []);
        updateQuickFilterButtons();
        renderSnippets();
        showToast('Viewing history cleared', 'info');
      }
    });
  }

  const clearFiltersBtn = document.getElementById('btn-clear-filters');
  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener('click', clearAllFilters);
  }
}

function updateQuickFilterButtons() {
  const savedBtn = document.getElementById('btn-filter-saved');
  const recentBtn = document.getElementById('btn-filter-recent');
  const clearHistoryBtn = document.getElementById('btn-clear-history');

  if (savedBtn) savedBtn.classList.toggle('active', filterSavedOnly);
  if (recentBtn) recentBtn.classList.toggle('active', filterRecentOnly);
  if (clearHistoryBtn) {
    clearHistoryBtn.classList.toggle('hidden', !filterRecentOnly || recentSnippetIds.length === 0);
  }
}

/**
 * Clears all active filters and search queries.
 */
window.clearAllFilters = function() {
  activeCategory = 'All';
  activeLanguage = 'All';
  filterSavedOnly = false;
  filterRecentOnly = false;
  searchQuery = '';

  const searchInput = document.getElementById('snippets-search-input');
  if (searchInput) searchInput.value = '';

  selectCategory('All');

  const langTabs = document.querySelectorAll('.snippet-lang-tab');
  langTabs.forEach(t => t.classList.toggle('active', t.getAttribute('data-lang') === 'All'));

  updateQuickFilterButtons();
  renderSnippets();
};

/**
 * Initializes multi-field tokenized search.
 */
function initSearch() {
  const searchInput = document.getElementById('snippets-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderSnippets();
    });
  }
}

/**
 * Filter by clicking a tag chip.
 */
window.filterSnippetByTag = function(tag) {
  const searchInput = document.getElementById('snippets-search-input');
  if (searchInput) {
    searchInput.value = tag;
    searchQuery = tag;
    renderSnippets();
    searchInput.focus();
    window.scrollTo({ top: 120, behavior: 'smooth' });
  }
};

/**
 * Evaluates filter criteria and returns matching snippets.
 */
function getFilteredSnippets() {
  const q = searchQuery.toLowerCase().trim();
  const searchTokens = q.split(/\s+/).filter(Boolean);

  let filtered = allSnippets.filter(s => {
    // Saved filter
    if (filterSavedOnly && !savedSnippetIds.has(s.id)) {
      return false;
    }

    // Recent filter
    if (filterRecentOnly && !recentSnippetIds.includes(s.id)) {
      return false;
    }

    // Category filter
    if (activeCategory !== 'All' && s.category.toLowerCase() !== activeCategory.toLowerCase()) {
      return false;
    }

    // Language filter
    if (activeLanguage !== 'All') {
      const matchLang = s.language.toLowerCase().includes(activeLanguage.toLowerCase());
      if (!matchLang) return false;
    }

    // Multi-field search
    if (searchTokens.length > 0) {
      const tagsStr = Array.isArray(s.tags) ? s.tags.join(' ') : (s.tags || '');
      const searchable = `${s.title || ''} ${s.description || ''} ${s.code || ''} ${s.category || ''} ${s.subcategory || ''} ${tagsStr}`.toLowerCase();

      const allTokensMatch = searchTokens.every(token => searchable.includes(token));
      if (!allTokensMatch) return false;
    }

    return true;
  });

  // If in Recent mode, sort by Most Recently Used order
  if (filterRecentOnly) {
    filtered.sort((a, b) => {
      return recentSnippetIds.indexOf(a.id) - recentSnippetIds.indexOf(b.id);
    });
  }

  return filtered;
}

/**
 * Renders the snippet cards into the responsive grid.
 */
function renderSnippets() {
  const container = document.getElementById('snippets-grid');
  const countDisplay = document.getElementById('snippet-results-count');
  const clearBtn = document.getElementById('btn-clear-filters');
  if (!container) return;

  const filtered = getFilteredSnippets();

  // Update counter & clear button visibility
  if (countDisplay) {
    countDisplay.textContent = `Showing ${filtered.length} of ${allSnippets.length} snippets`;
  }
  if (clearBtn) {
    const hasActiveFilters = activeCategory !== 'All' || activeLanguage !== 'All' || filterSavedOnly || filterRecentOnly || searchQuery !== '';
    clearBtn.classList.toggle('hidden', !hasActiveFilters);
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full dev-card text-center py-14">
        <span class="material-symbols-outlined text-4xl text-outline mb-2">code_off</span>
        <h4 class="font-bold text-lg text-on-surface">No matching snippets found</h4>
        <p class="text-sm text-on-surface-variant mt-1">Try switching categories, language filters, or clear your search term.</p>
        <button class="btn-primary text-sm py-2 px-4 mt-4 inline-flex items-center gap-1.5" onclick="clearAllFilters()">
          <span class="material-symbols-outlined text-[16px]">refresh</span>
          <span>Reset Filters</span>
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(s => {
    const isSaved = savedSnippetIds.has(s.id);
    const badgeClass = getCategoryBadgeClass(s.category);
    const langClass = s.langClass || getLangClass(s.language);
    const tagsList = Array.isArray(s.tags) ? s.tags : (s.tags ? s.tags.split(',') : []);

    const tagsHtml = tagsList.slice(0, 3).map(t => {
      const clean = t.trim().replace(/^#/, '');
      return `<button class="note-tag-pill text-[11px] py-0.5 px-2" onclick="filterSnippetByTag('${escapeHtml(clean)}')">#${escapeHtml(clean)}</button>`;
    }).join('');

    return `
      <div class="snippet-card">
        <div>
          <!-- Header: Category, Language, Favorite -->
          <div class="flex items-center justify-between gap-2 mb-2">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="snippet-badge ${badgeClass}">${escapeHtml(s.category)}</span>
              <span class="badge badge-primary text-xs flex items-center gap-1">
                <span class="repo-lang-dot ${langClass}"></span>
                ${escapeHtml(s.language)}
              </span>
              ${s.difficulty ? `<span class="difficulty-badge difficulty-${s.difficulty.toLowerCase()}">${escapeHtml(s.difficulty)}</span>` : ''}
            </div>
            <button class="btn-favorite-star ${isSaved ? 'active' : ''}" title="${isSaved ? 'Remove from Saved' : 'Save Snippet'}" onclick="toggleFavorite('${s.id}')">
              <span class="material-symbols-outlined text-[20px]">star</span>
            </button>
          </div>

          <!-- Title & Subcategory -->
          <div class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">${escapeHtml(s.subcategory || s.category)}</div>
          <h3 class="font-bold text-base text-slate-900 leading-snug mb-1 hover:text-indigo-600 cursor-pointer transition-colors" onclick="openSnippetDetails('${s.id}')">
            ${escapeHtml(s.title)}
          </h3>
          <p class="text-xs text-slate-600 line-clamp-2 mb-3">${escapeHtml(s.description)}</p>

          <!-- Code Preview Box -->
          <div class="snippet-code-preview">
            <div class="snippet-code-header">
              <div class="code-block-dots">
                <span class="code-dot code-dot-red"></span>
                <span class="code-dot code-dot-yellow"></span>
                <span class="code-dot code-dot-green"></span>
              </div>
              <button class="btn-copy-code" onclick="copySnippet('${s.id}', this)">
                <span class="material-symbols-outlined text-[13px]">content_copy</span>
                <span class="copy-text">Copy</span>
              </button>
            </div>
            <pre class="snippet-code-content"><code>${escapeHtml(s.code)}</code></pre>
          </div>

          <!-- Tags -->
          ${tagsList.length > 0 ? `<div class="flex flex-wrap gap-1 mt-3">${tagsHtml}</div>` : ''}
        </div>

        <!-- Footer Actions -->
        <div class="snippet-card-footer">
          <button class="btn-view-details" onclick="openSnippetDetails('${s.id}')">
            <span>View Details & Traps</span>
            <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
          <button class="btn-copy-code" onclick="copySnippet('${s.id}', this)">
            <span class="material-symbols-outlined text-[14px]">content_copy</span>
            <span class="copy-text">Copy Code</span>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

/**
 * Returns clean CSS class for category badges.
 */
function getCategoryBadgeClass(category) {
  if (!category) return 'badge-general';
  const clean = category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return `badge-${clean}`;
}

/**
 * Returns language dot class.
 */
function getLangClass(lang) {
  if (!lang) return 'lang-js';
  const l = lang.toLowerCase();
  if (l.includes('c++')) return 'lang-cpp';
  if (l.includes('py')) return 'lang-python';
  if (l.includes('html') || l.includes('css')) return 'lang-html';
  if (l.includes('sql')) return 'lang-sql';
  if (l.includes('docker')) return 'lang-docker';
  if (l.includes('bash') || l.includes('shell')) return 'lang-bash';
  return 'lang-js';
}

/**
 * Copies raw code to clipboard and tracks in Recently Viewed.
 */
window.copySnippet = function(id, btnElement) {
  const snippet = allSnippets.find(s => s.id === id);
  if (!snippet) return;

  copyToClipboard(snippet.code, `Copied "${snippet.title}" code to clipboard!`);
  trackRecentSnippet(id);

  // Button visual confirmation
  if (btnElement) {
    const textSpan = btnElement.querySelector('.copy-text');
    const iconSpan = btnElement.querySelector('.material-symbols-outlined');
    const originalText = textSpan ? textSpan.textContent : 'Copy Code';

    btnElement.classList.add('copied');
    if (textSpan) textSpan.textContent = 'Copied!';
    if (iconSpan) iconSpan.textContent = 'check';

    setTimeout(() => {
      btnElement.classList.remove('copied');
      if (textSpan) textSpan.textContent = originalText;
      if (iconSpan) iconSpan.textContent = 'content_copy';
    }, 2000);
  }
};

/**
 * Toggles a snippet in the Saved / Favorites set.
 */
window.toggleFavorite = function(id) {
  if (savedSnippetIds.has(id)) {
    savedSnippetIds.delete(id);
    showToast('Snippet removed from saved', 'info');
  } else {
    savedSnippetIds.add(id);
    showToast('Snippet saved to favorites!', 'success');
  }

  Storage.set('saved_snippets', Array.from(savedSnippetIds));
  updateSavedCount();

  // Sync modal button if open
  if (currentModalSnippet && currentModalSnippet.id === id) {
    const modalFavBtn = document.getElementById('modal-btn-favorite');
    if (modalFavBtn) {
      modalFavBtn.classList.toggle('active', savedSnippetIds.has(id));
    }
  }

  renderSnippets();
};

function updateSavedCount() {
  const countEl = document.getElementById('saved-count');
  if (countEl) {
    countEl.textContent = savedSnippetIds.size;
  }
}

/**
 * Tracks a snippet in the Recently Viewed history (MRU).
 */
function trackRecentSnippet(id) {
  recentSnippetIds = recentSnippetIds.filter(x => x !== id);
  recentSnippetIds.unshift(id);
  if (recentSnippetIds.length > 25) {
    recentSnippetIds.pop();
  }
  Storage.set('recent_snippets', recentSnippetIds);
}

/**
 * Initializes the Deep Learning Details Modal.
 */
function initDetailsModal() {
  const modal = document.getElementById('snippet-details-modal');
  const closeBtn = document.getElementById('modal-btn-close');
  const favBtn = document.getElementById('modal-btn-favorite');
  const copyBtn = document.getElementById('modal-btn-copy');

  if (closeBtn) {
    closeBtn.addEventListener('click', closeSnippetDetails);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeSnippetDetails();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      closeSnippetDetails();
    }
  });

  if (favBtn) {
    favBtn.addEventListener('click', () => {
      if (currentModalSnippet) {
        toggleFavorite(currentModalSnippet.id);
      }
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      if (currentModalSnippet) {
        copySnippet(currentModalSnippet.id, copyBtn);
      }
    });
  }
}

/**
 * Opens details modal for a specific snippet.
 */
window.openSnippetDetails = function(id) {
  const snippet = allSnippets.find(s => s.id === id);
  if (!snippet) return;

  currentModalSnippet = snippet;
  trackRecentSnippet(id);

  // Set fields
  document.getElementById('modal-title').textContent = snippet.title;
  document.getElementById('modal-description').textContent = snippet.description;

  const catBadge = document.getElementById('modal-category-badge');
  if (catBadge) {
    catBadge.textContent = snippet.category;
    catBadge.className = `snippet-badge ${getCategoryBadgeClass(snippet.category)}`;
  }

  const langDot = document.getElementById('modal-lang-dot');
  const langName = document.getElementById('modal-lang-name');
  if (langDot && langName) {
    langName.textContent = snippet.language;
    langDot.className = `repo-lang-dot ${snippet.langClass || getLangClass(snippet.language)}`;
  }

  const diffBadge = document.getElementById('modal-difficulty-badge');
  if (diffBadge) {
    diffBadge.textContent = snippet.difficulty || 'Useful';
    diffBadge.className = `difficulty-badge difficulty-${(snippet.difficulty || 'medium').toLowerCase()}`;
  }

  document.getElementById('modal-code-block').textContent = snippet.code;
  document.getElementById('modal-subcategory').textContent = snippet.subcategory || snippet.category;

  // Complexity
  const timeEl = document.getElementById('modal-time-complexity');
  const spaceEl = document.getElementById('modal-space-complexity');
  if (timeEl && spaceEl) {
    const comp = snippet.complexity || { time: 'O(1)', space: 'O(1)' };
    timeEl.textContent = `Time: ${comp.time || 'O(1)'}`;
    spaceEl.textContent = `Space: ${comp.space || 'O(1)'}`;
  }

  // Explanation, use cases, common mistakes
  document.getElementById('modal-explanation').textContent = snippet.explanation || 'Detailed walkthrough and syntax reference.';
  document.getElementById('modal-use-cases').textContent = snippet.useCases || 'Standard algorithmic and production implementations.';
  document.getElementById('modal-common-mistakes').textContent = snippet.commonMistakes || 'Be mindful of edge cases and syntax bounds.';

  // Favorite button state
  const favBtn = document.getElementById('modal-btn-favorite');
  if (favBtn) {
    favBtn.classList.toggle('active', savedSnippetIds.has(snippet.id));
  }

  // Related Snippets recommendations
  renderRelatedSnippets(snippet);

  // Open modal
  const modal = document.getElementById('snippet-details-modal');
  if (modal) modal.classList.add('open');
};

function closeSnippetDetails() {
  const modal = document.getElementById('snippet-details-modal');
  if (modal) modal.classList.remove('open');
  currentModalSnippet = null;
}

/**
 * Renders related snippet recommendation cards inside the modal.
 */
function renderRelatedSnippets(currentSnippet) {
  const container = document.getElementById('modal-related-snippets');
  if (!container) return;

  const related = typeof getRelatedSnippets === 'function'
    ? getRelatedSnippets(currentSnippet, 4)
    : allSnippets.filter(s => s.id !== currentSnippet.id && s.category === currentSnippet.category).slice(0, 4);

  if (related.length === 0) {
    container.innerHTML = `<p class="text-xs text-slate-400">No related snippets found.</p>`;
    return;
  }

  container.innerHTML = related.map(rel => `
    <div class="related-snippet-chip" onclick="openSnippetDetails('${rel.id}')">
      <div class="flex items-center justify-between mb-1">
        <span class="text-[10px] font-bold text-slate-400 uppercase">${escapeHtml(rel.language)}</span>
        <span class="text-[10px] text-indigo-600 font-semibold">${escapeHtml(rel.subcategory || '')}</span>
      </div>
      <div class="text-xs font-bold text-slate-800 line-clamp-1">${escapeHtml(rel.title)}</div>
    </div>
  `).join('');
}

/**
 * HTML Escaping utility.
 */
function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
