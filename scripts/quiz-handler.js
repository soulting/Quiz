document.addEventListener("DOMContentLoaded", () => {
  const questions = JSON.parse(localStorage.getItem("questions"));
  console.log(questions);
});
