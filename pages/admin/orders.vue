<template>
  <div>
    <div class="page-header" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;">
      <div>
        <h1>Orders</h1>
        <p>All book orders placed through the website.</p>
      </div>
      <NuxtLink to="/admin" class="btn-outline btn-sm">← Dashboard</NuxtLink>
    </div>

    <div style="max-width:1100px;margin:2rem auto;padding:0 5%;">

      <!-- Filters -->
      <div style="display:flex;gap:0.8rem;margin-bottom:2rem;flex-wrap:wrap;">
        <button
          v-for="f in filters" :key="f.value"
          class="btn-outline btn-sm"
          :style="activeFilter === f.value ? 'background:var(--primary-blue);color:white;border-color:var(--primary-blue);' : ''"
          @click="activeFilter = f.value"
        >
          {{ f.label }} ({{ countByStatus(f.value) }})
        </button>
      </div>

      <div v-if="loading" style="text-align:center;padding:4rem;color:var(--text-light);">Loading…</div>
      <div v-else-if="!filteredOrders.length" style="text-align:center;padding:4rem;color:var(--text-light);">No orders found.</div>

      <div v-else>
        <div v-for="order in filteredOrders" :key="order._id" class="order-card">
          <div class="order-card-header">
            <div>
              <span class="order-num">#{{ order.orderNumber || order._id?.slice(-8).toUpperCase() }}</span>
              <span :class="['order-status', `status-${order.status}`]">{{ order.status }}</span>
            </div>
            <span style="font-size:0.85rem;color:var(--text-light);">
              {{ formatDate(order.createdAt) }}
            </span>
          </div>

          <div class="order-card-body">
            <div>
              <p style="font-weight:700;">{{ order.customerName }}</p>
              <p style="color:var(--text-light);font-size:0.9rem;">📞 {{ order.phone }}</p>
              <p style="color:var(--text-light);font-size:0.9rem;">📍 {{ order.address }}</p>
              <p v-if="order.notes" style="color:var(--text-light);font-size:0.85rem;margin-top:0.3rem;">💬 {{ order.notes }}</p>
            </div>
            <div style="text-align:right;">
              <p style="font-size:0.82rem;color:var(--text-light);margin-bottom:0.5rem;">
                {{ order.items?.length }} item(s)
              </p>
              <ul style="list-style:none;text-align:right;margin-bottom:0.8rem;">
                <li v-for="item in order.items" :key="item.bookId" style="font-size:0.85rem;color:var(--text-light);">
                  {{ item.title }} × {{ item.quantity }}
                </li>
              </ul>
              <p class="order-total">{{ formatPrice(order.total) }}</p>
            </div>
          </div>

          <div class="order-card-footer">
            <span style="font-size:0.82rem;color:var(--text-light);">Update status:</span>
            <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
              <button
                v-for="s in statusOptions" :key="s.value"
                class="btn-outline btn-sm"
                :disabled="order.status === s.value || updatingId === order._id"
                :style="order.status === s.value ? 'opacity:0.4;cursor:default;' : ''"
                @click="updateStatus(order, s.value)"
              >
                {{ s.label }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'admin-auth' })
useHead({ title: 'Orders — Admin' })

const api = useApi()
const orders = ref<any[]>([])
const loading = ref(true)
const updatingId = ref<string | null>(null)
const activeFilter = ref('all')

const filters = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Confirmed', value: 'confirmed' },
  { label: 'Delivered', value: 'delivered' },
  { label: 'Cancelled', value: 'cancelled' },
]

const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'confirmed', label: 'Confirm' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'cancelled', label: 'Cancel' },
]

onMounted(async () => {
  try { orders.value = await api.get<any[]>('/orders') }
  finally { loading.value = false }
})

const filteredOrders = computed(() =>
  activeFilter.value === 'all'
    ? orders.value
    : orders.value.filter(o => o.status === activeFilter.value)
)

function countByStatus(status: string) {
  return status === 'all' ? orders.value.length : orders.value.filter(o => o.status === status).length
}

async function updateStatus(order: any, status: string) {
  updatingId.value = order._id
  try {
    await api.patch(`/orders/${order._id}/status`, { status })
    order.status = status
  } catch (e) { alert('Update failed.') }
  finally { updatingId.value = null }
}

function formatPrice(p: number) { return (p || 0).toLocaleString('mn-MN') + ' ₮' }
function formatDate(d: string) {
  return d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—'
}
</script>

<style scoped>
.order-card {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 2px;
  margin-bottom: 1.2rem;
  overflow: hidden;
}
.order-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: #fafafa;
  border-bottom: 1px solid var(--border);
}
.order-num {
  font-weight: 700;
  font-family: 'Lato', sans-serif;
  letter-spacing: 1px;
  font-size: 0.9rem;
  color: var(--primary-blue);
  margin-right: 1rem;
}
.order-status {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 3px 10px;
  border-radius: 12px;
}
.status-pending   { background: #fff3e0; color: #e65100; }
.status-confirmed { background: #e3f2fd; color: #1565c0; }
.status-delivered { background: #e8f5e9; color: #2e7d32; }
.status-cancelled { background: #ffebee; color: #c62828; }
.order-card-body {
  padding: 1.2rem 1.5rem;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}
.order-total {
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--primary-blue);
}
.order-card-footer {
  padding: 0.8rem 1.5rem;
  border-top: 1px solid var(--border);
  background: #fafafa;
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}
</style>
