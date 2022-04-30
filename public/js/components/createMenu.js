import { getUserName } from "../utils/storage.js";
import logoutButton from "./logoutButton.js";

export default function createMenu() {
  const container = document.querySelector(".nav-container");
  const { pathname } = document.location;
  const username = getUserName();

  let authlink = `
              <li class="nav-item">
                <a class="nav-link ${
                  pathname === "/public/login.html" ? "active" : ""
                }" href="/public/login.html">Sign in</a>
              </li>
              `;
  if (username) {
    authlink = `
              <li class="nav-item">
                <a class="nav-link ${
                  pathname === "/public/add.html" ? "active" : ""
                }" href="/public/add.html">Add product</a>
              </li>
              <li class="nav-item">
                <a class="nav-link ${
                  pathname === "/public/edit.html" ? "active" : ""
                }" href="/public/edit.html">Edit products</a>
              </li>
              <button type="button" class="btn btn-sm btn-outline-secondary px-4 gap-3" id="logout">
                Logout: ${username}
              </button>
              `;
  }

  container.innerHTML = `<nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Logo</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link ${
                  pathname === "/public/index.html" ? "active" : ""
                }" aria-current="page" href="/public/index.html">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link ${
                  pathname === "/public/products.html" ? "active" : ""
                }" href="/public/products.html">Products</a>
              </li>
              ${authlink}
              <li>
                <a href="/public/cart.html">
                  <i class="bi bi-bag-fill" style="font-size: 2rem;"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>`;

  logoutButton();
}