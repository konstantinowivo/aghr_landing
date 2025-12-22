<template>
  <div class="progressive-image" :style="containerStyle">
    <!-- Placeholder blur mientras carga -->
    <div
      v-if="!isLoaded"
      class="progressive-image__placeholder"
      :style="placeholderStyle"
    >
      <ImageSkeleton
        v-if="showSkeleton"
        :width="width ? width + 'px' : '100%'"
        :height="height ? height + 'px' : '100%'"
        :aspect-ratio="aspectRatio"
      />
    </div>

    <!-- Imagen real con fade-in -->
    <picture v-show="isLoaded || !showSkeleton">
      <!-- WebP para navegadores modernos -->
      <source
        v-if="webpSrc"
        :srcset="webpSrc"
        type="image/webp"
      >

      <!-- Fallback a PNG/JPG -->
      <img
        :src="src"
        :alt="alt"
        :width="width"
        :height="height"
        :class="[imgClass, { 'progressive-image__img--loaded': isLoaded }]"
        :loading="eager ? 'eager' : 'lazy'"
        :decoding="eager ? 'sync' : 'async'"
        :fetchpriority="eager ? 'high' : 'auto'"
        @load="handleLoad"
        @error="handleError"
      >
    </picture>
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
  webpSrc: {
    type: String,
    default: null
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
  },
  placeholderColor: {
    type: String,
    default: '#f5f5f5'
  }
})

const emit = defineEmits(['load', 'error'])
const isLoaded = ref(false)

const containerStyle = computed(() => {
  const style = {
    position: 'relative',
    overflow: 'hidden'
  }

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

const placeholderStyle = computed(() => ({
  backgroundColor: props.placeholderColor
}))

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
.progressive-image {
  display: inline-block;
  background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
}

.progressive-image__placeholder {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.progressive-image picture {
  display: block;
  width: 100%;
  height: 100%;
}

.progressive-image img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.progressive-image__img--loaded {
  opacity: 1;
}
</style>
