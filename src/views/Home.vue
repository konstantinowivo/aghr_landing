<template>
  <div class="home">
    <!-- Hero Section -->
    <Hero
      variant="gradient"
      pretitle="Bienvenido"
      title="AGHR"
      subtitle="Potenciá tu carrera, amplificá tu marca, conectá con el éxito"
      :full-height="true"
    >
      <template #actions>
        <ButtonCTA variant="gradient" size="xl" @click="handleCTAClick">
          Agendá una entrevista
        </ButtonCTA>
        <Button variant="outline" size="lg" @click="handleLearnMore">
          Saber más
        </Button>
      </template>
    </Hero>

    <!-- Target Audience Section -->
    <TargetAudience />

    <!-- Services Section -->
    <Services />

    <!-- Features Section -->
    <section class="features">
      <div class="container">
        <h2 class="section-title">¿Por qué elegirnos?</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">⚡</div>
            <h3 class="feature-title">Experiencia Comprobada</h3>
            <p class="feature-description">
              Más de 15 años de trayectoria acompañando empresas y profesionales en su crecimiento
            </p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">🎯</div>
            <h3 class="feature-title">Metodología Personalizada</h3>
            <p class="feature-description">
              Soluciones adaptadas a las necesidades específicas de cada cliente y contexto
            </p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">🌎</div>
            <h3 class="feature-title">Alcance Internacional</h3>
            <p class="feature-description">
              Presencia en Argentina, Latinoamérica y España con perspectiva global
            </p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">📈</div>
            <h3 class="feature-title">Resultados Medibles</h3>
            <p class="feature-description">
              Impacto real y cuantificable en el desarrollo de equipos y carreras profesionales
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2 class="cta-title">¿Listo para impulsar tu crecimiento?</h2>
          <p class="cta-subtitle">
            Agendá una entrevista y descubrí cómo podemos ayudarte
          </p>
          <div class="cta-actions">
            <ButtonCTA variant="solid" size="xl" @click="handleSignUp">
              Agendá tu entrevista
            </ButtonCTA>
            <Button variant="secondary" size="lg" @click="handleContact">
              Más información
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
import TargetAudience from '../components/sections/TargetAudience.vue'
import Services from '../components/sections/Services.vue'

const handleCTAClick = () => {
  console.log('CTA Principal clicked!')
  // Aquí puedes integrar tu sistema de agendamiento
  window.open('https://calendly.com/tu-usuario', '_blank') // Ejemplo con Calendly
}

const handleLearnMore = () => {
  console.log('Learn more clicked')
  // Scroll suave a la sección de audiencia objetivo
  document.querySelector('.target-audience')?.scrollIntoView({ behavior: 'smooth' })
}

const handleSignUp = () => {
  console.log('Sign up clicked')
  // Aquí también puedes abrir tu sistema de agendamiento
  window.open('https://calendly.com/tu-usuario', '_blank')
}

const handleContact = () => {
  console.log('Contact clicked')
  // Scroll a contacto o abrir WhatsApp/Email
  window.open('https://wa.me/5493512345678', '_blank') // Ejemplo WhatsApp
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