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
                checkTie(validTurns);
                validTurns++;
            }
        })
    }
}

// check tie
const checkTie = (validTurns) => {
    // if valid turns taken and winner != true
    if (validTurns === 9) {
        console.log('Tie!');
        clearBoard();
    }
}

// Listen for Reset
document.querySelector('button').addEventListener('click', e => {
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