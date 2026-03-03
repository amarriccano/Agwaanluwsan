<template>
  <div>
    <div class="page-header">
      <h1>Interviews</h1>
      <p>Conversations with radio stations, podcasts, and print media. Most recent first.</p>
    </div>
    <div v-if="loading" style="text-align:center;padding:5rem;color:var(--text-light);">Loading…</div>
    <div v-else class="archive-section">
      <div v-for="year in sortedYears" :key="year" class="year-group">
        <h2 class="year-heading">{{ year }}</h2>
        <ul class="archive-list">
          <li v-for="item in grouped[year]" :key="item._id">
            <a v-if="item.url" :href="item.url" target="_blank" rel="noopener">{{ item.title }}</a>
            <span v-else style="font-weight:700;color:var(--primary-blue);">{{ item.title }}</span>
            <span class="pub-info"> {{ item.publication }}. {{ item.date }}.</span>
          </li>
        </ul>
      </div>
      <p v-if="!sortedYears.length" style="color:var(--text-light);">No entries yet.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Interviews — Batsaikhan Ookhnoi' })
const api = useApi()
const loading = ref(true)
const items = ref<any[]>([])

onMounted(async () => {
  try { items.value = await api.get<any[]>('/content?type=interview') }
  catch (e) { console.error(e) }
  finally { loading.value = false }
})

const grouped = computed(() =>
  items.value.reduce((acc: any, item: any) => {
    if (!acc[item.year]) acc[item.year] = []
    acc[item.year].push(item)
    return acc
  }, {})
)
const sortedYears = computed(() =>
  Object.keys(grouped.value).map(Number).sort((a, b) => b - a)
)
</script>
