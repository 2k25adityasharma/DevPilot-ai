/**
 * DevPilot-AI - Utility Functions
 */

// Toast Notification Manager
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  const iconName = type === 'success' ? 'check_circle' : type === 'error' ? 'error' : 'info';
  
  toast.innerHTML = `
    <span class="material-symbols-outlined toast-icon text-lg">${iconName}</span>
    <span class="flex-1">${message}</span>
  `;

  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // Auto-dismiss after 3.5s
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 3500);
}

// Copy to Clipboard Helper
async function copyToClipboard(text, successMessage = 'Copied to clipboard!') {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      textArea.remove();
    }
    showToast(successMessage, 'success');
    return true;
  } catch (err) {
    console.error('Failed to copy text: ', err);
    showToast('Failed to copy to clipboard', 'error');
    return false;
  }
}

// Format relative date
function timeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  
  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// Local Storage Helper with JSON parse/stringify
const Storage = {
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(`devpilot_${key}`);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.warn(`Error reading key ${key} from localStorage`, e);
      return defaultValue;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(`devpilot_${key}`, JSON.stringify(value));
    } catch (e) {
      console.warn(`Error setting key ${key} to localStorage`, e);
    }
  },
  remove(key) {
    localStorage.removeItem(`devpilot_${key}`);
  }
};
