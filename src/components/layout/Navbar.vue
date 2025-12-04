<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar-content">
        <!-- Logo -->
        <div class="navbar-logo">
          <a href="/" class="logo-link">
            <img 
              v-if="logo" 
              :src="logo" 
              alt="Logo" 
              class="logo-image"
            >
            <span v-else class="logo-text">MiApp</span>
          </a>
        </div>

        <!-- Navigation Links -->
        <ul class="navbar-nav">
          <li v-for="(item, index) in navItems" :key="index">
            <a 
              :href="item.href"
              :class="['nav-link', { 'nav-link--active': item.active }]"
              @click.prevent="handleNavClick(item)"
            >
              {{ item.label }}
            </a>
          </li>
        </ul>

        <!-- CTA Button -->
        <div class="navbar-cta">
          <slot name="cta">
            <Button variant="primary" size="sm">
              Comenzar
            </Button>
          </slot>
        </div>

        <!-- Mobile Toggle -->
        <button 
          class="navbar-toggle"
          @click="toggleMobileMenu"
          aria-label="Toggle menu"
        >
          <span class="toggle-bar"></span>
          <span class="toggle-bar"></span>
          <span class="toggle-bar"></span>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div v-if="isMobileMenuOpen" class="navbar-mobile">
        <a 
          v-for="(item, index) in navItems" 
          :key="index"
          :href="item.href"
          :class="['mobile-nav-link', { 'mobile-nav-link--active': item.active }]"
          @click.prevent="handleMobileNavClick(item)"
        >
          {{ item.label }}
        </a>
        <div class="mobile-cta">
          <slot name="mobile-cta">
            <Button variant="primary" size="md">
              Comenzar
            </Button>
          </slot>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import Button from '../ui/Button.vue'

const props = defineProps({
  logo: {
    type: String,
    default: ''
  },
  navItems: {
    type: Array,
    default: () => [
      { label: 'Inicio', href: '/', active: true },
      { label: 'Productos', href: '/productos', active: false },
      { label: 'Servicios', href: '/servicios', active: false },
      { label: 'Contacto', href: '/contacto', active: false }
    ]
  }
})

const emit = defineEmits(['nav-click'])

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const handleNavClick = (item) => {
  emit('nav-click', item)
}

const handleMobileNavClick = (item) => {
  isMobileMenuOpen.value = false
  emit('nav-click', item)
}
</script>

<style scoped>
.navbar {
  width: 100%;
  height: var(--navbar-height);
  background-color: var(--bg-primary);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: var(--z-navbar);
  box-shadow: var(--shadow-sm);
}

.navbar-content {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-xl);
}

/* Logo */
.navbar-logo {
  flex-shrink: 0;
}

.logo-link {
  display: flex;
  align-items: center;
}

.logo-image {
  height: 2.5rem;
  width: auto;
}

.logo-text {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
}

/* Navigation */
.navbar-nav {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
  flex: 1;
  justify-content: center;
  margin-top: var(--space-md); /* Margen superior agregado */
}

.nav-link {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: var(--text-secondary);
  padding: var(--space-lg) var(--space-md) var(--space-sm) var(--space-md); /* Padding superior aumentado */
  border-radius: var(--radius-md);
  transition: all var(--transition-base);
}

.nav-link:hover {
  color: var(--primary-color);
  background-color: var(--primary-light);
}

.nav-link--active {
  color: var(--primary-color);
  font-weight: var(--font-weight-semibold);
}

/* CTA */
.navbar-cta {
  flex-shrink: 0;
  margin-top: var(--space-sm); /* Margen superior agregado */
}

/* Mobile Toggle */
.navbar-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 1.5rem;
  height: 1.25rem;
  padding: 0;
}

.toggle-bar {
  width: 100%;
  height: 2px;
  background-color: var(--text-primary);
  transition: all var(--transition-base);
  border-radius: var(--radius-sm);
}

/* Mobile Menu */
.navbar-mobile {
  display: none;
  flex-direction: column;
  padding: var(--space-lg) 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.mobile-nav-link {
  padding: var(--space-md);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: var(--text-secondary);
  border-radius: var(--radius-md);
  transition: all var(--transition-base);
}

.mobile-nav-link:hover {
  background-color: var(--bg-secondary);
  color: var(--primary-color);
}

.mobile-nav-link--active {
  color: var(--primary-color);
  font-weight: var(--font-weight-semibold);
  background-color: var(--primary-light);
}

.mobile-cta {
  margin-top: var(--space-lg);
  padding-top: var(--space-lg);
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

/* Responsive */
@media (max-width: 768px) {
  .navbar-nav,
  .navbar-cta {
    display: none;
  }
  
  .navbar-toggle {
    display: flex;
  }
  
  .navbar-mobile {
    display: flex;
  }
}
</style>