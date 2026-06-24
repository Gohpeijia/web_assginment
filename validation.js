// Find the register form on the page
const registerForm = document.getElementById("registerr_form");

// Find the email and password input boxes
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm_password");

// Run this code when the user clicks Create Account
registerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    const errorMessage = validateRegisterForm(email, password, confirmPassword);

    if (errorMessage !== "") {
        alert(errorMessage);
        return;
    }

    // Check if this email is already registered
    const existingAccount = localStorage.getItem(email);

    if (existingAccount !== null) {
        alert("An account with this email already exists.");
        return;
    }

    // Save the new account in the browser (email = key, password = value)
    localStorage.setItem(email, password);

    alert("Account created! You can log in now.");
    window.location.href = "login.html";
});