<template>
  <div>

    <!-- Main Content Section -->
    <section class="job-board">
      <div class="container">
        <!-- Header -->
        <div class="job-board-header">
          <h2 class="section-title">Propuestas Laborales</h2>
          <p class="section-subtitle">
            Explorá las oportunidades disponibles y encontrá el trabajo ideal para vos
          </p>
        </div>

      <!-- Filters & Search -->
      <div class="filters-container">
        <!-- Category Filters -->
        <div class="category-filters">
          <button
            v-for="category in categories"
            :key="category.value"
            @click="selectedCategory = category.value"
            :class="['filter-btn', { 'filter-btn--active': selectedCategory === category.value }]"
          >
            {{ category.label }}
          </button>
        </div>

        <!-- Search Box -->
        <div class="search-box">
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Buscar por título, empresa o ubicación..."
            class="search-input"
          />
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Cargando propuestas laborales...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="error-state">
        <svg class="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <h3>Error al cargar las propuestas</h3>
        <p>{{ error }}</p>
        <button @click="fetchJobs" class="retry-btn">Reintentar</button>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredJobs.length === 0" class="empty-state">
        <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        </svg>
        <h3>No se encontraron propuestas</h3>
        <p>Intentá con otros filtros o búsqueda</p>
      </div>

      <!-- Jobs Grid -->
      <div v-else class="jobs-grid">
        <article
          v-for="job in displayedJobs"
          :key="job.id"
          class="job-card"
          @click="openJobModal(job)"
        >
          <!-- Job Header -->
          <div class="job-card-header">
            <h3 class="job-title">{{ job.title }}</h3>
            <span :class="['job-badge', `job-badge--${getCategoryClass(job.category)}`]">
              {{ job.category }}
            </span>
          </div>

          <!-- Company & Location -->
          <div class="job-meta">
            <div class="job-meta-item">
              <svg class="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              </svg>
              <span>{{ job.company }}</span>
            </div>
            <div class="job-meta-item">
              <svg class="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>{{ job.location }}</span>
            </div>
          </div>

          <!-- Description Preview -->
          <p class="job-description">
            {{ truncateText(job.description, 120) }}
          </p>

          <!-- Job Footer -->
          <div class="job-card-footer">
            <span class="job-type">{{ job.type }}</span>
            <span class="job-date">{{ formatDate(job.published_at) }}</span>
          </div>
        </article>
      </div>

      <!-- Load More Button -->
      <div v-if="hasMoreJobs" class="load-more-container">
        <button @click="loadMore" class="load-more-btn">
          Ver más propuestas
        </button>
      </div>
    </div>

    <!-- Job Details Modal -->
    <Transition name="modal">
      <div v-if="selectedJob" class="modal-overlay" @click="closeJobModal">
        <div class="modal-content" @click.stop>
          <!-- Modal Header -->
          <div class="modal-header">
            <div>
              <h2 class="modal-title">{{ selectedJob.title }}</h2>
              <p class="modal-company">{{ selectedJob.company }}</p>
            </div>
            <button @click="closeJobModal" class="modal-close">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <!-- Modal Body -->
          <div class="modal-body">
            <!-- Job Meta -->
            <div class="modal-meta">
              <div class="modal-meta-item">
                <svg class="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>{{ selectedJob.location }}</span>
              </div>
              <div class="modal-meta-item">
                <svg class="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
                <span>{{ selectedJob.type }}</span>
              </div>
              <div class="modal-meta-item">
                <svg class="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>{{ formatDate(selectedJob.published_at) }}</span>
              </div>
            </div>

            <!-- Job Description -->
            <div class="modal-section">
              <h3 class="modal-section-title">Descripción</h3>
              <p class="modal-text">{{ selectedJob.description }}</p>
            </div>

            <!-- Requirements -->
            <div v-if="selectedJob.requirements" class="modal-section">
              <h3 class="modal-section-title">Requisitos</h3>
              <ul class="modal-list">
                <li v-for="(req, index) in parseList(selectedJob.requirements)" :key="index">
                  {{ req }}
                </li>
              </ul>
            </div>

            <!-- Benefits -->
            <div v-if="selectedJob.benefits" class="modal-section">
              <h3 class="modal-section-title">Beneficios</h3>
              <ul class="modal-list">
                <li v-for="(benefit, index) in parseList(selectedJob.benefits)" :key="index">
                  {{ benefit }}
                </li>
              </ul>
            </div>
          </div>

          <!-- Modal Footer - Formulario o Botones -->
          <div v-if="!showApplicationForm" class="modal-footer">
            <button @click="applyToJob(selectedJob)" class="btn btn-primary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              Aplicar a esta posición
            </button>
            <button @click="shareJob(selectedJob)" class="btn btn-secondary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
              </svg>
              Compartir
            </button>
          </div>

          <!-- Application Form -->
          <div v-else class="application-form">
            <div v-if="applicationSuccess" class="success-message">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <h3>¡Aplicación enviada!</h3>
              <p>Tu aplicación ha sido enviada exitosamente. Te contactaremos pronto.</p>
            </div>

            <div v-else>
              <h3 class="form-title">Aplicar a {{ selectedJob.title }}</h3>
              <p class="form-subtitle">Completa el formulario para enviar tu aplicación</p>

              <div class="form-group">
                <label class="form-label">Nombre completo *</label>
                <input
                  v-model="applicationForm.name"
                  type="text"
                  class="form-input"
                  placeholder="Ej: Juan Pérez"
                  required
                />
              </div>

              <div class="form-group">
                <label class="form-label">Email *</label>
                <input
                  v-model="applicationForm.email"
                  type="email"
                  class="form-input"
                  placeholder="tu@email.com"
                  required
                />
              </div>

              <div class="form-group">
                <label class="form-label">Teléfono</label>
                <input
                  v-model="applicationForm.phone"
                  type="tel"
                  class="form-input"
                  placeholder="+54 9 11 1234-5678"
                />
              </div>

              <div class="form-group">
                <label class="form-label">CV (PDF o Word) *</label>
                <div class="file-input-wrapper">
                  <input
                    type="file"
                    @change="handleFileUpload"
                    accept=".pdf,.doc,.docx"
                    class="file-input"
                    id="cv-upload"
                  />
                  <label for="cv-upload" class="file-input-label">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                    {{ applicationForm.cv ? applicationForm.cv.name : 'Seleccionar archivo' }}
                  </label>
                </div>
                <small class="form-hint">Máximo 5MB - PDF, DOC o DOCX</small>
              </div>

              <div class="form-group">
                <label class="form-label">Mensaje (opcional)</label>
                <textarea
                  v-model="applicationForm.message"
                  class="form-textarea"
                  placeholder="Cuéntanos por qué eres el candidato ideal para esta posición..."
                  rows="4"
                ></textarea>
              </div>

              <div class="form-actions">
                <button
                  @click="closeApplicationForm"
                  class="btn btn-secondary"
                  :disabled="applicationLoading"
                >
                  Cancelar
                </button>
                <button
                  @click="submitApplication"
                  class="btn btn-primary"
                  :disabled="applicationLoading"
                >
                  <span v-if="applicationLoading">Enviando...</span>
                  <span v-else>Enviar aplicación</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { sendJobApplication } from '@/services/emailService'
import { jobsService } from '@/services/jobsService'

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
const error = ref(null)
const selectedCategory = ref('todas')
const searchQuery = ref('')
const selectedJob = ref(null)
const displayLimit = ref(6)
const showApplicationForm = ref(false)
const applicationForm = ref({
  name: '',
  email: '',
  phone: '',
  cv: null,
  message: ''
})
const applicationLoading = ref(false)
const applicationSuccess = ref(false)

// Categories
const categories = [
  { label: 'Todas', value: 'todas' },
  { label: 'RRHH', value: 'rrhh' },
  { label: 'Gerencia', value: 'gerencia' },
  { label: 'Administración', value: 'administracion' }
]

// Fetch jobs from Supabase
const fetchJobs = async () => {
  loading.value = true
  error.value = null
  try {
    jobs.value = await jobsService.getPublished()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

// Computed
const filteredJobs = computed(() => {
  let filtered = jobs.value

  // Filter by category
  if (selectedCategory.value !== 'todas') {
    filtered = filtered.filter(job =>
      job.category.toLowerCase() === selectedCategory.value.toLowerCase()
    )
  }

  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(job =>
      job.title.toLowerCase().includes(query) ||
      job.company.toLowerCase().includes(query) ||
      job.location.toLowerCase().includes(query) ||
      job.description.toLowerCase().includes(query)
    )
  }

  return filtered
})

const displayedJobs = computed(() => {
  const limit = props.maxJobs || displayLimit.value
  return filteredJobs.value.slice(0, limit)
})

const hasMoreJobs = computed(() => {
  if (props.maxJobs) return false
  return filteredJobs.value.length > displayLimit.value
})

// Methods
const getCategoryClass = (category) => {
  const map = {
    rrhh: 'rrhh',
    gerencia: 'gerencia',
    administracion: 'admin',
    general: 'general'
  }
  return map[category.toLowerCase()] || 'general'
}

const truncateText = (text, length) => {
  if (text.length <= length) return text
  return text.substring(0, length) + '...'
}

const formatDate = (dateString) => {
  try {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Hoy'
    if (diffDays === 1) return 'Ayer'
    if (diffDays < 7) return `Hace ${diffDays} días`
    if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semanas`
    return `Hace ${Math.floor(diffDays / 30)} meses`
  } catch {
    return 'Recientemente'
  }
}

const parseList = (text) => {
  if (!text) return []
  return text.split('\n').filter(item => item.trim())
}

const loadMore = () => {
  displayLimit.value += 6
}

const openJobModal = (job) => {
  selectedJob.value = job
  document.body.style.overflow = 'hidden'
}

const closeJobModal = () => {
  selectedJob.value = null
  document.body.style.overflow = ''
}

const applyToJob = (job) => {
  showApplicationForm.value = true
  applicationSuccess.value = false
}

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    // Validar tamaño (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('El archivo es muy grande. Máximo 5MB.')
      event.target.value = ''
      return
    }
    // Validar tipo
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (!validTypes.includes(file.type)) {
      alert('Formato no válido. Solo se permiten archivos PDF o Word.')
      event.target.value = ''
      return
    }
    applicationForm.value.cv = file
  }
}

const submitApplication = async () => {
  // Validar formulario
  if (!applicationForm.value.name || !applicationForm.value.email || !applicationForm.value.cv) {
    alert('Por favor, completa todos los campos obligatorios.')
    return
  }

  // Validar email básico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(applicationForm.value.email)) {
    alert('Por favor, ingresa un email válido.')
    return
  }

  applicationLoading.value = true

  try {
    // Usar el servicio de email (EmailJS o Backend)
    const result = await sendJobApplication(
      {
        name: applicationForm.value.name,
        email: applicationForm.value.email,
        phone: applicationForm.value.phone,
        cv: applicationForm.value.cv,
        message: applicationForm.value.message
      },
      {
        title: selectedJob.value.title,
        company: selectedJob.value.company
      }
    )

    // Mostrar éxito
    applicationSuccess.value = true

    // Si es fallback (mailto), mostrar mensaje diferente
    if (result.fallback) {
      alert(result.message)
    }

    // Resetear formulario después de 2 segundos
    setTimeout(() => {
      resetApplicationForm()
    }, 2000)

  } catch (error) {
    alert(error.message || 'Hubo un error al enviar tu aplicación. Por favor, intenta nuevamente.')
    console.error('Error al enviar aplicación:', error)
  } finally {
    applicationLoading.value = false
  }
}

const resetApplicationForm = () => {
  applicationForm.value = {
    name: '',
    email: '',
    phone: '',
    cv: null,
    message: ''
  }
  showApplicationForm.value = false
}

const closeApplicationForm = () => {
  if (!applicationLoading.value) {
    resetApplicationForm()
  }
}

const shareJob = (job) => {
  if (navigator.share) {
    navigator.share({
      title: job.title,
      text: `${job.title} en ${job.company}`,
      url: window.location.href
    })
  } else {
    // Fallback: copy to clipboard
    const url = window.location.href
    navigator.clipboard.writeText(url)
    alert('Link copiado al portapapeles')
  }
}

// Lifecycle
onMounted(() => {
  fetchJobs()
})
</script>

<style scoped>
/* ============================================
   Modern Corporate Job Board Section
   ============================================ */

.job-board {
  margin-top: 10vh;
  padding: 6rem 0;
  background: linear-gradient(180deg, #FFFFFF 0%, #F9FAFB 50%, #FAFBFC 100%);
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Header */
.job-board-header {
  text-align: center;
  margin-bottom: 4rem;
  animation: fadeInDown 0.8s ease-out;
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
  font-weight: 500;
  line-height: 1.7;
  max-width: 700px;
  margin: 0 auto;
}

/* Filters */
.filters-container {
  margin-bottom: 3rem;
}

.category-filters {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

.filter-btn {
  padding: 0.625rem 1.5rem;
  font-size: 0.9375rem;
  font-weight: 500;
  color: #6b7280;
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-btn:hover {
  border-color: #5568D3;
  color: #5568D3;
}

.filter-btn--active {
  background: linear-gradient(135deg, #5568D3 0%, #764ba2 100%);
  color: white;
  border-color: transparent;
}

/* Search */
.search-box {
  max-width: 600px;
  margin: 0 auto;
  position: relative;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: #9ca3af;
  stroke-width: 2;
}

.search-input {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  font-size: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  transition: border-color 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #5568D3;
}

/* States */
.loading-state,
.error-state,
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid #e5e7eb;
  border-top-color: #5568D3;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-icon,
.empty-icon {
  width: 64px;
  height: 64px;
  color: #9ca3af;
  stroke-width: 2;
  margin: 0 auto 1rem;
}

.retry-btn {
  margin-top: 1rem;
  padding: 0.75rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  background: #5568D3;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

/* Jobs Grid */
.jobs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

/* Job Card */
.job-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.job-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  border-color: #5568D3;
}

.job-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
}

.job-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  line-height: 1.4;
}

.job-badge {
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  border-radius: 6px;
  flex-shrink: 0;
}

.job-badge--rrhh {
  background: #dbeafe;
  color: #1e40af;
}

.job-badge--gerencia {
  background: #fce7f3;
  color: #be123c;
}

.job-badge--admin {
  background: #d1fae5;
  color: #065f46;
}

.job-badge--general {
  background: #f3f4f6;
  color: #374151;
}

.job-meta {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.job-meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.875rem;
}

.meta-icon {
  width: 16px;
  height: 16px;
  stroke-width: 2;
}

.job-description {
  color: #4b5563;
  font-size: 1.125rem;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.job-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
}

.job-type {
  font-size: 0.875rem;
  font-weight: 500;
  color: #5568D3;
}

.job-date {
  font-size: 0.875rem;
  color: #9ca3af;
}

/* Load More */
.load-more-container {
  text-align: center;
}

.load-more-btn {
  padding: 0.875rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  color: #5568D3;
  background: white;
  border: 2px solid #5568D3;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.load-more-btn:hover {
  background: #5568D3;
  color: white;
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
  backdrop-filter: blur(4px);
}

.modal-content {
  background: white;
  border-radius: 20px;
  width: 100%;
  max-width: 700px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
  padding: 2rem;
  border-bottom: 1px solid #e5e7eb;
}

.modal-title {
  font-family: 'Garamond', serif;
  font-size: 2.1rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 0.5rem;
}

.modal-company {
  font-size: 1.125rem;
  color: #6b7280;
}

.modal-close {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: #f3f4f6;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.modal-close:hover {
  background: #e5e7eb;
}

.modal-close svg {
  width: 20px;
  height: 20px;
  stroke-width: 2;
}

.modal-body {
  padding: 2rem;
}

.modal-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e5e7eb;
}

.modal-meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.9375rem;
}

.modal-section {
  margin-bottom: 2rem;
}

.modal-section-title {
  font-family: 'Garamond', serif;
  font-size: 1.5rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 1rem;
}

.modal-text {
  color: #4b5563;
  line-height: 1.7;
  font-size: 1.125rem;
}

.modal-list {
  list-style: none;
  padding: 0;
}

.modal-list li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.75rem;
  color: #4b5563;
  line-height: 1.6;
}

.modal-list li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #5568D3;
  font-weight: 700;
}

.modal-footer {
  display: flex;
  gap: 1rem;
  padding: 2rem;
  border-top: 1px solid #e5e7eb;
}

.btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn svg {
  width: 20px;
  height: 20px;
  stroke-width: 2;
}

.btn-primary {
  color: white;
  background: linear-gradient(135deg, #5568D3 0%, #764ba2 100%);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(85, 104, 211, 0.4);
}

.btn-secondary {
  color: #5568D3;
  background: white;
  border: 2px solid #5568D3;
}

.btn-secondary:hover {
  background: #f3f4f6;
}

/* Modal Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: transform 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.95);
}

/* Responsive */
@media (max-width: 768px) {
  .job-board {
    padding: 3rem 0;
  }

  .section-title {
    font-size: 2rem;
  }

  .jobs-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .modal-content {
    max-height: 95vh;
  }

  .modal-header {
    padding: 1.5rem;
  }

  .modal-body {
    padding: 1.5rem;
  }

  .modal-footer {
    flex-direction: column;
    padding: 1.5rem;
  }

  .modal-title {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 1.75rem;
  }

  .category-filters {
    gap: 0.5rem;
  }

  .filter-btn {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }
}

/* Hero Búsquedas Section */
.hero-busquedas {
  position: relative;
  background: linear-gradient(135deg, #EE6729 0%, #C0050A 100%);
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

  .hero-busquedas {
    padding: 3rem 0;
  }
}

/* Application Form Styles */
.application-form {
  padding: 2rem;
  border-top: 1px solid #e5e7eb;
}

.success-message {
  text-align: center;
  padding: 3rem 2rem;
}

.success-message svg {
  width: 64px;
  height: 64px;
  color: #10b981;
  stroke-width: 2;
  margin: 0 auto 1rem;
}

.success-message h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.5rem;
}

.success-message p {
  color: #6b7280;
  font-size: 1rem;
}

.form-title {
  font-family: 'Garamond', serif;
  font-size: 1.8rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 0.5rem;
}

.form-subtitle {
  color: #6b7280;
  font-size: 0.9375rem;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  transition: border-color 0.3s ease;
  font-family: inherit;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #5568D3;
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.file-input-wrapper {
  position: relative;
}

.file-input {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.file-input-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  font-size: 0.9375rem;
  font-weight: 500;
  color: #6b7280;
  background: #f9fafb;
  border: 2px dashed #d1d5db;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.file-input-label:hover {
  border-color: #5568D3;
  background: #f3f4f6;
}

.file-input-label svg {
  width: 20px;
  height: 20px;
  stroke-width: 2;
  flex-shrink: 0;
}

.form-hint {
  display: block;
  margin-top: 0.5rem;
  font-size: 0.8125rem;
  color: #9ca3af;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.form-actions .btn {
  flex: 1;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .application-form {
    padding: 1.5rem;
  }

  .form-title {
    font-size: 1.25rem;
  }

  .form-actions {
    flex-direction: column;
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
</style>