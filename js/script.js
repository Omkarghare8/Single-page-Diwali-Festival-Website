/**
 * Diwali Festival Website - Main JavaScript
 * Author: AI Assistant
 * Version: 1.0
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavbar();
    initWishesSlider();
    initFireworks();
    initScrollAnimation();
    initContactForm();
});

/**
 * Navbar functionality
 * - Sticky navbar on scroll
 * - Mobile menu toggle
 * - Active link highlighting
 */
function initNavbar() {
    const header = document.querySelector('.header');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Sticky navbar on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.padding = '0.5rem 0';
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        } else {
            header.style.padding = '1rem 0';
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        }
        
        // Update active link based on scroll position
        updateActiveLink();
    });
    
    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = navToggle.querySelectorAll('span');
        spans.forEach(span => span.classList.toggle('active'));
        
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                
                const spans = navToggle.querySelectorAll('span');
                spans.forEach(span => span.classList.remove('active'));
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
            
            // Smooth scroll to target section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });
    
    // Update active link based on scroll position
    function updateActiveLink() {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

/**
 * Wishes Slider functionality
 * - Auto slide
 * - Manual navigation with dots and arrows
 */
function initWishesSlider() {
    const wishCards = document.querySelectorAll('.wish-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    let interval;
    
    // Function to show slide by index
    function showSlide(index) {
        // Remove active class from all slides and dots
        wishCards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        wishCards[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentIndex = index;
    }
    
    // Auto slide function
    function startAutoSlide() {
        interval = setInterval(() => {
            let nextIndex = (currentIndex + 1) % wishCards.length;
            showSlide(nextIndex);
        }, 5000);
    }
    
    // Initialize auto slide
    startAutoSlide();
    
    // Event listeners for manual navigation
    prevBtn.addEventListener('click', () => {
        clearInterval(interval);
        let prevIndex = (currentIndex - 1 + wishCards.length) % wishCards.length;
        showSlide(prevIndex);
        startAutoSlide();
    });
    
    nextBtn.addEventListener('click', () => {
        clearInterval(interval);
        let nextIndex = (currentIndex + 1) % wishCards.length;
        showSlide(nextIndex);
        startAutoSlide();
    });
    
    // Dot navigation
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            clearInterval(interval);
            let index = parseInt(dot.getAttribute('data-index'));
            showSlide(index);
            startAutoSlide();
        });
    });
}

/**
 * Fireworks Animation
 * Creates animated fireworks in the hero section background
 */
function initFireworks() {
    const fireworksContainer = document.getElementById('fireworks-container');
    const colors = ['#FFA500', '#FF4500', '#FFD700', '#9C27B0', '#FF1493'];
    
    // Create a firework
    function createFirework() {
        const firework = document.createElement('div');
        firework.className = 'firework';
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 50 + 10;
        
        // Random size
        const size = Math.random() * 5 + 3;
        
        // Random color
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Set firework styles
        firework.style.cssText = `
            position: absolute;
            left: ${posX}%;
            top: ${posY}%;
            width: ${size}px;
            height: ${size}px;
            background-color: ${color};
            border-radius: 50%;
            box-shadow: 0 0 ${size * 2}px ${color};
            opacity: 0;
            transform: scale(0);
            animation: explode 1.5s ease-out forwards;
            z-index: 0;
        `;
        
        // Add particles for explosion effect
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 50 + 20;
            const particleSize = size * 0.4;
            
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                left: 50%;
                top: 50%;
                width: ${particleSize}px;
                height: ${particleSize}px;
                background-color: ${color};
                border-radius: 50%;
                transform: translate(-50%, -50%);
                opacity: 0;
                animation: particle 1.5s ease-out forwards;
                animation-delay: 0.1s;
            `;
            
            // Add keyframes for this specific particle
            const keyframes = `
                @keyframes particle-${posX}-${posY}-${i} {
                    0% {
                        transform: translate(-50%, -50%);
                        opacity: 1;
                    }
                    100% {
                        transform: translate(
                            calc(-50% + ${Math.cos(angle) * distance}px),
                            calc(-50% + ${Math.sin(angle) * distance}px)
                        );
                        opacity: 0;
                    }
                }
            `;
            
            // Add keyframes to document
            const style = document.createElement('style');
            style.innerHTML = keyframes;
            document.head.appendChild(style);
            
            // Apply the specific animation
            particle.style.animation = `particle-${posX}-${posY}-${i} 1.5s ease-out forwards`;
            particle.style.animationDelay = '0.1s';
            
            firework.appendChild(particle);
        }
        
        fireworksContainer.appendChild(firework);
        
        // Remove firework after animation completes
        setTimeout(() => {
            firework.remove();
        }, 1500);
    }
    
    // Add keyframes for firework explosion
    const explodeKeyframes = `
        @keyframes explode {
            0% {
                transform: scale(0);
                opacity: 1;
            }
            30% {
                transform: scale(1);
                opacity: 1;
            }
            100% {
                transform: scale(1.2);
                opacity: 0;
            }
        }
    `;
    
    const style = document.createElement('style');
    style.innerHTML = explodeKeyframes;
    document.head.appendChild(style);
    
    // Launch fireworks at random intervals
    function launchFireworks() {
        const delay = Math.random() * 2000 + 1000;
        setTimeout(() => {
            createFirework();
            launchFireworks();
        }, delay);
    }
    
    // Start fireworks
    launchFireworks();
}

/**
 * Scroll Animation
 * Adds animation effects to elements when they come into view
 */
function initScrollAnimation() {
    const elements = document.querySelectorAll('.section-title, .about-text, .about-images, .gallery-item, .timeline-item, .contact-container');
    
    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Add animation class when element is in viewport
    function checkElements() {
        elements.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('animate')) {
                element.classList.add('animate');
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
                element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            }
        });
    }
    
    // Set initial styles
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
    });
    
    // Check elements on load and scroll
    window.addEventListener('load', checkElements);
    window.addEventListener('scroll', checkElements);
}

/**
 * Contact Form Functionality
 * Form validation and submission handling
 */
function initContactForm() {
    const form = document.getElementById('festivalForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Simulate form submission
            const submitBtn = document.querySelector('.submit-btn');
            submitBtn.innerHTML = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call with timeout
            setTimeout(() => {
                // Reset form
                form.reset();
                
                // Show success message
                alert('Thank you for your message! We will get back to you soon.');
                
                // Reset button
                submitBtn.innerHTML = 'Send Message';
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            // Basic validation
            if (!email) {
                alert('Please enter your email address');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Simulate subscription
            const submitBtn = newsletterForm.querySelector('button');
            const originalHTML = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;
            
            // Simulate API call with timeout
            setTimeout(() => {
                // Reset form
                newsletterForm.reset();
                
                // Show success message
                alert('Thank you for subscribing to our newsletter!');
                
                // Reset button
                submitBtn.innerHTML = originalHTML;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
}
