//Declare my DOMS
const game = document.getElementById('game')
const blocks = document.querySelectorAll('[data-block]')
const endgame = document.getElementById('gameend')
const endgametext = document.getElementById('gameendtext')
const resetbutton = document.getElementById('reset')

//Setting some important variables
let ai = 'easy'
let pvp = 'off'
let gamestate = 'active'
let playTurn = 'X'
let array = 
['','','',
'','','',
'','','']

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
array =['','','',
        '','','',
        '','','']
blocks.forEach(block => {
    block.addEventListener('click', handleClick, {once:true});
    block.innerText=''
})
gamestate = 'active'
playTurn = 'X'
endgame.classList.add('hide')
game.classList.remove('fade')
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
        } 
        else if (blocks[i].innerText == 'O'){
            array[i] = -1
        } else {
            array[i] = ''
        }
    }
}

//checks for a win
function winCheck () {
    //COLUMN
    console.log(array)
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

//logic for the reset button
resetbutton.addEventListener('click', restart)

//initial logic for our blocks and adds a "click" eventlistener for each of them
blocks.forEach(block => {
    block.addEventListener('click', handleClick, {once:true});
})

//logic for clicking on each block and placing X's and O's -> also calls upon our other functions
function handleClick (e) {
    const block = e.target
    block.innerText = `${playTurn}`
    stateCheck();
    console.log(playTurn)
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

    if (pvp === 'on'){
    changeTurn()
    }

    if (ai === 'easy' && gamestate === 'active'){
        console.log('easy move')
        aiEasy()
    }
}

//We make a new start screen asking to play locally vs ai. pvp, we run normally. vs ai we gate off changeturn//
//After our normal change turn, we make it so if ai is on, that it takes AI turn ->then it statechecks like normal and passes the turn if not won//
//Must make an "AIturn" function//

//Easy AI makes legal moves at random
function aiEasy(){
    let moveChoices = []
    changeTurn()
    for (let i=0;i<array.length;i++){
        if (array[i] === ''){
            moveChoices.push(i)
        }
    }

    if(moveChoices !== []){
    let randomPick = Math.floor(Math.random()*moveChoices.length)
    blocks[moveChoices[randomPick]].innerText = `${playTurn}`

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

    changeTurn()
    }
}
