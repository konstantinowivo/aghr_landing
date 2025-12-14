<template>
  <section :class="heroClasses" :style="heroStyles">
    <div v-if="overlay" class="hero-overlay" :style="overlayStyles"></div>
    
    <div class="container">
      <div class="hero-content">
        <!-- Logo -->
        <div v-if="$slots.logo || logo" class="hero-logo">
          <slot name="logo">
            <img v-if="logo" :src="logo" :alt="logoAlt" class="logo-image" />
          </slot>
        </div>

        <!-- Brand Name -->
        <p v-if="brandName" class="hero-brand-name">
          {{ brandName }}
        </p>

        <!-- Pretitle -->
        <p v-if="pretitle" class="hero-pretitle">
          {{ pretitle }}
        </p>

        <!-- Title -->
        <h1 class="hero-title">
          <slot name="title">{{ title }}</slot>
        </h1>

        <!-- Subtitle -->
        <p v-if="subtitle" class="hero-subtitle">
          {{ subtitle }}
        </p>

        <!-- Actions -->
        <div class="hero-actions">
          <slot name="actions">
            <!-- Botones por defecto -->
            <button class="btn btn-primary" @click="handlePrimaryAction">
              {{ primaryButtonText }}
            </button>
            <button v-if="secondaryButtonText" class="btn btn-secondary" @click="handleSecondaryAction">
              {{ secondaryButtonText }}
            </button>
          </slot>
        </div>
      </div>

      <!-- Optional media -->
      <div v-if="$slots.media" class="hero-media">
        <slot name="media"></slot>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  // Contenido
  title: {
    type: String,
    default: 'Potenciá tu carrera, amplificá tu marca y conectá con el mejor talento.'
  },
  brandName: {
    type: String,
    default: 'Mentoring & HR Consulting'
  },
  
  // Logo
  logo: {
    type: String,
    default: './src/assets/images/logo/aghr_logo.png'
  },
  logoAlt: {
    type: String,
    default: 'AGHR Logo'
  },
  
  // Botones
  primaryButtonText: {
    type: String,
    default: 'Conoce Nuestros Servicios'
  },
  secondaryButtonText: {
    type: String,
    default: 'Agendar Consulta'
  },
  primaryButtonUrl: {
    type: String,
    default: ''
  },
  secondaryButtonScroll: {
    type: String,
    default: '#contact'
  },
  
  // Estilos
  variant: {
    type: String,
    default: 'gradient',
    validator: (value) => ['default', 'gradient', 'dark', 'image'].includes(value)
  },
  backgroundImage: {
    type: String,
    default: ''
  },
  overlay: {
    type: Boolean,
    default: true
  },
  overlayOpacity: {
    type: Number,
    default: 0.4,
    validator: (value) => value >= 0 && value <= 1
  },
  fullHeight: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['primary-click', 'secondary-click'])

const heroClasses = computed(() => {
  return [
    'hero',
    `hero--${props.variant}`,
    {
      'hero--full-height': props.fullHeight,
      'hero--has-image': props.backgroundImage
    }
  ]
})

const heroStyles = computed(() => {
  const styles = {}
  
  if (props.backgroundImage) {
    styles.backgroundImage = `url(${props.backgroundImage})`
  }
  
  return styles
})

const overlayStyles = computed(() => {
  return {
    backgroundColor: `rgba(0, 0, 0, ${props.overlayOpacity})`
  }
})

// Event handlers
const handlePrimaryAction = () => {
  emit('primary-click')
  
  if (props.primaryButtonUrl) {
    window.open(props.primaryButtonUrl, '_blank')
  }
}

const handleSecondaryAction = () => {
  emit('secondary-click')
  
  if (props.secondaryButtonScroll) {
    const element = document.querySelector(props.secondaryButtonScroll)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
}
</script>

<style scoped>
.hero {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
}

.hero--full-height {
  min-height: 93vh;
}

/* Variants */
.hero--default {
  background-color: #fafafa;
}

.hero--gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.hero--dark {
  background-color: #111827;
  color: white;
}

.hero--image {
  background-color: #111827;
  color: white;
}

.hero--has-image {
  color: white;
}

/* Overlay */
.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

/* Container */
.hero .container {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  width: 100%;
}

/* Content */
.hero-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.5rem;
}

/* Logo - SIN FILTRO = COLORES ORIGINALES */
.hero-logo {
  margin-bottom: 0.5rem;
  animation: fadeInUp 1s ease-out;
  animation-fill-mode: both;
}

.logo-image {
  max-width: 100px;
  height: auto;
  transition: all 0.3s ease;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.2));
}

.logo-image:hover {
  transform: scale(1.05);
}

/* Brand Name */
.hero-brand-name {
  font-size: 1.125rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: white;
  margin: 0;
  opacity: 0.95;
  animation: fadeInUp 1s ease-out 0.2s;
  animation-fill-mode: both;
}

.hero--default .hero-brand-name {
  color: #111827;
}

/* Pretitle - CON SOMBRA */
.hero-pretitle {
  font-size: 1.25rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #e0e7ff;
  margin: 0;
  animation: fadeInUp 1s ease-out 0.4s; 
  animation-fill-mode: both;
  font-family: 'Poppins', sans-serif;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
}

.hero--gradient .hero-pretitle,
.hero--dark .hero-pretitle,
.hero--image .hero-pretitle,
.hero--has-image .hero-pretitle {
  color: #e0e7ff;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
}

.hero--default .hero-pretitle {
  color: #667eea;
  text-shadow: none;
}

/* Title - CON SOMBRA */
.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin: 0;
  max-width: 50rem;
  letter-spacing: -0.025em;
  animation: fadeInUp 1s ease-out 0.6s;
  animation-fill-mode: both;
  text-shadow: 0 3px 10px rgba(0, 0, 0, 0.7);
}

.hero--gradient .hero-title,
.hero--dark .hero-title,
.hero--image .hero-title,
.hero--has-image .hero-title {
  color: white;
  text-shadow: 0 3px 10px rgba(0, 0, 0, 0.7);
}

.hero--default .hero-title {
  color: #111827;
  text-shadow: none;
}

/* Subtitle - CON SOMBRA */
.hero-subtitle {
  font-size: 1.25rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  max-width: 42rem;
  font-weight: 400;
  animation: fadeInUp 1s ease-out 0.8s;
  animation-fill-mode: both;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
}

.hero--gradient .hero-subtitle,
.hero--dark .hero-subtitle,
.hero--image .hero-subtitle,
.hero--has-image .hero-subtitle {
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
}

.hero--default .hero-subtitle {
  color: #6b7280;
  text-shadow: none;
}

/* Actions */
.hero-actions {
  display: flex;
  gap: 1.5rem;
  margin-top: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  animation: fadeInUp 1s ease-out 1s;
  animation-fill-mode: both;
}

/* Animación fade-in con movimiento desde abajo */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Botones */
.btn {
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid white;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}

.btn-primary {
  background: white;
  color: #667eea;
  font-weight: 700;
}

.btn-primary:hover {
  background: transparent;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(255, 255, 255, 0.3);
}

.btn-primary:active {
  transform: translateY(0);
}

.btn-secondary {
  background: transparent;
  color: white;
  border-color: white;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(255, 255, 255, 0.2);
  border-color: white;
}

.btn-secondary:active {
  transform: translateY(0);
}

/* Media */
.hero-media {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-media img {
  max-width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

/* Responsive */
@media (max-width: 768px) {
  .hero {
    padding: 3rem 0;
  }

  .hero--full-height {
    min-height: auto;
  }

  .hero .container {
    flex-direction: column;
    text-align: center;
  }
  
  .logo-image {
    max-width: 100px;
  }

  .hero-brand-name {
    font-size: 1rem;
  }

  .hero-pretitle {
    font-size: 1.125rem;
  }

  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.125rem;
  }
  
  .hero-media {
    max-width: 100%;
    width: 100%;
  }

  .hero-actions {
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }

  .btn {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .hero {
    padding: 2rem 0;
    min-height: auto;
  }

  .logo-image {
    max-width: 80px;
  }

  .hero-brand-name {
    font-size: 0.9375rem;
  }

  .hero-pretitle {
    font-size: 1rem;
  }

  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }

  .hero-actions {
    flex-direction: column;
    width: 100%;
    gap: 1rem;
  }

  .btn {
    width: 100%;
    padding: 0.875rem 1.5rem;
  }
}
</style>