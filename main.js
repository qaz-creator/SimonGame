let sequence = [];
let humanSequence = [];
let level = 0;

const startButton = document.querySelector(".js-start");
const info = document.querySelector(".js-info");

function startGame() {
  startButton.classList.add("hidden");
  info.classList.remove("hidden");
  info.textContent = "Wait for the computer";
  nextRound();
}

startButton.addEventListener("click", startGame);

function nextRound() {
  level += 1;

  // copy all the elements in the `sequence` array to `nextSequence`
  const nextSequence = [...sequence];
  nextSequence.push(nextStep());
  heading.textContent = `level ${level}`;
  playRound(nextSequence);
  sequence = [...nextSequence];
  setTimeout(() => {
    humanTurn(level);
  }, level * 600 + 1000);
}

function nextStep() {
  const tiles = ["red", "green", "blue", "yellow"];
  const random = tiles[Math.floor(Math.random() * tiles.length)];

  return random;
}

function playRound(nextSequence) {
  info.textContent = `Wait for Computer`;

  nextSequence.forEach((color, index) => {
    setTimeout(() => {
      activateTile(color);
    }, (index + 1) * 600);
  });
}

function activateTile(color) {
  const tile = document.querySelector(`[data-tile='${color}']`);
  const sound = document.querySelector(`[data-sound='${color}']`);

  tile.classList.add("activated");
  sound.play();

  setTimeout(() => {
    tile.classList.remove("activated");
  }, 300);
}

const heading = document.querySelector(".js-heading");
const tileContainer = document.querySelector(".js-container");

function humanTurn(level) {
  heading.textContent = `Level ${level}`;
  tileContainer.classList.remove("unclickable");
  info.textContent = `Your turn: ${level} Tap${level > 1 ? "s" : ""}`;
}
tileContainer.addEventListener("click", (event) => {
  const { tile } = event.target.dataset;

  if (tile) handleClick(tile);
});

function handleClick(tile) {
  const index = humanSequence.push(tile) - 1;
  const sound = document.querySelector(`[data-sound='${tile}']`);
  sound.play();

  const remainingTaps = sequence.length - humanSequence.length;
  if (humanSequence[index] !== sequence[index]) {
    resetGame(`Oops! Game over at level ${level}, you pressed the wrong tile`);
    return;
  }
  if (humanSequence.length === sequence.length) {
    if (humanSequence.length === 20) {
      resetGame("Congrats! You completed all the levels");
      return;
    }
    humanSequence = [];
    info.textContent = "Success! Keep going!";

    setTimeout(() => {
      info.textContent = "Wait for computer";
      nextRound();
    }, 1000);
    return;
  }

  info.textContent = `Your turn: ${remainingTaps} Tap${
    remainingTaps > 1 ? "s" : ""
  }`;
}

function resetGame(text) {
  alert(text);
  sequence = [];
  humanSequence = [];
  level = 0;
  startButton.classList.remove("hidden");
  heading.textContent = "Simon Game";
  info.classList.add("hidden");
  tileContainer.classList.add("unclickable");
}
