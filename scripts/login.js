import { fetchData } from "./api.js";

async function createUser(data) {
  try {
    const responseData = await fetchData("login", "POST", data);
    localStorage.setItem("user", JSON.stringify(responseData));
    window.open(".\\main.html", "_self");
  } catch (error) {
    console.error("An error occurred: ", error);
  }
}

const username = document.querySelector("#username");
const password = document.querySelector("#password");
const loginButton = document.querySelector(".login-button");
const signInButton = document.querySelector(".sign-in-button");
username.focus();

loginButton.addEventListener("click", (event) => {
  event.preventDefault();
  const data = {
    username: username.value,
    password: password.value,
  };

  createUser(data);
});

signInButton.addEventListener("click", () => {
  window.open(".\\sign-in.html", "_self");
});

username.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    if (username.value === "") {
      alert("wprowadź nazwę użytkownika");
    } else {
      password.focus();
    }
  }
});

password.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    if (password.value === "") {
      alert("wprowadź hasło");
    } else {
      loginButton.click();
    }
  }
});
