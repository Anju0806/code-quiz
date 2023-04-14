
var highscoresLink = document.getElementById("highscoreslink");

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
    //var storedscores = JSON.parse(localStorage.getItem("scoresStored")) || [];

    if (storedscores.length === 0) {
        console.log("No highscores found.");
        return;
    }
    for(i=0;i<storedscores.length;i++){
        const listItem = document.createElement('li');
        console.log(storedscores.initials);
        listItem.textContent=storedscores.initials+" "+storedscores.score;
        displayList.appendChild(listItem);
    }
    
}
