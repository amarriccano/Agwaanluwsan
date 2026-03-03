/**
 * Route middleware: redirect to /admin/login if not authenticated.
 * Applied on all /admin/* pages via definePageMeta({ middleware: 'admin-auth' })
 */
export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) return // skip on SSG build

  const token = import.meta.client ? localStorage.getItem('admin_token') : null

  if (!token && to.path !== '/admin/login') {
    return navigateTo('/admin/login')
  }
})
