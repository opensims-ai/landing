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
    // Network Visualization for Environments (D3.js)
    // ============================================

    // Check if SVG element exists
    const svgElement = document.getElementById('environmentNetwork');
    const networkTooltip = document.getElementById('networkTooltip');

    console.log('SVG element:', svgElement);
    console.log('Tooltip element:', networkTooltip);

    if (svgElement && networkTooltip) {
        console.log('Initializing D3.js network visualization...');

        // Environment data with clustering - Realistic Business Domains
        // Environment data with clustering - Realistic Business Domains
// Realistic Business-Focused Environments
const environments = [
    // Finance - 4 environments
    {
        id: 1,
        name: 'Investment Analyst',
        icon: '📊',
        category: 'finance',
        description: 'Analyze markets, evaluate securities, and provide investment recommendations.',
        actors: 456,
        ageWeeks: 24,
        difficulty: 'Advanced',
        timeframe: '3-5 weeks',
        reward: '10,000-35,000 OSC',
        color: '#7aa88b',
        x: 0, y: 0, vx: 0, vy: 0
    },
    {
        id: 2,
        name: 'Financial Advisor',
        icon: '💼',
        category: 'finance',
        description: 'Guide clients through wealth management and retirement planning.',
        actors: 342,
        ageWeeks: 20,
        difficulty: 'Intermediate',
        timeframe: '2-4 weeks',
        reward: '8,000-28,000 OSC',
        color: '#8b9a7a',
        x: 0, y: 0, vx: 0, vy: 0
    },
    {
        id: 3,
        name: 'Risk Manager',
        icon: '🛡️',
        category: 'finance',
        description: 'Identify and mitigate financial risks across portfolios.',
        actors: 289,
        ageWeeks: 18,
        difficulty: 'Advanced',
        timeframe: '3-6 weeks',
        reward: '9,000-32,000 OSC',
        color: '#7a9a88',
        x: 0, y: 0, vx: 0, vy: 0
    },
    {
        id: 4,
        name: 'Credit Analyst',
        icon: '💳',
        category: 'finance',
        description: 'Assess creditworthiness and evaluate loan applications.',
        actors: 198,
        ageWeeks: 14,
        difficulty: 'Intermediate',
        timeframe: '2-4 weeks',
        reward: '7,000-25,000 OSC',
        color: '#8a9a7b',
        x: 0, y: 0, vx: 0, vy: 0
    },

    // Trading - 4 environments
    {
        id: 5,
        name: 'Day Trader',
        icon: '📈',
        category: 'trading',
        description: 'Execute short-term trades and capitalize on market volatility.',
        actors: 523,
        ageWeeks: 28,
        difficulty: 'Expert',
        timeframe: '4-7 weeks',
        reward: '12,000-40,000 OSC',
        color: '#a89a7a',
        x: 0, y: 0, vx: 0, vy: 0
    },
    {
        id: 6,
        name: 'Crypto Trader',
        icon: '₿',
        category: 'trading',
        description: 'Navigate cryptocurrency markets and DeFi opportunities.',
        actors: 612,
        ageWeeks: 32,
        difficulty: 'Expert',
        timeframe: '5-8 weeks',
        reward: '15,000-45,000 OSC',
        color: '#b89a7a',
        x: 0, y: 0, vx: 0, vy: 0
    },
    {
        id: 7,
        name: 'Portfolio Manager',
        icon: '📂',
        category: 'trading',
        description: 'Manage diverse investment portfolios and optimize returns.',
        actors: 378,
        ageWeeks: 22,
        difficulty: 'Advanced',
        timeframe: '3-6 weeks',
        reward: '10,000-35,000 OSC',
        color: '#a88b7a',
        x: 0, y: 0, vx: 0, vy: 0
    },
    {
        id: 8,
        name: 'Options Trader',
        icon: '📉',
        category: 'trading',
        description: 'Execute complex options strategies and manage derivatives.',
        actors: 267,
        ageWeeks: 16,
        difficulty: 'Expert',
        timeframe: '4-7 weeks',
        reward: '11,000-38,000 OSC',
        color: '#a89a7b',
        x: 0, y: 0, vx: 0, vy: 0
    },

    // Personal Assistants - 3 environments
    {
        id: 9,
        name: 'Executive Assistant',
        icon: '📋',
        category: 'assistant',
        description: 'Manage executive calendars, communications, and priorities.',
        actors: 445,
        ageWeeks: 26,
        difficulty: 'Intermediate',
        timeframe: '2-4 weeks',
        reward: '6,000-22,000 OSC',
        color: '#8b7aa8',
        x: 0, y: 0, vx: 0, vy: 0
    },
    {
        id: 10,
        name: 'Project Coordinator',
        icon: '📊',
        category: 'assistant',
        description: 'Coordinate cross-functional teams and track project deliverables.',
        actors: 356,
        ageWeeks: 19,
        difficulty: 'Intermediate',
        timeframe: '2-5 weeks',
        reward: '5,000-20,000 OSC',
        color: '#8b7a9a',
        x: 0, y: 0, vx: 0, vy: 0
    },
    {
        id: 11,
        name: 'Administrative Manager',
        icon: '📝',
        category: 'assistant',
        description: 'Optimize office operations and administrative processes.',
        actors: 298,
        ageWeeks: 17,
        difficulty: 'Intermediate',
        timeframe: '2-4 weeks',
        reward: '5,000-19,000 OSC',
        color: '#9b7aa8',
        x: 0, y: 0, vx: 0, vy: 0
    },

    // Software Development - 5 environments
    {
        id: 12,
        name: 'Frontend Developer',
        icon: '💻',
        category: 'development',
        description: 'Build responsive user interfaces and optimize web experiences.',
        actors: 589,
        ageWeeks: 30,
        difficulty: 'Advanced',
        timeframe: '3-6 weeks',
        reward: '9,000-30,000 OSC',
        color: '#5b9aa8',
        x: 0, y: 0, vx: 0, vy: 0
    },
    {
        id: 13,
        name: 'Backend Developer',
        icon: '⚙️',
        category: 'development',
        description: 'Design APIs, databases, and server-side architecture.',
        actors: 623,
        ageWeeks: 34,
        difficulty: 'Advanced',
        timeframe: '4-7 weeks',
        reward: '10,000-35,000 OSC',
        color: '#6b9aa8',
        x: 0, y: 0, vx: 0, vy: 0
    },
    {
        id: 14,
        name: 'DevOps Engineer',
        icon: '🔧',
        category: 'development',
        description: 'Automate deployments and maintain cloud infrastructure.',
        actors: 412,
        ageWeeks: 23,
        difficulty: 'Expert',
        timeframe: '4-8 weeks',
        reward: '11,000-38,000 OSC',
        color: '#5b9aaa',
        x: 0, y: 0, vx: 0, vy: 0
    },
    {
        id: 15,
        name: 'QA Engineer',
        icon: '🧪',
        category: 'development',
        description: 'Design test strategies and ensure software quality.',
        actors: 334,
        ageWeeks: 21,
        difficulty: 'Intermediate',
        timeframe: '3-5 weeks',
        reward: '7,000-26,000 OSC',
        color: '#6b9a9a',
        x: 0, y: 0, vx: 0, vy: 0
    },
    {
        id: 16,
        name: 'Full Stack Developer',
        icon: '🖥️',
        category: 'development',
        description: 'Handle end-to-end development from frontend to backend.',
        actors: 498,
        ageWeeks: 27,
        difficulty: 'Advanced',
        timeframe: '4-7 weeks',
        reward: '10,000-34,000 OSC',
        color: '#5b9a98',
        x: 0, y: 0, vx: 0, vy: 0
    },

    // Accountants - 3 environments
    {
        id: 17,
        name: 'Tax Accountant',
        icon: '📑',
        category: 'accounting',
        description: 'Prepare tax returns and optimize tax strategies for clients.',
        actors: 389,
        ageWeeks: 22,
        difficulty: 'Advanced',
        timeframe: '3-6 weeks',
        reward: '8,000-29,000 OSC',
        color: '#7aa88b',
        x: 0, y: 0, vx: 0, vy: 0
    },
    {
        id: 18,
        name: 'Bookkeeper',
        icon: '📚',
        category: 'accounting',
        description: 'Maintain financial records and reconcile accounts.',
        actors: 423,
        ageWeeks: 25,
        difficulty: 'Intermediate',
        timeframe: '2-4 weeks',
        reward: '6,000-23,000 OSC',
        color: '#7a9a8b',
        x: 0, y: 0, vx: 0, vy: 0
    },
    {
        id: 19,
        name: 'Financial Auditor',
        icon: '🔍',
        category: 'accounting',
        description: 'Review financial statements and ensure compliance.',
        actors: 312,
        ageWeeks: 18,
        difficulty: 'Advanced',
        timeframe: '3-5 weeks',
        reward: '9,000-31,000 OSC',
        color: '#8a9a8b',
        x: 0, y: 0, vx: 0, vy: 0
    },

    // Legal - 4 environments
    {
        id: 20,
        name: 'Contract Attorney',
        icon: '📜',
        category: 'legal',
        description: 'Draft, review, and negotiate business contracts.',
        actors: 367,
        ageWeeks: 21,
        difficulty: 'Expert',
        timeframe: '4-7 weeks',
        reward: '12,000-40,000 OSC',
        color: '#a87b8b',
        x: 0, y: 0, vx: 0, vy: 0
    },
    {
        id: 21,
        name: 'Legal Researcher',
        icon: '⚖️',
        category: 'legal',
        description: 'Conduct legal research and analyze case law.',
        actors: 278,
        ageWeeks: 16,
        difficulty: 'Advanced',
        timeframe: '3-5 weeks',
        reward: '8,000-28,000 OSC',
        color: '#a87b9b',
        x: 0, y: 0, vx: 0, vy: 0
    },
    {
        id: 22,
        name: 'Compliance Officer',
        icon: '🏛️',
        category: 'legal',
        description: 'Ensure regulatory compliance and manage risk.',
        actors: 445,
        ageWeeks: 26,
        difficulty: 'Expert',
        timeframe: '4-7 weeks',
        reward: '11,000-37,000 OSC',
        color: '#a87b7b',
        x: 0, y: 0, vx: 0, vy: 0
    },
    {
        id: 23,
        name: 'Paralegal',
        icon: '📄',
        category: 'legal',
        description: 'Assist attorneys with case preparation and documentation.',
        actors: 334,
        ageWeeks: 19,
        difficulty: 'Intermediate',
        timeframe: '2-5 weeks',
        reward: '6,000-24,000 OSC',
        color: '#987b8b',
        x: 0, y: 0, vx: 0, vy: 0
    },

    // Operations - 4 environments
    {
        id: 24,
        name: 'Operations Manager',
        icon: '⚙️',
        category: 'operations',
        description: 'Optimize business processes and improve operational efficiency.',
        actors: 512,
        ageWeeks: 29,
        difficulty: 'Advanced',
        timeframe: '4-7 weeks',
        reward: '10,000-35,000 OSC',
        color: '#a88b7a',
        x: 0, y: 0, vx: 0, vy: 0
    },
    {
        id: 25,
        name: 'Supply Chain Manager',
        icon: '🚚',
        category: 'operations',
        description: 'Coordinate logistics and optimize supply chain operations.',
        actors: 456,
        ageWeeks: 27,
        difficulty: 'Advanced',
        timeframe: '3-6 weeks',
        reward: '9,000-32,000 OSC',
        color: '#a88b8a',
        x: 0, y: 0, vx: 0, vy: 0
    },
    {
        id: 26,
        name: 'Logistics Coordinator',
        icon: '📦',
        category: 'operations',
        description: 'Manage shipments, inventory, and distribution networks.',
        actors: 389,
        ageWeeks: 23,
        difficulty: 'Intermediate',
        timeframe: '2-5 weeks',
        reward: '7,000-26,000 OSC',
        color: '#988b7a',
        x: 0, y: 0, vx: 0, vy: 0
    },
    {
        id: 27,
        name: 'Process Improvement Lead',
        icon: '📊',
        category: 'operations',
        description: 'Identify bottlenecks and implement efficiency improvements.',
        actors: 298,
        ageWeeks: 17,
        difficulty: 'Advanced',
        timeframe: '3-6 weeks',
        reward: '8,000-29,000 OSC',
        color: '#a89b7a',
        x: 0, y: 0, vx: 0, vy: 0
    },

    // Business Strategy - 3 environments
    {
        id: 28,
        name: 'Strategy Consultant',
        icon: '🎯',
        category: 'strategy',
        description: 'Develop corporate strategies and growth roadmaps.',
        actors: 578,
        ageWeeks: 31,
        difficulty: 'Expert',
        timeframe: '5-8 weeks',
        reward: '14,000-45,000 OSC',
        color: '#8b7aa8',
        x: 0, y: 0, vx: 0, vy: 0
    },
    {
        id: 29,
        name: 'Business Analyst',
        icon: '📊',
        category: 'strategy',
        description: 'Analyze business data and provide actionable insights.',
        actors: 489,
        ageWeeks: 28,
        difficulty: 'Advanced',
        timeframe: '3-6 weeks',
        reward: '9,000-33,000 OSC',
        color: '#8b7a98',
        x: 0, y: 0, vx: 0, vy: 0
    },
    {
        id: 30,
        name: 'Market Researcher',
        icon: '🔍',
        category: 'strategy',
        description: 'Conduct market analysis and competitive intelligence.',
        actors: 412,
        ageWeeks: 24,
        difficulty: 'Advanced',
        timeframe: '3-5 weeks',
        reward: '8,000-30,000 OSC',
        color: '#9b7aa8',
        x: 0, y: 0, vx: 0, vy: 0
    }
];

        // Connection pairs - defines which environments are linked
        const connections = [
            // Finance cluster (1-4)
            [1, 2], [1, 3], [2, 3], [2, 4], [3, 4],

            // Trading cluster (5-8)
            [5, 6], [5, 7], [6, 7], [6, 8], [7, 8],

            // Assistant cluster (9-11)
            [9, 10], [9, 11], [10, 11],

            // Development cluster (12-16)
            [12, 13], [12, 14], [12, 15], [12, 16],
            [13, 14], [13, 15], [13, 16],
            [14, 15], [15, 16],

            // Accounting cluster (17-19)
            [17, 18], [17, 19], [18, 19],

            // Legal cluster (20-23)
            [20, 21], [20, 22], [21, 22], [21, 23], [22, 23],

            // Operations cluster (24-27)
            [24, 25], [24, 26], [24, 27], [25, 26], [26, 27],

            // Strategy cluster (28-30)
            [28, 29], [28, 30], [29, 30],

            // Cross-category connections
            [1, 5], [2, 6], [3, 17], [4, 18],  // Finance-Trading-Accounting
            [9, 24], [10, 26], [11, 27],        // Assistant-Operations
            [12, 13], [14, 24], [15, 12],       // Dev-Operations
            [17, 20], [18, 21], [19, 22],       // Accounting-Legal
            [20, 28], [22, 28], [23, 29],       // Legal-Strategy
            [24, 28], [25, 29], [27, 28],       // Operations-Strategy
            [1, 28], [5, 29], [12, 30]          // Various-Strategy
        ];

        // ============================================
        // D3.js Network Visualization
        // ============================================
// D3.js Network Visualization for Environments
const svg = d3.select('#environmentNetwork');
let currentFilter = 'all';

// Get container dimensions
const container = svg.node().parentElement;
const width = container.clientWidth;
const height = container.clientHeight;

svg.attr('width', width).attr('height', height);

// Create groups for layers
const g = svg.append('g');
const linkGroup = g.append('g').attr('class', 'links');
const nodeGroup = g.append('g').attr('class', 'nodes');

// Enable zoom
const zoom = d3.zoom()
    .scaleExtent([0.5, 3])
    .on('zoom', (event) => {
        g.attr('transform', event.transform);
    });

svg.call(zoom);

// Prepare data
const nodes = environments.map(d => ({...d}));
const links = connections.map(([source, target]) => ({
    source: source - 1,  // D3 uses 0-based indexing
    target: target - 1
}));

// Create force simulation
const simulation = d3.forceSimulation(nodes)
    .force('link', d3.forceLink(links)
        .id(d => d.id - 1)
        .distance(80))
    .force('charge', d3.forceManyBody().strength(-300))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collision', d3.forceCollide().radius(d => getNodeSize(d) + 5));

// Draw links
const link = linkGroup.selectAll('line')
    .data(links)
    .join('line')
    .attr('stroke', 'rgba(91, 154, 168, 0.2)')
    .attr('stroke-width', 1);

// Draw nodes
const node = nodeGroup.selectAll('g')
    .data(nodes)
    .join('g')
    .attr('class', 'node')
    .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));

// Node circles
node.append('circle')
    .attr('r', d => getNodeSize(d))
    .attr('fill', d => d.color)
    .attr('stroke', '#fff')
    .attr('stroke-width', 2)
    .style('filter', 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))');

// Node icons (text emoji)
node.append('text')
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'central')
    .attr('font-size', d => getNodeSize(d) * 0.6)
    .attr('pointer-events', 'none')
    .style('user-select', 'none')
    .text(d => d.icon);

// Actor count badge (cleaner, smaller)
node.filter(d => d.actors > 50)
    .append('g')
    .attr('class', 'actor-badge')
    .each(function(d) {
        const badge = d3.select(this);
        const size = getNodeSize(d);
        const badgeSize = 14;

        badge.append('circle')
            .attr('cx', size * 0.5)
            .attr('cy', -size * 0.5)
            .attr('r', badgeSize)
            .attr('fill', '#d4af37')
            .attr('stroke', '#000')
            .attr('stroke-width', 1.5);

        badge.append('text')
            .attr('x', size * 0.5)
            .attr('y', -size * 0.5)
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'central')
            .attr('font-size', '9px')
            .attr('font-weight', 'bold')
            .attr('fill', '#000')
            .attr('pointer-events', 'none')
            .text(d.actors > 999 ? '999+' : d.actors);
    });

// Node interactions
node.on('mouseover', function(event, d) {
    d3.select(this).select('circle')
        .transition().duration(200)
        .attr('r', getNodeSize(d) * 1.2)
        .attr('stroke-width', 3);

    showTooltip(event, d);
})
.on('mousemove', function(event) {
    networkTooltip.style.left = event.pageX + 'px';
    networkTooltip.style.top = (event.pageY - 20) + 'px';
})
.on('mouseout', function(event, d) {
    d3.select(this).select('circle')
        .transition().duration(200)
        .attr('r', getNodeSize(d))
        .attr('stroke-width', 2);

    hideTooltip();
});

// Update positions on simulation tick
simulation.on('tick', () => {
    link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

    node.attr('transform', d => `translate(${d.x},${d.y})`);
});

// Helper functions
function getNodeSize(env) {
    const actorFactor = Math.pow(env.actors / 10, 0.7);
    const ageFactor = Math.pow(env.ageWeeks, 0.85) * 1.5;
    const baseSize = actorFactor + ageFactor;
    return Math.max(20, Math.min(60, baseSize));
}

function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
}

function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}

function showTooltip(event, env) {
    networkTooltip.innerHTML = `
        <div class="tooltip-category">${env.category}</div>
        <div class="tooltip-header">
            <span class="tooltip-icon">${env.icon}</span>
            <h3 class="tooltip-title">${env.name}</h3>
        </div>
        <p class="tooltip-description">${env.description}</p>
        <div class="tooltip-stats">
            <div class="tooltip-stat">
                <span class="tooltip-stat-label">Active Contributors</span>
                <span class="tooltip-stat-value">${env.actors}</span>
            </div>
            <div class="tooltip-stat">
                <span class="tooltip-stat-label">Environment Age</span>
                <span class="tooltip-stat-value">${env.ageWeeks} weeks</span>
            </div>
            <div class="tooltip-stat">
                <span class="tooltip-stat-label">Difficulty</span>
                <span class="tooltip-stat-value">${env.difficulty}</span>
            </div>
            <div class="tooltip-stat">
                <span class="tooltip-stat-label">Time Commitment</span>
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
    networkTooltip.classList.add('visible');
}

function hideTooltip() {
    networkTooltip.classList.remove('visible');
}

// Filter functionality
document.querySelectorAll('.network-filter').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.network-filter').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        currentFilter = button.dataset.category;

        // Filter nodes and links
        node.style('opacity', d => currentFilter === 'all' || d.category === currentFilter ? 1 : 0.1);
        link.style('opacity', d => {
            const sourceMatch = currentFilter === 'all' || nodes[d.source.index].category === currentFilter;
            const targetMatch = currentFilter === 'all' || nodes[d.target.index].category === currentFilter;
            return (sourceMatch && targetMatch) ? 0.2 : 0.02;
        });
    });
});
    }

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
