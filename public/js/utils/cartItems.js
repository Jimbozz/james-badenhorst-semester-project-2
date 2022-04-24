export function getProducts() {
  const cartItem = localStorage.getItem("products");

  if (cartItem === null) {
    return [];
  } else {
    return JSON.parse(cartItem);
  }
}
