<template>
  <div class="video-background">
    <!-- Loading Skeleton (mientras carga el video) -->
    <div v-if="!isVideoLoaded" class="video-skeleton">
      <div class="skeleton-shimmer"></div>
    </div>

    <!-- Video Container -->
    <div class="video-container">
      <video
        v-for="(video, index) in videos"
        :key="index"
        :ref="el => { if (el) videoRefs[index] = el }"
        :class="['video-player', { 'video-player--active': currentVideoIndex === index }]"
        :src="video"
        muted
        playsinline
        preload="auto"
        @loadeddata="handleVideoLoaded"
        @ended="handleVideoEnd"
      ></video>
    </div>

    <!-- Overlay opcional -->
    <div v-if="overlay" class="video-overlay" :style="overlayStyles"></div>

    <!-- Controles opcionales -->
    <div v-if="showControls" class="video-controls">
      <button 
        v-for="(video, index) in videos"
        :key="index"
        :class="['control-dot', { 'control-dot--active': currentVideoIndex === index }]"
        @click="changeVideo(index)"
        :aria-label="`Ver video ${index + 1}`"
      ></button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

// Props
const props = defineProps({
  videos: {
    type: Array,
    required: true,
    validator: (value) => value.length > 0
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
  showControls: {
    type: Boolean,
    default: false
  },
  autoplay: {
    type: Boolean,
    default: true
  }
})

// State
const videoRefs = ref([])
const currentVideoIndex = ref(0)
const isPlaying = ref(false)
const isVideoLoaded = ref(false)

// Computed
const overlayStyles = computed(() => ({
  backgroundColor: `rgba(0, 0, 0, ${props.overlayOpacity})`
}))

// Methods
const playCurrentVideo = () => {
  const currentVideo = videoRefs.value[currentVideoIndex.value]
  if (currentVideo) {
    currentVideo.play().catch(err => {
      console.warn('Error playing video:', err)
    })
    isPlaying.value = true
  }
}

const pauseAllVideos = () => {
  videoRefs.value.forEach(video => {
    if (video) {
      video.pause()
      video.currentTime = 0
    }
  })
  isPlaying.value = false
}

const handleVideoLoaded = () => {
  isVideoLoaded.value = true
}

const handleVideoEnd = () => {
  // Pasar al siguiente video
  currentVideoIndex.value = (currentVideoIndex.value + 1) % props.videos.length
  playCurrentVideo()
}

const changeVideo = (index) => {
  pauseAllVideos()
  currentVideoIndex.value = index
  playCurrentVideo()
}

// Lifecycle
onMounted(() => {
  if (props.autoplay) {
    // Pequeño delay para asegurar que los videos están cargados
    setTimeout(() => {
      playCurrentVideo()
    }, 100)
  }
})

onUnmounted(() => {
  pauseAllVideos()
})

// Exponer métodos (por si se necesitan externamente)
defineExpose({
  play: playCurrentVideo,
  pause: pauseAllVideos,
  changeVideo
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
  background: linear-gradient(135deg, #5568D3 0%, #764ba2 100%);
  z-index: 0;
  animation: fadeOut 0.5s ease-out 1s forwards;
}

.skeleton-shimmer {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.1) 50%,
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

.video-container {
  position: relative;
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
  transition: opacity 1s ease-in-out;
  pointer-events: none;
}

.video-player--active {
  opacity: 1;
}

.video-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

/* Controles */
.video-controls {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.75rem;
  z-index: 2;
}

.control-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  border: 2px solid rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.control-dot:hover {
  background: rgba(255, 255, 255, 0.8);
  transform: scale(1.2);
}

.control-dot--active {
  background: white;
  border-color: white;
}

/* Responsive */
@media (max-width: 768px) {
  .video-controls {
    bottom: 1.5rem;
    gap: 0.5rem;
  }

  .control-dot {
    width: 10px;
    height: 10px;
  }
}

@media (max-width: 480px) {
  .video-controls {
    bottom: 1rem;
  }

  .control-dot {
    width: 8px;
    height: 8px;
  }
}
</style>