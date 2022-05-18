import { baseUrl } from "./settings/api.js";
import { productsUrl } from "./settings/api.js";
import { getProducts, saveCart } from "./utils/storage.js";
import createMenu from "./components/createMenu.js";

createMenu();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const finalId = parseInt(id);
const url = productsUrl + finalId;
const container = document.querySelector(".product-container");
const title = document.querySelector("title");

(async function callApi() {
  try {
    const response = await fetch(url);
    const json = await response.json();
    /*Rename title of page when brand name has been decided*/
    title.innerHTML = `Soles | ${json.title}`;
    createProduct(json);
  } catch (error) {
    console.log(error);
  }
})();

function createProduct(product) {
  const addToCart = getProducts();
  let addToCartStyle = "";
  let cartText = "Add to cart";

  const doesObjectExist = addToCart.find(function (prod) {
    return parseInt(prod.id) === product.id;
  });

  if (doesObjectExist) {
    cartText = "Remove from cart";
    addToCartStyle = "btn-danger";
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
