// The target word based on your student number
const word = "BLAST".toUpperCase();
const maxLives = 5; // Maximum lives the player has
let score = 0;
let lives = maxLives;
let guessedLetters = []; // To track correctly guessed letters

// Create the game board (cards are initially hidden)
function createGameBoard() {
    const board = document.getElementById("game-board");
    word.split("").forEach((letter) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.letter = letter; // Store the letter as a data attribute
        card.textContent = "_"; // Initially hide the letter
        board.appendChild(card);
    });
}

// Handle the user's guess
function handleGuess() {
    const userInput = document.getElementById("user-input").value.toUpperCase();
    const feedback = document.getElementById("feedback");

    if (!userInput) {
        feedback.textContent = "Please enter a letter or word!";
        return;
    }

    if (userInput.length === 1) {
        // If the user enters a single letter
        handleLetterGuess(userInput);
    } else if (userInput === word) {
        // If the user guesses the full word
        endGame(true);
    } else {
        // Incorrect full word guess
        lives--;
        updateStats();
        feedback.textContent = "Wrong guess! Try again.";
        if (lives === 0) endGame(false);
    }

    document.getElementById("user-input").value = ""; // Clear the input field
}

// Handle a single letter guess
function handleLetterGuess(letter) {
    const feedback = document.getElementById("feedback");
    const board = document.getElementById("game-board");
    const cards = Array.from(board.children);

    if (guessedLetters.includes(letter)) {
        feedback.textContent = "You already guessed that letter!";
        return;
    }

    if (word.includes(letter)) {
        // Reveal the letter on the board
        cards.forEach((card) => {
            if (card.dataset.letter === letter) {
                card.textContent = letter;
            }
        });

        guessedLetters.push(letter);
        score += 20; // Increase score for a correct letter
        feedback.textContent = "Correct letter!";
    } else {
        lives--; // Decrease lives for an incorrect guess
        feedback.textContent = "Wrong letter! Try again.";
    }

    updateStats();

    // Check if the user has guessed all letters
    if (guessedLetters.sort().join("") === Array.from(new Set(word.split(""))).sort().join("")) {
        endGame(true);
    } else if (lives === 0) endGame(false);
}

// Update the lives and score display
function updateStats() {
    document.getElementById("score").textContent = score;
    document.getElementById("lives").textContent = lives;
    updateLivesDisplay(); // Update hearts display
}

function updateLivesDisplay() {
    const livesDisplay = document.getElementById("lives-display");
    livesDisplay.innerHTML = ""; // Clear current hearts
    for (let i = 0; i < lives; i++) {
        const heart = document.createElement("img");
        heart.src = "heart.svg"; // Path to your heart icon
        heart.alt = "Heart";
        heart.classList.add("heart");
        livesDisplay.appendChild(heart);
    }
}

// End the game
function endGame(isWin) {
    const feedback = document.getElementById("feedback");
    const board = document.getElementById("game-board");

    if (isWin) {
        feedback.textContent = "Congratulations! You guessed the word!";
        board.querySelectorAll(".card").forEach((card) => (card.textContent = card.dataset.letter));
    } else {
        feedback.textContent = `Game Over! The word was "${word}".`;
    }

    document.getElementById("submit-button").disabled = true; // Disable further inputs
}

// Reset the game
function resetGame() {
    score = 0;
    lives = maxLives;
    guessedLetters = [];
    document.getElementById("game-board").innerHTML = ""; // Clear board
    createGameBoard(); // Recreate board
    updateStats();
    document.getElementById("feedback").textContent = "Game has been reset!";
    document.getElementById("submit-button").disabled = false; // Enable submit button
}

// Initialize the game
document.getElementById("submit-button").addEventListener("click", handleGuess);
document.getElementById("reset-button").addEventListener("click", resetGame);
createGameBoard();
updateStats();
