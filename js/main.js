(() => {
  const root = document.documentElement;
  const THEME_KEY = 'portfolio-theme';

  function applyTheme(theme) {
    if (theme === 'system') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', theme);
    }
    document.querySelectorAll('[data-theme-btn]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.themeBtn === theme);
    });
  }

  const savedTheme = localStorage.getItem(THEME_KEY) || 'system';
  applyTheme(savedTheme);

  document.querySelectorAll('[data-theme-btn]').forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.dataset.themeBtn;
      localStorage.setItem(THEME_KEY, theme);
      applyTheme(theme);
    });
  });

  // Mobile sidebar drawer
  const sidebar = document.getElementById('sidebar');
  const scrim = document.getElementById('scrim');
  const menuToggle = document.getElementById('menu-toggle');
  function openDrawer() {
    sidebar.classList.add('mobile-open');
    scrim.classList.add('show');
  }
  function closeDrawer() {
    sidebar.classList.remove('mobile-open');
    scrim.classList.remove('show');
  }
  if (menuToggle) menuToggle.addEventListener('click', openDrawer);
  if (scrim) scrim.addEventListener('click', closeDrawer);
  document.querySelectorAll('.side-nav a').forEach(a => a.addEventListener('click', closeDrawer));

  // Active nav tracking
  const navLinks = document.querySelectorAll('.side-nav a[data-nav]');
  const navMap = new Map();
  navLinks.forEach(link => {
    const id = link.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) navMap.set(el, link);
  });
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const link = navMap.get(entry.target);
      if (!link) return;
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
  navMap.forEach((_, el) => navObserver.observe(el));

  // Showcase accordion
  document.querySelectorAll('[data-trigger]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const row = trigger.closest('[data-row]');
      const wasOpen = row.classList.contains('open');
      row.parentElement.querySelectorAll('[data-row]').forEach(r => r.classList.remove('open'));
      if (!wasOpen) row.classList.add('open');
    });
  });
})();
