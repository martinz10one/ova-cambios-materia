# OVA Física - Cambios de la Materia

Este proyecto es un Objeto Virtual de Aprendizaje (OVA) interactivo sobre los cambios de estado de la materia, diseñado para el programa de Análisis y Desarrollo de Software.

## Estado actual: Paso 1 - Introducción y Objetivos

Paso 1 del OVA presentado. Los pasos 2 a 4 se irán agregando en commits posteriores.

## Tema

Cambios de la materia (estados y transformaciones)

## Características incluidas

### 🎨 Particle Background
Fondo animado con partículas que reaccionan al movimiento del mouse.

### 📊 Progress Bar
Barra de progreso visual que indica la sección actual del OVA.

### ✨ Animaciones de entrada
- Pasos de introducción con animación secuencial (slide + fade)
- Tarjetas de objetivos con animación de aparición progresiva
- Items de importancia con stagger delay

## Tecnologías



- Vue 3
- Vue Router 4
- Vite
- Canvas 2D (partículas)
- CSS3 (variables, flexbox, grid, responsive)

## Requisitos

- Node.js (v18+)
- npm (v9+)

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

Abrir `http://localhost:5173`.

## Construcción para producción

```bash
npm run build
npm run preview
```

## Estructura de carpetas

```
src/
├── components/
│   ├── ParticleBackground.vue      - Canvas particle animation
│   └── ProgressBar.vue             - Step navigation progress bar
├── views/
│   └── Paso1View.vue               - Introducción y Objetivos
├── router/
│   └── index.js                     - Vue Router configuration
├── styles/
│   └── variables.css                - Global CSS with variables
├── App.vue                          - Root layout
└── main.js                          - Entry point
```

## Repositorio

Proyecto público en GitHub. Nombre sugerido: `ova-cambios-materia`

## Autor

OVA Física - Programa de Análisis y Desarrollo de Software
