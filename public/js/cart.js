import { getProducts, saveCart } from "./utils/storage.js";

import { baseUrl } from "./settings/api.js";
import displayMessage from "./components/displayMessage.js";
import createMenu from "./components/createMenu.js";

const products = getProducts();

createMenu();
const cartContainer = document.querySelector(".cart-items");
// const cartTotal = document.querySelector(".cart__total");

if (products.length === 0) {
  cartContainer.innerHTML = "Your cart is empty.";
}

products.forEach((product) => {
  cartContainer.innerHTML += `

  <li class="list-group-item d-flex justify-content-between align-items-start cart-items__item">
    <div class="ms-2 me-auto">
      <div class="fw-bold"><h5>${product.title}</h5></div>
      <p>$${product.price}</p>
    </div>
    <img src="${baseUrl}${product.image.url}" class="cart-items__image img-fluid" alt="${product.image.alternativeText}">
    <button type="button" class="btn btn-sm btn-danger cart-items__button" data-id="${product.id}">
        <i class="bi bi-trash"></i>
      </button>
    <a href="/public/product-specific.html?id=${product.id}" class="stretched-link"></a>
  </li>
  `;
});

/*Remove item from cart */

const trashButton = document.querySelector(".cart-items__button");
trashButton.addEventListener("click", handleClick);

console.log(trashButton);

function handleClick() {
  console.log("hello");
  // const id = this.dataset.id;
  // const removeItem = products.filter((item) => item.id !== id);
  // // saveCart(removeItem);
}

/* total price */
const totalContainer = document.querySelector(".total-container");

let totalPrice = 0;

for (let i = 0; i < products.length; i++) {
  let price = parseFloat(products[i].price);

  totalPrice += price;
}
console.log(totalPrice);

totalContainer.innerHTML += totalPrice;
