import { clearStorage } from "../utils/storage.js";

export default function logoutButton() {
  const button = document.querySelector("#logout");

  if (button) {
    button.onclick = function () {
      const activateLogout = confirm("Are you sure you want to logout?");

      if (activateLogout) {
        clearStorage();
        location.href = "/public/login.html";
      }
    };
  }
}
