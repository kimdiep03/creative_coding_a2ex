document.body.style.margin   = 0
document.body.style.overflow = `hidden`

const canvas = document.getElementById (`canvas_element`)
canvas.width = innerWidth
canvas.height = innerHeight

const context = canvas.getContext (`2d`)

const draw_frame = () => {
   context.fillStyle = `turquoise`;
   context.fillRect (0, 0, innerWidth, innerHeight)

   requestAnimationFrame(draw_frame);
}

draw_frame ();

window.onresize = () => {
   canvas.width = innerWidth;
   canvas.height = innerHeight;
}

class Particle {
   constructor(effect) {
      this.effect = effect;
      this.x = Math.random() * this.effect.width; // random value between 0 and effect width
      this.y = Math.random() * this.effect.height; // random value between 0 and effect height
      this.radius = 15;

   }
   draw(context) {
      context.fillStyle = 'red';
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, MATH.PI * 2);
      context.fill();
   }
}

class Effect {
    constructor(canvas) {
      this.canvas = canvas;
      this.width = this.canvas.width; //width of the effect
      this.height = this.canvas.height; //width of the effect
      this.particles = [];
      this.numberOfParticles = 20;
    }
   createParticles() {
      for (let i = 0; i < this.numberOfParticles; i++) {
         this.particles.push(new Particle(this));
      }
   }
   handleParticles() {
      this.particles.forEach(particle => {
         particle.draw(context);
      });
   }
}

const effect = new Effect(canvas);
effect.handleParticles(context);


function animate() {


}