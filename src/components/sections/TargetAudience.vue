<template>
  <section class="target-audience">
    <div class="container">
      <div class="header">
        <h2 class="title">¿Con quién trabajamos?</h2>
        <p class="subtitle">Acompañamos el crecimiento de empresas y profesionales en toda su trayectoria</p>
      </div>

      <div class="cards-container">
        <!-- Card Empresas -->
        <div class="audience-card card-empresas">
          <div class="card-icon icon-empresas">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
          </div>
          
          <h3 class="card-title">Empresas</h3>
          
          <div class="company-types">
            <div class="type-badge">Startups</div>
            <div class="type-badge">PyMEs</div>
            <div class="type-badge">Corporativo</div>
          </div>
          
          <p class="card-description">Trabajamos con empresas de todos los sectores</p>
          
          <div class="location-tags">
            <span class="location-tag">🇦🇷 Argentina</span>
            <span class="location-tag">🌎 Latam</span>
            <span class="location-tag">🇪🇸 España</span>
          </div>

          <button @click="scrollToSection('soluciones-empresas')" class="cta-button cta-empresas">
            Ver Soluciones Empresariales
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </button>
        </div>

        <!-- Card Personas -->
        <div class="audience-card card-personas">
          <div class="card-icon icon-personas">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          
          <h3 class="card-title">Personas</h3>
          
          <div class="profiles-grid">
            <div class="profile-item">
              <span class="profile-icon">💼</span>
              <span class="profile-name">Profesionales en crecimiento</span>
            </div>
            <div class="profile-item">
              <span class="profile-icon">🎯</span>
              <span class="profile-name">Búsqueda de empleo</span>
            </div>
            <div class="profile-item">
              <span class="profile-icon">🚀</span>
              <span class="profile-name">Freelancers</span>
            </div>
            <div class="profile-item">
              <span class="profile-icon">💡</span>
              <span class="profile-name">Emprendedores</span>
            </div>
          </div>

          <button @click="scrollToSection('desarrollo-profesional')" class="cta-button cta-personas">
            Ver Desarrollo Profesional
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
  }
}
</script>

<style scoped>
/* Paleta de colores */
:root {
  --color-empresas: #008026; /* Verde */
  --color-personas: #732982; /* Púrpura */
}

.target-audience {
  padding: 5rem 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

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
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  max-width: 900px;
  margin: 0 auto;
}

.audience-card {
  background: white;
  border-radius: 1rem;
  padding: 2.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  border-top: 4px solid var(--card-color);
}

/* Colores por card */
.card-empresas {
  --card-color: var(--color-empresas);
}

.card-personas {
  --card-color: var(--color-personas);
}

.audience-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: var(--card-color);
  transform: scaleX(1);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.audience-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

.audience-card:hover::before {
  transform: scaleX(1.05);
}

.card-icon {
  display: inline-flex;
  padding: 1rem;
  border-radius: 1rem;
  color: white;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
}

.icon-empresas {
  background: linear-gradient(135deg, var(--color-empresas), #00a032);
}

.icon-personas {
  background: linear-gradient(135deg, var(--color-personas), #8e3a9e);
}

.audience-card:hover .card-icon {
  transform: scale(1.05);
}

.card-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 1.5rem;
}

.company-types {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

.type-badge {
  padding: 0.5rem 1rem;
  background: var(--card-color);
  color: white;
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.type-badge:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.card-description {
  color: #4a5568;
  margin-bottom: 1.5rem;
  font-size: 1rem;
  line-height: 1.6;
}

.location-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.location-tag {
  padding: 0.5rem 1rem;
  background: #edf2f7;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: #2d3748;
  font-weight: 500;
  transition: background 0.2s ease;
}

.location-tag:hover {
  background: #e2e8f0;
}

.profiles-grid {
  display: grid;
  gap: 1rem;
  margin-bottom: 2rem;
}

.profile-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: #f7fafc;
  border-radius: 0.75rem;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
}

.card-personas .profile-item {
  border-left-color: var(--color-personas)20;
}

.profile-item:hover {
  background: #edf2f7;
  border-left-color: var(--card-color);
  transform: translateX(4px);
}

.profile-icon {
  font-size: 1.5rem;
}

.profile-name {
  color: #2d3748;
  font-weight: 500;
  font-size: 0.95rem;
}

/* Botones CTA */
.cta-button {
  width: 100%;
  padding: 1rem 1.5rem;
  border: 2px solid var(--card-color);
  background: white;
  color: var(--card-color);
  border-radius: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.cta-button:hover {
  background: var(--card-color);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.cta-button svg {
  transition: transform 0.3s ease;
}

.cta-button:hover svg {
  transform: translateX(4px);
}

.cta-button:active {
  transform: translateY(0);
}

/* Responsive */
@media (max-width: 768px) {
  .title {
    font-size: 2rem;
  }
  
  .subtitle {
    font-size: 1rem;
  }
  
  .cards-container {
    grid-template-columns: 1fr;
  }
  
  .target-audience {
    padding: 3rem 0;
  }

  .audience-card {
    padding: 2rem;
  }

  .card-title {
    font-size: 1.5rem;
  }

  .cta-button {
    font-size: 0.95rem;
    padding: 0.875rem 1.25rem;
  }
}
</style>