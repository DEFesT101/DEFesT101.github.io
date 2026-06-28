/* ===== HEADER SCROLL ===== */
(function() {
  const header = document.querySelector('.header');
  if (!header) return;

  const hero = document.querySelector('.hero, .hero-small');
  const heroHeight = hero ? hero.offsetHeight : window.innerHeight;

  function updateHeader() {
    const y = window.scrollY;
    if (y > heroHeight * 0.85) {
      header.classList.remove('light');
      header.classList.add('scrolled');
    } else {
      header.classList.add('light');
      header.classList.remove('scrolled');
    }
    if (y > 100) {
      header.style.height = '64px';
    } else {
      header.style.height = '';
    }
  }

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
})();

/* ===== MOBILE MENU ===== */
(function() {
  const menuBtn = document.querySelector('.menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener('click', function() {
    mobileMenu.classList.toggle('open');
    const isOpen = mobileMenu.classList.contains('open');
    menuBtn.innerHTML = isOpen
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 18L18 6M6 6l12 12"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
  });

  mobileMenu.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      mobileMenu.classList.remove('open');
      menuBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
    });
  });
})();

/* ===== HERO SLIDESHOW ===== */
(function() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  if (!slides.length) return;

  let current = 0;
  const total = slides.length;

  function goToSlide(index) {
    slides[current].classList.remove('active');
    if (dots[current]) dots[current].classList.remove('active');
    current = index;
    slides[current].classList.add('active');
    if (dots[current]) dots[current].classList.add('active');
  }

  function nextSlide() {
    goToSlide((current + 1) % total);
  }

  // Auto-advance every 5 seconds
  setInterval(nextSlide, 5000);

  // Dot click handlers
  dots.forEach(function(dot, i) {
    dot.addEventListener('click', function() {
      goToSlide(i);
    });
  });
})();

/* ===== SCROLL REVEAL ===== */
(function() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const staggerParents = document.querySelectorAll('.stagger-children');

  function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight * 0.85 && rect.bottom > 0;
  }

  function checkReveals() {
    revealElements.forEach(function(el) {
      if (isInViewport(el)) {
        el.classList.add('visible');
      }
    });

    staggerParents.forEach(function(parent) {
      if (isInViewport(parent)) {
        var children = parent.querySelectorAll('.reveal-child');
        children.forEach(function(child, i) {
          setTimeout(function() {
            child.classList.add('visible');
          }, i * 100);
        });
      }
    });
  }

  // Initial check after a short delay for hero elements
  setTimeout(function() {
    document.querySelectorAll('.hero .reveal, .hero .reveal-left, .hero .reveal-right').forEach(function(el) {
      el.classList.add('visible');
    });
  }, 100);

  checkReveals();
  window.addEventListener('scroll', checkReveals, { passive: true });
})();
