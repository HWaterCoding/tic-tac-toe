
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

    // function to play a single round (1 turn) and check if there's a winner yet.
    const playTurn = (row, col) => {
        const validMove = board.placeChoice(row, col, currentPlayer.value);
        if(!validMove){
            return{
                valid: false
            };
        } 
        const isThereAWinner = checkWinner();
        if(isThereAWinner){
            return{
                valid: true,
                winner: currentPlayer,
                board: board.getBoard()
            }
        };
        switchPlayers();
        return{
            valid: true,
            winner: null,
            board: board.getBoard(),
            //retrieve current player maybe?
        }
    };

    const checkWinner = () => {
        let currentBoard = board.getBoard();

        //algorithim for all potential winning patterns on the board.
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
    return { getCurrentPlayer, playTurn }
}

//Factory to render the board to the DOM (THIS WILL BE AN IIFE?)
const screenController = (function(){
    //game state
    const game = GameController();
    //cached DOM board-related elements
    const boardSquares = [...document.getElementsByClassName("boardSquare")];
    const turnText = document.getElementById("turnText");
    const errorText = document.getElementById("errorText");
    const gameboard = document.getElementById("gameboard");
    const p1Score = document.getElementById("p1Score");
    const p2Score = document.getElementById("p2Score");
    const resetBoardBtn = document.getElementById("resetBoard");
    //modal1 elements
    const modal1 = document.getElementById("modal1");
    const PvPBtn = document.getElementById("PvPBtn");
    const PvEBtn = document.getElementById("PvEBtn");
    //modal2 elements
    const modal2 = document.getElementById("modal2");
    const player1User = document.getElementById("player1");
    const player2User = document.getElementById("player2");
    const modal2PlayBtn = document.getElementById("modal2PlayBtn");
    //modal3 elements
    const modal3 = document.getElementById("modal3");
    const usernameInput = document.getElementById("usernameInput");
    const xBtn = document.getElementById("xRadioButton");
    const oBtn = document.getElementById("oRadioButton");
    const modal3PlayBtn = document.getElementById("modal3PlayBtn");
    //modal4 elements
    const modal4 = document.getElementById("modal4");
    const playAgainBtn = document.getElementById("playAgainBtn");


    // if() PvPBtn pressed, display modal2. if() PvEBtn pressed, display modal3.
    PvPBtn.addEventListener("click", () =>{
        // load modal2, hide modal1.
        modal1.style.display = "none";
        modal2.style.display = "grid";
    });
    PvEBtn.addEventListener("click", () =>{
        modal1.style.display = "none";
        modal3.style.display = "flex";
        // load modal3, hide modal1.
    });
    
    modal2PlayBtn.addEventListener("click", () => {
        // start game using info from modal2
        modal2.style.display = "none";
        overlay.style.display = "none";
    });
    
    if(xBtn.checked){};
    if(oBtn.checked){};
    modal3PlayBtn.addEventListener("click", () => {
        // start game using info from modal3
        modal3.style.display = "none";
        overlay.style.display = "none";
    });
    
    // when playAgainBtn pressed, reset the board but keep score + player names, etc...
    playAgainBtn.addEventListener("click", () =>{
        // if() play again btn pressed, play another game and reset everything
        overlay.stlye.display = "none";
        modal4.style.display = "none";
    });


    const updateGame = () =>{
        boardSquares.innerHTML = "";

        const board = game.getBoard();
        const currentPlayer = game.getCurrentPlayer();

        turnText.textContent = `It's ${currentPlayer.name}'s turn!`

        boardSquares.forEach(square =>{
            square.addEventListener("click", () =>{
                const row = square.dataset.row;
                const col = square.dataset.col;
                //we also still need to append x's and o's visually to each square when clicked
                const result = game.playTurn(row, col);
                if(!result.valid){
                    //display errorText message and do nothing else
                    errorText.textContent = "Sorry. That square has already been taken!";
                }
                if(!result.winner){
                    //update the board because the move is still valid
                    //switch the current players turn text
                    //(both of these things already happen in updateGame())

                } else {
                    //update the board
                    turnText.textContent = `${currentPlayer.name} has won the game!`
                    //increase the winners score.
                }

            });
        });
    };
    //initial rendering of everything
    updateGame();
})();





//to-do:
//1. reposition score elements in HTML
//2. There should be no text, and only updated via JS.
//3. the username/computer display and score incrementing underneath.
//4. 


// remove modal4 and simply have the user restart the game with the resetBoardBtn
//at the end of a game, when there's a winner, all that should happen is the winners score is incremented
// and "turnText" can be converted into a displayed winning message
//no more moves will be allowed anyway, then user has to click resetBoardBtn to start another game.














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
