# Comparación Visual de Animaciones

## Características por página

### 🔧 SERVICIOS - Formas Geométricas Modulares
**Concepto:** Líneas, rectángulos y división de espacios  
**Vibe:** Profesional, técnico, ordenado  
**Elementos:**
- Línea horizontal divisoria (50/50 split)
- Rectángulos modulares (25/75 split en dos direcciones)
- Línea vertical como separador
- Timing: Cascada de 0.2s cada uno

**Cuándo usar:** Página de servicios/productos

---

### 👥 NOSOTROS - Formas Circulares y Orgánicas
**Concepto:** Círculos superpuestos + blob fluido  
**Vibe:** Amigable, humano, cohesivo  
**Elementos:**
- Círculo grande de fondo (40% de pantalla)
- Círculos medianos y pequeños
- Path blob suave y abstracto
- Timing: Más disperso (0.15s a 0.3s)

**Cuándo usar:** Página "Nosotros"/"About Us"

---

### 🔍 BÚSQUEDAS - Formas Dinámicas y Polígonos
**Concepto:** Triángulos, polígonos irregulares, líneas diagonales  
**Vibe:** Energético, dinámico, innovador  
**Elementos:**
- Triángulo grande asimétrico
- Polígono de 4 puntos (rombo deformado)
- Líneas diagonales múltiples
- Pequeño polígono decorativo
- Timing: Rápido y punzante (1.9s a 2.3s)

**Cuándo usar:** Página de búsqueda/filtros

---

### 📞 CONTACTO - Formas Fluidas y Ondas
**Concepto:** Ondas suaves, curvas, elipses  
**Vibe:** Cálido, acogedor, fluido  
**Elementos:**
- Dos ondas SVG suaves
- Curva decorativa
- Dos elipses flotantes
- Timing: Más lento y rítmico (2s a 2.4s)

**Cuándo usar:** Página de contacto

---

## Opciones de Personalización

### OPCIÓN A: Más Sutil (actual -30% opacidad)

```svg
<!-- Cambiar todos los fills de: rgba(..., 0.15) a rgba(..., 0.08) -->
<rect fill="rgba(79, 70, 229, 0.08)" /> <!-- Más tenue -->
```

### OPCIÓN B: Más Dramático (actual +50% opacidad)

```svg
<!-- Cambiar todos los fills de: rgba(..., 0.15) a rgba(..., 0.22) -->
<rect fill="rgba(79, 70, 229, 0.22)" /> <!-- Más visible -->
```

### OPCIÓN C: Animación Rápida (entrada en 1.2s)

```css
.animate-shape-1 {
  animation: slide-right 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}
```

### OPCIÓN D: Animación Lenta (entrada en 3s, cinematic)

```css
.animate-shape-1 {
  animation: slide-right 3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}
```

---

## Matrix de Timing

```
Timing (ms) │ Sensación
─────────────┼──────────────────────────────
1200-1600   │ Rápida, punzante, energética
1800-2200   │ Normal, elegante (ACTUAL)
2400-2800   │ Lenta, cinematográfica
3000+       │ Muy lenta, meditativa
```

---

## Ejemplos de Combinaciones

### ⚡ Combinación "Bold"
```css
/* Animación rápida + opacidad alta */
animation: slide-right 1.5s cubic-bezier(...) forwards;
fill: rgba(79, 70, 229, 0.20); /* +33% visible */
```

### 🌫️ Combinación "Subtle"
```css
/* Animación lenta + opacidad baja */
animation: slide-right 2.8s cubic-bezier(...) forwards;
fill: rgba(79, 70, 229, 0.06); /* -60% visible */
```

### ✨ Combinación "Balanced" (RECOMENDADA)
```css
/* Animación moderada + opacidad equilibrada */
animation: slide-right 2s cubic-bezier(...) forwards;
fill: rgba(79, 70, 229, 0.12); /* Actual */
```

---

## Cálculo de Performance

### GPU Memory por animación
```
SVG size: ~2KB
CSS animations: 0 memory (declarativas)
Total por página: <5KB
────────────────────
4 páginas: ~12-15KB
```

### Frame rate esperado
```
Navegador moderno: 60 FPS ✓
Dispositivos antiguos: 30-45 FPS ✓
Con prefers-reduced-motion: Instantáneo ✓
```

---

## Checklist de Implementación

- [ ] Copiar 4 archivos .vue a `src/components/HeroAnimations/`
- [ ] Importar en cada página de Hero
- [ ] Verificar `overflow: hidden` en `.hero-modern`
- [ ] Testear en mobile
- [ ] Testear con DevTools reducido a 50% CPU
- [ ] Verificar accesibilidad con `prefers-reduced-motion`
- [ ] Opcional: Ajustar opacidad/timing según brand

---

## Alternativas Avanzadas

Si quieres más control, puedes:

### Opción 1: GSAP (más control, ~15KB)
```js
gsap.to(shape, { duration: 2, x: 1920, ease: "power2.inOut" })
```

### Opción 2: Framer Motion (React, más fluido)
```jsx
<motion.svg animate={{ x: 1920 }} transition={{ duration: 2 }} />
```

### Opción 3: Canvas (máximo performance, más complejo)
```js
const canvas = document.querySelector('canvas')
// Dibujar formas y animar con requestAnimationFrame
```

**Recomendación:** Mantén las animaciones SVG actuales. Son 90% tan buenas como GSAP pero sin overhead.

