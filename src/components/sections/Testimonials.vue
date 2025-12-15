<template>
  <section class="testimonials">
    <div class="container">
      <!-- Header -->
      <div class="header">
        <h2 class="title">Lo que dicen nuestros clientes</h2>
        <p class="subtitle">Historias reales de transformación profesional y organizacional</p>
      </div>

      <!-- Testimonials Grid -->
      <div class="testimonials-grid">
        <div 
          v-for="(testimonial, index) in testimonials" 
          :key="index"
          class="testimonial-card"
          :class="{ 'testimonial-card--featured': testimonial.featured }"
        >
          <!-- Quote Icon -->
          <div class="quote-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
            </svg>
          </div>

          <!-- Testimonial Content -->
          <p class="testimonial-text">{{ testimonial.text }}</p>

          <!-- Author Info -->
          <div class="author-info">
            <div class="author-avatar">
              <img 
                v-if="testimonial.avatar"
                :src="testimonial.avatar" 
                :alt="testimonial.author"
                class="avatar-image"
              >
              <div v-else class="avatar-placeholder">
                {{ getInitials(testimonial.author) }}
              </div>
            </div>
            
            <div class="author-details">
              <p class="author-name">{{ testimonial.author }}</p>
              <p class="author-position">{{ testimonial.position }}</p>
              <p v-if="testimonial.company" class="author-company">{{ testimonial.company }}</p>
            </div>
          </div>

          <!-- Rating -->
          <div class="rating">
            <span 
              v-for="star in 5" 
              :key="star"
              class="star"
              :class="{ 'star--filled': star <= testimonial.rating }"
            >
              ★
            </span>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="testimonials-cta">
        <h3 class="cta-title">¿Querés ser parte de estas historias de éxito?</h3>
        <p class="cta-description">Contáctanos hoy y comencemos tu transformación profesional</p>
        <slot name="cta">
          <button class="cta-button" @click="handleCtaClick">
            Agendá tu primera reunión
          </button>
        </slot>
      </div>
    </div>
  </section>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue'

const props = defineProps({
  testimonials: {
    type: Array,
    default: () => [
      {
        text: 'El proceso de mentoring con AGHR fue transformador. En 6 meses logré un ascenso que venía buscando hace años. Andrea me ayudó a identificar mis fortalezas y a comunicar mi valor de manera efectiva.',
        author: 'María González',
        position: 'Gerente de Marketing',
        company: 'Tech Solutions SA',
        avatar: '',
        rating: 5,
        featured: true
      },
      {
        text: 'Contraté AGHR para optimizar nuestros procesos de selección y el resultado superó nuestras expectativas. Redujimos el tiempo de contratación en un 40% y mejoramos significativamente la calidad de los candidatos.',
        author: 'Carlos Martínez',
        position: 'CEO',
        company: 'Startup Innovation',
        avatar: '',
        rating: 5,
        featured: false
      },
      {
        text: 'El training de team building que diseñaron para nuestro equipo fue excepcional. Logramos mejorar la comunicación interna y aumentar la productividad de manera notable.',
        author: 'Laura Fernández',
        position: 'Directora de RH',
        company: 'Corporación ABC',
        avatar: '',
        rating: 5,
        featured: false
      }
    ]
  },
  // Acción del CTA: 'scroll' para desplazarse a una sección, 'url' para abrir un enlace
  ctaAction: {
    type: String,
    default: 'scroll',
    validator: (value) => ['scroll', 'url'].includes(value)
  },
  // Selector del elemento al que hacer scroll (por defecto, sección de contacto)
  ctaScroll: {
    type: String,
    default: '#contact'
  },
  // URL a abrir si ctaAction es 'url'
  ctaUrl: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['cta-click'])

const getInitials = (name) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

// Manejador de acciones CTA
const handleCtaClick = () => {
  // Emitir evento para tracking/analytics
  emit('cta-click')
  
  // Ejecutar la acción configurada
  if (props.ctaAction === 'scroll') {
    setTimeout(() => {
      const element = document.querySelector(props.ctaScroll)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else {
        console.warn(`Elemento no encontrado: ${props.ctaScroll}`)
      }
    }, 100)
  } 
  else if (props.ctaAction === 'url' && props.ctaUrl) {
    window.open(props.ctaUrl, '_blank')
  }
}
</script>

<style scoped>
.testimonials {
  padding: 5rem 0;
  background: #ffffff;
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
  animation: fadeInDown 1s ease-out;
}

.title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 1rem;
  letter-spacing: -0.025em;
}

.subtitle {
  font-size: 1.125rem;
  color: #4a5568;
  max-width: 600px;
  margin: 0 auto;
}

/* Testimonials Grid */
.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 4rem;
  animation: fadeInUp 1s ease-out 0.2s both;
}

.testimonial-card {
  background: white;
  padding: 2.5rem;
  border-radius: 1.25rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 2px solid #f0f4ff;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.testimonial-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(85, 104, 211, 0.15);
  border-color: #5568D3;
}

.testimonial-card--featured {
  border-color: #5568D3;
  background: linear-gradient(135deg, rgba(85, 104, 211, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%);
  box-shadow: 0 8px 30px rgba(85, 104, 211, 0.12);
}

.testimonial-card--featured:hover {
  box-shadow: 0 12px 50px rgba(85, 104, 211, 0.25);
}

/* Quote Icon */
.quote-icon {
  color: #5568D3;
  opacity: 0.4;
  margin-bottom: 1.5rem;
  transition: opacity 0.3s ease;
}

.testimonial-card:hover .quote-icon {
  opacity: 0.6;
}

/* Testimonial Text */
.testimonial-text {
  color: #2d3748;
  line-height: 1.8;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  flex-grow: 1;
  font-style: italic;
  font-weight: 500;
}

/* Author Info */
.author-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #f0f4ff;
}

.author-avatar {
  flex-shrink: 0;
}

.avatar-image {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #5568D3;
  transition: transform 0.3s ease;
}

.testimonial-card:hover .avatar-image {
  transform: scale(1.08);
}

.avatar-placeholder {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, #5568D3 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.25rem;
  flex-shrink: 0;
}

.author-details {
  flex-grow: 1;
}

.author-name {
  font-size: 1.0625rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 0.25rem 0;
}

.author-position {
  font-size: 0.875rem;
  color: #5568D3;
  font-weight: 600;
  margin: 0;
}

.author-company {
  font-size: 0.8125rem;
  color: #718096;
  margin: 0.25rem 0 0 0;
}

/* Rating */
.rating {
  display: flex;
  gap: 0.25rem;
}

.star {
  color: #e2e8f0;
  font-size: 1.25rem;
  transition: color 0.2s ease;
}

.star--filled {
  color: #fbbf24;
}

/* CTA Section */
.testimonials-cta {
  text-align: center;
  padding: 3.5rem 3rem;
  background: linear-gradient(135deg, #5568D3 0%, #764ba2 100%);
  border-radius: 1.5rem;
  margin-top: 3rem;
  animation: fadeInUp 1s ease-out 0.4s both;
}

.cta-title {
  font-size: 2rem;
  font-weight: 700;
  color: white;
  margin: 0 0 0.75rem 0;
  letter-spacing: -0.025em;
}

.cta-description {
  font-size: 1.0625rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 1.5rem 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.cta-button {
  background: white;
  color: #5568D3;
  padding: 1rem 2.5rem;
  border-radius: 0.75rem;
  font-size: 1rem;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  letter-spacing: 0.025em;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.cta-button:active {
  transform: translateY(0);
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

/* Responsive */
@media (max-width: 1024px) {
  .testimonials-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .testimonials {
    padding: 3rem 0;
  }

  .title {
    font-size: 2rem;
  }

  .testimonials-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .testimonial-card {
    padding: 2rem;
  }

  .cta-title {
    font-size: 1.5rem;
  }

  .cta-description {
    font-size: 1rem;
  }

  .testimonials-cta {
    padding: 2.5rem 1.5rem;
  }
}

@media (max-width: 480px) {
  .testimonials {
    padding: 2rem 0;
  }

  .title {
    font-size: 1.75rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .testimonial-card {
    padding: 1.5rem;
  }

  .author-info {
    gap: 0.75rem;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
  }

  .avatar-placeholder {
    width: 48px;
    height: 48px;
    font-size: 1rem;
  }

  .avatar-image {
    width: 48px;
    height: 48px;
  }

  .author-name {
    font-size: 1rem;
  }

  .testimonial-text {
    font-size: 0.9375rem;
  }

  .cta-title {
    font-size: 1.375rem;
    margin-bottom: 1rem;
  }

  .cta-button {
    width: 100%;
    padding: 0.875rem 1.5rem;
  }
}
</style>