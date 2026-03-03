<template>
  <div>
    <div class="page-header" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;">
      <div>
        <h1>Content</h1>
        <p>Manage interviews, articles, and talks.</p>
      </div>
      <div style="display:flex;gap:0.8rem;">
        <NuxtLink to="/admin" class="btn-outline btn-sm">← Dashboard</NuxtLink>
        <button class="btn btn-sm" @click="openCreate">+ Add Item</button>
      </div>
    </div>

    <div style="max-width:1100px;margin:2rem auto;padding:0 5%;">

      <!-- Type filter -->
      <div style="display:flex;gap:0.8rem;margin-bottom:2rem;flex-wrap:wrap;">
        <button
          v-for="t in typeFilters" :key="t.value"
          class="btn-outline btn-sm"
          :style="typeFilter === t.value ? 'background:var(--primary-blue);color:white;border-color:var(--primary-blue);' : ''"
          @click="typeFilter = t.value"
        >
          {{ t.label }} ({{ countByType(t.value) }})
        </button>
      </div>

      <div v-if="loading" style="text-align:center;padding:4rem;color:var(--text-light);">Loading…</div>
      <div v-else-if="!filteredItems.length" style="text-align:center;padding:4rem;color:var(--text-light);">
        No items. <button class="btn-outline btn-sm" @click="openCreate" style="margin-left:1rem;">Add First</button>
      </div>

      <table v-else class="cart-table" style="background:#fff;border:1px solid var(--border);">
        <thead>
          <tr><th>Title</th><th>Type</th><th>Publication</th><th>Date</th><th>Actions</th></tr>
        </thead>
        <tbody>
          <tr v-for="item in filteredItems" :key="item._id">
            <td style="max-width:320px;">
              <strong>{{ item.title }}</strong>
            </td>
            <td><span :class="['type-tag', `type-${item.type}`]">{{ item.type }}</span></td>
            <td style="font-size:0.85rem;color:var(--text-light);max-width:200px;">{{ item.publication }}</td>
            <td style="font-size:0.85rem;white-space:nowrap;">{{ item.date }}</td>
            <td>
              <div style="display:flex;gap:0.5rem;">
                <button class="btn-outline btn-sm" @click="openEdit(item)">Edit</button>
                <button class="remove-btn" @click="confirmDelete(item)">Delete</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- MODAL -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <h2 style="margin-bottom:1.5rem;">{{ editingItem ? 'Edit Item' : 'Add Content Item' }}</h2>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Type *</label>
            <select v-model="form.type" class="form-select">
              <option value="interview">Interview</option>
              <option value="article">Article</option>
              <option value="talk">Talk</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Year *</label>
            <input v-model.number="form.year" type="number" class="form-input" />
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Title *</label>
          <input v-model="form.title" type="text" class="form-input" />
        </div>

        <div class="form-group">
          <label class="form-label">Publication *</label>
          <input v-model="form.publication" type="text" class="form-input" placeholder="e.g. BBC World Service, Journal of Asian Studies" />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Date (display)</label>
            <input v-model="form.date" type="text" class="form-input" placeholder="e.g. November 2025" />
          </div>
          <div class="form-group">
            <label class="form-label">URL (optional)</label>
            <input v-model="form.url" type="url" class="form-input" placeholder="https://…" />
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Description (optional)</label>
          <input v-model="form.description" type="text" class="form-input" placeholder="e.g. Keynote Address" />
        </div>

        <div v-if="modalError" class="alert-error">{{ modalError }}</div>

        <div style="display:flex;gap:1rem;margin-top:1.5rem;">
          <button class="btn" :disabled="saving" @click="saveItem">
            {{ saving ? 'Saving…' : (editingItem ? 'Save Changes' : 'Add Item') }}
          </button>
          <button class="btn-outline" @click="closeModal">Cancel</button>
        </div>
      </div>
    </div>

    <!-- Delete confirm -->
    <div v-if="deleteTarget" class="modal-overlay" @click.self="deleteTarget = null">
      <div class="modal" style="max-width:440px;">
        <h2 style="margin-bottom:1rem;">Delete Item?</h2>
        <p style="color:var(--text-light);margin-bottom:1.5rem;">
          Delete <strong>{{ deleteTarget.title }}</strong>?
        </p>
        <div style="display:flex;gap:1rem;">
          <button class="btn" style="background:linear-gradient(135deg,#c62828,#b71c1c);" :disabled="deleting" @click="doDelete">
            {{ deleting ? 'Deleting…' : 'Delete' }}
          </button>
          <button class="btn-outline" @click="deleteTarget = null">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'admin-auth' })
useHead({ title: 'Content — Admin' })

const api = useApi()
const items = ref<any[]>([])
const loading = ref(true)
const showModal = ref(false)
const editingItem = ref<any>(null)
const deleteTarget = ref<any>(null)
const saving = ref(false)
const deleting = ref(false)
const modalError = ref('')
const typeFilter = ref('all')

const typeFilters = [
  { label: 'All', value: 'all' },
  { label: 'Interviews', value: 'interview' },
  { label: 'Articles', value: 'article' },
  { label: 'Talks', value: 'talk' },
]

const emptyForm = () => ({
  type: 'interview', title: '', publication: '', date: '',
  year: new Date().getFullYear(), url: '', description: ''
})
const form = ref(emptyForm())

async function load() {
  loading.value = true
  try { items.value = await api.get<any[]>('/content') }
  finally { loading.value = false }
}
onMounted(load)

const filteredItems = computed(() =>
  typeFilter.value === 'all' ? items.value : items.value.filter(i => i.type === typeFilter.value)
)
function countByType(t: string) {
  return t === 'all' ? items.value.length : items.value.filter(i => i.type === t).length
}

function openCreate() { editingItem.value = null; form.value = emptyForm(); modalError.value = ''; showModal.value = true }
function openEdit(item: any) { editingItem.value = item; form.value = { ...emptyForm(), ...item }; modalError.value = ''; showModal.value = true }
function closeModal() { showModal.value = false }

async function saveItem() {
  modalError.value = ''
  if (!form.value.title.trim())       { modalError.value = 'Title is required.'; return }
  if (!form.value.publication.trim()) { modalError.value = 'Publication is required.'; return }
  saving.value = true
  try {
    if (editingItem.value) {
      await api.put(`/content/${editingItem.value._id}`, form.value)
    } else {
      await api.post('/content', form.value)
    }
    await load()
    closeModal()
  } catch (e: any) {
    modalError.value = e?.data?.message || 'Failed to save.'
  } finally {
    saving.value = false
  }
}

function confirmDelete(item: any) { deleteTarget.value = item }
async function doDelete() {
  deleting.value = true
  try {
    await api.del(`/content/${deleteTarget.value._id}`)
    await load()
    deleteTarget.value = null
  } catch { alert('Delete failed.') }
  finally { deleting.value = false }
}
</script>

<style scoped>
.type-tag {
  font-size: 0.72rem; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.5px; padding: 2px 10px; border-radius: 12px;
}
.type-interview { background: #e3f2fd; color: #1565c0; }
.type-article   { background: #e8f5e9; color: #2e7d32; }
.type-talk      { background: #f3e5f5; color: #6a1b9a; }
.modal-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.5);
  display: flex; align-items: center; justify-content: center;
  z-index: 2000; padding: 1rem;
}
.modal {
  background: #fff; padding: 2.5rem; border-radius: 2px;
  width: 100%; max-width: 640px; max-height: 90vh; overflow-y: auto;
}
</style>
