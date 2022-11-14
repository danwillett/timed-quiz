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
    var secondsLeft = 20;
    timeEl.textContent = secondsLeft;
    scoreEl.textContent = 0;
    giveQuestion(q, questionPool, questionOrder)

    var timerInterval = setInterval(function(){
        
        secondsLeft--;
        console.log(secondsLeft)
        timeEl.textContent = secondsLeft;
        // checkAnswer();

        if (secondsLeft == 0) {
            clearInterval(timerInterval)
            endGame()
            return
        }

    }, 1000);

}


function giveQuestion(q, qPool, qOrder) {
    
    console.log("question id " + q)
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
    clicked = answerBox.addEventListener("click", function(event){
        console.log(answerBox)
        event.stopPropagation();
        event.preventDefault();
        console.log(event.target)
        result = event.target.getAttribute("data-correct");        
        
        if (result == "true") {           
            score++;
            console.log("correct answer!")
            scoreEl.textContent = score;
            
        } else {
            console.log("incorrect answer!")
            secondsLeft = secondsLeft - 5;           
        }   

        q++
        giveQuestion(q, questionPool, questionOrder);
    }, { once: true }) 

    
}
    
// storing dynamic document elements into variables
var h1El = document.querySelector("h1");
var beginButton = document.getElementById("start-button");
var questionEl = document.getElementById("question");
var instructionsEl = document.getElementById("instructions");
var timeEl = document.getElementById("time");
var scoreEl = document.getElementById("score");
var answerBox = document.querySelector("ol");

var answerA = document.getElementById("a");
var answerB = document.getElementById("b");
var answerC = document.getElementById("c");
var answerD = document.getElementById("d");

// question pool: object with question key, and answer keys
// question/answer combos will fill in the empty html spot when the quiz begins
var questionPool = {
    question: ["What's my birth month?", "What's my go to breakfast food?", "How many pets do I have?", "What's my favorite place?", "Favorite drink?", "Ideal temperature?"],
    rightAnswer: ["November", "eggs", "0", "home", "Coffee" , "70F"],
    wrong1: ["January", "oatmeal", "2", "the beach", "Pepsi", "75F"],
    wrong2: ["September", "smoothie/acai bowl", "1", "June Lake", "Water", "85F"],
    wrong3: ["February", "PB toast with banana", "0.5", "Alaska", "Peppermint Tea", "65F"]
}

// at start up of webpage, chooses a random order for questions to be picked through when quiz starts
var poolLength = questionPool.question.length;
var pool = Array.from(Array(poolLength).keys());

var questionOrder = randomQuestionIndex(pool, poolLength);
console.log("questionOrder = " + questionOrder);
// sets initial score to be 0 and intial question index to be 0
var score = 0;
var secondsLeft = 10000 //begins with 10 secs on clock
var q = 0;

beginButton.addEventListener("click", function (event) {
    event.stopPropagation()
    event.preventDefault()

    // step 1: clear title screen
    h1El.textContent = "";
    instructionsEl.textContent = "";
    questionEl.textContent = "";
    beginButton.style.display = "none";

    // startTimer();
    
    beginQuiz()  
    
}) 

   



// starts game and begins timer



// this will need to create a screen that says, "Game over!",
// & present the score and past scores
function endGame() {


}
// function: change question
    // randomly pulls from a question pull
    // questions stored as objects

// function: keep score
    // stores points in local storage to be added to with each correct question



// function: begin quiz
// this will start the quiz timer, clear H1 & instructions, change
// the question to a random question from question pool  
// 
// generate answers ul/li element
// 
// change button to submit, that when clicked will change the question, answers and potentially change timer

// function: setInterval timer
// triggered by clicking start button
// count down by seconds from a seconds remaining button  
// 
// seconds remaining button however changes when a question is answer incorrectly,
// subtracting the current value by 5 seconds
// 
// sends an alert when game is over somehow