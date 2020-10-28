let bestMove = () => {
	turn = ai;
	let bestScore = -Infinity;
	let move;
	let j;
	for (let i = 0; i < cellElements.length; i++) {
		if (!cellElements[i].classList.contains(human) && !cellElements[i].classList.contains(ai)) {
			cellElements[i].classList.add(ai);
			tempTurn = human;
			let score = minimax(cellElements, 0, false);
			cellElements[i].classList.remove(ai);
			if (score > bestScore) {
				bestScore = score;
				move = i;
			}
		}
		j++;
	}
	placeMark(cellElements[move]);
};

let scores = {
	X: -10,
	O: 10,
	tie: 0
};
let tempTurn;

let minimax = (board, depth, isMaximizing) => {
	let result = checkWinner(tempTurn);
	if (result) {
		if (turn === human) {
			return scores.X + depth;
		} else {
			return scores.O - depth;
		}
	}

	if (isMaximizing) {
		let bestScore = -Infinity;
		for (let i = 0; i < board.length; i++) {
			if (!board[i].classList.contains(human) && !board[i].classList.contains(ai)) {
				board[i].classList.add(human);
				let score = minimax(board, depth + 1, false);
				board[i].classList.remove(human);
				bestScore = Math.max(score, bestScore);
			}
		}
		return bestScore;
	} else {
		let bestScore = Infinity;
		for (let i = 0; i < board.length; i++) {
			if (!board[i].classList.contains(human) && !board[i].classList.contains(ai)) {
				board[i].classList.add(ai);
				let score = minimax(board, depth + 1, true);
				board[i].classList.remove(ai);
				bestScore = Math.min(score, bestScore);
			}
		}
		return bestScore;
	}
};
