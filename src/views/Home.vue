<template>
  <div class="home">
    <!-- Hero Section -->
    <section ref="heroRef" id="home" class="section-wrapper">
      <HeroSection />
    </section>

    <!-- Services Section (TargetAudience) -->
    <section ref="servicesRef" id="services" class="section-wrapper">
      <TargetAudience />
    </section>

    <!-- About Us Section -->
    <section ref="aboutRef" id="about" class="section-wrapper">
      <AboutUs />
    </section>

    <!-- Job Board Section -->
    <section ref="jobsRef" id="jobs" class="section-wrapper">
      <JobBoard />
    </section>

    <!-- Contact Section -->
    <section ref="contactRef" id="contact" class="section-wrapper">
      <ContactForm />
    </section>

    <!-- Floating Buttons (WhatsApp + Scroll to Top) -->
    <FloatingButtons />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import HeroSection from '../components/sections/HeroSection.vue'
import TargetAudience from '../components/sections/TargetAudience.vue'
import AboutUs from '../components/sections/AboutUs.vue'
import JobBoard from '../components/sections/JobBoard.vue'
import ContactForm from '../components/sections/ContactForm.vue'
import FloatingButtons from '../components/layout/FloatingButtons.vue'

// Crear refs para cada sección
const heroRef = ref(null)
const servicesRef = ref(null)
const aboutRef = ref(null)
const jobsRef = ref(null)        // ← Reemplazado: testimonialsRef → jobsRef
const contactRef = ref(null)

const emit = defineEmits(['refs-ready'])

// Una vez montado el componente, emitir las refs al componente padre
onMounted(() => {
  emit('refs-ready', {
    hero: heroRef,
    services: servicesRef,
    about: aboutRef,
    jobs: jobsRef,              // ← Reemplazado: testimonials → jobs
    contact: contactRef
  })
})

// Exponer las refs públicamente (opcional, pero útil para debugging)
defineExpose({
  heroRef,
  servicesRef,
  aboutRef,
  jobsRef,                      
  contactRef
})
</script>

<style scoped>
.home {
  width: 100%;
}

.section-wrapper {
  width: 100%;
}
</style>