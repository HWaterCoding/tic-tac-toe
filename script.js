
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

})();

//Factory to render the board to the DOM
function RenderBoard(){

};

// Factory to control value of squares
// Need to pass in the value of the square selected 
function Squares(){
    //default value of any square on the board will be 0 until changed.
    let squareValue = 0;

    //function to take player choice as param and change value of cell to the value of the player
    const changeValue = (playerValue) => {
        squareValue = playerValue;
    }

    //retrieve current value of square
    const getValue = () => squareValue;

    return { changeValue, getValue };
}

//change "user" here to variable for username input on starting modal
function GameController(playerOne = "user", playerTwo = "Computer"){
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
    const displayTurn = () => {
        console.log(`It's ${getCurrentPlayer().name}'s turn!`)
    };

    // function to play a single round (1 turn) and check if there's a winner yet.
    const playTurn = () => {
        const validMove = Gameboard.placeChoice();
        if(!validMove){
            console.log("ERROR. That square is already taken!");
        } else{
            checkWinner();
            switchPlayers();
            displayTurn();
        }
    };
    
    const checkWinner = () => {
        if(winner){
            //Check if three squares in a row have the same value.
            //display winner msg + end game + prompt ending modal.
            //WE WONT ACTUALLY RESET BOARD HERE, WE WILL PROMPT A MODAL AT END OF GAME TO PLAY AGAIN, AND ONLY IF CLICKED, WILL WE THEN RESET BOARD. THAT WILL GO IN AN EVENT LISTENER AFTERWARD ONCE WE INCLUDE THE DOM
            
        } else {
            // don't end game and simply switch turns.
        }
    }

    return { playTurn }
}






// LOGIC changes:
// (Gameboard is finished, so we can call it accordingly now.)
// Focus on GameController logic:
// 




// DOM changes: 
// Page needs to load with choice modal overlayed on to page and accept user inputs (username/tokenChoice)
// Store their selected username and token choice in variables 
// Create the board in HTML as it doesn't need to change, and then only append the values of the array to it
// When a user clicks one of the squares, change it's value and append the correct token to display.
// Create error message to be appended to display, above board, if user select square already taken.
// Create modal to appear overlayed when game is finished with appropriate win/lose message
// Add a reset/new game button to ending modal to close overlay and reset the value of board array
// 