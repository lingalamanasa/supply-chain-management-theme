/* =====================================================
   NexChain — SHARED JavaScript
   Navbar, mobile menu, scroll reveal, counters,
   FAQ accordion, ticker, footer newsletter
   ===================================================== */

/* ══════ NAVBAR ══════ */
const navbar = document.getElementById('navbar');
if (navbar) {
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 30);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ══════ HAMBURGER ══════ */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });
}
if (mobileClose) {
  mobileClose.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
}
if (mobileMenu) {
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger && hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ══════ SMOOTH SCROLL ══════ */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      const navH = navbar ? navbar.offsetHeight : 70;
      const top = target.getBoundingClientRect().top + window.scrollY - navH - 8;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ══════ ACTIVE NAV LINK ══════ */
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');
if (sections.length) {
  const sectionObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-38% 0px -38% 0px' });
  sections.forEach(s => sectionObs.observe(s));
}

/* ══════ SCROLL REVEAL ══════ */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });
document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => revealObs.observe(el));

/* ══════ COUNTER ANIMATION ══════ */
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el = e.target;
      const target = parseInt(el.dataset.count);
      let cur = 0;
      const dur = 1800;
      const step = target / (dur / 16);
      const timer = setInterval(() => {
        cur += step;
        if (cur >= target) { cur = target; clearInterval(timer); }
        el.textContent = Math.floor(cur).toLocaleString();
      }, 16);
      counterObs.unobserve(el);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => counterObs.observe(el));

/* ══════ FAQ ACCORDION ══════ */
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    // close all
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

/* ══════ FOOTER NEWSLETTER ══════ */
document.querySelectorAll('.footer-nl').forEach(form => {
  const input = form.querySelector('input');
  const btn = form.querySelector('button');
  if (!btn || !input) return;
  btn.addEventListener('click', () => {
    if (input.value.includes('@')) {
      btn.textContent = '✓ Done!';
      btn.style.background = '#10b981';
      setTimeout(() => { btn.textContent = 'Subscribe'; btn.style.background = ''; input.value = ''; }, 3000);
    }
  });
});

/* ══════ GENERIC FORM SUBMIT (CTA) ══════ */
document.querySelectorAll('.cta-submit').forEach(btn => {
  btn.addEventListener('click', () => {
    window.location.href = '404.html';
  });
});
