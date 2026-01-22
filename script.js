
const gridBoard = document.getElementById("gridBoard");
const xBtn = document.getElementById("xRadioButton");
const oBtn = document.getElementById("oRadioButton");
const usernameInput = document.getElementById("username");

//object to store the gameboard itself as an array
const Gameboard = (function(){
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

    // determine if move is valid or not, if it is, store playerValue as value in [row] array index
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

})();

//Factory to render the board to the DOM
function RenderBoard(){

};

// Factory to control the flow/logic of the game
function Squares(){
    //default value of any square on the board will be 0 until changed.
    let squareValue = 0;

    //function to take player choice as param and change value of cell to the value of the player
    const changeValue = (playerValue) => {
        squareValue = playerValue;
    }

    //retrieve current value of square
    const getValue = () => value;

    return { changeValue, getValue };
}

function GameController(playerOne = usernameInput, playerTwo = "Computer"){
    //to take username input from html and store as playerOne name
    // const username = document.getElementById("username");

    //create player objects and assign them a value
    const players = [
        {name: playerOne, value: 1},
        {name: playerTwo, value: 2}
    ];

    //variable to determine who's turn it currently is
    let currentPlayer = players[0];

    //Function to switch player turn after every turn
    const switchPlayers = () => {
        if(currentPlayer === players[0]){
            currentPlayer = players[1];
        } else {
            currentPlayer = players[0];
        }
    }

    //function to retrieve who's turn it currently is
    const getCurrentPlayer = () => currentPlayer;

    const displayTurn = () => {
        console.log(`It's ${getCurrentPlayer().name}'s turn!`)
        // We will display via DOM manipulation who's turn it is later
    };

    // function to play a single round (1 turn) and check if there's a winner yet.
    const playTurn = () => {
        //both called to switch players and display whos turn it is after every turn
        switchPlayers();
        displayTurn();
    };
    
    const checkWinner = () => {
        if(index){
            //Check if three squares in a row have the same value.
            //display winner msg + end game.
            //reset board.
        } else if (notindex){
            // alternative win con
        } else {
            // don't end game and simply switch turns.
        }
    }

    return { }

}




// CHRONOLOGICAL ORDER:
// Page loads with gameboard pre-made in background with choice modal overlayed.

// Prompt user with a modal to enter their "player name" and then pick whether they are X's or O's

// Assign proper selection to user and the opposite to the computer


// End the game when user/computer get's 3 in a row, OR, when there are no more available spaces on the board (A TIE GAME)
// Return a result of who won, display a reset/play again button
// Clear the board and allow the user to re-pick whether they are X's and O's
// (the game begins again from the top)