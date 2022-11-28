const game = document.getElementById('game')
const blocks = document.querySelectorAll('[data-block]')
const endgame = document.getElementById('gameend')
const endgametext = document.getElementById('gameendtext')
const resetbutton = document.getElementById('reset')

let playTurn = 'X'
let array = ['','','',
             '','','',
             '','','']



function inactive () {
    blocks.forEach(block => {
        block.removeEventListener('click', handleClick);
    })
    game.classList.add('fade')
}

function restart (){
array =['','','',
        '','','',
        '','','']
blocks.forEach(block => {
    block.addEventListener('click', handleClick, {once:true});
    block.innerText=''

}
)
endgame.classList.add('hide')
game.classList.remove('fade')}

function changeTurn() {
    if (playTurn == 'X'){
        playTurn = 'O'
    } else {
        playTurn = 'X'
    }
}


function stateCheck () {
    //need to get a flat array of the current results
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

resetbutton.addEventListener('click', restart)
blocks.forEach(block => {
    block.addEventListener('click', handleClick, {once:true});
})

function handleClick (e) {
    const block = e.target
    block.innerText = `${playTurn}`
    stateCheck();
    if (winCheck()){
        endgame.classList.remove("hide")
        endgametext.innerText = `GAME OVER! ${playTurn} WINS!`
        inactive();
    }
    changeTurn()
}

