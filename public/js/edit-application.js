async function newFormHandler(event) {
    event.preventDefault();
    const first_name = document.querySelector('#first_name').value;
    const last_name = document.querySelector('#last_name').value;
    const address = document.querySelector('#address').value;
    const email = document.querySelector('#email').value;
    const previous_adopter = document.querySelector('#previous_adopter') ? true : false;
    const pets_owned = document.querySelector('#pets_owned').value;
  
    const response = await fetch(`/api/userRoutes`, {
      method: 'POST',
      body: JSON.stringify({
        first_name,
        last_name,
        address,
        email,
        previous_adopter,
        pets_owned,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to add adoption application');
    }
  }
  
  document.querySelector('.new-application-form').addEventListener('submit', newFormHandler);