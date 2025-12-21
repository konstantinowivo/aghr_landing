<template>
  <div class="contacto-page">
    <section class="hero-section">
      <!-- Hero Animation -->
      <HeroContactoAnimation />

      <div class="container">
        <h1 class="page-title">Contacto</h1>
        <p class="page-subtitle">
          Estamos listos para impulsar tu crecimiento profesional y organizacional
        </p>
      </div>
    </section>

    <section class="contact-section">
      <ContactForm />
    </section>
  </div>
</template>

<script setup>
import ContactForm from '../components/sections/ContactForm.vue'
import HeroContactoAnimation from '@/components/HeroAnimations/HeroContactoAnimation.vue'
</script>

<style scoped>
.contacto-page {
  width: 100%;
  min-height: calc(100vh - 80px);
}

.hero-section {
  position: relative;
  background: linear-gradient(135deg, #5568D3 0%, #764ba2 100%);
  padding: 4rem 0;
  color: white;
  text-align: center;
  overflow: hidden;
}

.container {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.page-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  letter-spacing: -0.025em;
}

.page-subtitle {
  font-size: 1.25rem;
  opacity: 0.95;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}

.contact-section {
  background: #f9fafb;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }

  .page-subtitle {
    font-size: 1rem;
  }

  .hero-section {
    padding: 3rem 0;
  }
}
</style>
