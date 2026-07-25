<template>
  <div class="paso1">
    <ParticleBackground color="#2e7d32" :count="40" :speed="0.3" />

    <ProgressBar :paso-actual="1" />

    <div class="contenido-interior">
      <div class="tarjeta tarjeta-intro">
        <div class="intro-emoji">🔬</div>
        <h1 class="titulo-principal">OVA Física: Cambios de la Materia</h1>
        <p class="intro-subtitle">Programa de Análisis y Desarrollo de Software</p>
      </div>

      <div class="tarjeta">
        <h2 class="titulo-seccion">1. Introducción y Objetivos</h2>

        <div class="intro-animado">
          <div
            class="intro-paso"
            v-for="(paso, idx) in pasosIntro"
            :key="idx"
            :class="{ visible: animacionVisible >= idx }"
          >
            <span class="intro-numero">{{ idx + 1 }}</span>
            <div class="intro-contenido">
              <h3>{{ paso.titulo }}</h3>
              <p>{{ paso.texto }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="tarjeta">
        <h3 class="titulo-subseccion">¿Qué vas a aprender?</h3>
        <div class="grid grid-2">
          <div
            class="objetivo-card"
            v-for="(obj, idx) in objetivos"
            :key="idx"
            :class="{ 'objetivo-visibilidad': animacionVisible > idx }"
          >
            <div class="objetivo-icono">{{ obj.icono }}</div>
            <h4>{{ obj.titulo }}</h4>
            <p>{{ obj.descripcion }}</p>
          </div>
        </div>
      </div>

      <div class="tarjeta">
        <h3 class="titulo-subseccion">¿Por qué es importante?</h3>
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
        <h3 class="titulo-subseccion">Competencias a desarrollar</h3>
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

      <div class="acciones">
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
      animacionVisible: 0,
      pasosIntro: [
        {
          titulo: '¿Qué son los cambios de estado?',
          texto: 'Los cambios de estado son transformaciones físicas donde la materia pasa de una forma (sólido, líquido, gaseoso) a otra, según cambien las condiciones de temperatura y presión.'
        },
        {
          titulo: '¿Por qué ocurren?',
          texto: 'Cuando agregamos o quitamos energía térmica a un material, sus moléculas ganan o pierden movimiento, lo que provoca cambios en su organización y estado físico.'
        },
        {
          titulo: '¿Dónde los vemos?',
          texto: 'En todo momento: el hielo que se derrite, el agua que hierve, el vapor que se condensa en una ventana fría. ¡Están a nuestro alrededor!'
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
    this.iniciarAnimación()
  },
  methods: {
    iniciarAnimación() {
      setTimeout(() => { this.animacionVisible = 1 }, 200)
      setTimeout(() => { this.animacionVisible = 2 }, 500)
      setTimeout(() => { this.animacionVisible = 3 }, 800)
    }
  }
}
</script>