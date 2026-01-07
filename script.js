(function () {
  const root = document.documentElement;
  const themeBtn = document.getElementById('themeToggle');

  /* =========================
     THEME
  ========================= */
  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch (e) {}
    if (themeBtn) themeBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
  }

  // root already gets theme set in <head> flash-prevention script
  applyTheme(root.getAttribute('data-theme') || 'light');

  themeBtn?.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  });

  /* =========================
     MODAL STACK (Back support)
  ========================= */
  const modalStack = [];
  let lastFocused = null;

  function setScrollLock(locked) {
    if (locked) {
      document.documentElement.classList.add('modal-open');
      document.body.classList.add('modal-open');
    } else {
      document.documentElement.classList.remove('modal-open');
      document.body.classList.remove('modal-open');
    }
  }

  function setModalOpen(modal, open) {
    modal.setAttribute('aria-hidden', open ? 'false' : 'true');
  }

  function getTopModal() {
    return modalStack.length ? modalStack[modalStack.length - 1] : null;
  }

  function focusInside(modal) {
    const el =
      modal.querySelector('[data-modal-close]') ||
      modal.querySelector('[data-modal-back]') ||
      modal.querySelector('h2, h1') ||
      modal.querySelector('button, a, input, [tabindex]:not([tabindex="-1"])');
    el?.focus?.({ preventScroll: true });
  }

  function openModal(selector) {
    const modal = document.querySelector(selector);
    if (!modal) return;

    // Save the first focused element when opening the first modal
    if (modalStack.length === 0) lastFocused = document.activeElement;

    const current = getTopModal();
    if (current && current !== modal) {
      setModalOpen(current, false);
    }

    // Avoid duplicates in stack (edge cases)
    const existingIndex = modalStack.indexOf(modal);
    if (existingIndex !== -1) {
      modalStack.splice(existingIndex, 1);
    }

    modalStack.push(modal);
    setModalOpen(modal, true);
    setScrollLock(true);
    focusInside(modal);
  }

  function closeTopModal() {
    const top = modalStack.pop();
    if (!top) return;

    setModalOpen(top, false);

    const previous = getTopModal();
    if (previous) {
      setModalOpen(previous, true);
      focusInside(previous);
      setScrollLock(true);
      return;
    }

    // Nothing left open
    setScrollLock(false);
    lastFocused?.focus?.();
    lastFocused = null;
  }

  function closeAllModals() {
    while (modalStack.length) {
      const m = modalStack.pop();
      setModalOpen(m, false);
    }
    setScrollLock(false);
    lastFocused?.focus?.();
    lastFocused = null;
  }

  /* =========================
     CLICK HANDLERS (delegated)
  ========================= */
  document.addEventListener('click', (e) => {
    const opener = e.target.closest('[data-modal-target]');
    if (opener) {
      const target = opener.getAttribute('data-modal-target');
      if (target) openModal(target);
      return;
    }

    const closer = e.target.closest('[data-modal-close]');
    if (closer) {
      closeTopModal();
      return;
    }

    const back = e.target.closest('[data-modal-back]');
    if (back) {
      closeTopModal();
      return;
    }

    // Click outside closes only the top modal
    const top = getTopModal();
    if (!top) return;

    // If user clicked on the overlay itself (not inside modal-content)
    if (e.target === top) {
      closeTopModal();
    }
  });

  /* =========================
     KEYBOARD
  ========================= */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const top = getTopModal();
      if (top) closeTopModal();
    }
  });

  // Safety cleanup
  window.addEventListener('beforeunload', closeAllModals);
})();
