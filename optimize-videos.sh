#!/bin/bash

# ==================================================
# Script de Optimización de Video Hero
# ==================================================
# Genera videos optimizados y posters para el Hero
# Ejecutar: bash optimize-videos.sh
# ==================================================

set -e  # Exit on error

echo "🎬 Iniciando optimización de videos..."
echo ""

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Rutas
INPUT_VIDEO="src/assets/images/hero/video_oficina.mp4"
OUTPUT_DIR_VIDEOS="public/videos"
OUTPUT_DIR_IMAGES="public/images"

# Verificar que existe el video original
if [ ! -f "$INPUT_VIDEO" ]; then
    echo "❌ Error: No se encuentra el video original en $INPUT_VIDEO"
    exit 1
fi

# Crear directorios si no existen
mkdir -p "$OUTPUT_DIR_VIDEOS"
mkdir -p "$OUTPUT_DIR_IMAGES"

echo -e "${BLUE}📂 Directorios preparados${NC}"
echo ""

# ========================================
# 1. OPTIMIZAR MP4 (H.264)
# ========================================
echo -e "${YELLOW}[1/4] Optimizando MP4 (H.264)...${NC}"
ffmpeg -i "$INPUT_VIDEO" \
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
  -y \
  "$OUTPUT_DIR_VIDEOS/video_oficina_optimized.mp4"

echo -e "${GREEN}✅ MP4 optimizado generado${NC}"
echo ""

# ========================================
# 2. GENERAR WEBM (VP9)
# ========================================
echo -e "${YELLOW}[2/4] Generando WebM (VP9)...${NC}"
ffmpeg -i "$INPUT_VIDEO" \
  -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2" \
  -c:v libvpx-vp9 \
  -crf 35 \
  -b:v 1500k \
  -cpu-used 2 \
  -row-mt 1 \
  -r 24 \
  -an \
  -y \
  "$OUTPUT_DIR_VIDEOS/video_oficina.webm"

echo -e "${GREEN}✅ WebM generado${NC}"
echo ""

# ========================================
# 3. POSTER DESKTOP (WebP)
# ========================================
echo -e "${YELLOW}[3/4] Generando poster desktop...${NC}"
ffmpeg -i "$INPUT_VIDEO" \
  -ss 00:00:01 \
  -vframes 1 \
  -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2" \
  -q:v 85 \
  -y \
  "$OUTPUT_DIR_IMAGES/video_poster.webp"

echo -e "${GREEN}✅ Poster desktop generado${NC}"
echo ""

# ========================================
# 4. POSTER MOBILE (WebP)
# ========================================
echo -e "${YELLOW}[4/4] Generando poster mobile...${NC}"
ffmpeg -i "$INPUT_VIDEO" \
  -ss 00:00:01 \
  -vframes 1 \
  -vf "scale=640:360:force_original_aspect_ratio=decrease,pad=640:360:(ow-iw)/2:(oh-ih)/2" \
  -q:v 80 \
  -y \
  "$OUTPUT_DIR_IMAGES/video_poster_mobile.webp"

echo -e "${GREEN}✅ Poster mobile generado${NC}"
echo ""

# ========================================
# RESUMEN
# ========================================
echo ""
echo "======================================"
echo "🎉 ¡Optimización completada!"
echo "======================================"
echo ""

# Mostrar tamaños de archivos
echo "📊 Tamaños de archivos:"
echo ""
echo "Original:"
ls -lh "$INPUT_VIDEO" | awk '{print "  " $9 " → " $5}'
echo ""
echo "Optimizados:"
ls -lh "$OUTPUT_DIR_VIDEOS/video_oficina_optimized.mp4" | awk '{print "  " $9 " → " $5}'
ls -lh "$OUTPUT_DIR_VIDEOS/video_oficina.webm" | awk '{print "  " $9 " → " $5}'
ls -lh "$OUTPUT_DIR_IMAGES/video_poster.webp" | awk '{print "  " $9 " → " $5}'
ls -lh "$OUTPUT_DIR_IMAGES/video_poster_mobile.webp" | awk '{print "  " $9 " → " $5}'
echo ""

# Calcular ahorro (aproximado)
ORIGINAL_SIZE=$(stat -f%z "$INPUT_VIDEO" 2>/dev/null || stat -c%s "$INPUT_VIDEO" 2>/dev/null)
MP4_SIZE=$(stat -f%z "$OUTPUT_DIR_VIDEOS/video_oficina_optimized.mp4" 2>/dev/null || stat -c%s "$OUTPUT_DIR_VIDEOS/video_oficina_optimized.mp4" 2>/dev/null)
WEBM_SIZE=$(stat -f%z "$OUTPUT_DIR_VIDEOS/video_oficina.webm" 2>/dev/null || stat -c%s "$OUTPUT_DIR_VIDEOS/video_oficina.webm" 2>/dev/null)

ORIGINAL_MB=$(echo "scale=2; $ORIGINAL_SIZE / 1048576" | bc)
MP4_MB=$(echo "scale=2; $MP4_SIZE / 1048576" | bc)
WEBM_MB=$(echo "scale=2; $WEBM_SIZE / 1048576" | bc)

MP4_REDUCTION=$(echo "scale=1; (($ORIGINAL_SIZE - $MP4_SIZE) / $ORIGINAL_SIZE) * 100" | bc)
WEBM_REDUCTION=$(echo "scale=1; (($ORIGINAL_SIZE - $WEBM_SIZE) / $ORIGINAL_SIZE) * 100" | bc)

echo "💾 Comparación:"
echo "  Original:     ${ORIGINAL_MB} MB"
echo "  MP4 optimizado: ${MP4_MB} MB (↓${MP4_REDUCTION}%)"
echo "  WebM:         ${WEBM_MB} MB (↓${WEBM_REDUCTION}%)"
echo ""

echo "======================================"
echo "✅ Siguiente paso:"
echo "======================================"
echo ""
echo "1. Verificar los archivos generados:"
echo "   ls -lh public/videos/"
echo "   ls -lh public/images/video_poster*"
echo ""
echo "2. Actualizar tu componente Hero:"
echo "   - Usar HeroSectionOptimized.vue"
echo "   - Ver IMPLEMENTACION-VIDEO-HERO.md"
echo ""
echo "3. Probar localmente:"
echo "   npm run dev"
echo ""
echo "🚀 ¡Videos listos para producción!"
