const titleScreen = document.getElementById("titleScreen");
const gameScreen = document.getElementById("gameScreen");
const resultScreen = document.getElementById("resultScreen");

const titleImage = document.getElementById("titleImage");
const pressStart = document.getElementById("pressStart");

const cucumber = document.getElementById("cucumber");
const cursor = document.getElementById("cursor");
const tapButton = document.getElementById("tapButton");
const roundText = document.getElementById("roundText");

const resultKappa = document.getElementById("resultKappa");
const resultTitle = document.getElementById("resultTitle");
const resultScore = document.getElementById("resultScore");
const restartBtn = document.getElementById("restartBtn");

const bgm = document.getElementById("bgm");
const pokiSe = document.getElementById("pokiSe");
const funyaSe = document.getElementById("funyaSe");

let started = false;
let pos = 0;
let speed = 7;
let direction = 1;
let round = 1;
let goodCount = 0;
let playing = false;

function startGame() {
  if (started) return;

  started = true;

  titleScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");

  bgm.volume = 0.7;
  bgm.currentTime = 0;
  bgm.play().catch(() => {});

  playing = true;
  updateMeter();
}

titleImage.addEventListener("pointerdown", startGame);
pressStart.addEventListener("pointerdown", startGame);

function updateMeter() {
  if (!playing) return;

  const stage = document.getElementById("meterOverlay");
  const cursorHeight = cursor.clientHeight || 12;
  const max = stage.clientHeight - cursorHeight;

  pos += speed * direction;

  if (pos >= max) {
    pos = max;
    direction = -1;
  }

  if (pos <= 0) {
    pos = 0;
    direction = 1;
  }

  cursor.style.top = pos + "px";

  requestAnimationFrame(updateMeter);
}

tapButton.addEventListener("pointerdown", () => {
  if (!playing) return;

  playing = false;

  const stage = document.getElementById("meterOverlay");
  const center = stage.clientHeight / 2;
  const cursorHeight = cursor.clientHeight || 12;
  const cursorCenter = pos + cursorHeight / 2;

  const good = Math.abs(cursorCenter - center) <= 18;

  if (good) {
    goodCount++;
    cucumber.src = "cucumber_broken.png";

    pokiSe.currentTime = 0;
    pokiSe.play().catch(() => {});
  } else {
    cucumber.src = "cucumber_bad.png";

    funyaSe.currentTime = 0;
    funyaSe.play().catch(() => {});
  }

  setTimeout(nextRound, 950);
});

function nextRound() {
  if (round >= 3) {
    endGame();
    return;
  }

  round++;
  roundText.textContent = `ROUND ${round} / 3`;

  cucumber.src = "cucumber_straight.png";

  pos = 0;
  direction = 1;
  playing = true;

  updateMeter();
}

function endGame() {
  bgm.pause();

  gameScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  resultScore.innerHTML = `${goodCount} / 3 GOOD`;

  if (goodCount === 3) {
    resultTitle.innerHTML = "河童名人！";
    resultKappa.src = "kappa3.png";
  } else if (goodCount >= 1) {
    resultTitle.innerHTML = "イイもろきゅう！";
    resultKappa.src = "kappa1_2.png";
  } else {
    resultTitle.innerHTML = "もろきゅーさん…";
    resultKappa.src = "kappa0.png";
  }
}

restartBtn.addEventListener("pointerdown", () => {
  location.reload();
});