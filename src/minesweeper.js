class Game {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }

  playMove(rowIndex, columnIndex) {
    this._board.flipTile(rowIndex, columnIndex);
    if(this._board.playerBoard[rowIndex][columnIndex] === 'B') {
      console.log("You selected a tile with a bomb. Game Over!");

      this._board.print();
    } else if(this._board.hasSafeTiles() === false) {
      console.log("There are no more bombs! YOU WIN!!!");

      this._board.print();
    } else {
      console.log("Current Board: ");
      this._board.print();
    }
  }
}

class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    // This property is used to determine the game board 
    // size and will b eused to determine if the gaem is
    // over or not each turn.
    this._numberOfTiles = numberOfColumns * numberOfRows;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  get playerBoard() {
    return this._playerBoard;
  }

  flipTile(rowIndex, columnIndex) {
    if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
      console.log("This tile has already been flipped!");
      return;
    } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
      this._playerBoard[rowIndex][columnIndex] = 'B';
    } else {
      this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
    }
    this._numberOfTiles--;
  }

  getNumberOfNeighborBombs(rowIndex, columnIndex) {
    let neighborOffsets = [
      [-1,-1],
      [-1,0],
      [-1,1],
      [0,-1],
      [0,1],
      [1,-1],
      [1,0],
      [1,1]
    ];
    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;
    let numberOfBombs = 0;
    neighborOffsets.forEach(offset => {
      const neighborRowIndex =  rowIndex + offset[0];
      const neighborColumnIndex = columnIndex + offset[1];
      if (neighborRowIndex >= 0 && neighborRowIndex <= numberOfRows &&
          neighborColumnIndex >= 0 && neighborColumnIndex <= numberOfColumns) {
        if(this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
          numberOfBombs++;
        }
      }
    });
    return numberOfBombs;
  }

  hasSafeTiles() {
    return this._numberOfTiles !== this._numberOfBombs;
  }

  // function used to print our board
  print() {
    console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
  }

  // Used to dynamically create our game board
  static generatePlayerBoard(numberOfRows, numberOfColumns) {
    // This variable will be used to create a board
    let board = [];
    // Based on the players input the board
    // will be dynamically generated
    for(let rows = 0; rows < numberOfRows; rows++) {
      let row = [];
      for(let columns = 0; columns < numberOfColumns; columns++) {
        row.push(' ');
      }
      board.push(row);
    }
    return board;
  }

  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
    // This variable will be used to create a board
    let board = [];
    // Based on the players input the board
    // will be dynamically generated
    for(let rows = 0; rows < numberOfRows; rows++) {
      let row = [];
      for(let columns = 0; columns < numberOfColumns; columns++) {
        row.push(null);
      }
      board.push(row);
    }
    // Now to randomly add bombs to the board
    let numberOfBombsPlaced = 0;
    while(numberOfBombsPlaced < numberOfBombs) {
      // NOTE: As of now a bomb can be placed in a duplicate spot
      // NOTE: This will be modified later with control code.
      let randomRowIndex = Math.floor(Math.random() * numberOfRows + 0);
      let randomColumnIndex = Math.floor(Math.random() * numberOfColumns + 0);
      if (board[randomRowIndex][randomColumnIndex] !== 'B') {
        board[randomRowIndex][randomColumnIndex] = 'B';
        numberOfBombsPlaced++;
      }
      // set our bomb placement
      board[randomRowIndex][randomColumnIndex] = 'B';
      // increased the bombs placed by 1
      numberOfBombsPlaced++;
    }
    return board;
  }
}

/*
let playerBoard = generatePlayerBoard(3, 4);
let bombBoard = generateBombBoard(3, 4, 5);


console.log('Player Board: ');
printBoard(playerBoard);
console.log('Bomb Board: ');
printBoard(bombBoard);
flipTile(playerBoard, bombBoard, 0, 0);
console.log('Updated Player Board:');
printBoard(playerBoard);
*/

// setup the game boards
const g = new Game(3, 3, 3);
// Game Starts
g.playMove(0, 0);