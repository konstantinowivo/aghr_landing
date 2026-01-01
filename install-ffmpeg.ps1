# Script de Instalación Automática de FFmpeg para Windows
# Proyecto: AGHR - Optimización de Videos

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Instalador de FFmpeg - AGHR" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar si FFmpeg ya está instalado
Write-Host "[1/6] Verificando si FFmpeg ya está instalado..." -ForegroundColor Yellow

$ffmpegExists = $null
try {
    $ffmpegExists = Get-Command ffmpeg -ErrorAction SilentlyContinue
} catch {}

if ($ffmpegExists) {
    Write-Host "[OK] FFmpeg ya está instalado!" -ForegroundColor Green
    Write-Host ""
    ffmpeg -version | Select-Object -First 1
    Write-Host ""
    Write-Host "Puedes ejecutar ahora: npm run optimize:videos" -ForegroundColor Green
    Write-Host ""
    pause
    exit 0
}

Write-Host "[!] FFmpeg no está instalado. Procediendo con la instalación..." -ForegroundColor Yellow
Write-Host ""

# Verificar si tiene Chocolatey
Write-Host "[2/6] Verificando si Chocolatey está instalado..." -ForegroundColor Yellow

$chocoExists = $null
try {
    $chocoExists = Get-Command choco -ErrorAction SilentlyContinue
} catch {}

if ($chocoExists) {
    Write-Host "[OK] Chocolatey encontrado! Instalando FFmpeg con Chocolatey..." -ForegroundColor Green
    Write-Host ""

    choco install ffmpeg -y

    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "[OK] FFmpeg instalado exitosamente con Chocolatey!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Cierra y vuelve a abrir PowerShell, luego ejecuta:" -ForegroundColor Cyan
        Write-Host "  ffmpeg -version" -ForegroundColor White
        Write-Host "  npm run optimize:videos" -ForegroundColor White
        Write-Host ""
        pause
        exit 0
    } else {
        Write-Host "[ERROR] Falló la instalación con Chocolatey. Intentando instalación manual..." -ForegroundColor Red
        Write-Host ""
    }
}

Write-Host "[!] Chocolatey no está instalado. Procediendo con instalación manual..." -ForegroundColor Yellow
Write-Host ""

# Instalación Manual
Write-Host "[3/6] Descargando FFmpeg..." -ForegroundColor Yellow

$ffmpegUrl = "https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-essentials.zip"
$downloadPath = "$env:TEMP\ffmpeg-essentials.zip"
$extractPath = "$env:TEMP\ffmpeg-extracted"
$installPath = "C:\ffmpeg"

Write-Host "  URL: $ffmpegUrl" -ForegroundColor Gray
Write-Host "  Descargando a: $downloadPath" -ForegroundColor Gray
Write-Host ""

try {
    # Descargar FFmpeg
    $ProgressPreference = 'SilentlyContinue'
    Invoke-WebRequest -Uri $ffmpegUrl -OutFile $downloadPath -UseBasicParsing
    Write-Host "[OK] Descarga completada!" -ForegroundColor Green
    Write-Host ""
} catch {
    Write-Host "[ERROR] Error al descargar FFmpeg:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host ""
    Write-Host "Por favor, descarga manualmente desde:" -ForegroundColor Yellow
    Write-Host "  https://www.gyan.dev/ffmpeg/builds/" -ForegroundColor White
    Write-Host ""
    Write-Host "O consulta: INSTALL_FFMPEG.md para otras opciones" -ForegroundColor Yellow
    Write-Host ""
    pause
    exit 1
}

# Extraer archivo
Write-Host "[4/6] Extrayendo archivos..." -ForegroundColor Yellow

try {
    if (Test-Path $extractPath) {
        Remove-Item -Path $extractPath -Recurse -Force
    }

    Expand-Archive -Path $downloadPath -DestinationPath $extractPath -Force

    # Encontrar la carpeta de FFmpeg extraída
    $ffmpegFolder = Get-ChildItem -Path $extractPath -Directory | Select-Object -First 1

    Write-Host "[OK] Archivos extraídos!" -ForegroundColor Green
    Write-Host ""
} catch {
    Write-Host "[ERROR] Error al extraer archivos:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host ""
    pause
    exit 1
}

# Mover a ubicación permanente
Write-Host "[5/6] Instalando FFmpeg en $installPath..." -ForegroundColor Yellow

try {
    if (Test-Path $installPath) {
        Write-Host "[!] La carpeta $installPath ya existe. Eliminando..." -ForegroundColor Yellow
        Remove-Item -Path $installPath -Recurse -Force
    }

    Move-Item -Path $ffmpegFolder.FullName -Destination $installPath -Force

    Write-Host "[OK] FFmpeg instalado en: $installPath" -ForegroundColor Green
    Write-Host ""
} catch {
    Write-Host "[ERROR] Error al instalar FFmpeg:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host ""
    pause
    exit 1
}

# Agregar al PATH
Write-Host "[6/6] Agregando FFmpeg al PATH del sistema..." -ForegroundColor Yellow

try {
    $ffmpegBinPath = "$installPath\bin"

    # Obtener PATH actual del usuario
    $userPath = [Environment]::GetEnvironmentVariable("Path", "User")

    # Verificar si ya está en PATH
    if ($userPath -notlike "*$ffmpegBinPath*") {
        $newPath = "$userPath;$ffmpegBinPath"
        [Environment]::SetEnvironmentVariable("Path", $newPath, "User")

        # Actualizar PATH de la sesión actual
        $env:Path += ";$ffmpegBinPath"

        Write-Host "[OK] FFmpeg agregado al PATH!" -ForegroundColor Green
    } else {
        Write-Host "[OK] FFmpeg ya está en el PATH!" -ForegroundColor Green
    }

    Write-Host ""
} catch {
    Write-Host "[WARNING] No se pudo agregar automáticamente al PATH" -ForegroundColor Yellow
    Write-Host "Por favor, agrega manualmente:" -ForegroundColor Yellow
    Write-Host "  $ffmpegBinPath" -ForegroundColor White
    Write-Host ""
    Write-Host "Ver INSTALL_FFMPEG.md para instrucciones" -ForegroundColor Yellow
    Write-Host ""
}

# Limpiar archivos temporales
Write-Host "Limpiando archivos temporales..." -ForegroundColor Gray
try {
    Remove-Item -Path $downloadPath -Force -ErrorAction SilentlyContinue
    Remove-Item -Path $extractPath -Recurse -Force -ErrorAction SilentlyContinue
} catch {}

# Verificar instalación
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Instalación Completada!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Verificando instalación..." -ForegroundColor Yellow
Write-Host ""

try {
    & "$ffmpegBinPath\ffmpeg.exe" -version | Select-Object -First 1
    Write-Host ""
    Write-Host "[OK] FFmpeg instalado correctamente!" -ForegroundColor Green
    Write-Host ""
} catch {
    Write-Host "[!] FFmpeg instalado pero necesita reiniciar PowerShell" -ForegroundColor Yellow
    Write-Host ""
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Próximos Pasos:" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. IMPORTANTE: Cierra esta ventana y abre una NUEVA ventana de PowerShell" -ForegroundColor Yellow
Write-Host ""
Write-Host "2. Verifica que FFmpeg funcione:" -ForegroundColor White
Write-Host "   ffmpeg -version" -ForegroundColor Cyan
Write-Host ""
Write-Host "3. Optimiza los videos del proyecto:" -ForegroundColor White
Write-Host "   cd C:\Users\PC\Desktop\AGHR_proyect" -ForegroundColor Cyan
Write-Host "   npm run optimize:videos" -ForegroundColor Cyan
Write-Host ""
Write-Host "4. Después de optimizar, ejecuta el build:" -ForegroundColor White
Write-Host "   npm run build" -ForegroundColor Cyan
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

pause
