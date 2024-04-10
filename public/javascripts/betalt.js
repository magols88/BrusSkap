document.querySelectorAll(".betalt-button").forEach((button) => {
  button.addEventListener("click", function (event) {
    event.preventDefault();

    let userId = this.dataset.userId;

    fetch(`/admin/betalt/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        window.location.reload();
      });
  });
});
