<template>
  <div class="paso2">
    <ParticleBackground color="#1565c0" :count="40" :speed="0.3" />
    <ProgressBar :paso-actual="2" />

    <div class="contenido-interior">
      <section class="tarjeta reveal-section">
        <h2 class="titulo-seccion">Las 6 Transformaciones de la Materia</h2>
        <p class="intro-descripcion">La materia cambia de estado cuando se le aplica o retira energia calorifica. Explora cada transformacion en el diagrama interactivo.</p>

        <div class="diagrama-transiciones">
          <div class="fila-transicion">
            <div class="estado-icono">
              <svg viewBox="0 0 40 40" width="36" height="36">
                <rect x="10" y="8" width="7" height="7" rx="1" fill="#4fc3f7" opacity="0.9"><animate attributeName="x" values="10;12;10" dur="2s" repeatCount="indefinite"/></rect>
                <rect x="19" y="8" width="7" height="7" rx="1" fill="#4fc3f7" opacity="0.9"><animate attributeName="y" values="8;6;8" dur="2.5s" repeatCount="indefinite"/></rect>
                <rect x="14" y="17" width="7" height="7" rx="1" fill="#4fc3f7" opacity="0.9"><animate attributeName="x" values="14;16;14" dur="1.8s" repeatCount="indefinite"/></rect>
                <rect x="10" y="26" width="7" height="7" rx="1" fill="#4fc3f7" opacity="0.9"><animate attributeName="y" values="26;24;26" dur="2.2s" repeatCount="indefinite"/></rect>
                <rect x="19" y="26" width="7" height="7" rx="1" fill="#4fc3f7" opacity="0.9"><animate attributeName="x" values="19;21;19" dur="1.5s" repeatCount="indefinite"/></rect>
              </svg>
              <span class="estado-nombre">Solido</span>
            </div>
            <div class="transicion-grupo">
              <button class="trans-boton trans-calor" @click="showDetalle(0)">
                <span class="trans-titulo">Fusion</span>
                <span class="trans-direccion">→ Liquido</span>
                <span class="trans-energia">+ Calor</span>
              </button>
              <button class="trans-boton trans-calor" @click="showDetalle(4)">
                <span class="trans-titulo">Sublimacion</span>
                <span class="trans-direccion">→ Gaseoso</span>
                <span class="trans-energia">+ Calor</span>
              </button>
            </div>
          </div>

          <div class="fila-transicion">
            <div class="estado-icono">
              <svg viewBox="0 0 40 40" width="36" height="36">
                <circle cx="13" cy="16" r="4" fill="#4fc3f7" opacity="0.8"><animate attributeName="cy" values="16;20;14;18;16" dur="2s" repeatCount="indefinite"/></circle>
                <circle cx="24" cy="14" r="4" fill="#4fc3f7" opacity="0.8"><animate attributeName="cy" values="14;18;12;16;14" dur="2.5s" repeatCount="indefinite"/></circle>
                <circle cx="18" cy="24" r="3" fill="#4fc3f7" opacity="0.7"><animate attributeName="cy" values="24;28;22;26;24" dur="3s" repeatCount="indefinite"/></circle>
                <circle cx="28" cy="22" r="3" fill="#4fc3f7" opacity="0.7"><animate attributeName="cy" values="22;26;20;24;22" dur="2.8s" repeatCount="indefinite"/></circle>
                <ellipse cx="20" cy="32" rx="16" ry="4" fill="#4fc3f7" opacity="0.1"/>
              </svg>
              <span class="estado-nombre">Liquido</span>
            </div>
            <div class="transicion-grupo">
              <button class="trans-boton trans-frio" @click="showDetalle(1)">
                <span class="trans-titulo">Solidificacion</span>
                <span class="trans-direccion">→ Solido</span>
                <span class="trans-energia">- Calor</span>
              </button>
              <button class="trans-boton trans-calor" @click="showDetalle(2)">
                <span class="trans-titulo">Vaporizacion</span>
                <span class="trans-direccion">→ Gaseoso</span>
                <span class="trans-energia">+ Calor</span>
              </button>
            </div>
          </div>

          <div class="fila-transicion">
            <div class="estado-icono">
              <svg viewBox="0 0 40 40" width="36" height="36">
                <circle cx="28" cy="10" r="3" fill="#4fc3f7" opacity="0.5"><animate attributeName="cx" values="28;33;23;30;28" dur="3.5s" repeatCount="indefinite"/><animate attributeName="cy" values="10;5;15;3;10" dur="3.5s" repeatCount="indefinite"/></circle>
                <circle cx="14" cy="14" r="3" fill="#4fc3f7" opacity="0.4"><animate attributeName="cy" values="14;8;20;5;14" dur="3s" repeatCount="indefinite"/></circle>
                <circle cx="22" cy="20" r="3" fill="#4fc3f7" opacity="0.5"><animate attributeName="cy" values="20;14;26;12;20" dur="4s" repeatCount="indefinite"/></circle>
                <circle cx="32" cy="26" r="3" fill="#4fc3f7" opacity="0.4"><animate attributeName="cy" values="26;20;30;18;26" dur="3.8s" repeatCount="indefinite"/></circle>
              </svg>
              <span class="estado-nombre">Gaseoso</span>
            </div>
            <div class="transicion-grupo">
              <button class="trans-boton trans-frio" @click="showDetalle(3)">
                <span class="trans-titulo">Condensacion</span>
                <span class="trans-direccion">→ Liquido</span>
                <span class="trans-energia">- Calor</span>
              </button>
              <button class="trans-boton trans-frio" @click="showDetalle(5)">
                <span class="trans-titulo">Subl. Inversa</span>
                <span class="trans-direccion">→ Solido</span>
                <span class="trans-energia">- Calor</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section class="tarjeta reveal-section">
        <h2 class="titulo-seccion">Simulador interactivo</h2>
        <p class="intro-descripcion">Ajusta la temperatura con los botones y observa como cambia el comportamiento de las particulas.</p>
        <ParticleSimulator />
      </section>

      <section class="tarjeta detalle-section" v-if="detalleActivo">
        <div class="detalle-header">
          <h2 class="titulo-seccion">{{ detalle.nombre }}</h2>
          <span class="detalle-tag" :class="detalle.tipoClase">{{ detalle.tipo }}</span>
        </div>
        <div class="detalle-body">
          <div class="detalle-visual">
            <svg viewBox="0 0 320 100" class="detalle-svg">
              <g v-html="detalle.svg"></g>
            </svg>
          </div>
          <div class="detalle-info">
            <div class="detalle-transicion">
              <span class="detalle-desde">{{ detalle.desde }}</span>
              <span class="detalle-flecha">
                <svg width="28" height="14" viewBox="0 0 28 14"><path d="M0 7h22M18 2l6 5-6 5" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </span>
              <span class="detalle-hacia">{{ detalle.hacia }}</span>
            </div>
            <p class="detalle-desc">{{ detalle.descripcion }}</p>
            <div class="detalle-ejemplo">
              <div class="detalle-ejemplo-icono">
                <svg width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" stroke="#ff6f00" stroke-width="2" fill="none"/><text x="10" y="14" fill="#ff6f00" font-size="12" text-anchor="middle" font-weight="bold">i</text></svg>
              </div>
              <div>
                <strong>Ejemplo cotidiano:</strong>
                <p>{{ detalle.ejemplo }}</p>
              </div>
            </div>
          </div>
        </div>
        <button class="detalle-cerrar" @click="detalleActivo = false">Cerrar</button>
      </section>

      <section class="tarjeta reveal-section">
        <h2 class="titulo-seccion">Explora cada transformacion</h2>
        <p class="intro-descripcion">Haz clic en cualquier tarjeta para ver la animacion completa.</p>
        <div class="explorar-grid">
          <div
            class="explorar-card"
            v-for="(t, idx) in transformaciones"
            :key="idx"
            @click="showDetalle(idx)"
          >
            <div class="explorar-mini">
              <svg viewBox="0 0 320 60" class="explorar-svg">
                <g v-html="t.svgMini"></g>
              </svg>
            </div>
            <h4>{{ t.nombre }}</h4>
            <p>{{ t.desde }} → {{ t.hacia }}</p>
          </div>
        </div>
      </section>

      <section class="tarjeta reveal-section">
        <h2 class="titulo-seccion">Factores que influyen</h2>
        <div class="factores-grid">
          <div class="factor-card">
            <div class="factor-icono">
              <svg viewBox="0 0 40 40" width="40" height="40">
                <circle cx="20" cy="20" r="16" fill="none" stroke="#ff6f00" stroke-width="2"/>
                <circle cx="12" cy="12" r="4" fill="#ff6f00" opacity="0.8"/>
                <circle cx="28" cy="10" r="3" fill="#ff6f00" opacity="0.6"/>
                <circle cx="22" cy="28" r="3" fill="#ff6f00" opacity="0.7"/>
                <circle cx="10" cy="25" r="3" fill="#ff6f00" opacity="0.5"/>
                <animateTransform attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="6s" repeatCount="indefinite"/>
              </svg>
            </div>
            <h4>Temperatura</h4>
            <p>Al aumentar la temperatura, las particulas ganan energia y se mueven mas. Al disminuir, pierden energia y se compactan.</p>
          </div>
          <div class="factor-card">
            <div class="factor-icono">
              <svg viewBox="0 0 40 40" width="40" height="40">
                <polygon points="20,4 36,30 4,30" fill="none" stroke="#58a6ff" stroke-width="2"/>
                <line x1="20" y1="4" x2="20" y2="30" stroke="#58a6ff" stroke-width="1.5"/>
                <circle cx="12" cy="20" r="3" fill="#58a6ff" opacity="0.6"><animate attributeName="cy" values="20;18;22;20" dur="3s" repeatCount="indefinite"/></circle>
                <circle cx="20" cy="15" r="3" fill="#58a6ff" opacity="0.8"><animate attributeName="cy" values="15;13;17;15" dur="2.5s" repeatCount="indefinite"/></circle>
                <circle cx="28" cy="20" r="3" fill="#58a6ff" opacity="0.6"><animate attributeName="cy" values="20;18;22;20" dur="3.5s" repeatCount="indefinite"/></circle>
              </svg>
            </div>
            <h4>Presion</h4>
            <p>Al aumentar la presion, las particulas se comprimen. Al disminuir, se expanden facilitando cambios de estado.</p>
          </div>
          <div class="factor-card">
            <div class="factor-icono">
              <svg viewBox="0 0 40 40" width="40" height="40">
                <line x1="4" y1="20" x2="36" y2="20" stroke="#3fb950" stroke-width="2"/>
                <rect x="8" y="10" width="10" height="20" rx="2" fill="#3fb950" opacity="0.5">
                  <animate attributeName="height" values="20;24;16;20" dur="2s" repeatCount="indefinite"/>
                  <animate attributeName="y" values="10;8;12;10" dur="2s" repeatCount="indefinite"/>
                </rect>
                <rect x="22" y="6" width="10" height="28" rx="2" fill="#3fb950" opacity="0.7">
                  <animate attributeName="height" values="28;32;24;28" dur="2.5s" repeatCount="indefinite"/>
                  <animate attributeName="y" values="6;4;8;6" dur="2.5s" repeatCount="indefinite"/>
                </rect>
              </svg>
            </div>
            <h4>Energia</h4>
            <p>La energia calorifica es la fuerza impulsora. Mas energia separa particulas, menos energia las une en estructuras ordenadas.</p>
          </div>
        </div>
      </section>

      <div class="navegacion">
        <router-link to="/" class="boton boton-secundario">← Paso 1: Intro</router-link>
        <router-link to="/paso3" class="boton boton-principal">Paso 3: Actividad →</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, onBeforeUnmount, ref, reactive } from 'vue'
import gsap from 'gsap'
import ParticleBackground from '../components/ParticleBackground.vue'
import ProgressBar from '../components/ProgressBar.vue'
import ParticleSimulator from '../components/ParticleSimulator.vue'

export default {
  name: 'Paso2View',
  components: { ParticleBackground, ProgressBar, ParticleSimulator },
  setup() {
    const hoverEstado = ref(null)
    const detalleActivo = ref(false)
    const detalle = ref({})
    let scrollObserver = null

    const tSvgs = {
      fusionMini: `<g>
        <rect x="20" y="15" width="10" height="10" rx="1" fill="#4fc3f7" opacity="0.9"><animate attributeName="x" values="20;22;20" dur="1.5s" repeatCount="indefinite"/></rect>
        <rect x="34" y="15" width="10" height="10" rx="1" fill="#4fc3f7" opacity="0.9"><animate attributeName="y" values="15;17;15" dur="1.8s" repeatCount="indefinite"/></rect>
        <circle cx="160" cy="25" r="4" fill="#4fc3f7" opacity="0.8"><animate attributeName="cy" values="25;30;22;28;25" dur="2s" repeatCount="indefinite"/></circle>
        <circle cx="175" cy="22" r="4" fill="#4fc3f7" opacity="0.8"><animate attributeName="cy" values="22;27;20;25;22" dur="2.3s" repeatCount="indefinite"/></circle>
        <text x="90" y="20" fill="#ff6f00" font-size="8" text-anchor="middle">+Calor</text>
        <line x1="70" y1="30" x2="120" y2="30" stroke="#ff6f00" stroke-width="1.5"/>
        <polygon points="120,27 128,30 120,33" fill="#ff6f00"/>
      </g>`,

      solidMini: `<g>
        <circle cx="20" cy="22" r="4" fill="#4fc3f7" opacity="0.8"><animate attributeName="cy" values="22;27;20;25;22" dur="2s" repeatCount="indefinite"/></circle>
        <circle cx="35" cy="25" r="4" fill="#4fc3f7" opacity="0.8"><animate attributeName="cy" values="25;30;23;28;25" dur="2.5s" repeatCount="indefinite"/></circle>
        <rect x="155" y="15" width="10" height="10" rx="1" fill="#4fc3f7" opacity="0.9"><animate attributeName="y" values="15;17;15" dur="1.5s" repeatCount="indefinite"/></rect>
        <rect x="170" y="15" width="10" height="10" rx="1" fill="#4fc3f7" opacity="0.9"><animate attributeName="x" values="170;172;170" dur="1.8s" repeatCount="indefinite"/></rect>
        <text x="88" y="20" fill="#58a6ff" font-size="8" text-anchor="middle">-Calor</text>
        <line x1="70" y1="30" x2="120" y2="30" stroke="#58a6ff" stroke-width="1.5"/>
        <polygon points="70,27 62,30 70,33" fill="#58a6ff"/>
      </g>`,

      vapMini: `<g>
        <circle cx="20" cy="28" r="4" fill="#4fc3f7" opacity="0.8"><animate attributeName="cy" values="28;33;26;31;28" dur="2s" repeatCount="indefinite"/></circle>
        <circle cx="35" cy="30" r="4" fill="#4fc3f7" opacity="0.8"><animate attributeName="cy" values="30;35;28;33;30" dur="2.5s" repeatCount="indefinite"/></circle>
        <circle cx="155" cy="15" r="3" fill="#4fc3f7" opacity="0.5"><animate attributeName="cy" values="15;5;22;2;15" dur="3s" repeatCount="indefinite"/></circle>
        <circle cx="172" cy="18" r="3" fill="#4fc3f7" opacity="0.4"><animate attributeName="cy" values="18;8;25;5;18" dur="3.5s" repeatCount="indefinite"/></circle>
        <circle cx="165" cy="10" r="3" fill="#4fc3f7" opacity="0.4"><animate attributeName="cy" values="10;2;18;0;10" dur="2.8s" repeatCount="indefinite"/></circle>
        <text x="90" y="20" fill="#ff6f00" font-size="8" text-anchor="middle">+Calor</text>
        <line x1="70" y1="30" x2="120" y2="30" stroke="#ff6f00" stroke-width="1.5"/>
        <polygon points="120,27 128,30 120,33" fill="#ff6f00"/>
      </g>`,

      condMini: `<g>
        <circle cx="20" cy="15" r="3" fill="#4fc3f7" opacity="0.5"><animate attributeName="cy" values="15;5;22;2;15" dur="3s" repeatCount="indefinite"/></circle>
        <circle cx="35" cy="18" r="3" fill="#4fc3f7" opacity="0.4"><animate attributeName="cy" values="18;8;25;5;18" dur="3.5s" repeatCount="indefinite"/></circle>
        <circle cx="155" cy="28" r="4" fill="#4fc3f7" opacity="0.8"><animate attributeName="cy" values="28;33;26;31;28" dur="2s" repeatCount="indefinite"/></circle>
        <circle cx="172" cy="25" r="4" fill="#4fc3f7" opacity="0.8"><animate attributeName="cy" values="25;30;23;28;25" dur="2.5s" repeatCount="indefinite"/></circle>
        <text x="88" y="20" fill="#58a6ff" font-size="8" text-anchor="middle">-Calor</text>
        <line x1="70" y1="30" x2="120" y2="30" stroke="#58a6ff" stroke-width="1.5"/>
        <polygon points="70,27 62,30 70,33" fill="#58a6ff"/>
      </g>`,

      subMini: `<g>
        <rect x="20" y="15" width="10" height="10" rx="1" fill="#4fc3f7" opacity="0.9"><animate attributeName="x" values="20;22;20" dur="1.5s" repeatCount="indefinite"/></rect>
        <rect x="34" y="15" width="10" height="10" rx="1" fill="#4fc3f7" opacity="0.9"><animate attributeName="y" values="15;17;15" dur="1.8s" repeatCount="indefinite"/></rect>
        <circle cx="155" cy="12" r="3" fill="#4fc3f7" opacity="0.5"><animate attributeName="cy" values="12;2;20;0;12" dur="3.5s" repeatCount="indefinite"/></circle>
        <circle cx="172" cy="15" r="3" fill="#4fc3f7" opacity="0.4"><animate attributeName="cy" values="15;5;22;2;15" dur="4s" repeatCount="indefinite"/></circle>
        <circle cx="163" cy="8" r="3" fill="#4fc3f7" opacity="0.4"><animate attributeName="cy" values="8;0;15;-2;8" dur="3s" repeatCount="indefinite"/></circle>
        <text x="90" y="20" fill="#ff6f00" font-size="8" text-anchor="middle">+Calor</text>
        <line x1="70" y1="30" x2="120" y2="30" stroke="#ff6f00" stroke-width="1.5"/>
        <polygon points="120,27 128,30 120,33" fill="#ff6f00"/>
      </g>`,

      subiMini: `<g>
        <circle cx="20" cy="12" r="3" fill="#4fc3f7" opacity="0.5"><animate attributeName="cy" values="12;2;20;0;12" dur="3.5s" repeatCount="indefinite"/></circle>
        <circle cx="35" cy="15" r="3" fill="#4fc3f7" opacity="0.4"><animate attributeName="cy" values="15;5;22;2;15" dur="4s" repeatCount="indefinite"/></circle>
        <rect x="155" y="15" width="10" height="10" rx="1" fill="#4fc3f7" opacity="0.9"><animate attributeName="y" values="15;17;15" dur="1.5s" repeatCount="indefinite"/></rect>
        <rect x="170" y="15" width="10" height="10" rx="1" fill="#4fc3f7" opacity="0.9"><animate attributeName="x" values="170;172;170" dur="1.8s" repeatCount="indefinite"/></rect>
        <text x="88" y="20" fill="#58a6ff" font-size="8" text-anchor="middle">-Calor</text>
        <line x1="70" y1="30" x2="120" y2="30" stroke="#58a6ff" stroke-width="1.5"/>
        <polygon points="70,27 62,30 70,33" fill="#58a6ff"/>
      </g>`
    }

    const transformaciones = [
      { nombre: 'Fusion', tipo: 'Calor aplicado', tipoClase: 'tipo-calor', desde: 'Solido', hacia: 'Liquido', descripcion: 'El solido absorbe calor y vibra con tanta energia que su estructura cristalina se rompe, permitiendo que las particulas fluyan.', ejemplo: 'Un cubo de hielo derritiendose en un vaso de agua al sol.', svg: `<g transform="translate(10,0)"><rect x="30" y="35" width="16" height="16" rx="2" fill="#4fc3f7" opacity="0.9"><animate attributeName="y" values="35;33;35" dur="1.2s" repeatCount="indefinite"/></rect><rect x="50" y="35" width="16" height="16" rx="2" fill="#4fc3f7" opacity="0.9"><animate attributeName="y" values="35;37;35" dur="1.4s" repeatCount="indefinite"/></rect><rect x="70" y="35" width="16" height="16" rx="2" fill="#4fc3f7" opacity="0.9"><animate attributeName="y" values="35;34;35" dur="1.1s" repeatCount="indefinite"/></rect></g><g transform="translate(140,0)"><circle cx="30" cy="50" r="5" fill="#4fc3f7" opacity="0.8"><animate attributeName="cy" values="50;65;55;70;50" dur="2s" repeatCount="indefinite"/></circle><circle cx="55" cy="45" r="5" fill="#4fc3f7" opacity="0.8"><animate attributeName="cy" values="45;60;50;65;45" dur="2.3s" repeatCount="indefinite"/></circle><circle cx="80" cy="55" r="4" fill="#4fc3f7" opacity="0.7"><animate attributeName="cy" values="55;70;60;75;55" dur="1.8s" repeatCount="indefinite"/></circle><circle cx="105" cy="48" r="5" fill="#4fc3f7" opacity="0.8"><animate attributeName="cy" values="48;63;53;68;48" dur="2.1s" repeatCount="indefinite"/></circle></g><g><text x="130" y="15" fill="#ff6f00" font-size="12" font-weight="bold" text-anchor="middle">Calor</text><line x1="110" y1="18" x2="150" y2="18" stroke="#ff6f00" stroke-width="2"/><polygon points="150,15 158,18 150,21" fill="#ff6f00"/></g>`,
        svgMini: tSvgs.fusionMini },
      { nombre: 'Solidificacion', tipo: 'Enfriamiento', tipoClase: 'tipo-frio', desde: 'Liquido', hacia: 'Solido', descripcion: 'El liquido pierde calor y sus particulas se mueven cada vez mas lento hasta que se ordenan en una estructura rigida y cristalina.', ejemplo: 'El agua en el congelador convirtiendose lentamente en hielo.', svg: `<g transform="translate(10,0)"><circle cx="30" cy="55" r="5" fill="#4fc3f7" opacity="0.8"><animate attributeName="cy" values="55;60;52;58;55" dur="2s" repeatCount="indefinite"/></circle><circle cx="55" cy="50" r="5" fill="#4fc3f7" opacity="0.8"><animate attributeName="cy" values="50;55;48;53;50" dur="2.2s" repeatCount="indefinite"/></circle><circle cx="80" cy="60" r="4" fill="#4fc3f7" opacity="0.7"><animate attributeName="cy" values="60;65;57;63;60" dur="1.8s" repeatCount="indefinite"/></circle></g><g transform="translate(140,0)"><rect x="30" y="40" width="14" height="14" rx="2" fill="#4fc3f7" opacity="0.9"><animate attributeName="y" values="40;38;40" dur="1.5s" repeatCount="indefinite"/></rect><rect x="48" y="40" width="14" height="14" rx="2" fill="#4fc3f7" opacity="0.9"><animate attributeName="y" values="40;42;40" dur="1.7s" repeatCount="indefinite"/></rect><rect x="66" y="40" width="14" height="14" rx="2" fill="#4fc3f7" opacity="0.9"><animate attributeName="y" values="40;39;40" dur="1.3s" repeatCount="indefinite"/></rect></g><g><text x="130" y="15" fill="#58a6ff" font-size="10" font-weight="bold" text-anchor="middle">Frio</text><line x1="150" y1="18" x2="110" y2="18" stroke="#58a6ff" stroke-width="2"/><polygon points="110,15 102,18 110,21" fill="#58a6ff"/></g>`,
        svgMini: tSvgs.solidMini },
      { nombre: 'Vaporizacion', tipo: 'Calor intenso', tipoClase: 'tipo-calor', desde: 'Liquido', hacia: 'Gaseoso', descripcion: 'El liquido se calienta tanto que sus particulas escapan de la superficie y se dispersan en el aire como gas invisible.', ejemplo: 'El agua hirviendo en una olla que se evapora en la cocina.', svg: `<g transform="translate(10,0)"><circle cx="30" cy="65" r="5" fill="#4fc3f7" opacity="0.8"><animate attributeName="cy" values="65;68;62;66;65" dur="2s" repeatCount="indefinite"/></circle><circle cx="55" cy="60" r="5" fill="#4fc3f7" opacity="0.8"><animate attributeName="cy" values="60;63;58;61;60" dur="2.2s" repeatCount="indefinite"/></circle><circle cx="80" cy="70" r="4" fill="#4fc3f7" opacity="0.7"><animate attributeName="cy" values="70;73;68;71;70" dur="1.8s" repeatCount="indefinite"/></circle><ellipse cx="65" cy="80" rx="50" ry="6" fill="#4fc3f7" opacity="0.2"/></g><g transform="translate(140,0)"><circle cx="30" cy="45" r="4" fill="#4fc3f7" opacity="0.6"><animate attributeName="cy" values="45;25;55;15;45" dur="3s" repeatCount="indefinite"/></circle><circle cx="60" cy="50" r="3" fill="#4fc3f7" opacity="0.5"><animate attributeName="cy" values="50;30;60;20;50" dur="2.5s" repeatCount="indefinite"/></circle><circle cx="90" cy="40" r="4" fill="#4fc3f7" opacity="0.6"><animate attributeName="cy" values="40;20;50;10;40" dur="3.5s" repeatCount="indefinite"/></circle></g><g><text x="130" y="95" fill="#ff6f00" font-size="12" font-weight="bold" text-anchor="middle">Calor</text><line x1="130" y1="90" x2="130" y2="75" stroke="#ff6f00" stroke-width="2"/><polygon points="127,75 130,68 133,75" fill="#ff6f00"/></g>`,
        svgMini: tSvgs.vapMini },
      { nombre: 'Condensacion', tipo: 'Enfriamiento', tipoClase: 'tipo-frio', desde: 'Gaseoso', hacia: 'Liquido', descripcion: 'El gas caliente toca una superficie fria, pierde energia y sus particulas se agrupan formando gotas de liquido.', ejemplo: 'El vapor de la ducha que empaña el espejo con gotitas de agua.', svg: `<g transform="translate(10,0)"><circle cx="30" cy="30" r="4" fill="#4fc3f7" opacity="0.5"><animate attributeName="cy" values="30;50;20;55;30" dur="3s" repeatCount="indefinite"/></circle><circle cx="60" cy="25" r="3" fill="#4fc3f7" opacity="0.4"><animate attributeName="cy" values="25;45;15;50;25" dur="2.8s" repeatCount="indefinite"/></circle><circle cx="90" cy="35" r="4" fill="#4fc3f7" opacity="0.5"><animate attributeName="cy" values="35;55;25;60;35" dur="3.2s" repeatCount="indefinite"/></circle></g><g transform="translate(140,0)"><circle cx="30" cy="65" r="5" fill="#4fc3f7" opacity="0.8"><animate attributeName="cy" values="65;68;63;67;65" dur="2s" repeatCount="indefinite"/></circle><circle cx="55" cy="60" r="5" fill="#4fc3f7" opacity="0.8"><animate attributeName="cy" values="60;63;58;61;60" dur="2.2s" repeatCount="indefinite"/></circle><circle cx="80" cy="68" r="4" fill="#4fc3f7" opacity="0.7"><animate attributeName="cy" values="68;71;66;69;68" dur="1.8s" repeatCount="indefinite"/></circle><ellipse cx="70" cy="78" rx="50" ry="6" fill="#4fc3f7" opacity="0.2"/></g><g><text x="130" y="15" fill="#58a6ff" font-size="10" font-weight="bold" text-anchor="middle">Frio</text><line x1="130" y1="18" x2="130" y2="35" stroke="#58a6ff" stroke-width="2"/><polygon points="127,35 130,42 133,35" fill="#58a6ff"/></g>`,
        svgMini: tSvgs.condMini },
      { nombre: 'Sublimacion', tipo: 'Calor especial', tipoClase: 'tipo-calor', desde: 'Solido', hacia: 'Gaseoso', descripcion: 'El solido recibe tanta energia que sus particulas saltan directamente al estado gaseoso, saltandose la fase liquida.', ejemplo: 'El hielo seco (CO2 solido) que humea sin derretirse en una fiesta de Halloween.', svg: `<g transform="translate(10,0)"><rect x="45" y="55" width="14" height="14" rx="2" fill="#4fc3f7" opacity="0.9"><animate attributeName="y" values="55;53;55" dur="1.5s" repeatCount="indefinite"/></rect><rect x="63" y="55" width="14" height="14" rx="2" fill="#4fc3f7" opacity="0.9"><animate attributeName="y" values="55;57;55" dur="1.7s" repeatCount="indefinite"/></rect><rect x="81" y="55" width="14" height="14" rx="2" fill="#4fc3f7" opacity="0.9"><animate attributeName="y" values="55;54;55" dur="1.3s" repeatCount="indefinite"/></rect></g><g transform="translate(140,0)"><circle cx="40" cy="35" r="4" fill="#4fc3f7" opacity="0.6"><animate attributeName="cy" values="35;15;50;10;35" dur="3.5s" repeatCount="indefinite"/></circle><circle cx="70" cy="40" r="3" fill="#4fc3f7" opacity="0.5"><animate attributeName="cy" values="40;20;55;15;40" dur="3s" repeatCount="indefinite"/></circle><circle cx="100" cy="30" r="4" fill="#4fc3f7" opacity="0.6"><animate attributeName="cy" values="30;10;45;5;30" dur="4s" repeatCount="indefinite"/></circle></g><g><text x="130" y="95" fill="#ff6f00" font-size="12" font-weight="bold" text-anchor="middle">Calor</text><line x1="130" y1="90" x2="130" y2="75" stroke="#ff6f00" stroke-width="2"/><polygon points="127,75 130,68 133,75" fill="#ff6f00"/></g>`,
        svgMini: tSvgs.subMini },
      { nombre: 'Sublimacion Inversa', tipo: 'Enfriamiento directo', tipoClase: 'tipo-frio', desde: 'Gaseoso', hacia: 'Solido', descripcion: 'El gas se en fria tanto que sus particulas se congelan directamente en una superficie, formando cristales sin pasar por liquido.', ejemplo: 'La escarcha que se forma en las ventanas en invierno sin que haya llovido.', svg: `<g transform="translate(10,0)"><circle cx="40" cy="25" r="4" fill="#4fc3f7" opacity="0.5"><animate attributeName="cy" values="25;45;15;50;25" dur="3s" repeatCount="indefinite"/></circle><circle cx="70" cy="30" r="3" fill="#4fc3f7" opacity="0.4"><animate attributeName="cy" values="30;50;20;55;30" dur="2.8s" repeatCount="indefinite"/></circle><circle cx="100" cy="20" r="4" fill="#4fc3f7" opacity="0.5"><animate attributeName="cy" values="20;40;10;45;20" dur="3.2s" repeatCount="indefinite"/></circle></g><g transform="translate(140,0)"><rect x="30" y="55" width="12" height="12" rx="2" fill="#4fc3f7" opacity="0.9"><animate attributeName="y" values="55;53;55" dur="1.5s" repeatCount="indefinite"/></rect><rect x="46" y="55" width="12" height="12" rx="2" fill="#4fc3f7" opacity="0.9"><animate attributeName="y" values="55;57;55" dur="1.7s" repeatCount="indefinite"/></rect><rect x="62" y="55" width="12" height="12" rx="2" fill="#4fc3f7" opacity="0.9"><animate attributeName="y" values="55;54;55" dur="1.3s" repeatCount="indefinite"/></rect><rect x="78" y="55" width="12" height="12" rx="2" fill="#4fc3f7" opacity="0.9"><animate attributeName="y" values="55;56;55" dur="1.6s" repeatCount="indefinite"/></rect><rect x="94" y="55" width="12" height="12" rx="2" fill="#4fc3f7" opacity="0.9"><animate attributeName="y" values="55;54;55" dur="1.4s" repeatCount="indefinite"/></rect></g><g><text x="130" y="15" fill="#58a6ff" font-size="10" font-weight="bold" text-anchor="middle">Frio</text><line x1="130" y1="18" x2="130" y2="35" stroke="#58a6ff" stroke-width="2"/><polygon points="127,35 130,42 133,35" fill="#58a6ff"/></g>`,
        svgMini: tSvgs.subiMini }
    ]

    function showDetalle(idx) {
      detalle.value = transformaciones[idx]
      detalleActivo.value = true
    }

    onMounted(() => {
      const revealElements = document.querySelectorAll('.reveal-section')
      scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            gsap.fromTo(entry.target, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
            const cards = entry.target.querySelectorAll('.explorar-card, .factor-card')
            if (cards.length) {
              gsap.fromTo(cards, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.12, delay: 0.3, ease: 'back.out(1.2)' })
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

    return { hoverEstado, transformaciones, detalle, detalleActivo, showDetalle }
  }
}
</script>

<style scoped>
.paso2 {
  min-height: 100vh;
}

.diagrama-transiciones {
  display: flex;
  flex-direction: column;
  gap: var(--espaciado-mediano);
  padding: var(--espaciado-mediano) 0;
  max-width: 500px;
  margin: 0 auto;
}

.fila-transicion {
  display: flex;
  align-items: center;
  gap: var(--espaciado-mediano);
  padding: var(--espaciado-mediano);
  border-radius: var(--radio-borde);
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(48, 54, 61, 0.3);
}

.estado-icono {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  min-width: 70px;
  flex-shrink: 0;
}

.estado-nombre {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-texto-claro);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.transicion-grupo {
  display: flex;
  gap: var(--espaciado-pequeño);
  flex: 1;
}

.trans-boton {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 12px 10px;
  border-radius: 8px;
  border: 1px solid rgba(48, 54, 61, 0.4);
  background: rgba(255, 255, 255, 0.03);
  cursor: pointer;
  transition: var(--transition);
  text-align: center;
}

.trans-boton:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.3);
}

.trans-calor {
  border-color: rgba(255, 111, 0, 0.25);
  background: rgba(255, 111, 0, 0.06);
}

.trans-calor:hover {
  background: rgba(255, 111, 0, 0.15);
  border-color: rgba(255, 111, 0, 0.5);
  box-shadow: 0 6px 16px rgba(255, 111, 0, 0.15);
}

.trans-frio {
  border-color: rgba(88, 166, 255, 0.25);
  background: rgba(88, 166, 255, 0.06);
}

.trans-frio:hover {
  background: rgba(88, 166, 255, 0.15);
  border-color: rgba(88, 166, 255, 0.5);
  box-shadow: 0 6px 16px rgba(88, 166, 255, 0.15);
}

.trans-titulo {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-blanco);
}

.trans-direccion {
  font-size: 0.7rem;
  color: var(--color-texto-claro);
}

.trans-energia {
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.trans-calor .trans-energia { color: #ff6f00; }
.trans-frio .trans-energia { color: #58a6ff; }

.detalle-section {
  margin-top: var(--espaciado-grande);
  animation: slideUp 0.4s ease;
}

.detalle-header {
  display: flex;
  align-items: center;
  gap: var(--espaciado-mediano);
  margin-bottom: var(--espaciado-mediano);
}

.detalle-tag {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detalle-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--espaciado-grande);
  align-items: center;
}

.detalle-visual {
  background: rgba(79, 195, 247, 0.04);
  border-radius: 8px;
  padding: var(--espaciado-mediano);
  border: 1px solid rgba(79, 195, 247, 0.1);
}

.detalle-svg {
  width: 100%;
  height: 120px;
}

.detalle-info {
  display: flex;
  flex-direction: column;
  gap: var(--espaciado-mediano);
}

.detalle-transicion {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.1rem;
  font-weight: 700;
}

.detalle-desde { color: var(--color-info); }
.detalle-flecha { color: var(--color-accento); display: flex; align-items: center; }
.detalle-hacia { color: var(--color-exito); }

.detalle-desc {
  color: var(--color-texto-claro);
  font-size: 0.95rem;
  line-height: 1.7;
}

.detalle-ejemplo {
  display: flex;
  gap: 12px;
  padding: var(--espaciado-mediano);
  background: rgba(255, 111, 0, 0.05);
  border: 1px solid rgba(255, 111, 0, 0.15);
  border-radius: 8px;
  align-items: flex-start;
}

.detalle-ejemplo-icono {
  flex-shrink: 0;
  margin-top: 2px;
}

.detalle-ejemplo strong {
  color: var(--color-accento);
  font-size: 0.85rem;
}

.detalle-ejemplo p {
  color: var(--color-texto-claro);
  font-size: 0.85rem;
  margin-top: 4px;
}

.detalle-cerrar {
  margin-top: var(--espaciado-mediano);
  padding: 10px var(--espaciado-grande);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(48, 54, 61, 0.5);
  border-radius: var(--radio-borde);
  color: var(--color-texto-claro);
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: var(--transition);
}

.detalle-cerrar:hover {
  background: rgba(255, 255, 255, 0.1);
  color: var(--color-blanco);
}

.explorar-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--espaciado-mediano);
}

.explorar-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(48, 54, 61, 0.4);
  border-radius: var(--radio-borde);
  padding: var(--espaciado-mediano);
  cursor: pointer;
  transition: var(--transition);
  text-align: center;
}

.explorar-card:hover {
  border-color: var(--color-primario);
  background: rgba(46, 125, 50, 0.05);
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(46, 125, 50, 0.12);
}

.explorar-mini {
  margin-bottom: var(--espaciado-pequeño);
}

.explorar-svg {
  width: 100%;
  height: 60px;
}

.explorar-card h4 {
  color: var(--color-blanco);
  font-size: 0.95rem;
  margin-bottom: 4px;
}

.explorar-card p {
  color: var(--color-texto-claro);
  font-size: 0.8rem;
}

.factores-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--espaciado-mediano);
}

.factor-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(48, 54, 61, 0.4);
  border-radius: var(--radio-borde);
  padding: var(--espaciado-grande);
  text-align: center;
  transition: var(--transition);
}

.factor-card:hover {
  border-color: rgba(46, 125, 50, 0.3);
  background: rgba(46, 125, 50, 0.03);
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(46, 125, 50, 0.1);
}

.factor-icono {
  margin-bottom: var(--espaciado-mediano);
}

.factor-card h4 {
  color: var(--color-blanco);
  font-size: 1.1rem;
  margin-bottom: var(--espaciado-pequeño);
}

.factor-card p {
  color: var(--color-texto-claro);
  font-size: 0.85rem;
  line-height: 1.6;
}

.navegacion {
  display: flex;
  justify-content: space-between;
  margin-top: var(--espaciado-enorme);
  padding: var(--espaciado-grande) 0;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .detalle-body {
    grid-template-columns: 1fr;
  }
  .explorar-grid,
  .factores-grid {
    grid-template-columns: 1fr;
  }
  .navegacion {
    flex-direction: column;
    gap: var(--espaciado-mediano);
  }
  .fila-transicion {
    flex-direction: column;
    text-align: center;
  }
  .transicion-grupo {
    width: 100%;
  }
}
</style>
