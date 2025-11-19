        (() => {
            'use strict';

            // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            // GSAP SETUP
            // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

            if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
                console.error('❌ GSAP or ScrollTrigger not loaded');
                return;
            }

            gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

            // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            // UTILITY FUNCTIONS
            // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

            const select = (selector) => document.querySelector(selector);
            const selectAll = (selector) => document.querySelectorAll(selector);

            // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            // MOBILE MENU TOGGLE
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
            // NAVIGATION — Scroll effect
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
            // HERO SECTION — Parallax & intro animation
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

            // Hero intro animation
            const heroContent = select('.hero-content');
            if (heroContent) {
                const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

                tl.from(heroContent.querySelector('h1'), {
                    y: 60,
                    opacity: 0,
                    duration: 1.2,
                    delay: 0.3
                })
                .from(heroContent.querySelector('p'), {
                    y: 40,
                    opacity: 0,
                    duration: 1
                }, '-=0.6')
                .from(heroContent.querySelector('.btn'), {
                    y: 30,
                    opacity: 0,
                    duration: 0.8
                }, '-=0.4');
            }

            // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            // SCROLL ANIMATIONS — Service cards
            // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

            const serviceCards = selectAll('.service-card');
            serviceCards.forEach((card, index) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    },
                    y: 60,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    delay: index * 0.15
                });
            });

            // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            // SCROLL ANIMATIONS — Steps
            // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

            const steps = selectAll('.step-card');
            steps.forEach((step, index) => {
                gsap.from(step, {
                    scrollTrigger: {
                        trigger: step,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    },
                    y: 50,
                    opacity: 0,
                    duration: 0.9,
                    ease: 'power3.out',
                    delay: index * 0.2
                });
            });

            // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            // SCROLL ANIMATIONS — Section titles
            // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

            gsap.from('.services h2', {
                scrollTrigger: {
                    trigger: '.services h2',
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                y: 40,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });

            gsap.from('.how-it-works h2', {
                scrollTrigger: {
                    trigger: '.how-it-works h2',
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                y: 40,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });

            // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            // TRANSFORMATION SECTION
            // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

            gsap.from('.transformation h2', {
                scrollTrigger: {
                    trigger: '.transformation h2',
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });

            gsap.from('.transformation p', {
                scrollTrigger: {
                    trigger: '.transformation p',
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                y: 40,
                opacity: 0,
                duration: 0.9,
                ease: 'power3.out',
                delay: 0.2
            });

            gsap.from('.transformation .btn', {
                scrollTrigger: {
                    trigger: '.transformation .btn',
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                delay: 0.4
            });

            // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            // FINAL INVITATION SECTION
            // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

            gsap.from('.final-invitation h2', {
                scrollTrigger: {
                    trigger: '.final-invitation h2',
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                y: 40,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });

            gsap.from('.final-invitation p', {
                scrollTrigger: {
                    trigger: '.final-invitation p',
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                y: 30,
                opacity: 0,
                duration: 0.9,
                ease: 'power3.out',
                delay: 0.2
            });

            gsap.from('.final-invitation .cta-button', {
                scrollTrigger: {
                    trigger: '.final-invitation .cta-button',
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                scale: 0.9,
                opacity: 0,
                duration: 0.8,
                ease: 'back.out(1.4)',
                delay: 0.4
            });

            // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            // CARD HOVER EFFECTS
            // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

            selectAll('.service-card').forEach(card => {
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

            const smoothScrollTo = (targetElement) => {
                if (!targetElement) return;

                const navHeight = header ? header.offsetHeight : 80;
                
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: targetElement,
                        offsetY: navHeight
                    },
                    ease: 'power3.inOut'
                });
            };

            // Apply smooth scroll to all anchor links
            selectAll('a[href^="#"]').forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = link.getAttribute('href');
                    const targetElement = select(targetId);
                    
                    if (targetElement) {
                        smoothScrollTo(targetElement);
                    }
                });
            });

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

            console.log('✅ Mind Ease Services page loaded successfully');
        })();