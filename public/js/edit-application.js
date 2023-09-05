const newFormHandler = async (event) => {
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
      previous_adopter,
      pets_owned,
    }),
  });

  if (response.ok) {
    document.location.replace("/");
    alert("Successfully submitted adoption application!");
  } else {
    alert("Failed to add adoption application");
  }
};

document
  .querySelector(".edit-application-form")
  .addEventListener("submit", newFormHandler);
