import createMenu from "./components/createMenu.js";
import { productsUrl, baseUrl } from "./settings/api.js";
import displayMessage from "./components/displayMessage.js";
import { getToken } from "./utils/storage.js";
import deleteProduct from "./components/deleteProduct.js";
// import { getUploads } from "./uploads.js";
import { mediaUrl } from "./settings/api.js";

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
const imageRadio = document.querySelector("input.product-list");

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
    // image.style = `background: url('/public/${json.image.url}') center no-repeat; background-size: cover; width: 100%; height: 20rem;`;
    image.setAttribute("id", json.image.id);
    const imageId = json.image.id;

    console.log(imageId);
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
  // const imageValue = imageFile.files[0];
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
      idValue
    );
  }
}

async function updateProduct(title, price, description, featuredCheck, id) {
  const data = {
    title: title,
    price: price,
    description: description,
    featured: featuredCheck,
  };

  // const file = imageFile.files[0];
  const formData = new FormData();
  // formData.append(`files.image`, imageValue, imageValue.name);
  formData.append("data", JSON.stringify(data));

  const token = getToken();
  const options = {
    method: "PUT",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(itemUrl, options);
    const json = await response.json();
    console.log(data);
    console.log(json);

    if (json.updated_at) {
      displayMessage(
        "alert-success",
        `You have successfully updated product: ${json.title}`,
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

//importing upload files

const token = getToken();
const headers = {
  Authorization: `Bearer ${token}`,
};

(async function getUploads() {
  const image = document.querySelector(".img");
  console.log(image);

  try {
    const response = await fetch(mediaUrl, {
      headers,
    });
    const result = await response.json();

    for (let i = 0; i < result.length; i++) {
      console.log(result[i].id);

      // if (result[i].id) {
      //   console.log("this exists on the page");
      // }
    }

    console.log(result);
    /*trying to remove item from array if it exists on page*/
    const arr1 = result.filter((r) => r.id > 37);
    console.log("arr1", arr1);
    /*------------------*/
    renderFiles(result);
  } catch (error) {
    console.log(error);
    console.log("there was amn error");
  }
})();

const container = document.querySelector("#uploadList");

function renderFiles(imageFiles) {
  imageFiles.forEach(function (files) {
    container.innerHTML += `
   
                  
  <div class="col">
    <div class="card h-100">
      <div class="card-header">
        <input class="form-check-input product-list" name="image" type="radio" value="${files.id}" id="${files.id}"/>
      </div>
      <div class="card-body">
        <div class="ratio ratio-4x5">
          <img src="${baseUrl}${files.url}" class="card-img-top" alt="...">
        </div>
      </div>
    </div>
  </div>

    `;
  });
}
