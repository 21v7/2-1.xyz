// script.js
(function () {
  const btn = document.getElementById('themeToggle');
  const root = document.documentElement; // <html>

  // 1) Resolve initial theme (localStorage -> OS preference -> light)
  const stored = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = stored || (prefersDark ? 'dark' : 'light');

  applyTheme(initial);

  // 2) Toggle on click
  if (btn) {
    btn.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    // Update button icon
    if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
})();
