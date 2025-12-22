# ✅ Checklist de Deployment - AGHR

## 📋 Antes de Subir a Producción

### 1. Configurar EmailJS (Obligatorio)

- [ ] Crear cuenta en [EmailJS](https://www.emailjs.com)
- [ ] Configurar servicio de email (Gmail, Outlook, etc.)
- [ ] Crear template de email para aplicaciones (ver `EMAIL_SERVICE_GUIDE.md`)
- [ ] Obtener credenciales: Service ID, Template ID, Public Key
- [ ] Probar envío de emails en desarrollo

### 2. Variables de Entorno

- [ ] Crear archivo `.env` basado en `.env.example`
- [ ] Completar las 3 variables de EmailJS
- [ ] Verificar que `.env` está en `.gitignore`
- [ ] **NO subir `.env` a Git**

### 3. Testing Local

- [ ] Probar formulario de aplicación con un CV de prueba
- [ ] Verificar que llega el email a `contacto@aghr.com`
- [ ] Verificar que el CV se adjunta correctamente
- [ ] Probar en mobile (responsive)

### 4. Build del Proyecto

```bash
npm run build
```

- [ ] Verificar que no hay errores en el build
- [ ] Verificar que el tamaño del bundle es aceptable

### 5. Deployment en Netlify/Vercel

#### Netlify:
1. Conecta tu repositorio de GitHub
2. Configura build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Agrega variables de entorno en **Site settings** → **Environment variables**:
   ```
   VITE_EMAILJS_SERVICE_ID=tu_valor
   VITE_EMAILJS_TEMPLATE_ID=tu_valor
   VITE_EMAILJS_PUBLIC_KEY=tu_valor
   ```
4. Deploy!

#### Vercel:
1. Importa tu repositorio
2. Framework preset: Vite
3. Agrega variables de entorno en **Settings** → **Environment Variables**
4. Deploy!

### 6. Post-Deployment

- [ ] Probar el sitio en producción
- [ ] Enviar una aplicación de prueba desde producción
- [ ] Verificar que llega el email
- [ ] Verificar analytics (si aplica)
- [ ] Verificar SEO básico

---

## 🚀 Migración a Backend (Futuro)

Cuando necesites migrar a backend propio:

1. [ ] Implementar backend (ver `EMAIL_SERVICE_GUIDE.md` sección 2.3)
2. [ ] Configurar variable `VITE_BACKEND_URL` en `.env`
3. [ ] En `src/services/emailService.js`:
   - Comentar línea 39 (EmailJS)
   - Descomentar línea 47 (Backend)
4. [ ] Deploy del backend
5. [ ] Probar integración completa

---

## 📧 Emails de Contacto

Las aplicaciones se envían a: **contacto@aghr.com**

Para cambiar el email de destino, edita:
- `src/services/emailService.js` → línea 11 (`RECIPIENT_EMAIL`)

---

## 🔧 Solución de Problemas

### No llegan los emails
1. Verifica las credenciales de EmailJS en `.env`
2. Verifica que el email de destino es correcto
3. Revisa la consola del navegador por errores
4. Verifica que el servicio de EmailJS está activo

### Error al cargar CV
1. Verifica que el archivo es PDF/Word
2. Verifica que pesa menos de 5MB
3. Revisa la consola del navegador

### Build falla
1. Verifica que todas las dependencias están instaladas
2. Ejecuta `npm install`
3. Revisa errores de TypeScript/ESLint

---

## 📞 Soporte

- Documentación EmailJS: https://www.emailjs.com/docs/
- Guía completa: `EMAIL_SERVICE_GUIDE.md`

---

**Última actualización:** Diciembre 2025
