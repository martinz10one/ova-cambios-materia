<template>
  <div class="paso4">
    <ParticleBackground color="#1565c0" :count="30" :speed="0.35" />
    <ProgressBar :paso-actual="4" />

    <div class="contenido-interior">
      <section class="tarjeta">
        <div class="titulo-seccion-row">
          <h2 class="titulo-seccion">Evaluación: Emparejamiento</h2>
          <button
            class="boton-icono-ruleta"
            :class="{ activo: mostrarRuleta }"
            :title="mostrarRuleta ? 'Ocultar ruleta' : 'Mostrar ruleta'"
            aria-label="Ruleta de participación"
            @click="mostrarRuleta = !mostrarRuleta"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/>
              <path d="M12 3 L12 21 M3 12 L21 12 M6.8 6.8 L17.2 17.2 M17.2 6.8 L6.8 17.2" stroke="currentColor" stroke-width="1.3"/>
              <path d="M12 3 L14 9 L10 9 Z" fill="currentColor"/>
            </svg>
          </button>
        </div>
        <p class="intro-descripcion">
          Selecciona la definición correcta para cada concepto. Al terminar, pulsa
          <strong>Verificar respuestas</strong> para conocer tu resultado.
        </p>

        <transition name="ruleta">
          <div v-if="mostrarRuleta" class="ruleta-contenedor">
            <Ruleta />
          </div>
        </transition>

        <div class="juego-header">
          <div class="juego-info">
            <span class="juego-score">Aciertos: {{ aciertosEmparejamiento }}/10</span>
            <span v-if="verificadoEmparejamiento" class="juego-intentos">Resultado: {{ mensajeResultado }}</span>
          </div>
          <button class="boton boton-secundario" @click="reiniciarEmparejamiento">Reiniciar</button>
        </div>

        <div class="emparejamiento">
          <div
            v-for="(item, idx) in emparejamiento"
            :key="item.id"
            class="fila-emparejar"
            :class="{
              'fila-correcta': item.resultado === 'correcto',
              'fila-incorrecta': item.resultado === 'incorrecto'
            }"
          >
            <div class="columna-emparejar">
              <span class="etiqueta-emparejar">{{ idx + 1 }}. {{ item.item }}</span>
            </div>
            <div class="columna-flecha">→</div>
            <div class="columna-emparejar">
              <select v-model="item.seleccion" :disabled="item.resultado === 'correcto'" @change="alEditarEmparejamiento(item)">
                <option :value="null">Selecciona una opción</option>
                <option
                  v-for="optIdx in opcionesMezcladas"
                  :key="optIdx"
                  :value="optIdx"
                  :disabled="opcionesBloqueadas.has(optIdx) && item.seleccion !== optIdx"
                >
                  {{ opcionesEmparejamiento[optIdx] }}
                </option>
              </select>
            </div>
            <span v-if="item.resultado" class="icono-emparejar">
              <span v-if="item.resultado === 'correcto'" class="check">✓</span>
              <span v-else class="cross">✗</span>
            </span>
          </div>
        </div>

        <div v-if="verificadoEmparejamiento" class="mensaje" :class="aciertosEmparejamiento >= 8 ? 'mensaje-exito' : 'mensaje-error'">
          <strong>{{ aciertosEmparejamiento >= 8 ? '¡Excelente!' : 'Repasa los conceptos' }}</strong>
          <br>
          Obtuviste {{ aciertosEmparejamiento }} de 10 aciertos. Revisa las filas marcadas en rojo para ver qué debes mejorar.
        </div>

        <div class="acciones mt-mediano">
          <button v-if="!verificadoEmparejamiento" class="boton boton-principal" @click="verificarEmparejamiento">Verificar respuestas</button>
        </div>
      </section>

      <section class="tarjeta">
        <h2 class="titulo-seccion">Evaluación: Verdadero o Falso</h2>
        <p class="intro-descripcion">
          Responde cada afirmación y obtén retroalimentación inmediata con la explicación de cada respuesta.
        </p>

        <div class="juego-header">
          <div class="juego-info">
            <span class="juego-score">Aciertos: {{ aciertosVf }}/10</span>
            <span v-if="respondidasVf === 10" class="juego-intentos">Completaste las 10 preguntas</span>
          </div>
          <button class="boton boton-secundario" @click="reiniciarVf">Reiniciar</button>
        </div>

        <div v-for="(pregunta, idx) in preguntasVf" :key="idx" class="fila-vf" :class="{
          'fila-correcta': pregunta.respondida && pregunta.seleccion === pregunta.correcta,
          'fila-incorrecta': pregunta.respondida && pregunta.seleccion !== pregunta.correcta
        }">
          <p class="enunciado-vf">{{ idx + 1 }}. {{ pregunta.enunciado }}</p>
          <div class="opciones-vf">
            <label class="opcion-vf-label" :class="{ 'seleccionada': pregunta.seleccion === true }">
              <input type="radio" :name="'vf-' + idx" :value="true" v-model="pregunta.seleccion" :disabled="pregunta.respondida" @change="responderVf(pregunta)" />
              Verdadero
            </label>
            <label class="opcion-vf-label" :class="{ 'seleccionada': pregunta.seleccion === false }">
              <input type="radio" :name="'vf-' + idx" :value="false" v-model="pregunta.seleccion" :disabled="pregunta.respondida" @change="responderVf(pregunta)" />
              Falso
            </label>
            <span v-if="pregunta.respondida" class="icono-vf">
              <span v-if="pregunta.seleccion === pregunta.correcta" class="check">✓</span>
              <span v-else class="cross">✗</span>
            </span>
          </div>
          <div v-if="pregunta.respondida" class="retroalimentacion-vf" :class="pregunta.seleccion === pregunta.correcta ? 'mensaje-exito' : 'mensaje-error'">
            {{ pregunta.explicacion }}
          </div>
        </div>

        <div v-if="respondidasVf === 10" class="mensaje mt-mediano" :class="aciertosVf >= 8 ? 'mensaje-exito' : 'mensaje-error'">
          <strong>Resultado final: {{ aciertosVf }} de 10</strong>
          <br>
          {{ aciertosVf >= 8 ? '¡Muy bien! Dominas los cambios de estado de la materia.' : 'Repasa los contenidos del Paso 2 y vuelve a intentarlo.' }}
        </div>
      </section>

      <section class="tarjeta">
        <h2 class="titulo-seccion">Resultado general</h2>
        <p class="intro-descripcion">Puntuación combinada de ambas evaluaciones.</p>
        <div class="texto-centrado">
          <div class="resultado-score">
            {{ (aciertosEmparejamiento + aciertosVf) }}/20
          </div>
          <p v-if="puntajeGeneral >= 16" class="mensaje mensaje-exito texto-centrado">Sobresaliente: demostraste un dominio completo del tema.</p>
          <p v-else-if="puntajeGeneral >= 12" class="mensaje mensaje-info texto-centrado">Buen nivel: repasa los conceptos en los que fallaste.</p>
          <p v-else class="mensaje mensaje-error texto-centrado">Te recomendamos revisar nuevamente los contenidos del Paso 2.</p>
          <div class="opciones-navegacion">
            <router-link to="/paso3" class="boton boton-secundario">← Paso 3</router-link>
            <router-link to="/" class="boton boton-accento">Volver al inicio</router-link>
          </div>
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
import Ruleta from '../components/Ruleta.vue'

export default {
  name: 'Paso4View',
  components: { ParticleBackground, ProgressBar, Ruleta },
  setup() {
    const opcionesEmparejamiento = [
      'Paso de sólido a líquido al ganar calor',
      'Paso de líquido a sólido al perder calor',
      'Paso de líquido a gas por calor intenso',
      'Paso de gas a líquido por enfriamiento',
      'Paso directo de sólido a gas sin pasar por líquido',
      'Paso directo de gas a sólido sin pasar por líquido',
      'Partículas ordenadas y compactas con forma fija',
      'Partículas cercanas que fluyen y toman la forma del recipiente',
      'Partículas separadas que se expanden sin forma ni volumen fijos',
      'Factor que impulsa todos los cambios de estado'
    ]

    const opcionesMezcladas = [9, 3, 0, 7, 5, 1, 8, 4, 2, 6]

    const emparejamiento = ref([
      { id: 0, item: 'Fusión', correcta: 0, seleccion: null, resultado: null },
      { id: 1, item: 'Solidificación', correcta: 1, seleccion: null, resultado: null },
      { id: 2, item: 'Vaporización', correcta: 2, seleccion: null, resultado: null },
      { id: 3, item: 'Condensación', correcta: 3, seleccion: null, resultado: null },
      { id: 4, item: 'Sublimación', correcta: 4, seleccion: null, resultado: null },
      { id: 5, item: 'Sublimación inversa', correcta: 5, seleccion: null, resultado: null },
      { id: 6, item: 'Sólido', correcta: 6, seleccion: null, resultado: null },
      { id: 7, item: 'Líquido', correcta: 7, seleccion: null, resultado: null },
      { id: 8, item: 'Gaseoso', correcta: 8, seleccion: null, resultado: null },
      { id: 9, item: 'Energía calórica', correcta: 9, seleccion: null, resultado: null }
    ])

    const verificadoEmparejamiento = ref(false)
    const aciertosEmparejamiento = ref(0)
    const mostrarRuleta = ref(false)

    const opcionesBloqueadas = computed(() => new Set(emparejamiento.value.filter(i => i.resultado === 'correcto').map(i => i.seleccion)))

    const mensajeResultado = computed(() => {
      const a = aciertosEmparejamiento.value
      if (a >= 8) return 'Excelente'
      if (a >= 5) return 'Regular'
      return 'Necesitas repasar'
    })

    const preguntasVf = ref([
      { enunciado: 'La fusión es el paso de un sólido a un líquido al ganar calor.', correcta: true, seleccion: null, respondida: false, explicacion: 'Verdadero. En la fusión, como el hielo que se derrite, el sólido absorbe calor y se convierte en líquido sin cambiar su composición.' },
      { enunciado: 'La solidificación ocurre cuando un gas pasa directamente a sólido.', correcta: false, seleccion: null, respondida: false, explicacion: 'Falso. La solidificación es el paso de líquido a sólido, como el agua que se congela. El paso directo de gas a sólido se llama sublimación inversa.' },
      { enunciado: 'La vaporización transforma un líquido en gas.', correcta: true, seleccion: null, respondida: false, explicacion: 'Verdadero. Al recibir calor intenso, el líquido se convierte en gas, como el agua hirviendo que produce vapor.' },
      { enunciado: 'La condensación es el paso de gas a líquido.', correcta: true, seleccion: null, respondida: false, explicacion: 'Verdadero. El gas pierde energía y sus partículas se agrupan formando gotas, como el vapor que empaña un espejo frío.' },
      { enunciado: 'La sublimación es el paso directo de sólido a gas.', correcta: true, seleccion: null, respondida: false, explicacion: 'Verdadero. El hielo seco pasa de sólido a gas sin convertirse primero en líquido.' },
      { enunciado: 'Los cambios de estado son cambios químicos.', correcta: false, seleccion: null, respondida: false, explicacion: 'Falso. Son cambios físicos: la sustancia sigue siendo la misma, solo cambia su estado de agregación.' },
      { enunciado: 'Al aumentar la temperatura, las partículas se mueven más rápido.', correcta: true, seleccion: null, respondida: false, explicacion: 'Verdadero. La energía térmica hace que las partículas vibren y se muevan con mayor velocidad, lo que puede provocar un cambio de estado.' },
      { enunciado: 'La sublimación inversa es el paso de líquido a sólido.', correcta: false, seleccion: null, respondida: false, explicacion: 'Falso. La sublimación inversa es el paso directo de gas a sólido, como la escarcha que se forma en las ventanas en invierno.' },
      { enunciado: 'La presión puede influir en el estado de la materia.', correcta: true, seleccion: null, respondida: false, explicacion: 'Verdadero. A mayor presión las partículas se comprimen y a menor presión se expanden, lo que puede modificar el estado de la materia.' },
      { enunciado: 'El vapor de una ducha que empaña el espejo es un ejemplo de fusión.', correcta: false, seleccion: null, respondida: false, explicacion: 'Falso. Es un ejemplo de condensación: el vapor se enfría al tocar la superficie fría y forma gotas de agua.' }
    ])

    const aciertosVf = computed(() => preguntasVf.value.filter(p => p.respondida && p.seleccion === p.correcta).length)
    const respondidasVf = computed(() => preguntasVf.value.filter(p => p.respondida).length)
    const puntajeGeneral = computed(() => aciertosEmparejamiento.value + aciertosVf.value)

    function verificarEmparejamiento() {
      const sinResponder = emparejamiento.value.some(i => i.seleccion === null)
      if (sinResponder) {
        gsap.fromTo('.fila-emparejar', { x: 0 }, { x: 8, duration: 0.08, yoyo: true, repeat: 3, stagger: 0.02 })
        return
      }
      let aciertos = 0
      emparejamiento.value.forEach(item => {
        if (item.seleccion === item.correcta) {
          item.resultado = 'correcto'
          aciertos++
        } else {
          item.resultado = 'incorrecto'
        }
      })
      aciertosEmparejamiento.value = aciertos
      verificadoEmparejamiento.value = true
      gsap.fromTo('.fila-emparejar.fila-correcta', { scale: 0.98 }, { scale: 1, duration: 0.4, stagger: 0.05, ease: 'back.out(2)' })
    }

    function alEditarEmparejamiento(item) {
      if (item.seleccion !== null) {
        const duplicado = emparejamiento.value.find(o => o !== item && o.seleccion === item.seleccion)
        if (duplicado) {
          duplicado.seleccion = null
          duplicado.resultado = null
        }
      }
      if (!verificadoEmparejamiento.value) return
      item.resultado = null
      verificadoEmparejamiento.value = false
      aciertosEmparejamiento.value = 0
    }

    function reiniciarEmparejamiento() {
      verificadoEmparejamiento.value = false
      aciertosEmparejamiento.value = 0
      emparejamiento.value.forEach(item => { item.seleccion = null; item.resultado = null })
    }

    function responderVf(pregunta) {
      pregunta.respondida = true
      gsap.fromTo('.fila-vf', { opacity: 1 }, { opacity: 1, duration: 0.2 })
    }

    function reiniciarVf() {
      preguntasVf.value.forEach(p => { p.seleccion = null; p.respondida = false })
    }

    let scrollObserver = null

    onMounted(() => {
      gsap.fromTo('.titulo-seccion', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, delay: 0.2 })

      const filas = document.querySelectorAll('.fila-emparejar')
      gsap.fromTo(filas, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.4, stagger: 0.05, delay: 0.4 })

      const revealSections = document.querySelectorAll('.tarjeta')
      scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            gsap.fromTo(entry.target, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
            scrollObserver.unobserve(entry.target)
          }
        })
      }, { threshold: 0.1 })

      revealSections.forEach(el => scrollObserver.observe(el))
    })

    onBeforeUnmount(() => {
      if (scrollObserver) scrollObserver.disconnect()
    })

    return {
      opcionesEmparejamiento,
      opcionesMezcladas,
      emparejamiento,
      opcionesBloqueadas,
      verificadoEmparejamiento,
      aciertosEmparejamiento,
      mensajeResultado,
      preguntasVf,
      aciertosVf,
      respondidasVf,
      puntajeGeneral,
      verificarEmparejamiento,
      reiniciarEmparejamiento,
      alEditarEmparejamiento,
      responderVf,
      reiniciarVf,
      mostrarRuleta
    }
  }
}
</script>

<style scoped>
.titulo-seccion-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--espaciado-mediano);
}

.boton-icono-ruleta {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(48, 54, 61, 0.6);
  background: rgba(255, 255, 255, 0.05);
  color: var(--color-accento);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
}

.boton-icono-ruleta:hover {
  background: rgba(255, 255, 255, 0.1);
  color: var(--color-blanco);
  transform: rotate(90deg);
}

.boton-icono-ruleta.activo {
  background: rgba(255, 111, 0, 0.15);
  border-color: rgba(255, 111, 0, 0.5);
}

.ruleta-contenedor {
  margin-bottom: var(--espaciado-grande);
}

.ruleta-enter-active,
.ruleta-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.ruleta-enter-from,
.ruleta-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.opcion-vf-label.seleccionada {
  border-color: var(--color-secundario);
  background: rgba(21, 101, 192, 0.15);
  color: var(--color-blanco);
}
</style>
