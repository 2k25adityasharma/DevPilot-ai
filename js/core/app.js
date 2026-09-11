/**
 * DevPilot-AI - Main Application Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  initSidebar();
  highlightActiveRoute();
});

// Sidebar Collapsing and Mobile Drawer
function initSidebar() {
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const sidebarToggleIcon = document.getElementById('sidebar-toggle-icon');
  const mobileMenuTriggers = document.querySelectorAll('#mobile-menu-trigger, .mobile-nav-toggle');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const htmlDoc = document.documentElement;

  // Restore collapsed state
  const isCollapsed = localStorage.getItem('devpilot-sidebar-collapsed') === 'true';
  if (isCollapsed) {
    htmlDoc.classList.add('sidebar-collapsed');
    if (sidebarToggleIcon) sidebarToggleIcon.textContent = 'chevron_right';
  }

  function toggleSidebar() {
    htmlDoc.classList.toggle('sidebar-collapsed');
    const collapsed = htmlDoc.classList.contains('sidebar-collapsed');
    localStorage.setItem('devpilot-sidebar-collapsed', collapsed);

    if (sidebarToggleIcon) {
      sidebarToggleIcon.textContent = collapsed ? 'chevron_right' : 'chevron_left';
    }

    document.querySelectorAll('.sidebar-collapsed-only').forEach(el => {
      if (collapsed) {
        el.classList.remove('hidden');
        el.classList.add('flex');
      } else {
        el.classList.add('hidden');
        el.classList.remove('flex');
      }
    });
  }

  function toggleMobileMenu() {
    if (!sidebar) return;
    const isOpen = sidebar.classList.contains('mobile-open');
    if (isOpen) {
      sidebar.classList.remove('mobile-open');
      if (mobileOverlay) mobileOverlay.classList.add('hidden');
    } else {
      sidebar.classList.add('mobile-open');
      if (mobileOverlay) mobileOverlay.classList.remove('hidden');
    }
  }

  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', toggleSidebar);
  }

  mobileMenuTriggers.forEach(btn => {
    btn.addEventListener('click', toggleMobileMenu);
  });

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', () => {
      if (sidebar) sidebar.classList.remove('mobile-open');
      mobileOverlay.classList.add('hidden');
    });
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      if (sidebar) sidebar.classList.remove('mobile-open');
      if (mobileOverlay) mobileOverlay.classList.add('hidden');
    }
  });
}

// Highlight Current Navigation Item based on URL
function highlightActiveRoute() {
  const currentPath = window.location.pathname.toLowerCase();
  const navLinks = document.querySelectorAll('#sidebar nav a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;

    // Normalize href and current path
    const pageName = href.split('/').pop().toLowerCase();
    const currentFile = currentPath.split('/').pop() || 'index.html';

    const isActive = (currentFile === pageName) || 
                     (currentFile === '' && pageName === 'index.html') ||
                     (currentPath.endsWith('/') && pageName === 'index.html');

    if (isActive) {
      // Apply active style
      link.className = 'flex items-center gap-3 px-3 py-2.5 rounded-lg bg-secondary-container text-on-secondary-container border-l-[3px] border-primary transition-transform hover:scale-[0.98] duration-200 tooltip relative group';
      const icon = link.querySelector('.material-symbols-outlined');
      if (icon) {
        icon.classList.add('text-primary');
        icon.style.fontVariationSettings = '"FILL" 1';
      }
    } else {
      // Apply inactive style
      link.className = 'flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors duration-200 border-l-[3px] border-transparent tooltip relative group';
      const icon = link.querySelector('.material-symbols-outlined');
      if (icon) {
        icon.classList.remove('text-primary');
        icon.style.fontVariationSettings = '';
      }
    }
  });
}

// Prevent blinking caret or text selection focus on non-editable elements
document.addEventListener('mousedown', (e) => {
  const isEditable = e.target.closest('input, textarea, [contenteditable="true"], select');
  if (!isEditable) {
    if (document.activeElement && document.activeElement !== document.body && !document.activeElement.closest('input, textarea, [contenteditable="true"], select')) {
      document.activeElement.blur();
    }
  }
});
