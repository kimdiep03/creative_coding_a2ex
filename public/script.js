document.body.style.margin   = 0;
document.body.style.overflow = `hidden`;

const canvas = document.getElementById (`canvas_element`);
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.fillStyle = 'red';
context = ctx;
console.log(ctx);

class Particle {
   constructor(effect) {
      this.effect = effect;
      this.radius = Math.random() * 40 + 30;
      this.x = Math.random() * this.effect.width;
      this.y = Math.random() * this.effect.height;
      this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2);
      this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2);
      this.vx = Math.random() * 7 - 4;
      this.vy = Math.random() * 7 - 4;

   
   }
   draw(context){
      context.fillStyle = 'hsl('+ this.x * 0.1 +', 100%, 50%)';
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      context.fill();
      context.stroke();
   }

   update() {
      this.x += this.vx;
      if (this.x > this.effect.width - this.radius || this.x < this.radius) this.vx *= -1;
      
      this.y += this.vy;
      if (this.x > this.effect.height - this.radius || this.y < this.radius) this.vy *= -1;
   }
}

class Effect {
   constructor(canvas){
      this.canvas = canvas;
      this.width = this.canvas.width;
      this.height = this.canvas.height;
      this.particles = [];
      this.numberOfParticles = 200;
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
         particle.update();
      });
   }

}

const effect = new Effect(canvas);

function animate() {
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   effect.handleParticles(ctx);
   requestAnimationFrame(animate);
}
animate();