export function getProducts() {
  const cartItem = localStorage.getItem("products");

  if (cartItem === null) {
    return [];
  } else {
    return JSON.parse(cartItem);
  }
}

// export const alreadyInCart = (id) => {
//   const cart = getProducts();
//   console.log(cart);
//   return cart.includes(id.toString());
// };

// const total = getProducts(price);

// export function cartTotal(price) {
//   console.log(getProducts(price));
// }
