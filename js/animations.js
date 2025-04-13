// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initial page loading animation
    setTimeout(function() {
        document.querySelector('.page-transition').classList.add('loaded');
    }, 1500); // Show loading animation for 1.5 seconds

    // Initialize Intersection Observer for fade-in elements
    initFadeInObserver();

    // Add event listeners for page navigation
    initPageNavigation();

    // Enhance modal animations
    enhanceModalAnimations();
});

// Function to handle fade-in animations using Intersection Observer
function initFadeInObserver() {
    // Get all elements with the 'fade-in' class
    const fadeElements = document.querySelectorAll('.fade-in');
    
    // Create options for the observer
    const observerOptions = {
        root: null, // Use viewport as root
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };
    
    // Create the observer
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add 'visible' class when element is in view
                entry.target.classList.add('visible');
                // Stop observing after animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Start observing all fade-in elements
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// Function to handle page navigation transitions
function initPageNavigation() {
    const navLinks = document.querySelectorAll('nav a');
    const pageContent = document.querySelector('.page-content');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Ignore if it's the current active page
            if (this.classList.contains('active')) {
                return;
            }
            
            // Get the page to navigate to
            const targetPage = this.getAttribute('data-page');
            
            // Remove active class from all links
            navLinks.forEach(navLink => {
                navLink.classList.remove('active');
            });
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Add transition effect
            pageContent.classList.add('transitioning');
            
            // Show loading indicator
            const pageTransition = document.querySelector('.page-transition');
            pageTransition.classList.remove('loaded');
            
            // Simulate page load (in a real multi-page app, this would navigate to a new page)
            setTimeout(function() {
                // In a real app, you would change content here
                // For demo purposes, we'll just show the transition
                
                // Hide loading indicator
                pageTransition.classList.add('loaded');
                
                // Remove transition effect
                pageContent.classList.remove('transitioning');
                
                // Trigger animation of elements again
                resetAnimations();
            }, 800);
        });
    });
}

// Function to enhance modal animations
function enhanceModalAnimations() {
    const modal = document.getElementById('trailerModal');
    const openButtons = document.querySelectorAll('.trailer-btn');
    const closeBtn = document.querySelector('.close');
    
    openButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Modal is shown in the script.js file
            // Here we just add the visible class for animation
            setTimeout(() => {
                modal.classList.add('visible');
            }, 10);
        });
    });
    
    closeBtn.addEventListener('click', function() {
        // First remove the visible class (for animation)
        modal.classList.remove('visible');
        // Actual close happens in script.js
    });
}

// Function to reset animations (for demo purposes when "changing pages")
function resetAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    // Remove 'visible' class from all elements
    fadeElements.forEach(element => {
        element.classList.remove('visible');
    });
    
    // Re-trigger the fade in effect
    setTimeout(() => {
        initFadeInObserver();
    }, 100);
}

// Function for smooth scrolling to sections
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        window.scrollTo({
            top: element.offsetTop - 80, // Adjust for header height
            behavior: 'smooth'
        });
    }
}

// Add loading indicator when search is performed
const searchBtn = document.getElementById('searchButton');
if (searchBtn) {
    searchBtn.addEventListener('click', function() {
        // Get search input
        const searchInput = document.getElementById('searchInput');
        if (searchInput.value.trim() !== '') {
            // Show mini loading indicator
            const originalText = this.textContent;
            this.innerHTML = '<span class="loading-dot">.</span><span class="loading-dot">.</span><span class="loading-dot">.</span>';
            
            // Restore button text after "loading"
            setTimeout(() => {
                this.textContent = originalText;
                
                // Add highlight animation to search results
                const visibleCards = document.querySelectorAll('.game-card[style*="block"]');
                visibleCards.forEach(card => {
                    card.classList.add('search-highlight');
                    setTimeout(() => {
                        card.classList.remove('search-highlight');
                    }, 1500);
                });
            }, 500);
        }
    });
}