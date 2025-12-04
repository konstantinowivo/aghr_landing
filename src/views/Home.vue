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

    <!-- About Us Section -->
    <AboutUs 
      :founder="founderData"
      :mission="missionText"
      :vision="visionText"
      :team="teamData"
    />

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

    <!-- Testimonials Section -->
    <Testimonials :testimonials="testimonialsData">
      <template #cta>
        <button class="testimonial-cta-button" @click="handleCTAClick">
          Agendá tu primera reunión
        </button>
      </template>
    </Testimonials>

    <!-- Contact Form Section -->
    <ContactForm 
      :contact-info="contactInfo"
      :social-links="socialLinks"
    />

    <!-- Final CTA Section -->
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

    <!-- Floating Buttons -->
    <WhatsAppButton 
      :phone-number="contactInfo.whatsapp"
      message="¡Hola! Me gustaría obtener más información sobre los servicios de AGHR."
      tooltip-text="¿Necesitás ayuda?"
    />
    
    <ScrollToTop />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Hero from '../components/sections/Hero.vue'
import Button from '../components/ui/Button.vue'
import ButtonCTA from '../components/ui/ButtonCTA.vue'
import TargetAudience from '../components/sections/TargetAudience.vue'
import Services from '../components/sections/Services.vue'
import AboutUs from '../components/sections/AboutUs.vue'
import Testimonials from '../components/sections/Testimonials.vue'
import ContactForm from '../components/sections/ContactForm.vue'
import WhatsAppButton from '../components/ui/WhatsappButton.vue'
import ScrollToTop from '../components/ui/ScrollToTop.vue'

// Datos de contacto centralizados
const contactInfo = {
  email: 'contacto@aghr.com',
  phone: '+5493512345678',
  phoneDisplay: '+54 9 351 234-5678',
  whatsapp: '5493512345678',
  location: 'Córdoba, Argentina'
}

// Redes sociales (actualizar con URLs reales)
const socialLinks = [
  // { name: 'LinkedIn', url: 'https://linkedin.com/company/aghr', icon: null },
  // { name: 'Instagram', url: 'https://instagram.com/aghr', icon: null },
  // { name: 'Facebook', url: 'https://facebook.com/aghr', icon: null }
]

// Datos de la fundadora (actualizar con info real de Andrea)
const founderData = {
  name: 'Andrea Gasparetti',
  title: 'Fundadora & Consultora Senior en RH',
  image: '', // Agregar URL de la imagen
  bio: [
    'Con más de 15 años de experiencia en recursos humanos y desarrollo organizacional, fundé AGHR con la misión de transformar la manera en que empresas y profesionales abordan el talento.',
    'Mi pasión es conectar a las personas con su máximo potencial, ya sea a través de procesos de selección estratégicos, programas de desarrollo o mentoría personalizada.'
  ],
  credentials: [
    'Licenciada en Recursos Humanos',
    '15+ años de experiencia en el sector',
    'Certificada en Coaching Ejecutivo',
    '100+ empresas asesoradas'
  ]
}

// Misión y Visión
const missionText = 'Acompañar el crecimiento profesional y organizacional a través de soluciones personalizadas en recursos humanos, conectando el talento con las oportunidades que impulsan el éxito.'

const visionText = 'Ser el referente en mentoría y recursos humanos en la región, reconocidos por nuestra capacidad de transformar carreras y organizaciones a través de estrategias innovadoras y centradas en las personas.'

// Equipo (agregar miembros reales)
const teamData = [
  // {
  //   name: 'Victoria López',
  //   role: 'Consultora en Desarrollo Organizacional',
  //   image: '',
  //   description: 'Especialista en diseño de procesos de RH y team building con más de 10 años de experiencia.'
  // }
]

// Testimonios (actualizar con testimonios reales)
const testimonialsData = [
  {
    text: 'El proceso de mentoring con AGHR fue transformador. En 6 meses logré un ascenso que venía buscando hace años. Andrea me ayudó a identificar mis fortalezas y a comunicar mi valor de manera efectiva.',
    author: 'María González',
    position: 'Gerente de Marketing',
    company: 'Tech Solutions SA',
    avatar: '',
    rating: 5,
    featured: true
  },
  {
    text: 'Contraté AGHR para optimizar nuestros procesos de selección y el resultado superó nuestras expectativas. Redujimos el tiempo de contratación en un 40% y mejoramos significativamente la calidad de los candidatos.',
    author: 'Carlos Martínez',
    position: 'CEO',
    company: 'Startup Innovation',
    avatar: '',
    rating: 5,
    featured: false
  },
  {
    text: 'El training de team building que diseñaron para nuestro equipo fue excepcional. Logramos mejorar la comunicación interna y aumentar la productividad de manera notable.',
    author: 'Laura Fernández',
    position: 'Directora de RH',
    company: 'Corporación ABC',
    avatar: '',
    rating: 5,
    featured: false
  }
]

// Event Handlers
const handleCTAClick = () => {
  // Integrar con sistema de agendamiento (Calendly, Google Calendar, etc.)
  window.open('https://calendly.com/tu-usuario', '_blank')
}

const handleLearnMore = () => {
  document.querySelector('.target-audience')?.scrollIntoView({ behavior: 'smooth' })
}

const handleSignUp = () => {
  window.open('https://calendly.com/tu-usuario', '_blank')
}

const handleContact = () => {
  // Opción 1: WhatsApp
  window.open(`https://wa.me/${contactInfo.whatsapp}`, '_blank')
  
  // Opción 2: Scroll al formulario de contacto
  // document.querySelector('.contact')?.scrollIntoView({ behavior: 'smooth' })
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

/* Testimonial CTA Button */
.testimonial-cta-button {
  background: white;
  color: #667eea;
  padding: 1rem 2.5rem;
  border-radius: 0.75rem;
  font-size: 1.125rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.testimonial-cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
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