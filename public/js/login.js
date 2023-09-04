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
      // If successful, redirect the browser to the home page
      document.location.replace("/");
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
      // If successful, redirect the browser to the home page
      document.location.replace("/");
    } else {
      alert(
        "The username, email, or password is invalid, please try again. Remember, the password must be at least 8 characters, and username and email must be unique."
      );
    }
  }
};

const sendEmail = async () => {
  console.log("Working on sending email in login.js");
  try {
    const emailData = {
      recipient: "kec0892@gmail.com",
      name: "Katie Clark",
    };

    const response = await fetch("/api/users/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result.message);
      console.log("Result was ok");
    } else {
      console.error("Failed to send email:", response.statusText);
      console.log("Result was not ok");
    }
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);

document.querySelector(".login-form").addEventListener("submit", sendEmail);

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);

// // Class name is a placeholder - confirm with team
// document.querySelector(".sign-up-btn").addEventListener("submit", emailTrigger);
