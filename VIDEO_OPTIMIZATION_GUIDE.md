# Guía de Optimización de Videos para AGHR

## 📊 Estado Actual de Videos

### Videos existentes:
- `video_oficina.mp4`: **7.5 MB** (7,505 KB)
- `video_estrechar_manos.mp4`: **16.4 MB** (16,381 KB)
- **Total: 23.9 MB**

---

## 🎯 Objetivos de Optimización

1. **Reducir tamaño de archivos en 60-80%** (de 23.9 MB a ~5-8 MB)
2. **Añadir formatos alternativos** (WebM para mejor compresión)
3. **Implementar posters** (imágenes estáticas mientras carga)
4. **Lazy loading ya implementado** ✅

---

## 🛠️ Método 1: Usar FFmpeg (Recomendado)

### Instalación de FFmpeg:

#### Windows:
```bash
# Opción 1: Con Chocolatey
choco install ffmpeg

# Opción 2: Con Scoop
scoop install ffmpeg

# Opción 3: Descarga manual
# Ir a: https://www.gyan.dev/ffmpeg/builds/
# Descargar "ffmpeg-release-essentials.zip"
# Extraer y añadir a PATH
```

#### Verificar instalación:
```bash
ffmpeg -version
```

---

## 🎬 Scripts de Optimización

### Script 1: Optimizar MP4 (Reducir bitrate y tamaño)

**Para video_oficina.mp4:**
```bash
ffmpeg -i src/assets/videos/video_oficina.mp4 \
  -c:v libx264 \
  -crf 28 \
  -preset slow \
  -b:v 1M \
  -maxrate 1.5M \
  -bufsize 2M \
  -vf "scale=1920:-2" \
  -an \
  src/assets/videos/video_oficina_optimized.mp4
```

**Para video_estrechar_manos.mp4:**
```bash
ffmpeg -i src/assets/videos/video_estrechar_manos.mp4 \
  -c:v libx264 \
  -crf 28 \
  -preset slow \
  -b:v 1M \
  -maxrate 1.5M \
  -bufsize 2M \
  -vf "scale=1920:-2" \
  -an \
  src/assets/videos/video_estrechar_manos_optimized.mp4
```

**Parámetros explicados:**
- `-crf 28`: Calidad (18-28 es bueno, mayor = menor calidad)
- `-preset slow`: Compresión más eficiente (más lento pero mejor calidad/tamaño)
- `-b:v 1M`: Bitrate objetivo 1 Mbps
- `-maxrate 1.5M`: Bitrate máximo
- `-vf "scale=1920:-2"`: Escalar a Full HD máximo
- `-an`: Remover audio (no necesario para videos de fondo)

**Resultado esperado:**
- video_oficina.mp4: 7.5 MB → **~1.5-2 MB** (75-80% reducción)
- video_estrechar_manos.mp4: 16.4 MB → **~3-4 MB** (75-80% reducción)

---

### Script 2: Crear versiones WebM (Mejor compresión)

**Para video_oficina.mp4:**
```bash
ffmpeg -i src/assets/videos/video_oficina.mp4 \
  -c:v libvpx-vp9 \
  -crf 35 \
  -b:v 0 \
  -vf "scale=1920:-2" \
  -an \
  src/assets/videos/video_oficina.webm
```

**Para video_estrechar_manos.mp4:**
```bash
ffmpeg -i src/assets/videos/video_estrechar_manos.mp4 \
  -c:v libvpx-vp9 \
  -crf 35 \
  -b:v 0 \
  -vf "scale=1920:-2" \
  -an \
  src/assets/videos/video_estrechar_manos.webm
```

**Resultado esperado:**
- WebM es ~30% más pequeño que MP4 optimizado
- video_oficina.webm: **~1-1.5 MB**
- video_estrechar_manos.webm: **~2-3 MB**

---

### Script 3: Generar Posters (imágenes de preview)

**Extraer frame del video:**
```bash
# Para video_oficina
ffmpeg -i src/assets/videos/video_oficina.mp4 \
  -ss 00:00:02 \
  -frames:v 1 \
  -vf "scale=1920:-2" \
  -q:v 2 \
  src/assets/images/video_posters/video_oficina_poster.jpg

# Para video_estrechar_manos
ffmpeg -i src/assets/videos/video_estrechar_manos.mp4 \
  -ss 00:00:02 \
  -frames:v 1 \
  -vf "scale=1920:-2" \
  -q:v 2 \
  src/assets/images/video_posters/video_estrechar_manos_poster.jpg
```

**Luego optimizar con Sharp:**
```bash
node optimize-posters.js
```

---

## 🚀 Script Automático Completo

He creado un script automatizado: `optimize-videos.bat` (Windows)

### Uso:
```bash
# 1. Instalar FFmpeg primero
# 2. Ejecutar el script
./optimize-videos.bat

# O manualmente:
npm run optimize:videos
```

---

## 📝 Actualizar Componentes Después

Una vez optimizados los videos, actualiza `VideoBackground.vue`:

```vue
<video
  v-for="(video, index) in videos"
  :key="index"
  :data-src="video.src"
  :poster="video.poster"
  muted
  playsinline
  preload="none"
>
  <source :data-src="video.webm" type="video/webm">
  <source :data-src="video.mp4" type="video/mp4">
</video>
```

Y en `HeroSection.vue`:

```javascript
const videos = [
  {
    mp4: video1MP4,
    webm: video1WebM,
    poster: video1Poster,
    src: video1MP4 // fallback
  },
  {
    mp4: video2MP4,
    webm: video2WebM,
    poster: video2Poster,
    src: video2MP4
  }
]
```

---

## 🎯 Reducción Total Esperada

### Antes:
- video_oficina.mp4: 7.5 MB
- video_estrechar_manos.mp4: 16.4 MB
- **Total: 23.9 MB**

### Después (MP4 optimizado):
- video_oficina_optimized.mp4: ~1.5 MB
- video_estrechar_manos_optimized.mp4: ~3 MB
- **Total: ~4.5 MB** ⚡ **81% reducción**

### Después (WebM + MP4):
- Navegadores modernos usarán WebM (~3 MB total)
- Navegadores antiguos usarán MP4 (~4.5 MB total)
- **Ahorro promedio: 85%**

---

## 🌐 Método 2: Herramientas Online (Sin FFmpeg)

Si no puedes instalar FFmpeg, usa estas herramientas:

### Opción A: CloudConvert
1. Ir a: https://cloudconvert.com/mp4-converter
2. Subir videos
3. Configurar:
   - Codec: H.264
   - Resolution: 1920x1080
   - Bitrate: 1000 kbps
   - Remove audio: Yes
4. Descargar optimizados

### Opción B: Handbrake (Software gratuito)
1. Descargar: https://handbrake.fr/
2. Instalar y abrir
3. Cargar video
4. Preset: "Fast 1080p30"
5. Video bitrate: 1000 kbps
6. Audio: None (remove audio track)
7. Start encode

### Opción C: Adobe Media Encoder / DaVinci Resolve
Si tienes acceso a estas herramientas profesionales, usa:
- Format: H.264
- Bitrate: 1 Mbps (VBR, 2-pass)
- Resolution: 1920x1080
- Frame rate: Match source
- Audio: None

---

## ✅ Checklist de Optimización

- [ ] Instalar FFmpeg
- [ ] Crear directorio para videos optimizados
- [ ] Optimizar video_oficina.mp4 → MP4 + WebM
- [ ] Optimizar video_estrechar_manos.mp4 → MP4 + WebM
- [ ] Generar posters/thumbnails
- [ ] Actualizar imports en componentes
- [ ] Actualizar VideoBackground.vue con múltiples sources
- [ ] Probar en navegador
- [ ] Hacer build y verificar tamaños
- [ ] Commit y deploy

---

## 🔍 Verificar Resultados

Después de optimizar:

```bash
# Ver tamaños de archivos
ls -lh src/assets/videos/

# Comparar tamaños
du -h src/assets/videos/*
```

En el build:
```bash
npm run build
# Verificar en la salida los tamaños de archivos .mp4 y .webm
```

---

## 💡 Tips Adicionales

1. **Calidad vs Tamaño:**
   - CRF 23-28 para videos de fondo es óptimo
   - CRF 18-23 para videos principales con detalles importantes

2. **Resolución:**
   - 1920x1080 (Full HD) es suficiente para backgrounds
   - Considera 1280x720 (HD) si los videos son solo decorativos

3. **Bitrate:**
   - 1 Mbps es bueno para videos de fondo
   - 2-3 Mbps para videos con más detalles

4. **Formatos:**
   - WebM (VP9): Mejor compresión, soporte moderno
   - MP4 (H.264): Compatibilidad universal
   - Usa ambos con `<source>` para mejor optimización

---

## 📞 Soporte

Si tienes problemas con FFmpeg o necesitas ayuda:
1. Verifica que FFmpeg esté en PATH: `ffmpeg -version`
2. Revisa los logs de error
3. Prueba con herramientas online como alternativa

---

**Última actualización:** 2025-12-27
**Autor:** Claude Code - Optimización de recursos AGHR
