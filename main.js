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
let tryesOfAI = 0;
// const robotThinking = setTimeout(function() {console.log(`${currentPlayers[currentTurn].name} desided`);},300);

let currentPlayerH2 = document.getElementById("currentPlayer");
// currentPlayerH2.addEventListener("onchange",function () {console.log("sdfsf");})


/*
 *  Changes a player: Human, Computer, or None
 */
function changePlayer() {
console.log("change player");
}
/*
 *  Start a game
 */
function runGame() {
    // makes all variables to 0;
    currentPlayers = [];
    currentSum = 0;
    // creates players
    for(i=1;i<=4;i++){
        let race = document.getElementById("player"+ i).value;
        if (race == "Human" || race == "Computer"){
            currentPlayers.push(createPlayer("Player" + i, race))
        }
    }
    //creates and arranges all divs on html
    arrangeDivs(currentPlayers.length);

    currentTurn = Math.floor(Math.random() * currentPlayers.length);
    console.log("currentTurn: ", currentPlayers[currentTurn].name);
}

function createPlayer(name, race){
    let player = {
        name: name,
        race: race,
        score: 0,
    }
    return player;
}

function createDivs(num){
    let
}
/*
 * Make a move
 */
function makeMove() {
    number = throwDice();
    if (number == 1) {
        eatScore(currentPlayers[currentTurn]);
        passTurn();
        return;
    }
    currentPlayers[currentTurn].currentThrows.push(number);
    currentSum += number;
    let espectedScore = currentPlayers[currentTurn].score + currentSum;
    console.log("score is: ", currentPlayers[currentTurn].score, " current score is: ", currentSum, " espectedScore = ", espectedScore);
    if (espectedScore >= goal) {
        gameOver(currentPlayers[currentTurn]);
    }
    return;
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
    currentPlayerH2.textContent = currentPlayers[currentTurn].race;

}

/*
 * Game over
 */
function gameOver() {
    // draws banner on html
    console.log(`Game over. ${currentPlayers[currentTurn].name} won!`);
    return;
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

function ifRobot(){
    console.log("robot");
    return true;
}
//------------------------------------------------------------------------------------

//creating variables for the correct x and y position to show the number.
let one = 'rotateX(900deg) rotateY(900deg)';
let two = 'rotateX(90deg) rotateY(990deg)';
let three = 'rotateX(540deg) rotateY(450deg)';
let four = 'rotateX(1080deg) rotateY(450deg)';
let five = 'rotateX(990deg) rotateY(90deg)';
let six = 'rotateX(1260deg) rotateY(720deg)';
//the program which base on the random number assign the correct coordinates to show the right cube pattern
let dice = () => {
    let playetDice = Math.floor(Math.random() * 6) + 1;
    switch (true) {
        case (playetDice == 1):
            cube.style.transform = `${one}`;
            break;
        case (playetDice == 2):
            cube.style.transform = `${two}`;
            break;
        case (playetDice == 3):
            cube.style.transform = `${three}`;
            break;
        case (playetDice == 4):
            cube.style.transform = `${four}`;
            break;
        case (playetDice == 5):
            cube.style.transform = `${five}`;
            break;
        case (playetDice == 6):
            cube.style.transform = `${six}`;
            break;
    };
};
//calling the roll a dice funtion onClick
document.getElementById('start').addEventListener('click', dice);