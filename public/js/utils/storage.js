const tokenKey = "token";
const userKey = "user";
const productKey = "products";

export function saveToken(token) {
  saveToStorage(tokenKey, token);
}

export function getToken() {
  return getFromStorage(tokenKey);
}

export function saveUser(user) {
  saveToStorage(userKey, user);
}

export function getUserName() {
  const user = getFromStorage(userKey);

  if (user) {
    return user.username;
  }
  return null;
}

export function saveCart(products) {
  saveToStorage(productKey, products);
}

export function clearStorage() {
  // localStorage.clear();
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getFromStorage(key) {
  const value = localStorage.getItem(key);

  if (!value) {
    return null;
  }

  return JSON.parse(value);
}

export function getProducts() {
  const cartItem = getFromStorage(productKey);

  if (cartItem === null) {
    return [];
  } else {
    return cartItem;
  }
}
