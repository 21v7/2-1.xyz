(function () {
  const root = document.documentElement; // <html>
  const btn = document.getElementById('themeToggle');
  const bar = document.getElementById('contactBar');

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {}
    if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
  }

  // On load, use whatever was set in <head>
  const current = root.getAttribute('data-theme') || 'light';
  applyTheme(current);

  // Toggle
  if (btn) {
    btn.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
  }

  // Reveal floating bar after load (keeps your slide animation)
  window.addEventListener('load', () => {
    if (bar) bar.classList.add('visible');
  });
})();
