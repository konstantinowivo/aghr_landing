<template>
  <div class="jobboard-page">
    <!-- JobBoard Section (completo, sin límite) -->
    <JobBoard />

    <!-- Floating Buttons -->
    <FloatingButtons />
  </div>
</template>

<script setup>
import JobBoard from '../components/sections/Jobboard.vue'
import FloatingButtons from '@/components/layout/FloatingButtons.vue'
</script>

<style scoped>
.jobboard-page {
  width: 100%;
  min-height: calc(100vh - 80px);
}

/* Floating Buttons Configuration */
:deep(.floating-buttons) {
  position: fixed;
  bottom: 2.5rem;
  right: 2rem;
  z-index: 9999;
}

@media (max-width: 768px) {
  :deep(.floating-buttons) {
    bottom: 1.5rem;
    right: 1.5rem;
  }
}
</style>