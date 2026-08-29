/**
 * DevPilot-AI - Dashboard Module Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initDashboardTasks();
  initDashboardHeatmap();
  initCommandPalette();
  initQuickTimer();
});

// Dashboard Task Checking
function initDashboardTasks() {
  const taskList = document.getElementById('task-list');
  if (!taskList) return;

  const checkboxes = taskList.querySelectorAll('.task-checkbox');
  const completedCountEl = document.getElementById('tasks-completed-count');
  const totalCountEl = document.getElementById('tasks-total-count');

  if (totalCountEl) totalCountEl.textContent = checkboxes.length;

  function updateTasks() {
    let completed = 0;
    checkboxes.forEach(cb => {
      const label = cb.closest('label');
      const text = label ? label.querySelector('.task-text') : null;
      if (cb.checked) {
        completed++;
        if (text) {
          text.classList.add('line-through', 'text-on-surface-variant');
          text.classList.remove('text-on-surface');
        }
      } else {
        if (text) {
          text.classList.remove('line-through', 'text-on-surface-variant');
          text.classList.add('text-on-surface');
        }
      }
    });
    if (completedCountEl) completedCountEl.textContent = completed;
    
    const state = Array.from(checkboxes).map(cb => cb.checked);
    localStorage.setItem('taskState', JSON.stringify(state));
  }

  const savedState = JSON.parse(localStorage.getItem('taskState'));
  if (savedState && savedState.length === checkboxes.length) {
    checkboxes.forEach((cb, i) => cb.checked = savedState[i]);
  }

  checkboxes.forEach(cb => {
    cb.addEventListener('change', updateTasks);
  });

  updateTasks();
}

// Heatmap generator
function initDashboardHeatmap() {
  const heatmapContainer = document.getElementById('heatmap-container') || document.getElementById('github-heatmap');
  if (!heatmapContainer) return;

  heatmapContainer.innerHTML = '';
  const intensities = ['bg-surface-container-high', 'bg-primary/20', 'bg-primary/50', 'bg-primary/80', 'bg-primary'];

  for (let i = 0; i < 28; i++) {
    const col = document.createElement('div');
    col.className = 'flex flex-col gap-1';
    for (let j = 0; j < 7; j++) {
      const rand = Math.random();
      let cls = intensities[0];
      if (rand > 0.9) cls = intensities[4];
      else if (rand > 0.7) cls = intensities[3];
      else if (rand > 0.5) cls = intensities[2];
      else if (rand > 0.3) cls = intensities[1];

      const cell = document.createElement('div');
      cell.className = `w-3.5 h-3.5 rounded-sm ${cls} transition-transform hover:scale-125 cursor-pointer`;
      cell.title = `Contributions on day ${i * 7 + j + 1}`;
      col.appendChild(cell);
    }
    heatmapContainer.appendChild(col);
  }
}

// Command Palette Triggering
function initCommandPalette() {
  const cmdPalette = document.getElementById('command-palette');
  const cmdInput = document.getElementById('command-input');
  const searchTrigger = document.getElementById('search-trigger');

  function openPalette() {
    if (cmdPalette) {
      cmdPalette.classList.remove('hidden');
      setTimeout(() => cmdInput && cmdInput.focus(), 50);
    }
  }

  function closePalette() {
    if (cmdPalette) cmdPalette.classList.add('hidden');
  }

  if (searchTrigger) searchTrigger.addEventListener('click', openPalette);

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      openPalette();
    }
    if (e.key === 'Escape' && cmdPalette && !cmdPalette.classList.contains('hidden')) {
      closePalette();
    }
  });

  if (cmdPalette) {
    cmdPalette.addEventListener('click', (e) => {
      if (e.target === cmdPalette) closePalette();
    });
  }
}

// Quick Focus Session in Dashboard
function initQuickTimer() {
  const focusBtn = document.getElementById('start-focus-btn');
  const focusBtnText = document.getElementById('focus-btn-text');
  if (!focusBtn) return;

  let isFocusing = false;
  let focusTimer;

  focusBtn.addEventListener('click', () => {
    if (!isFocusing) {
      isFocusing = true;
      focusBtn.classList.replace('bg-brand-gradient', 'bg-error');
      if (focusBtnText) focusBtnText.textContent = "Stop Focus Session";
      const icon = focusBtn.querySelector('.material-symbols-outlined');
      if (icon) icon.textContent = "stop";
      showToast('Focus session started! Keep it up.', 'info');
    } else {
      isFocusing = false;
      focusBtn.classList.replace('bg-error', 'bg-brand-gradient');
      if (focusBtnText) focusBtnText.textContent = "Start Focus Session";
      const icon = focusBtn.querySelector('.material-symbols-outlined');
      if (icon) icon.textContent = "timer";
      clearInterval(focusTimer);
      showToast('Focus session paused.', 'info');
    }
  });
}
