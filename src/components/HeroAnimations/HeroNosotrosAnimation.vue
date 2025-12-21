<template>
  <div class="hero-animation-nosotros">
    <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
      <!-- Círculo grande parcial -->
      <circle
        cx="-300"
        cy="540"
        r="400"
        fill="rgba(79, 70, 229, 0.1)"
        class="animate-shape-1"
      />
      
      <!-- Círculo mediano -->
      <circle
        cx="-800"
        cy="270"
        r="250"
        fill="rgba(124, 58, 237, 0.08)"
        class="animate-shape-2"
      />
      
      <!-- Círculo pequeño -->
      <circle
        cx="-1200"
        cy="810"
        r="180"
        fill="rgba(255, 255, 255, 0.05)"
        class="animate-shape-3"
      />
      
      <!-- Forma blob suave (path) -->
      <path
        d="M -600 300 Q -500 200 -400 250 Q -300 300 -400 400 Q -500 450 -600 400 Z"
        fill="rgba(139, 92, 246, 0.07)"
        class="animate-shape-4"
      />
    </svg>
  </div>
</template>

<script setup>
// Animación declarativa con CSS
</script>

<style scoped>
.hero-animation-nosotros {
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
  animation: slide-right 2.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.15s forwards;
}

.animate-shape-3 {
  animation: slide-right 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s forwards;
}

.animate-shape-4 {
  animation: slide-right 2.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.25s forwards;
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
  .animate-shape-4 {
    animation: none !important;
    transform: translateX(1920px);
  }
}
</style>
