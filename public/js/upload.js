import createMenu from "./components/createMenu.js";
import displayMessage from "./components/displayMessage.js";
import { uploadUrl } from "./settings/api.js";
import { getToken } from "./utils/storage.js";

createMenu();

const formElement = document.querySelector("form");
const token = getToken();
const url = uploadUrl;

formElement.addEventListener("submit", onUpload);

async function onUpload(event) {
  event.preventDefault();
  const form = event.target;
  const body = new FormData(form);
  const method = form.method;
  const enctype = form.enctype;

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await fetch(url, { method, enctype, body, headers });

    if (response.ok) {
      displayMessage(
        "alert-success",
        `Successfully uploaded media.`,
        ".message-container"
      );
      // window.location = "/public/index.html";
    }
  } catch (error) {
    displayMessage(
      "alert-danger",
      `An error ocurred, please reload the page and try again.`,
      ".message-container"
    );
    console.log(error);
  }
}
