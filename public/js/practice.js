export const productCard = ({ id, image, price, title }) => /*html*/ `
    <div class="col">
      <div class="card h-100 border-0 shadow bg-body">
        <div class="ratio ratio-1x1">
          ${renderImage(image)}
        </div>
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          ${renderPrice(price)}
        </div>
        <a href="/public/product-specific.html?id=${id}" class="stretched-link"></a>
      </div>
  </div>
`;

const renderImage = (image) => {
  return /*html*/ `
            <img
                src="${image}"
                alt="${image.alternativeText}"
                class="card-img-top img-fluid"
            />
        `;
};

const renderPrice = (price) => {
  return `<p class="card-text">${price}</p>`;
};
