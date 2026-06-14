// nav.js — injecte la nav et le menu mobile communs
document.addEventListener('DOMContentLoaded', function () {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const isInSubfolder = window.location.pathname.includes('/projets/');
  const root = isInSubfolder ? '../' : '';

  const pages = [
    { href: root + 'index.html', label: 'Accueil', id: 'index.html' },
    { href: root + 'about.html', label: 'À propos', id: 'about.html' },
    { href: root + 'projects.html', label: 'Projets', id: 'projects.html' },
    { href: root + 'bilan.html', label: 'Bilan BUT1', id: 'bilan.html' },
    { href: root + 'contact.html', label: 'Contact', id: 'contact.html' },
  ];

  const navEl = document.getElementById('main-nav');
  if (!navEl) return;

  navEl.innerHTML = `
    <a class="nav-brand" href="${root}index.html">ST</a>
    <ul class="nav-links">
      ${pages.map(p => `<li><a href="${p.href}" class="${currentPage === p.id || (isInSubfolder && p.id === 'projects.html') ? 'active' : ''}">${p.label}</a></li>`).join('')}
    </ul>
    <div class="hamburger" onclick="document.getElementById('mobileMenu').classList.add('open')">
      <span></span><span></span><span></span>
    </div>
    <button class="theme-toggle" onclick="toggleTheme()" title="Changer de thème" aria-label="Changer de thème">
      <svg class="icon-moon" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
      <svg class="icon-sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
    </button>
  `;

  const mobileEl = document.getElementById('mobileMenu');
  if (mobileEl) {
    mobileEl.innerHTML = `
      <button class="mobile-close" onclick="document.getElementById('mobileMenu').classList.remove('open')">✕</button>
      ${pages.map(p => `<a href="${p.href}">${p.label}</a>`).join('')}
    `;
  }
});

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
}
(function initTheme() {
  const saved = localStorage.getItem('theme');
  if (saved) { document.documentElement.setAttribute('data-theme', saved); return; }
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
