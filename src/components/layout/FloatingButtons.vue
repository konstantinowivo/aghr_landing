<template>
  <div class="floating-buttons">
    <Transition name="fade">
      <button
        v-show="showScrollButton"
        class="floating-btn floating-btn--scroll-top"
        @click="scrollToTop"
        aria-label="Subir al inicio"
        title="Ir al inicio"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>
    </Transition>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const showScrollButton = ref(false)

const handleScroll = () => {
  showScrollButton.value = window.scrollY > 300
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* Contenedor */
.floating-buttons {
  position: fixed;
  top: 88px;
  right: 2rem;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

/* Base de botones */
.floating-btn {
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: #fff;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* Botón Scroll */
.floating-btn--scroll-top {
  width: 45px;
  height: 45px;
  background-color: #2d3748;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.floating-btn--scroll-top:hover {
  background-color: #1a202c;
  transform: translateY(-5px);
}

/* Transición para el botón de scroll */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Responsive - Solo tamaños de botones */
@media (max-width: 768px) {
  .floating-buttons {
    top: 88px;
    right: 1.5rem;
    gap: 0.8rem;
  }

  .floating-btn--scroll-top {
    width: 40px;
    height: 40px;
  }
}
</style>