
var highscoresLink = document.getElementById("highscoreslink");
var gobackEl = document.getElementById("gobackbtn");
var clearscoresEl = document.getElementById("clearscoresbtn");

gobackEl.addEventListener("click", function () {
    //displayList=[];
    document.getElementById("displayscore").hidden = true;
    document.getElementById("facecard").hidden = false;
    document.getElementById("highscores").hidden = true;
    document.getElementById("highscoreslink").hidden = false;

});

clearscoresEl.addEventListener("click", function () {
    //showHighScores();
    localStorage.removeItem("scores");
    showHighScores();
});

highscoresLink.addEventListener("click", function () {
    showHighScores();
});


// Function to display the saved highscores
function showHighScores() {
    document.getElementById("displayscore").hidden = true;
    document.getElementById("facecard").hidden = true;
    document.getElementById("highscores").hidden = false;
    document.getElementById("highscoreslink").hidden = true;

    var storedscores = JSON.parse(localStorage.getItem("scores")) || [];
    displayList.innerHTML = '';
    if (storedscores.length === 0) {
        const listItem = document.createElement('TEXTAREA');
        listItem.textContent = "No scores added ";
        displayList.appendChild(listItem);
        //displayList.disabled=true;

        //return;
    }

    else {
        for (let i = 0; i < storedscores.length; i++) {
            const listItem = document.createElement('li');
            listItem.textContent = storedscores[i].initials + " - " + storedscores[i].score;
            displayList.appendChild(listItem);
        }
    }

}
