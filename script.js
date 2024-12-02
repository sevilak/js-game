let score = 0;
let timeLeft = 30;
let timerId;
const numberOfFishes = 5; // Anzahl der Fische
const fishElements = []; // Array für die Fisch-Elemente
const moveInterval = 100; // Intervall für die Bewegung in Millisekunden
const stepSize = 5; // Schrittgröße für die Bewegung

const gameArea = document.getElementById('gameArea');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');

// Funktion zum Starten des Spiels
function startGame() {
    score = 0;
    timeLeft = 30;
    scoreDisplay.textContent = 'Punkte: ' + score;
    timerDisplay.textContent = 'Zeit: ' + timeLeft;

    timerId = setInterval(updateTimer, 1000);
    createFishes();
    moveFishes();
}

// Funktion, um Fische zu erstellen
function createFishes() {
    for (let i = 0; i < numberOfFishes; i++) {
        const fish = document.createElement('div');
        fish.classList.add('fish');
        fish.textContent = '🐟'; // Fisch-Emoji
        positionFish(fish);
        gameArea.appendChild(fish);
        fishElements.push(fish); // Füge den Fisch zum Array hinzu

        // Event-Listener für jeden Fisch
        fish.addEventListener('click', () => {
            score++;
            scoreDisplay.textContent = 'Punkte: ' + score;
            positionFish(fish); // Bewege den Fisch nach dem Klicken
        });
    }
}

// Funktion, um den Fisch zufällig zu positionieren
function positionFish(fish) {
    const areaWidth = gameArea.clientWidth;
    const areaHeight = gameArea.clientHeight;
    const fishWidth = fish.clientWidth;
    const fishHeight = fish.clientHeight;

    let positionX = Math.random() * (areaWidth - fishWidth);
    let positionY = Math.random() * (areaHeight - fishHeight);

    fish.style.left = positionX + 'px';
    fish.style.top = positionY + 'px';
}

// Funktion, um die Fische zufällig zu bewegen
function moveFishes() {
    setInterval(() => {
        fishElements.forEach(fish => {
            let directionX = (Math.random() < 0.5 ? 1 : -1) * stepSize;
            let directionY = (Math.random() < 0.5 ? 1 : -1) * stepSize;

            let currentX = parseFloat(fish.style.left) || 0;
            let currentY = parseFloat(fish.style.top) || 0;

            // Neue Position berechnen
            let newX = currentX + directionX;
            let newY = currentY + directionY;

            // Überprüfen, ob die neue Position innerhalb des Spielbereichs ist
            if (newX < 0) newX = 0;
            if (newY < 0) newY = 0;
            if (newX > gameArea.clientWidth - fish.clientWidth) newX = gameArea.clientWidth - fish.clientWidth;
            if (newY > gameArea.clientHeight - fish.clientHeight) newY = gameArea.clientHeight - fish.clientHeight;

            fish.style.left = newX + 'px';
            fish.style.top = newY + 'px';
        });
    }, moveInterval);
}

// Funktion, um den Timer zu aktualisieren
function updateTimer() {
    timeLeft--;
    timerDisplay.textContent = 'Zeit: ' + timeLeft;

    if (timeLeft <= 0) {
        clearInterval(timerId);
        alert('Zeit abgelaufen! Deine Punkte: ' + score);
        resetGame();
    }
}

// Funktion, um das Spiel zurückzusetzen
function resetGame() {
    fishElements.forEach(fish => gameArea.removeChild(fish)); // Fische entfernen
    fishElements.length = 0; // Array leeren
    startGame(); // Spiel neu starten
}

// Spiel starten
startGame();