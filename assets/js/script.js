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

function beginQuiz() {
    // Sets interval in variable
    secondsLeft = 30;
    timeEl.textContent = secondsLeft;
    scoreEl.textContent = 0;
    giveQuestion(q, questionPool, questionOrder)

    timerInterval = setInterval(function () {
        secondsLeft--;
        console.log(secondsLeft)
        
        // checkAnswer();

        if (secondsLeft <= 0) {
            secondsLeft = 0;
            timeEl.textContent = secondsLeft;
            clearInterval(timerInterval)
            setTimeout(function(){endGame()}, 550) // timeout compensates for the delay when giving the next wuestion
            return
        }
            timeEl.textContent = secondsLeft;
        

        

    }, 1000);

}


function giveQuestion(q, qPool, qOrder) {

    // shows potential answers
    answerBox.style.display = "flex";
    questionEl.style.fontSize = "20px";

    console.log("question #: " + q)
    var currentQuestion = qPool.question[qOrder[q]];

    var answerPool = [qPool.rightAnswer[qOrder[q]], qPool.wrong1[qOrder[q]], qPool.wrong2[qOrder[q]], qPool.wrong3[qOrder[q]]];
    console.log(answerPool)
    // randomize answer order given
    var answerOrder = randomAnswerIndex();

    // show current question and answers on web page
    // right now all answers in html have a default data- grade attribute to false
    questionEl.textContent = currentQuestion;

    // set the the data-correct attirbute to true for the correct answer
    answerValues = Object.values(answerOrder)
    correctAnswer = answerValues.findIndex(val => val == 0);

    var ids = ["a", "b", "c", "d"];
    for (i = 0; i < 4; i++) {
        document.getElementById(ids[i]).setAttribute("data-correct", "false");
    }

    document.getElementById(ids[correctAnswer]).setAttribute("data-correct", "true");
    //assigns variables to the answer html elements

    answerA.textContent = answerPool[answerOrder[0]];
    answerB.textContent = answerPool[answerOrder[1]];
    answerC.textContent = answerPool[answerOrder[2]];
    answerD.textContent = answerPool[answerOrder[3]];

    checkAnswer()

}

function checkAnswer() {
    clicked = answerBox.addEventListener("click", function (event) {
        console.log(answerBox)
        event.stopPropagation();
        event.preventDefault();
        console.log(event.target)
        result = event.target.getAttribute("data-correct");

        if (result == "true") {
            score++;
            resultMessage.textContent = "Correct! +1 pt"
            console.log("correct answer!")
            scoreEl.textContent = score;

        } else {

            resultMessage.textContent = "Incorrect! -5 seconds"
            console.log("incorrect answer!")
            console.log(secondsLeft)

            if (secondsLeft > 5) {
                secondsLeft = secondsLeft - 5;
            } else {
                secondsLeft = 0;
                // clearInterval(timerInterval)
                // endGame()
                return
            }
            console.log(secondsLeft)
            timeEl.textContent = secondsLeft;
        }


        if (q + 1 == questionOrder.length) {
            timeEl.textContent = 0;
            clearInterval(timerInterval)
            endGame()
        } else {
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

// storing dynamic document elements into variables
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

beginButton.addEventListener("click", function (event) {
    event.stopPropagation()
    event.preventDefault()

    // step 1: clear title screen
    h1El.textContent = "";
    instructionsEl.remove();
    questionEl.textContent = "";
    beginButton.style.display = "none";

    // startTimer();

    beginQuiz()

})





// starts game and begins timer



// this will need to create a screen that says, "Game over!",
// & present the score and past scores
function endGame() {

    // remove unneccesary elements
    questionEl.remove();
    answerBox.style.display = "none";
    resultMessage.remove();

    // add/unhide elements
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

    // I need to add a lot of debugging stuff to this for example if no name is inserted or if a name has already been used
    submitButton.addEventListener("click", function(){
        var playerName = document.querySelector("#name").value;
        console.log(playerName)
        if (playerName == "") {
            // nothing happens if they click without their name inputted
        console.log(playerName + "nada")
        } else {
        console.log(playerName)
        // local storage will have an object that stores past scores called quizScores

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

function showScores() {
    var newQuizScores = JSON.parse(localStorage.getItem("quizScores"));
    // need to sort scores by highest to lowest
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
    console.log(scoreList.reverse())
    var leaderBoardEl = document.createElement('ol');
    // leaderBoardEl.addAttribute();
    mainSec.appendChild(leaderBoardEl);
    for (var i =0; i <leaderBoard.length; i++) {
        var rankEl = document.createElement('li');
        rankEl.textContent = leaderBoard[i];
        rankEl.style.padding = "5px 0px";
        rankEl.style.textAlign = "center";
        leaderBoardEl.appendChild(rankEl);
    }

    leaderBoardEl.style.border = "solid black 2px"
    leaderBoardEl.style.backgroundColor = "yellow"



}
