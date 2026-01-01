# 🚀 Guía Rápida - Optimización de Videos AGHR

## ✅ Lo que ya está hecho:

- ✅ Imágenes optimizadas (96-99% reducción)
- ✅ Lazy loading implementado
- ✅ Code splitting configurado
- ✅ Compresión gzip/brotli activa
- ✅ Build optimizado
- ✅ **Ahorro total hasta ahora: ~8 MB**

## 🎬 Siguiente Paso: Optimizar Videos

### **Videos actuales:**
- `video_oficina.mp4`: 7.5 MB
- `video_estrechar_manos.mp4`: 16.4 MB
- **Total: 23.9 MB**

### **Objetivo:**
Reducir a ~5-8 MB total (75-80% reducción)

---

## 📋 Instrucciones Paso a Paso

### **Paso 1: Instalar FFmpeg**

Elige UNA de estas opciones:

#### **Opción A - Script Automático (Recomendado):**

```bash
# Abre PowerShell como Administrador y ejecuta:
npm run install:ffmpeg
```

El script descarga e instala FFmpeg automáticamente.

#### **Opción B - Con Chocolatey:**

```bash
# Si tienes Chocolatey instalado:
choco install ffmpeg
```

#### **Opción C - Script Simple (Guiado):**

```bash
npm run install:ffmpeg-simple
```

Te guía paso a paso por las opciones de instalación.

#### **Opción D - Manual:**

Ver archivo: `INSTALL_FFMPEG.md` para instrucciones detalladas.

---

### **Paso 2: Verificar Instalación**

```bash
# Abre una NUEVA ventana de PowerShell/CMD
ffmpeg -version
```

Deberías ver algo como:
```
ffmpeg version 6.1-essentials_build
```

Si ves esto, **¡FFmpeg está listo!** ✅

---

### **Paso 3: Optimizar Videos**

```bash
# En la carpeta del proyecto:
cd C:\Users\PC\Desktop\AGHR_proyect

# Ejecutar optimización:
npm run optimize:videos
```

**Esto creará:**
- Videos MP4 optimizados (~75% más pequeños)
- Videos WebM (aún mejor compresión)
- Posters/thumbnails en JPG

**Ubicación de archivos optimizados:**
```
src/assets/videos/optimized/
  ├── video_oficina_optimized.mp4
  ├── video_oficina.webm
  ├── video_estrechar_manos_optimized.mp4
  └── video_estrechar_manos.webm

src/assets/images/video_posters/
  ├── video_oficina_poster.jpg
  └── video_estrechar_manos_poster.jpg
```

---

### **Paso 4: Optimizar Posters**

```bash
# Esto optimiza los posters generados
npm run optimize:posters
```

Crea versiones optimizadas JPG + WebP de los posters.

---

### **Paso 5: Actualizar Código**

Edita `src/components/sections/HeroSection.vue`:

```javascript
// ANTES:
import video1 from '../../assets/videos/video_oficina.mp4'
import video2 from '../../assets/videos/video_estrechar_manos.mp4'

const videos = [video1, video2]

// DESPUÉS:
import video1MP4 from '../../assets/videos/optimized/video_oficina_optimized.mp4'
import video1WebM from '../../assets/videos/optimized/video_oficina.webm'
import video1Poster from '../../assets/images/video_posters/video_oficina_poster_optimized.jpg'

import video2MP4 from '../../assets/videos/optimized/video_estrechar_manos_optimized.mp4'
import video2WebM from '../../assets/videos/optimized/video_estrechar_manos.webm'
import video2Poster from '../../assets/images/video_posters/video_estrechar_manos_poster_optimized.jpg'

const videos = [
  {
    mp4: video1MP4,
    webm: video1WebM,
    poster: video1Poster
  },
  {
    mp4: video2MP4,
    webm: video2WebM,
    poster: video2Poster
  }
]
```

---

### **Paso 6: Build Final**

```bash
# Build con todos los recursos optimizados
npm run build
```

**Verificar resultados:**
- Los videos optimizados aparecerán en `dist/assets/mp4/` y `dist/assets/webm/`
- Tamaños significativamente reducidos

---

### **Paso 7: Analizar Bundle**

```bash
# Ver análisis visual del bundle
npm run analyze
```

Abre `dist/stats.html` mostrando:
- Tamaño de cada archivo
- Compresión gzip/brotli
- Visualización interactiva

---

### **Paso 8: Deploy**

```bash
# Deploy a GitHub Pages
npm run deploy
```

---

## 🎯 Resultados Esperados

### **Antes de optimizar videos:**
- Peso inicial: ~3-4 MB (sin videos)
- Videos: 23.9 MB (lazy loaded)

### **Después de optimizar videos:**
- Peso inicial: ~3-4 MB (sin videos)
- Videos: ~5-8 MB (lazy loaded)
- **Ahorro total: ~16-19 MB adicionales**

### **Mejora acumulada total:**
- Imágenes: -8 MB
- Videos: -16 MB
- JavaScript: -115 KB
- **Total ahorrado: ~24 MB (75% reducción)**

---

## ⚡ Comando Todo-en-Uno

Si quieres hacerlo todo de una vez (después de instalar FFmpeg):

```bash
# Optimizar todo
npm run optimize:images && npm run optimize:videos && npm run optimize:posters && npm run build && npm run analyze
```

---

## ❌ Solución de Problemas

### **FFmpeg no reconocido:**
1. Cierra y abre NUEVA ventana de PowerShell/CMD
2. Verifica PATH: `echo %PATH%` (debe incluir ruta a ffmpeg\bin)
3. Reinstala con: `npm run install:ffmpeg`

### **Error en optimize-videos.bat:**
1. Verifica FFmpeg: `ffmpeg -version`
2. Ejecuta directamente: `.\optimize-videos.bat`
3. Revisa los errores en la salida

### **Videos muy grandes después de optimizar:**
- Ajusta el CRF en `optimize-videos.bat` (línea con `-crf 28`)
- CRF más alto = archivo más pequeño (prueba con 30-32)
- CRF más bajo = mejor calidad (prueba con 25-27)

---

## 📚 Más Información

- **Instalación de FFmpeg:** Ver `INSTALL_FFMPEG.md`
- **Optimización de videos:** Ver `VIDEO_OPTIMIZATION_GUIDE.md`
- **Resumen completo:** Ver `OPTIMIZATION_SUMMARY.md`

---

## 🔄 Flujo Completo de Optimización

```
1. npm run install:ffmpeg          → Instalar FFmpeg
2. ffmpeg -version                  → Verificar instalación
3. npm run optimize:videos          → Optimizar videos
4. npm run optimize:posters         → Optimizar posters
5. [Actualizar HeroSection.vue]     → Usar videos optimizados
6. npm run build                    → Build de producción
7. npm run analyze                  → Analizar resultados
8. npm run deploy                   → Deploy a producción
```

---

## ✅ Checklist Final

- [ ] FFmpeg instalado y verificado
- [ ] Videos optimizados ejecutados
- [ ] Posters optimizados
- [ ] HeroSection.vue actualizado con nuevas rutas
- [ ] Build ejecutado sin errores
- [ ] Bundle analyzer revisado
- [ ] Tamaños de archivos verificados
- [ ] Sitio probado localmente (npm run preview)
- [ ] Deploy a producción
- [ ] PageSpeed Insights verificado

---

## 🎉 ¡Listo!

Una vez completados todos los pasos, tu sitio tendrá:

✅ **85-90% menos peso inicial**
✅ **Videos 75% más pequeños**
✅ **Imágenes 96% más pequeñas**
✅ **Carga 70% más rápida**
✅ **Mejor SEO y Core Web Vitals**

---

**Última actualización:** 2025-12-27
**Proyecto:** AGHR Mentoring & HR
