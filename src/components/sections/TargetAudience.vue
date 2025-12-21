<template>
  <div>
    <!-- Hero Section with Animation -->
    <section class="hero-servicios">
      <HeroServiciosAnimation />
      <div class="hero-container">
        <h1 class="hero-title">Servicios</h1>
        <p class="hero-subtitle">Soluciones integrales para empresas y profesionales</p>
      </div>
    </section>

    <!-- Main Content Section -->
    <section class="work-with">
      <div class="container">
        <!-- Header -->
        <div class="section-header">
          <h2 class="section-title">¿Con quiénes trabajamos?</h2>
          <p class="section-subtitle">
            Acompañamos a empresas y personas a potenciar su talento.
          </p>
        </div>

      <!-- Tabs Container -->
      <div class="tabs-container">
        <!-- Tab Headers -->
        <div class="tab-headers">
          <button 
            class="tab-button"
            :class="{ active: activeTab === 'empresas' }"
            @click="activeTab = 'empresas'"
          >
            <span class="tab-icon">🏢</span>
            <span class="tab-text">Empresas</span>
          </button>
          <button 
            class="tab-button"
            :class="{ active: activeTab === 'personas' }"
            @click="activeTab = 'personas'"
          >
            <span class="tab-icon">👤</span>
            <span class="tab-text">Personas</span>
          </button>
        </div>

        <!-- Tab Content -->
        <div class="tab-content-wrapper">
          <!-- EMPRESAS Content -->
          <transition name="fade">
            <div v-if="activeTab === 'empresas'" class="tab-content">
              <div class="content-header">
                <h3 class="content-title">Soluciones para Empresas</h3>
                <p class="content-description">
                  Optimizamos la gestión del talento con estrategias a medida que impulsan el crecimiento de tu organización
                </p>
              </div>

              <div class="services-grid">
                <div 
                  v-for="(service, index) in empresasServices" 
                  :key="index"
                  class="service-card"
                >
                  <div class="service-icon">{{ service.icon }}</div>
                  <div class="service-content">
                    <h4 class="service-title">{{ service.title }}</h4>
                    <p class="service-description">{{ service.description }}</p>
                  </div>
                </div>
              </div>

              <div class="cta-section">
                <h4 class="cta-title">¿Listo para transformar tu organización?</h4>
                <button class="cta-button" @click="handleEmpresas">
                  Agendar consulta gratuita
                </button>
              </div>
            </div>
          </transition>

          <!-- PERSONAS Content -->
          <transition name="fade">
            <div v-if="activeTab === 'personas'" class="tab-content">
              <div class="content-header">
                <h3 class="content-title">Desarrollo para Profesionales</h3>
                <p class="content-description">
                  Impulsamos tu crecimiento profesional con herramientas y estrategias que te llevan al siguiente nivel
                </p>
              </div>

              <div class="services-grid">
                <div 
                  v-for="(service, index) in personasServices" 
                  :key="index"
                  class="service-card"
                >
                  <div class="service-icon">{{ service.icon }}</div>
                  <div class="service-content">
                    <h4 class="service-title">{{ service.title }}</h4>
                    <p class="service-description">{{ service.description }}</p>
                  </div>
                </div>
              </div>

              <div class="cta-section">
                <h4 class="cta-title">¿Listo para impulsar tu carrera?</h4>
                <button class="cta-button" @click="handlePersonas">
                  Comenzar ahora
                </button>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import HeroServiciosAnimation from '@/components/HeroAnimations/HeroServiciosAnimation.vue'

// Estado del tab activo
const activeTab = ref('empresas')

// Props para configurar el comportamiento de los botones
const props = defineProps({
  // Acción del CTA: 'scroll' para desplazarse a una sección, 'url' para abrir un enlace
  ctaAction: {
    type: String,
    default: 'scroll',
    validator: (value) => ['scroll', 'url'].includes(value)
  },
  // Selector del elemento al que hacer scroll (por defecto, sección de contacto)
  ctaScroll: {
    type: String,
    default: '#contact'
  },
  // URL a abrir si ctaAction es 'url'
  ctaUrl: {
    type: String,
    default: ''
  }
})

// Emit events para tracking/analytics (opcional)
const emit = defineEmits(['empresas-click', 'personas-click'])

// Servicios para Empresas
const empresasServices = [
  {
    icon: '📊',
    title: 'Selección y Reclutamiento',
    description: 'Identificamos y atraemos al mejor talento, garantizando las habilidades técnicas y blandas para ocupar la vacante.'
  },
  {
    icon: '📈',
    title: 'Evaluación de Desempeño',
    description: 'Implementamos evaluaciones psicotécnicas, de competencia y potencial, dentro de los procesos de selección y plan de carrera de los colaboradores de tu empresa.'
  },
  {
    icon: '🎓',
    title: 'Experiencia de aprendizaje',
    description: 'Diseñamos e implementamos programas de capacitación y espacios de formación para desarrollar las habilidades blandas y competencias técnicas para el éxito de tu equipo.'
  },
  {
    icon: '👥',
    title: 'Cultura Organizacional',
    description: 'Desarrollamos ambientes de trabajo que potencian el compromiso y la productividad.'
  },
  {
    icon: '⚖️',
    title: 'Consultoría en RRHH',
    description: 'Asesoramiento estratégico en todas las áreas de recursos humanos.'
  },
  {
    icon: '🎯',
    title: 'Desarrollo de Liderazgo',
    description: 'Formamos líderes que inspiran y transforman equipos de alto rendimiento.'
  }
]

// Servicios para Personas
const personasServices = [
  {
    icon: '🎯',
    title: 'Mentorías Personalizadas',
    description: 'Acompañamiento 1:1 con expertos que te guían para impulsar tu camino profesional.'
  },
  {
    icon: '💼',
    title: 'Coaching Ejecutivo',
    description: 'Desarrollo de habilidades de liderazgo y gestión para potenciar tu carrera.'
  },
  {
    icon: '🗺️',
    title: 'Plan de Carrera Estratégico',
    description: 'Diseñamos juntos tu roadmap profesional con objetivos claros y alcanzables.'
  },
  {
    icon: '💬',
    title: 'Preparación para Entrevistas',
    description: 'Te preparamos para destacar en tus próximos desafíos profesionales, en castellano e inglés.'
  },
  {
    icon: '🤝',
    title: 'Networking Profesional',
    description: 'Construí conexiones valiosas que aceleran tu desarrollo.'
  },
  {
    icon: '📝',
    title: 'Optimización de CV y LinkedIn',
    description: 'Potenciamos tu marca personal para atraer las mejores oportunidades.'
  }
]

// Manejador de acciones para empresas
const handleEmpresas = () => {
  emit('empresas-click')
  handleCtaAction()
}

// Manejador de acciones para personas
const handlePersonas = () => {
  emit('personas-click')
  handleCtaAction()
}

// Lógica centralizada para manejar acciones CTA
const handleCtaAction = () => {
  if (props.ctaAction === 'scroll') {
    setTimeout(() => {
      const element = document.querySelector(props.ctaScroll)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else {
        console.warn(`Elemento no encontrado: ${props.ctaScroll}`)
      }
    }, 100)
  } 
  else if (props.ctaAction === 'url' && props.ctaUrl) {
    window.open(props.ctaUrl, '_blank')
  }
}
</script>

<style scoped>
/* ============================================
   Modern Corporate Target Audience Section
   ============================================ */

.work-with {
  padding: 6rem 0;
  background: linear-gradient(180deg, #FAFBFC 0%, #FFFFFF 50%, #F9FAFB 100%);
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Section Header */
.section-header {
  text-align: center;
  margin-bottom: 4rem;
  animation: fadeInUp 0.8s ease-out;
}

.section-title {
  font-family: var(--font-family-heading);
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 800;
  color: var(--color-text-primary);
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.section-subtitle {
  font-family: var(--font-family-primary);
  font-size: clamp(1rem, 2vw, 1.125rem);
  color: var(--color-text-secondary);
  max-width: 650px;
  margin: 0 auto;
  line-height: 1.7;
  font-weight: 500;
}

/* Tabs Container */
.tabs-container {
  max-width: 1000px;
  margin: 0 auto;
  background: white;
  border-radius: 1.25rem;
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  border: 1px solid #F3F4F6;
  animation: fadeInUp 0.8s ease-out 0.2s both;
}

/* Tab Headers */
.tab-headers {
  display: flex;
  border-bottom: 1px solid #E5E7EB;
  background: linear-gradient(180deg, #FAFBFC 0%, #FFFFFF 100%);
}

.tab-button {
  font-family: var(--font-family-primary);
  flex: 1;
  padding: 1.5rem 2rem;
  font-size: 1.0625rem;
  font-weight: 600;
  background: transparent;
  border: none;
  border-bottom: 3px solid transparent;
  cursor: pointer;
  transition: all var(--transition-base);
  color: var(--color-text-tertiary);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.875rem;
  position: relative;
  bottom: -1px;
}

.tab-button.active {
  color: var(--color-primary);
  border-bottom-color: var(--color-primary);
  background: white;
}

.tab-button:hover:not(.active) {
  color: var(--color-text-secondary);
  background: rgba(79, 70, 229, 0.03);
}

.tab-icon {
  font-size: 1.5rem;
  filter: grayscale(0.3);
  transition: filter var(--transition-base);
}

.tab-button.active .tab-icon {
  filter: grayscale(0);
}

/* Tab Content */
.tab-content-wrapper {
  position: relative;
  min-height: 500px;
}

.tab-content {
  padding: 2.5rem;
}

/* Fade Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-leave-active {
  position: absolute;
  width: 100%;
}

/* Content Header */
.content-header {
  margin-bottom: 2.5rem;
}

.content-title {
  font-family: var(--font-family-heading);
  font-size: clamp(1.5rem, 3vw, 2.125rem);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 0.875rem;
  letter-spacing: -0.02em;
}

.content-description {
  font-family: var(--font-family-primary);
  font-size: 1.0625rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
  font-weight: 400;
}

/* Services Grid */
.services-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
  margin-bottom: 3rem;
}

.service-card {
  display: flex;
  align-items: flex-start;
  gap: 1.125rem;
  padding: 1.75rem;
  background: white;
  border-radius: 1rem;
  transition: all var(--transition-base);
  border: 1.5px solid #F3F4F6;
  box-shadow: var(--shadow-xs);
}

.service-card:hover {
  background: white;
  border-color: var(--color-primary);
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.service-icon {
  font-size: 2.25rem;
  flex-shrink: 0;
  transition: transform var(--transition-base);
}

.service-card:hover .service-icon {
  transform: scale(1.1);
}

.service-content {
  flex: 1;
}

.service-title {
  font-family: var(--font-family-heading);
  font-size: 1.0625rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 0.625rem;
  letter-spacing: -0.01em;
}

.service-description {
  font-family: var(--font-family-primary);
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

/* CTA Section */
.cta-section {
  text-align: center;
  padding: 2.5rem 2rem;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  border-radius: 1rem;
  color: white;
  position: relative;
  overflow: hidden;
}

.cta-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at top right, rgba(255, 255, 255, 0.1) 0%, transparent 60%);
  pointer-events: none;
}

.cta-title {
  font-family: var(--font-family-heading);
  font-size: clamp(1.25rem, 3vw, 1.625rem);
  font-weight: 700;
  margin-bottom: 1.5rem;
  position: relative;
  letter-spacing: -0.01em;
}

.cta-button {
  font-family: var(--font-family-primary);
  padding: 1rem 2.75rem;
  font-size: 1.0625rem;
  font-weight: 600;
  background: white;
  color: var(--color-primary);
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all var(--transition-base);
  box-shadow: var(--shadow-lg);
  position: relative;
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
  background: #FAFBFC;
}

.cta-button:active {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

/* Responsive */
@media (max-width: 768px) {
  .work-with {
    padding: 4rem 0;
  }

  .section-title {
    font-size: 2rem;
  }

  .section-subtitle {
    font-size: 1rem;
  }

  .tab-button {
    font-size: 1rem;
    padding: 1rem;
    flex-direction: column;
    gap: 0.5rem;
  }

  .tab-icon {
    font-size: 1.25rem;
  }

  .tab-text {
    font-size: 0.875rem;
  }

  .tab-content {
    padding: 2rem 1.5rem;
  }

  .content-title {
    font-size: 1.5rem;
  }

  .content-description {
    font-size: 1rem;
  }

  .services-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .service-card {
    padding: 1.25rem;
  }

  .cta-section {
    padding: 1.5rem;
  }

  .cta-title {
    font-size: 1.25rem;
  }

  .cta-button {
    width: 100%;
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .work-with {
    padding: 3rem 0;
  }

  .section-title {
    font-size: 1.75rem;
  }

  .content-title {
    font-size: 1.375rem;
  }

  .service-icon {
    font-size: 1.5rem;
  }

  .service-title {
    font-size: 1rem;
  }

  .service-description {
    font-size: 0.875rem;
  }
}

/* Hero Servicios Section */
.hero-servicios {
  position: relative;
  background: linear-gradient(135deg, #5568D3 0%, #764ba2 100%);
  padding: 4rem 0;
  color: white;
  text-align: center;
  overflow: hidden;
  min-height: 40vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-container {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  letter-spacing: -0.025em;
}

.hero-subtitle {
  font-size: 1.25rem;
  opacity: 0.95;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .hero-servicios {
    padding: 3rem 0;
  }
}
</style>