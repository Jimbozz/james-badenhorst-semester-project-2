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
const file = document.querySelector("#formFile");

form.addEventListener("submit", formSubmit);

function formSubmit(event) {
  event.preventDefault();

  message.innerHTML = "";

  const titleValue = title.value.trim();
  const priceValue = price.value.trim();
  const descriptionValue = description.value.trim();

  if (
    titleValue.length === 0 ||
    priceValue.length === 0 ||
    descriptionValue === 0
  ) {
    return displayMessage(
      "alert-warning",
      "Invalid value. There must be at least one character in each input.",
      ".message-container"
    );
  }
  addProduct(titleValue, priceValue, descriptionValue, file);
}

async function addProduct(title, price, description, file) {
  const url = productsUrl;
  const data = JSON.stringify({
    title: title,
    price: price,
    description: description,
    file: file,
  });
  console.log(data);
  const token = getToken();

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
  } catch (error) {
    console.log(error);
  }
}

// file.type = true
