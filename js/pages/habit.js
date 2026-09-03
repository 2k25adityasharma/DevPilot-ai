/**
 * DevPilot-AI - Consistency & Habit Tracker Module
 */

const defaultHabits = [
  { id: 'h1', title: 'Solve 2 LeetCode Problems', category: 'DSA', completed: true, streak: 12 },
  { id: 'h2', title: 'Revise JS Event Loop & Promises', category: 'WebDev', completed: true, streak: 8 },
  { id: 'h3', title: 'Push 1 Production Commit to GitHub', category: 'DevOps', completed: true, streak: 14 },
  { id: 'h4', title: 'Complete 2 Pomodoro Focus Sessions', category: 'Focus', completed: false, streak: 5 },
  { id: 'h5', title: 'Read 1 High Scalability Architecture Article', category: 'System Design', completed: false, streak: 7 }
];

let habits = Storage.get('dev_habits', defaultHabits);
let streakCount = Storage.get('streak_count', 14);

document.addEventListener('DOMContentLoaded', () => {
  renderHabitsList();
  renderProgress();
  renderHabitHeatmap();
  initHabitModal();
});

function renderHabitsList() {
  const container = document.getElementById('habits-list-container');
  if (!container) return;

  container.innerHTML = habits.map((habit, idx) => `
    <div class="habit-item ${habit.completed ? 'bg-slate-50/70 border-primary/20' : ''}">
      <div class="flex items-center gap-3">
        <input type="checkbox" class="habit-checkbox" id="chk-${habit.id}" ${habit.completed ? 'checked' : ''} onchange="toggleHabit(${idx})">
        <label for="chk-${habit.id}" class="cursor-pointer select-none">
          <p class="font-semibold text-sm ${habit.completed ? 'line-through text-slate-400' : 'text-on-surface'}">${escapeHtml(habit.title)}</p>
          <div class="flex items-center gap-2 mt-0.5">
            <span class="text-xs text-on-surface-variant font-medium">${habit.category}</span>
            <span class="text-slate-300">•</span>
            <span class="text-xs text-amber-600 font-semibold flex items-center gap-0.5">
              <span class="material-symbols-outlined text-[13px]" style='font-variation-settings: "FILL" 1;'>local_fire_department</span>
              ${habit.streak}d streak
            </span>
          </div>
        </label>
      </div>
      <button class="text-slate-400 hover:text-error p-1.5 rounded transition-colors" title="Delete Habit" onclick="deleteHabit(${idx})">
        <span class="material-symbols-outlined text-[18px]">delete</span>
      </button>
    </div>
  `).join('');
}

window.toggleHabit = function(idx) {
  if (habits[idx]) {
    habits[idx].completed = !habits[idx].completed;
    if (habits[idx].completed) {
      habits[idx].streak++;
      showToast(`Completed: ${habits[idx].title}`, 'success');
    } else {
      habits[idx].streak = Math.max(0, habits[idx].streak - 1);
    }
    Storage.set('dev_habits', habits);
    renderHabitsList();
    renderProgress();
  }
};

window.deleteHabit = function(idx) {
  if (confirm('Delete this habit?')) {
    habits.splice(idx, 1);
    Storage.set('dev_habits', habits);
    renderHabitsList();
    renderProgress();
    showToast('Habit removed', 'info');
  }
};

function renderProgress() {
  const total = habits.length;
  const completed = habits.filter(h => h.completed).length;
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100);

  const countEl = document.getElementById('habits-completed-text');
  const pctEl = document.getElementById('habits-pct-text');
  const barEl = document.getElementById('habits-progress-bar');
  const streakEl = document.getElementById('habit-streak-display');

  if (countEl) countEl.textContent = `${completed} of ${total} Completed`;
  if (pctEl) pctEl.textContent = `${pct}%`;
  if (barEl) barEl.style.width = `${pct}%`;
  if (streakEl) streakEl.textContent = `${streakCount} Day Streak`;
}

function renderHabitHeatmap() {
  const container = document.getElementById('habit-heatmap-grid');
  if (!container) return;

  container.innerHTML = '';
  const levels = ['heatmap-l0', 'heatmap-l1', 'heatmap-l2', 'heatmap-l3', 'heatmap-l4'];

  for (let col = 0; col < 26; col++) {
    const colDiv = document.createElement('div');
    colDiv.className = 'flex flex-col gap-1';

    for (let row = 0; row < 7; row++) {
      const rand = Math.random();
      let level = levels[0];
      if (rand > 0.85) level = levels[4];
      else if (rand > 0.65) level = levels[3];
      else if (rand > 0.4) level = levels[2];
      else if (rand > 0.2) level = levels[1];

      const cell = document.createElement('div');
      cell.className = `heatmap-cell ${level}`;
      cell.title = `Activity on week ${col + 1}, day ${row + 1}`;
      colDiv.appendChild(cell);
    }
    container.appendChild(colDiv);
  }
}

function initHabitModal() {
  const addBtn = document.getElementById('btn-add-habit');
  if (!addBtn) return;

  addBtn.addEventListener('click', () => {
    const title = prompt('Enter new daily habit name:');
    if (!title || !title.trim()) return;

    const category = prompt('Enter category (e.g. DSA, WebDev, System Design, Focus):') || 'General';

    habits.push({
      id: 'h_' + Date.now(),
      title: title.trim(),
      category: category.trim(),
      completed: false,
      streak: 1
    });

    Storage.set('dev_habits', habits);
    renderHabitsList();
    renderProgress();
    showToast('New habit added to checklist!', 'success');
  });
}

function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
