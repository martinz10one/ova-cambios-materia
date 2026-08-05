<template>
  <div class="paso3">
    <ParticleBackground color="#ff6f00" :count="35" :speed="0.4" />
    <ProgressBar :paso-actual="3" />

    <div class="contenido-interior">
      <section class="tarjeta">
        <h2 class="titulo-seccion">Actividad: Arrastra y Empareja</h2>
        <p class="intro-descripcion">Arrastra cada nombre de cambio de estado hacia su definición correcta.</p>

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
      </section>

      <section class="tarjeta reveal-section">
        <h2 class="titulo-seccion">Juego: ¿Qué factor interviene?</h2>
        <p class="intro-descripcion">Cada situación describe un cambio de estado de la vida diaria. Elige cuál de los tres factores (temperatura, presión o energía) es el que lo provoca.</p>

        <div v-if="!factoresTerminado" class="factores-juego">
          <div class="factores-progreso">Situación {{ factorActual + 1 }} de {{ factoresJuego.length }}</div>
          <div class="factores-pregunta">{{ factoresJuego[factorActual].situacion }}</div>
          <div class="factores-opciones">
            <button
              v-for="f in factorOpciones"
              :key="f"
              class="factor-opcion"
              :class="{
                'opcion-correcta': factorRespondido && f === factoresJuego[factorActual].factor,
                'opcion-incorrecta': factorRespondido && factorSeleccion === f && f !== factoresJuego[factorActual].factor,
                'opcion-desactivada': factorRespondido && f !== factorSeleccion
              }"
              :disabled="factorRespondido"
              @click="responderFactor(f)"
            >
              {{ f }}
            </button>
          </div>
          <div v-if="factorRespondido" class="mensaje" :class="factorCorrecto ? 'mensaje-exito' : 'mensaje-error'">
            <strong>{{ factorCorrecto ? '¡Correcto!' : 'Incorrecto' }}</strong>
            <p class="mensaje-texto">{{ factoresJuego[factorActual].explicacion }}</p>
          </div>
          <div v-if="factorRespondido" class="factores-avance">
            <button v-if="factorActual < factoresJuego.length - 1" class="boton boton-principal" @click="siguienteFactor">Siguiente situación →</button>
            <button v-else class="boton boton-principal" @click="finalizarFactores">Ver resultado</button>
          </div>
        </div>

        <div v-else class="factores-resultado">
          <h3 class="resultado-titulo">Resultado del juego</h3>
          <p class="resultado-numero">Acertaste <strong>{{ factoresAciertos }}</strong> de {{ factoresJuego.length }} situaciones</p>
          <p class="resultado-mensaje">
            {{ factoresAciertos === factoresJuego.length
              ? '¡Perfecto! Domina los tres factores que provocan los cambios de estado.'
              : factoresAciertos >= 4
                ? 'Buen trabajo. Repasa las explicaciones de las situaciones que fallaste.'
                : 'Repasa el Paso 2 y vuelve a intentarlo.' }}
          </p>
          <button class="boton boton-secundario" @click="reiniciarFactores">Jugar de nuevo</button>
        </div>
      </section>

      <div class="navegacion">
        <router-link to="/paso2" class="boton boton-secundario">← Paso 2</router-link>
        <router-link to="/paso4" class="boton boton-principal">Paso 4: Evaluacion →</router-link>
      </div>
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
      { id: 0, texto: 'Cambio de sólido a líquido por absorción de calor.', emparejadoCon: null, resultado: null, correcta: 0 },
      { id: 1, texto: 'Cambio de líquido a sólido por pérdida de calor.', emparejadoCon: null, resultado: null, correcta: 1 },
      { id: 2, texto: 'Cambio de líquido a gaseoso mediante calor intenso.', emparejadoCon: null, resultado: null, correcta: 2 },
      { id: 3, texto: 'Cambio de gaseoso a líquido por enfriamiento.', emparejadoCon: null, resultado: null, correcta: 3 },
      { id: 4, texto: 'Cambio directo de sólido a gaseoso sin pasar por líquido.', emparejadoCon: null, resultado: null, correcta: 4 },
      { id: 5, texto: 'Cambio directo de gaseoso a sólido sin pasar por líquido.', emparejadoCon: null, resultado: null, correcta: 5 }
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

    const factorOpciones = ['Temperatura', 'Presión', 'Energía']
    const factoresJuego = [
      { situacion: 'Un cubo de hielo se derrite al sacarlo de la nevera.', factor: 'Temperatura', explicacion: 'A temperatura ambiente el hielo gana calor y sus partículas se mueven hasta fundirse.' },
      { situacion: 'El agua hierve a menos de 100°C en la cima de una montaña.', factor: 'Presión', explicacion: 'A menor presión atmosférica, las partículas escapan con menos energía y el agua hierve antes.' },
      { situacion: 'La ropa mojada se seca tendida al sol.', factor: 'Energía', explicacion: 'La energía calorífica del sol hace que las partículas del agua pasen al aire como vapor.' },
      { situacion: 'La escarcha se forma en las ventanas en invierno.', factor: 'Temperatura', explicacion: 'La baja temperatura hace que el vapor del ambiente se congele directo en cristales.' },
      { situacion: 'Una olla a presión cocina los alimentos más rápido.', factor: 'Presión', explicacion: 'Al aumentar la presión, el agua hierve a mayor temperatura y la cocción es más rápida.' },
      { situacion: 'El vapor de la ducha empaña el espejo del baño.', factor: 'Temperatura', explicacion: 'El vapor toca la superficie fría del espejo, pierde energía y se condensa en gotitas.' }
    ]
    const factorActual = ref(0)
    const factorRespondido = ref(false)
    const factorSeleccion = ref('')
    const factoresAciertos = ref(0)
    const factoresTerminado = ref(false)

    const factorCorrecto = computed(() => factorSeleccion.value === factoresJuego[factorActual.value].factor)

    function responderFactor(f) {
      if (factorRespondido.value) return
      factorSeleccion.value = f
      factorRespondido.value = true
      if (f === factoresJuego[factorActual.value].factor) factoresAciertos.value++
    }

    function siguienteFactor() {
      factorActual.value++
      factorRespondido.value = false
      factorSeleccion.value = ''
    }

    function finalizarFactores() {
      factoresTerminado.value = true
    }

    function reiniciarFactores() {
      factorActual.value = 0
      factorRespondido.value = false
      factorSeleccion.value = ''
      factoresAciertos.value = 0
      factoresTerminado.value = false
    }

    onMounted(() => {
      const cards = document.querySelectorAll('.tarjeta-arrastrable')
      gsap.fromTo(cards, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, delay: 0.3 })

      const revealElements = document.querySelectorAll('.reveal-section')
      scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            gsap.fromTo(entry.target, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
            const opts = entry.target.querySelectorAll('.factor-opcion')
            if (opts.length) {
              gsap.fromTo(opts, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.12, delay: 0.3, ease: 'back.out(1.2)' })
            }
            scrollObserver.unobserve(entry.target)
          }
        })
      }, { threshold: 0.15 })
      revealElements.forEach(el => scrollObserver.observe(el))
    })

    onBeforeUnmount(() => {
      if (scrollObserver) scrollObserver.disconnect()
    })

    return { items, definiciones, aciertos, intentos, completado, dropActivo, onDragStart, onDragEnd, onDragEnter, onDragLeave, onDrop, onTouchStart, onTouchMove, onTouchEnd, reiniciar, factorOpciones, factoresJuego, factorActual, factorRespondido, factorSeleccion, factoresAciertos, factoresTerminado, factorCorrecto, responderFactor, siguienteFactor, finalizarFactores, reiniciarFactores }
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

.factores-juego {
  display: flex;
  flex-direction: column;
  gap: var(--espaciado-mediano);
}

.factores-progreso {
  color: var(--color-primario);
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.factores-pregunta {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(48, 54, 61, 0.4);
  border-radius: var(--radio-borde);
  padding: var(--espaciado-grande);
  color: var(--color-blanco);
  font-size: 1.05rem;
  line-height: 1.6;
}

.factores-opciones {
  display: flex;
  gap: var(--espaciado-mediano);
  flex-wrap: wrap;
}

.factor-opcion {
  flex: 1;
  min-width: 150px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(48, 54, 61, 0.5);
  border-radius: var(--radio-borde);
  padding: var(--espaciado-mediano);
  color: var(--color-blanco);
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
}

.factor-opcion:hover:not(:disabled) {
  border-color: var(--color-primario);
  background: rgba(46, 125, 50, 0.08);
  transform: translateY(-3px);
}

.factor-opcion.opcion-correcta {
  border-color: var(--color-exito) !important;
  background: rgba(63, 185, 80, 0.15) !important;
  animation: pop 0.3s ease;
}

.factor-opcion.opcion-incorrecta {
  border-color: var(--color-error) !important;
  background: rgba(248, 81, 73, 0.15) !important;
  animation: shake 0.3s ease;
}

.factor-opcion.opcion-desactivada {
  opacity: 0.35;
  cursor: default;
}

.mensaje-texto {
  margin-top: var(--espaciado-pequeño);
  line-height: 1.6;
}

.factores-avance {
  display: flex;
  justify-content: flex-end;
}

.factores-resultado {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--espaciado-mediano);
  padding: var(--espaciado-grande) 0;
  text-align: center;
}

.resultado-titulo {
  color: var(--color-blanco);
  font-size: 1.3rem;
}

.resultado-numero {
  color: var(--color-blanco);
  font-size: 1.1rem;
}

.resultado-numero strong {
  color: var(--color-primario);
  font-size: 1.4rem;
}

.resultado-mensaje {
  color: var(--color-texto-claro);
  line-height: 1.6;
  max-width: 480px;
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

  .factores-opciones {
    flex-direction: column;
  }

  .contenedor-drop {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
