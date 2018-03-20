// START QUIZ
/// when you click on the "start quiz" button, launches quiz
function startQuizButton() {
	$('main').on('click', '.js-button-start', function(event){
		
		event.preventDefault();

		let questionIndex = 0;
		quizLaunch(questionBank[questionIndex]);
  });
}

/// upon quiz launch, deletes start page text & loads question
function quizLaunch(questionBankObject) {
	$('.feedback-page').remove();
	$('.start-page-content').remove();
	$('.quiz-app').append(`<div class="question-page" role="region" aria-labelledby="quiz-app">
			<h2>${questionBankObject.question}</h2>
		  
		  		<div id="mc-radio-inputs">
		  			<form role="form" aria-labelledby="mc-radio-inputs">
		    			<fieldset class="col-12">
		    				<legend>Pick an answer below:</legend>
		    				<div>
		       					<input id="1" type="radio" name="mc-input" aria-labelledby="answer-a" required>
		       	 				<label for="1">${questionBankObject.a}</label>
		       				</div>
		       				<div>
		       	 				<input id="2" type="radio" name="mc-input" aria-labelledby="answer-b" required>
		       		 			<label for="2">${questionBankObject.b}</label>
		        			</div>
		        			<div>
		        				<input id="3" type="radio" name="mc-input" aria-labelledby="answer-c" required>
		        				<label for="3">${questionBankObject.c}</label>
		        			</div>
		        			<div>
		        				<input id="4" type="radio" name="mc-input" aria-labelledby="answer-d" required>
		        				<label for="4">${questionBankObject.d}</label>
		        			</div>
				
							<button type="button" class="js-button-submit button-submit col-3">Submit</button>
		  				</fieldset>
		  			</form>
		  		</div>
		</div>`);

	updateQuestionNumber(questionBankObject.questionNumber);
	submitListen(questionBankObject);
}

/// updates question number
function updateQuestionNumber(questionNumber) {
	$('.question-count-num').replaceWith(`<span class="question-count-num">${questionNumber} </span>`);
}

/// listens for submit after question form loads
function submitListen(questionBankObject) {
	$('.js-button-submit').click(function(event) {

		event.preventDefault();

		feedbackPage(questionBankObject);
	});
}



// QUESTION FEEDBACK & NEXT QUESTIONS
/// when you submit an answer to a question, loads correct feedback page
function feedbackPage(questionBankObject) {
	const checkedInputText = $('input[name=mc-input]:checked').siblings().text().trim();

	if ((checkedInputText === questionBankObject.correctAns) && (questionBankObject.bonusFact)) {
		$('.question-page').remove();
		$('.quiz-app').append( `<div class="feedback-page col-6">
			<h2>
				<img src="${questionBankObject.emoji}" alt="${questionBankObject.alt}" class="feedback-img"/>Great job :)
			</h2>
			<div class="feedback-content">
			<p class="feedback-explanation">That's right! The correct answer is <span class="answer">${questionBankObject.correctAns}.</span></p>
			<p class="feedback-explanation-label">Bonus fact:</p>
			<p class="feedback-explanation">${questionBankObject.bonusFact}</p>
			<div class="feedback-page-button">
			<button type="button" class="js-button-next button-next col-3">Next</button>
			</div>
			</div>
			</div>`)

		updateCorrect();
	}
	else if (checkedInputText === questionBankObject.correctAns) {
		$('.question-page').remove();
		$('.quiz-app').append( `<div class="feedback-page col-6">
			<h2>
				<img src="${questionBankObject.emoji}" alt="${questionBankObject.alt}" class="feedback-img"/>Great job :)
			</h2>
			<div class="feedback-content">
			<p class="feedback-explanation">That's right! The correct answer is <span class="answer">${questionBankObject.correctAns}.</span></p>
			<div class="feedback-page-button">
			<button type="button" class="js-button-next button-next col-3">Next</button>
			</div>
			</div>
			</div>`)

		updateCorrect();
	}
	else if (questionBankObject.bonusFact) {
		$('.question-page').remove();
		$('.quiz-app').append( `<div class="feedback-page col-6">
			<h2>
				<img src="${questionBankObject.emoji}" alt="${questionBankObject.alt}" class="feedback-img"/>Sorry :(
			</h2>
			<div class="feedback-content">
			<p class="feedback-explanation">The correct answer is <span class="answer">${questionBankObject.correctAns}.</span></p>
			<p class="feedback-explanation-label">Bonus fact:</p>
			<p class="feedback-explanation">${questionBankObject.bonusFact}</p>
			<div class="feedback-page-button">
			<button type="button" class="js-button-next button-next col-3">Next</button>
			</div>
			</div>
			</div>`);
	}
	else {
		$('.question-page').remove();
		$('.quiz-app').append( `<div class="feedback-page col-6">
			<h2>
				<img src="${questionBankObject.emoji}" alt="${questionBankObject.alt}" class="feedback-img"/>Sorry :(
			</h2>
			<div class="feedback-content">
			<p class="feedback-explanation">The correct answer is <span class="answer">${questionBankObject.correctAns}.</span></p>
			<div class="feedback-page-button">
			<button type="button" class="js-button-next button-next col-3">Next</button>
			</div>
			</div>
			</div>`);

	}
	nextListen(questionBankObject.questionNumber);
}

/// updates the number correct scoreboard
function updateCorrect() {
	correctCount += 1;
	$('.correct-count-num').replaceWith('<span class="correct-count-num">'+ correctCount +' </span>');
}

/// listens for next button click after feedback page loads
function nextListen(questionNewIndex) {
	$('.js-button-next').click(function(event) {

		event.preventDefault();
		if (questionNewIndex < 10) {
			quizLaunch(questionBank[questionNewIndex]);
		}
		else {
			finalPage();
		}
	});
}



// FINAL PAGE
/// when you click "next" on the last feedback page, takes you to final page
function finalPage() {
	$('.feedback-page').remove();

	if (correctCount <= 4) {
		$('.quiz-app').append(`<div role="region" aria-labelledby="quiz-app" class="final-page col-6">
			<h2>Aw man... you have been ranked a Goldfish n00b</h2>
			<div class="feedback-content">
			<span class="final-score">Your final score: ${correctCount}/10</span>
			<p class="feedback-explanation">Looks like it's time to brush up on your goldfish knowledge. Try the quiz again when you're ready!</p>
			<div class="final-page-button">
			<button type="button" class="js-button-restart button-restart col-3">I'm ready!</button>
			</div>
			</div>
			</div>`);
	}
	else if (correctCount > 4 && correctCount <= 7) {
		$('.quiz-app').append(`<div role="region" aria-labelledby="quiz-app" class="final-page col-6">
			<h2>You are a so-so source of goldfish knowledge</h2>
			<div class="feedback-content">
			<span class="final-score">Your final score: ${correctCount}/10</span>
			<p class="feedback-explanation">You can do better than mediocre. Try the test again?</p>
			<div class="final-page-button">
			<button type="button" class="js-button-restart button-restart col-3">I'm ready!</button>
			</div>
			</div>
			</div>`);
	}
	else {
		$('.quiz-app').append(`<div role="region" aria-labelledby="quiz-app" class="final-page col-6">
			<h2>YAS! You have been ranked a Goldfish Connoisseur</h2>
			<div class="feedback-content">
			<span class="final-score">Your final score: ${correctCount}/10</span>
			<p class="feedback-explanation">Wow! You are the big fish in these waters. Take the test again?</p>
			<div class="final-page-button">
			<button type="button" class="js-button-restart button-restart col-3">I'm ready!</button>
			</div>
			</div>
			</div>`);
	}
	restartQuiz();
}

/// on clicking the "restart" button; go back to the home page and reset counters
function restartQuiz() {

	$('.js-button-restart').on('click', function(event){
		event.preventDefault();
		$('.final-page').remove();
		$('.start-page').append(`<div class="start-page-content">
			<h1>How well do you know your goldfish?</h1>
			<div class="start-page-button">
			<button type="button" class="js-button-start button-start col-3">Start quiz</button>
			</div>`);
		$('.question-count-num').replaceWith(`<span class="question-count-num">0 </span>`);
		$('.correct-count-num').replaceWith(`<span class="correct-count-num">0 </span>`);
		correctCount = 0;	
	});
}


// CALLBACK FUNCTION
function runQuiz() {
  startQuizButton();
}

// RUN MASTER FUNCTION - when the page loads, call `runQuiz`
$(runQuiz);

