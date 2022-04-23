import { featuredUrl } from "./settings/api.js";
import { heroUrl } from "./settings/api.js";
import { productsUrl } from "./settings/api.js";
import createMenu from "./components/createMenu.js";
import { createProducts } from "./products.js";
import { createFeatured } from "./index.js";

import { baseUrl } from "./settings/api.js";

(async function callApi() {
  try {
    const response = await fetch(productsUrl);
    const json = await response.json();
    console.log(json);

    // createProducts(json);
    createFeatured(json);
  } catch (error) {
    console.log(error);
  }
})();
