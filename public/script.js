document.body.style.margin   = 0;
document.body.style.overflow = `hidden`;

const canvas = document.getElementById (`canvas_element`);
const ctx = canvas.getContext('2d');

// Initialize canvas dimensions 
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Set background color
canvas.style.backgroundColor = 'magenta';

console.log(ctx);

ctx.globalAlpha = 0.2; // Set global alpha for the entire canvas

window.onresize = () => {
   canvas.width = innerWidth
   canvas.height = innerHeight   
}

ctx.lineWidth = 0.5;
ctx.shadowOffsetX = 0;
ctx.shadowOffsetY = 20;
ctx.shadowBlur = 10;
ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'; // Corrected typo in rgba
let roots = [];

function getRandomHSLColor() {
   let hueType;
   if (Math.random() > 0.75) {
      hueType = 'blue';
   } else if (Math.random() > 0.5) {
      hueType = 'green';
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
      this.color = color; // store the initial color
      this.ctx = ctx; //store the context
      this.speedX = Math.random() * 10 - 7; // random speed for horizontal movement
      this.speedY = Math.random() * 10 - 7; // random speed for vertical movement
      this.maxSize = Math.random() * 20 + 30; // maximum size the object can grow to
      this.size = Math.random() * 3 + 5;
      this.vs = Math.random() * 0.2 + 0.2; 
      this.angleX = Math.random() * 6.2;
      this.vax = Math.random() * 0.6 - 0.3;
      this.angleY = Math.random() * 6.2;
      this.vay = Math.random() * 0.6 - 0.3;
      this.angle = 0;
      this.va = Math.random() * 0.02 + 0.05;
      this.lightness = 10;
      this.glitchFactor = Math.random() * 0.1; // Add a glitch factor
   }


   update() {
      // Apply glitch effect to position
      this.x += this.speedX + Math.sin(this.angleX) * this.glitchFactor; //positive value: move to the right, negative value: move to the left
      this.y += this.speedY + Math.sin(this.angleY) * this.glitchFactor;// negative value: move upward, positive value: downward
       // Apply glitch factor to size
      this.size += this.vs * this.glitchFactor;
      this.angleX += this.vax;
      this.angleY += this.vay;
      this.angle += this.va;
      if (this.lightness < 60) this.lightness += 0.25;
      if (this.size < this.maxSize) {

         this.ctx.save();
         this.ctx.translate(this.x, this.y);
         this.ctx.rotate(this.angle);
         // Apply glitch factor to color
         this.ctx.fillStyle = this.color + '' + this.glitchFactor; // Use the stored color 
         this.ctx.fillRect(0, 0, this.size, this.size);
         this.ctx.strokeStyle = `hsl(63, 100%, ${this.lightness}%)`;
         this.ctx.strokeRect(0, 0, this.size * 2, this.size * 2);
         this.ctx.restore();

         // Start the animation loop
         requestAnimationFrame(() => this.update());
      } 
       // Randomly change direction or speed
      if (Math.random() < 0.01) { // 1% chance
         this.speedX *= -1; // Reverse direction
         this.speedY *= -1; // Reverse direction
     }
      // Shrink back to minimum size
      if (this.size > 5) {
         this.size -= 0.5;
  }
  
      }
   }


window.addEventListener('mousemove', function(e){
         const root = new Root(e.clientX, e.clientY, getRandomHSLColor(), ctx); // 
         roots.push(root); 

});

function rgbSplit(imageData, offsets) {
   const { width, height } = imageData;
   const updatedImageData = new Uint8ClampedArray(width * height * 4);
   for (let i = 0; i < width * height * 4; i += 4) {
       const r = imageData[i];
       const g = imageData[i + 1];
       const b = imageData[i + 2];
       const a = imageData[i + 3];

       // Apply offsets
       const rOffset = offsets.rOffset;
       const gOffset = offsets.gOffset;
       const bOffset = offsets.bOffset;

       // Ensure the new values stay within the valid range
       const rNew = Math.min(Math.max(r + rOffset, 0), 255);
       const gNew = Math.min(Math.max(g + gOffset, 0), 255);
       const bNew = Math.min(Math.max(b + bOffset, 0), 255);
       const aNew = a; // Assuming alpha remains unchanged

       // Update the pixel data
       updatedImageData[i] = rNew;
       updatedImageData[i + 1] = gNew;
       updatedImageData[i + 2] = bNew;
       updatedImageData[i + 3] = aNew;
   }

   return updatedImageData;
}

function applyGlitchEffect() {
   try {
       const ctx = canvas.getContext('2d');
       const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
       const updatedImageData = rgbSplit(imageData, { rOffset: 20, gOffset: -10, bOffset: 10 });
       ctx.putImageData(updatedImageData, 0, 0);
   } catch (error) {
       console.error("Failed to apply glitch effect:", error);
   }
}

function animate() {
   // Clear the canvas
   ctx.clearRect(0, 0, canvas.width, canvas.height);

   // Update and draw each Root instance
   roots.forEach(root => {
       root.update();
       // Optionally, apply the glitch effect here
   });
   
   applyGlitchEffect();


   // Request the next frame
   requestAnimationFrame(animate);
}

// Start the animation loop
animate();