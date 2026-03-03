<template>
  <div>
    <div class="page-header" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;">
      <div>
        <h1>Books</h1>
        <p>Manage the book catalogue shown on the public website.</p>
      </div>
      <div style="display:flex;gap:0.8rem;">
        <NuxtLink to="/admin" class="btn-outline btn-sm">← Dashboard</NuxtLink>
        <button class="btn btn-sm" @click="openCreate">+ Add Book</button>
      </div>
    </div>

    <div style="max-width:1100px;margin:2rem auto;padding:0 5%;">
      <div v-if="loading" style="text-align:center;padding:4rem;color:var(--text-light);">Loading…</div>
      <div v-else-if="!books.length" style="text-align:center;padding:4rem;color:var(--text-light);">
        No books yet. <button class="btn-outline btn-sm" @click="openCreate" style="margin-left:1rem;">Add First Book</button>
      </div>

      <table v-else class="cart-table" style="background:#fff;border:1px solid var(--border);">
        <thead>
          <tr>
            <th>Title</th><th>Year</th><th>Category</th><th>Price</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in books" :key="book._id">
            <td>
              <strong style="font-family:'Playfair Display',serif;">{{ book.title }}</strong>
              <div style="font-size:0.8rem;color:var(--text-light);">{{ book.publisher }}</div>
            </td>
            <td>{{ book.year }}</td>
            <td><span class="tag">{{ book.category }}</span></td>
            <td style="font-weight:700;color:var(--primary-blue);">{{ formatPrice(book.price) }}</td>
            <td>
              <div style="display:flex;gap:0.5rem;">
                <button class="btn-outline btn-sm" @click="openEdit(book)">Edit</button>
                <button class="remove-btn" @click="confirmDelete(book)">Delete</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- MODAL: Create / Edit -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <h2 style="margin-bottom:1.5rem;">{{ editingBook ? 'Edit Book' : 'Add New Book' }}</h2>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Title *</label>
            <input v-model="form.title" type="text" class="form-input" placeholder="Book title" />
          </div>
          <div class="form-group">
            <label class="form-label">Year *</label>
            <input v-model.number="form.year" type="number" class="form-input" placeholder="2024" />
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Subtitle</label>
          <input v-model="form.subtitle" type="text" class="form-input" placeholder="Subtitle" />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Publisher *</label>
            <input v-model="form.publisher" type="text" class="form-input" />
          </div>
          <div class="form-group">
            <label class="form-label">Category</label>
            <input v-model="form.category" type="text" class="form-input" placeholder="e.g. Biography" />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Price (₮) *</label>
            <input v-model.number="form.price" type="number" class="form-input" placeholder="35000" />
          </div>
          <div class="form-group">
            <label class="form-label">Pages</label>
            <input v-model.number="form.pages" type="number" class="form-input" />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">ISBN</label>
            <input v-model="form.isbn" type="text" class="form-input" />
          </div>
          <div class="form-group">
            <label class="form-label">Language</label>
            <input v-model="form.language" type="text" class="form-input" placeholder="Mongolian" />
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Description</label>
          <textarea v-model="form.description" class="form-textarea" />
        </div>

        <div class="form-group">
          <label class="form-label">Cover Gradient CSS (optional)</label>
          <input v-model="form.coverGradient" type="text" class="form-input" placeholder="linear-gradient(135deg, #162447, #4a148c)" />
          <div :style="{ background: form.coverGradient || 'linear-gradient(135deg,#162447,#4a148c)', height:'40px', marginTop:'0.5rem', borderRadius:'2px' }"></div>
        </div>

        <div v-if="modalError" class="alert-error">{{ modalError }}</div>

        <div style="display:flex;gap:1rem;margin-top:1.5rem;">
          <button class="btn" :disabled="saving" @click="saveBook">
            {{ saving ? 'Saving…' : (editingBook ? 'Save Changes' : 'Add Book') }}
          </button>
          <button class="btn-outline" @click="closeModal">Cancel</button>
        </div>
      </div>
    </div>

    <!-- Delete confirm -->
    <div v-if="deleteTarget" class="modal-overlay" @click.self="deleteTarget = null">
      <div class="modal" style="max-width:440px;">
        <h2 style="margin-bottom:1rem;">Delete Book?</h2>
        <p style="color:var(--text-light);margin-bottom:1.5rem;">
          Are you sure you want to delete <strong>{{ deleteTarget.title }}</strong>? This cannot be undone.
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
useHead({ title: 'Books — Admin' })

const api = useApi()
const books = ref<any[]>([])
const loading = ref(true)
const showModal = ref(false)
const editingBook = ref<any>(null)
const deleteTarget = ref<any>(null)
const saving = ref(false)
const deleting = ref(false)
const modalError = ref('')

const emptyForm = () => ({
  title: '', subtitle: '', year: new Date().getFullYear(),
  publisher: '', category: '', price: 0, pages: 0,
  isbn: '', language: 'Mongolian', description: '', coverGradient: ''
})
const form = ref(emptyForm())

async function loadBooks() {
  loading.value = true
  try { books.value = await api.get<any[]>('/books') }
  finally { loading.value = false }
}

onMounted(loadBooks)

function openCreate() { editingBook.value = null; form.value = emptyForm(); modalError.value = ''; showModal.value = true }
function openEdit(book: any) {
  editingBook.value = book
  form.value = { ...emptyForm(), ...book }
  modalError.value = ''
  showModal.value = true
}
function closeModal() { showModal.value = false }

async function saveBook() {
  modalError.value = ''
  if (!form.value.title.trim()) { modalError.value = 'Title is required.'; return }
  if (!form.value.price) { modalError.value = 'Price is required.'; return }
  saving.value = true
  try {
    if (editingBook.value) {
      await api.put(`/books/${editingBook.value._id}`, form.value)
    } else {
      await api.post('/books', form.value)
    }
    await loadBooks()
    closeModal()
  } catch (e: any) {
    modalError.value = e?.data?.message || 'Failed to save.'
  } finally {
    saving.value = false
  }
}

function confirmDelete(book: any) { deleteTarget.value = book }
async function doDelete() {
  deleting.value = true
  try {
    await api.del(`/books/${deleteTarget.value._id}`)
    await loadBooks()
    deleteTarget.value = null
  } catch (e: any) {
    alert(e?.data?.message || 'Delete failed.')
  } finally {
    deleting.value = false
  }
}

function formatPrice(p: number) { return (p || 0).toLocaleString('mn-MN') + ' ₮' }
</script>

<style scoped>
.tag {
  background: #f4f4f4;
  border: 1px solid var(--border);
  padding: 2px 10px;
  border-radius: 12px;
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-light);
}
.modal-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex; align-items: center; justify-content: center;
  z-index: 2000; padding: 1rem;
}
.modal {
  background: #fff;
  padding: 2.5rem;
  border-radius: 2px;
  width: 100%;
  max-width: 700px;
  max-height: 90vh;
  overflow-y: auto;
}
</style>
