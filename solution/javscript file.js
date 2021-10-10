let gameScreen =document.getElementById('game');
let charecter = document.getElementById('charecter');
let block = document.getElementById('block');
let startButton = document.querySelector('#opening-scene button');
let restartButton = document.querySelector('#closing-scene button');
let score = document.getElementById('score');
let finalScore = document.querySelector('.final-score');
let upperBlock = document.getElementById('upper-block');
charecter.style.height = '50px'
charecter.style.width = '20px'
block.hidden = true;
restartButton.hidden = true;
gameScreen.hidden = true;
finalScore.hidden = true;


//upper block intilazation function
let upperBlockSpeed = 5;
function upperBlockStart() {
    upperBlock.style = `animation: block ${upperBlockSpeed * 1000}ms linear infinite;`
    setInterval(() => {
        let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
        let upperBlockLeft = parseInt(window.getComputedStyle(upperBlock).getPropertyValue("left"));
        if(upperBlockLeft === blockLeft){
            upperBlock.style.animation = '';
            upperBlock.style = `animation: block 1.5s linear infinite;`
        }
        console.log(upperBlock.style.animation);
    }, 1);
}

//score count function
scoreCount = () => {
    score.value = (Number(score.value) + 1);
}
scoreInterval = setInterval(scoreCount, 100);
//charecter jump function
function jump(){
    if(charecter.classList != 'animate'){
        charecter.classList.add('animate');
        setTimeout(function(){
            charecter.classList.remove('animate');
        }, 500)
    }
}
let checkDead = setInterval(function(){
    let charecterTop = parseInt(window.getComputedStyle(charecter).getPropertyValue("top"));
    let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    let upperBlockLeft = parseInt(window.getComputedStyle(upperBlock).getPropertyValue("left"));
    if((blockLeft < 20 && blockLeft > 0 && charecterTop >= 130) || (upperBlockLeft < 20 && upperBlockLeft > -20 && charecterTop <= 110)){
        block.style.animation = "none";
        block.style.display = "none";
     
        restartButton.hidden = false;
        clearInterval(scoreInterval);
        finalScore.innerHTML = `Game Over <br> final score: ${score.value}`
        finalScore.hidden = false;
        upperBlockStart = '';
        upperBlock.hidden = true;
    }
},10)
// game start function
function startGame(e){
    score.value = 0;
    startButton.hidden = true;
    block.hidden = false;
    gameScreen.hidden = false;
    document.addEventListener('click', jump);
    scoreInterval;
    setTimeout(upperBlockStart, 3500);
}
startButton.addEventListener('click', startGame);

function restartGame(){
    window.location.reload();
}
restartButton.addEventListener('click', restartGame);