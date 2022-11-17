// randomizes question order, so quiz looks different with each run through
function randomQuestionIndex(pool, poolLength) {
    var order = [];
    for (var i = 0; i < poolLength; i++) {
        var remainLength = pool.length;
        var randID = Math.floor(Math.random() * remainLength)
        order.push(pool[randID]);
        pool.splice(randID, 1);
    }
    return order
}

// randomizes answer options
function randomAnswerIndex() {
    var order = [];
    var answerIds = [0, 1, 2, 3];
    for (var i = 0; i < 4; i++) {

        var remainLength = answerIds.length;
        var randId = Math.floor(Math.random() * remainLength)
        order.push(answerIds[randId]);
        answerIds.splice(randId, 1);
    }
    return order
}

// begins timer and displays one multiple choice question at a time
function beginQuiz() {

    secondsLeft = 30; // start with 30 seconds on timer
    timeEl.textContent = secondsLeft;
    scoreEl.textContent = 0;

    // displays a random question from question pool
    giveQuestion(q, questionPool, questionOrder)

    // begins timer, counts down with each second
    timerInterval = setInterval(function () {
        secondsLeft--;
        console.log(secondsLeft)

        // when time runs out, ends quiz
        if (secondsLeft <= 0) {
            secondsLeft = 0;
            timeEl.textContent = secondsLeft;
            clearInterval(timerInterval)
            setTimeout(function () { endQuiz() }, 550) // timeout compensates for the delay when giving the next wuestion
            return
        }

        // display time on screen
        timeEl.textContent = secondsLeft;

    }, 1000);

}

// give a new multiple choice question
function giveQuestion(q, qPool, qOrder) {

    // shows potential answers

    console.log("question #: " + q)
    var currentQuestion = qPool.question[qOrder[q]];
    var answerPool = [qPool.rightAnswer[qOrder[q]], qPool.wrong1[qOrder[q]], qPool.wrong2[qOrder[q]], qPool.wrong3[qOrder[q]]];
    console.log(answerPool)

    // randomize answer order
    var answerOrder = randomAnswerIndex();
    answerBox.style.display = "flex";

    // show current question and answers on web page
    // right now all answers in html have a default data- grade attribute to false
    questionEl.style.fontSize = "20px";
    questionEl.textContent = currentQuestion;

    // set the the data-correct attirbute to true for the correct answer
    answerValues = Object.values(answerOrder)
    correctAnswer = answerValues.findIndex(val => val == 0);

    var ids = ["a", "b", "c", "d"];
    for (i = 0; i < 4; i++) {
        document.getElementById(ids[i]).setAttribute("data-correct", "false");
    }

    document.getElementById(ids[correctAnswer]).setAttribute("data-correct", "true");
  
    // assign answers to each answer element
    answerA.textContent = answerPool[answerOrder[0]];
    answerB.textContent = answerPool[answerOrder[1]];
    answerC.textContent = answerPool[answerOrder[2]];
    answerD.textContent = answerPool[answerOrder[3]];

    // checks answer when user has selected one
    checkAnswer()

}

// checks whether answer is correct, then either subtracts time from the clock or assigns a point
function checkAnswer() {
    clicked = answerBox.addEventListener("click", function (event) {
        console.log(answerBox)
        event.stopPropagation();
        event.preventDefault();
        console.log(event.target)
        result = event.target.getAttribute("data-correct");

        // assign a point if they got the question right
        if (result == "true") {
            score++;
            resultMessage.textContent = "Correct! +1 pt"
            console.log("correct answer!")
            scoreEl.textContent = score;

        } else { // deducts time if they got the question wrong

            resultMessage.textContent = "Incorrect! -5 seconds"
            console.log("incorrect answer!")
            console.log(secondsLeft)

            // if the time deduction drains the clock, set the clock to be 0
            if (secondsLeft > 5) {
                secondsLeft = secondsLeft - 5;
            } else {
                secondsLeft = 0;
                return
            }
            console.log(secondsLeft)
            timeEl.textContent = secondsLeft;
        }

        // if they have answered the last question before the time is up, stop the timer and end the quiz
        if (q + 1 == questionOrder.length) {
            timeEl.textContent = 0;
            clearInterval(timerInterval)
            endQuiz()
        } else {
            // add a small delay before giving the next question.
            setTimeout(function () {
                q++
                resultMessage.textContent = "";
                giveQuestion(q, questionPool, questionOrder)

            }
                , 500);
        }
        return
    }, { once: true })


}

// storing document elements as global variables for later use
var timerInterval; // sets to global variable so timer can be ended in different function scopes
var h1El = document.querySelector("h1");
var beginButton = document.getElementById("start-button");
var questionEl = document.getElementById("question");
var instructionsEl = document.getElementById("instructions");
var timeEl = document.getElementById("time");
var scoreEl = document.getElementById("score");
var answerBox = document.querySelector(".answer-options");
var mainSec = document.body.children[1];

var answerA = document.getElementById("a");
var answerB = document.getElementById("b");
var answerC = document.getElementById("c");
var answerD = document.getElementById("d");

var resultMessage = document.getElementById("grade-message");

// question pool: object with question key, and answer keys
// question/answer combos will fill in the empty html spot when the quiz begins
var questionPool = {
    question: ["What's Javascript?", "What does JavaScript operate on?", "Why was Javascript designed?"],
    rightAnswer: ["Scripting language", "Browser", "To add interactivity to HTML Pages"],
    wrong1: ["An Application", "Server", "to style HTML pages"],
    wrong2: ["A Machine", "ISP", "No purpose"],
    wrong3: ["A website", "VS Code", "For educational purposes"]
}

// at start up of webpage, chooses a random order for questions to be picked through when quiz starts
var poolLength = questionPool.question.length;
var pool = Array.from(Array(poolLength).keys());

var questionOrder = randomQuestionIndex(pool, poolLength);
console.log("questionOrder = " + questionOrder);
// sets initial score to be 0 and intial question index to be 0
var score = 0;
var secondsLeft;//begins with 10 secs on clock
var q = 0;

// when the start! button is pressed, begin the quiz
beginButton.addEventListener("click", function (event) {
    event.stopPropagation()
    event.preventDefault()

    //Clears title screen
    h1El.textContent = "";
    instructionsEl.remove();
    questionEl.textContent = "";
    beginButton.style.display = "none";

    beginQuiz()
})

// ends the quiz, gives player option to add their score to the leader board
function endQuiz() {

    // remove unneccesary elements
    questionEl.remove();
    answerBox.style.display = "none";
    resultMessage.remove();

    // creates and appends new text elements 
    h1El.textContent = "Quiz Complete!"
    var h2El = document.createElement("h2");
    h2El.textContent = "You scored: " + score;

    var submissionInstructions = document.createElement("p");
    submissionInstructions.textContent = "Add your name to see how you rank on the leaderboard!"
    submissionInstructions.style.padding = "10px 0px";

    var submitEl = document.querySelector(".submit-score");

    mainSec.appendChild(h2El);
    mainSec.appendChild(submissionInstructions);
    mainSec.removeChild(submitEl);
    mainSec.appendChild(submitEl); // place submission form below instructions

    submitEl.style.display = "contents";

    var submitButton = document.querySelector("#submit");

    // when submitted, add player's name and score to leader board
    submitButton.addEventListener("click", function () {
        var playerName = document.querySelector("#name").value;
        console.log(playerName)
        
        if (playerName == "") {
            // nothing happens if they click without their name inputted
            console.log(playerName + "nada")
        } else {
            playerName = playerName.trim();
            console.log(playerName)
            
            // checks if local storage already contains past quiz scores, if not creates new object to hold them
            if (localStorage.getItem("quizScores") === null) {
                var quizScores = {};
                console.log("new object")
            } else {
                var quizScores = JSON.parse(localStorage.getItem("quizScores"));
                console.log("exists")
            }

            quizScores[playerName] = score;
            localStorage.setItem("quizScores", JSON.stringify(quizScores))

            // hide submission element
            submitEl.style.display = "none";

            // present high scores
            showScores()
        }

    })//, { once: true })
}

// grabs past people's scores and display them from high to low
function showScores() {
    var newQuizScores = JSON.parse(localStorage.getItem("quizScores"));
    var vals = Object.values(newQuizScores);
    var names = Object.keys(newQuizScores);

    var valSort = Object.values(newQuizScores).sort();
    console.log(valSort)
    const valSortLength = valSort.length;

    var scoreList = [];
    // finds the location and name pair of where each sorted score is and places it in scoreList
    for (var i = 0; i < valSortLength; i++) {
        var ind = vals.indexOf(valSort[i]);

        // // console.log(ind)
        scoreList.push(names[ind] + ": " + vals[ind]);
        vals.splice(ind, 1);
        names.splice(ind, 1);
    }

    var leaderBoard = scoreList;
    var leaderBoardEl = document.createElement('ol');
    // leaderBoardEl.addAttribute();
    mainSec.appendChild(leaderBoardEl);

    // adds names to scoreboard from high scores to low.
    for (var i = 0; i < leaderBoard.length; i++) {
        var rankEl = document.createElement('li');
        rankEl.textContent = leaderBoard[i];
        rankEl.style.padding = "5px 0px";
        rankEl.style.textAlign = "center";
        leaderBoardEl.appendChild(rankEl);
    }

    leaderBoardEl.style.border = "solid black 2px"
    leaderBoardEl.style.backgroundColor = "yellow"



}
