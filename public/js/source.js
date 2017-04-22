$('#results').hide();

// this flag will send array output to console if set to true
var dev = true;

var userAnswers = [
	{
		factor: 'E',
		name: 'Extraversion',
		count: 0,
		score: 0,
		percent: 0
	},
	{
		factor: 'A',
		name: 'Agreeableness',
		count: 0,
		score: 0,
		percent: 0
	},
	{
		factor: 'C',
		name: 'Conscientiousness',
		count: 0,
		score: 0,
		percent: 0
	},
	{
		factor: 'N',
		name: 'Neuroticism',
		count: 0,
		score: 0,
		percent: 0
	},
	{
		factor: 'I',
		name: 'Intellect/Imagination',
		count: 0,
		score: 0,
		percent: 0
	}
];
var currentQuestion = 0;

$(document).ready(function(){
	
   $('#btnClick').click(function(){
	   $(this).hide();
	   createQuestion();
   });
	
});

function createQuestion(){

	if (currentQuestion < questions.length){

		answerBubbles = []
		if (dev) console.log(userAnswers)
		$questionRow = $('<div>', {
			class: "row questionRow"
		})
		$answerRow = $('<div>', {
			class: "row answerRow"
		})
		$question = $('<div>', {
			text: questions[currentQuestion]
		})


		for (var i = 0; i < answers.length; i++){

			answerBubbles.push($('<div>', {
				text: answers[i],
				id: (currentQuestion+1)+"-"+(i+1)
			}))

			$answerRow.append(answerBubbles[i]);

			answerBubbles[i].on('mouseup', function(){

				answerId = $(this).attr("id")
				questionNumber = answerId.split("-")[0]
				answerNumber = answerId.split("-")[1]

				// userAnswers.push(parseInt(answerNumber))
				updateAnswer(currentQuestion, parseInt(answerNumber))
				currentQuestion = currentQuestion + 1;
				$( "#question" ).fadeOut( "slow", function() {
					// Animation complete.
					$(this).empty();
					createQuestion();
					$( "#question" ).fadeIn()
				});

			})
		}

		$questionRow.append($question)

		$('#question').append($questionRow)
		$('#question').append($answerRow)

	} else {
		endPersonalityTest()
	}
}

function updateAnswer(currentQuestion_zeroIndexed, userAnswer){
	for (var i = 0; i < userAnswers.length; i++){
		if (userAnswers[i].factor == questionFactors[currentQuestion_zeroIndexed]){
			var userScore, keyed
			var reverseArray = [5,4,3,2,1]

			if (questionReverse[currentQuestion_zeroIndexed] == true){
				// -keyed
				userScore = reverseArray[userAnswer-1]
				keyed = "-keyed"
			} else {
				// +keyed
				userScore = userAnswer
				keyed = "+keyed"
			}
			userAnswers[i].count = userAnswers[i].count + 1
			userAnswers[i].score = userAnswers[i].score + userScore
			// userAnswers[i].percent = userAnswers[i].score / userAnswers[i].count
			userAnswers[i].percent = userAnswers[i].score / 20


			if (dev) displayUserResult(factor = userAnswers[i].factor, 
				count = userAnswers[i].count, 
				keyed, 
				score = userAnswers[i].score, 
				percent = userAnswers[i].percent)
		}
	}
}

function displayUserResult(factor, count, keyed, score, percent) {
	console.log("factor: " + factor)
	console.log("count: " + count)
	console.log(keyed)
	console.log("score: " + score)
	console.log("percent: " + percent)
}

function endPersonalityTest(){

	$('#content').hide();
	$('#results').show();

	for (var i = 0; i < userAnswers.length; i++){
			
			$('#results').append($('<h2>', {
				text: userAnswers[i].name + ": " + (userAnswers[i].percent*100) + "%"
			}))

	}
}