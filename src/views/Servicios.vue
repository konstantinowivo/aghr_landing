<template>
  <div class="servicios-page">
    <section class="hero-section">
      <div class="container">
        <h1 class="page-title">Nuestros Servicios</h1>
        <p class="page-subtitle">
          Soluciones integrales de Recursos Humanos y Mentoring para impulsar tu organización
        </p>
      </div>
    </section>

    <section class="services-content">
      <div class="container">
        <div class="services-grid">
          <div class="service-card">
            <div class="service-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3 class="service-title">Consultoría en RRHH</h3>
            <p class="service-description">
              Asesoramiento estratégico en gestión del talento, desarrollo organizacional y optimización de procesos de recursos humanos.
            </p>
          </div>

          <div class="service-card">
            <div class="service-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <line x1="19" y1="8" x2="19" y2="14"></line>
                <line x1="22" y1="11" x2="16" y2="11"></line>
              </svg>
            </div>
            <h3 class="service-title">Reclutamiento y Selección</h3>
            <p class="service-description">
              Identificación y atracción del mejor talento para tu organización mediante procesos de selección personalizados y efectivos.
            </p>
          </div>

          <div class="service-card">
            <div class="service-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                <path d="M2 17l10 5 10-5"></path>
                <path d="M2 12l10 5 10-5"></path>
              </svg>
            </div>
            <h3 class="service-title">Capacitación y Desarrollo</h3>
            <p class="service-description">
              Programas de formación diseñados para potenciar las habilidades de tu equipo y fomentar el crecimiento profesional continuo.
            </p>
          </div>

          <div class="service-card">
            <div class="service-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
              </svg>
            </div>
            <h3 class="service-title">Mentoring Ejecutivo</h3>
            <p class="service-description">
              Acompañamiento personalizado para líderes y ejecutivos que buscan desarrollar su potencial y alcanzar sus objetivos profesionales.
            </p>
          </div>

          <div class="service-card">
            <div class="service-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
            </div>
            <h3 class="service-title">Evaluación de Desempeño</h3>
            <p class="service-description">
              Sistemas de evaluación que permiten medir y mejorar el rendimiento individual y organizacional de manera objetiva.
            </p>
          </div>

          <div class="service-card">
            <div class="service-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
            <h3 class="service-title">Gestión del Clima Laboral</h3>
            <p class="service-description">
              Diagnóstico y mejora del ambiente laboral para crear espacios de trabajo más productivos y satisfactorios.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Componente de página de Servicios
</script>

<style scoped>
.servicios-page {
  width: 100%;
  min-height: calc(100vh - 80px);
}

.hero-section {
  background: linear-gradient(135deg, #5568D3 0%, #764ba2 100%);
  padding: 4rem 0;
  color: white;
  text-align: center;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.page-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  letter-spacing: -0.025em;
}

.page-subtitle {
  font-size: 1.25rem;
  opacity: 0.95;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}

.services-content {
  padding: 4rem 0;
  background: #f9fafb;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.service-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.08);
}

.service-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(85, 104, 211, 0.15);
  border-color: #5568D3;
}

.service-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #5568D3 0%, #764ba2 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: white;
}

.service-icon svg {
  width: 32px;
  height: 32px;
}

.service-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1rem;
}

.service-description {
  font-size: 1rem;
  color: #6b7280;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }

  .page-subtitle {
    font-size: 1rem;
  }

  .hero-section {
    padding: 3rem 0;
  }

  .services-content {
    padding: 3rem 0;
  }

  .services-grid {
    grid-template-columns: 1fr;
  }
}
</style>
