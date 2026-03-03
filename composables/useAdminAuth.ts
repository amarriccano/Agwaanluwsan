/**
 * useAdminAuth — manages admin JWT session (localStorage-based)
 * Token is set on login, removed on logout.
 * Nuxt middleware reads isLoggedIn to protect /admin/* routes.
 */
export function useAdminAuth() {
  const token = ref<string | null>(null)

  // Hydrate from localStorage on client
  if (import.meta.client) {
    token.value = localStorage.getItem('admin_token')
  }

  const isLoggedIn = computed(() => !!token.value)

  const api = useApi()

  async function login(password: string): Promise<{ success: boolean; error?: string }> {
    try {
      const res = await api.post<{ token: string }>('/auth/login', { password })
      token.value = res.token
      if (import.meta.client) localStorage.setItem('admin_token', res.token)
      return { success: true }
    } catch (e: any) {
      return { success: false, error: e?.data?.message || 'Invalid password' }
    }
  }

  function logout() {
    token.value = null
    if (import.meta.client) localStorage.removeItem('admin_token')
    navigateTo('/admin/login')
  }

  return { isLoggedIn, login, logout }
}
