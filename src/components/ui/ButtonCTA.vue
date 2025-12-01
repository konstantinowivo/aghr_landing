<template>
  <button 
    :class="buttonClasses"
    :disabled="disabled"
    :type="type"
    @click="handleClick"
  >
    <slot />
    <span v-if="arrow" class="arrow">→</span>
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'gradient',
    validator: (value) => ['gradient', 'accent', 'solid'].includes(value)
  },
  size: {
    type: String,
    default: 'lg',
    validator: (value) => ['md', 'lg', 'xl'].includes(value)
  },
  arrow: {
    type: Boolean,
    default: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'button'
  }
})

const emit = defineEmits(['click'])

const buttonClasses = computed(() => {
  return [
    'btn-cta',
    `btn-cta--${props.variant}`,
    `btn-cta--${props.size}`,
    {
      'btn-cta--disabled': props.disabled
    }
  ]
})

const handleClick = (event) => {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>

<style scoped>
.btn-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-md);
  font-weight: var(--font-weight-semibold);
  border-radius: var(--radius-lg);
  transition: all var(--transition-base);
  cursor: pointer;
  border: none;
  box-shadow: var(--shadow-md);
  position: relative;
  overflow: hidden;
}

.btn-cta::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(-100%);
  transition: transform var(--transition-base);
}

.btn-cta:hover:not(.btn-cta--disabled)::before {
  transform: translateX(0);
}

/* Variantes */
.btn-cta--gradient {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%);
  color: var(--text-white);
}

.btn-cta--gradient:hover:not(.btn-cta--disabled) {
  box-shadow: var(--shadow-xl);
  transform: translateY(-2px);
}

.btn-cta--accent {
  background-color: var(--accent-color);
  color: var(--text-white);
}

.btn-cta--accent:hover:not(.btn-cta--disabled) {
  background-color: var(--accent-hover);
  box-shadow: var(--shadow-xl);
  transform: translateY(-2px);
}

.btn-cta--solid {
  background-color: var(--primary-color);
  color: var(--text-white);
}

.btn-cta--solid:hover:not(.btn-cta--disabled) {
  background-color: var(--primary-hover);
  box-shadow: var(--shadow-xl);
  transform: translateY(-2px);
}

/* Tamaños */
.btn-cta--md {
  padding: var(--space-md) var(--space-2xl);
  font-size: var(--font-size-base);
}

.btn-cta--lg {
  padding: var(--space-lg) var(--space-3xl);
  font-size: var(--font-size-lg);
}

.btn-cta--xl {
  padding: var(--space-xl) var(--space-3xl);
  font-size: var(--font-size-xl);
}

/* Arrow */
.arrow {
  font-size: 1.2em;
  transition: transform var(--transition-base);
}

.btn-cta:hover:not(.btn-cta--disabled) .arrow {
  transform: translateX(4px);
}

/* Estado disabled */
.btn-cta--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-cta--disabled:hover {
  transform: none;
}
</style>