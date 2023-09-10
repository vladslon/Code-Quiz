const startButton = document.getElementById("start");
const questionTitleElement = document.getElementById("question-title");
const choicesElement = document.getElementById("choices");
const feedbackElement = document.getElementById("feedback");
const endScreenElement = document.getElementById("end-screen");
const finalScoreElement = document.getElementById("final-score");
const initialsInput = document.getElementById("initials");
const submitButton = document.getElementById("submit");
const timeElement = document.getElementById("time")
const questionElement = document.getElementById("questions")

// Quiz Questions
// const questions = [

//   {
//     question: "What is 2 + 2?",
//     choices: ["3", "4", "5"],
//     answer: "4",
//   },
//   {
//     question: "What is the capital of France?",
//     choices: ["Berlin", "Madrid", "Paris"],
//     answer: "Paris",
//   },
//   {
//     question: "What's Andrew's favorite phrase for improving coding skills?",
//     choices: ["Practice makes perfect", "Keep coding", "Reps", "Code every day"],
//     answer: "Reps",
//   },
// ];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60; // Initial time in seconds
let timerInterval;

function startQuiz() {
  startButton.style.display = "none";
  endScreenElement.style.display = "none"; // Hide the end screen
  questionElement.classList.remove("hide")
  loadQuestion();
  startTimer();
}

function loadQuestion() {
  if (currentQuestionIndex < questions.length) {
    const currentQuestion = questions[currentQuestionIndex];
    questionTitleElement.textContent = currentQuestion.question;
    choicesElement.innerHTML = "";

    currentQuestion.choices.forEach((choice, index) => {
      const choiceButton = document.createElement("button");
      choiceButton.textContent = choice;
      choiceButton.addEventListener("click", () => checkAnswer(choice, currentQuestion.answer));
      choicesElement.appendChild(choiceButton);
    });
  } else {
    endQuiz();
  }
}

function checkAnswer(userChoice, correctAnswer) {
  if (userChoice === correctAnswer) {
    feedbackElement.textContent = "Correct!";
    score++;
  } else {
    feedbackElement.textContent = "Wrong! -10 seconds";
    timeLeft -= 10;
    if (timeLeft < 0) {
      timeLeft = 0;
    }
  }

  currentQuestionIndex++;
  loadQuestion();
}

function startTimer() {
  timerInterval = setInterval(function () {
    timeLeft--;
    if (timeLeft <= 0) {
      endQuiz();
    }
    timeElement.textContent = timeLeft;
  }, 1000);
}

function endQuiz() {
  clearInterval(timerInterval);
  endScreenElement.style.display = "block";
  finalScoreElement.textContent = `Your Score: ${score}`;
}

submitButton.addEventListener("click", function () {
  const initials = initialsInput.value.trim();
  const highscores = localStorage.getItem("highscores") ? JSON.parse(localStorage.getItem("highscores")) : []
  highscores.push({initials,timeLeft})
  localStorage.setItem("highscores", JSON.stringify(highscores))
  location.replace("highscores.html")
});

// Attach the startQuiz function to the start button's click event
startButton.addEventListener("click", startQuiz);
