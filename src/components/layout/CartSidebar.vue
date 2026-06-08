<template>
  <teleport to="body">
    <transition name="overlay-fade">
      <div v-if="isOpen" class="cart-overlay" @click="closeCart" />
    </transition>

    <transition name="cart-slide">
      <aside v-if="isOpen" class="cart-sidebar">
        <!-- Header -->
        <div class="cart-header">
          <h2 class="cart-title">Tu carrito</h2>
          <button class="cart-close" @click="closeCart" aria-label="Cerrar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12" stroke-linecap="round" />
            </svg>
          </button>
        </div>

        <!-- Items -->
        <div class="cart-body">
          <div v-if="items.length === 0" class="cart-empty">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="empty-icon">
              <path d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <p>Tu carrito está vacío</p>
            <button class="btn-explore" @click="closeCart">Ver servicios</button>
          </div>

          <ul v-else class="cart-items">
            <li v-for="item in items" :key="item.id" class="cart-item">
              <div class="item-info">
                <span class="item-title">{{ item.title }}</span>
                <span class="item-price">{{ formatPrice(item.price) }}</span>
              </div>
              <button class="item-remove" @click="removeItem(item.id)" aria-label="Eliminar">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 6L6 18M6 6l12 12" stroke-linecap="round" />
                </svg>
              </button>
            </li>
          </ul>
        </div>

        <!-- Footer -->
        <div v-if="items.length > 0" class="cart-footer">
          <div class="cart-total">
            <span class="total-label">Total</span>
            <span class="total-amount">{{ formatPrice(totalPrice) }}</span>
          </div>
          <button
            class="btn-checkout"
            :disabled="checkingOut"
            @click="handleCheckout"
          >
            <span v-if="checkingOut">Redirigiendo...</span>
            <span v-else>Pagar con MercadoPago</span>
          </button>
          <p v-if="checkoutError" class="checkout-error">{{ checkoutError }}</p>
        </div>
      </aside>
    </transition>
  </teleport>
</template>

<script setup>
import { ref } from 'vue'
import { useCart } from '@/composables/useCart'

const { items, isOpen, totalPrice, removeItem, closeCart, clearCart } = useCart()

const checkingOut = ref(false)
const checkoutError = ref('')

const formatPrice = (price) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(price)

const handleCheckout = async () => {
  checkingOut.value = true
  checkoutError.value = ''
  try {
    const res = await fetch('/api/create-preference', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: items.value })
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Error al procesar el pago')
    clearCart()
    closeCart()
    window.location.href = data.init_point
  } catch (err) {
    checkoutError.value = err.message
  } finally {
    checkingOut.value = false
  }
}
</script>

<style scoped>
.cart-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 1100;
}

.cart-sidebar {
  position: fixed;
  top: 0;
  right: 0;
  height: 100dvh;
  width: 400px;
  max-width: 100vw;
  background: white;
  z-index: 1101;
  display: flex;
  flex-direction: column;
  box-shadow: -4px 0 32px rgba(0, 0, 0, 0.12);
}

/* Header */
.cart-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 1.75rem;
  border-bottom: 1px solid #F3F4F6;
  flex-shrink: 0;
}

.cart-title {
  font-family: 'Garamond', serif;
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-text-primary);
  letter-spacing: -0.02em;
}

.cart-close {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #F3F4F6;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.2s ease;
  color: var(--color-text-secondary);
}

.cart-close:hover {
  background: #E5E7EB;
}

.cart-close svg {
  width: 16px;
  height: 16px;
}

/* Body */
.cart-body {
  flex: 1;
  overflow-y: auto;
  padding: 1.25rem 1.75rem;
}

/* Empty state */
.cart-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 1rem;
  color: var(--color-text-secondary);
  text-align: center;
  padding: 3rem 0;
}

.empty-icon {
  width: 56px;
  height: 56px;
  opacity: 0.35;
}

.cart-empty p {
  font-family: var(--font-family-primary);
  font-size: 1rem;
}

.btn-explore {
  font-family: var(--font-family-primary);
  padding: 0.625rem 1.5rem;
  background: transparent;
  border: 1.5px solid var(--color-primary);
  color: var(--color-primary);
  border-radius: 0.625rem;
  cursor: pointer;
  font-size: 0.9375rem;
  font-weight: 600;
  transition: all 0.2s ease;
}

.btn-explore:hover {
  background: var(--color-primary);
  color: white;
}

/* Items */
.cart-items {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: #F9FAFB;
  border-radius: 0.875rem;
  border: 1px solid #F3F4F6;
}

.item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.item-title {
  font-family: var(--font-family-primary);
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-text-primary);
  line-height: 1.3;
}

.item-price {
  font-family: var(--font-family-primary);
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--color-primary);
}

.item-remove {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #9CA3AF;
  border-radius: 50%;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.item-remove:hover {
  background: #FEE2E2;
  color: #EF4444;
}

.item-remove svg {
  width: 14px;
  height: 14px;
}

/* Footer */
.cart-footer {
  padding: 1.5rem 1.75rem;
  border-top: 1px solid #F3F4F6;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex-shrink: 0;
}

.cart-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.total-label {
  font-family: var(--font-family-primary);
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-text-secondary);
}

.total-amount {
  font-family: 'Garamond', serif;
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-text-primary);
  letter-spacing: -0.02em;
}

.btn-checkout {
  width: 100%;
  padding: 1rem;
  font-family: var(--font-family-primary);
  font-size: 1rem;
  font-weight: 700;
  background: #009EE3;
  color: white;
  border: none;
  border-radius: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  letter-spacing: 0.01em;
}

.btn-checkout:hover:not(:disabled) {
  background: #0082BB;
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(0, 158, 227, 0.35);
}

.btn-checkout:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.checkout-error {
  font-family: var(--font-family-primary);
  font-size: 0.875rem;
  color: #EF4444;
  text-align: center;
}

/* Transitions */
.overlay-fade-enter-active,
.overlay-fade-leave-active {
  transition: opacity 0.3s ease;
}
.overlay-fade-enter-from,
.overlay-fade-leave-to {
  opacity: 0;
}

.cart-slide-enter-active,
.cart-slide-leave-active {
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}
.cart-slide-enter-from,
.cart-slide-leave-to {
  transform: translateX(100%);
}

@media (max-width: 480px) {
  .cart-sidebar {
    width: 100vw;
  }

  .cart-header,
  .cart-body,
  .cart-footer {
    padding-left: 1.25rem;
    padding-right: 1.25rem;
  }
}
</style>
