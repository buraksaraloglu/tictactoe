let bestMove = () => {
  turn = ai;
  let bestScore = -Infinity;
  let move;
  let availCells = [];
  cellElements.forEach((cell) => {
    if (!cell.classList.contains(human) && !cell.classList.contains(ai)) {
      availCells.push(cell);
    }
  });
  if (availCells.length === 9) {
    placeMark(
      cellElements[Math.floor(Math.random() * (cellElements.length - 1))]
    );
  } else {
    for (let i = 0; i < cellElements.length; i++) {
      if (
        !cellElements[i].classList.contains(human) &&
        !cellElements[i].classList.contains(ai)
      ) {
        cellElements[i].classList.add(ai);
        tempTurn = human;
        let score = minimax(cellElements, 0, false);
        cellElements[i].classList.remove(ai);
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
    placeMark(cellElements[move]);
  }
};

let tempTurn;

let minimax = (board, depth, isMaximizing) => {
  let scores = {
    X: 1000 - depth,
    O: 1000 + depth,
    tie: 0,
  };
  let result = checkWinner(tempTurn);
  if (result) {
    if (turn === ai) {
      return scores.X;
    } else {
      return scores.O;
    }
  }

  if (isMaximizing) {
    let bestScore = -100;
    for (let i = 0; i < board.length; i++) {
      if (
        !board[i].classList.contains(human) &&
        !board[i].classList.contains(ai)
      ) {
        board[i].classList.add(ai);
        tempTurn = human;

        let score = minimax(board, depth + 1, false);
        board[i].classList.remove(ai);
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = 10000;
    for (let i = 0; i < board.length; i++) {
      if (
        !board[i].classList.contains(human) &&
        !board[i].classList.contains(ai)
      ) {
        board[i].classList.add(human);
        tempTurn = ai;

        let score = minimax(board, depth + 1, true);
        board[i].classList.remove(human);
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
};
