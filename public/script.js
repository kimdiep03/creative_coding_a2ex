document.body.style.margin   = 0;
document.body.style.overflow = `hidden`;

const canvas = document.getElementById (`canvas_element`);
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.backgroundColor = 'black';

context = ctx;
console.log(ctx);

window.onresize = () => {
   canvas.width = innerWidth
   canvas.height = innerHeight   
}

class Root {
   constructor(x, y) {
      this.x = x;
      this.y = y;
      this.speedX = Math.random() * 4 - 2; // random speed for horizontal movement
      this.speedY = Math.random() * 4 - 2; // random speed for vertical movement
      this.maxSize = Math.random() * 7 + 5; // maximum size the object can grow to
      this.size = Math.random() * 1 + 2;
      this.vs = Math.random() * 0.2 + 0.05; 
      this.angleX = Math.random() * 6.2;
      this.vax = Math.random() * 0.6 - 0.3;
      this.angleY = Math.random() * 6.2;
      this.vay = Math.random() * 0.6 - 0.3;
      this.lightness = 10;
   }


   update() {
      this.x += this.speedX + Math.sin(this.angleX); //positive value: move to the right, negative value: move to the left
      this.y += this.speedY + Math.sin(this.angleY);// negative value: move upward, positive value: downward
      this.size += this.vs;
      this.angleX += this.vax;
      this.angleY += this.vay;
      if (this.lightness < 70) this.lightness += 0.25;
      if (this.size < this.maxSize) {
         ctx.beginPath();
         ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
         ctx.fillStyle = `hsl(140, 100%, ${this.lightness}%)`; 

         ctx.fill();
         ctx.stroke();
         requestAnimationFrame(() => this.update()); // pass ctx to the next frame
      }
   }
}

window.addEventListener('mousemove', function(e){
   if (drawing) {
      for (let i = 0; i< 3; i++) {
         const root = new Root(e.clientX, e.clientY); // use clientX and clientY for mouse position
         root.update(); // context to the update method
      }  
   } 
});



