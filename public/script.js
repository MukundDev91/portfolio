(function () {
  'use strict';

  /* Footer year */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Theme toggle (light/dark) — the actual data-theme attribute is set
     synchronously in <head> before paint to avoid a flash; this just wires
     up the buttons and keeps their labels in sync. */
  var themeToggles = [document.getElementById('theme-toggle'), document.getElementById('theme-toggle-mobile')]
    .filter(Boolean);
  var themeLabel = document.querySelector('.theme-toggle-label');

  function syncThemeLabels() {
    var isLight = document.documentElement.getAttribute('data-theme') === 'light';
    var nextLabel = isLight ? 'Switch to dark theme' : 'Switch to light theme';
    themeToggles.forEach(function (btn) { btn.setAttribute('aria-label', nextLabel); });
    if (themeLabel) themeLabel.textContent = isLight ? 'Dark mode' : 'Light mode';
  }
  syncThemeLabels();

  if (themeToggles.length) {
    themeToggles.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var isLight = document.documentElement.getAttribute('data-theme') === 'light';
        var next = isLight ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', next);
        try { localStorage.setItem('theme', next); } catch (e) {}
        syncThemeLabels();
      });
    });
  }

  /* Mobile menu */
  var menuToggle = document.getElementById('nav-toggle');
  var mobileMenu = document.getElementById('mobile-menu');

  function closeMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function openMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.add('open');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.contains('open');
      isOpen ? closeMenu() : openMenu();
    });
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* Active nav link highlighting */
  var sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-links a'));

  if (sections.length && navLinks.length) {
    var navTicking = false;
    var setActiveLink = function () {
      var scrollPos = window.scrollY + 140; // clears the sticky nav + a little buffer
      var current = sections[0];
      for (var i = 0; i < sections.length; i++) {
        if (sections[i].offsetTop <= scrollPos) current = sections[i];
      }
      var atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) current = sections[sections.length - 1];
      var link = document.querySelector('.nav-links a[href="#' + current.id + '"]');
      navLinks.forEach(function (l) { l.classList.remove('active'); });
      if (link) link.classList.add('active');
      navTicking = false;
    };
    window.addEventListener('scroll', function () {
      if (!navTicking) {
        window.requestAnimationFrame(setActiveLink);
        navTicking = true;
      }
    }, { passive: true });
    setActiveLink();
  }

  /* Scroll reveal */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if (revealEls.length && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  /* Engineering-snapshot metric detail toggles */
  document.querySelectorAll('.metric-info-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var targetId = btn.getAttribute('aria-controls');
      var panel = document.getElementById(targetId);
      if (!panel) return;
      var isOpen = panel.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(isOpen));
    });
  });

  /* Only one project case study open at a time (cleaner scanning) */
  var projectDetails = Array.prototype.slice.call(document.querySelectorAll('.project-card > details'));
  projectDetails.forEach(function (details) {
    details.addEventListener('toggle', function () {
      if (details.open) {
        projectDetails.forEach(function (other) {
          if (other !== details) other.open = false;
        });
      }
    });
  });
})();
