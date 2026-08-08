const portfolioThemeToggle =
    document.getElementById(
        "portfolioThemeToggle"
    );

function applyPortfolioTheme(theme) {
    const isDark =
        theme === "dark";
    document.body.classList.toggle(
        "portfolio-dark",
        isDark
    );
    portfolioThemeToggle.textContent =
        isDark ? "☀" : "☾";
    portfolioThemeToggle.setAttribute(
        "aria-label",
        isDark
            ? "Switch to light mode"
            : "Switch to dark mode"
    );
}

/* Read previously saved theme */
const savedPortfolioTheme =
    localStorage.getItem(
        "henryPortfolioTheme"
    ) || "light";
applyPortfolioTheme(
    savedPortfolioTheme
);

/* Change theme */
portfolioThemeToggle.addEventListener(
    "click",
    function () {
        const isCurrentlyDark =
            document.body.classList.contains(
                "portfolio-dark"
            );
        const newTheme =
            isCurrentlyDark
                ? "light"
                : "dark";
        localStorage.setItem(
            "henryPortfolioTheme",
            newTheme
        );
        applyPortfolioTheme(
            newTheme
        );
    }
);

/*MOBILE NAVIGATION*/
const mobileMenuButton =
    document.getElementById(
        "mobileMenuButton"
    );

const portfolioNavLinks =
    document.getElementById(
        "portfolioNavLinks"
    );

mobileMenuButton.addEventListener(
    "click",
    function () {
        const isOpen =
            portfolioNavLinks.classList.toggle(
                "open"
            );
        mobileMenuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );
        mobileMenuButton.textContent =
            isOpen ? "✕" : "☰";
    }
);

/*Close menu after selecting a section*/
const navigationLinks =
    portfolioNavLinks.querySelectorAll("a");
navigationLinks.forEach(
    function (link) {
        link.addEventListener(
            "click",
            function () {
                portfolioNavLinks.classList.remove(
                    "open"
                );
                mobileMenuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );
                mobileMenuButton.textContent =
                    "☰";
            }
        );
    }
);

/*SIMULATED CV DOWNLOAD*/
const downloadCVButton =
    document.getElementById(
        "downloadCV"
    );

const cvDownloadStatus =
    document.getElementById(
        "cvDownloadStatus"
    );

downloadCVButton.addEventListener(
    "click",
    function () {
        let progress = 0;
        downloadCVButton.disabled =
            true;
        cvDownloadStatus.textContent =
            "Preparing CV... 0%";
        const downloadInterval =
            setInterval(
                function () {
                    progress += 10;
                    cvDownloadStatus.textContent =
                        `Preparing CV... ${progress}%`;
                    if (progress >= 100) {
                        clearInterval(
                            downloadInterval
                        );
                        cvDownloadStatus.textContent =
                            "CV download simulation completed.";
                        downloadCVButton.disabled =
                            false;
                    }
                },
                120
            );
    }
);