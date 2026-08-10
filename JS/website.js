// sidebar
const searchFilterBtn = document.getElementById('searchFilterBtn');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const filterSidebar = document.getElementById('filterSidebar');
const closeSidebarBtn = document.getElementById('closeSidebarBtn');

if (searchFilterBtn && filterSidebar) {
  searchFilterBtn.addEventListener('click', () => {
    filterSidebar.classList.add('open');
    sidebarOverlay.classList.add('open');
    searchFilterBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; 
  });

  closeSidebarBtn.addEventListener('click', closeSidebar);
  sidebarOverlay.addEventListener('click', closeSidebar);
}

function closeSidebar() {
  filterSidebar.classList.remove('open');
  sidebarOverlay.classList.remove('open');
  if (searchFilterBtn) {
    searchFilterBtn.setAttribute('aria-expanded', 'false');
  }
  document.body.style.overflow = ''; 
}

// account modal
const account = document.getElementById('account');
const profileModal = document.getElementById('profileModal');
const closeProfileBtn = document.getElementById('closeProfileModal');

if (account && profileModal && closeProfileBtn) {
  account.addEventListener('click', () => {
    const profileMsg = profileModal.querySelector('.profile-message');
    const redirectBtn = profileModal.querySelector('.login-redirect-btn');
    
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    const userEmail = sessionStorage.getItem("userEmail");
    const username = sessionStorage.getItem("username");

    if (isLoggedIn && userEmail) {
      const displayName = username ? username : userEmail;
      profileMsg.textContent = `Welcome back, ${displayName}!`;
      redirectBtn.textContent = 'Log Out';
      redirectBtn.href = '#';
      
      redirectBtn.onclick = (e) => {
        e.preventDefault();
        sessionStorage.clear();
        location.reload();
      };
    } else {
      profileMsg.textContent = "You haven't logged in yet!";
      redirectBtn.textContent = 'Go to Login Page';
      redirectBtn.href = 'login.html';
      redirectBtn.onclick = null;
    }

    profileModal.classList.remove('hidden');
  });

  closeProfileBtn.addEventListener('click', () => {
    profileModal.classList.add('hidden');
  });

  profileModal.addEventListener('click', (e) => {
    if (e.target === profileModal) {
      profileModal.classList.add('hidden');
    }
  });
}

// subscribe form
const subscribeForm = document.getElementById('subscribeForm');
const subscribeSuccess = document.getElementById('subscribeSuccess');

if (subscribeForm) {
  subscribeForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    subscribeForm.classList.add('hidden');
    
    if (subscribeSuccess) {
      subscribeSuccess.classList.remove('hidden');
    }
  });
}

// contact form
const contactForm = document.getElementById('contactForm');
const contactSuccess = document.getElementById('contactSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    contactForm.classList.add('hidden');
    
    if (contactSuccess) {
      contactSuccess.classList.remove('hidden');
    }
  });
}

// dark mode toggle
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
            themeToggle.setAttribute(
                "aria-pressed",
                isDarkMode ? "true" : "false"
            );
        }
    }

    const savedTheme = localStorage.getItem("theme") || "light";
    applyTheme(savedTheme);

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
