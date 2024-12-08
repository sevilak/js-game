let scorePlayer1 = 0;
let scorePlayer2 = 0;
let gameInterval;
let currentPlayer = 1; // 1 for Player 1, 2 for Player 2
let timerInterval;
const gameArea = document.getElementById("gameArea");
const scoreDisplayPlayer1 = document.getElementById("scorePlayer1");
const scoreDisplayPlayer2 = document.getElementById("scorePlayer2");
const winnerDisplay = document.getElementById("winnerDisplay");
const timerDisplay = document.getElementById("timerDisplay");
const fishEmojis = ["🐟", "🐠", "🐡"];
const seaweedEmoji = "🌿";

let player1Name; // Declare variables to hold player names
let player2Name;

// Function to start the game
function startGame() {
  player1Name = document.getElementById("player1Name").value || "Player 1";
  player2Name = document.getElementById("player2Name").value || "Player 2";

  scorePlayer1 = 0;
  scorePlayer2 = 0;
  scoreDisplayPlayer1.textContent = `${player1Name} Score: ${scorePlayer1}`;
  scoreDisplayPlayer2.textContent = `${player2Name} Score: ${scorePlayer2}`;
  winnerDisplay.textContent = ""; // Clear previous winner
  timerDisplay.textContent = "Time Left: 30";

  // Clear the game area
  clearGameArea();

  // Alert for game rules
  alert(
    "Game Rules:\nCatch all the fish to score points! 🐟🐠🐡\nBut be careful! If you catch seaweed, you lose 1 point! 🌿"
  );

  // Start the first round for Player 1
  currentPlayer = 1;
  startRound(player1Name, player2Name, 30);
}

// Function to clear the game area
function clearGameArea() {
  while (gameArea.firstChild) {
    gameArea.removeChild(gameArea.firstChild);
  }
}

// Function to start a round
function startRound(activePlayerName, inactivePlayerName, duration) {
  let timeLeft = duration;
  timerDisplay.textContent = `Time Left: ${timeLeft}`;

  // Start spawning fish and seaweed
  gameInterval = setInterval(() => {
    spawnFish();
    spawnSeaweed();
  }, 800); // Increase frequency of spawning

  // Timer countdown
  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time Left: ${timeLeft}`;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      clearInterval(gameInterval);
      if (currentPlayer === 1) {
        currentPlayer = 2; // Switch to Player 2
        alert(`Time's up! It's now ${inactivePlayerName}'s turn!`);
        startRound(inactivePlayerName, activePlayerName, 30);
      } else {
        // Declare the winner only after both players have played
        declareWinner(player1Name, player2Name);
      }
    }
  }, 1000);
}

// Function to spawn fish
function spawnFish() {
  const fish = document.createElement("div");
  fish.className = "fish";
  fish.textContent = fishEmojis[Math.floor(Math.random() * fishEmojis.length)];
  fish.style.left = Math.random() * (gameArea.clientWidth - 50) + "px";
  fish.style.top = "0px";

  gameArea.appendChild(fish);

  // Animate fish falling
  let fallInterval = setInterval(() => {
    const currentTop = parseInt(fish.style.top);
    if (currentTop < gameArea.clientHeight - 50) {
      fish.style.top = currentTop + 5 + "px";
    } else {
      clearInterval(fallInterval);
      gameArea.removeChild(fish);
    }
  }, 100);

  // Add click event to fish
  fish.addEventListener("click", () => {
    // Only the active player can score
    if (currentPlayer === 1) {
      scorePlayer1++;
      scoreDisplayPlayer1.textContent = `${player1Name} Score: ${scorePlayer1}`;
    } else {
      scorePlayer2++;
      scoreDisplayPlayer2.textContent = `${player2Name} Score: ${scorePlayer2}`;
    }

    // Animate fish disappearing
    fish.style.transform = "scale(0)";
    setTimeout(() => {
      clearInterval(fallInterval);
      gameArea.removeChild(fish);
    }, 200); // Wait for the scale animation to finish
  });
}

// Function to spawn seaweed
function spawnSeaweed() {
  const seaweed = document.createElement("div");
  seaweed.className = "seaweed";
  seaweed.textContent = seaweedEmoji;
  seaweed.style.left = Math.random() * (gameArea.clientWidth - 50) + "px";
  seaweed.style.top = "0px";

  gameArea.appendChild(seaweed);

  // Animate seaweed falling
  let fallInterval = setInterval(() => {
    const currentTop = parseInt(seaweed.style.top);
    if (currentTop < gameArea.clientHeight - 50) {
      seaweed.style.top = currentTop + 5 + "px";
    } else {
      clearInterval(fallInterval);
      gameArea.removeChild(seaweed);
    }
  }, 100);

  // Add click event to seaweed
  seaweed.addEventListener("click", () => {
    // Deduct a point from the current player's score
    if (currentPlayer === 1) {
      scorePlayer1 = Math.max(0, scorePlayer1 - 1); // Prevent negative scores
      scoreDisplayPlayer1.textContent = `${player1Name} Score: ${scorePlayer1}`;
    } else {
      scorePlayer2 = Math.max(0, scorePlayer2 - 1); // Prevent negative scores
      scoreDisplayPlayer2.textContent = `${player2Name} Score: ${scorePlayer2}`;
    }

    // Animate seaweed disappearing
    seaweed.style.transform = "scale(0)";
    setTimeout(() => {
      clearInterval(fallInterval);
      gameArea.removeChild(seaweed);
    }, 200); // Wait for the scale animation to finish
  });
}

// Function to declare the winner
function declareWinner(player1Name, player2Name) {
  let winner;
  if (scorePlayer1 > scorePlayer2) {
    winner = `${player1Name} wins with ${scorePlayer1} points! 🎉`;
  } else if (scorePlayer2 > scorePlayer1) {
    winner = `${player2Name} wins with ${scorePlayer2} points! 🎉`;
  } else {
    winner = `It's a tie! ${player1Name} scored ${scorePlayer1} points and ${player2Name} scored ${scorePlayer2} points! 🤝`;
  }
  winnerDisplay.textContent = winner;
  alert(winner); // Alert the winner at the end of the game
}
