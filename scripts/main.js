document.addEventListener("DOMContentLoaded", () => {
  function updateLocalStorageUser(updatedUser) {
    localStorage.setItem("user", JSON.stringify(updatedUser));
  }

  async function searchQuizzes(userQuizes) {
    const quote = document.querySelector(".search-input").value;

    data = {
      frase: quote,
    };
    try {
      const response = await fetch("http://127.0.0.1:5000/searchQuizzes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const responseData = await response.json();
        renderSearchHeaders(responseData.quizzes, userQuizes);
      }
    } catch (error) {
      console.error("An error occurred searching the quizzes", error);
    }
  }

  async function renderSearchHeaders(responseData, userQuizes) {
    const newQuizControls = document.querySelector(".add-quiz-container");
    newQuizControls.innerHTML = "";
    responseData.forEach((element) => {
      const newHeaderControls = `<input class="key-input" type="password" placeholder="enter key" />
      <button class="add-new-quiz">ADD</button>`;
      const addedHeaderControls = `<button class="delete-quiz">DELETE</button>`;
      let controlElements = ``;

      if (userQuizes.includes(element.id)) {
        controlElements = addedHeaderControls;
      } else {
        controlElements = newHeaderControls;
      }

      const newSearchHeader = `<div id=${element.id} class="new_quiz_container">
      <img
        class="search-quiz-icon"
        src="imgs/${element.icon}"
        alt="icon for new quiz"
      />
      <div class="quiz-info">
        <p class="quiz-title">${element.title}</p>
        <p class="quiz-description">
          ${element.description}
        </p>
      </div>
      <div class="new-quiz-controls">
        ${controlElements}
      </div>
    </div>`;

      newQuizControls.innerHTML += newSearchHeader;
    });
  }

  async function getQuizHeaders(idList) {
    const data = {
      quiz_ids: idList,
    };
    try {
      const response = await fetch("http://127.0.0.1:5000/loadQuizHeaders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const responseData = await response.json();
        renderQuizHeaders(responseData.quiz_headers);
      }
    } catch (error) {
      console.error("An error occurred downloading the quizzes", error);
    }
  }

  async function renderQuizHeaders(responseData) {
    const mainSection = document.querySelector(".main-section");
    mainSection.innerHTML = "";

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

  async function startQuiz(quizId) {
    data = {
      id: quizId,
    };
    try {
      const response = await fetch("http://127.0.0.1:5000/getQuestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const responseData = await response.json();
        localStorage.setItem(
          "questions",
          JSON.stringify(responseData.questions)
        );
        window.open(".\\quiz.html", "_self");
      }
    } catch (error) {}
  }

  async function addQuiz(user, quizId) {
    const data = {
      userId: user.id,
      quizId: quizId,
    };
    try {
      const response = await fetch("http://127.0.0.1:5000/addQuiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const responseData = await response.json();
        user.quiz_ids = responseData.new_quiz_list;
        updateLocalStorageUser(user);
        searchQuizzes(user.quiz_ids);
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  }

  async function deleteQuiz(user, quizId) {
    data = {
      userId: user.id,
      quizId: quizId,
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/deleteQuiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const responseData = await response.json();
        user.quiz_ids = responseData.new_quiz_list;
        updateLocalStorageUser(user);
        searchQuizzes(user.quiz_ids);
      }
    } catch (error) {}
  }

  const myQuizzesButton = document.querySelector(".my-quizzes-button");
  const searchQuizzesButton = document.querySelector(".add-quiz-button");
  const logOutButton = document.querySelector(".logout-button");
  const mainSection = document.querySelector(".main-section");

  let user = JSON.parse(localStorage.getItem("user"));
  getQuizHeaders(user.quiz_ids);

  mainSection.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("start-quiz")) {
      console.log(target.parentElement.id);
      startQuiz(target.parentElement.id);
    } else if (target.classList.contains("add-new-quiz")) {
      addQuiz(user, target.closest(".new_quiz_container").id);
    } else if (target.classList.contains("delete-quiz")) {
      deleteQuiz(user, target.closest(".new_quiz_container").id);
    }
  });

  searchQuizzesButton.addEventListener("click", () => {
    searchQuizzesButton.style.backgroundColor = "rgb(16, 194, 105)";
    searchQuizzesButton.style.color = "white";
    myQuizzesButton.style.backgroundColor = "white";
    myQuizzesButton.style.color = "rgb(16, 194, 105)";

    mainSection.innerHTML = "";

    const newSection = `<div class="search-container">
    <input class="search-input" type="text" placeholder="Search Quiz" />
    <button class="search-button">
      <img class="search-icon" src="imgs/search.svg" alt="search icon" />
    </button>
    </div>
    <div class="add-quiz-container">
    </div>`;
    mainSection.innerHTML += newSection;

    const searchButton = document.querySelector(".search-button");
    searchButton.addEventListener("click", () => {
      searchQuizzes(user.quiz_ids);
    });
  });

  myQuizzesButton.addEventListener("click", () => {
    searchQuizzesButton.style.backgroundColor = "white";
    searchQuizzesButton.style.color = "rgb(16, 194, 105)";
    myQuizzesButton.style.backgroundColor = "rgb(16, 194, 105)";
    myQuizzesButton.style.color = "white";
    getQuizHeaders(user.quiz_ids);
  });

  logOutButton.addEventListener("click", () => {
    localStorage.clear();
    window.open("./login.html", "_self");
  });
});
