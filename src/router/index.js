import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Servicios from '../views/Servicios.vue'
import Nosotros from '../views/Nosotros.vue'
import Busquedas from '../views/Busquedas.vue'
import Contacto from '../views/Contacto.vue'
import JobBoardPage from '../views/Jobboardpage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: 'AGHR | Mentoring & HR Consulting'
    }
  },
  {
    path: '/servicios',
    name: 'servicios',
    component: Servicios,
    meta: {
      title: 'Nuestros Servicios | AGHR'
    }
  },
  {
    path: '/nosotros',
    name: 'nosotros',
    component: Nosotros,
    meta: {
      title: 'Sobre Nosotros | AGHR'
    }
  },
  {
    path: '/busquedas',
    name: 'busquedas',
    component: Busquedas,
    meta: {
      title: 'Búsquedas Activas | AGHR'
    }
  },
  {
    path: '/contacto',
    name: 'contacto',
    component: Contacto,
    meta: {
      title: 'Contacto | AGHR'
    }
  },
  {
    path: '/trabajos',
    name: 'trabajos',
    component: JobBoardPage,
    meta: {
      title: 'Propuestas Laborales | AGHR'
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Si hay una posición guardada (navegación atrás/adelante), usarla
    if (savedPosition) {
      return savedPosition
    }
    // Si hay un hash (#section), hacer scroll a esa sección
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }
    // Por defecto, scroll al inicio
    return { top: 0, behavior: 'smooth' }
  }
})

// Actualizar título de la página
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'AGHR'
  next()
})

export default router