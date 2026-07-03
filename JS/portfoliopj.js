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