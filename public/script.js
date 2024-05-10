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

// Background music
function playAudio() {
  // Background music
  // Find an HTML element with the ID myAudio
  const audio = document.getElementById("myAudio");

  if (audio) {
    // Volume of background music
    audio.volume = 1;

    // Enables looping background music
    audio.loop = true;

    // Play background music
    audio.play().catch((error) => console.error("Error playing audio:", error));
  } else {
    // If the element is not found, logs an error message to the console
    console.error("Audio element not found");
  }

  // Create Web Audio API context
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  // create Oscillator node -- generates a waveform
  oscillator = audioCtx.createOscillator();

  // Type of waveform: sine -- pure sine wave sound
  oscillator.type = "sine";

  // Controls the volume of the audio signal
  let gainNode = audioCtx.createGain();

  // Volume is 0.01
  gainNode.gain = 0.01;

  // To connect oscillator and gainNode
  oscillator.connect(gainNode);

  // Gain node is connected to the audio context's destination (the speakers)
  gainNode.connect(audioCtx.destination);

  // Call oscillator
  oscillator.start();
}

// Clicks anywhere on the page, the playAudio function is called (background music and sound effect)
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

    // Else, value < 0.75, draw pink or red
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
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`; // String of the values of hue, saturation, and lightness
}

class Root {
  constructor(x, y, color, ctx) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.color = color;
    this.speedX = Math.random() * 20 - 15; // Random speed for horizontal movement
    this.speedY = Math.random() * 20 - 15; // Random speed for vertical movement
    this.maxSize = Math.random() * 25 + 35; // Maximum size the object can grow to
    this.size = Math.random() * 5 + 7; // Random size
    this.vs = Math.random() * 0.2 + 0.2; // Random value for grow size
    this.angleX = Math.random() * 6.2; //Random horizontal angles for rotation
    this.vax = Math.random() * 0.6 - 0.3; // Random rates of change of the X rotation angles
    this.angleY = Math.random() * 6.2; //Random vertical angles for rotation
    this.vay = Math.random() * 0.6 - 0.3; // Random rates of change of the Y rotation angles
    this.angle = 0; // Current rotation angle
    this.va = Math.random() * 0.02 + 0.05; //Random value to adjust this angle over time, affecting the object's rotation speed
    this.lightness = 10; // Set lightness
  }

  update(ctx) {
    this.x += this.speedX + Math.sin(this.angleX); // Positive value: move to the right, negative value: move to the left
    this.y += this.speedY + Math.sin(this.angleY); // Negative value: move upward, positive value: downward
    this.size += this.vs; //  Increases the size of the squares by random vs value (grow over time)
    this.angleX += this.vax; // The rotation X angles of the squares based on vax (control the rate of change of the rotation angles)
    this.angleY += this.vay; // The rotation Y angles of the squares based on vay (control the rate of change of the rotation angles)
    this.angle += this.va; // The overall rotation angle of the suqraes

    // If the lightness of the object's color is less than 60
    // -> increases the lightness by 0.25
    // -> making the object brighter over time
    if (this.lightness < 60) this.lightness += 0.25;

    // If the object's size is less than its maximum size -> the square is drawn on the canvas
    if (this.size < this.maxSize) {
      // Save and restore the current state of the canvas context
      // Ensures that drawing operations are performed relative to the object's position and rotation
      ctx.save();

      // Translation
      ctx.translate(this.x, this.y);

      // Rotation
      ctx.rotate(this.angle);

      // Color
      ctx.fillStyle = this.color;

      // Set the fill color of the squares
      // Draw a filled rectangle
      ctx.fillRect(0, 0, this.size, this.size);

      // Set the stroke color
      ctx.strokeStyle = `hsl(63, 100%, ${this.lightness}%)`;
      ctx.strokeRect(0, 0, this.size * 2, this.size * 2);

      // Creates a loop that continuously updates and redraws
      requestAnimationFrame(() => this.update(ctx));
      ctx.restore();
    }
  }
}

// The event object e
// Everytime the mouse move over the canvas
window.addEventListener("mousemove", function (e) {
  // Code to execute when the mouse moves
  // Root class is created

  // e.clientX and e.clientY -- the horizontal X and vertical Y coordinates of the mouse pointer
  // getRandomHSLColor() -- returns a random HSL
  // ctx -- to a canvas context, used to draw the graphical object on the canvas
  const root = new Root(e.clientX, e.clientY, getRandomHSLColor(), ctx);

  // Updates the state of the object (position, size, color) and redrawing it on the canvas
  // Argument ctx
  root.update(ctx);

  // Adjusts the frequency of an oscillator based on the vertical position of the mouse cursor
  oscillator?.frequency.setValueAtTime(
    // 50 is a base frequency
    // 700 is a range of frequencies
    // 1 at the top of the window to 0 at the bottom
    // Mapping the Y position of the mouse to a frequency range from 50-700 Hz
    50 + 700 * (1.0 - e.clientY / window.innerHeight),
    audioCtx.currentTime
  ); // value in hertz
});

// ?. operator is used to safely access the frequency property of the oscillator
// If oscillator is null or undefined -> will not throw an error
