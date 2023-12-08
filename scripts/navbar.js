document.addEventListener("DOMContentLoaded", () => {
  async function getQuizzHeaders(idList) {
    const data = {
      quiz_ids: idList,
    };
    try {
      const response = await fetch("http://127.0.0.1:5000/loadQuizzHeaders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const responseData = await response.json();
        responseHandler(responseData.quiz_headers);
      }
    } catch (error) {
      console.error("An error occurred downloading the quizzes", error);
    }
  }

  async function responseHandler(responseData) {
    const mainSection = document.querySelector(".main-section");
    mainSection.innerHTML = "";
    console.log(responseData);
    responseData.forEach((element) => {
      const newQuizContainer = `<div id="${element.id}" class="quiz-container" style="background-color: ${element.color}">
                <img class="icon" src="./imgs/${element.icon}" alt="icon" />
                <p class="quiz-title">${element.title}</p>
                <p class="quiz-description">${element.description}</p>
                <button class="start-quiz">START QUIZ</button>
                 </div>`;
      mainSection.innerHTML += newQuizContainer;
    });
  }

  const myQuizzesButton = document.querySelector(".my-quizzes-button");
  const searchQuizzesButton = document.querySelector(".add-quiz-button");
  const logOutButton = document.querySelector(".logout-button");

  let user = JSON.parse(localStorage.getItem("user"));
  getQuizzHeaders(user.quiz_ids);

  searchQuizzesButton.addEventListener("click", () => {
    searchQuizzesButton.style.backgroundColor = "rgb(16, 194, 105)";
    searchQuizzesButton.style.color = "white";
    myQuizzesButton.style.backgroundColor = "white";
    myQuizzesButton.style.color = "rgb(16, 194, 105)";
  });

  myQuizzesButton.addEventListener("click", () => {
    searchQuizzesButton.style.backgroundColor = "white";
    searchQuizzesButton.style.color = "rgb(16, 194, 105)";
    myQuizzesButton.style.backgroundColor = "rgb(16, 194, 105)";
    myQuizzesButton.style.color = "white";
    getQuizzHeaders(user.quiz_ids);
  });

  logOutButton.addEventListener("click", () => {
    localStorage.clear();
    window.open("./login.html", "_self");
  });
});
