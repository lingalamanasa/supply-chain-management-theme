/* =====================================================
   NexChain — Supply Chain Platform JS
   Matching Stackly Travel site interaction style
   ===================================================== */

/* ══════════════ NAVBAR SCROLL ══════════════ */
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });
}

/* ══════════════ HAMBURGER MENU ══════════════ */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.add('open');
    hamburger.classList.add('open');
  });
}
if (mobileClose) {
  mobileClose.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
  });
}
if (mobileMenu) {
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
    });
  });
}

/* ══════════════ SMOOTH SCROLL ══════════════ */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = document.getElementById('navbar').offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ══════════════ ACTIVE NAV LINK ══════════════ */
const sections = document.querySelectorAll('section[id], div[id="home"]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -40% 0px' });

sections.forEach(s => sectionObserver.observe(s));

/* ══════════════ COUNTER ANIMATION ══════════════ */
const counterEls = document.querySelectorAll('[data-count]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.count);
      let current = 0;
      const duration = 1800;
      const step = target / (duration / 16);
      const timer = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = Math.floor(current).toLocaleString();
      }, 16);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
counterEls.forEach(el => counterObserver.observe(el));

/* ══════════════ SCROLL REVEAL ANIMATIONS ══════════════ */
const revealEls = document.querySelectorAll(
  '.sol-card, .bento-card, .why-card, .process-step, .insight-row, .section-header, .stats-strip'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = `opacity 0.6s ease ${(i % 6) * 0.07}s, transform 0.6s ease ${(i % 6) * 0.07}s`;
  revealObserver.observe(el);
});

document.addEventListener('DOMContentLoaded', () => {
  const style = document.createElement('style');
  style.textContent = '.revealed { opacity: 1 !important; transform: translateY(0) !important; }';
  document.head.appendChild(style);
});

/* ══════════════ HERO SEARCH BUTTON ══════════════ */
const searchBtn = document.getElementById('searchBtn');
if (searchBtn) {
  searchBtn.addEventListener('click', () => {
    const sol = document.getElementById('searchSolution').value;
    if (sol) {
      document.getElementById('solutions').scrollIntoView({ behavior: 'smooth' });
    } else {
      document.getElementById('solutions').scrollIntoView({ behavior: 'smooth' });
    }
  });
}

/* ══════════════ SOL CARD FAVORITE ══════════════ */
document.querySelectorAll('.sol-fav').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isActive = btn.textContent === '★';
    btn.textContent = isActive ? '☆' : '★';
    btn.style.color = isActive ? '' : '#b8860b';
    btn.style.background = isActive ? '' : 'rgba(184,134,11,0.25)';
    btn.style.borderColor = isActive ? '' : '#b8860b';
  });
});

/* ══════════════ TESTIMONIAL SLIDER ══════════════ */
let currentSlide = 0;
const slides = document.querySelectorAll('.testi-slide');
const dots = document.querySelectorAll('.testi-dot');
const prevBtn = document.getElementById('testiPrev');
const nextBtn = document.getElementById('testiNext');

function goToSlide(idx) {
  if (!slides.length) return;
  slides[currentSlide].classList.remove('active');
  if (dots[currentSlide]) dots[currentSlide].classList.remove('active');
  currentSlide = ((idx % slides.length) + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  if (dots[currentSlide]) dots[currentSlide].classList.add('active');
}

if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
dots.forEach(d => d.addEventListener('click', () => goToSlide(parseInt(d.dataset.index))));
setInterval(() => goToSlide(currentSlide + 1), 7000);

/* ══════════════ FAQ ACCORDION ══════════════ */
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

/* ══════════════ CTA FORM ══════════════ */
const ctaSubmit = document.getElementById('ctaSubmit');
const ctaEmail = document.getElementById('ctaEmail');
if (ctaSubmit && ctaEmail) {
  ctaSubmit.addEventListener('click', () => {
    window.location.href = '404.html';
  });
  ctaEmail.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') ctaSubmit.click();
  });
}

/* ══════════════ FOOTER NEWSLETTER ══════════════ */
const newsletterBtn = document.getElementById('newsletterBtn');
const newsletterEmail = document.getElementById('newsletterEmail');
if (newsletterBtn && newsletterEmail) {
  newsletterBtn.addEventListener('click', () => {
    const email = newsletterEmail.value.trim();
    if (email && email.includes('@')) {
      newsletterBtn.textContent = 'Subscribed!';
      newsletterBtn.style.background = '#10b981';
      setTimeout(() => {
        newsletterBtn.textContent = 'Subscribe';
        newsletterBtn.style.background = '';
        newsletterEmail.value = '';
      }, 3000);
    }
  });
}

/* ══════════════ HERO ANIMATION ON LOAD ══════════════ */
window.addEventListener('load', () => {
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(30px)';
    setTimeout(() => {
      heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
      heroContent.style.opacity = '1';
      heroContent.style.transform = 'translateY(0)';
    }, 100);
  }
});
