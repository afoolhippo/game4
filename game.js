const cursor = document.getElementById("cursor");
const cucumber = document.getElementById("cucumber");
const message = document.getElementById("message");
const tapButton = document.getElementById("tapButton");
const roundText = document.getElementById("round");

const resultScreen = document.getElementById("result-screen");
const finalResult = document.getElementById("final-result");
const resultKappa = document.getElementById("result-kappa");
const scoreText = document.getElementById("score-text");

const bgm = document.getElementById("bgm");
const pokiSe = document.getElementById("pokiSe");
const funyaSe = document.getElementById("funyaSe");

let pos = 0;
let speed = 6;
let direction = 1;

let round = 1;
let goodCount = 0;
let playing = true;
let started = false;

function getStageHeight() {
  return document.getElementById("meter-overlay").clientHeight;
}

function getCursorHeight() {
  return cursor.clientHeight || 12;
}

function updateMeter() {
  if (!playing) return;

  const stageHeight = getStageHeight();
  const cursorHeight = getCursorHeight();
  const maxPos = stageHeight - cursorHeight;

  pos += speed * direction;

  if (pos >= maxPos) {
    pos = maxPos;
    direction = -1;
  }

  if (pos <= 0) {
    pos = 0;
    direction = 1;
  }

  cursor.style.top = `${pos}px`;

  requestAnimationFrame(updateMeter);
}

function startBgmOnce() {
  if (started) return;
  started = true;

  bgm.volume = 0.7;
  bgm.currentTime = 0;
  bgm.play().catch(() => {});
}

function judge() {
  const stageHeight = getStageHeight();
  const cursorCenter = pos + getCursorHeight() / 2;
  const center = stageHeight / 2;

  const perfectRange = 18;
  return Math.abs(cursorCenter - center) <= perfectRange;
}

tapButton.addEventListener("click", () => {
  if (!playing) return;

  startBgmOnce();

  playing = false;

  const isGood = judge();

  if (isGood) {
    goodCount++;
    cucumber.src = "cucumber_broken.png";
    message.innerText = "GOOD!";
    pokiSe.currentTime = 0;
    pokiSe.play().catch(() => {});
  } else {
    cucumber.src = "cucumber_bad.png";
    message.innerText = "モロキューさん…";
    funyaSe.currentTime = 0;
    funyaSe.play().catch(() => {});
  }

  setTimeout(nextRound, 1000);
});

function nextRound() {
  if (round >= 3) {
    showResult();
    return;
  }

  round++;
  roundText.innerText = `ROUND ${round} / 3`;

  cucumber.src = "cucumber_straight.png";
  message.innerText = "赤いところで押せ！";

  pos = 0;
  direction = 1;
  playing = true;

  updateMeter();
}

function showResult() {
  tapButton.style.display = "none";
  resultScreen.classList.remove("hidden");

  scoreText.innerText = `${goodCount} / 3 GOOD`;

  if (goodCount === 3) {
    finalResult.innerText = "河童名人！";
    resultKappa.src = "kappa3.png";
  } else if (goodCount >= 1) {
    finalResult.innerText = "いいもろきゅう！";
    resultKappa.src = "kappa1_2.png";
  } else {
    finalResult.innerText = "モロキューさん…";
    resultKappa.src = "kappa0.png";
  }
}

updateMeter();