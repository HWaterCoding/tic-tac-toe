function Gameboard(){
    const rows = 3;
    const columns = 3;
    const board = [];

    for(let i = 0; i < rows; i++){
        const row = [];
        for(let j = 0; j < columns; j++){
            row.push(0);
        }
        board.push(row);
    }
        
    function getBoard(){
        return board.map(row => [...row]);
    };

    function placeChoice(row, col, playerValue){
        if(board[row][col] !== 0){
            return false;
        } else {
            board[row][col] = playerValue;
            return true;
        }
    };

    function resetBoard(){
        board.forEach(row => row.fill(0));
    }    

    return { getBoard, placeChoice, resetBoard };
};


function GameController(playerOneName, playerTwoName){
    const board = Gameboard();

    const players = [
        {id: 0, name: playerOneName, value: 1, score: 0},
        {id: 1, name: playerTwoName, value: 2, score: 0}
    ];

    let currentPlayer = players[0];

    const switchPlayers = () => {
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    }

    const getCurrentPlayer = () => currentPlayer;

    let gameOver = false;

    const playTurn = (row, col) => {
        if(gameOver){
            return{
                valid: false,
                winner: null,
                reason: "gameOver"
            };
        };

        const validMove = board.placeChoice(row, col, currentPlayer.value);
        if(!validMove){
            return{
                valid: false
            };
        };

        const isThereAWinner = checkWinner();
        if(isThereAWinner){
            gameOver = true;
            currentPlayer.score++;
            return{
                valid: true,
                winner: currentPlayer,
                board: board.getBoard()
            };
        };

        const tie = checkTie();
        if(tie){
            gameOver = true;
            return{
                valid: true,
                winner: null,
                tie: true,
                board: board.getBoard()
            }
        }

        switchPlayers();
        return{
            valid: true,
            winner: null,
            board: board.getBoard(),
        };
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

    const checkTie = () => {
        const currentBoard = board.getBoard();
        for(let row of currentBoard){
            for(let cell of row){
                if(cell === 0){
                    return false;
                }
            }
        }
        return true;
    }

    const resetGame = () => {
        board.resetBoard();
        currentPlayer = players[0];
        gameOver = false;
    };

    return { 
             getCurrentPlayer,
             playTurn,
             getBoard: board.getBoard,
             resetBoard: board.resetBoard,
             resetGame
           }
}


const ScreenController = (function(){
    //game state
    let game = GameController();
    const gameboard = document.getElementById("gameboard");
    //cached DOM board-related elements
    const boardSquares = [...document.getElementsByClassName("boardSquare")];
    const turnText = document.getElementById("turnText");
    const errorText = document.getElementById("errorText");
    const p1Score = document.getElementById("p1Score");
    const p2Score = document.getElementById("p2Score");
    const resetBoardBtn = document.getElementById("resetBoard");
    //modal1 elements
    const modal1 = document.getElementById("modal1");
    const PvPBtn = document.getElementById("PvPBtn");
    const PvEBtn = document.getElementById("PvEBtn");
    let isPvE = false;
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

    // if() PvPBtn pressed, display modal2. if() PvEBtn pressed, display modal3.
    PvPBtn.addEventListener("click", () =>{
        //call PvP logic
        modal1.style.display = "none";
        modal2.style.display = "grid";
    });
    PvEBtn.addEventListener("click", () =>{
        isPvE = true;
        modal1.style.display = "none";
        modal3.style.display = "flex";
    });
    
    modal2PlayBtn.addEventListener("click", () => {
        const playerOneName = player1User.value || "Player 1";
        const playerTwoName = player2User.value || "Player 2";

        game = GameController(playerOneName, playerTwoName);

        modal2.style.display = "none";
        overlay.style.display = "none";
        
        renderBoard();
        renderTurn();
    });

    modal3PlayBtn.addEventListener("click", () => {
        const playerOneName = usernameInput.value || "Player";
        const cpuName = "Computer";

        game = GameController(playerOneName, cpuName);

        if(xBtn.checked){

        };
        if(oBtn.checked){

        };
        
        modal3.style.display = "none";
        overlay.style.display = "none";

        renderBoard();
        renderTurn();
    });

    resetBoardBtn.addEventListener("click", () =>{
        game.resetGame();
        renderBoard();
        renderTurn();
        errorText.textContent = "";
        gameboard.classList.remove("tieGameBoard");
        gameboard.classList.remove("winningGameboard");
        gameboard.classList.add("neutralGameboard");
    });
    
    const renderBoard = () => {
        const board = game.getBoard();

        boardSquares.forEach((square, index) => {
            const row = Math.floor(index / 3);
            const col = index % 3;
            const value = board[row][col];

            square.textContent = value === 1 ? "X" : value === 2 ? "O" : "";
        });
    };

    const renderTurn = () => {
        const currentPlayer = game.getCurrentPlayer();
        turnText.textContent = `It's ${currentPlayer.name}'s turn!`
    };

    const renderErrorMsg = (message = "") =>{
        errorText.textContent = message;
    };

    const computerMove = () =>{
        //retrieve current boardstate
        //pick random empty square from current boardstate.
        //call game.playTurn() with random square and store in "result"
        //render the board
        //check the result of computers move for winner/tie (dont really need tie because computers move is never last)
        //if winner, end game. 
        //if no winner, update turnText and end
    };

    const handleSquareClick = (event) =>{
        const square = event.target;

        const row = square.dataset.row;
        const col = square.dataset.col;
        const result = game.playTurn(row, col);
        if(!result.valid){
            if(result.reason === "gameOver"){
                renderErrorMsg(`The game is already over! Please press "Reset Board" to play again!`)
                return;
            }
            renderErrorMsg("Sorry. That square has already been taken!")
            return;
        }

        renderErrorMsg();
        renderBoard();

        if(result.winner){
            turnText.textContent = `${result.winner.name} has won the game!`
            gameboard.classList.remove("neutralGameboard");
            gameboard.classList.add("winningGameboard");
            if(result.winner.id === 0){
                p1Score.textContent = `${result.winner.name}: ${result.winner.score}`
            } else{
                p2Score.textContent = `${result.winner.name}: ${result.winner.score}`
            }
            return;
        }

        if(result.tie){
            turnText.textContent = "It's a tie game!"
            gameboard.classList.remove("neutralGameboard");
            gameboard.classList.add("tieGameBoard");
            return;
        }

        renderTurn();

        if(isPvE){
            computerMove();
            renderTurn();
        };
    };

    boardSquares.forEach((square) =>{
        square.addEventListener("click", handleSquareClick)
    });

    renderBoard();
    renderTurn();
})();





//to-do:
//1. reposition score elements in HTML
//3. Make it so that when an error message is appended, the layout of the page does not shift!!








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

