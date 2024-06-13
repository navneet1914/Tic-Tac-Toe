const boxes = document.querySelectorAll('.box');
const gameInfo = document.querySelector('.game-info');
const newGameBtn = document.querySelector('.btn');

let currentPlayer;
let gameGrid; //tells the current status of the game (it will be an array)

const winningPositions = [
    // horizontal
    [0,1,2],
    [3,4,5],
    [6,7,8],
    // vertical
    [0,3,6],
    [1,4,7],
    [2,5,8],
    // diagonal
    [0,4,8],
    [2,4,6]
]

//lets create a funcn to inititalise the game-->
function initGame(){
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];  //initial condn k andr empty rhega n grid
    // UI pe empty v krna pdega boxes ko
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        
        //initialise kr dia boxes k saare CSS property ko taaaki koi dikkt nai aae khaas kr k new game press krne pe bg color jo yellow h vo remove ho jaae
        box.classList = `box box${index+1}`; //sabhi boxes pe box and box1 ki css property apply kr di bss
    })
    newGameBtn.classList.remove('active');
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
initGame();


// harr ek box pe for each loop k madad se click wala event listener lgaya
//See copy
boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        handleClick(index); // handleClick funcn k andr index eslie pass kr re h taaki pta chl paae kaun se box pe click hua h
    });
});

function handleClick(index){
   if(gameGrid[index] === ""){  //agr jis box pe click kia h vo empty h tbhi baat aage badhegi wrna nai
      boxes[index].innerText = currentPlayer; //UI pe reflect krwaega
      gameGrid[index] = currentPlayer; //inner logic me change ko store krega taaki ye unclickable ho jaae
      boxes[index].style.pointerEvents = "none";

      //Swap kro turn ko
      swapTurn();
      //check koi jeet to ni gya
      checkGameOver();
   }
}

function swapTurn(){
    if (currentPlayer === "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }

    //Updating UI
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

// the best function of this project
function checkGameOver(){
   let answer = "";
   winningPositions.forEach((position) => { //hrr ek position k andr 3 values h. harr ek values kaise niklega -- position[0], position[1], position[2]
    //all boxes should be non-empty and exactly equal
      if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
    && (gameGrid[position[0]] === gameGrid[position[1]]) 
    && (gameGrid[position[1]] === gameGrid[position[2]])
      ){
         //check if winner is X
         if(gameGrid[position[0]] === "X")
            answer = "X";
        else 
        answer = "O";
    // disable the pointer events-- eslie kia qki jb koi jeet gya h to aage click hi ni krne denge jisse dusre waale ko mauka na mile click krne ka aur vo jeet jaae
    boxes.forEach ((box) => {
        box.style.pointerEvents = "none";
    })


    // now we know X/O is a winner. Now, we have to mark the winner boxes with yellow color to show them the winner

      boxes[position[0]].classList.add('win');
      boxes[position[1]].classList.add('win');
      boxes[position[2]].classList.add('win');
      }

   }); 

   if(answer !== "" ) //agr ans non empty hai mtlb ye hua ki clear winner hmare paas h
    {
     gameInfo.innerText = `Winner Player - ${answer}`;
     newGameBtn.classList.add('active');
     return
    } 

    // Let's check whether there is tie -- there is no winner
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "") {
            fillCount++;
        }
    });

    // agr sare k sare dabbe is non empty then fillcount = 9; 
    // board is filled.. then game is tie

    if(fillCount === 9){
        gameInfo.innerText = `Game Tie`;
        newGameBtn.classList.add('active');
    }
}


newGameBtn.addEventListener('click', initGame);