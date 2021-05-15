//-----GLOBAL VARIABLE DECLARATION-----//
//Main display declaration 
var myDisplay = document.querySelector("#displayBox");
//Quiz timer declaration
var countdownTimer = 0;
//Question array counter
var qCounter = 0;
//Set interval variable declaration
var quizTimer = 0;
//Pull high score from storage or assigns it to blank array if local storage is blank
var highScore = JSON.parse(localStorage.getItem('myQuizScores')) || [];
//Question variable declaration
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
//----------DOM CREATION AND MANIPULATION SECTION START----------//
//-----PAGE CONTENT DISPLAYER - FINAL FUNCTION CALLED TO DISPLAY THE PAGE-----//
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
    //Changes flex dirextion of the buttons to row
    //Removes the header in highscore as per the mockup
    if (dataEl.querySelector(".inHighScore")) {
        document.querySelector(".btnContainer").style.flexDirection = "row";
        document.querySelector("header").style.display = "none";
    }
    console.log(myDisplay);
};

//-----PAGE CONTENT CREATOR - DYNAMICALLY CREATES THE PAGE BASED ON THE ARGUMENTS-----//
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

//-----CREATES PAGE HEADER SECTION - HEADER TEXT RECEIVED AS ARGUMENT-----//
var pageHeader = function (text) {
    var heading = document.createElement("h2");
    heading.className = "h2Heading"; 
    heading.textContent = text;  
    return heading;          
};

//-----CREATES PAGE BUTTONS SECTION - BUTTON TEXT AND UNIQUE BUTTON CLASS RECEIVED AS ARGUMENT-----//
var pageButtons = function (btnArray, phaseId) {
    var btnContainer = document.createElement("div");
    btnContainer.className = "btnContainer";
    //Add btn class and unique classname
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
    //Removes the footer after a delay of 3 seconds
    setTimeout(function() { 
        footContainer.style.display = "none"; 
    }, 3000);

    return footContainer;
};
//----------DOM CREATION AND MANIPULATION SECTION END----------//

//-----INTRO PAGE - FIRST PAGE DISPLAYED WITH START QUIZ BUTTON-----//
var intro = function(event) {
    countdownTimer = 0;
    //Header
    var heading = pageHeader("Coding Quiz Challenge");
    //Body
    var instruction = document.createElement("div");
    instruction.className = "instruction";
    instruction.innerHTML = "<p>Try to answer the following code-related questions within the time limit</p><p>Keep in mind that incorrect answer will penalize your score / time by ten seconds!</p>"
    //Button
    var btnContainer = pageButtons(["Start Quiz"], "startQuiz");
    //Diaplays 0 to the timer
    document.querySelector("#timer").innerHTML = countdownTimer;
    //Page display call - calls myPage and the result is passed as argument to displayThis
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
    //Displays time in the header
    document.querySelector("#timer").innerHTML = countdownTimer;   
};

//-----CLEARS THE HIGHSCORE IN STORAGE AND DISPLAYS A CONFIRMATION MESSAGE-----//
var clearScore = function() {
    highScore = [];
    storeScores();
    myHighScore("All scores are deleted!!");
}

//-----BUTTON CLICK HANDLER-----//
var btnClickHandler = function(event) {
    var targetEl = event.target;
    //Click event for start quiz button - starts the quiz
    if (targetEl.matches(".startQuiz")) {
        //Set Interval has a delay so it displays 75 in the beginning
        countdownTimer = 75;
        document.querySelector("#timer").innerHTML = 75;
        //Resets the question counter on start quiz
        qCounter = 0;
        //Timer
        quizTimer = setInterval(timeLeft, 1000);
        playQuiz("Quiz has started. Best of luck!!");
    }
    //Click event for quiz answer
    if (targetEl.matches(".inQuiz")) {
        //If the answer is incorrect
        if (targetEl.textContent !== questions[qCounter].ans) {
            //deducts 10 seconds for wrong answer
            countdownTimer -= 10;
            //Prevents time from going negative
            if (countdownTimer < 0) {
                countdownTimer = 0;
            }
            qCounter++;
            playQuiz("Wrong");
        }
        //if the answer is correct
        else {
            qCounter++;
            playQuiz("Correct");
        }    
    }
    //Submit for the input box at end of quiz
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
    //Click event in highscore page
    if (targetEl.matches(".inHighScore")) {
        //The go back button with data-task-id 0
        if (targetEl.getAttribute("data-task-id") === "0") {
            //reloads the page which in turn loads the intro page
            location.reload();
        }
        //Deletes all the scores sored
        if (targetEl.getAttribute("data-task-id") === "1") {
            clearScore();
        }
    }
    if (targetEl.matches(".highScoreHead")) {
        console.log(targetEl);
        myHighScore("Here are the top 10 scores so far!!");
    }
}

//-----PLAY QUIZ LOGIC - QUIZ PAGES ARE DEVELOPED HERE-----//
var playQuiz = function(answer) {

    if (qCounter <questions.length) {
        var text = "";
        var heading = pageHeader(questions[qCounter].quest);
        var btnContainer = pageButtons(questions[qCounter].option, "inQuiz");
        var footer = "";
        //Ignores footer if no argument is received
        if (answer) {
            footer = answerFooter(answer);
        }

        displayThis(myPage(heading,text,btnContainer,footer));  
    } 
    else {
        endQuiz(answer);
    }    
}

//-----END QUIZ LOGIC - END QUIZ PAGE IS DEVELOPED HERE-----//
var endQuiz = function(answer) {
    var heading = pageHeader("All done!");
    //Stops the timer
    clearInterval(quizTimer);
    document.querySelector("#timer").innerHTML = countdownTimer;
    //text section
    var instruction = document.createElement("div");
    instruction.className = "instruction";
    instruction.innerHTML = "<p>Your final score is " + countdownTimer + ".</p>";
    //input section
    var inputName = document.createElement("form");
    inputName.className = "inputName";
    inputName.innerHTML = "<p>Enter Initials: </p><input id='name' class='myName' type='text'/><button class='btn submitBtn' type='submit'>Submit</button>"
    //Ignores footer if no argument is received
    if (answer) {
        var footer = answerFooter(answer);
    }
    displayThis(myPage(heading,instruction,inputName,footer));    
};

//-----CALCULATES THE TOP 10 SCORES - FOR NOW ONLY TOP 10 ARE STORED-----//
var top10score = function() {
    highScore.sort(function (a,b) {
        return b.score - a.score;
    });
    highScore.splice(10,100);
}

//-----STORES SCORE IN LOCAL STORAGE (ONLY TOP 10 ARE STORED)-----//
var storeScores = function () {    
    top10score();
    localStorage.setItem('myQuizScores', JSON.stringify(highScore));
};

//-----HIGHSCORE PAGE DISPLAY-----//
var myHighScore = function (answer) {
    top10score();
    var heading = pageHeader("High Scores");
    var scoreList = document.createElement("ol");
    scoreList.className = "scoreList";
    //Displays the score
    for (var i=0; i<highScore.length; i++) {
        var name = highScore[i].name;
        var score = highScore[i].score;
        var listLine = document.createElement("li");
        listLine.className = "listLine";
        listLine.innerHTML = name + " - " + score;
        scoreList.appendChild(listLine);
    }
    var btnContainer = pageButtons(["Go Back","Clear high scores"], "inHighScore");
    //Ignores footer if no argument is received
    if (answer) {
        var footer = answerFooter(answer);
    }
    displayThis(myPage(heading, scoreList, btnContainer, footer));
};

//-----LISTEND TO CLICKS-----//
myDisplay.addEventListener("click", btnClickHandler);
//-----LISTEND TO SUBMIT REQUESTS-----//
myDisplay.addEventListener("submit", btnClickHandler);

document.querySelector("header").addEventListener("click", btnClickHandler);