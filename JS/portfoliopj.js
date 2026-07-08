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
    const themeIcon = themeToggleButton ? themeToggleButton.querySelector('.theme-icon') : null;
    const rootElement = document.documentElement; // Unify targeting <html>

    // Read saved setting using key "theme"
    const savedTheme = localStorage.getItem('theme') || 'light';

    // Apply setting on load
    if (savedTheme === 'dark') {
        rootElement.setAttribute('data-theme', 'dark');
        if (themeIcon) themeIcon.textContent = '☀️';
    } else {
        rootElement.removeAttribute('data-theme');
        if (themeIcon) themeIcon.textContent = '🌙';
    }

    // Toggle handler
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            const isDark = rootElement.getAttribute('data-theme') === 'dark';

            if (!isDark) {
                rootElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                if (themeIcon) themeIcon.textContent = '☀️';
            } else {
                rootElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                if (themeIcon) themeIcon.textContent = '🌙';
            }
        });
    }
});

// DYNAMIC FLOATING CARD PREVIEWS
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    const leftPreview = document.getElementById('left-preview-container');
    const rightPreview = document.getElementById('right-preview-container');
    const leftImg = document.getElementById('left-preview-img');
    const rightImg = document.getElementById('right-preview-img');

    cards.forEach(card => {
        const previewSrc = card.getAttribute('data-preview');
        if (!previewSrc) return; // Skip cards that don't have a preview image

        // Hover or Touch start function
        const showPreview = () => {
            const rect = card.getBoundingClientRect();
            const cardCenterX = rect.left + rect.width / 2;
            const windowCenterX = window.innerWidth / 2;

            if (cardCenterX < windowCenterX) {
                // Card is on the left side of the screen -> Show preview on the right
                rightImg.src = previewSrc;
                rightPreview.classList.add('active');
            } else {
                // Card is on the right side of the screen -> Show preview on the left
                leftImg.src = previewSrc;
                leftPreview.classList.add('active');
            }
        };

        // Hover or Touch end function
        const hidePreview = () => {
            leftPreview.classList.remove('active');
            rightPreview.classList.remove('active');
        };

        // Desktop mouse hover listeners
        card.addEventListener('mouseenter', showPreview);
        card.addEventListener('mouseleave', hidePreview);

        // Mobile touch hold listeners
        card.addEventListener('touchstart', (e) => {
            showPreview();
        }, { passive: true });
        
        card.addEventListener('touchend', hidePreview, { passive: true });
    });
});

// SIMULATED CV DOWNLOAD LOGIC
document.addEventListener('DOMContentLoaded', () => {
    const downloadBtn = document.getElementById('cv-download-btn');
    const downloadMsg = document.getElementById('download-message');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            if (downloadBtn.classList.contains('downloading') || downloadBtn.classList.contains('completed')) {
                return;
            }
            
            // Start simulation
            downloadBtn.classList.add('downloading');
            downloadBtn.disabled = true;
            
            const btnText = downloadBtn.querySelector('.btn-text');
            const progressBar = downloadBtn.querySelector('.download-progress-bar');
            
            let progress = 0;
            const interval = setInterval(() => {
                progress += 5;
                btnText.textContent = `Downloading... ${progress}%`;
                progressBar.style.width = `${progress}%`;
                
                if (progress >= 100) {
                    clearInterval(interval);
                    
                    // Complete simulation
                    downloadBtn.classList.remove('downloading');
                    downloadBtn.classList.add('completed');
                    btnText.textContent = 'Downloaded ✓';
                    
                    if (downloadMsg) {
                        downloadMsg.classList.remove('hidden');
                        downloadMsg.classList.add('fade-in');
                    }
                    
                    // Trigger actual file download
                    triggerCvDownload();
                    
                    // Reset button after some time
                    setTimeout(() => {
                        downloadBtn.classList.remove('completed');
                        downloadBtn.disabled = false;
                        btnText.textContent = 'Download Resume / CV';
                        progressBar.style.width = '0%';
                        if (downloadMsg) {
                            downloadMsg.classList.add('hidden');
                            downloadMsg.classList.remove('fade-in');
                        }
                    }, 5000);
                }
            }, 100); // 2 seconds total duration
        });
    }
    
    function triggerCvDownload() {
        const cvContent = `GOH PEI JIA - PORTFOLIO RESUME / CV

Email: peijia0307@gmail.com
GitHub: github.com/Gohpeijia
LinkedIn: linkedin.com/in/pei-jia-goh
Location: Petaling Jaya, Selangor, Malaysia
Status: Computer Science Student

SUMMARY:
A Computer Science student at Sunway University with a strong foundation in programming, problem-solving, and backend development.

EDUCATION:
* Sunway University & Lancaster University (Dual Degree)
  Bachelor of Computer Science (Hons) (2025 - Present)
  - Dean's List Award (Year 1 Semester 1)
* Multimedia University (MMU)
  Foundation in Information Technology (2024 - 2025)
  - Dean's List Award

SKILLS & TOOLS:
* Languages: Python, HTML, CSS, JavaScript, Java, C#, C++, Dart
* Frameworks & Tools: Unity, Flutter, Firebase, FastAPI, Supabase, Qt

AWARDS & CERTIFICATIONS:
* UMHACKATHON 2026 - Final Top 19 Placement
* Monash Coding League 2026 - Top 7 Placement
* Queen's Commonwealth Essay Competition - Bronze Award
* HackerRank Problem Solving (Intermediate + Basic)
* HackerRank Python (Basic)

PROJECTS:
* Tauke.Ai - Backend Orchestration with FastAPI & Supabase
* FridgeGuardian - Food inventory tracking Flutter Mobile App
* AI in Education - Research paper website & interactive module
* Farmer Sim - Unity Game Development
* LawChat - Full-stack AI-powered legal analysis tool
* BilBoleh - Google AI Studio & Gemini API Prototype`;
        
        const blob = new Blob([cvContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Goh_Pei_Jia_CV.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
});