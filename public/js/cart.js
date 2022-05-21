import { getProducts } from "./utils/storage.js";
import { baseUrl } from "./settings/api.js";
import displayMessage from "./components/displayMessage.js";
import createMenu from "./components/createMenu.js";

const products = getProducts();

createMenu();

const cartContainer = document.querySelector(".cart-items");
const message = document.querySelector(".message-container");
const button = document.querySelector(".btn");

if (products.length === 0) {
  button.disabled = true;
  displayMessage(
    "alert-warning",
    `Your cart is currently empty.`,
    ".message-container"
  );
}

products.forEach((product) => {
  cartContainer.innerHTML += `

   <div class="col">
      <div class="card h-100 border-0">
        <div class="ratio ratio-4x5">
          <img src="${baseUrl}${product.image.url}" class="card-img-top img-fluid rounded-0" alt="${product.image.alternativeText}">
        </div>
        <div class="card-body p-0 mt-3">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text">$ ${product.price}</p>
        </div>
        <a href="/public/product-specific.html?id=${product.id}" class="stretched-link" aria-label="${product.title}"></a>
      </div>
    </div>
  `;
});

/* cart total price */

const totalContainer = document.querySelector(".cart-total");

let totalPrice = 0;

for (let i = 0; i < products.length; i++) {
  let price = parseFloat(products[i].price);
  totalPrice += price;
}
const rounded = Math.round(totalPrice * 1000) / 1000;

totalContainer.innerHTML += rounded;
