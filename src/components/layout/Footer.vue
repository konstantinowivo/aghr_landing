<template>
  <footer class="footer">
    <div class="container">
      <!-- Main Footer Content -->
      <div class="footer-content">
        <!-- Brand Section -->
        <div class="footer-section footer-brand">
          <div class="brand-logo">
            <img 
              v-if="logo"
              :src="logo" 
              alt="AGHR Logo" 
              class="logo-image"
            >
            <h3 v-else class="brand-name">{{ brandName }}</h3>
          </div>
          <p class="brand-tagline">{{ tagline }}</p>
          
          <!-- Social Links -->
          <div v-if="socialLinks.length > 0" class="social-links">
            <a 
              v-for="(social, index) in socialLinks" 
              :key="index"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="social-link"
              :aria-label="social.name"
            >
              <component :is="social.icon" v-if="social.icon" />
              <span v-else>{{ social.name[0] }}</span>
            </a>
          </div>
        </div>

        <!-- Services Links -->
        <div class="footer-section">
          <h4 class="section-title">Servicios</h4>
          <ul class="footer-links">
            <li v-for="(service, index) in services" :key="index">
              <a :href="service.href" class="footer-link">
                {{ service.label }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Company Links -->
        <div class="footer-section">
          <h4 class="section-title">Empresa</h4>
          <ul class="footer-links">
            <li v-for="(link, index) in companyLinks" :key="index">
              <a :href="link.href" class="footer-link">
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div class="footer-section">
          <h4 class="section-title">Contacto</h4>
          <ul class="footer-links">
            <li>
              <a :href="`mailto:${contactInfo.email}`" class="footer-link">
                {{ contactInfo.email }}
              </a>
            </li>
            <li>
              <a :href="`tel:${contactInfo.phone}`" class="footer-link">
                {{ contactInfo.phoneDisplay }}
              </a>
            </li>
            <li>
              <span class="footer-text">{{ contactInfo.location }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="footer-bottom">
        <div class="footer-bottom-content">
          <p class="copyright">
            © {{ currentYear }} {{ brandName }}. Todos los derechos reservados.
          </p>
          
          <div class="legal-links">
            <a 
              v-for="(link, index) in legalLinks" 
              :key="index"
              :href="link.href" 
              class="legal-link"
            >
              {{ link.label }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  logo: {
    type: String,
    default: ''
  },
  brandName: {
    type: String,
    default: 'AGHR Mentoring & HR'
  },
  tagline: {
    type: String,
    default: 'Potenciá tu carrera, amplificá tu marca, conectá con el éxito'
  },
  services: {
    type: Array,
    default: () => [
      { label: 'Búsqueda y Selección', href: '#servicios' },
      { label: 'Evaluaciones', href: '#servicios' },
      { label: 'Mentoring Laboral', href: '#servicios' },
      { label: 'Coaching Gerencial', href: '#servicios' },
      { label: 'Training & Team Building', href: '#servicios' }
    ]
  },
  companyLinks: {
    type: Array,
    default: () => [
      { label: 'Sobre Nosotros', href: '#nosotros' },
      { label: 'Nuestro Equipo', href: '#equipo' },
      { label: 'Testimonios', href: '#testimonios' },
      { label: 'Contacto', href: '#contacto' }
    ]
  },
  contactInfo: {
    type: Object,
    default: () => ({
      email: 'contacto@aghr.com',
      phone: '+5493512345678',
      phoneDisplay: '+54 9 351 234-5678',
      location: 'Córdoba, Argentina'
    })
  },
  socialLinks: {
    type: Array,
    default: () => [
      // Ejemplo:
      // { name: 'LinkedIn', url: 'https://linkedin.com/company/aghr', icon: null },
      // { name: 'Instagram', url: 'https://instagram.com/aghr', icon: null },
    ]
  },
  legalLinks: {
    type: Array,
    default: () => [
      { label: 'Términos y Condiciones', href: '/terminos' },
      { label: 'Política de Privacidad', href: '/privacidad' }
    ]
  }
});

const currentYear = computed(() => new Date().getFullYear());
</script>

<style scoped>
.footer {
  background: linear-gradient(180deg, #1a202c 0%, #2d3748 100%);
  color: #e2e8f0;
  padding: 4rem 0 0 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Main Footer Content */
.footer-content {
  display: grid;
  grid-template-columns: 2fr repeat(3, 1fr);
  gap: 3rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid rgba(226, 232, 240, 0.1);
}

/* Brand Section */
.footer-brand {
  max-width: 350px;
}

.brand-logo {
  margin-bottom: 1rem;
}

.logo-image {
  height: 2.5rem;
  width: auto;
}

.brand-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin: 0;
}

.brand-tagline {
  color: #cbd5e0;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

/* Social Links */
.social-links {
  display: flex;
  gap: 0.75rem;
}

.social-link {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
  font-weight: 600;
}

.social-link:hover {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transform: translateY(-3px);
}

/* Footer Sections */
.footer-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.section-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: white;
  margin: 0 0 0.5rem 0;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-links li {
  margin: 0;
}

.footer-link {
  color: #cbd5e0;
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: #667eea;
}

.footer-text {
  color: #cbd5e0;
  font-size: 0.95rem;
}

/* Footer Bottom */
.footer-bottom {
  padding: 2rem 0;
}

.footer-bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.copyright {
  color: #a0aec0;
  font-size: 0.875rem;
  margin: 0;
}

.legal-links {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.legal-link {
  color: #a0aec0;
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.2s ease;
}

.legal-link:hover {
  color: #667eea;
}

/* Responsive */
@media (max-width: 968px) {
  .footer-content {
    grid-template-columns: repeat(2, 1fr);
  }

  .footer-brand {
    grid-column: 1 / -1;
    max-width: 100%;
  }
}

@media (max-width: 640px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .footer-bottom-content {
    flex-direction: column;
    text-align: center;
  }

  .footer {
    padding: 3rem 0 0 0;
  }
}
</style>