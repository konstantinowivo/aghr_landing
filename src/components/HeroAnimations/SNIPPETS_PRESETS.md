# Snippets Listos para Usar

## CSS Presets de Timing

### Preset "Elegante Rápido" (1.5s)
```css
.animate-shape-1 {
  animation: slide-right 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

.animate-shape-2 {
  animation: slide-right 1.65s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.1s forwards;
}

.animate-shape-3 {
  animation: slide-right 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s forwards;
}

.animate-shape-4 {
  animation: slide-right 1.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.15s forwards;
}

.animate-shape-5 {
  animation: slide-right 1.55s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.05s forwards;
}
```

### Preset "Cinematográfico" (2.8s)
```css
.animate-shape-1 {
  animation: slide-right 2.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

.animate-shape-2 {
  animation: slide-right 3s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s forwards;
}

.animate-shape-3 {
  animation: slide-right 3.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s forwards;
}

.animate-shape-4 {
  animation: slide-right 3.1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s forwards;
}

.animate-shape-5 {
  animation: slide-right 2.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.15s forwards;
}
```

### Preset "Bold & Fast" (1.2s)
```css
.animate-shape-1 {
  animation: slide-right 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

.animate-shape-2 {
  animation: slide-right 1.3s cubic-bezier(0.34, 1.56, 0.64, 1) 0.08s forwards;
}

.animate-shape-3 {
  animation: slide-right 1.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.16s forwards;
}

.animate-shape-4 {
  animation: slide-right 1.35s cubic-bezier(0.34, 1.56, 0.64, 1) 0.12s forwards;
}

.animate-shape-5 {
  animation: slide-right 1.25s cubic-bezier(0.34, 1.56, 0.64, 1) 0.04s forwards;
}
```

---

## Presets de Opacidad

### Sutileza Máxima (Opacidad -50%)
```svg
<!-- Servicios -->
fill="rgba(79, 70, 229, 0.07)"    <!-- 0.15 → 0.07 -->
fill="rgba(124, 58, 237, 0.06)"   <!-- 0.12 → 0.06 -->
stroke="rgba(255, 255, 255, 0.03)" <!-- 0.06 → 0.03 -->

<!-- Nosotros -->
fill="rgba(79, 70, 229, 0.05)"    <!-- 0.10 → 0.05 -->
fill="rgba(124, 58, 237, 0.04)"   <!-- 0.08 → 0.04 -->

<!-- Búsquedas -->
fill="rgba(79, 70, 229, 0.06)"    <!-- 0.12 → 0.06 -->
fill="rgba(124, 58, 237, 0.045)"  <!-- 0.09 → 0.045 -->
stroke="rgba(255, 255, 255, 0.035)" <!-- 0.07 → 0.035 -->

<!-- Contacto -->
fill="rgba(79, 70, 229, 0.055)"   <!-- 0.11 → 0.055 -->
fill="rgba(124, 58, 237, 0.04)"   <!-- 0.08 → 0.04 -->
stroke="rgba(255, 255, 255, 0.04" <!-- 0.08 → 0.04 -->
```

### Dramatismo Máximo (Opacidad +80%)
```svg
<!-- Servicios -->
fill="rgba(79, 70, 229, 0.27)"    <!-- 0.15 → 0.27 -->
fill="rgba(124, 58, 237, 0.216)"  <!-- 0.12 → 0.216 -->
stroke="rgba(255, 255, 255, 0.108)" <!-- 0.06 → 0.108 -->

<!-- Nosotros -->
fill="rgba(79, 70, 229, 0.18)"    <!-- 0.10 → 0.18 -->
fill="rgba(124, 58, 237, 0.144)"  <!-- 0.08 → 0.144 -->

<!-- Búsquedas -->
fill="rgba(79, 70, 229, 0.216)"   <!-- 0.12 → 0.216 -->
fill="rgba(124, 58, 237, 0.162)"  <!-- 0.09 → 0.162 -->
stroke="rgba(255, 255, 255, 0.126" <!-- 0.07 → 0.126 -->

<!-- Contacto -->
fill="rgba(79, 70, 229, 0.198)"   <!-- 0.11 → 0.198 -->
fill="rgba(124, 58, 237, 0.144)"  <!-- 0.08 → 0.144 -->
stroke="rgba(255, 255, 255, 0.144" <!-- 0.08 → 0.144 -->
```

---

## Timing Functions Alternativas

### Linear (Movimiento uniforme)
```css
animation: slide-right 2s linear forwards;
```

### Ease-In (Lento → Rápido)
```css
animation: slide-right 2s ease-in forwards;
```

### Ease-Out (Rápido → Lento)
```css
animation: slide-right 2s ease-out forwards;
```

### Ease-In-Out (Lento → Rápido → Lento)
```css
animation: slide-right 2s ease-in-out forwards;
```

### Custom Suave (RECOMENDADA - ya incluida)
```css
animation: slide-right 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
```

### Custom Bounce (Efecto rebote)
```css
animation: slide-right 2s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
```

### Custom Acelerado
```css
animation: slide-right 2s cubic-bezier(0.42, 0, 1, 1) forwards;
```

---

## Snippets de Integración Rápida

### Para Nuxt/Vue 3 (Dynamic Import)
```vue
<template>
  <div class="hero-modern">
    <component :is="HeroAnimation" />
    <!-- resto del contenido -->
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'

const animationMap = {
  servicios: () => import('@/components/HeroAnimations/HeroServiciosAnimation.vue'),
  nosotros: () => import('@/components/HeroAnimations/HeroNosotrosAnimation.vue'),
  busquedas: () => import('@/components/HeroAnimations/HeroBusquedasAnimation.vue'),
  contacto: () => import('@/components/HeroAnimations/HeroContactoAnimation.vue'),
}

const props = defineProps({
  page: String
})

const HeroAnimation = defineAsyncComponent(animationMap[props.page])
</script>
```

### Para verificar que carga en DevTools
```js
// En la consola del navegador
document.querySelector('svg')  // Debe retornar <svg>...</svg>

// Verificar que anima
document.querySelector('[class*="animate-shape"]')  // Debe retornar elemento
```

---

## Checklist de Validación

### ✅ Funcional
- [ ] Las formas entran de izquierda a derecha
- [ ] El timing es escalonado (cascada)
- [ ] No interfiere con el contenido (z-index: 0)
- [ ] Se completa en <2.5s

### ✅ Visual
- [ ] Las formas se ven elegantes
- [ ] Los colores combinan con tu paleta
- [ ] La opacidad no es demasiado fuerte
- [ ] En mobile se ve bien

### ✅ Performance
- [ ] Frame rate constante (DevTools > Rendering)
- [ ] Sin lag en la animación
- [ ] Rápido en móviles
- [ ] Respeta `prefers-reduced-motion`

---

## Troubleshooting Rápido

### Las formas no se ven
```css
/* Aumentar opacidad en los fills -->
fill="rgba(79, 70, 229, 0.15)" → 0.30
```

### La animación es muy rápida/lenta
```css
/* Cambiar duración -->
animation: slide-right 2s ... → 1.5s o 3s
```

### Las formas se ven cortadas
```css
/* Verificar en .hero-modern -->
overflow: hidden; ✓
```

### Se ve pixelada en Android
```svg
<!-- Agregar al SVG -->
<svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" shape-rendering="geometricPrecision">
```

---

## Exportación para Figma/Design

Las animaciones están optimizadas para exportar:

```bash
# Minificar SVGs antes de guardar
svgo HeroServiciosAnimation.vue --pretty
```

Tamaño final esperado: **~3.5 KB total** (4 componentes)

