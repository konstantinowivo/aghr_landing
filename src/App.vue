<template>
  <div id="app">
    <!-- Navbar con todas las props y slots -->
    <Navbar 
      :heroRef="heroRef"
      :servicesRef="servicesRef"
      :aboutRef="aboutRef"
      :jobsRef="jobsRef"
      :contactRef="contactRef"
      @cta-click="handleCtaClick"
    >
      <!-- Slot para botones de redes sociales -->
      <template #social>
        <div class="social-buttons">
          <a 
            href="https://www.instagram.com/aghr_metoring_rh/" 
            target="_blank"
            rel="noopener noreferrer"
            class="social-button instagram"
            aria-label="Instagram"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" class="social-icon">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>

          <a 
            href="https://www.linkedin.com/company/aghrconsulting/?viewAsMember=true" 
            target="_blank"
            rel="noopener noreferrer"
            class="social-button linkedin"
            aria-label="LinkedIn"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" class="social-icon">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          
        </div>
      </template>

      <!-- Slot para CTA -->
      <template #cta>
        <!-- El botón por defecto se usa -->
      </template>
    </Navbar>

    <main>
      <!-- Vue Router View: Aquí se renderiza Home o JobBoardPage -->
      <router-view @refs-ready="handlePageRefsReady" />
    </main>

    <footer class="footer">
      <div class="container">
        <p class="footer-text">
          © 2025 AGHR Mentoring & HR. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from './components/layout/Navbar.vue'

const router = useRouter()

// Refs para cada sección
const heroRef = ref(null)
const servicesRef = ref(null)
const aboutRef = ref(null)
const jobsRef = ref(null)
const contactRef = ref(null)

// Cuando el componente de la página está listo, obtener las refs de sus secciones
const handlePageRefsReady = (refs) => {
  heroRef.value = refs.hero
  servicesRef.value = refs.services
  aboutRef.value = refs.about
  jobsRef.value = refs.jobs
  contactRef.value = refs.contact
}

// Manejar clic en el botón CTA
const handleCtaClick = () => {
  // La navegación ya se maneja en Navbar.vue (scrollToSection('contact'))
}
</script>

<style>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: var(--font-family-primary);
}

main {
  flex: 1;
}

/* ============================================
   Social Buttons - Modern Corporate Style
   ============================================ */
.social-buttons {
  display: flex;
  align-items: center;
  gap: 0.625rem;
}

.social-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  transition: all var(--transition-base);
  text-decoration: none;
  background: white;
  color: var(--color-text-tertiary);
  border: 1.5px solid #E5E7EB;
  box-shadow: var(--shadow-xs);
}

.social-button:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: transparent;
}

.social-icon {
  width: 20px;
  height: 20px;
}

/* Instagram */
.social-button.instagram:hover {
  background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
  color: white;
}

/* LinkedIn */
.social-button.linkedin:hover {
  background: #0A66C2;
  color: white;
}

/* ============================================
   Footer - Modern Corporate Style
   ============================================ */
.footer {
  background: linear-gradient(180deg, #1F2937 0%, #111827 100%);
  color: white;
  padding: 3rem 0 2rem;
  margin-top: auto;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.footer-text {
  text-align: center;
  font-size: 0.9375rem;
  font-weight: 500;
  opacity: 0.85;
  color: #D1D5DB;
  letter-spacing: 0.01em;
}

/* ============================================
   Responsive Adjustments
   ============================================ */
@media (max-width: 968px) {
  .social-button {
    width: 38px;
    height: 38px;
  }

  .social-icon {
    width: 18px;
    height: 18px;
  }
}

@media (max-width: 640px) {
  .social-buttons {
    gap: 0.5rem;
  }

  .social-button {
    width: 36px;
    height: 36px;
  }

  .social-icon {
    width: 16px;
    height: 16px;
  }

  .footer {
    padding: 2.5rem 0 1.5rem;
  }

  .footer-text {
    font-size: 0.875rem;
  }
}
</style>