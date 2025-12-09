<template>
  <div class="home">
    <!-- Hero Section -->
    <HeroSection
      :logo="logoImage"
      logo-alt="AGHR Logo"
      pretitle="AGHR Mentoring & HR"
      title="Potenciá tu carrera, amplificá tu marca, conectá con el éxito"
      subtitle="Acompañamos a empresas y personas en su desarrollo con soluciones integrales de recursos humanos y mentoría personalizada"
      :background-image="heroImage"
      :overlay="true"
      :overlay-opacity="0.3"
      variant="image"
      :full-height="true"
    >
      <template #actions>
        <button class="btn-primary" @click="handleCTAClick">
          Agendá una entrevista
        </button>
        <button class="btn-secondary" @click="handleLearnMore">
          Saber más
        </button>
      </template>
    </HeroSection>

    <!-- Target Audience Section -->
    <TargetAudience />

    <!-- Services Section -->
    <ServicesSection />

    <!-- About Us Section -->
    <AboutUs 
      :founder="founderData"
      :mission="missionText"
      :vision="visionText"
      :team="teamData"
    />

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
            <button class="btn-primary" @click="handleSignUp">
              Agendá tu entrevista
            </button>
            <button class="btn-secondary-cta" @click="handleContact">
              Más información
            </button>
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
import HeroSection from '../components/sections/HeroSection.vue'
import TargetAudience from '../components/sections/TargetAudience.vue'
import AboutUs from '../components/sections/Aboutus.vue'
import Testimonials from '../components/sections/Testimonials.vue'
import ContactForm from '../components/sections/ContactForm.vue'
import WhatsAppButton from '../components/ui/WhatsappButton.vue'
import ScrollToTop from '../components/ui/ScrollToTop.vue'
import ServicesSection from '../components/sections/ServicesSection.vue'

// Importar imágenes
import heroImage from '../assets/images/hero/hero_aghrimage.svg'
import logoImage from '../assets/images/logo/aghr_logo.png'

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
  const targetElement = document.querySelector('.target-audience')
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: 'smooth' })
  }
}

const handleSignUp = () => {
  window.open('https://calendly.com/tu-usuario', '_blank')
}

const handleContact = () => {
  // Opción 1: WhatsApp
  window.open(`https://wa.me/${contactInfo.whatsapp}`, '_blank')
  
  // Opción 2: Scroll al formulario de contacto
  // const contactForm = document.querySelector('.contact')
  // if (contactForm) {
  //   contactForm.scrollIntoView({ behavior: 'smooth' })
  // }
}
</script>

<style scoped>
.home {
  flex: 1;
}

/* Hero Buttons */
.btn-primary,
.btn-secondary {
  padding: 0.875rem 1.75rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid white;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn-primary {
  background: white;
  color: #111827;
}

.btn-primary:hover {
  background: transparent;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.btn-secondary {
  background: transparent;
  color: white;
}

.btn-secondary:hover {
  background: white;
  color: #111827;
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

/* CTA Section */
.cta-section {
  padding: 5rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.cta-content {
  text-align: center;
  max-width: 50rem;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.cta-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  letter-spacing: -0.025em;
}

.cta-subtitle {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  line-height: 1.6;
}

.cta-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-secondary-cta {
  padding: 0.875rem 1.75rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  background: transparent;
  color: white;
  border: 2px solid white;
}

.btn-secondary-cta:hover {
  background: white;
  color: #667eea;
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
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

/* Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Responsive */
@media (max-width: 768px) {
  .cta-title {
    font-size: 2rem;
  }
  
  .cta-subtitle {
    font-size: 1.125rem;
  }

  .cta-section {
    padding: 4rem 0;
  }

  .btn-primary,
  .btn-secondary,
  .btn-secondary-cta {
    width: 100%;
    padding: 1rem;
  }

  .cta-actions {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .cta-title {
    font-size: 1.75rem;
  }
  
  .cta-subtitle {
    font-size: 1rem;
  }
}
</style>