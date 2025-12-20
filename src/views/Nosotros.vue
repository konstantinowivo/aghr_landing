<template>
  <div class="nosotros-page">
    <section class="hero-section">
      <div class="container">
        <h1 class="page-title">Sobre Nosotros</h1>
        <p class="page-subtitle">
          Transformando organizaciones a través del desarrollo del talento humano
        </p>
      </div>
    </section>

    <section class="about-content">
      <div class="container">
        <div class="content-grid">
          <!-- Misión -->
          <div class="content-card">
            <div class="card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 6v6l4 2"></path>
              </svg>
            </div>
            <h2 class="card-title">Nuestra Misión</h2>
            <p class="card-text">
              Acompañar a las organizaciones en su crecimiento a través de soluciones innovadoras
              en gestión del talento, mentoring y desarrollo humano, creando espacios de trabajo
              donde las personas puedan alcanzar su máximo potencial.
            </p>
          </div>

          <!-- Visión -->
          <div class="content-card">
            <div class="card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </div>
            <h2 class="card-title">Nuestra Visión</h2>
            <p class="card-text">
              Ser referentes en consultoría de recursos humanos y mentoring en la región,
              reconocidos por nuestra capacidad de transformar organizaciones y potenciar el
              talento, generando impacto sostenible en las empresas y en las personas.
            </p>
          </div>

          <!-- Valores -->
          <div class="content-card full-width">
            <div class="card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </div>
            <h2 class="card-title">Nuestros Valores</h2>
            <div class="values-grid">
              <div class="value-item">
                <h3>Excelencia</h3>
                <p>Compromiso con la calidad en cada servicio que ofrecemos</p>
              </div>
              <div class="value-item">
                <h3>Integridad</h3>
                <p>Actuamos con ética y transparencia en todas nuestras acciones</p>
              </div>
              <div class="value-item">
                <h3>Innovación</h3>
                <p>Buscamos soluciones creativas y adaptadas a cada contexto</p>
              </div>
              <div class="value-item">
                <h3>Desarrollo</h3>
                <p>Creemos en el potencial de crecimiento de cada persona</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Equipo -->
        <div class="team-section">
          <h2 class="section-title">Nuestro Equipo</h2>
          <p class="section-description">
            Contamos con un equipo multidisciplinario de profesionales especializados en
            recursos humanos, psicología organizacional, coaching y desarrollo del talento.
          </p>
          <div class="team-stats">
            <div class="stat-item">
              <div class="stat-number">+10</div>
              <div class="stat-label">Años de Experiencia</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">+50</div>
              <div class="stat-label">Clientes Satisfechos</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">+200</div>
              <div class="stat-label">Proyectos Completados</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Componente de página Sobre Nosotros
</script>

<style scoped>
.nosotros-page {
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

.about-content {
  padding: 4rem 0;
  background: #f9fafb;
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-top: 2rem;
}

.content-card {
  background: white;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.08);
}

.content-card.full-width {
  grid-column: 1 / -1;
}

.card-icon {
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

.card-icon svg {
  width: 32px;
  height: 32px;
}

.card-title {
  font-size: 1.75rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1rem;
}

.card-text {
  font-size: 1rem;
  color: #6b7280;
  line-height: 1.7;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.value-item {
  padding: 1.5rem;
  background: #f9fafb;
  border-radius: 8px;
  border-left: 4px solid #5568D3;
}

.value-item h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
}

.value-item p {
  font-size: 0.95rem;
  color: #6b7280;
  line-height: 1.5;
}

.team-section {
  margin-top: 4rem;
  text-align: center;
}

.section-title {
  font-size: 2.25rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 1rem;
}

.section-description {
  font-size: 1.1rem;
  color: #6b7280;
  max-width: 800px;
  margin: 0 auto 3rem;
  line-height: 1.7;
}

.team-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.stat-item {
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(85, 104, 211, 0.15);
  border-color: #5568D3;
}

.stat-number {
  font-size: 3rem;
  font-weight: 700;
  background: linear-gradient(135deg, #5568D3 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1rem;
  color: #6b7280;
  font-weight: 500;
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

  .about-content {
    padding: 3rem 0;
  }

  .content-grid {
    grid-template-columns: 1fr;
  }

  .values-grid {
    grid-template-columns: 1fr;
  }

  .section-title {
    font-size: 1.75rem;
  }

  .stat-number {
    font-size: 2.5rem;
  }
}
</style>
