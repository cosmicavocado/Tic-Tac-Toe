/**
 * # GLOBAL VARIABLES
 * - boxes: node list of grid spaces
 * - validMoves: used to read/update game board and check for tie
 * - end: boolean used to signal end of game
 * - gameText: DOM target to read/update game text
 */
 const boxes = document.querySelectorAll('.box');
 let validMoves = 0;
 let endGame = false;
 const gameText = document.querySelector('#currentText');
 

 /**
  * # PURPOSE
  * Clears boxes, resets endGame boolean to false, resets gameText
  * 
  * # LOGIC
  * FOREACH box in boxes
  *     clear text in boxes
  *     reset endGame flag to false
  *     gameText reset
  */
 const resetGame = () => {
     boxes.forEach(box => {box.innerText = '';})
     endGame = false;
     validMoves = 0;
     gameText.innerText = 'Player X\'s turn';
 }
 
 /**
  * # PURPOSE
  * Run resetGame() when the user clicks resetBtn
  * 
  * # LOGIC
  * select reset button from DOM
  * listen for clicks on reset button
  * IF game is not over
  *     reset game on click
  */
 const listenReset = () => {
     const resetBtn = document.querySelector('button');
     resetBtn.addEventListener('click', () => {
         if (endGame === false) {
             resetGame();
         }
    })
 }
 
 /**
  * # PURPOSE
  * Returns boolean endGame to stop or continue the game
  * 
  * # LOGIC
  * FOREACH condition in winCondtions
  *     Create empty array (markers) to store results
  *     FOREACH index within conditions
  *         Push marker into markers array
  *     Reduce marker array to get count of idividual markers
  *     IF reduced array 'X' === 3 or reduced array 'O' === 3
  *         flag endGame as true
  *         update game text
  *         reset game after timeout
  *     IF game didn't end in win
  *         check for tie
  *     endGame result is true or false
  *         
  * @returns endGame (boolean): used to trigger end of game
  */
const isGameOver = () => {
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
        let matches = markers.reduce((allMarkers, marker) => {
            if (marker in allMarkers) {
                allMarkers[marker]++;
            } else {
                allMarkers[marker] = 1;
            }
            return allMarkers;
        }, [])
        if (matches['X'] === winConditions[0].length || matches['O'] === winConditions[0].length) {
            endGame = true;
            gameText.innerText = `Player ${markers[0]} wins! Resetting board...`;
            setTimeout(() => {resetGame()}, 2500);
        }
    })
    if (endGame !== true) {
        endGame = checkTie();
    }
    return endGame;
}

 /**
  * # PURPOSE
  * Takes boolean gameOver and returns true or false
  * 
  * # LOGIC
  * IF valid moves are expended & the game has not been won
  *     display tie message
  *     reset game after 2.5 seconds
  *     result is true
  * ELSE tie
  *     result is false
  * 
  * @param {boolean} endGame
  * @returns boolean value (true or false)
  */
 const checkTie = () => {
     if (validMoves === boxes.length) {
         gameText.innerText = 'Tie! Resetting board...';
         setTimeout(() => {resetGame()}, 2500);
         return true;
     } else {
         return false;
     }
 }
 
 /**
  * # PURPOSE
  * Contains game logic
  * 
  * ## LOGIC
  * listen for reset button press
  * FOREACH box listen for click
  *     prevent page reload
  *     current box is target box
  *     IF current box is a valid target and game is not over
  *     increment valid moves
  *        IF valid moves is odd
  *             current box text is 'X'
  *             update game text for player O's turn
  *         ELSE
  *             current box text is 'O'
  *             update game text for player X's turn
  *         check for end of game
  */
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