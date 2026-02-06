# Configuración del Backend - Sistema de Formularios

Este documento explica cómo configurar el backend para los formularios de contacto y aplicaciones de trabajo.

## 📋 Resumen

El backend usa **Vercel Serverless Functions** con **Node.js** y **Nodemailer** para enviar emails a través de Gmail SMTP.

### ✅ Características

- **Sin servidor**: Se ejecuta en Vercel Functions (gratis hasta 100K requests/mes)
- **Sin base de datos**: Solo envía emails, no guarda datos
- **Simple**: Solo necesitas una cuenta Gmail
- **Seguro**: Credenciales protegidas en variables de entorno

## 🏗️ Arquitectura

```
api/
├── contact.js              # Endpoint para formulario de contacto
├── job-application.js      # Endpoint para aplicaciones de trabajo con CV
└── utils/
    └── email.js            # Configuración de Nodemailer

Frontend:
├── src/components/sections/ContactForm.vue    # Usa /api/contact
└── src/services/emailService.js               # Usa /api/job-application
```

## 🚀 Configuración Paso a Paso

### 1. Configurar Gmail App Password

**IMPORTANTE**: Necesitas una **App Password** de Gmail (NO tu contraseña normal).

#### Pasos:

1. **Habilita la verificación en 2 pasos**:
   - Ve a https://myaccount.google.com/security
   - Busca "Verificación en 2 pasos" y actívala

2. **Genera una App Password**:
   - Ve a https://myaccount.google.com/apppasswords
   - En "Seleccionar app", elige **Correo**
   - En "Seleccionar dispositivo", elige **Otro (nombre personalizado)**
   - Escribe "AGHR Backend" o similar
   - Haz clic en **Generar**

3. **Copia la contraseña**:
   - Google te mostrará una contraseña de 16 caracteres (ejemplo: `xxxx xxxx xxxx xxxx`)
   - Cópiala sin espacios: `xxxxxxxxxxxxxxxx`
   - **GUÁRDALA**: No podrás verla de nuevo

### 2. Configurar Variables de Entorno

#### Para Desarrollo Local:

1. Copia `.env.example` a `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edita `.env` con tus credenciales:
   ```env
   EMAIL_USER=tu-email@gmail.com
   EMAIL_PASS=xxxxxxxxxxxxxxxx    # App Password de Gmail (sin espacios)
   EMAIL_TO=hola@aghr-consulting.com
   ```

3. **NUNCA** subas `.env` a Git (ya está en `.gitignore`)

#### Para Producción (Vercel):

1. **Ve a tu proyecto en Vercel Dashboard**:
   - https://vercel.com/tu-usuario/aghr-landing

2. **Agrega las variables de entorno**:
   - Ve a **Settings** → **Environment Variables**
   - Agrega estas 3 variables:

   | Name        | Value                     | Environment            |
   |-------------|---------------------------|------------------------|
   | EMAIL_USER  | tu-email@gmail.com        | Production, Preview    |
   | EMAIL_PASS  | xxxxxxxxxxxxxxxx          | Production, Preview    |
   | EMAIL_TO    | hola@aghr-consulting.com  | Production, Preview    |

3. **Deploy nuevamente**:
   ```bash
   git push
   ```
   O desde Vercel Dashboard: **Deployments** → **Redeploy**

## 🧪 Testing Local

### 1. Instalar Vercel CLI:

```bash
npm install -g vercel
```

### 2. Ejecutar en modo desarrollo:

```bash
vercel dev
```

Esto iniciará:
- Frontend en `http://localhost:3000`
- API en `http://localhost:3000/api/*`

### 3. Probar los endpoints:

#### Probar formulario de contacto:
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Usuario",
    "email": "test@example.com",
    "phone": "+54 9 11 1234-5678",
    "type": "empresa",
    "service": "busqueda-seleccion",
    "message": "Este es un mensaje de prueba"
  }'
```

#### Probar aplicación de trabajo (con CV):
```bash
curl -X POST http://localhost:3000/api/job-application \
  -F "name=Test Candidato" \
  -F "email=candidato@example.com" \
  -F "phone=+54 9 11 1234-5678" \
  -F "jobTitle=Desarrollador Frontend" \
  -F "company=AGHR Consulting" \
  -F "message=Mensaje de prueba" \
  -F "cv=@path/to/your/cv.pdf"
```

## 📧 Emails Enviados

### Formulario de Contacto:

- **Para**: `EMAIL_TO` (configurable)
- **Asunto**: `Nuevo contacto desde AGHR - [tipo]`
- **Contiene**:
  - Nombre, email, teléfono
  - Tipo (empresa/profesional/etc.)
  - Servicio de interés
  - Mensaje

### Aplicación de Trabajo:

- **Para**: `EMAIL_TO` (configurable)
- **Asunto**: `Nueva Aplicación: [puesto] - [nombre]`
- **Contiene**:
  - Nombre, email, teléfono del candidato
  - Puesto y empresa
  - Mensaje del candidato
  - **CV adjunto** (PDF/DOC/DOCX)

## 🔒 Seguridad

### ✅ Implementado:

- CORS configurado para permitir requests desde el frontend
- Validación de campos requeridos
- Validación de formato de email
- Sanitización de HTML tags
- Límite de tamaño de archivos (5MB)
- Solo permite PDF, DOC, DOCX para CVs
- Variables de entorno protegidas

### ⚠️ Limitaciones de Gmail:

- **500 emails/día** como máximo
- Si necesitas más volumen, migra a SendGrid/Mailgun (fácil cambio)

## 🐛 Troubleshooting

### Error: "EMAIL_USER y EMAIL_PASS deben estar configurados"

**Solución**: Las variables de entorno no están configuradas.
- Local: Revisa tu archivo `.env`
- Vercel: Agrega las variables en Dashboard → Settings → Environment Variables

### Error: "Invalid login"

**Solución**: Estás usando tu contraseña normal en lugar del App Password.
- Genera un nuevo App Password siguiendo los pasos de arriba
- Usa el App Password sin espacios

### Error: "Error del servidor: 500"

**Solución**: Revisa los logs en Vercel:
- Ve a Vercel Dashboard → Tu proyecto → Deployments
- Haz clic en el deployment actual
- Ve a la pestaña "Functions"
- Revisa los logs de `/api/contact` o `/api/job-application`

### Los emails no llegan

**Solución**:
1. Revisa la carpeta de **Spam** en `EMAIL_TO`
2. Verifica que `EMAIL_USER` y `EMAIL_TO` sean válidos
3. Revisa los logs en Vercel
4. Prueba enviar un email de prueba desde Gmail para verificar que funciona

## 📊 Monitoreo

### Ver logs en tiempo real (local):

```bash
vercel dev
```

Los logs aparecerán en la consola.

### Ver logs en producción (Vercel):

1. Ve a Vercel Dashboard
2. Tu proyecto → Deployments
3. Haz clic en el deployment actual
4. Pestaña **Functions**
5. Selecciona la función (`/api/contact` o `/api/job-application`)
6. Verás todos los logs y errores

## 🚀 Deploy a Producción

### Opción 1: Git Push (Recomendado)

```bash
git add .
git commit -m "feat: add backend for contact and job application forms"
git push
```

Vercel detectará el push y deployará automáticamente.

### Opción 2: Vercel CLI

```bash
vercel --prod
```

## 🔄 Migrar a Otro Servicio de Email

Si necesitas más de 500 emails/día, puedes migrar a SendGrid o Mailgun:

### Opción 1: SendGrid (100 emails/día gratis)

1. Instala el SDK:
   ```bash
   npm install @sendgrid/mail
   ```

2. Modifica `api/utils/email.js`:
   ```javascript
   const sgMail = require('@sendgrid/mail');
   sgMail.setApiKey(process.env.SENDGRID_API_KEY);
   
   // Reemplaza createTransporter() con sgMail.send()
   ```

3. Agrega `SENDGRID_API_KEY` a las variables de entorno

### Opción 2: Mailgun (5000 emails/mes gratis)

Similar a SendGrid, cambia el transportador en `api/utils/email.js`.

## 📝 Notas Adicionales

- El backend **NO guarda** las aplicaciones en una base de datos
- Solo envía emails con la información
- Si necesitas guardar datos, considera agregar Supabase o Firebase

## 🆘 Soporte

Si tienes problemas:
1. Revisa los logs en Vercel Dashboard
2. Verifica que las variables de entorno estén configuradas
3. Prueba localmente con `vercel dev`
4. Revisa la carpeta de Spam en el email destino

---

**¡Todo listo!** 🎉 Tu backend de formularios está configurado y funcionando.
