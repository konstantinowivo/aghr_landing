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
import HeroSection from '../components/sections/HeroSectionOptimized.vue'
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

</style>