# 📥 Guía de Instalación de FFmpeg para Windows

## 🎯 Opciones de Instalación

### **Opción 1: Chocolatey (Recomendado - Más Fácil)**

Si tienes Chocolatey instalado:

1. **Abrir PowerShell como Administrador**
2. **Ejecutar:**
   ```powershell
   choco install ffmpeg
   ```
3. **Verificar instalación:**
   ```powershell
   ffmpeg -version
   ```

**¿No tienes Chocolatey?** Instalar primero:
```powershell
# En PowerShell como Administrador
Set-ExecutionPolicy Bypass -Scope Process -Force
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

---

### **Opción 2: Scoop (Alternativa Fácil)**

Si prefieres Scoop:

1. **Instalar Scoop** (si no lo tienes):
   ```powershell
   # En PowerShell
   Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
   irm get.scoop.sh | iex
   ```

2. **Instalar FFmpeg:**
   ```powershell
   scoop install ffmpeg
   ```

3. **Verificar:**
   ```powershell
   ffmpeg -version
   ```

---

### **Opción 3: Instalación Manual (Sin gestores de paquetes)**

#### **Paso 1: Descargar FFmpeg**

1. **Ir a:** https://www.gyan.dev/ffmpeg/builds/
2. **Descargar:** `ffmpeg-release-essentials.zip` (versión más reciente)
   - Link directo: https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-essentials.7z

**Alternativa:** https://github.com/BtbN/FFmpeg-Builds/releases
- Descargar: `ffmpeg-master-latest-win64-gpl.zip`

#### **Paso 2: Extraer**

1. Extraer el archivo ZIP descargado
2. Verás una carpeta como: `ffmpeg-6.1-essentials_build`
3. Dentro encontrarás: `bin/`, `doc/`, `presets/`

#### **Paso 3: Mover a Ubicación Permanente**

**Opción A - Carpeta de Usuario (Recomendado):**
```
C:\Users\PC\ffmpeg\
```

**Opción B - Archivos de Programa:**
```
C:\Program Files\ffmpeg\
```

Mover toda la carpeta extraída a una de estas ubicaciones.

#### **Paso 4: Agregar a PATH**

1. **Abrir Variables de Entorno:**
   - Presionar `Win + R`
   - Escribir: `sysdm.cpl`
   - Enter
   - Ir a pestaña "Opciones avanzadas"
   - Clic en "Variables de entorno"

2. **Editar PATH del Usuario:**
   - En "Variables de usuario", seleccionar `Path`
   - Clic en "Editar"
   - Clic en "Nuevo"
   - Agregar la ruta al folder `bin` de FFmpeg:
     ```
     C:\Users\PC\ffmpeg\bin
     ```
   - Clic en "Aceptar" en todas las ventanas

3. **Verificar:**
   - Abrir una **NUEVA** ventana de PowerShell o CMD
   - Ejecutar:
     ```bash
     ffmpeg -version
     ```
   - Deberías ver la información de FFmpeg

---

### **Opción 4: Script Automático de Instalación**

He creado un script automático que descarga e instala FFmpeg:

#### **Usando PowerShell:**

1. **Abrir PowerShell como Administrador**

2. **Ejecutar el instalador:**
   ```powershell
   .\install-ffmpeg.ps1
   ```

3. **El script:**
   - Descarga FFmpeg automáticamente
   - Lo extrae en `C:\Users\PC\ffmpeg\`
   - Agrega al PATH
   - Verifica la instalación

**Si da error de ejecución de scripts:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## ✅ Verificar Instalación

Después de instalar con cualquier método, verifica:

```bash
# En CMD o PowerShell (NUEVA ventana)
ffmpeg -version
```

**Salida esperada:**
```
ffmpeg version 6.1-essentials_build
built with gcc 12.2.0 (Rev10, Built by MSYS2 project)
configuration: --enable-gpl --enable-version3 ...
```

Si ves esto, **¡FFmpeg está instalado correctamente!**

---

## 🚀 Siguiente Paso: Optimizar Videos

Una vez instalado FFmpeg:

```bash
# En la carpeta del proyecto
npm run optimize:videos
```

O manualmente:
```bash
.\optimize-videos.bat
```

---

## ❌ Solución de Problemas

### **Error: "ffmpeg no es reconocido como un comando"**

**Causa:** FFmpeg no está en el PATH

**Soluciones:**

1. **Reiniciar terminal** (abrir nueva ventana de CMD/PowerShell)

2. **Verificar PATH manualmente:**
   ```powershell
   $env:Path -split ';' | Where-Object { $_ -like '*ffmpeg*' }
   ```

3. **Agregar temporalmente al PATH:**
   ```powershell
   $env:Path += ";C:\Users\PC\ffmpeg\bin"
   ```

4. **Verificar que ffmpeg.exe existe:**
   ```powershell
   Test-Path "C:\Users\PC\ffmpeg\bin\ffmpeg.exe"
   ```
   Debe retornar: `True`

---

### **Error: "No se puede ejecutar el script"**

**Causa:** Política de ejecución de PowerShell

**Solución:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

### **FFmpeg instalado pero npm run optimize:videos falla**

**Verificar:**

1. **PATH está actualizado en la sesión actual:**
   ```bash
   ffmpeg -version
   ```

2. **El archivo optimize-videos.bat existe:**
   ```bash
   dir optimize-videos.bat
   ```

3. **Ejecutar directamente el .bat:**
   ```bash
   .\optimize-videos.bat
   ```

---

## 📞 Alternativas si no puedes instalar FFmpeg

### **Opción A: Herramientas Online**

1. **CloudConvert**: https://cloudconvert.com/mp4-converter
   - Configurar: H.264, 1080p, 1000 kbps bitrate
   - Subir videos
   - Descargar optimizados

2. **FreeConvert**: https://www.freeconvert.com/video-compressor
   - Similar a CloudConvert
   - Límite de tamaño de archivo

### **Opción B: Software con GUI**

1. **Handbrake** (Gratuito):
   - Descargar: https://handbrake.fr/
   - Preset: "Fast 1080p30"
   - Bitrate: 1000 kbps
   - Audio: Remover

2. **VLC Media Player**:
   - Media → Convert/Save
   - Agregar video
   - Convert
   - Profile: Video - H.264 + MP3 (MP4)
   - Editar perfil: bitrate 1000 kbps

### **Opción C: Pedirme que te ayude**

Si nada funciona, puedo:
1. Crear un script Node.js alternativo
2. Darte instrucciones más específicas
3. Ayudarte con métodos alternativos

---

## 📝 Resumen de Comandos

```bash
# Verificar si tienes Chocolatey
choco --version

# Instalar FFmpeg con Chocolatey
choco install ffmpeg

# Verificar instalación
ffmpeg -version

# Optimizar videos (una vez instalado)
npm run optimize:videos

# O ejecutar directamente
.\optimize-videos.bat
```

---

## ✨ Después de Instalar FFmpeg

Continúa con:
1. `npm run optimize:videos` - Optimizar videos
2. `npm run optimize:posters` - Optimizar posters generados
3. `npm run build` - Build final con todos los recursos optimizados

---

**Última actualización:** 2025-12-27
**Soporte:** Ver VIDEO_OPTIMIZATION_GUIDE.md para más detalles
