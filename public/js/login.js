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
  const username = document.querySelector("#user-signup").value.trim();
  const email = document.querySelector("#signup-email").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  if (username && email && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    console.log(response);
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
  try {
    // Hard-coded for testing and demo purposes
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
    } else {
      console.error("Failed to send email:", response.statusText);
    }
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

document
  .querySelector(".form-new-form1")
  .addEventListener("submit", loginFormHandler);

document.querySelector(".form-new-form2").addEventListener("submit", sendEmail);

document
  .querySelector(".form-new-form2")
  .addEventListener("submit", signupFormHandler);
