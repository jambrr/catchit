var game = {
    round: 0,
    player1: 0,
    player2: 0,
    time: 14,
    steps: 25
}
var box = document.querySelector('.box');
var playground = document.getElementById('playground');
var counter = document.querySelector('.timer span.counter');
var timeOutCounter;
var gameTime = 15;
var counterInterval;
var timeoutTime = 15;

function onBoxClick(){
    game.player1++;
    alert("You win");
    nextRound();
}
function timeOut(){
    clearTimeout(timeOutCounter); //clear Timeout
    clearInterval(counterInterval); //clear Interval

    counterInterval = setInterval(function(){
        counter.innerHTML = --gameTime;
        
        if(gameTime <= 15){
            counter.style.color = '#229954';
        }if(gameTime <= 10){
            counter.style.color = '#F1C40F';
        }if(gameTime <= 5){
            counter.style.color = '#C0392B';
        }
        if(gameTime <= 3){
            counter.style.color = '#D71212';
        }
    }, 1000);
    timeOutCounter = setTimeout(function(){
        game.player2++;
        alert("You lost");
        nextRound();
    }, timeoutTime*1000);
}
function nextRound(){
    var boxSize;
    document.querySelector(".round").innerHTML = game.round;
    document.querySelector(".wins").innerHTML = game.player1;
    document.querySelector(".losts").innerHTML = game.player2;
    var round = ++game.round;
    if(round == 1){
        boxSize = '75px';
        game.steps += 25;
    }else if(round == 2){
        boxSize = '50px';
        game.steps += 25;
    }else if(round == 3){
        boxSize = '25px';
        game.steps += 25;
    }else if(round == 4){
        boxSize = '15px';
        game.steps += 25;
    }else if(round == 5){
        boxSize = '10px';
        game.steps += 25;
    }else{
        stopGame();
    }
    box.style.height = boxSize;
    box.style.width = boxSize;
    counter.style.color = '#233142';
    gameTime = 15;
    timeOut();
}
function moveBox(e){
    var x = parseInt(box.style.left);
    var y = parseInt(box.style.top);
    var halfsize = parseInt(box.style.width)/2;
    var stepX = game.steps, stepY = game.steps;
    switch(e.code){
        case "KeyW":
            y -= stepY;
        break;
        case "KeyA":
            x -= stepX;
        break;
        case "KeyS":
            y += stepY;
        break;
        case "KeyD":
            x += stepX;
        break;
        case "ArrowUp":
            y -= stepY;
        break;
        case "ArrowLeft":
            x -= stepX;
        break;
        case "ArrowDown":
            y += stepY;
        break;
        case "ArrowRight":
            x += stepX;
        break;
    }

    if(x+halfsize > playground.clientWidth || x-halfsize < 0 || y-halfsize < 0 || y+halfsize > playground.clientHeight){

    }else{
        box.style.left = x + "px";
        box.style.top = y + "px";
    }
}
function begin(){ //start the game
    document.querySelector("#playground div.resultBox span.resultText").style.visibility = 'hidden';
    document.querySelector("#playground div.resultBox").style.visibility = 'hidden';
    box.style.left = playground.clientWidth / 2 + "px";
    box.style.top = playground.clientHeight / 2 + "px";
    window.innerHeight = 100;
    window.innerWidth = 100;
    game.round = 0;
    nextRound();
}
function stopGame(){ //Stop the game
    var result;
    box.style.left = playground.clientWidth / 2 + "px";
    box.style.top = playground.clientHeight / 2 + "px";
    game.round = 0;
    game.player1 = 0;
    game.player2 = 0;
    clearTimeout(timeOutCounter);
    clearInterval(counterInterval);
    if(game.player1 < game.player2){
        result = "Player 2 won";
    }else if(game.player1 > game.player2){
        result = "Player 1 won";
    }
    document.querySelector("#playground div.resultBox").innerHTML = "<span class='resultText'>"+result+"</span>";
    document.querySelector("#playground div.resultBox").style.visibility = 'visible';
    document.querySelector("#playground div.resultBox span.resultText").style.visibility = 'visible';
}

//Init

box.addEventListener('click', onBoxClick);
window.addEventListener('keydown', moveBox);
document.getElementById("startGameBtn").addEventListener('click', begin);
