export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser()

  if (!user.value && to.path === '/my-wishlist') {
    return navigateTo('/login')
  }
})
