import { getToken } from "../utils/storage.js";
import { productsUrl } from "../settings/api.js";
import displayMessage from "./displayMessage.js";

export default function deleteProduct(id) {
  const button = document.querySelector(".btn-outline-danger");
  const value = getToken();

  if (!value) {
    displayMessage(
      "alert-warning",
      "You must be logged in to delete/edit an article.",
      ".message-container"
    );
    button.disabled = true;
  }

  button.onclick = async function () {
    const deleteCheck = confirm(
      "Are you sure you want to delete this product?"
    );

    if (deleteCheck) {
      const url = productsUrl + id;
      const token = getToken();
      const options = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await fetch(url, options);
        const json = await response.json();

        if (json.error) {
          displayMessage(
            "alert-danger",
            "Something went wrong. Please reload the page and try again.",
            ".message-container"
          );
        }
        location.href = "/public/products.html";
      } catch (error) {
        console.log(error);
        displayMessage(
          "alert-danger",
          "Something went wrong. Please reload the page and try again.",
          ".message-container"
        );
      }
    }
  };
}
