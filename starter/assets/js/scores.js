const localScores = JSON.parse(localStorage.getItem("highscores"))
const sortedScores = localScores.sort((a, b) => a.timeLeft - b.timeLeft) 
const highScores = document.getElementById("highscores")
for (let i = 0; i < sortedScores.length; i++) {
    const element = sortedScores[i];

    const userRow = document.createElement("li") 
   userRow.textContent = element.initials + " - " + element.timeLeft
highScores.append(userRow)
}

