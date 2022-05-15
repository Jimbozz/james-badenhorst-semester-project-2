import { baseUrl } from "../settings/api.js";
import { productsUrl } from "../settings/api.js";

export function createFeatured(renderFeatured) {
  const container = document.querySelector(".featured-products");

  renderFeatured.forEach(function (featured) {
    container.innerHTML += `
  <div class="col">
      <div class="card h-100 border-0 bg-body">
        <div class="ratio ratio-4x5">
          <img src="${baseUrl}${featured.image.url}" class="card-img-top img-fluid rounded-0" alt="${featured.image.alternativeText}">
        </div>
        <div class="card-body p-0 mt-3">
          <h5 class="card-title">${featured.title}</h5>
          <p class="card-text">$ ${featured.price}</p>
        </div>
        <a href="/public/product-specific.html?id=${featured.id}" class="stretched-link"></a>
      </div>
  </div>
`;
  });
}
