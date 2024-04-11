// Get the delete button
const deleteUserButton = document.querySelector("#deleteUserButton");

// Add a click event listener to the delete button
deleteUserButton.addEventListener("click", () => {
  // Confirm that the user wants to delete the user
  if (confirm("Er du sikker på at du vil slette brukeren?")) {
    // Send a request to the server to delete the user
    fetch(`admin/delete/${currentUserId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        // This could involve updating the UI to reflect the deleted user
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
});
