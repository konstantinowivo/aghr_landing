<template>
  <div>

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
            <span class="tab-text">EMPRESAS</span>
          </button>
          <button
            class="tab-button"
            :class="{ active: activeTab === 'personas' }"
            @click="activeTab = 'personas'"
          >
            <span class="tab-text">PERSONAS</span>
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
                  <div class="service-icon">
                    <img :src="service.icon" :alt="service.title" />
                  </div>
                  <div class="service-content">
                    <h4 class="service-title">{{ service.title }}</h4>
                    <p class="service-description">{{ service.description }}</p>
                  </div>
                </div>
              </div>

              <div class="cta-section cta-section--empresas">
                <h4 class="cta-title">¿Listo para transformar tu organización?</h4>
                <button class="cta-button" @click="handleEmpresas">
                  Agendar consulta
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
                  <div class="service-icon">
                    <img :src="service.icon" :alt="service.title" />
                  </div>
                  <div class="service-content">
                    <h4 class="service-title">{{ service.title }}</h4>
                    <p class="service-description">{{ service.description }}</p>
                  </div>
                </div>
              </div>

              <div class="cta-section cta-section--personas">
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
import { useRouter } from 'vue-router'

// Importar imágenes para Empresas
import busquedaSeleccion from '@/assets/images/logos_empresas/busqueda_y_seleccion.png'
import evaluaciones from '@/assets/images/logos_empresas/evaluaciones.png'
import experienciaAprendizaje from '@/assets/images/logos_empresas/experiencia_de_aprendizaje.png'
import hrManagement from '@/assets/images/logos_empresas/hr_managment.png'
import desarrolloLiderazgo from '@/assets/images/logos_empresas/desarrollo_de_liderazgo.png'
import desarrolloMarca from '@/assets/images/logos_empresas/desarrollo_de_marca.png'

// Importar imágenes para Personas
import mentoriasPersonalizadas from '@/assets/images/logos_persona/mentorias_personalizadas.png'
import coachingEjecutivo from '@/assets/images/logos_persona/coaching_ejecutivo.png'
import planCarrera from '@/assets/images/logos_persona/plan_de_carrera_estrategico.png'
import preparacionEntrevistas from '@/assets/images/logos_persona/preparacion_para_entrevistas.png'
import networkingProfesional from '@/assets/images/logos_persona/networking_profesional.png'
import optimizacionCV from '@/assets/images/logos_persona/optimizacion_de_cv.png'
import marcaPersonal from '@/assets/images/logos_persona/marca_personal.png'
import staffSelectionTraining from '@/assets/images/logos_persona/staff_selection_training.png'

// Estado del tab activo
const activeTab = ref('empresas')

// Router para navegación
const router = useRouter()

// Emit events para tracking/analytics (opcional)
const emit = defineEmits(['empresas-click', 'personas-click'])

// Servicios para Empresas
const empresasServices = [
  {
    icon: busquedaSeleccion,
    title: 'Búsqueda & Selección',
    description: 'Identificamos y atraemos al mejor talento, garantizando las habilidades técnicas y blandas para ocupar la vacante.'
  },
  {
    icon: evaluaciones,
    title: 'Evaluaciones',
    description: 'Implementamos evaluaciones psicotécnicas, de competencia y potencial, dentro de los procesos de selección y plan de carrera de los colaboradores de tu empresa.'
  },
  {
    icon: experienciaAprendizaje,
    title: 'Experiencia de aprendizaje',
    description: 'Diseñamos e implementamos programas de capacitación y espacios de formación para desarrollar las habilidades blandas y competencias técnicas para el éxito de tu equipo.'
  },
  {
    icon: hrManagement,
    title: 'HR Management',
    description: 'Asesoramiento estratégico en todas las áreas de recursos humanos.'
  },
  {
    icon: desarrolloLiderazgo,
    title: 'Desarrollo de Liderazgo',
    description: 'Formamos líderes que inspiran y transforman equipos de alto rendimiento.'
  },
  {
    icon: desarrolloMarca,
    title: 'Desarrollo de Marca',
    description: 'Construimos y fortalecemos la identidad de tu empresa en el mercado.'
  }
]

// Servicios para Personas
const personasServices = [
  {
    icon: mentoriasPersonalizadas,
    title: 'Mentorías Personalizadas',
    description: 'Acompañamiento 1:1 con expertos que te guían para impulsar tu camino profesional.'
  },
  {
    icon: coachingEjecutivo,
    title: 'Coaching Ejecutivo',
    description: 'Desarrollo de habilidades de liderazgo y gestión para potenciar tu carrera.'
  },
  {
    icon: planCarrera,
    title: 'Plan de Carrera Estratégico',
    description: 'Diseñamos juntos tu roadmap profesional con objetivos claros y alcanzables.'
  },
  {
    icon: preparacionEntrevistas,
    title: 'Preparación para Entrevistas',
    description: 'Te preparamos para destacar en tus próximos desafíos profesionales, en castellano e inglés.'
  },
  {
    icon: networkingProfesional,
    title: 'Networking Profesional',
    description: 'Construí conexiones valiosas que aceleran tu desarrollo.'
  },
  {
    icon: optimizacionCV,
    title: 'Optimización de CV y LinkedIn',
    description: 'Potenciamos tu marca personal para atraer las mejores oportunidades.'
  },
  {
    icon: marcaPersonal,
    title: 'Marca Personal',
    description: 'Desarrollamos tu identidad profesional única para destacar en tu industria.'
  },
  {
    icon: staffSelectionTraining,
    title: 'STAFF SELECTION TRAINING',
    description: 'Capacitamos en temáticas soft de RH, para ayudar a los profesionales del área a optimizar su gestión, dentro de sectores empresariales y educativos, como freelance.'
  }
]

// Manejador de acciones para empresas
const handleEmpresas = () => {
  emit('empresas-click')
  router.push('/contacto')
}

// Manejador de acciones para personas
const handlePersonas = () => {
  emit('personas-click')
  router.push('/contacto')
}
</script>

<style scoped>
/* ============================================
   Modern Corporate Target Audience Section
   ============================================ */

.work-with {
  margin-top: 10vh;
  padding: 6rem 0;
  background: linear-gradient(180deg, #FFFFFF 0%, #F9FAFB 50%, #FAFBFC 100%);
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
  font-family: 'Garamond', serif;
  font-size: clamp(2.4rem, 4.8vw, 3.3rem);
  font-weight: bold;
  color: var(--color-text-primary);
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.section-subtitle {
  font-family: var(--font-family-primary);
  font-size: clamp(1.2rem, 2.4vw, 1.35rem);
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
  font-size: 1.275rem;
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
  font-family: 'Garamond', serif;
  font-size: clamp(1.8rem, 3.6vw, 2.55rem);
  font-weight: bold;
  color: var(--color-text-primary);
  margin-bottom: 0.875rem;
  letter-spacing: -0.02em;
}

.content-description {
  font-family: var(--font-family-primary);
  font-size: 1.275rem;
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
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  transition: transform var(--transition-base);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  overflow: hidden;
}

.service-icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.service-card:hover .service-icon {
  transform: scale(1.1);
}

.service-content {
  flex: 1;
}

.service-title {
  font-family: 'Garamond', serif;
  font-size: 1.275rem;
  font-weight: bold;
  color: var(--color-text-primary);
  margin-bottom: 0.625rem;
  letter-spacing: -0.01em;
}

.service-description {
  font-family: var(--font-family-primary);
  font-size: 1.125rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

/* CTA Section */
.cta-section {
  text-align: center;
  padding: 2.5rem 2rem;
  border-radius: 1rem;
  color: white;
  position: relative;
  overflow: hidden;
}

.cta-section--empresas {
  background: linear-gradient(135deg, #A8D5D1 0%, #C4E5E2 100%);
}

.cta-section--personas {
  background: linear-gradient(135deg, #F7D98E 0%, #FAE6B0 100%);
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
  font-family: 'Garamond', serif;
  font-size: clamp(1.5rem, 3.6vw, 1.95rem);
  font-weight: bold;
  margin-bottom: 1.5rem;
  position: relative;
  letter-spacing: -0.01em;
}

.cta-button {
  font-family: var(--font-family-primary);
  padding: 1rem 2.75rem;
  font-size: 1.275rem;
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
    width: 45px;
    height: 45px;
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
  background: transparent;
  padding: 4rem 0;
  color: white;
  text-align: center;
  overflow: hidden;
  min-height: 50vh;
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-servicios::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('https://res.cloudinary.com/dav0f6jpk/video/upload/f_auto,q_auto,w_1280,so_0/video_obelisco_xunslf.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: -1;
}

.hero-container {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.hero-title {
  font-family: var(--font-family-heading);
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.03em;
  color: white;
  margin: 0 auto 1rem;
  max-width: 900px;
  text-align: center;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}

.hero-subtitle {
  font-family: var(--font-family-primary);
  font-size: clamp(1rem, 2vw, 1.125rem);
  font-weight: 400;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 auto;
  max-width: 700px;
  text-align: center;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
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

/* Animations */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>