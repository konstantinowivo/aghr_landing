/**
 * Email Service
 *
 * Este servicio maneja el envío de emails para aplicaciones de trabajo.
 * Actualmente usa EmailJS, pero está diseñado para migrar fácilmente a un backend propio.
 *
 * MIGRACIÓN A BACKEND:
 * Cuando implementes tu backend, solo necesitas modificar las funciones en este archivo.
 * El componente JobBoard no necesitará cambios.
 */

// ===========================================
// CONFIGURACIÓN - EmailJS (Temporal)
// ===========================================
// TODO: Configurar estas variables con tus credenciales de EmailJS
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'

// Email de destino para las aplicaciones
const RECIPIENT_EMAIL = 'contacto@aghr.com'

/**
 * Envía una aplicación de trabajo
 *
 * @param {Object} applicationData - Datos de la aplicación
 * @param {string} applicationData.name - Nombre completo del candidato
 * @param {string} applicationData.email - Email del candidato
 * @param {string} applicationData.phone - Teléfono del candidato (opcional)
 * @param {File} applicationData.cv - Archivo CV del candidato
 * @param {string} applicationData.message - Mensaje del candidato (opcional)
 * @param {Object} jobData - Datos del trabajo
 * @param {string} jobData.title - Título del puesto
 * @param {string} jobData.company - Nombre de la empresa
 * @returns {Promise<Object>} - Resultado del envío
 */
export const sendJobApplication = async (applicationData, jobData) => {
  try {
    // Validar datos requeridos
    if (!applicationData.name || !applicationData.email || !applicationData.cv) {
      throw new Error('Faltan campos obligatorios')
    }

    // Validar CV
    if (applicationData.cv.size > 5 * 1024 * 1024) {
      throw new Error('El archivo CV es muy grande (máximo 5MB)')
    }

    // ========================================
    // Usar Backend Propio (Node.js + Vercel Functions)
    // ========================================
    return await sendViaBackend(applicationData, jobData)

    // ========================================
    // OPCIÓN FALLBACK: EmailJS (si necesitas volver)
    // ========================================
    // Si quieres volver a EmailJS, comenta la línea de arriba
    // y descomenta esta línea:
    // return await sendViaEmailJS(applicationData, jobData)

  } catch (error) {
    console.error('Error al enviar aplicación:', error)
    throw error
  }
}

/**
 * Envío vía EmailJS (Implementación actual)
 * Esta función usa EmailJS para enviar emails sin backend
 */
const sendViaEmailJS = async (applicationData, jobData) => {
  try {
    // Cargar EmailJS dinámicamente
    const emailjs = await loadEmailJS()

    // Convertir CV a base64 para enviarlo como adjunto
    const cvBase64 = await fileToBase64(applicationData.cv)

    // Preparar template params para EmailJS
    const templateParams = {
      to_email: RECIPIENT_EMAIL,
      from_name: applicationData.name,
      from_email: applicationData.email,
      phone: applicationData.phone || 'No proporcionado',
      job_title: jobData.title,
      company: jobData.company,
      message: applicationData.message || 'Sin mensaje adicional',
      cv_name: applicationData.cv.name,
      cv_content: cvBase64
    }

    // Enviar email usando EmailJS
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    )

    return {
      success: true,
      message: 'Aplicación enviada exitosamente',
      data: response
    }

  } catch (error) {
    console.error('Error en EmailJS:', error)

    // Fallback: Usar mailto como respaldo
    return sendViaMailto(applicationData, jobData)
  }
}

/**
 * Envío vía Backend propio (Vercel Serverless Functions)
 *
 * Usa el endpoint /api/job-application para enviar aplicaciones con CV
 */
const sendViaBackend = async (applicationData, jobData) => {
  try {
    // Crear FormData para enviar al backend
    const formData = new FormData()
    formData.append('name', applicationData.name)
    formData.append('email', applicationData.email)
    formData.append('phone', applicationData.phone || '')
    formData.append('message', applicationData.message || '')
    formData.append('cv', applicationData.cv)
    formData.append('jobTitle', jobData.title)
    formData.append('company', jobData.company)

    // Enviar al backend (Vercel Function)
    const response = await fetch('/api/job-application', {
      method: 'POST',
      body: formData
      // No agregar Content-Type header, el navegador lo configura automáticamente con boundary
    })

    const result = await response.json()

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Error al enviar la aplicación')
    }

    return {
      success: true,
      message: result.message || 'Aplicación enviada exitosamente',
      data: result
    }

  } catch (error) {
    console.error('Error en backend:', error)
    throw new Error(error.message || 'No se pudo enviar la aplicación. Por favor, intenta nuevamente.')
  }
}

/**
 * Fallback: Envío vía mailto
 * Se usa como último recurso si EmailJS falla
 */
const sendViaMailto = (applicationData, jobData) => {
  const subject = `Nueva Aplicación: ${jobData.title} en ${jobData.company}`
  const body = `
Nombre: ${applicationData.name}
Email: ${applicationData.email}
Teléfono: ${applicationData.phone || 'No proporcionado'}

Mensaje:
${applicationData.message || 'Sin mensaje adicional'}

Nota: El CV fue adjuntado por el candidato (${applicationData.cv.name})
Por favor, solicítalo directamente al email del candidato.
  `.trim()

  window.location.href = `mailto:${RECIPIENT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

  return {
    success: true,
    message: 'Se abrió tu cliente de correo. Por favor, adjunta tu CV manualmente.',
    fallback: true
  }
}

/**
 * Utilidades
 */

// Cargar EmailJS dinámicamente
const loadEmailJS = async () => {
  if (window.emailjs) {
    return window.emailjs
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js'
    script.onload = () => {
      window.emailjs.init(EMAILJS_PUBLIC_KEY)
      resolve(window.emailjs)
    }
    script.onerror = reject
    document.head.appendChild(script)
  })
}

// Convertir archivo a base64
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

/**
 * CONFIGURACIÓN DE VARIABLES DE ENTORNO
 *
 * Crea un archivo .env en la raíz del proyecto con:
 *
 * # EmailJS (Temporal)
 * VITE_EMAILJS_SERVICE_ID=tu_service_id
 * VITE_EMAILJS_TEMPLATE_ID=tu_template_id
 * VITE_EMAILJS_PUBLIC_KEY=tu_public_key
 *
 * # Backend (Futuro)
 * VITE_BACKEND_URL=https://tudominio.com
 */
