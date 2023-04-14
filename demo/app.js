
let timeEl = document.querySelector("#time");
let questionElem = document.querySelector("#questtitle");
let choicesElem = document.querySelector("#choices");
let ans1El = document.querySelector("#ans1");
let ans2El = document.querySelector("#ans2");
let ans3El = document.querySelector("#ans3");
let ans4El = document.querySelector("#ans4");
let message2 = document.getElementById("m2");
let message3 = document.getElementById("m3");

let savescore = document.querySelector("#submit-scores");
//let displayList = document.querySelector("#todo-list");

const initialsInput = document.querySelector('#initials');

let savedscores = [];
//adding event listner to the start button.
document.getElementById("startButton").addEventListener(
    "click",
    () => {
        document.getElementById("facecard").hidden = true;
        document.getElementById("viewscores").hidden = true;
        document.getElementById("time").hidden = false;
        document.getElementById("wrapper").hidden = false;
        startTime();
        showQuestion();
    },
    false
);

//adding timer with 40 seconds,4 questions and for negative answers decrese 10 seconds.
let timeLeft = 40;
let timerId;
function startTime() {
    // let timeLeft = TIME_LIMIT;
    timerId = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerId);
            showScore();
        } else {
            timeEl.textContent = timeLeft;
            timeLeft--;

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
        clearInterval(timerId);
    }
    else {
        showQuestion();
    }
}



function showScore() {
    document.getElementById("time").hidden = true;
    document.getElementById("wrapper").hidden = true;
    document.getElementById("displayscore").hidden = false;
    message2.textContent = "Your final score is " + score;
    message3.textContent = "Enter initials: ";

    
    console.log(initials);

    savescore.addEventListener('click', function() {
        const initials = initialsInput.value.trim();
        if (initials) {
            const scores = JSON.parse(localStorage.getItem('scores')) || [];
            scores.push({ initials, score });
            localStorage.setItem('scores', JSON.stringify(scores));
        }
        
        
        document.getElementById("displayscore").hidden = true;
        document.getElementById("highscores").hidden = false;
        //showHighScores();
    });
}


function showHighScores() {
    
    var storedinitials = JSON.parse(localStorage.getItem("initialsStored"));
    var storedscores = JSON.parse(localStorage.getItem("scoresStored"));

    //show initials and score
    //displayList.innerHTML = "";
    for (var i = 0; i < storedinitials.length; i++) {
        let temp1 = storedinitials[i];
        let temp2 = storedscores[i];
        let li = document.createElement("li");
        li.textContent = temp1;
        li.setAttribute("data-index", i);
        displayList.appendChild(li);
    }

}

function renderMessage() {
    var lastGrade = JSON.parse(localStorage.getItem("studentGrade"));
    if (lastGrade !== null) {
        document.querySelector(".message").textContent = lastGrade.student +
            " received a/an " + lastGrade.grade
    }
}


