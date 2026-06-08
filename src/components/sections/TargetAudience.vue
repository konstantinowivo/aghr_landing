<template>
  <div class="services-page">

    <!-- EMPRESAS -->
    <section class="services-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Soluciones para Empresas</h2>
          <p class="section-subtitle">
            Optimizamos la gestión del talento con estrategias a medida que impulsan el crecimiento de tu organización
          </p>
        </div>

        <div v-if="loading" class="loading-state">Cargando servicios...</div>
        <div v-else-if="empresasServices.length === 0" class="empty-state">Próximamente</div>
        <div v-else class="services-grid">
          <div
            v-for="service in empresasServices"
            :key="service.id"
            class="service-card"
          >
            <div class="card-image">
              <img
                v-if="service.image_url"
                :src="service.image_url"
                :alt="service.title"
              />
              <div v-else class="card-image-placeholder">
                <img
                  v-if="service.icon_url"
                  :src="service.icon_url"
                  :alt="service.title"
                  class="icon-fallback"
                />
              </div>
            </div>
            <div class="card-body">
              <h4 class="service-title">{{ service.title }}</h4>
              <p class="service-description">{{ service.description }}</p>
              <div class="card-footer">
                <span class="service-price">{{ formatPrice(service.price) }}</span>
                <button
                  :class="['btn-cart', { 'btn-cart--added': isInCart(service.id) }]"
                  @click="toggleCart(service)"
                >
                  {{ isInCart(service.id) ? 'En el carrito' : 'Agregar' }}
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- PERSONAS -->
    <section class="services-section services-section--alt">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Desarrollo para Profesionales</h2>
          <p class="section-subtitle">
            Impulsamos tu crecimiento profesional con herramientas y estrategias que te llevan al siguiente nivel
          </p>
        </div>

        <div v-if="loading" class="loading-state">Cargando servicios...</div>
        <div v-else-if="personasServices.length === 0" class="empty-state">Próximamente</div>
        <div v-else class="services-grid">
          <div
            v-for="service in personasServices"
            :key="service.id"
            class="service-card"
          >
            <div class="card-image">
              <img
                v-if="service.image_url"
                :src="service.image_url"
                :alt="service.title"
              />
              <div v-else class="card-image-placeholder">
                <img
                  v-if="service.icon_url"
                  :src="service.icon_url"
                  :alt="service.title"
                  class="icon-fallback"
                />
              </div>
            </div>
            <div class="card-body">
              <h4 class="service-title">{{ service.title }}</h4>
              <p class="service-description">{{ service.description }}</p>
              <div class="card-footer">
                <span class="service-price">{{ formatPrice(service.price) }}</span>
                <button
                  :class="['btn-cart', { 'btn-cart--added': isInCart(service.id) }]"
                  @click="toggleCart(service)"
                >
                  {{ isInCart(service.id) ? 'En el carrito' : 'Agregar' }}
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { servicesService } from '@/services/servicesService'
import { useCart } from '@/composables/useCart'

const { addItem, removeItem, isInCart, openCart } = useCart()

const allServices = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    allServices.value = await servicesService.getAll()
  } catch (err) {
    console.error('Error cargando servicios:', err)
  } finally {
    loading.value = false
  }
})

const empresasServices = computed(() => allServices.value.filter(s => s.type === 'empresa'))
const personasServices = computed(() => allServices.value.filter(s => s.type === 'persona'))

const formatPrice = (price) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(price || 0)

const toggleCart = (service) => {
  if (isInCart(service.id)) {
    removeItem(service.id)
  } else {
    addItem(service)
    openCart()
  }
}
</script>

<style scoped>
.services-page {
  width: 100%;
}

/* Sections */
.services-section {
  padding: 6rem 0;
  background: linear-gradient(180deg, #FFFFFF 0%, #F9FAFB 100%);
}

.services-section--alt {
  background: linear-gradient(180deg, #F9FAFB 0%, #FFFFFF 100%);
  border-top: 1px solid #F3F4F6;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Section Header */
.section-header {
  text-align: center;
  margin-bottom: 3.5rem;
}

.section-title {
  font-family: 'Garamond', serif;
  font-size: clamp(2.2rem, 4.5vw, 3rem);
  font-weight: bold;
  color: var(--color-text-primary);
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.section-subtitle {
  font-family: var(--font-family-primary);
  font-size: clamp(1.05rem, 2vw, 1.25rem);
  color: var(--color-text-secondary);
  max-width: 640px;
  margin: 0 auto;
  line-height: 1.7;
}

/* Grid */
.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.75rem;
  margin-bottom: 3.5rem;
}

/* Card */
.service-card {
  background: white;
  border-radius: 1.25rem;
  border: 1.5px solid #F3F4F6;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  overflow: hidden;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
  display: flex;
  flex-direction: column;
}

.service-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 40px rgba(0,0,0,0.1);
  border-color: var(--color-primary);
}

/* Card Image */
.card-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: #F3F4F6;
  flex-shrink: 0;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.35s ease;
}

.service-card:hover .card-image img {
  transform: scale(1.04);
}

.card-image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #F3F4F6;
}

.icon-fallback {
  width: 72px;
  height: 72px;
  object-fit: cover;
  border-radius: 50%;
  opacity: 0.6;
}

/* Card Body */
.card-body {
  padding: 1.75rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.service-title {
  font-family: 'Garamond', serif;
  font-size: 1.35rem;
  font-weight: bold;
  color: var(--color-text-primary);
  margin-bottom: 0.75rem;
  letter-spacing: -0.01em;
}

.service-description {
  font-family: var(--font-family-primary);
  font-size: 1rem;
  color: var(--color-text-secondary);
  line-height: 1.65;
  flex: 1;
  margin-bottom: 1.25rem;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-top: auto;
}

.service-price {
  font-family: 'Garamond', serif;
  font-size: 1.35rem;
  font-weight: bold;
  color: var(--color-text-primary);
  letter-spacing: -0.02em;
  white-space: nowrap;
}

.btn-cart {
  font-family: var(--font-family-primary);
  padding: 0.5rem 1.25rem;
  font-size: 0.9rem;
  font-weight: 600;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 0.625rem;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  flex-shrink: 0;
}

.btn-cart:hover {
  opacity: 0.88;
  transform: translateY(-1px);
}

.btn-cart--added {
  background: #E5E7EB;
  color: var(--color-text-secondary);
}

.btn-cart--added:hover {
  background: #FEE2E2;
  color: #EF4444;
  opacity: 1;
  transform: none;
}


/* States */
.loading-state,
.empty-state {
  text-align: center;
  padding: 3rem;
  color: var(--color-text-secondary);
  font-family: var(--font-family-primary);
  font-size: 1.1rem;
  margin-bottom: 3.5rem;
}

/* Responsive */
@media (max-width: 1024px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .services-section {
    padding: 4rem 0;
  }

  .services-grid {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }

  .card-image {
    height: 180px;
  }

  .card-body {
    padding: 1.25rem;
  }

  .cta-section {
    padding: 2rem 1.5rem;
  }
}

@media (max-width: 480px) {
  .services-section {
    padding: 3rem 0;
  }

  .card-image {
    height: 160px;
  }
}
</style>
