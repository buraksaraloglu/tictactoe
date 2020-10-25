const xClass = 'x';
const circleClass = 'circle';
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
let currentBoard = [];

let circleTurn;

let initGame = () => {
	circleTurn = false;
	cellElements.forEach((cell) => {
		cell.classList.remove(xClass);
		cell.classList.remove(circleClass);
		cell.removeEventListener('click', handleClick);
		cell.addEventListener('click', handleClick, { once: true });
	});
	setBoardHoverClass();
	resultPage.classList.remove('show');
};

let handleClick = (e) => {
	const cell = e.target;
	const currentClass = circleTurn ? circleClass : xClass;
	placeMark(cell, currentClass);
	controller(currentClass);
};

let controller = (currentClass) => {
	if (checkWin(currentClass)) {
		endGame(false);
	} else if (isDraw()) {
		endGame(true);
	} else {
		swapTurns();
		setBoardHoverClass();
	}
};

// Place Mark
let placeMark = (cell, currentClass) => {
	cell.classList.add(currentClass);
};

// Swapping Turns
let swapTurns = () => {
	circleTurn = !circleTurn;
	if (circleTurn) computerMove(circleClass);
};

// Showing moves on mouse hover
let setBoardHoverClass = () => {
	gameBox.classList.remove(xClass);
	gameBox.classList.remove(circleClass);
	circleTurn ? gameBox.classList.add(circleClass) : gameBox.classList.add(xClass);
};

let checkWin = (currentClass) => {
	return winCombinations.some((combination) => {
		return combination.every((index) => {
			return cellElements[index].classList.contains(currentClass);
		});
	});
};

let isDraw = () => {
	return [ ...cellElements ].every((cell) => {
		return cell.classList.contains(xClass) || cell.classList.contains(circleClass);
	});
};

let endGame = (draw) => {
	draw ? (winningText.innerText = 'Draw!') : (winningText.innerText = `${circleTurn ? 'O' : 'X'} wins.`);
	resultPage.classList.add('show');
	circleTurn
		? (resultPage.style.backgroundColor = 'rgba(155, 13, 13, 0.9)')
		: (resultPage.style.backgroundColor = 'rgba(70, 142, 41, 0.9)');
};

// Random generated computer move
// TODO: Integrate Minimax Algorithm
let computerMove = (currentClass) => {
	let availableCells = [];

	// j = available index numbers.
	let j = 0;
	// Getting Available Cells
	for (let i of cellElements) {
		if (!i.classList.contains(xClass) && !i.classList.contains(circleClass)) {
			availableCells.push({ j, i });
		}
		j++;
	}
	let randIndex = Math.floor(Math.random() * (availableCells.length - 1));
	console.log(availableCells);
	availableCells[randIndex].i.classList.add(circleClass);
	controller(currentClass);
};

//Default Selectors
const cellElements = document.querySelectorAll('[data-cell]');
const gameBox = document.getElementById('gameBox');
const resetBtn = document.getElementById('restartButton');
const winningText = document.querySelector('[data-result-message-text]');
const resultPage = document.getElementById('resultMessage');

cellElements.forEach((cell) => {
	cell.addEventListener('click', handleClick, { once: true });
});

resetBtn.addEventListener('click', initGame);

//Styling the game box
let shadow = '';
for (let i = 0; i < 13; i++) {
	shadow += (shadow ? ',' : '') + i * 1 + 'px ' + i * 1 + 'px 0 gold';
}
gameBox.style.boxShadow = shadow;
