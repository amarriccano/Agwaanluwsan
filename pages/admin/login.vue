<template>
  <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:var(--background);">
    <div style="width:100%;max-width:420px;padding:2rem;">
      <div style="text-align:center;margin-bottom:2.5rem;">
        <NuxtLink to="/" class="brand" style="font-size:1.4rem;">Batsaikhan Ookhnoi</NuxtLink>
        <p style="margin-top:1rem;color:var(--text-light);font-size:0.9rem;text-transform:uppercase;letter-spacing:1.5px;">Admin Panel</p>
      </div>

      <div class="order-form">
        <h2 style="font-size:1.5rem;margin-bottom:0.3rem;">Sign In</h2>
        <p class="form-subtitle">Enter the admin password to continue.</p>

        <div class="form-group">
          <label class="form-label">Password</label>
          <input
            v-model="password"
            type="password"
            class="form-input"
            placeholder="Admin password"
            @keyup.enter="doLogin"
            autofocus
          />
        </div>

        <div v-if="error" class="alert-error">{{ error }}</div>

        <button class="btn" style="width:100%;" :disabled="loading" @click="doLogin">
          {{ loading ? 'Signing in…' : 'Sign In' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })
useHead({ title: 'Admin Login — Batsaikhan Ookhnoi' })

const { isLoggedIn, login } = useAdminAuth()
const router = useRouter()

if (isLoggedIn.value) router.push('/admin')

const password = ref('')
const error = ref('')
const loading = ref(false)

async function doLogin() {
  error.value = ''
  loading.value = true
  const result = await login(password.value)
  loading.value = false
  if (result.success) {
    router.push('/admin')
  } else {
    error.value = result.error || 'Login failed.'
  }
}
</script>
