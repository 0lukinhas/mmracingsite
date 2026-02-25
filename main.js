/* ============================================================
   MM RACING FUEL — main.js
   Handles: Navigation, Mobile Menu, Scroll Reveal, Form
   ============================================================ */

(function () {
    'use strict';

    /* ── DOM References ─────────────────────────────────────── */
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('[data-mobile-link]');
    const navLinks = document.querySelectorAll('.nav-link');
    const yearEl = document.getElementById('year');
    const form = document.getElementById('newsletter-form');

    /* ─────────────────────────────────────────────────────────
       1. CURRENT YEAR IN FOOTER
    ───────────────────────────────────────────────────────── */
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ─────────────────────────────────────────────────────────
       2. NAVBAR — SCROLL STYLE
    ───────────────────────────────────────────────────────── */
    function handleNavScroll() {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll(); // run on load

    /* ─────────────────────────────────────────────────────────
       3. MOBILE MENU — TOGGLE
    ───────────────────────────────────────────────────────── */
    function openMenu() {
        hamburger.classList.add('open');
        mobileMenu.classList.add('open');
        mobileMenu.setAttribute('aria-hidden', 'false');
        hamburger.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        mobileMenu.setAttribute('aria-hidden', 'true');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', function () {
        const isOpen = mobileMenu.classList.contains('open');
        isOpen ? closeMenu() : openMenu();
    });

    // Close on any mobile link click
    mobileLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            closeMenu();
        });
    });

    // Close on ESC key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
            closeMenu();
            hamburger.focus();
        }
    });

    /* ─────────────────────────────────────────────────────────
       4. ACTIVE NAV LINK — INTERSECTION OBSERVER
    ───────────────────────────────────────────────────────── */
    const sections = document.querySelectorAll('section[id], div[id="contato"]');

    const sectionObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    navLinks.forEach(function (link) {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#' + id) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        },
        { rootMargin: '-40% 0px -55% 0px' }
    );

    sections.forEach(function (section) { sectionObserver.observe(section); });

    /* ─────────────────────────────────────────────────────────
       5. SCROLL REVEAL — INTERSECTION OBSERVER
    ───────────────────────────────────────────────────────── */
    const revealEls = document.querySelectorAll(
        '.reveal, .reveal-hero, .reveal-left, .reveal-right'
    );

    const revealObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target); // animate once
                }
            });
        },
        { threshold: 0.12 }
    );

    // Hero content — trigger immediately (above the fold)
    const heroContent = document.querySelector('.reveal-hero');
    if (heroContent) {
        setTimeout(function () { heroContent.classList.add('visible'); }, 100);
    }

    revealEls.forEach(function (el) {
        if (!el.classList.contains('reveal-hero')) {
            revealObserver.observe(el);
        }
    });

    /* ─────────────────────────────────────────────────────────
       6. SMOOTH SCROLL FOR ALL ANCHOR LINKS
    ───────────────────────────────────────────────────────── */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();
            const navHeight = navbar ? navbar.offsetHeight : 0;
            const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;

            window.scrollTo({ top: targetTop, behavior: 'smooth' });
        });
    });

    /* ─────────────────────────────────────────────────────────
       7. NEWSLETTER FORM SUBMISSION
    ───────────────────────────────────────────────────────── */
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const nome = form.querySelector('#field-nome').value.trim();
            const sobrenome = form.querySelector('#field-sobrenome').value.trim();
            const email = form.querySelector('#field-email').value.trim();
            const btn = document.getElementById('form-submit-btn');

            if (!nome || !sobrenome || !email) return;

            // Simulate async submission
            btn.textContent = 'Enviando...';
            btn.disabled = true;

            setTimeout(function () {
                btn.textContent = '✓ Inscrito!';
                btn.style.background = '#15803d';
                form.reset();

                setTimeout(function () {
                    btn.textContent = 'Acelerar';
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            }, 900);
        });
    }

    /* ─────────────────────────────────────────────────────────
       8. PRODUCT "VER FICHA TÉCNICA" BUTTONS (placeholder)
    ───────────────────────────────────────────────────────── */
    document.querySelectorAll('.btn-outline-sm').forEach(function (btn) {
        btn.addEventListener('click', function () {
            const productName = btn.closest('.product-card').querySelector('.product-name').textContent;
            // Placeholder alert — replace with modal or PDF link later
            alert('Ficha técnica de ' + productName + ' em breve disponível.\nEntre em contato com nosso representante.');
        });
    });

})();
