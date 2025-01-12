// Selecting elements from the DOM
const choices = document.querySelectorAll(".choice");
const resultDisplay = document.querySelector(".game-result");
const playerScoreDisplay = document.getElementById("player-score");
const computerScoreDisplay = document.getElementById("computer-score");
const resetButton = document.querySelector(".reset-button");

let playerScore = 0;
let computerScore = 0;

// Game rules: What beats what
const gameRules = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};

// Handling player's choice click
choices.forEach(choice => {
  choice.addEventListener("click", () => {
    const playerChoice = choice.dataset.choice;
    const computerChoice = getComputerChoice();
    const result = determineWinner(playerChoice, computerChoice);

    updateScore(result);
    displayResult(result, playerChoice, computerChoice);
  });
});

// Reset button functionality
resetButton.addEventListener("click", resetGame);

// Function to generate the computer's choice
function getComputerChoice() {
  const options = Object.keys(gameRules);
  return options[Math.floor(Math.random() * options.length)];
}

// Function to determine the winner
function determineWinner(player, computer) {
  if (player === computer) return "draw";
  return gameRules[player] === computer ? "win" : "lose";
}

// Function to update the score
function updateScore(result) {
  if (result === "win") playerScore++;
  if (result === "lose") computerScore++;

  playerScoreDisplay.textContent = playerScore;
  computerScoreDisplay.textContent = computerScore;
}

// Displaying the result of the round
function displayResult(result, player, computer) {
  resultDisplay.classList.remove("fade");
  resultDisplay.textContent =
    result === "draw"
      ? `It's a draw! Both chose ${player}.`
      : result === "win"
      ? `You win! ${player} beats ${computer}.`
      : `You lose! ${computer} beats ${player}.`;

  resultDisplay.classList.add("fade");
}

// Resetting the game to initial state
function resetGame() {
  playerScore = 0;
  computerScore = 0;
  playerScoreDisplay.textContent = playerScore;
  computerScoreDisplay.textContent = computerScore;
  resultDisplay.textContent = "Make your move!";
}
