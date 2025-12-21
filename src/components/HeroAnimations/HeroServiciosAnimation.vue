<template>
  <div class="hero-animation-servicios">
    <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
      <!-- Línea horizontal de corte inicial -->
      <rect
        x="-1920"
        y="480"
        width="1920"
        height="120"
        fill="rgba(255, 255, 255, 0.08)"
        class="animate-shape-1"
      />
      
      <!-- Rectángulos modulares -->
      <rect
        x="-600"
        y="200"
        width="400"
        height="300"
        fill="rgba(79, 70, 229, 0.15)"
        class="animate-shape-2"
      />
      
      <rect
        x="-800"
        y="650"
        width="500"
        height="200"
        fill="rgba(124, 58, 237, 0.12)"
        class="animate-shape-3"
      />
      
      <!-- Líneas verticales de división -->
      <line
        x1="-100"
        y1="0"
        x2="-100"
        y2="1080"
        stroke="rgba(255, 255, 255, 0.06)"
        stroke-width="2"
        class="animate-shape-4"
      />
    </svg>
  </div>
</template>

<script setup>
// Animación declarativa con CSS
</script>

<style scoped>
.hero-animation-servicios {
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
  animation: slide-right 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

.animate-shape-2 {
  animation: slide-right 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s forwards;
}

.animate-shape-3 {
  animation: slide-right 2.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s forwards;
}

.animate-shape-4 {
  animation: slide-right 2.1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s forwards;
  opacity: 0;
}

.animate-shape-4 {
  animation: slide-right 2.1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s forwards,
            fade-in 0.8s ease-out 0.3s forwards;
}

@keyframes slide-right {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(1920px);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .animate-shape-1,
  .animate-shape-2,
  .animate-shape-3,
  .animate-shape-4 {
    animation: none !important;
    transform: translateX(1920px);
    opacity: 1;
  }
}
</style>
