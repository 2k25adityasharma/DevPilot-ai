/**
 * DevPilot-AI - Universal Theme Management Engine
 * Handles Light Mode (Main Theme - Dashboard Aesthetic) &
 * Dark Mode (Universal Dark - Interview Prep Midnight Aesthetic)
 */

(function () {
  'use strict';

  if (window.__devpilot_theme_initialized) return;
  window.__devpilot_theme_initialized = true;

  const THEME_STORAGE_KEY = 'devpilot-theme';

  // Determine active theme from storage or system preference
  function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') {
      return saved;
    }
    // Default to light mode (Image 2 aesthetic)
    return 'light';
  }

  // Apply theme class to document root immediately
  function applyTheme(theme) {
    const htmlDoc = document.documentElement;
    if (theme === 'dark') {
      htmlDoc.classList.add('dark');
    } else {
      htmlDoc.classList.remove('dark');
    }
    updateThemeIcons(theme === 'dark');
  }

  // Update theme toggle icons across the page
  function updateThemeIcons(isDark) {
    const iconButtons = document.querySelectorAll('#theme-toggle, [data-theme-toggle], .btn-theme-toggle');
    iconButtons.forEach(btn => {
      const icon = btn.querySelector('.material-symbols-outlined, #theme-toggle-icon');
      if (icon) {
        // In Light Mode show sun (light_mode); in Dark Mode show moon (dark_mode)
        icon.textContent = isDark ? 'dark_mode' : 'light_mode';
      }
      btn.setAttribute('title', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
      btn.setAttribute('aria-label', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    });
  }

  // Toggle between light and dark
  function toggleTheme() {
    const htmlDoc = document.documentElement;
    const isNowDark = !htmlDoc.classList.contains('dark');
    const newTheme = isNowDark ? 'dark' : 'light';
    
    applyTheme(newTheme);
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);

    // Dispatch custom event for dynamic components (e.g. charts or canvases)
    window.dispatchEvent(new CustomEvent('devpilot-theme-change', {
      detail: { theme: newTheme, isDark: isNowDark }
    }));
  }

  // Setup DOM event listeners on document ready
  function initThemeListeners() {
    const currentTheme = getPreferredTheme();
    applyTheme(currentTheme);

    // Bind all theme toggles
    document.addEventListener('click', (e) => {
      const toggleBtn = e.target.closest('#theme-toggle, [data-theme-toggle], .btn-theme-toggle');
      if (toggleBtn) {
        e.preventDefault();
        toggleTheme();
      }
    });

    // Cross-tab synchronization
    window.addEventListener('storage', (e) => {
      if (e.key === THEME_STORAGE_KEY) {
        const syncedTheme = e.newValue === 'dark' ? 'dark' : 'light';
        applyTheme(syncedTheme);
      }
    });
  }

  // Immediate pre-execution to prevent flash
  const initialTheme = getPreferredTheme();
  if (initialTheme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeListeners);
  } else {
    initThemeListeners();
  }

  // Expose API on window for programmatic control
  window.DevPilotTheme = {
    getPreferredTheme,
    applyTheme,
    toggleTheme,
    isDark: () => document.documentElement.classList.contains('dark')
  };
})();
