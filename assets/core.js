//TO DO make variables to target elements
var highScoresBtn = document.querySelector("#highScoresButton input");
var timeCounter = document.getElementById("timeCounter");
var welcomeCard = document.getElementById("welcomeCard");
var startBtn = document.querySelector("#startBtn");
var quizCard = document.getElementById("quizCard");
var questionTitle = document.getElementById("questionTitle");
var choice1 = document.getElementById("choice1");
var choice2 = document.getElementById("choice2");
var choice3 = document.getElementById("choice3");
var choice4 = document.getElementById("choice4");
var wrapupCard = document.getElementById("wrapupCard");
var calcFinalScore = document.getElementById("calcFinalScore");
var initials = document.getElementById("initials");
var btnSubmit = document.getElementById("btnSubmit");
var highScoresCard = document.getElementById("highScoresCard");
var highScoresList = document.getElementById("highScoresList");
var clearBtn = document.getElementById("clearBtn");

startBtn.addEventListener("click", startQuiz);

var scoreCounter;
var countdownIntervalId;
var timeRemaining = 30;

function secondCountdown() {
	if (timeRemaining > 0) {
		timeRemaining--;
	} else {
		clearInterval(countdownIntervalId);
		endQuiz();
	}
	timeCounter.textContent = timeRemaining;
}

function startQuiz() {
	welcomeCard.classList.add("d-none");
	quizCard.classList.remove("d-none");
	countdownIntervalId = setInterval(secondCountdown, 1000);
	questions.forEach(getQuestion);

	questions.forEach(injectResponses);
	console.log(timeRemaining);
}

var selectedQuestion;
var questionsIndex = 0;
var responsesIndex;
var buttonsArray = document.querySelectorAll("#quizCard button");

function getQuestion() {
	// for (var i = 0; i < questions.length; i++) {
	// 	questionsIndex = i;
	selectedQuestion = questions[questionsIndex];
	questionTitle.textContent = selectedQuestion.title;
	console.log("fired getQuestion");
}

function injectResponses() {
	for (var i = 0; i < selectedQuestion.responses.length; i++) {
		buttonsArray[i].textContent = selectedQuestion.responses[i].title;
		buttonsArray[i].dataset.iscorrect = selectedQuestion.responses[i].iscorrect;
		console.log("fired injectResponses");
	}
}

$(buttonsArray).on("click", function (e) {
	if ($(this).attr("data-iscorrect") !== "true") {
		timeRemaining -= 10;
		console.log("false");
		if (timeRemaining < 0) {
			timeRemaining = 0;
		}
	} else {
		timeRemaining += 15;
		console.log("true");
	}

	questionsIndex++;

	if (questionsIndex === questions.length) {
		endQuiz();
	} else {
		getQuestion();
		questionTitle.textContent = selectedQuestion.title;
		injectResponses();
	}
});

function endQuiz() {
	clearInterval(countdownIntervalId);
	quizCard.classList.add("d-none");
	wrapupCard.classList.remove("d-none");
	console.log("endQuiz check");
}
