document.body.style.margin = 0;
document.body.style.overflow = `hidden`;

const canvas = document.getElementById("canvas_element");
const ctx = canvas.getContext("2d");

// Initialize oscillator for sound effects
let oscillator = null;

// Initialize audioCtx for sound effects
let audioCtx = null;

// Initialize the canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Set background color
canvas.style.backgroundColor = "MediumSpringGreen";

ctx.globalAlpha = 0.5; // Set global alpha for the entire canvas

window.onresize = () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
};

// Background music + sound effect
function playAudio() {
  // Background music
  const audio = document.getElementById("myAudio");
  if (audio) {
    audio.volume = 1;
    audio.loop = true;
    audio.play().catch((error) => console.error("Error playing audio:", error));
  } else {
    console.error("Audio element not found");
  }
  // create web audio api context
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  // create Oscillator node
  oscillator = audioCtx.createOscillator();

  oscillator.type = "sine";
  let gainNode = audioCtx.createGain();
  gainNode.gain = 0.01;
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  oscillator.start();
}

window.addEventListener("click", playAudio);

// Global canvas setting
ctx.lineWidth = 0.2; // Stroke width
ctx.shadowOffsetX = 0; // Rectangles' x shadow
ctx.shadowOffsetY = 20; // Rectangles' y shadow
ctx.shadowBlur = 10; // Shadow blur
ctx.shadowColor = "rgba(0, 0, 0, 0.05)"; // Shadow color

// Random colors for the squares to draw
function getRandomHSLColor() {
  let hueType;

  // If value > 0.75, draw blue
  if (Math.random() > 0.75) {
    hueType = "blue";

    // If value > 0.5, draw green
  } else if (Math.random() > 0.5) {
    hueType = "green";

    // If value < 0.75, draw pink or red
  } else {
    hueType = Math.random() < 0.75 ? "pink" : "red";
  }

  let hue;
  switch (hueType) {
    case "blue":
      hue = Math.floor(Math.random() * 60) + 210; // Hue for blue
      break;
    case "green":
      hue = Math.floor(Math.random() * 60) + 100; // Hue for green
      break;
    case "pink":
      hue = Math.floor(Math.random() * 60) + 310; // Hue for pink
      break;
    case "red":
      hue = Math.floor(Math.random() * 60) + 0; // Hue for red
      break;
  }

  const saturation = Math.floor(Math.random() * 100); // Random saturation value between 0 and 80
  const lightness = Math.floor(Math.random() * 5) + 60; // Random lightness value between 60 and 65
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`; // String of the values of hue, saturation, and lightness.
}

class Root {
  constructor(x, y, color, ctx) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.color = color; // store the color
    this.speedX = Math.random() * 20 - 15; // random speed for horizontal movement
    this.speedY = Math.random() * 20 - 15; // random speed for vertical movement
    this.maxSize = Math.random() * 25 + 35; // maximum size the object can grow to
    this.size = Math.random() * 5 + 7; // random size
    this.vs = Math.random() * 0.2 + 0.2; // random value for grow size
    this.angleX = Math.random() * 6.2; //random horizontal angles for rotation
    this.vax = Math.random() * 0.6 - 0.3; // random rates of change of the X rotation angles
    this.angleY = Math.random() * 6.2; //random vertical angles for rotation
    this.vay = Math.random() * 0.6 - 0.3; // random rates of change of the Y rotation angles
    this.angle = 0; // current rotation angle
    this.va = Math.random() * 0.02 + 0.05; //random value to adjust this angle over time, affecting the object's rotation speed.
    this.lightness = 10; // set lightness
  }

  update(ctx) {
    this.x += this.speedX + Math.sin(this.angleX); //positive value: move to the right, negative value: move to the left
    this.y += this.speedY + Math.sin(this.angleY); // negative value: move upward, positive value: downward
    this.size += this.vs;
    this.angleX += this.vax;
    this.angleY += this.vay;
    this.angle += this.va;
    if (this.lightness < 60) this.lightness += 0.25;
    if (this.size < this.maxSize) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.fillStyle = this.color; // Use the stored color
      ctx.fillRect(0, 0, this.size, this.size);
      ctx.strokeStyle = `hsl(63, 100%, ${this.lightness}%)`;
      ctx.strokeRect(0, 0, this.size * 2, this.size * 2);
      requestAnimationFrame(() => this.update(ctx)); // Pass ctx to the next frame
      ctx.restore();
    }
  }
}

window.addEventListener("mousemove", function (e) {
  const root = new Root(e.clientX, e.clientY, getRandomHSLColor(), ctx);
  root.update(ctx); // Pass ctx to the update method

  oscillator?.frequency.setValueAtTime(
    50 + 700 * (1.0 - e.clientY / window.innerHeight),
    audioCtx.currentTime
  ); // value in hertz
});
