import { createApp } from 'vue'
import './assets/styles/global.css'
import App from './App.vue'
import router from './router'
import { inject } from '@vercel/analytics'
import { injectSpeedInsights } from '@vercel/speed-insights'

const app = createApp(App)

app.use(router)
app.mount('#app')

// Inicializar Vercel Analytics
inject()

// Inicializar Vercel Speed Insights
injectSpeedInsights()

// Registrar Service Worker
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/aghr_landing/sw.js', { scope: '/aghr_landing/' })
      .catch(() => {
        // Service worker registration failed silently
      })
  })
}