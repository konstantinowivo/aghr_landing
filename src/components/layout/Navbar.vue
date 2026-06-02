<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar-content">
        <!-- Logo + Brand Name -->
        <div class="navbar-brand">
          <router-link to="/" class="brand-link">
            <img
              src="/src/assets/images/logo/aghr_logo.svg"
              alt="AGHR Logo"
              width="80"
              height="50"
              class="logo-image"
            >
            <span class="brand-text">AGHR | mentoring & HR</span>
          </router-link>
        </div>

        <!-- Navigation Links -->
        <ul class="navbar-nav">
          <li v-for="(item, index) in navItems" :key="index">
            <!-- Si es link externo (jobs), usar router-link -->
            <router-link
              v-if="item.isRoute"
              :to="item.route"
              :class="['nav-link', { 'nav-link--active': isActiveRoute(item.route) }]"
            >
              {{ item.label }}
            </router-link>
            
            <!-- Si es scroll interno, usar link normal -->
            <a
              v-else
              :href="'#' + item.section"
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

        <!-- Admin Login -->
        <router-link to="/admin/login" class="login-btn login-btn--desktop">
          Iniciar sesión
        </router-link>

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
              <template v-for="(item, index) in navItems" :key="index">
                <router-link
                  v-if="item.isRoute"
                  :to="item.route"
                  :class="['mobile-nav-link', { 'mobile-nav-link--active': isActiveRoute(item.route) }]"
                  @click="closeMobileMenu"
                >
                  {{ item.label }}
                </router-link>
                
                <a
                  v-else
                  :href="'#' + item.section"
                  @click.prevent="handleMobileNavClick(item)"
                  :class="['mobile-nav-link', { 'mobile-nav-link--active': activeSection === item.section }]"
                >
                  {{ item.label }}
                </a>
              </template>
            </div>

            <!-- Divider -->
            <div class="mobile-divider"></div>

            <!-- Admin Login Mobile -->
            <div class="mobile-login">
              <router-link to="/admin/login" class="login-btn login-btn--mobile" @click="closeMobileMenu">
                Iniciar sesión
              </router-link>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const props = defineProps({
  heroRef: Object,
  servicesRef: Object,
  aboutRef: Object,
  jobsRef: Object,
  contactRef: Object,
  navItems: {
    type: Array,
    default: () => [
      { label: 'Inicio', route: '/', isRoute: true },
      { label: 'Servicios', route: '/servicios', isRoute: true },
      { label: 'Nosotros', route: '/nosotros', isRoute: true },
      { label: 'Búsquedas', route: '/busquedas', isRoute: true },
      { label: 'Contacto', route: '/contacto', isRoute: true }
    ]
  }
})

const emit = defineEmits(['nav-click', 'cta-click'])

const isMobileMenuOpen = ref(false)
const activeSection = ref('hero')

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const isActiveRoute = (routePath) => {
  return route.path === routePath
}

const scrollToSection = (section) => {
  const refMap = {
    hero: props.heroRef,
    services: props.servicesRef,
    about: props.aboutRef,
    jobs: props.jobsRef,
    contact: props.contactRef
  }

  const targetRef = refMap[section]
  if (targetRef?.value) {
    targetRef.value.scrollIntoView({ behavior: 'smooth' })
    activeSection.value = section
  }
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
/* ============================================
   Modern Corporate Navbar
   ============================================ */

.navbar {
  width: 100%;
  height: 80px;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #E5E7EB;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-base);
}

.container {
  max-width: 1280px;
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
  font-family: var(--font-family-heading);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text-primary);
  letter-spacing: -0.02em;
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
  font-family: var(--font-family-primary);
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  text-decoration: none;
  padding: 0.625rem 1rem;
  border-radius: 0.5rem;
  transition: all var(--transition-base);
  position: relative;
  cursor: pointer;
  display: block;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 2px;
  background: var(--color-primary);
  border-radius: 2px;
  transition: width var(--transition-base);
}

.nav-link:hover {
  color: var(--color-primary);
  background: rgba(79, 70, 229, 0.05);
}

.nav-link:hover::after {
  width: 70%;
}

.nav-link--active {
  color: var(--color-primary);
  font-weight: 600;
  background: rgba(79, 70, 229, 0.08);
}

.nav-link--active::after {
  width: 70%;
}

/* Router link active */
.router-link-active.nav-link {
  color: var(--color-primary);
  font-weight: 600;
  background: rgba(79, 70, 229, 0.08);
}

.router-link-active.nav-link::after {
  width: 70%;
}

/* Login Button */
.login-btn {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1.25rem;
  font-family: var(--font-family-primary);
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
  border-radius: 0.75rem;
  text-decoration: none;
  flex-shrink: 0;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.login-btn:hover {
  background: var(--color-primary);
  color: white;
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
  font-family: var(--font-family-primary);
  padding: 0.75rem 1.75rem;
  font-size: 0.9375rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all var(--transition-base);
  box-shadow: var(--shadow-md);
  white-space: nowrap;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.cta-button:active {
  transform: translateY(0);
  box-shadow: var(--shadow-sm);
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
  background-color: var(--color-text-primary);
  transition: all var(--transition-base);
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
  font-family: var(--font-family-primary);
  padding: 1rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  text-decoration: none;
  border-left: 3px solid transparent;
  transition: all var(--transition-base);
  cursor: pointer;
  display: block;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.mobile-nav-link:hover {
  color: var(--color-primary);
  background-color: rgba(79, 70, 229, 0.05);
}

.mobile-nav-link--active {
  color: var(--color-primary);
  font-weight: 600;
  background-color: rgba(79, 70, 229, 0.08);
  border-left-color: var(--color-primary);
}

.router-link-active.mobile-nav-link {
  color: var(--color-primary);
  font-weight: 600;
  background-color: rgba(79, 70, 229, 0.08);
  border-left-color: var(--color-primary);
}

.mobile-divider {
  height: 1px;
  background: rgba(0, 0, 0, 0.08);
  margin: 0.5rem 0;
}

.mobile-cta {
  padding: 1rem 1.5rem 0;
}

.mobile-login {
  padding: 1rem 1.5rem 0.5rem;
}

.login-btn--mobile {
  width: 100%;
  justify-content: center;
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

  .login-btn--desktop {
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