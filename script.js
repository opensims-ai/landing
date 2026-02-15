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
    // Navigation Scroll Effect (Stabilized)
    // ============================================
    const nav = document.querySelector('.nav-container');
    let lastScroll = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
        lastScroll = window.pageYOffset;

        if (!ticking) {
            window.requestAnimationFrame(() => {
                if (lastScroll > 100) {
                    nav.style.background = 'rgba(15, 15, 26, 0.95)';
                    nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
                } else {
                    nav.style.background = 'rgba(15, 15, 26, 0.85)';
                    nav.style.boxShadow = 'none';
                }
                ticking = false;
            });
            ticking = true;
        }
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
    // ============================================
    // Network Visualization for Environments
    // ============================================
    const canvas = document.getElementById('environmentNetwork');
    const tooltip = document.getElementById('networkTooltip');

    console.log('Canvas element:', canvas);
    console.log('Tooltip element:', tooltip);

    if (canvas && tooltip) {
        const ctx = canvas.getContext('2d');
        console.log('Canvas context:', ctx);
        let animationId;
        let hoveredNode = null;
        let currentFilter = 'all';

        // Environment data with clustering - Dense network with varied sizes
        const environments = [
            // Business Cluster - 8 environments
            {
                id: 1,
                name: 'Startup Founder',
                icon: '🚀',
                category: 'business',
                description: 'Build and scale a tech company from idea to Series A.',
                actors: 342,
                ageWeeks: 16,
                difficulty: 'Intermediate',
                timeframe: '2-4 weeks',
                reward: '5,000-20,000 OSC',
                color: '#5b9aa8',
                x: 0, y: 0, vx: 0, vy: 0
            },
            {
                id: 2,
                name: 'Hospital Administrator',
                icon: '🏥',
                category: 'business',
                description: 'Optimize healthcare operations while maintaining quality care.',
                actors: 189,
                ageWeeks: 12,
                difficulty: 'Advanced',
                timeframe: '3-5 weeks',
                reward: '7,000-25,000 OSC',
                color: '#7aa88b',
                x: 0, y: 0, vx: 0, vy: 0
            },
            {
                id: 3,
                name: 'Investment Banker',
                icon: '💼',
                category: 'business',
                description: 'Navigate high-stakes deals and market dynamics.',
                actors: 267,
                ageWeeks: 20,
                difficulty: 'Expert',
                timeframe: '4-6 weeks',
                reward: '10,000-35,000 OSC',
                color: '#a89a7a',
                x: 0, y: 0, vx: 0, vy: 0
            },
            {
                id: 4,
                name: 'E-Commerce Manager',
                icon: '🛒',
                category: 'business',
                description: 'Scale an online retail empire across multiple platforms.',
                actors: 156,
                ageWeeks: 8,
                difficulty: 'Intermediate',
                timeframe: '2-4 weeks',
                reward: '4,000-18,000 OSC',
                color: '#6b9aaa',
                x: 0, y: 0, vx: 0, vy: 0
            },
            {
                id: 5,
                name: 'Restaurant Chain Owner',
                icon: '🍽️',
                category: 'business',
                description: 'Expand your culinary empire while maintaining quality.',
                actors: 92,
                ageWeeks: 5,
                difficulty: 'Intermediate',
                timeframe: '3-5 weeks',
                reward: '5,000-20,000 OSC',
                color: '#6b9a9a',
                x: 0, y: 0, vx: 0, vy: 0
            },
            {
                id: 6,
                name: 'Venture Capitalist',
                icon: '💰',
                category: 'business',
                description: 'Identify and fund the next unicorn startups.',
                actors: 423,
                ageWeeks: 28,
                difficulty: 'Expert',
                timeframe: '5-8 weeks',
                reward: '15,000-45,000 OSC',
                color: '#6b9aaa',
                x: 0, y: 0, vx: 0, vy: 0
            },
            {
                id: 7,
                name: 'Pharmaceutical CEO',
                icon: '💊',
                category: 'business',
                description: 'Lead drug development and navigate FDA approvals.',
                actors: 34,
                ageWeeks: 2,
                difficulty: 'Expert',
                timeframe: '4-6 weeks',
                reward: '12,000-40,000 OSC',
                color: '#6b9a99',
                x: 0, y: 0, vx: 0, vy: 0
            },
            {
                id: 8,
                name: 'Real Estate Developer',
                icon: '🏢',
                category: 'business',
                description: 'Transform cityscapes with strategic property development.',
                actors: 128,
                ageWeeks: 7,
                difficulty: 'Advanced',
                timeframe: '3-6 weeks',
                reward: '8,000-28,000 OSC',
                color: '#6b9aaa',
                x: 0, y: 0, vx: 0, vy: 0
            },

            // Urban Cluster - 6 environments
            {
                id: 9,
                name: 'City Planner',
                icon: '🏙️',
                category: 'urban',
                description: 'Design and manage a sustainable metropolis.',
                actors: 512,
                ageWeeks: 32,
                difficulty: 'Advanced',
                timeframe: '3-6 weeks',
                reward: '8,000-30,000 OSC',
                color: '#8b7aa8',
                x: 0, y: 0, vx: 0, vy: 0
            },
            {
                id: 10,
                name: 'Transportation Chief',
                icon: '🚇',
                category: 'urban',
                description: 'Revolutionize urban mobility and infrastructure.',
                actors: 178,
                ageWeeks: 11,
                difficulty: 'Intermediate',
                timeframe: '2-4 weeks',
                reward: '6,000-22,000 OSC',
                color: '#8b7a9a',
                x: 0, y: 0, vx: 0, vy: 0
            },
            {
                id: 11,
                name: 'Urban Architect',
                icon: '🏗️',
                category: 'urban',
                description: 'Design iconic buildings that define city skylines.',
                actors: 67,
                ageWeeks: 4,
                difficulty: 'Advanced',
                timeframe: '3-5 weeks',
                reward: '7,000-25,000 OSC',
                color: '#8b7a9a',
                x: 0, y: 0, vx: 0, vy: 0
            },
            {
                id: 12,
                name: 'Smart City Director',
                icon: '🌐',
                category: 'urban',
                description: 'Integrate IoT and AI into urban infrastructure.',
                actors: 23,
                ageWeeks: 1,
                difficulty: 'Expert',
                timeframe: '4-7 weeks',
                reward: '10,000-35,000 OSC',
                color: '#8b7a9a',
                x: 0, y: 0, vx: 0, vy: 0
            },
            {
                id: 13,
                name: 'Parks Commissioner',
                icon: '🌳',
                category: 'urban',
                description: 'Create green spaces and improve quality of life.',
                actors: 145,
                ageWeeks: 9,
                difficulty: 'Intermediate',
                timeframe: '2-4 weeks',
                reward: '4,000-16,000 OSC',
                color: '#8b7a9a',
                x: 0, y: 0, vx: 0, vy: 0
            },
            {
                id: 14,
                name: 'Utilities Manager',
                icon: '⚡',
                category: 'urban',
                description: 'Ensure reliable power, water, and waste management.',
                actors: 234,
                ageWeeks: 15,
                difficulty: 'Advanced',
                timeframe: '3-5 weeks',
                reward: '7,000-26,000 OSC',
                color: '#8b7a9a',
                x: 0, y: 0, vx: 0, vy: 0
            },

            // Space Cluster - 5 environments
            {
                id: 15,
                name: 'Mars Colony Leader',
                icon: '🪐',
                category: 'space',
                description: 'Establish humanity\'s first self-sustaining Martian settlement.',
                actors: 678,
                ageWeeks: 40,
                difficulty: 'Expert',
                timeframe: '4-8 weeks',
                reward: '15,000-50,000 OSC',
                color: '#a87b8b',
                x: 0, y: 0, vx: 0, vy: 0
            },
            {
                id: 16,
                name: 'Space Station Commander',
                icon: '🛸',
                category: 'space',
                description: 'Manage operations aboard an orbital research station.',
                actors: 289,
                ageWeeks: 18,
                difficulty: 'Advanced',
                timeframe: '3-5 weeks',
                reward: '9,000-28,000 OSC',
                color: '#a87b8b',
                x: 0, y: 0, vx: 0, vy: 0
            },
            {
                id: 17,
                name: 'Asteroid Miner',
                icon: '⛏️',
                category: 'space',
                description: 'Extract valuable resources from asteroid belts.',
                actors: 112,
                ageWeeks: 6,
                difficulty: 'Advanced',
                timeframe: '3-6 weeks',
                reward: '8,000-30,000 OSC',
                color: '#a87b8b',
                x: 0, y: 0, vx: 0, vy: 0
            },
            {
                id: 18,
                name: 'Lunar Base Commander',
                icon: '🌙',
                category: 'space',
                description: 'Oversee Earth\'s gateway to deep space exploration.',
                actors: 45,
                ageWeeks: 3,
                difficulty: 'Expert',
                timeframe: '4-7 weeks',
                reward: '11,000-38,000 OSC',
                color: '#a87b8b',
                x: 0, y: 0, vx: 0, vy: 0
            },
            {
                id: 19,
                name: 'Interstellar Navigator',
                icon: '🚀',
                category: 'space',
                description: 'Chart courses through unknown regions of space.',
                actors: 156,
                ageWeeks: 10,
                difficulty: 'Expert',
                timeframe: '5-8 weeks',
                reward: '13,000-42,000 OSC',
                color: '#a87b8b',
                x: 0, y: 0, vx: 0, vy: 0
            },

            // Crisis Cluster - 5 environments
            {
                id: 20,
                name: 'Crisis Manager',
                icon: '🚨',
                category: 'crisis',
                description: 'Handle emergency response scenarios in real-time.',
                actors: 398,
                ageWeeks: 22,
                difficulty: 'Intermediate',
                timeframe: '1-2 weeks',
                reward: '4,000-15,000 OSC',
                color: '#a88b7a',
                x: 0, y: 0, vx: 0, vy: 0
            },
            {
                id: 21,
                name: 'Disaster Coordinator',
                icon: '⚡',
                category: 'crisis',
                description: 'Coordinate large-scale disaster relief efforts.',
                actors: 223,
                ageWeeks: 14,
                difficulty: 'Advanced',
                timeframe: '2-3 weeks',
                reward: '6,000-20,000 OSC',
                color: '#a88b7a',
                x: 0, y: 0, vx: 0, vy: 0
            },
            {
                id: 22,
                name: 'Pandemic Response Lead',
                icon: '🦠',
                category: 'crisis',
                description: 'Contain outbreaks and coordinate global health response.',
                actors: 567,
                ageWeeks: 36,
                difficulty: 'Expert',
                timeframe: '4-8 weeks',
                reward: '12,000-40,000 OSC',
                color: '#a88b7a',
                x: 0, y: 0, vx: 0, vy: 0
            },
            {
                id: 23,
                name: 'Wildfire Chief',
                icon: '🔥',
                category: 'crisis',
                description: 'Battle massive wildfires and protect communities.',
                actors: 87,
                ageWeeks: 5,
                difficulty: 'Advanced',
                timeframe: '1-3 weeks',
                reward: '5,000-18,000 OSC',
                color: '#a88b7a',
                x: 0, y: 0, vx: 0, vy: 0
            },
            {
                id: 24,
                name: 'Cybersecurity Commander',
                icon: '🛡️',
                category: 'crisis',
                description: 'Defend against large-scale cyber attacks.',
                actors: 18,
                ageWeeks: 0.5,
                difficulty: 'Expert',
                timeframe: '2-4 weeks',
                reward: '8,000-28,000 OSC',
                color: '#a88b7a',
                x: 0, y: 0, vx: 0, vy: 0
            },

            // Research Cluster - 6 environments
            {
                id: 25,
                name: 'Research Director',
                icon: '🔬',
                category: 'research',
                description: 'Lead groundbreaking scientific research projects.',
                actors: 301,
                ageWeeks: 19,
                difficulty: 'Expert',
                timeframe: '4-7 weeks',
                reward: '12,000-40,000 OSC',
                color: '#7aa88b',
                x: 0, y: 0, vx: 0, vy: 0
            },
            {
                id: 26,
                name: 'AI Ethics Board Member',
                icon: '🤖',
                category: 'research',
                description: 'Navigate complex ethical decisions in AI development.',
                actors: 134,
                ageWeeks: 8,
                difficulty: 'Expert',
                timeframe: '3-5 weeks',
                reward: '8,000-30,000 OSC',
                color: '#6b9aaa',
                x: 0, y: 0, vx: 0, vy: 0
            },
            {
                id: 27,
                name: 'Diplomatic Envoy',
                icon: '🤝',
                category: 'research',
                description: 'Navigate international relations and treaty negotiations.',
                actors: 245,
                ageWeeks: 15,
                difficulty: 'Advanced',
                timeframe: '3-6 weeks',
                reward: '9,000-32,000 OSC',
                color: '#6b9a9a',
                x: 0, y: 0, vx: 0, vy: 0
            },
            {
                id: 28,
                name: 'Quantum Computing Lead',
                icon: '⚛️',
                category: 'research',
                description: 'Pioneer the next generation of computing technology.',
                actors: 67,
                ageWeeks: 4,
                difficulty: 'Expert',
                timeframe: '5-9 weeks',
                reward: '14,000-45,000 OSC',
                color: '#6b9aaa',
                x: 0, y: 0, vx: 0, vy: 0
            },
            {
                id: 29,
                name: 'Climate Scientist',
                icon: '🌍',
                category: 'research',
                description: 'Model climate change and develop mitigation strategies.',
                actors: 412,
                ageWeeks: 26,
                difficulty: 'Expert',
                timeframe: '4-7 weeks',
                reward: '11,000-38,000 OSC',
                color: '#6b9aaa',
                x: 0, y: 0, vx: 0, vy: 0
            },
            {
                id: 30,
                name: 'Biotech Pioneer',
                icon: '🧬',
                category: 'research',
                description: 'Push the boundaries of genetic engineering and medicine.',
                actors: 189,
                ageWeeks: 12,
                difficulty: 'Expert',
                timeframe: '4-8 weeks',
                reward: '13,000-42,000 OSC',
                color: '#6b9aaa',
                x: 0, y: 0, vx: 0, vy: 0
            }
        ];

        // Define connections between related environments (denser network)
        const connections = [
            // Business cluster internal
            [1, 2], [1, 3], [1, 4], [2, 3], [2, 7], [3, 6], [4, 5], [5, 8], [6, 3], [7, 2], [8, 1],
            // Urban cluster internal
            [9, 10], [9, 11], [9, 13], [10, 14], [11, 13], [12, 9], [13, 14], [14, 10],
            // Space cluster internal
            [15, 16], [15, 17], [16, 18], [16, 19], [17, 18], [18, 19], [19, 15],
            // Crisis cluster internal
            [20, 21], [20, 22], [21, 23], [22, 24], [23, 20], [24, 22],
            // Research cluster internal
            [25, 26], [25, 27], [25, 29], [26, 28], [27, 29], [28, 30], [29, 30], [30, 25],
            // Inter-cluster connections (related domains)
            [1, 9], [2, 22], [3, 6], [7, 25], [8, 9], [9, 15], [10, 15], [12, 26], [14, 29],
            [16, 25], [17, 3], [18, 25], [20, 21], [22, 25], [24, 26], [26, 28], [27, 9], [29, 9]
        ];

        // Resize canvas with high DPI support
        function resizeCanvas() {
            const container = canvas.parentElement;
            const dpr = window.devicePixelRatio || 1;

            // Set display size
            canvas.style.width = container.clientWidth + 'px';
            canvas.style.height = container.clientHeight + 'px';

            // Set actual canvas size for high DPI
            canvas.width = container.clientWidth * dpr;
            canvas.height = container.clientHeight * dpr;

            // Scale context for high DPI
            ctx.scale(dpr, dpr);

            // Enable image smoothing for better quality
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';

            console.log('Canvas resized to:', container.clientWidth, 'x', container.clientHeight, 'DPR:', dpr);
            initializePositions();
        }

        // Initialize node positions with clustering (spread out layout)
        function initializePositions() {
            const displayWidth = canvas.clientWidth || canvas.width;
            const displayHeight = canvas.clientHeight || canvas.height;
            const centerX = displayWidth / 2;
            const centerY = displayHeight / 2;
            const clusterRadius = Math.min(displayWidth, displayHeight) * 0.38;

            const categories = {
                business: { angle: 0, count: 0 },
                urban: { angle: (2 * Math.PI) / 5, count: 0 },
                space: { angle: (4 * Math.PI) / 5, count: 0 },
                crisis: { angle: (6 * Math.PI) / 5, count: 0 },
                research: { angle: (8 * Math.PI) / 5, count: 0 }
            };

            // Count environments per category
            environments.forEach(env => {
                categories[env.category].count++;
            });

            // Position nodes in clusters with tighter packing
            const categoryOffsets = {};
            Object.keys(categories).forEach(cat => {
                categoryOffsets[cat] = 0;
            });

            environments.forEach(env => {
                const catInfo = categories[env.category];
                const offset = categoryOffsets[env.category];

                // Create spiral pattern within each cluster for density
                const spiralRadius = (offset / catInfo.count) * 80 + 40;
                const spiralAngle = offset * 0.8 + (Math.random() - 0.5) * 0.4;

                const clusterX = Math.cos(catInfo.angle) * clusterRadius;
                const clusterY = Math.sin(catInfo.angle) * clusterRadius;

                const localX = Math.cos(spiralAngle) * spiralRadius;
                const localY = Math.sin(spiralAngle) * spiralRadius;

                env.x = centerX + clusterX + localX;
                env.y = centerY + clusterY + localY;
                env.vx = (Math.random() - 0.5) * 0.25;
                env.vy = (Math.random() - 0.5) * 0.25;

                categoryOffsets[env.category]++;
            });
        }

        // Calculate node size based on actors and age (dramatic variance)
        function getNodeSize(env) {
            // More dramatic exponential scaling
            // Actor contribution: 0-50 points (heavily weighted)
            const actorFactor = Math.pow(env.actors / 10, 0.7);

            // Age contribution: 0-25 points (grows with maturity)
            const ageFactor = Math.pow(env.ageWeeks, 0.85) * 1.5;

            // Combined size with much wider range: 15px to 90px
            const baseSize = actorFactor + ageFactor;
            return Math.max(15, Math.min(90, baseSize));
        }

        // Update node positions with gentle floating
        function updatePositions() {
            const displayWidth = canvas.clientWidth || canvas.width;
            const displayHeight = canvas.clientHeight || canvas.height;

            environments.forEach(env => {
                // Apply velocity
                env.x += env.vx;
                env.y += env.vy;

                // Gentle random movement
                env.vx += (Math.random() - 0.5) * 0.05;
                env.vy += (Math.random() - 0.5) * 0.05;

                // Damping
                env.vx *= 0.98;
                env.vy *= 0.98;

                // Boundary collision with soft bounce
                const margin = 100;
                if (env.x < margin || env.x > displayWidth - margin) {
                    env.vx *= -0.5;
                    env.x = Math.max(margin, Math.min(displayWidth - margin, env.x));
                }
                if (env.y < margin || env.y > displayHeight - margin) {
                    env.vy *= -0.5;
                    env.y = Math.max(margin, Math.min(displayHeight - margin, env.y));
                }

                // Gentle pull toward center
                const centerX = displayWidth / 2;
                const centerY = displayHeight / 2;
                const dx = centerX - env.x;
                const dy = centerY - env.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist > 250) {
                    env.vx += (dx / dist) * 0.02;
                    env.vy += (dy / dist) * 0.02;
                }
            });
        }

        // Draw connections between nodes
        function drawConnections() {
            connections.forEach(([id1, id2]) => {
                const env1 = environments.find(e => e.id === id1);
                const env2 = environments.find(e => e.id === id2);

                if (!env1 || !env2) return;
                if (currentFilter !== 'all' && env1.category !== currentFilter && env2.category !== currentFilter) return;

                const distance = Math.sqrt(Math.pow(env1.x - env2.x, 2) + Math.pow(env1.y - env2.y, 2));
                const opacity = Math.max(0, 1 - distance / 400) * 0.15;

                ctx.beginPath();
                ctx.moveTo(env1.x, env1.y);
                ctx.lineTo(env2.x, env2.y);
                ctx.strokeStyle = `rgba(91, 154, 168, ${opacity})`;
                ctx.lineWidth = 1;
                ctx.stroke();

                // Animated particles along connections
                if (Math.random() > 0.98) {
                    const t = Math.random();
                    const px = env1.x + (env2.x - env1.x) * t;
                    const py = env1.y + (env2.y - env1.y) * t;

                    ctx.beginPath();
                    ctx.arc(px, py, 2, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(91, 154, 168, 0.4)';
                    ctx.fill();
                }
            });
        }

        // Draw nodes
        function drawNodes() {
            const time = Date.now() / 1000;

            environments.forEach(env => {
                if (currentFilter !== 'all' && env.category !== currentFilter) {
                    return;
                }

                const size = getNodeSize(env);
                const isHovered = hoveredNode === env;
                const pulseSize = size + Math.sin(time * 2 + env.id) * 2;

                // Outer glow
                const gradient = ctx.createRadialGradient(env.x, env.y, 0, env.x, env.y, pulseSize + 10);
                gradient.addColorStop(0, env.color + '40');
                gradient.addColorStop(0.5, env.color + '20');
                gradient.addColorStop(1, env.color + '00');
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(env.x, env.y, pulseSize + 10, 0, Math.PI * 2);
                ctx.fill();

                // Node circle
                ctx.beginPath();
                ctx.arc(env.x, env.y, isHovered ? size * 1.2 : pulseSize, 0, Math.PI * 2);
                ctx.fillStyle = isHovered ? env.color : env.color + 'cc';
                ctx.fill();

                // Border
                ctx.strokeStyle = isHovered ? '#ffffff' : env.color;
                ctx.lineWidth = isHovered ? 3 : 2;
                ctx.stroke();

                // Icon with better rendering
                ctx.save();
                ctx.font = `bold ${Math.floor(size * 0.7)}px "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", Arial`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillStyle = '#ffffff';
                ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
                ctx.shadowBlur = 4;
                ctx.fillText(env.icon, env.x, env.y);
                ctx.restore();

                // Actor count indicator (small badge) with golden accent
                if (!isHovered && size > 25) {
                    const badgeX = env.x + size * 0.55;
                    const badgeY = env.y - size * 0.55;
                    const badgeRadius = Math.max(10, size * 0.22);

                    ctx.beginPath();
                    ctx.arc(badgeX, badgeY, badgeRadius, 0, Math.PI * 2);
                    ctx.fillStyle = '#d4af37';
                    ctx.fill();
                    ctx.strokeStyle = '#000000';
                    ctx.lineWidth = 1.5;
                    ctx.stroke();

                    ctx.font = `bold ${Math.floor(badgeRadius * 1.2)}px Arial`;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillStyle = '#000000';
                    ctx.fillText(env.actors, badgeX, badgeY);
                }
            });
        }

        // Animation loop
        function animate() {
            const displayWidth = canvas.clientWidth || canvas.width;
            const displayHeight = canvas.clientHeight || canvas.height;

            // Clear canvas
            ctx.clearRect(0, 0, displayWidth, displayHeight);

            // Draw subtle grid for debugging (remove later)
            // ctx.strokeStyle = 'rgba(0, 217, 255, 0.05)';
            // ctx.lineWidth = 1;
            // for (let i = 0; i < canvas.width; i += 50) {
            //     ctx.beginPath();
            //     ctx.moveTo(i, 0);
            //     ctx.lineTo(i, canvas.height);
            //     ctx.stroke();
            // }
            // for (let i = 0; i < canvas.height; i += 50) {
            //     ctx.beginPath();
            //     ctx.moveTo(0, i);
            //     ctx.lineTo(canvas.width, i);
            //     ctx.stroke();
            // }

            updatePositions();
            drawConnections();
            drawNodes();

            animationId = requestAnimationFrame(animate);
        }

        // Mouse movement for hover detection
        canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            let found = null;
            environments.forEach(env => {
                if (currentFilter !== 'all' && env.category !== currentFilter) return;

                const size = getNodeSize(env);
                const distance = Math.sqrt(Math.pow(mouseX - env.x, 2) + Math.pow(mouseY - env.y, 2));
                if (distance < size) {
                    found = env;
                }
            });

            if (found !== hoveredNode) {
                hoveredNode = found;
                if (hoveredNode) {
                    showTooltip(hoveredNode, e.clientX, e.clientY);
                } else {
                    hideTooltip();
                }
            } else if (hoveredNode) {
                updateTooltipPosition(e.clientX, e.clientY);
            }
        });

        canvas.addEventListener('mouseleave', () => {
            hoveredNode = null;
            hideTooltip();
        });

        // Show tooltip
        function showTooltip(env, x, y) {
            tooltip.innerHTML = `
                <div class="tooltip-category">${env.category}</div>
                <div class="tooltip-header">
                    <span class="tooltip-icon">${env.icon}</span>
                    <h3 class="tooltip-title">${env.name}</h3>
                </div>
                <p class="tooltip-description">${env.description}</p>
                <div class="tooltip-stats">
                    <div class="tooltip-stat">
                        <span class="tooltip-stat-label">Active Actors</span>
                        <span class="tooltip-stat-value">${env.actors}</span>
                    </div>
                    <div class="tooltip-stat">
                        <span class="tooltip-stat-label">Age</span>
                        <span class="tooltip-stat-value">${env.ageWeeks} weeks</span>
                    </div>
                    <div class="tooltip-stat">
                        <span class="tooltip-stat-label">Difficulty</span>
                        <span class="tooltip-stat-value">${env.difficulty}</span>
                    </div>
                    <div class="tooltip-stat">
                        <span class="tooltip-stat-label">Duration</span>
                        <span class="tooltip-stat-value">${env.timeframe}</span>
                    </div>
                </div>
                <div class="tooltip-reward">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="1.5"/>
                        <path d="M10 6V14M7 9H12C12.5523 9 13 9.44772 13 10C13 10.5523 12.5523 11 12 11H8C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13H13" stroke="currentColor" stroke-width="1.5"/>
                    </svg>
                    <span>${env.reward}</span>
                </div>
            `;
            updateTooltipPosition(x, y);
            tooltip.classList.add('visible');
        }

        // Update tooltip position
        function updateTooltipPosition(x, y) {
            tooltip.style.left = x + 'px';
            tooltip.style.top = (y - 20) + 'px';
        }

        // Hide tooltip
        function hideTooltip() {
            tooltip.classList.remove('visible');
        }

        // Filter buttons
        const filterButtons = document.querySelectorAll('.network-filter');
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                currentFilter = button.dataset.category;
                hoveredNode = null;
                hideTooltip();
            });
        });

        // Initialize after a short delay to ensure layout is complete
        setTimeout(() => {
            resizeCanvas();

            // Double-check canvas has dimensions
            if (canvas.width === 0 || canvas.height === 0) {
                console.error('Canvas still has zero dimensions after resize!');
                console.log('Container dimensions:', canvas.parentElement.clientWidth, 'x', canvas.parentElement.clientHeight);
            } else {
                console.log('Starting animation...');
                animate();
            }
        }, 50);

        window.addEventListener('resize', resizeCanvas);

        // Cleanup on page unload
        window.addEventListener('beforeunload', () => {
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
        });
    }

    // ============================================
    // Console Easter Egg
    // ============================================
    console.log('%cWelcome to OpenSims.ai! 🌌', 'color: #00d9ff; font-size: 24px; font-weight: bold;');
    console.log('%cInterested in building simulations? Join our creator program!', 'color: #8b7aa8; font-size: 14px;');
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
