//quote API
const quoteApiUrl = "https://api.quotable.io/random?minLength=80&maxLength=1000";
const quoteSection = document.getElementById("quote");
const userInput = document.getElementById("quote-input");

let quote = "";
let time = 60;
let timer = "";
let mistakes = 0;

//display random quotes
const renderNewQuote = async () => {
    //Fetch API 
    const response = await fetch(quoteApiUrl);
    let data = await response.json();
    quote = data.content;

    //array of char 
    let arr = quote.split("").map((value) => {
        return "<span class='quote-chars'>" + value + "</span>";
    });
    quoteSection.innerHTML += arr.join("");
};

//Logic to compare
userInput.addEventListener("input", () => {
    let quoteChars = document.querySelectorAll(".quote-chars");
    quoteChars = Array.from(quoteChars);

    // array of user input char 
    let userInputChars = userInput.value.split("");
    //loop
    quoteChars.forEach((char,index) => {
        // check chars with quote chars
        if (char.innerText == userInputChars[index]){
            char.classList.add("success");
        }
        //if user entered anything
        else if (userInputChars[index] == null) {
            if(char.classList.contains("success")) {
                char.classList.remove("success");
            } else {
                char.classList.remove("fail");
            }
        }
        //if user entered wrong
        else {
            if(!char.classList.contains("fail")) {
                //increment and displaying mistakes
                mistakes++;
                char.classList.add("fail");
            }
            document.getElementById("mistakes").innerText = mistakes;
        }
        //return true if all are correct 
        let check = quoteChars.every((element) => {
            return element.classList.contains("success");
        });
        //end test if all char are correct
        if(check) {
            displayResult();
        }
    });
});

//update timer 
function updateTimer() {
    if (time == 0 ) {
        //end test if reaches 0
        displayResult();
    } else {
        document.getElementById("timer").innerText = --time + "s";
    }
}
//set timer 
const timeReduce = () => {
    time = 60;
    timer = setInterval(updateTimer, 1000);
};

//End Test
const displayResult = () => {
    //display result div
    document.querySelector(".result").style.display = "block";
    clearInterval(timer);
    document.getElementById("stop-test").style.display = "none";
    userInput.disabled = true;
    let timeTaken = 1;
    if(time !=0) {
        timeTaken = (60 - time) / 100;
    }
    document.getElementById("wpm").innerText = (userInput.value.length / 5 / timeTaken).toFixed(2) + "wpm";
    document.getElementById("accuracy").innerText = Math.round(((userInput.value.length - mistakes) / userInput.value.length) * 100) + "%";

};

//start test 
const startTest = () => {
    mistakes = 0;
    timer = "";
    userInput.disabled = false;
    timeReduce();
    document.getElementById("start-test").style.display = "none";
    document.getElementById("stop-test").style.display = "block";
};

window.onload = () => {
    userInput.value = "";
    document.getElementById("start-test").style.display = "block";
    document.getElementById("stop-test").style.display = "none";
    userInput.disabled = true;
    renderNewQuote();
}




