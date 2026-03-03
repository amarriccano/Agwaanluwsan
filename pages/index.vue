<template>
  <div>
    <!-- HERO -->
    <section class="hero">
      <div class="hero-image">
        <img src="/portrait-placeholder.svg" alt="Dr. Batsaikhan Ookhnoi" />
      </div>
      <div class="hero-text">
        <h1>Scholar of the Mongolian State.</h1>
        <p>
          Doctor of Historical Sciences exploring the archives of 20th-century diplomacy
          and the restoration of national sovereignty.
        </p>
        <NuxtLink to="/books" class="btn">View Publications</NuxtLink>
      </div>
    </section>

    <!-- RECENT UPDATES -->
    <section class="page-section">
      <h2 class="section-title">Recent Updates</h2>
      <div class="cards-row">
        <div v-if="latestBook" class="media-card">
          <p class="media-card-tag">Book · {{ latestBook.year }}</p>
          <h3>{{ latestBook.title }}</h3>
          <p>{{ latestBook.publisher }}. Available now.</p>
          <br />
          <NuxtLink to="/books" class="btn-outline btn-sm">Order Book</NuxtLink>
        </div>
        <div v-for="item in latestContent" :key="item._id" class="media-card">
          <p class="media-card-tag">{{ capitalize(item.type) }} · {{ item.date }}</p>
          <h3>{{ item.title }}</h3>
          <p>{{ item.publication }}</p>
        </div>
      </div>
    </section>

    <!-- BOOKS PREVIEW -->
    <section class="page-section alt-bg">
      <h2 class="section-title">Selected Publications</h2>
      <div v-if="booksLoading" style="text-align:center;padding:3rem;color:var(--text-light);">Loading publications…</div>
      <div v-else class="cards-row" style="margin-top: 2rem;">
        <div v-for="book in featuredBooks" :key="book._id" class="book-preview-card">
          <div class="book-preview-cover" :style="{ background: book.coverGradient || 'linear-gradient(135deg,#162447,#4a148c)' }">
            <span class="book-cover-title">{{ book.title }}</span>
          </div>
          <div class="book-preview-info">
            <span class="book-year">{{ book.year }} · {{ book.category }}</span>
            <h3 class="book-title">{{ book.title }}</h3>
            <p class="book-subtitle">{{ book.publisher }}</p>
            <NuxtLink to="/books" class="btn-outline btn-sm" style="margin-top:0.5rem;">Details & Order</NuxtLink>
          </div>
        </div>
      </div>
      <div style="margin-top:3rem;">
        <NuxtLink to="/books" class="btn">All Publications</NuxtLink>
      </div>
    </section>

    <!-- MEDIA PREVIEW -->
    <section class="page-section" id="media">
      <h2 class="section-title">Latest Media & Talks</h2>
      <div class="cards-row" style="margin-top:2rem;">
        <div v-for="item in mediaItems" :key="item._id" class="media-card">
          <p class="media-card-tag">{{ capitalize(item.type) }} · {{ item.date }}</p>
          <h3>{{ item.title }}</h3>
          <p>{{ item.publication }}</p>
        </div>
      </div>
      <div style="margin-top:3rem;">
        <NuxtLink to="/media" class="btn-outline" style="margin-right:1rem;">All Media</NuxtLink>
        <NuxtLink to="/talks" class="btn-outline">All Talks</NuxtLink>
      </div>
    </section>

    <!-- ABOUT TEASER -->
    <section class="page-section alt-bg">
      <h2 class="section-title">About the Historian</h2>
      <div style="max-width:680px;margin:0 auto;text-align:left;">
        <p style="font-size:1rem;color:var(--text-light);line-height:1.8;margin-bottom:1.5rem;">
          Dr. Batsaikhan Ookhnoi is a Doctor of Historical Sciences and one of Mongolia's foremost
          authorities on the country's modern history, with particular expertise in the period of
          national independence (1911–1924), Mongolian-Soviet relations, and 20th-century Mongolian diplomacy.
        </p>
        <p style="font-size:1rem;color:var(--text-light);line-height:1.8;margin-bottom:2rem;">
          He has conducted archival research in Ulaanbaatar, Moscow, Beijing, London, and Tokyo,
          and has published extensively in both Mongolian and English.
        </p>
        <NuxtLink to="/about" class="btn">Full Biography</NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Batsaikhan Ookhnoi | Historian & Author' })

const api = useApi()

const booksLoading = ref(true)
const allBooks = ref<any[]>([])
const featuredBooks = computed(() => allBooks.value.slice(0, 3))
const latestBook = computed(() => allBooks.value[0] || null)

const allContentItems = ref<any[]>([])
const latestContent = computed(() => allContentItems.value.slice(0, 2))
const mediaItems = computed(() =>
  allContentItems.value.filter((i: any) => i.type === 'interview' || i.type === 'talk').slice(0, 3)
)

onMounted(async () => {
  try {
    const [books, content] = await Promise.all([
      api.get<any[]>('/books'),
      api.get<any[]>('/content?limit=10')
    ])
    allBooks.value = books
    allContentItems.value = content
  } catch (e) {
    console.error('API error:', e)
  } finally {
    booksLoading.value = false
  }
})

function capitalize(s: string) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : ''
}
</script>

<style scoped>
.book-preview-card {
  width: 300px; background: #fff; border: 1px solid var(--border);
  border-radius: 2px; overflow: hidden;
  transition: box-shadow 0.3s, transform 0.2s; text-align: left;
}
.book-preview-card:hover { box-shadow: 0 6px 20px rgba(0,0,0,0.1); transform: translateY(-3px); }
.book-preview-cover { height: 180px; display: flex; align-items: flex-end; padding: 1rem; color: white; }
.book-preview-info { padding: 1.2rem; }
.book-preview-info .book-title { font-size: 1rem; margin: 0.3rem 0; line-height: 1.3; }
.book-preview-info .book-subtitle { font-size: 0.82rem; color: var(--text-light); }
</style>
