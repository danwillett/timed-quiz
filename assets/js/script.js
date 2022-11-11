
// storing dynamic document elements into variables
var h1El = document.querySelector("h1");
var beginButton = document.getElementsByClassName("start-button");
var questionEl = document.getElementsByClassName("question");
var instructionsEl = document.getElementsByClassName("instructions");


console.log(begin);




// question pool:


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

// function: change question
    // randomly pulls from a question pull
    // questions stored as objects 

// function: keep score
    // stores points in local storage to be added to with each correct question


