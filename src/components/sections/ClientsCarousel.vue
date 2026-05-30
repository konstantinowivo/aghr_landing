<template>
  <section class="clients-carousel">
    <div class="container">
      <div class="carousel-header">
        <h3 class="carousel-title">Empresas que Confían en Nosotros</h3>
        <p class="carousel-subtitle">Trabajamos con líderes de la industria</p>
      </div>

      <div v-if="clients.length > 0" class="carousel-wrapper">
        <div class="carousel-track" ref="track">
          <!-- Primera iteración de logos -->
          <div v-for="client in clients" :key="`logo-${client.id}`" class="logo-item">
            <img
              :src="client.logo_url"
              :alt="client.name"
              class="logo-image"
              loading="lazy"
            />
          </div>
          <!-- Duplicado para loop infinito -->
          <div v-for="client in clients" :key="`logo-duplicate-${client.id}`" class="logo-item">
            <img
              :src="client.logo_url"
              :alt="client.name"
              class="logo-image"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { clientsService } from "@/services/clientsService";

const clients = ref([]);

onMounted(async () => {
  try {
    clients.value = await clientsService.getAll();
  } catch (err) {
    console.error("Error cargando clientes:", err);
  }
});
</script>

<style scoped>
.clients-carousel {
  background: linear-gradient(180deg, #fafbfc 0%, #ffffff 100%);
  padding: 3rem 0 6rem 0;
  overflow: hidden;
  animation: fadeInUp 0.8s ease-out 0.6s both;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.carousel-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.carousel-title {
  font-family: "Garamond", serif;
  font-size: clamp(2.7rem, 5vw, 3.6rem);
  font-weight: bold;
  color: var(--color-text-primary);
  margin-bottom: 0.75rem;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.carousel-subtitle {
  font-family: var(--font-family-primary);
  font-size: clamp(1.125rem, 2.4vw, 1.25rem);
  color: var(--color-text-secondary);
  font-weight: 500;
  line-height: 1.6;
}

.carousel-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: 2rem 0;

  /* Gradientes de fade en los bordes */
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 10%,
    black 90%,
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 10%,
    black 90%,
    transparent 100%
  );
}

.carousel-track {
  display: flex;
  gap: 4rem;
  animation: scroll 40s linear infinite;
  width: fit-content;
}

.carousel-track:hover {
  animation-play-state: paused;
}

.logo-item {
  flex-shrink: 0;
  width: 230px;
  height: 138px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  transition: all 0.3s ease;
}

.logo-item:hover {
  transform: scale(1.1);
}

.logo-image {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  transition: all 0.3s ease;
}

.logo-item:hover .logo-image {
  filter: brightness(1.05);
}

/* Animación de scroll infinito */
@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

/* Animación de entrada */
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
@media (max-width: 968px) {
  .clients-carousel {
    padding: 2.5rem 0 4rem 0;
  }

  .carousel-header {
    margin-bottom: 2rem;
  }

  .carousel-track {
    gap: 3rem;
  }

  .logo-item {
    width: 207px;
    height: 127px;
    padding: 1.25rem;
  }
}

@media (max-width: 768px) {
  .clients-carousel {
    padding: 2rem 0 3rem 0;
  }

  .carousel-header {
    margin-bottom: 1.5rem;
  }

  .carousel-track {
    gap: 2.5rem;
    animation: scroll 30s linear infinite;
  }

  .logo-item {
    width: 184px;
    height: 115px;
    padding: 1rem;
  }
}

@media (max-width: 640px) {
  .container {
    padding: 0 1.25rem;
  }

  .carousel-wrapper {
    padding: 1.5rem 0;
  }

  .carousel-track {
    gap: 2rem;
  }

  .logo-item {
    width: 161px;
    height: 104px;
    padding: 0.875rem;
  }
}

@media (max-width: 480px) {
  .clients-carousel {
    padding: 2.5rem 0;
  }

  .carousel-title {
    font-size: 2rem;
  }

  .carousel-subtitle {
    font-size: 0.9375rem;
  }

  .carousel-track {
    gap: 1.5rem;
    animation: scroll 25s linear infinite;
  }

  .logo-item {
    width: 138px;
    height: 92px;
    padding: 0.75rem;
  }
}
</style>
