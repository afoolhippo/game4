const titleScreen = document.getElementById("titleScreen");
const gameScreen = document.getElementById("gameScreen");
const resultScreen = document.getElementById("resultScreen");

const titleImage = document.getElementById("titleImage");
const startBtn = document.getElementById("startBtn");
const backTitleBtn = document.getElementById("backTitleBtn");

const cucumber = document.getElementById("cucumber");
const cursor = document.getElementById("cursor");
const tapButton = document.getElementById("tapButton");
const roundText = document.getElementById("roundText");

const resultKappa = document.getElementById("resultKappa");
const resultTitle = document.getElementById("resultTitle");
const resultScore = document.getElementById("resultScore");
const resultSummary = document.getElementById("resultSummary");

const shareBtn = document.getElementById("shareBtn");
const restartBtn = document.getElementById("restartBtn");
const homeBtn = document.getElementById("homeBtn");

const bgm = document.getElementById("bgm");
const pokiSe = document.getElementById("pokiSe");
const funyaSe = document.getElementById("funyaSe");

const GAME_URL = "https://afoolhippo.github.io/game4/";
const HOME_URL = "https://afoolhippo.github.io/home/?skipTitle=1";

let started = false;
let pos = 0;
let speed = 7;
let direction = 1;
let round = 1;
let goodCount = 0;
let playing = false;

let resultLabel = "";
let resultShareLead = "";

function resetGameState() {
  pos = 0;
  speed = 7;
  direction = 1;
  round = 1;
  goodCount = 0;
  playing = false;
  started = false;

  cucumber.src = "cucumber_straight.png";
  roundText.textContent = "1本目";
  cursor.style.top = "0px";
}

function startGame() {
  if (started) return;

  started = true;

  titleScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");

  bgm.volume = 0.7;
  bgm.currentTime = 0;
  bgm.play().catch(() => {});

  playing = true;
  updateMeter();
}

titleImage.addEventListener("pointerdown", startGame);
startBtn.addEventListener("pointerdown", startGame);

backTitleBtn.addEventListener("pointerdown", () => {
  bgm.pause();
  resetGameState();

  gameScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
  titleScreen.classList.remove("hidden");
});

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
  roundText.textContent = `${round}本目`;

  cucumber.src = "cucumber_straight.png";

  pos = 0;
  direction = 1;

  if (round === 3) {
    speed = 8;
  }

  playing = true;
  updateMeter();
}

function endGame() {
  bgm.pause();

  gameScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  resultScore.innerHTML = `${goodCount} / 3 GOOD`;

  if (goodCount === 3) {
    resultLabel = "河童名人！";
    resultShareLead = "河童名人になりました🥒🐸";
    resultTitle.innerHTML = resultLabel;
    resultKappa.src = "kappa3.png";
    resultSummary.innerHTML = "3本すべて真っ二つ！<br>見事なポキポキでした。";
  } else if (goodCount >= 1) {
    resultLabel = "イイもろきゅう！";
    resultShareLead = "イイもろきゅうでした🥒";
    resultTitle.innerHTML = resultLabel;
    resultKappa.src = "kappa1_2.png";
    resultSummary.innerHTML = "惜しいけど、ちゃんとポキッ。<br>河童も少しうれしそう。";
  } else {
    resultLabel = "もろきゅーさん…";
    resultShareLead = "もろきゅーさんでした…🥒💦";
    resultTitle.innerHTML = resultLabel;
    resultKappa.src = "kappa0.png";
    resultSummary.innerHTML = "全部くねっと曲がりました。<br>次こそポキポキきゅうり！";
  }
}

shareBtn.addEventListener("pointerdown", () => {
  const text =
`${resultShareLead}

${goodCount} / 3 GOOD！

無料ブラウザゲーム
「ポキポキきゅうり」
${GAME_URL}

#ポキポキきゅうり
#カバゲーセン`;

  const shareUrl =
    "https://twitter.com/intent/tweet?text=" +
    encodeURIComponent(text);

  window.open(shareUrl, "_blank");
});

restartBtn.addEventListener("pointerdown", () => {
  location.reload();
});

homeBtn.addEventListener("pointerdown", () => {
  location.href = HOME_URL;
});