let timer = 0;
let wind = 0;
let wigPosition = 0;
let isPlaying = false;
let intervalId, windIntervalId;

const wig = document.getElementById('wig');
const timerEl = document.getElementById('timer');
const windEl = document.getElementById('wind');
const startBtn = document.getElementById('start-btn');

startBtn.addEventListener('click', startGame);
wig.addEventListener('pointerdown', holdWig);

function startGame() {
  if (isPlaying) return;
  isPlaying = true;
  timer = 0;
  wigPosition = 0;
  wig.style.transform = `translate(0px, 0px) rotate(0deg)`;
  
  intervalId = setInterval(updateGame, 100);
  windIntervalId = setInterval(changeWind, 2000);
}

function changeWind() {
  wind = Math.floor(Math.random() * 5) - 2; // -2 〜 2 の風
  const windText = wind === 0 ? "無" : wind > 0 ? `右風 (強さ ${wind})` : `左風 (強さ ${Math.abs(wind)})`;
  windEl.textContent = windText;
}

function updateGame() {
  timer += 0.1;
  timerEl.textContent = timer.toFixed(1);
  
  wigPosition += wind * 3;
  wig.style.transform = `translate(${wigPosition}px, 0px) rotate(${wigPosition * 0.5}deg)`;

  if (Math.abs(wigPosition) > 80) {
    alert(`カツラが吹き飛びました！記録: ${timer.toFixed(1)}秒`);
    endGame();
  }
}

function holdWig() {
  if (!isPlaying) return;
  wigPosition = 0;
  wig.style.transform = `translate(0px, 0px) rotate(0deg)`;
}

function endGame() {
  isPlaying = false;
  clearInterval(intervalId);
  clearInterval(windIntervalId);
}