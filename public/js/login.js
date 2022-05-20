import { saveToken, saveUser } from "./utils/storage.js";
import displayMessage from "./components/displayMessage.js";
import { baseUrl } from "./settings/api.js";
import createMenu from "./components/createMenu.js";

const message = document.querySelector(".message-container");
const form = document.querySelector("form");
const username = document.querySelector("#username");
const password = document.querySelector("#password");

createMenu();

form.addEventListener("submit", formSubmit);

function formSubmit(event) {
  event.preventDefault();

  message.innerHTML = "";

  const usernameValue = username.value.trim();
  const passwordValue = password.value.trim();

  if (usernameValue.length === 0 || passwordValue.length === 0) {
    return displayMessage(
      "alert-warning",
      "Invalid value. There must be at least one character in each input.",
      ".message-container"
    );
  }

  executeLogin(usernameValue, passwordValue);
}

async function executeLogin(username, password) {
  const url = baseUrl + "/auth/local";
  const data = JSON.stringify({ identifier: username, password: password });

  const options = {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (json.user) {
      saveToken(json.jwt);
      saveUser(json.user);
      location.href = "/public/products.html";
    }

    if (json.error) {
      console.log(json.error);
      displayMessage(
        "alert-danger",
        "Invalid login details",
        ".message-container"
      );
    }
  } catch (error) {
    console.log(error);
  }
}
