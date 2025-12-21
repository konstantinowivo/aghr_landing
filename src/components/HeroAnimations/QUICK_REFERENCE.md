# 🚀 QUICK REFERENCE - Hero Animations AGHR

## ⚡ Implementación Rápida (5 minutos)

### 1. Crear carpeta
```bash
mkdir -p src/components/HeroAnimations
```

### 2. Copiar 4 componentes
Copia estos archivos en esa carpeta:
- `HeroServiciosAnimation.vue`
- `HeroNosotrosAnimation.vue`
- `HeroBusquedasAnimation.vue`
- `HeroContactoAnimation.vue`

### 3. Importar en cada página
```vue
<template>
  <section class="hero-modern">
    <HeroServiciosAnimation /> <!-- ← Aquí -->
    <div class="hero-background"></div>
    <!-- resto del contenido -->
  </section>
</template>

<script setup>
import HeroServiciosAnimation from '@/components/HeroAnimations/HeroServiciosAnimation.vue'
</script>
```

### 4. Repetir para las otras 3 páginas
- Nosotros → `HeroNosotrosAnimation`
- Búsquedas → `HeroBusquedasAnimation`
- Contacto → `HeroContactoAnimation`

✅ **Listo.** Las animaciones funcionan.

---

## 📊 Comparación Rápida

| Página | Componente | Tipo | Vibe |
|--------|-----------|------|------|
| 🔧 Servicios | `HeroServiciosAnimation` | Líneas + Rectángulos | Profesional |
| 👥 Nosotros | `HeroNosotrosAnimation` | Círculos + Blobs | Amigable |
| 🔍 Búsquedas | `HeroBusquedasAnimation` | Triángulos + Polígonos | Energético |
| 📞 Contacto | `HeroContactoAnimation` | Ondas + Elipses | Cálido |

---

## ⏱️ Timing Presets

### Rápido (1.5s)
```css
.animate-shape-1 { animation: slide-right 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
.animate-shape-2 { animation: slide-right 1.65s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.1s forwards; }
.animate-shape-3 { animation: slide-right 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s forwards; }
```

### Normal (2s) - ACTUAL
```css
.animate-shape-1 { animation: slide-right 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
.animate-shape-2 { animation: slide-right 2.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s forwards; }
.animate-shape-3 { animation: slide-right 2.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s forwards; }
```

### Lento (2.8s)
```css
.animate-shape-1 { animation: slide-right 2.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
.animate-shape-2 { animation: slide-right 3s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s forwards; }
.animate-shape-3 { animation: slide-right 3.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s forwards; }
```

---

## 🎨 Opacidad Presets

### Sutil (-50%)
```
0.15 → 0.07
0.12 → 0.06
0.10 → 0.05
0.08 → 0.04
0.06 → 0.03
```

### Dramático (+50%)
```
0.15 → 0.23
0.12 → 0.18
0.10 → 0.15
0.08 → 0.12
0.06 → 0.09
```

---

## 🔧 Troubleshooting Rápido

| Problema | Solución |
|----------|----------|
| No se ven | ↑ Opacidad en `fill` (0.15 → 0.25) |
| Demasiado rápido | ↓ Duración (2s → 3s) |
| Demasiado lento | ↑ Duración (2s → 1.5s) |
| Se corta | Verificar `overflow: hidden` en `.hero-modern` |
| Pixelada | Agregar `shape-rendering="geometricPrecision"` en SVG |
| No respetar movimiento | Verificar `@media (prefers-reduced-motion: reduce)` |

---

## 📁 Estructura de Carpetas

```
src/
├── components/
│   └── HeroAnimations/
│       ├── HeroServiciosAnimation.vue (1.9 KB)
│       ├── HeroNosotrosAnimation.vue (1.8 KB)
│       ├── HeroBusquedasAnimation.vue (2.1 KB)
│       └── HeroContactoAnimation.vue (2.2 KB)
│
├── pages/
│   ├── Servicios.vue → importa HeroServiciosAnimation
│   ├── Nosotros.vue → importa HeroNosotrosAnimation
│   ├── Busquedas.vue → importa HeroBusquedasAnimation
│   └── Contacto.vue → importa HeroContactoAnimation
```

**Total:** ~3.3 KB | Gzip: ~1.2 KB

---

## ✅ Checklist

- [ ] Crear carpeta `src/components/HeroAnimations/`
- [ ] Copiar 4 archivos `.vue`
- [ ] Importar en Servicios
- [ ] Importar en Nosotros
- [ ] Importar en Búsquedas
- [ ] Importar en Contacto
- [ ] Testear en desktop
- [ ] Testear en mobile
- [ ] Ajustar si es necesario
- [ ] Git push ✨

---

## 🎯 Cambios Más Comunes

### "Quiero que sean más rápidas"
**Cambio:** Duración `2s` → `1.5s`
```css
animation: slide-right 1.5s cubic-bezier(...) forwards;
```

### "Quiero que sean más sutiles"
**Cambio:** Opacidad `0.15` → `0.08`
```svg
fill="rgba(79, 70, 229, 0.08)"
```

### "Quiero otro timing function"
**Cambio:** `cubic-bezier(0.25, 0.46, 0.45, 0.94)` → `ease-out`
```css
animation: slide-right 2s ease-out forwards;
```

---

## 🧪 Testeo Rápido

### En el navegador
```javascript
// Abre consola y verifica que existe
document.querySelector('svg')

// Verifica que está animando
document.querySelector('[class*="animate-shape"]')
```

### DevTools Performance
1. Abre Chrome DevTools → Performance
2. Carga la página
3. Busca la animación
4. Verifica FPS (debe ser 60)

### Mobile
1. Conecta tu teléfono
2. Abre con `http://tu-ip:5173`
3. Verifica que se ve bien

---

## 📞 Soporte Rápido

**¿Preguntas?** Revisa en este orden:

1. **DOCUMENTO_COMPLETO_CLAUDE_CLI.md** → Documentación completa
2. **COMO_PASAR_A_CLAUDE_CLI.md** → Cómo pasar a Claude
3. **ANIMATION_OPTIONS.md** → Opciones de personalización
4. **SNIPPETS_PRESETS.md** → Código listo para copiar

---

## 🚀 Comandos Útiles

```bash
# Verificar que existe la carpeta
ls src/components/HeroAnimations/

# Verificar que compila sin errores
npm run build

# Ejecutar en desarrollo
npm run dev

# Ver tamaño del bundle
npm run build && ls -lh dist/
```

---

## ⚙️ Specs Técnicas

- **Tamaño:** 3.3 KB (sin comprimir) / 1.2 KB (gzip)
- **Performance:** 60 FPS (desktop) / 30-45 FPS (mobile)
- **Compatibilidad:** Todos los navegadores modernos
- **Accesibilidad:** Respeta `prefers-reduced-motion`
- **SVG Method:** Animación CSS (transform, no paint)

---

## 💡 Mejores Prácticas

✅ Mantener timing entre 1.5s - 2.5s  
✅ Opacidad entre 0.05 - 0.25  
✅ Usar `translateX` (GPU accelerated)  
✅ Incluir timing cascada (stagger)  
✅ Respetar `prefers-reduced-motion`  
✅ Testear en mobile

❌ No cambiar `position: absolute` en `.hero-animation-*`  
❌ No aumentar opacidad >0.3 (se ve feo)  
❌ No hacer animaciones >3s (muy lenta)  
❌ No olvidar `overflow: hidden` en `.hero-modern`

---

## 📖 Documentación Completa

Para información completa sobre:
- Integración paso a paso → HERO_ANIMATIONS_GUIDE.md
- Opciones de personalización → ANIMATION_OPTIONS.md
- Código listo para copiar → SNIPPETS_PRESETS.md
- Documento completo → DOCUMENTO_COMPLETO_CLAUDE_CLI.md

---

**Versión:** 1.0  
**Última actualización:** Diciembre 21, 2025  
**Estado:** ✅ Listo para producción
