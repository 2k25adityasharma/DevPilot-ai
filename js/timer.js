/**
 * DevPilot-AI - Pomodoro Focus Timer Module
 */

const TIMER_MODES = {
  work: { label: 'Deep Work Focus', minutes: 25, color: '#4F46E5' },
  shortBreak: { label: 'Short Break', minutes: 5, color: '#10B981' },
  longBreak: { label: 'Long Break', minutes: 15, color: '#F59E0B' }
};

let currentMode = 'work';
let totalSeconds = TIMER_MODES.work.minutes * 60;
let remainingSeconds = totalSeconds;
let timerInterval = null;
let isRunning = false;
let completedRounds = Storage.get('timer_completed_rounds', 4);

document.addEventListener('DOMContentLoaded', () => {
  initTimerModes();
  initTimerControls();
  renderTimerDisplay();
  renderRounds();
});

function initTimerModes() {
  const modeButtons = document.querySelectorAll('.timer-mode-btn');
  modeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (isRunning) {
        if (!confirm('A timer is currently running. Switch mode and reset?')) return;
        pauseTimer();
      }
      modeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentMode = btn.getAttribute('data-mode') || 'work';
      totalSeconds = TIMER_MODES[currentMode].minutes * 60;
      remainingSeconds = totalSeconds;
      renderTimerDisplay();
    });
  });
}

function initTimerControls() {
  const startBtn = document.getElementById('btn-timer-start');
  const resetBtn = document.getElementById('btn-timer-reset');

  if (startBtn) {
    startBtn.addEventListener('click', () => {
      if (isRunning) {
        pauseTimer();
      } else {
        startTimer();
      }
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', resetTimer);
  }
}

function startTimer() {
  isRunning = true;
  const startBtn = document.getElementById('btn-timer-start');
  const startText = document.getElementById('timer-start-text');
  const startIcon = document.getElementById('timer-start-icon');

  if (startText) startText.textContent = 'Pause';
  if (startIcon) startIcon.textContent = 'pause';
  if (startBtn) {
    startBtn.classList.remove('btn-primary');
    startBtn.classList.add('btn-secondary');
  }

  showToast(`${TIMER_MODES[currentMode].label} started!`, 'info');

  timerInterval = setInterval(() => {
    if (remainingSeconds > 0) {
      remainingSeconds--;
      renderTimerDisplay();
    } else {
      timerFinished();
    }
  }, 1000);
}

function pauseTimer() {
  isRunning = false;
  clearInterval(timerInterval);

  const startBtn = document.getElementById('btn-timer-start');
  const startText = document.getElementById('timer-start-text');
  const startIcon = document.getElementById('timer-start-icon');

  if (startText) startText.textContent = 'Resume';
  if (startIcon) startIcon.textContent = 'play_arrow';
  if (startBtn) {
    startBtn.classList.add('btn-primary');
    startBtn.classList.remove('btn-secondary');
  }
}

function resetTimer() {
  pauseTimer();
  remainingSeconds = totalSeconds;
  const startText = document.getElementById('timer-start-text');
  if (startText) startText.textContent = 'Start Focus';
  renderTimerDisplay();
  showToast('Timer reset', 'info');
}

function timerFinished() {
  pauseTimer();
  remainingSeconds = totalSeconds;
  renderTimerDisplay();

  if (currentMode === 'work') {
    completedRounds++;
    Storage.set('timer_completed_rounds', completedRounds);
    renderRounds();
    showToast('🎉 Focus round complete! Take a well-deserved break.', 'success');
  } else {
    showToast('☕ Break finished! Ready to dive back in?', 'info');
  }
}

function renderTimerDisplay() {
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const timeStr = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const timeDisplay = document.getElementById('timer-time-display');
  const modeBadge = document.getElementById('timer-mode-badge');
  const circleProgress = document.getElementById('timer-circle-progress');

  if (timeDisplay) timeDisplay.textContent = timeStr;
  if (modeBadge) modeBadge.textContent = TIMER_MODES[currentMode].label;
  document.title = `${timeStr} - DevPilot Focus Timer`;

  // Update SVG circle stroke
  if (circleProgress) {
    const radius = 120;
    const circumference = 2 * Math.PI * radius;
    circleProgress.style.strokeDasharray = `${circumference} ${circumference}`;
    const fraction = remainingSeconds / totalSeconds;
    const offset = circumference - (fraction * circumference);
    circleProgress.style.strokeDashoffset = offset;
    circleProgress.style.stroke = TIMER_MODES[currentMode].color;
  }
}

function renderRounds() {
  const countEl = document.getElementById('completed-rounds-count');
  if (countEl) countEl.textContent = completedRounds;

  const roundsContainer = document.getElementById('rounds-indicators');
  if (roundsContainer) {
    let dotsHtml = '';
    for (let i = 1; i <= 4; i++) {
      const isDone = (completedRounds % 4 >= i) || (completedRounds > 0 && completedRounds % 4 === 0);
      dotsHtml += `
        <div class="flex items-center gap-1">
          <div class="w-3.5 h-3.5 rounded-full ${isDone ? 'bg-primary shadow-sm' : 'bg-slate-200'} transition-all"></div>
        </div>
      `;
    }
    roundsContainer.innerHTML = dotsHtml;
  }
}
