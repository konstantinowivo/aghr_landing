<template>
  <div class="floating-buttons">
    <!-- Scroll to top -->
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

    <!-- WhatsApp CTA -->
    <a
      href="https://wa.me/5493517654321?text=Hola%20AGHR,%20me%20interesa%20conocer%20más%20sobre%20sus%20servicios"
      target="_blank"
      rel="noopener noreferrer"
      class="floating-btn floating-btn--whatsapp"
      aria-label="Contactar por WhatsApp"
      title="Contactar por WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="28"
        height="28"
        fill="#fff"
      >
        <path
          d="M16.001 3C9.373 3 4 8.373 4 15.001c0 2.646.86 5.1 2.315 7.08L4 29l7.106-2.246a11.94 11.94 0 004.895 1.04C22.628 27.794 28 22.422 28 15.794 28 9.166 22.628 3.794 16.001 3zm6.755 17.174c-.28.79-1.64 1.54-2.253 1.626-.578.085-1.29.12-2.08-.13-.48-.15-1.1-.36-1.9-.7-3.35-1.445-5.53-4.97-5.7-5.21-.17-.24-1.37-1.82-1.37-3.47 0-1.65.87-2.46 1.18-2.8.31-.34.68-.43.91-.43.23 0 .46 0 .66.01.21.01.5-.08.78.6.28.69.95 2.37 1.03 2.54.08.17.13.38.02.6-.11.23-.17.37-.34.57-.17.2-.36.45-.51.6-.17.17-.35.36-.15.7.2.35.9 1.48 1.93 2.4 1.33 1.18 2.45 1.55 2.8 1.72.35.17.56.15.77-.09.21-.24.89-1.04 1.13-1.4.24-.36.48-.3.8-.18.32.12 2.01.95 2.36 1.12.35.17.58.26.66.4.08.15.08.86-.2 1.65z"
        />
      </svg>
    </a>
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
/* Layout */
.floating-buttons {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 999;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  align-items: center; /* 🔑 alineación perfecta en eje Y */
}

/* Base */
.floating-btn {
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: #fff;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

/* Scroll to top (secundario) */
.floating-btn--scroll-top {
  width: 48px;
  height: 48px;
  background-color: #2d3748;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
}

.floating-btn--scroll-top:hover {
  background-color: #1a202c;
  transform: translateY(-2px);
}

/* WhatsApp CTA (principal) */
.floating-btn--whatsapp {
  width: 62px;
  height: 62px;
  background-color: #25d366;
  box-shadow:
    0 0 0 4px rgba(37, 211, 102, 0.25),
    0 0 14px rgba(37, 211, 102, 0.6),
    0 6px 14px rgba(0, 0, 0, 0.35);
}

.floating-btn--whatsapp:hover {
  background-color: #1ebe5d;
  transform: scale(1.05);
  box-shadow:
    0 0 0 4px rgba(37, 211, 102, 0.35),
    0 0 20px rgba(37, 211, 102, 0.85),
    0 8px 18px rgba(0, 0, 0, 0.4);
}

/* Responsive */
@media (max-width: 480px) {
  .floating-buttons {
    bottom: 1rem;
    right: 1rem;
    gap: 0.75rem;
  }

  .floating-btn--whatsapp {
    width: 58px;
    height: 58px;
  }

  .floating-btn--scroll-top {
    width: 44px;
    height: 44px;
  }
}
</style>
