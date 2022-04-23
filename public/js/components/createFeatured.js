import { baseUrl } from "../settings/api.js";

export function createFeatured(renderFeatured) {
  const container = document.querySelector(".featured-products");

  renderFeatured.forEach(function (featured) {
    container.innerHTML += `
  <div class="col">
      <div class="card h-100 border-0 shadow bg-body ">
        <div class="ratio ratio-1x1">
          <img src="${baseUrl}${featured.image.url}" class="card-img-top img-fluid" alt="${featured.image.alternativeText}">
        </div>
        <div class="card-body">
          <h5 class="card-title">${featured.title}</h5>
          <p class="card-text">$ ${featured.price}</p>
        </div>
        <a href="#" class="stretched-link"></a>
      </div>
  </div>
`;
  });
}
