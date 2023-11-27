const mainSection = document.querySelector(".main-section");

fetch("..\\quiz-data\\meta-info.json")
  .then((response) => response.json())
  .then((data) => {
    data.quizes.forEach((element) => {
      {
        const newQuizContainer = `<div class="quiz-container" style="background-color: ${element.color}">
            <img class="icon" src="./imgs/${element.icon}" alt="icon" />
            <p class="quiz-title">${element.title}</p>
            <p class="quiz-description">
            ${element.description}
            </p>
        <button class="start-quiz">START QUIZ</button>
      </div>`;
        mainSection.innerHTML += newQuizContainer;
      }
    });
  })
  .catch((error) => console.error("A error occured", error));
