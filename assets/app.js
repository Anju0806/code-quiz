
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


const initialsInput = document.querySelector('#initials');

let savedscores = [];
//adding event listner to the start button.
document.getElementById("startButton").addEventListener(
    "click",
    () => {
        document.getElementById("facecard").hidden = true;
        document.getElementById("highscoreslink").hidden = true;
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
            timeEl.textContent = "Time: " + timeLeft;
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
        //adding a class to button for styling
        choice.classList.add("choice-button");
        choice.addEventListener("click", function (e) {
            var clickedChoice = e.target.innerText;
            checkAnswer(clickedChoice);
        });
        choicesElem.appendChild(choice);
    }
}

function checkAnswer(clickedans) {
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
    savescore.addEventListener('click', function () {
        const initials = initialsInput.value.trim();
        let existingIndex=-1;
        if (initials) {
            var scores = JSON.parse(localStorage.getItem('scores')) || [];
            let existingIndex = scores.findIndex(entry => entry.initials === initials);
            let tempovariable = 0;
            

            for (let i = 0; i < scores.length; i++) {

                if ((scores[i].initials == initials) && (scores[i].score >= score)) {
                    tempovariable = 1;
                }
            }
            if (existingIndex !== -1) {
                // If an existing entry with the same initials exists, remove it if the new score is higher
                if (scores[existingIndex].score < score) {
                  scores.splice(existingIndex, 1);
                } 
              }

            if (tempovariable == 0) {
                scores.push({ initials, score });
                scores.sort((a, b) => b.score - a.score);
                localStorage.setItem('scores', JSON.stringify(scores));
                savescore.disabled = true;
            }
        }

        showHighScores();
    });

}







