<template>
  <div class="video-background">
    <!-- Loading Skeleton -->
    <div v-if="!isContentLoaded" class="video-skeleton">
      <div class="skeleton-shimmer"></div>
    </div>

    <!-- Imagen Fallback (Mobile o conexión lenta) -->
    <div
      v-if="shouldShowImage"
      class="video-image-fallback"
      :style="{ backgroundImage: `url(${posterImage})` }"
      role="img"
      :aria-label="imageAlt"
    ></div>

    <!-- Video Container (Desktop con buena conexión) -->
    <div v-else ref="containerRef" class="video-container">
      <video
        ref="videoRef"
        class="video-player"
        :class="{ 'video-player--loaded': isVideoLoaded }"
        :poster="posterImage"
        autoplay
        muted
        loop
        playsinline
        preload="metadata"
        @loadeddata="handleVideoLoaded"
        @canplay="handleCanPlay"
        @error="handleVideoError"
      >
        <!-- WebM primero (mejor compresión) -->
        <source
          v-if="videoSourceWebm"
          :data-src="videoSourceWebm"
          type="video/webm"
        />
        <!-- MP4 fallback (mayor compatibilidad) -->
        <source
          v-if="videoSourceMp4"
          :data-src="videoSourceMp4"
          type="video/mp4"
        />
      </video>
    </div>

    <!-- Overlay opcional -->
    <div v-if="overlay" class="video-overlay" :style="overlayStyles"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Props
const props = defineProps({
  videoMp4: {
    type: String,
    default: ''
  },
  videoMp4Mobile: {
    type: String,
    default: ''
  },
  videoWebm: {
    type: String,
    default: ''
  },
  poster: {
    type: String,
    default: ''
  },
  posterMobile: {
    type: String,
    default: ''
  },
  imageAlt: {
    type: String,
    default: 'Video background'
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
  // Detectar automáticamente device y network
  forceImage: {
    type: Boolean,
    default: false
  }
})

// State
const containerRef = ref(null)
const videoRef = ref(null)
const isVideoLoaded = ref(false)
const isContentLoaded = ref(false)
const videoInitialized = ref(false)
const shouldShowImage = ref(false)
const isMobile = ref(false)
const isSlowConnection = ref(false)

// Computed
const overlayStyles = computed(() => ({
  backgroundColor: `rgba(0, 0, 0, ${props.overlayOpacity})`
}))

const posterImage = computed(() => {
  if (isMobile.value && props.posterMobile) {
    return props.posterMobile
  }
  return props.poster
})

const videoSourceMp4 = computed(() => {
  // Usar versión mobile si está disponible y estamos en mobile
  if (isMobile.value && props.videoMp4Mobile) {
    return props.videoMp4Mobile
  }
  return props.videoMp4
})

const videoSourceWebm = computed(() => props.videoWebm)

// Device Detection
const detectMobile = () => {
  // Detectar mobile usando matchMedia - cambiado a max-width: 768px para forzar imagen
  const mobileQuery = window.matchMedia('(max-width: 768px)')
  isMobile.value = mobileQuery.matches

  // Listener para cambios en viewport
  const handleResize = (e) => {
    isMobile.value = e.matches
    updateShouldShowImage()
  }

  mobileQuery.addEventListener('change', handleResize)

  // Cleanup
  onUnmounted(() => {
    mobileQuery.removeEventListener('change', handleResize)
  })
}

// Network Detection
const detectSlowConnection = () => {
  // Usar Network Information API si está disponible
  if ('connection' in navigator) {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection

    if (connection) {
      // Detectar conexión lenta
      const effectiveType = connection.effectiveType
      const saveData = connection.saveData

      // Consideramos lenta: 2G, slow-2g, o si saveData está activado
      isSlowConnection.value =
        effectiveType === 'slow-2g' ||
        effectiveType === '2g' ||
        saveData === true

      // Listener para cambios en la conexión
      const handleConnectionChange = () => {
        const newEffectiveType = connection.effectiveType
        const newSaveData = connection.saveData

        isSlowConnection.value =
          newEffectiveType === 'slow-2g' ||
          newEffectiveType === '2g' ||
          newSaveData === true

        updateShouldShowImage()
      }

      connection.addEventListener('change', handleConnectionChange)

      // Cleanup
      onUnmounted(() => {
        connection.removeEventListener('change', handleConnectionChange)
      })
    }
  }
}

// Update shouldShowImage based on conditions
const updateShouldShowImage = () => {
  shouldShowImage.value =
    props.forceImage ||
    isMobile.value ||
    isSlowConnection.value

  // Si cambiamos a mostrar imagen, marcar contenido como cargado
  if (shouldShowImage.value) {
    isContentLoaded.value = true
  }
}

// Video Methods
const loadVideoSources = () => {
  if (!videoRef.value || videoInitialized.value) return

  const sources = videoRef.value.querySelectorAll('source[data-src]')
  sources.forEach(source => {
    source.src = source.dataset.src
    source.removeAttribute('data-src')
  })

  videoRef.value.load()
  videoInitialized.value = true
}

const playVideo = () => {
  if (!videoRef.value) return

  videoRef.value.play()
    .then(() => {
      console.log('Video playing')
    })
    .catch(err => {
      console.warn('Error playing video:', err)
      // Si falla la reproducción, mostrar imagen
      shouldShowImage.value = true
      isContentLoaded.value = true
    })
}

// Event Handlers
const handleVideoLoaded = () => {
  isVideoLoaded.value = true
  isContentLoaded.value = true
}

const handleCanPlay = () => {
  playVideo()
}

const handleVideoError = (error) => {
  console.error('Video loading error:', error)
  // Fallback a imagen en caso de error
  shouldShowImage.value = true
  isContentLoaded.value = true
}

// Intersection Observer para lazy loading
const setupIntersectionObserver = () => {
  // Si debemos mostrar imagen, cargarla inmediatamente
  if (shouldShowImage.value) {
    isContentLoaded.value = true
    return
  }

  // Si debemos mostrar video, usar IntersectionObserver
  if (!containerRef.value) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Hero entró en viewport, cargar video
          loadVideoSources()
          observer.disconnect()
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: '50px' // Precargar 50px antes de entrar en viewport
    }
  )

  observer.observe(containerRef.value)

  // Cleanup
  onUnmounted(() => {
    observer.disconnect()
  })
}

// Lifecycle
onMounted(() => {
  // 1. Detectar device y network
  detectMobile()
  detectSlowConnection()

  // 2. Actualizar shouldShowImage
  updateShouldShowImage()

  // 3. Setup IntersectionObserver
  setTimeout(() => {
    setupIntersectionObserver()
  }, 100)
})

// Expose methods (opcional)
defineExpose({
  play: playVideo,
  shouldShowImage
})
</script>

<style scoped>
.video-background {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
}

/* Loading Skeleton */
.video-skeleton {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  z-index: 0;
  animation: fadeOut 0.6s ease-out 0.8s forwards;
}

.skeleton-shimmer {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.08) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@keyframes fadeOut {
  to {
    opacity: 0;
    visibility: hidden;
  }
}

/* Image Fallback */
.video-image-fallback {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0;
  animation: fadeIn 0.6s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Video Container */
.video-container {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.video-player {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  transform: translate(-50%, -50%);
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.8s ease-in-out;
  pointer-events: none;
  will-change: opacity;
}

.video-player--loaded {
  opacity: 1;
}

/* Overlay */
.video-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  transition: background-color 0.3s ease;
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

/* Mobile Specific */
@media (max-width: 768px) {
  .video-player {
    /* En mobile, si por alguna razón se muestra el video, asegurar buen rendimiento */
    will-change: auto;
  }
}
</style>
