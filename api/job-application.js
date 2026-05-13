/**
 * Vercel Serverless Function: Job Application
 *
 * Endpoint: POST /api/job-application
 * Recibe datos de aplicación de trabajo con CV adjunto y envía un email
 */

const { sendJobApplicationEmail } = require('./utils/email');
const multer = require('multer');

// Configurar multer para manejar uploads en memoria (Vercel no tiene filesystem persistente)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB máximo
  },
  fileFilter: (req, file, cb) => {
    // Validar tipos de archivo permitidos
    const allowedMimeTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Formato de archivo no válido. Solo se permiten PDF, DOC, DOCX.'), false);
    }
  }
});

/**
 * Wrapper para usar multer con Vercel Serverless Functions
 */
const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

/**
 * Handler principal de la función serverless
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
module.exports = async (req, res) => {
  // Configurar CORS
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
    // Ejecutar multer para procesar el archivo
    await runMiddleware(req, res, upload.single('cv'));

    // Obtener datos del formulario
    const { name, email, phone, message, jobTitle, company } = req.body;

    // Validar campos requeridos
    if (!name || !email || !jobTitle || !company) {
      return res.status(400).json({
        success: false,
        message: 'Faltan campos obligatorios: name, email, jobTitle, company'
      });
    }

    // Validar que se haya subido el CV
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'El CV es obligatorio'
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

    if (message && message.length > 2000) {
      return res.status(400).json({
        success: false,
        message: 'El mensaje es muy largo (máximo 2000 caracteres)'
      });
    }

    // Sanitizar datos
    const sanitize = (str) => str.replace(/<[^>]*>/g, '').trim();

    const sanitizedData = {
      name: sanitize(name),
      email: sanitize(email),
      phone: phone ? sanitize(phone) : '',
      message: message ? sanitize(message) : ''
    };

    const jobData = {
      title: sanitize(jobTitle),
      company: sanitize(company)
    };

    // Obtener buffer y nombre del archivo
    const cvBuffer = req.file.buffer;
    const cvFilename = req.file.originalname;

    // Enviar email con CV adjunto
    await sendJobApplicationEmail(sanitizedData, jobData, cvBuffer, cvFilename);

    // Respuesta exitosa
    return res.status(200).json({
      success: true,
      message: 'Aplicación enviada exitosamente. Te contactaremos pronto.'
    });

  } catch (error) {
    console.error('Error en /api/job-application:', error);

    // Errores específicos de multer
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'El archivo es muy grande (máximo 5MB)'
      });
    }

    if (error.message.includes('Formato de archivo no válido')) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    // Errores de configuración
    if (error.message.includes('EMAIL_USER') || error.message.includes('EMAIL_PASS')) {
      return res.status(500).json({
        success: false,
        message: 'Error de configuración del servidor. Por favor, contacta al administrador.'
      });
    }

    // Error genérico
    return res.status(500).json({
      success: false,
      message: 'Hubo un error al enviar la aplicación. Por favor, intenta nuevamente.'
    });
  }
};
