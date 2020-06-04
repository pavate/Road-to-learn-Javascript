
const statusDisplay = document.querySelector('.game--status');


let gameActive = true;

let currentPlayer = "X";

let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();








document.querySelectorAll('.gameboard1').forEach(cell => cell.addEventListener('click', handleCellClick));

function handleCellClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex =  parseInt(clickedCell.getAttribute('data-cell-index'));
  console.log(clickedCellIndex);

  if (gameState[clickedCellIndex] !== "" || !gameActive) {
       return;
   }

  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();

}

function handleCellPlayed(clickedCell, clickedCellIndex) {

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = "<img src="+currentPlayer+".png>"
}

const winningConditions = [
    [0,1,2],[0,3,6],[0,4,8],[6,7,8],[3,4,5],[2,4,6],[1,4,7],[2,5,8]
];
function handleResultValidation() {
  let roundwon=false;
  for(let i=0;i<=7 ; i++){
    let winningCondition = winningConditions[i];
    let a = gameState[winningCondition[0]];
    let b = gameState[winningCondition[1]];
    let c = gameState[winningCondition[2]];
    if(a===""|| b===""|| c===""){
      continue;
    }if(a===b && b === c){
      roundwon= true;
      break;
    }
  }
  if (roundwon){
    statusDisplay.innerHTML =winningMessage();
    gameActive = false;
    return;
  }
  let roundDraw =! gameState.includes("");
  if(roundDraw){
    statusDisplay.innerHTML = drawMessage();
       gameActive = false;
       return;
  }
  handlePlayerChange();
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}
function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.gameboard1')
               .forEach(cell => cell.innerHTML = "");
}


document.querySelector('.game--restart').addEventListener('click', handleRestartGame);
