# Guía de Configuración del Servicio de Email

Este documento explica cómo configurar el envío de aplicaciones de trabajo y cómo migrar a un backend propio en el futuro.

## 📧 Estado Actual: EmailJS (Sin Backend)

Actualmente usamos EmailJS para enviar aplicaciones sin necesidad de backend.

### ✅ Ventajas
- Sin necesidad de programar backend
- Configuración rápida (15-20 minutos)
- Soporta archivos adjuntos (CV)
- Plan gratuito: 200 emails/mes
- Funciona en cualquier hosting estático (Netlify, Vercel, etc.)

---

## 🚀 Paso 1: Configurar EmailJS (Ahora)

### 1.1 Crear cuenta en EmailJS

1. Ve a [https://www.emailjs.com](https://www.emailjs.com)
2. Crea una cuenta gratuita
3. Verifica tu email

### 1.2 Agregar servicio de email

1. En el dashboard de EmailJS, ve a **"Email Services"**
2. Click en **"Add New Service"**
3. Selecciona tu proveedor (Gmail, Outlook, etc.)
4. Configura tus credenciales
5. **Guarda el Service ID** (ej: `service_abc123`)

### 1.3 Crear template de email

1. Ve a **"Email Templates"**
2. Click en **"Create New Template"**
3. Copia y pega este template:

```
Asunto: Nueva Aplicación - {{job_title}} en {{company}}

Nueva aplicación recibida:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 INFORMACIÓN DEL CANDIDATO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Nombre: {{from_name}}
Email: {{from_email}}
Teléfono: {{phone}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💼 POSICIÓN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Puesto: {{job_title}}
Empresa: {{company}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✉️ MENSAJE DEL CANDIDATO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

{{message}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📎 CURRICULUM VITAE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Archivo: {{cv_name}}
(Ver archivo adjunto)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Este email fue generado automáticamente desde el sitio web de AGHR.
```

4. Configura el "To email" a: `contacto@aghr.com`
5. En "Attachments", agrega: `{{cv_content}}` con nombre `{{cv_name}}`
6. **Guarda el Template ID** (ej: `template_xyz789`)

### 1.4 Obtener Public Key

1. Ve a **"Account"** → **"General"**
2. Copia tu **"Public Key"**

### 1.5 Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
VITE_EMAILJS_PUBLIC_KEY=tu_public_key_aqui
```

⚠️ **Importante:** Agrega `.env` a tu `.gitignore` para no subir las credenciales.

### 1.6 Probar el formulario

1. Ejecuta `npm run dev`
2. Ve a la página de Búsquedas
3. Abre un trabajo y haz click en "Aplicar a esta posición"
4. Completa el formulario y envía
5. Verifica que recibiste el email en `contacto@aghr.com`

---

## 🏗️ Paso 2: Migrar a Backend Propio (Futuro)

Cuando AGHR crezca y necesites más control, puedes migrar a tu propio backend.

### 2.1 ¿Cuándo migrar?

Considera migrar cuando:
- Superes los 200 emails/mes del plan gratuito
- Necesites almacenar aplicaciones en una base de datos
- Quieras análisis más detallados
- Necesites enviar emails automáticos de confirmación a candidatos

### 2.2 Arquitectura recomendada

```
Frontend (Vue.js)
    ↓
Backend API (Node.js + Express)
    ↓
Servicio de Email (Nodemailer/SendGrid/AWS SES)
    ↓
Base de Datos (MongoDB/PostgreSQL) - Opcional
```

### 2.3 Ejemplo de Backend con Node.js

Crea un archivo `server/routes/applications.js`:

```javascript
const express = require('express')
const multer = require('multer')
const nodemailer = require('nodemailer')
const router = express.Router()

// Configurar multer para archivos
const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf' ||
        file.mimetype.includes('word')) {
      cb(null, true)
    } else {
      cb(new Error('Solo PDF o Word'))
    }
  }
})

// Configurar nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
})

// Endpoint para recibir aplicaciones
router.post('/applications', upload.single('cv'), async (req, res) => {
  try {
    const { name, email, phone, message, jobTitle, company } = req.body
    const cv = req.file

    // Enviar email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'contacto@aghr.com',
      subject: `Nueva Aplicación: ${jobTitle} en ${company}`,
      html: `
        <h2>Nueva Aplicación Recibida</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone}</p>
        <p><strong>Puesto:</strong> ${jobTitle}</p>
        <p><strong>Empresa:</strong> ${company}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `,
      attachments: [{
        filename: cv.originalname,
        content: cv.buffer
      }]
    })

    // Opcional: Guardar en base de datos
    // await Application.create({ name, email, phone, jobTitle, ... })

    res.json({
      success: true,
      message: 'Aplicación enviada exitosamente'
    })

  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({
      success: false,
      message: 'Error al enviar aplicación'
    })
  }
})

module.exports = router
```

### 2.4 Actualizar el servicio

En `src/services/emailService.js`, simplemente cambia:

```javascript
// Línea 39: Comenta EmailJS
// return await sendViaEmailJS(applicationData, jobData)

// Línea 47: Descomenta Backend
return await sendViaBackend(applicationData, jobData)
```

Y configura la variable de entorno:

```env
VITE_BACKEND_URL=https://tudominio.com
```

**¡Eso es todo!** El componente JobBoard no necesita cambios.

---

## 📊 Comparación de Opciones

| Característica | EmailJS | Backend Propio |
|----------------|---------|----------------|
| Dificultad | ⭐ Fácil | ⭐⭐⭐⭐ Avanzado |
| Costo inicial | Gratis | $5-20/mes hosting |
| Límite emails | 200/mes gratis | Ilimitado |
| Base de datos | ❌ No | ✅ Sí |
| Personalización | ⭐⭐ Media | ⭐⭐⭐⭐⭐ Total |
| Mantenimiento | ⭐ Mínimo | ⭐⭐⭐ Regular |
| Archivos adjuntos | ✅ Sí | ✅ Sí |

---

## 🔒 Seguridad

### EmailJS
- ✅ Las credenciales están en variables de entorno
- ✅ EmailJS valida el origen del request
- ✅ No expones tu email password

### Backend Propio
- ⚠️ Implementa rate limiting
- ⚠️ Valida todos los inputs
- ⚠️ Usa HTTPS
- ⚠️ Implementa CORS correctamente

---

## 📞 Soporte

Si tienes dudas:
- EmailJS: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- Nodemailer: [https://nodemailer.com/](https://nodemailer.com/)

---

## ✅ Checklist de Implementación

### Para producción con EmailJS:
- [ ] Crear cuenta en EmailJS
- [ ] Configurar servicio de email
- [ ] Crear template de email
- [ ] Copiar Service ID, Template ID y Public Key
- [ ] Crear archivo `.env` con las credenciales
- [ ] Agregar `.env` al `.gitignore`
- [ ] Probar formulario en desarrollo
- [ ] Configurar variables de entorno en tu hosting (Netlify/Vercel)
- [ ] Probar formulario en producción

### Para migración a Backend (futuro):
- [ ] Crear servidor Node.js + Express
- [ ] Instalar dependencias (nodemailer, multer, etc.)
- [ ] Configurar servicio de email
- [ ] Crear endpoint `/api/applications`
- [ ] Probar endpoint con Postman
- [ ] Actualizar `VITE_BACKEND_URL` en `.env`
- [ ] Cambiar `emailService.js` para usar backend
- [ ] Deploy del backend
- [ ] Probar integración completa

---

**Última actualización:** Diciembre 2025
