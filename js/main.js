const green = document.querySelector('div[data-tile="green"]');
const red = document.querySelector('div[data-tile="red"]');
const blue = document.querySelector('div[data-tile="blue"]');
const yellow = document.querySelector('div[data-tile="yellow"]');
const start = document.querySelector("#play");
const board = document.querySelector(".board");

const redSound = new Audio("./sounds/red.mp3");
const blueSound = new Audio("./sounds/blue.mp3");
const yellowSound = new Audio("./sounds/yellow.mp3");
const greenSound = new Audio("./sounds/green.mp3");
const gameOverSound = new Audio("./sounds/game-over.mp3");
const gameWinSound = new Audio("./sounds/game-win.mp3");
const wrongSound = new Audio("./sounds/wrong.mp3");

let isSimonPhase = true;
let totalSequence = [];
let round = 1;
let isStarted = false;
let isAbleToPlay = false;
let i = 0;
let currentRound = document.getElementById("level");
let highScore = round;
let HighScoreElement = document.getElementById("high-score");

green.addEventListener("click", () => handlePlayerInput(green));
red.addEventListener("click", () => handlePlayerInput(red));
blue.addEventListener("click", () => handlePlayerInput(blue));
yellow.addEventListener("click", () => handlePlayerInput(yellow));
start.addEventListener("click", () => startGame());

function playSound(color) {
  switch (color) {
    case green:
      greenSound.play();
      break;
    case red:
      redSound.play();
      break;
    case blue:
      blueSound.play();
      break;
    case yellow:
      yellowSound.play();
      break;
    default:
      break;
  }
}

function handlePlayerInput(color) {
  if (!isSimonPhase && isAbleToPlay) {
    tempSequence = totalSequence.slice(i, round);

    let expectedColor = tempSequence[0];

    if (expectedColor !== color) {
      resetGame();
      alert("You lost! Try again.");
      wrongSound.play();
      highScore = Math.max(round , highScore);
      HighScoreElement.textContent = highScore;
      return;
    } else {
      i++;

      if (i === round) {
        currentRound.textContent = round;
        round++;
        i = 0;
        if (round < 12) {
          setSimonTurn();
        } else {
          resetGame();
          alert("you won");
          gameWinSound.play();
        }
      }
    }
    playSound(color);
  }
}

function startGame() {
  if (!isStarted) {
    currentRound.textContent = round;

    isStarted = true;
    setTheSequence();
    setSimonTurn();
  }
}

function resetGame() {
  isStarted = false;
  isAbleToPlay = false;
  totalSequence = [];
  round = 1;
  i = 0;

}

function setSimonTurn() {
  let delay = 500;
  board.style.pointerEvents = "none";

  isSimonPhase = true;
  isAbleToPlay = false;

  for (let i = 0; i < round; i++) {
    setTimeout(() => {
      totalSequence[i].style.opacity = "100%";
      playSound(totalSequence[i]);

      setTimeout(() => {
        totalSequence[i].style.opacity = "35%";
      }, delay);
    }, i * delay * 2);
    if (i == round - 1) {
      setTimeout(() => {
        setTimeout(() => {
          isAbleToPlay = true;
          setUserTurn();
        }, 500 * round);
      }, 500 * 2);
    }
  }
}

function setUserTurn() {
  isAbleToPlay = true;
  isSimonPhase = false;
  board.style.pointerEvents = "auto";

  green.addEventListener("mouseover", () => {
    green.style.opacity = "1";
  });

  green.addEventListener("mouseout", () => {
    green.style.opacity = "0.35";
  });

  yellow.addEventListener("mouseover", () => {
    yellow.style.opacity = "1";
  });

  yellow.addEventListener("mouseout", () => {
    yellow.style.opacity = "0.35";
  });

  blue.addEventListener("mouseover", () => {
    blue.style.opacity = "1";
  });

  blue.addEventListener("mouseout", () => {
    blue.style.opacity = "0.35";
  });

  red.addEventListener("mouseover", () => {
    red.style.opacity = "1";
  });

  red.addEventListener("mouseout", () => {
    red.style.opacity = "0.35";
  });
}

function setTheSequence() {
  for (let i = 0; i < 12; i++) {
    let color = [red, green, blue, yellow];

    totalSequence[i] = color[Math.floor(Math.random() * 4)];
  }
}
