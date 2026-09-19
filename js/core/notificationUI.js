/**
 * DevPilot-AI — Notification UI Controller
 * 
 * Manages the top-right notification bell, unread badge, dropdown panel,
 * real-time observer updates, read/unread toggling, individual deletion,
 * clear-all confirmation flow, and target route navigation.
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.NotificationUI = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // State
  let isPanelOpen = false;
  let isConfirmingClear = false;

  // Cache DOM element lookups
  function getElements() {
    return {
      bellBtn: document.getElementById('notification-bell-btn'),
      closeBtn: document.getElementById('notification-close-btn'),
      badge: document.getElementById('notification-unread-badge'),
      panel: document.getElementById('notification-panel'),
      list: document.getElementById('notification-list'),
      markAllBtn: document.getElementById('notification-mark-all-read'),
      clearAllBtn: document.getElementById('notification-clear-all-btn'),
      clearConfirmBar: document.getElementById('notification-clear-confirm'),
      cancelClearBtn: document.getElementById('notification-cancel-clear-btn'),
      confirmClearBtn: document.getElementById('notification-confirm-clear-btn'),
      headerCount: document.getElementById('notification-header-count'),
      totalCount: document.getElementById('notification-total-count'),
      footer: document.getElementById('notification-footer')
    };
  }

  /**
   * Resolves relative URLs based on current location (root vs inside pages/)
   */
  function resolveUrl(targetUrl) {
    if (!targetUrl) return null;
    if (targetUrl.startsWith('http://') || targetUrl.startsWith('https://') || targetUrl.startsWith('//')) {
      return targetUrl;
    }

    const isInsidePages = window.location.pathname.toLowerCase().includes('/pages/');

    if (isInsidePages) {
      // Current page is inside pages/
      if (targetUrl.startsWith('pages/')) {
        return targetUrl.replace('pages/', '');
      }
      if (targetUrl === 'index.html' || targetUrl.startsWith('index.html#')) {
        return '../' + targetUrl;
      }
      return targetUrl;
    } else {
      // Current page is at root (index.html)
      if (!targetUrl.startsWith('pages/') && !targetUrl.startsWith('index.html') && targetUrl.endsWith('.html')) {
        return 'pages/' + targetUrl;
      }
      return targetUrl;
    }
  }

  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /**
   * Handle individual notification deletion cleanly and reactively
   */
  function handleDelete(event, id) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (!id) return;
    if (window.NotificationService) {
      window.NotificationService.deleteNotification(id);
      const currentNotifs = window.NotificationService.getNotifications();
      renderList(currentNotifs);
      updateBadge(window.NotificationService.getUnreadCount());
    }
  }

  /**
   * Render the notifications list inside #notification-list
   */
  function renderList(notifications = []) {
    const { list, headerCount, totalCount, markAllBtn, clearAllBtn } = getElements();
    if (!list) return;

    const unreadCount = notifications.filter(n => !n.read).length;

    // Update header count badge
    if (headerCount) {
      if (unreadCount > 0) {
        headerCount.textContent = `${unreadCount} unread`;
        headerCount.classList.remove('hidden');
      } else {
        headerCount.classList.add('hidden');
      }
    }

    // Update total count in footer
    if (totalCount) {
      totalCount.textContent = notifications.length === 1 ? '1 notification' : `${notifications.length} notifications`;
    }

    // Toggle button disabled states
    if (markAllBtn) {
      markAllBtn.disabled = unreadCount === 0;
      markAllBtn.classList.toggle('opacity-40', unreadCount === 0);
      markAllBtn.classList.toggle('cursor-not-allowed', unreadCount === 0);
    }
    if (clearAllBtn) {
      clearAllBtn.disabled = notifications.length === 0;
      clearAllBtn.classList.toggle('opacity-40', notifications.length === 0);
      clearAllBtn.classList.toggle('cursor-not-allowed', notifications.length === 0);
    }

    // Empty state
    if (!notifications || notifications.length === 0) {
      list.innerHTML = `
        <div class="py-10 px-4 text-center flex flex-col items-center justify-center select-none">
          <div class="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center text-outline mb-3">
            <span class="material-symbols-outlined text-2xl text-slate-400">notifications_off</span>
          </div>
          <h4 class="text-sm font-semibold text-on-surface mb-1">No notifications yet</h4>
          <p class="text-xs text-on-surface-variant text-slate-500">You're all caught up.</p>
        </div>
      `;
      return;
    }

    // Render list items
    list.innerHTML = notifications.map(item => {
      const isUnread = !item.read;
      const safeTitle = escapeHtml(item.title);
      const safeDesc = escapeHtml(item.message || item.description || '');
      const safeSection = escapeHtml(item.section || 'Update');
      const timeStr = escapeHtml(item.timeAgo || 'Recently');
      const iconName = item.icon || 'notifications';
      const iconBg = item.iconBgClass || 'bg-primary/10 text-primary';

      return `
        <div 
          class="notif-item group relative flex items-start gap-3 p-3.5 transition-colors cursor-pointer ${
            isUnread 
              ? 'bg-primary/[0.03] hover:bg-primary/[0.07]' 
              : 'bg-surface hover:bg-surface-container-low/80 opacity-75 hover:opacity-100'
          }"
          data-notif-id="${escapeHtml(item.id)}"
          data-notif-url="${escapeHtml(item.url || '')}"
          role="listitem"
          tabindex="0"
          title="${isUnread ? 'Click to mark as read and view' : 'Click to view'}"
        >
          <!-- Unread Dot Indicator -->
          <div class="mt-2 shrink-0 w-2 flex items-center justify-center">
            ${isUnread ? '<span class="w-2 h-2 rounded-full bg-primary ring-2 ring-primary/20"></span>' : '<span class="w-1.5 h-1.5 rounded-full bg-slate-300 opacity-40"></span>'}
          </div>

          <!-- Section Icon -->
          <div class="w-8 h-8 rounded-xl ${iconBg} flex items-center justify-center shrink-0 shadow-xs mt-0.5">
            <span class="material-symbols-outlined text-[18px]">${iconName}</span>
          </div>

          <!-- Content -->
          <div class="flex-1 min-w-0 pr-1">
            <div class="flex items-center gap-1.5 mb-0.5">
              <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                ${safeSection}
              </span>
              <span class="text-slate-300">•</span>
              <span class="text-[11px] text-slate-400 font-medium">${timeStr}</span>
            </div>
            <h4 class="text-xs ${isUnread ? 'font-bold text-on-surface' : 'font-semibold text-slate-600'} leading-snug truncate">
              ${safeTitle}
            </h4>
            ${safeDesc ? `<p class="text-[11px] text-slate-500 line-clamp-2 mt-0.5 leading-relaxed">${safeDesc}</p>` : ''}
          </div>
        </div>
      `;
    }).join('');
  }

  /**
   * Update the bell button's unread badge
   */
  function updateBadge(unreadCount) {
    const { badge } = getElements();
    if (!badge) return;

    if (unreadCount > 0) {
      badge.textContent = unreadCount > 99 ? '99+' : String(unreadCount);
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  }

  /**
   * Adjust panel position dynamically based on viewport width
   */
  function adjustPanelPosition() {
    const { panel } = getElements();
    if (!panel) return;

    if (window.innerWidth < 640) {
      panel.style.position = 'fixed';
      panel.style.left = '12px';
      panel.style.right = '12px';
      panel.style.width = 'auto';
      panel.style.maxWidth = 'calc(100vw - 24px)';
      panel.style.top = '76px';
      panel.style.zIndex = '100';
    } else {
      panel.style.position = '';
      panel.style.left = '';
      panel.style.right = '';
      panel.style.width = '';
      panel.style.maxWidth = '';
      panel.style.top = '';
      panel.style.zIndex = '';
    }
  }

  /**
   * Open the notifications dropdown panel
   */
  function openPanel() {
    const { panel, bellBtn } = getElements();
    if (!panel) return;

    isPanelOpen = true;
    adjustPanelPosition();
    panel.classList.remove('hidden');
    if (bellBtn) {
      bellBtn.setAttribute('aria-expanded', 'true');
    }

    // Cancel any open clear confirmation
    hideClearConfirm();

    // Re-render latest data
    if (window.NotificationService) {
      const items = window.NotificationService.getNotifications();
      renderList(items);
    }
  }

  /**
   * Close the notifications dropdown panel
   */
  function closePanel() {
    const { panel, bellBtn } = getElements();
    if (!panel) return;

    isPanelOpen = false;
    panel.classList.add('hidden');
    if (bellBtn) {
      bellBtn.setAttribute('aria-expanded', 'false');
    }
    hideClearConfirm();
  }

  /**
   * Toggle the notification panel
   */
  function togglePanel() {
    if (isPanelOpen) {
      closePanel();
    } else {
      openPanel();
    }
  }

  /**
   * Show Clear All confirmation bar
   */
  function showClearConfirm() {
    const { clearConfirmBar, footer } = getElements();
    if (clearConfirmBar) {
      clearConfirmBar.classList.remove('hidden');
      isConfirmingClear = true;
    }
    if (footer) {
      footer.classList.add('hidden');
    }
  }

  /**
   * Hide Clear All confirmation bar
   */
  function hideClearConfirm() {
    const { clearConfirmBar, footer } = getElements();
    if (clearConfirmBar) {
      clearConfirmBar.classList.add('hidden');
      isConfirmingClear = false;
    }
    if (footer) {
      footer.classList.remove('hidden');
    }
  }

  /**
   * Bind event listeners to panel interactions
   */
  function bindEvents() {
    const els = getElements();
    if (!els.bellBtn) return;

    // 1. Bell click toggles dropdown
    els.bellBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      togglePanel();
    });

    // Close button in panel header
    if (els.closeBtn) {
      els.closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closePanel();
      });
    }

    // 2. Click outside closes panel
    document.addEventListener('click', (e) => {
      if (!isPanelOpen) return;
      const { panel, bellBtn } = getElements();
      if (panel && !panel.contains(e.target) && bellBtn && !bellBtn.contains(e.target)) {
        closePanel();
      }
    });

    // 3. Escape key closes panel
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isPanelOpen) {
        closePanel();
      }
    });

    // Window resize handler for dynamic responsive positioning
    window.addEventListener('resize', () => {
      if (isPanelOpen) {
        adjustPanelPosition();
      }
    });

    // 4. Mark all as read button
    if (els.markAllBtn) {
      els.markAllBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (window.NotificationService) {
          window.NotificationService.markAllAsRead();
        }
      });
    }

    // 5. Clear all button -> Show confirmation step
    if (els.clearAllBtn) {
      els.clearAllBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showClearConfirm();
      });
    }

    // 6. Cancel clear
    if (els.cancelClearBtn) {
      els.cancelClearBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        hideClearConfirm();
      });
    }

    // 7. Confirm clear -> Delete all notifications permanently from storage
    if (els.confirmClearBtn) {
      els.confirmClearBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (window.NotificationService) {
          window.NotificationService.clearAll();
          renderList([]);
          updateBadge(0);
        }
        hideClearConfirm();
      });
    }

    // 8. Notification item delegation: Click to Read/Navigate OR Delete
    if (els.list) {
      els.list.addEventListener('click', (e) => {
        // Individual Delete button click delegation
        const deleteBtn = e.target.closest('.notif-delete-btn, [data-delete-id]');
        if (deleteBtn) {
          e.preventDefault();
          e.stopPropagation();
          const deleteId = deleteBtn.getAttribute('data-delete-id');
          if (deleteId) {
            handleDelete(e, deleteId);
          }
          return;
        }

        // Notification card click -> Mark as read and Navigate
        const notifItem = e.target.closest('.notif-item');
        if (notifItem) {
          const notifId = notifItem.getAttribute('data-notif-id');
          const targetUrl = notifItem.getAttribute('data-notif-url');

          if (notifId && window.NotificationService) {
            window.NotificationService.markAsRead(notifId);
          }

          if (targetUrl) {
            const resolved = resolveUrl(targetUrl);
            if (resolved) {
              closePanel();
              window.location.href = resolved;
            }
          }
        }
      });
    }
  }

  /**
   * Initialize Notification UI
   */
  function init() {
    bindEvents();

    if (window.NotificationService) {
      // Sync authoritative events and subscribe to reactive changes
      const state = window.NotificationService.init();
      updateBadge(state.unreadCount);
      renderList(state.notifications);

      window.NotificationService.subscribe(({ notifications, unreadCount }) => {
        updateBadge(unreadCount);
        renderList(notifications);
      });
    }
  }

  // Auto-boot when DOM is ready
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  }

  return {
    init,
    openPanel,
    closePanel,
    togglePanel,
    renderList,
    updateBadge,
    resolveUrl,
    handleDelete
  };
});
