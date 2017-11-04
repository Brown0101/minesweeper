'use strict';

// Used to dynamically create our game board
var generatePlayerBoard = function generatePlayerBoard(numberOfRows, numberOfColumns) {
  // This variable will be used to create a board
  var board = [];
  // Based on the players input the board
  // will be dynamically generated
  for (var rows = 0; rows < numberOfRows; rows++) {
    var row = [];
    for (var columns = 0; columns < numberOfColumns; columns++) {
      row.push(' ');
    }
    board.push(row);
  }
  return board;
};

var generateBombBoard = function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
  // This variable will be used to create a board
  var board = [];
  // Based on the players input the board
  // will be dynamically generated
  for (var rows = 0; rows < numberOfRows; rows++) {
    var row = [];
    for (var columns = 0; columns < numberOfColumns; columns++) {
      row.push(null);
    }
    board.push(row);
  }
  // Now to randomly add bombs to the board
  var numberOfBombsPlaced = 0;
  while (numberOfBombsPlaced < numberOfBombs) {
    // NOTE: As of now a bomb can be placed in a duplicate spot
    // NOTE: This will be modified later with control code.
    var randomRowIndex = Math.floor(Math.random() * numberOfRows + 0);
    console.log(randomRowIndex);
    var randomColumnIndex = Math.floor(Math.random() * numberOfColumns + 0);
    console.log(randomColumnIndex);
    // set our bomb placement
    board[randomRowIndex][randomColumnIndex] = 'B';
    // increased the bombs placed by 1
    numberOfBombsPlaced++;
  }
  return board;
};

// function used to print our board
var printBoard = function printBoard(board) {
  console.log(board.map(function (row) {
    return row.join(' | ');
  }).join('\n'));
};

// setup the game boards
var playerBoard = generatePlayerBoard(3, 4);
var bombBoard = generateBombBoard(3, 4, 5);

// prints out the state of the game board
console.log('Player Board: ');
printBoard(playerBoard);
console.log('Bomb Board: ');
printBoard(bombBoard);