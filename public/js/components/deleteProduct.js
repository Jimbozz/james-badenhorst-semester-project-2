import { getToken } from "../utils/storage.js";

import { productsUrl } from "../settings/api.js";
import displayMessage from "./displayMessage.js";

export default function deleteProduct(id) {
  const button = document.querySelector(".delete-btn");

  button.onclick = async function () {
    console.log(this.dataset.id);
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

        location.href = "/public/index.html";
      } catch (error) {
        console.log(error);
      }
    }
  };
}
