const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

function updateThemeIcon() {
  const theme = html.getAttribute('data-theme');
  themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}

function initTheme() {
  let theme = localStorage.getItem('theme');
  
  if (!theme && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    theme = 'dark';
  } else if (!theme) {
    theme = 'light';
  }
  
  html.setAttribute('data-theme', theme);
  updateThemeIcon();
}

themeToggle.addEventListener('click', function() {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon();
});

window.addEventListener('scroll', function() {
  const contactBar = document.getElementById('contactBar');
  if (window.scrollY > 100) {
    contactBar.classList.add('visible');
  } else {
    contactBar.classList.remove('visible');
  }
});

document.addEventListener('DOMContentLoaded', function() {
  initTheme();
});