
let timeEl = document.querySelector("#time");
let questionElem = document.querySelector("#questtitle");
let choicesElem = document.querySelector("#choices");
let ans1El = document.querySelector("#ans1");
let ans2El = document.querySelector("#ans2");
let ans3El = document.querySelector("#ans3");
let ans4El = document.querySelector("#ans4");
let message2 = document.getElementById("m2");
let message3 = document.getElementById("m3");
let textarea = document.getElementById("m4");
let signup = document.querySelector("#signup");



//adding event listner to the start button.
document.getElementById("startButton").addEventListener(
    "click",
    () => {
        document.getElementById("facecard").hidden = true;
        document.getElementById("viewscores").hidden = true;
        document.getElementById("time").hidden = false;
        document.getElementById("wrapper").hidden = false;
        startTime();
    },
    false
);

//adding timer with 40 seconds,4 questions and for negative answers decrese 10 seconds.
let timeLeft = 40;
function startTime() {
    // let timeLeft = TIME_LIMIT;
    const timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            showScore();
        } else {
            timeEl.textContent = timeLeft;
            timeLeft--;
            showQuestion();
            console.log(currentQuestion);
        }
    }, 1000);
}



let currentQuestion = 0;
let score = 0;

function showQuestion() {
    const current = questions[currentQuestion];
    questionElem.textContent = current.title;

    choicesElem.innerHTML = "";
    for (let i = 0; i < current.choices.length; i++) {
        const choice = document.createElement("button");
        choice.innerText = current.choices[i];
        choice.addEventListener("click", function (e) {
            var clickedChoice = e.target.innerText;
            checkAnswer(clickedChoice);
        });
        choicesElem.appendChild(choice);
    }
}



function checkAnswer(clickedans) {
    // const selected = event.target.getAttribute("data-index");
    let currentanswer = questions[currentQuestion].answer;
    if (clickedans == currentanswer) {
        score++;
    }
    else {
        timeLeft = timeLeft - 10;
    }

    currentQuestion++;
    if (currentQuestion >= questions.length) {
        showScore();
    }
    else {
        console.log("here")
        showQuestion();
    }
}


function showScore() {
    document.getElementById("time").hidden = true;
    document.getElementById("wrapper").hidden = true;
    document.getElementById("displayscore").hidden = false;

    message2.textContent = "Your final score is " + score;
    message3.textContent = "Enter initials: ";



    signup.addEventListener("submit", function (event) {
        event.preventDefault();

        var initials = textarea.value;

        if (initials != "") {

            // TODO: Save email and password to localStorage and render the last registered user
            localStorage.setItem("initials", initials);
            localStorage.setItem("score", score);
            //renderLastRegistered();
        }
    });
}
