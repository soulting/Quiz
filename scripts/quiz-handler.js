document.addEventListener("DOMContentLoaded", () => {
  function loadQuestion(question, answers, answerExplanation, newQuestion) {
    question.textContent = newQuestion.question;
    answers[0].textContent = newQuestion.option_A;
    answers[1].textContent = newQuestion.option_B;
    answers[2].textContent = newQuestion.option_C;
    answers[3].textContent = newQuestion.option_D;
    answerExplanation.textContent = newQuestion.explanation;
  }

  const questions = JSON.parse(localStorage.getItem("questions"));

  const questionElement = document.querySelector(".question");
  const answerButtons = document.querySelectorAll(".anwser");
  const controlButton = document.querySelector(".next");
  const pointsElements = document.querySelectorAll(".point");
  const overlayButton = document.querySelector(".overlay-button");
  const overlay = document.querySelector(".overlay");
  const overlayAnswer = document.querySelector(".right-anwser");
  overlay.style.display = "none";

  let tenQuestions = [];
  let indexArr = [];
  let questionNumber = 0;

  while (indexArr.length < 10) {
    let newIndex = Math.floor(Math.random() * questions.length);
    if (!indexArr.includes(newIndex)) {
      indexArr.push(newIndex);
      tenQuestions.push(questions[newIndex]);
    }
  }

  addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      if (overlay.style.display !== "none") {
        overlayButton.click();
      } else {
        controlButton.click();
      }
      answerButtons.forEach((element) => {
        element.blur();
      });
    }
  });

  overlayButton.addEventListener("click", () => {
    overlay.style.display = "none";

    if (questionNumber === 10) {
      alert("You have answered all the questions. Choose another quiz.");
      window.open(".\\main.html", "_self");
    }

    loadQuestion(
      questionElement,
      answerButtons,
      overlayAnswer,
      tenQuestions[questionNumber]
    );
  });

  answerButtons.forEach((element) => {
    element.addEventListener("click", () => {
      element.dataset.picked = "true";

      answerButtons.forEach((otherElement) => {
        if (otherElement !== element) {
          otherElement.dataset.picked = "false";
        }
      });
    });
  });

  controlButton.addEventListener("click", () => {
    try {
      const answer = document.querySelector(`[data-picked="true"]`);
      if (answer.id === tenQuestions[questionNumber].answer) {
        console.log("Correct answer");
        pointsElements[questionNumber].style.backgroundColor =
          "rgb(48,180,118)";
      } else {
        console.log("Wrong answer");
        pointsElements[questionNumber].style.backgroundColor = "rgb(255,21,18)";
      }
      answerButtons.forEach((element) => (element.dataset.picked = "false"));
      questionNumber++;
      overlay.style.display = "block";
    } catch (error) {
      console.error(error);
      alert("You must choose an answer.");
    }
  });

  loadQuestion(
    questionElement,
    answerButtons,
    overlayAnswer,
    tenQuestions[questionNumber]
  );
});
