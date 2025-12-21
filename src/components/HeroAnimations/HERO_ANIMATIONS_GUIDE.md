# Guía de Integración - Hero Animations

## Características
✅ Animaciones SVG optimizadas  
✅ Decorativas en el background (no interfieren con contenido)  
✅ Entrada suave de izquierda a derecha  
✅ Timing cascada elegante (stagger efecto)  
✅ Respeta preferencias de movimiento reducido  
✅ ~3KB total minificado

---

## Integración en tus Hero Components

### 1. Estructura de tu componente Hero existente

```vue
<template>
  <div class="hero-modern">
    <!-- AGREGAR AQUÍ LA ANIMACIÓN -->
    <HeroServiciosAnimation />
    
    <!-- Tu background existente -->
    <div class="hero-background"></div>
    <div class="hero-overlay"></div>
    
    <!-- Tu contenido -->
    <div class="hero-container">
      <div class="hero-content">
        <!-- Tu contenido aquí -->
      </div>
    </div>
  </div>
</template>

<script setup>
import HeroServiciosAnimation from '@/components/HeroAnimations/HeroServiciosAnimation.vue'
// Importa según la página
</script>
```

### 2. Estructura de carpetas sugerida

```
src/
└── components/
    └── HeroAnimations/
        ├── HeroServiciosAnimation.vue
        ├── HeroNosotrosAnimation.vue
        ├── HeroBusquedasAnimation.vue
        └── HeroContactoAnimation.vue
```

### 3. Ajuste CSS en tu `.hero-modern`

Asegúrate de que tu `.hero-modern` tenga `overflow: hidden` (ya lo tienes):

```css
.hero-modern {
  position: relative;
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden; /* ✓ Importante */
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
}
```

---

## Personalización

### Cambiar velocidad de animación
En cualquier archivo `.vue` de animación, ajusta el tiempo en `animation`:

```css
/* Más rápido -->
.animate-shape-1 {
  animation: slide-right 1.5s cubic-bezier(...) forwards;
}

/* Más lento -->
.animate-shape-1 {
  animation: slide-right 2.5s cubic-bezier(...) forwards;
}
```

### Cambiar colores/opacidad
En cualquier `<rect>`, `<circle>`, etc., ajusta los valores `rgba`:

```svg
<!-- Más visible -->
<rect fill="rgba(79, 70, 229, 0.20)" /> <!-- 0.20 en lugar de 0.15 -->

<!-- Más sutil -->
<rect fill="rgba(79, 70, 229, 0.08)" /> <!-- 0.08 en lugar de 0.15 -->
```

### Cambiar el timing function
El `cubic-bezier(0.25, 0.46, 0.45, 0.94)` controla la suavidad:

```css
/* Más lineal -->
animation: slide-right 2s linear forwards;

/* Más acelerado al final -->
animation: slide-right 2s cubic-bezier(0.42, 0, 1, 1) forwards;

/* Más "bouncy" -->
animation: slide-right 2s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
```

---

## Performance

### Optimizaciones ya aplicadas
- SVG con `viewBox` en lugar de dimensiones fijas → Escalable
- Solo `transform: translateX()` → GPU accelerated ⚡
- Sin operaciones layout/paint
- `will-change` implícito en animaciones CSS

### Tamaño estimado (minificado)
```
HeroServiciosAnimation.vue:  ~800 bytes
HeroNosotrosAnimation.vue:   ~750 bytes
HeroBusquedasAnimation.vue:  ~900 bytes
HeroContactoAnimation.vue:   ~850 bytes
────────────────────────────────────────
Total:                       ~3.3 KB
```

---

## Testing

### Verificar que funciona
1. Abre DevTools → Elementos
2. Busca `<svg>` en tu Hero
3. Recarga la página y observa la animación

### Debugging
Si no ves la animación:
- ✓ Revisa que `overflow: hidden` esté en `.hero-modern`
- ✓ Verifica que la animación importe correctamente
- ✓ Comprueba que `z-index: 0` esté en `.hero-animation-*`

---

## Accesibilidad

Respeta `prefers-reduced-motion`:
```css
@media (prefers-reduced-motion: reduce) {
  /* Las formas aparecen instantáneamente */
}
```

---

## Ejemplos de uso completo

### Para página de Servicios

```vue
<template>
  <section class="hero-modern">
    <HeroServiciosAnimation />
    <div class="hero-background"></div>
    <div class="hero-overlay"></div>
    
    <div class="hero-container">
      <div class="hero-content">
        <div class="hero-logo">
          <img src="..." class="logo-image" alt="Logo" />
        </div>
        <h1 class="hero-brand">Nuestros Servicios</h1>
        <h2 class="hero-title">Soluciones web integrales</h2>
        <p class="hero-subtitle">Desarrollo, diseño y consultoría</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import HeroServiciosAnimation from '@/components/HeroAnimations/HeroServiciosAnimation.vue'
</script>
```

---

## Preguntas comunes

**¿Puedo cambiar los colores para que usen mis CSS variables?**
Sí, reemplaza `rgba(79, 70, 229, 0.15)` con `rgba(var(--color-primary), 0.15)` si tienes RGB variables, o usa `color-mix()` en navegadores modernos.

**¿Se animan cada vez que entro a la página?**
Sí, la animación corre al montar el componente. Si quieres que sea una sola vez en la sesión, agrega lógica en `<script setup>` con localStorage.

**¿Funciona en móvil?**
Sí, `preserveAspectRatio="xMidYMid slice"` escala correctamente.

