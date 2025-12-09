<template>
  <div id="app">
    <Navbar :nav-items="navItems" @nav-click="handleNavigation">
      <template #cta>
        <Button variant="primary" size="sm" @click="handleLogin">
          Iniciar sesión
        </Button>
      </template>
    </Navbar>

    <main>
      <Home />
    </main>

    <footer class="footer">
      <div class="container">
        <p class="footer-text">
          © 2025 MiApp. Hecho con ❤️ usando Vue.js
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Navbar from './components/layout/Navbar.vue'
import Button from './components/ui/Button.vue'
import HeroSection from './components/sections/HeroSection.vue'
import Home from './views/Home.vue'

const navItems = ref([
  { label: 'Inicio', href: '/', active: true },
  { label: 'Productos', href: '/productos', active: false },
  { label: 'Servicios', href: '/servicios', active: false },
  { label: 'Contacto', href: '/contacto', active: false }
])

const handleNavigation = (item) => {
  console.log('Navegando a:', item.label)
  
  // Actualizar item activo
  navItems.value.forEach(navItem => {
    navItem.active = navItem.label === item.label
  })
  
  // Aquí podrías usar Vue Router en el futuro
  alert(`Navegando a: ${item.label}`)
}

const handleLogin = () => {
  console.log('Login clicked')
  alert('Login en construcción...')
}
</script>

<style>
/* Estilos del footer */
.footer {
  background-color: var(--bg-dark);
  color: var(--text-white);
  padding: var(--space-2xl) 0;
  margin-top: auto;
}

.footer-text {
  text-align: center;
  font-size: var(--font-size-sm);
  opacity: 0.8;
}
</style>