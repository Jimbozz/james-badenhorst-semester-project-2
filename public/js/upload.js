import createMenu from "./components/createMenu.js";
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
  console.log(form);
  const body = new FormData(form);
  const method = form.method;
  const enctype = form.enctype;

  const headers = {
    // "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  try {
    // const response = await fetch(url, options);
    const response = await fetch(url, { method, enctype, body, headers });
    console.log(response);
    console.log(headers);

    if (response.ok) {
      console.log("THis went well");
      window.location = "/public/index.html";
    }
  } catch (error) {
    console.log("something went wrong");
  }
}
