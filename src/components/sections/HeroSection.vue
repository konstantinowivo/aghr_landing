<template>
  <section class="hero-modern">
    <!-- Video Background Optimizado -->
    <div class="hero-background">
      <VideoBackground
        v-if="videos && videos.length > 0"
        :videos="videos"
        :overlay="false"
        :show-controls="false"
      />
      <div class="hero-overlay"></div>
    </div>

    <!-- Content Container -->
    <div class="hero-container">
      <div class="hero-content">
        <!-- Logo -->
        <div class="hero-logo" data-animate="fade-in-up">
          <img
            :src="logo"
            :alt="logoAlt"
            width="80"
            height="80"
            class="logo-image"
            loading="eager"
          />
        </div>

        <!-- Brand Name -->
        <p class="hero-brand" data-animate="fade-in-up">
          {{ brandName }}
        </p>

        <!-- Main Title -->
        <h1 class="hero-title" data-animate="fade-in-up">
          {{ title }}
        </h1>

        <!-- Subtitle -->
        <p class="hero-subtitle" data-animate="fade-in-up">
          {{ subtitle }}
        </p>

        <!-- CTA Buttons -->
        <div class="hero-actions" data-animate="fade-in-up">
          <button
            class="btn-hero btn-hero--primary"
            @click="handlePrimaryAction"
            aria-label="Conocer servicios"
          >
            <span>{{ primaryButtonText }}</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>

          <button
            class="btn-hero btn-hero--secondary"
            @click="handleSecondaryAction"
            aria-label="Agendar consulta"
          >
            <span>{{ secondaryButtonText }}</span>
          </button>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import VideoBackground from './VideoBackground.vue'
import { siteContentService } from '@/services/siteContentService'

// Assets
import aghrLogo from '../../assets/images/logo/aghr_logo.svg'

const video1 = '/videos/video_oficina.avi'
const router = useRouter()

// Contenido dinámico desde site_content
const title = ref('Potenciá tu carrera y conectá con el mejor talento')
const subtitle = ref('Soluciones integrales de Recursos Humanos y Mentoring para empresas y profesionales que buscan excelencia')
const primaryButtonText = ref('Conocer Servicios')
const secondaryButtonText = ref('Agendar Consulta')

// Props funcionales (no son contenido editable)
const props = defineProps({
  brandName: {
    type: String,
    default: 'Mentoring & HR Consulting'
  },
  logo: {
    type: String,
    default: () => aghrLogo
  },
  logoAlt: {
    type: String,
    default: 'AGHR Logo'
  },
  primaryButtonScroll: {
    type: String,
    default: '#services'
  },
  secondaryButtonScroll: {
    type: String,
    default: '#contact'
  },
  videos: {
    type: Array,
    default: () => [video1]
  }
})

// Emit
const emit = defineEmits(['primary-click', 'secondary-click'])

// Handlers
const handlePrimaryAction = () => {
  emit('primary-click')

  if (props.primaryButtonScroll) {
    // Si tiene scroll, intentar hacer scroll primero
    const element = document.querySelector(props.primaryButtonScroll)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      // Si no existe el elemento, navegar a la página de servicios usando router
      router.push('/servicios')
    }
  } else {
    // Por defecto, navegar a la página de servicios usando router
    router.push('/servicios')
  }
}

const handleSecondaryAction = () => {
  emit('secondary-click')

  if (props.secondaryButtonScroll) {
    // Si tiene scroll, intentar hacer scroll primero
    const element = document.querySelector(props.secondaryButtonScroll)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      // Si no existe el elemento, navegar a la página de contacto usando router
      router.push('/contacto')
    }
  } else {
    // Por defecto, navegar a la página de contacto usando router
    router.push('/contacto')
  }
}

const scrollToContent = () => {
  window.scrollBy({
    top: window.innerHeight,
    behavior: 'smooth'
  })
}

// Animations on mount
onMounted(async () => {
  try {
    const content = await siteContentService.getMany([
      'hero_title', 'hero_subtitle', 'hero_primary_cta', 'hero_secondary_cta'
    ])
    if (content.hero_title) title.value = content.hero_title
    if (content.hero_subtitle) subtitle.value = content.hero_subtitle
    if (content.hero_primary_cta) primaryButtonText.value = content.hero_primary_cta
    if (content.hero_secondary_cta) secondaryButtonText.value = content.hero_secondary_cta
  } catch (err) {
    console.error('Error cargando hero content:', err)
  }

  // Intersection Observer para animaciones
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('animate')
        }, index * 100)
      }
    })
  }, {
    threshold: 0.1
  })

  // Observar elementos con data-animate
  document.querySelectorAll('[data-animate]').forEach((el) => {
    observer.observe(el)
  })
})
</script>

<style scoped>
/* ============================================
   Modern Corporate Hero Section - Optimized
   ============================================ */

.hero-modern {
  position: relative;
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
}

/* Background */
.hero-background {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(79, 70, 229, 0.4) 0%,
    rgba(124, 58, 237, 0.4) 100%
  );
  z-index: 1;
  backdrop-filter: blur(0px);
  transition: backdrop-filter var(--transition-slow);
}

/* Container */
.hero-container {
  position: relative;
  z-index: 2;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem;
  width: 100%;
}

/* Content */
.hero-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.25rem;
  padding: 2rem 0;
  max-height: 100vh;
  justify-content: center;
}

/* Logo */
.hero-logo {
  margin-bottom: 0;
}

.logo-image {
  width: 70px;
  height: auto;
  filter: drop-shadow(0 8px 24px rgba(0, 0, 0, 0.3));
  transition: transform var(--transition-base);
}

.logo-image:hover {
  transform: scale(1.05);
}

/* Brand Name */
.hero-brand {
  font-family: var(--font-family-primary);
  font-size: clamp(0.875rem, 2vw, 1rem);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: rgba(255, 255, 255, 0.95);
  margin: 0;
}

/* Title */
.hero-title {
  font-family: var(--font-family-heading);
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.03em;
  color: white;
  margin: 0;
  max-width: 900px;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}

/* Subtitle */
.hero-subtitle {
  font-family: var(--font-family-primary);
  font-size: clamp(1rem, 2vw, 1.125rem);
  font-weight: 400;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  max-width: 700px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

/* Actions */
.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 0.5rem;
}

.btn-hero {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 2rem;
  font-family: var(--font-family-primary);
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all var(--transition-base);
  white-space: nowrap;
  position: relative;
  overflow: hidden;
}

.btn-hero--primary {
  background: white;
  color: var(--color-primary);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.btn-hero--primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
  background: #FAFBFC;
}

.btn-hero--primary svg {
  transition: transform var(--transition-base);
}

.btn-hero--primary:hover svg {
  transform: translateX(4px);
}

.btn-hero--secondary {
  background: transparent;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.btn-hero--secondary:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.8);
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

/* Metrics */
.hero-metrics {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-top: 2rem;
  padding: 2rem 3rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.metric-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.metric-number {
  font-family: var(--font-family-heading);
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 800;
  color: white;
  line-height: 1;
}

.metric-label {
  font-family: var(--font-family-primary);
  font-size: clamp(0.75rem, 1.5vw, 0.875rem);
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
  text-align: center;
  line-height: 1.3;
}

.metric-divider {
  width: 1px;
  height: 40px;
  background: rgba(255, 255, 255, 0.3);
}

/* Scroll Indicator */
.scroll-indicator {
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: all var(--transition-base);
}

.scroll-indicator:hover {
  transform: translateX(-50%) translateY(-4px);
}

.scroll-mouse {
  width: 28px;
  height: 44px;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 14px;
  position: relative;
}

.scroll-wheel {
  width: 4px;
  height: 8px;
  background: white;
  border-radius: 2px;
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  animation: scroll-down 1.5s infinite;
}

.scroll-text {
  font-family: var(--font-family-primary);
  font-size: 0.875rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

@keyframes scroll-down {
  0% {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateX(-50%) translateY(16px);
  }
}

/* Animations */
[data-animate] {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

[data-animate].animate {
  opacity: 1;
  transform: translateY(0);
}

/* Responsive */
@media (max-width: 768px) {
  .hero-content {
    padding: 3rem 0;
    gap: 1.5rem;
  }

  .hero-actions {
    flex-direction: column;
    width: 100%;
    max-width: 400px;
  }

  .btn-hero {
    width: 100%;
    justify-content: center;
  }

  .hero-metrics {
    flex-direction: column;
    gap: 1.5rem;
    padding: 1.5rem 2rem;
  }

  .metric-divider {
    width: 60px;
    height: 1px;
  }

  .scroll-indicator {
    bottom: 2rem;
  }
}

@media (max-width: 480px) {
  .hero-content {
    padding: 2rem 0;
  }

  .logo-image {
    width: 60px;
  }

  .hero-metrics {
    padding: 1.25rem 1.5rem;
  }
}

/* Performance Optimizations */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
