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
