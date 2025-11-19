       (() => {
            'use strict';

            if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
                console.error('❌ GSAP not loaded');
                return;
            }

            gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

            const select = (s) => document.querySelector(s);
            const selectAll = (s) => document.querySelectorAll(s);

            const bookingData = {
                service: null,
                serviceName: null,
                date: null,
                time: null,
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                message: ''
            };

            let currentStep = 1;

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

            function goToStep(stepNumber) {
                selectAll('.wizard-step').forEach(step => step.classList.remove('active'));
                select(`.wizard-step[data-step="${stepNumber}"]`).classList.add('active');

                selectAll('.progress-step').forEach(step => {
                    const stepNum = parseInt(step.dataset.step);
                    step.classList.remove('active', 'completed');
                    if (stepNum === stepNumber) {
                        step.classList.add('active');
                    } else if (stepNum < stepNumber) {
                        step.classList.add('completed');
                    }
                });

                currentStep = stepNumber;
                gsap.to(window, { duration: 0.6, scrollTo: { y: 0 }, ease: 'power3.inOut' });
            }

            const serviceOptions = selectAll('.service-option');
            const step1NextBtn = select('#step1Next');

            serviceOptions.forEach(option => {
                option.addEventListener('click', () => {
                    serviceOptions.forEach(opt => opt.classList.remove('selected'));
                    option.classList.add('selected');
                    bookingData.service = option.dataset.service;
                    bookingData.serviceName = option.querySelector('h3').textContent;
                    step1NextBtn.disabled = false;
                });
            });

            step1NextBtn.addEventListener('click', () => {
                if (bookingData.service) {
                    goToStep(2);
                    generateCalendar();
                }
            });

            const step2BackBtn = select('#step2Back');
            const step2NextBtn = select('#step2Next');

            function generateCalendar() {
                const calendarContainer = select('#calendarDates');
                calendarContainer.innerHTML = '';
                const today = new Date();
                const daysToShow = 14;

                for (let i = 0; i < daysToShow; i++) {
                    const date = new Date(today);
                    date.setDate(today.getDate() + i);
                    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                    const dayNumber = date.getDate();
                    const isWeekend = date.getDay() === 0 || date.getDay() === 6;

                    const dateItem = document.createElement('div');
                    dateItem.className = 'date-item';
                    if (isWeekend) dateItem.classList.add('disabled');
                    dateItem.innerHTML = `<span class="date-day">${dayName}</span><span class="date-number">${dayNumber}</span>`;

                    if (!isWeekend) {
                        dateItem.dataset.date = date.toISOString().split('T')[0];
                        dateItem.addEventListener('click', () => selectDate(dateItem, date));
                    }
                    calendarContainer.appendChild(dateItem);
                }
            }

            function selectDate(element, date) {
                selectAll('.date-item').forEach(item => item.classList.remove('selected'));
                element.classList.add('selected');
                bookingData.date = date.toISOString().split('T')[0];
                generateTimeSlots();
            }

            function generateTimeSlots() {
                const timeSlotsContainer = select('#timeSlots');
                timeSlotsContainer.innerHTML = '';
                const times = ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];

                times.forEach(time => {
                    const timeSlot = document.createElement('div');
                    timeSlot.className = 'time-slot';
                    timeSlot.textContent = time;
                    timeSlot.addEventListener('click', () => selectTime(timeSlot, time));
                    timeSlotsContainer.appendChild(timeSlot);
                });
            }

            function selectTime(element, time) {
                selectAll('.time-slot').forEach(slot => slot.classList.remove('selected'));
                element.classList.add('selected');
                bookingData.time = time;
                step2NextBtn.disabled = false;
            }

            step2BackBtn.addEventListener('click', () => goToStep(1));
            step2NextBtn.addEventListener('click', () => {
                if (bookingData.date && bookingData.time) goToStep(3);
            });

            const step3BackBtn = select('#step3Back');
            const step3NextBtn = select('#step3Next');
            const firstNameInput = select('#firstName');
            const lastNameInput = select('#lastName');
            const emailInput = select('#email');
            const phoneInput = select('#phone');
            const messageInput = select('#message');

            function validateStep3() {
                const isValid = firstNameInput.value.trim() !== '' && lastNameInput.value.trim() !== '' &&
                                emailInput.value.trim() !== '' && phoneInput.value.trim() !== '';
                step3NextBtn.disabled = !isValid;
            }

            [firstNameInput, lastNameInput, emailInput, phoneInput].forEach(input => {
                input.addEventListener('input', validateStep3);
            });

            step3BackBtn.addEventListener('click', () => goToStep(2));
            step3NextBtn.addEventListener('click', () => {
                bookingData.firstName = firstNameInput.value.trim();
                bookingData.lastName = lastNameInput.value.trim();
                bookingData.email = emailInput.value.trim();
                bookingData.phone = phoneInput.value.trim();
                bookingData.message = messageInput.value.trim();
                updateSummary();
                goToStep(4);
            });

            const step4BackBtn = select('#step4Back');
            const confirmBtn = select('#confirmBooking');

            function updateSummary() {
                const dateObj = new Date(bookingData.date);
                const formattedDate = dateObj.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
                select('#summaryService').textContent = bookingData.serviceName;
                select('#summaryDate').textContent = formattedDate;
                select('#summaryTime').textContent = bookingData.time;
                select('#summaryName').textContent = `${bookingData.firstName} ${bookingData.lastName}`;
                select('#summaryEmail').textContent = bookingData.email;
                select('#summaryPhone').textContent = bookingData.phone;
            }

            step4BackBtn.addEventListener('click', () => goToStep(3));
            confirmBtn.addEventListener('click', () => {
                select('.wizard-content').style.display = 'none';
                select('.success-message').classList.add('active');

                gsap.from('.success-icon', { scale: 0, rotation: -180, duration: 0.8, ease: 'back.out(1.7)' });
                gsap.from('.success-message h2, .success-message p, .success-message .btn', {
                    y: 30, opacity: 0, duration: 0.6, stagger: 0.2, ease: 'power3.out', delay: 0.4
                });

                gsap.to(window, { duration: 0.6, scrollTo: { y: 0 }, ease: 'power3.inOut' });
                console.log('Booking confirmed:', bookingData);
            });

            gsap.from('.booking-header h1', { y: 40, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.2 });
            gsap.from('.booking-header p', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.4 });
            gsap.from('.booking-wizard', { y: 50, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.6 });

            console.log('✅ Mind Ease Booking page loaded');
        })();
