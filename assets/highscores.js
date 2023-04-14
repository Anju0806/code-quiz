
var highscoresLink = document.getElementById("highscoreslink");
var gobackEl = document.getElementById("gobackbtn");
var clearscoresEl = document.getElementById("clearscoresbtn");

gobackEl.addEventListener("click", function () {

    document.getElementById("displayscore").hidden = true;
    document.getElementById("facecard").hidden = false;
    document.getElementById("highscores").hidden = true;
    document.getElementById("highscoreslink").hidden = false;

});

clearscoresEl.addEventListener("click", function () {
    localStorage.removeItem("scores");
    showHighScores();
});

highscoresLink.addEventListener("click", function () {
    showHighScores();
});



function showHighScores() {
    document.getElementById("displayscore").hidden = true;
    document.getElementById("facecard").hidden = true;
    document.getElementById("highscores").hidden = false;
    document.getElementById("highscoreslink").hidden = true;

    var storedscores = JSON.parse(localStorage.getItem("scores")) || [];
    displayList.innerHTML = '';
    l1.innerHTML='';
    if (storedscores.length === 0) {
        l1=document.getElementById("l1");
        l1.textContent="No Scores Saved";
    }

    else {
        for (let i = 0; i < storedscores.length; i++) {
            const listItem = document.createElement('li');
            //adding listitems to a class called l1,for styling purpose
            listItem.classList.add("l1");
            listItem.textContent = storedscores[i].initials + " - " + storedscores[i].score;
            displayList.appendChild(listItem);
        }
    }

}
