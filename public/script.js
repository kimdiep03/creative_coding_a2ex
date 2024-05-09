document.body.style.margin   = 0;
document.body.style.overflow = `hidden`;

const canvas = document.getElementById (`canvas_element`);
const ctx = canvas.getContext('2d');

// Initialize the canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Set background color
canvas.style.backgroundColor = 'magenta';

context = ctx;
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
ctx.shadowColor = 'rgab(0, 0, 0 0.5)'; // Change to a contrasting color for visibility

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
   constructor(x, y, color) {
      this.x = x;
      this.y = y;
      this.color = color; // store the initial color
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
   }


   update() {
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
         requestAnimationFrame(() => this.update()); // pass ctx to the next frame
         ctx.restore();
      } 
      }
   }


window.addEventListener('mousemove', function(e)){
         const root = new Root(e.clientX, e.clientY, getRandomHSLColor()); // 
         root.update(); // context to the update method

}