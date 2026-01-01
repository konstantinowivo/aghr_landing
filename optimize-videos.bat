@echo off
echo ========================================
echo   Optimizacion de Videos - AGHR
echo ========================================
echo.

REM Verificar si FFmpeg esta instalado
where ffmpeg >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] FFmpeg no esta instalado!
    echo.
    echo Por favor instala FFmpeg primero:
    echo   - Opcion 1: choco install ffmpeg
    echo   - Opcion 2: scoop install ffmpeg
    echo   - Opcion 3: https://www.gyan.dev/ffmpeg/builds/
    echo.
    pause
    exit /b 1
)

echo [OK] FFmpeg encontrado
echo.

REM Crear directorios si no existen
if not exist "src\assets\videos\optimized" mkdir "src\assets\videos\optimized"
if not exist "src\assets\images\video_posters" mkdir "src\assets\images\video_posters"

echo ========================================
echo   Optimizando video_oficina.mp4
echo ========================================
echo.

REM Optimizar video_oficina.mp4 a MP4
echo [1/6] Creando MP4 optimizado...
ffmpeg -i "src\assets\videos\video_oficina.mp4" -c:v libx264 -crf 28 -preset slow -b:v 1M -maxrate 1.5M -bufsize 2M -vf "scale=1920:-2" -an "src\assets\videos\optimized\video_oficina_optimized.mp4" -y
if %ERRORLEVEL% NEQ 0 goto :error

REM Crear WebM
echo [2/6] Creando WebM optimizado...
ffmpeg -i "src\assets\videos\video_oficina.mp4" -c:v libvpx-vp9 -crf 35 -b:v 0 -vf "scale=1920:-2" -an "src\assets\videos\optimized\video_oficina.webm" -y
if %ERRORLEVEL% NEQ 0 goto :error

REM Generar poster
echo [3/6] Generando poster...
ffmpeg -i "src\assets\videos\video_oficina.mp4" -ss 00:00:02 -frames:v 1 -vf "scale=1920:-2" -q:v 2 "src\assets\images\video_posters\video_oficina_poster.jpg" -y
if %ERRORLEVEL% NEQ 0 goto :error

echo.
echo ========================================
echo   Optimizando video_estrechar_manos.mp4
echo ========================================
echo.

REM Optimizar video_estrechar_manos.mp4 a MP4
echo [4/6] Creando MP4 optimizado...
ffmpeg -i "src\assets\videos\video_estrechar_manos.mp4" -c:v libx264 -crf 28 -preset slow -b:v 1M -maxrate 1.5M -bufsize 2M -vf "scale=1920:-2" -an "src\assets\videos\optimized\video_estrechar_manos_optimized.mp4" -y
if %ERRORLEVEL% NEQ 0 goto :error

REM Crear WebM
echo [5/6] Creando WebM optimizado...
ffmpeg -i "src\assets\videos\video_estrechar_manos.mp4" -c:v libvpx-vp9 -crf 35 -b:v 0 -vf "scale=1920:-2" -an "src\assets\videos\optimized\video_estrechar_manos.webm" -y
if %ERRORLEVEL% NEQ 0 goto :error

REM Generar poster
echo [6/6] Generando poster...
ffmpeg -i "src\assets\videos\video_estrechar_manos.mp4" -ss 00:00:02 -frames:v 1 -vf "scale=1920:-2" -q:v 2 "src\assets\images\video_posters\video_estrechar_manos_poster.jpg" -y
if %ERRORLEVEL% NEQ 0 goto :error

echo.
echo ========================================
echo   Comparacion de Tamanos
echo ========================================
echo.

echo VIDEOS ORIGINALES:
dir "src\assets\videos\*.mp4" | find "mp4"
echo.

echo VIDEOS OPTIMIZADOS:
dir "src\assets\videos\optimized\*.*" | find /V "directorio"
echo.

echo POSTERS:
dir "src\assets\images\video_posters\*.jpg" | find "jpg"
echo.

echo ========================================
echo   Optimizacion Completada!
echo ========================================
echo.
echo Proximos pasos:
echo 1. Verifica los videos en: src\assets\videos\optimized\
echo 2. Actualiza los imports en HeroSection.vue
echo 3. Ejecuta: npm run build
echo.
pause
exit /b 0

:error
echo.
echo [ERROR] Hubo un problema durante la optimizacion
echo Por favor revisa los mensajes de error anteriores
echo.
pause
exit /b 1
