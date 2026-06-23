function validateRegisterForm(email, password, confirmPassword) {
    if (email === "" || password === "" || confirmPassword === "") {
        return "Please fill in all fields.";
    }

    if (password.length < 8) {
        return "Password must have at least 8 characters.";
    }

    if (password !== confirmPassword) {
        return "Passwords do not match.";
    }

    return "";
}
