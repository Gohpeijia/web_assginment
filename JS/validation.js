// Form
const registerForm = document.getElementById("registerr_form");

// Steps
const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");

// Buttons
const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");

// Inputs
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm_password");


// ========================================
// NEXT BUTTON
// ========================================

nextBtn.addEventListener("click", function () {

    const email = emailInput.value.trim();

    if (email === "") {
        showErrorPopup("Please enter your email.");
        return;
    }

    // Valid email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        showErrorPopup("Please enter a valid email address.");
        return;
    }

    // Duplicate email
    if (localStorage.getItem(email) !== null) {
        showErrorPopup("An account with this email already exists.");
        return;
    }

    // Move to Step 2
    step1.style.display = "none";
    step2.style.display = "block";

});


// ========================================
// BACK BUTTON
// ========================================

backBtn.addEventListener("click", function () {

    step2.style.display = "none";
    step1.style.display = "block";

});


// ========================================
// REGISTER
// ========================================

registerForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    if (password.length < 8) {
        showErrorPopup("Password must contain at least 8 characters.");
        return;
    }

    if (password !== confirmPassword) {
        showErrorPopup("Passwords do not match.");
        return;
    }

    // Save account
    localStorage.setItem(email, password);

    showLoadingPopup("Creating your account...");

    setTimeout(function () {

    hidePopup();

    window.location.href = "login.html";

}, 2000);

});

const loadingOverlay = document.getElementById("loadingOverlay");
const overlaySpinner = document.getElementById("overlaySpinner");
const overlayMessage = document.getElementById("overlayMessage");
const overlayClose = document.getElementById("overlayClose");

function hidePopup() {
    loadingOverlay.classList.add("hidden");
}

function showLoadingPopup(message) {
    overlayMessage.textContent = message;
    overlaySpinner.classList.remove("hidden");
    overlayClose.classList.add("hidden");
    loadingOverlay.classList.remove("hidden");
}

function showErrorPopup(message) {
    overlayMessage.textContent = message;
    overlaySpinner.classList.add("hidden");
    overlayClose.classList.remove("hidden");
    loadingOverlay.classList.remove("hidden");
}

overlayClose.addEventListener("click", hidePopup);