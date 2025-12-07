<template>
  <section class="services-section">
    <!-- Servicios para Empresas -->
    <div class="services-container">
      <h2 class="section-title">Soluciones para Empresas</h2>
      <p class="section-subtitle">Soluciones integrales de RRHH para startups, PyMEs y corporativos</p>
      
      <div class="cards-grid">
        <ServiceCard
          title="Búsqueda y Selección"
          description="Reclutamiento estratégico de talento alineado con la cultura y objetivos de tu empresa."
          :features="[
            'Headhunting ejecutivo',
            'Evaluación de competencias',
            'Onboarding personalizado'
          ]"
          color="green"
        >
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </template>
        </ServiceCard>

        <ServiceCard
          title="Evaluaciones"
          description="Herramientas de assessment individuales y grupales para tomar mejores decisiones."
          :features="[
            'Evaluaciones psicométricas',
            'Assessment center',
            'Evaluación 360°'
          ]"
          color="cyan"
        >
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 11H3v2h6m-4 6h4v-2H5m10 4h6v-2h-6m4-14h-4v2h4m-8 4h4V9h-4z"/>
            </svg>
          </template>
        </ServiceCard>

        <ServiceCard
          title="Training & Team Building"
          description="Capacitación y fortalecimiento de equipos para potenciar el rendimiento."
          :features="[
            'Talleres personalizados',
            'Dinámicas de grupo',
            'Desarrollo de liderazgo'
          ]"
          color="orange"
        >
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </template>
        </ServiceCard>
      </div>
    </div>

    <!-- Servicios para Personas -->
    <div class="services-container">
      <h2 class="section-title">Desarrollo Profesional</h2>
      <p class="section-subtitle">Impulsa tu carrera con mentoría personalizada</p>
      
      <div class="cards-grid">
        <ServiceCard
          title="Mentoring Laboral"
          description="Acompañamiento profesional para alcanzar tus objetivos de carrera."
          :features="[
            'Sesiones 1 a 1',
            'Plan de desarrollo personalizado',
            'Seguimiento continuo'
          ]"
          color="purple"
        >
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 20h9"/>
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
            </svg>
          </template>
        </ServiceCard>

        <ServiceCard
          title="Marca Personal"
          description="Construye y posiciona tu identidad profesional en el mercado."
          :features="[
            'Análisis de fortalezas',
            'Estrategia de LinkedIn',
            'Personal branding'
          ]"
          color="red"
        >
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </template>
        </ServiceCard>
      </div>
    </div>
  </section>
</template>

<script setup>
import ServiceCard from '../ui/ServiceCard.vue';
</script>

<style scoped>
.services-section {
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.services-container {
  margin-bottom: 4rem;
}

.services-container:last-child {
  margin-bottom: 0;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a1a;
  text-align: center;
  margin-bottom: 0.5rem;
}

.section-subtitle {
  text-align: center;
  color: #4a5568;
  font-size: 1.1rem;
  margin-bottom: 3rem;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

/* Responsive */
@media (max-width: 768px) {
  .services-section {
    padding: 3rem 1rem;
  }
  
  .section-title {
    font-size: 1.75rem;
  }
  
  .section-subtitle {
    font-size: 1rem;
  }
  
  .cards-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>