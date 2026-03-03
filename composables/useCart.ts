import { ref, computed } from 'vue'
import type { Book } from '~/data/books'

export interface CartItem {
  book: Book
  quantity: number
}

const cartItems = ref<CartItem[]>([])

export function useCart() {
  const totalItems = computed(() =>
    cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  const totalPrice = computed(() =>
    cartItems.value.reduce((sum, item) => sum + item.book.price * item.quantity, 0)
  )

  function addToCart(book: Book) {
    const existing = cartItems.value.find(item => item.book.id === book.id)
    if (existing) {
      existing.quantity++
    } else {
      cartItems.value.push({ book, quantity: 1 })
    }
  }

  function removeFromCart(bookId: string) {
    cartItems.value = cartItems.value.filter(item => item.book.id !== bookId)
  }

  function updateQuantity(bookId: string, quantity: number) {
    if (quantity < 1) {
      removeFromCart(bookId)
      return
    }
    const item = cartItems.value.find(item => item.book.id === bookId)
    if (item) item.quantity = quantity
  }

  function clearCart() {
    cartItems.value = []
  }

  function isInCart(bookId: string) {
    return cartItems.value.some(item => item.book.id === bookId)
  }

  return {
    cartItems,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart
  }
}
