<template>
  <div class="service-card" :class="`card-${color}`">
    <div class="card-header">
      <div class="icon-wrapper">
        <slot name="icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="m9 12 2 2 4-4"/>
          </svg>
        </slot>
      </div>    
      <h3 class="card-title">{{ title }}</h3>
    </div>
    
    <p class="card-description">{{ description }}</p>
    
    <ul v-if="features && features.length" class="card-features">
      <li v-for="(feature, index) in features" :key="index">
        <span class="feature-dot"></span>
        {{ feature }}
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  features: {
    type: Array,
    default: () => []
  },
  color: {
    type: String,
    default: 'green',
    validator: (value) => ['red', 'orange', 'yellow', 'green', 'cyan', 'purple'].includes(value)
  }
})
</script>

<style scoped>
/* Paleta de colores */
:root {
  --vibrant-red: #E40303;
  --vibrant-orange: #FF8C00;
  --vibrant-yellow: #FFED00;
  --vibrant-green: #008026;
  --vibrant-cyan: #24408E;
  --vibrant-purple: #732982;
}

.service-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border-top: 3px solid var(--card-color);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.service-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: var(--card-color);
  transform: scaleX(1);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.service-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

.service-card:hover::before {
  transform: scaleX(1.05);
}

/* Variantes de color */
.card-red {
  --card-color: var(--vibrant-red);
}

.card-orange {
  --card-color: var(--vibrant-orange);
}

.card-yellow {
  --card-color: #d4b900; /* Amarillo más oscuro para mejor contraste */
}

.card-green {
  --card-color: var(--vibrant-green);
}

.card-cyan {
  --card-color: var(--vibrant-cyan);
}

.card-purple {
  --card-color: var(--vibrant-purple);
}

/* Header */
.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  background: linear-gradient(135deg, var(--card-color)15, var(--card-color)05);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--card-color);
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.service-card:hover .icon-wrapper {
  background: linear-gradient(135deg, var(--card-color)25, var(--card-color)10);
  transform: scale(1.05);
}

.icon-wrapper svg {
  width: 24px;
  height: 24px;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
}

/* Description */
.card-description {
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

/* Features list */
.card-features {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.card-features li {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  color: #4a5568;
  font-size: 0.9rem;
  line-height: 1.5;
}

.feature-dot {
  width: 6px;
  height: 6px;
  background: var(--card-color);
  border-radius: 50%;
  margin-top: 0.5rem;
  flex-shrink: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .service-card {
    padding: 1.5rem;
  }
  
  .card-title {
    font-size: 1.1rem;
  }
}
</style>