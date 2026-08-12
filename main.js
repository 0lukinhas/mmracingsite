/* ============================================================
   MM RACING FUEL — main.js
   Handles: Navigation, Mobile Menu, Scroll Reveal, Cart, WhatsApp
   ============================================================ */

(function () {
    'use strict';

    const WA_NUMBER = '5511922880177';

    /* ── DOM References ─────────────────────────────────────── */
    const navbar       = document.getElementById('navbar');
    const hamburger    = document.getElementById('hamburger-btn');
    const mobileMenu   = document.getElementById('mobile-menu');
    const mobileLinks  = document.querySelectorAll('[data-mobile-link]');
    const navLinks     = document.querySelectorAll('.nav-link');
    const yearEl       = document.getElementById('year');

    // Cart
    const cartFab      = document.getElementById('cart-fab-btn');
    const cartCount    = document.getElementById('cart-count');
    const cartOverlay  = document.getElementById('cart-overlay');
    const cartDrawer   = document.getElementById('cart-drawer');
    const cartCloseBtn = document.getElementById('cart-close-btn');
    const cartItemsList= document.getElementById('cart-items-list');
    const cartEmpty    = document.getElementById('cart-empty');
    const btnQuote     = document.getElementById('btn-quote-whatsapp');

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
    handleNavScroll();

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

    mobileLinks.forEach(function (link) {
        link.addEventListener('click', function () { closeMenu(); });
    });

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
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12 }
    );

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
       7. SPLIT-IMAGE CARDS — MOBILE TOUCH COLOR REVEAL
    ───────────────────────────────────────────────────────── */
    var splitCards = document.querySelectorAll('.mod-card-split');
    splitCards.forEach(function (card) {
        card.addEventListener('touchstart', function () {
            splitCards.forEach(function (c) {
                if (c !== card) c.classList.remove('touched');
            });
            card.classList.toggle('touched');
        }, { passive: true });
    });

    document.addEventListener('scroll', function () {
        splitCards.forEach(function (c) { c.classList.remove('touched'); });
    }, { passive: true });

    /* ─────────────────────────────────────────────────────────
       8. SHOPPING CART
    ───────────────────────────────────────────────────────── */

    // Cart state: { productName: quantity }
    var cart = {};

    function getTotalItems() {
        return Object.values(cart).reduce(function (sum, qty) { return sum + qty; }, 0);
    }

    function updateCartCount() {
        var total = getTotalItems();
        cartCount.textContent = total;

        // Pop animation
        cartCount.classList.remove('pop');
        void cartCount.offsetWidth; // reflow to restart animation
        cartCount.classList.add('pop');
    }

    function openCart() {
        cartDrawer.classList.add('open');
        cartOverlay.classList.add('open');
        cartDrawer.setAttribute('aria-hidden', 'false');
        cartFab.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
        renderCart();
    }

    function closeCart() {
        cartDrawer.classList.remove('open');
        cartOverlay.classList.remove('open');
        cartDrawer.setAttribute('aria-hidden', 'true');
        cartFab.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    function addToCart(productName, btn) {
        if (cart[productName]) {
            cart[productName]++;
        } else {
            cart[productName] = 1;
        }

        updateCartCount();

        // Visual feedback on the button
        var originalHTML = btn.innerHTML;
        btn.classList.add('added');
        btn.innerHTML = '<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg><span>Adicionado!</span>';
        btn.disabled = true;

        setTimeout(function () {
            btn.classList.remove('added');
            btn.innerHTML = originalHTML;
            btn.disabled = false;
        }, 1500);
    }

    function removeFromCart(productName) {
        delete cart[productName];
        updateCartCount();
        renderCart();
    }

    function changeQty(productName, delta) {
        if (!cart[productName]) return;
        cart[productName] += delta;
        if (cart[productName] <= 0) {
            delete cart[productName];
        }
        updateCartCount();
        renderCart();
    }

    function renderCart() {
        var products = Object.keys(cart);

        // Clear existing items (keep the empty state element)
        var existingItems = cartItemsList.querySelectorAll('.cart-item');
        existingItems.forEach(function (el) { el.remove(); });

        if (products.length === 0) {
            cartEmpty.style.display = 'flex';
            btnQuote.disabled = true;
            return;
        }

        cartEmpty.style.display = 'none';
        btnQuote.disabled = false;

        products.forEach(function (name) {
            var qty = cart[name];
            var item = document.createElement('div');
            item.className = 'cart-item';
            item.setAttribute('role', 'listitem');
            item.innerHTML =
                '<div class="cart-item-info">' +
                    '<div class="cart-item-name">' + name + '</div>' +
                    '<div class="cart-item-controls">' +
                        '<button class="cart-qty-btn" data-action="decrease" data-product="' + name + '" aria-label="Diminuir quantidade de ' + name + '">−</button>' +
                        '<span class="cart-item-qty" aria-label="Quantidade: ' + qty + '">' + qty + '</span>' +
                        '<button class="cart-qty-btn" data-action="increase" data-product="' + name + '" aria-label="Aumentar quantidade de ' + name + '">+</button>' +
                    '</div>' +
                '</div>' +
                '<button class="cart-item-remove" data-product="' + name + '" aria-label="Remover ' + name + ' do carrinho">' +
                    '<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>' +
                '</button>';

            cartItemsList.appendChild(item);

            // Qty buttons
            item.querySelectorAll('.cart-qty-btn').forEach(function (btn) {
                btn.addEventListener('click', function () {
                    var action = btn.getAttribute('data-action');
                    var product = btn.getAttribute('data-product');
                    changeQty(product, action === 'increase' ? 1 : -1);
                });
            });

            // Remove button
            var removeBtn = item.querySelector('.cart-item-remove');
            removeBtn.addEventListener('click', function () {
                removeFromCart(removeBtn.getAttribute('data-product'));
            });
        });
    }

    function buildWhatsAppMessage() {
        var lines = [
            'Olá! Gostaria de cotar os seguintes produtos MM Racing Fuel:',
            ''
        ];

        Object.keys(cart).forEach(function (name) {
            lines.push('• ' + name + ' — Qtd: ' + cart[name]);
        });

        lines.push('');
        lines.push('Aguardo retorno. Obrigado!');

        return lines.join('\n');
    }

    // Cart FAB click
    if (cartFab) {
        cartFab.addEventListener('click', function () {
            var isOpen = cartDrawer.classList.contains('open');
            isOpen ? closeCart() : openCart();
        });
    }

    // Close cart
    if (cartCloseBtn) {
        cartCloseBtn.addEventListener('click', closeCart);
    }
    if (cartOverlay) {
        cartOverlay.addEventListener('click', closeCart);
    }

    // ESC closes cart
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && cartDrawer.classList.contains('open')) {
            closeCart();
        }
    });

    // "Add to Cart" buttons on product cards
    document.querySelectorAll('.btn-add-cart').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var productName = btn.getAttribute('data-product');
            addToCart(productName, btn);
        });
    });

    // WhatsApp quote button
    if (btnQuote) {
        btnQuote.addEventListener('click', function () {
            if (getTotalItems() === 0) return;
            var msg = buildWhatsAppMessage();
            var url = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg);
            window.open(url, '_blank', 'noopener,noreferrer');
        });
    }

    /* ─────────────────────────────────────────────────────────
       9. MERCH FILTER BUTTONS
    ───────────────────────────────────────────────────────── */
    const filterBtns = document.querySelectorAll('.merch-filter-btn');
    const merchCards  = document.querySelectorAll('.merch-card');

    filterBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            filterBtns.forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');

            var filter = btn.getAttribute('data-filter');

            merchCards.forEach(function (card) {
                if (filter === 'todos') {
                    card.classList.remove('hidden');
                } else {
                    var category = card.getAttribute('data-category');
                    if (category === filter) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                }
            });
        });
    });

    /* ─────────────────────────────────────────────────────────
       9. MERCH "COMPRAR" BUTTONS
    ───────────────────────────────────────────────────────── */
    document.querySelectorAll('.btn-buy').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var card = btn.closest('.merch-card');
            var productName = card.querySelector('h3').textContent;
            var msg = 'Olá! Tenho interesse em comprar: ' + productName + '. Poderia me passar mais informações?';
            var url = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg);
            window.open(url, '_blank', 'noopener,noreferrer');
        });
    });

    /* ─────────────────────────────────────────────────────────
       10. INSTAGRAM EMBED — HIDE WRAPPER IF SCRIPT LOADS
    ───────────────────────────────────────────────────────── */
    // The Instagram embed.js will render the blockquote into an iframe.
    // If the page is served locally (file://) the embed won't load;
    // the fallback CTA remains visible as a backup.
    // When served via HTTP, the blockquote gets replaced by the iframe and the
    // fallback is hidden automatically by Instagram's script.
    // We add a small check: if after 3s the iframe exists, hide fallback.
    setTimeout(function () {
        var igFrame = document.querySelector('.instagram-embed-wrapper iframe');
        var fallback = document.getElementById('instagram-fallback');
        if (igFrame && fallback) {
            fallback.style.display = 'none';
        }
    }, 3000);

})();
