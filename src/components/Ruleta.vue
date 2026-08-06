<template>
  <div class="ruleta">
    <div class="ruleta-mesa">
      <div class="ruleta-puntero"></div>
      <svg viewBox="0 0 360 360" class="ruleta-svg">
        <g :style="{ transform: `rotate(${rotacion}deg)`, transformOrigin: '180px 180px' }">
          <path v-for="(s, i) in segmentos" :key="i" :d="s.path" :fill="s.color" />
          <text
            v-for="(s, i) in segmentos"
            :key="'t' + i"
            :x="s.tx"
            :y="s.ty"
            :transform="`rotate(${s.tRot} ${s.tx} ${s.ty})`"
            class="ruleta-texto"
            text-anchor="middle"
            dominant-baseline="middle"
          >{{ s.nombre }}</text>
          <circle cx="180" cy="180" r="15" fill="#161b22" stroke="#30363d" stroke-width="2" />
        </g>
      </svg>
    </div>

    <div class="ruleta-controles">
      <button class="boton boton-principal" :disabled="girando" @click="girar">
        {{ girando ? 'Girando...' : 'Girar ruleta' }}
      </button>
      <p v-if="resultado" class="ruleta-resultado">Turno de: <strong>{{ resultado }}</strong></p>
      <p class="ruleta-contador">{{ pasados.length }} de {{ nombres.length }} sorteados</p>
    </div>

    <div v-if="pasados.length" class="ruleta-pasados">
      <p class="ruleta-pasados-titulo">Ya pasaron:</p>
      <div class="ruleta-chips">
        <span v-for="n in pasados" :key="n" class="chip">{{ n }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import gsap from 'gsap'

const capitalizar = (n) => n.split(/\s+/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

const NOMBRES = [
  'erick amaya', 'oscar arciniegas', 'nicolas arias', 'andres avila', 'ivan figueroa',
  'sneyder gomez', 'yorman gomez', 'maria gomez', 'juan gualdron', 'luis llanos',
  'diego monsalve', 'javier ortega', 'paula rache', 'nicolas rivera', 'julian rodriguez',
  'juan rodriguez', 'cristian romero', 'maria saavedra', 'david sierra', 'karen suarez',
  'juan viviescas', 'jefferson zambrano', 'martin zapata', 'nicolas cuadros'
].map(capitalizar)

export default {
  name: 'Ruleta',
  setup() {
    const R = 160
    const CX = 180
    const CY = 180
    const inner = 15

    const rotacion = ref(0)
    const girando = ref(false)
    const resultado = ref('')
    const pasados = ref([])

    let cola = []

    function barajar(arr) {
      const a = arr.slice()
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[a[i], a[j]] = [a[j], a[i]]
      }
      return a
    }

    cola = barajar(NOMBRES)

    const segmentos = computed(() => {
      const N = NOMBRES.length
      const step = 360 / N
      const colores = ['#e91e63', '#2196f3', '#ff9800', '#9c27b0', '#00bcd4', '#4caf50']
      return NOMBRES.map((nombre, i) => {
        const a0 = (i * step - 90) * Math.PI / 180
        const a1 = ((i + 1) * step - 90) * Math.PI / 180
        const x0o = CX + R * Math.cos(a0)
        const y0o = CY + R * Math.sin(a0)
        const x1o = CX + R * Math.cos(a1)
        const y1o = CY + R * Math.sin(a1)
        const x0i = CX + inner * Math.cos(a0)
        const y0i = CY + inner * Math.sin(a0)
        const x1i = CX + inner * Math.cos(a1)
        const y1i = CY + inner * Math.sin(a1)
        const path = `M ${x0o.toFixed(2)} ${y0o.toFixed(2)} A ${R} ${R} 0 0 1 ${x1o.toFixed(2)} ${y1o.toFixed(2)} L ${x1i.toFixed(2)} ${y1i.toFixed(2)} A ${inner} ${inner} 0 0 0 ${x0i.toFixed(2)} ${y0i.toFixed(2)} Z`
        const tRot = (i + 0.5) * step - 90
        const mid = tRot * Math.PI / 180
        const tr = (R + inner) / 2 - 4
        const tx = CX + tr * Math.cos(mid)
        const ty = CY + tr * Math.sin(mid)
        return { nombre, path, color: colores[i % colores.length], tx, ty, tRot }
      })
    })

    function girar() {
      if (girando.value || cola.length === 0) return
      const nombre = cola.shift()
      const idx = NOMBRES.indexOf(nombre)
      const step = 360 / NOMBRES.length
      const segMid = (idx + 0.5) * step
      const destino = 360 - segMid
      const total = 360 * (4 + Math.floor(Math.random() * 3)) + destino + (Math.random() * 10 - 5)
      girando.value = true
      gsap.to(rotacion, {
        value: total,
        duration: 4.5,
        ease: 'power4.out',
        onComplete: () => {
          rotacion.value = ((total % 360) + 360) % 360
          resultado.value = nombre
          pasados.value.push(nombre)
          if (cola.length === 0) cola = barajar(NOMBRES)
          girando.value = false
        }
      })
    }

    return { nombres: NOMBRES, segmentos, rotacion, girando, resultado, pasados, girar }
  }
}
</script>

<style scoped>
.ruleta-mesa {
  position: relative;
  width: min(320px, 100%);
  aspect-ratio: 1;
  margin: 0 auto;
}

.ruleta-svg {
  width: 100%;
  height: 100%;
  display: block;
}

.ruleta-puntero {
  position: absolute;
  top: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 14px solid transparent;
  border-right: 14px solid transparent;
  border-top: 26px solid var(--color-accento);
  z-index: 2;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4));
}

.ruleta-texto {
  fill: #ffffff;
  font-size: 8.5px;
  font-weight: 700;
  letter-spacing: 0.3px;
}

.ruleta-controles {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--espaciado-mediano);
  margin-top: var(--espaciado-grande);
  text-align: center;
}

.ruleta-resultado {
  color: var(--color-blanco);
  font-size: 1.05rem;
}

.ruleta-resultado strong {
  color: var(--color-accento);
}

.ruleta-contador {
  color: var(--color-texto-claro);
  font-size: 0.85rem;
}

.ruleta-pasados {
  margin-top: var(--espaciado-mediano);
}

.ruleta-pasados-titulo {
  color: var(--color-texto-claro);
  font-size: 0.85rem;
  margin-bottom: 8px;
}

.ruleta-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.chip {
  padding: 4px 12px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(48, 54, 61, 0.5);
  color: var(--color-blanco);
  font-size: 0.8rem;
}
</style>
