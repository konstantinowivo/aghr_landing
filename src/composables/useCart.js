import { ref, computed } from 'vue'

const items = ref([])
const isOpen = ref(false)

try {
  const saved = localStorage.getItem('aghr-cart')
  if (saved) items.value = JSON.parse(saved)
} catch {}

const persist = () => {
  try { localStorage.setItem('aghr-cart', JSON.stringify(items.value)) } catch {}
}

export function useCart() {
  const totalItems = computed(() => items.value.length)
  const totalPrice = computed(() =>
    items.value.reduce((sum, i) => sum + Number(i.price || 0), 0)
  )

  const addItem = (service) => {
    if (!items.value.find(i => i.id === service.id)) {
      items.value = [...items.value, {
        id: service.id,
        title: service.title,
        price: Number(service.price || 0)
      }]
      persist()
    }
  }

  const removeItem = (id) => {
    items.value = items.value.filter(i => i.id !== id)
    persist()
  }

  const isInCart = (id) => items.value.some(i => i.id === id)

  const openCart = () => { isOpen.value = true }
  const closeCart = () => { isOpen.value = false }

  const clearCart = () => {
    items.value = []
    persist()
  }

  return { items, isOpen, totalItems, totalPrice, addItem, removeItem, isInCart, openCart, closeCart, clearCart }
}
