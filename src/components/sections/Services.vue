<template>
  <section class="services">
    <div class="container">
      <div class="header">
        <h2 class="title">Nuestros Servicios</h2>
        <p class="subtitle">Soluciones integrales en recursos humanos y desarrollo profesional</p>
      </div>

      <!-- Tabs Navigation -->
      <div class="tabs-nav">
        <button 
          :class="['tab-button', { active: activeTab === 'empresas' }]"
          @click="activeTab = 'empresas'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect width="16" height="20" x="4" y="2" rx="2" ry="2"/>
            <path d="M9 22v-4h6v4"/>
            <path d="M8 6h.01"/>
            <path d="M16 6h.01"/>
            <path d="M12 6h.01"/>
            <path d="M12 10h.01"/>
            <path d="M12 14h.01"/>
            <path d="M16 10h.01"/>
            <path d="M16 14h.01"/>
            <path d="M8 10h.01"/>
            <path d="M8 14h.01"/>
          </svg>
          Para Empresas
        </button>
        <button 
          :class="['tab-button', { active: activeTab === 'personas' }]"
          @click="activeTab = 'personas'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          Para Personas
        </button>
      </div>

      <!-- Tab Content -->
      <div class="tab-content">
        <!-- Servicios para Empresas -->
        <transition name="fade">
          <div v-if="activeTab === 'empresas'" class="services-grid">
            <div 
              v-for="service in companyServices" 
              :key="service.id"
              class="service-card"
            >
              <div class="service-icon" v-html="service.icon"></div>
              <h3 class="service-title">{{ service.title }}</h3>
              <p class="service-description">{{ service.description }}</p>
            </div>
          </div>
        </transition>

        <!-- Servicios para Personas -->
        <transition name="fade">
          <div v-if="activeTab === 'personas'" class="services-grid">
            <div 
              v-for="service in personalServices" 
              :key="service.id"
              class="service-card"
            >
              <div class="service-icon" v-html="service.icon"></div>
              <h3 class="service-title">{{ service.title }}</h3>
              <p class="service-description">{{ service.description }}</p>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const activeTab = ref('empresas');

const companyServices = [
  {
    id: 1,
    title: 'Búsqueda y Selección',
    description: 'Procesos de reclutamiento personalizados para encontrar el talento ideal para tu organización.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>'
  },
  {
    id: 2,
    title: 'Evaluaciones',
    description: 'Evaluaciones individuales y grupales para identificar competencias, potencial y áreas de desarrollo.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11H3v9h6v-9Z"/><path d="M21 11h-6v9h6v-9Z"/><path d="M15 4h-6v7h6V4Z"/></svg>'
  },
  {
    id: 3,
    title: 'Diseño y Optimización de Procesos',
    description: 'Optimización de procesos de recursos humanos para mejorar la eficiencia organizacional.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18"/><path d="m8 8-4 4 4 4"/><path d="M16 16l4-4-4-4"/></svg>'
  },
  {
    id: 4,
    title: 'Recursos Humanos',
    description: 'Gestión integral de recursos humanos adaptada a las necesidades de tu empresa.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>'
  },
  {
    id: 5,
    title: 'Training & Team Building',
    description: 'Programas de capacitación y actividades para fortalecer el trabajo en equipo.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20h.01"/><path d="M7 20v-4"/><path d="M12 20v-8"/><path d="M17 20V8"/><path d="M22 4v16"/></svg>'
  },
  {
    id: 6,
    title: 'Coaching Gerencial',
    description: 'Acompañamiento personalizado para líderes y equipos gerenciales.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>'
  }
];

const personalServices = [
  {
    id: 1,
    title: 'Mentoring Laboral',
    description: 'Acompañamiento estratégico para impulsar tu desarrollo profesional y alcanzar tus objetivos de carrera.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>'
  },
  {
    id: 2,
    title: 'Marca Personal',
    description: 'Construcción y fortalecimiento de tu imagen profesional en el mercado laboral.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>'
  },
  {
    id: 3,
    title: 'Desarrollo de Marca',
    description: 'Estrategias para posicionarte como referente en tu industria y destacar en tu campo profesional.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>'
  },
  {
    id: 4,
    title: 'Staff Selection Training',
    description: 'Cursos especializados en recursos humanos para profesionales que buscan formarse en selección de personal.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>'
  }
];
</script>

<style scoped>
.services {
  padding: 5rem 0;
  background: #ffffff;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
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
  max-width: 600px;
  margin: 0 auto;
}

/* Tabs Navigation */
.tabs-nav {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.tab-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: #f7fafc;
  border: 2px solid transparent;
  border-radius: 0.75rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tab-button:hover {
  background: #edf2f7;
  border-color: #cbd5e0;
}

.tab-button.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-color: transparent;
}

.tab-button svg {
  width: 24px;
  height: 24px;
}

/* Services Grid */
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.service-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  padding: 2rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.service-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transition: height 0.3s ease;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.service-card:hover::before {
  height: 100%;
}

.service-icon {
  display: inline-flex;
  padding: 0.75rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 0.75rem;
  color: white;
  margin-bottom: 1.5rem;
}

.service-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 0.75rem;
}

.service-description {
  color: #4a5568;
  line-height: 1.6;
  font-size: 0.95rem;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .title {
    font-size: 2rem;
  }
  
  .services-grid {
    grid-template-columns: 1fr;
  }
  
  .tab-button {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }
  
  .services {
    padding: 3rem 0;
  }
}
</style>