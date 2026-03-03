<template>
  <div>
    <div class="page-header" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;">
      <div>
        <h1>Admin Dashboard</h1>
        <p>Manage books, content, and orders.</p>
      </div>
      <button class="btn-outline btn-sm" @click="logout" style="align-self:center;">Sign Out</button>
    </div>

    <div style="max-width:1100px;margin:3rem auto;padding:0 5%;">

      <!-- Stats row -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1.5rem;margin-bottom:3rem;">
        <div v-for="stat in stats" :key="stat.label" class="stat-card">
          <p class="stat-number">{{ stat.loading ? '…' : stat.value }}</p>
          <p class="stat-label">{{ stat.label }}</p>
        </div>
      </div>

      <!-- Quick nav cards -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1.5rem;">
        <NuxtLink to="/admin/books" class="admin-nav-card">
          <span class="admin-nav-icon">📚</span>
          <h3>Books</h3>
          <p>Add, edit, or remove books from the catalogue.</p>
        </NuxtLink>
        <NuxtLink to="/admin/orders" class="admin-nav-card">
          <span class="admin-nav-icon">📦</span>
          <h3>Orders</h3>
          <p>View and manage customer book orders.</p>
        </NuxtLink>
        <NuxtLink to="/admin/content" class="admin-nav-card">
          <span class="admin-nav-icon">📝</span>
          <h3>Content</h3>
          <p>Add and manage interviews, articles, and talks.</p>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'admin-auth' })
useHead({ title: 'Dashboard — Admin' })

const api = useApi()
const { logout } = useAdminAuth()

const stats = ref([
  { label: 'Total Books', value: 0, loading: true },
  { label: 'Total Orders', value: 0, loading: true },
  { label: 'Pending Orders', value: 0, loading: true },
  { label: 'Content Items', value: 0, loading: true },
])

onMounted(async () => {
  try {
    const [books, orders, content] = await Promise.all([
      api.get<any[]>('/books'),
      api.get<any[]>('/orders'),
      api.get<any[]>('/content')
    ])
    stats.value[0] = { label: 'Total Books', value: books.length, loading: false }
    stats.value[1] = { label: 'Total Orders', value: orders.length, loading: false }
    stats.value[2] = { label: 'Pending Orders', value: orders.filter((o: any) => o.status === 'pending').length, loading: false }
    stats.value[3] = { label: 'Content Items', value: content.length, loading: false }
  } catch (e) {
    stats.value.forEach(s => { s.loading = false })
  }
})
</script>

<style scoped>
.stat-card {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 2px;
  padding: 1.5rem 2rem;
  text-align: center;
}
.stat-number {
  font-family: 'Playfair Display', serif;
  font-size: 2.8rem;
  color: var(--primary-blue);
  line-height: 1;
  margin-bottom: 0.4rem;
}
.stat-label {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--text-light);
}
.admin-nav-card {
  display: block;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 2px;
  padding: 2rem;
  transition: box-shadow 0.3s, transform 0.2s, border-color 0.3s;
  text-decoration: none;
  color: inherit;
}
.admin-nav-card:hover {
  box-shadow: 0 6px 20px rgba(0,0,0,0.1);
  transform: translateY(-3px);
  border-color: var(--primary-blue);
}
.admin-nav-icon { font-size: 2rem; display: block; margin-bottom: 0.8rem; }
.admin-nav-card h3 { font-size: 1.3rem; margin-bottom: 0.4rem; }
.admin-nav-card p { font-size: 0.9rem; color: var(--text-light); }
</style>
