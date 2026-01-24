
const gridBoard = document.getElementById("gridBoard");
const xBtn = document.getElementById("xRadioButton");
const oBtn = document.getElementById("oRadioButton");
const usernameInput = document.getElementById("username");

//object to store the gameboard itself as an array
function Gameboard(){
    const rows = 3;
    const columns = 3;
    const board = [];

    // create 3 arrays with 3 values of 0 for the default board
    for(let i = 0; i < rows; i++){
        const row = [];
        for(let j = 0; j < columns; j++){
            row.push(0);
        }
        board.push(row);
    }
        
    // retrieve current state of gameboard
    function getBoard(){
        return board.map(row => [...row]);
    };

    // determine if move is valid or not, if it is, change value of square to playerValue
    function placeChoice(row, col, playerValue){
        if(board[row][col] !== 0){
            return false;
        } else {
            board[row][col] = playerValue;
            return true;
        }
    };

    // iterate through every index of [row] arrays and reset to 0 to clear the board and start new game.
    function resetBoard(){
        board.forEach(row => row.fill(0));
    }    

    return { getBoard, placeChoice, resetBoard };

};

//change "user" here to variable for username input on starting modal
function GameController(playerOne = "user", playerTwo = "Computer"){
    const board = Gameboard();

    //create player objects and assign them a value
    const players = [
        {name: playerOne, value: 1},
        {name: playerTwo, value: 2}
    ];

    //variable to determine who's turn it currently is
    let currentPlayer = players[0];

    //function to switch player turn after every turn
    const switchPlayers = () => {
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    }

    //function to retrieve who's turn it currently is
    const getCurrentPlayer = () => currentPlayer;

    //function to display who's current turn it is
    //THIS NEEDS TO MOVE TO ScreenController() IIFE AFTERWARDS, AS IT'S DOM MANIPULATION!!!
    const displayTurn = () => {
        console.log(`It's ${getCurrentPlayer().name}'s turn!`)
    };

    // function to play a single round (1 turn) and check if there's a winner yet.
    const playTurn = (row, col) => {
        const validMove = board.placeChoice(row, col, currentPlayer.value);
        if(!validMove){
            console.log("ERROR. That square is already taken!");
            return;
        } else{
            console.log(board.getBoard());
            const isThereAWinner = checkWinner();
            if(isThereAWinner){
                console.log(`Congratulations! ${getCurrentPlayer().name} is the winner!`)
                board.resetBoard();
            } else {
                switchPlayers();
                displayTurn(); //move this to screenController() later
            }
        }
    };
    
    const checkWinner = () => {
        let currentBoard = Gameboard.getBoard();

        //hard-code algorithim for all potential winning patterns on the board.
        const winningPatterns = [
            //rows
            [[0, 0], [0, 1], [0, 2]],
            [[1, 0], [1, 1], [1, 2]],
            [[2, 0], [2, 1], [2, 2]],
            //columns
            [[0, 0], [1, 0], [2, 0]],
            [[0, 1], [1, 1], [2, 1]],
            [[0, 2], [1, 2], [2, 2]],
            //diagonals
            [[0, 0], [1, 1], [2, 2]],
            [[0, 2], [1, 1], [2, 0]],
        ]

        //loop through all winning patterns 
        for(let pattern of winningPatterns){
            //CAN FIX THIS WITH ARRAY DESTRUCTURING I THINK TO MAKE LESS UGLY!
            const square1 = pattern[0];
            const square2 = pattern[1];
            const square3 = pattern[2];

            const row1 = square1[0];
            const col1 = square1[1];

            const row2 = square2[0];
            const col2 = square2[1];

            const row3 = square3[0];
            const col3 = square3[1];

            const value1 = currentBoard[row1][col1];
            const value2 = currentBoard[row2][col2];
            const value3 = currentBoard[row3][col3];

            if(value1 !== 0 && value1 === value2 && value1 === value3){
                return true;
            }
        }
        return false;
    }

    return { getCurrentPlayer, playTurn, checkWinner }
}

//Factory to render the board to the DOM (THIS WILL BE AN IIFE?)
const RenderBoard = (function(){
    const game = GameController();

})();

(function RenderBoard(){
    const game = GameController();

})();


// LOGIC changes:
// (Gameboard is finished, so we can call it accordingly now.)
// Focus on GameController logic:
// 




// DOM changes: 
// Page first loads a modal with two buttons: (Player vs. CPU, OR, Player vs. Player)
// After selecting an option, usernameInput and tokenChoice input loads on second modal. 
// Page needs to load with choice modal overlayed on to page and accept user inputs (username/tokenChoice)
// Store their selected username and token choice in variables 
// Create the board in HTML as it doesn't need to change, and then only append the values of the array to it
// When a user clicks one of the squares, change it's value and append the correct token to display.
// Create error message to be appended to display, above board, if user select square already taken.
// Create modal to appear overlayed when game is finished with appropriate win/lose message
// Add a reset/new game button to ending modal to close overlay and reset the value of board array
// 





// // Factory to control value of squares
// // Need to pass in the value of the square selected 
// function Squares(){
//     //default value of any square on the board will be 0 until changed.
//     let squareValue = 0;

//     //function to take player choice as param and change value of cell to the value of the player
//     const changeValue = (playerValue) => {
//         squareValue = playerValue;
//     }

//     //retrieve current value of square
//     const getValue = () => squareValue;

//     return { changeValue, getValue };
// }