/**
 * DevPilot-AI - Developer Notes Module
 */

const defaultNotes = [
  {
    id: 'n1',
    title: 'Sliding Window & Two Pointer Patterns',
    tag: 'DSA',
    content: 'Sliding Window is ideal for contiguous sub-arrays or sub-strings. Remember: fixed-size vs dynamic-size window expansion and shrink conditions. Useful for LeetCode #3, #76, and #209.',
    date: '2026-08-25'
  },
  {
    id: 'n2',
    title: 'React Concurrent Mode & Transitions',
    tag: 'WebDev',
    content: 'useTransition allows marking non-urgent state updates as transitions. Keeps UI responsive during heavy re-renders. Avoid wrapping controlled input values directly in startTransition.',
    date: '2026-08-22'
  },
  {
    id: 'n3',
    title: 'CAP Theorem & Distributed Consensus',
    tag: 'Concepts',
    content: 'In distributed data stores, you can only pick two of Consistency, Availability, and Partition Tolerance. In practice, P is inevitable due to network failures, so the real choice is CP vs AP.',
    date: '2026-08-19'
  },
  {
    id: 'n4',
    title: 'JavaScript Event Loop & Microtasks',
    tag: 'WebDev',
    content: 'Microtasks (Promises, queueMicrotask, MutationObserver) always run immediately after the current execution context and before macrotasks (setTimeout, setInterval, I/O).',
    date: '2026-08-15'
  },
  {
    id: 'n5',
    title: 'Binary Tree Traversal: Iterative Morris Traversal',
    tag: 'DSA',
    content: 'Morris Traversal allows Inorder and Preorder tree traversals with O(1) space complexity by temporarily modifying node links to form threaded binary trees.',
    date: '2026-08-10'
  },
  {
    id: 'n6',
    title: 'Database Indexing: B-Tree vs LSM Trees',
    tag: 'Concepts',
    content: 'B-Trees are optimized for fast random reads in relational databases like PostgreSQL. LSM Trees (Log-Structured Merge-trees) excel at high-throughput write workloads in Cassandra and RocksDB.',
    date: '2026-08-05'
  }
];

let notes = Storage.get('dev_notes', defaultNotes);
let currentFilter = 'All';
let editingNoteId = null;

document.addEventListener('DOMContentLoaded', () => {
  renderNotes();
  initNoteFilters();
  initNoteModal();
  initNoteSearch();
});

function renderNotes() {
  const container = document.getElementById('notes-grid');
  if (!container) return;

  const filtered = notes.filter(n => {
    if (currentFilter === 'All') return true;
    return n.tag.toLowerCase() === currentFilter.toLowerCase();
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full dev-card text-center py-12">
        <span class="material-symbols-outlined text-4xl text-outline mb-2">note_stack</span>
        <h4 class="font-bold text-lg text-on-surface">No notes found</h4>
        <p class="text-sm text-on-surface-variant mt-1">Try switching filters or create a new note.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(note => {
    const tagClass = getTagClass(note.tag);
    return `
      <div class="note-card">
        <div>
          <div class="flex items-center justify-between mb-3">
            <span class="note-tag ${tagClass}">
              <span class="material-symbols-outlined text-[13px]">label</span>
              ${escapeHtml(note.tag)}
            </span>
            <div class="flex items-center gap-1">
              <button class="p-1.5 text-on-surface-variant hover:text-primary rounded hover:bg-slate-100 transition-colors" title="Edit Note" onclick="editNote('${note.id}')">
                <span class="material-symbols-outlined text-[18px]">edit</span>
              </button>
              <button class="p-1.5 text-on-surface-variant hover:text-error rounded hover:bg-red-50 transition-colors" title="Delete Note" onclick="deleteNote('${note.id}')">
                <span class="material-symbols-outlined text-[18px]">delete</span>
              </button>
            </div>
          </div>
          <h3 class="font-bold text-base text-on-surface mb-2 leading-snug">${escapeHtml(note.title)}</h3>
          <p class="text-sm text-on-surface-variant leading-relaxed line-clamp-4">${escapeHtml(note.content)}</p>
        </div>
        <div class="pt-4 mt-4 border-t border-outline-variant flex items-center justify-between text-xs text-on-surface-variant">
          <span class="flex items-center gap-1">
            <span class="material-symbols-outlined text-[14px]">calendar_today</span>
            ${note.date}
          </span>
          <button class="text-primary hover:underline font-semibold flex items-center gap-0.5" onclick="editNote('${note.id}')">
            View / Edit
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function getTagClass(tag) {
  switch (tag.toLowerCase()) {
    case 'dsa': return 'tag-dsa';
    case 'webdev': return 'tag-webdev';
    case 'concepts': return 'tag-concepts';
    default: return 'tag-general';
  }
}

function initNoteFilters() {
  const tabs = document.querySelectorAll('.note-filter-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentFilter = tab.getAttribute('data-tag') || 'All';
      renderNotes();
    });
  });
}

function initNoteSearch() {
  const searchInput = document.getElementById('notes-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      const matched = notes.filter(n => 
        (currentFilter === 'All' || n.tag.toLowerCase() === currentFilter.toLowerCase()) &&
        (n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q) || n.tag.toLowerCase().includes(q))
      );
      renderFilteredNotes(matched);
    });
  }
}

function renderFilteredNotes(filtered) {
  const container = document.getElementById('notes-grid');
  if (!container) return;

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full dev-card text-center py-12">
        <span class="material-symbols-outlined text-4xl text-outline mb-2">search_off</span>
        <h4 class="font-bold text-lg text-on-surface">No matching notes</h4>
        <p class="text-sm text-on-surface-variant mt-1">Try another search term.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(note => `
    <div class="note-card">
      <div>
        <div class="flex items-center justify-between mb-3">
          <span class="note-tag ${getTagClass(note.tag)}">
            <span class="material-symbols-outlined text-[13px]">label</span>
            ${escapeHtml(note.tag)}
          </span>
          <div class="flex items-center gap-1">
            <button class="p-1.5 text-on-surface-variant hover:text-primary rounded hover:bg-slate-100 transition-colors" onclick="editNote('${note.id}')">
              <span class="material-symbols-outlined text-[18px]">edit</span>
            </button>
            <button class="p-1.5 text-on-surface-variant hover:text-error rounded hover:bg-red-50 transition-colors" onclick="deleteNote('${note.id}')">
              <span class="material-symbols-outlined text-[18px]">delete</span>
            </button>
          </div>
        </div>
        <h3 class="font-bold text-base text-on-surface mb-2 leading-snug">${escapeHtml(note.title)}</h3>
        <p class="text-sm text-on-surface-variant leading-relaxed line-clamp-4">${escapeHtml(note.content)}</p>
      </div>
      <div class="pt-4 mt-4 border-t border-outline-variant flex items-center justify-between text-xs text-on-surface-variant">
        <span class="flex items-center gap-1">
          <span class="material-symbols-outlined text-[14px]">calendar_today</span>
          ${note.date}
        </span>
        <button class="text-primary hover:underline font-semibold flex items-center gap-0.5" onclick="editNote('${note.id}')">
          View / Edit
        </button>
      </div>
    </div>
  `).join('');
}

// Modal handling
function initNoteModal() {
  const modal = document.getElementById('note-modal');
  const createBtn = document.getElementById('btn-create-note');
  const closeBtn = document.getElementById('btn-close-note-modal');
  const saveBtn = document.getElementById('btn-save-note');

  if (createBtn) {
    createBtn.addEventListener('click', () => {
      editingNoteId = null;
      document.getElementById('modal-note-title').value = '';
      document.getElementById('modal-note-content').value = '';
      document.getElementById('modal-note-tag').value = 'DSA';
      document.getElementById('modal-title-text').textContent = 'Create New Note';
      modal.classList.add('open');
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('open');
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('open');
    });
  }

  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      const title = document.getElementById('modal-note-title').value.trim();
      const content = document.getElementById('modal-note-content').value.trim();
      const tag = document.getElementById('modal-note-tag').value;

      if (!title) {
        showToast('Please enter a note title', 'error');
        return;
      }

      if (editingNoteId) {
        // Edit existing
        const idx = notes.findIndex(n => n.id === editingNoteId);
        if (idx !== -1) {
          notes[idx].title = title;
          notes[idx].content = content;
          notes[idx].tag = tag;
          showToast('Note updated successfully!', 'success');
        }
      } else {
        // Create new
        const newNote = {
          id: 'n_' + Date.now(),
          title,
          content,
          tag,
          date: new Date().toISOString().split('T')[0]
        };
        notes.unshift(newNote);
        showToast('New note created!', 'success');
      }

      Storage.set('dev_notes', notes);
      modal.classList.remove('open');
      renderNotes();
    });
  }
}

window.editNote = function(id) {
  const note = notes.find(n => n.id === id);
  if (!note) return;

  editingNoteId = id;
  document.getElementById('modal-note-title').value = note.title;
  document.getElementById('modal-note-content').value = note.content;
  document.getElementById('modal-note-tag').value = note.tag;
  document.getElementById('modal-title-text').textContent = 'Edit Note';

  const modal = document.getElementById('note-modal');
  if (modal) modal.classList.add('open');
};

window.deleteNote = function(id) {
  if (confirm('Are you sure you want to delete this note?')) {
    notes = notes.filter(n => n.id !== id);
    Storage.set('dev_notes', notes);
    renderNotes();
    showToast('Note deleted', 'info');
  }
};

function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
