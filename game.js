/* =========================
   RESULT
========================= */

function endGame() {

  bgm.pause();

  gameScreen.classList.add("hidden");

  resultScreen.classList.remove("hidden");

  resultScore.innerHTML =
    `${goodCount} / 3 GOOD`;

  if (goodCount === 3) {

    resultTitle.innerHTML =
      "河童名人！";

    resultKappa.src =
      "kappa3.png";

  } else if (goodCount >= 1) {

    resultTitle.innerHTML =
      "いいもろきゅう！";

    resultKappa.src =
      "kappa1_2.png";

  } else {

    resultTitle.innerHTML =
      "モロキューさん…";

    resultKappa.src =
      "kappa0.png";
  }
}