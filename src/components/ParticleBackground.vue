<template>
  <canvas ref="canvas" class="particle-bg"></canvas>
</template>

<script>
export default {
  name: 'ParticleBackground',
  data() {
    return {
      animId: null,
      particles: [],
      canvas: null,
      ctx: null,
      mouse: { x: -1000, y: -1000 }
    }
  },
  props: {
    color: { type: String, default: '#2e7d32' },
    count: { type: Number, default: 60 },
    speed: { type: Number, default: 0.5 }
  },
  mounted() {
    this.canvas = this.$refs.canvas
    this.ctx = this.canvas.getContext('2d')
    this.resize()
    this.init()
    this.animate()
    window.addEventListener('resize', this.resize)
    window.addEventListener('mousemove', this.onMouseMove)
  },
  beforeUnmount() {
    if (this.animId) cancelAnimationFrame(this.animId)
    window.removeEventListener('resize', this.resize)
    window.removeEventListener('mousemove', this.onMouseMove)
  },
  methods: {
    resize() {
      this.canvas.width = window.innerWidth
      this.canvas.height = window.innerHeight
    },
    onMouseMove(e) {
      this.mouse.x = e.clientX
      this.mouse.y = e.clientY
    },
    init() {
      this.particles = []
      const w = this.canvas.width
      const h = this.canvas.height
      for (let i = 0; i < this.count; i++) {
        this.particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * this.speed,
          vy: (Math.random() - 0.5) * this.speed,
          radius: Math.random() * 3 + 1,
          opacity: Math.random() * 0.5 + 0.2
        })
      }
    },
    animate() {
      const ctx = this.ctx
      const w = this.canvas.width
      const h = this.canvas.height
      ctx.clearRect(0, 0, w, h)

      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i]
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1

        for (let j = i + 1; j < this.particles.length; j++) {
          const q = this.particles[j]
          const dx = p.x - q.x
          const dy = p.y - q.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.strokeStyle = this.color
            ctx.globalAlpha = (1 - dist / 120) * 0.15
            ctx.lineWidth = 0.5
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.stroke()
          }
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.globalAlpha = p.opacity
        ctx.fill()

        const mdx = this.mouse.x - p.x
        const mdy = this.mouse.y - p.y
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy)
        if (mdist < 200 && mdist > 0) {
          p.vx -= (mdx / mdist) * 0.02
          p.vy -= (mdy / mdist) * 0.02
        }
      }

      ctx.globalAlpha = 1
      this.animId = requestAnimationFrame(this.animate)
    }
  }
}
</script>

<style scoped>
.particle-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}
</style>