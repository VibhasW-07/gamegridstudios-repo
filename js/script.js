document.addEventListener('DOMContentLoaded', function() {
    // ===== Element Selectors =====
    const header = document.querySelector('header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const searchInput = document.getElementById('search-bar');
    const gamesContainer = document.getElementById('games-container');
    const gameCards = document.querySelectorAll('.game-card');
    const viewToggleBtns = document.querySelectorAll('.view-toggle button');
    const trailerBtns = document.querySelectorAll('.trailer-btn');
    const trailerModal = document.getElementById('trailer-modal');
    const closeModal = document.querySelector('.close-modal');
    const trailerFrame = document.getElementById('trailer-frame');
    
    // ===== Header Scroll Effect =====
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // ===== Mobile Menu Toggle =====
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Animate hamburger to X
        const spans = menuToggle.querySelectorAll('span');
        if (menuToggle.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // ===== View Toggle (Grid/List) =====
    viewToggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            viewToggleBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const viewType = this.getAttribute('data-view');
            if (viewType === 'grid') {
                gamesContainer.classList.remove('list-view');
                gamesContainer.classList.add('grid-view');
            } else {
                gamesContainer.classList.remove('grid-view');
                gamesContainer.classList.add('list-view');
            }
        });
    });
    
    // ===== Search Functionality =====
    searchInput.addEventListener('keyup', function() {
        const searchTerm = this.value.toLowerCase();
        
        gameCards.forEach(card => {
            const gameTitle = card.querySelector('h3').textContent.toLowerCase();
            const gameCategory = card.querySelector('.game-category').textContent.toLowerCase();
            
            if (gameTitle.includes(searchTerm) || gameCategory.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
    
    // ===== Trailer Modal =====
    // Video URLs mapping (in a real app, these would come from a database)
    const trailerVideos = {
        gta6: 'https://www.youtube.com/embed/AYI-clE0zYk', // GTA 6 Official Trailer
        gta5: 'https://www.youtube.com/embed/QkkoHAzjnUs',
        valorant: 'https://www.youtube.com/embed/e_E9W2vsRbQ',
        farcry: 'https://www.youtube.com/embed/BcUi0gWUQCg',
        rdr2: 'https://www.youtube.com/embed/eaW0tYpxyp0',
        cyberpunk: 'https://www.youtube.com/embed/8X2kIfS6fb8',
        fortnite: 'https://www.youtube.com/embed/2gUtfBmw86Y',
        minecraft: 'https://www.youtube.com/embed/MmB9b5njVbA',
        callofduty: 'https://www.youtube.com/embed/J7Ivdq5E-fs'
    };
    
    // Open modal with specific trailer
    trailerBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const game = this.getAttribute('data-trailer');
            if (trailerVideos[game]) {
                trailerFrame.src = trailerVideos[game];
                trailerModal.style.display = 'flex';
                document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
            } else {
                alert('Trailer not available at this time. Please check back later.');
            }
        });
    });
    
    // Close modal
    closeModal.addEventListener('click', function() {
        trailerModal.style.display = 'none';
        trailerFrame.src = ''; // Stop video playback
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    });
    
    // Close modal when clicking outside of content
    window.addEventListener('click', function(event) {
        if (event.target === trailerModal) {
            trailerModal.style.display = 'none';
            trailerFrame.src = '';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && trailerModal.style.display === 'flex') {
            trailerModal.style.display = 'none';
            trailerFrame.src = '';
            document.body.style.overflow = 'auto';
        }
    });
    
    // ===== Game Card Hover Effect =====
    gameCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.game-overlay').style.opacity = '1';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.game-overlay').style.opacity = '0';
        });
    });
    
    // ===== Smooth Scrolling for Anchor Links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    menuToggle.click();
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Account for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== Newsletter Form Submission =====
    const newsletterForm = document.querySelector('.newsletter form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email && validateEmail(email)) {
                // In a real app, you would send this to your backend
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
    
    // Email validation helper
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // ===== Initialize AOS Animation Library if available =====
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true
        });
    }
    
    // ===== Preload GTA 6 Background Image =====
    const preloadImage = new Image();
    preloadImage.src = 'https://images.unsplash.com/photo-1506126613408-eca07ce68773';
});

// ===== Play Now Button Handler =====
document.querySelectorAll('.play-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const gameTitle = this.closest('.game-card').querySelector('h3').textContent;
        alert(`Launching ${gameTitle}... In a real application, this would redirect to the game or start downloading it.`);
    });
});

// ===== Preorder Button Handler =====
const preorderBtn = document.querySelector('.preorder-btn');
if (preorderBtn) {
    preorderBtn.addEventListener('click', function() {
        alert('Thank you for your interest in pre-ordering GTA VI! Pre-orders will open soon. Please subscribe to our newsletter to be notified when pre-orders begin.');
    });
}
