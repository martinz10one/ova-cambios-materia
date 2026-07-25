<template>
  <div class="progress-bar-container">
    <div class="progress-steps">
      <div
        v-for="(paso, idx) in pasos"
        :key="idx"
        class="progress-step"
        :class="{
          completado: pasoCompletado(idx),
          actual: pasoActual === idx + 1,
          pendiente: pasoActual > idx + 1 && !pasoCompletado(idx)
        }"
      >
        <div class="step-circle">
          <span v-if="pasoCompletado(idx)">✅</span>
          <span v-else>{{ idx + 1 }}</span>
        </div>
        <span class="step-label">{{ paso.label }}</span>
      </div>
    </div>
    <div class="progress-line">
      <div class="progress-fill" :style="{ width: porcentajeCompletado + '%' }"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  data() {
    return {
      pasos: [
        { label: 'Intro' },
        { label: 'Contenidos' },
        { label: 'Actividad' },
        { label: 'Evaluación' }
      ]
    }
  },
  props: {
    pasoActual: { type: Number, default: 1 }
  },
  computed: {
    porcentajeCompletado() {
      return ((this.pasoActual - 1) / (this.pasos.length - 1)) * 100
    }
  },
  methods: {
    pasoCompletado(idx) {
      return idx + 1 < this.pasoActual
    }
  }
}
</script>

<style scoped>
.progress-bar-container {
  padding: 20px 0;
}
.progress-steps {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}
.progress-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  flex: 1;
}
.step-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.9rem;
  border: 3px solid #30363d;
  background: #21262d;
  color: #8b949e;
  transition: all 0.4s ease;
}
.progress-step.completado .step-circle {
  background: var(--color-primario, #2e7d32);
  border-color: var(--color-primario, #2e7d32);
  color: #ffffff;
}
.progress-step.actual .step-circle {
  border-color: var(--color-accento, #ff6f00);
  color: var(--color-accento, #ff6f00);
  animation: pulse-circle 1.5s ease-in-out infinite;
}
.progress-step.pendiente .step-circle {
  background: rgba(46, 125, 50, 0.2);
  border-color: var(--color-primario, #2e7d32);
  color: var(--color-primario, #2e7d32);
}
.step-label {
  font-size: 0.7rem;
  color: #8b949e;
  text-align: center;
}
.progress-line {
  height: 4px;
  background: #21262d;
  border-radius: 2px;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-primario, #2e7d32), var(--color-accento, #ff6f00));
  border-radius: 2px;
  transition: width 0.6s ease;
}
@keyframes pulse-circle {
  0%, 100% { box-shadow: 0 0 0 0 rgba(255, 111, 0, 0.4); }
  50% { box-shadow: 0 0 0 8px rgba(255, 111, 0, 0); }
}
</style>