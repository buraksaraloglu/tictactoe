let initGame = () => {
	cellElements.forEach((cell) => {
		board.push(cell);
		cell.classList.remove(human);
		cell.classList.remove(ai);
		cell.removeEventListener('click', handleClick);
		cell.addEventListener('click', handleClick, { once: true });
	});
	turn = ai;
	bestMove();
	setBoardHoverClass();
	resultPage.classList.remove('show');
};

let handleClick = (e) => {
	turn = human;
	const cell = e.target;
	placeMark(cell);
};

// Swapping Turns
let swapTurns = () => {
	turn === ai ? (turn = human) : bestMove();
	setBoardHoverClass();
};

// Showing moves on mouse hover
let setBoardHoverClass = () => {
	if (turn === human) {
		gameBox.classList.remove(ai);
		gameBox.classList.add(human);
	} else {
		gameBox.classList.remove(human);
		gameBox.classList.add(ai);
	}
};

// Placing Mark
let placeMark = (cell) => {
	cell.classList.add(turn);
	finalControl();

	swapTurns();
};

// Check if there is winning combination on board
let checkWinner = (turn) => {
	return winCombinations.some((combination) => {
		return combination.every((index) => {
			return cellElements[index].classList.contains(turn);
		});
	});
};

let isDraw = () => {
	return [ ...cellElements ].every((cell) => {
		return cell.classList.contains(human) || cell.classList.contains(ai);
	});
};

let endGame = (tie) => {
	tie ? (winningText.innerText = 'Draw!') : (winningText.innerText = `${turn === human ? 'X' : 'O'} wins.`);
	tie
		? (resultPage.style.backgroundColor = 'rgba(64, 64, 64, 0.9)')
		: turn === human
			? (resultPage.style.backgroundColor = 'rgba(70, 142, 41, 0.9)')
			: (resultPage.style.backgroundColor = 'rgba(155, 13, 13, 0.9)');
	resultPage.classList.add('show');
};

let finalControl = () => {
	if (checkWinner(turn)) {
		endGame(false);
	} else if (isDraw()) {
		endGame(true);
	}
};

//Default Selectors
const cellElements = document.querySelectorAll('[data-cell]');
const gameBox = document.getElementById('gameBox');
const resetBtn = document.getElementById('restartButton');
const winningText = document.querySelector('[data-result-message-text]');
const resultPage = document.getElementById('resultMessage');
let turn;
let board = [];
const human = 'x';
const ai = 'circle';
const winCombinations = [
	[ 0, 1, 2 ],
	[ 3, 4, 5 ],
	[ 6, 7, 8 ],
	[ 0, 3, 6 ],
	[ 1, 4, 7 ],
	[ 2, 5, 8 ],
	[ 0, 4, 8 ],
	[ 2, 4, 6 ]
];

initGame();
resetBtn.addEventListener('click', initGame);

//Styling the game box
let shadow = '';
for (let i = 0; i < 13; i++) {
	shadow += (shadow ? ',' : '') + i * 1 + 'px ' + i * 1 + 'px 0 gold';
}
gameBox.style.boxShadow = shadow;
