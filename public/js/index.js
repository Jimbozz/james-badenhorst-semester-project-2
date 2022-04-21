import { featuredUrl } from "./settings/api.js";
import createMenu from "./components/createMenu.js";

createMenu();

(async function callApi() {
  try {
    const response = await fetch(featuredUrl);
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.log(error);
  }
})();
