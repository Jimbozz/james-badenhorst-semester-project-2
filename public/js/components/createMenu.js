import { getUserName } from "../utils/storage.js";
import logoutButton from "./logoutButton.js";

// export default function createMenu() {
//   const container = document.querySelector(".nav-container");
//   const { pathname } = document.location;
//   const username = getUserName();

//   let authlink = `

//         <a class="btn btn-primary btn-sm" id="login" href="/public/login.html" role="button">Login</a>
//               `;
//   if (username) {
//     authlink = `
//         <li class="nav-item dropdown">
//           <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
//             Admin
//           </a>
//           <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
//             <li><a class="dropdown-item ${
//               pathname === "/public/add.html" ? "active" : ""
//             }" href="/public/add.html">Add product</a></li>
//             <li><a class="dropdown-item ${
//               pathname === "/public/upload.html" ? "active" : ""
//             }" href="/public/upload.html">Upload media</a></li>
//             <li><a class="dropdown-item ${
//               pathname === "/public/edit.html" ? "active" : ""
//             }" href="/public/edit.html">Edit products</a></li>
//           </ul>
//         </li>
//         <button type="button" class="btn btn-sm btn-outline-secondary px-4 gap-3" id="logout">
//           Logout: ${username}
//         </button>
// `;
//   }

//   container.innerHTML = `
//       <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
//         <div class="container-fluid">
//           <a class="navbar-brand" href="/public/index.html"><img src="/public/assets/soles-3-01.svg" alt="" style="width: 5rem;"></a>
//           <button
//             class="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarSupportedContent"
//             aria-controls="navbarSupportedContent"
//             aria-expanded="false"
//             aria-label="Toggle navigation">
//             <span class="navbar-toggler-icon"></span>
//           </button>
//           <div class="collapse navbar-collapse" id="navbarSupportedContent">
//             <ul class="navbar-nav me-auto mb-2 mb-lg-0">
//               <li class="nav-item">
//                 <a class="nav-link ${
//                   pathname === "/public/index.html" ? "active" : ""
//                 }" aria-current="page" href="/public/index.html">Home</a>
//               </li>
//               <li class="nav-item">
//                 <a class="nav-link ${
//                   pathname === "/public/products.html" ? "active" : ""
//                 }" href="/public/products.html">Products</a>
//               </li>
//               ${authlink}
//             </ul>
//             <a href="/public/cart.html">
//               <i class="bi bi-bag-fill" style="font-size: 2rem;"></i>
//             </a>
//           </div>
//         </div>
//       </nav>`;

//   logoutButton();
// }

export default function createMenu() {
  const container = document.querySelector(".nav-container");
  const { pathname } = document.location;
  const username = getUserName();

  if (username) {
    container.innerHTML = `
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="/public/index.html"><img src="/public/assets/soles-3-01.svg" alt="Soles logo" style="width: 5rem;"></a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
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
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Admin
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li><a class="dropdown-item ${
                    pathname === "/public/add.html" ? "active" : ""
                  }" href="/public/add.html">Add product</a></li>
                  <li><a class="dropdown-item ${
                    pathname === "/public/upload.html" ? "active" : ""
                  }" href="/public/upload.html">Upload media</a></li>
                  <li><a class="dropdown-item ${
                    pathname === "/public/edit.html" ? "active" : ""
                  }" href="/public/edit.html">Edit products</a></li>
                </ul>
              </li>
            </ul>
            <div class="d-flex gap-2 flex-column flex-lg-row">
              <ul class="navbar-nav align-items-lg-center">
                <li class="nav-item">
                  <a class="nav-link" href="/public/login.html" id="logout" href="/public/login.html" role="button">Logout: ${username}</a>
                </li>
                <li class="nav-item">
                  <a href="/public/cart.html" aria-label="cart icon">
                    <i class="bi bi-bag-fill" style="font-size: 2rem;"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>`;
  }

  if (!username) {
    container.innerHTML = `
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="/public/index.html"><img src="/public/assets/soles-3-01.svg" alt="" style="width: 5rem;"></a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
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
            </ul>
            <ul class="navbar-nav align-items-lg-center">
              <li class="nav-item">
                <a class="nav-link ${
                  pathname === "/public/login.html" ? "active" : ""
                }" href="/public/login.html" id="login" href="/public/login.html" role="button">Login</a>
              </li>
              <li class="nav-item">
                <a href="/public/cart.html" aria-label="cart icon">
                  <i class="bi bi-bag-fill" style="font-size: 2rem;"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>`;
  }
  logoutButton();
}
