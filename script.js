// script.js
(function () {
  const root = document.documentElement;
  const themeBtn = document.getElementById('themeToggle');
  const bar = document.getElementById('contactBar');

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch (e) {}
    if (themeBtn) themeBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
  }

  // init theme from <head> value or light
  applyTheme(root.getAttribute('data-theme') || 'light');

  // toggle theme
  themeBtn?.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  });

  // show floating bar after load for animation
  window.addEventListener('load', () => bar?.classList.add('visible'));

  // ===== Filter logic =====
  const filterBar = document.getElementById('filterBar');
  const categories = Array.from(document.querySelectorAll('.category'));
  const buttons = Array.from(document.querySelectorAll('.filter'));

  function setActive(btn) {
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }

  function applyFilter(key) {
    categories.forEach(cat => {
      const type = cat.getAttribute('data-category');
      const show = (key === 'all' || key === type);
      cat.style.display = show ? '' : 'none';
    });
  }

  // click handling
  filterBar?.addEventListener('click', (e) => {
    const btn = e.target.closest('button.filter[data-filter]');
    if (!btn) return;
    setActive(btn);
    applyFilter(btn.getAttribute('data-filter'));
  });

  // ensure default is "All"
  const allBtn = document.querySelector('.filter[data-filter="all"]');
  if (allBtn) {
    setActive(allBtn);
    applyFilter('all');
  } else {
    // safety fallback
    applyFilter('all');
  }
})();
