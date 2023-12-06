async function getQuizzes() {
  try {
    const response = await fetch("..\\quiz-data\\meta-info.json");
    const data = await response.json();

    return data.quizzes;
  } catch (error) {
    console.error("Error loading files", error);
  }
}

async function goToQuiz(id) {
  try {
    const response = await fetch(`..\\quiz-data\\${id}.json`);
    const data = await response.json();

    localStorage.setItem("questions", JSON.stringify(data.questions));
    window.open(".\\quiz.html");
  } catch (error) {
    console.error("Error loading files", error);
  }
}

const mainSection = document.querySelector(".main-section");

getQuizzes()
  .then((data) => {
    data.forEach((element) => {
      const newQuizContainer = `<div id="${element.id}" class="quiz-container" style="background-color: ${element.color}">
        <img class="icon" src="./imgs/${element.icon}" alt="icon" />
        <p class="quiz-title">${element.title}</p>
        <p class="quiz-description">
        ${element.description}
        </p>
        <button class="start-quiz">START QUIZ</button>
        </div>`;
      mainSection.innerHTML += newQuizContainer;
    });
    const startButtons = document.querySelectorAll(".start-quiz");

    startButtons.forEach((element) => {
      element.addEventListener("click", () => {
        goToQuiz(element.parentElement.id);
      });
    });
  })
  .catch((err) => console.error("An error occurred: ", err));
