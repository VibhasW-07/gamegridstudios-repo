// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const trailerBtn = document.getElementById('trailerBtn');
const modal = document.getElementById('trailerModal');
const closeBtn = document.querySelector('.close');
const trailerVideo = document.getElementById('trailerVideo');
const allTrailerBtns = document.querySelectorAll('.trailer-btn');
const allPlayBtns = document.querySelectorAll('.play-btn');
const gameCards = document.querySelectorAll('.game-card');

// GTA 6 trailer URL
const GTA6_TRAILER_URL = 'https://www.youtube.com/embed/QdBZY2fkU-0';

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Search functionality
    searchButton.addEventListener('click', searchGames);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchGames();
        }
    });

    // Main trailer button
    trailerBtn.addEventListener('click', function() {
        openTrailer(GTA6_TRAILER_URL);
    });

    // Close trailer modal
    closeBtn.addEventListener('click', closeTrailer);
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeTrailer();
        }
    });

    // Game card trailer buttons
    allTrailerBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const trailerUrl = this.getAttribute('data-trailer');
            openTrailer(trailerUrl);
        });
    });

    // Game card play buttons
    allPlayBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const gameName = this.closest('.game-card').querySelector('h3').textContent;
            alert(`Playing ${gameName}... This would launch the game if this was a real gaming platform.`);
        });
    });
});

// Functions
function searchGames() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        // Reset search (show all games)
        gameCards.forEach(card => {
            card.style.display = 'block';
        });
        return;
    }
    
    // Filter games
    gameCards.forEach(card => {
        const gameTitle = card.querySelector('h3').textContent.toLowerCase();
        if (gameTitle.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function openTrailer(url) {
    // Set trailer video source
    trailerVideo.src = url;
    
    // Show modal
    modal.style.display = 'block';
    
    // Disable scrolling on body
    document.body.style.overflow = 'hidden';
}

function closeTrailer() {
    // Hide modal
    modal.style.display = 'none';
    
    // Stop video playback
    trailerVideo.src = '';
    
    // Re-enable scrolling
    document.body.style.overflow = 'auto';
}

// Create company logo SVG dynamically if not present
document.addEventListener('DOMContentLoaded', function() {
    if (!document.querySelector('.logo img').complete || document.querySelector('.logo img').naturalHeight === 0) {
        // Create a default logo if the SVG is not loading
        createDefaultLogo();
    }
});

function createDefaultLogo() {
    const logoImg = document.querySelector('.logo img');
    const logoContainer = document.querySelector('.logo');
    
    // Create SVG element
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '50');
    svg.setAttribute('height', '50');
    svg.setAttribute('viewBox', '0 0 50 50');
    
    // Create circle
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', '25');
    circle.setAttribute('cy', '25');
    circle.setAttribute('r', '20');
    circle.setAttribute('fill', '#ff4500');
    
    // Create "G" letter
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', '25');
    text.setAttribute('y', '32');
    text.setAttribute('font-size', '24');
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('fill', 'white');
    text.textContent = 'G';
    
    // Append to SVG
    svg.appendChild(circle);
    svg.appendChild(text);
    
    // Replace img with SVG
    if (logoImg.parentNode) {
        logoContainer.replaceChild(svg, logoImg);
    }
}

// Validate email (if we have a newsletter form)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}