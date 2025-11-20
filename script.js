// Basic JS Pseudocode
// Focus on no global Variables, or at least not where alternatives are possible.
// DON'T WORRY ABOUT DOM/HTML RIGHT NOW, JUST MAKE THE GAME IN THE CONSOLE TO START


// Create a getBoard variable as a function to call the current state of the board array once populated via nested for loop
function Gameboard(){

    const rows = 3;
    const columns = 3;
    const board = [];

    // (check etch-a-sketch to review how to do this properly)
    for(let i = 0; i < rows; i++){
        // add row to npoard array
        for(let j = 0; j < columns; j++){
            // add column to board array
        };
    };

    // retrieve current state of gameboard
    const getBoard = () => board;

    // Alter the value of the square on the board clicked somehow
    const placeChoice = 

    // console.log() current value and status of board to the console so we can see how its working
    // (WILL DELETE ONCE UI CREATED)
    const printBoard = 

    // return these 3 functions so we can call them in the outerscope/within other functions
    return { getBoard, placeChoice, renderBoard };

};

// Wrap gameboard in an IIFE () to create a singular instance ???




// Object to control the flow/logic of the game
function Squares(){

}



// Don't worry about user inputs for now; just call game logic functions with whichever argument you need



// Object that will create the DOM for the gameboard
// Store a function in this object that renders the gameboard to the webpage
//  

function GameController(playerOne, playerTwo = "Computer"){

    // retrieve current status of gameboard()


    // default value of square will be 0. When clicked by playerOne, it will be 1. When clicked by playerTwo, it will be 2.
    const players = [
        {name: playerOne, choice: 1},
        {name: playerTwo, choice: 2}
    ];

    //need a function here to determine who's turn it currently is.
    

    // function to play a single round (1 turn) and check if there's a winner yet.
    // if there is no winner, then switch who's turn it is and return the updated board.

}




// CHRONOLOGICAL ORDER:
// Page loads with gameboard pre-made in background
// Prompt user with a modal to enter their "player name" and then pick whether they are X's or O's
// Assign proper selection to user and the opposite to the computer
// The game begins, all gameboard squares/inputs need to be emptied. 
// When clicked, each square needs to check whether that square is already populated
// if already populated, then return an error and end execution
// if not already populated, store value of who clicked it (user OR computer)
// Need logic for how the game functions. Check if three squares in a row are checked.
// End the game when user/computer get's 3 in a row, OR, when there are no more available spaces on the board (A TIE GAME)
// Return a result of who won, display a reset/play again button
// Clear the board and allow the user to re-pick whether they are X's and O's
// (the game begins again from the top)