import { baseUrl, heroUrl, featuredUrl } from "./settings/api.js";
import createMenu from "./components/createMenu.js";
import { createFeatured } from "./components/createFeatured.js";

const container = document.querySelector(".bg-image");

createMenu();

(async function callApi() {
  try {
    const response = await fetch(featuredUrl);
    const jsonFeat = await response.json();
    const responseHero = await fetch(heroUrl);
    const jsonHero = await responseHero.json();

    const heroImg = baseUrl + jsonHero.hero_banner.url;
    container.style.backgroundImage = `url(${heroImg})`;
    container.title = jsonHero.hero_banner_alt_text;

    createFeatured(jsonFeat);
  } catch (error) {
    console.log(error);
  }
})();
