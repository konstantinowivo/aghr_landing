# Guía de Optimización de Imágenes Urgente

## 🚨 Problema Crítico Identificado

**LCP de 12.9s causado por:**
- `ag_foto.png`: **6.2 MB** ❌
- `aghr_logo.png`: **2.0 MB** ❌

**Objetivo:** Reducir a menos de 100KB cada una para lograr LCP < 2.5s

## 🛠️ Solución Inmediata (Recomendada)

### Opción 1: Usar Squoosh.app (Más Fácil)

1. Ve a https://squoosh.app/
2. Arrastra `src/assets/images/foto/ag_foto.png`
3. Configura:
   - Formato: **WebP**
   - Calidad: **75-80**
   - Resize: Ancho máximo **1200px** (si es para hero)
4. Descarga y guarda como `ag_foto.webp`
5. Repite para `aghr_logo.png` → `aghr_logo.webp`

### Opción 2: Usar TinyPNG.com

1. Ve a https://tinypng.com/
2. Sube ambas imágenes
3. Descarga las versiones optimizadas
4. Renombra manteniendo `.png` o convierte a WebP

### Opción 3: Comando con ImageMagick (Si lo tienes instalado)

```bash
# Para ag_foto.png
magick src/assets/images/foto/ag_foto.png -resize 1200x -quality 80 src/assets/images/foto/ag_foto.webp

# Para aghr_logo.png
magick src/assets/images/logo/aghr_logo.png -resize 400x -quality 90 src/assets/images/logo/aghr_logo.webp
```

## 📐 Dimensiones Recomendadas

### ag_foto.png (foto de perfil/about)
- **Tamaño actual:** 6.2 MB
- **Dimensión recomendada:** 800x800px o 1000x1000px máximo
- **Formato:** WebP (o PNG optimizado)
- **Peso objetivo:** < 100 KB
- **Reducción esperada:** 98% (6.2MB → 100KB)

### aghr_logo.png (logo)
- **Tamaño actual:** 2.0 MB
- **Dimensión recomendada:** 300x300px o 400x400px
- **Formato:** WebP + PNG fallback (o solo PNG optimizado)
- **Peso objetivo:** < 50 KB
- **Reducción esperada:** 97.5% (2MB → 50KB)

## 🎯 Impacto Esperado en LCP

| Métrica | Antes | Después |
|---------|-------|---------|
| **ag_foto.png** | 6.2 MB (8-10s) | 100 KB (0.2s) |
| **aghr_logo.png** | 2.0 MB (3-4s) | 50 KB (0.1s) |
| **LCP Total** | 12.9s ❌ | 1.5-2.5s ✅ |
| **Performance Score** | ~40-50 | ~85-95 |

## 📝 Checklist de Optimización

- [ ] Optimizar `ag_foto.png` (6.2MB → 100KB)
- [ ] Optimizar `aghr_logo.png` (2MB → 50KB)
- [ ] Guardar versiones WebP
- [ ] Reemplazar imports en componentes
- [ ] Añadir dimensiones width/height
- [ ] Implementar skeleton screen
- [ ] Rebuild y deploy
- [ ] Verificar nuevo LCP en Lighthouse

## 🔄 Próximos Pasos Después de Optimizar

Una vez que hayas optimizado las imágenes manualmente:

1. **Reemplaza los archivos** en las carpetas originales
2. **O crea versiones WebP** y actualiza los componentes
3. Ejecuta: `npm run build`
4. Ejecuta: `npm run deploy`
5. Espera 2-3 minutos
6. Verifica en PageSpeed Insights

## ⚡ Bonus: Pre-optimización CSS

Mientras optimizas las imágenes, puedes aplicar esto para mejorar la percepción visual:

```css
/* Añadir al componente que usa ag_foto.png */
.founder-image, .team-image {
  background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
  min-height: 400px; /* Evita CLS */
}

/* Añadir al logo */
.logo-image {
  width: 120px;
  height: 120px; /* Dimensiones explícitas */
}
```

## 🎨 Herramientas Recomendadas

1. **Squoosh.app** - La más fácil, visual, gratis
2. **TinyPNG.com** - Automática, límite de 5MB por imagen
3. **Compressor.io** - Soporta imágenes grandes
4. **ImageOptim** (Mac) - App de escritorio
5. **RIOT** (Windows) - App gratuita

---

**NOTA URGENTE:** El 80% de tu problema de performance se resuelve optimizando estas 2 imágenes. Es la prioridad #1.
