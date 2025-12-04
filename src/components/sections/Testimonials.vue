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
              <h4 class="author-name">{{ testimonial.author }}</h4>
              <p class="author-position">{{ testimonial.position }}</p>
              <p v-if="testimonial.company" class="author-company">{{ testimonial.company }}</p>
            </div>
          </div>

          <!-- Rating (optional) -->
          <div v-if="testimonial.rating" class="rating">
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
        <slot name="cta">
          <button class="cta-button">
            Agendá tu primera reunión
          </button>
        </slot>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';

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
      },
      {
        text: 'Como freelancer, el programa de marca personal me ayudó a posicionarme como experto en mi industria. Ahora tengo más clientes y mejores proyectos.',
        author: 'Javier Ruiz',
        position: 'Consultor Independiente',
        company: '',
        avatar: '',
        rating: 5,
        featured: false
      },
      {
        text: 'El Staff Selection Training me dio las herramientas que necesitaba para hacer la transición a recursos humanos. Hoy trabajo en una empresa multinacional gracias a lo que aprendí.',
        author: 'Sofía Morales',
        position: 'HR Business Partner',
        company: 'Global Corp',
        avatar: '',
        rating: 5,
        featured: false
      }
    ]
  }
});

const getInitials = (name) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};
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

/* Testimonials Grid */
.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.testimonial-card {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 2px solid #f7fafc;
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  flex-direction: column;
}

.testimonial-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.12);
  border-color: #667eea;
}

.testimonial-card--featured {
  border-color: #667eea;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
}

/* Quote Icon */
.quote-icon {
  color: #667eea;
  opacity: 0.3;
  margin-bottom: 1rem;
}

/* Testimonial Text */
.testimonial-text {
  color: #2d3748;
  line-height: 1.8;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  flex-grow: 1;
  font-style: italic;
}

/* Author Info */
.author-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.author-avatar {
  flex-shrink: 0;
}

.avatar-image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #667eea;
}

.avatar-placeholder {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.125rem;
}

.author-details {
  flex-grow: 1;
}

.author-name {
  font-size: 1rem;
  font-weight: 700;
  color: #2d3748;
  margin: 0 0 0.25rem 0;
}

.author-position {
  font-size: 0.875rem;
  color: #667eea;
  font-weight: 600;
  margin: 0;
}

.author-company {
  font-size: 0.8rem;
  color: #718096;
  margin: 0.25rem 0 0 0;
}

/* Rating */
.rating {
  display: flex;
  gap: 0.25rem;
  margin-top: 1rem;
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
  padding: 3rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 1.5rem;
  margin-top: 3rem;
}

.cta-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1.5rem;
}

.cta-button {
  background: white;
  color: #667eea;
  padding: 1rem 2.5rem;
  border-radius: 0.75rem;
  font-size: 1.125rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* Responsive */
@media (max-width: 768px) {
  .title {
    font-size: 2rem;
  }

  .testimonials-grid {
    grid-template-columns: 1fr;
  }

  .testimonials {
    padding: 3rem 0;
  }

  .cta-title {
    font-size: 1.5rem;
  }

  .testimonials-cta {
    padding: 2rem;
  }
}
</style>