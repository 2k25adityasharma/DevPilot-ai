/**
 * DevPilot-AI - Workspace Settings Module
 */

const defaultSettings = {
  profile: {
    fullName: 'Aditya Sharma',
    title: 'Senior Full Stack Engineer',
    email: 'aditya.sharma@example.dev',
    githubUsername: '2k25adityasharma',
    bio: 'Building next-gen developer tools and high-scale web applications.'
  },
  apiKeys: {
    githubToken: 'ghp_mock9481729487192837491823749817234',
    openAiKey: 'sk-mock-9817234981723948712938471928374',
    geminiKey: 'AIzaSyMock-891723498172394871293847',
    claudeKey: 'sk-ant-mock-192837491827349182734'
  },
  ui: {
    themeAccent: '#4F46E5',
    compactMode: false,
    autoSaveInterval: '30'
  },
  notifications: {
    focusTimerAlerts: true,
    dailyStreakReminders: true,
    soundEffects: true
  }
};

let settings = Storage.get('user_settings', defaultSettings);
const savedGithub = Storage.get('github_settings', null);
if ((!settings.profile || !settings.profile.githubUsername) && savedGithub && savedGithub.username) {
  if (!settings.profile) settings.profile = {};
  settings.profile.githubUsername = savedGithub.username;
}

document.addEventListener('DOMContentLoaded', () => {
  initSettingsTabs();
  populateSettingsForm();
  initPasswordToggles();
  initSettingsSave();
  initGithubLinkUpdater();
});

function initGithubLinkUpdater() {
  const ghInput = document.getElementById('set-github-username');
  const ghLink = document.getElementById('link-github-profile');
  if (ghInput && ghLink) {
    const updateLink = () => {
      const user = ghInput.value.trim() || '2k25adityasharma';
      ghLink.href = `https://github.com/${user}`;
    };
    ghInput.addEventListener('input', updateLink);
    updateLink();
  }
}

function initSettingsTabs() {
  const tabs = document.querySelectorAll('.settings-tab-btn');
  const sections = document.querySelectorAll('.settings-section');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      sections.forEach(s => s.classList.remove('active'));

      tab.classList.add('active');
      const targetId = tab.getAttribute('data-tab');
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.classList.add('active');
      }
    });
  });
}

function populateSettingsForm() {
  // Profile
  setVal('set-fullname', settings.profile.fullName);
  setVal('set-title', settings.profile.title);
  setVal('set-email', settings.profile.email);
  setVal('set-github-username', settings.profile.githubUsername || '2k25adityasharma');
  setVal('set-bio', settings.profile.bio);

  // API Keys
  setVal('set-github-token', settings.apiKeys.githubToken);
  setVal('set-openai-key', settings.apiKeys.openAiKey);
  setVal('set-gemini-key', settings.apiKeys.geminiKey);
  setVal('set-claude-key', settings.apiKeys.claudeKey);

  // UI
  const compactCheck = document.getElementById('set-compact-mode');
  if (compactCheck) compactCheck.checked = !!settings.ui.compactMode;

  setVal('set-autosave-interval', settings.ui.autoSaveInterval);

  // Notifications
  const focusAlertCheck = document.getElementById('set-focus-alerts');
  if (focusAlertCheck) focusAlertCheck.checked = !!settings.notifications.focusTimerAlerts;

  const streakAlertCheck = document.getElementById('set-streak-alerts');
  if (streakAlertCheck) streakAlertCheck.checked = !!settings.notifications.dailyStreakReminders;

  const soundCheck = document.getElementById('set-sound-effects');
  if (soundCheck) soundCheck.checked = !!settings.notifications.soundEffects;
}

function initPasswordToggles() {
  const toggleButtons = document.querySelectorAll('.btn-toggle-key');
  toggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const input = document.getElementById(targetId);
      const icon = btn.querySelector('.material-symbols-outlined');
      if (input) {
        if (input.type === 'password') {
          input.type = 'text';
          if (icon) {
            if (window.DevPilotIcons) DevPilotIcons.setIcon(icon, 'visibility_off');
            else icon.textContent = 'visibility_off';
          }
        } else {
          input.type = 'password';
          if (icon) {
            if (window.DevPilotIcons) DevPilotIcons.setIcon(icon, 'visibility');
            else icon.textContent = 'visibility';
          }
        }
      }
    });
  });
}

function initSettingsSave() {
  const saveButtons = document.querySelectorAll('.btn-save-settings');
  saveButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Collect Profile
      settings.profile.fullName = getVal('set-fullname');
      settings.profile.title = getVal('set-title');
      settings.profile.email = getVal('set-email');
      const ghUsername = getVal('set-github-username').replace(/^https?:\/\/(?:www\.)?github\.com\//i, '').replace(/^@/, '').replace(/\/$/, '');
      settings.profile.githubUsername = ghUsername;
      settings.profile.bio = getVal('set-bio');

      // Sync github_settings for Dashboard and Analyzer
      Storage.set('github_settings', {
        username: ghUsername,
        isConfigured: !!ghUsername,
        updatedAt: new Date().toISOString()
      });

      // Collect API Keys
      settings.apiKeys.githubToken = getVal('set-github-token');
      settings.apiKeys.openAiKey = getVal('set-openai-key');
      settings.apiKeys.geminiKey = getVal('set-gemini-key');
      settings.apiKeys.claudeKey = getVal('set-claude-key');

      // UI
      const compactCheck = document.getElementById('set-compact-mode');
      if (compactCheck) settings.ui.compactMode = compactCheck.checked;
      settings.ui.autoSaveInterval = getVal('set-autosave-interval') || '30';

      // Notifications
      const focusAlertCheck = document.getElementById('set-focus-alerts');
      if (focusAlertCheck) settings.notifications.focusTimerAlerts = focusAlertCheck.checked;

      const streakAlertCheck = document.getElementById('set-streak-alerts');
      if (streakAlertCheck) settings.notifications.dailyStreakReminders = streakAlertCheck.checked;

      const soundCheck = document.getElementById('set-sound-effects');
      if (soundCheck) settings.notifications.soundEffects = soundCheck.checked;

      Storage.set('user_settings', settings);
      showToast('Settings saved successfully!', 'success');
    });
  });
}

function getVal(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : '';
}

function setVal(id, val) {
  const el = document.getElementById(id);
  if (el) el.value = val || '';
}
