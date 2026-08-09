document.addEventListener('DOMContentLoaded', () => {

    // 1. Skill Console Terminal Tabs
    const termButtons = document.querySelectorAll('.term-btn');
    const termContents = document.querySelectorAll('.term-content');

    termButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            if (!targetId) return;

            termButtons.forEach(btn => btn.classList.remove('active'));
            termContents.forEach(content => content.classList.add('hidden'));

            button.classList.add('active');
            const targetContent = document.getElementById(targetId);
            if (targetContent) targetContent.classList.remove('hidden');
        });
    });

    // 2. Theme Toggle
    const themeToggleButton = document.getElementById('theme-toggle');
    const themeIcon = themeToggleButton ? themeToggleButton.querySelector('.theme-icon') : null;
    const rootElement = document.documentElement;

    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        rootElement.setAttribute('data-theme', 'dark');
        if (themeIcon) themeIcon.textContent = '☀️';
    } else {
        rootElement.setAttribute('data-theme', 'light');
        if (themeIcon) themeIcon.textContent = '🌙';
    }

    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            const isDark = rootElement.getAttribute('data-theme') === 'dark';
            const newTheme = isDark ? 'light' : 'dark';

            rootElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            if (themeIcon) themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        });
    }

    // 3. Floating Card Hover Previews
    const cards = document.querySelectorAll('.card[data-preview]');
    const leftPreview = document.getElementById('left-preview-container');
    const rightPreview = document.getElementById('right-preview-container');
    const leftImg = document.getElementById('left-preview-img');
    const rightImg = document.getElementById('right-preview-img');

    cards.forEach(card => {
        const previewSrc = card.getAttribute('data-preview');
        if (!previewSrc) return;

        const showPreview = () => {
            const rect = card.getBoundingClientRect();
            const isLeftHalf = (rect.left + rect.width / 2) < (window.innerWidth / 2);

            if (isLeftHalf && rightPreview && rightImg) {
                rightImg.src = previewSrc;
                rightPreview.classList.add('active');
            } else if (leftPreview && leftImg) {
                leftImg.src = previewSrc;
                leftPreview.classList.add('active');
            }
        };

        const hidePreview = () => {
            if (leftPreview) leftPreview.classList.remove('active');
            if (rightPreview) rightPreview.classList.remove('active');
        };

        card.addEventListener('mouseenter', showPreview);
        card.addEventListener('mouseleave', hidePreview);
        card.addEventListener('touchstart', showPreview, { passive: true });
        card.addEventListener('touchend', hidePreview, { passive: true });
    });

    // 4. CV Download Button
    const downloadBtn = document.getElementById('cv-download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            if (downloadBtn.disabled) return;

            const btnText = downloadBtn.querySelector('.btn-text');
            const originalText = btnText ? btnText.textContent : 'Download Resume / CV';

            downloadBtn.classList.add('completed');
            downloadBtn.disabled = true;
            if (btnText) btnText.textContent = 'Downloaded ✓';

            const link = document.createElement('a');
            link.href = "../Assets/Portfolio/GohPeiJia/Pei_Jia_Goh_CV.docx";
            link.download = 'Goh_Pei_Jia_CV.docx';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setTimeout(() => {
                downloadBtn.classList.remove('completed');
                downloadBtn.disabled = false;
                if (btnText) btnText.textContent = originalText;
            }, 3000);
        });
    }

    // 5. Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    const successMsg = document.getElementById('form-success-msg');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (successMsg) successMsg.classList.remove('hidden');
            contactForm.reset();

            setTimeout(() => {
                if (successMsg) successMsg.classList.add('hidden');
            }, 3000);
        });
    }

    // 6. Scroll Reveal Observer
    const sectionsToAnimate = document.querySelectorAll('section.personalinfo, section.aboutme');
    sectionsToAnimate.forEach(section => section.classList.add('fade-in-section'));

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        sectionsToAnimate.forEach(section => observer.observe(section));
    } else {
        sectionsToAnimate.forEach(section => section.classList.add('is-visible'));
    }

});