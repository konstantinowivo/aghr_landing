/**
 * Vercel Serverless Function: Contact Form
 *
 * Endpoint: POST /api/contact
 * Recibe datos del formulario de contacto y envía un email
 */

const { sendContactEmail } = require('./utils/email');

/**
 * Handler principal de la función serverless
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
module.exports = async (req, res) => {
  // Configurar CORS para permitir requests desde el frontend
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Manejar preflight requests (OPTIONS)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Solo permitir método POST
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Método no permitido. Use POST.'
    });
  }

  try {
    // Obtener datos del body
    const { name, email, phone, type, service, message } = req.body;

    // Validar campos requeridos
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Faltan campos obligatorios: name, email, message'
      });
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'El email no tiene un formato válido'
      });
    }

    // Validar longitud de campos
    if (name.length > 100) {
      return res.status(400).json({
        success: false,
        message: 'El nombre es muy largo (máximo 100 caracteres)'
      });
    }

    if (message.length > 2000) {
      return res.status(400).json({
        success: false,
        message: 'El mensaje es muy largo (máximo 2000 caracteres)'
      });
    }

    // Sanitizar datos (remover HTML tags básicos)
    const sanitize = (str) => str.replace(/<[^>]*>/g, '').trim();

    const sanitizedData = {
      name: sanitize(name),
      email: sanitize(email),
      phone: phone ? sanitize(phone) : '',
      type: type ? sanitize(type) : '',
      service: service ? sanitize(service) : '',
      message: sanitize(message)
    };

    // Enviar email
    await sendContactEmail(sanitizedData);

    // Guardar en Supabase (fire-and-forget — no bloquea la respuesta)
    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (supabaseUrl && serviceKey) {
      fetch(`${supabaseUrl}/rest/v1/contact_submissions`, {
        method: 'POST',
        headers: {
          'apikey': serviceKey,
          'Authorization': `Bearer ${serviceKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(sanitizedData)
      }).catch(err => console.error('Supabase insert error:', err));
    }

    // Respuesta exitosa
    return res.status(200).json({
      success: true,
      message: 'Mensaje enviado exitosamente. Te contactaremos pronto.'
    });

  } catch (error) {
    console.error('Error en /api/contact:', error);

    // Diferenciar tipos de errores
    if (error.message.includes('EMAIL_USER') || error.message.includes('EMAIL_PASS')) {
      return res.status(500).json({
        success: false,
        message: 'Error de configuración del servidor. Por favor, contacta al administrador.'
      });
    }

    // Error genérico
    return res.status(500).json({
      success: false,
      message: 'Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.'
    });
  }
};
