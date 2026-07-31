// SIDEBAR TOGGLE LOGIC 
const searchFilterBtn = document.getElementById('searchFilterBtn');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const filterSidebar = document.getElementById('filterSidebar');
const closeSidebarBtn = document.getElementById('closeSidebarBtn');

if (searchFilterBtn && filterSidebar) {
  // Open Sidebar
  searchFilterBtn.addEventListener('click', () => {
    filterSidebar.classList.add('open');
    sidebarOverlay.classList.add('open');
    // Disable background scrolling when sidebar is open
    document.body.style.overflow = 'hidden'; 
  });

  // Close Sidebar (X button)
  closeSidebarBtn.addEventListener('click', closeSidebar);
  
  // Close Sidebar (Clicking the dark overlay)
  sidebarOverlay.addEventListener('click', closeSidebar);
}

function closeSidebar() {
  filterSidebar.classList.remove('open');
  sidebarOverlay.classList.remove('open');
  // Re-enable background scrolling
  document.body.style.overflow = ''; 
}

// PROFILE MODAL LOGIC 
const account = document.getElementById('account');
const profileModal = document.getElementById('profileModal');
const closeProfileBtn = document.getElementById('closeProfileModal');

// 1. Open the modal and dynamically set login/logout states
if (account && profileModal && closeProfileBtn) {
  account.addEventListener('click', () => {
    const profileMsg = profileModal.querySelector('.profile-message');
    const redirectBtn = profileModal.querySelector('.login-redirect-btn');
    
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    const userEmail = sessionStorage.getItem("userEmail");

    if (isLoggedIn && userEmail) {
      // User is logged in: show email and turn redirect button into "Log Out"
      profileMsg.textContent = `Logged in as: ${userEmail}`;
      redirectBtn.textContent = 'Log Out';
      redirectBtn.href = '#';
      
      // Clear session on click
      redirectBtn.onclick = (e) => {
        e.preventDefault();
        sessionStorage.clear();
        location.reload(); // Refresh the page to reset state
      };
    } else {
      // User is guest: show default guest message and redirect button
      profileMsg.textContent = "You haven't logged in yet!";
      redirectBtn.textContent = 'Go to Login Page';
      redirectBtn.href = 'login.html';
      redirectBtn.onclick = null; // Reset click overrides
    }

    profileModal.classList.remove('hidden');
  });

  // 2. Close the modal when the 'X' is clicked (Registered once on page load)
  closeProfileBtn.addEventListener('click', () => {
    profileModal.classList.add('hidden');
  });

  // 3. Close the modal when clicking the dark background outside the box
  profileModal.addEventListener('click', (e) => {
    if (e.target === profileModal) {
      profileModal.classList.add('hidden');
    }
  });
}

// SUBSCRIBE FORM LOGIC 
const subscribeForm = document.getElementById('subscribeForm');
const subscribeSuccess = document.getElementById('subscribeSuccess');

if (subscribeForm) {
  subscribeForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Stops the page from refreshing
    
    // Hide the input form using your existing .hidden class
    subscribeForm.classList.add('hidden');
    
    // Show the success message
    if (subscribeSuccess) {
      subscribeSuccess.classList.remove('hidden');
    }
  });
}

// CONTACT FORM LOGIC
const contactForm = document.getElementById('contactForm');
const contactSuccess = document.getElementById('contactSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Stops the page from refreshing
    
    // Hide the input form
    contactForm.classList.add('hidden');
    
    // Show the success message
    if (contactSuccess) {
      contactSuccess.classList.remove('hidden');
    }
  });
}

//THEME TOGGLE
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
