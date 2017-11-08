// Used to dynamically create our game board
const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
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
};

const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
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
    console.log(randomColumnIndex);
    // set our bomb placement
    board[randomRowIndex][randomColumnIndex] = 'B';
    // increased the bombs placed by 1
    numberOfBombsPlaced++;
  }
  return board;
};

const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
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
  const numberOfRows = bombBoard;
  const numberOfColumns = bombBoard[0].length;
  let numberOfBombs = 0;
  neighborOffsets.forEach(offset => {
    const neighborRowIndex =  rowIndex + offset[0];
    const neighborColumnIndex = columnIndex + offset[0];
    if (neighborRowIndex >= 0 && neighborRowIndex < rowIndex &&
        neighborColumnIndex >= 0 && neighborColumnIndex < columnIndex) {
      if(bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
        numberOfBombs++;
      }
    }
  });
  return numberOfBombs;
};

const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
  if (playerBoard[rowIndex][columnIndex] !== ' ') {
    console.log("This tile has already been flipped!");
    return;
  } else if (bombBoard[rowIndex][columnIndex] === 'B') {
    playerBoard[rowIndex][columnIndex] = 'B';
  } else {
    playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
  }
};

// function used to print our board
const printBoard = board => {
  console.log(board.map(row => row.join(' | ')).join('\n'));
};

// setup the game boards
let playerBoard = generatePlayerBoard(3, 4);
let bombBoard = generateBombBoard(3, 4, 5);

// prints out the state of the game board
console.log('Player Board: ');
printBoard(playerBoard);
console.log('Bomb Board: ');
printBoard(bombBoard);
flipTile(playerBoard, bombBoard, 0, 0);
console.log('Updated Player Board:');
printBoard(playerBoard);
