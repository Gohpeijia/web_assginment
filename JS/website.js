/* ─────────────────────────────────────────────
   PROFILE MODAL LOGIC
   ───────────────────────────────────────────── */
const account = document.getElementById('account');
const profileModal = document.getElementById('profileModal');
const closeProfileBtn = document.getElementById('closeProfileModal');

// 1. Open the modal and dynamically set login/logout states
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

// 4. Close the modal when clicking the dark background outside the box
profileModal.addEventListener('click', (e) => {
  if (e.target === profileModal) {
    profileModal.classList.add('hidden');
  }
});

/* ─────────────────────────────────────────────
   SUBSCRIBE FORM LOGIC
   ───────────────────────────────────────────── */
const subscribeForm = document.getElementById('subscribeForm');
const subscribeSuccess = document.getElementById('subscribeSuccess');

if (subscribeForm) {
  subscribeForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Stops the page from refreshing
    
    // Hide the input form using your existing .hidden class
    subscribeForm.classList.add('hidden');
    
    // Show the success message
    subscribeSuccess.classList.remove('hidden');
  });
}
