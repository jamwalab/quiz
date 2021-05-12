var myDisplay = document.querySelector("#displayBox");

var displayThis = function(dataEl) {
    console.log(dataEl);
    myDisplay.appendChild(dataEl);
};

var intro = function(event) {
    var myContainer = document.createElement("div");
    var heading = document.createElement("h2");
    heading.className = "h2Heading"
    heading.textContent = "Coding Quiz Challenge";
    myContainer.appendChild(heading);
    console.log(myContainer);
    displayThis(myContainer);
};

window.addEventListener("load", intro);