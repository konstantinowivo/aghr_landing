@echo off
echo ========================================
echo    Instalador Simple de FFmpeg
echo ========================================
echo.

REM Verificar si FFmpeg ya esta instalado
where ffmpeg >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] FFmpeg ya esta instalado!
    echo.
    ffmpeg -version | findstr "ffmpeg version"
    echo.
    echo Puedes ejecutar: npm run optimize:videos
    echo.
    pause
    exit /b 0
)

echo [!] FFmpeg no esta instalado
echo.
echo ========================================
echo    Opciones de Instalacion:
echo ========================================
echo.
echo 1. Chocolatey (Recomendado - Automatico)
echo 2. Descarga Manual + Instrucciones
echo 3. Ver Guia Completa
echo 4. Salir
echo.
set /p choice="Selecciona una opcion (1-4): "

if "%choice%"=="1" goto chocolatey
if "%choice%"=="2" goto manual
if "%choice%"=="3" goto guide
if "%choice%"=="4" goto end

echo Opcion invalida
pause
exit /b 1

:chocolatey
echo.
echo ========================================
echo    Instalacion con Chocolatey
echo ========================================
echo.

REM Verificar si Chocolatey esta instalado
where choco >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [!] Chocolatey no esta instalado
    echo.
    echo Para instalar Chocolatey:
    echo 1. Abre PowerShell como Administrador
    echo 2. Ejecuta este comando:
    echo.
    echo Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
    echo.
    echo 3. Luego ejecuta: choco install ffmpeg
    echo.
    pause
    exit /b 1
)

echo [OK] Chocolatey encontrado!
echo.
echo Instalando FFmpeg...
echo.

choco install ffmpeg -y

if %ERRORLEVEL% EQU 0 (
    echo.
    echo [OK] FFmpeg instalado exitosamente!
    echo.
    echo IMPORTANTE: Cierra esta ventana y abre una NUEVA
    echo Luego ejecuta: ffmpeg -version
    echo.
    pause
    exit /b 0
) else (
    echo.
    echo [ERROR] Error al instalar con Chocolatey
    echo Intenta la opcion 2 (Descarga Manual)
    echo.
    pause
    exit /b 1
)

:manual
echo.
echo ========================================
echo    Instalacion Manual
echo ========================================
echo.
echo Sigue estos pasos:
echo.
echo 1. Abre tu navegador y ve a:
echo    https://www.gyan.dev/ffmpeg/builds/
echo.
echo 2. Descarga: ffmpeg-release-essentials.zip
echo.
echo 3. Extrae el archivo ZIP
echo.
echo 4. Mueve la carpeta extraida a: C:\ffmpeg
echo.
echo 5. Agrega al PATH:
echo    - Win + R ^> sysdm.cpl ^> Enter
echo    - Opciones avanzadas ^> Variables de entorno
echo    - En "Variables de usuario", edita "Path"
echo    - Agrega: C:\ffmpeg\bin
echo    - Acepta todo
echo.
echo 6. Abre una NUEVA ventana de CMD/PowerShell
echo.
echo 7. Verifica: ffmpeg -version
echo.
echo Para mas detalles, abre: INSTALL_FFMPEG.md
echo.
start https://www.gyan.dev/ffmpeg/builds/
echo.
echo [!] Se abrio el navegador con la pagina de descarga
echo.
pause
exit /b 0

:guide
echo.
echo Abriendo guia completa de instalacion...
echo.
start INSTALL_FFMPEG.md
pause
exit /b 0

:end
echo.
echo Instalacion cancelada
echo.
pause
exit /b 0
