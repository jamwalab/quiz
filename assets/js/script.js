var myDisplay = document.querySelector("#displayBox");
var startTime = 0;
var qCounter = 0

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

var pageHeader = function (text) {
    var heading = document.createElement("h2");
    heading.className = "h2Heading"; 
    heading.textContent = text;  
    return heading;          
}

var pageButtons = function (btnArray, phaseId) {
    var btnContainer = document.createElement("div");
    btnContainer.className = "btnContainer";
    //var buttonStarQuiz = document.createElement("button");
    //buttonStarQuiz.setAttribute("type", "submit");
    //buttonStarQuiz.className = "btn";
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
    //btnContainer.appendChild(buttonStarQuiz);
}

var intro = function(event) {
    var myContainer = document.createElement("div");
    myContainer.className = "display";
    //var heading = document.createElement("h2");
    //heading.className = "h2Heading";
    //heading.textContent = "Coding Quiz Challenge";

    var heading = pageHeader("Coding Quiz Challenge");

    var instruction = document.createElement("div");
    instruction.className = "instruction";
    instruction.innerHTML = "<p>Try to answer the following code-related questions within the time limit</p><p>Keep in mind that incorrect answer will penalize your score / time by ten seconds!</p>"
    
    //var btnContainer = document.createElement("div");
    //btnContainer.className = "btnContainer";
    //var buttonStarQuiz = document.createElement("button");
    //buttonStarQuiz.setAttribute("type", "submit");
    //buttonStarQuiz.className = "btn";
    //buttonStarQuiz.textContent = "Start Quiz";
    //btnContainer.appendChild(buttonStarQuiz);
    var btnContainer = pageButtons(["Start Quiz"], "startQuiz");

    myContainer.appendChild(heading);
    myContainer.appendChild(instruction);
    myContainer.appendChild(btnContainer);
    console.log(myContainer);
    displayThis(myContainer);
};

window.addEventListener("load", intro);

var timeLeft = function() {
    document.querySelector("#timer").innerHTML = "Time: " + startTime;
    startTime--;
    console.log("out");
}

var btnClickHandler = function(event) {
    var targetEl = event.target;
    if (targetEl.matches(".startQuiz")) {
        startTime = 75;
        qCounter = 0;
        var quizTimer = setInterval(timeLeft, 1000);
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

var answerLogic = function() {

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

        console.log(myContainer);
        displayThis(myContainer);
    } else {
        console.log("Quiz end");
    }

    /*for (var i=0; i<questions.length; i++) {
        var myContainer = document.createElement("div");
        var btnContainer = document.createElement("div");
        
        btnContainer.className = "btnContainer";
        myContainer.className = "display";
        
        //var heading = document.createElement("h2");
        //heading.className = "h2Heading";
        //heading.textContent = questions[i].quest;
        var heading = pageHeader(questions[i].quest);

        for (var j=0; j<questions[i].option.length; j++) {
            var buttonStarQuiz = document.createElement("button");
            buttonStarQuiz.setAttribute("type", "submit");
            buttonStarQuiz.className = "btn";
            buttonStarQuiz.textContent = questions[i].option[j];
            //https://forum.freecodecamp.org/t/why-my-for-loop-doesnt-repeat-the-div-10-times/340676 cloneNode
            btnContainer.appendChild(buttonStarQuiz.cloneNode(true));
        }

        var btnContainer = pageButtons(questions[i].option, "inQuiz");

        myContainer.appendChild(heading);
        myContainer.appendChild(btnContainer);

        myDisplay.addEventListener("click", btnClickHandler);

        console.log(myContainer);
        displayThis(myContainer);
    }*/
    
}

myDisplay.addEventListener("click", btnClickHandler);