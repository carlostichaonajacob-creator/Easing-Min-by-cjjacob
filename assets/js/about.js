(() => {
  'use strict';

  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.error('GSAP not loaded');
    return;
  }

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  const select = (s) => document.querySelector(s);
  const selectAll = (s) => document.querySelectorAll(s);

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // MOBILE MENU
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const mobileToggle = select('.mobile-menu-toggle');
  const navMenu = select('.nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    selectAll('.nav-list-item, .nav-book-cta').forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // NAVIGATION SCROLL
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const header = select('#header');
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
      header.classList.add('therapist-nav--scrolled');
    } else {
      header.classList.remove('therapist-nav--scrolled');
    }
  }, { passive: true });

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // HERO PARALLAX
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const heroBackground = select('.hero-background');
  if (heroBackground) {
    gsap.to(heroBackground, {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // HERO INTRO ANIMATION
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const heroContent = select('.hero-content');
  if (heroContent) {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from(heroContent.querySelector('h1'), { y: 50, opacity: 0, duration: 1, delay: 0.3 })
      .from(heroContent.querySelector('p'), { y: 30, opacity: 0, duration: 0.8 }, '-=0.5')
      .from(heroContent.querySelector('.btn'), { y: 30, opacity: 0, duration: 0.8 }, '-=0.4');
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // SCROLL ANIMATIONS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const animateOnScroll = (selector, opts = {}) => {
    selectAll(selector).forEach((el, i) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: opts.y || 50,
        x: opts.x || 0,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: opts.stagger ? i * 0.15 : 0
      });
    });
  };

  animateOnScroll('.story-image', { x: -60 });
  animateOnScroll('.story-content', { x: 60 });
  animateOnScroll('.philosophy-header', { y: 40 });
  animateOnScroll('.philosophy-left', { y: 40 });
  animateOnScroll('.philosophy-right', { y: 40 });
  animateOnScroll('.values-header', { y: 40 });
  animateOnScroll('.value-card', { y: 50, stagger: true });

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // IMAGE HOVER EFFECTS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  selectAll('.story-image img').forEach(img => {
    const container = img.parentElement;
    container.addEventListener('mouseenter', () => {
      gsap.to(img, { scale: 1.08, duration: 0.6, ease: 'power2.out' });
    });
    container.addEventListener('mouseleave', () => {
      gsap.to(img, { scale: 1, duration: 0.6, ease: 'power2.out' });
    });
  });

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // CARD HOVER EFFECTS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  selectAll('.philosophy-item, .value-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, { y: -8, duration: 0.3, ease: 'power2.out' });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { y: 0, duration: 0.3, ease: 'power2.out' });
    });
  });

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // SMOOTH SCROLL
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const smoothScrollTo = (target) => {
    if (!target) return;
    const navHeight = header ? header.offsetHeight : 80;
    
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: target, offsetY: navHeight },
      ease: 'power3.inOut'
    });
  };

  selectAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetEl = select(targetId);
      if (targetEl) smoothScrollTo(targetEl);
    });
  });

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // SCROLL TO TOP BUTTON
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const scrollTopBtn = select('#scrollToTop');
  
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    scrollTopBtn.addEventListener('click', () => {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: 0 },
        ease: 'power3.inOut'
      });
    });
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // RESIZE HANDLER
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
  });

  console.log('✅ Mind Ease About page loaded successfully');
})();