'use strict';

// Prints the formated board
// array to the conole
var printBoard = function printBoard(board) {
  // Logs the Current board state
  console.log("Current Board:");
  // Logs the each element of the board
  // array and joining them with the pipe.
  console.log(board[0].join(' | '));
  console.log(board[1].join(' | '));
  console.log(board[2].join(' | '));
};

// Default board array
var board = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];

// Dsiplay our board to teh console.
printBoard(board);

// Sample user inputs and printing board
board[0][1] = '1';
board[2][2] = 'B';
printBoard(board);