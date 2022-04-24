import { productsUrl } from "./settings/api.js";
import { baseUrl } from "./settings/api.js";
import { searchProducts } from "./components/searchProducts.js";
import createMenu from "./components/createMenu.js";

createMenu();

export function createProducts(renderProducts) {
  const container = document.querySelector(".products-container");

  container.innerHTML = "";

  renderProducts.forEach(function (product) {
    container.innerHTML += `<div class="col">
      <div class="card h-100 border-0 shadow bg-body">
        <div class="ratio ratio-1x1">
          <img src="${baseUrl}${product.image.url}" class="card-img-top img-fluid" alt="${product.image.alternativeText}">
        </div>
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text">$ ${product.price}</p>
        </div>
        <a href="/public/product-specific.html?id=${product.id}" class="stretched-link"></a>
      </div>
  </div>`;
  });
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
  }
})();
