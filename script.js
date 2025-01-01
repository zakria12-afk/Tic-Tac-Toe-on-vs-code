const gameBoard = document.getElementById("game-board");
const restartButton = document.getElementById("restart-button");
let currentPlayer = "X";
let gameOver = false;
const board = Array(9).fill(null);

const sounds = {
    background: new Audio("c:\\Users\\FINE COMPUTERS\\Downloads\\2-cherry-cute-bgm-271158.mp3"),
    victory: new Audio("c:\\Users\\FINE COMPUTERS\\Downloads\\applause-crowd-cheering-sound-effect.mp3"),
    tie: new Audio("c:\\Users\\FINE COMPUTERS\\Downloads\\lose-sound-effects.mp3")
};

function createBoard() {
    gameBoard.innerHTML = "";
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.addEventListener("click", () => setTile(cell, i));
        gameBoard.appendChild(cell);
    }
}

function setTile(cell, index) {
    if (cell.textContent === "" && !gameOver) {
        cell.textContent = currentPlayer;
        board[index] = currentPlayer;

        if (checkWinner()) {
            sounds.victory.play();
            alert(`${currentPlayer} wins!`);
            gameOver = true;
        } else if (board.every(cell => cell)) {
            sounds.tie.play();
            alert("It's a tie!");
            gameOver = true;
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

restartButton.addEventListener("click", () => {
    sounds.background.play();
    currentPlayer = "X";
    gameOver = false;
    board.fill(null);
    createBoard();
});

createBoard();
