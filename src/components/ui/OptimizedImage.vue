<template>
  <div class="optimized-image-wrapper" :style="wrapperStyle">
    <!-- Skeleton mientras carga -->
    <ImageSkeleton
      v-if="!isLoaded && showSkeleton"
      :width="width ? width + 'px' : '100%'"
      :height="height ? height + 'px' : '100%'"
      :aspectRatio="aspectRatio"
    />

    <!-- Imagen con transición suave -->
    <img
      v-show="isLoaded || !showSkeleton"
      :src="src"
      :alt="alt"
      :width="width"
      :height="height"
      :class="[imgClass, { 'image-loaded': isLoaded }]"
      :loading="eager ? 'eager' : 'lazy'"
      :decoding="eager ? 'sync' : 'async'"
      :fetchpriority="eager ? 'high' : 'auto'"
      @load="handleLoad"
      @error="handleError"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ImageSkeleton from './ImageSkeleton.vue'

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
  },
  showSkeleton: {
    type: Boolean,
    default: true
  },
  aspectRatio: {
    type: String,
    default: undefined
  }
})

const emit = defineEmits(['load', 'error'])
const isLoaded = ref(false)

const wrapperStyle = computed(() => {
  const style = {}
  if (props.width) {
    style.width = typeof props.width === 'number' ? `${props.width}px` : props.width
  }
  if (props.height) {
    style.height = typeof props.height === 'number' ? `${props.height}px` : props.height
  }
  if (props.aspectRatio) {
    style.aspectRatio = props.aspectRatio
  }
  return style
})

const handleLoad = (event) => {
  isLoaded.value = true
  emit('load', event)
}

const handleError = (event) => {
  isLoaded.value = false
  emit('error', event)
}
</script>

<style scoped>
.optimized-image-wrapper {
  position: relative;
  display: inline-block;
  overflow: hidden;
}

.optimized-image-wrapper img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.4s ease-in-out;
}

.optimized-image-wrapper img.image-loaded {
  opacity: 1;
}
</style>
