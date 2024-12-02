let score = 0;
let timeLeft = 30;
let timerId;
const numberOfFishes = 15; // Anzahl der Fische erhöhen
const numberOfSeaweeds = 25; // Anzahl der Algen
const fishElements = []; // Array für die Fisch-Elemente
const seaweedElements = []; // Array für die Algen-Elemente
const moveInterval = 100; // Intervall für die Bewegung in Millisekunden
const stepSize = 8; // Schrittgröße für die Bewegung
const timePenalty = 3; // Zeitstrafe, wenn auf Algen geklickt wird

const gameArea = document.getElementById('gameArea');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');

// Liste von verschiedenen Fisch-Emojis
const fishEmojis = ['🐟', '🐠', '🐡', '🐋', '🐬', '🐳'];

// Funktion zum Starten des Spiels
function startGame() {
    score = 0;
    timeLeft = 30;
    scoreDisplay.textContent = 'Punkte: ' + score;
    timerDisplay.textContent = 'Zeit: ' + timeLeft;

    timerId = setInterval(updateTimer, 1000);
    createFishes();
    createSeaweeds();
    moveFishes();
    moveSeaweeds();
}

// Funktion, um Fische zu erstellen
function createFishes() {
    for (let i = 0; i < numberOfFishes; i++) {
        const fish = document.createElement('div');
        fish.classList.add('fish');
        fish.textContent = getRandomFishEmoji(); // Zufälliges Fisch-Emoji auswählen
        positionElement(fish);
        gameArea.appendChild(fish);
        fishElements.push(fish); // Füge den Fisch zum Array hinzu

        // Event-Listener für jeden Fisch
        fish.addEventListener('click', () => {
            score++;
            scoreDisplay.textContent = 'Punkte: ' + score;
            positionElement(fish); // Bewege den Fisch nach dem Klicken
        });
    }
}

// Funktion, um ein zufälliges Fisch-Emoji auszuwählen
function getRandomFishEmoji() {
    const randomIndex = Math.floor(Math.random() * fishEmojis.length);
    return fishEmojis[randomIndex];
}

// Funktion, um Algen zu erstellen
function createSeaweeds() {
    for (let i = 0; i < numberOfSeaweeds; i++) {
        const seaweed = document.createElement('div');
        seaweed.classList.add('seaweed');
        seaweed.textContent = '🌿'; // Algen-Emoji
        positionElement(seaweed);
        gameArea.appendChild(seaweed);
        seaweedElements.push(seaweed); // Füge die Algen zum Array hinzu

           // Event-Listener für jede Alge
           seaweed.addEventListener('click', () => {
            timeLeft -= timePenalty; // Zeit reduzieren
            if (timeLeft < 0) timeLeft = 0; // Verhindert negative Zeit
            timerDisplay.textContent = 'Zeit: ' + timeLeft;
            positionElement(seaweed); // Bewege die Alge nach dem Klicken
        });
    }
}


// Funktion, um ein Element zufällig zu positionieren
function positionElement(element) {
    const areaWidth = gameArea.clientWidth;
    const areaHeight = gameArea.clientHeight;
    const elementWidth = element.clientWidth;
    const elementHeight = element.clientHeight;

    let positionX = Math.random() * (areaWidth - elementWidth);
    let positionY = Math.random() * (areaHeight - elementHeight);

    element.style.left = positionX + 'px';
    element.style.top = positionY + 'px';
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

// Funktion, um die Algen zufällig zu bewegen
function moveSeaweeds() {
    setInterval(() => {
        seaweedElements.forEach(seaweed => {
            let directionX = (Math.random() < 0.5 ? 1 : -1) * stepSize;
            let directionY = (Math.random() < 0.5 ? 1 : -1) * stepSize;

            let currentX = parseFloat(seaweed.style.left) || 0;
            let currentY = parseFloat(seaweed.style.top) || 0;

            // Neue Position berechnen
            let newX = currentX + directionX;
            let newY = currentY + directionY;

            // Überprüfen, ob die neue Position innerhalb des Spielbereichs ist
            if (newX < 0) newX = 0;
            if (newY < 0) newY = 0;
            if (newX > gameArea.clientWidth - seaweed.clientWidth) newX = gameArea.clientWidth - seaweed.clientWidth;
            if (newY > gameArea.clientHeight - seaweed.clientHeight) newY = gameArea.clientHeight - seaweed.clientHeight;

            seaweed.style.left = newX + 'px';
            seaweed.style.top = newY + 'px';
        });
    }, moveInterval);
}

// Funktion zum Aktualisieren des Timers
function updateTimer() {
    timeLeft--;
    timerDisplay.textContent = 'Zeit: ' + timeLeft;
    if (timeLeft <= 0) {
        clearInterval(timerId);
        alert('Zeit abgelaufen! Deine Punktzahl: ' + score);
        resetGame();
    }
}

// Funktion zum Zurücksetzen des Spiels
function resetGame() {
    score = 0;
    timeLeft = 30;
    scoreDisplay.textContent = 'Punkte: ' + score;
    timerDisplay.textContent = 'Zeit: ' + timeLeft;

    // Entferne alle Fische und Algen
    fishElements.forEach(fish => gameArea.removeChild(fish));
    seaweedElements.forEach(seaweed => gameArea.removeChild(seaweed));

    fishElements.length = 0; // Leere das Array
    seaweedElements.length = 0; // Leere das Array
}



// Starte das Spiel, wenn die Seite geladen wird
window.onload = startGame;