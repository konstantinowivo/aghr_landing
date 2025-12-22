<template>
  <div>
    <!-- Hero Section with Animation -->
    <section class="hero-nosotros">
      <HeroNosotrosAnimation />
      <div class="hero-container">
        <h1 class="hero-title">Nosotros</h1>
        <p class="hero-subtitle">Profesionales comprometidos con tu crecimiento</p>
      </div>
    </section>

    <!-- Main Content Section -->
    <section class="about-us">
      <div class="container">
        <!-- Header -->
        <div class="header">
          <h2 class="title">Quiénes Somos</h2>
          <p class="subtitle">Conoce nuestro equipo</p>
        </div>

      <!-- Founder Section - Andrea Gasparetti -->
      <div class="founder-section">
        <div class="founder-content">
          <div class="founder-image-wrapper">
            <OptimizedImage
              v-if="founder.image"
              :src="founder.image"
              :alt="founder.name"
              :width="400"
              :height="400"
              aspect-ratio="1/1"
              img-class="founder-image"
              :show-skeleton="true"
            />
            <div v-else class="founder-image-placeholder">
              {{ getInitials(founder.name) }}
            </div>
            <div class="founder-badge">Fundadora</div>
          </div>
          
          <div class="founder-info">
            <h3 class="founder-name">{{ founder.name }}</h3>
            <p class="founder-title">{{ founder.title }}</p>
            
            <div class="founder-bio">
              <p v-for="(paragraph, index) in founder.bio" :key="index" class="bio-paragraph">
                {{ paragraph }}
              </p>
            </div>

            <div class="founder-credentials">
              <div class="credentials-header">
                <h4>Formación y Experiencia:</h4>
              </div>
              <div 
                v-for="(credential, index) in founder.credentials" 
                :key="index"
                class="credential-item"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>{{ credential }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mission & Vision -->
      <div class="mission-vision">
        <div class="mission-card">
          <div class="card-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
            </svg>
          </div>
          <h4 class="card-title">Nuestra Misión</h4>
          <p class="card-text">{{ mission }}</p>
        </div>

        <div class="mission-card">
          <div class="card-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </div>
          <h4 class="card-title">Nuestra Visión</h4>
          <p class="card-text">{{ vision }}</p>
        </div>
      </div>

      <!-- Team Section -->
      <div v-if="team.length > 0" class="team-section">
        <h3 class="team-title">Nuestro Equipo</h3>
        <div class="team-grid">
          <div 
            v-for="(member, index) in team" 
            :key="index"
            class="team-card"
          >
            <div class="team-image-wrapper">
              <img
                v-if="member.image"
                :src="member.image"
                :alt="member.name"
                class="team-image"
              >
              <div v-else class="team-image-placeholder">
                {{ getInitials(member.name) }}
              </div>
            </div>
            <h4 class="team-name">{{ member.name }}</h4>
            <p class="team-role">{{ member.role }}</p>
            <p class="team-description">{{ member.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  </div>
</template>

<script setup>
import andreaPhoto from '../../assets/images/foto/ag_foto.png'
import HeroNosotrosAnimation from '@/components/HeroAnimations/HeroNosotrosAnimation.vue'
import OptimizedImage from '@/components/ui/OptimizedImage.vue'

// Función para obtener iniciales
const getInitials = (name) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const props = defineProps({
  founder: {
    type: Object,
    default: () => ({
      name: 'Andrea Gasparetti',
      title: 'Fundadora & Consultora Senior en RH',
      image: andreaPhoto,
      bio: [
        'Licenciada en Psicología por la Universidad del Salvador, con especialización en RRHH y Empleabilidad.',
        'Mentora Coach con más de 15 años de experiencia en Selección y Consultoría de RRHH en consultoras multinacionales y empresas líderes a nivel mundial.',
        'Docente en Recursos Humanos en la Universidad de Palermo y Profesora de Coaching en la Universidad del Salvador.'
      ],
      credentials: [
        'Licenciada en Psicología | Universidad del Salvador',
        'Especialista en RRHH y Empleabilidad',
        'Mentora Coach Certificada',
        'Profesora de Recursos Humanos | Universidad de Palermo',
        'Profesora de Coaching | Universidad del Salvador',
        '15+ años de experiencia en Selección y Consultoría de RRHH'
      ]
    })
  },
  mission: {
    type: String,
    default: 'Acompañar el crecimiento profesional y organizacional a través de soluciones personalizadas en recursos humanos, conectando el talento con las oportunidades que impulsan el éxito.'
  },
  vision: {
    type: String,
    default: 'Ser el referente en mentoría y recursos humanos en la región, reconocidos por nuestra capacidad de transformar carreras y organizaciones a través de estrategias innovadoras y centradas en las personas.'
  },
  team: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
/* ============================================
   Modern Corporate About Us Section
   ============================================ */

.about-us {
  padding: 6rem 0;
  background: linear-gradient(180deg, #FFFFFF 0%, #F9FAFB 50%, #FAFBFC 100%);
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Header */
.header {
  text-align: center;
  margin-bottom: 4rem;
  animation: fadeInDown 0.8s ease-out;
}

.title {
  font-family: var(--font-family-heading);
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 800;
  color: var(--color-text-primary);
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.subtitle {
  font-family: var(--font-family-primary);
  font-size: clamp(1rem, 2vw, 1.125rem);
  color: var(--color-text-secondary);
  font-weight: 500;
  line-height: 1.7;
}

/* Founder Section */
.founder-section {
  margin-bottom: 4rem;
  animation: fadeInUp 0.8s ease-out 0.2s both;
}

.founder-content {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 3rem;
  align-items: start;
  background: white;
  padding: 2.5rem;
  border-radius: 1.5rem;
  box-shadow: var(--shadow-xl);
  border: 1px solid #F3F4F6;
  transition: all var(--transition-base);
}

.founder-content:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.2);
}

.founder-image-wrapper {
  position: relative;
  width: 400px;
  height: 400px;
  min-height: 400px; /* Prevenir CLS */
  background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
  border-radius: 20px;
  overflow: hidden;
}

.founder-image {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 1rem;
  box-shadow: var(--shadow-lg);
  transition: all var(--transition-base);
  border: 3px solid white;
  box-shadow: var(--shadow-xl);
}

.founder-image:hover {
  transform: scale(1.03);
  box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.25);
}

.founder-image-placeholder {
  width: 100%;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  color: white;
  font-family: var(--font-family-heading);
  font-size: 3.5rem;
  font-weight: 700;
  border-radius: 1rem;
  box-shadow: var(--shadow-xl);
}

.founder-badge {
  position: absolute;
  bottom: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  color: white;
  font-family: var(--font-family-primary);
  padding: 0.5rem 1.5rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 700;
  box-shadow: var(--shadow-lg);
  white-space: nowrap;
  letter-spacing: 0.02em;
}

.founder-info {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;  /* Reducido de 1.5rem */
}

.founder-name {
  font-family: var(--font-family-heading);
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.founder-title {
  font-family: var(--font-family-primary);
  font-size: clamp(0.9375rem, 2vw, 1.0625rem);
  color: var(--color-primary);
  font-weight: 600;
  margin: 0;
  line-height: 1.5;
}

.founder-bio {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.bio-paragraph {
  font-family: var(--font-family-primary);
  color: var(--color-text-secondary);
  line-height: 1.75;
  margin: 0;
  font-size: 0.9375rem;
}

.founder-credentials {
  margin-top: 0.75rem;  /* Reducido de 1rem */
}

.credentials-header {
  margin-bottom: 0.875rem;  /* Reducido de 1rem */
}

.credentials-header h4 {
  font-size: 0.875rem;  /* Reducido de 0.95rem */
  font-weight: 700;
  color: #1a202c;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.credential-item {
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;  /* Reducido de 0.75rem */
  color: #2d3748;
  font-size: 0.875rem;  /* Reducido de 0.9rem */
  margin-bottom: 0.625rem;  /* Reducido de 0.75rem */
  line-height: 1.5;
}

.credential-item:last-child {
  margin-bottom: 0;
}

.credential-item svg {
  color: var(--color-primary);
  flex-shrink: 0;
  margin-top: 2px;
}

.credentials-header h4 {
  font-family: var(--font-family-primary);
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Mission & Vision */
.mission-vision {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-bottom: 4rem;
  animation: fadeInUp 0.8s ease-out 0.4s both;
}

.mission-card {
  background: white;
  padding: 2.5rem;
  border-radius: 1.25rem;
  text-align: center;
  box-shadow: var(--shadow-md);
  transition: all var(--transition-base);
  border: 1.5px solid #F3F4F6;
  border-top: 4px solid var(--color-primary);
}

.mission-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-xl);
  border-color: var(--color-primary-light);
}

.card-icon {
  display: inline-flex;
  padding: 1rem;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  border-radius: 1rem;
  color: white;
  margin-bottom: 1.5rem;
  box-shadow: var(--shadow-md);
}

.card-title {
  font-family: var(--font-family-heading);
  font-size: clamp(1.125rem, 2.5vw, 1.375rem);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}

.card-text {
  font-family: var(--font-family-primary);
  color: var(--color-text-secondary);
  line-height: 1.75;
  font-size: 0.9375rem;
}

/* Team Section */
.team-section {
  margin-top: 3rem;  /* Reducido de 4rem */
  animation: fadeInUp 1s ease-out 0.8s both;
}

.team-title {
  font-size: 1.625rem;  /* Reducido de 2rem */
  font-weight: 700;
  color: #1a202c;
  text-align: center;
  margin-bottom: 2.5rem;  /* Reducido de 3rem */
  letter-spacing: -0.025em;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));  /* Reducido de 250px */
  gap: 1.5rem;  /* Reducido de 2rem */
}

.team-card {
  background: white;
  padding: 1.5rem;  /* Reducido de 2rem */
  border-radius: 0.875rem;  /* Reducido de 1rem */
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);  /* Reducido shadow */
  transition: transform 0.3s ease;
}

.team-card:hover {
  transform: translateY(-5px);
}

.team-image-wrapper {
  margin-bottom: 1.25rem;  /* Reducido de 1.5rem */
}

.team-image {
  width: 100px;  /* Reducido de 120px */
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto;
  border: 3px solid #5568D3;  /* Reducido de 4px */
  transition: transform 0.3s ease;
}

.team-card:hover .team-image {
  transform: scale(1.08);
}

.team-image-placeholder {
  width: 100px;  /* Reducido de 120px */
  height: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #5568D3 0%, #764ba2 100%);
  color: white;
  font-size: 1.75rem;  /* Reducido de 2rem */
  font-weight: 700;
  margin: 0 auto;
  border: 3px solid #5568D3;  /* Reducido de 4px */
}

.team-name {
  font-size: 1.125rem;  /* Reducido de 1.25rem */
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 0.375rem;  /* Reducido de 0.5rem */
}

.team-role {
  font-size: 0.875rem;  /* Reducido de 0.95rem */
  color: #5568D3;
  font-weight: 600;
  margin-bottom: 0.875rem;  /* Reducido de 1rem */
}

.team-description {
  color: #4a5568;
  font-size: 0.875rem;  /* Reducido de 0.9rem */
  line-height: 1.6;
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

/* Responsive */
@media (max-width: 968px) {
  .founder-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 1.5rem;  /* Reducido de 2rem */
  }

  .founder-image-wrapper {
    max-width: 240px;  /* Reducido de 280px */
    margin: 0 auto;
  }

  .mission-vision {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .about-us {
    padding: 2.5rem 0;  /* Reducido de 3rem */
  }

  .title {
    font-size: 1.75rem;  /* Reducido de 2rem */
  }

  .founder-content {
    padding: 1.5rem;
    gap: 1.25rem;  /* Reducido de 1.5rem */
  }

  .founder-name {
    font-size: 1.375rem;  /* Reducido de 1.5rem */
  }

  .team-grid {
    grid-template-columns: 1fr;
  }

  .card-title {
    font-size: 1.125rem;  /* Reducido de 1.25rem */
  }
}

@media (max-width: 480px) {
  .about-us {
    padding: 2rem 0;
  }

  .title {
    font-size: 1.5rem;  /* Reducido de 1.75rem */
  }

  .founder-content {
    padding: 1.25rem;  /* Reducido de 1.5rem */
  }

  .founder-badge {
    font-size: 0.75rem;
    padding: 0.325rem 0.875rem;  /* Reducido */
  }

  .credential-item {
    font-size: 0.8125rem;  /* Reducido de 0.85rem */
  }
}

/* Hero Nosotros Section */
.hero-nosotros {
  position: relative;
  background: linear-gradient(135deg, #46B434 0%, #FCCC14 100%);
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

  .hero-nosotros {
    padding: 3rem 0;
  }
}
</style>