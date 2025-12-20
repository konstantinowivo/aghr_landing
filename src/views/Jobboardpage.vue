<template>
  <div class="jobboard-page">
    <!-- Hero Section (personalizado para trabajos) -->
    <section ref="heroRef" id="hero" class="section-wrapper">
      <HeroSection 
        title="Encontrá tu próxima oportunidad profesional"
        subtitle="Explorá nuestras propuestas laborales y conectá con empresas líderes que buscan talento como el tuyo"
        primaryButtonText="Ver Propuestas"
        secondaryButtonText="Contactanos"
        primaryButtonScroll="#jobs"
        secondaryButtonScroll="#contact"
      />
    </section>

    <!-- JobBoard Section (completo, sin límite) -->
    <section ref="jobsRef" id="jobs" class="section-wrapper">
      <JobBoard />
    </section>

    <!-- Floating Buttons -->
    <FloatingButtons />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import HeroSection from '../components/sections/HeroSection.vue'
import JobBoard from '../components/sections/JobBoard.vue'
import FloatingButtons from '@/components/layout/FloatingButtons.vue'

// Crear refs para las secciones
const heroRef = ref(null)
const jobsRef = ref(null)

const emit = defineEmits(['refs-ready'])

// Una vez montado el componente, emitir las refs al componente padre
onMounted(() => {
  emit('refs-ready', {
    hero: heroRef,
    services: null,
    about: null,
    jobs: jobsRef,
    contact: null
  })
})

// Exponer las refs públicamente
defineExpose({
  heroRef,
  jobsRef
})
</script>

<style scoped>
.jobboard-page {
  width: 100%;
}

.section-wrapper {
  width: 100%;
}
</style>