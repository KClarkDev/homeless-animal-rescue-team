const sendEmail = require("../utils/courier"); // Update the path accordingly

// Login functionality
const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector("#user-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If successful, redirect the browser to the dashboard page
      document.location.replace("/application");
    } else {
      alert("Incorrect email or password, please try again.");
    }
  }
};

// Sign-up functionality
const signupFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the sign-up form
  const name = document.querySelector("#name-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  if (name && email && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If successful, redirect the browser to the dashboard page
      document.location.replace("/dashboard");

      // Trigger the email response
      sendEmail(name, email);
    } else {
      alert(
        "The username, email, or password is invalid, please try again. Remember, the password must be at least 8 characters, and username and email must be unique."
      );
    }
  }
};

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);

// Class name is a placeholder - confirm with team
document.querySelector(".sign-up-btn").addEventListener("submit", emailTrigger);
