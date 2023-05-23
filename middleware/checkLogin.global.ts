export default defineNuxtRouteMiddleware((to) => {
  const viewerId = localStorage.getItem('viewerId')
  const authRoutes = ['register']
  if (!viewerId && to.name?.toString() && !authRoutes.includes(to.name?.toString())) {
    if (to.path === '/') {
      return navigateTo({ name: 'register' })
    }
    return navigateTo({ name: 'register', query: { redirect: to.path } })
  }
})
