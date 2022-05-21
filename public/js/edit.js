import createMenu from "./components/createMenu.js";
import { productsUrl, baseUrl, mediaUrl } from "./settings/api.js";
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
    featured.checked = json.featured;

    deleteProduct(json.id);
  } catch (error) {
    console.log(error);
    displayMessage(
      "alert-danger",
      `An error ocurred, please reload the page and try again.`,
      ".message-container"
    );
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
      idValue,
      image
    );
  }
}

async function updateProduct(
  title,
  price,
  description,
  featuredCheck,
  id,
  image
) {
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

  const options = {
    enctype: enctype,
    method: "PUT",
    body: body,
    headers: headers,
  };

  body.append("data", JSON.stringify(data));

  try {
    const response = await fetch(itemUrl, options);
    const json = await response.json();

    if (json.updated_at) {
      form.innerHTML = "";
      displayMessage(
        "alert-success",
        `You have successfully updated product: ${json.title}`,
        ".message-container"
      );
      message.innerHTML += `<a href="/public/products.html">Edit more products</a>`;
    }
    if (json.error) {
      console.log(json.error);
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

//importing uploaded files

const token = getToken();
const headers = {
  Authorization: `Bearer ${token}`,
};

(async function getUploads() {
  try {
    const response = await fetch(mediaUrl, {
      headers,
    });
    const result = await response.json();
    renderFiles(result);
  } catch (error) {
    console.log(error);
  }
})();

const container = document.querySelector("#uploadList");

function renderFiles(imageFiles) {
  imageFiles.forEach(function (files) {
    container.innerHTML += `
            
      <div class="col">
        <div class="card h-100">
          <div class="card-header">
            <input class="form-check-input" name="image" type="radio" value="${files.id}" id="${files.id}"/>
          </div>
          <div class="card-body p-0">
            <div class="ratio ratio-4x5">
              <img src="${baseUrl}${files.url}" class="card-img-top" alt="..." >
            </div>
          </div>
        </div>
      </div>`;
  });
}
