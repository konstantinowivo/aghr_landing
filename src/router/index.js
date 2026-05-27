import { createRouter, createWebHistory } from 'vue-router'

// Lazy loading de rutas con dynamic imports para code splitting
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
    meta: {
      title: 'AGHR | Mentoring & HR Consulting'
    }
  },
  {
    path: '/servicios',
    name: 'servicios',
    component: () => import('../views/Servicios.vue'),
    meta: {
      title: 'Nuestros Servicios | AGHR'
    }
  },
  {
    path: '/nosotros',
    name: 'nosotros',
    component: () => import('../views/Nosotros.vue'),
    meta: {
      title: 'Sobre Nosotros | AGHR'
    }
  },
  {
    path: '/busquedas',
    name: 'busquedas',
    component: () => import('../views/Busquedas.vue'),
    meta: {
      title: 'Búsquedas Activas | AGHR'
    }
  },
  {
    path: '/contacto',
    name: 'contacto',
    component: () => import('../views/Contacto.vue'),
    meta: {
      title: 'Contacto | AGHR'
    }
  },
  {
    path: '/trabajos',
    name: 'trabajos',
    component: () => import('../views/Jobboardpage.vue'),
    meta: {
      title: 'Propuestas Laborales | AGHR'
    }
  },
  {
    path: '/politica-de-privacidad',
    name: 'politica-de-privacidad',
    component: () => import('../views/PoliticaDePrivacidad.vue'),
    meta: {
      title: 'Política de Privacidad | AGHR'
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