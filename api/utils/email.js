/**
 * Email Utility - Nodemailer Configuration
 *
 * Configura y exporta funciones para enviar emails usando Nodemailer con Gmail SMTP
 */

const nodemailer = require('nodemailer');

/**
 * Crea un transportador de Nodemailer con configuración de Gmail
 * @returns {Object} Transportador de Nodemailer
 */
const createTransporter = () => {
  // Validar que las variables de entorno estén configuradas
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error('EMAIL_USER y EMAIL_PASS deben estar configurados en las variables de entorno');
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS // Debe ser un App Password de Gmail
    }
  });
};

/**
 * Envía un email de formulario de contacto
 * @param {Object} data - Datos del formulario
 * @returns {Promise<Object>} Resultado del envío
 */
const sendContactEmail = async (data) => {
  const transporter = createTransporter();
  const recipientEmail = process.env.EMAIL_TO || process.env.EMAIL_USER;

  const mailOptions = {
    from: `"${data.name}" <${process.env.EMAIL_USER}>`,
    to: recipientEmail,
    replyTo: data.email,
    subject: `Nuevo contacto desde AGHR - ${data.type || 'General'}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 10px;">
        <div style="background: linear-gradient(135deg, #5568D3 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Nuevo Contacto - AGHR</h1>
        </div>

        <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #2d3748; margin-top: 0;">Información del Contacto</h2>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #5568D3; width: 150px;">Nombre:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #4b5563;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #5568D3;">Email:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #4b5563;">${data.email}</td>
            </tr>
            ${data.phone ? `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #5568D3;">Teléfono:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #4b5563;">${data.phone}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #5568D3;">Tipo:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #4b5563; text-transform: capitalize;">${data.type || 'No especificado'}</td>
            </tr>
            ${data.service ? `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #5568D3;">Servicio:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #4b5563;">${data.service}</td>
            </tr>
            ` : ''}
          </table>

          <div style="margin-top: 30px;">
            <h3 style="color: #2d3748; margin-bottom: 10px;">Mensaje:</h3>
            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; border-left: 4px solid #5568D3;">
              <p style="color: #4b5563; line-height: 1.6; margin: 0; white-space: pre-wrap;">${data.message}</p>
            </div>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #9ca3af; font-size: 12px;">
            <p style="margin: 5px 0;">Este mensaje fue enviado desde el formulario de contacto de AGHR Consulting</p>
            <p style="margin: 5px 0;">Fecha: ${new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' })}</p>
          </div>
        </div>
      </div>
    `,
    text: `
Nuevo Contacto - AGHR
=====================

Nombre: ${data.name}
Email: ${data.email}
${data.phone ? `Teléfono: ${data.phone}` : ''}
Tipo: ${data.type || 'No especificado'}
${data.service ? `Servicio: ${data.service}` : ''}

Mensaje:
${data.message}

---
Enviado el: ${new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' })}
    `
  };

  return await transporter.sendMail(mailOptions);
};

/**
 * Envía un email de aplicación de trabajo con CV adjunto
 * @param {Object} data - Datos del formulario
 * @param {Object} jobData - Datos del trabajo
 * @param {Buffer} cvBuffer - Buffer del archivo CV
 * @param {string} cvFilename - Nombre del archivo CV
 * @returns {Promise<Object>} Resultado del envío
 */
const sendJobApplicationEmail = async (data, jobData, cvBuffer, cvFilename) => {
  const transporter = createTransporter();
  const recipientEmail = process.env.EMAIL_TO || process.env.EMAIL_USER;

  const mailOptions = {
    from: `"${data.name}" <${process.env.EMAIL_USER}>`,
    to: recipientEmail,
    replyTo: data.email,
    subject: `Nueva Aplicación: ${jobData.title} - ${data.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 10px;">
        <div style="background: linear-gradient(135deg, #5568D3 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Nueva Aplicación de Trabajo</h1>
        </div>

        <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px;">
          <div style="background-color: #f0f4ff; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #5568D3;">
            <h2 style="color: #2d3748; margin: 0 0 5px 0; font-size: 20px;">${jobData.title}</h2>
            <p style="color: #6b7280; margin: 0; font-size: 14px;">${jobData.company}</p>
          </div>

          <h3 style="color: #2d3748; margin-top: 20px;">Información del Candidato</h3>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #5568D3; width: 150px;">Nombre:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #4b5563;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #5568D3;">Email:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #4b5563;">${data.email}</td>
            </tr>
            ${data.phone ? `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #5568D3;">Teléfono:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #4b5563;">${data.phone}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #5568D3;">CV Adjunto:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #4b5563;">${cvFilename}</td>
            </tr>
          </table>

          ${data.message ? `
          <div style="margin-top: 30px;">
            <h3 style="color: #2d3748; margin-bottom: 10px;">Mensaje del Candidato:</h3>
            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; border-left: 4px solid #5568D3;">
              <p style="color: #4b5563; line-height: 1.6; margin: 0; white-space: pre-wrap;">${data.message}</p>
            </div>
          </div>
          ` : ''}

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #9ca3af; font-size: 12px;">
            <p style="margin: 5px 0;">Este mensaje fue enviado desde el portal de búsquedas de AGHR Consulting</p>
            <p style="margin: 5px 0;">Fecha: ${new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' })}</p>
          </div>
        </div>
      </div>
    `,
    text: `
Nueva Aplicación de Trabajo
============================

PUESTO: ${jobData.title}
EMPRESA: ${jobData.company}

CANDIDATO
---------
Nombre: ${data.name}
Email: ${data.email}
${data.phone ? `Teléfono: ${data.phone}` : ''}
CV: ${cvFilename} (ver adjunto)

${data.message ? `MENSAJE:\n${data.message}\n` : ''}

---
Enviado el: ${new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' })}
    `,
    attachments: [
      {
        filename: cvFilename,
        content: cvBuffer
      }
    ]
  };

  return await transporter.sendMail(mailOptions);
};

module.exports = {
  sendContactEmail,
  sendJobApplicationEmail
};
