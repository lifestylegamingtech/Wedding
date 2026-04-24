const weddingDate = new Date("August 12, 2026").getTime();
const timer = document.getElementById("timer");

setInterval(() => {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));

  timer.innerHTML = `${days} days to go 💍`;
}, 1000);
const canvas = document.getElementById("scratchCanvas");
const ctx = canvas.getContext("2d");

let scratching = false;

// Fill canvas with "coin" color
ctx.fillStyle = "#cfc6b8";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Add text hint on coin
ctx.fillStyle = "#555";
ctx.font = "20px sans-serif";
ctx.textAlign = "center";
ctx.fillText("Scratch Here", canvas.width / 2, canvas.height / 2);

// Core scratch function
function scratch(x, y) {
  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath();
  ctx.arc(x, y, 18, 0, Math.PI * 2);
  ctx.fill();
}

// Mouse support
canvas.addEventListener("mousedown", () => scratching = true);
canvas.addEventListener("mouseup", () => scratching = false);
canvas.addEventListener("mousemove", e => {
  if (!scratching) return;
  const rect = canvas.getBoundingClientRect();
  scratch(e.clientX - rect.left, e.clientY - rect.top);
});

// Touch support (mobile)
canvas.addEventListener("touchstart", () => scratching = true);
canvas.addEventListener("touchend", () => scratching = false);
canvas.addEventListener("touchmove", e => {
  e.preventDefault();
  if (!scratching) return;
  const rect = canvas.getBoundingClientRect();
  const touch = e.touches[0];
  scratch(touch.clientX - rect.left, touch.clientY - rect.top);
});
