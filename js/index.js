const buttons = document.querySelectorAll('.controls button');
const display = document.querySelector('.display');
const winCounter = document.querySelector(".wins");
const drawCounter = document.querySelector(".draws");
const lossCounter = document.querySelector(".losses");

let playerSelection;
let computerSelection;
let playerWins = 0;
let playerLosses = 0;
let playerDraws = 0;

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        playerSelection = button.textContent.toLowerCase();
        computerSelection = computerPlay();
        playRound(playerSelection, computerSelection);
    })
})

function computerPlay() {
    let options = ['rock', 'paper', 'scissors'];
    let random = Math.floor(Math.random() * 3);
    return options[random];
}

function playerInput() {
    if (playerSelection == 'rock' || playerSelection == 'paper' || playerSelection == 'scissors') {
            return playerSelection;
    } else {
        return 'playerInputError';
    }
}

function playRound(playerSelection, computerSelection) {
    const winTest = (playerSelection == 'rock' && computerSelection == 'scissors') ||
                        (playerSelection == 'paper' && computerSelection == 'rock') ||
                        (playerSelection == 'scissors' && computerSelection == 'paper');

    const inputErrorMessage = 'Player input was not valid';
    const drawMessage = 'It\'s a draw! You both chose ' + computerSelection + '\n';
    const loseMessage = 'You lose! ' + computerSelection + ' beats ' + playerSelection + '\n';
    const winMessage = 'You win! ' + playerSelection + ' beats ' + computerSelection + '\n';
    let message = document.createElement('span');

    if (winTest) {
        message.textContent = winMessage;
        display.append(message);
        playerWins++;
        winCounter.textContent = `Wins: ${playerWins}`;
        winCheck();
    } else if (playerSelection == computerSelection) {
        message.textContent = drawMessage;
        display.append(message);
        playerDraws++;
        drawCounter.textContent = `Draws: ${playerDraws}`;
        winCheck();
    } else if (playerSelection == 'playerInputError') {
        console.log(inputErrorMessage);
    } else {
        message.textContent = loseMessage;
        display.append(message);
        playerLosses++;
        lossCounter.textContent = `Losses: ${playerLosses}`;
        winCheck();
    }
}

function winCheck() {
    if (playerWins == 5) {
        alert('You win this game with ' + playerWins + ' wins!');
        resetScore();
    } else if (playerLosses == 5) {
        alert('You lose this game with ' + playerLosses + ' losses!')
        resetScore();
    }

    function resetScore() {
        playerDraws = 0;
        drawCounter.textContent = `Draws: ${playerDraws}`;
        playerWins = 0;
        winCounter.textContent = `Wins: ${playerWins}`;
        playerLosses = 0;
        lossCounter.textContent = `Losses: ${playerLosses}`;
    }
}