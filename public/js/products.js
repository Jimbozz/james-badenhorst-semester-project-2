import { baseUrl, productsUrl } from "./settings/api.js";
// import { baseUrl } from "./settings/api.js";
import displayMessage from "./components/displayMessage.js";
import { searchProducts } from "./components/searchProducts.js";
import createMenu from "./components/createMenu.js";
import { getUserName } from "./utils/storage.js";

const messageContainer = document.querySelector(".message-container");
const container = document.querySelector(".products-container");
const username = getUserName();

createMenu();

export function createProducts(renderProducts) {
  container.innerHTML = "";

  if (username) {
    renderProducts.forEach(function (product) {
      // const button = document.querySelectorAll(".delete-btn");

      container.innerHTML += `<div class="col">
        <div class="card h-100 border-0 shadow bg-body">
          <div class="ratio ratio-1x1">
            <img src="${baseUrl}${product.image.url}" class="card-img-top img-fluid" alt="${product.image.alternativeText}">
          </div>
          <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">$ ${product.price}</p>
            <a href="/public/product-specific.html?id=${product.id}" class="card-link">View product</a>
            <a href="/public/edit.html?id=${product.id}" class="card-link btn btn-info"><i class="bi bi-pencil-square"></i>
            </a>
          </div>
        </div>
      </div>`;
    });
  } else {
    renderProducts.forEach(function (product) {
      container.innerHTML += `<div class="col">
      <div class="card h-100 border-0 shadow bg-body">
        <div class="ratio ratio-1x1">
          <img src="${baseUrl}${product.image.url}" class="card-img-top img-fluid" alt="${product.image.alternativeText}">
        </div>
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text">$ ${product.price}</p>
          <a href="/public/product-specific.html?id=${product.id}" class="card-link">View product</a>
        </div>
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
