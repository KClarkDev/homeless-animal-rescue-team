const newFormHandler = async (event) => {
  console.log("In newFormHandler after clicking submit button");
  event.preventDefault();
  const first_nameElement = document.querySelector("#first_name");
  const last_nameElement = document.querySelector("#last_name");
  const addressElement = document.querySelector("#address");
  const emailElement = document.querySelector("#email");
  const phoneElement = document.querySelector("#phone");
  const pets_ownedElement = document.querySelector("#pets_owned");

  // Check if the elements exist before accessing their values
  const first_name = first_nameElement ? first_nameElement.value : "";
  const last_name = last_nameElement ? last_nameElement.value : "";
  const address = addressElement ? addressElement.value : "";
  const email = emailElement ? emailElement.value : "";
  const phone = phoneElement ? phoneElement.value : "";
  const pets_owned = pets_ownedElement ? pets_ownedElement.value : "";

  const response = await fetch(`/api/users/adopt-update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      first_name,
      last_name,
      address,
      email,
      phone,
      pets_owned,
    }),
  });

  console.log(response);
  if (response.ok) {
    document.location.replace("/");
    alert("Successfully submitted adoption application!");
  } else {
    alert("Failed to add adoption application");
  }
};

// Populate data into form from db if box is checked
const populateFormHandler = async (event) => {
  event.preventDefault();

  const response = await fetch(`/api/users/adopt`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    console.log("checkbox worked");
    const result = await response.json();

    const firstNameValue = result.first_name;
    const firstNameElement = document.querySelector("#first_name");
    firstNameElement.value = firstNameValue;

    const lastNameValue = result.last_name;
    const lastNameElement = document.querySelector("#last_name");
    lastNameElement.value = lastNameValue;

    const addressValue = result.address;
    const addressElement = document.querySelector("#address");
    addressElement.value = addressValue;

    const phoneValue = result.phone;
    const phoneElement = document.querySelector("#phone");
    phoneElement.value = phoneValue;

    const petsValue = result.pets_owned;
    const petsElement = document.querySelector("#pets_owned");
    petsElement.value = petsValue;
  } else {
    console.log("Checkbox didn't work");
  }
};

document
  .querySelector(".edit-application-form")
  .addEventListener("submit", newFormHandler);

document
  .querySelector("#previous_adopter")
  .addEventListener("click", populateFormHandler);
