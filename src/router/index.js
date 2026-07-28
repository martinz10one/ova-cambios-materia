import { createRouter, createWebHistory } from 'vue-router'
import Paso1View from '../views/Paso1View.vue'
import Paso2View from '../views/Paso2View.vue'

const routes = [
  { path: '/', component: Paso1View },
  { path: '/paso2', component: Paso2View }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
