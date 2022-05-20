import { baseUrl, productsUrl } from "./settings/api.js";
// import { baseUrl } from "./settings/api.js";
import displayMessage from "./components/displayMessage.js";
import { searchProducts } from "./components/searchProducts.js";
import createMenu from "./components/createMenu.js";
import { getUserName } from "./utils/storage.js";

const message = document.querySelector(".message-container");
const container = document.querySelector(".products-container");
const username = getUserName();

createMenu();

export function createProducts(renderProducts) {
  container.innerHTML = "";

  if (username) {
    renderProducts.forEach(function (product) {
      // const button = document.querySelectorAll(".delete-btn");

      container.innerHTML += `<div class="col">
        <div class="card h-100 border-0 position-relative">
          <div class="ratio ratio-4x5">
            <img src="${baseUrl}${product.image.url}" class="card-img-top img-fluid rounded-0" alt="${product.image.alternativeText}">
          </div>
          <div class="card-body p-0 mt-3">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">$ ${product.price}</p>
            <a data-id="${product.image.id}" href="/public/edit.html?id=${product.id}" class="card-link btn btn-info" style="position: absolute;top: 10px;right: 10px; z-index: 3" aria-label="edit link"><i class="bi bi-pencil-square"></i>
            </a>
          </div>
          <a href="/public/product-specific.html?id=${product.id}" class="stretched-link" aria-label="product link"></a>
        </div>
      </div>`;
    });
  } else {
    renderProducts.forEach(function (product) {
      container.innerHTML += `<div class="col">
      <div class="card h-100 border-0 bg-light">
        <div class="ratio ratio-4x5">
          <img src="${baseUrl}${product.image.url}" class="card-img-top img-fluid rounded-0" alt="${product.image.alternativeText}">
        </div>
        <div class="card-body p-0 mt-3">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text">$ ${product.price}</p>
        </div>
        <a href="/public/product-specific.html?id=${product.id}" class="stretched-link"></a>
      </div>
    </div>`;
    });
  }
}

(async function callApi() {
  try {
    const response = await fetch(productsUrl);
    const json = await response.json();
    console.log(json);

    createProducts(json);
    searchProducts(json);
  } catch (error) {
    console.log(error);
    container.innerHTML = "";
    displayMessage(
      "alert-danger",
      "There was an error loading, please reload the page.",
      ".message-container"
    );
  }
})();
