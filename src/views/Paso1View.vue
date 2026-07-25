<template>
  <div class="paso1">
    <ParticleBackground color="#2e7d32" :count="40" :speed="0.3" />

    <ProgressBar :paso-actual="1" />

    <div class="contenido-interior">
      <div class="tarjeta tarjeta-intro">
        <div class="intro-emoji">🔬</div>
        <h1 class="titulo-principal">OVA Física: Cambios de la Materia</h1>
      </div>

      <div class="tarjeta">
        <h2 class="titulo-seccion">1. Introducción</h2>

        <p class="intro-descripcion">
          Los <strong>cambios de estado</strong> son transformaciones físicas donde la materia
          pasa de una forma a otra según cambien las condiciones de temperatura y presión.
        </p>

        <div class="interactivo-grid">
          <div
            class="interactivo-card"
            v-for="(item, idx) in interacciones"
            :key="idx"
            @click="alternarInteractivo(idx)"
            :class="{ 'interactivo-abierto': interactivoAbierto === idx || interactivoAbierto === -1 }"
          >
            <div class="interactivo-header">
              <span class="interactivo-icono">{{ item.icono }}</span>
              <span class="interactivo-titulo">{{ item.titulo }}</span>
              <span class="interactivo-toggle">{{ interactivoAbierto === idx ? '▼' : '▶' }}</span>
            </div>
            <div class="interactivo-cuerpo" v-show="interactivoAbierto === idx || interactivoAbierto === -1">
              <p>{{ item.texto }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="tarjeta">
        <h2 class="titulo-seccion">2. ¿Qué vas a aprender?</h2>
        <div class="grid grid-2">
          <div
            class="objetivo-card"
            v-for="(obj, idx) in objetivos"
            :key="idx"
            @click="seleccionarObjetivo(idx)"
            :class="{ 'objetivo-seleccionado': objetivoSeleccionado === idx }"
          >
            <div class="objetivo-icono">{{ obj.icono }}</div>
            <h4>{{ obj.titulo }}</h4>
            <p>{{ obj.descripcion }}</p>
            <span v-if="objetivoSeleccionado === idx" class="objetivo-check">✅ Seleccionado</span>
          </div>
        </div>
      </div>

      <div class="tarjeta">
        <h2 class="titulo-seccion">3. Mini Encuesta</h2>
        <p class="intro-descripcion">Antes de empezar, ¿sabes qué son los cambios de estado?</p>
        <div class="encuesta">
          <p class="pregunta">{{ encuesta.pregunta }}</p>
          <div class="opciones-encuesta">
            <button
              v-for="(opcion, oIdx) in encuesta.opciones"
              :key="oIdx"
              class="boton-opcion"
              :class="{
                'opcion-correcta': encuesta.respondido && oIdx === encuesta.correcta,
                'opcion-incorrecta': encuesta.respondido && encuesta.seleccionada === oIdx && oIdx !== encuesta.correcta,
                'opcion-desactivada': encuesta.respondido && oIdx !== encuesta.seleccionada
              }"
              @click="responderEncuesta(oIdx)"
              :disabled="encuesta.respondido"
            >
              {{ opcion }}
            </button>
          </div>
          <div v-if="encuesta.respondido" class="mensaje" :class="encuesta.correcta === encuesta.seleccionada ? 'mensaje-exito' : 'mensaje-error'">
            {{ encuesta.correcta === encuesta.seleccionada ? '🎉 ¡Correcto!' : '🤔 Casi no...' }}
            <br>{{ encuesta.explicacion }}
          </div>
        </div>
      </div>

      <div class="tarjeta">
        <h2 class="titulo-seccion">4. ¿Por qué es importante?</h2>
        <div class="importancia-grid">
          <div
            class="importancia-item"
            v-for="(item, idx) in importancia"
            :key="idx"
            :style="{ animationDelay: idx * 0.1 + 's' }"
          >
            <span class="importancia-icono">{{ item.icono }}</span>
            <p>{{ item.texto }}</p>
          </div>
        </div>
      </div>

      <div class="tarjeta">
        <h2 class="titulo-seccion">5. Competencias a desarrollar</h2>
        <div class="competencias-lista">
          <div
            class="competencia-tag"
            v-for="(comp, idx) in competencias"
            :key="idx"
          >
            {{ comp }}
          </div>
        </div>
      </div>

      <div class="tarjeta texto-centrado">
        <router-link to="/paso2" class="boton boton-principal">
          Continuar → Contenidos Multimediales
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import ParticleBackground from '../components/ParticleBackground.vue'
import ProgressBar from '../components/ProgressBar.vue'

export default {
  name: 'Paso1View',
  components: {
    ParticleBackground,
    ProgressBar
  },
  data() {
    return {
      interactivoAbierto: -1,
      objetivoSeleccionado: -1,
      encuesta: {
        pregunta: '¿Qué ocurre cuando el hielo se derrite?',
        opciones: ['Es un cambio químico', 'Es un cambio de estado', 'Es una reacción nuclear', 'No pasa nada'],
        correcta: 1,
        seleccionada: -1,
        respondido: false,
        explicacion: 'El derretimiento del hielo es un cambio físico — pasa de sólido a líquido sin cambiar su composición.'
      },
      interacciones: [
        {
          icono: '📖',
          titulo: '¿Qué son los cambios de estado?',
          texto: 'Son transformaciones físicas donde la materia pasa de una forma a otra (sólido → líquido → gas) al cambiar la temperatura o presión.'
        },
        {
          icono: '⚡',
          titulo: '¿Por qué ocurren?',
          texto: 'Al agregar o quitar energía térmica, las moléculas ganan o pierden movimiento, provocando cambios en su organización.'
        },
        {
          icono: '🔍',
          titulo: '¿Dónde los vemos?',
          texto: 'En todo momento: el hielo que se derrite, el agua que hierve, el vapor que se condensa en una ventana fría.'
        }
      ],
      objetivos: [
        { icono: '🎯', titulo: 'Identificar', descripcion: 'Los seis cambios de estado y sus nombres' },
        { icono: '⚡', titulo: 'Comprender', descripcion: 'Qué los provoca (energía, temperatura, presión)' },
        { icono: '🔗', titulo: 'Aplicar', descripcion: 'Relacionar con ejemplos cotidianos' },
        { icono: '🧠', titulo: 'Analizar', descripcion: 'Diferenciar cambios físicos de químicos' }
      ],
      importancia: [
        { icono: '🏭', texto: 'Industria: control de procesos químicos y físicos' },
        { icono: '🌍', texto: 'Medio ambiente: ciclo del agua y cambios climáticos' },
        { icono: '🏠', texto: 'Hogar: cocina, refrigeración, calefacción' },
        { icono: '🔬', texto: 'Ciencia: experimentos y laboratorios' }
      ],
      competencias: [
        'Identificar los seis cambios de estado',
        'Relacionar con condiciones de energía',
        'Aplicar a situaciones cotidianas',
        'Distinguir cambios físicos vs químicos'
      ]
    }
  },
  mounted() {
    this.interactivoAbierto = 0
    this.objetivoSeleccionado = -1
  },
  methods: {
    alternarInteractivo(idx) {
      this.interactivoAbierto = this.interactivoAbierto === idx ? -1 : idx
    },
    seleccionarObjetivo(idx) {
      this.objetivoSeleccionado = this.objetivoSeleccionado === idx ? -1 : idx
    },
    responderEncuesta(idx) {
      this.encuesta.seleccionada = idx
      this.encuesta.respondido = true
    }
  }
}
</script>

<style scoped>
.intro-descripcion {
  color: var(--color-texto-claro);
  font-size: 0.95rem;
  line-height: 1.7;
  margin-bottom: var(--espaciado-mediano);
}

.interactivo-grid {
  display: flex;
  flex-direction: column;
  gap: var(--espaciado-mediano);
}

.interactivo-card {
  border: 1px solid rgba(48, 54, 61, 0.5);
  border-radius: var(--radio-borde);
  background: rgba(255, 255, 255, 0.02);
  cursor: pointer;
  transition: var(--transition);
  overflow: hidden;
}

.interactivo-card:hover {
  border-color: var(--color-primario);
  background: rgba(46, 125, 50, 0.03);
}

.interactivo-card.interactivo-abierto {
  border-color: var(--color-primario);
  box-shadow: 0 0 0 1px rgba(46, 125, 50, 0.2);
}

.interactivo-header {
  display: flex;
  align-items: center;
  gap: var(--espaciado-mediano);
  padding: var(--espaciado-mediano);
  user-select: none;
}

.interactivo-icono {
  font-size: 1.3rem;
  flex-shrink: 0;
}

.interactivo-titulo {
  flex: 1;
  font-weight: 600;
  color: var(--color-blanco);
}

.interactivo-toggle {
  font-size: 0.7rem;
  color: var(--color-texto-claro);
  transition: transform 0.3s ease;
}

.interactivo-cuerpo {
  padding: 0 var(--espaciado-mediano) var(--espaciado-mediano);
  color: var(--color-texto-claro);
  font-size: 0.9rem;
  line-height: 1.7;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.objetivo-card {
  padding: var(--espaciado-grande);
  border-radius: var(--radio-borde);
  background: rgba(46, 125, 50, 0.05);
  border: 1px solid rgba(46, 125, 50, 0.1);
  text-align: center;
  cursor: pointer;
  transition: var(--transition);
}

.objetivo-card:hover {
  transform: translateY(-3px);
  border-color: var(--color-primario);
  box-shadow: var(--sombra);
}

.objetivo-card.objetivo-seleccionado {
  border-color: var(--color-accento);
  background: rgba(255, 111, 0, 0.08);
  box-shadow: 0 0 0 2px rgba(255, 111, 0, 0.3);
}

.objetivo-icono {
  font-size: 2.5rem;
  margin-bottom: var(--espaciado-mediano);
}

.objetivo-card h4 {
  color: var(--color-blanco);
  margin-bottom: var(--espaciado-pequeño);
}

.objetivo-card p {
  color: var(--color-texto-claro);
  font-size: 0.9rem;
}

.objetivo-check {
  display: inline-block;
  margin-top: var(--espaciado-mediano);
  padding: 4px 12px;
  border-radius: 16px;
  background: rgba(255, 111, 0, 0.15);
  color: var(--color-accento);
  font-size: 0.8rem;
  font-weight: 600;
  animation: pop 0.3s ease;
}

.encuesta {
  margin-top: var(--espaciado-mediano);
}

.pregunta {
  font-weight: 600;
  font-size: 1.05rem;
  margin-bottom: var(--espaciado-mediano);
  color: var(--color-blanco);
}

.opciones-encuesta {
  display: flex;
  flex-direction: column;
  gap: var(--espaciado-mediano);
}

.boton-opcion {
  padding: 12px var(--espaciado-mediano);
  border: 2px solid rgba(48, 54, 61, 0.5);
  border-radius: var(--radio-borde);
  background: rgba(255, 255, 255, 0.03);
  color: var(--color-blanco);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  text-align: left;
  transition: var(--transition);
}

.boton-opcion:hover:not(:disabled) {
  border-color: var(--color-primario);
  background: rgba(46, 125, 50, 0.1);
}

.boton-opcion:disabled {
  cursor: default;
  opacity: 0.7;
}

.opcion-correcta {
  border-color: var(--color-exito) !important;
  background: rgba(63, 185, 80, 0.15) !important;
  animation: pop 0.3s ease;
}

.opcion-incorrecta {
  border-color: var(--color-error) !important;
  background: rgba(248, 81, 73, 0.15) !important;
  animation: shake 0.3s ease;
}

.opcion-desactivada {
  opacity: 0.4;
  cursor: default;
}
</style>