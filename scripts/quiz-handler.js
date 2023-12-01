document.addEventListener("DOMContentLoaded", () => {
  function loadQuestion(question, anwsers, anwserExplenation, newQuestion) {
    question.textContent = newQuestion.question;
    anwsers[0].textContent = newQuestion.A;
    anwsers[1].textContent = newQuestion.B;
    anwsers[2].textContent = newQuestion.C;
    anwsers[3].textContent = newQuestion.D;
    anwserExplenation.textContent = newQuestion.explanation;
  }

  const questions = JSON.parse(localStorage.getItem("questions"));

  const questionElement = document.querySelector(".question");
  const answerButtons = document.querySelectorAll(".anwser");
  const controlButton = document.querySelector(".next");
  const pointsElemments = document.querySelectorAll(".point");
  const overlayButton = document.querySelector(".overlay-button");
  const overlay = document.querySelector(".overlay");
  const overlayAnwser = document.querySelector(".right-anwser");

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
      alert("odpowiedziałeś na wszystkie pytania, wybierz kolejny quiz");
      window.open(".\\index.html");
    }

    loadQuestion(
      questionElement,
      answerButtons,
      overlayAnwser,
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
      const anwser = document.querySelector(`[data-picked="true"]`);
      if (anwser.id === tenQuestions[questionNumber].answer) {
        console.log("dobra odpowiedź");
        pointsElemments[questionNumber].style.backgroundColor =
          "rgb(48,180,118)";
      } else {
        console.log("zła odpowiedź");
        pointsElemments[questionNumber].style.backgroundColor =
          "rgb(255,21,18)";
      }
      answerButtons.forEach((element) => (element.dataset.picked = "false"));
      questionNumber++;
      overlay.style.display = "block";
    } catch (error) {
      console.error(error);
      alert("musisz wybrać jakąś odpowiedź", error);
    }
  });

  loadQuestion(
    questionElement,
    answerButtons,
    overlayAnwser,
    tenQuestions[questionNumber]
  );
});
