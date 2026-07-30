<template>
  <div class="simulador">
    <div class="sim-header">
      <div class="sim-estado">
        <span class="sim-label">Estado actual:</span>
        <span class="sim-valor" :style="{ color: estadoColor }">{{ estadoActual }}</span>
      </div>
      <div class="sim-temp">
        <span class="sim-label">Temperatura:</span>
        <span class="sim-valor">{{ temp }}°C</span>
      </div>
    </div>

    <div class="sim-canvas-wrapper">
      <canvas ref="canvas" class="sim-canvas"></canvas>
      <div class="sim-particulas-info">
        <span>{{ particulas.length }} particulas</span>
      </div>
    </div>

    <div class="sim-controls">
      <button class="sim-btn sim-btn-frio" @click="bajarTemp" :disabled="temp <= -50">
        <svg width="16" height="16" viewBox="0 0 16 16"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>
        Enfriar
      </button>
      <div class="sim-bar">
        <div class="sim-bar-fill" :style="{ width: ((temp + 50) / 150) * 100 + '%', background: `hsl(${(1 - (temp + 50) / 150) * 240}, 80%, 55%)` }"></div>
        <div class="sim-bar-marks">
          <span class="sim-mark solido-mark">Solido</span>
          <span class="sim-mark liquido-mark">Liquido</span>
          <span class="sim-mark gas-mark">Gas</span>
        </div>
      </div>
      <button class="sim-btn sim-btn-calor" @click="subirTemp" :disabled="temp >= 100">
        Calentar
        <svg width="16" height="16" viewBox="0 0 16 16"><line x1="8" y1="3" x2="8" y2="13" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'

export default {
  name: 'ParticleSimulator',
  setup() {
    const canvas = ref(null)
    const temp = ref(20)
    const particulas = ref([])
    let animId = null
    const w = 460
    const h = 260

    const estadoActual = computed(() => {
      if (temp.value < 0) return 'Solido'
      if (temp.value < 50) return 'Liquido'
      return 'Gaseoso'
    })

    const estadoColor = computed(() => {
      if (temp.value < 0) return '#4fc3f7'
      if (temp.value < 50) return '#29b6f6'
      return '#81d4fa'
    })

    function crearParticulas() {
      const p = []
      const count = 55
      for (let i = 0; i < count; i++) {
        p.push({
          x: Math.random() * (w - 40) + 20,
          y: Math.random() * (h - 40) + 20,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          r: Math.random() * 4 + 3,
          baseX: Math.random() * (w - 40) + 20,
          baseY: Math.random() * (h - 40) + 20,
          phase: Math.random() * Math.PI * 2
        })
      }
      return p
    }

    let ctx = null
    let lastTime = 0

    function animar(time) {
      if (!ctx) return
      const dt = Math.min((time - lastTime) / 16, 3)
      lastTime = time

      ctx.clearRect(0, 0, w, h)

      const t = temp.value
      const solid = t < 0
      const liquid = t >= 0 && t < 50
      const gas = t >= 50

      for (const p of particulas.value) {
        let speed, damping, spread

        if (solid) {
          const cold = Math.max(0, -t / 50)
          speed = 0.15 * (1 - cold * 0.6)
          damping = 0.85
          spread = 0.3
          const tx = p.baseX + Math.sin(time / 500 + p.phase) * spread
          const ty = p.baseY + Math.cos(time / 600 + p.phase * 1.3) * spread
          p.x += (tx - p.x) * 0.08
          p.y += (ty - p.y) * 0.08
          p.vx *= 0.9
          p.vy *= 0.9
        } else if (liquid) {
          const warmth = t / 50
          speed = 0.8 + warmth * 1.5
          damping = 0.92
          p.vx += (Math.random() - 0.5) * 0.3 * (1 + warmth)
          p.vy += (Math.random() - 0.5) * 0.3 * (1 + warmth)
          p.vx *= damping
          p.vy *= damping
          if (Math.abs(p.vx) < 0.1) p.vx += (Math.random() - 0.5) * 0.2
          if (Math.abs(p.vy) < 0.1) p.vy += (Math.random() - 0.5) * 0.2
          p.x += p.vx * speed
          p.y += p.vy * speed
          if (p.y > h - 20) { p.y = h - 20; p.vy *= -0.5 }
          if (p.y < 20) { p.y = 20; p.vy *= -0.5 }
          if (p.x > w - 15) { p.x = w - 15; p.vx *= -0.5 }
          if (p.x < 15) { p.x = 15; p.vx *= -0.5 }
          p.baseX = p.x
          p.baseY = p.y
        } else {
          speed = 3 + (t - 50) / 50 * 4
          damping = 0.96
          p.vx += (Math.random() - 0.5) * 0.6
          p.vy += (Math.random() - 0.5) * 0.6
          const maxV = speed
          const v = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
          if (v > maxV) { p.vx = (p.vx / v) * maxV; p.vy = (p.vy / v) * maxV }
          p.vx *= damping
          p.vy *= damping
          p.x += p.vx
          p.y += p.vy
          if (p.y > h - 10) { p.y = h - 10; p.vy *= -0.8 }
          if (p.y < 10) { p.y = 10; p.vy *= -0.8 }
          if (p.x > w - 10) { p.x = w - 10; p.vx *= -0.8 }
          if (p.x < 10) { p.x = 10; p.vx *= -0.8 }
          p.baseX = p.x
          p.baseY = p.y
        }

        let baseAlpha
        if (solid) baseAlpha = 0.7 + Math.random() * 0.2
        else if (liquid) baseAlpha = 0.6 + Math.random() * 0.3
        else baseAlpha = 0.4 + Math.random() * 0.3

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = estadoColor.value
        ctx.globalAlpha = baseAlpha
        ctx.fill()

        if (solid) {
          ctx.strokeStyle = 'rgba(79,195,247,0.15)'
          ctx.lineWidth = 0.5
          for (const q of particulas.value) {
            const dx = p.x - q.x
            const dy = p.y - q.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist < 25 && dist > 0) {
              ctx.beginPath()
              ctx.moveTo(p.x, p.y)
              ctx.lineTo(q.x, q.y)
              ctx.stroke()
            }
          }
        }
      }

      ctx.globalAlpha = 1
      animId = requestAnimationFrame(animar)
    }

    function subirTemp() {
      temp.value = Math.min(100, temp.value + 5)
    }

    function bajarTemp() {
      temp.value = Math.max(-50, temp.value - 5)
    }

    onMounted(() => {
      const el = canvas.value
      if (!el) return
      el.width = w
      el.height = h
      ctx = el.getContext('2d')
      particulas.value = crearParticulas()
      lastTime = performance.now()
      animId = requestAnimationFrame(animar)
    })

    onBeforeUnmount(() => {
      if (animId) cancelAnimationFrame(animId)
    })

    return { canvas, temp, particulas, estadoActual, estadoColor, subirTemp, bajarTemp }
  }
}
</script>

<style scoped>
.simulador {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(48, 54, 61, 0.4);
  border-radius: var(--radio-borde);
  padding: var(--espaciado-mediano);
  max-width: 500px;
  margin: 0 auto;
}

.sim-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--espaciado-mediano);
  flex-wrap: wrap;
  gap: var(--espaciado-mediano);
}

.sim-label {
  font-size: 0.75rem;
  color: var(--color-texto-claro);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
}

.sim-valor {
  font-size: 1.2rem;
  font-weight: 800;
  margin-left: 8px;
}

.sim-canvas-wrapper {
  position: relative;
  margin-bottom: var(--espaciado-mediano);
}

.sim-canvas {
  width: 100%;
  height: auto;
  aspect-ratio: 460/260;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(48, 54, 61, 0.3);
}

.sim-particulas-info {
  position: absolute;
  bottom: 8px;
  right: 8px;
  font-size: 0.7rem;
  color: var(--color-texto-claro);
  opacity: 0.5;
}

.sim-controls {
  display: flex;
  align-items: center;
  gap: var(--espaciado-mediano);
}

.sim-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  border: 1px solid rgba(48, 54, 61, 0.5);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  color: var(--color-blanco);
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  white-space: nowrap;
}

.sim-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.sim-btn-frio:hover:not(:disabled) {
  border-color: #58a6ff;
  background: rgba(88, 166, 255, 0.12);
  color: #58a6ff;
}

.sim-btn-calor:hover:not(:disabled) {
  border-color: #ff6f00;
  background: rgba(255, 111, 0, 0.12);
  color: #ff6f00;
}

.sim-bar {
  flex: 1;
  height: 8px;
  border-radius: 4px;
  background: rgba(48, 54, 61, 0.5);
  position: relative;
  overflow: visible;
  min-width: 100px;
}

.sim-bar-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.3s ease, background 0.3s ease;
}

.sim-bar-marks {
  display: flex;
  justify-content: space-between;
  margin-top: 14px;
  position: absolute;
  width: 100%;
  top: 8px;
  left: 0;
}

.sim-mark {
  font-size: 0.6rem;
  color: var(--color-texto-claro);
  opacity: 0.6;
  font-weight: 600;
  text-transform: uppercase;
}

@media (max-width: 480px) {
  .sim-controls {
    flex-wrap: wrap;
    justify-content: center;
  }
  .sim-bar {
    order: -1;
    width: 100%;
    flex: none;
  }
}
</style>
