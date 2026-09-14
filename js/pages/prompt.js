/**
 * DevPilot-AI - AI Prompt Vault Controller
 * Manages Multi-Field Search, Collections, Domain Categories, Difficulty Filters,
 * Interactive Variable Substitution, Saved Favorites, and Seamless AI Chat Handoff.
 */

// Fallbacks if data loaded asynchronously
const fallbackPrompts = typeof PROMPTS_DATA !== 'undefined' ? PROMPTS_DATA : [];
const fallbackCategories = typeof PROMPT_CATEGORIES !== 'undefined' ? PROMPT_CATEGORIES : [];
const fallbackCollections = typeof PROMPT_COLLECTIONS !== 'undefined' ? PROMPT_COLLECTIONS : [];

// State Management
let allPrompts = fallbackPrompts;
let activeCollection = 'all';
let activeCategory = 'All';
let activeDifficulty = 'All';
let filterSavedOnly = false;
let filterRecentOnly = false;
let searchQuery = '';

// Active Modal State
let currentModalPrompt = null;
let modalVariableValues = {};

// Local Storage Persistence
let savedPromptIds = new Set(Storage.get('saved_prompts', []));
let recentPromptIds = Storage.get('recent_prompts', []); // MRU array of prompt IDs

document.addEventListener('DOMContentLoaded', () => {
  initPromptsData();
  initCollectionsUI();
  initCategoryUI();
  initDifficultyUI();
  initToolbarFilters();
  initSearch();
  initDetailsModal();
  updateSavedCount();
  renderPrompts();
});

/**
 * Initializes the prompts dataset from global data file.
 */
function initPromptsData() {
  if (typeof PROMPTS_DATA !== 'undefined' && Array.isArray(PROMPTS_DATA)) {
    allPrompts = PROMPTS_DATA;
  }
}

/**
 * Renders the Curated Preset Collections bar.
 */
function initCollectionsUI() {
  const container = document.getElementById('prompt-collections-scroll');
  const collections = typeof PROMPT_COLLECTIONS !== 'undefined' ? PROMPT_COLLECTIONS : fallbackCollections;
  if (!container) return;

  container.innerHTML = collections.map(col => `
    <button class="collection-chip ${col.id === activeCollection ? 'active' : ''}" data-id="${escapeHtml(col.id)}">
      <span class="material-symbols-outlined text-[15px]">${escapeHtml(col.icon || 'star')}</span>
      <span>${escapeHtml(col.name)}</span>
    </button>
  `).join('');

  container.addEventListener('click', (e) => {
    const chip = e.target.closest('.collection-chip');
    if (!chip) return;

    const colId = chip.getAttribute('data-id') || 'all';
    selectCollection(colId);
  });
}

function selectCollection(colId) {
  activeCollection = colId;

  // Sync chip styles
  const chips = document.querySelectorAll('.collection-chip');
  chips.forEach(c => c.classList.toggle('active', c.getAttribute('data-id') === colId));

  // If specific collection selected, adjust category or reset to All
  const collections = typeof PROMPT_COLLECTIONS !== 'undefined' ? PROMPT_COLLECTIONS : fallbackCollections;
  const col = collections.find(c => c.id === colId);

  if (col && col.filterType === 'category') {
    selectCategory(col.target);
  } else {
    // Keep category as-is or All
    renderPrompts();
  }
}

/**
 * Builds category horizontal scroll tabs and dropdown.
 */
function initCategoryUI() {
  const tabsContainer = document.getElementById('prompt-category-tabs');
  const dropdown = document.getElementById('prompt-category-dropdown');
  const categories = typeof PROMPT_CATEGORIES !== 'undefined' ? PROMPT_CATEGORIES : fallbackCategories;

  if (tabsContainer) {
    const tabsHtml = [
      `<button class="filter-tab prompt-cat-tab active" data-category="All">All Categories</button>`
    ];
    categories.forEach(cat => {
      tabsHtml.push(`
        <button class="filter-tab prompt-cat-tab" data-category="${escapeHtml(cat.name)}">
          ${escapeHtml(cat.name)}
        </button>
      `);
    });
    tabsContainer.innerHTML = tabsHtml.join('');

    tabsContainer.addEventListener('click', (e) => {
      const tab = e.target.closest('.prompt-cat-tab');
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

function selectCategory(catName) {
  activeCategory = catName;

  const tabs = document.querySelectorAll('.prompt-cat-tab');
  tabs.forEach(t => {
    if (t.getAttribute('data-category') === catName) {
      t.classList.add('active');
      t.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' });
    } else {
      t.classList.remove('active');
    }
  });

  const dropdown = document.getElementById('prompt-category-dropdown');
  if (dropdown && dropdown.value !== catName) {
    dropdown.value = catName;
  }

  renderPrompts();
}

/**
 * Initializes difficulty level chips.
 */
function initDifficultyUI() {
  const diffTabs = document.querySelectorAll('.prompt-diff-tab');
  diffTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      diffTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeDifficulty = tab.getAttribute('data-diff') || 'All';
      renderPrompts();
    });
  });
}

/**
 * Initializes quick filters (Saved, Recent, Clear).
 */
function initToolbarFilters() {
  const savedBtn = document.getElementById('btn-filter-saved');
  if (savedBtn) {
    savedBtn.addEventListener('click', () => {
      filterSavedOnly = !filterSavedOnly;
      if (filterSavedOnly) filterRecentOnly = false;
      updateQuickFilterButtons();
      renderPrompts();
    });
  }

  const recentBtn = document.getElementById('btn-filter-recent');
  const clearHistoryBtn = document.getElementById('btn-clear-history');

  if (recentBtn) {
    recentBtn.addEventListener('click', () => {
      filterRecentOnly = !filterRecentOnly;
      if (filterRecentOnly) filterSavedOnly = false;
      updateQuickFilterButtons();
      renderPrompts();
    });
  }

  if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener('click', () => {
      if (confirm('Clear recently used prompts history?')) {
        recentPromptIds = [];
        Storage.set('recent_prompts', []);
        updateQuickFilterButtons();
        renderPrompts();
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
    clearHistoryBtn.classList.toggle('hidden', !filterRecentOnly || recentPromptIds.length === 0);
  }
}

window.clearAllFilters = function() {
  activeCollection = 'all';
  activeCategory = 'All';
  activeDifficulty = 'All';
  filterSavedOnly = false;
  filterRecentOnly = false;
  searchQuery = '';

  const searchInput = document.getElementById('prompts-search-input');
  if (searchInput) searchInput.value = '';

  const chips = document.querySelectorAll('.collection-chip');
  chips.forEach(c => c.classList.toggle('active', c.getAttribute('data-id') === 'all'));

  selectCategory('All');

  const diffTabs = document.querySelectorAll('.prompt-diff-tab');
  diffTabs.forEach(t => t.classList.toggle('active', t.getAttribute('data-diff') === 'All'));

  updateQuickFilterButtons();
  renderPrompts();
};

/**
 * Initializes multi-field search input.
 */
function initSearch() {
  const searchInput = document.getElementById('prompts-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderPrompts();
    });
  }
}

window.filterPromptByTag = function(tag) {
  const searchInput = document.getElementById('prompts-search-input');
  if (searchInput) {
    searchInput.value = tag;
    searchQuery = tag;
    renderPrompts();
    searchInput.focus();
    window.scrollTo({ top: 120, behavior: 'smooth' });
  }
};

/**
 * Evaluates all filter criteria and returns matching prompt items.
 */
function getFilteredPrompts() {
  const q = searchQuery.toLowerCase().trim();
  const tokens = q.split(/\s+/).filter(Boolean);

  const collections = typeof PROMPT_COLLECTIONS !== 'undefined' ? PROMPT_COLLECTIONS : fallbackCollections;
  const currentCollection = collections.find(c => c.id === activeCollection);

  let filtered = allPrompts.filter(p => {
    // Saved filter
    if (filterSavedOnly && !savedPromptIds.has(p.id)) {
      return false;
    }

    // Recent filter
    if (filterRecentOnly && !recentPromptIds.includes(p.id)) {
      return false;
    }

    // Category filter
    if (activeCategory !== 'All' && p.category.toLowerCase() !== activeCategory.toLowerCase()) {
      return false;
    }

    // Difficulty filter
    if (activeDifficulty !== 'All' && (p.difficulty || 'Intermediate').toLowerCase() !== activeDifficulty.toLowerCase()) {
      return false;
    }

    // Collection filter
    if (currentCollection && currentCollection.id !== 'all') {
      if (currentCollection.filterType === 'category' && p.category.toLowerCase() !== currentCollection.target.toLowerCase()) {
        return false;
      }
      if (currentCollection.filterType === 'subcategory' && p.subcategory.toLowerCase() !== currentCollection.target.toLowerCase()) {
        return false;
      }
      if (currentCollection.filterType === 'useCase' && (p.useCase || '').toLowerCase() !== currentCollection.target.toLowerCase()) {
        return false;
      }
      if (currentCollection.filterType === 'difficulty' && (p.difficulty || '').toLowerCase() !== currentCollection.target.toLowerCase()) {
        return false;
      }
    }

    // Multi-token search across Title, Description, Prompt Body, Subcategory, Tags
    if (tokens.length > 0) {
      const tagsStr = Array.isArray(p.tags) ? p.tags.join(' ') : (p.tags || '');
      const varsStr = Array.isArray(p.variables) ? p.variables.join(' ') : '';
      const promptBody = p.prompt || p.promptText || '';
      const searchable = `${p.title || ''} ${p.description || ''} ${promptBody} ${p.category || ''} ${p.subcategory || ''} ${tagsStr} ${varsStr}`.toLowerCase();

      const allMatch = tokens.every(token => searchable.includes(token));
      if (!allMatch) return false;
    }

    return true;
  });

  if (filterRecentOnly) {
    filtered.sort((a, b) => recentPromptIds.indexOf(a.id) - recentPromptIds.indexOf(b.id));
  }

  return filtered;
}

/**
 * Renders the prompt cards into the grid.
 */
function renderPrompts() {
  const container = document.getElementById('prompts-grid');
  const countDisplay = document.getElementById('prompt-results-count');
  const clearBtn = document.getElementById('btn-clear-filters');
  if (!container) return;

  const filtered = getFilteredPrompts();

  // Update counter & clear filters button
  if (countDisplay) {
    countDisplay.textContent = `Showing ${filtered.length} of ${allPrompts.length} prompts`;
  }
  if (clearBtn) {
    const hasActiveFilters = activeCategory !== 'All' || activeDifficulty !== 'All' || activeCollection !== 'all' || filterSavedOnly || filterRecentOnly || searchQuery !== '';
    clearBtn.classList.toggle('hidden', !hasActiveFilters);
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full dev-card text-center py-14">
        <span class="material-symbols-outlined text-4xl text-outline mb-2">search_off</span>
        <h4 class="font-bold text-lg text-on-surface">No matching prompts found</h4>
        <p class="text-sm text-on-surface-variant mt-1">Try switching categories, collections, or clear your search term.</p>
        <button class="btn-primary text-sm py-2 px-4 mt-4 inline-flex items-center gap-1.5" onclick="clearAllFilters()">
          <span class="material-symbols-outlined text-[16px]">refresh</span>
          <span>Reset All Filters</span>
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(p => {
    const isSaved = savedPromptIds.has(p.id);
    const badgeClass = getCategoryBadgeClass(p.category);
    const diffClass = `diff-${(p.difficulty || 'intermediate').toLowerCase()}`;
    const varsCount = Array.isArray(p.variables) ? p.variables.length : 0;
    const promptBody = p.prompt || p.promptText || '';
    const tagsList = Array.isArray(p.tags) ? p.tags : [];

    const tagsHtml = tagsList.slice(0, 3).map(t => {
      const clean = t.trim().replace(/^#/, '');
      return `<button class="note-tag-pill text-[11px] py-0.5 px-2" onclick="filterPromptByTag('${escapeHtml(clean)}')">#${escapeHtml(clean)}</button>`;
    }).join('');

    return `
      <div class="prompt-card">
        <div>
          <!-- Header: Category, Difficulty, Variables & Star -->
          <div class="flex items-center justify-between gap-2 mb-2">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="prompt-badge ${badgeClass}">${escapeHtml(p.category)}</span>
              <span class="diff-badge ${diffClass}">${escapeHtml(p.difficulty || 'Intermediate')}</span>
              ${varsCount > 0 ? `
                <span class="var-counter-chip" title="${varsCount} customizable variables">
                  <span class="material-symbols-outlined text-[12px]">tune</span>
                  <span>${varsCount} Vars</span>
                </span>
              ` : ''}
            </div>
            <button class="btn-favorite-star text-slate-400 hover:text-amber-500 transition-colors ${isSaved ? 'text-amber-500' : ''}" title="${isSaved ? 'Remove from Saved' : 'Save Prompt'}" onclick="togglePromptFavorite('${p.id}')">
              <span class="material-symbols-outlined text-[20px]" style="${isSaved ? 'font-variation-settings: \\"FILL\\" 1;' : ''}">star</span>
            </button>
          </div>

          <!-- Subcategory & Title -->
          <div class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">${escapeHtml(p.subcategory || p.category)}</div>
          <h3 class="font-bold text-base text-slate-900 leading-snug mb-1 hover:text-indigo-600 cursor-pointer transition-colors" onclick="openPromptDetails('${p.id}')">
            ${escapeHtml(p.title)}
          </h3>
          <p class="text-xs text-slate-600 line-clamp-2 mb-3">${escapeHtml(p.description)}</p>

          <!-- Prompt Preview Box -->
          <div class="prompt-preview-box cursor-pointer" onclick="openPromptDetails('${p.id}')" title="Click to view details & customize variables">
            ${escapeHtml(promptBody)}
          </div>

          <!-- Tags -->
          ${tagsList.length > 0 ? `<div class="flex flex-wrap gap-1 mt-3">${tagsHtml}</div>` : ''}
        </div>

        <!-- Footer Actions -->
        <div class="flex items-center gap-2 pt-3 border-t border-slate-200 mt-4">
          <button class="btn-copy-prompt flex-1" onclick="copyPromptDirect('${p.id}', this)" title="Copy prompt to clipboard">
            <span class="material-symbols-outlined text-[15px]">content_copy</span>
            <span class="copy-text">Copy Prompt</span>
          </button>
          <button class="btn-primary flex-1 text-xs py-2 inline-flex items-center justify-center gap-1.5" onclick="openPromptDetails('${p.id}')" title="Fill variables and execute in AI Chat">
            <span class="material-symbols-outlined text-[16px]">tune</span>
            <span>Customize / Use</span>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function getCategoryBadgeClass(category) {
  if (!category) return 'badge-general';
  const clean = category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return `badge-${clean}`;
}

/**
 * Copies raw prompt directly from card.
 */
window.copyPromptDirect = function(id, btnElement) {
  const prompt = allPrompts.find(p => p.id === id);
  if (!prompt) return;

  const textToCopy = prompt.prompt || prompt.promptText || '';
  copyToClipboard(textToCopy, `Prompt "${prompt.title}" copied to clipboard!`);
  trackRecentPrompt(id);

  if (btnElement) {
    const textSpan = btnElement.querySelector('.copy-text');
    const iconSpan = btnElement.querySelector('.material-symbols-outlined');
    const originalText = textSpan ? textSpan.textContent : 'Copy Prompt';

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
 * Toggles a prompt in Favorites / Saved.
 */
window.togglePromptFavorite = function(id) {
  if (savedPromptIds.has(id)) {
    savedPromptIds.delete(id);
    showToast('Prompt removed from saved', 'info');
  } else {
    savedPromptIds.add(id);
    showToast('Prompt saved to favorites!', 'success');
  }

  Storage.set('saved_prompts', Array.from(savedPromptIds));
  updateSavedCount();

  // Sync modal button if open
  if (currentModalPrompt && currentModalPrompt.id === id) {
    const modalFavBtn = document.getElementById('modal-btn-favorite');
    if (modalFavBtn) {
      const isSaved = savedPromptIds.has(id);
      modalFavBtn.classList.toggle('text-amber-500', isSaved);
      const icon = modalFavBtn.querySelector('.material-symbols-outlined');
      if (icon) {
        icon.style.fontVariationSettings = isSaved ? '"FILL" 1' : '""';
      }
    }
  }

  renderPrompts();
};

function updateSavedCount() {
  const countEl = document.getElementById('saved-count');
  if (countEl) {
    countEl.textContent = savedPromptIds.size;
  }
}

/**
 * Tracks a prompt in Recently Used history (MRU).
 */
function trackRecentPrompt(id) {
  recentPromptIds = recentPromptIds.filter(x => x !== id);
  recentPromptIds.unshift(id);
  if (recentPromptIds.length > 25) {
    recentPromptIds.pop();
  }
  Storage.set('recent_prompts', recentPromptIds);
}

/**
 * Initializes the Deep Prompt Details & Interactive Variable Modal.
 */
function initDetailsModal() {
  const modal = document.getElementById('prompt-details-modal');
  const closeBtn = document.getElementById('modal-btn-close');
  const favBtn = document.getElementById('modal-btn-favorite');
  const copyBtn = document.getElementById('modal-btn-copy');
  const runBtn = document.getElementById('modal-btn-run');
  const resetVarsBtn = document.getElementById('modal-btn-reset-vars');

  if (closeBtn) closeBtn.addEventListener('click', closePromptDetails);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closePromptDetails();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      closePromptDetails();
    }
  });

  if (favBtn) {
    favBtn.addEventListener('click', () => {
      if (currentModalPrompt) {
        togglePromptFavorite(currentModalPrompt.id);
      }
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      if (!currentModalPrompt) return;
      const substitutedText = getSubstitutedPromptText();
      copyToClipboard(substitutedText, `Customized prompt "${currentModalPrompt.title}" copied!`);
      trackRecentPrompt(currentModalPrompt.id);

      copyBtn.classList.add('copied');
      const textSpan = copyBtn.querySelector('.copy-text');
      const iconSpan = copyBtn.querySelector('.material-symbols-outlined');
      if (textSpan) textSpan.textContent = 'Copied!';
      if (iconSpan) iconSpan.textContent = 'check';

      setTimeout(() => {
        copyBtn.classList.remove('copied');
        if (textSpan) textSpan.textContent = 'Copy Prompt';
        if (iconSpan) iconSpan.textContent = 'content_copy';
      }, 2000);
    });
  }

  if (runBtn) {
    runBtn.addEventListener('click', () => {
      if (!currentModalPrompt) return;
      const substitutedText = getSubstitutedPromptText();
      localStorage.setItem('devpilot_prompt_to_run', substitutedText);
      trackRecentPrompt(currentModalPrompt.id);

      showToast('Redirecting to AI Chat...', 'info');
      setTimeout(() => {
        window.location.href = 'chat.html';
      }, 350);
    });
  }

  if (resetVarsBtn) {
    resetVarsBtn.addEventListener('click', () => {
      modalVariableValues = {};
      const inputs = document.querySelectorAll('.var-text-input');
      inputs.forEach(input => { input.value = ''; });
      updateSubstitutedPreview();
      showToast('Variables reset to original placeholders', 'info');
    });
  }
}

/**
 * Opens details modal and constructs variable input fields.
 */
window.openPromptDetails = function(id) {
  const prompt = allPrompts.find(p => p.id === id);
  if (!prompt) return;

  currentModalPrompt = prompt;
  modalVariableValues = {};
  trackRecentPrompt(id);

  // Populate header fields
  document.getElementById('modal-title').textContent = prompt.title;
  document.getElementById('modal-description').textContent = prompt.description;

  const catBadge = document.getElementById('modal-category-badge');
  if (catBadge) {
    catBadge.textContent = prompt.category;
    catBadge.className = `prompt-badge ${getCategoryBadgeClass(prompt.category)}`;
  }

  const diffBadge = document.getElementById('modal-difficulty-badge');
  if (diffBadge) {
    diffBadge.textContent = prompt.difficulty || 'Intermediate';
    diffBadge.className = `diff-badge diff-${(prompt.difficulty || 'intermediate').toLowerCase()}`;
  }

  const usecaseBadge = document.getElementById('modal-usecase-badge');
  if (usecaseBadge) {
    usecaseBadge.textContent = prompt.useCase || prompt.subcategory || 'General';
  }

  // Favorite button
  const favBtn = document.getElementById('modal-btn-favorite');
  if (favBtn) {
    const isSaved = savedPromptIds.has(prompt.id);
    favBtn.classList.toggle('text-amber-500', isSaved);
    const icon = favBtn.querySelector('.material-symbols-outlined');
    if (icon) icon.style.fontVariationSettings = isSaved ? '"FILL" 1' : '""';
  }

  // Expected output & tips
  document.getElementById('modal-expected-output').textContent = prompt.expectedOutput || 'Structured technical analysis, code diffs, and verification steps.';
  document.getElementById('modal-tips').textContent = prompt.tips || 'Provide specific technical constraints in your inputs for tailored output.';

  // Build Interactive Variables Section
  buildVariablesSection(prompt);

  // Render initial live preview
  updateSubstitutedPreview();

  // Render Recommended Related Prompts
  renderRelatedPrompts(prompt);

  // Open modal
  const modal = document.getElementById('prompt-details-modal');
  if (modal) modal.classList.add('open');
};

function closePromptDetails() {
  const modal = document.getElementById('prompt-details-modal');
  if (modal) modal.classList.remove('open');
  currentModalPrompt = null;
  modalVariableValues = {};
}

/**
 * Builds dynamic input form for all {{VARIABLES}} in the prompt.
 */
function buildVariablesSection(prompt) {
  const container = document.getElementById('modal-variables-inputs');
  const countLabel = document.getElementById('modal-variables-count');
  const section = document.getElementById('modal-variables-section');
  if (!container) return;

  const rawText = prompt.prompt || prompt.promptText || '';
  const detectedVars = Array.from(new Set(rawText.match(/\{\{[A-Z0-9_]+\}\}/g) || []));

  if (detectedVars.length === 0) {
    if (section) section.classList.add('hidden');
    return;
  }

  if (section) section.classList.remove('hidden');
  if (countLabel) countLabel.textContent = `(${detectedVars.length} variables)`;

  container.innerHTML = detectedVars.map(v => {
    const cleanLabel = v.replace(/[{}]/g, '');
    const isCodeOrBlock = cleanLabel.includes('CODE') || cleanLabel.includes('LOG') || cleanLabel.includes('SCHEMA') || cleanLabel.includes('STACK') || cleanLabel.includes('DIFF') || cleanLabel.includes('PROMPT') || cleanLabel.includes('TEXT');

    return `
      <div class="var-input-group">
        <label class="var-input-label" for="input-var-${cleanLabel}">${escapeHtml(v)}</label>
        ${isCodeOrBlock ? `
          <textarea id="input-var-${cleanLabel}" class="var-text-input" placeholder="Paste ${cleanLabel.toLowerCase()} here..." data-var="${escapeHtml(v)}"></textarea>
        ` : `
          <input type="text" id="input-var-${cleanLabel}" class="var-text-input" placeholder="Enter ${cleanLabel.toLowerCase()}..." data-var="${escapeHtml(v)}"/>
        `}
      </div>
    `;
  }).join('');

  // Attach live input listeners
  const inputs = container.querySelectorAll('.var-text-input');
  inputs.forEach(input => {
    input.addEventListener('input', (e) => {
      const v = e.target.getAttribute('data-var');
      modalVariableValues[v] = e.target.value;
      updateSubstitutedPreview();
    });
  });
}

/**
 * Computes live substituted prompt string.
 */
function getSubstitutedPromptText() {
  if (!currentModalPrompt) return '';
  let text = currentModalPrompt.prompt || currentModalPrompt.promptText || '';

  Object.entries(modalVariableValues).forEach(([v, customVal]) => {
    if (customVal && customVal.trim().length > 0) {
      text = text.split(v).join(customVal);
    }
  });

  return text;
}

/**
 * Updates the preview box in the modal with substituted text and variable highlight spans.
 */
function updateSubstitutedPreview() {
  const previewBox = document.getElementById('modal-prompt-text');
  if (!previewBox || !currentModalPrompt) return;

  const rawText = currentModalPrompt.prompt || currentModalPrompt.promptText || '';
  let substituted = rawText;

  // Substitute values
  Object.entries(modalVariableValues).forEach(([v, customVal]) => {
    if (customVal && customVal.trim().length > 0) {
      substituted = substituted.split(v).join(customVal);
    }
  });

  // Escape HTML
  let escaped = escapeHtml(substituted);

  // Highlight any remaining unsubstituted {{VAR}} placeholders
  escaped = escaped.replace(/\{\{[A-Z0-9_]+\}\}/g, (match) => {
    return `<span class="highlight-var">${match}</span>`;
  });

  previewBox.innerHTML = escaped;
}

/**
 * Renders recommended related prompts inside the modal.
 */
function renderRelatedPrompts(currentPrompt) {
  const container = document.getElementById('modal-related-prompts');
  if (!container) return;

  const related = typeof getRelatedPrompts === 'function'
    ? getRelatedPrompts(currentPrompt, 4)
    : allPrompts.filter(p => p.id !== currentPrompt.id && p.category === currentPrompt.category).slice(0, 4);

  if (related.length === 0) {
    container.innerHTML = `<p class="text-xs text-slate-400">No related prompts found.</p>`;
    return;
  }

  container.innerHTML = related.map(rel => `
    <div class="related-prompt-card" onclick="openPromptDetails('${rel.id}')">
      <div class="flex items-center justify-between mb-1">
        <span class="text-[10px] font-bold text-slate-400 uppercase">${escapeHtml(rel.category)}</span>
        <span class="text-[10px] text-indigo-600 font-semibold">${escapeHtml(rel.subcategory || '')}</span>
      </div>
      <div class="text-xs font-bold text-slate-800 line-clamp-1">${escapeHtml(rel.title)}</div>
    </div>
  `).join('');
}

function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
