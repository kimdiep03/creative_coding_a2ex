document.body.style.margin   = 0;
document.body.style.overflow = `hidden`;

const canvas = document.getElementById (`canvas_element`);
const layer2 = document.getElementById (`layer2`);

const ctx = canvas.getContext('2d');
const ctx2 = layer2.getContext('2d');

// Initialize the canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Initialize layer2 size
layer2.width = window.innerWidth;
layer2.height = window.innerHeight;

// Set background color
canvas.style.backgroundColor = 'MediumSpringGreen';

//context = ctx;
console.log(ctx);

const CELL_SIZE = 32;
let WIDTH_CELLS = null;
let HEIGHT_CELLS = null;

let totalTime = 0.0;

ctx.globalAlpha = 0.09; // Set global alpha for the entire canvas
//ctx2.globalAlpha = 0.005;

window.onresize = () => {
   canvas.width = innerWidth
   canvas.height = innerHeight   
}

ctx.lineWidth = 0.5;
ctx.shadowOffsetX = 0;
ctx.shadowOffsetY = 20;
ctx.shadowBlur = 10;
ctx.shadowColor = 'rgab(0, 0, 0, 0.5)'; // Change to a contrasting color for visibility

// Random colors for the squares to draw
function getRandomHSLColor() {
   let hueType;

   // If value > 0.75, draw blue 
   if (Math.random() > 0.75) {
      hueType = 'blue';
   
   // If value > 0.5, draw green 
   } else if (Math.random() > 0.5) {
      hueType = 'green';
   
   // If value < 0.75, draw pink or red
   } else {
      hueType = Math.random() < 0.75? 'pink' : 'red';
   }

   let hue;
   switch(hueType) {
      case 'blue':
         hue = Math.floor(Math.random() * 60) + 210; // Hue for blue
         break;
      case 'green':
         hue = Math.floor(Math.random() * 60) + 100; // Hue for green
         break;
      case 'pink':
         hue = Math.floor(Math.random() * 60) + 310; // Hue for pink
         break;
      case 'red':
         hue = Math.floor(Math.random() * 60) + 0; // Hue for red
         break;
   }

   const saturation = Math.floor(Math.random() * 80);
   const lightness = Math.floor(Math.random() * 5) + 60;
   return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

class Root {
   constructor(x, y, color, ctx) {
      this.x = x;
      this.y = y;
      this.ctx = ctx;
      this.color = color; // store the color
      this.speedX = Math.random() * 15 - 10; // random speed for horizontal movement
      this.speedY = Math.random() * 15 - 10; // random speed for vertical movement
      this.maxSize = Math.random() * 20 + 30; // maximum size the object can grow to
      this.size = Math.random() * 3 + 5; // random size
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
      this.y += this.speedY + Math.sin(this.angleY);// negative value: move upward, positive value: downward
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
         requestAnimationFrame(() => this.update(ctx)); // pass ctx to the next frame
         ctx.restore();
      } 
      }
   }


   window.addEventListener('mousemove', function(e) {
      const root = new Root(e.clientX, e.clientY, getRandomHSLColor(), ctx); // Pass ctx to the constructor
      root.update(ctx); // Pass ctx to the update method
   });

//    // Layer2: glass layer
//    function setup() {
//       layer2.width = window.innerWidth;
//       layer2.height = window.innerHeight;
//       WIDTH_CELLS = Math.ceil(window.innerWidth * window.devicePixelRatio / CELL_SIZE);
//       HEIGHT_CELLS = Math.ceil(window.innerHeight * window.devicePixelRatio / CELL_SIZE);
//       layer2.width = WIDTH_CELLS * CELL_SIZE;
//       layer2.height = HEIGHT_CELLS * CELL_SIZE;
      
//     }


//    function backgroundEffect() {
//       noStroke()
      
//       drawingContext.fillStyle = '#f00'
//       rect(0, 0, width, height)
      
//       drawingContext.fillStyle = '#0f0'
//       rect(100, 100, 200, 200)
//    }
 
//  // Define the glassSquare function
//  function glassSquare(cellX, cellY, gx, gy, color1, color2) {
//    const realLeft = cellX * CELL_SIZE;
//    const realTop = cellY * CELL_SIZE;
//    const gx1 = Math.max(1.0, Math.min(gx, 1.0));
//    const gy1 = Math.max(1.0, Math.min(gy, 1.0));
//    const gx2 = 1.0 - gx1;
//    const gy2 = 1.0 - gy1;

//    // Create a linear gradient for the fill
//    const gradient = ctx2.createLinearGradient(realLeft + gx1 * CELL_SIZE, realTop + gy1 * CELL_SIZE, realLeft + gx2 * CELL_SIZE, realTop + gy2 * CELL_SIZE);
//    gradient.addColorStop(0, color1);
//    gradient.addColorStop(1, color2);

//    // Optionally, you can add a border for a more distinct look
//    ctx2.strokeStyle = color2;
//    ctx2.strokeRect(realLeft, realTop, CELL_SIZE, CELL_SIZE);

//    // Fill the square with the gradient
//    ctx2.fillStyle = gradient;
//    ctx2.fillRect(realLeft, realTop, CELL_SIZE, CELL_SIZE);
// }
 
//    // Define the glass function with animation
//    function glass() {
//       for (let cellY = 0; cellY < HEIGHT_CELLS; ++cellY) {
//         for (let cellX = 0; cellX < WIDTH_CELLS; ++cellX) {
//           glassSquare(cellX, cellY, Math.abs(Math.sin(totalTime * 0.0005)), Math.abs(Math.cos(totalTime * 0.0005)), '#fffa', '#fff0')
//         }
//       }
//     }

//  // Define the draw function
//  function draw() {
//    totalTime += 0.0167; // Assuming 60 FPS, adjust as needed
//    ctx2.clearRect(0, 0, layer2.width, layer2.height); // Clear the canvas
//    glass();
//    requestAnimationFrame(draw); // Call draw again on next frame
// }
 
 
//    layer2.style.display = 'block';
   
//  // Call setup and start the animation loop
//    setup();
//    draw();

//    console.log(layer2)