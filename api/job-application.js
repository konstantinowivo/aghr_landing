/**
 * Vercel Serverless Function: Job Application
 *
 * Endpoint: POST /api/job-application
 * Sube el CV a Supabase Storage, guarda la postulación en la tabla applications
 * y envía el email con el CV adjunto.
 */

const { sendJobApplicationEmail } = require('./utils/email');
const multer = require('multer');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    allowed.includes(file.mimetype)
      ? cb(null, true)
      : cb(new Error('Formato de archivo no válido. Solo se permiten PDF, DOC, DOCX.'), false);
  }
});

const runMiddleware = (req, res, fn) =>
  new Promise((resolve, reject) => {
    fn(req, res, (result) => (result instanceof Error ? reject(result) : resolve(result)));
  });

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Método no permitido. Use POST.' });
  }

  try {
    await runMiddleware(req, res, upload.single('cv'));

    const { name, email, phone, message, jobTitle, company } = req.body;

    if (!name || !email || !jobTitle || !company) {
      return res.status(400).json({ success: false, message: 'Faltan campos obligatorios: name, email, jobTitle, company' });
    }
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'El CV es obligatorio' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'El email no tiene un formato válido' });
    }
    if (name.length > 100) {
      return res.status(400).json({ success: false, message: 'El nombre es muy largo (máximo 100 caracteres)' });
    }
    if (message && message.length > 2000) {
      return res.status(400).json({ success: false, message: 'El mensaje es muy largo (máximo 2000 caracteres)' });
    }

    const sanitize = (str) => str.replace(/<[^>]*>/g, '').trim();
    const sanitizedData = {
      name: sanitize(name),
      email: sanitize(email),
      phone: phone ? sanitize(phone) : null,
      message: message ? sanitize(message) : null,
    };
    const jobData = {
      title: sanitize(jobTitle),
      company: sanitize(company),
    };

    const cvBuffer = req.file.buffer;
    const cvFilename = req.file.originalname;

    // Guardar en Supabase (CV a Storage + registro en tabla)
    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (supabaseUrl && serviceKey) {
      // Intentar subir CV al bucket 'applications' (no bloquea el insert si falla)
      let cvPath = null;
      try {
        const safeName = cvFilename.replace(/[^a-zA-Z0-9._-]/g, '_');
        cvPath = `${Date.now()}-${safeName}`;
        const uploadRes = await fetch(
          `${supabaseUrl}/storage/v1/object/applications/${cvPath}`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${serviceKey}`,
              'Content-Type': req.file.mimetype,
            },
            body: cvBuffer,
          }
        );
        if (!uploadRes.ok) {
          const errText = await uploadRes.text();
          console.error('Supabase storage upload error:', errText);
          cvPath = null;
        }
      } catch (err) {
        console.error('Supabase storage fetch error:', err);
        cvPath = null;
      }

      // Guardar registro en tabla applications (siempre, independiente del CV)
      fetch(`${supabaseUrl}/rest/v1/applications`, {
        method: 'POST',
        headers: {
          'apikey': serviceKey,
          'Authorization': `Bearer ${serviceKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify({
          job_title: jobData.title,
          company: jobData.company,
          name: sanitizedData.name,
          email: sanitizedData.email,
          phone: sanitizedData.phone,
          message: sanitizedData.message,
          cv_url: cvPath,
          cv_filename: cvFilename,
        }),
      }).catch(err => console.error('Supabase insert error:', err));
    }

    // Enviar email con CV adjunto (independiente de Supabase)
    await sendJobApplicationEmail(sanitizedData, jobData, cvBuffer, cvFilename);

    return res.status(200).json({ success: true, message: 'Aplicación enviada exitosamente. Te contactaremos pronto.' });

  } catch (error) {
    console.error('Error en /api/job-application:', error);

    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ success: false, message: 'El archivo es muy grande (máximo 5MB)' });
    }
    if (error.message?.includes('Formato de archivo no válido')) {
      return res.status(400).json({ success: false, message: error.message });
    }
    if (error.message?.includes('EMAIL_USER') || error.message?.includes('EMAIL_PASS')) {
      return res.status(500).json({ success: false, message: 'Error de configuración del servidor.' });
    }

    return res.status(500).json({ success: false, message: 'Hubo un error al enviar la aplicación. Por favor, intenta nuevamente.' });
  }
};
