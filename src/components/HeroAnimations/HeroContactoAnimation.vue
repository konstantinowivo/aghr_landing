<template>
  <div class="hero-animation-contacto">
    <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
      <!-- Onda suave principal -->
      <path
        d="M -800 400 Q -600 200 -400 400 T 200 400 L 200 1080 L -800 1080 Z"
        fill="rgba(79, 70, 229, 0.11)"
        class="animate-shape-1"
      />
      
      <!-- Onda secundaria -->
      <path
        d="M -1000 600 Q -800 500 -600 600 T 200 600 L 200 1080 L -1000 1080 Z"
        fill="rgba(124, 58, 237, 0.08)"
        class="animate-shape-2"
      />
      
      <!-- Curva decorativa -->
      <path
        d="M -700 250 Q -500 150 -300 250 Q -100 350 100 250"
        stroke="rgba(255, 255, 255, 0.08)"
        stroke-width="2"
        fill="none"
        class="animate-shape-3"
      />
      
      <!-- Forma blob suave flotante -->
      <ellipse
        cx="-500"
        cy="300"
        rx="150"
        ry="200"
        fill="rgba(139, 92, 246, 0.09)"
        class="animate-shape-4"
      />
      
      <!-- Segundo blob -->
      <ellipse
        cx="-1200"
        cy="700"
        rx="120"
        ry="160"
        fill="rgba(255, 255, 255, 0.05)"
        class="animate-shape-5"
      />
    </svg>
  </div>
</template>

<script setup>
// Animación declarativa con CSS
</script>

<style scoped>
.hero-animation-contacto {
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
  animation: slide-right 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

.animate-shape-2 {
  animation: slide-right 2.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s forwards;
}

.animate-shape-3 {
  animation: slide-right 2.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.15s forwards;
}

.animate-shape-4 {
  animation: slide-right 2.1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.25s forwards;
}

.animate-shape-5 {
  animation: slide-right 2.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s forwards;
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
