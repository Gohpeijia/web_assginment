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
        alert("Please enter your email.");
        return;
    }

    // Valid email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Duplicate email
    if (localStorage.getItem(email) !== null) {
        alert("An account with this email already exists.");
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
        alert("Password must contain at least 8 characters.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    // Save account
    localStorage.setItem(email, password);

    alert("Account created successfully!");

    window.location.href = "login.html";

});

