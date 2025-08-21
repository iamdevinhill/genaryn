// Utility Functions
const utils = {
    // DOM element selector with error handling
    select: (selector) => {
        const element = document.querySelector(selector);
        if (!element) {
            console.warn(`Element not found: ${selector}`);
        }
        return element;
    },
    
    // Show notification with type (success, error, warning)
    showNotification: (message, type = 'info') => {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        // Set background color based on type
        const colors = {
            success: '#28a745',
            error: '#2DA5A8',
            warning: '#ffc107',
            info: '#17a2b8'
        };
        notification.style.background = colors[type] || colors.info;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    },
    
    // Email validation
    isValidEmail: (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    
    // Debounce function for performance
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded);
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Enhanced floating navbar scroll behavior
const handleNavbarScroll = utils.debounce(() => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, 10);

window.addEventListener('scroll', handleNavbarScroll);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.feature-card, .step, .contact-form, .contact-info');
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// Form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !message) {
            utils.showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!utils.isValidEmail(email)) {
            utils.showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        utils.showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
        this.reset();
    });
}

// Button click effects
document.querySelectorAll('.btn, .cta-button').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
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
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const phoneMockup = document.querySelector('.phone-mockup');
    
    if (hero && phoneMockup) {
        const rate = scrolled * -0.5;
        phoneMockup.style.transform = `translateY(${rate}px)`;
    }
});

// Create enhanced floating particles with better distribution
function createEnhancedParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    document.body.appendChild(particlesContainer);

    // Create more varied particles with different sizes and speeds
    for (let i = 0; i < 25; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 6 + 2;
        const duration = Math.random() * 25 + 15;
        const delay = Math.random() * 10;
        const startX = Math.random() * 100;
        const endX = Math.random() * 200 - 100;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, rgba(45, 165, 168, 0.4) 0%, rgba(34, 196, 199, 0.2) 50%, transparent 100%);
            border-radius: 50%;
            left: ${startX}%;
            top: 100%;
            animation: floatParticle ${duration}s linear infinite;
            animation-delay: ${delay}s;
            filter: blur(${Math.random() * 0.5}px);
        `;
        
        // Alternate particle colors
        if (i % 3 === 0) {
            particle.style.background = 'radial-gradient(circle, rgba(34, 196, 199, 0.4) 0%, rgba(45, 165, 168, 0.2) 50%, transparent 100%)';
        } else if (i % 3 === 1) {
            particle.style.background = 'radial-gradient(circle, rgba(26, 122, 125, 0.3) 0%, rgba(45, 165, 168, 0.15) 50%, transparent 100%)';
        }
        
        particlesContainer.appendChild(particle);
    }
}

// Create enhanced mesh overlay
function createMeshOverlay() {
    const meshOverlay = document.createElement('div');
    meshOverlay.className = 'mesh-overlay';
    document.body.appendChild(meshOverlay);
}

// Create enhanced light sweep effects
function createLightSweeps() {
    const lightSweep1 = document.createElement('div');
    lightSweep1.className = 'light-sweep';
    document.body.appendChild(lightSweep1);
    
    const lightSweep2 = document.createElement('div');
    lightSweep2.className = 'light-sweep';
    lightSweep2.style.animationDelay = '-7.5s';
    document.body.appendChild(lightSweep2);
}

// Create dynamic background elements
function createDynamicBackground() {
    // Create mesh overlay
    createMeshOverlay();
    
    // Create light sweeps
    createLightSweeps();
    
    // Create enhanced particles
    createEnhancedParticles();
}

// Enhanced floating animation for particles
const enhancedParticleStyle = document.createElement('style');
enhancedParticleStyle.textContent = `
    @keyframes floatParticle {
        0% {
            transform: translateY(100vh) translateX(0) scale(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
            transform: translateY(90vh) translateX(20px) scale(1) rotate(45deg);
        }
        50% {
            opacity: 0.6;
            transform: translateY(50vh) translateX(${Math.random() * 100 - 50}px) scale(1.2) rotate(180deg);
        }
        90% {
            opacity: 1;
            transform: translateY(10vh) translateX(-20px) scale(1) rotate(315deg);
        }
        100% {
            transform: translateY(-100px) translateX(0) scale(0) rotate(360deg);
            opacity: 0;
        }
    }
    
    .particle:nth-child(odd) {
        animation-direction: reverse;
    }
    
    .particle:nth-child(3n) {
        animation-duration: 1.5s;
    }
    
    .particle:nth-child(5n) {
        animation-duration: 2.5s;
    }
`;
document.head.appendChild(enhancedParticleStyle);

// Add loading animation to page
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Create dynamic background elements
    createDynamicBackground();
    
    // Animate hero content
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroButtons = document.querySelector('.hero-buttons');
    
    if (heroTitle) {
        setTimeout(() => heroTitle.classList.add('fade-in-up'), 200);
    }
    if (heroSubtitle) {
        setTimeout(() => heroSubtitle.classList.add('fade-in-up'), 400);
    }
    if (heroButtons) {
        setTimeout(() => heroButtons.classList.add('fade-in-up'), 600);
    }
});

// Add CSS for loading state
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    .hero-title,
    .hero-subtitle,
    .hero-buttons {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .hero-title.fade-in-up,
    .hero-subtitle.fade-in-up,
    .hero-buttons.fade-in-up {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(loadingStyle);

// Preorder button functionality
document.querySelectorAll('.cta-button, .btn-primary').forEach(button => {
    if (button.textContent.includes('Preorder') || button.textContent.includes('Download')) {
        button.addEventListener('click', () => {
            utils.showNotification('Preorder feature coming soon! Stay tuned for updates.', 'info');
        });
    }
});

// Add hover effects for feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add typing effect to hero title (optional)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Uncomment the line below to enable typing effect
// setTimeout(() => typeWriter(document.querySelector('.hero-title'), 'GENARYN FINDS IT.'), 1000);

// Add enhanced scroll progress indicator
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = scrolled + '%';
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        // Close notifications
        const notifications = document.querySelectorAll('.notification');
        notifications.forEach(notification => notification.remove());
    }
});

// Update footer year dynamically
document.addEventListener('DOMContentLoaded', () => {
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // Initialize contact form validation
    initializeContactForm();
});

// Contact form validation
function initializeContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;
    
    const inputs = contactForm.querySelectorAll('input, textarea');
    const submitButton = contactForm.querySelector('button[type="submit"]');
    
    // Remove any existing error states on page load
    inputs.forEach(input => {
        input.classList.remove('error', 'success');
    });
    
    // Real-time validation on input
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            validateField(this);
        });
        
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            // Show success message
            utils.showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            contactForm.reset();
            
            // Remove all validation states
            inputs.forEach(input => {
                input.classList.remove('error', 'success');
            });
        } else {
            utils.showNotification('Please fix the errors above and try again.', 'error');
        }
    });
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    
    // Remove existing states
    field.classList.remove('error', 'success');
    
    // Validation rules
    if (fieldName === 'name') {
        if (value.length < 2) {
            field.classList.add('error');
            isValid = false;
        } else {
            field.classList.add('success');
        }
    } else if (fieldName === 'email') {
        if (!utils.isValidEmail(value)) {
            field.classList.add('error');
            isValid = false;
        } else {
            field.classList.add('success');
        }
    } else if (fieldName === 'message') {
        if (value.length < 10) {
            field.classList.add('error');
            isValid = false;
        } else {
            field.classList.add('success');
        }
    }
    
    return isValid;
}

// Add touch support for mobile
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe up - could be used for navigation
            console.log('Swipe up detected');
        } else {
            // Swipe down - could be used for navigation
            console.log('Swipe down detected');
        }
    }
} 