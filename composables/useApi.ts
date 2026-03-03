/**
 * useApi — thin wrapper around $fetch that:
 *  • reads NUXT_PUBLIC_API_BASE from runtimeConfig
 *  • attaches the admin JWT from localStorage when present
 *  • exposes typed helpers: get, post, put, patch, del
 */
export function useApi() {
  const config = useRuntimeConfig()
  const base = config.public.apiBase as string

  function getAuthHeaders(): Record<string, string> {
    if (import.meta.client) {
      const token = localStorage.getItem('admin_token')
      if (token) return { Authorization: `Bearer ${token}` }
    }
    return {}
  }

  function get<T>(path: string) {
    return $fetch<T>(`${base}${path}`, {
      headers: getAuthHeaders()
    })
  }

  function post<T>(path: string, body: unknown) {
    return $fetch<T>(`${base}${path}`, {
      method: 'POST',
      body,
      headers: getAuthHeaders()
    })
  }

  function put<T>(path: string, body: unknown) {
    return $fetch<T>(`${base}${path}`, {
      method: 'PUT',
      body,
      headers: getAuthHeaders()
    })
  }

  function patch<T>(path: string, body: unknown) {
    return $fetch<T>(`${base}${path}`, {
      method: 'PATCH',
      body,
      headers: getAuthHeaders()
    })
  }

  function del<T>(path: string) {
    return $fetch<T>(`${base}${path}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    })
  }

  return { get, post, put, patch, del, base }
}
