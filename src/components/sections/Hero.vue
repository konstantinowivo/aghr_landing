<template>
  <section :class="heroClasses" :style="heroStyles">
    <div v-if="overlay" class="hero-overlay"></div>
    
    <div class="container">
      <div class="hero-content">
        <!-- Pretitle -->
        <p v-if="pretitle" class="hero-pretitle">
          {{ pretitle }}
        </p>

        <!-- Title -->
        <h1 class="hero-title">
          <slot name="title">{{ title }}</slot>
        </h1>

        <!-- Subtitle -->
        <p v-if="subtitle" class="hero-subtitle">
          {{ subtitle }}
        </p>

        <!-- Actions -->
        <div class="hero-actions">
          <slot name="actions"></slot>
        </div>
      </div>

      <!-- Optional media -->
      <div v-if="$slots.media" class="hero-media">
        <slot name="media"></slot>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Bienvenido a tu aplicación'
  },
  subtitle: {
    type: String,
    default: ''
  },
  pretitle: {
    type: String,
    default: ''
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'gradient', 'dark'].includes(value)
  },
  backgroundImage: {
    type: String,
    default: ''
  },
  overlay: {
    type: Boolean,
    default: false
  },
  fullHeight: {
    type: Boolean,
    default: true
  }
})

const heroClasses = computed(() => {
  return [
    'hero',
    `hero--${props.variant}`,
    {
      'hero--full-height': props.fullHeight
    }
  ]
})

const heroStyles = computed(() => {
  const styles = {}
  
  if (props.backgroundImage) {
    styles.backgroundImage = `url(${props.backgroundImage})`
  }
  
  return styles
})
</script>

<style scoped>
.hero {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-3xl) 0;
  background-size: cover;
  background-position: center;
  overflow: hidden;
}

.hero--full-height {
  min-height: calc(100vh - var(--navbar-height));
}

/* Variants */
.hero--default {
  background-color: var(--bg-primary);
}

.hero--gradient {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%);
  color: var(--text-white);
}

.hero--dark {
  background-color: var(--bg-dark);
  color: var(--text-white);
}

/* Overlay */
.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

/* Container */
.hero .container {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: var(--space-3xl);
}

/* Content */
.hero-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--space-lg);
}

.hero-pretitle {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--primary-color);
  margin: 0;
}

.hero--gradient .hero-pretitle,
.hero--dark .hero-pretitle {
  color: var(--primary-light);
}

.hero-title {
  font-size: var(--font-size-5xl);
  font-weight: var(--font-weight-bold);
  line-height: 1.2;
  margin: 0;
  max-width: 50rem;
}

.hero--gradient .hero-title,
.hero--dark .hero-title {
  color: var(--text-white);
}

.hero-subtitle {
  font-size: var(--font-size-xl);
  line-height: 1.6;
  color: var(--text-secondary);
  margin: 0;
  max-width: 42rem;
}

.hero--gradient .hero-subtitle,
.hero--dark .hero-subtitle {
  color: rgba(255, 255, 255, 0.9);
}

.hero-actions {
  display: flex;
  gap: var(--space-md);
  margin-top: var(--space-lg);
  flex-wrap: wrap;
  justify-content: center;
}

/* Media */
.hero-media {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-media img {
  max-width: 100%;
  height: auto;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xl);
}

/* Responsive */
@media (max-width: 768px) {
  .hero .container {
    flex-direction: column;
    text-align: center;
  }
  
  .hero-title {
    font-size: var(--font-size-3xl);
  }
  
  .hero-subtitle {
    font-size: var(--font-size-lg);
  }
  
  .hero-media {
    max-width: 100%;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: var(--font-size-2xl);
  }
  
  .hero-subtitle {
    font-size: var(--font-size-base);
  }
}
</style>