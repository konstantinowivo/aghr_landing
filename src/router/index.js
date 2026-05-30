import { createRouter, createWebHistory } from 'vue-router'
import { authService } from '@/services/authService'

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
    meta: { title: 'Política de Privacidad | AGHR' }
  },
  {
    path: '/admin/login',
    name: 'admin-login',
    component: () => import('../views/admin/AdminLogin.vue'),
    meta: { title: 'Admin | AGHR' }
  },
  {
    path: '/admin',
    component: () => import('../components/admin/AdminLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '', redirect: '/admin/dashboard' },
      { path: 'dashboard', name: 'admin-dashboard', component: () => import('../views/admin/AdminDashboard.vue'), meta: { title: 'Dashboard | Admin AGHR' } },
      { path: 'testimonials', name: 'admin-testimonials', component: () => import('../views/admin/AdminTestimonials.vue'), meta: { title: 'Testimonios | Admin AGHR' } },
      { path: 'team', name: 'admin-team', component: () => import('../views/admin/AdminTeam.vue'), meta: { title: 'Equipo | Admin AGHR' } },
      { path: 'services', name: 'admin-services', component: () => import('../views/admin/AdminServices.vue'), meta: { title: 'Servicios | Admin AGHR' } },
      { path: 'jobs', name: 'admin-jobs', component: () => import('../views/admin/AdminJobs.vue'), meta: { title: 'Empleos | Admin AGHR' } },
      { path: 'clients', name: 'admin-clients', component: () => import('../views/admin/AdminClients.vue'), meta: { title: 'Clientes | Admin AGHR' } },
      { path: 'content', name: 'admin-content', component: () => import('../views/admin/AdminContent.vue'), meta: { title: 'Contenido | Admin AGHR' } },
    ]
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

router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title || 'AGHR'

  try {
    if (to.meta.requiresAuth) {
      const isAdmin = await authService.isAdmin()
      if (!isAdmin) return next('/admin/login')
    }

    if (to.path === '/admin/login') {
      const isAdmin = await authService.isAdmin()
      if (isAdmin) return next('/admin/dashboard')
    }
  } catch (err) {
    console.error('Router guard error:', err)
    if (to.meta.requiresAuth) return next('/admin/login')
  }

  next()
})

export default router