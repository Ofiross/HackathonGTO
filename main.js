// program to roll a dice to show at the end the random number
let cube = document.getElementById('cube');

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
document.getElementById('rollBtn').addEventListener('click', dice);