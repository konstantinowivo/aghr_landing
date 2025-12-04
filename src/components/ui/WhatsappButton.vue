<template>
  <a
    :href="whatsappUrl"
    target="_blank"
    rel="noopener noreferrer"
    class="whatsapp-button"
    :class="{ 'whatsapp-button--visible': isVisible }"
    :aria-label="ariaLabel"
  >
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="28" 
      height="28" 
      viewBox="0 0 24 24" 
      fill="currentColor"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
    
    <span v-if="showTooltip" class="whatsapp-tooltip">
      {{ tooltipText }}
    </span>
  </a>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  phoneNumber: {
    type: String,
    required: true,
    // Formato: '5493512345678' (código de país + código de área + número)
  },
  message: {
    type: String,
    default: '¡Hola! Me gustaría obtener más información sobre sus servicios.'
  },
  showTooltip: {
    type: Boolean,
    default: true
  },
  tooltipText: {
    type: String,
    default: '¿Necesitás ayuda?'
  },
  showAfterScroll: {
    type: Number,
    default: 300 // Mostrar después de 300px de scroll
  }
});

const isVisible = ref(false);

const whatsappUrl = computed(() => {
  const encodedMessage = encodeURIComponent(props.message);
  return `https://wa.me/${props.phoneNumber}?text=${encodedMessage}`;
});

const ariaLabel = computed(() => {
  return `Contactar por WhatsApp: ${props.phoneNumber}`;
});

const handleScroll = () => {
  isVisible.value = window.scrollY > props.showAfterScroll;
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
.whatsapp-button {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 60px;
  height: 60px;
  background: #25d366;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
  transition: all 0.3s ease;
  z-index: 999;
  opacity: 0;
  transform: translateY(20px) scale(0.8);
  pointer-events: none;
}

.whatsapp-button--visible {
  opacity: 1;
  transform: translateY(0) scale(1);
  pointer-events: all;
}

.whatsapp-button:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 30px rgba(37, 211, 102, 0.5);
}

.whatsapp-button:active {
  transform: scale(0.95);
}

/* Animación de pulso */
.whatsapp-button::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #25d366;
  animation: pulse 2s infinite;
  z-index: -1;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.3);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}

/* Tooltip */
.whatsapp-tooltip {
  position: absolute;
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin-right: 1rem;
  padding: 0.75rem 1.25rem;
  background: white;
  color: #2d3748;
  font-size: 0.875rem;
  font-weight: 600;
  white-space: nowrap;
  border-radius: 0.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.whatsapp-tooltip::after {
  content: '';
  position: absolute;
  right: -8px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 6px 0 6px 8px;
  border-color: transparent transparent transparent white;
}

.whatsapp-button:hover .whatsapp-tooltip {
  opacity: 1;
  transform: translateY(-50%) translateX(-5px);
}

/* Responsive */
@media (max-width: 768px) {
  .whatsapp-button {
    bottom: 1.5rem;
    right: 1.5rem;
    width: 55px;
    height: 55px;
  }

  .whatsapp-tooltip {
    display: none; /* Ocultar tooltip en mobile */
  }
}
</style>