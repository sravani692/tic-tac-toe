const cells = document.querySelectorAll('.cell');
const messageDiv = document.getElementById('message');
const resetBtn = document.getElementById('reset-btn');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(index) {
    if (gameBoard[index] !== '' || !gameActive) return;

    gameBoard[index] = currentPlayer;
    cells[index].textContent = currentPlayer;

    if (checkWinner()) {
        messageDiv.textContent = `${currentPlayer} wins!`;
        messageDiv.classList.remove('hidden');
        gameActive = false;
    } else if (gameBoard.every(cell => cell !== '')) {
        messageDiv.textContent = 'It\'s a draw!';
        messageDiv.classList.remove('hidden');
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWinner() {
    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    cells.forEach(cell => cell.textContent = '');
    messageDiv.classList.add('hidden');
}

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(index));
});

resetBtn.addEventListener('click', resetGame);
