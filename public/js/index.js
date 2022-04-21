import { featuredUrl } from "./settings/api.js";
import createMenu from "./components/createMenu.js";
import { createFeatured } from "./components/createFeatured.js";

createMenu();

(async function callApi() {
  try {
    const response = await fetch(featuredUrl);
    const json = await response.json();
    console.log(json);

    createFeatured(json);
  } catch (error) {
    console.log(error);
  }
})();
