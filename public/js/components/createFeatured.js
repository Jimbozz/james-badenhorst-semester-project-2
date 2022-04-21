export function createFeatured(renderFeatured) {
  const container = document.querySelector(".featured-products");

  renderFeatured.forEach(function (featured) {
    container.innerHTML += `<div class="row row-cols-1 row-cols-md-2 g-4">
  <div class="col">
    <div class="card">
      <img src="${featured.image.url}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Card title ${featured.title}</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
    </div>
  </div>
</div>`;
  });
}
