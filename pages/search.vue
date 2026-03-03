<template>
  <div>
    <div class="page-header">
      <h1>Search</h1>
      <p>Search across all interviews, articles, talks, and books.</p>
    </div>

    <div class="search-page">
      <div class="search-bar-lg">
        <input
          v-model="query"
          type="text"
          placeholder="Search the archive..."
          @keyup.enter="doSearch"
          autofocus
        />
        <button @click="doSearch">Search</button>
      </div>

      <!-- Filter tabs -->
      <div v-if="hasSearched" style="display: flex; gap: 0.8rem; margin-bottom: 2rem; flex-wrap: wrap;">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          class="btn-outline btn-sm"
          :style="activeTab === tab.value ? 'background: var(--primary-blue); color: white;' : ''"
          @click="activeTab = tab.value"
        >
          {{ tab.label }} ({{ getCount(tab.value) }})
        </button>
      </div>

      <!-- Results -->
      <div v-if="hasSearched">
        <p v-if="filteredResults.length === 0" class="no-results">
          No results found for "<strong>{{ lastQuery }}</strong>".
        </p>

        <div v-for="result in filteredResults" :key="result.id" class="search-result">
          <p class="search-result-type">{{ typeLabel(result.type) }}</p>
          <h3>
            <a v-if="result.url" :href="result.url" target="_blank" rel="noopener">{{ result.title }}</a>
            <NuxtLink v-else-if="result.type === 'book'" :to="`/books`">{{ result.title }}</NuxtLink>
            <NuxtLink v-else :to="`/${result.type}s`">{{ result.title }}</NuxtLink>
          </h3>
          <p>{{ result.publication }} · {{ result.date }}</p>
          <p v-if="result.description" style="margin-top: 0.3rem; color: var(--text-light); font-size: 0.88rem;">{{ result.description }}</p>
        </div>
      </div>

      <div v-else style="color: var(--text-light); font-size: 0.9rem;">
        <p>Try searching for a topic, publication, or year. For example:</p>
        <ul style="margin-top: 0.8rem; padding-left: 1.5rem; line-height: 2;">
          <li><em>Bogd Khanate</em></li>
          <li><em>sovereignty</em></li>
          <li><em>Russian archives</em></li>
          <li><em>Cambridge</em></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { allContent } from '~/data/content'
import { books } from '~/data/books'

useHead({ title: 'Search — Batsaikhan Ookhnoi' })

// Combine all searchable content
const searchable = [
  ...allContent,
  ...books.map(b => ({
    id: b.id,
    title: b.title,
    publication: b.publisher,
    date: String(b.year),
    year: b.year,
    type: 'book' as const,
    description: b.description
  }))
]

const query = ref('')
const lastQuery = ref('')
const hasSearched = ref(false)
const results = ref<typeof searchable>([])

const tabs = [
  { label: 'All', value: 'all' },
  { label: 'Books', value: 'book' },
  { label: 'Articles', value: 'article' },
  { label: 'Interviews', value: 'interview' },
  { label: 'Talks', value: 'talk' }
]
const activeTab = ref('all')

const filteredResults = computed(() => {
  if (activeTab.value === 'all') return results.value
  return results.value.filter(r => r.type === activeTab.value)
})

function getCount(tab: string) {
  if (tab === 'all') return results.value.length
  return results.value.filter(r => r.type === tab).length
}

function doSearch() {
  const q = query.value.trim().toLowerCase()
  if (!q) return

  lastQuery.value = query.value
  hasSearched.value = true
  activeTab.value = 'all'

  results.value = searchable.filter(item =>
    item.title.toLowerCase().includes(q) ||
    item.publication.toLowerCase().includes(q) ||
    (item.description?.toLowerCase().includes(q)) ||
    String(item.year).includes(q)
  )
}

function typeLabel(type: string) {
  const map: Record<string, string> = {
    book: 'Book',
    article: 'Article',
    interview: 'Interview',
    talk: 'Talk'
  }
  return map[type] || type
}

// Check if search query is passed via URL
const route = useRoute()
onMounted(() => {
  const q = route.query.q as string
  if (q) {
    query.value = q
    doSearch()
  }
})
</script>
