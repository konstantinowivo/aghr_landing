<template>
  <div class="busquedas-page">
    <!-- Componente Jobboard -->
    <Jobboard />

    <!-- Floating Buttons (WhatsApp sticky) -->
    <FloatingButtons />
  </div>
</template>

<script setup>
import Jobboard from '../components/sections/Jobboard.vue'
import FloatingButtons from '@/components/layout/FloatingButtons.vue'
</script>

<style scoped>
.busquedas-page {
  width: 100%;
  min-height: calc(100vh - 80px);
}
</style>
