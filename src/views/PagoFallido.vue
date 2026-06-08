<template>
  <div class="result-page">
    <div class="result-card">
      <div class="result-icon result-icon--error">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
      <h1 class="result-title">Pago no completado</h1>
      <p class="result-subtitle">Hubo un problema al procesar tu pago. Podés intentarlo nuevamente o contactarnos si el problema persiste.</p>
      <div class="result-actions">
        <router-link to="/servicios" class="result-btn result-btn--primary">Volver a servicios</router-link>
        <router-link to="/contacto" class="result-btn result-btn--secondary">Contactarnos</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.result-page {
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(180deg, #F9FAFB 0%, #FFFFFF 100%);
}

.result-card {
  background: white;
  border-radius: 1.5rem;
  padding: 3rem 2.5rem;
  max-width: 480px;
  width: 100%;
  text-align: center;
  box-shadow: 0 8px 40px rgba(0,0,0,0.08);
  border: 1px solid #F3F4F6;
}

.result-icon {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
}

.result-icon--error {
  background: #FEE2E2;
  color: #EF4444;
}

.result-icon svg {
  width: 40px;
  height: 40px;
}

.result-title {
  font-family: 'Garamond', serif;
  font-size: 2rem;
  font-weight: bold;
  color: var(--color-text-primary);
  margin-bottom: 0.875rem;
  letter-spacing: -0.02em;
}

.result-subtitle {
  font-family: var(--font-family-primary);
  font-size: 1.05rem;
  color: var(--color-text-secondary);
  line-height: 1.65;
  margin-bottom: 2rem;
}

.result-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.result-btn {
  display: inline-block;
  padding: 0.875rem 1.75rem;
  border-radius: 0.75rem;
  text-decoration: none;
  font-family: var(--font-family-primary);
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.2s ease;
}

.result-btn--primary {
  background: var(--color-primary);
  color: white;
}

.result-btn--primary:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

.result-btn--secondary {
  background: transparent;
  border: 1.5px solid var(--color-primary);
  color: var(--color-primary);
}

.result-btn--secondary:hover {
  background: var(--color-primary);
  color: white;
}
</style>
