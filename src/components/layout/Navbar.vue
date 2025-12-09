<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar-content">
        <!-- Logo + Brand Name -->
        <div class="navbar-brand">
          <a href="/" class="brand-link">
            <img 
              src="../../assets/images/logo/aghr_logo.png" 
              alt="AGHR Logo" 
              class="logo-image"
            >
            <span class="brand-text">AGHR | mentoring & HR</span>
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
            <button class="cta-button" @click="$emit('cta-click')">
              Agendar entrevista
            </button>
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
      <transition name="slide">
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
            <button class="cta-button" @click="handleMobileCTA">
              Agendar entrevista
            </button>
          </div>
        </div>
      </transition>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  navItems: {
    type: Array,
    default: () => [
      { label: 'Inicio', href: '#home', active: true },
      { label: 'Servicios', href: '#services', active: false },
      { label: 'Nosotros', href: '#about', active: false },
      { label: 'Testimonios', href: '#testimonials', active: false },
      { label: 'Contacto', href: '#contact', active: false }
    ]
  }
})

const emit = defineEmits(['nav-click', 'cta-click'])

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const handleNavClick = (item) => {
  emit('nav-click', item)
  
  // Smooth scroll a la sección
  if (item.href.startsWith('#')) {
    const element = document.querySelector(item.href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }
}

const handleMobileNavClick = (item) => {
  isMobileMenuOpen.value = false
  handleNavClick(item)
}

const handleMobileCTA = () => {
  isMobileMenuOpen.value = false
  emit('cta-click')
}
</script>

<style scoped>
/* Navbar */
.navbar {
  width: 100%;
  height: 80px;
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 100%;
}

.navbar-content {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

/* Brand (Logo + Text) */
.navbar-brand {
  flex-shrink: 0;
}

.brand-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  transition: opacity 0.3s ease;
}

.brand-link:hover {
  opacity: 0.8;
}

.logo-image {
  height: 50px;
  width: auto;
}

.brand-text {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  letter-spacing: -0.025em;
  white-space: nowrap;
}

/* Navigation */
.navbar-nav {
  display: flex;
  align-items: center;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
  flex: 1;
  justify-content: center;
}

.nav-link {
  font-size: 1rem;
  font-weight: 500;
  color: #6b7280;
  text-decoration: none;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  transition: all 0.3s ease;
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 2px;
  background: #667eea;
  transition: width 0.3s ease;
}

.nav-link:hover {
  color: #667eea;
}

.nav-link:hover::after {
  width: 80%;
}

.nav-link--active {
  color: #667eea;
  font-weight: 600;
}

.nav-link--active::after {
  width: 80%;
}

/* CTA Button */
.navbar-cta {
  flex-shrink: 0;
}

.cta-button {
  padding: 0.625rem 1.5rem;
  font-size: 0.9375rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  white-space: nowrap;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
}

.cta-button:active {
  transform: translateY(0);
}

/* Mobile Toggle */
.navbar-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 1.5rem;
  height: 1.25rem;
  padding: 0;
  background: transparent;
  border: none;
  cursor: pointer;
}

.toggle-bar {
  width: 100%;
  height: 2px;
  background-color: #111827;
  transition: all 0.3s ease;
  border-radius: 2px;
}

/* Mobile Menu */
.navbar-mobile {
  display: flex;
  flex-direction: column;
  padding: 1.5rem 0;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  background: white;
}

.mobile-nav-link {
  padding: 0.875rem 1rem;
  font-size: 1rem;
  font-weight: 500;
  color: #6b7280;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.mobile-nav-link:hover {
  background-color: #f3f4f6;
  color: #667eea;
}

.mobile-nav-link--active {
  color: #667eea;
  font-weight: 600;
  background-color: #f0f2ff;
}

.mobile-cta {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
}

.mobile-cta .cta-button {
  width: 100%;
  padding: 1rem;
}

/* Slide Transition */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Responsive */
@media (max-width: 968px) {
  .navbar-nav {
    display: none;
  }
  
  .navbar-cta {
    display: none;
  }
  
  .navbar-toggle {
    display: flex;
  }
}

@media (max-width: 640px) {
  .navbar {
    height: 70px;
  }

  .logo-image {
    height: 40px;
  }

  .brand-text {
    font-size: 1rem;
  }

  .navbar-content {
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .brand-text {
    font-size: 0.875rem;
  }

  .logo-image {
    height: 35px;
  }
}
</style>