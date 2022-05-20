import { createProducts } from "../products.js";

export function searchProducts(products) {
  const search = document.querySelector(".search");

  search.onkeyup = function (event) {
    const searchValue = event.target.value;
    const safeSearchValue = searchValue.trim().toLowerCase();

    const filteredProducts = products.filter(function (product) {
      const productTitle = product.title.trim().toLowerCase();
      const productDes = product.description.trim().toLowerCase();

      if (productTitle === safeSearchValue || productDes === safeSearchValue) {
        return true;
      }
      if (safeSearchValue === "") {
        return true;
      } else {
        return false;
      }
    });
    createProducts(filteredProducts);
  };
}
