document.addEventListener("DOMContentLoaded", () => {

  // =====================
  // COUNTDOWN
  // =====================
  const weddingDate = new Date(2028, 5, 29).getTime();

  const mainTimer = document.getElementById("timer");
  const scratchTimers = document.querySelectorAll(".scratch-countdown");

  function updateCountdown() {
    const now = Date.now();
    const distance = weddingDate - now;

    let text;
    if (distance <= 0) {
      text = "Today 💍";
    } else {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      text = `${days} days 💍`;
    }

    if (mainTimer) mainTimer.textContent = text.replace("💍", "to go 💍");
    scratchTimers.forEach(el => el.textContent = text);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // =====================
  // CONFETTI
  // =====================
  const confettiCanvas = document.getElementById("confettiCanvas");
  const cctx = confettiCanvas.getContext("2d");

  function resizeConfetti() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }
  resizeConfetti();
  window.addEventListener("resize", resizeConfetti);

  function fireConfetti() {
    const particles = Array.from({ length: 120 }, () => ({
      x: Math.random() * confettiCanvas.width,
      y: Math.random() * -confettiCanvas.height,
      size: Math.random() * 6 + 4,
      speed: Math.random() * 3 + 2,
      color: ["#d4af37", "#fff3c4", "#ffffff"][Math.floor(Math.random() * 3)]
    }));

    let frame = 0;
    function animate() {
      cctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
      particles.forEach(p => {
        cctx.fillStyle = p.color;
        cctx.fillRect(p.x, p.y, p.size, p.size);
        p.y += p.speed;
      });
      if (++frame < 120) requestAnimationFrame(animate);
    }
    animate();
  }

  // =====================
  // SCRATCH CARDS
  // =====================
  document.querySelectorAll(".scratch-card").forEach(card => {
    const canvas = card.querySelector(".scratchCanvas");
    const ctx = canvas.getContext("2d");

    let scratching = false;
    let revealed = false;

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
      checkReveal();
    }

    function checkReveal() {
      if (revealed) return;
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let cleared = 0;
      for (let i = 3; i < data.length; i += 4) {
        if (data[i] === 0) cleared++;
      }
      if (cleared / (data.length / 4) > 0.6) {
        revealed = true;
        fireConfetti();
      }
    }

    canvas.addEventListener("mousedown", () => scratching = true);
    window.addEventListener("mouseup", () => scratching = false);
    canvas.addEventListener("mousemove", e => {
      if (!scratching) return;
      const r = canvas.getBoundingClientRect();
      scratch(e.clientX - r.left, e.clientY - r.top);
    });

    canvas.addEventListener("touchstart", () => scratching = true);
    canvas.addEventListener("touchend", () => scratching = false);
    canvas.addEventListener("touchmove", e => {
      e.preventDefault();
      if (!scratching) return;
      const r = canvas.getBoundingClientRect();
      scratch(e.touches[0].clientX - r.left, e.touches[0].clientY - r.top);
    });
  });
});
