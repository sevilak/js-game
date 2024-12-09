// variablen für das spiel f. punkte, spieler, timer

let scorePlayer1 = 0;
let scorePlayer2 = 0;
let gameInterval;
let currentPlayer = 1; // 1 für Player 1, 2 für Player 2
let timerInterval;

// dom elemente
const gameArea = document.getElementById("gameArea");
const scoreDisplayPlayer1 = document.getElementById("scorePlayer1");
const scoreDisplayPlayer2 = document.getElementById("scorePlayer2");
const winnerDisplay = document.getElementById("winnerDisplay");
const timerDisplay = document.getElementById("timerDisplay");
//array für fische seegras emoji
const fishEmojis = ["🐟", "🐠", "🐡"];
const seaweedEmoji = "🌿";
//variablen für die spieler
let player1Name; // Namen eintragen und speichern
let player2Name;

// funktion vom Spiel
function startGame() {
  player1Name = document.getElementById("player1Name").value || "Player 1";
  player2Name = document.getElementById("player2Name").value || "Player 2";

  scorePlayer1 = 0;
  scorePlayer2 = 0;
  scoreDisplayPlayer1.textContent = `${player1Name} Score: ${scorePlayer1}`;
  scoreDisplayPlayer2.textContent = `${player2Name} Score: ${scorePlayer2}`;
  winnerDisplay.textContent = ""; // Geiwnner wird nicht angezeigt
  timerDisplay.textContent = "Time Left: 30";

  // laden des Spiel und leeren
  clearGameArea();

  // alert für die Spielregeln
  alert(
    "Game Rules:\nCatch all the fish to score points! 🐟🐠🐡\nBut be careful! If you catch seaweed, you lose 1 point! 🌿"
  );

  // spiel starten mit player1 30sec
  currentPlayer = 1;
  startRound(player1Name, player2Name, 30);
}

// funktion um das spiel wieder neu zu starten
function clearGameArea() {
  while (gameArea.firstChild) {
    gameArea.removeChild(gameArea.firstChild);
  }
}

// neustart mit timer
function startRound(activePlayerName, inactivePlayerName, duration) {
  let timeLeft = duration;
  timerDisplay.textContent = `Time Left: ${timeLeft}`;

  // Start fish and seaweed anzeigen
  gameInterval = setInterval(() => {
    spawnFish();
    spawnSeaweed();
  }, 800); // alle 800ms ein neues element

  // Timer countdown runterzählen
  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time Left: ${timeLeft}`;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      clearInterval(gameInterval);
      if (currentPlayer === 1) {
        currentPlayer = 2; // player2 ist dran
        alert(`Time's up! It's now ${inactivePlayerName}'s turn!`);
        startRound(inactivePlayerName, activePlayerName, 30);
      } else {
        // das gewinner wird am ende der zweite runde angezeigt
        declareWinner(player1Name, player2Name);
      }
    }
  }, 1000);
}

// fische anzeigen
function spawnFish() {
  const fish = document.createElement("div");
  fish.className = "fish";
  fish.textContent = fishEmojis[Math.floor(Math.random() * fishEmojis.length)];
  fish.style.left = Math.random() * (gameArea.clientWidth - 50) + "px";
  fish.style.top = "0px";

  gameArea.appendChild(fish);

  // Fische fallen von oben runter im spielfeld
  let fallInterval = setInterval(() => {
    const currentTop = parseInt(fish.style.top);
    if (currentTop < gameArea.clientHeight - 50) {
      fish.style.top = currentTop + 5 + "px";
    } else {
      clearInterval(fallInterval);
      gameArea.removeChild(fish);
    }
  }, 100);

  // click event für fische
  fish.addEventListener("click", () => {
    // nur der aktive playyer bekommt punkte
    if (currentPlayer === 1) {
      scorePlayer1++;
      scoreDisplayPlayer1.textContent = `${player1Name} Score: ${scorePlayer1}`;
    } else {
      scorePlayer2++;
      scoreDisplayPlayer2.textContent = `${player2Name} Score: ${scorePlayer2}`;
    }

    // animation fische verschwinden im spielfeld
    fish.style.transform = "scale(0)";
    setTimeout(() => {
      clearInterval(fallInterval);
      gameArea.removeChild(fish);
    }, 200); // übergang animation
  });
}

// seegras anzeigen erzeugen
function spawnSeaweed() {
  const seaweed = document.createElement("div");
  seaweed.className = "seaweed";
  seaweed.textContent = seaweedEmoji;
  seaweed.style.left = Math.random() * (gameArea.clientWidth - 50) + "px";
  seaweed.style.top = "0px";

  gameArea.appendChild(seaweed);

  // seegras fällt von oben
  let fallInterval = setInterval(() => {
    const currentTop = parseInt(seaweed.style.top);
    if (currentTop < gameArea.clientHeight - 50) {
      seaweed.style.top = currentTop + 5 + "px";
    } else {
      clearInterval(fallInterval);
      gameArea.removeChild(seaweed);
    }
  }, 100);

  // click event für seegras, punkte abziehen bei klick
  seaweed.addEventListener("click", () => {
    if (currentPlayer === 1) {
      scorePlayer1 = Math.max(0, scorePlayer1 - 1); 
      scoreDisplayPlayer1.textContent = `${player1Name} Score: ${scorePlayer1}`;
    } else {
      scorePlayer2 = Math.max(0, scorePlayer2 - 1); 
      scoreDisplayPlayer2.textContent = `${player2Name} Score: ${scorePlayer2}`;
    }

    // seegras verschwindet
    seaweed.style.transform = "scale(0)";
    setTimeout(() => {
      clearInterval(fallInterval);
      gameArea.removeChild(seaweed);
    }, 200); 
  });
}

// gewinner anzeigen am ende des spiels
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
  alert(winner); // alert für den gewinner popup
}
