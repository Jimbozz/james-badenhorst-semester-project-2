import createMenu from "./components/createMenu.js";
import { productsUrl } from "./settings/api.js";
import displayMessage from "./components/displayMessage.js";
import { getToken } from "./utils/storage.js";
import deleteProduct from "./components/deleteProduct.js";

createMenu();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

if (!id) {
  document.location.href = "/public/products.html";
}

const itemUrl = productsUrl + "/" + id;

const form = document.querySelector("form");
const message = document.querySelector(".message-container");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const idInput = document.querySelector("#id");
const img = document.querySelector(".img");
const imgFile = document.querySelector("#imgfile");

(async function () {
  try {
    const response = await fetch(itemUrl);
    const json = await response.json();

    console.log(json);

    title.value = json.title;
    price.value = json.price;
    description.value = json.description;
    idInput.value = json.id;
    img.style = `background: url('/public/${json.image.url}') center no-repeat; background-size: cover; width: 100%; height: 20rem;`;

    // deleteArticle(json.id);
  } catch (error) {
    console.log(error);
  }
})();

form.addEventListener("submit", formSubmit);

function formSubmit(event) {
  event.preventDefault();

  const titleValue = title.value.trim();
  const priceValue = price.value.trim();
  const descriptionValue = description.value.trim();
  // const imgValue = img.files[0];

  if (
    titleValue.length > 1 &&
    priceValue.length > 2 &&
    descriptionValue.length > 5
    // && img.files.length > 0
  ) {
    updateProduct(titleValue, priceValue, descriptionValue);
  }
}

async function updateProduct(titleValue, priceValue, descriptionValue) {
  const data = JSON.stringify({
    title: titleValue,
    price: priceValue,
    description: descriptionValue,
  });
  const token = getToken();

  const options = {
    method: "PUT",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(itemUrl, options);
    const json = await response.json();
    console.log(json);

    if (json.updated_at) {
      displayMessage(
        "success",
        `You have successfully updated article: ${json.title}`,
        ".message-container"
      );
    }
    if (json.error) {
      displayMessage("error", json.message, ".message-container");
    }
  } catch (error) {
    console.log(error);
  }
}
