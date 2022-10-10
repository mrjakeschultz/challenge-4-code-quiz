//TO DO make variables to target elements
var highScoresBtn = document.querySelector("#highScoresButton input");
var timeCounter = document.getElementById("timeCounter");
var welcomeCard = document.getElementById("welcomeCard");
var startBtn = document.getElementById("startBtn");
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

//******TO DO make a function to start the quiz
//----should show a quizCard
//----should expose the div that will hold/display the question..quizCard
//----should start the clock/timer...interval/clock function
//----should show the counter on the clock/timer
// should pull question from the bank...subfunction...getQuestion function

startBtn.addEventListener("click", startQuiz);

var countdownInterval;
var timeRemaining = 30;

function secondCountdown() {
	if (timeRemaining > 0) {
		timeRemaining--;
	} else {
		clearInterval(countdownInterval);
	}
	timeCounter.textContent = timeRemaining;
	console.log(timeRemaining);
}

function startQuiz() {
	welcomeCard.classList.add("d-none");
	quizCard.classList.remove("d-none");
	countdownInterval = setInterval(secondCountdown, 1000);
	getQuestion();
	questionTitle.textContent = selectedQuestion.title;
	injectResponses();

	console.log(timeRemaining);
}

//****TO DO make a function to retrieve a question from a bank of questions...getQuestion
//---define variable that looks to an array of questions 'var questions'
// for loop to go through the array and pick a question object
// once item in questions array is select then put the title value in questionTitle
// go through response array within the question object and insert their values into Choice1-4

var selectedQuestion;
var buttonsArray = document.querySelectorAll("#quizCard button");

function getQuestion() {
	for (var i = 0; i < questions.length; i++) {
		selectedQuestion = questions[i];
	}
}

function injectResponses() {
	for (var i = 0; i < selectedQuestion.responses.length; i++) {
		buttonsArray[i].textContent = selectedQuestion.responses[i].title;
	}
}

//TO DO event listener for starting quiz

//TO DO event listener for clicking answer buttons
//statement to check if correct answer for given question
//if false then subtract time from counter
//if true then add time to counter
//need condition if timer !== 0 then...
//...then call function to pull question from bank
////need for loop somewhere to go through array to make sure don't pull same question twice during quiz, and to go through array
//if for loop hits 0 then end quiz...call function
//if timer == 0 then end quiz...call function

//TO DO make function to end the quiz
//stops the clock/timer
//displays element with text saying game over.
//displays element with score
//...make variable to figure score
//hide the elements with the question text and answers
//exposes input to enter initials for high scores
//expose button to submit initials for saving high scores
//expose button to clear high scores

//TO DO make a function to record the high scores...event listener
//injects text into element showing high scores
//displays that element

//TO DO button for upper left of page...high scores button
//takes user to high scores page
//needs event listener and calls function to end the quiz...
