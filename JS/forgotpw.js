// Find the login form on the page
const resetform = document.getElementById("resetform");

// Find the eye icon and popup elements
const eyeButton = document.querySelectorAll(".eye");
const loadingOverlay = document.getElementById("loadingOverlay");
const overlaySpinner = document.getElementById("overlaySpinner");
const overlayMessage = document.getElementById("overlayMessage");
const overlayClose = document.getElementById("overlayClose");

function hidePopup() {
    loadingOverlay.classList.add("hidden");
}

function showLoadingPopup() {
    overlayMessage.textContent = "Resetting password";
    overlaySpinner.classList.remove("hidden");
    overlayClose.classList.add("hidden");
    loadingOverlay.classList.remove("hidden");
}

function showSuccessPopup() {
    overlayMessage.textContent = "Password reset successfully!";
    overlaySpinner.classList.add("hidden");
    overlayClose.classList.remove("hidden");
}

resetform.addEventListener("submit", function (event) {
    event.preventDefault();

    showLoadingPopup();

    setTimeout(function () {
        showSuccessPopup();
    }, 2000);
});


//close the popup
overlayClose.addEventListener("click", function () {
    hidePopup();
    resetform.reset();
});

// Show or hide the password when the eye is clicked
eyeButton.forEach(function (eyeButton) {
    eyeButton.addEventListener("click", function () {
        const passwordInput = eyeButton.previousElementSibling;

        if (passwordInput.type === "password") {
            passwordInput.type = "text";
        } else {
            passwordInput.type = "password";
        }
    });
});