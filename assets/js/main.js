
document.documentElement.style.scrollBehavior = 'auto';

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

    // Close menu when clicking nav links
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
  const heroText = select('.hero-text');
  const heroCtas = select('.hero-ctas');
  const trustBadges = select('.trust-badges');

  if (heroText) {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from(heroText.querySelector('h1'), { y: 50, opacity: 0, duration: 1, delay: 0.3 })
      .from(heroText.querySelector('.subtext'), { y: 30, opacity: 0, duration: 0.8 }, '-=0.5')
      .from(heroCtas, { y: 30, opacity: 0, duration: 0.8 }, '-=0.4')
      .from(trustBadges, { y: 20, opacity: 0, duration: 0.8 }, '-=0.3');
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

  animateOnScroll('.about-header', { y: 40 });
  animateOnScroll('.about-image-large', { x: -60, y: 0 });
  animateOnScroll('.about-image-small-1', { x: 60, y: 0 });
  animateOnScroll('.about-image-small-2', { x: 60, y: 0 });
  animateOnScroll('.about-content-left', { y: 40 });
  animateOnScroll('.about-content-right', { y: 40 });
  animateOnScroll('.service-card', { y: 50, stagger: true });
  animateOnScroll('.testimonial-card', { y: 40, stagger: true });

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // IMAGE HOVER EFFECTS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  selectAll('.about-image-box').forEach(box => {
    const img = box.querySelector('img');
    if (!img) return;

    box.addEventListener('mouseenter', () => {
      gsap.to(img, { scale: 1.08, duration: 0.6, ease: 'power2.out' });
    });
    box.addEventListener('mouseleave', () => {
      gsap.to(img, { scale: 1, duration: 0.6, ease: 'power2.out' });
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
  // CARD HOVER EFFECTS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  selectAll('.service-card, .testimonial-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, { y: -6, duration: 0.3, ease: 'power2.out' });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { y: 0, duration: 0.3, ease: 'power2.out' });
    });
  });

  selectAll('.about-feature-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      gsap.to(item, { x: 12, duration: 0.3, ease: 'power2.out' });
    });
    item.addEventListener('mouseleave', () => {
      gsap.to(item, { x: 0, duration: 0.3, ease: 'power2.out' });
    });
  });

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // CONTACT FORM
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const form = select('#contactForm');
  const successMessage = select('#successMessage');

  if (form && successMessage) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      selectAll('.contact__error').forEach(error => {
        error.classList.remove('contact__error--visible');
      });

      let isValid = true;

      const nameInput = select('#name');
      if (!nameInput.value.trim()) {
        select('#nameError').classList.add('contact__error--visible');
        isValid = false;
      }

      const emailInput = select('#email');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value)) {
        select('#emailError').classList.add('contact__error--visible');
        isValid = false;
      }

      const messageInput = select('#message');
      if (!messageInput.value.trim()) {
        select('#messageError').classList.add('contact__error--visible');
        isValid = false;
      }

      if (isValid) {
        const button = form.querySelector('.contact__button');
        button.disabled = true;
        button.querySelector('.contact__button-text').textContent = 'Sending...';

        // Simulate form submission (replace with actual backend)
        setTimeout(() => {
          select('.contact__form-container').style.display = 'none';
          successMessage.classList.add('contact__success--visible');
          
          console.log('Form submitted:', {
            name: nameInput.value,
            email: emailInput.value,
            phone: select('#phone').value,
            support: select('#support').value,
            message: messageInput.value
          });
        }, 800);
      } else {
        const firstError = select('.contact__error--visible');
        if (firstError) {
          const fieldId = firstError.id.replace('Error', '');
          const errorField = select(`#${fieldId}`);
          if (errorField) errorField.focus();
        }
      }
    });

    // Input focus effects
    selectAll('.contact__input, .contact__textarea, .contact__select').forEach(input => {
      input.addEventListener('focus', function() {
        const label = this.previousElementSibling;
        if (label && label.classList.contains('contact__label')) {
          label.style.color = 'var(--therapist-olive)';
        }
      });

      input.addEventListener('blur', function() {
        const label = this.previousElementSibling;
        if (label && label.classList.contains('contact__label')) {
          label.style.color = 'var(--therapist-text-main)';
        }
      });
    });
  }

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

  console.log('✅ Mind Ease loaded successfully');
})();