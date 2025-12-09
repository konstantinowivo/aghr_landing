<template>
  <footer class="footer">
    <div class="footer-main">
      <div class="container">
        <div class="footer-grid">
          <!-- Company Info -->
          <div class="footer-column">
            <div class="footer-brand">
              <img 
                src="../../assets/images/logo/aghr_logo.png" 
                alt="AGHR Logo" 
                class="footer-logo"
              >
              <h3 class="footer-brand-name">AGHR</h3>
            </div>
            <p class="footer-description">
              Acompañamos a empresas y profesionales en su desarrollo con soluciones integrales de recursos humanos y mentoría personalizada.
            </p>
            <div class="footer-social">
              <a 
                href="https://instagram.com/aghr" 
                target="_blank"
                rel="noopener noreferrer"
                class="social-link instagram"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" class="social-icon">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href="https://linkedin.com/company/aghr" 
                target="_blank"
                rel="noopener noreferrer"
                class="social-link linkedin"
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" class="social-icon">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a 
                href="https://facebook.com/aghr" 
                target="_blank"
                rel="noopener noreferrer"
                class="social-link facebook"
                aria-label="Facebook"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" class="social-icon">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- Quick Links - Empresas -->
          <div class="footer-column">
            <h4 class="footer-title">Para Empresas</h4>
            <ul class="footer-links">
              <li><a href="#services" @click.prevent="scrollTo('#services')">Selección y Reclutamiento</a></li>
              <li><a href="#services" @click.prevent="scrollTo('#services')">Evaluación de Desempeño</a></li>
              <li><a href="#services" @click.prevent="scrollTo('#services')">Capacitación</a></li>
              <li><a href="#services" @click.prevent="scrollTo('#services')">Consultoría en RRHH</a></li>
            </ul>
          </div>

          <!-- Quick Links - Personas -->
          <div class="footer-column">
            <h4 class="footer-title">Para Personas</h4>
            <ul class="footer-links">
              <li><a href="#services" @click.prevent="scrollTo('#services')">Mentorías</a></li>
              <li><a href="#services" @click.prevent="scrollTo('#services')">Coaching Ejecutivo</a></li>
              <li><a href="#services" @click.prevent="scrollTo('#services')">Plan de Carrera</a></li>
              <li><a href="#services" @click.prevent="scrollTo('#services')">Networking</a></li>
            </ul>
          </div>

          <!-- Contact Info -->
          <div class="footer-column">
            <h4 class="footer-title">Contacto</h4>
            <ul class="footer-contact">
              <li>
                <svg class="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <a href="mailto:contacto@aghr.com">contacto@aghr.com</a>
              </li>
              <li>
                <svg class="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <a href="tel:+5493512345678">+54 9 351 234-5678</a>
              </li>
              <li>
                <svg class="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span>Córdoba, Argentina</span>
              </li>
            </ul>
            <button class="footer-cta" @click="$emit('cta-click')">
              Agendar entrevista
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Bottom -->
    <div class="footer-bottom">
      <div class="container">
        <div class="footer-bottom-content">
          <p class="footer-copyright">
            © {{ currentYear }} AGHR Mentoring & HR. Todos los derechos reservados.
          </p>
          <div class="footer-legal">
            <a href="#privacy" @click.prevent="scrollTo('#privacy')">Política de Privacidad</a>
            <span class="separator">•</span>
            <a href="#terms" @click.prevent="scrollTo('#terms')">Términos y Condiciones</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

defineEmits(['cta-click'])

const currentYear = computed(() => new Date().getFullYear())

const scrollTo = (selector) => {
  const element = document.querySelector(selector)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
/* Footer Main */
.footer {
  background: #111827;
  color: white;
}

.footer-main {
  padding: 4rem 0 2rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Footer Grid */
.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: 3rem;
}

.footer-column {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Brand */
.footer-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.footer-logo {
  height: 40px;
  width: auto;
}

.footer-brand-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
}

.footer-description {
  font-size: 0.9375rem;
  line-height: 1.6;
  color: #9ca3af;
}

/* Social Links */
.footer-social {
  display: flex;
  gap: 0.75rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #1f2937;
  color: #9ca3af;
  transition: all 0.3s ease;
}

.social-icon {
  width: 20px;
  height: 20px;
}

.social-link.instagram:hover {
  background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
  color: white;
  transform: translateY(-3px);
}

.social-link.linkedin:hover {
  background: #0077b5;
  color: white;
  transform: translateY(-3px);
}

.social-link.facebook:hover {
  background: #1877f2;
  color: white;
  transform: translateY(-3px);
}

/* Footer Titles */
.footer-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.5rem;
}

/* Footer Links */
.footer-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-links a {
  font-size: 0.9375rem;
  color: #9ca3af;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: #667eea;
}

/* Contact Info */
.footer-contact {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer-contact li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.9375rem;
  color: #9ca3af;
}

.contact-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  color: #667eea;
}

.footer-contact a {
  color: #9ca3af;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-contact a:hover {
  color: white;
}

/* Footer CTA */
.footer-cta {
  margin-top: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-size: 0.9375rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.footer-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
}

/* Footer Bottom */
.footer-bottom {
  padding: 1.5rem 0;
  border-top: 1px solid #374151;
}

.footer-bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer-copyright {
  font-size: 0.875rem;
  color: #9ca3af;
}

.footer-legal {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.875rem;
}

.footer-legal a {
  color: #9ca3af;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-legal a:hover {
  color: white;
}

.separator {
  color: #4b5563;
}

/* Responsive */
@media (max-width: 968px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 2.5rem;
  }
}

@media (max-width: 640px) {
  .footer-main {
    padding: 3rem 0 1.5rem;
  }

  .footer-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .footer-column {
    gap: 1rem;
  }

  .footer-logo {
    height: 35px;
  }

  .footer-brand-name {
    font-size: 1.25rem;
  }

  .footer-bottom-content {
    flex-direction: column;
    text-align: center;
  }

  .footer-legal {
    flex-direction: column;
    gap: 0.5rem;
  }

  .separator {
    display: none;
  }

  .footer-cta {
    width: 100%;
  }
}
</style>