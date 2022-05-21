import displayMessage from "./components/displayMessage.js";
import createMenu from "./components/createMenu.js";
import { getToken } from "./utils/storage.js";
import { productsUrl } from "./settings/api.js";

createMenu();

const form = document.querySelector("form");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const image = document.querySelector("#image");
const featured = document.querySelector("#featured");

form.addEventListener("submit", formSubmit);

function formSubmit(event) {
  event.preventDefault();

  const titleValue = title.value.trim();
  const priceValue = price.value.trim();
  const descriptionValue = description.value.trim();
  const imageValue = image.files[0];
  const featuredCheck = featured.checked;

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
  const imageError = document.querySelector("#imageError");
  if (!imageValue) {
    imageError.style.display = "block";
  } else {
    imageError.style.display = "none";
  }

  if (
    titleValue.length > 0 &&
    titleValue.length < 15 &&
    descriptionValue.length > 10 &&
    priceValue.length > 0 &&
    !isNaN(priceValue) &&
    priceValue != 0 &&
    imageValue
  ) {
    addProduct(
      titleValue,
      priceValue,
      descriptionValue,
      featuredCheck,
      imageValue
    );
  }
}

async function addProduct(
  titleValue,
  priceValue,
  descriptionValue,
  featuredCheck,
  imageValue
) {
  const message = document.querySelector(".message-container");
  const url = productsUrl;
  const method = form.method;
  const enctype = form.enctype;
  const originalFormData = new FormData(form);
  const featuredValue = originalFormData.get("featured");

  if (featuredValue === "on") {
    originalFormData.set("featured", true);
  } else {
    originalFormData.set("featured", false);
  }

  const body = new FormData();

  for (const [key, value] of originalFormData.entries()) {
    if (key.includes("files.")) {
      body.append(key, value);
      // Add this to the request body
      originalFormData.delete(key);
      // Remove it from the original form data list
    }
  }

  const data = Object.fromEntries(originalFormData.entries());
  const token = getToken();
  const headers = new Headers({
    Authorization: `Bearer ${token}`,
  });

  body.append("data", JSON.stringify(data));

  try {
    const response = await fetch(url, { body, method, enctype, headers });

    if (response.ok) {
      window.location = "/public/products.html";
    }
  } catch (error) {
    console.log(error);
    displayMessage(
      "alert-danger",
      `An error ocurred, please reload the page and try again.`,
      ".message-container"
    );
  }
}
