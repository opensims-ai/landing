// ============================================
// OpenSims.ai - Landing Page JavaScript
// ============================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // Smooth Scrolling for Navigation Links
    // ============================================
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // Waitlist Form Handling
    // ============================================
    const waitlistForm = document.getElementById('waitlistForm');
    const emailInput = document.getElementById('emailInput');
    const formMessage = document.getElementById('formMessage');
    const waitlistCount = document.getElementById('waitlistCount');

    if (waitlistForm) {
        waitlistForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = emailInput.value.trim();

            // Basic email validation
            if (!isValidEmail(email)) {
                showMessage('Please enter a valid email address', 'error');
                return;
            }

            // Store email in localStorage (for demo purposes)
            // In production, this would send to a backend API
            storeEmailInLocalStorage(email);

            // Show success message
            showMessage('🎉 Welcome to the multiverse! Check your email for confirmation.', 'success');

            // Clear the input
            emailInput.value = '';

            // Increment waitlist count
            incrementWaitlistCount();
        });
    }

    // ============================================
    // Helper Functions
    // ============================================

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = 'form-message show ' + type;

        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.classList.remove('show');
        }, 5000);
    }

    function storeEmailInLocalStorage(email) {
        // Get existing emails
        let emails = JSON.parse(localStorage.getItem('opensims_waitlist') || '[]');

        // Check if email already exists
        if (!emails.includes(email)) {
            emails.push(email);
            localStorage.setItem('opensims_waitlist', JSON.stringify(emails));
        }
    }

    function incrementWaitlistCount() {
        const currentCount = parseInt(waitlistCount.textContent.replace(/,/g, ''));
        const newCount = currentCount + 1;
        waitlistCount.textContent = newCount.toLocaleString();

        // Animate the count
        waitlistCount.style.transform = 'scale(1.2)';
        waitlistCount.style.color = 'var(--color-primary)';

        setTimeout(() => {
            waitlistCount.style.transform = 'scale(1)';
            waitlistCount.style.color = '';
        }, 300);
    }

    // ============================================
    // Scroll Animations - Fade in elements on scroll
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    const animatedElements = document.querySelectorAll('.feature-card, .step-card, .environment-card, .economy-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ============================================
    // Dynamic Waitlist Count (Simulated)
    // ============================================
    // Simulate real-time waitlist growth
    function simulateWaitlistGrowth() {
        // Randomly increase count every 10-30 seconds
        const randomDelay = Math.random() * 20000 + 10000; // 10-30 seconds

        setTimeout(() => {
            if (Math.random() > 0.3) { // 70% chance to increment
                const currentCount = parseInt(waitlistCount.textContent.replace(/,/g, ''));
                waitlistCount.textContent = (currentCount + 1).toLocaleString();
            }
            simulateWaitlistGrowth(); // Continue the cycle
        }, randomDelay);
    }

    // Start the simulation
    simulateWaitlistGrowth();

    // ============================================
    // Environment Card Hover Effects
    // ============================================
    const environmentCards = document.querySelectorAll('.environment-card');

    environmentCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ============================================
    // Button Click Effects
    // ============================================
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.5)';
            ripple.style.pointerEvents = 'none';
            ripple.style.animation = 'ripple 0.6s ease-out';

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple animation to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            from {
                transform: scale(0);
                opacity: 1;
            }
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // ============================================
    // Navigation Scroll Effect
    // ============================================
    const nav = document.querySelector('.nav-container');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            nav.style.background = 'rgba(10, 10, 26, 0.95)';
            nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
        } else {
            nav.style.background = 'rgba(10, 10, 26, 0.8)';
            nav.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });

    // ============================================
    // Typing Effect for Hero Title (Optional Enhancement)
    // ============================================
    function createTypingEffect(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';

        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }

        type();
    }

    // Uncomment to enable typing effect on hero title
    // const heroTitle = document.querySelector('.hero-title');
    // if (heroTitle) {
    //     const originalText = heroTitle.textContent;
    //     createTypingEffect(heroTitle, originalText, 50);
    // }

    // ============================================
    // Parallax Effect for Background
    // ============================================
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const stars = document.querySelectorAll('.stars, .stars2, .stars3');

        stars.forEach((star, index) => {
            const speed = (index + 1) * 0.1;
            star.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // ============================================
    // Console Easter Egg
    // ============================================
    console.log('%cWelcome to OpenSims.ai! 🌌', 'color: #00d9ff; font-size: 24px; font-weight: bold;');
    console.log('%cInterested in building simulations? Join our creator program!', 'color: #bd00ff; font-size: 14px;');
    console.log('%cEmail: hello@opensims.ai', 'color: #b8b8d4; font-size: 12px;');

    // ============================================
    // Performance: Lazy Load Environment Images
    // ============================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.style.opacity = '1';
                    imageObserver.unobserve(img);
                }
            });
        });

        const environmentImages = document.querySelectorAll('.environment-image');
        environmentImages.forEach(img => {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';
            imageObserver.observe(img);
        });
    }
});

// ============================================
// Analytics Event Tracking (Placeholder)
// ============================================
function trackEvent(category, action, label) {
    // This is a placeholder for analytics tracking
    // In production, integrate with Google Analytics, Mixpanel, etc.
    console.log('Event tracked:', { category, action, label });

    // Example: Google Analytics
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', action, {
    //         'event_category': category,
    //         'event_label': label
    //     });
    // }
}

// Track button clicks
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-primary')) {
        trackEvent('Button', 'Click', 'Primary CTA');
    }
    if (e.target.closest('.environment-card')) {
        const envTitle = e.target.closest('.environment-card').querySelector('.environment-title')?.textContent;
        trackEvent('Environment', 'View', envTitle);
    }
});

// ============================================
// Service Worker Registration (For PWA Support)
// ============================================
if ('serviceWorker' in navigator) {
    // Uncomment when you have a service worker file
    // navigator.serviceWorker.register('/sw.js')
    //     .then(reg => console.log('Service Worker registered', reg))
    //     .catch(err => console.log('Service Worker registration failed', err));
}
