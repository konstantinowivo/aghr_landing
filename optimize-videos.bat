@echo off
REM ==================================================
REM Script de Optimizacion de Video Hero (Windows)
REM ==================================================
REM Genera videos optimizados y posters para el Hero
REM Ejecutar: optimize-videos.bat
REM ==================================================

echo.
echo ========================================
echo   Video Hero - Optimizacion
echo ========================================
echo.

REM Rutas
set INPUT_VIDEO=src\assets\images\hero\video_oficina.mp4
set OUTPUT_DIR_VIDEOS=public\videos
set OUTPUT_DIR_IMAGES=public\images

REM Verificar que existe FFmpeg
where ffmpeg >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] FFmpeg no esta instalado
    echo.
    echo Instalar con: choco install ffmpeg
    echo O descargar desde: https://ffmpeg.org/download.html
    pause
    exit /b 1
)

REM Verificar que existe el video original
if not exist "%INPUT_VIDEO%" (
    echo [ERROR] No se encuentra el video original en %INPUT_VIDEO%
    pause
    exit /b 1
)

REM Crear directorios si no existen
if not exist "%OUTPUT_DIR_VIDEOS%" mkdir "%OUTPUT_DIR_VIDEOS%"
if not exist "%OUTPUT_DIR_IMAGES%" mkdir "%OUTPUT_DIR_IMAGES%"

echo [OK] Directorios preparados
echo.

REM ========================================
REM 1. OPTIMIZAR MP4 (H.264)
REM ========================================
echo [1/4] Optimizando MP4 (H.264)...
ffmpeg -i "%INPUT_VIDEO%" -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2" -c:v libx264 -preset slow -crf 28 -b:v 2000k -maxrate 2500k -bufsize 5000k -r 24 -pix_fmt yuv420p -movflags +faststart -an -y "%OUTPUT_DIR_VIDEOS%\video_oficina_optimized.mp4"

if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Fallo la optimizacion MP4
    pause
    exit /b 1
)

echo [OK] MP4 optimizado generado
echo.

REM ========================================
REM 2. GENERAR WEBM (VP9)
REM ========================================
echo [2/4] Generando WebM (VP9)...
ffmpeg -i "%INPUT_VIDEO%" -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2" -c:v libvpx-vp9 -crf 35 -b:v 1500k -cpu-used 2 -row-mt 1 -r 24 -an -y "%OUTPUT_DIR_VIDEOS%\video_oficina.webm"

if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Fallo la generacion WebM
    pause
    exit /b 1
)

echo [OK] WebM generado
echo.

REM ========================================
REM 3. POSTER DESKTOP (WebP)
REM ========================================
echo [3/4] Generando poster desktop...
ffmpeg -i "%INPUT_VIDEO%" -ss 00:00:01 -vframes 1 -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2" -q:v 85 -y "%OUTPUT_DIR_IMAGES%\video_poster.webp"

if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Fallo la generacion del poster desktop
    pause
    exit /b 1
)

echo [OK] Poster desktop generado
echo.

REM ========================================
REM 4. POSTER MOBILE (WebP)
REM ========================================
echo [4/4] Generando poster mobile...
ffmpeg -i "%INPUT_VIDEO%" -ss 00:00:01 -vframes 1 -vf "scale=640:360:force_original_aspect_ratio=decrease,pad=640:360:(ow-iw)/2:(oh-ih)/2" -q:v 80 -y "%OUTPUT_DIR_IMAGES%\video_poster_mobile.webp"

if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Fallo la generacion del poster mobile
    pause
    exit /b 1
)

echo [OK] Poster mobile generado
echo.

REM ========================================
REM RESUMEN
REM ========================================
echo.
echo ========================================
echo   Optimizacion completada!
echo ========================================
echo.

echo Archivos generados:
echo.
dir /b "%OUTPUT_DIR_VIDEOS%"
dir /b "%OUTPUT_DIR_IMAGES%\video_poster*"
echo.

echo ========================================
echo   Siguiente paso:
echo ========================================
echo.
echo 1. Verificar los archivos generados en:
echo    - public\videos\
echo    - public\images\
echo.
echo 2. Actualizar tu componente Hero:
echo    - Ver IMPLEMENTACION-VIDEO-HERO.md
echo.
echo 3. Probar localmente:
echo    npm run dev
echo.
echo Videos listos para produccion!
echo.

pause
