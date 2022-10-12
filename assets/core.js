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
var submitBtn = document.getElementById("submitBtn");
var highScoresCard = document.getElementById("highScoresCard");
var highScoresList = document.getElementById("highScoresList");
var clearBtn = document.getElementById("clearBtn");
var goBackBtn = document.getElementById("gobackBtn");
var feedback = document.getElementById("right-wrong");

highScoresBtn.addEventListener("click", function () {
	welcomeCard.classList.add("d-none");
	highScoresCard.classList.remove("d-none");
});
startBtn.addEventListener("click", startQuiz);
goBackBtn.addEventListener("click", function () {
	window.location.reload();
	// highScoresCard.classList.add("d-none");
	// welcomeCard.classList.remove("d-none");
});

var scoreCounter = 0;
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

		feedback.textContent = "You suck!";
	} else {
		timeRemaining += 15;
		scoreCounter++;
		feedback.textContent = "You rule!";
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
	calcFinalScore.textContent = scoreCounter;
	console.log("endQuiz check");
}

displayHighScores();
submitBtn.addEventListener("click", saveScore);
clearBtn.addEventListener("click", clearHighScores);

function saveScore() {
	if (initials !== "") {
		var highscores =
			JSON.parse(window.localStorage.getItem("highscores")) || [];

		var newHighScore = {
			score: scoreCounter,
			initials: initials,
		};

		highscores.push(newHighScore);
		window.localStorage.setItem("highscores", JSON.stringify(highscores));

		wrapupCard.classList.add("d-none");
		highScoresCard.classList.remove("d-none");
	}
}

function displayHighScores() {
	var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

	highscores.sort(function (a, b) {
		return b.score - a.score;
	});

	highscores.forEach(function (score) {
		var scoreLi = document.createElement("li");
		scoreLi.textContent = score.initials + " - " + score.score;

		highScoresList.appendChild(scoreLi);
	});
}

function clearHighScores() {
	window.localStorage.removeItem("highscores");
	window.location.reload();
}
