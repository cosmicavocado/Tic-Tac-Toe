const boxes = document.querySelectorAll('.box');
let validMoves = 0;
let endGame = false;
const gameText = document.querySelector('#currentText');

const resetGame = () => {
    boxes.forEach(box => {box.innerText = '';})
    endGame = false;
    validMoves = 0;
    gameText.innerText = 'Player X\'s turn';
}

const listenReset = () => {
    const resetBtn = document.querySelector('button');
    resetBtn.addEventListener('click', resetGame);
    console.log('clicked');
}

const isGameOver = () => {
    let gameOver = false;
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
        [2, 4, 6]
    ]
    winConditions.forEach(condition => {
        let markers = [];
        condition.forEach(index => {
            markers.push(boxes[index].innerText);   
        })
        let matchesX = markers.filter(marker => marker === 'X' && marker !== '');
        let matchesO = markers.filter(marker => marker === 'O' && marker !== '');
        if (matchesX.length === 3 || matchesO.length === 3) {
            gameOver = true;
            gameText.innerText = `Player ${markers[0]} wins! Resetting board...`;
            setTimeout(() => {resetGame()}, 2500);
        }
    })
    if (gameOver !== true) {
        gameOver = checkTie(gameOver);
    }
    return gameOver;
}

const checkTie = (gameOver) => {
    if (validMoves === boxes.length && gameOver === false) {
        gameText.innerText = 'Tie! Resetting board...';
        setTimeout(() => {resetGame()}, 2500);
        return true;
    } else {
        return false;
    }
}

const runGame = () => {
    listenReset();
    boxes.forEach(box => {
        box.addEventListener('click', (e) => {
            e.preventDefault();
            let currentBox = e.target;
            if (currentBox.innerText === '' && endGame === false) {
                validMoves++;
                if (validMoves % 2 !== 0) {
                    currentBox.innerText = 'X';
                    gameText.innerText = 'Player O\'s turn';
                } else {
                    currentBox.innerText = 'O';
                    gameText.innerText = 'Player X\'s turn';
                }
                endGame = isGameOver();
            }
        })
    })
}

runGame();