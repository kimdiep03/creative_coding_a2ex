document.body.style.margin   = 0;
document.body.style.overflow = `hidden`;

const canvas = document.getElementById (`canvas_element`);
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.backgroundColor = 'black';

context = ctx;
console.log(ctx);

ctx.globalAlpha = 0.2; // Set global alpha for the entire canvas

window.onresize = () => {
   canvas.width = innerWidth
   canvas.height = innerHeight   
}

ctx.lineWidth = 0.2;
ctx.shadowOffsetX = 0;
ctx.shadowOffsetY = 10;
ctx.shadowBlur = 10;
ctx.shadowColor = 'rgab(0, 0, 0 0.5)'; // Change to a contrasting color for visibility

function getRandomHSLColor() {
   const hue = Math.floor(Math.random() * 60) + 200;
   const saturation = Math.floor(Math.random() * 80);
   const lightness = Math.floor(Math.random() * 80);
   return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

class Root {
   constructor(x, y, color) {
      this.x = x;
      this.y = y;
      this.color = color; // store the initial color
      this.speedX = Math.random() * 5 - 3; // random speed for horizontal movement
      this.speedY = Math.random() * 5 - 3; // random speed for vertical movement
      this.maxSize = Math.random() * 7 + 30; // maximum size the object can grow to
      this.size = Math.random() * 1 + 2;
      this.vs = Math.random() * 0.2 + 0.1; 
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
      if (this.lightness < 70) this.lightness += 0.25;
      if (this.size < this.maxSize) {


         ctx.save();
         ctx.translate(this.x, this.y);
         ctx.rotate(this.angle);
         ctx.fillStyle = this.color; // Use the stored color 
         ctx.fillRect(0, 0, this.size, this.size);
         ctx.strokeStyle = `hsl(169, 100%, ${this.lightness}%)`;
         ctx.strokeRect(0, 0, this.size * 2, this.size * 2);
         requestAnimationFrame(() => this.update()); // pass ctx to the next frame
         ctx.restore();
      } 
      }
   }


window.addEventListener('mousemove', function(e){
         const root = new Root(e.clientX, e.clientY, getRandomHSLColor()); // 
         root.update(); // context to the update method

});
