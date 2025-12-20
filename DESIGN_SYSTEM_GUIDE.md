# AGHR - Modern Corporate Design System Guide

## 📐 Sistema de Diseño Implementado

Se ha creado un sistema de diseño corporativo moderno con las siguientes características:

### 🎨 **Paleta de Colores**

#### Colores Principales (Indigo/Purple - Profesional y Moderno)
```css
--color-primary: #4F46E5        /* Indigo principal */
--color-primary-dark: #4338CA   /* Indigo oscuro */
--color-primary-light: #6366F1  /* Indigo claro */
--color-secondary: #7C3AED      /* Purple */
--color-accent: #06B6D4         /* Cyan para acentos */
```

#### Neutrales (Alto Contraste para Legibilidad)
```css
--color-text-primary: #111827   /* Texto principal - Negro suave */
--color-text-secondary: #374151 /* Texto secundario */
--color-text-tertiary: #6B7280  /* Texto terciario */
```

### ✍️ **Tipografía Profesional**

#### Fuentes
- **Primary:** Inter (textos, párrafos, UI)
- **Headings:** Plus Jakarta Sans (títulos, encabezados)

#### Tamaños Responsivos
```css
h1 { font-size: clamp(2rem, 5vw, 3rem); }    /* 32px - 48px */
h2 { font-size: clamp(1.75rem, 4vw, 2.25rem); } /* 28px - 36px */
h3 { font-size: clamp(1.5rem, 3vw, 1.875rem); }  /* 24px - 30px */
```

### 🎯 **Principios de Diseño**

1. **Legibilidad Alta**
   - Line-height: 1.7 para párrafos
   - Contraste mínimo 4.5:1 (WCAG AA)
   - Fuentes con pesos bien definidos (400, 500, 600, 700, 800)

2. **Espaciado Consistente**
   - Sistema de spacing basado en múltiplos de 4px
   - Padding y margins uniformes

3. **Sombras Sutiles**
   - Sombras suaves y profesionales
   - Elevación clara de elementos

4. **Transiciones Suaves**
   - 200ms para interacciones estándar
   - Cubic-bezier para movimientos naturales

## 🔄 **Cómo Aplicar los Estilos**

### Ejemplo: Actualizar un Componente

**ANTES:**
```vue
<style scoped>
.title {
  font-size: 2.5rem;
  color: #111827;
}
</style>
```

**DESPUÉS:**
```vue
<style scoped>
.title {
  font-family: var(--font-family-heading);
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  font-weight: 700;
  color: var(--color-text-primary);
  letter-spacing: -0.02em;
  line-height: 1.25;
}
</style>
```

### Guía Rápida de Reemplazo

#### Colores
```css
/* ANTIGUO → NUEVO */
#5568D3 → var(--color-primary)
#764ba2 → var(--color-secondary)
#111827 → var(--color-text-primary)
#6b7280 → var(--color-text-secondary)
```

#### Sombras
```css
/* ANTIGUO → NUEVO */
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1) → var(--shadow-md)
box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1) → var(--shadow-lg)
```

#### Transiciones
```css
/* ANTIGUO → NUEVO */
transition: all 0.3s ease → transition: all var(--transition-base)
```

## 📦 **Componentes Clave a Actualizar**

### 1. Navbar
- Fondo blanco con sombra sutil
- Links con hover state claro
- Botón CTA con gradiente primary

### 2. Buttons
```css
.btn-primary {
  background: var(--color-primary);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 600;
  transition: all var(--transition-base);
}

.btn-primary:hover {
  background: var(--color-primary-dark);
  transform: translateY(-1px);
  box-shadow: var(--shadow-lg);
}
```

### 3. Cards
```css
.card {
  background: white;
  border-radius: 1rem;
  box-shadow: var(--shadow-md);
  padding: 1.5rem;
  transition: all var(--transition-base);
  border: 1px solid #F3F4F6;
}

.card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
  border-color: var(--color-primary-light);
}
```

### 4. Gradientes
```css
/* Hero sections, CTAs */
.gradient-primary {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
}
```

## 🎨 **Paleta Visual**

### Backgrounds
- **Page Background:** #FAFBFC (Gris muy claro)
- **Card Background:** #FFFFFF (Blanco puro)
- **Section Alt Background:** #F9FAFB (Gris suave)

### Borders
- **Default:** #E5E7EB
- **Hover:** var(--color-primary-light)
- **Focus:** var(--color-primary)

### Borders Radius
- **Small (buttons, inputs):** 0.75rem
- **Medium (cards):** 1rem
- **Large (modals):** 1.5rem

## ✅ **Checklist de Actualización**

- [x] Estilos globales actualizados
- [x] Variables CSS definidas
- [x] App.vue modernizado
- [ ] Navbar con nuevo diseño
- [ ] Botones estandarizados
- [ ] Cards con estilo uniforme
- [ ] Forms con inputs modernos
- [ ] Gradientes actualizados
- [ ] Sombras estandarizadas
- [ ] Tipografía unificada

## 🚀 **Mejores Prácticas**

1. **Usa siempre las variables CSS** en lugar de valores hard-coded
2. **Aprovecha clamp()** para tipografía responsive
3. **Aplica las transiciones** para mejor UX
4. **Mantén contraste alto** para accesibilidad
5. **Usa box-shadow en lugar de bordes** para elevación visual
6. **Aplica letter-spacing negativo** (-0.02em) en títulos grandes

## 📱 **Responsive Design**

### Breakpoints
```css
/* Mobile First */
@media (max-width: 480px)  { /* Mobile small */ }
@media (max-width: 640px)  { /* Mobile */ }
@media (max-width: 768px)  { /* Tablet */ }
@media (max-width: 1024px) { /* Desktop small */ }
@media (max-width: 1280px) { /* Desktop */ }
```

### Ajustes Automáticos
- Tipografía se ajusta con `clamp()`
- Spacing proporcional con viewport
- Grid columns adaptables

---

**Implementado por:** Claude Code
**Fecha:** Diciembre 2025
**Versión:** 1.0
