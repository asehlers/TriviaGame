
var questions = [
	["What are \"Durin's folk\" more commonly known as?", "Dwarves", "Hobbits from outside The Shire", "Forrest Elves", "Great Eagles"],
	["What was the Bridge of Khazad-Dum?", "The bridge inside the Great Gates of Moria where Gandalf faced the Balrog.", "The bridge over the Brandywine river, marking the end of The Shire.", "The mythical gateway between Middle-Earth and Valinor, the land of the gods.", "The name of the broken sword before it was reforged as the legendary Andúril."],
	["What kind of creatures are the spawn of Ungoliant", "Giant Spiders", "Hill Giants", "Uruk-hai", "Flying fell beasts"],
];

var questionImages = ["assets/images/image1.gif", "assets/images/image2.gif", "assets/images/image3.gif"];

var questionNumbers = [];

var correct = 0;
var timerValue = 30;
var timerRunning = false;
var intervalId;
var questionIndex;
// console.log(questions);
// console.log(questionImages);
// console.log(questionNumbers);


function initializeNumbers(){
	for(var i = 0; i < questions.length; i++){
		questionNumbers.push(i);
	}
}

function nextQuestion(){
	$("#currentQuestion").empty();
	$(".imageContainer").empty();
	$("#currentAnswers").empty();
	questionIndex = questionNumbers[Math.floor(Math.random() * questionNumbers.length)];
	$("#currentQuestion").text(questions[questionIndex][0]);
	$("#timer").html(timerValue);
	for(var j = 1; j < 5; j++){
		$("#currentAnswers").append("<section class=\"answer\" id=\""+j+"\" >" + questions[questionIndex][j] + "</section>");
	}
	questionNumbers.splice(questionNumbers.indexOf(questionIndex), 1);
	resetTimer();
}

function resetTimer(){
	console.log("reset timer");
	timerValue = 30;
	if(!timerRunning){
		timerRunning=true;
		clearInterval(intervalId);
		intervalId = setInterval(decrement, 1000);
	}
	else{
		console.log("timer already running");
	}
}

function checkAnswer(){
	console.log("answer clicked");

	if(!timerRunning){
		console.log("ran out of time");
		$("#currentQuestion").html("Ran out of time!");
	}
	else{
		if($(this).attr("id") == 1){

			console.log("answer correct");
			correct++;
			$("#currentQuestion").html("Correct Answer!");

		}
		else{
			console.log("answer incorrect");
			$("#currentQuestion").html("Wrong Answer!");
		}
		timerRunning=false;
		clearInterval(intervalId);
		number = 30;
	}

	$("#currentAnswers").html("The answer is: " + questions[questionIndex][1]);
	$(".imageContainer").append("<img src=\"" + questionImages[questionIndex] +"\" >");

	if(questionNumbers.length > 0){
		setTimeout(nextQuestion, 5000);
	}
	else{
		setTimeout(gameOver, 5000);
	}
}

function decrement() {

	timerValue--;
	$("#timer").html(timerValue);

	if (timerValue === 0) {

		timerRunning=false;
		clearInterval(intervalId);
  	number = 30;
  	checkAnswer();
  }
}

function gameOver() {
	console.log("game over");
	$("#timingSection").empty();
	$("#currentQuestion").empty();
	$(".imageContainer").empty();
	$("#currentQuestion").html("Game Over! You answered " + correct + " questions correctly!");
	$("#currentAnswers").html("<button id=\"gameStart\">Start Over!</button>");
	initializeNumbers();
	correct = 0;
}

$(document).on("click", "#gameStart", function(){
	console.log("game start");
	$("#timingSection").empty();
	$("#timingSection").append("<section>Time Remaining: <span id=\"timer\"></span> Seconds</section>");
	$("#currentAnswers").empty();

	nextQuestion();
	// resetTimer();
});


initializeNumbers();
$(document).on("click", ".answer", checkAnswer);
