import { getProducts } from "./utils/cartItems.js";
import { baseUrl } from "./settings/api.js";
// import { productCard } from "./practice.js";
// import { cartTotal } from "./utils/cartItems.js";
import displayMessage from "./components/displayMessage.js";
import createMenu from "./components/createMenu.js";

const products = getProducts();

createMenu();

const cartContainer = document.querySelector(".cart__items");
// const cartTotal = document.querySelector(".cart__total");

if (products.length === 0) {
  cartContainer.innerHTML = "Your cart is empty.";
}

products.forEach((product) => {
  cartContainer.innerHTML += `

    <div class="card mb-3" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${baseUrl}${product.image.url}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${product.title}</h5>
        <p class="card-text">$${product.price}</p>
        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
      </div>
      <a href="/public/product-specific.html?id=${product.id}" class="stretched-link"></a>
    </div>
  </div>
</div>

  `;
});

/* total price */
const totalContainer = document.querySelector(".total-container");

let totalPrice = 0;

for (let i = 0; i < products.length; i++) {
  let price = parseFloat(products[i].price);
  totalPrice += price;
  console.log(products[i].price);
}
console.log(totalPrice);

totalContainer.innerHTML += totalPrice;
