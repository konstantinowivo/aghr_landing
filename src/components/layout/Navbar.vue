<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar-content">
        <!-- Logo + Brand Name -->
        <div class="navbar-brand">
          <a @click="handleLogoClick" class="brand-link">
            <img 
              src="/src/assets/images/logo/aghr_logo.png" 
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
              @click.prevent="handleNavClick(item)"
              :class="['nav-link', { 'nav-link--active': activeSection === item.section }]"
            >
              {{ item.label }}
            </a>
          </li>
        </ul>

        <!-- Social Links (Siempre visible en mobile) -->
        <div class="navbar-social">
          <slot name="social"></slot>
        </div>

        <!-- CTA Button -->
        <div class="navbar-cta">
          <slot name="cta">
            <button class="cta-button" @click="handleDesktopCTA">
              Agendar entrevista
            </button>
          </slot>
        </div>

        <!-- Mobile Toggle - Minimalista -->
        <button 
          class="navbar-toggle"
          :class="{ 'navbar-toggle--active': isMobileMenuOpen }"
          @click="toggleMobileMenu"
          aria-label="Toggle menu"
        >
          <span class="toggle-bar toggle-bar--top"></span>
          <span class="toggle-bar toggle-bar--middle"></span>
          <span class="toggle-bar toggle-bar--bottom"></span>
        </button>
      </div>

      <!-- Mobile Menu - Minimalista y limpio -->
      <transition name="slideDown">
        <div v-if="isMobileMenuOpen" class="navbar-mobile">
          <div class="mobile-menu-wrapper">
            <!-- Navigation Links Mobile -->
            <div class="mobile-nav-container">
              <a 
                v-for="(item, index) in navItems" 
                :key="index"
                @click.prevent="handleMobileNavClick(item)"
                :class="['mobile-nav-link', { 'mobile-nav-link--active': activeSection === item.section }]"
              >
                {{ item.label }}
              </a>
            </div>

            <!-- Divider -->
            <div class="mobile-divider"></div>

            <!-- CTA Button Mobile -->
            <div class="mobile-cta">
              <button class="cta-button cta-button--mobile" @click="handleMobileCTA">
                Agendar entrevista
              </button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  heroRef: Object,
  servicesRef: Object,
  aboutRef: Object,
  testimonialsRef: Object,
  contactRef: Object,
  navItems: {
    type: Array,
    default: () => [
      { label: 'Inicio', section: 'hero' },
      { label: 'Servicios', section: 'services' },
      { label: 'Nosotros', section: 'about' },
      { label: 'Testimonios', section: 'testimonials' },
      { label: 'Contacto', section: 'contact' }
    ]
  }
})

const emit = defineEmits(['nav-click', 'cta-click'])

const isMobileMenuOpen = ref(false)
const activeSection = ref('hero')

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const scrollToSection = (section) => {
  const refMap = {
    hero: props.heroRef,
    services: props.servicesRef,
    about: props.aboutRef,
    testimonials: props.testimonialsRef,
    contact: props.contactRef
  }

  const targetRef = refMap[section]
  if (targetRef?.value) {
    targetRef.value.scrollIntoView({ behavior: 'smooth' })
    activeSection.value = section
  }
}

const handleLogoClick = () => {
  scrollToSection('hero')
  isMobileMenuOpen.value = false
}

const handleNavClick = (item) => {
  scrollToSection(item.section)
  emit('nav-click', item)
}

const handleMobileNavClick = (item) => {
  isMobileMenuOpen.value = false
  handleNavClick(item)
}

// ✅ CTA Desktop - hace scroll a contact
const handleDesktopCTA = () => {
  scrollToSection('contact')
  emit('cta-click')
}

// ✅ CTA Mobile - cierra menú y hace scroll a contact
const handleMobileCTA = () => {
  isMobileMenuOpen.value = false
  scrollToSection('contact')
  emit('cta-click')
}

// ✅ Cerrar menú al cambiar resolución
const handleWindowResize = () => {
  // Si el ancho supera el breakpoint (968px), cerrar el menú
  if (window.innerWidth > 968) {
    isMobileMenuOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('resize', handleWindowResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleWindowResize)
})
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
  cursor: pointer;
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
  cursor: pointer;
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

/* CTA Button - Solo visible en mobile */
.navbar-cta {
  flex-shrink: 0;
  display: none;
}

/* Social Links - Visible en desktop y mobile */
.navbar-social {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
}

@media (max-width: 968px) {
  .navbar-social {
    gap: 0.5rem;
  }
  
  .navbar-cta {
    display: flex;
  }
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

/* Mobile Toggle - Minimalista */
.navbar-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 18px;
  padding: 0;
  background: transparent;
  border: none;
  cursor: pointer;
}

.toggle-bar {
  width: 100%;
  height: 2px;
  background-color: #111827;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 2px;
  transform-origin: center;
}

/* Animación del toggle cuando está activo */
.navbar-toggle--active .toggle-bar--top {
  transform: translateY(8px) rotate(45deg);
}

.navbar-toggle--active .toggle-bar--middle {
  opacity: 0;
  transform: translateX(-10px);
}

.navbar-toggle--active .toggle-bar--bottom {
  transform: translateY(-8px) rotate(-45deg);
}

/* Mobile Menu - Minimalista */
.navbar-mobile {
  display: flex;
  flex-direction: column;
  padding: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  background: white;
  max-height: calc(100vh - 80px);
  overflow-y: auto;
}

.mobile-menu-wrapper {
  padding: 1.5rem 0;
  display: flex;
  flex-direction: column;
}

.mobile-nav-container {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.mobile-nav-link {
  padding: 1rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: #6b7280;
  text-decoration: none;
  border-left: 3px solid transparent;
  transition: all 0.3s ease;
  cursor: pointer;
  display: block;
}

.mobile-nav-link:hover {
  color: #667eea;
  background-color: rgba(102, 126, 234, 0.05);
}

.mobile-nav-link--active {
  color: #667eea;
  font-weight: 600;
  background-color: rgba(102, 126, 234, 0.08);
  border-left-color: #667eea;
}

.mobile-divider {
  height: 1px;
  background: rgba(0, 0, 0, 0.08);
  margin: 0.5rem 0;
}

.mobile-cta {
  padding: 1rem 1.5rem 0;
}

.cta-button--mobile {
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
}

/* Slide Down Transition */
.slideDown-enter-active,
.slideDown-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slideDown-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.slideDown-leave-to {
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

  .toggle-bar {
    height: 2.5px;
  }

  .mobile-nav-link {
    padding: 0.875rem 1.5rem;
    font-size: 0.95rem;
  }

  .mobile-cta {
    padding: 1rem 1.5rem 0;
  }
}

@media (max-width: 480px) {
  .brand-text {
    font-size: 0.875rem;
  }

  .logo-image {
    height: 35px;
  }

  .navbar-toggle {
    width: 22px;
    height: 16px;
  }

  .navbar-toggle--active .toggle-bar--top {
    transform: translateY(7px) rotate(45deg);
  }

  .navbar-toggle--active .toggle-bar--bottom {
    transform: translateY(-7px) rotate(-45deg);
  }

  .mobile-menu-wrapper {
    padding: 1rem 0;
  }

  .mobile-nav-link {
    padding: 0.75rem 1.5rem;
    font-size: 0.9rem;
  }

  .mobile-cta {
    padding: 0.75rem 1.5rem 0;
  }

  .cta-button--mobile {
    padding: 0.875rem;
    font-size: 0.95rem;
  }
}
</style>