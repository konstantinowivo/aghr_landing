<template>
  <button
    v-if="isVisible"
    @click="scrollToTop"
    class="scroll-to-top"
    aria-label="Volver arriba"
  >
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      stroke-width="2" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    >
      <path d="m18 15-6-6-6 6"/>
    </svg>
  </button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  showAfterScroll: {
    type: Number,
    default: 500 // Mostrar después de 500px de scroll
  },
  scrollDuration: {
    type: Number,
    default: 600 // Duración de la animación en ms
  }
});

const isVisible = ref(false);

const handleScroll = () => {
  isVisible.value = window.scrollY > props.showAfterScroll;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  // Inicializar visibilidad
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.scroll-to-top {
  position: fixed;
  bottom: 2rem;
  right: 6rem; /* Espacio para el botón de WhatsApp */
  width: 50px;
  height: 50px;
  background: white;
  border: 2px solid #667eea;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #667eea;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  z-index: 998;
  animation: fadeInUp 0.3s ease;
}

.scroll-to-top:hover {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 6px 25px rgba(102, 126, 234, 0.3);
}

.scroll-to-top:active {
  transform: translateY(-1px);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .scroll-to-top {
    bottom: 1.5rem;
    right: 5rem; /* Ajustar para mobile */
    width: 45px;
    height: 45px;
  }
}
</style>