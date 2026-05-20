const AI_CLASS = 'circle';
const HUMAN_CLASS = 'x';
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.querySelector('[data-board]')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const winningMessage = document.querySelector('[data-winning-message]');
const restartButton = document.querySelector('[data-restart-button]')

let isCircleTurn; 

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

const startGame = () => {

    winningMessage.classList.remove("show-winning-message");

    for (const cell of cellElements) {

        // remove marcas
        cell.classList.remove('circle');
        cell.classList.remove('x');

        // remove evento antigo
        cell.removeEventListener('click', handleClick);

        // adiciona novo evento
        cell.addEventListener('click', handleClick, { once: true });
    }
};

const endGame = (isDraw, winner) => {

    if (isDraw) {

        winningMessageTextElement.innerText = 'Empate!';

    } else {

        winningMessageTextElement.innerText =
            winner === HUMAN_CLASS
                ? 'Você venceu!'
                : 'IA venceu!';
    }

    winningMessage.classList.add("show-winning-message");
};

const checkForWin = (currentPlayer) => {
    return winningCombinations.some((combination) => {
        return combination.every((index) => {
            return cellElements [index].classList.contains(currentPlayer);
});
    });
};

const checkForDraw = () => {
    return [...cellElements].every(cell => {
     return cell.classList.contains('x') || cell.classList.contains('circle')
    }
)};

const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
};

const setBoardHoverClass = () => {
    board.classList.remove('circle')
    board.classList.remove('x')

    if (isCircleTurn) {
        board.classList.add('circle');
    } else {
        board.classList.add('x');
    }
};

const handleClick = (e) => {
    const cell = e.target;

    // Jogador humano joga
    placeMark(cell, HUMAN_CLASS);

    const isWin = checkForWin(HUMAN_CLASS);
    const isDraw = checkForDraw();

    if (isWin) {
    endGame(false, HUMAN_CLASS);
    return;
}
    if (isDraw) {
        endGame(true);
        return;
    }

    // Turno da IA
    setTimeout(() => {
        aiMove();
    }, 500);
};   

const aiMove = () => {

    // pega células vazias
    const availableCells = [...cellElements].filter(cell => {
        return !cell.classList.contains('x') &&
               !cell.classList.contains('circle');
    });

    // escolhe posição aleatória
    const randomCell =
        availableCells[Math.floor(Math.random() * availableCells.length)];

    // marca O
    placeMark(randomCell, AI_CLASS);

    // verifica vitória
    const isWin = checkForWin(AI_CLASS);
    const isDraw = checkForDraw();

    if (isWin) {
        isCircleTurn = true;
        endGame(false);
        return;
    }

    if (isDraw) {
        endGame(true);
    }
};

startGame();

restartButton.addEventListener("click", startGame);
