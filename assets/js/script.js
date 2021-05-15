var myDisplay = document.querySelector("#displayBox");
var countdownTimer = 0;
var qCounter = 0;
var quizTimer = 0;
var highScore = JSON.parse(localStorage.getItem('myQuizScores')) || [];

//var myScore = 0;
console.log(highScore);
//console.log(highScore.isArray());
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
];

//-----PAGE CONTENT DISPLAYER-----//
var displayThis = function(dataEl) {

    var currentDisplay = document.querySelector(".display");
    //Removes the previous display if exist
    if (currentDisplay) {
        currentDisplay.remove();
    }
    myDisplay.appendChild(dataEl);
    //Centers the content of intro display
    if (dataEl.querySelector(".startQuiz")) {
        document.querySelector(".display").style.textAlign = "center";
        document.querySelector(".btnContainer").style.alignItems = "center";
    }
    if (dataEl.querySelector(".inHighScore")) {
        document.querySelector(".btnContainer").style.flexDirection = "row";
        document.querySelector("header").style.display = "none";
    }
    console.log(myDisplay);
};

//-----PAGE CONTENT CREATOR-----//
var myPage = function(head, text, button, footer) {
    var myContainer = document.createElement("div");
    myContainer.className = "display";
    //Appends to main display if argument received
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
};

//-----CREATE PAGE HEADER SECTION-----//
var pageHeader = function (text) {
    var heading = document.createElement("h2");
    heading.className = "h2Heading"; 
    heading.textContent = text;  
    return heading;          
};

//-----CREATE PAGE BUTTONS SECTION-----//
var pageButtons = function (btnArray, phaseId) {
    var btnContainer = document.createElement("div");
    btnContainer.className = "btnContainer";

    var newClass = "btn " + phaseId
    //Will dynamically create buttons based on the number of arguments received
    for (var j=0; j<btnArray.length; j++) {
        var buttonStarQuiz = document.createElement("button");
        buttonStarQuiz.setAttribute("data-task-id", j);
        buttonStarQuiz.className = newClass;
        buttonStarQuiz.textContent = btnArray[j];
        //https://forum.freecodecamp.org/t/why-my-for-loop-doesnt-repeat-the-div-10-times/340676 cloneNode
        btnContainer.appendChild(buttonStarQuiz.cloneNode(true));
    }
    return btnContainer;
};

//-----CREATE PAGE FOOTER SECTION-----//
var answerFooter = function(answer) {
    var footContainer = document.createElement("div");
    footContainer.className = "footContainer";
    footContainer.textContent = answer;
    footContainer.style.display = "block";
    setTimeout(function() { 
        footContainer.style.display = "none"; 
    }, 3000);

    return footContainer;
};

//-----INTRO PAGE - FIRST PAGE DISPLAYED WITH START QUIZ BUTTON-----//
var intro = function(event) {
    countdownTimer = 0;
    
    var heading = pageHeader("Coding Quiz Challenge");

    var instruction = document.createElement("div");
    instruction.className = "instruction";
    instruction.innerHTML = "<p>Try to answer the following code-related questions within the time limit</p><p>Keep in mind that incorrect answer will penalize your score / time by ten seconds!</p>"
    
    var btnContainer = pageButtons(["Start Quiz"], "startQuiz");

    document.querySelector("#timer").innerHTML = countdownTimer;

    displayThis(myPage(heading,instruction,btnContainer));
};

//-----LOAD INTRO PAGE EVERYTIME SITE IS REFRESHED-----//
window.addEventListener("load", intro);

//-----TIMER FUNCTION-----//
var timeLeft = function() {
    countdownTimer--;
    //Color the number red in last 10 seconds
    if (countdownTimer <11) {
        document.querySelector("#timer").style.color = "red";
    }
    //Call end quiz if time is up. Time is up is displayed in the footer
    if (countdownTimer < 1) {
        endQuiz("Time is up");
    }
    document.querySelector("#timer").innerHTML = countdownTimer;   
};

var clearScore = function() {
    highScore = [];
    storeScores();
    myHighScore("All scores are deleted!!");
}

//-----BUTTON CLICK HANDLER-----//
var btnClickHandler = function(event) {
    var targetEl = event.target;
    //Click event for start quiz
    if (targetEl.matches(".startQuiz")) {
        countdownTimer = 75;
        qCounter = 0;
        document.querySelector("#timer").innerHTML = 75;
        quizTimer = setInterval(timeLeft, 1000);
        playQuiz();
    }
    //Click event for quiz answer
    if (targetEl.matches(".inQuiz")) {
        if (targetEl.textContent !== questions[qCounter].ans) {
            countdownTimer -= 10;
            qCounter++;
            playQuiz("Wrong");
        } else {
            qCounter++;
            playQuiz("Correct");
        }    
    }
    //Submit for the input box
    if (targetEl.matches(".inputName")) {
        event.preventDefault();
        var myName = document.querySelector("#name").value;
        //If input is blank it will loop back to this page and display message in footer
        if (myName === "") {
            endQuiz("Initials blank, please enter your initials");
        } else {
            console.log(highScore);
            highScore.push({
                name : myName,
                score : countdownTimer
            });
            storeScores();
            myHighScore("Here are the top 10 scores so far!!");
        }
        console.log(highScore);
    }

    if (targetEl.matches(".inHighScore")) {
        if (targetEl.getAttribute("data-task-id") === "0") {
            location.reload();
        }
        if (targetEl.getAttribute("data-task-id") === "1") {
            clearScore();
        }
    }
}

//-----PLAY QUIZ LOGIC - QUIZ PAGES ARE DEVELOPED HERE-----//
var playQuiz = function(answer) {

    if (qCounter <questions.length) {
        var text = "";
        var heading = pageHeader(questions[qCounter].quest);
        var btnContainer = pageButtons(questions[qCounter].option, "inQuiz");
        var footer = "";

        if (answer) {
            footer = answerFooter(answer);
        }

        displayThis(myPage(heading,text,btnContainer,footer));  
    } else {
        endQuiz(answer);
    }    
}

//-----END QUIZ LOGIC - END QUIZ PAGE IS DEVELOPED HERE-----//
var endQuiz = function(answer) {
    var heading = pageHeader("All done!");

    clearInterval(quizTimer);
    //myScore = countdownTimer;
    document.querySelector("#timer").innerHTML = countdownTimer;

    var instruction = document.createElement("div");
    instruction.className = "instruction";
    instruction.innerHTML = "<p>Your final score is " + countdownTimer + ".</p>";

    var inputName = document.createElement("form");
    inputName.className = "inputName";
    inputName.innerHTML = "<p>Enter Initials: </p><input id='name' class='myName' type='text'/><button class='btn submitBtn' type='submit'>Submit</button>"

    if (answer) {
        var footer = answerFooter(answer);
    }

    displayThis(myPage(heading,instruction,inputName,footer));    
};

var top10score = function() {
    highScore.sort(function (a,b) {
        return b.score - a.score;
    });
    highScore.splice(10,100);
}

//-----STORES SCORE IN LOCAL STORAGE-----//
var storeScores = function () {
    
    top10score();
    localStorage.setItem('myQuizScores', JSON.stringify(highScore));
};

//-----HIGHSCORE PAGE DISPLAY-----//
var myHighScore = function (answer) {
    //highScore = localStorage.getItem('myQuizScores', JSON.stringify('myQuizScores')) || [];
    //highScore.sort(function (a,b) {
    //    return b.score - a.score;
    //});
    top10score();
    var heading = pageHeader("High Scores");
    var scoreList = document.createElement("ol");
    scoreList.className = "scoreList";
    for (var i=0; i<highScore.length; i++) {
        var name = highScore[i].name;
        var score = highScore[i].score;
        var listLine = document.createElement("li");
        listLine.className = "listLine";
        listLine.innerHTML = name + " - " + score;
        scoreList.appendChild(listLine);
    }
    var btnContainer = pageButtons(["Go Back","Clear high scores"], "inHighScore");

    if (answer) {
        var footer = answerFooter(answer);
    }

    displayThis(myPage(heading, scoreList, btnContainer, footer));
};

//-----LISTEND TO CLICKS-----//
myDisplay.addEventListener("click", btnClickHandler);
//-----LISTEND TO SUBMIT REQUESTS-----//
myDisplay.addEventListener("submit", btnClickHandler);