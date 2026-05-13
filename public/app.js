/**
 * Luxe Arabia Theme — Main JavaScript
 * Uses: Vanilla JS + Alpine.js (loaded separately) + Salla SDK
 */

'use strict';

// ═══════════════════════════════════════════
// Utility Functions
// ═══════════════════════════════════════════

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

function showToast(msg, duration = 3000) {
  const toast = $('#toast');
  const msgEl = $('#toast-message');
  if (!toast || !msgEl) return;
  msgEl.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), duration);
}

window.showToast = showToast;

// ═══════════════════════════════════════════
// Header: Sticky + Hide on Scroll Down
// ═══════════════════════════════════════════

(function initStickyHeader() {
  const header = $('#site-header');
  if (!header) return;

  let lastY = 0;
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        header.classList.toggle('scrolled', currentY > 10);
        // Hide on scroll down (past 200px), show on scroll up
        if (currentY > 200) {
          header.classList.toggle('hidden', currentY > lastY + 5);
        } else {
          header.classList.remove('hidden');
        }
        lastY = currentY;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

// ═══════════════════════════════════════════
// Mobile Navigation
// ═══════════════════════════════════════════

(function initMobileNav() {
  const hamburger = $('#hamburger');
  const mobileNav = $('#mobile-nav');
  const closeBtn  = $('#close-mobile-nav');
  const overlay   = $('#nav-overlay');

  function openNav() {
    mobileNav?.classList.add('open');
    overlay?.classList.add('open');
    hamburger?.classList.add('open');
    hamburger?.setAttribute('aria-expanded', 'true');
    mobileNav?.removeAttribute('aria-hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    mobileNav?.classList.remove('open');
    overlay?.classList.remove('open');
    hamburger?.classList.remove('open');
    hamburger?.setAttribute('aria-expanded', 'false');
    mobileNav?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  hamburger?.addEventListener('click', openNav);
  closeBtn?.addEventListener('click', closeNav);
  overlay?.addEventListener('click', closeNav);

  // Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeNav();
  });

  // Sub-menu toggles
  $$('[data-toggle-sub]').forEach(btn => {
    btn.addEventListener('click', function() {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !expanded);
      this.nextElementSibling?.classList.toggle('open', !expanded);
    });
  });
})();

// ═══════════════════════════════════════════
// Search Overlay
// ═══════════════════════════════════════════

(function initSearch() {
  const trigger  = $('#search-trigger');
  const overlay  = $('#search-overlay');
  const input    = $('#search-input');
  const results  = $('#search-results');
  const navOverlay = $('#nav-overlay');
  let debounceTimer;

  function openSearch() {
    overlay?.classList.add('open');
    navOverlay?.classList.add('open');
    trigger?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    setTimeout(() => input?.focus(), 100);
  }

  function closeSearch() {
    overlay?.classList.remove('open');
    navOverlay?.classList.remove('open');
    trigger?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    if (results) results.innerHTML = '';
    if (input) input.value = '';
  }

  trigger?.addEventListener('click', openSearch);

  navOverlay?.addEventListener('click', closeSearch);

  overlay?.addEventListener('click', (e) => {
    if (e.target === overlay) closeSearch();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay?.classList.contains('open')) closeSearch();
    // Ctrl/Cmd + K to open search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      openSearch();
    }
  });

  // Live Search
  input?.addEventListener('input', function() {
    clearTimeout(debounceTimer);
    const q = this.value.trim();
    if (q.length < 2) {
      if (results) results.innerHTML = '';
      return;
    }
    debounceTimer = setTimeout(async () => {
      try {
        const data = await Salla.product.search({ q, per_page: 5 });
        if (!results) return;
        if (!data.data || data.data.length === 0) {
          results.innerHTML = `<p style="text-align:center;color:var(--color-text-muted);padding:24px">لا توجد نتائج</p>`;
          return;
        }
        results.innerHTML = data.data.map(p => `
          <a class="search-overlay__result-item" href="${p.url}" role="option">
            <img src="${p.thumbnail}" alt="${p.name}" loading="lazy">
            <div>
              <p style="font-weight:600;color:var(--color-text);font-size:.875rem">${p.name}</p>
              <p style="font-size:.875rem;color:var(--color-accent);font-weight:700" dir="ltr">${p.price.formatted}</p>
            </div>
          </a>
        `).join('');
      } catch(e) {
        // Silent fail
      }
    }, 350);
  });
})();

// ═══════════════════════════════════════════
// Cart Drawer
// ═══════════════════════════════════════════

(function initCartDrawer() {
  const cartTrigger = $('#cart-trigger');
  const cartDrawer  = $('#cart-drawer');
  const closeCart   = $('#close-cart');
  const overlay     = $('#nav-overlay');

  function openCart() {
    cartDrawer?.classList.add('open');
    overlay?.classList.add('open');
    cartTrigger?.setAttribute('aria-expanded', 'true');
    cartDrawer?.removeAttribute('aria-hidden');
    document.body.style.overflow = 'hidden';
    closeCart?.focus();
  }

  function closeCartFn() {
    cartDrawer?.classList.remove('open');
    overlay?.classList.remove('open');
    cartTrigger?.setAttribute('aria-expanded', 'false');
    cartDrawer?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  cartTrigger?.addEventListener('click', openCart);
  closeCart?.addEventListener('click', closeCartFn);
  overlay?.addEventListener('click', closeCartFn);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cartDrawer?.classList.contains('open')) closeCartFn();
  });

  window.luxeCart = { refresh: refreshCartDrawer };

  async function refreshCartDrawer() {
    try {
      const cart = await Salla.cart.get();
      const items = $('#cart-drawer-items');
      if (!items) return;
      // Update count badges
      $$('.cart-count').forEach(el => {
        el.textContent = cart.data.count || '';
        el.style.display = cart.data.count ? '' : 'none';
      });
    } catch(e) {}
  }

  // Remove from drawer
  document.addEventListener('click', async (e) => {
    const removeBtn = e.target.closest('[data-remove-item]');
    if (removeBtn) {
      const itemId = removeBtn.dataset.removeItem;
      try {
        await Salla.cart.deleteItem(itemId);
        removeBtn.closest('[data-item-id]')?.remove();
      } catch(e) {}
    }
  });
})();

// ═══════════════════════════════════════════
// Add to Cart (product cards)
// ═══════════════════════════════════════════

document.addEventListener('click', async (e) => {
  const btn = e.target.closest('[data-add-to-cart]');
  if (!btn) return;
  const productId = btn.dataset.addToCart;
  if (!productId) return;

  const original = btn.innerHTML;
  btn.classList.add('loading');
  btn.disabled = true;

  try {
    await Salla.cart.add({ product_id: productId, quantity: 1 });
    btn.innerHTML = '✓';
    showToast('تمت الإضافة إلى السلة');
    setTimeout(() => {
      btn.innerHTML = original;
      btn.classList.remove('loading');
      btn.disabled = false;
    }, 1500);
  } catch(err) {
    btn.classList.remove('loading');
    btn.disabled = false;
    showToast('حدث خطأ، يرجى المحاولة مجدداً');
  }
});

// ═══════════════════════════════════════════
// Wishlist Toggle
// ═══════════════════════════════════════════

document.addEventListener('click', async (e) => {
  const btn = e.target.closest('[data-wishlist-toggle]');
  if (!btn) return;
  const productId = btn.dataset.wishlistToggle;
  try {
    const res = await Salla.wishlist.toggle(productId);
    const inWishlist = res.data?.in_wishlist;
    $$(`[data-wishlist-id="${productId}"]`).forEach(b => {
      b.classList.toggle('active', inWishlist);
      b.setAttribute('aria-pressed', inWishlist ? 'true' : 'false');
    });
    showToast(inWishlist ? 'تمت الإضافة إلى المفضلة' : 'تمت الإزالة من المفضلة');
  } catch(e) {}
});

// ═══════════════════════════════════════════
// Countdown Timer
// ═══════════════════════════════════════════

(function initCountdowns() {
  const timers = $$('[data-countdown]');
  timers.forEach(timer => {
    const endDate = new Date(timer.dataset.countdown).getTime();
    if (isNaN(endDate)) return;

    const hoursEl   = timer.querySelector('[data-countdown-hours]');
    const minutesEl = timer.querySelector('[data-countdown-minutes]');
    const secondsEl = timer.querySelector('[data-countdown-seconds]');

    function update() {
      const diff = endDate - Date.now();
      if (diff <= 0) {
        if (hoursEl)   hoursEl.textContent   = '00';
        if (minutesEl) minutesEl.textContent = '00';
        if (secondsEl) secondsEl.textContent = '00';
        clearInterval(interval);
        return;
      }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      if (hoursEl)   hoursEl.textContent   = String(h).padStart(2, '0');
      if (minutesEl) minutesEl.textContent = String(m).padStart(2, '0');
      if (secondsEl) secondsEl.textContent = String(s).padStart(2, '0');
    }

    update();
    const interval = setInterval(update, 1000);
  });
})();

// ═══════════════════════════════════════════
// Lazy Image Observer
// ═══════════════════════════════════════════

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        observer.unobserve(img);
      }
    });
  }, { rootMargin: '200px' });

  $$('img[data-src]').forEach(img => observer.observe(img));
}

// ═══════════════════════════════════════════
// Dark Mode Toggle
// ═══════════════════════════════════════════

(function initDarkMode() {
  const stored = localStorage.getItem('luxe-theme');
  if (stored) {
    document.documentElement.setAttribute('data-theme', stored);
  }

  window.toggleDarkMode = function() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('luxe-theme', next);
  };
})();

// ═══════════════════════════════════════════
// Nav Dropdown Keyboard Support
// ═══════════════════════════════════════════

$$('.nav__item').forEach(item => {
  const link = item.querySelector('.nav__link[aria-haspopup]');
  const dropdown = item.querySelector('.mega-menu, .dropdown-menu');

  if (!link || !dropdown) return;

  link.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const expanded = link.getAttribute('aria-expanded') === 'true';
      link.setAttribute('aria-expanded', !expanded);
    }
  });

  item.addEventListener('mouseleave', () => {
    link.setAttribute('aria-expanded', 'false');
  });
});

// ═══════════════════════════════════════════
// Smooth Scroll for anchor links
// ═══════════════════════════════════════════

document.addEventListener('click', (e) => {
  const anchor = e.target.closest('a[href^="#"]');
  if (!anchor) return;
  const target = document.querySelector(anchor.getAttribute('href'));
  if (!target) return;
  e.preventDefault();
  const headerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 80;
  window.scrollTo({
    top: target.getBoundingClientRect().top + window.scrollY - headerHeight - 16,
    behavior: 'smooth',
  });
});

// ═══════════════════════════════════════════
// Init on DOMContentLoaded
// ═══════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  // Remove no-js class if exists
  document.documentElement.classList.remove('no-js');

  // Animate elements on scroll
  if ('IntersectionObserver' in window) {
    const animObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          animObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    $$('[data-animate]').forEach(el => animObserver.observe(el));
  }
});
