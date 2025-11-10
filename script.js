// Basic JS Pseudocode
// Focus on no global Variables, or at least not where alternatives are possible.
// DON'T WORRY ABOUT DOM/HTML RIGHT NOW, JUST MAKE THE GAME IN THE CONSOLE TO START

// Create a "gameboard" object
// Store the gameboard as an array within gameboard object
// To create the gameboard, use the same nested for loop method as we used in the etch-a-sketch project, to create a 3 x 3 grid of squares.
// Create a getBoard variable as a function to call the current state of the board array once populated via nested for loop



// Wrap gameboard in an IIFE () to create a singular instance




// Object to control the flow/logic of the game
// This should NOT be an IIFE(). 

// Create a player object as well to differentiate user from computer, and who is X / O.
// Don't worry about user inputs for now; just call game logic functions with whichever argument you need



// Object that will create the DOM for the gameboard
// Store a function in this object that renders the gameboard to the webpage
//  






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