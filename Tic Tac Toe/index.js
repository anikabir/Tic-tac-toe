const tiles = document.querySelectorAll(".tile");
const Player_X = 'X';
const Player_O = 'O';

let turn = Player_X;

const boardState = Array(tiles.length);
boardState.fill(null);

//elements
const strike = document.getElementById("strike");
const gameOverArea = document.getElementById("game-over-area");
const gameOverText = document.getElementById("game-over-text"); 
const playAgain = document.getElementById("play-again");
playAgain.addEventListener("click", startNewGame);

const gameOverSound = new Audio('sounds/game_over.wav');
const clickSound = new Audio('sounds/click.wav');

tiles.forEach(tile=>tile.addEventListener('click', tileClick));

function setHovertext(){
    //remove all hover text
    tiles.forEach(tile=>{
        tile.classList.remove('x-hover');
        tile.classList.remove('o-hover');
    });

    const hoverClass = `${turn.toLowerCase()}-hover`;
  
    tiles.forEach(tile=>{
        if(tile.innerText == ''){
            tile.classList.add(hoverClass);
        }
    });
}

setHovertext();

function tileClick(event){
    if(gameOverArea.classList.contains('visible')){
        return;
    }

    const tile = event.target;
    const tileNumber = tile.dataset.index;
    if(tile.innerText != ''){
        return;
    }

    if(turn === Player_X){
        tile.innerText = Player_X;
        boardState[tileNumber-1] = Player_X;
        turn = Player_O;
    }
    else{
        tile.innerText = Player_O;
        boardState[tileNumber-1] = Player_O;
        turn = Player_X;
    }

    clickSound.play();
    setHovertext();
    checkWinner();
}

function checkWinner(){
    //check for winner
    for(const winningCombination of winningCombinations){
        //obj destructuring
        const {combo, strikeClass} = winningCombination;
        const tielValue1 = boardState[combo[0]-1];
        const tielValue2 = boardState[combo[1]-1];
        const tielValue3 = boardState[combo[2]-1];

        if(tielValue1 != null && tielValue1 === tielValue2 && tielValue1 === tielValue3){
            strike.classList.add(strikeClass);
            gameOverScreen(tielValue1);
        }
    }
    //check for draw
    const allTileFilledIn = boardState.every((tile)=> tile !== null);
    if(allTileFilledIn){
        gameOverScreen(null);
    }
    }


function gameOverScreen(winnerText){
    let text = 'Draw!';
    if(winnerText != null){
        text=`Winner is ${winnerText}!`;
    }
    gameOverArea.className = 'visible';
    gameOverText.innerText = text; 
    gameOverSound.play();
}

function startNewGame(){
    strike.className = 'strike';
    gameOverArea.className = 'hidden';
    boardState.fill(null);
    tiles.forEach((tile)=> tile.innerText = '');
    turn = Player_X;
    setHovertext();
}

const winningCombinations = [
    //rows
    {combo:[1,2,3], strikeClass: 'strike-row-1'},
    {combo:[4,5,6], strikeClass: 'strike-row-2'},
    {combo:[7,8,9], strikeClass: 'strike-row-3'},
    //colums
    {combo:[1,4,7], strikeClass: 'strike-col-1'},
    {combo:[2,5,8], strikeClass: 'strike-col-2'},
    {combo:[3,6,9], strikeClass: 'strike-col-3'},
    //diagonals
    {combo:[1,5,9], strikeClass: 'strike-diagonal-1'},
    {combo:[3,5,7], strikeClass: 'strike-diagonal-2'},
]