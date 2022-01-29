/*
 *  Create all Players
 */
let player1 = {
    name: "Luke Skywalker",
    picture: "",
    race: "Human",
    score: 0,
    currentThrows: []
}

let player2 = {
    name: "Leia Organa",
    picture: "",
    race: "Human",
    score: 0,
    currentThrows: []
}

let player3 = {
    name: "R2-D2",
    picture: "",
    race: "Robot",
    score: 0,
    currentThrows: []
}

let player4 = {
    name: "C-3PO",
    picture: "",
    race: "Robot",
    score: 0,
    currentThrows: []
}

let currentPlayers = [];
let currentTurn = 0; // index of array "currentPlayers"
let currentSum = 0;
let number = 0;
const goal = 30;

/* AI strategy variables */
const recommendedThrows = 4;
const scoreToStop = 15;
const scoreToContinue = 5;
// const robotThinking = setTimeout(function() {console.log(`${currentPlayers[currentTurn].name} desided`);},300);


/*
 *  Start a game
 */
function runGame() {
    currentSum = 0;
    //currentPlayers.push(player1); //temp
    //currentPlayers.push(player2); //temp
    currentPlayers.push(player3); //temp
    currentPlayers.push(player4); //temp

    currentPlayers.forEach(player => player.score = 0); 


    //gets every player according buttons on form and appends them to array "currentPlayers"
    //creates and arranges all divs on html
    // console.log("start!"); temporary
    currentTurn = Math.floor(Math.random() * currentPlayers.length); //temporary
    console.log("currentTurn: ", currentPlayers[currentTurn].name);
    if (currentPlayers[currentTurn].race == "Robot") {
        strategyAI();
    }
}

/*
 *  Pass a turn
 */
function passTurn() {
    currentPlayers[currentTurn].score += currentSum;
    currentSum = 0;
    if (currentTurn < currentPlayers.length - 1)
        currentTurn++;
    else
        currentTurn = 0;
    // setActivePlayer(currentTurn); need to draw point of frames on html
    console.log("currentTurn: ", currentPlayers[currentTurn].name);
    if (currentPlayers[currentTurn].race == "Robot") {
        strategyAI();
    }
}

/*
 *  Make a turn
 */
function throwDice() {
    // rolling animation
    let number = Math.ceil(Math.random() * 6);
    console.log("Dice shows: ", number);
    return number;
}

/*
 *  Pig eats current score in case number equal one
 */
function eatScore(player) {
    currentSum = 0;
    player.currentThrows = [];
    console.log("current score eaten: ")
}

/*
 * Make a move
 */
function makeMove() {
    number = throwDice();
    // console.log(`test`);//temp
    if (number == 1) {
        eatScore(currentPlayers[currentTurn]);
        passTurn();
        return number;
    }
    currentPlayers[currentTurn].currentThrows.push(number);
    currentSum += number;
    let espectedScore = currentPlayers[currentTurn].score + currentSum;
    console.log("score is: ", currentPlayers[currentTurn].score, " current score is: ", currentSum, " espectedScore = ", espectedScore);
    if (espectedScore >= goal) {
        gameOver(currentPlayers[currentTurn]);
    }
    return number;
}


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

/*
 * Game over
 */
function gameOver() {
    // draws banner on html
    console.log(`Game over. ${currentPlayers[currentTurn].name} won!`);
    return;
}

function computerThinking(){
    // pseudo func
    console.log("hi");
    return;
}


function printGlobalScore(){
    let score = currentPlayers.map(player => player.score);
    console.log("Global score: ", score);
}















