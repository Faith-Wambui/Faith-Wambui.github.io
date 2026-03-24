// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing scripts...');

    // ===================================
    // THEME TOGGLE
    // ===================================
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;

    // Load saved theme or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);
    console.log('Initial theme:', savedTheme);

    // Theme toggle click handler
    if (themeToggle) {
        themeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            console.log('Theme changed from', currentTheme, 'to', newTheme);
        });
        console.log('Theme toggle initialized');
    } else {
        console.error('Theme toggle button not found!');
    }

    // ===================================
    // NAVIGATION TOGGLE (HAMBURGER MENU)
    // ===================================
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const sideNav = document.getElementById('sideNav');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            sideNav.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
            console.log('Navigation menu toggled');
        });
        console.log('Navigation toggle initialized');
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (sideNav && mobileMenuToggle && 
            !sideNav.contains(e.target) && 
            !mobileMenuToggle.contains(e.target)) {
            sideNav.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });

    // ===================================
    // TYPED.JS ANIMATION
    // ===================================
    const typedElement = document.querySelector('.typed-gradient');
    
    if (typedElement && typeof Typed !== 'undefined') {
        try {
            new Typed('.typed-gradient', {
                strings: [
                    "Data Analytics",
                    "Data Governance",
                    "Climate Advocacy",
                    "Business Intelligence",
                    "Impact Evaluation",
                    "AI-Powered Data Solutions"
                ],
                typeSpeed: 50,
                backSpeed: 40,
                loop: true,
                showCursor: true,
                cursorChar: '|'
            });
            console.log('Typed.js initialized');
        } catch (error) {
            console.error('Typed.js error:', error);
        }
    } else {
        if (!typedElement) console.warn('Typed element not found');
        if (typeof Typed === 'undefined') console.warn('Typed.js library not loaded');
    }

    // ===================================
    // ACTIVE PAGE HIGHLIGHT
    // ===================================
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        // Remove active from all first
        link.classList.remove('active');
        
        // Add active to current page
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html') ||
            (currentPage === '/' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            sideNav.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });

    // ===================================
    // SCROLL ANIMATIONS
    // ===================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe cards
    const animatedElements = document.querySelectorAll('.project-card, .experience-card, .skill-category');
    animatedElements.forEach(function(el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ===================================
    // FORM HANDLING
    // ===================================
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }

    // ===================================
    // NAVBAR SHADOW ON SCROLL
    // ===================================
    const navbar = document.querySelector('.top-navbar');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 10px var(--shadow-light)';
        }
    });

    // ===================================
    // PROJECT CARD HOVER EFFECT
    // ===================================
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(function(card) {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 100;
            const rotateY = (centerX - x) / 100;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ===================================
    // RESPONSIVE HANDLING
    // ===================================
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Close menu when resizing
            sideNav.classList.remove('active');
            if (mobileMenuToggle) {
                mobileMenuToggle.classList.remove('active');
            }
        }, 250);
    });
     

    // ===================================
    // FADE IN PAGE ON LOAD
    // ===================================
    document.body.style.opacity = '1';

    console.log('All scripts initialized successfully!');
});

// Smooth scroll AND highlight active section
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    const sections = document.querySelectorAll('section[id]');
    
    // Smooth scroll on click
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Highlight active section on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // Check if section is in viewport (middle of screen)
            if (window.scrollY >= sectionTop - 250) {
                current = section.getAttribute('id');
            }
        });
        
        // Update active class
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
    // ============================================================================
    // === SCROLL TO TOP ===
    // ============================================================================
    /**
     * Scrolls page to top when scroll-to-top button is clicked.
     */

    function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollTop');
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
        top: 0,
        behavior: 'smooth'
        });
    });
    }

    initScrollToTop();
});