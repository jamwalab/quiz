var myDisplay = document.querySelector("#displayBox");

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

    myDisplay.appendChild(dataEl);
};

var intro = function(event) {
    var myContainer = document.createElement("div");
    myContainer.className = "display";
    var heading = document.createElement("h2");
    heading.className = "h2Heading";
    heading.textContent = "Coding Quiz Challenge";

    var instruction = document.createElement("div");
    instruction.className = "instruction";
    instruction.innerHTML = "<p>Try to answer the following code-related questions within the time limit</p><p>Keep in mind that incorrect answer will penalize your score / time by ten seconds!</p>"
    
    var btnContainer = document.createElement("div");
    btnContainer.className = "btnContainer";
    var buttonStarQuiz = document.createElement("button");
    buttonStarQuiz.setAttribute("type", "submit");
    buttonStarQuiz.className = "btn";
    buttonStarQuiz.textContent = "Start Quiz";
    btnContainer.appendChild(buttonStarQuiz);

    myContainer.appendChild(heading);
    myContainer.appendChild(instruction);
    myContainer.appendChild(btnContainer);
    console.log(myContainer);
    displayThis(myContainer);
};

window.addEventListener("load", intro);

var playQuiz = function(event) {

    for (var i=0; i<questions.length; i++) {
        var myContainer = document.createElement("div");
        myContainer.className = "display";
        var heading = document.createElement("h2");
        heading.className = "h2Heading";
        heading.textContent = questions[i].quest;

        for (var j=0; j<questions[i].option.length; j++) {

        }
    }
    
}