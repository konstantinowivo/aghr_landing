<template>
  <section class="work-with">
    <div class="container">
      <!-- Header -->
      <div class="section-header">
        <h2 class="section-title">¿Con quiénes trabajamos?</h2>
        <p class="section-subtitle">
          Acompañamos tanto a empresas como a profesionales en su desarrollo y crecimiento
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
                  Optimizamos tu gestión de talento con estrategias personalizadas que impulsan el crecimiento de tu organización
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
                <button class="cta-button" @click="$emit('empresas-cta')">
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
                <button class="cta-button" @click="$emit('personas-cta')">
                  Comenzar ahora
                </button>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

// Estado del tab activo
const activeTab = ref('empresas')

// Emit events
defineEmits(['empresas-cta', 'personas-cta'])

// Servicios para Empresas
const empresasServices = [
  {
    icon: '📊',
    title: 'Selección y Reclutamiento',
    description: 'Encontramos el talento ideal para cada posición con procesos estratégicos y eficientes'
  },
  {
    icon: '📈',
    title: 'Evaluación de Desempeño',
    description: 'Sistemas de evaluación objetivos que impulsan el desarrollo de tu equipo'
  },
  {
    icon: '🎓',
    title: 'Capacitación a Medida',
    description: 'Programas de formación diseñados según las necesidades específicas de tu empresa'
  },
  {
    icon: '👥',
    title: 'Cultura Organizacional',
    description: 'Desarrollamos ambientes de trabajo que potencian el compromiso y la productividad'
  },
  {
    icon: '⚖️',
    title: 'Consultoría en RRHH',
    description: 'Asesoramiento estratégico en todas las áreas de recursos humanos'
  },
  {
    icon: '🎯',
    title: 'Desarrollo de Liderazgo',
    description: 'Formamos líderes que inspiran y transforman equipos de alto rendimiento'
  }
]

// Servicios para Personas
const personasServices = [
  {
    icon: '🎯',
    title: 'Mentorías Personalizadas',
    description: 'Acompañamiento 1:1 con expertos que te guían en tu camino profesional'
  },
  {
    icon: '💼',
    title: 'Coaching Ejecutivo',
    description: 'Desarrollo de habilidades de liderazgo y gestión para potenciar tu carrera'
  },
  {
    icon: '🗺️',
    title: 'Plan de Carrera Estratégico',
    description: 'Diseñamos juntos tu roadmap profesional con objetivos claros y alcanzables'
  },
  {
    icon: '💬',
    title: 'Preparación para Entrevistas',
    description: 'Te preparamos para destacar en tus próximos desafíos profesionales'
  },
  {
    icon: '🤝',
    title: 'Networking Profesional',
    description: 'Construí conexiones valiosas que aceleran tu desarrollo'
  },
  {
    icon: '📝',
    title: 'Optimización de CV y LinkedIn',
    description: 'Potenciamos tu marca personal para atraer las mejores oportunidades'
  }
]
</script>

<style scoped>
/* Section Container */
.work-with {
  padding: 5rem 0;
  background: #fafafa;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Section Header */
.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 1rem;
  letter-spacing: -0.025em;
}

.section-subtitle {
  font-size: 1.125rem;
  color: #6b7280;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Tabs Container */
.tabs-container {
  max-width: 900px;
  margin: 0 auto;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

/* Tab Headers */
.tab-headers {
  display: flex;
  border-bottom: 2px solid #e5e7eb;
}

.tab-button {
  flex: 1;
  padding: 1.25rem 2rem;
  font-size: 1.125rem;
  font-weight: 600;
  background: transparent;
  border: none;
  border-bottom: 3px solid transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  position: relative;
  bottom: -2px;
}

.tab-button.active {
  color: #667eea;
  border-bottom-color: #667eea;
  background: #f9fafb;
}

.tab-button:hover:not(.active) {
  color: #374151;
  background: #fafafa;
}

.tab-icon {
  font-size: 1.5rem;
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
  margin-bottom: 2rem;
}

.content-title {
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.75rem;
}

.content-description {
  font-size: 1.0625rem;
  color: #6b7280;
  line-height: 1.6;
}

/* Services Grid */
.services-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.service-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: #f9fafb;
  border-radius: 12px;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.service-card:hover {
  background: white;
  border-color: #667eea;
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.15);
}

.service-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.service-content {
  flex: 1;
}

.service-title {
  font-size: 1.0625rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
}

.service-description {
  font-size: 0.9375rem;
  color: #6b7280;
  line-height: 1.5;
}

/* CTA Section */
.cta-section {
  text-align: center;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  color: white;
}

.cta-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.25rem;
}

.cta-button {
  padding: 1rem 2.5rem;
  font-size: 1.0625rem;
  font-weight: 600;
  background: white;
  color: #667eea;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.cta-button:active {
  transform: translateY(0);
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
</style>