const form = document.getElementById("orderForm");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const quantity = document.getElementById("quantity").value;
  fetch("/brus/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ quantity }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      $("#orderModal").modal("show");
    });
});

$("#orderModal").on("hidden.bs.modal", function (e) {
  window.location.reload();
});
