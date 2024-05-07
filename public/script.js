// document.body.style.margin   = 0;
// document.body.style.overflow = `hidden`;

const canvas = document.getElementById (`canvas_element`);
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
context = ctx;
ctx.fillStyle = 'red';
console.log(ctx);

class Particle {
   constructor(effect) {
      this.effect = effect;
      this.x = Math.random() * this.effect.width;
      this.y = Math.random() * this.effect.height;
      this.radius = 15;
   }
   draw(context){
      context.fillStyle = 'hsl('+ this.x +', 100%, 50%)';
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      context.fill();
   }
}

class Effect {
   constructor(canvas){
      this.canvas = canvas;
      this.width = this.canvas.width;
      this.height = this.canvas.height;
      this.particles = [];
      this.numberOfParticles = 20;
      this.createParticles();
   }
   createParticles(){
      for (let i = 0; i < this.numberOfParticles; i++) {
         this.particles.push(new Particle(this));
      }
   }
   handleParticles(){
      this.particles.forEach(particle => {
         particle.draw(context);
      })
   }

}

const effect = new Effect(canvas);
effect.handleParticles(ctx);

function animate() {

}