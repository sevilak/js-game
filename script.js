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

// Function to start the game
function startGame() {
  const player1Name =
    document.getElementById("player1Name").value || "Player 1";
  const player2Name =
    document.getElementById("player2Name").value || "Player 2";

  scorePlayer1 = 0;
  scorePlayer2 = 0;
  scoreDisplayPlayer1.textContent = `${player1Name} Score: 0`;
  scoreDisplayPlayer2.textContent = `${player2Name} Score: 0`;
  winnerDisplay.textContent = "";
  timerDisplay.textContent = "Time Left: 30";

  // Alert for game rules
  alert(
    "Game Rules:\nCatch all the fish to score points! 🐟🐠🐡\nBut be careful! If you catch seaweed, you lose 1 point! 🌿"
  );

  // Start the first round for Player 1
  currentPlayer = 1;
  startRound(player1Name, player2Name, 30);

  // Start the second round for Player 2 after 30 seconds
  setTimeout(() => {
    alert(`It's time for ${player2Name}'s turn!`);
    currentPlayer = 2;
    startRound(player2Name, player1Name, 30);
  }, 30000);
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
      }
      // Check if both players have completed their turns
      if (currentPlayer === 2) {
        declareWinner(activePlayerName, inactivePlayerName);
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
      scoreDisplayPlayer1.textContent = `Player 1 Score: ${scorePlayer1}`;
    } else {
      scorePlayer2++;
      scoreDisplayPlayer2.textContent = `Player 2 Score: ${scorePlayer2}`;
    }

    // Animate fish disappearing
    fish.style.transform = "scale(0)";
    setTimeout(() => {
      clearInterval(fallInterval);
      gameArea.removeChild(fish);
    }, 200); // Wait for the scale animation to finish
  });
}

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
      scoreDisplayPlayer1.textContent = `Player 1 Score: ${scorePlayer1}`;
    } else {
      scorePlayer2 = Math.max(0, scorePlayer2 - 1); // Prevent negative scores
      scoreDisplayPlayer2.textContent = `Player 2 Score: ${scorePlayer2}`;
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
function declareWinner(activePlayerName, inactivePlayerName) {
  let winner;
  if (scorePlayer1 > scorePlayer2) {
    winner = `${activePlayerName} wins with ${scorePlayer1} points! 🎉`;
  } else if (scorePlayer2 > scorePlayer1) {
    winner = `${inactivePlayerName} wins with ${scorePlayer2} points! 🎉`;
  } else {
    winner = `It's a tie! ${activePlayerName} scored ${scorePlayer1} points and ${inactivePlayerName} scored ${scorePlayer2} points! 🤝`;
  }
  winnerDisplay.textContent = winner;
  alert(winner); // Alert the winner at the end of the game
}
