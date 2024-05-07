document.body.style.margin   = 0
document.body.style.overflow = `hidden`

const cnv = document.getElementById (`cnv_element`)
cnv.width = window.innerWidth
cnv.height = window.innerHeight

const ctx = cnv.getContext (`2d`)

const draw_frame = () => {
   ctx.fillStyle = `turquoise`
   ctx.fillRect (0, 0, innerWidth, innerHeight)

   requestAnimationFrame (draw_frame)

   ctx.fillStyle = 'white';
   ctx.fillRect(250, 150, 100, 200);
}

draw_frame ()

window.onresize = () => {
   cnv.width = innerWidth
   cnv.height = innerHeight   
}

class Particle {

}

class Effect {

}

function animate() {

}