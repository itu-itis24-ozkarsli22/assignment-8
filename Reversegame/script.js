const colors = ["red", "blue", "green", "yellow", "purple", "orange", "black", "white"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

let level = 1;
let challengeText = "";
let timeLeft = 45;
let timerInterval;

const levelText = document.getElementById("levelText");
const challengeTextElement = document.getElementById("challengeText");
const userInput = document.getElementById("userInput");
const resultText = document.getElementById("resultText");
const timerElement = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const submitBtn = document.getElementById("submitBtn");
const restartBtn = document.getElementById("restartBtn");

function startGame() {
    level = 1;
    timeLeft = 45;
    resultText.textContent = "";
    levelText.textContent = `Level: ${level}`;
    timerElement.textContent = `Time left: ${timeLeft}s`;
    restartBtn.classList.add("hidden");
    submitBtn.classList.remove("hidden");
    userInput.value = "";
    setChallengeText();
    startTimer();
}

function setChallengeText() {
    if (level === 1) {
        challengeText = getRandomElement(months);
    } else if (level === 2) {
        challengeText = getRandomElement(months) + getRandomElement(numbers);
    } else if (level === 3) {
        challengeText = getRandomElement(months) + getRandomElement(numbers) + getRandomElement(colors);
    }
    challengeTextElement.textContent = `Reverse this word: ${challengeText}`;
}

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endGame(false);
        }
    }, 1000);
}

function endGame(won) {
    clearInterval(timerInterval);
    if (won) {
        resultText.textContent = "Congratulations! You won the game!";
        resultText.style.color = "green";
    } else {
        resultText.textContent = "Time's up! You lost the game.";
        resultText.style.color = "red";
    }
    submitBtn.classList.add("hidden");
    restartBtn.classList.remove("hidden");
}

submitBtn.addEventListener("click", () => {
    const userAnswer = userInput.value;
    const correctAnswer = challengeText.split("").reverse().join("");

    if (userAnswer === correctAnswer) {
        if (level === 3) {
            endGame(true);
        } else {
            level++;
            resultText.textContent = "Correct! Moving to the next level.";
            resultText.style.color = "blue";
            timeLeft = 45;
            levelText.textContent = `Level: ${level}`;
            userInput.value = "";
            setChallengeText();
        }
    } else {
        resultText.textContent = "Incorrect! Try again.";
        resultText.style.color = "red";
    }
});

restartBtn.addEventListener("click", startGame);
startBtn.addEventListener("click", startGame);
