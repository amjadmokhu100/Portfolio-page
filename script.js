const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");
const newGameBtn = document.getElementById("newGameBtn");
const scoreXText = document.getElementById("scoreX");
const scoreOText = document.getElementById("scoreO");
const scoreDrawText = document.getElementById("scoreDraw");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let scoreX = 0;
let scoreO = 0;
let scoreDraw = 0;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellClick(event) {
  const clickedCell = event.target;
  const clickedIndex = Number(clickedCell.dataset.index);

  if (!gameActive || board[clickedIndex] !== "") {
    return;
  }

  board[clickedIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;
  clickedCell.classList.add(currentPlayer.toLowerCase());

  const winningLine = getWinningLine();
  if (winningLine) {
    highlightWinner(winningLine);
    statusText.textContent = `Player ${currentPlayer} wins!`;
    updateScore(currentPlayer);
    gameActive = false;
    disableBoard();
    return;
  }

  if (board.every((cell) => cell !== "")) {
    statusText.textContent = "It's a draw!";
    updateScore("draw");
    gameActive = false;
    disableBoard();
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function getWinningLine() {
  return (
    winningCombinations.find((combination) => {
      const [a, b, c] = combination;
      return board[a] !== "" && board[a] === board[b] && board[a] === board[c];
    }) || null
  );
}

function highlightWinner(combination) {
  combination.forEach((index) => {
    cells[index].classList.add("win");
  });
}

function updateScore(result) {
  if (result === "X") {
    scoreX += 1;
  } else if (result === "O") {
    scoreO += 1;
  } else {
    scoreDraw += 1;
  }

  scoreXText.textContent = String(scoreX);
  scoreOText.textContent = String(scoreO);
  scoreDrawText.textContent = String(scoreDraw);
}

function disableBoard() {
  cells.forEach((cell) => {
    cell.disabled = true;
  });
}

function resetRound() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = "Player X's turn";

  cells.forEach((cell) => {
    cell.textContent = "";
    cell.disabled = false;
    cell.classList.remove("x", "o", "win");
  });
}

function resetAll() {
  scoreX = 0;
  scoreO = 0;
  scoreDraw = 0;
  scoreXText.textContent = "0";
  scoreOText.textContent = "0";
  scoreDrawText.textContent = "0";
  resetRound();
}

cells.forEach((cell) => {
  cell.addEventListener("click", handleCellClick);
});

resetBtn.addEventListener("click", resetRound);
newGameBtn.addEventListener("click", resetAll);
