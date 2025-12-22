<template>
  <div class="servicios-page">
    <!-- Componente TargetAudience -->
    <TargetAudience />

    <!-- Floating Buttons (WhatsApp sticky) -->
    <FloatingButtons />
  </div>
</template>

<script setup>
import TargetAudience from '../components/sections/TargetAudience.vue'
import FloatingButtons from '@/components/layout/FloatingButtons.vue'
</script>

<style scoped>
.servicios-page {
  width: 100%;
  min-height: calc(100vh - 80px);
}
</style>
