// INTERACTIVE TERMINAL LOGIC
// 1. Grab all the buttons and all the content boxes
const termButtons = document.querySelectorAll('.term-btn');
const termContents = document.querySelectorAll('.term-content');

// 2. Loop through each button and attach a click listener
termButtons.forEach(button => {
    button.addEventListener('click', () => {
        
        // Step A: Reset everything (remove 'active' from all buttons)
        termButtons.forEach(btn => btn.classList.remove('active'));
        
        // Step B: Hide all content boxes
        termContents.forEach(content => content.classList.add('hidden'));
        
        // Step C: Make the clicked button active
        button.classList.add('active');
        
        // Step D: Find the matching content ID (stored in data-target) and show it
        const targetId = button.getAttribute('data-target');
        document.getElementById(targetId).classList.remove('hidden');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButton = document.getElementById('theme-toggle');
    const themeIcon = themeToggleButton.querySelector('.theme-icon');
    const bodyElement = document.body;

    // Check for previously saved theme in localStorage
    const savedTheme = localStorage.getItem('website-theme');

    // Apply saved theme on page load, default to 'light' if null
    if (savedTheme === 'dark') {
        bodyElement.setAttribute('data-theme', 'dark');
        themeIcon.textContent = '☀️';
    } else {
        bodyElement.setAttribute('data-theme', 'light');
        themeIcon.textContent = '🌙';
    }

    // Toggle event listener
    themeToggleButton.addEventListener('click', () => {
        const currentTheme = bodyElement.getAttribute('data-theme');

        if (currentTheme === 'light') {
            bodyElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('website-theme', 'dark');
            themeIcon.textContent = '☀️';
        } else {
            bodyElement.setAttribute('data-theme', 'light');
            localStorage.setItem('website-theme', 'light');
            themeIcon.textContent = '🌙';
        }
    });
});

window.addEventListener('scroll', () => {
    // 1. Get the total height of the scrollable area
    const scrollableHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    // 2. Get the current scroll position
    const currentScrollPosition = window.scrollY || document.documentElement.scrollTop;
    
    // 3. Calculate the percentage scrolled
    const scrollPercentage = (currentScrollPosition / scrollableHeight) * 100;
    
    // 4. Apply that percentage to the height of our tracker line
    const scrollLine = document.getElementById('scroll-line');
    if (scrollLine) {
        scrollLine.style.height = scrollPercentage + '%';
    }

    //5. Grab the elements we want to hide, and the sections we want to avoid
    const decorElements = document.querySelectorAll('.floating-decor, .audio-hint');
    const heroSection = document.getElementById('aboutme');
    const footerSection = document.getElementById('contactme');

    if (heroSection && footerSection) {
        // Find exactly where the hero and footer are relative to the screen
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        const footerTop = footerSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        // If the bottom of the hero is still visible (value > 150px) 
        // OR the top of the footer has entered the screen
        if (heroBottom > 150 || footerTop < windowHeight) {
            // Fade them out
            decorElements.forEach(el => el.classList.add('fade-out'));
        } else {
            // We are safely in the middle of the page, fade them back in!
            decorElements.forEach(el => el.classList.remove('fade-out'));
        }
    }
});

// INTERACTIVE AUDIO LOGIC (TOGGLE)

// 1. Create the audio object
const backgroundMusic = new Audio('../Assets/Portfolio/GohPeiJia/ManIneed.mp3'); 
backgroundMusic.loop = true; 

// Track whether the music is currently playing
let isPlaying = false; 

// 2. Grab all the floating symbols and the hint text
const floatingSymbols = document.querySelectorAll('.floating-decor');
const hintText = document.getElementById('audio-hint-text');

// 3. Attach the click logic to toggle music on/off
floatingSymbols.forEach(symbol => {
    symbol.addEventListener('click', () => {
        
        if (isPlaying) {
            // If it is playing, pause it
            backgroundMusic.pause();
            isPlaying = false;
            
            // Update the hint to show it's paused
            if (hintText) {
                hintText.textContent = 'AUDIO: PAUSED (CLICK TO RESUME)';
                hintText.classList.remove('is-playing');
            }
        } else {
            // If it is paused, play it
            backgroundMusic.play().then(() => {
                isPlaying = true;
                
                // Update the hint to show it is playing and change color
                if (hintText) {
                    hintText.textContent = 'AUDIO: PLAYING (CLICK TO PAUSE)';
                    hintText.classList.add('is-playing');
                }
            }).catch(error => {
                console.error("Browser blocked audio playback:", error);
                alert("Please click anywhere on the background of the page first to enable audio!");
            });
        }
        
    });
});