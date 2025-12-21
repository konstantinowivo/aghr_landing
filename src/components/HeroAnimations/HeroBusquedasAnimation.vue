<template>
  <div class="hero-animation-busquedas">
    <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
      <!-- Triángulo grande -->
      <polygon
        points="-400,200 -100,800 -700,800"
        fill="rgba(79, 70, 229, 0.12)"
        class="animate-shape-1"
      />
      
      <!-- Formas geométricas superpuestas -->
      <polygon
        points="-200,100 100,400 -200,700 -500,400"
        fill="rgba(124, 58, 237, 0.09)"
        class="animate-shape-2"
      />
      
      <!-- Líneas diagonales -->
      <line
        x1="-800"
        y1="0"
        x2="-400"
        y2="1080"
        stroke="rgba(255, 255, 255, 0.07)"
        stroke-width="3"
        class="animate-shape-3"
      />
      
      <line
        x1="-600"
        y1="0"
        x2="-200"
        y2="1080"
        stroke="rgba(255, 255, 255, 0.05)"
        stroke-width="2"
        class="animate-shape-4"
      />
      
      <!-- Polígono pequeño decorativo -->
      <polygon
        points="-1000,300 -850,200 -700,300 -850,400"
        fill="rgba(255, 255, 255, 0.06)"
        class="animate-shape-5"
      />
    </svg>
  </div>
</template>

<script setup>
// Animación declarativa con CSS
</script>

<style scoped>
.hero-animation-busquedas {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}

svg {
  width: 100%;
  height: 100%;
  display: block;
}

.animate-shape-1 {
  animation: slide-right 1.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

.animate-shape-2 {
  animation: slide-right 2.1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s forwards;
}

.animate-shape-3 {
  animation: slide-right 2.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s forwards;
}

.animate-shape-4 {
  animation: slide-right 2.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.25s forwards;
}

.animate-shape-5 {
  animation: slide-right 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.15s forwards;
}

@keyframes slide-right {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(1920px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .animate-shape-1,
  .animate-shape-2,
  .animate-shape-3,
  .animate-shape-4,
  .animate-shape-5 {
    animation: none !important;
    transform: translateX(1920px);
  }
}
</style>
