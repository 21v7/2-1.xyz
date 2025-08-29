(function () {
  const root = document.documentElement;
  const themeBtn = document.getElementById('themeToggle');
  const bar = document.getElementById('contactBar');

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

  // Contact bar reveal (works in in-app browsers)
  const showBar = () => bar?.classList.add('visible');
  window.addEventListener('load', showBar);
  document.addEventListener('DOMContentLoaded', showBar);
  setTimeout(showBar, 900);

  // ===== Modal System =====
  function getOpenModal(){ return document.querySelector('.modal[aria-hidden="false"]'); }
  function openModal(el){
    if (!el) return;
    el.setAttribute('aria-hidden','false');
    document.documentElement.classList.add('modal-open');
    document.body.classList.add('modal-open');
    (el.querySelector('[data-modal-close]') || el.querySelector('h2'))?.focus();
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

  // open from main launchers
  document.querySelectorAll('[data-modal-target]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const sel = btn.getAttribute('data-modal-target');
      if (sel) openModalSafely(sel);
    }, { passive: true });
  });

  // close buttons
  document.querySelectorAll('[data-modal-close]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const m = btn.closest('.modal');
      closeModal(m);
    }, { passive: true });
  });

  // click outside to close
  document.addEventListener('click', (e)=>{
    const m = getOpenModal();
    if (!m) return;
    const content = m.querySelector('.modal-content');
    if (!content.contains(e.target) && !e.target.closest('[data-modal-target]') && !e.target.closest('[data-modal-open-and-close]')){
      closeModal(m);
    }
  });

  // ESC to close
  document.addEventListener('keydown', (e)=>{
    if (e.key === 'Escape') {
      const m = getOpenModal();
      if (m) closeModal(m);
    }
  });

  // open-next-and-close-current (used inside Sold launcher modal)
  document.querySelectorAll('[data-modal-open-and-close]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const sel = btn.getAttribute('data-modal-open-and-close');
      const current = getOpenModal();
      if (current) closeModal(current);
      if (sel) openModalSafely(sel);
    }, { passive: true });
  });
})();