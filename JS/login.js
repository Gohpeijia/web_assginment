// Find the login form on the page
const loginForm = document.getElementById("loginForm");

// Find the email and password input boxes
const loginInput = document.getElementById("loginInput");
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

    const login = loginInput.value.trim().toLowerCase();
    const password = passwordInput.value;

    if (login === "" || password === "") {
        showErrorPopup("Please enter your username/email and password.");
        return;
    }

    // Get all registered users
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Find matching username OR email
    const user = users.find(function (user) {

        return (
            user.username.toLowerCase() === login ||
            user.email.toLowerCase() === login
        );

    });

    if (!user) {
        showErrorPopup("Username or email not found.");
        return;
    }

    if (user.password !== password) {
        showErrorPopup("Incorrect password.");
        return;
    }

    // Save login session
    sessionStorage.setItem("isLoggedIn", "true");
    sessionStorage.setItem("userEmail", user.email);
    sessionStorage.setItem("username", user.username);

    showLoadingPopup();

    setTimeout(function () {

        hidePopup();

        window.location.href = "index.html";

    }, 2000);

});