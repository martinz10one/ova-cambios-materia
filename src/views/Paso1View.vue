<template>
  <div class="paso1">
    <ParticleBackground color="#2e7d32" :count="50" :speed="0.5" />

    <ProgressBar :paso-actual="1" />

    <div class="contenido-interior">
      <div class="tarjeta tarjeta-hero">
        <div class="hero-content">
          <div class="hero-badge">OVA Física</div>
          <h1 class="hero-title">
            <span class="word word-1">Cambios</span>
            <span class="word word-2">de la</span>
            <span class="word word-3">Materia</span>
          </h1>
          <p class="hero-subtitle">
            Descubre cómo la materia se transforma entre sólido, líquido y gaseoso
          </p>
          <div class="hero-actions">
            <router-link to="/paso2" class="boton boton-principal hero-boton">
              Empezar →
            </router-link>
          </div>
          <div class="hero-stats">
            <div class="hero-stat">
              <span class="stat-num">4</span>
              <span class="stat-label">Secciones</span>
            </div>
            <div class="hero-stat">
              <span class="stat-num">6</span>
              <span class="stat-label">Transformaciones</span>
            </div>
            <div class="hero-stat">
              <span class="stat-num">🎮</span>
              <span class="stat-label">Actividad</span>
            </div>
          </div>
        </div>
        <div class="hero-glow"></div>
      </div>

      <div class="tarjeta">
        <h2 class="titulo-seccion">🗺️ Tu Viaje de Aprendizaje</h2>
        <div class="journey">
          <div class="journey-step" v-for="(step, idx) in journeySteps" :key="idx">
            <div class="journey-dot" :class="{ 'journey-dot-active': idx === 0 }">
              <span class="journey-step-num">{{ idx + 1 }}</span>
            </div>
            <div class="journey-line" v-if="idx < journeySteps.length - 1"></div>
            <div class="journey-info">
              <h4>{{ step.titulo }}</h4>
              <p>{{ step.descripcion }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="tarjeta">
        <h2 class="titulo-seccion">🎯 ¿Qué vas a aprender?</h2>
        <div class="grid grid-2 learn-grid">
          <div
            class="learn-card"
            v-for="(obj, idx) in objetivos"
            :key="idx"
            @mouseenter="hoverObjetivo = idx"
            @mouseleave="hoverObjetivo = -1"
            :class="{ 'learn-card-hover': hoverObjetivo === idx }"
          >
            <div class="learn-card-glow"></div>
            <div class="learn-card-content">
              <div class="learn-icon">{{ obj.icono }}</div>
              <h3>{{ obj.titulo }}</h3>
              <p>{{ obj.descripcion }}</p>
              <div class="learn-arrow">→</div>
            </div>
          </div>
        </div>
      </div>

      <div class="tarjeta">
        <h2 class="titulo-seccion">❓ ¿Qué sabes ya?</h2>
        <p class="intro-descripcion">Pon a prueba tus conocimientos antes de empezar.</p>
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
              <span class="opcion-letra">{{ letras[oIdx] }}</span>
              {{ opcion }}
            </button>
          </div>
          <div v-if="encuesta.respondido" class="mensaje" :class="encuesta.correcta === encuesta.seleccionada ? 'mensaje-exito' : 'mensaje-error'">
            <strong>{{ encuesta.correcta === encuesta.seleccionada ? '🎉 ¡Correcto!' : '🤔 Inténtalo de nuevo' }}</strong>
            <br>{{ encuesta.explicacion }}
          </div>
        </div>
      </div>

      <div class="tarjeta">
        <h2 class="titulo-seccion">⚡ Antes de continuar</h2>
        <div class="checklist">
          <label class="check-item" v-for="(item, idx) in checklist" :key="idx">
            <input type="checkbox" v-model="checklist[idx].hecho" />
            <span class="check-box" :class="{ 'check-checked': checklist[idx].hecho }">
              <span v-if="checklist[idx].hecho">✓</span>
            </span>
            <span class="check-text">{{ item.texto }}</span>
          </label>
        </div>
        <div class="check-actions">
          <router-link to="/paso2" class="boton boton-principal" :class="{ 'boton-bloqueado': !checklistCompleto }" :disabled="!checklistCompleto">
            {{ checklistCompleto ? 'Continuar → Contenidos' : '✅ Revisa los items para continuar' }}
          </router-link>
        </div>
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
      letras: ['A', 'B', 'C', 'D'],
      hoverObjetivo: -1,
      encuesta: {
        pregunta: '¿Qué ocurre cuando el hielo se derrite?',
        opciones: ['Es un cambio químico', 'Es un cambio de estado', 'Es una reacción nuclear', 'No pasa nada'],
        correcta: 1,
        seleccionada: -1,
        respondido: false,
        explicacion: 'El derretimiento del hielo es un cambio físico — pasa de sólido a líquido sin cambiar su composición química.'
      },
      checklist: [
        { texto: 'He leído la introducción', hecho: false },
        { texto: 'Entiendo qué son los cambios de estado', hecho: false },
        { texto: 'He pensado en ejemplos cotidianos', hecho: false }
      ],
      journeySteps: [
        { titulo: 'Introducción', descripcion: 'Qué son y por qué importan' },
        { titulo: 'Contenidos', descripcion: 'Las 6 transformaciones con animaciones' },
        { titulo: 'Actividad', descripcion: 'Arrastra y suelta para practicar' },
        { titulo: 'Evaluación', descripcion: 'Verifica lo que aprendiste' }
      ],
      objetivos: [
        { icono: '🎯', titulo: 'Identificar', descripcion: 'Los seis cambios de estado' },
        { icono: '⚡', titulo: 'Comprender', descripcion: 'Qué los provoca' },
        { icono: '🔗', titulo: 'Aplicar', descripcion: 'En ejemplos cotidianos' },
        { icono: '🧠', titulo: 'Analizar', descripcion: 'Físicos vs químicos' }
      ]
    }
  },
  computed: {
    checklistCompleto() {
      return this.checklist.every(c => c.hecho)
    }
  },
  methods: {
    responderEncuesta(idx) {
      this.encuesta.seleccionada = idx
      this.encuesta.respondido = true
    }
  }
}
</script>

<style scoped>
.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: var(--espaciado-enorme) var(--espaciado-grande);
}

.hero-badge {
  display: inline-block;
  padding: 6px 20px;
  border-radius: 30px;
  background: rgba(46, 125, 50, 0.2);
  border: 1px solid rgba(46, 125, 50, 0.4);
  color: var(--color-primario);
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: var(--espaciado-grande);
  animation: fadeInUp 0.8s ease;
}

.hero-title {
  margin-bottom: var(--espaciado-mediano);
}

.word {
  display: inline-block;
  font-size: 3rem;
  font-weight: 800;
  margin: 0 4px;
  background: linear-gradient(135deg, var(--color-blanco), var(--color-primario));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  opacity: 0;
  transform: translateY(30px);
  animation: wordReveal 0.6s ease forwards;
}

.word-1 { animation-delay: 0.2s; }
.word-2 { animation-delay: 0.4s; }
.word-3 { animation-delay: 0.6s; }

@keyframes wordReveal {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-subtitle {
  font-size: 1.1rem;
  color: var(--color-texto-claro);
  max-width: 500px;
  margin: 0 auto var(--espaciado-grande);
  line-height: 1.7;
  opacity: 0;
  animation: wordReveal 0.6s ease 0.8s forwards;
}

.hero-actions {
  opacity: 0;
  animation: wordReveal 0.6s ease 1s forwards;
}

.hero-boton {
  font-size: 1.15rem;
  padding: 18px var(--espaciado-enorme);
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: var(--espaciado-enorme);
  margin-top: var(--espaciado-grande);
  opacity: 0;
  animation: wordReveal 0.6s ease 1.2s forwards;
}

.hero-stat {
  text-align: center;
}

.stat-num {
  display: block;
  font-size: 2rem;
  font-weight: 800;
  color: var(--color-primario);
}

.stat-label {
  font-size: 0.75rem;
  color: var(--color-texto-claro);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.hero-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(46, 125, 50, 0.15) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  animation: glowPulse 3s ease-in-out infinite;
}

@keyframes glowPulse {
  0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
}

.tarjeta-hero {
  position: relative;
  overflow: hidden;
  border: none;
  background: linear-gradient(135deg, #161b22 0%, #1a2332 50%, #0d1117 100%);
}

.journey {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-top: var(--espaciado-mediano);
}

.journey-step {
  display: flex;
  align-items: flex-start;
  gap: var(--espaciado-mediano);
  position: relative;
}

.journey-dot {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #21262d;
  border: 3px solid #30363d;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  z-index: 2;
  transition: all 0.4s ease;
}

.journey-dot-active {
  background: var(--color-primario);
  border-color: var(--color-primario);
  animation: pulse-circle 1.5s ease-in-out infinite;
}

.journey-step-num {
  font-weight: 700;
  font-size: 0.85rem;
  color: var(--color-texto-claro);
}

.journey-dot-active .journey-step-num {
  color: #ffffff;
}

.journey-line {
  position: absolute;
  left: 19px;
  top: 40px;
  width: 2px;
  height: calc(100% + var(--espaciado-mediano));
  background: #30363d;
  z-index: 1;
}

.journey-info {
  padding-bottom: var(--espaciado-mediano);
}

.journey-info h4 {
  color: var(--color-blanco);
  margin-bottom: 4px;
}

.journey-info p {
  color: var(--color-texto-claro);
  font-size: 0.9rem;
}

.learn-grid {
  gap: var(--espaciado-mediano);
}

.learn-card {
  position: relative;
  padding: var(--espaciado-grande);
  border-radius: var(--radio-borde);
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(48, 54, 61, 0.5);
  cursor: pointer;
  overflow: hidden;
  transition: var(--transition);
}

.learn-card-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 50% 50%, rgba(46, 125, 50, 0.08), transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.learn-card-hover .learn-card-glow {
  opacity: 1;
}

.learn-card-content {
  position: relative;
  z-index: 1;
}

.learn-icon {
  font-size: 2rem;
  margin-bottom: var(--espaciado-mediano);
  transition: transform 0.3s ease;
}

.learn-card:hover .learn-icon {
  transform: scale(1.2) rotate(-5deg);
}

.learn-card h3 {
  color: var(--color-blanco);
  margin-bottom: var(--espaciado-pequeño);
  font-size: 1.1rem;
}

.learn-card p {
  color: var(--color-texto-claro);
  font-size: 0.85rem;
}

.learn-arrow {
  margin-top: var(--espaciado-mediano);
  font-size: 1.2rem;
  color: var(--color-primario);
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
}

.learn-card:hover .learn-arrow {
  opacity: 1;
  transform: translateX(0);
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
  padding: 14px var(--espaciado-mediano);
  border: 2px solid rgba(48, 54, 61, 0.5);
  border-radius: var(--radio-borde);
  background: rgba(255, 255, 255, 0.03);
  color: var(--color-blanco);
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  text-align: left;
  transition: var(--transition);
  display: flex;
  align-items: center;
  gap: var(--espaciado-mediano);
}

.boton-opcion:hover:not(:disabled) {
  border-color: var(--color-primario);
  background: rgba(46, 125, 50, 0.1);
  transform: translateX(4px);
}

.boton-opcion:disabled {
  cursor: default;
}

.opcion-letra {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(48, 54, 61, 0.5);
  color: var(--color-texto-claro);
  font-weight: 700;
  font-size: 0.8rem;
  flex-shrink: 0;
  transition: var(--transition);
}

.opcion-correcta {
  border-color: var(--color-exito) !important;
  background: rgba(63, 185, 80, 0.15) !important;
  animation: pop 0.3s ease;
}

.opcion-correcta .opcion-letra {
  background: var(--color-exito);
  color: #ffffff;
}

.opcion-incorrecta {
  border-color: var(--color-error) !important;
  background: rgba(248, 81, 73, 0.15) !important;
  animation: shake 0.3s ease;
}

.opcion-incorrecta .opcion-letra {
  background: var(--color-error);
  color: #ffffff;
}

.opcion-desactivada {
  opacity: 0.35;
  cursor: default;
}

.checklist {
  display: flex;
  flex-direction: column;
  gap: var(--espaciado-mediano);
  margin-top: var(--espaciado-mediano);
}

.check-item {
  display: flex;
  align-items: center;
  gap: var(--espaciado-mediano);
  cursor: pointer;
  padding: var(--espaciado-mediano);
  border-radius: var(--radio-borde);
  transition: var(--transition);
}

.check-item:hover {
  background: rgba(255, 255, 255, 0.03);
}

.check-item input[type="checkbox"] {
  display: none;
}

.check-box {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  border: 2px solid #30363d;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 700;
  color: transparent;
  transition: var(--transition);
  flex-shrink: 0;
}

.check-checked {
  background: var(--color-primario);
  border-color: var(--color-primario);
  color: #ffffff;
}

.check-text {
  color: var(--color-texto-claro);
  font-size: 0.95rem;
}

.check-actions {
  margin-top: var(--espaciado-grande);
}

.boton-bloqueado {
  opacity: 0.4;
  cursor: not-allowed;
}

.boton-bloqueado:hover {
  transform: none;
  box-shadow: none;
}
</style>