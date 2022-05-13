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
const image = document.querySelector("#image");
const featured = document.querySelector("#featured");

form.addEventListener("submit", formSubmit);

function formSubmit(event) {
  event.preventDefault();

  message.innerHTML = "";

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
    titleValue.length > 1 &&
    priceValue.length > 2 &&
    descriptionValue.length > 5 &&
    imageValue &&
    featuredCheck
  ) {
    addProduct(titleValue, priceValue, descriptionValue, imageValue);
  }
}

async function addProduct(
  titleValue,
  priceValue,
  descriptionValue,
  featuredCheck,
  imageValue
) {
  // const data = {
  //   title: titleValue,
  //   price: priceValue,
  //   description: descriptionValue,
  //   featured: featuredCheck,
  // };

  const url = productsUrl;
  const method = form.method;
  const enctype = form.method;
  const originalFormData = new FormData(form);
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
    // "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  });

  body.append("data", JSON.stringify(data));

  try {
    const response = await fetch(url, { body, method, enctype, headers });
    console.log(response);
    // const json = await response.json();
    // console.log(json);

    if (response.ok) {
      window.location = "/public/cart.html";
      console.log("for real");
    }
  } catch (error) {
    console.log("something bad happened");
  }
}

//new function

// async function addProduct(event) {
//   event.preventDefault();
//   const url = productsUrl;
//   const form = event.target;
//   const action = form.action;
//   const method = form.method;
//   const enctype = form.method;
//   const originalFormData = new FormData(form);
//   const body = new FormData();

//   for (const [key, value] of originalFormData.entries()) {
//     if (key.includes("files.")) {
//       body.append(key, value);
//       // Add this to the request body
//       originalFormData.delete(key);
//       // Remove it from the original form data list
//     }
//   }

//   const data = Object.fromEntries(originalFormData.entries());
//   const token = getToken();
//   const headers = new Headers({
//     // "Content-Type": "application/json",
//     Authorization: `Bearer ${token}`,
//   });

//   body.append("data", JSON.stringify(data));

//   try {
//     const response = await fetch(url, { body, method, enctype, headers });
//     console.log(response);
//     const json = await response.json();
//     console.log(json);

//     // if (response.ok) {
//     //   window.location = "/public/cart.html";
//     //   console.log("created");
//     // }
//     if (response.ok) {
//       window.location = "/public/cart.html";
//       console.log("for real");
//     }
//   } catch (error) {
//     console.log("something bad happened");
//   }
// }
