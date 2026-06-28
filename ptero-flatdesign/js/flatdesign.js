/**
 * FlatDesign Theme — JS
 * by fidzzcodex
 * - Dark/Light mode toggle (persisted to localStorage)
 * - Guard: skip admin pages & console
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'fd-theme';
  const DEFAULT_THEME = 'dark';

  // ── Guard: jangan inject di admin ─────────────────────────────
  const path = window.location.pathname;
  if (path.startsWith('/admin')) return;

  // ── Apply theme ───────────────────────────────────────────────
  function applyTheme(theme) {
    document.body.classList.remove('fd-dark', 'fd-light');
    document.body.classList.add(theme === 'light' ? 'fd-light' : 'fd-dark');
    localStorage.setItem(STORAGE_KEY, theme);
    updateToggleIcon(theme);
  }

  function getCurrentTheme() {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_THEME;
  }

  function updateToggleIcon(theme) {
    const btn = document.getElementById('fd-theme-toggle');
    if (!btn) return;
    btn.innerHTML = theme === 'light'
      ? `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`
      : `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
    btn.setAttribute('title', theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode');
  }

  // ── Inject toggle button ──────────────────────────────────────
  function injectToggle() {
    if (document.getElementById('fd-theme-toggle')) return;

    const btn = document.createElement('button');
    btn.id = 'fd-theme-toggle';
    btn.setAttribute('aria-label', 'Toggle dark/light mode');

    btn.addEventListener('click', () => {
      const current = getCurrentTheme();
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });

    document.body.appendChild(btn);
    updateToggleIcon(getCurrentTheme());
  }

  // ── Console guard: revert CSS on console page ─────────────────
  function guardConsole() {
    // Pterodactyl console path pattern: /server/{id}/console
    if (path.includes('/console')) {
      // Remove theme class so console renders natively
      document.body.classList.remove('fd-dark', 'fd-light');

      // Remove injected stylesheet from console page
      document.querySelectorAll('link[href*="flatdesign"]').forEach(el => {
        el.disabled = true;
      });
    }
  }

  // ── Init ──────────────────────────────────────────────────────
  function init() {
    guardConsole();

    // Apply default/saved theme
    applyTheme(getCurrentTheme());

    // Inject toggle button after DOM ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', injectToggle);
    } else {
      injectToggle();
    }
  }

  // ── Run ───────────────────────────────────────────────────────
  init();

  // ── SPA route change guard (React Router) ────────────────────
  // Pterodactyl uses React — watch for route changes
  let lastPath = path;
  const observer = new MutationObserver(() => {
    const currentPath = window.location.pathname;
    if (currentPath !== lastPath) {
      lastPath = currentPath;

      // Re-guard on each navigation
      if (currentPath.startsWith('/admin')) {
        document.body.classList.remove('fd-dark', 'fd-light');
        return;
      }

      if (currentPath.includes('/console')) {
        document.body.classList.remove('fd-dark', 'fd-light');
        return;
      }

      // Re-apply theme on normal pages
      applyTheme(getCurrentTheme());
      injectToggle();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: false,
  });

})();
