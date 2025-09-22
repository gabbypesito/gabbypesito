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

  function type() {
    const currentMsg = messages[msgIndex];
    
    if (isErasing) {
      // Erase one char
      if (charIndex > 0) {
        typingElem.textContent = currentMsg.substring(0, charIndex - 1);
        charIndex--;
        setTimeout(type, erasingSpeed);
      } else {
        // Move to next message
        isErasing = false;
        msgIndex = (msgIndex + 1) % messages.length;
        setTimeout(type, typingSpeed);
      }
    } else {
      // Typing
      if (charIndex < currentMsg.length) {
        typingElem.textContent = currentMsg.substring(0, charIndex + 1);
        charIndex++;
        setTimeout(type, typingSpeed);
      } else {
        // Fully typed, wait then erase
        isErasing = true;
        setTimeout(type, delayBetween);
      }
    }

  }

  // Start the cycle
  type();
});

//grid background 
(function() {
  const canvas = document.getElementById('tronGrid');
  const ctx = canvas.getContext('2d');
  
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  const gridColor = 'rgba(0, 200, 255, 0.25)'; // neon-cyan effect
  const lineWidth = 1;
  const spacing = 80; // distance between grid lines
  let offset = 0;
  const speed = 0.5; // how fast grid moves

  function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = gridColor;
    ctx.lineWidth = lineWidth;

    // vertical lines
    for (let x = -spacing + (offset % spacing); x < canvas.width; x += spacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    // horizontal lines
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

