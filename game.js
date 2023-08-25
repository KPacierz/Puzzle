const gameTiles=document.querySelectorAll('.tile');
const gameBoard = document.querySelector('#game-board');

const gameState = [
  [gameTiles[0], gameTiles[1], gameTiles[2], gameTiles[3], gameTiles[4]],
  [gameTiles[5], gameTiles[6], gameTiles[7], gameTiles[8], gameTiles[9]],
  [gameTiles[10], gameTiles[11], gameTiles[12], gameTiles[13], gameTiles[14]],
];

function render(gameBoard, gameState) {
  gameState.forEach((row, rowIndex) => {
    row.forEach((column, columnIndex) =>{
      column.style.top = `${rowIndex *200}px`;
      column.style.left = `${columnIndex *200}px`;
      column.style['background-position-y']=`-${rowIndex*200}px`;
      column.style['background-position-x']=`-${columnIndex*200}px`;
      gameBoard.appendChild(column);
    });
  });
}
function moveElement(element1, element2){
  let tempTop, tempLeft;
  tempTop = element1.style.top;
  tempLeft = element1.style.left;

  element1.style.top = element2.style.top;
  element1.style.left = element2.style.left;

  element2.style.top = tempTop;
  element2.style.left = tempLeft;

};

render(gameBoard, gameState);

gameBoard.addEventListener('click', (event) => {
  const target = event.target;
  let x, y;

  gameState.forEach((row, rowIndex) => {
    row.forEach((column, columnIndex) => {
      if(column===target){
        x=rowIndex;
        y=columnIndex;
      }
    });
  });

  let emptyX, emptyY;

  gameState.forEach((row, rowIndex) => {
    row.forEach((column, columnIndex) => {
      if(column.innerText===''){
        emptyX=rowIndex;
        emptyY=columnIndex;
      }
    });
  });

  if((y === emptyY && (x+1 === emptyX || x-1 ===emptyX)) ||
   (x === emptyX && (y+1 === emptyY || y-1 ===emptyY)))
   {

    moveElement(gameState[x][y], gameState[emptyX][emptyY]);
    const temp=gameState[x][y];
    gameState[x][y] = gameState[emptyX][emptyY];
    gameState[emptyX][emptyY] = temp;
   };
});

function Random(max) {
  return Math.floor(Math.random() * max);
}
let x1, y1, X1, Y1, a, b, tmp;

const move = document.querySelector(".but");
move.addEventListener('click', () => {
  for(let i = 1; i < 16; i++){
  x1=Random(3);
  y1=Random(5);
  X1=Random(3);
  Y1=Random(5);

  a = gameState[x1][y1];
  b = gameState[X1][Y1];

  moveElement(gameState[x1][y1], gameState[X1][Y1]);
  tmp=gameState[x1][y1];
  gameState[x1][y1] = gameState[X1][Y1];
  gameState[X1][Y1] = tmp;
}});
