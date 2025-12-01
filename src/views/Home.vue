<template>
  <div class="home">
    <!-- Hero Section -->
    <Hero
      variant="gradient"
      pretitle="Bienvenido"
      title="Construye aplicaciones increíbles con Vue.js"
      subtitle="Una aplicación moderna con las mejores prácticas de desarrollo web"
      :full-height="true"
    >
      <template #actions>
        <ButtonCTA variant="gradient" size="xl" @click="handleCTAClick">
          Comenzar ahora
        </ButtonCTA>
        <Button variant="outline" size="lg" @click="handleLearnMore">
          Saber más
        </Button>
      </template>
    </Hero>

    <!-- Features Section -->
    <section class="features">
      <div class="container">
        <h2 class="section-title">¿Por qué elegirnos?</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">⚡</div>
            <h3 class="feature-title">Rendimiento</h3>
            <p class="feature-description">
              Optimizado para velocidad y eficiencia en cada interacción
            </p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">🎨</div>
            <h3 class="feature-title">Diseño Moderno</h3>
            <p class="feature-description">
              Interfaz limpia y atractiva que encanta a los usuarios
            </p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">🔒</div>
            <h3 class="feature-title">Seguro</h3>
            <p class="feature-description">
              Protección de datos y privacidad en cada nivel
            </p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">📱</div>
            <h3 class="feature-title">Responsive</h3>
            <p class="feature-description">
              Funciona perfectamente en todos los dispositivos
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2 class="cta-title">¿Listo para empezar?</h2>
          <p class="cta-subtitle">
            Únete a miles de usuarios que ya confían en nosotros
          </p>
          <div class="cta-actions">
            <ButtonCTA variant="solid" size="xl" @click="handleSignUp">
              Crear cuenta gratis
            </ButtonCTA>
            <Button variant="secondary" size="lg" @click="handleContact">
              Contactar ventas
            </Button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import Hero from '../components/sections/Hero.vue'
import Button from '../components/ui/Button.vue'
import ButtonCTA from '../components/ui/ButtonCTA.vue'

const handleCTAClick = () => {
  console.log('CTA Principal clicked!')
  alert('¡Comenzando tu experiencia!')
}

const handleLearnMore = () => {
  console.log('Learn more clicked')
  // Scroll suave a la sección de features
  document.querySelector('.features')?.scrollIntoView({ behavior: 'smooth' })
}

const handleSignUp = () => {
  console.log('Sign up clicked')
  alert('Registro en construcción...')
}

const handleContact = () => {
  console.log('Contact clicked')
  alert('Contacto en construcción...')
}
</script>

<style scoped>
.home {
  flex: 1;
}

/* Features Section */
.features {
  padding: var(--space-3xl) 0;
  background-color: var(--bg-secondary);
}

.section-title {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  text-align: center;
  margin-bottom: var(--space-3xl);
  color: var(--text-primary);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-2xl);
}

.feature-card {
  background: var(--bg-primary);
  padding: var(--space-2xl);
  border-radius: var(--radius-lg);
  text-align: center;
  box-shadow: var(--shadow-md);
  transition: all var(--transition-base);
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: var(--space-lg);
}

.feature-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--space-md);
  color: var(--text-primary);
}

.feature-description {
  font-size: var(--font-size-base);
  color: var(--text-secondary);
  line-height: 1.6;
}

/* CTA Section */
.cta-section {
  padding: var(--space-3xl) 0;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%);
  color: var(--text-white);
}

.cta-content {
  text-align: center;
  max-width: 50rem;
  margin: 0 auto;
}

.cta-title {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--space-lg);
}

.cta-subtitle {
  font-size: var(--font-size-xl);
  margin-bottom: var(--space-2xl);
  opacity: 0.9;
}

.cta-actions {
  display: flex;
  gap: var(--space-md);
  justify-content: center;
  flex-wrap: wrap;
}

/* Responsive */
@media (max-width: 768px) {
  .section-title {
    font-size: var(--font-size-3xl);
  }
  
  .cta-title {
    font-size: var(--font-size-3xl);
  }
  
  .cta-subtitle {
    font-size: var(--font-size-lg);
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>