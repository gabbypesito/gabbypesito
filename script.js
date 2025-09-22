document.addEventListener("DOMContentLoaded", function() {
  const messages = [
    "Hey there! Welcome to my little personal site",
    "This site is intentionally glitchy and clunky.",
    "I wanted to go for a retro, geocities vibe :)",
    "Enjoy your stay!"
  ];
  
  const typingElem = document.getElementById("typing-text");
  const typingSpeed = 75;    // ms per character typed
  const erasingSpeed = 50;   // ms per character erased
  const delayBetween = 2000; // ms before erasing after fully typed
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

  // Tron-style grid background logic
  (function drawGridModule() {
    const canvas = document.getElementById('tronGrid');
    if (!canvas) {
      console.error("tronGrid canvas not found");
      return;
    }
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const bgColor = '#000000';                          // black
    const gridColor = 'rgba(0, 150, 255, 0.6)';         // brighter blue, more visible
    const lineWidth = 1;
    const spacing = 80;
    let offset = 0;
    const speed = 0.5;

    function drawGrid() {
      // fill background first
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // draw vertical grid lines
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = lineWidth;
      for (let x = -spacing + (offset % spacing); x < canvas.width; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // draw horizontal grid lines
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

  // Start typing loop
  typeLoop();
});
