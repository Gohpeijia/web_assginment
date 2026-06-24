// Find the login form on the page
const loginForm = document.getElementById("loginForm");

// Find the email and password input boxes
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

// Find the eye icon and popup elements
const eyeButton = document.querySelector(".eye");
const loadingOverlay = document.getElementById("loadingOverlay");
const overlaySpinner = document.getElementById("overlaySpinner");
const overlayMessage = document.getElementById("overlayMessage");
const overlayClose = document.getElementById("overlayClose");

function hidePopup() {
    loadingOverlay.classList.add("hidden");
}

function showLoadingPopup() {
    overlayMessage.textContent = "Logging you in...";
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

// Show or hide the password when the eye is clicked
function togglePassword() {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
}

eyeButton.addEventListener("click", togglePassword);

// Run this code when the user clicks the Login button
loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (email === "" || password === "") {
        showErrorPopup("Please enter email and password.");
        return;
    }

    // Get the saved password for this email (saved by register.js)
    const savedPassword = localStorage.getItem(email);

    if (savedPassword === null || savedPassword !== password) {
        showErrorPopup("Incorrect user.");
        return;
    }

    // Save who is logged in (temporary — gone when browser tab closes)
    sessionStorage.setItem("userEmail", email);
    sessionStorage.setItem("isLoggedIn", "true");

    showLoadingPopup();

    setTimeout(function () {
        hidePopup();
        window.location.href = "index.html";
    }, 2000);
});
