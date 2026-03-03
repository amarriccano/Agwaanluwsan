<template>
  <div>
    <div class="page-header">
      <h1>Books</h1>
      <p>All published monographs, edited volumes, and primary source collections.</p>
    </div>

    <div v-if="notification" class="alert-success" style="max-width:1200px;margin:1.5rem auto;padding:1rem 2rem;">
      ✓ {{ notification }}
    </div>

    <div v-if="loading" style="text-align:center;padding:5rem;color:var(--text-light);">
      Loading books…
    </div>

    <div v-else-if="error" class="alert-error" style="max-width:900px;margin:3rem auto;">
      Could not load books from server. Please try again later.
    </div>

    <div v-else class="books-grid">
      <div v-for="book in books" :key="book._id" class="book-card">
        <div class="book-cover" :style="{ background: book.coverGradient || 'linear-gradient(135deg,#162447,#4a148c)' }">
          <span class="book-cover-title">{{ book.title }}</span>
        </div>
        <div class="book-info">
          <span class="book-year">{{ book.year }} · {{ book.category }}</span>
          <h3 class="book-title">{{ book.title }}</h3>
          <p class="book-subtitle">{{ book.subtitle }}</p>
          <p style="font-size:0.82rem;color:var(--text-light);margin-bottom:0.5rem;">
            {{ book.publisher }}<br />
            {{ book.pages }} pp. · {{ book.language }}<br />
            ISBN {{ book.isbn }}
          </p>
          <p class="book-price">{{ formatPrice(book.price) }}</p>
          <div class="book-actions">
            <button class="btn btn-sm" @click="addBook(book)" :disabled="isInCart(book._id)">
              {{ isInCart(book._id) ? '✓ In Cart' : 'Add to Cart' }}
            </button>
            <button v-if="isInCart(book._id)" class="btn-outline btn-sm" @click="$router.push('/books/cart')">
              View Cart
            </button>
          </div>
        </div>
      </div>
    </div>

    <div style="text-align:center;padding:3rem 5%;background:var(--background);border-top:1px solid var(--border);">
      <p style="color:var(--text-light);font-size:0.9rem;margin-bottom:1.5rem;">
        Orders are fulfilled locally by Dr. Batsaikhan Ookhnoi. No online payment required.<br />
        Payment is arranged upon delivery or pickup in Ulaanbaatar.
      </p>
      <NuxtLink to="/books/cart" class="btn">🛒 View Cart ({{ totalItems }})</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Books — Batsaikhan Ookhnoi' })

const api = useApi()
const { addToCart, isInCart, totalItems } = useCart()

const books = ref<any[]>([])
const loading = ref(true)
const error = ref(false)
const notification = ref('')

onMounted(async () => {
  try {
    books.value = await api.get<any[]>('/books')
  } catch (e) {
    error.value = true
  } finally {
    loading.value = false
  }
})

function formatPrice(price: number) {
  return price?.toLocaleString('mn-MN') + ' ₮'
}

function addBook(book: any) {
  // Adapt API book shape to cart (uses _id as id)
  addToCart({ ...book, id: book._id })
  notification.value = `"${book.title}" added to cart.`
  setTimeout(() => { notification.value = '' }, 3000)
}
</script>
