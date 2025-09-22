document.addEventListener("DOMContentLoaded", function() {
  const messages = [
    "Hey there! Welcome to my little personal site",
    "This site is intentionally glitchy and clunky.",
    "I wanted to go for a retro, geocities vibe :)",
    "Enjoy your stay!"
  ];

  const typingElem = document.getElementById("typing-text");
  const typingSpeed = 75;
  const erasingSpeed = 50;
  const delayBetween = 2000;
  let msgIndex = 0;
  let charIndex = 0;
  let isErasing = false;

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

  (function drawGridModule() {
    const canvas = document.getElementById('tronGrid');
    if (!canvas) {
      console.error("tronGrid canvas not found");
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error("2D context not available");
      return;
    }

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const bgColor = '#000010';               // almost black but a bit of blue tint
    const gridColor = 'rgba(0, 170, 255, 0.7)'; // bright blue lines, fairly visible
    const lineWidth = 1;
    const spacing = 80;
    let offset = 0;
    const speed = 0.7;

    function drawGrid() {
      // fill background with slight tint
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // draw grid lines
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = lineWidth;

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
  })();

  typeLoop();
});
