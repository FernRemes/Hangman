const wordDisplay = document.querySelector(".word-display");
const hangmanImage = document.querySelector(".hangman-box img");
const guessText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");


let currentWord, correctLetters = [], wrongGuessedLetter = 0;

const maxGuessCount = 6;

const resetGame = () => {
    correctLetters = [];
    wrongGuessedLetter = 0;
    hangmanImage.src = `images/hangman-${wrongGuessedLetter}.svg`;
    guessText.innerText = `${wrongGuessedLetter} / ${maxGuessCount}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false)
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("")
    gameModal.classList.remove("show");
}

const getRandomWord = () => {
    const {word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    // console.log(word, hint)

    document.querySelector(".hint-text b").innerText = hint;
    resetGame();

}   

const gameOver = (isWin) => {
    setTimeout(() => {
        const modalText = isWin ? `You Found The Word: ` : `The Correct Word Was: `;
        gameModal.querySelector("img").src = `images/${isWin ? 'victory' : 'lost'}.gif`;
        gameModal.querySelector("h4").innerText = `${isWin ? 'Congrats!' : 'Game Over!'}`;
        gameModal.querySelector("p").innerHTML = `${modalText}<b>${currentWord}</b>`;
        gameModal.classList.add("show");
    }, 300);
}

const initGame = (button, clickedLetter) => {
    if (currentWord.includes(clickedLetter)) {
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
    
        }})
    }
    else {
        wrongGuessedLetter++;
        hangmanImage.src = `images/hangman-${wrongGuessedLetter}.svg`;

    }
    button.disabled = true;
    guessText.innerText = `${wrongGuessedLetter} / ${maxGuessCount}`;

    // calling gameOver function when any of these conditions meet
    if(wrongGuessedLetter === maxGuessCount) return gameOver(false);
    if(correctLetters.length === currentWord.length) return gameOver(true);
}
// Create the keyboard buttons
for (let i = 97; i <= 122; i++) {
    const button = document.createElement('button');
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}

// Event Listener for keyboard buttons 
document.addEventListener("keydown", e => {
    const pressedKey = e.key.toLowerCase();
    if (pressedKey >= 'a' && pressedKey <= 'z') {
        const button = [...keyboardDiv.querySelectorAll("button")].find(btn => btn.innerText.toLowerCase() === pressedKey);
        if (button && !button.disabled) {
            initGame(button, pressedKey);
        }
    } 
});

getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);