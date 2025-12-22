<template>
  <div class="home">
    <!-- Hero Section -->
    <section ref="heroRef" id="home" class="section-wrapper">
      <HeroSection />
    </section>

    <!-- Floating Buttons -->
    <FloatingButtons />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import HeroSection from '../components/sections/HeroSection.vue'
import FloatingButtons from '../components/layout/FloatingButtons.vue'

// Crear ref para hero section
const heroRef = ref(null)

const emit = defineEmits(['refs-ready'])

// Una vez montado el componente, emitir las refs al componente padre
onMounted(() => {
  emit('refs-ready', {
    hero: heroRef
  })
})

// Exponer las refs públicamente
defineExpose({
  heroRef
})
</script>

<style scoped>
/* ============================================
   Modern Corporate Home Page
   ============================================ */

.home {
  width: 100%;
  min-height: 100vh;
}

.section-wrapper {
  width: 100%;
}

/* Floating Buttons Configuration */
:deep(.floating-buttons) {
  position: fixed;
  bottom: 2.5rem;
  right: 2rem;
  z-index: 9999;
}

@media (max-width: 768px) {
  :deep(.floating-buttons) {
    bottom: 1.5rem;
    right: 1.5rem;
  }
}
</style>