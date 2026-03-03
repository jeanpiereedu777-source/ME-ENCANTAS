function rand(min, max) {
  return Math.random() * (max - min) + min;
}

// ======================
// STICKERS FLOTANTES
// ======================
const stickerContainer = document.querySelector(".floating-stickers");
const stickerList = Array.from({ length: 12 }, (_, i) => `stickers/${i + 1}.webp`);

const STICKER_SPAWN_MS = 900;
const STICKER_LIFETIME_MIN = 14000;
const STICKER_LIFETIME_MAX = 26000;

function createSticker() {
  if (!stickerContainer) return;

  const img = document.createElement("img");
  img.src = stickerList[Math.floor(Math.random() * stickerList.length)];

  img.style.width = `${rand(70, 150)}px`;
  img.style.left = `${rand(-10, 110)}vw`;
  img.style.top = `${rand(102, 122)}vh`;
  img.style.opacity = rand(0.35, 0.65);

  const rot = rand(-18, 18);
  const driftX = rand(-18, 18);
  const duration = rand(STICKER_LIFETIME_MIN, STICKER_LIFETIME_MAX);

  const anim = img.animate(
    [
      { transform: `translate(0,0) rotate(${rot}deg)` },
      { transform: `translate(${driftX}vw,-140vh) rotate(${rot + rand(-25, 25)}deg)` }
    ],
    { duration, easing: "linear", fill: "forwards" }
  );

  stickerContainer.appendChild(img);
  anim.onfinish = () => img.remove();
}

for (let i = 0; i < 8; i++) setTimeout(createSticker, i * 180);
setInterval(createSticker, STICKER_SPAWN_MS);


// ======================
// JUEGO
// ======================
const questionEl = document.getElementById("question");
const answersEl  = document.getElementById("answers");
const finalEl    = document.getElementById("finalMessage");
const noBtn      = document.getElementById("noBtn");
const hearts     = document.getElementById("hearts");

const acceptPrize = document.getElementById("acceptPrize");
const dedicoBtn   = document.getElementById("dedicoBtn");
const backIntro   = document.getElementById("backIntro");

let stage = 1;

answersEl?.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-next]");
  if (!btn) return;
  if (stage === 1) goStage2();
});

function goStage2() {
  stage = 2;
  questionEl.innerHTML = `Segunda pregunta... 👀<br>¿Te gustaría darme un beso muy muy largo hasta quedarnos sin pulmones??`;

  answersEl.innerHTML = `
    <button class="btn btn-yes" data-yes>Sí puede shek</button>
    <button class="btn btn-yes" data-yes>Obvioooo </button>
    <button class="btn btn-yes" data-yes>Recontra sííí </button>
  `;

  noBtn.style.display = "block";
  placeNoRandom();

  const runAway = () => placeNoRandom(true);
  noBtn.addEventListener("mouseover", runAway);
  noBtn.addEventListener("mousedown", runAway);
  noBtn.addEventListener("touchstart", runAway, { passive: true });

  answersEl.addEventListener("click", onYesPick);
}

function onYesPick(e) {
  const yes = e.target.closest("[data-yes]");
  if (!yes) return;
  showFinal();
  answersEl.removeEventListener("click", onYesPick);
}

function showFinal() {
  noBtn.style.display = "none";
  questionEl.style.display = "none";
  answersEl.style.display = "none";
  finalEl.hidden = false;

  burstHearts(26);
}

function placeNoRandom(bouncy = false) {
  const pad = 12;
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const w = noBtn.offsetWidth || 110;
  const h = noBtn.offsetHeight || 44;

  noBtn.style.left = `${rand(pad, vw - w - pad)}px`;
  noBtn.style.top  = `${rand(pad, vh - h - pad)}px`;
  noBtn.style.transform = "translate(0,0)";

  if (bouncy) {
    noBtn.animate(
      [{ transform: "scale(1)" }, { transform: "scale(1.08)" }, { transform: "scale(1)" }],
      { duration: 220, easing: "ease-out" }
    );
  }
}

function burstHearts(n = 20) {
  for (let i = 0; i < n; i++) {
    const h = document.createElement("div");
    h.className = "heart";
    h.textContent = Math.random() > 0.15 ? "❤️" : "💖";
    h.style.left = rand(0, 100) + "vw";
    h.style.animationDuration = rand(2.3, 4.8) + "s";
    h.style.fontSize = rand(16, 30) + "px";
    hearts.appendChild(h);
    setTimeout(() => h.remove(), 5200);
  }
}

acceptPrize?.addEventListener("click", () => burstHearts(40));

dedicoBtn?.addEventListener("click", () => {
  window.location.href = "dedicatoria.html";
});

backIntro?.addEventListener("click", () => window.location.reload());

window.addEventListener("resize", () => {
  if (noBtn?.style.display === "block") placeNoRandom();
});