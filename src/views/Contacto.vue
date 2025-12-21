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
  background: linear-gradient(135deg, #621478 0%, #60A7C6 100%);
  padding: 4rem 0;
  color: white;
  text-align: center;
  overflow: hidden;
  min-height: 50vh;
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.page-title {
  font-family: var(--font-family-heading);
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.03em;
  color: white;
  margin: 0;
  margin-bottom: 1rem;
  max-width: 900px;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}

.page-subtitle {
  font-family: var(--font-family-primary);
  font-size: clamp(1rem, 2vw, 1.125rem);
  font-weight: 400;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 auto;
  max-width: 700px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
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
