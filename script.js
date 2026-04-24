const weddingDate = new Date("August 12, 2026").getTime();
const timer = document.getElementById("timer");

setInterval(() => {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));

  timer.innerHTML = `${days} days to go 💍`;
}, 1000);
