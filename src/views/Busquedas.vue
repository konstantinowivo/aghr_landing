<template>
  <div class="busquedas-page">
    <section class="hero-section">
      <div class="container">
        <h1 class="page-title">Búsquedas Activas</h1>
        <p class="page-subtitle">
          Encuentra tu próxima oportunidad profesional con nuestras búsquedas laborales
        </p>
      </div>
    </section>

    <section class="search-content">
      <div class="container">
        <!-- Filtros -->
        <div class="filters-section">
          <div class="filter-group">
            <label class="filter-label">Área</label>
            <select v-model="selectedArea" class="filter-select">
              <option value="">Todas las áreas</option>
              <option value="tecnologia">Tecnología</option>
              <option value="ventas">Ventas</option>
              <option value="marketing">Marketing</option>
              <option value="finanzas">Finanzas</option>
              <option value="rrhh">Recursos Humanos</option>
            </select>
          </div>

          <div class="filter-group">
            <label class="filter-label">Tipo de Empleo</label>
            <select v-model="selectedType" class="filter-select">
              <option value="">Todos</option>
              <option value="full-time">Tiempo Completo</option>
              <option value="part-time">Medio Tiempo</option>
              <option value="freelance">Freelance</option>
            </select>
          </div>

          <button class="filter-button" @click="clearFilters">
            Limpiar Filtros
          </button>
        </div>

        <!-- Listado de búsquedas -->
        <div class="jobs-grid">
          <div v-for="job in filteredJobs" :key="job.id" class="job-card">
            <div class="job-header">
              <h3 class="job-title">{{ job.title }}</h3>
              <span class="job-type" :class="'job-type--' + job.type">
                {{ getTypeLabel(job.type) }}
              </span>
            </div>

            <div class="job-details">
              <div class="detail-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>{{ job.location }}</span>
              </div>

              <div class="detail-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
                <span>{{ job.area }}</span>
              </div>
            </div>

            <p class="job-description">{{ job.description }}</p>

            <div class="job-footer">
              <span class="job-date">Publicado hace {{ job.daysAgo }} días</span>
              <button class="apply-button">
                Ver Detalles
              </button>
            </div>
          </div>
        </div>

        <!-- Mensaje si no hay resultados -->
        <div v-if="filteredJobs.length === 0" class="no-results">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <h3>No se encontraron búsquedas</h3>
          <p>Intenta ajustar los filtros para ver más resultados</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedArea = ref('')
const selectedType = ref('')

// Datos de ejemplo de búsquedas laborales
const jobs = ref([
  {
    id: 1,
    title: 'Desarrollador Full Stack',
    area: 'Tecnología',
    location: 'Buenos Aires, Argentina',
    type: 'full-time',
    description: 'Buscamos desarrollador con experiencia en Vue.js, Node.js y bases de datos relacionales.',
    daysAgo: 2
  },
  {
    id: 2,
    title: 'Gerente de Ventas',
    area: 'Ventas',
    location: 'Córdoba, Argentina',
    type: 'full-time',
    description: 'Profesional con experiencia en liderazgo de equipos comerciales y estrategias de ventas.',
    daysAgo: 5
  },
  {
    id: 3,
    title: 'Especialista en Marketing Digital',
    area: 'Marketing',
    location: 'Remoto',
    type: 'freelance',
    description: 'Se requiere experto en SEO, SEM y gestión de redes sociales para proyectos estratégicos.',
    daysAgo: 1
  },
  {
    id: 4,
    title: 'Analista Financiero',
    area: 'Finanzas',
    location: 'Rosario, Argentina',
    type: 'full-time',
    description: 'Buscamos profesional con conocimientos en análisis financiero y reportes ejecutivos.',
    daysAgo: 7
  },
  {
    id: 5,
    title: 'HR Business Partner',
    area: 'Recursos Humanos',
    location: 'Buenos Aires, Argentina',
    type: 'part-time',
    description: 'Profesional de RRHH para acompañar procesos de transformación organizacional.',
    daysAgo: 3
  }
])

const filteredJobs = computed(() => {
  return jobs.value.filter(job => {
    const matchArea = !selectedArea.value || job.area.toLowerCase().includes(selectedArea.value.toLowerCase())
    const matchType = !selectedType.value || job.type === selectedType.value
    return matchArea && matchType
  })
})

const getTypeLabel = (type) => {
  const labels = {
    'full-time': 'Tiempo Completo',
    'part-time': 'Medio Tiempo',
    'freelance': 'Freelance'
  }
  return labels[type] || type
}

const clearFilters = () => {
  selectedArea.value = ''
  selectedType.value = ''
}
</script>

<style scoped>
.busquedas-page {
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

.search-content {
  padding: 4rem 0;
  background: #f9fafb;
}

.filters-section {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.filter-group {
  flex: 1;
  min-width: 200px;
}

.filter-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
}

.filter-select {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  color: #111827;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-select:focus {
  outline: none;
  border-color: #5568D3;
  box-shadow: 0 0 0 3px rgba(85, 104, 211, 0.1);
}

.filter-button {
  padding: 0.75rem 1.5rem;
  background: #6b7280;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: flex-end;
}

.filter-button:hover {
  background: #4b5563;
  transform: translateY(-2px);
}

.jobs-grid {
  display: grid;
  gap: 1.5rem;
}

.job-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.job-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(85, 104, 211, 0.1);
  border-color: #5568D3;
}

.job-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
}

.job-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.job-type {
  padding: 0.375rem 0.75rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
}

.job-type--full-time {
  background: #dbeafe;
  color: #1e40af;
}

.job-type--part-time {
  background: #fef3c7;
  color: #92400e;
}

.job-type--freelance {
  background: #e0e7ff;
  color: #4338ca;
}

.job-details {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.875rem;
}

.detail-item svg {
  width: 16px;
  height: 16px;
}

.job-description {
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.job-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
}

.job-date {
  font-size: 0.875rem;
  color: #9ca3af;
}

.apply-button {
  padding: 0.625rem 1.5rem;
  background: linear-gradient(135deg, #5568D3 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.apply-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(85, 104, 211, 0.4);
}

.no-results {
  text-align: center;
  padding: 4rem 2rem;
}

.no-results svg {
  width: 64px;
  height: 64px;
  color: #d1d5db;
  margin: 0 auto 1rem;
}

.no-results h3 {
  font-size: 1.5rem;
  color: #111827;
  margin-bottom: 0.5rem;
}

.no-results p {
  color: #6b7280;
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

  .search-content {
    padding: 3rem 0;
  }

  .filters-section {
    flex-direction: column;
  }

  .filter-button {
    align-self: stretch;
  }

  .job-header {
    flex-direction: column;
  }

  .job-details {
    flex-direction: column;
    gap: 0.5rem;
  }

  .job-footer {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }

  .apply-button {
    width: 100%;
  }
}
</style>
