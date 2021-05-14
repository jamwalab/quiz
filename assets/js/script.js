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

//-----PAGE CONTENT DISPLAYER-----//
var displayThis = function(dataEl) {

    var currentDisplay = document.querySelector(".display");
    console.log(myDisplay);
    /*if (dataEl.querySelector(".startQuiz")) {
        console.log("in if");
        document.querySelector(".display").style.textAlign = "center";
    }*/

    if (currentDisplay) {
        currentDisplay.remove();
    }

    myDisplay.appendChild(dataEl);
    if (dataEl.querySelector(".startQuiz")) {
        console.log("in if");
        document.querySelector(".display").style.textAlign = "center";
        document.querySelector(".btnContainer").style.alignItems = "center";
    }
    console.log(dataEl);
};

//-----PAGE CONTENT CREATOR-----//

var myPage = function(head, text, button, footer) {
    var myContainer = document.createElement("div");
    myContainer.className = "display";
    if (head) {
        myContainer.appendChild(head);
    }
    if (text) {
        myContainer.appendChild(text);    
    }
    if (button) {
        myContainer.appendChild(button);
    }
    if (footer) {
        myContainer.appendChild(footer);    
    }
    return myContainer;
}

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

//-----CREATE PAGE FOOTER-----//
var answerFooter = function(answer) {
    var footContainer = document.createElement("div");
    footContainer.className = "footContainer";
    footContainer.textContent = answer;
    footContainer.style.display = "block";
    setTimeout(function() { 
        footContainer.style.display = "none"; 
    }, 3000);

    return footContainer;
}

//-----INTRO PAGE - FIRST PAGE DISPLAYED WITH START QUIZ BUTTON-----//
var intro = function(event) {
    startTime = 0;
    
    var heading = pageHeader("Coding Quiz Challenge");

    var instruction = document.createElement("div");
    instruction.className = "instruction";
    instruction.innerHTML = "<p>Try to answer the following code-related questions within the time limit</p><p>Keep in mind that incorrect answer will penalize your score / time by ten seconds!</p>"
    
    var btnContainer = pageButtons(["Start Quiz"], "startQuiz");

    document.querySelector("#timer").innerHTML = startTime;

    displayThis(myPage(heading,instruction,btnContainer));
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
            qCounter++;
            playQuiz("Wrong");
        } else {
            qCounter++;
            playQuiz("Correct");
        }    
    }
}

var playQuiz = function(answer) {

    if (qCounter <questions.length) {
        //var myContainer = document.createElement("div");
        //var btnContainer = document.createElement("div");

        //btnContainer.className = "btnContainer";
        //myContainer.className = "display";
        var text = "";
        var heading = pageHeader(questions[qCounter].quest);
        var btnContainer = pageButtons(questions[qCounter].option, "inQuiz");
        var footer = "";

        if (answer) {
            footer = answerFooter(answer);
            console.log(answer);
        }

        //myContainer.appendChild(heading);
        //myContainer.appendChild(btnContainer);
        displayThis(myPage(heading,text,btnContainer,footer));

        myDisplay.addEventListener("click", btnClickHandler);    
    } else {
        endQuiz(answer);
    }    
}

var endQuiz = function(answer) {
    //var myContainer = document.createElement("div");
    //myContainer.className = "display";

    var heading = pageHeader("All done!");

    clearInterval(quizTimer);
    var myScore = startTime;
    document.querySelector("#timer").innerHTML = startTime;

    var instruction = document.createElement("div");
    instruction.className = "instruction";
    instruction.innerHTML = "<p>Your final score is </p>" + myScore;

    //myContainer.appendChild(heading);
    //myContainer.appendChild(instruction);
    if (answer) {
        footer = answerFooter(answer);
        console.log(answer);
    }
    qCounter = 0;
    displayThis(myPage(heading,instruction,"",footer));
}

myDisplay.addEventListener("click", btnClickHandler);