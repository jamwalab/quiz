var myDisplay = document.querySelector("#displayBox");
var startTime = 0;
var qCounter = 0;
var quizTimer = 0;

var questions = [
    {
        quest: "Capital of Italy",
        option: ["Rome","Milan","Venice","Madrid"],
        ans: "Rome"
    },
    {
        quest: "Capital of France",
        option: ["Rome","Milan","Paris","Madrid"],
        ans: "Paris"
    },
    {
        quest: "Capital of Canada",
        option: ["Rome","Milan","Venice","Ottawa"],
        ans: "Ottawa"
    },
    {
        quest: "Capital of Spain",
        option: ["Rome","Milan","Venice","Madrid"],
        ans: "Madrid"
    },
    {
        quest: "Capital of Germany",
        option: ["Rome","Berlin","Venice","Madrid"],
        ans: "Berlin"
    }
]

var displayThis = function(dataEl) {
    console.log(dataEl);
    
    var currentDisplay = document.querySelector(".display");
    if (currentDisplay) {
        currentDisplay.remove();
    }
    
    myDisplay.appendChild(dataEl);
};

//-----CREATE PAGE HEADER-----//
var pageHeader = function (text) {
    var heading = document.createElement("h2");
    heading.className = "h2Heading"; 
    heading.textContent = text;  
    return heading;          
}

//-----CREATE PAGE BUTTONS-----//
var pageButtons = function (btnArray, phaseId) {
    var btnContainer = document.createElement("div");
    btnContainer.className = "btnContainer";

    var newClass = "btn " + phaseId
     
    for (var j=0; j<btnArray.length; j++) {
        var buttonStarQuiz = document.createElement("button");
        buttonStarQuiz.setAttribute("data-task-id", j);
        buttonStarQuiz.className = newClass;
        buttonStarQuiz.textContent = btnArray[j];
        //https://forum.freecodecamp.org/t/why-my-for-loop-doesnt-repeat-the-div-10-times/340676 cloneNode
        btnContainer.appendChild(buttonStarQuiz.cloneNode(true));
    }
    return btnContainer;
}

//-----INTRO PAGE - FIRST PAGE DISPLAYED WITH START QUIZ BUTTON-----//
var intro = function(event) {
    var myContainer = document.createElement("div");
    myContainer.className = "display";

    var heading = pageHeader("Coding Quiz Challenge");

    var instruction = document.createElement("div");
    instruction.className = "instruction";
    instruction.innerHTML = "<p>Try to answer the following code-related questions within the time limit</p><p>Keep in mind that incorrect answer will penalize your score / time by ten seconds!</p>"
    
    var btnContainer = pageButtons(["Start Quiz"], "startQuiz");

    document.querySelector("#timer").innerHTML = startTime;

    myContainer.appendChild(heading);
    myContainer.appendChild(instruction);
    myContainer.appendChild(btnContainer);
    console.log(myContainer);
    displayThis(myContainer);
};

//-----LOAD INTO PAGE EVERYTIME SITE IS REFRESHED-----//
window.addEventListener("load", intro);

//-----TIMER FUNCTION-----//
var timeLeft = function() {
    startTime--;
    document.querySelector("#timer").innerHTML = startTime;
    
}

//-----BUTTON CLICK HANDLER-----//
var btnClickHandler = function(event) {
    var targetEl = event.target;
    if (targetEl.matches(".startQuiz")) {
        startTime = 75;
        qCounter = 0;
        document.querySelector("#timer").innerHTML = 75;
        quizTimer = setInterval(timeLeft, 1000);
        playQuiz();
        console.log("I am here in ckickHandler");
    }
    if (targetEl.matches(".inQuiz")) {
        if (targetEl.textContent !== questions[qCounter].ans) {
            startTime -= 10;
        }
        qCounter++;
        playQuiz();
    }
}

var playQuiz = function() {

    if (qCounter <questions.length) {
        var myContainer = document.createElement("div");
        var btnContainer = document.createElement("div");

        btnContainer.className = "btnContainer";
        myContainer.className = "display";

        var heading = pageHeader(questions[qCounter].quest);

        var btnContainer = pageButtons(questions[qCounter].option, "inQuiz");

        myContainer.appendChild(heading);
        myContainer.appendChild(btnContainer);

        myDisplay.addEventListener("click", btnClickHandler);

        displayThis(myContainer);
    } else {
        endQuiz();
    }    
}

var endQuiz = function() {
    var myContainer = document.createElement("div");
    myContainer.className = "display";

    var heading = pageHeader("All done!");

    clearInterval(quizTimer);
    var myScore = startTime;
    document.querySelector("#timer").innerHTML = startTime;

    var instruction = document.createElement("div");
    instruction.className = "instruction";
    instruction.innerHTML = "<p>Your final score is </p>" + myScore;

    myContainer.appendChild(heading);
    myContainer.appendChild(instruction);

    console.log(quizTimer);
    displayThis(myContainer);
}

myDisplay.addEventListener("click", btnClickHandler);