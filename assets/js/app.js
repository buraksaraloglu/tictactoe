const initGame = () => {
	cellElements.forEach((cell) => {
		board.push(cell);
		cell.classList.remove(human);
		cell.classList.remove(ai);
		cell.removeEventListener('click', handleClick);
		cell.addEventListener('click', handleClick, { once: true });
	});
	turn = Math.floor(Math.random() * 10) % 2 ? human : ai;
	console.log('turn', turn);
	if(turn === ai) {
		bestMove();
	}
	setBoardHoverClass();
	resultPage.classList.remove('show');
};

let handleClick = (e) => {
	turn = human;
	const cell = e.target;
	if (!cell.classList.contains(human) && !cell.classList.contains(ai)) {
		placeMark(cell);
	}
};

// Swapping Turns
const swapTurns = () => {
	turn === ai ? (turn = human) : bestMove();
	setBoardHoverClass();
};

// Showing moves on mouse hover
const setBoardHoverClass = () => {
	if (turn === human) {
		gameBox.classList.remove(ai);
		gameBox.classList.add(human);
	} else {
		gameBox.classList.remove(human);
		gameBox.classList.add(ai);
	}
};

// Placing Mark
const placeMark = (cell) => {
	cell.classList.add(turn);
	finalControl();
	let result = checkWinner(turn);
	if (!result) {
		swapTurns();
	}
};

// Check if there is winning combination on board
const checkWinner = (turn) => {
	return winCombinations.some((combination) => {
		return combination.every((index) => {
			return cellElements[index].classList.contains(turn);
		});
	});
};

const isDraw = () => {
	return [ ...cellElements ].every((cell) => {
		return cell.classList.contains(human) || cell.classList.contains(ai);
	});
};

const endGame = (tie) => {
	tie ? (winningText.innerText = 'Draw!') : (winningText.innerText = `${turn === human ? 'O' : 'X'} wins.`);
	tie
		? (resultPage.style.backgroundColor = 'rgba(64, 64, 64, 0.9)')
		: turn === human
			? (resultPage.style.backgroundColor = 'rgba(70, 142, 41, 0.9)')
			: (resultPage.style.backgroundColor = 'rgba(155, 13, 13, 0.9)');
	resultPage.classList.add('show');
};

const finalControl = () => {
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
const board = [];
const human = 'circle';
const ai = 'x';
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
