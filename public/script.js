document.body.style.margin   = 0;
document.body.style.overflow = `hidden`;

const canvas = document.getElementById (`canvas_element`);
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.fillStyle = 'red';
context = ctx;
console.log(ctx);
const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
gradient.addColorStop(0, 'LightPink');
gradient.addColorStop(0.25, 'DeepPink');
gradient.addColorStop(0.5, 'Magenta');
gradient.addColorStop(0.75, 'HotPink');
gradient.addColorStop(1,'Fuchsia');
ctx.fillStyle = gradient;

window.onresize = () => {
   canvas.width = innerWidth
   canvas.height = innerHeight   
}

class Particle {
   constructor(effect) {
      this.effect = effect;
      this.radius = Math.random() * 20 + 17;
      this.x = Math.random() * this.effect.width;
      this.y = Math.random() * this.effect.height;
      this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2);
      this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2);
      this.vx = Math.random() * 4 - 2;
      this.vy = Math.random() * 4 - 2;

   
   }
   draw(context){
      //context.fillStyle = 'hsl('+ this.x * 0.1 +', 100%, 50%)';
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      context.fill();
      context.stroke();
   }

   update() {
      if (this.effect.mouse.pressed) {
         const dx = this.x - this.effect.mouse.x;
         const dy = this.y - this.effect.mouse.y;

         const distance = Math.hypot(dx, dy);
         if (distance < this.effect.mouse.radius) {
            const angle = Math.atan2(dy, dx);
            this.x += Math.cos(angle);
            this.y += Math.sin(angle);
         }
      }
      
      this.x += this.vx;
      if (this.x > this.effect.width - this.radius || this.x < this.radius) this.vx *= -1;
      
      this.y += this.vy;
      if (this.x > this.effect.height - this.radius || this.y < this.radius) this.vy *= -1;
   }

   reset() {
      this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2);
      this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2);
   }
}

class Effect {
   constructor(canvas, context){
      this.canvas = canvas;
      this.context = context;
      this.width = this.canvas.width;
      this.height = this.canvas.height;
      this.particles = [];
      this.numberOfParticles = 500;
      this.createParticles();

      this.mouse = {
         x: 0,
         y: 0, 
         pressed: false, 
         radius: 150
      }

      window.addEventListener('resize', e => {
         this.resize(e.target.window.innerWidth, e.target.window.innerHeight);
      });

      window.addEventListener('mousemove', e => {
         if (this.mouse.pressed){
            this.mouse.x = e.x;
            this.mouse.y = e.y;
        }
      });

      window.addEventListener('mousedown', e => {
         this.mouse.pressed = true;
         this.mouse.x = e.x;
         this.mouse.y = e.y;
      });

      window.addEventListener('mouseup', e => {
         this.mouse.pressed = false;
      });
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
   resize(width, height) {
      this.canvas.width = width;
      this.canvas.height = height;
      this.width = width;
      this.height = height;
      const gradient = this.context.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
      gradient.addColorStop(0, 'LightPink');
      gradient.addColorStop(0.25, 'DeepPink');
      gradient.addColorStop(0.5, 'Magenta');
      gradient.addColorStop(0.75, 'HotPink');
      gradient.addColorStop(1,'Fuchsia');
      this.context.fillStyle = gradient;
      this.particles.forEach(particle => {
         particle.reset();
      })
   }

}

const effect = new Effect(canvas, ctx);

function animate() {
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   effect.handleParticles(ctx);
   requestAnimationFrame(animate);
}
animate();