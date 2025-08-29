(function () {
  const root = document.documentElement;
  const themeBtn = document.getElementById('themeToggle');

  // Theme
  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch (e) {}
    if (themeBtn) themeBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
  applyTheme(root.getAttribute('data-theme') || 'light');
  themeBtn?.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  });

  // ===== Modal System =====
  const openers = document.querySelectorAll('[data-modal-target]');
  const closers = document.querySelectorAll('[data-modal-close]');
  let lastFocused = null;

  function openModal(selector) {
    const modal = document.querySelector(selector);
    if (!modal) return;
    lastFocused = document.activeElement;
    modal.setAttribute('aria-hidden', 'false');
    document.documentElement.classList.add('modal-open');
    document.body.classList.add('modal-open');
    const focusable = modal.querySelector('[data-modal-close]') || modal.querySelector('h2');
    focusable?.focus();
  }

  function closeModal(modal) {
    modal.setAttribute('aria-hidden', 'true');
    document.documentElement.classList.remove('modal-open');
    document.body.classList.remove('modal-open');
    lastFocused?.focus();
  }

  openers.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-modal-target');
      if (target) openModal(target);
    });
  });

  closers.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal');
      if (modal) closeModal(modal);
    });
  });

  // Click outside to close
  document.addEventListener('click', (e) => {
    const openModalEl = document.querySelector('.modal[aria-hidden="false"]');
    if (!openModalEl) return;
    const content = openModalEl.querySelector('.modal-content');
    if (!content.contains(e.target) && !e.target.closest('[data-modal-target]')) {
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
})();