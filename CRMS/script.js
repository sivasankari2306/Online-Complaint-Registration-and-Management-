const form = document.getElementById('complaintForm');
const complaintList = document.getElementById('complaintList');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const complaint = document.getElementById('complaint').value;

  // Send the data to the backend using fetch or Axios
  fetch('/register-complaint', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, complaint })
  })
  .then(response => response.json())
  .then(data => {
    // Handle the response from the backend
    console.log(data);
    // Update the complaint list on the frontend
    displayComplaints();
  })
  .catch(error => {
    console.error('Error:', error);
  });

  form.reset();
});

function displayComplaints() {
  // Fetch the list of complaints from the backend
  fetch('/get-complaints')
  .then(response => response.json())
  .then(complaints => {
    complaintList.innerHTML = '';
    complaints.forEach(complaint => {
      const li = document.createElement('li');
      li.textContent = `${complaint.name} - ${complaint.complaint}`;
      complaintList.appendChild(li);
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

// Initial load of complaints
displayComplaints();