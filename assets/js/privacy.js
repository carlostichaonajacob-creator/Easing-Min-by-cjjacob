        (() => {
            'use strict';

            if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
                console.error('❌ GSAP not loaded');
                return;
            }

            gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

            const select = (s) => document.querySelector(s);
            const selectAll = (s) => document.querySelectorAll(s);

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

            const header = select('#header');
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 50) {
                    header.classList.add('therapist-nav--scrolled');
                } else {
                    header.classList.remove('therapist-nav--scrolled');
                }
            }, { passive: true });

            gsap.from('.legal-hero h1', {
                y: 40,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                delay: 0.2
            });

            gsap.from('.legal-hero p', {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                delay: 0.4
            });

            selectAll('.legal-section').forEach((section, index) => {
                gsap.from(section, {
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    },
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power3.out'
                });
            });

            console.log('✅ Mind Ease Privacy Policy page loaded');
        })();