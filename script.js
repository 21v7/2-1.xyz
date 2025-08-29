(function () {
  const root = document.documentElement;
  const themeBtn = document.getElementById('themeToggle');
  const bar = document.getElementById('contactBar');

  // ---- Theme ----
  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch (e) {}
    if (themeBtn) themeBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
  applyTheme(root.getAttribute('data-theme') || 'light');
  ['click','touchend'].forEach(evt=>{
    themeBtn?.addEventListener(evt, (e) => {
      e.preventDefault();
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    }, { passive: false });
  });

  // ---- Contact bar show + body padding synced to bar height ----
  function setBodyTopPadding() {
    if (!bar) return;
    const h = bar.offsetHeight || 56;
    document.body.style.paddingTop = Math.max(56, h + 8) + 'px';
  }
  function showBar() {
    if (!bar) return;
    bar.classList.add('visible');
    setBodyTopPadding();
  }
  window.addEventListener('load', showBar, { passive: true });
  document.addEventListener('DOMContentLoaded', showBar, { passive: true });
  // extra safety timer for IG in-app browser
  setTimeout(showBar, 700);
  window.addEventListener('resize', setBodyTopPadding);

  // ---- Modal system (robust for in-app browsers) ----
  function getOpenModal(){ return document.querySelector('.modal[aria-hidden="false"]'); }
  function openModal(el){
    if (!el) return;
    el.setAttribute('aria-hidden','false');
    document.documentElement.classList.add('modal-open');
    document.body.classList.add('modal-open');
    (el.querySelector('[data-modal-close]') || el.querySelector('h2'))?.focus?.();
  }
  function closeModal(el){
    if (!el) return;
    el.setAttribute('aria-hidden','true');
    document.documentElement.classList.remove('modal-open');
    document.body.classList.remove('modal-open');
  }
  function openModalSafely(selector){
    const next = document.querySelector(selector);
    if (!next) return;
    const current = getOpenModal();
    if (current && current !== next) closeModal(current);
    openModal(next);
  }

  // Main launchers
  document.querySelectorAll('[data-modal-target]').forEach(btn=>{
    ['click','touchend'].forEach(evt=>{
      btn.addEventListener(evt, (e)=>{
        e.preventDefault();
        const sel = btn.getAttribute('data-modal-target');
        if (sel) openModalSafely(sel);
      }, { passive: false });
    });
  });

  // Close buttons
  document.querySelectorAll('[data-modal-close]').forEach(btn=>{
    ['click','touchend'].forEach(evt=>{
      btn.addEventListener(evt, (e)=>{
        e.preventDefault();
        const m = btn.closest('.modal');
        closeModal(m);
      }, { passive: false });
    });
  });

  // Click outside to close
  document.addEventListener('click', (e)=>{
    const m = getOpenModal();
    if (!m) return;
    const content = m.querySelector('.modal-content');
    if (!content.contains(e.target) &&
        !e.target.closest('[data-modal-target]') &&
        !e.target.closest('[data-modal-open-and-close]')) {
      closeModal(m);
    }
  }, { passive: true });

  // ESC to close
  document.addEventListener('keydown', (e)=>{
    if (e.key === 'Escape') {
      const m = getOpenModal();
      if (m) closeModal(m);
    }
  });

  // Inside “Sold Usernames” modal: open the chosen platform modal and close the launcher
  document.querySelectorAll('[data-modal-open-and-close]').forEach(btn=>{
    ['click','touchend'].forEach(evt=>{
      btn.addEventListener(evt, (e)=>{
        e.preventDefault();
        const sel = btn.getAttribute('data-modal-open-and-close');
        const current = getOpenModal();
        if (current) closeModal(current);
        if (sel) openModalSafely(sel);
      }, { passive: false });
    });
  });
})();