const boxes = document.querySelectorAll('.box');
let validTurns = 1;

const clearBoard = () => {
    boxes.innerText = '';
}

const listenToBoxes = () => {
    for (let i=0; i<boxes.length; i++) {
        boxes[i].addEventListener('click', (e) => {
            e.preventDefault();
            let currentBox = e.target;
            if (currentBox.innerText !== 'X' && currentBox.innerText !== 'O') {
                if (validTurns % 2 !== 0) {
                    currentBox.innerText = 'X';
                } else {
                    currentBox.innerText = 'O';
                }
                validTurns++;
            }
        })
    }
}

// Game Loop
const runGame = () => {
    clearBoard();
    listenToBoxes();
}

// Run Game
runGame();