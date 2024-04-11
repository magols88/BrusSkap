let currentUserId;
// Get the modal and form elements
const modal = document.querySelector("#editUserModal");
const form = document.querySelector("#editUserForm");

// Get the form fields
const nameField = form.querySelector("#name");
const usernameField = form.querySelector("#username");
const emailField = form.querySelector("#email");
const totalBrusField = form.querySelector("#totalBrus");
const teamField = form.querySelector("#team");

// Get the edit buttons
const editButtons = document.querySelectorAll(".edit-button");

// Add click event listeners to the edit buttons
editButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Get the user's current data and ID
    const userData = {
      id: button.dataset.userId,
      name: button.dataset.userName,
      username: button.dataset.userUsername,
      email: button.dataset.userEmail,
      totalBrus: button.dataset.userTotalbrus,
      team: button.dataset.userTeam,
    };
    currentUserId = button.dataset.userId;

    // Populate the form fields with the user's data
    nameField.value = userData.name;
    usernameField.value = userData.username;
    emailField.value = userData.email;
    totalBrusField.value = userData.totalBrus;
    teamField.value = userData.team;

    // Show the modal
    $("#editUserModal").modal("show");
  });
});

// Add a submit event listener to the form
async function updateUser(event) {
  event.preventDefault();

  // Get the updated user data from the form fields
  const updatedUserData = {
    name: nameField.value,
    username: usernameField.value,
    email: emailField.value,
    totalBrus: totalBrusField.value,
    team: teamField.value,
  };

  // Send a request to the server to update the user's data
  // You'll need to replace '/update-user' with the actual endpoint you're using
  fetch(`admin/update/${currentUserId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedUserData),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response from the server
      // This could involve updating the UI to reflect the updated user data
      // and closing the modal
      console.log(data);
      $(modal).modal("hide");
      location.reload();
    })
    .catch((error) => {
      // Handle any errors
      console.error("Error:", error);
    });
}

form.addEventListener("submit", updateUser);
