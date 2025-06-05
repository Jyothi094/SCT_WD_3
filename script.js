const board = document.getElementById('board');
const turnDisplay = document.getElementById('turn');
const resetButton = document.getElementById('reset');

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

function renderBoard() {
  board.innerHTML = '';
  gameBoard.forEach((cell, index) => {
    const cellDiv = document.createElement('div');
    cellDiv.textContent = cell;
    cellDiv.addEventListener('click', () => handleCellClick(index));
    board.appendChild(cellDiv);
  });
}

function handleCellClick(index) {
  if (gameBoard[index] || !gameActive) return;

  gameBoard[index] = currentPlayer;
  renderBoard();
  checkWinner();
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  turnDisplay.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      gameActive = false;
      turnDisplay.textContent = `Player ${gameBoard[a]} wins!`;
      return;
    }
  }

  if (!gameBoard.includes('')) {
    gameActive = false;
    turnDisplay.textContent = 'It\'s a draw!';
  }
}

resetButton.addEventListener('click', () => {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = 'X';
  turnDisplay.textContent = `Player X's turn`;
  renderBoard();
});

renderBoard();
