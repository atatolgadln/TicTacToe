const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart');
const scoreXElement = document.getElementById('scoreX');
const scoreOElement = document.getElementById('scoreO');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let scoreX = 0;
let scoreO = 0;

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame);

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (board[index] !== '') return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin()) {
        alert(`${currentPlayer} wins!`);
        updateScore(currentPlayer);
        restartGame();
    } else if (board.every(cell => cell !== '')) {
        alert('Draw!');
        restartGame();
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (currentPlayer === 'O') {
            aiMove();
        }
    }
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winPatterns.some(pattern => {
        return pattern.every(index => {
            return board[index] === currentPlayer;
        });
    });
}

function updateScore(player) {
    if (player === 'X') {
        scoreX++;
        scoreXElement.textContent = scoreX;
    } else {
        scoreO++;
        scoreOElement.textContent = scoreO;
    }
}

function restartGame() {
    board.fill('');
    cells.forEach(cell => {
        cell.textContent = '';
    });
    currentPlayer = 'X';
}

function aiMove() {
    const emptyCells = board.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[randomIndex] = 'O';
    cells[randomIndex].textContent = 'O';

    if (checkWin()) {
        alert('O wins!');
        updateScore('O');
        restartGame();
    } else if (board.every(cell => cell !== '')) {
        alert('Draw!');
        restartGame();
    } else {
        currentPlayer = 'X';
    }
}
