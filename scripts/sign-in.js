async function createUser(data) {
  try {
    const response = await fetch("http://127.0.0.1:5000/sign-in", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const responseData = await response.json();
      window.open(".\\login.html", "_self");
    } else {
      console.error(
        `Server responded with an error ${response.status}: ${response.statusText}`
      );
    }
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
