
const listenToBoxes = () => {
    const boxes = document.querySelectorAll('.box');
    for (let i=0; i<boxes.length; i++) {
        boxes[i].addEventListener('click', (e) => {
            e.preventDefault();
            let currentBox = e.target;
            if (currentBox.innerText === '') {;
                currentBox.innerText = 'X';
            }
        })
    }
}

// Game Loop
const runGame = () => {
    listenToBoxes();
}

// Run Game
runGame();