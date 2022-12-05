//Declare my DOMS
const game = document.getElementById('game')
const blocks = document.querySelectorAll('[data-block]')
const endgame = document.getElementById('gameend')
const endgametext = document.getElementById('gameendtext')
const resetbutton = document.getElementById('reset')
const titlebutton = document.getElementById('title')
const difficulty = document.querySelectorAll('[data-difficulty]')
const startscreen = document.getElementById('start')

//Setting some important variables
let ai;
let gamestate = 'active'
let playTurn = 'X'
let playerLetter = 1
let aiLetter = -1

array =[0,0,0,
        0,0,0,
        0,0,0]
        valuenetwork = [2,1,2,
                        1,3,1,
                        2,1,2]
//inactivates the game and makes it non-interactable.
function inactive () {
    blocks.forEach(block => {
        block.removeEventListener('click', handleClick);
    })
    game.classList.add('fade')
    gamestate = 'inactive'
}

//restarts the game from its inactive state
function restart (){
array =[0,0,0,
        0,0,0,
        0,0,0]
valuenetwork = [2,1,2,
                1,3,1,
                2,1,2]
blocks.forEach(block => {
    block.addEventListener('click', handleClick, {once:true});
    block.innerText=''
})
gamestate = 'active'
playTurn = 'X'
endgame.classList.add('hide')
game.classList.remove('fade')
}

function backToTitle () {
game.classList.add('hide')
game.classList.remove('fade')
endgame.classList.add('hide')
startscreen.classList.remove('hide')
}

//changes the turn from X to O
function changeTurn() {
    if (playTurn == 'X'){
        playTurn = 'O'
    } else {
        playTurn = 'X'
    }
}

//checks for ties (if the array = 9, then its full)
function tieCheck(){
    let total = 0
    for (let i = 0; i<array.length;i++){
        total += Math.abs(array[i])
    } 
    if (total === 9){
        return true
    }
}

//updates the current array depending on the inner-text of the blocks
function stateCheck () {
    for (let i=0;i<blocks.length;i++){
        if (blocks[i].innerText == 'X'){
            array[i] = 1
            valuenetwork[i] = 0
        } 
        else if (blocks[i].innerText == 'O'){
            array[i] = -1
            valuenetwork[i] = 0
        } else {
            array[i] = 0
        }
    }
}

//checks for a win
function winCheck () {
    //COLUMN
    for (let i = 0; i<3; i++){
        if ((Math.abs(array[i] + array[i+3] + array[i+6])) === 3 && array[i] === array[i+3] && array[i+3] === array[i+6]){
            return true
        }}
    //ROWS
    for (let i = 0; i<9; i+=3){
        if ((Math.abs(array[i] + array[i+1] + array[i+2])) === 3 && array[i] === array[i+1] && array[i+1] === array[i+2]){
            return true
        }
    }
    //DIAGS
        if((Math.abs(array[0]+array[4]+array[8])) === 3 && array[0] === array[4] && array[4] === array[8]){
            return true
        } 
        if((Math.abs(array[2]+array[4]+array[6])) === 3 && array[2] === array[4] && array[4] === array[6]){
            return true
        }
} 

function almostWin () {
    for (let i = 0; i<3; i++){
        if (((Math.abs(array[i] + array[i+3] + array[i+6])) === 2) && (array[i] === array[i+3] || array[i+3] === array[i+6] || array[i] === array[i+6])){
            if (array[i] === aiLetter || array[i+3] === aiLetter){
            valuenetwork[i] = '11'
            valuenetwork[i+3] = '11'
            valuenetwork [i+6] = '11'
            console.log('almost a column!') 
            } else {
            valuenetwork[i] = '10'
            valuenetwork[i+3] = '10'
            valuenetwork [i+6] = '10'
            console.log('almost a column!')
            }
        }
    }
    //ROWS
    for (let i = 0; i<9; i+=3){
        if (((Math.abs(array[i] + array[i+1] + array[i+2])) === 2) && (array[i] === array[i+1] || array[i+1] === array[i+2] || array[i] === array[i+2])){
            if (array[i] === aiLetter || array[i+1] === aiLetter){
            valuenetwork[i] = '11'
            valuenetwork[i+1] = '11'
            valuenetwork[i+2] = '11'
            console.log('almost a row!')
            } else {
            valuenetwork[i] = '10'
            valuenetwork[i+1] = '10'
            valuenetwork[i+2] = '10'
            console.log('almost a row!')
            }
        }
    }
    //DIAGS
        if(((Math.abs(array[0]+array[4]+array[8])) === 2) && (array[0] === array[4] || array[4] === array[8] || array[0] === array[8])){
            if (array[0] === aiLetter || array[4] === aiLetter){
            valuenetwork[0] = '11'
            valuenetwork[4] = '11'
            valuenetwork[8] = '11'
            console.log('almost a diag!')
            } else {
            valuenetwork[0] = '10'
            valuenetwork[4] = '10'
            valuenetwork[8] = '10'
            console.log('almost a diag!')
            }
        } 
        if((parseInt((Math.abs(array[2]+array[4]+array[6]))) === 2) && (array[2] === array[4] || array[4] === array[6] || array[2] === array[6])){
            if (array[2] === aiLetter || array[4] === aiLetter){
            valuenetwork[2] = '11'
            valuenetwork[4] = '11'
            valuenetwork[6] = '11'
            console.log('almost a diag!')  
            } else {
            valuenetwork[2] = '10'
            valuenetwork[4] = '10'
            valuenetwork[6] = '10'
            console.log('almost a diag!')
            }
        }
} 

//logic for the reset button
resetbutton.addEventListener('click', restart)
titlebutton.addEventListener('click', backToTitle)

//initial logic for our blocks and adds a "click" eventlistener for each of them
blocks.forEach(block => {
    block.addEventListener('click', handleClick, {once:true});
})

difficulty.forEach(mode => {
    mode.addEventListener('click', startGame)
})

//logic for clicking on each block and placing X's and O's -> also calls upon our other functions
function handleClick (e) {
    const block = e.target
    block.innerText = `${playTurn}`
    stateCheck();
    if (winCheck()){
        endgame.classList.remove("hide")
        endgametext.innerText = `GAME OVER! ${playTurn} WINS!`
        inactive();
    }
    if (tieCheck() && gamestate === 'active'){
        endgame.classList.remove("hide")
        endgametext.innerText = `GAME OVER! It's a Draw!`
        inactive();
    }
    if (ai === 'pvp' && gamestate === 'active'){
        changeTurn()
    }
    if (ai === 'easy' && gamestate === 'active'){
        console.log('easy move')
        aiEasy()
    }
    if (ai === 'impossible' && gamestate === 'active'){
        console.log('optimal move')
        aiImpossible()
    }
}

function startGame (e) {
    const button = e.target
    ai = button.innerText.toLowerCase()
    startscreen.classList.add("hide")
    game.classList.remove("hide")
    restart()
    console.log(ai)
}


//We make a new start screen asking to play locally vs ai. pvp, we run normally. vs ai we gate off changeturn//
//After our normal change turn, we make it so if ai is on, that it takes AI turn ->then it statechecks like normal and passes the turn if not won//
//Must make an "AIturn" function//

//Easy AI makes legal moves at random
function aiEasy(){
    //Deciding its move at random from empty spaces
    let moveChoices = []
    changeTurn()
    for (let i=0;i<array.length;i++){
        if (array[i] === 0){
            moveChoices.push(i)
        }
    }
    //Changes the DOM to reflect the move the AI picks
    if(moveChoices !== []){
    let randomPick = Math.floor(Math.random()*moveChoices.length)
    blocks[moveChoices[randomPick]].innerText = `${playTurn}`
    blocks[moveChoices[randomPick]].removeEventListener('click',handleClick) //Debugged, used to be able to click a computer move and overwrite it.
    //Updating the board array and checking for wins
    stateCheck()
    if (winCheck()){
        endgame.classList.remove("hide")
        endgametext.innerText = `GAME OVER! ${playTurn} WINS!`
        inactive();
    }
    if (tieCheck() && gamestate === 'active'){
        endgame.classList.remove("hide")
        endgametext.innerText = `GAME OVER! It's a Draw!`
        inactive();
    }
    //Changing over the turn
    changeTurn()
    }
}

function aiImpossible(){
    //Deciding its move at random from empty spaces
    let moveChoices = []
    changeTurn()
    almostWin()
    //I want it to pick the moves with the maximum of valuenetwork
    for (let i=0;i<array.length;i++){
        if (array[i] === 0 && valuenetwork[i] == (Math.max(...valuenetwork))){
            moveChoices.push(i)
        }
}
    //Changes the DOM to reflect the move the AI picks
    if(moveChoices !== []){
    let randomPick = Math.floor(Math.random()*moveChoices.length)
    blocks[moveChoices[randomPick]].innerText = `${playTurn}`
    blocks[moveChoices[randomPick]].removeEventListener('click',handleClick) //Debugged, used to be able to click a computer move and overwrite it.
    //Updating the board array and checking for wins
    stateCheck()
    if (winCheck()){
        endgame.classList.remove("hide")
        endgametext.innerText = `GAME OVER! ${playTurn} WINS!`
        inactive();
    }
    if (tieCheck() && gamestate === 'active'){
        endgame.classList.remove("hide")
        endgametext.innerText = `GAME OVER! It's a Draw!`
        inactive();
    }
    //Changing over the turn
    changeTurn()
    }
}






