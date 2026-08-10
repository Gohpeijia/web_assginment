    // Register Form
    const registerForm = document.getElementById("registerr_form");

    // Steps
    const step1 = document.getElementById("step1");
    const step2 = document.getElementById("step2");
    const step3 = document.getElementById("step3");

    // Buttons
    const nextBtn1 = document.getElementById("nextBtn1");
    const nextBtn2 = document.getElementById("nextBtn2");
    const backBtn1 = document.getElementById("backBtn1");
    const backBtn2 = document.getElementById("backBtn2");

    // Inputs
    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm_password");

    // Popup Elements
    const loadingOverlay = document.getElementById("loadingOverlay");
    const overlaySpinner = document.getElementById("overlaySpinner");
    const overlayMessage = document.getElementById("overlayMessage");
    const overlayClose = document.getElementById("overlayClose");

    // Popup Functions
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

    // Load Users
    let users = JSON.parse(localStorage.getItem("users")) || [];


    // Username Validation
    nextBtn1.addEventListener("click", function () {

        const username = usernameInput.value.trim();

        if (username === "") {
            showErrorPopup("Please enter a username.");
            return;
        }

        // Duplicate username
        const usernameExists = users.some(user =>
            user.username.toLowerCase() === username.toLowerCase()
        );

        if (usernameExists) {
            showErrorPopup("Username already exists.");
            return;
        }

        goToStep2();

    });

    //back button 1
    backBtn1.addEventListener("click", function () {

        progress2.classList.remove("active");

        progress1.classList.remove("completed");
        progress1.classList.add("active");

        line1.classList.remove("completed");

        step2.style.display = "none";
        step1.style.display = "flex";

    });

    // Email Validation
    nextBtn2.addEventListener("click", function () {

    const email = emailInput.value.trim().toLowerCase();

        if (email === "") {
            showErrorPopup("Please enter your email.");
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            showErrorPopup("Please enter a valid email address.");
            return;
        }

        // Duplicate email
        const emailExists = users.some(user =>
            user.email.toLowerCase() === email
        );

        if (emailExists) {
            showErrorPopup("An account with this email already exists.");
            return;
        }

        goToStep3();

    });

    //back button 2
    backBtn2.addEventListener("click", function () {

        progress3.classList.remove("active");

        progress2.classList.remove("completed");
        progress2.classList.add("active");

        line2.classList.remove("completed");

        step3.style.display = "none";
        step2.style.display = "flex";

    });

    // CREATE ACCOUNT
    registerForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const username = usernameInput.value.trim();
        const email = emailInput.value.trim().toLowerCase();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (password.length < 8) {
            showErrorPopup("Password must contain at least 8 characters.");
            return;
        }

        if (password !== confirmPassword) {
            showErrorPopup("Passwords do not match.");
            return;
        }

        // Create user object
        const newUser = {
            username: username,
            email: email,
            password: password
        };

        // Add to array
        users.push(newUser);

        // Save array into localStorage
        localStorage.setItem("users", JSON.stringify(users));

        showLoadingPopup("Creating your account...");

        setTimeout(function () {

            hidePopup();

            window.location.href = "login.html";

        }, 2000);

    });


    // Progress Bar
    const progress1 = document.getElementById("progress1");
    const progress2 = document.getElementById("progress2");
    const progress3 = document.getElementById("progress3");

    const line1 = document.getElementById("line1");
    const line2 = document.getElementById("line2");

    function goToStep2() {

    line1.classList.add("completed");

    setTimeout(() => {
        progress1.classList.remove("active");
        progress1.classList.add("completed");

        progress2.classList.add("active");
    }, 450);

    setTimeout(() => {
        step1.style.display = "none";
        step2.style.display = "flex";
    }, 550);

    }

    function goToStep3() {

    line2.classList.add("completed");

    setTimeout(() => {
        progress2.classList.remove("active");
        progress2.classList.add("completed");

        progress3.classList.add("active");
    }, 450);

    setTimeout(() => {
        step2.style.display = "none";
        step3.style.display = "flex";
    }, 550);

    }