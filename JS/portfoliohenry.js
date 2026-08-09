const theme_toggle_button = document.getElementById("theme_toggle_button");

function applyPortfolioTheme(theme) {
    const isDark = theme === "dark";
    document.body.classList.toggle("portfolio-dark", isDark);
    theme_toggle_button.textContent = isDark ? "☀️" : "🌙";
    theme_toggle_button.setAttribute(
        "aria-label",
        isDark
            ? "Switch to light mode"
            : "Switch to dark mode"
    );
}

/* Read previously saved theme */
const savedPortfolioTheme =
    localStorage.getItem("henryPortfolioTheme") || "light";
applyPortfolioTheme(savedPortfolioTheme);

/* Change theme */
theme_toggle_button.addEventListener(
    "click",
    function () {
        const isCurrentlyDark = document.body.classList.contains("portfolio-dark");
        const newTheme = isCurrentlyDark
                ? "light"
                : "dark";
        localStorage.setItem("henryPortfolioTheme", newTheme);
        applyPortfolioTheme(newTheme);
    }
);

/*SIMULATED CV DOWNLOAD*/
const downloadresumeButton = document.getElementById("downloadresume");

const resumedownloadstatus = document.getElementById("resumedownloadstatus");

downloadresumeButton.addEventListener(
    "click",
    function () {
        let progress = 0;
        downloadresumeButton.disabled = true;
        resumedownloadstatus.textContent = "Preparing CV... 0%";
        const downloadInterval = setInterval(
            function () {
                progress += 10;
                resumedownloadstatus.textContent = `Preparing CV... ${progress}%`;
                if (progress >= 100) {
                    clearInterval(downloadInterval);
                    resumedownloadstatus.textContent = "CV download simulation completed.";
                    downloadresumeButton.disabled = false;

                    window.location.href = "../Assets/Portfolio/Henry/Henry_Resume.pdf"
                }
            },
            120
            );
    }
);