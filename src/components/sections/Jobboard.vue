<template>
  <section class="job-board">
    <div class="container">
      <!-- Header -->
      <div class="header">
        <h2 class="title">Propuestas Laborales</h2>
        <p class="subtitle">Encontrá tu próxima oportunidad profesional</p>
      </div>

      <!-- Search & Filters -->
      <div class="filters">
        <div class="search-box">
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="🔍 Buscar por título, empresa o ubicación..."
            class="search-input"
          >
        </div>
        
        <div class="filter-buttons">
          <button 
            v-for="category in categories" 
            :key="category.value"
            :class="['filter-btn', { active: selectedCategory === category.value }]"
            @click="selectedCategory = category.value"
          >
            {{ category.label }}
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
        <p>Cargando propuestas...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="error">
        <p>⚠️ Error al cargar las propuestas. Por favor, intentá más tarde.</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredJobs.length === 0" class="empty">
        <p>📭 No se encontraron propuestas con esos criterios.</p>
      </div>

      <!-- Jobs Grid -->
      <div v-else class="jobs-grid">
        <div 
          v-for="job in filteredJobs" 
          :key="job.id"
          class="job-card"
        >
          <div class="job-header">
            <h3 class="job-title">{{ job.titulo }}</h3>
            <span class="job-badge">{{ job.tipo }}</span>
          </div>

          <p class="job-company">{{ job.empresa }}</p>

          <div class="job-details">
            <span class="detail-item">
              📍 {{ job.ubicacion }}
            </span>
            <span class="detail-item" v-if="job.salario">
              💰 {{ job.salario }}
            </span>
            <span class="detail-item">
              📅 {{ formatDate(job.fechaPublicacion) }}
            </span>
          </div>

          <p class="job-description">
            {{ truncate(job.descripcion, 120) }}
          </p>

          <button 
            class="job-button"
            @click="openJobModal(job)"
          >
            Ver más detalles
          </button>
        </div>
      </div>

      <!-- Job Detail Modal -->
      <transition name="modal">
        <div v-if="selectedJob" class="modal-overlay" @click="closeModal">
          <div class="modal-content" @click.stop>
            <button class="modal-close" @click="closeModal">✕</button>
            
            <div class="modal-header">
              <h2 class="modal-title">{{ selectedJob.titulo }}</h2>
              <span class="job-badge">{{ selectedJob.tipo }}</span>
            </div>

            <div class="modal-body">
              <div class="job-meta">
                <p><strong>Empresa:</strong> {{ selectedJob.empresa }}</p>
                <p><strong>Ubicación:</strong> {{ selectedJob.ubicacion }}</p>
                <p v-if="selectedJob.salario"><strong>Salario:</strong> {{ selectedJob.salario }}</p>
                <p><strong>Publicado:</strong> {{ formatDate(selectedJob.fechaPublicacion) }}</p>
              </div>

              <div class="job-section">
                <h3>Descripción</h3>
                <p>{{ selectedJob.descripcion }}</p>
              </div>

              <div v-if="selectedJob.requisitos" class="job-section">
                <h3>Requisitos</h3>
                <ul class="requisitos-list">
                  <li v-for="(req, index) in parseRequisitos(selectedJob.requisitos)" :key="index">
                    {{ req }}
                  </li>
                </ul>
              </div>

              <div class="modal-actions">
                <button class="apply-button" @click="applyToJob(selectedJob)">
                  📩 Aplicar Ahora
                </button>
                <button class="share-button" @click="shareJob(selectedJob)">
                  🔗 Compartir
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// ==========================================
// CONFIGURACIÓN DESDE VARIABLES DE ENTORNO
// ==========================================
const SHEET_ID = import.meta.env.VITE_GOOGLE_SHEET_ID
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY
const SHEET_NAME = import.meta.env.VITE_GOOGLE_SHEET_NAME || 'Trabajos'

// Verificar que las variables de entorno existen
if (!SHEET_ID || !API_KEY) {
  console.error('⚠️ Error: Variables de entorno faltantes')
  console.error('Asegurate de tener un archivo .env con:')
  console.error('VITE_GOOGLE_SHEET_ID=...')
  console.error('VITE_GOOGLE_API_KEY=...')
}

// Props
const props = defineProps({
  maxJobs: {
    type: Number,
    default: null // null = mostrar todos
  }
})

// State
const jobs = ref([])
const loading = ref(true)
const error = ref(false)
const searchQuery = ref('')
const selectedCategory = ref('todas')
const selectedJob = ref(null)

// Categories
const categories = [
  { label: 'Todas', value: 'todas' },
  { label: 'RRHH', value: 'rrhh' },
  { label: 'Gerencia', value: 'gerencia' },
  { label: 'Administración', value: 'administracion' }
]

// Fetch jobs from Google Sheets
const fetchJobs = async () => {
  loading.value = true
  error.value = false

  try {
    // Verificar configuración
    if (!SHEET_ID || !API_KEY) {
      throw new Error('Configuración de Google Sheets faltante')
    }

    // Google Sheets API
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }
    
    const data = await response.json()
    const rows = data.values
    
    // Primera fila son los headers
    const headers = rows[0]
    
    // Convertir rows a objetos
    const jobsList = rows.slice(1).map((row, index) => {
      const job = {}
      headers.forEach((header, i) => {
        job[header] = row[i] || ''
      })
      return {
        id: index + 1,
        ...job
      }
    })
    
    // Filtrar solo trabajos activos
    jobs.value = jobsList.filter(job => 
      job.activo === 'TRUE' || job.activo === true || job.activo === '1'
    )
    
  } catch (err) {
    console.error('Error loading jobs:', err)
    error.value = true
    
    // Fallback: datos de ejemplo
    jobs.value = getFallbackJobs()
  } finally {
    loading.value = false
  }
}

// Fallback jobs si falla la API
const getFallbackJobs = () => [
  {
    id: 1,
    titulo: 'Analista de RRHH Senior',
    empresa: 'Empresa ABC',
    ubicacion: 'Córdoba, Argentina',
    tipo: 'Full-time',
    categoria: 'rrhh',
    salario: '$500,000 - $700,000',
    descripcion: 'Buscamos un Analista de RRHH con experiencia en gestión de talento y desarrollo organizacional.',
    requisitos: '5+ años de experiencia|Licenciatura en RRHH|Excel avanzado|Inglés intermedio',
    contacto: 'rrhh@empresaabc.com',
    fechaPublicacion: '2024-01-15'
  }
]

// Computed
const filteredJobs = computed(() => {
  let filtered = jobs.value

  // Filtrar por categoría
  if (selectedCategory.value !== 'todas') {
    filtered = filtered.filter(job => 
      job.categoria?.toLowerCase() === selectedCategory.value
    )
  }

  // Filtrar por búsqueda
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(job =>
      job.titulo?.toLowerCase().includes(query) ||
      job.empresa?.toLowerCase().includes(query) ||
      job.ubicacion?.toLowerCase().includes(query)
    )
  }

  // Limitar cantidad si está definido
  if (props.maxJobs) {
    filtered = filtered.slice(0, props.maxJobs)
  }

  return filtered
})

// Methods
const truncate = (text, length) => {
  if (!text) return ''
  if (text.length <= length) return text
  return text.substring(0, length) + '...'
}

const formatDate = (dateString) => {
  if (!dateString) return 'Hace poco'
  
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now - date)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return 'Hoy'
  if (diffDays === 1) return 'Ayer'
  if (diffDays < 7) return `Hace ${diffDays} días`
  if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semanas`
  return `Hace ${Math.floor(diffDays / 30)} meses`
}

const parseRequisitos = (requisitosString) => {
  if (!requisitosString) return []
  return requisitosString.split('|').filter(r => r.trim())
}

const openJobModal = (job) => {
  selectedJob.value = job
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  selectedJob.value = null
  document.body.style.overflow = 'auto'
}

const applyToJob = (job) => {
  // Abrir email
  const subject = encodeURIComponent(`Aplicación: ${job.titulo}`)
  const body = encodeURIComponent(`Hola,\n\nEstoy interesado en la posición de ${job.titulo} en ${job.empresa}.\n\nSaludos.`)
  window.location.href = `mailto:${job.contacto}?subject=${subject}&body=${body}`
}

const shareJob = (job) => {
  if (navigator.share) {
    navigator.share({
      title: job.titulo,
      text: `${job.titulo} en ${job.empresa}`,
      url: window.location.href
    })
  } else {
    // Fallback: copiar al clipboard
    const url = window.location.href
    navigator.clipboard.writeText(url)
    alert('¡Link copiado al portapapeles!')
  }
}

// Lifecycle
onMounted(() => {
  fetchJobs()
})
</script>

<style scoped>
.job-board {
  padding: 5rem 0;
  background: #f9fafb;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Header */
.header {
  text-align: center;
  margin-bottom: 3rem;
}

.title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1.125rem;
  color: #6b7280;
}

/* Filters */
.filters {
  margin-bottom: 3rem;
}

.search-box {
  margin-bottom: 1.5rem;
}

.search-input {
  width: 100%;
  padding: 1rem 1.5rem;
  font-size: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.filter-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.filter-btn {
  padding: 0.75rem 1.5rem;
  font-size: 0.9375rem;
  font-weight: 600;
  color: #6b7280;
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-btn:hover {
  border-color: #667eea;
  color: #667eea;
}

.filter-btn.active {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

/* States */
.loading,
.error,
.empty {
  text-align: center;
  padding: 4rem 2rem;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #e5e7eb;
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error {
  color: #ef4444;
}

.empty {
  color: #6b7280;
}

/* Jobs Grid */
.jobs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.job-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.job-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
}

.job-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.job-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0;
}

.job-badge {
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  background: #e0e7ff;
  color: #667eea;
  border-radius: 999px;
  white-space: nowrap;
}

.job-company {
  font-size: 1rem;
  color: #667eea;
  font-weight: 600;
  margin-bottom: 1rem;
}

.job-details {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.detail-item {
  font-size: 0.875rem;
  color: #6b7280;
}

.job-description {
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex: 1;
}

.job-button {
  padding: 0.75rem 1.5rem;
  font-size: 0.9375rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.job-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
}

.modal-content {
  background: white;
  border-radius: 16px;
  max-width: 700px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.modal-close {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: #f3f4f6;
  color: #6b7280;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-close:hover {
  background: #e5e7eb;
  color: #1a202c;
}

.modal-header {
  padding: 2rem 2rem 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.modal-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 0.5rem;
  padding-right: 3rem;
}

.modal-body {
  padding: 2rem;
}

.job-meta {
  background: #f9fafb;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.job-meta p {
  margin: 0.5rem 0;
  color: #4b5563;
}

.job-section {
  margin-bottom: 2rem;
}

.job-section h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 1rem;
}

.job-section p {
  color: #4b5563;
  line-height: 1.8;
}

.requisitos-list {
  list-style: none;
  padding: 0;
}

.requisitos-list li {
  padding: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;
  color: #4b5563;
}

.requisitos-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #667eea;
  font-weight: bold;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
}

.apply-button,
.share-button {
  flex: 1;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.apply-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.apply-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.share-button {
  background: #f3f4f6;
  color: #4b5563;
}

.share-button:hover {
  background: #e5e7eb;
}

/* Modal Animation */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: transform 0.3s ease;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.9);
}

/* Responsive */
@media (max-width: 768px) {
  .jobs-grid {
    grid-template-columns: 1fr;
  }

  .title {
    font-size: 2rem;
  }

  .filter-buttons {
    flex-direction: column;
  }

  .filter-btn {
    width: 100%;
  }

  .job-details {
    flex-direction: column;
    gap: 0.5rem;
  }

  .modal-content {
    margin: 0;
    border-radius: 16px 16px 0 0;
  }

  .modal-actions {
    flex-direction: column;
  }
}
</style>