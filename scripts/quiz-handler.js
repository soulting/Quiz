document.addEventListener("DOMContentLoaded", () => {
  function loadQuestion(question, answers, answerExplanation, newQuestion) {
    question.textContent = newQuestion.question;
    answers[0].textContent = newQuestion.A;
    answers[1].textContent = newQuestion.B;
    answers[2].textContent = newQuestion.C;
    answers[3].textContent = newQuestion.D;
    answerExplanation.textContent = newQuestion.explanation;
  }

  const questions = JSON.parse(localStorage.getItem("questions"));

  const questionElement = document.querySelector(".question");
  const answerButtons = document.querySelectorAll(".answer");
  const controlButton = document.querySelector(".next");
  const pointsElements = document.querySelectorAll(".point");
  const overlayButton = document.querySelector(".overlay-button");
  const overlay = document.querySelector(".overlay");
  const overlayAnswer = document.querySelector(".right-answer");

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

  overlayButton.addEventListener("click", () => {
    overlay.style.display = "none";

    if (questionNumber === 10) {
      alert("You have answered all the questions. Choose another quiz.");
      window.open(".\\index.html");
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
