<template>
  <section class="hero-modern">
    <!-- Video Background Optimizado -->
    <div class="hero-background">
      <VideoBackgroundOptimized
        :video-mp4="videoMp4"
        :video-mp4-mobile="videoMp4Mobile"
        :video-webm="videoWebm"
        :poster="posterDesktop"
        :poster-mobile="posterMobile"
        :overlay="false"
        image-alt="Obelisco Buenos Aires - AGHR Consultoría de Recursos Humanos Argentina"
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
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import VideoBackgroundOptimized from './VideoBackgroundOptimized.vue'

// Assets
import aghrLogo from '../../assets/images/logo/aghr_logo.svg'

// Cloudinary Configuration
const CLOUD_NAME = 'dav0f6jpk'
const PUBLIC_ID = 'video_obelisco_xunslf'

// Video URLs optimizadas desde Cloudinary
const videoMp4 = `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/f_auto,q_auto:good,w_1280/${PUBLIC_ID}.mp4`
const videoMp4Mobile = `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/f_auto,q_auto:good,w_768/${PUBLIC_ID}.mp4`
const videoWebm = `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/f_auto,q_auto:good,w_1280/${PUBLIC_ID}.webm`
const posterDesktop = `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/f_auto,q_auto,w_1280,so_0/${PUBLIC_ID}.jpg`
const posterMobile = `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/f_auto,q_auto,w_768,so_0/${PUBLIC_ID}.jpg`

// Router
const router = useRouter()

// Props
const props = defineProps({
  title: {
    type: String,
    default: 'Potenciá tu carrera y conectá con el mejor talento'
  },
  subtitle: {
    type: String,
    default: 'Soluciones integrales de Recursos Humanos y Mentoring para empresas y profesionales que buscan excelencia'
  },
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
  primaryButtonText: {
    type: String,
    default: 'Conocer Servicios'
  },
  secondaryButtonText: {
    type: String,
    default: 'Agendar Consulta'
  },
  primaryButtonScroll: {
    type: String,
    default: '#services'
  },
  secondaryButtonScroll: {
    type: String,
    default: '#contact'
  }
})

// Emit
const emit = defineEmits(['primary-click', 'secondary-click'])

// Handlers
const handlePrimaryAction = () => {
  emit('primary-click')

  if (props.primaryButtonScroll) {
    const element = document.querySelector(props.primaryButtonScroll)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      router.push('/servicios')
    }
  } else {
    router.push('/servicios')
  }
}

const handleSecondaryAction = () => {
  emit('secondary-click')

  if (props.secondaryButtonScroll) {
    const element = document.querySelector(props.secondaryButtonScroll)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      router.push('/contacto')
    }
  } else {
    router.push('/contacto')
  }
}

// Animations on mount
onMounted(() => {
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
  min-height: 100svh;
  min-height: 100vh; /* Fallback para navegadores sin soporte svh */
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
  font-size: clamp(0.875rem, 2vw, 1.125rem);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: rgba(255, 255, 255, 1);
  margin: 0;
  text-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
}

/* Title */
.hero-title {
  font-family: var(--font-family-heading);
  font-size: clamp(2.25rem, 6vw, 3.75rem);
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: -0.04em;
  color: white;
  margin: 0;
  max-width: 1000px;
  text-shadow: 0 6px 30px rgba(0, 0, 0, 0.5);
  background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.95) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Subtitle */
.hero-subtitle {
  font-family: var(--font-family-primary);
  font-size: clamp(1.125rem, 2.5vw, 1.375rem);
  font-weight: 500;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.98);
  margin: 0;
  max-width: 800px;
  text-shadow: 0 3px 15px rgba(0, 0, 0, 0.4);
  letter-spacing: 0.01em;
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
  justify-content: center;
  gap: 0.5rem;
  padding: 0.875rem 2rem;
  min-height: 48px; /* Tamaño táctil mínimo */
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
  .hero-modern {
    min-height: 100svh;
    min-height: 100vh;
  }

  .hero-content {
    padding: 2rem 0;
    gap: 1.25rem;
    max-height: none;
  }

  .hero-actions {
    flex-direction: column;
    width: 100%;
    max-width: 100%;
    gap: 0.875rem;
  }

  .btn-hero {
    width: 100%;
    justify-content: center;
    min-height: 52px; /* Más grande en mobile para mejor UX */
    padding: 1rem 2rem;
    font-size: 1.0625rem;
  }

  /* Asegurar que el CTA sea visible sin scroll */
  .hero-container {
    display: flex;
    align-items: center;
    min-height: 100%;
  }
}

@media (max-width: 480px) {
  .hero-content {
    padding: 2rem 0;
  }

  .logo-image {
    width: 60px;
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
