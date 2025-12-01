<template>
  <button 
    :class="buttonClasses"
    :disabled="disabled"
    :type="type"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'outline'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
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
    'btn',
    `btn--${props.variant}`,
    `btn--${props.size}`,
    {
      'btn--disabled': props.disabled
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
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  font-weight: var(--font-weight-medium);
  border-radius: var(--radius-md);
  transition: all var(--transition-base);
  cursor: pointer;
  border: 1px solid transparent;
  white-space: nowrap;
}

/* Variantes */
.btn--primary {
  background-color: var(--primary-color);
  color: var(--text-white);
}

.btn--primary:hover:not(.btn--disabled) {
  background-color: var(--primary-hover);
}

.btn--secondary {
  background-color: var(--secondary-color);
  color: var(--text-white);
}

.btn--secondary:hover:not(.btn--disabled) {
  background-color: var(--secondary-hover);
}

.btn--outline {
  background-color: transparent;
  color: var(--primary-color);
  border-color: var(--primary-color);
}

.btn--outline:hover:not(.btn--disabled) {
  background-color: var(--primary-light);
}

/* Tamaños */
.btn--sm {
  padding: var(--space-sm) var(--space-md);
  font-size: var(--font-size-sm);
}

.btn--md {
  padding: var(--space-md) var(--space-xl);
  font-size: var(--font-size-base);
}

.btn--lg {
  padding: var(--space-lg) var(--space-2xl);
  font-size: var(--font-size-lg);
}

/* Estado disabled */
.btn--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>