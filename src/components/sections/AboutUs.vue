<template>
  <section class="about-us">
    <div class="container">
      <!-- Header -->
      <div class="header">
        <h2 class="title">Quiénes Somos</h2>
        <p class="subtitle">Profesionales comprometidos con tu crecimiento</p>
      </div>

      <!-- Founder Section - Andrea -->
      <div class="founder-section">
        <div class="founder-content">
          <div class="founder-image-wrapper">
            <img 
              :src="founder.image || '/placeholder-avatar.jpg'" 
              :alt="founder.name"
              class="founder-image"
            >
            <div class="founder-badge">Fundadora</div>
          </div>
          
          <div class="founder-info">
            <h3 class="founder-name">{{ founder.name }}</h3>
            <p class="founder-title">{{ founder.title }}</p>
            
            <div class="founder-bio">
              <p v-for="(paragraph, index) in founder.bio" :key="index">
                {{ paragraph }}
              </p>
            </div>

            <div class="founder-credentials">
              <div 
                v-for="(credential, index) in founder.credentials" 
                :key="index"
                class="credential-item"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
            </svg>
          </div>
          <h4 class="card-title">Nuestra Misión</h4>
          <p class="card-text">{{ mission }}</p>
        </div>

        <div class="mission-card">
          <div class="card-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
                :src="member.image || '/placeholder-avatar.jpg'" 
                :alt="member.name"
                class="team-image"
              >
            </div>
            <h4 class="team-name">{{ member.name }}</h4>
            <p class="team-role">{{ member.role }}</p>
            <p class="team-description">{{ member.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
// Importar foto de Andrea Gasparetti
import andreaPhoto from '../../assets/images/foto/ag_foto.png'

const props = defineProps({
  founder: {
    type: Object,
    default: () => ({
      name: 'Andrea Gasparetti',
      title: 'Fundadora & Consultora Senior en RH',
      image: andreaPhoto, // ← FOTO INTEGRADA
      bio: [
        'Con más de 15 años de experiencia en recursos humanos y desarrollo organizacional, fundé AGHR con la misión de transformar la manera en que empresas y profesionales abordan el talento.',
        'Mi pasión es conectar a las personas con su máximo potencial, ya sea a través de procesos de selección estratégicos, programas de desarrollo o mentoría personalizada.'
      ],
      credentials: [
        'Licenciada en Recursos Humanos',
        '15+ años de experiencia en el sector',
        'Certificada en Coaching Ejecutivo',
        '100+ empresas asesoradas'
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
    default: () => [
      // Ejemplo de miembro del equipo:
      // {
      //   name: 'Victoria López',
      //   role: 'Consultora en Desarrollo Organizacional',
      //   image: '',
      //   description: 'Especialista en diseño de procesos de RH y team building.'
      // }
    ]
  }
})
</script>

<style scoped>
.about-us {
  padding: 5rem 0;
  background: linear-gradient(180deg, #ffffff 0%, #f7fafc 100%);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Header */
.header {
  text-align: center;
  margin-bottom: 4rem;
}

.title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.125rem;
  color: #4a5568;
}

/* Founder Section */
.founder-section {
  margin-bottom: 5rem;
}

.founder-content {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 3rem;
  align-items: start;
  background: white;
  padding: 3rem;
  border-radius: 1.5rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
}

.founder-image-wrapper {
  position: relative;
}

.founder-image {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 1rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

.founder-badge {
  position: absolute;
  bottom: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.founder-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.founder-name {
  font-size: 2rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0;
}

.founder-title {
  font-size: 1.125rem;
  color: #667eea;
  font-weight: 600;
  margin: 0;
}

.founder-bio {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.founder-bio p {
  color: #4a5568;
  line-height: 1.8;
  margin: 0;
}

.founder-credentials {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  margin-top: 1rem;
}

.credential-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #2d3748;
  font-size: 0.9rem;
}

.credential-item svg {
  color: #667eea;
  flex-shrink: 0;
}

/* Mission & Vision */
.mission-vision {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-bottom: 5rem;
}

.mission-card {
  background: white;
  padding: 2.5rem;
  border-radius: 1rem;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.mission-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.card-icon {
  display: inline-flex;
  padding: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 1rem;
  color: white;
  margin-bottom: 1.5rem;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 1rem;
}

.card-text {
  color: #4a5568;
  line-height: 1.8;
}

/* Team Section */
.team-section {
  margin-top: 4rem;
}

.team-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1a202c;
  text-align: center;
  margin-bottom: 3rem;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.team-card {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease;
}

.team-card:hover {
  transform: translateY(-5px);
}

.team-image-wrapper {
  margin-bottom: 1.5rem;
}

.team-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto;
  border: 4px solid #667eea;
}

.team-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.team-role {
  font-size: 0.95rem;
  color: #667eea;
  font-weight: 600;
  margin-bottom: 1rem;
}

.team-description {
  color: #4a5568;
  font-size: 0.9rem;
  line-height: 1.6;
}

/* Responsive */
@media (max-width: 968px) {
  .founder-content {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .founder-image-wrapper {
    max-width: 250px;
    margin: 0 auto;
  }

  .founder-credentials {
    grid-template-columns: 1fr;
  }

  .mission-vision {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .title {
    font-size: 2rem;
  }

  .founder-content {
    padding: 2rem;
  }

  .founder-name {
    font-size: 1.5rem;
  }

  .team-grid {
    grid-template-columns: 1fr;
  }

  .about-us {
    padding: 3rem 0;
  }
}
</style>