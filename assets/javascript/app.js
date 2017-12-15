
var questions = [
	["What are \"Durin's folk\" more commonly known as?", "Dwarves", "Hobbits from outside The Shire", "Forrest Elves", "Great Eagles"],
	["What was the Bridge of Khazad-Dum?", "The bridge inside the Great Gates of Moria where Gandalf faced the Balrog.", "The bridge over the Brandywine river, marking the end of The Shire.", "The mythical gateway between Middle-Earth and Valinor, the land of the gods.", "The name of the broken sword before it was reforged as the legendary Andúril."],
	["What kind of creatures are the spawn of Ungoliant?", "Giant Spiders", "Hill Giants", "Uruk-hai", "Flying fell beasts"],
	["Which of these is not a public inn in Middle-Earth?", "The Southern Star", "The Old Guesthouse", "The Green Dragon", "The Prancing Pony"],
	["Who participated in the battle of Isengard?", "Saurumon's forces versus the Ents", "Saurumon's forces versus King Theoden's Rohirrim", "Orcs of Dol Guldur versus the Galadhrim of Lothlorien", "The forces of the Dark Lord Sauron versus the forces of Gondor"],
	["Which of these weapons was not found in the Troll's cave?", "Angrist", "Orcrist the Goblin-cleaver", "Glamdring the Foe-hammer", "Sting"],
	["Who was Elanor Gardner (also known as Elanor the Fair)?", "The duaghter of Samwise Gamgee and Rosie Cotton", "The Queen of Mirkwood and mother of Legolas", "One of the nine humans who was given a Ring of Power", "Wife of Bard the Bowman of Lake-town"],
	["What did Aragorn, Imrahil, Gandalf, Eomer, Elladan, and Elrohir decide during the last debate?", "The number of soldiers to send to fight Sauron in the Battle of the Morannon", "Who to send to destroy the Ring of Power", "Who would lead the White Council. Gandalf was elected but declined, so Saruman took over", "How to punish the newly risen Uruk-hai"],
	["What Sindarin word was Aragorn known by when he was a child?", "Estel-meaing hope or trust.", "Amdir-meaning looking up", "Aeluin-meaning blue lake", "Miriel-meaning sparkling like jewels"],
	["What are Morgul-wounds?", "Wounds inflicted by the Nazgul", "The corrupt mounds of earth from which the Uruk-hai are born", "Siege towers used by Orcs during the attack on Minas Tirith", "The name given to an Elf who has given up on immortality"],

];

// var questionImages = ["assets/images/image1.gif", "assets/images/image2.gif", "assets/images/image3.gif", "assets/images/image4.gif",
	// "assets/images/image5.gif", "assets/images/image6.gif"];

var questionNumbers = [];

var correct = 0;
var incorrect = 0;
var timerValue = 30;
var timerRunning = false;
var intervalId;
var questionIndex;
var answerIndex;
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
	answerIndex = Math.floor(Math.random() * 4) + 1;
	$("#timer").html(timerValue);
	console.log(answerIndex);
	for(var j = 1; j < 5; j++){
		if(answerIndex < j){
			$("#currentAnswers").append("<section class=\"answer\" id=\""+j+"\" >" + questions[questionIndex][j] + "</section>");
		}
		else{
			if(answerIndex == j){
				$("#currentAnswers").append("<section class=\"answer\" id=\""+j+"\" >" + questions[questionIndex][1] + "</section>");
			}
			else{
				$("#currentAnswers").append("<section class=\"answer\" id=\""+j+"\" >" + questions[questionIndex][j+1] + "</section>");
			}
		}
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
		$("#currentAnswers").html("<section class=\"answer\">The answer is: " + questions[questionIndex][1] +"</section>");
		incorrect++;
	}
	else{
		if($(this).attr("id") == answerIndex){

			console.log("answer correct");
			correct++;
			$("#currentQuestion").html("<section class=\"answer\">Correct Answer!</section>");
			$("#currentAnswers").empty();

		}
		else{
			console.log("answer incorrect");
			$("#currentQuestion").html("Wrong Answer!");
			incorrect++;
			$("#currentAnswers").html("<section class=\"answer\">The answer is: " + questions[questionIndex][1] +"</section>");
		}
		timerRunning=false;
		clearInterval(intervalId);
		number = 30;
	}

	// $("#currentAnswers").html("The answer is: " + questions[questionIndex][1]);
	$(".imageContainer").append("<img src=\"assets/images/image" + (questionIndex+1) +".gif\" >");

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
	$("#currentQuestion").html("Game Over! <br> You answered " + correct + " questions correctly and "+ incorrect + " incorrectly");
	$("#currentAnswers").html("<button id=\"gameStart\">Start Over!</button>");
	initializeNumbers();
	correct = 0;
	incorrect = 0;
}

$(document).on("click", "#gameStart", function(){
	console.log("game start");
	$("#timingSection").empty();
	$("#timingSection").append("<p>Time Remaining: <span id=\"timer\"></span> Seconds</p>");
	$("#currentAnswers").empty();

	nextQuestion();
	// resetTimer();
});


initializeNumbers();
$(document).on("click", ".answer", checkAnswer);
