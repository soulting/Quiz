import { fetchData } from "./api.js";

async function createUser(data) {
  try {
    await fetchData("sign-in", "POST", data);
    window.open(".\\login.html", "_self");
  } catch (error) {
    console.error("An error occurred: ", error);
  }
}

const signInButton = document.querySelector(".sign-in-button");

signInButton.addEventListener("click", (event) => {
  const username = document.querySelector("#username");
  const password = document.querySelector("#password");
  const confirmPassword = document.querySelector("#confirm-password");

  if (password.value !== confirmPassword.value) {
    alert("Hasła nie są identyczne");
  }

  event.preventDefault();
  const data = {
    username: username.value,
    password: password.value,
  };

  createUser(data);
});
