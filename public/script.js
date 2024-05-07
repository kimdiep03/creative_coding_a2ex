document.body.style.margin   = 0;
document.body.style.overflow = `hidden`;

const canvas = document.getElementById (`canvas_element`);
const ctx = canvas.getContext (`2d`);
canvas.width = innerWidth;
canvas.height = innerHeight;
console.log(ctx);

class Particle {

}

class Effect {
   constructor(canvas){
      this.canvas = canvas;
      this.width = this.canvas.width;
      this.height = this.canvas.height;
   }

}

function animate() {

}