//modals to be displayed
const modal1 = document.getElementById("modal1");
const PvPBtn = document.getElementById("PvPBtn");
PvPBtn.addEventListener("click", () =>{
    // load modal2, hide modal1.
    modal1.style.display = "none";
    modal2.style.display = "grid";
});
const PvEBtn = document.getElementById("PvEBtn");
PvEBtn.addEventListener("click", () =>{
    modal1.style.display = "none";
    modal3.style.display = "flex";
    // load modal3, hide modal1.
});

// if() PvPBtn pressed, display modal2. if() PvEBtn pressed, display modal3.
const modal2 = document.getElementById("modal2");
const player1User = document.getElementById("player1");
const player2User = document.getElementById("player2");
const modal2PlayBtn = document.getElementById("modal2PlayBtn");
modal2PlayBtn.addEventListener("click", () => {
    // start game using info from modal2
    modal2.style.display = "none";
    overlay.style.display = "none";
});

// when .playBtn pressed, close all modals and start game.
const modal3 = document.getElementById("modal3");
const usernameInput = document.getElementById("usernameInput");
const xBtn = document.getElementById("xRadioButton");
if(xBtn.checked){};
const oBtn = document.getElementById("oRadioButton");
if(oBtn.checked){};
const modal3PlayBtn = document.getElementById("modal3PlayBtn");
modal3PlayBtn.addEventListener("click", () => {
    // start game using info from modal3
    modal3.style.display = "none";
    overlay.style.display = "none";
});


// when playAgainBtn pressed, reset all data and start game.
const modal4 = document.getElementById("modal4");
const playAgainBtn = document.getElementById("playAgainBtn");
playAgainBtn.addEventListener("click", () =>{
    // if() play again btn pressed, play another game and reset everything
    overlay.stlye.display = "none";
    modal4.style.display = "none";
});

const gameboard = document.getElementById("gameboard");


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
                board.resetBoard(); //we actually won't reset the board here, and instead prompt the end modal
            } else {
                switchPlayers();
                displayTurn(); //move this to screenController() later, or access through object // screen.displayTurn() for example
            }
        }
    };
    
    const checkWinner = () => {
        let currentBoard = board.getBoard();

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
           
            const [[row1, col1], [row2, col2], [row3, col3]] = pattern;

            const square1 = currentBoard[row1][col1];
            const square2 = currentBoard[row2][col2];
            const square3 = currentBoard[row3][col3];

            if(square1 !== 0 && square1 === square2 && square1 === square3){
                return true;
            }
        }
        return false;
    }

    return { getCurrentPlayer, playTurn, checkWinner }
}

//Factory to render the board to the DOM (THIS WILL BE AN IIFE?)
(function RenderBoard(){
    const game = GameController();

})();

//if checkWinner() returns true, then append the winning message onto modal4














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