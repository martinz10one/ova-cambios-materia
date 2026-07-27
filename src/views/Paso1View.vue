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

      <section class="tarjeta reveal-section" ref="sectionEstados">
        <h2 class="titulo-seccion">🔬 Los Tres Estados de la Materia</h2>
        <p class="intro-descripcion">La materia existe en tres estados principales, cada uno con propiedades únicas que determinan cómo interactúa con el mundo que nos rodea.</p>
        <div class="estados-grid">
          <div
            class="estado-card"
            v-for="(estado, idx) in estados"
            :key="idx"
            ref="estadoCards"
            @mousemove="onTilt($event, idx)"
            @mouseleave="resetTilt(idx)"
          >
            <div class="estado-card-inner">
              <div class="estado-visual">
                <svg viewBox="0 0 200 160" class="estado-svg">
                  <g v-html="estado.svg"></g>
                </svg>
              </div>
              <div class="estado-info">
                <h3>{{ estado.nombre }}</h3>
                <p class="estado-ejemplo">{{ estado.ejemplo }}</p>
                <p class="estado-desc">{{ estado.descripcion }}</p>
                <div class="estado-tags">
                  <span class="tag" v-for="tag in estado.propiedades" :key="tag">{{ tag }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="tarjeta reveal-section" ref="sectionTransformaciones">
        <h2 class="titulo-seccion">⚡ Las 6 Transformaciones</h2>
        <p class="intro-descripcion">Cuando la materia cambia de estado, lo hace a través de procesos físicos que dependen de la energía, la temperatura y la presión.</p>
        <div class="transformaciones-grid">
          <div
            class="transform-card"
            v-for="(t, idx) in transformaciones"
            :key="idx"
            ref="transformCards"
          >
            <div class="transform-icono">{{ t.icono }}</div>
            <div class="transform-nombres">
              <span class="transform-desde">{{ t.desde }}</span>
              <span class="transform-flecha">→</span>
              <span class="transform-hacia">{{ t.hacia }}</span>
            </div>
            <h4>{{ t.nombre }}</h4>
            <p>{{ t.descripcion }}</p>
            <div class="transform-ejemplo">
              <span class="ejemplo-label">Cotidiano:</span> {{ t.ejemplo }}
            </div>
          </div>
        </div>
      </section>

      <section class="tarjeta reveal-section" ref="sectionObjetivos">
        <h2 class="titulo-seccion">🎯 ¿Qué vas a aprender?</h2>
        <div class="grid grid-2 learn-grid">
          <div
            class="learn-card"
            v-for="(obj, idx) in objetivos"
            :key="idx"
            @mousemove="onTilt($event, 'obj-' + idx)"
            @mouseleave="resetTilt('obj-' + idx)"
            ref="learnCards"
          >
            <div class="learn-card-glow"></div>
            <div class="learn-card-content">
              <div class="learn-icon">{{ obj.icono }}</div>
              <h3>{{ obj.titulo }}</h3>
              <p>{{ obj.descripcion }}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="tarjeta reveal-section" ref="sectionEncuesta">
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
            <strong>{{ encuesta.correcta === encuesta.seleccionada ? '¡Correcto!' : 'Inténtalo de nuevo' }}</strong>
            <br>{{ encuesta.explicacion }}
          </div>
        </div>
      </section>

      <section class="tarjeta reveal-section" ref="sectionChecklist">
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
    const tiltStates = reactive({})

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

    const estados = [
      {
        nombre: 'Sólido',
        ejemplo: 'Hielo, roca, madera',
        descripcion: 'Partículas densely compactadas con vibración mínima. Mantiene su forma y volumen.',
        propiedades: ['Forma fija', 'Volumen constante', 'No fluye'],
        svg: `
          <rect x="30" y="40" width="24" height="24" rx="2" fill="#4fc3f7" opacity="0.9">
            <animate attributeName="x" values="30;32;30" dur="1.5s" repeatCount="indefinite"/>
          </rect>
          <rect x="60" y="40" width="24" height="24" rx="2" fill="#4fc3f7" opacity="0.9">
            <animate attributeName="y" values="40;42;40" dur="1.8s" repeatCount="indefinite"/>
          </rect>
          <rect x="90" y="40" width="24" height="24" rx="2" fill="#4fc3f7" opacity="0.9">
            <animate attributeName="x" values="90;88;90" dur="1.3s" repeatCount="indefinite"/>
          </rect>
          <rect x="120" y="40" width="24" height="24" rx="2" fill="#4fc3f7" opacity="0.9">
            <animate attributeName="y" values="40;38;40" dur="1.6s" repeatCount="indefinite"/>
          </rect>
          <rect x="45" y="70" width="24" height="24" rx="2" fill="#4fc3f7" opacity="0.9">
            <animate attributeName="x" values="45;47;45" dur="1.4s" repeatCount="indefinite"/>
          </rect>
          <rect x="75" y="70" width="24" height="24" rx="2" fill="#4fc3f7" opacity="0.9">
            <animate attributeName="y" values="70;72;70" dur="1.7s" repeatCount="indefinite"/>
          </rect>
          <rect x="105" y="70" width="24" height="24" rx="2" fill="#4fc3f7" opacity="0.9">
            <animate attributeName="x" values="105;103;105" dur="1.2s" repeatCount="indefinite"/>
          </rect>
          <rect x="60" y="100" width="24" height="24" rx="2" fill="#4fc3f7" opacity="0.9">
            <animate attributeName="y" values="100;102;100" dur="1.9s" repeatCount="indefinite"/>
          </rect>
          <rect x="90" y="100" width="24" height="24" rx="2" fill="#4fc3f7" opacity="0.9">
            <animate attributeName="x" values="90;92;90" dur="1.1s" repeatCount="indefinite"/>
          </rect>
        `
      },
      {
        nombre: 'Líquido',
        ejemplo: 'Agua, aceite, mercurio',
        descripcion: 'Partículas con mayor libertad de movimiento. Adapta su forma al contenedor pero mantiene volumen.',
        propiedades: ['Forma variable', 'Volumen constante', 'Fluye'],
        svg: `
          <ellipse cx="100" cy="110" rx="70" ry="18" fill="#4fc3f7" opacity="0.3">
            <animate attributeName="rx" values="70;65;70" dur="2s" repeatCount="indefinite"/>
          </ellipse>
          <circle cx="50" cy="90" r="6" fill="#4fc3f7" opacity="0.8">
            <animate attributeName="cy" values="90;100;95;105;90" dur="3s" repeatCount="indefinite"/>
            <animate attributeName="cx" values="50;55;60;52;50" dur="3s" repeatCount="indefinite"/>
          </circle>
          <circle cx="80" cy="85" r="7" fill="#4fc3f7" opacity="0.8">
            <animate attributeName="cy" values="85;95;90;100;85" dur="2.5s" repeatCount="indefinite"/>
            <animate attributeName="cx" values="80;85;75;82;80" dur="2.5s" repeatCount="indefinite"/>
          </circle>
          <circle cx="110" cy="88" r="5" fill="#4fc3f7" opacity="0.8">
            <animate attributeName="cy" values="88;98;92;102;88" dur="2.8s" repeatCount="indefinite"/>
            <animate attributeName="cx" values="110;105;115;108;110" dur="2.8s" repeatCount="indefinite"/>
          </circle>
          <circle cx="140" cy="92" r="6" fill="#4fc3f7" opacity="0.8">
            <animate attributeName="cy" values="92;102;96;106;92" dur="2.2s" repeatCount="indefinite"/>
            <animate attributeName="cx" values="140;145;135;142;140" dur="2.2s" repeatCount="indefinite"/>
          </circle>
          <circle cx="70" cy="95" r="5" fill="#4fc3f7" opacity="0.7">
            <animate attributeName="cy" values="95;105;100;110;95" dur="3.2s" repeatCount="indefinite"/>
          </circle>
        `
      },
      {
        nombre: 'Gaseoso',
        ejemplo: 'Vapor, oxígeno, helio',
        descripcion: 'Partículas en movimiento libre y rápido. No tiene forma ni volumen definido.',
        propiedades: ['Sin forma fija', 'Sin volumen fijo', 'Se expande'],
        svg: `
          <circle cx="50" cy="80" r="4" fill="#4fc3f7" opacity="0.6">
            <animate attributeName="cy" values="80;50;120;60;80" dur="4s" repeatCount="indefinite"/>
            <animate attributeName="cx" values="50;90;30;110;50" dur="4s" repeatCount="indefinite"/>
          </circle>
          <circle cx="100" cy="60" r="3" fill="#4fc3f7" opacity="0.5">
            <animate attributeName="cy" values="60;110;40;90;60" dur="3.5s" repeatCount="indefinite"/>
            <animate attributeName="cx" values="100;40;140;60;100" dur="3.5s" repeatCount="indefinite"/>
          </circle>
          <circle cx="140" cy="90" r="5" fill="#4fc3f7" opacity="0.7">
            <animate attributeName="cy" values="90;40;100;50;90" dur="3s" repeatCount="indefinite"/>
            <animate attributeName="cx" values="140;80;120;50;140" dur="3s" repeatCount="indefinite"/>
          </circle>
          <circle cx="70" cy="100" r="3" fill="#4fc3f7" opacity="0.4">
            <animate attributeName="cy" values="100;30;80;45;100" dur="4.5s" repeatCount="indefinite"/>
            <animate attributeName="cx" values="70;130;50;100;70" dur="4.5s" repeatCount="indefinite"/>
          </circle>
          <circle cx="120" cy="70" r="4" fill="#4fc3f7" opacity="0.5">
            <animate attributeName="cy" values="70;120;30;100;70" dur="3.8s" repeatCount="indefinite"/>
            <animate attributeName="cx" values="120;60;150;80;120" dur="3.8s" repeatCount="indefinite"/>
          </circle>
          <circle cx="85" cy="50" r="3" fill="#4fc3f7" opacity="0.4">
            <animate attributeName="cy" values="50;110;60;130;50" dur="5s" repeatCount="indefinite"/>
            <animate attributeName="cx" values="85;150;40;120;85" dur="5s" repeatCount="indefinite"/>
          </circle>
          <circle cx="155" cy="55" r="4" fill="#4fc3f7" opacity="0.5">
            <animate attributeName="cy" values="55;100;35;90;55" dur="3.2s" repeatCount="indefinite"/>
            <animate attributeName="cx" values="155;100;160;70;155" dur="3.2s" repeatCount="indefinite"/>
          </circle>
        `
      }
    ]

    const transformaciones = [
      { nombre: 'Fusión', icono: '🧊→💧', desde: 'Sólido', hacia: 'Líquido', descripcion: 'El sólido absorbe calor y sus partículas se liberan.', ejemplo: 'Hielo derritiéndose en agua' },
      { nombre: 'Solidificación', icono: '💧🧊', desde: 'Líquido', hacia: 'Sólido', descripcion: 'El líquido pierde calor y sus partículas se compactan.', ejemplo: 'Agua congelándose en el freezer' },
      { nombre: 'Vaporización', icono: '💧→☁️', desde: 'Líquido', hacia: 'Gaseoso', descripcion: 'El líquido se calienta hasta convertirse en gas.', ejemplo: 'Agua hirviendo formando vapor' },
      { nombre: 'Condensación', icono: '☁️→💧', desde: 'Gaseoso', hacia: 'Líquido', descripcion: 'El gas pierde calor y vuelve a estado líquido.', ejemplo: 'Vapor formando gotas en un espejo' },
      { nombre: 'Sublimación', icono: '🧊→☁️', desde: 'Sólido', hacia: 'Gaseoso', descripcion: 'El sólido pasa directamente a gas sin ser líquido.', ejemplo: 'Hielo seco humeando' },
      { nombre: 'Sublimación inversa', icono: '☁️→🧊', desde: 'Gaseoso', hacia: 'Sólido', descripcion: 'El gas pasa directamente a sólido sin ser líquido.', ejemplo: 'Escarcha formándose en ventanas frías' }
    ]

    const objetivos = [
      { icono: '🔍', titulo: 'Identificar', descripcion: 'Los seis cambios de estado de la materia y sus características' },
      { icono: '⚡', titulo: 'Comprender', descripcion: 'Qué factores provocan cada transformación: energía, temperatura y presión' },
      { icono: '🔗', titulo: 'Aplicar', descripcion: 'Reconocer cambios de estado en ejemplos cotidianos de tu entorno' },
      { icono: '🧠', titulo: 'Analizar', descripcion: 'Diferenciar entre cambios físicos (de estado) y cambios químicos' }
    ]

    function onTilt(e, key) {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = ((y - centerY) / centerY) * -8
      const rotateY = ((x - centerX) / centerX) * 8
      tiltStates[key] = { rotateX, rotateY }
      gsap.to(e.currentTarget, {
        rotateX, rotateY,
        transformPerspective: 800,
        duration: 0.3,
        ease: 'power2.out'
      })
    }

    function resetTilt(key) {
      tiltStates[key] = null
    }

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

            const cards = entry.target.querySelectorAll('.estado-card, .transform-card, .learn-card')
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
      estados,
      transformaciones,
      objetivos,
      tiltStates,
      onTilt,
      resetTilt,
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

.estados-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--espaciado-mediano);
}

.estado-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(48, 54, 61, 0.5);
  border-radius: var(--radio-borde);
  overflow: hidden;
  transition: box-shadow 0.3s ease;
  cursor: default;
}

.estado-card:hover {
  box-shadow: 0 8px 32px rgba(79, 195, 247, 0.15);
}

.estado-card-inner {
  padding: var(--espaciado-mediano);
}

.estado-visual {
  display: flex;
  justify-content: center;
  margin-bottom: var(--espaciado-mediano);
  background: rgba(79, 195, 247, 0.05);
  border-radius: 8px;
  padding: var(--espaciado-pequeño);
}

.estado-svg {
  width: 100%;
  max-width: 200px;
  height: 140px;
}

.estado-info h3 {
  color: var(--color-primario);
  font-size: 1.2rem;
  margin-bottom: 4px;
}

.estado-ejemplo {
  color: var(--color-accento);
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.estado-desc {
  color: var(--color-texto-claro);
  font-size: 0.85rem;
  line-height: 1.5;
  margin-bottom: var(--espaciado-pequeño);
}

.estado-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag {
  padding: 3px 10px;
  border-radius: 12px;
  background: rgba(46, 125, 50, 0.15);
  color: var(--color-primario);
  font-size: 0.75rem;
  font-weight: 600;
}

.transformaciones-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--espaciado-mediano);
}

.transform-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(48, 54, 61, 0.5);
  border-radius: var(--radio-borde);
  padding: var(--espaciado-mediano);
  transition: var(--transition);
  cursor: default;
}

.transform-card:hover {
  border-color: var(--color-primario);
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(46, 125, 50, 0.15);
}

.transform-icono {
  font-size: 1.8rem;
  margin-bottom: var(--espaciado-pequeño);
}

.transform-nombres {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 0.85rem;
}

.transform-desde {
  color: var(--color-info);
  font-weight: 600;
}

.transform-flecha {
  color: var(--color-accento);
  font-size: 1.1rem;
}

.transform-hacia {
  color: var(--color-exito);
  font-weight: 600;
}

.transform-card h4 {
  color: var(--color-blanco);
  margin-bottom: 6px;
  font-size: 1rem;
}

.transform-card p {
  color: var(--color-texto-claro);
  font-size: 0.85rem;
  line-height: 1.5;
  margin-bottom: 8px;
}

.transform-ejemplo {
  font-size: 0.8rem;
  color: var(--color-texto-claro);
  background: rgba(255, 255, 255, 0.03);
  padding: 6px 10px;
  border-radius: 6px;
}

.ejemplo-label {
  color: var(--color-accento);
  font-weight: 600;
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
  .estados-grid {
    grid-template-columns: 1fr;
  }

  .transformaciones-grid {
    grid-template-columns: 1fr;
  }
}
</style>
