/**
 * DevPilot-AI - Developer Notes Module
 * Full Roadmap Knowledge Base Controller with Multi-Category Filter,
 * Interview Tagging, Multi-Field Search, Tag System & Persistence.
 */

// Fallback seed notes if notesData.js is loaded asynchronously
const fallbackNotes = typeof DEFAULT_NOTES !== 'undefined' ? DEFAULT_NOTES : [];
const fallbackCategories = typeof NOTE_CATEGORIES !== 'undefined' ? NOTE_CATEGORIES : [];

// Initialize notes with intelligent migration and seed merging
let notes = initializeNotes();
let currentCategory = 'All';
let filterInterviewOnly = false;
let searchQuery = '';
let editingNoteId = null;

document.addEventListener('DOMContentLoaded', () => {
  initCategoryUI();
  initNoteFilters();
  initNoteModal();
  initNoteSearch();
  renderNotes();
});

/**
 * Loads notes from storage, migrates legacy schemas, and merges starter knowledge base.
 */
function initializeNotes() {
  const rawNotes = Storage.get('dev_notes', null);
  const seedList = typeof DEFAULT_NOTES !== 'undefined' ? DEFAULT_NOTES : [];

  if (!rawNotes || !Array.isArray(rawNotes) || rawNotes.length === 0) {
    Storage.set('dev_notes', seedList);
    return [...seedList];
  }

  // Migrate legacy notes schema
  const existingIds = new Set();
  const migrated = rawNotes.map(n => {
    existingIds.add(n.id);
    let cat = n.category;
    if (!cat && n.tag) {
      // Map legacy tag names to standardized category names
      switch (n.tag.toUpperCase()) {
        case 'DSA': cat = 'DSA & Problem Solving'; break;
        case 'WEBDEV': cat = 'Web Development'; break;
        case 'CONCEPTS': cat = 'System Design'; break;
        default: cat = 'General Concepts'; break;
      }
    }

    // Ensure tags is an array
    let tags = n.tags;
    if (!tags) {
      tags = n.tag ? [n.tag.toLowerCase()] : [];
    } else if (typeof tags === 'string') {
      tags = tags.split(',').map(t => t.trim().toLowerCase()).filter(Boolean);
    }

    return {
      ...n,
      category: cat || 'General Concepts',
      subcategory: n.subcategory || (n.tag === 'DSA' ? 'Sliding Window' : 'General'),
      difficulty: n.difficulty || '',
      isInterviewImportant: Boolean(n.isInterviewImportant),
      tags: tags,
      date: n.date || new Date().toISOString().split('T')[0]
    };
  });

  // Merge in any missing starter knowledge base notes so user gets full 27-category coverage
  seedList.forEach(seed => {
    if (!existingIds.has(seed.id)) {
      migrated.push(seed);
    }
  });

  Storage.set('dev_notes', migrated);
  return migrated;
}

/**
 * Initializes category UI elements: horizontal chips, dropdown jump selector, and modal categories.
 */
function initCategoryUI() {
  const scrollContainer = document.getElementById('category-scroll-tabs');
  const jumpDropdown = document.getElementById('category-dropdown-select');
  const modalCategorySelect = document.getElementById('modal-note-category');
  const categories = typeof NOTE_CATEGORIES !== 'undefined' ? NOTE_CATEGORIES : fallbackCategories;

  if (scrollContainer) {
    // Generate category filter pills
    const pillsHtml = [
      `<button class="filter-tab note-filter-tab active" data-category="All">All Notes</button>`
    ];

    categories.forEach(cat => {
      pillsHtml.push(`
        <button class="filter-tab note-filter-tab" data-category="${escapeHtml(cat.name)}" title="${escapeHtml(cat.name)}">
          ${escapeHtml(cat.shortName)}
        </button>
      `);
    });

    scrollContainer.innerHTML = pillsHtml.join('');
  }

  if (jumpDropdown) {
    const optionsHtml = [
      `<option value="All">All Categories (${categories.length})</option>`
    ];
    categories.forEach(cat => {
      optionsHtml.push(`<option value="${escapeHtml(cat.name)}">${escapeHtml(cat.name)}</option>`);
    });
    jumpDropdown.innerHTML = optionsHtml.join('');
    jumpDropdown.addEventListener('change', (e) => {
      selectCategory(e.target.value);
    });
  }

  if (modalCategorySelect) {
    const modalOptions = categories.map(cat => 
      `<option value="${escapeHtml(cat.name)}">${escapeHtml(cat.name)}</option>`
    );
    modalCategorySelect.innerHTML = modalOptions.join('');
    modalCategorySelect.addEventListener('change', () => {
      updateModalSubcategories(modalCategorySelect.value);
    });
  }
}

/**
 * Updates the datalist in the modal based on selected category.
 */
function updateModalSubcategories(categoryName) {
  const datalist = document.getElementById('modal-subcategory-datalist');
  if (!datalist) return;

  const subcats = typeof getSubcategoriesForCategory === 'function' 
    ? getSubcategoriesForCategory(categoryName)
    : ['General'];

  datalist.innerHTML = subcats.map(sub => `<option value="${escapeHtml(sub)}"></option>`).join('');
}

/**
 * Filters notes based on category, interview flag, and multi-field search query.
 */
function getFilteredNotes() {
  const q = searchQuery.toLowerCase().trim();

  return notes.filter(n => {
    // Category filtering
    if (currentCategory !== 'All') {
      const noteCat = (n.category || n.tag || '').toLowerCase();
      const targetCat = currentCategory.toLowerCase();
      
      // Match full name or short name
      let matchesCategory = noteCat === targetCat;
      if (!matchesCategory && typeof getCategoryByName === 'function') {
        const catObj = getCategoryByName(currentCategory);
        if (catObj) {
          matchesCategory = (noteCat === catObj.name.toLowerCase() || noteCat === catObj.shortName.toLowerCase());
        }
      }
      if (!matchesCategory) return false;
    }

    // Interview Important filter
    if (filterInterviewOnly && !n.isInterviewImportant) {
      return false;
    }

    // Multi-field search
    if (q) {
      const terms = q.split(/\s+/).filter(Boolean);
      const tagsStr = Array.isArray(n.tags) ? n.tags.join(' ') : (n.tags || '');
      const searchable = `${n.title || ''} ${n.content || ''} ${n.category || n.tag || ''} ${n.subcategory || ''} ${tagsStr}`.toLowerCase();

      const matchesTerms = terms.every(term => searchable.includes(term));
      if (!matchesTerms) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Renders notes in the responsive grid.
 */
function renderNotes() {
  const container = document.getElementById('notes-grid');
  if (!container) return;

  const filtered = getFilteredNotes();

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full dev-card text-center py-12">
        <span class="material-symbols-outlined text-4xl text-outline mb-2">search_off</span>
        <h4 class="font-bold text-lg text-on-surface">No notes found</h4>
        <p class="text-sm text-on-surface-variant mt-1">Try switching categories, clearing filters, or create a new note.</p>
        <button class="btn-primary text-sm py-2 px-4 mt-4 inline-flex items-center gap-1" onclick="openCreateModal()">
          <span class="material-symbols-outlined text-[18px]">add</span>
          <span>Create Note</span>
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(note => {
    const catClass = typeof getCategoryColorClass === 'function' 
      ? getCategoryColorClass(note.category) 
      : 'tag-general';
    const shortCat = typeof getCategoryShortName === 'function'
      ? getCategoryShortName(note.category)
      : (note.category || 'Note');

    // Clean preview snippet
    const preview = cleanTextPreview(note.content, 140);

    // Tags rendering
    const tagsList = Array.isArray(note.tags) ? note.tags : (note.tags ? note.tags.split(',') : []);
    const tagsHtml = tagsList.length > 0 ? `
      <div class="note-tags-container">
        ${tagsList.slice(0, 4).map(t => {
          const cleanTag = t.trim().replace(/^#/, '');
          return `<button class="note-tag-pill" title="Filter by #${escapeHtml(cleanTag)}" onclick="filterByTag('${escapeHtml(cleanTag)}')">#${escapeHtml(cleanTag)}</button>`;
        }).join('')}
      </div>
    ` : '';

    // Interview Important badge
    const interviewBadge = note.isInterviewImportant ? `
      <span class="badge-interview" title="Frequently asked in technical interviews">
        <span class="material-symbols-outlined text-[13px] text-amber-500">star</span>
        Interview
      </span>
    ` : '';

    // Difficulty badge
    const diffBadge = note.difficulty ? `
      <span class="difficulty-badge difficulty-${note.difficulty.toLowerCase()}">${escapeHtml(note.difficulty)}</span>
    ` : '';

    return `
      <div class="note-card">
        <div>
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-1.5 flex-wrap">
              <span class="note-tag ${catClass}">
                <span class="material-symbols-outlined text-[13px]">label</span>
                ${escapeHtml(shortCat)}
              </span>
              ${interviewBadge}
            </div>
            <div class="flex items-center gap-1">
              <button class="p-1.5 text-on-surface-variant hover:text-primary rounded hover:bg-slate-100 transition-colors" title="Edit Note" onclick="editNote('${note.id}')">
                <span class="material-symbols-outlined text-[18px]">edit</span>
              </button>
              <button class="p-1.5 text-on-surface-variant hover:text-error rounded hover:bg-red-50 transition-colors" title="Delete Note" onclick="deleteNote('${note.id}')">
                <span class="material-symbols-outlined text-[18px]">delete</span>
              </button>
            </div>
          </div>

          <div class="note-meta-row">
            <span class="font-medium text-slate-500">${escapeHtml(note.category || 'General')}</span>
            ${note.subcategory ? `<span>•</span> <span class="text-slate-600 font-semibold">${escapeHtml(note.subcategory)}</span>` : ''}
            ${diffBadge ? `<span>•</span> ${diffBadge}` : ''}
          </div>

          <h3 class="font-bold text-base text-on-surface mb-2 leading-snug hover:text-indigo-600 transition-colors cursor-pointer" onclick="editNote('${note.id}')">
            ${escapeHtml(note.title)}
          </h3>
          <p class="text-sm text-on-surface-variant leading-relaxed line-clamp-3">${escapeHtml(preview)}</p>

          ${tagsHtml}
        </div>

        <div class="pt-4 mt-4 border-t border-outline-variant flex items-center justify-between text-xs text-on-surface-variant">
          <span class="flex items-center gap-1">
            <span class="material-symbols-outlined text-[14px]">calendar_today</span>
            ${note.date || 'Recent'}
          </span>
          <button class="text-primary hover:underline font-semibold flex items-center gap-0.5" onclick="editNote('${note.id}')">
            View / Edit
          </button>
        </div>
      </div>
    `;
  }).join('');
}

/**
 * Generates a clean text preview from markdown/technical content.
 */
function cleanTextPreview(content, maxLength = 140) {
  if (!content) return '';
  const clean = content
    .replace(/^#+\s+/gm, '') // remove markdown headings
    .replace(/```[\s\S]*?```/g, '[Code Snippet]') // summarize code blocks
    .replace(/`([^`]+)`/g, '$1') // inline code
    .replace(/\*\*([^*]+)\*\*/g, '$1') // bold
    .replace(/\*([^*]+)\*/g, '$1') // italic
    .replace(/\n+/g, ' ') // single line
    .trim();

  return clean.length > maxLength ? clean.substring(0, maxLength) + '...' : clean;
}

/**
 * Initializes filter tabs, dropdown jump selector, and interview button.
 */
function initNoteFilters() {
  const scrollContainer = document.getElementById('category-scroll-tabs');
  if (scrollContainer) {
    scrollContainer.addEventListener('click', (e) => {
      const tab = e.target.closest('.note-filter-tab');
      if (!tab) return;

      const cat = tab.getAttribute('data-category') || 'All';
      selectCategory(cat);
    });
  }

  const interviewBtn = document.getElementById('btn-interview-filter');
  if (interviewBtn) {
    interviewBtn.addEventListener('click', () => {
      filterInterviewOnly = !filterInterviewOnly;
      interviewBtn.classList.toggle('active', filterInterviewOnly);
      renderNotes();
    });
  }
}

/**
 * Selects a category, syncs tabs, dropdown, and re-renders.
 */
function selectCategory(catName) {
  currentCategory = catName;

  // Sync scroll tabs
  const tabs = document.querySelectorAll('.note-filter-tab');
  tabs.forEach(t => {
    const tabCat = t.getAttribute('data-category');
    if (tabCat === catName) {
      t.classList.add('active');
      t.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' });
    } else {
      t.classList.remove('active');
    }
  });

  // Sync dropdown selector
  const jumpDropdown = document.getElementById('category-dropdown-select');
  if (jumpDropdown && jumpDropdown.value !== catName) {
    jumpDropdown.value = catName;
  }

  renderNotes();
}

/**
 * Multi-field fast search.
 */
function initNoteSearch() {
  const searchInput = document.getElementById('notes-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderNotes();
    });
  }
}

/**
 * Filters by clicked tag.
 */
window.filterByTag = function(tag) {
  const searchInput = document.getElementById('notes-search-input');
  if (searchInput) {
    searchInput.value = tag;
    searchQuery = tag;
    renderNotes();
    searchInput.focus();
    window.scrollTo({ top: 120, behavior: 'smooth' });
  }
};

/**
 * Modal management (Create / Edit / View).
 */
function initNoteModal() {
  const modal = document.getElementById('note-modal');
  const createBtn = document.getElementById('btn-create-note');
  const closeBtn = document.getElementById('btn-close-note-modal');
  const cancelBtn = document.getElementById('btn-cancel-note-modal');
  const saveBtn = document.getElementById('btn-save-note');

  if (createBtn) {
    createBtn.addEventListener('click', openCreateModal);
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => modal.classList.remove('open'));
  }

  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => modal.classList.remove('open'));
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('open');
    });
  }

  if (saveBtn) {
    saveBtn.addEventListener('click', saveNoteFromModal);
  }
}

/**
 * Opens Create Note modal with fresh defaults.
 */
window.openCreateModal = function() {
  editingNoteId = null;
  document.getElementById('modal-title-text').textContent = 'Create New Note';
  document.getElementById('modal-note-title').value = '';
  document.getElementById('modal-note-content').value = '';
  document.getElementById('modal-note-tags').value = '';
  document.getElementById('modal-note-difficulty').value = '';
  document.getElementById('modal-note-interview').checked = false;
  document.getElementById('modal-note-date').value = new Date().toISOString().split('T')[0];

  const defaultCat = currentCategory !== 'All' ? currentCategory : 'DSA & Problem Solving';
  const catSelect = document.getElementById('modal-note-category');
  if (catSelect) {
    catSelect.value = defaultCat;
    updateModalSubcategories(defaultCat);
  }
  document.getElementById('modal-note-subcategory').value = '';

  const modal = document.getElementById('note-modal');
  if (modal) modal.classList.add('open');
};

/**
 * Saves note (Create or Update).
 */
function saveNoteFromModal() {
  const title = document.getElementById('modal-note-title').value.trim();
  const category = document.getElementById('modal-note-category').value;
  const subcategory = document.getElementById('modal-note-subcategory').value.trim() || 'General';
  const difficulty = document.getElementById('modal-note-difficulty').value;
  const isInterviewImportant = document.getElementById('modal-note-interview').checked;
  const rawTags = document.getElementById('modal-note-tags').value;
  const date = document.getElementById('modal-note-date').value || new Date().toISOString().split('T')[0];
  const content = document.getElementById('modal-note-content').value.trim();

  if (!title) {
    showToast('Please enter a note title', 'error');
    document.getElementById('modal-note-title').focus();
    return;
  }

  // Parse tags into array
  const tags = rawTags
    .split(',')
    .map(t => t.trim().replace(/^#/, '').toLowerCase())
    .filter(Boolean);

  if (editingNoteId) {
    // Edit existing note
    const idx = notes.findIndex(n => n.id === editingNoteId);
    if (idx !== -1) {
      notes[idx] = {
        ...notes[idx],
        title,
        category,
        subcategory,
        difficulty,
        isInterviewImportant,
        tags,
        date,
        content,
        updatedAt: new Date().toISOString()
      };
      showToast('Note updated successfully!', 'success');
    }
  } else {
    // Create new note
    const newNote = {
      id: 'n_' + Date.now(),
      title,
      category,
      subcategory,
      difficulty,
      isInterviewImportant,
      tags,
      date,
      content,
      createdAt: new Date().toISOString()
    };
    notes.unshift(newNote);
    showToast('New note created!', 'success');
  }

  Storage.set('dev_notes', notes);
  const modal = document.getElementById('note-modal');
  if (modal) modal.classList.remove('open');
  renderNotes();
}

/**
 * Opens note in modal for viewing and editing.
 */
window.editNote = function(id) {
  const note = notes.find(n => n.id === id);
  if (!note) return;

  editingNoteId = id;
  document.getElementById('modal-title-text').textContent = 'Edit / View Note';
  document.getElementById('modal-note-title').value = note.title || '';
  document.getElementById('modal-note-content').value = note.content || '';
  
  const catSelect = document.getElementById('modal-note-category');
  if (catSelect) {
    catSelect.value = note.category || 'DSA & Problem Solving';
    updateModalSubcategories(catSelect.value);
  }

  document.getElementById('modal-note-subcategory').value = note.subcategory || '';
  document.getElementById('modal-note-difficulty').value = note.difficulty || '';
  document.getElementById('modal-note-interview').checked = Boolean(note.isInterviewImportant);
  document.getElementById('modal-note-tags').value = Array.isArray(note.tags) ? note.tags.join(', ') : (note.tags || '');
  document.getElementById('modal-note-date').value = note.date || new Date().toISOString().split('T')[0];

  const modal = document.getElementById('note-modal');
  if (modal) modal.classList.add('open');
};

/**
 * Deletes a note with confirmation.
 */
window.deleteNote = function(id) {
  if (confirm('Are you sure you want to delete this note?')) {
    notes = notes.filter(n => n.id !== id);
    Storage.set('dev_notes', notes);
    renderNotes();
    showToast('Note deleted', 'info');
  }
};

/**
 * HTML Escaping utility.
 */
function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
