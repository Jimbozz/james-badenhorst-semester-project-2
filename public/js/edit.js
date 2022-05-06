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

const itemUrl = productsUrl + id;

const form = document.querySelector("form");
const message = document.querySelector(".message-container");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const idInput = document.querySelector("#id");
const image = document.querySelector(".img");
const featured = document.querySelector("#featured");
const imageFile = document.querySelector("#imgfile");

(async function () {
  try {
    const response = await fetch(itemUrl);
    const json = await response.json();

    console.log(json);

    title.value = json.title;
    price.value = json.price;
    description.value = json.description;
    idInput.value = json.id;
    image.style = `background: url('/public/${json.image.url}') center no-repeat; background-size: cover; width: 100%; height: 20rem;`;
    featured.checked = json.featured;

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
  const imageValue = imageFile.files[0];
  const featuredCheck = featured.checked;

  if (
    titleValue.length > 1 &&
    priceValue.length > 2 &&
    descriptionValue.length > 5 &&
    imageValue
    // && img.files.length > 0
  ) {
    updateProduct(
      titleValue,
      priceValue,
      descriptionValue,
      featuredCheck,
      imageValue
    );
  }
}

async function updateProduct(
  titleValue,
  priceValue,
  descriptionValue,
  featuredCheck,
  imageValue
) {
  let data = {
    title: titleValue,
    price: priceValue,
    description: descriptionValue,
    featured: featuredCheck,
  };

  const formData = new FormData();
  formData.append("files.image", imageValue, imageValue.name);
  formData.append("data", JSON.stringify(data));

  const token = getToken();
  data = formData;

  const options = {
    method: "PUT",
    body: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(itemUrl, options);
    const json = await response.json();
    console.log(json);
    console.log("trying");

    if (json.updated_at) {
      displayMessage(
        "success",
        `You have successfully updated article: ${json.title}`,
        ".message-container"
      );
      console.log("this was updated");
    }
    if (json.error) {
      displayMessage("error", json.message, ".message-container");
    }
  } catch (error) {
    console.log(error);
  }
}
