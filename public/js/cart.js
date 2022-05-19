import { getProducts, saveCart } from "./utils/storage.js";

import { baseUrl } from "./settings/api.js";
import displayMessage from "./components/displayMessage.js";
import createMenu from "./components/createMenu.js";

const products = getProducts();

createMenu();
const cartContainer = document.querySelector(".cart-items");
const message = document.querySelector(".message-container");
// const cartTotal = document.querySelector(".cart__total");

if (products.length === 0) {
  cartContainer.innerHTML = "Your cart is empty.";
  displayMessage(
    "alert-warning",
    `Your cart is currently empty.`,
    ".message-container"
  );
}

products.forEach((product) => {
  cartContainer.innerHTML += `

  <li class="list-group-item d-flex justify-content-between align-items-start cart-items__item">
    <div class="ms-2 me-auto">
      <div class="fw-bold"><h5>${product.title}</h5></div>
      <p>$${product.price}</p>
    </div>
    <img src="${baseUrl}${product.image.url}" class="cart-items__image img-fluid" alt="${product.image.alternativeText}">
    <a href="/public/product-specific.html?id=${product.id}" class="stretched-link"></a>
  </li>
  `;
});

/* total price */
const totalContainer = document.querySelector(".cart-total");

let totalPrice = 0;

for (let i = 0; i < products.length; i++) {
  let price = parseFloat(products[i].price);
  totalPrice += price;
}
const rounded = Math.round(totalPrice * 1000) / 1000;
console.log(rounded);

totalContainer.innerHTML += rounded;
