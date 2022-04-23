import { baseUrl } from "./settings/api.js";
import { productsUrl } from "./settings/api.js";
import createMenu from "./components/createMenu.js";

createMenu();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const finalId = parseInt(id);
const url = productsUrl + "/" + finalId;
const container = document.querySelector(".product-container");

console.log(url);

(async function callApi() {
  try {
    const response = await fetch(url);
    const json = await response.json();
    console.log(json);

    createProduct(json);
  } catch (error) {
    console.log(error);
  }
})();

function createProduct(product) {
  console.log(product.image.url);
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
        <button type="button" class="btn btn-primary btn-lg px-4 gap-3">
                Primary button
              </button>
      
    </div>
    </div>
  `;
}
