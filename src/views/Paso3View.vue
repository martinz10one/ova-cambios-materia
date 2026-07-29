<template>
  <div class="paso3">
    <ParticleBackground color="#ff6f00" :count="35" :speed="0.4" />
    <ProgressBar :paso-actual="3" />

    <div class="contenido-interior">
      <section class="tarjeta">
        <h2 class="titulo-seccion">Actividad: Arrastra y Empareja</h2>
        <p class="intro-descripcion">Arrastra cada nombre de cambio de estado hacia su definicion correcta.</p>

        <div class="juego-header">
          <div class="juego-info">
            <span class="juego-score">Aciertos: {{ aciertos }}/6</span>
            <span class="juego-intentos">Intentos: {{ intentos }}</span>
          </div>
          <button class="boton boton-secundario" @click="reiniciar">Reiniciar</button>
        </div>

        <div class="area-juego">
          <div class="columna-nombres">
            <h3 class="columna-titulo">Cambios de estado</h3>
            <div class="nombres-lista">
              <div
                v-for="(item, idx) in items"
                :key="item.id"
                v-show="!item.emparejado"
                class="tarjeta-arrastrable"
                :class="{ arrastrando: item.arrastrando }"
                draggable="true"
                @dragstart="onDragStart($event, idx)"
                @dragend="onDragEnd(idx)"
                @touchstart="onTouchStart($event, idx)"
                @touchmove="onTouchMove($event)"
                @touchend="onTouchEnd($event)"
              >
                {{ item.nombre }}
              </div>
            </div>
          </div>

          <div class="columna-definiciones">
            <h3 class="columna-titulo">Definiciones</h3>
            <div class="definiciones-lista">
              <div
                v-for="(def, dIdx) in definiciones"
                :key="def.id"
                class="contenedor-drop"
                :class="{
                  'drop-activo': dropActivo === dIdx,
                  'drop-correcto': def.resultado === 'correcto',
                  'drop-incorrecto': def.resultado === 'incorrecto',
                  'drop-lleno': def.emparejadoCon !== null
                }"
                @dragenter="onDragEnter(dIdx)"
                @dragover.prevent
                @dragleave="onDragLeave(dIdx)"
                @drop="onDrop($event, dIdx)"
              >
                <span class="definicion-texto">{{ def.texto }}</span>
                <span v-if="def.emparejadoCon !== null" class="drop-respuesta">
                  <span class="etiqueta-respuesta">{{ items.find(i => i.id === def.emparejadoCon)?.nombre }}</span>
                </span>
                <span v-else class="etiqueta-placeholder">Suelta aqui</span>
              </div>
            </div>
          </div>
        </div>

        <div v-if="completado" class="resultado-final">
          <div class="resultado-card">
            <div class="resultado-icono">
              <svg width="64" height="64" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="30" fill="none" stroke="#3fb950" stroke-width="3">
                  <animate attributeName="r" values="28;32;28" dur="1s" repeatCount="indefinite"/>
                </circle>
                <path d="M20 32l8 8 16-16" fill="none" stroke="#3fb950" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3>Completaste la actividad!</h3>
            <p>Aciertos: {{ aciertos }}/6 | Intentos: {{ intentos }}</p>
            <div class="opciones-navegacion">
              <router-link to="/paso2" class="boton boton-secundario">← Paso 2</router-link>
              <router-link to="/paso4" class="boton boton-principal">Paso 4: Evaluacion →</router-link>
            </div>
          </div>
        </div>

        <div v-if="!completado" class="navegacion">
          <router-link to="/paso2" class="boton boton-secundario">← Paso 2</router-link>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import ParticleBackground from '../components/ParticleBackground.vue'
import ProgressBar from '../components/ProgressBar.vue'

export default {
  name: 'Paso3View',
  components: { ParticleBackground, ProgressBar },
  setup() {
    const aciertos = ref(0)
    const intentos = ref(0)
    const dropActivo = ref(null)
    const arrastrandoIdx = ref(null)
    const touchId = ref(null)
    let scrollObserver = null

    const items = ref([
      { id: 0, nombre: 'Fusion', emparejado: false, arrastrando: false },
      { id: 1, nombre: 'Solidificacion', emparejado: false, arrastrando: false },
      { id: 2, nombre: 'Vaporizacion', emparejado: false, arrastrando: false },
      { id: 3, nombre: 'Condensacion', emparejado: false, arrastrando: false },
      { id: 4, nombre: 'Sublimacion', emparejado: false, arrastrando: false },
      { id: 5, nombre: 'Sublimacion Inversa', emparejado: false, arrastrando: false }
    ])

    const definiciones = ref([
      { id: 0, texto: 'Cambio de solido a liquido por absorcion de calor.', emparejadoCon: null, resultado: null, correcta: 0 },
      { id: 1, texto: 'Cambio de liquido a solido por perdida de calor.', emparejadoCon: null, resultado: null, correcta: 1 },
      { id: 2, texto: 'Cambio de liquido a gaseoso mediante calor intenso.', emparejadoCon: null, resultado: null, correcta: 2 },
      { id: 3, texto: 'Cambio de gaseoso a liquido por enfriamiento.', emparejadoCon: null, resultado: null, correcta: 3 },
      { id: 4, texto: 'Cambio directo de solido a gaseoso sin pasar por liquido.', emparejadoCon: null, resultado: null, correcta: 4 },
      { id: 5, texto: 'Cambio directo de gaseoso a solido sin pasar por liquido.', emparejadoCon: null, resultado: null, correcta: 5 }
    ])

    const completado = computed(() => aciertos.value === 6)

    function onDragStart(e, idx) {
      if (items.value[idx].emparejado) return
      items.value[idx].arrastrando = true
      arrastrandoIdx.value = idx
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData('text/plain', idx.toString())
    }

    function onDragEnd(idx) {
      items.value[idx].arrastrando = false
      dropActivo.value = null
      arrastrandoIdx.value = null
    }

    function onDragEnter(dIdx) {
      if (definiciones.value[dIdx].emparejadoCon !== null) return
      dropActivo.value = dIdx
    }

    function onDragLeave(dIdx) {
      if (dropActivo.value === dIdx) dropActivo.value = null
    }

    function onDrop(e, dIdx) {
      e.preventDefault()
      dropActivo.value = null
      const idx = parseInt(e.dataTransfer.getData('text/plain'))
      if (isNaN(idx)) return
      verificarEmparejamiento(idx, dIdx)
    }

    let touchClone = null

    function onTouchStart(e, idx) {
      if (items.value[idx].emparejado) return
      const touch = e.touches[0]
      touchId.value = idx
      const el = e.currentTarget
      const rect = el.getBoundingClientRect()
      touchClone = el.cloneNode(true)
      touchClone.style.position = 'fixed'
      touchClone.style.zIndex = '1000'
      touchClone.style.pointerEvents = 'none'
      touchClone.style.width = rect.width + 'px'
      touchClone.style.opacity = '0.8'
      touchClone.className = 'tarjeta-arrastrable'
      touchClone.style.left = (touch.clientX - rect.width / 2) + 'px'
      touchClone.style.top = (touch.clientY - rect.height / 2) + 'px'
      document.body.appendChild(touchClone)
      el.style.opacity = '0.3'
      items.value[idx].arrastrando = true
    }

    function onTouchMove(e) {
      if (!touchClone) return
      const touch = e.touches[0]
      touchClone.style.left = (touch.clientX - touchClone.offsetWidth / 2) + 'px'
      touchClone.style.top = (touch.clientY - touchClone.offsetHeight / 2) + 'px'
      const drops = document.querySelectorAll('.contenedor-drop')
      drops.forEach((drop, dIdx) => {
        const r = drop.getBoundingClientRect()
        if (touch.clientX >= r.left && touch.clientX <= r.right && touch.clientY >= r.top && touch.clientY <= r.bottom) {
          dropActivo.value = dIdx
        } else if (dropActivo.value === dIdx) {
          dropActivo.value = null
        }
      })
    }

    function onTouchEnd(e) {
      if (!touchClone) return
      document.body.removeChild(touchClone)
      touchClone = null
      if (touchId.value !== null) {
        items.value[touchId.value].arrastrando = false
        const el = document.querySelector(`.tarjeta-arrastrable[data-idx]`)
        if (dropActivo.value !== null) {
          verificarEmparejamiento(touchId.value, dropActivo.value)
        } else {
          const touch = e.changedTouches[0]
          const drops = document.querySelectorAll('.contenedor-drop')
          drops.forEach((drop, dIdx) => {
            const r = drop.getBoundingClientRect()
            if (touch.clientX >= r.left && touch.clientX <= r.right && touch.clientY >= r.top && touch.clientY <= r.bottom) {
              verificarEmparejamiento(touchId.value, dIdx)
            }
          })
        }
        const itemsEl = document.querySelectorAll('.tarjeta-arrastrable')
        itemsEl.forEach(el => { el.style.opacity = '1' })
        dropActivo.value = null
        touchId.value = null
      }
    }

    function verificarEmparejamiento(itemIdx, defIdx) {
      intentos.value++
      const item = items.value[itemIdx]
      const def = definiciones.value[defIdx]

      if (def.emparejadoCon !== null) {
        const prevItem = items.value.find(i => i.id === def.emparejadoCon)
        if (prevItem) prevItem.emparejado = false
      }

      if (item.id === def.correcta) {
        aciertos.value++
        def.resultado = 'correcto'
        item.emparejado = true
        def.emparejadoCon = item.id
        gsap.fromTo(`.contenedor-drop:nth-child(${defIdx + 1})`, { scale: 1 }, { scale: 1.03, duration: 0.3, yoyo: true, repeat: 1 })
      } else {
        def.resultado = 'incorrecto'
        setTimeout(() => {
          def.resultado = null
        }, 1200)
        if (item.emparejado) item.emparejado = false
        if (def.emparejadoCon === item.id) def.emparejadoCon = null
        gsap.fromTo(`.contenedor-drop:nth-child(${defIdx + 1})`, { x: 0 }, { x: 10, duration: 0.1, yoyo: true, repeat: 5 })
      }
    }

    function reiniciar() {
      aciertos.value = 0
      intentos.value = 0
      items.value.forEach(i => { i.emparejado = false; i.arrastrando = false })
      definiciones.value.forEach(d => { d.emparejadoCon = null; d.resultado = null })
    }

    onMounted(() => {
      const cards = document.querySelectorAll('.tarjeta-arrastrable')
      gsap.fromTo(cards, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, delay: 0.3 })
    })

    onBeforeUnmount(() => {
      if (scrollObserver) scrollObserver.disconnect()
    })

    return { items, definiciones, aciertos, intentos, completado, dropActivo, onDragStart, onDragEnd, onDragEnter, onDragLeave, onDrop, onTouchStart, onTouchMove, onTouchEnd, reiniciar }
  }
}
</script>

<style scoped>
.paso3 {
  min-height: 100vh;
}

.juego-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--espaciado-grande);
  flex-wrap: wrap;
  gap: var(--espaciado-mediano);
}

.juego-info {
  display: flex;
  gap: var(--espaciado-mediano);
  flex-wrap: wrap;
}

.juego-score {
  font-size: 1rem;
  font-weight: 700;
  padding: 8px 16px;
  background: rgba(63, 185, 80, 0.12);
  border-radius: 8px;
  color: var(--color-exito);
}

.juego-intentos {
  font-size: 1rem;
  font-weight: 600;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  color: var(--color-texto-claro);
}

.area-juego {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--espaciado-enorme);
}

.columna-titulo {
  color: var(--color-blanco);
  font-size: 0.9rem;
  margin-bottom: var(--espaciado-mediano);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--color-texto-claro);
}

.nombres-lista,
.definiciones-lista {
  display: flex;
  flex-direction: column;
  gap: var(--espaciado-mediano);
}

.tarjeta-arrastrable {
  padding: 12px var(--espaciado-mediano);
  background: linear-gradient(135deg, rgba(46, 125, 50, 0.2), rgba(46, 125, 50, 0.1));
  border: 2px dashed var(--color-primario);
  border-radius: var(--radio-borde);
  text-align: center;
  font-weight: 600;
  color: var(--color-blanco);
  cursor: grab;
  transition: var(--transition);
  user-select: none;
  font-size: 0.95rem;
}

.tarjeta-arrastrable:hover {
  transform: scale(1.03);
  background: rgba(46, 125, 50, 0.35);
  box-shadow: 0 4px 12px rgba(46, 125, 50, 0.3);
}

.tarjeta-arrastrable.arrastrando {
  opacity: 0.4;
  transform: scale(0.95);
  cursor: grabbing;
}

.contenedor-drop {
  min-height: 60px;
  padding: var(--espaciado-mediano);
  border: 2px dashed rgba(139, 148, 158, 0.3);
  border-radius: var(--radio-borde);
  background: rgba(255, 255, 255, 0.02);
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--espaciado-mediano);
}

.contenedor-drop.drop-activo {
  border-color: var(--color-accento);
  background: rgba(255, 111, 0, 0.1);
  transform: scale(1.02);
}

.contenedor-drop.drop-lleno {
  border-style: solid;
  border-color: rgba(46, 125, 50, 0.5);
  background: rgba(46, 125, 50, 0.05);
}

.contenedor-drop.drop-correcto {
  border-color: var(--color-exito);
  background: rgba(63, 185, 80, 0.1);
  animation: pop 0.4s ease;
}

.contenedor-drop.drop-incorrecto {
  border-color: var(--color-error);
  background: rgba(248, 81, 73, 0.1);
  animation: shake 0.4s ease;
}

@keyframes pop {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-8px); }
  75% { transform: translateX(8px); }
}

.definicion-texto {
  color: var(--color-texto-claro);
  font-size: 0.85rem;
  flex: 1;
  line-height: 1.5;
}

.drop-respuesta {
  flex-shrink: 0;
}

.etiqueta-respuesta {
  padding: 4px 12px;
  border-radius: 16px;
  background: rgba(46, 125, 50, 0.2);
  color: var(--color-exito);
  font-size: 0.8rem;
  font-weight: 600;
  white-space: nowrap;
}

.etiqueta-placeholder {
  color: var(--color-texto-claro);
  font-size: 0.8rem;
  opacity: 0.4;
  flex-shrink: 0;
}

.resultado-final {
  margin-top: var(--espaciado-enorme);
  animation: slideUp 0.5s ease;
}

.resultado-card {
  text-align: center;
  padding: var(--espaciado-enorme);
  background: rgba(63, 185, 80, 0.05);
  border: 1px solid rgba(63, 185, 80, 0.2);
  border-radius: var(--radio-borde);
}

.resultado-icono {
  margin-bottom: var(--espaciado-mediano);
}

.resultado-card h3 {
  color: var(--color-exito);
  font-size: 1.5rem;
  margin-bottom: var(--espaciado-pequeño);
}

.resultado-card p {
  color: var(--color-texto-claro);
  font-size: 1rem;
  margin-bottom: var(--espaciado-grande);
}

.opciones-navegacion {
  display: flex;
  gap: var(--espaciado-mediano);
  justify-content: center;
  flex-wrap: wrap;
}

.navegacion {
  display: flex;
  justify-content: center;
  margin-top: var(--espaciado-grande);
  padding: var(--espaciado-grande) 0;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .area-juego {
    grid-template-columns: 1fr;
  }

  .juego-header {
    flex-direction: column;
    align-items: stretch;
  }

  .contenedor-drop {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
