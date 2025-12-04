<template>
  <section class="contact">
    <div class="container">
      <!-- Header -->
      <div class="header">
        <h2 class="title">Contactanos</h2>
        <p class="subtitle">Estamos listos para impulsar tu crecimiento</p>
      </div>

      <div class="contact-wrapper">
        <!-- Contact Form -->
        <div class="form-container">
          <h3 class="form-title">Envianos tu consulta</h3>
          
          <form @submit.prevent="handleSubmit" class="contact-form">
            <div class="form-group">
              <label for="name" class="form-label">Nombre completo *</label>
              <input
                id="name"
                v-model="formData.name"
                type="text"
                class="form-input"
                placeholder="Tu nombre"
                required
              >
            </div>

            <div class="form-group">
              <label for="email" class="form-label">Email *</label>
              <input
                id="email"
                v-model="formData.email"
                type="email"
                class="form-input"
                placeholder="tu@email.com"
                required
              >
            </div>

            <div class="form-group">
              <label for="phone" class="form-label">Teléfono</label>
              <input
                id="phone"
                v-model="formData.phone"
                type="tel"
                class="form-input"
                placeholder="+54 9 11 1234-5678"
              >
            </div>

            <div class="form-group">
              <label for="type" class="form-label">Soy... *</label>
              <select
                id="type"
                v-model="formData.type"
                class="form-select"
                required
              >
                <option value="">Seleccioná una opción</option>
                <option value="empresa">Empresa</option>
                <option value="profesional">Profesional</option>
                <option value="freelancer">Freelancer</option>
                <option value="emprendedor">Emprendedor</option>
              </select>
            </div>

            <div class="form-group">
              <label for="service" class="form-label">Servicio de interés</label>
              <select
                id="service"
                v-model="formData.service"
                class="form-select"
              >
                <option value="">Seleccioná un servicio</option>
                <optgroup label="Para Empresas">
                  <option value="busqueda-seleccion">Búsqueda y Selección</option>
                  <option value="evaluaciones">Evaluaciones</option>
                  <option value="procesos-hr">Diseño y Optimización de Procesos</option>
                  <option value="recursos-humanos">Recursos Humanos</option>
                  <option value="training">Training & Team Building</option>
                  <option value="coaching">Coaching Gerencial</option>
                </optgroup>
                <optgroup label="Para Personas">
                  <option value="mentoring">Mentoring Laboral</option>
                  <option value="marca-personal">Marca Personal</option>
                  <option value="desarrollo-marca">Desarrollo de Marca</option>
                  <option value="staff-training">Staff Selection Training</option>
                </optgroup>
              </select>
            </div>

            <div class="form-group">
              <label for="message" class="form-label">Mensaje *</label>
              <textarea
                id="message"
                v-model="formData.message"
                class="form-textarea"
                placeholder="Contanos cómo podemos ayudarte..."
                rows="5"
                required
              ></textarea>
            </div>

            <button type="submit" class="submit-button" :disabled="isSubmitting">
              <span v-if="!isSubmitting">Enviar consulta</span>
              <span v-else>Enviando...</span>
            </button>

            <p v-if="submitMessage" :class="['submit-message', submitStatus]">
              {{ submitMessage }}
            </p>
          </form>
        </div>

        <!-- Contact Info -->
        <div class="info-container">
          <h3 class="info-title">Información de contacto</h3>
          
          <div class="info-items">
            <!-- Email -->
            <a :href="`mailto:${contactInfo.email}`" class="info-item">
              <div class="info-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
              </div>
              <div class="info-content">
                <p class="info-label">Email</p>
                <p class="info-value">{{ contactInfo.email }}</p>
              </div>
            </a>

            <!-- Phone -->
            <a :href="`tel:${contactInfo.phone}`" class="info-item">
              <div class="info-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <div class="info-content">
                <p class="info-label">Teléfono</p>
                <p class="info-value">{{ contactInfo.phone }}</p>
              </div>
            </a>

            <!-- WhatsApp -->
            <a :href="`https://wa.me/${contactInfo.whatsapp}`" target="_blank" class="info-item">
              <div class="info-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/>
                  <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/>
                </svg>
              </div>
              <div class="info-content">
                <p class="info-label">WhatsApp</p>
                <p class="info-value">{{ contactInfo.phoneDisplay }}</p>
              </div>
            </a>

            <!-- Location -->
            <div class="info-item">
              <div class="info-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div class="info-content">
                <p class="info-label">Ubicación</p>
                <p class="info-value">{{ contactInfo.location }}</p>
              </div>
            </div>
          </div>

          <!-- Social Links -->
          <div v-if="socialLinks.length > 0" class="social-links">
            <p class="social-title">Seguinos en redes</p>
            <div class="social-icons">
              <a 
                v-for="(social, index) in socialLinks" 
                :key="index"
                :href="social.url"
                target="_blank"
                rel="noopener noreferrer"
                class="social-icon"
                :aria-label="social.name"
              >
                <component :is="social.icon" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue';

const props = defineProps({
  contactInfo: {
    type: Object,
    default: () => ({
      email: 'contacto@aghr.com',
      phone: '+5493512345678',
      phoneDisplay: '+54 9 351 234-5678',
      whatsapp: '5493512345678',
      location: 'Córdoba, Argentina'
    })
  },
  socialLinks: {
    type: Array,
    default: () => [
      // { name: 'LinkedIn', url: 'https://linkedin.com/company/aghr', icon: 'LinkedInIcon' },
      // { name: 'Instagram', url: 'https://instagram.com/aghr', icon: 'InstagramIcon' },
      // { name: 'Facebook', url: 'https://facebook.com/aghr', icon: 'FacebookIcon' }
    ]
  }
});

const formData = reactive({
  name: '',
  email: '',
  phone: '',
  type: '',
  service: '',
  message: ''
});

const isSubmitting = ref(false);
const submitMessage = ref('');
const submitStatus = ref('');

const handleSubmit = async () => {
  isSubmitting.value = true;
  submitMessage.value = '';
  
  try {
    // Aquí iría la integración con tu backend o servicio de email
    // Por ahora simulamos el envío
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Ejemplo de integración con FormSubmit.co o similar:
    // const response = await fetch('https://formsubmit.co/ajax/tu-email@ejemplo.com', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData)
    // });
    
    submitMessage.value = '¡Mensaje enviado con éxito! Te contactaremos pronto.';
    submitStatus.value = 'success';
    
    // Limpiar formulario
    Object.keys(formData).forEach(key => formData[key] = '');
    
  } catch (error) {
    submitMessage.value = 'Hubo un error al enviar el mensaje. Por favor, intentá nuevamente.';
    submitStatus.value = 'error';
  } finally {
    isSubmitting.value = false;
    
    // Limpiar mensaje después de 5 segundos
    setTimeout(() => {
      submitMessage.value = '';
      submitStatus.value = '';
    }, 5000);
  }
};
</script>

<style scoped>
.contact {
  padding: 5rem 0;
  background: linear-gradient(180deg, #f7fafc 0%, #ffffff 100%);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Header */
.header {
  text-align: center;
  margin-bottom: 4rem;
}

.title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.125rem;
  color: #4a5568;
}

/* Contact Wrapper */
.contact-wrapper {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 3rem;
}

/* Form Container */
.form-container {
  background: white;
  padding: 2.5rem;
  border-radius: 1.5rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
}

.form-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 2rem;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #2d3748;
}

.form-input,
.form-select,
.form-textarea {
  padding: 0.875rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 1rem;
  color: #2d3748;
  transition: all 0.2s ease;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-textarea {
  resize: vertical;
  font-family: inherit;
}

.submit-button {
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0.5rem;
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.submit-message {
  padding: 1rem;
  border-radius: 0.5rem;
  text-align: center;
  font-weight: 600;
  margin-top: 1rem;
}

.submit-message.success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.submit-message.error {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

/* Info Container */
.info-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.info-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #2d3748;
}

.info-items {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info-item {
  display: flex;
  align-items: start;
  gap: 1rem;
  padding: 1.25rem;
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  text-decoration: none;
  color: inherit;
}

a.info-item:hover {
  transform: translateX(5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.info-icon {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 0.75rem;
  color: white;
}

.info-content {
  flex-grow: 1;
}

.info-label {
  font-size: 0.875rem;
  color: #718096;
  margin: 0 0 0.25rem 0;
  font-weight: 600;
}

.info-value {
  font-size: 1rem;
  color: #2d3748;
  font-weight: 600;
  margin: 0;
}

/* Social Links */
.social-links {
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 1rem;
  text-align: center;
}

.social-title {
  color: white;
  font-weight: 600;
  margin-bottom: 1rem;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.social-icon {
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  color: white;
  transition: all 0.3s ease;
  text-decoration: none;
}

.social-icon:hover {
  background: white;
  color: #667eea;
  transform: translateY(-3px);
}

/* Responsive */
@media (max-width: 968px) {
  .contact-wrapper {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .title {
    font-size: 2rem;
  }

  .form-container {
    padding: 1.5rem;
  }

  .contact {
    padding: 3rem 0;
  }
}
</style>