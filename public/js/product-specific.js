import { baseUrl } from "./settings/api.js";
import { productsUrl } from "./settings/api.js";
import { getProducts } from "./utils/cartItems.js";
import createMenu from "./components/createMenu.js";

createMenu();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const finalId = parseInt(id);
const url = productsUrl + finalId;
const container = document.querySelector(".product-container");

(async function callApi() {
  try {
    const response = await fetch(url);
    const json = await response.json();

    createProduct(json);
  } catch (error) {
    console.log(error);
  }
})();

function createProduct(product) {
  const addToCart = getProducts();
  console.log(addToCart);
  let addToCartStyle = "";
  let cartText = "Add to cart";

  const doesObjectExist = addToCart.find(function (prod) {
    return parseInt(product.id) === prod.id;
  });

  if (doesObjectExist) {
    cartText = "Already in cart";
    // addToCartBtnCss = "added-to-cart";
  }

  container.innerHTML = `
  <div class="row gx-5">
    <div class="col-md">
      <div class="ratio ratio-1x1">
        <img src="${baseUrl}${product.image.url}" class="img-fluid" alt="" style="object-fit: cover;">
      </div>
    </div>
    <div class="col-md">
        <h1>${product.title}</h1>
        <p>${product.description}</p>
        <h4>$ ${product.price}</h4>
        <button type="button" class="btn btn-primary btn-lg px-4 gap-3 cart-btn ${addToCartStyle}" data-id="${product.id}">
                ${cartText}
              </button>
    </div>
    </div>
  `;

  const title = product.title;
  const price = product.price;
  const image = product.image;
  const description = product.description;
  const cartButton = document.querySelector(".cart-btn");

  cartButton.addEventListener("click", handleClick);

  function handleClick() {
    const product = {
      id: finalId,
      title: title,
      price: price,
      image: image,
      description: description,
    };

    console.log("Added to cart");
    addToCart.push(product);
    saveCart(addToCart);
    createProduct(product);
  }
  function saveCart(prods) {
    localStorage.setItem("products", JSON.stringify(prods));
  }
}
