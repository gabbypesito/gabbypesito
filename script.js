document.addEventListener("DOMContentLoaded", function() {
  // Typing effect
  const messages = [
    "Hey there! Welcome to my little personal site",
    "This site is intentionally glitchy and clunky.",
    "I wanted to go for a retro, geocities vibe :)",
    "Enjoy your stay!"
  ];

  const typingElem = document.getElementById("typing-text");
  let msgIndex = 0, charIndex = 0, isErasing = false;
  const typingSpeed = 75, erasingSpeed = 50, delayBetween = 2000;

  function typeLoop() {
    const currentMsg = messages[msgIndex];
    if (isErasing) {
      if (charIndex > 0) {
        typingElem.textContent = currentMsg.substring(0, charIndex - 1);
        charIndex--;
        setTimeout(typeLoop, erasingSpeed);
      } else {
        isErasing = false;
        msgIndex = (msgIndex + 1) % messages.length;
        setTimeout(typeLoop, typingSpeed);
      }
    } else {
      if (charIndex < currentMsg.length) {
        typingElem.textContent = currentMsg.substring(0, charIndex + 1);
        charIndex++;
        setTimeout(typeLoop, typingSpeed);
      } else {
        isErasing = true;
        setTimeout(typeLoop, delayBetween);
      }
    }
  }

  typeLoop();

  // Tron Grid
  const canvas = document.getElementById("tronGrid");
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  const spacing = 80;
  let offset = 0;
  const speed = 0.7;
  const bgColor = "#000010";
  const gridColor = "rgba(0,170,255,0.7)";

  function drawGrid() {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;

    for (let x = -spacing + (offset % spacing); x < canvas.width; x += spacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    for (let y = -spacing + (offset % spacing); y < canvas.height; y += spacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    offset += speed;
    requestAnimationFrame(drawGrid);
  }

  drawGrid();
});
