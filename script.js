const boxes = document.querySelectorAll('.box');
let validTurns = 1;

const clearBoard = () => {
    for (let i=0; i<boxes.length; i++) {
        boxes[i].innerText = '';
    }
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
                checkWin();
                validTurns++;
            }
        })
    }
}

// check win
const checkWin = () => {
    const winConditions = [
        // horizontal
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        // vertical
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        // diagonal
        [0, 4, 8],
        [2, 4, 6],
    ]
    winConditions.forEach(condition => {
        let markers = [];
        condition.forEach(index => {
            markers.push(boxes[index].innerText);   
        })
        let matchesX = markers.filter(marker => marker === 'X' && marker !== '');
        let matchesO = markers.filter(marker => marker === 'O' && marker !== '');
        if (matchesX.length === 3 || matchesO.length === 3) {
            console.log(`${markers[0]} wins!`);
            clearBoard();
        }
    })
}

// Listen for Reset
document.querySelector('button').addEventListener('click', () => {
    clearBoard();
    validTurns = 1;
})

// Game Loop
const runGame = () => {
    clearBoard();
    listenToBoxes();
}

// Run Game
runGame();