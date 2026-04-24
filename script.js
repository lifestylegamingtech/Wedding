// ✅ MULTI SCRATCH CARD LOGIC
document.querySelectorAll(".scratch-card").forEach(card => {
  const canvas = card.querySelector(".scratchCanvas");
  const ctx = canvas.getContext("2d");
  let scratching = false;

  // Draw "coin"
  ctx.fillStyle = "#d4c7a3";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#6b5e3d";
  ctx.font = "18px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("Scratch here", canvas.width / 2, canvas.height / 2);

  function scratch(x, y) {
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();
  }

  // Mouse
  canvas.addEventListener("mousedown", () => scratching = true);
  window.addEventListener("mouseup", () => scratching = false);
  canvas.addEventListener("mousemove", e => {
    if (!scratching) return;
    const rect = canvas.getBoundingClientRect();
    scratch(e.clientX - rect.left, e.clientY - rect.top);
  });

  // Touch
  canvas.addEventListener("touchstart", () => scratching = true);
  canvas.addEventListener("touchend", () => scratching = false);
  canvas.addEventListener("touchmove", e => {
    e.preventDefault();
    if (!scratching) return;
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    scratch(touch.clientX - rect.left, touch.clientY - rect.top);
  });
});
