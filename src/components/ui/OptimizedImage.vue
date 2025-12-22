<template>
  <img
    :src="src"
    :alt="alt"
    :width="width"
    :height="height"
    :class="imgClass"
    :loading="eager ? 'eager' : 'lazy'"
    :decoding="eager ? 'sync' : 'async'"
    :fetchpriority="eager ? 'high' : 'auto'"
    @load="handleLoad"
    @error="handleError"
  />
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: ''
  },
  width: {
    type: [String, Number],
    default: undefined
  },
  height: {
    type: [String, Number],
    default: undefined
  },
  imgClass: {
    type: String,
    default: ''
  },
  eager: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['load', 'error'])

const handleLoad = (event) => {
  emit('load', event)
}

const handleError = (event) => {
  emit('error', event)
}
</script>
