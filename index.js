/**
 * WebPro Studio - Interactive JavaScript
 * Modern Portfolio Website
 */

document.addEventListener('DOMContentLoaded', function() {
    // ================================
    // HEADER SCROLL EFFECT
    // ================================
    const header = document.getElementById('header');
    
    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    
    // ================================
    // MOBILE NAVIGATION
    // ================================
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');
    
    // Open menu
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Close menu
    if (navClose) {
        navClose.addEventListener('click', function() {
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Close menu when clicking a link
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // ================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ================================
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ================================
    // ACTIVE NAVIGATION LINK
    // ================================
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(function(section) {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(function(link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink(); // Check initial state
    
    // ================================
    // SCROLL REVEAL ANIMATION
    // ================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Add reveal class to elements
    const revealElements = document.querySelectorAll(
        '.service-card, .portfolio-card, .contact-card, .about__feature'
    );
    
    revealElements.forEach(function(el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
    
    // Add style for revealed elements
    const style = document.createElement('style');
    style.textContent = `
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
    
    // ================================
    // WHATSAPP CLICK TRACKING
    // ================================
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    
    whatsappLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            // Track WhatsApp clicks (can be connected to analytics)
            console.log('WhatsApp click tracked:', this.href);
            
            // You can add Google Analytics tracking here
            // gtag('event', 'click', {
            //     'event_category': 'WhatsApp',
            //     'event_label': 'Contact'
            // });
        });
    });
    
    // ================================
    // LAZY LOAD IMAGES
    // ================================
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(function(img) {
            imageObserver.observe(img);
        });
    }
    
    // ================================
    // SERVICE CARD STAGGER ANIMATION
    // ================================
    const serviceCards = document.querySelectorAll('.service-card');
    
    const serviceObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry, index) {
            if (entry.isIntersecting) {
                setTimeout(function() {
                    entry.target.classList.add('revealed');
                }, index * 100);
                serviceObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    serviceCards.forEach(function(card, index) {
        card.style.transitionDelay = (index * 0.1) + 's';
        serviceObserver.observe(card);
    });
    
    // ================================
    // PORTFOLIO CARD HOVER EFFECT
    // ================================
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    
    portfolioCards.forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // ================================
    // FLOATING CARDS PARALLAX
    // ================================
    const floatingCards = document.querySelectorAll('.floating-card');
    
    if (window.innerWidth > 968) {
        document.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            floatingCards.forEach(function(card, index) {
                const speed = (index + 1) * 10;
                const x = (mouseX - 0.5) * speed;
                const y = (mouseY - 0.5) * speed;
                
                card.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
    }
    
    // ================================
    // COUNTER ANIMATION FOR STATS
    // ================================
    const statNumbers = document.querySelectorAll('.stat__number');
    
    function animateCounter(el) {
        const target = parseInt(el.textContent);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const suffix = el.textContent.replace(/[0-9]/g, '');
        
        function updateCounter() {
            current += step;
            if (current < target) {
                el.textContent = Math.floor(current) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                el.textContent = target + suffix;
            }
        }
        
        updateCounter();
    }
    
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(function(stat) {
        statsObserver.observe(stat);
    });
    
    // ================================
    // KEYBOARD NAVIGATION
    // ================================
    document.addEventListener('keydown', function(e) {
        // ESC to close mobile menu
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // ================================
    // CONSOLE MESSAGE
    // ================================
    console.log('%c🌐 WebPro Studio', 'font-size: 24px; font-weight: bold; color: #6366F1;');
    console.log('%cJasa Pembuatan Website Profesional di Sumatra Barat', 'font-size: 14px; color: #64748B;');
    console.log('%cHubungi: +62 851-6917-5438', 'font-size: 12px; color: #06B6D4;');
});
