document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("themeToggle");

    function applyTheme(theme) {
        const isDarkMode = theme === "dark";

        document.body.classList.toggle("dark-mode", isDarkMode);

        if (themeToggle) {
            themeToggle.textContent = isDarkMode ? "☀️" : "🌙";

            themeToggle.setAttribute(
                "aria-label",
                isDarkMode
                    ? "Switch to light mode"
                    : "Switch to dark mode"
            );
        }
    }

    // Restore the theme selected on another page
    const savedTheme = localStorage.getItem("theme") || "light";
    applyTheme(savedTheme);

    // Only add the click event if this page has a toggle button
    if (themeToggle) {
        themeToggle.addEventListener("click", function () {
            const isCurrentlyDark =
                document.body.classList.contains("dark-mode");

            const newTheme = isCurrentlyDark ? "light" : "dark";

            localStorage.setItem("theme", newTheme);
            applyTheme(newTheme);
        });
    }
});