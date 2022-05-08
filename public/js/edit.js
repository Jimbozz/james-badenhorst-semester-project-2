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
const loading = document.querySelector(".loading");
const title = document.querySelector("#title");
const pageTitle = document.querySelector("title");
const formHeading = document.querySelector("form h1");
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
    pageTitle.innerHTML = `Brand name | Edit product: ${json.title}`;
    formHeading.innerHTML = `Edit: ${json.title}`;
    title.value = json.title;
    price.value = json.price;
    description.value = json.description;
    idInput.value = json.id;
    image.style = `background: url('/public/${json.image.url}') center no-repeat; background-size: cover; width: 100%; height: 20rem;`;
    featured.checked = json.featured;

    deleteProduct(json.id);
  } catch (error) {
    console.log(error);
    displayMessage("error", "whoops", ".message-container");

    // form.style.display = "none";
  } finally {
    loading.style.display = "none";
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
  const idValue = idInput.value;

  // Product name error
  const nameError = document.querySelector("#titleError");
  if (titleValue.length < 1 || titleValue.length > 14) {
    nameError.style.display = "block";
  } else {
    nameError.style.display = "none";
  }

  // Price error
  const priceError = document.querySelector("#priceError");
  if (priceValue <= 0 || isNaN(priceValue)) {
    priceError.style.display = "block";
  } else {
    priceError.style.display = "none";
  }

  // Description error
  const descriptionError = document.querySelector("#descriptionError");
  if (descriptionValue.length < 10) {
    descriptionError.style.display = "block";
  } else {
    descriptionError.style.display = "none";
  }

  // Image file error
  const imageError = document.querySelector("#descriptionError");
  if (imageFile.length > 0) {
    imageError.style.display = "block";
  } else {
    imageError.style.display = "none";
  }

  if (
    titleValue.length > 1 &&
    titleValue.length < 15 &&
    descriptionValue.length > 10 &&
    priceValue.length > 0 &&
    !isNaN(priceValue) &&
    priceValue != 0 &&
    idValue
  ) {
    updateProduct(
      titleValue,
      priceValue,
      descriptionValue,
      featuredCheck,
      imageValue,
      idValue
    );
  }
  // if (
  //   titleValue.length === 0 ||
  //   priceValue.length === 0 ||
  //   descriptionValue.length === 0 ||
  //   imageFile.length > 0
  //   // && img.files.length > 0
  // ) {
  //   return displayMessage(
  //     "alert-danger",
  //     "There was an error loading, please reload the page.",
  //     ".message-container"
  //   );
  // }
}

async function updateProduct(
  title,
  price,
  description,
  featuredCheck,
  imageValue,
  id
) {
  // console.log(imageFile.name);
  const data = {
    title: title,
    price: price,
    description: description,
    featured: featuredCheck,
  };

  // const file = imageFile.files[0];
  const formData = new FormData();
  formData.append(`files.image`, imageValue, imageValue.name);
  formData.append("data", JSON.stringify(data));
  console.log(imageValue);
  const token = getToken();

  const options = {
    method: "PUT",
    body: formData,
    headers: {
      // "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(itemUrl, options);
    const json = await response.json();
    console.log(data);
    console.log(json);
    console.log("trying");

    if (json.updated_at) {
      displayMessage(
        "alert-success",
        `You have successfully updated article: ${json.title}`,
        ".message-container"
      );
      console.log("success");
    }
    if (json.error) {
      displayMessage("error", json.message, ".message-container");
    }
  } catch (error) {
    console.log(error);
  }
}
