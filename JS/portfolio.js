const THEME_STORAGE_KEY = "theme";
const themeToggleButton = document.getElementById("theme-toggle");

/**
 * Applies a theme to the whole page by setting (or removing) the
 * data-theme attribute on <html>. CSS variables in style.css react
 * to this attribute automatically, so no other DOM changes are
 * needed here.
 *
 * @param {string} theme - "dark" or "light"
 * @returns {void}
 */
function applyTheme(theme) {
  if (theme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
}

/**
 * Reads the visitor's saved theme preference from localStorage
 * (defaulting to "light" on a first visit) and applies it.
 * Called once on page load so the correct theme shows immediately.
 *
 * @returns {void}
 */
function loadSavedTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || "light";
  applyTheme(savedTheme);
}

/**
 * Flips the current theme (light -> dark or dark -> light) and
 * saves the new choice to localStorage so it persists on the next
 * visit/page load.
 *
 * @returns {void}
 */
function toggleTheme() {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  const newTheme = isDark ? "light" : "dark";
  applyTheme(newTheme);
  localStorage.setItem(THEME_STORAGE_KEY, newTheme);
}

/**
 * Hero Button Progress Logic
 * intercepts clicks, runs a 600ms loading bar, and then routes
 * the user either to an external tab or an internal scroll section.
 */
const progressBtns = document.querySelectorAll(".progress-btn");

progressBtns.forEach(btn => {
  btn.addEventListener("click", function(e) {
    e.preventDefault(); // Stop immediate jump/navigation

    const targetUrl = this.getAttribute("href");
    // Check if the link is external (starts with http) or an internal #hash
    const isExternal = targetUrl.startsWith("http"); 

    // 1. Trigger the CSS fill animation
    this.classList.add("is-loading");

    // 2. Wait 600ms for the bar to finish filling, then navigate
    setTimeout(() => {
      // Remove class so the bar instantly resets to 0% in the background
      this.classList.remove("is-loading");

      // 3. Execute the navigation
      if (isExternal) {
        window.open(targetUrl, "_blank");
      } else {
        const targetSection = document.querySelector(targetUrl);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: "smooth" });
        }
      }
    }, 600);
  });
});

// Initialise theme on load, then listen for toggle clicks 
loadSavedTheme();
themeToggleButton.addEventListener("click", toggleTheme);

/**
 * Checks every element with the "reveal" class and adds the
 * "active" class once it has scrolled within view. style.css uses
 * .reveal / .reveal.active to fade + slide the element in.
 *
 * @returns {void}
 */
function revealOnScroll() {
  const revealElements = document.querySelectorAll(".reveal");
  const triggerOffset = 100; // px from the bottom of the viewport before revealing

  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const isInView = elementTop < window.innerHeight - triggerOffset;

    if (isInView) {
      element.classList.add("active");
    }
  });
}

// --- Run once immediately (for content already in view on load),
//     then again every time the visitor scrolls ---
revealOnScroll();
window.addEventListener("scroll", revealOnScroll);
