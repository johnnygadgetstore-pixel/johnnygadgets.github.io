
// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            const isExpanded = nav.classList.contains('active');
            mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                if (mobileMenuToggle) {
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = nav.contains(event.target);
        const isClickOnToggle = mobileMenuToggle && mobileMenuToggle.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnToggle && nav.classList.contains('active')) {
            nav.classList.remove('active');
            if (mobileMenuToggle) {
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            }
        }
    });
});

// Smooth Scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll animation to elements when they come into viewport
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to service cards, feature cards, etc.
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.service-card, .feature-card, .contact-card, .highlight-box, .stat');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Header shadow on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
});

// WhatsApp button analytics (optional - track clicks)
document.querySelectorAll('a[href*="wa.me"]').forEach(button => {
    button.addEventListener('click', function() {
        console.log('WhatsApp button clicked');
        // You can add analytics tracking here if needed
    });
});

// Handle sharing (Web Share API)
function shareWebsite() {
    if (navigator.share) {
        navigator.share({
            title: 'Johnny Gadgets - Especialistas em MacBooks',
            text: 'Reparação, compra e venda de MacBooks em Lisboa. Diagnóstico gratuito!',
            url: window.location.href
        })
        .then(() => console.log('Shared successfully'))
        .catch((error) => console.log('Error sharing:', error));
    } else {
        // Fallback for browsers that don't support Web Share API
        console.log('Web Share API not supported');
    }
}

// Lazy loading for images (if you add more images later)
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for older browsers
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Prevent console errors
window.addEventListener('error', function(e) {
    // Suppress some common errors
    if (e.message.includes('favicon')) {
        e.preventDefault();
    }
});

// Add loading state to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        if (this.href && this.href.includes('wa.me')) {
            this.style.opacity = '0.8';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 300);
        }
    });
});

// Performance optimization - defer non-critical scripts
window.addEventListener('load', function() {
    // Any additional scripts or functionality can be loaded here
    console.log('Johnny Gadgets website loaded successfully');
});
