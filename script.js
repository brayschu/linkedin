/**
 * Brayden Schuler — Personal Website
 * JavaScript: Navigation scroll effects, mobile menu, and section fade-ins.
 *
 * This file is intentionally minimal. There are no frameworks or build steps.
 * Edit or extend as needed.
 */

(function () {
  'use strict';

  const header     = document.getElementById('site-header');
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav  = document.getElementById('mobileNav');
  const navLinks   = document.querySelectorAll('.nav-links a');
  const sections   = document.querySelectorAll('section[id]');

  // ── Navbar: add border/shadow when page is scrolled ──────────────
  function onScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 16);
    highlightActiveLink();
  }

  window.addEventListener('scroll', onScroll, { passive: true });


  // ── Mobile menu toggle ────────────────────────────────────────────
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', function () {
      const isOpen = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!isOpen));
      mobileNav.hidden = isOpen;
    });

    // Close menu when a link is tapped
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileNav.hidden = true;
      });
    });
  }


  // ── Active nav link: highlight based on current scroll position ───
  function highlightActiveLink() {
    const scrollMid = window.scrollY + window.innerHeight / 3;

    sections.forEach(function (section) {
      const top    = section.offsetTop;
      const bottom = top + section.offsetHeight;

      if (scrollMid >= top && scrollMid < bottom) {
        navLinks.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + section.id);
        });
      }
    });
  }


  // ── Section fade-in on scroll ─────────────────────────────────────
  // Add .fade-in class to elements that should animate.
  // Uses IntersectionObserver — no effect if user prefers reduced motion.

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    const fadeTargets = document.querySelectorAll(
      '.role, .edu-entry, .skill-group, .about-facts, .goals-interests, .contact-item, .about-prose, .goals-prose'
    );

    fadeTargets.forEach(function (el) {
      el.classList.add('fade-in');
    });

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
    );

    fadeTargets.forEach(function (el) {
      observer.observe(el);
    });
  }


  // ── Initial call to set correct state on load ─────────────────────
  onScroll();

})();
