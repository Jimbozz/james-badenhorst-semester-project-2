import displayMessage from "./components/displayMessage.js";
import createMenu from "./components/createMenu.js";
import { getToken } from "./utils/storage.js";
import { productsUrl } from "./settings/api.js";

createMenu();

const formElement = document.querySelector("form");
const message = document.querySelector(".message-container");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const image = document.querySelector("#img");
const featured = document.querySelector("#featured");

formElement.addEventListener("submit", formSubmit);

function formSubmit(event) {
  event.preventDefault();

  message.innerHTML = "";

  const titleValue = title.value.trim();
  const priceValue = price.value.trim();
  const descriptionValue = description.value.trim();
  const imageValue = image.files[0];
  const featuredCheck = featured.checked;

  if (
    titleValue.length > 1 &&
    priceValue.length > 2 &&
    descriptionValue.length > 5 &&
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
  const data = {
    title: titleValue,
    price: priceValue,
    description: descriptionValue,
    featured: featuredCheck,
  };

  const formData = new FormData();
  formData.append("files.image", imageValue, imageValue.name);
  formData.append("data", JSON.stringify(data));
  console.log(imageValue);
  // if (image.type === "file") {
  //   const file = image.files[0];
  //   console.log(file);
  //   formData.append(`files.${image.name}`, file, file.name);
  // }

  const token = getToken();
  const options = {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(productsUrl, options);
    const json = await response.json();
    console.log(json);

    if (json.created_at) {
      displayMessage(
        "success",
        "Successfully created article.",
        ".message-container"
      );
      formElement.reset();
      console.log("success");
    }
  } catch (error) {
    console.log(error);
  }
}
