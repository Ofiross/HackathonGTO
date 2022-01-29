let currentPlayers = [];
let currentTurn = 0; // index of array "currentPlayers"
let currentSum = 0;
let number = 0;
const goal = 10;

/* AI strategy variables */
const recommendedThrows = 4;
const scoreToStop = 15;
const scoreToContinue = 5;
let tryesOfAI = 0;
/****************************************************************************************************************** */
/*
 *  Start a game
 */
function runGame() {
    // makes all variables to 0;
    currentPlayers = [];
    currentSum = 0;
    // creates players
    for (i = 1; i <= 4; i++) {
        let race = document.getElementById("player" + i + "_choise").value;
        switch (Number(race)) {
            case 1:
                currentPlayers.push(createPlayer("Player" + i, "human"))
                break;
            case 2:
                currentPlayers.push(createPlayer("Player" + i, "computer"))
                break;
        }
    }
    arrangeDivs(currentPlayers.length);//creates and arranges all divs on html
    //shows/hides buttons
    document.getElementById("playerchoise").style.display = "none";
    document.getElementById("startgame").style.display = "none";
    document.getElementById("roll").style.display = "";
    document.getElementById("passturn").style.display = "";
    //make active-player
    currentTurn = Math.floor(Math.random() * currentPlayers.length);
    console.log("currentTurn: ", currentPlayers[currentTurn].name);
    makeActive();
}

function createPlayer(name, race) {
    let player = {
        name: name,
        race: race,
        score: 0,
        currentThrows: []}
    return player;
}

function arrangeDivs(num) {
    let playerContainers = document.getElementsByClassName("player-container");
    if (num < 4)
        playerContainers[3].style.display = "none";
    else
        playerContainers[3].style.display = "";
    if (num < 3)
        playerContainers[2].style.display = "none";
    else
        playerContainers[2].style.display = "";


}

function makeActive() {
    active = document.getElementsByClassName("player-container")[currentTurn];
    for (pl of document.getElementsByClassName("player-container"))
        pl.classList.remove("player-active");
    active.classList.add("player-active");
}

/*
 * Make a move
 */
function makeMove() {
    number = throwDice();
    if (number == 1) {
        eatScore(currentPlayers[currentTurn]);
        setTimeout(updateScore, 2500, 0);
        passTurn();
        return;
    }
    currentPlayers[currentTurn].currentThrows.push(number);
    currentSum += number;
    let espectedScore = currentPlayers[currentTurn].score + currentSum;
    console.log("score is: ", currentPlayers[currentTurn].score, " current score is: ", currentSum, " espectedScore = ", espectedScore);
    //update score
    setTimeout(updateScore, 2500, espectedScore);
    if (espectedScore >= goal) {
        gameOver(currentPlayers[currentTurn]);
    }
    return;
}

function updateScore(espectedScore){
    document.querySelector(".player-active #player1Current").textContent = currentSum;
    document.querySelector(".player-active #player1Total").textContent = espectedScore;
}

/*
 *  Throws dice
 */
function throwDice() {
    document.getElementById('passturn').disabled = true;
    document.getElementById('roll').disabled = true;
    let number = Math.ceil(Math.random() * 6);
    // rolling animation
    dice(number);
    console.log("Dice shows: ", number);
    setTimeout(activateButtons, 2500);
    return number;
}

function activateButtons(){
    document.getElementById("roll").disabled = false;
    document.getElementById("passturn").disabled = false;
}
/*
 *  Pig eats current score in case number equal one
 */
function eatScore(player) {
    currentSum = 0;
    document.querySelector(".player-active #player1Total").textContent = currentPlayers[currentTurn].score;
    player.currentThrows = [];
    console.log("current score eaten");
    // <---- animation / voice of defeat
}

/*
 *  Pass a turn
 */
function passTurn() {
    currentPlayers[currentTurn].score += currentSum;
    document.querySelector(".player-active #player1Current").textContent = 0;
    currentSum = 0;
    if (currentTurn < currentPlayers.length - 1)
        currentTurn++;
    else
        currentTurn = 0;
    console.log("currentTurn: ", currentPlayers[currentTurn].name);
    makeActive();
}

/*
 * Game over
 */
function gameOver() {
    // draws banner on html
document.querySelector("#header>h1").textContent = `Game over. ${currentPlayers[currentTurn].name} won!`;
    console.log(`Game over. ${currentPlayers[currentTurn].name} won!`);
    document.getElementById("roll").disabled = true;
    document.getElementById("passturn").disabled = true;
    return;
}

/*
 * New Game
 */
function newGame() {
    arrangeDivs(4);
    //shows/hides buttons
    document.getElementById("playerchoise").style.display = "";
    document.getElementById("startgame").style.display = "";
    document.getElementById("roll").style.display = "none";
    document.getElementById("passturn").style.display = "none";
    //make active-player
    for (player of document.querySelectorAll(".player-container")){
        player.classList.remove("player-active");
    }
    document.querySelectorAll(".currentscore").forEach(item => item.textContent = "current score: ");
    document.querySelectorAll(".totalscore").forEach(item => item.textContent = "total score: ");
    document.querySelector("#header>h1").textContent = "Piggies - A game of chance and greed";
}



//------------------------------------------------------------------------------------------------
/*
 * AI strategy
 */
function strategyAI() {
    for (let t = 0; t <= recommendedThrows; t++) {

        makeMove();
        if (currentSum >= scoreToStop) {
            console.log(`${currentPlayers[currentTurn].name} prefers to pass`);
            passTurn();
            return;
        }
        else if (number == 1) {
            return;
        }
        else if ((currentPlayers[currentTurn].score + currentSum) >= goal) {
            // console.log(`${currentEePlayers[currentTurn].name} happy.`);
            return;
        }
        // else {
        //     let chance = Math.random();
        //     console.log(chance)
        //     if ((t == recommendedThrows) &&  (chance < 0.95 )) { // one more try             ( currentSum <= scoreToContinue) ||
        //     console.log("one more try");
        //     t--;}
        //}
    }
}

function moveOfAI() {
    if (tryesOfAI >= recommendedThrows || currentSum >= scoreToStop) {
        console.log(`${currentPlayers[currentTurn].name} prefers to pass`);
        passTurn();
        tryesOfAI = 0;
        return;
    }
    number = throwDice();
    tryesOfAI++;
    if (number == 1) {
        eatScore(currentPlayers[currentTurn]);
        tryesOfAI = 0;
        passTurn();
        return;
    }
    currentPlayers[currentTurn].currentThrows.push(number);
    currentSum += number;
    let espectedScore = currentPlayers[currentTurn].score + currentSum;
    console.log("score is: ", currentPlayers[currentTurn].score, " current score is: ", currentSum, " espectedScore = ", espectedScore);

    if (espectedScore >= goal) {
        gameOver(currentPlayers[currentTurn]);
        return
    }
}

function ifRobot() {
    console.log("robot");
    return true;
}
//------------------------------------------------------------------------------------

// program to roll a dice to show at the end the random number
let cube = document.getElementById('gameCube');

//creating variables for the correct x and y position to show the number.
let one = 'rotateX(900deg) rotateY(900deg)';
let two = 'rotateX(90deg) rotateY(990deg)';
let three = 'rotateX(540deg) rotateY(450deg)';
let four = 'rotateX(1080deg) rotateY(450deg)';
let five = 'rotateX(990deg) rotateY(90deg)';
let six = 'rotateX(1260deg) rotateY(720deg)';



//the program which base on the random number assign the correct coordinates to show the right cube pattern
let dice = (number) => {
    switch (number) {
        case 1:
            cube.style.transform = `${one}`;
            break;
        case 2:
            cube.style.transform = `${two}`;
            break;
        case 3:
            cube.style.transform = `${three}`;
            break;
        case 4:
            cube.style.transform = `${four}`;
            break;
        case 5:
            cube.style.transform = `${five}`;
            break;
        case 6:
            cube.style.transform = `${six}`;
            break;
    };
};
