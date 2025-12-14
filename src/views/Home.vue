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

    <!-- Testimonials Section -->
    <section ref="testimonialsRef" id="testimonials" class="section-wrapper">
      <Testimonials />
    </section>

    <!-- Contact Section -->
    <section ref="contactRef" id="contact" class="section-wrapper">
      <ContactForm />
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import HeroSection from '../components/sections/HeroSection.vue'
import TargetAudience from '../components/sections/TargetAudience.vue'
import AboutUs from '../components/sections/AboutUs.vue'
import Testimonials from '../components/sections/Testimonials.vue'
import ContactForm from '../components/sections/ContactForm.vue'

// Crear refs para cada sección
const heroRef = ref(null)
const servicesRef = ref(null)
const aboutRef = ref(null)
const testimonialsRef = ref(null)
const contactRef = ref(null)

const emit = defineEmits(['refs-ready'])

// Una vez montado el componente, emitir las refs al componente padre
onMounted(() => {
  emit('refs-ready', {
    hero: heroRef,
    services: servicesRef,
    about: aboutRef,
    testimonials: testimonialsRef,
    contact: contactRef
  })
})

// Exponer las refs públicamente (opcional, pero útil para debugging)
defineExpose({
  heroRef,
  servicesRef,
  aboutRef,
  testimonialsRef,
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