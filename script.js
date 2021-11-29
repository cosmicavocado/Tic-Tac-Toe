// Global variables
const boxes = document.querySelectorAll('.box');
let validTurns = 0;
const gameText = document.querySelector('#currentText');

// Main Game Loop
const runGame = () => {
    for (let i=0; i<boxes.length; i++) {
        boxes[i].addEventListener('click', (e) => {
            e.preventDefault();
            let currentBox = e.target;
            validTurns++;
            if (currentBox.innerText === '') {
                if (validTurns % 2 !== 0) {
                    currentBox.innerText = 'X';
                    gameText.innerText = 'Player O\'s turn';
                } else {
                    currentBox.innerText = 'O';
                    gameText.innerText = 'Player X\'s turn';
                }
                checkWin();
                checkTie();
            }
        })
    }
}

// Reset Game after delay
const clearBoard = () => {
    for (let i=0; i<boxes.length; i++) {
        boxes[i].innerText = '';
    }
    validTurns = 0;
    gameText.innerText = 'Player X\'s turn';
}

// Reset on Button Press
document.querySelector('button').addEventListener('click', clearBoard);

// Check win
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
            gameText.innerText = `Player ${markers[0]} wins! Resetting board...`;
            setTimeout(() => {clearBoard()}, 5000);
        }
    })
}

// Check for tie
const checkTie = () => {
    if (validTurns === 9) {
        gameText.innerText = 'Tie! Resetting board...';
        setTimeout(() => {clearBoard()}, 5000);
    }
}

// Run Game
runGame();