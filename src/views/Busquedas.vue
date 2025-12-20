<template>
  <div class="busquedas-page">
    <!-- Componente Jobboard -->
    <Jobboard />
  </div>
</template>

<script setup>
import Jobboard from '../components/sections/Jobboard.vue'
</script>

<style scoped>
.busquedas-page {
  width: 100%;
  min-height: calc(100vh - 80px);
}
</style>
