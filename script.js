document.addEventListener("DOMContentLoaded", () => {

  // ===============================
  // COUNTDOWN (29 June 2028)
  // ===============================
  const weddingDate = new Date(2028, 5, 29, 0, 0, 0).getTime(); // June = 5

  const mainTimer = document.getElementById("timer");
  const scratchTimers = document.querySelectorAll(".scratch-countdown");

  function updateCountdown() {
    const now = Date.now();
    const distance = weddingDate - now;

    let text;
    if (distance < 0) {
      text = "Today 💍";
    } else {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      text = `${days} days 💍`;
    }

    if (mainTimer) {
      mainTimer.textContent = text.replace("💍", "to go 💍");
    }

    scratchTimers.forEach(el => {
      el.textContent = text;
    });
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);


  // ===============================
  // MULTI SCRATCH CARD LOGIC
  // ===============================
  document.querySelectorAll(".scratch-card").forEach(card => {
    const canvas = card.querySelector(".scratchCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let scratching = false;

    // Draw coin layer
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
});
