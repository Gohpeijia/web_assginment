// DARK AND LIGHT THEME 
// SEPERATED FROM WEBSITE.JS TO ENSURE PERSONAL PORTFOLIO
document.addEventListener('DOMContentLoaded', () => {

    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.querySelector('.theme-icon');
    const html = document.documentElement;

    // Load the previously selected theme
    const savedTheme = localStorage.getItem('theme') || 'light';

    if (savedTheme === 'dark') {
        html.setAttribute('data-theme', 'dark');
        themeIcon.textContent = '☀️';
    } else {
        html.removeAttribute('data-theme');
        themeIcon.textContent = '🌙';
    }

    // Change theme when button is clicked
    themeToggle.addEventListener('click', () => {

        const darkMode =
            html.getAttribute('data-theme') === 'dark';

        if (darkMode) {
            html.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeIcon.textContent = '🌙';
        } else {
            html.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeIcon.textContent = '☀️';
        }

    });

});


// CV DOWNLOAD
document.addEventListener('DOMContentLoaded', () => {

    const downloadButton =
        document.getElementById('cv-download-btn');

    const buttonText =
        downloadButton.querySelector('.btn-text');

    const progressBar =
        downloadButton.querySelector('.download-progress-bar');

    downloadButton.addEventListener('click', () => {

        // Prevent clicking again during download
        if (downloadButton.classList.contains('downloading')) {
            return;
        }

        downloadButton.classList.add('downloading');
        downloadButton.disabled = true;

        let progress = 0;

        const downloadProgress = setInterval(() => {

            progress += 5;

            buttonText.textContent =
                `Downloading... ${progress}%`;

            progressBar.style.width =
                `${progress}%`;

            if (progress >= 100) {

                clearInterval(downloadProgress);

                downloadButton.classList.remove('downloading');
                downloadButton.classList.add('completed');

                buttonText.textContent = 'Downloaded ✓';

                downloadCV();

                // Reset the button after 3 seconds
                setTimeout(() => {

                    downloadButton.classList.remove('completed');
                    downloadButton.disabled = false;

                    buttonText.textContent =
                        'Download Resume / CV';

                    progressBar.style.width = '0%';

                }, 3000);
            }

        }, 100);

    });


    function downloadCV() {

        const filePath = downloadButton.getAttribute('data-file');

        const fileName =
            downloadButton.getAttribute('data-filename');

        const link = document.createElement('a');

        link.href = filePath;
        link.download = fileName;

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

    }

});