import displayMessage from "./components/displayMessage.js";
import createMenu from "./components/createMenu.js";
import { getToken } from "./utils/storage.js";
import { productsUrl } from "./settings/api.js";

createMenu();

const form = document.querySelector("form");
const message = document.querySelector(".message-container");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const image = document.querySelector("#img");

form.addEventListener("submit", formSubmit);

function formSubmit(event) {
  event.preventDefault();

  message.innerHTML = "";

  const titleValue = title.value.trim();
  // const priceValue = price.value.trim();
  const priceValue = parseFloat(price.value);
  const descriptionValue = description.value.trim();
  // const imgValue = img.files[0];
  const imageValue = image.value;
  console.log(imageValue);

  if (
    titleValue.length === 0 ||
    priceValue.length === 0 ||
    descriptionValue === 0
  ) {
    return displayMessage(
      "alert-warning",
      "Invalid value. There must be at least one character in each input and an image file.",
      ".message-container"
    );
  }

  addProduct(titleValue, priceValue, descriptionValue, imageValue);
}

async function addProduct(title, price, description, imageValue) {
  const url = productsUrl;
  const data = JSON.stringify({
    title: title,
    price: price,
    description: description,
    image_url: imageValue,
  });

  const token = getToken();

  //fetch product image

  // const formData = new FormData();
  // formData.append("files.image", imgValue, imgValue.name);
  // formData.append("data", JSON.stringify(data));

  //
  const options = {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(url, options);
    console.log(url);

    const json = await response.json();
    console.log(json);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

// file.type = true
