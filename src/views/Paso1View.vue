<template>
  <div class="paso1">
    <ParticleBackground color="#2e7d32" :count="50" :speed="0.5" />
    <ProgressBar :paso-actual="1" />

    <div class="contenido-interior">

      <section class="tarjeta tarjeta-hero">
        <div class="hero-content">
          <div class="hero-badge" ref="badge">OVA Física</div>
          <h1 class="hero-title">
            <span class="word" ref="word1">Cambios</span>
            <span class="word" ref="word2">de la</span>
            <span class="word" ref="word3">Materia</span>
          </h1>
          <p class="hero-subtitle" ref="subtitle">
            Descubre cómo la materia se transforma entre sólido, líquido y gaseoso
          </p>
          <div class="hero-stats" ref="stats">
            <div class="hero-stat">
              <span class="stat-num">4</span>
              <span class="stat-label">Secciones</span>
            </div>
            <div class="hero-stat">
              <span class="stat-num">6</span>
              <span class="stat-label">Transformaciones</span>
            </div>
            <div class="hero-stat">
              <span class="stat-num">3</span>
              <span class="stat-label">Estados</span>
            </div>
          </div>
        </div>
        <div class="hero-glow"></div>
        <div class="scroll-indicator" ref="scrollHint">
          <span>Desplázate para continuar</span>
          <div class="scroll-arrow">↓</div>
        </div>
      </section>

      <section class="tarjeta reveal-section" ref="sectionIntro">
        <h2 class="titulo-seccion">Que son los cambios de estado?</h2>
        <p class="intro-descripcion">
          La materia cambia de estado cuando pasa de solido a liquido, de liquido a gaseoso, o viceversa. 
          Estos cambios son <strong>fisicos</strong>: la sustancia sigue siendo la misma, solo cambia su 
          apariencia y comportamiento.
        </p>
        <p class="intro-descripcion">
          Comprender estos procesos es fundamental para entender desde el ciclo del agua en la naturaleza 
          hasta el funcionamiento de motores, neveras y muchos procesos industriales.
        </p>
        <h3 class="subtitulo-seccion">Que factores provocan estos cambios?</h3>
        <div class="factores-grid">
          <div class="factor-card">
            <div class="factor-icono">
              <svg viewBox="0 0 48 48" width="48" height="48"><circle cx="24" cy="24" r="18" fill="none" stroke="#ff6f00" stroke-width="2.5"/><circle cx="24" cy="24" r="10" fill="none" stroke="#ff6f00" stroke-width="2"/><circle cx="24" cy="24" r="4" fill="#ff6f00"/></svg>
            </div>
            <h4>Energia</h4>
            <p>Las particulas necesitan energia para moverse. Al ganar energia se separan; al perderla se ordenan.</p>
          </div>
          <div class="factor-card">
            <div class="factor-icono">
              <svg viewBox="0 0 48 48" width="48" height="48"><path d="M24 6v4M24 38v4M6 24h4M38 24h4M12.7 12.7l2.8 2.8M32.5 32.5l2.8 2.8M12.7 35.3l2.8-2.8M32.5 15.5l2.8-2.8" stroke="#4fc3f7" stroke-width="2" stroke-linecap="round"/><circle cx="24" cy="24" r="8" fill="none" stroke="#4fc3f7" stroke-width="2"/></svg>
            </div>
            <h4>Temperatura</h4>
            <p>Al aumentar la temperatura las particulas vibran mas y pueden cambiar de estado. Al bajar, se aquietan.</p>
          </div>
          <div class="factor-card">
            <div class="factor-icono">
              <svg viewBox="0 0 48 48" width="48" height="48"><rect x="8" y="18" width="32" height="20" rx="4" fill="none" stroke="#81c784" stroke-width="2.5"/><rect x="18" y="8" width="12" height="10" rx="2" fill="none" stroke="#81c784" stroke-width="2"/><path d="M22 14v-2h4v2" fill="none" stroke="#81c784" stroke-width="2" stroke-linecap="round"/><line x1="8" y1="26" x2="40" y2="26" stroke="#81c784" stroke-width="1.5" opacity="0.5"/><text x="24" y="45" text-anchor="middle" fill="#81c784" font-size="6">PRESION</text></svg>
            </div>
            <h4>Presion</h4>
            <p>Al aumentar la presion las particulas se comprimen. Al reducirla, se expanden y pueden liberarse.</p>
          </div>
        </div>
      </section>

      <section class="tarjeta reveal-section" ref="sectionObjetivos">
        <h2 class="titulo-seccion">Que vas a aprender</h2>
        <div class="grid grid-2 learn-grid">
          <div
            class="learn-card"
            v-for="(obj, idx) in objetivos"
            :key="idx"
            ref="learnCards"
          >
            <div class="learn-card-glow"></div>
            <div class="learn-card-content">
              <div class="learn-num">{{ obj.icono }}</div>
              <h3>{{ obj.titulo }}</h3>
              <p>{{ obj.descripcion }}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="tarjeta reveal-section" ref="sectionEncuesta">
        <h2 class="titulo-seccion">Que sabes ya</h2>
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
            <strong>{{ encuesta.correcta === encuesta.seleccionada ? 'Correcto!' : 'Intenta de nuevo' }}</strong>
            <br>{{ encuesta.explicacion }}
          </div>
        </div>
      </section>

      <section class="tarjeta reveal-section" ref="sectionChecklist">
        <h2 class="titulo-seccion">Antes de continuar</h2>
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
            {{ checklistCompleto ? 'Continuar a Contenidos →' : 'Revisa los items para continuar' }}
          </router-link>
        </div>
      </section>

    </div>
  </div>
</template>

<script>
import { onMounted, onBeforeUnmount, ref, reactive } from 'vue'
import gsap from 'gsap'
import ParticleBackground from '../components/ParticleBackground.vue'
import ProgressBar from '../components/ProgressBar.vue'

export default {
  name: 'Paso1View',
  components: { ParticleBackground, ProgressBar },
  setup() {
    const letters = ['A', 'B', 'C', 'D']

    const encuesta = reactive({
      pregunta: '¿Qué ocurre cuando el hielo se derrite?',
      opciones: ['Es un cambio químico', 'Es un cambio de estado', 'Es una reacción nuclear', 'No pasa nada'],
      correcta: 1,
      seleccionada: -1,
      respondido: false,
      explicacion: 'El derretimiento del hielo es un cambio físico — pasa de sólido a líquido sin cambiar su composición química.'
    })

    const checklist = reactive([
      { texto: 'He leído la introducción', hecho: false },
      { texto: 'Entiendo qué son los cambios de estado', hecho: false },
      { texto: 'He pensado en ejemplos cotidianos', hecho: false }
    ])

    const objetivos = [
      { icono: '01', titulo: 'Identificar', descripcion: 'Los seis cambios de estado de la materia y sus caracteristicas' },
      { icono: '02', titulo: 'Comprender', descripcion: 'Que factores provocan cada transformacion: energia, temperatura y presion' },
      { icono: '03', titulo: 'Aplicar', descripcion: 'Reconocer cambios de estado en ejemplos cotidianos de tu entorno' },
      { icono: '04', titulo: 'Analizar', descripcion: 'Diferenciar entre cambios fisicos (de estado) y cambios quimicos' }
    ]

    function responderEncuesta(idx) {
      encuesta.seleccionada = idx
      encuesta.respondido = true
    }

    let scrollObserver = null

    onMounted(() => {
      gsap.fromTo('.hero-badge', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.2 })
      gsap.fromTo('.word', { opacity: 0, y: 40, rotateX: 20 }, { opacity: 1, y: 0, rotateX: 0, duration: 0.7, stagger: 0.2, ease: 'back.out(1.4)', delay: 0.4 })
      gsap.fromTo('.hero-subtitle', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, delay: 1.1 })
      gsap.fromTo('.hero-stat', { opacity: 0, y: 20, scale: 0.8 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.15, delay: 1.4 })
      gsap.fromTo('.scroll-indicator', { opacity: 0 }, { opacity: 1, duration: 0.8, delay: 2 })

      gsap.fromTo('.scroll-arrow', { y: 0 }, { y: 10, duration: 0.8, repeat: -1, yoyo: true, ease: 'power1.inOut' })

      const revealElements = document.querySelectorAll('.reveal-section')
      scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            gsap.fromTo(entry.target, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })

            const cards = entry.target.querySelectorAll('.learn-card, .factor-card')
            if (cards.length) {
              gsap.fromTo(cards, { opacity: 0, y: 40, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.12, delay: 0.3, ease: 'back.out(1.2)' })
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

    return {
      letras: letters,
      encuesta,
      checklist,
      objetivos,
      responderEncuesta,
      checklistCompleto: () => checklist.every(c => c.hecho)
    }
  },
  computed: {
    checklistCompleto() {
      return this.checklist.every(c => c.hecho)
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
}

.hero-subtitle {
  font-size: 1.1rem;
  color: var(--color-texto-claro);
  max-width: 500px;
  margin: 0 auto var(--espaciado-grande);
  line-height: 1.7;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: var(--espaciado-enorme);
  margin-top: var(--espaciado-grande);
}

.hero-stat { text-align: center; }

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
  padding-bottom: 60px;
}

.scroll-indicator {
  text-align: center;
  margin-top: var(--espaciado-grande);
  color: var(--color-texto-claro);
  font-size: 0.85rem;
}

.scroll-arrow {
  font-size: 1.5rem;
  margin-top: 8px;
}

.intro-descripcion {
  color: var(--color-texto-claro);
  margin-bottom: var(--espaciado-grande);
  line-height: 1.7;
}

.subtitulo-seccion {
  font-size: 1.3rem;
  color: var(--color-blanco);
  margin-bottom: var(--espaciado-mediano);
  text-align: center;
}

.factores-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--espaciado-mediano);
}

.factor-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(48, 54, 61, 0.5);
  border-radius: var(--radio-borde);
  padding: var(--espaciado-mediano);
  text-align: center;
  transition: var(--transition);
}

.factor-card:hover {
  border-color: rgba(46, 125, 50, 0.4);
  background: rgba(46, 125, 50, 0.03);
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(46, 125, 50, 0.1);
}

.factor-icono {
  margin-bottom: var(--espaciado-pequeño);
}

.factor-card h4 {
  color: var(--color-blanco);
  font-size: 1.1rem;
  margin-bottom: 8px;
}

.factor-card p {
  color: var(--color-texto-claro);
  font-size: 0.85rem;
  line-height: 1.5;
  margin: 0;
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
  cursor: default;
  overflow: hidden;
  transition: box-shadow 0.3s ease;
  transform-style: preserve-3d;
}

.learn-card:hover {
  box-shadow: 0 8px 32px rgba(46, 125, 50, 0.15);
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

.learn-card:hover .learn-card-glow {
  opacity: 1;
}

.learn-card-content {
  position: relative;
  z-index: 1;
}

.learn-icon {
  font-size: 2rem;
  margin-bottom: var(--espaciado-mediano);
}

.learn-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(46, 125, 50, 0.3), rgba(46, 125, 50, 0.1));
  border: 2px solid rgba(46, 125, 50, 0.4);
  color: var(--color-primario);
  font-size: 0.9rem;
  font-weight: 800;
  margin-bottom: var(--espaciado-mediano);
  transition: var(--transition);
}

.learn-card:hover .learn-num {
  background: var(--color-primario);
  color: #ffffff;
  transform: scale(1.1);
}

.learn-card h3 {
  color: var(--color-blanco);
  margin-bottom: var(--espaciado-pequeño);
  font-size: 1.1rem;
}

.learn-card p {
  color: var(--color-texto-claro);
  font-size: 0.85rem;
  line-height: 1.5;
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

.boton-opcion:disabled { cursor: default; }

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

.check-item input[type="checkbox"] { display: none; }

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

@media (max-width: 768px) {
  .factores-grid {
    grid-template-columns: 1fr;
  }
}
</style>
