# Comandos FFmpeg para Optimización de Video Hero

## 📍 Video Original
**Ruta:** `src/assets/images/hero/video_oficina.mp4`
**Peso actual:** 7.16 MB

---

## 🎬 1. OPTIMIZAR MP4 (H.264 - Alta Compatibilidad)

```bash
ffmpeg -i src/assets/images/hero/video_oficina.mp4 \
  -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2" \
  -c:v libx264 \
  -preset slow \
  -crf 28 \
  -b:v 2000k \
  -maxrate 2500k \
  -bufsize 5000k \
  -r 24 \
  -pix_fmt yuv420p \
  -movflags +faststart \
  -an \
  src/assets/images/hero/video_oficina_optimized.mp4
```

**Detalles:**
- Resolución: 1280x720 (mantiene aspect ratio)
- Codec: H.264 (libx264)
- CRF: 28 (balance calidad/tamaño)
- Bitrate: 2000 kbps (max 2500 kbps)
- FPS: 24
- faststart: streaming optimizado
- Sin audio (-an)
- **Peso esperado:** 3-4 MB

---

## 🚀 2. GENERAR WEBM (VP9 - Mejor Compresión)

```bash
ffmpeg -i src/assets/images/hero/video_oficina.mp4 \
  -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2" \
  -c:v libvpx-vp9 \
  -crf 35 \
  -b:v 1500k \
  -cpu-used 2 \
  -row-mt 1 \
  -r 24 \
  -an \
  src/assets/images/hero/video_oficina.webm
```

**Detalles:**
- Resolución: 1280x720
- Codec: VP9 (WebM)
- CRF: 35 (buena compresión)
- Bitrate: 1500 kbps
- Multithreading optimizado
- Sin audio (-an)
- **Peso esperado:** 2-3 MB

---

## 🖼️ 3. EXTRAER POSTER IMAGE (WebP)

### Opción A: Frame del segundo 1
```bash
ffmpeg -i src/assets/images/hero/video_oficina.mp4 \
  -ss 00:00:01 \
  -vframes 1 \
  -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2" \
  -q:v 85 \
  src/assets/images/hero/video_poster.webp
```

### Opción B: Frame del segundo 2
```bash
ffmpeg -i src/assets/images/hero/video_oficina.mp4 \
  -ss 00:00:02 \
  -vframes 1 \
  -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2" \
  -q:v 85 \
  src/assets/images/hero/video_poster.webp
```

**Detalles:**
- Formato: WebP
- Calidad: 85 (excelente)
- Resolución: 1280x720
- **Peso esperado:** 80-150 KB

---

## 📱 4. GENERAR POSTER MOBILE (más pequeño)

```bash
ffmpeg -i src/assets/images/hero/video_oficina.mp4 \
  -ss 00:00:01 \
  -vframes 1 \
  -vf "scale=640:360:force_original_aspect_ratio=decrease,pad=640:360:(ow-iw)/2:(oh-ih)/2" \
  -q:v 80 \
  src/assets/images/hero/video_poster_mobile.webp
```

**Detalles:**
- Formato: WebP
- Calidad: 80
- Resolución: 640x360 (mobile-friendly)
- **Peso esperado:** 30-60 KB

---

## 🎯 RESULTADO ESPERADO

| Archivo | Peso Original | Peso Optimizado | Reducción |
|---------|--------------|-----------------|-----------|
| MP4 Original | 7.16 MB | - | - |
| MP4 Optimizado | - | ~3-4 MB | ~45-55% |
| WebM | - | ~2-3 MB | ~60-70% |
| Poster Desktop | - | ~100 KB | - |
| Poster Mobile | - | ~40 KB | - |

---

## ⚡ EJECUCIÓN RÁPIDA (TODO EN UNO)

```bash
# 1. Optimizar MP4
ffmpeg -i src/assets/images/hero/video_oficina.mp4 -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2" -c:v libx264 -preset slow -crf 28 -b:v 2000k -maxrate 2500k -bufsize 5000k -r 24 -pix_fmt yuv420p -movflags +faststart -an src/assets/images/hero/video_oficina_optimized.mp4

# 2. Generar WebM
ffmpeg -i src/assets/images/hero/video_oficina.mp4 -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2" -c:v libvpx-vp9 -crf 35 -b:v 1500k -cpu-used 2 -row-mt 1 -r 24 -an src/assets/images/hero/video_oficina.webm

# 3. Extraer poster desktop
ffmpeg -i src/assets/images/hero/video_oficina.mp4 -ss 00:00:01 -vframes 1 -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2" -q:v 85 src/assets/images/hero/video_poster.webp

# 4. Extraer poster mobile
ffmpeg -i src/assets/images/hero/video_oficina.mp4 -ss 00:00:01 -vframes 1 -vf "scale=640:360:force_original_aspect_ratio=decrease,pad=640:360:(ow-iw)/2:(oh-ih)/2" -q:v 80 src/assets/images/hero/video_poster_mobile.webp
```

---

## 📋 CHECKLIST POST-OPTIMIZACIÓN

- [ ] Verificar que los videos se reproducen correctamente
- [ ] Confirmar tamaños de archivo
- [ ] Reemplazar referencias en el código
- [ ] Eliminar video original después de confirmar
- [ ] Actualizar imports en componentes Vue
- [ ] Probar en mobile y desktop
- [ ] Verificar en diferentes navegadores
- [ ] Medir Core Web Vitals (LCP, CLS, FID)

---

## 🔧 TROUBLESHOOTING

### Si ffmpeg no está instalado:

**Windows:**
```bash
# Con Chocolatey
choco install ffmpeg

# O descargar desde: https://ffmpeg.org/download.html
```

**macOS:**
```bash
brew install ffmpeg
```

**Linux:**
```bash
sudo apt install ffmpeg  # Ubuntu/Debian
sudo yum install ffmpeg  # CentOS/RHEL
```

### Si el video se ve pixelado:
- Ajustar CRF a un valor menor (ej: 25 en lugar de 28)
- Aumentar bitrate (ej: 2500k en lugar de 2000k)

### Si el peso sigue siendo alto:
- Reducir resolución a 1024x576
- Aumentar CRF a 30
- Reducir FPS a 20

---

**🚀 ¡Videos optimizados y listos para producción!**
