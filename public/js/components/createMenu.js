export default function createMenu() {
  const container = document.querySelector(".nav-container");
  const { pathname } = document.location;

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
              <li class="nav-item">
                <a class="nav-link" href="/public/login.html">Sign in</a>
              </li>
            </ul>
            <form class="d-flex">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </form>
            <a href="/public/cart.html">
              <i class="bi bi-bag-fill" style="font-size: 2rem;"></i>
            </a>
          </div>
        </div>
      </nav>`;
}
