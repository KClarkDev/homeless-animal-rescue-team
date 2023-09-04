const newFormHandler = async (event) => {
  console.log("Within new form handler");
  event.preventDefault();
  const first_name = document.querySelector("#first_name").value;
  const last_name = document.querySelector("#last_name").value;
  const address = document.querySelector("#address").value;
  const email = document.querySelector("#email").value;
  const phone = document.querySelector("#phone").value;
  const previous_adopter = document.querySelector("#previous_adopter")
    ? true
    : false;
  const pets_owned = document.querySelector("#pets_owned").value;

  console.log("retrieved all values from the form");

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
  console.log("after fetch request");
  console.log(response.status);

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
