// script.js
(function () {
  const root = document.documentElement;
  const themeBtn = document.getElementById('themeToggle');
  const bar = document.getElementById('contactBar');

  // ---------------- Theme ----------------
  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch (_) {}
    if (themeBtn) themeBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
  applyTheme(root.getAttribute('data-theme') || 'light');

  themeBtn && themeBtn.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  });

  // Reveal floating bar after load
  window.addEventListener('load', () => bar && bar.classList.add('visible'));

  // --------------- Modal System ---------------
  const openers = document.querySelectorAll('[data-modal-target]');
  const FOCUSABLE_SEL = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ].join(',');

  let lastFocused = null;
  let isOpening = false; // guard against double-open clicks

  function getFocusable(container) {
    return Array.from(container.querySelectorAll(FOCUSABLE_SEL))
      .filter(el => el.offsetParent !== null || el === container);
  }

  function lockPageScroll(lock) {
    document.documentElement.classList.toggle('modal-open', lock);
    document.body.classList.toggle('modal-open', lock);
  }

  function openModal(selector) {
    if (isOpening) return;
    const modal = document.querySelector(selector);
    if (!modal) return;

    isOpening = true;
    lastFocused = document.activeElement;

    modal.setAttribute('aria-hidden', 'false');
    lockPageScroll(true);

    // Focus management
    const content = modal.querySelector('.modal-content') || modal;
    const focusables = getFocusable(content);
    const first = focusables[0] || content;
    first.focus();

    // iOS/Instagram WebView scroll fix: ensure internal scrolling is enabled
    // (CSS already sets overflow on .modal-content; here we nudge layout)
    content.style.transform = 'translateZ(0)';

    // tiny delay to release double-open guard
    setTimeout(() => { isOpening = false; }, 150);
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'true');
    lockPageScroll(false);
    // restore focus
    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus();
    }
  }

  // Open buttons
  openers.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-modal-target');
      if (target) openModal(target);
    });
  });

  // Close buttons (static + future ones)
  document.addEventListener('click', (e) => {
    const closeBtn = e.target.closest('[data-modal-close]');
    if (closeBtn) {
      const modal = closeBtn.closest('.modal');
      if (modal) closeModal(modal);
    }
  });

  // Backdrop click to close
  document.addEventListener('mousedown', (e) => {
    const openModalEl = document.querySelector('.modal[aria-hidden="false"]');
    if (!openModalEl) return;

    const content = openModalEl.querySelector('.modal-content');
    // If click started outside content, close (use mousedown for reliable outside detection)
    if (content && !content.contains(e.target)) {
      closeModal(openModalEl);
    }
  });

  // ESC to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const openModalEl = document.querySelector('.modal[aria-hidden="false"]');
      if (openModalEl) closeModal(openModalEl);
    }
  });

  // Focus trap inside the open modal
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const openModalEl = document.querySelector('.modal[aria-hidden="false"]');
    if (!openModalEl) return;

    const content = openModalEl.querySelector('.modal-content') || openModalEl;
    const focusables = getFocusable(content);
    if (focusables.length === 0) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

})();