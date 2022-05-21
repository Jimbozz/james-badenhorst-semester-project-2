import { baseUrl, productsUrl } from "./settings/api.js";
import { getProducts, saveCart } from "./utils/storage.js";
import createMenu from "./components/createMenu.js";
import displayMessage from "./components/displayMessage.js";

createMenu();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const finalId = parseInt(id);
const url = productsUrl + finalId;
const container = document.querySelector(".product-container");
const title = document.querySelector("title");
const message = document.querySelector(".message-container");

(async function callApi() {
  try {
    const response = await fetch(url);
    const json = await response.json();
    title.innerHTML = `Soles | ${json.title}`;

    createProduct(json);
  } catch (error) {
    console.log(error);
    displayMessage(
      "alert-success",
      `You have successfully updated product: ${json.title}`,
      ".message-container"
    );
  }
})();

function createProduct(product) {
  const addToCart = getProducts();
  let addToCartStyle = "";
  let cartText = "Add to cart";

  const doesObjectExist = addToCart.find(function (prod) {
    return parseInt(prod.id) === product.id;
  });

  if (!doesObjectExist) {
    addToCartStyle = "btn-primary";
  }
  if (doesObjectExist) {
    cartText = "Remove from cart";
    addToCartStyle = "btn-danger";
  }

  container.innerHTML = `
  <div class="row">
    <div class="col-md">
      <div class="ratio ratio-1x1">
        <img src="${baseUrl}${product.image.url}" class="img-fluid" alt="" style="object-fit: cover;">
      </div>
    </div>
    <div class="col-md">
        <h1 class="mt-3 mt-md-0">${product.title}</h1>
        <h4>$ ${product.price}</h4>
        <p class="mt-3">${product.description}</p>
        <button type="button" class="btn cart-btn mt-3 ${addToCartStyle}" data-id="${product.id}">
          ${cartText}
        </button>
    </div>
  </div>`;

  const title = product.title;
  const price = product.price;
  const image = product.image;
  const description = product.description;
  const cartButton = document.querySelector(".cart-btn");

  cartButton.addEventListener("click", handleClick);

  function handleClick() {
    const id = this.dataset.id;
    const productExists = addToCart.find(function (item) {
      return item.id === id;
    });
    if (productExists === undefined) {
      const product = {
        id: id,
        title: title,
        price: price,
        image: image,
        description: description,
      };
      addToCart.push(product);
      saveCart(addToCart);
    } else {
      const newProducts = addToCart.filter((item) => item.id !== id);
      saveCart(newProducts);
    }
    createProduct(product);
  }
}
