
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
        
    console.log(board);

    // retrieve current state of gameboard
    function getBoard(){
        return board.map(row => [...row]);
    };

    // Alter the value of the square on the board clicked somehow
    function placeChoice(row, col, playerValue){
        
    };
    //pass in the selected square/cell and check it's value.
    //if it's value is === 0, then we can change it.
    //add an if() that if it's !not === 0, return nothing and end the exeuction.


    // console.log() current value and status of board to the console so we can see how its working
    // (WILL DELETE ONCE UI CREATED)
    // const printBoard = 

    function resetBoard(){
        board.forEach(row => row.fill(0));
    }

    

    return { getBoard, placeChoice, resetBoard };

})();

function RenderBoard(){

};

// Factory to control the flow/logic of the game
function Squares(){
    //default value of any square on the board will be 0 until changed.
    let value = 0;

    //function to take player choice as param and change value of cell to the value of the player
    const changeValue = (playerValue) => {
        value = playerValue;
    }

    
    const getValue = () => value;


    return { changeValue, getValue };
}



// Don't worry about user inputs for now; just call game logic functions with whichever argument you need



// Object that will create the DOM for the gameboard
// Store a function in this object that renders the gameboard to the webpage
//  

function GameController(playerOne = usernameInput, playerTwo = "Computer"){
    //to take username input from html and store as playerOne name
    // const username = document.getElementById("username");

    // default value of square will be 0. When clicked by playerOne, it will be 1. When clicked by playerTwo, it will be 2.
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
        // check who winner is
        // if there IS a winner, display modal congratulating winner; then reset the board.
        // if there is no winner, then switch who's turn it is and return the updated board.
    }

    return { }

}




// CHRONOLOGICAL ORDER:
// Page loads with gameboard pre-made in background with choice modal overlayed.

// Prompt user with a modal to enter their "player name" and then pick whether they are X's or O's

// Assign proper selection to user and the opposite to the computer

// The game begins, all gameboard squares/inputs need to be emptied.

// When clicked, each button needs to check whether that square is already populated
// if already populated, then return an error and end execution
// if not already populated, store value of who clicked it (user OR computer)

// Need logic for how the game functions. Check if three squares in a row are checked.
// End the game when user/computer get's 3 in a row, OR, when there are no more available spaces on the board (A TIE GAME)
// Return a result of who won, display a reset/play again button
// Clear the board and allow the user to re-pick whether they are X's and O's
// (the game begins again from the top)