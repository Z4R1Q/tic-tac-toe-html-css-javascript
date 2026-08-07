const cells = document.querySelectorAll('.cell');
const winDisplay = document.getElementById('win');
let currentPlayer = 'X';
let gameOver = false;

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkWin() {
    return winningCombos.some(combo => {
        const [a, b, c] = combo;
        return (
            cells[a].textContent === currentPlayer &&
            cells[b].textContent === currentPlayer &&
            cells[c].textContent === currentPlayer
        );
    });
}

function updateStatus() {
    winDisplay.textContent = `${currentPlayer} turn`;
}

function resetBoard() {
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    gameOver = false;
    updateStatus();
}

function endGame(message) {
    winDisplay.textContent = message;
    gameOver = true;
    setTimeout(resetBoard, 1400);
}

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        if (gameOver || cell.textContent !== '') return;

        cell.textContent = currentPlayer;

        if (checkWin()) {
            endGame(`${currentPlayer} wins!`);
            return;
        }

        const isDraw = Array.from(cells).every(cell => cell.textContent !== '');
        if (isDraw) {
            endGame('Draw! Restarting...');
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateStatus();
    });
});

updateStatus();
