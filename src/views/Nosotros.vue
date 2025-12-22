<template>
  <div class="nosotros-page">
    <!-- Componente AboutUs -->
    <AboutUs />

    <!-- Floating Buttons (WhatsApp sticky) -->
    <FloatingButtons />
  </div>
</template>

<script setup>
import AboutUs from '../components/sections/AboutUs.vue'
import FloatingButtons from '@/components/layout/FloatingButtons.vue'
</script>

<style scoped>
.nosotros-page {
  width: 100%;
  min-height: calc(100vh - 80px);
}
</style>
