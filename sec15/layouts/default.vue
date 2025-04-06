<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <NuxtLink to="/" class="text-2xl font-bold text-indigo-600">WishWay</NuxtLink>
        <nav class="flex space-x-4">
          <NuxtLink to="/" class="px-3 py-2 rounded hover:bg-gray-100">ホーム</NuxtLink>
          <NuxtLink to="/wishlists" class="px-3 py-2 rounded hover:bg-gray-100">願いリスト一覧</NuxtLink>
          <template v-if="user">
            <NuxtLink to="/my-wishlist" class="px-3 py-2 rounded hover:bg-gray-100">マイリスト</NuxtLink>
            <UButton @click="logout" color="gray" variant="ghost">ログアウト</UButton>
          </template>
          <template v-else>
            <NuxtLink to="/login" class="px-3 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700">ログイン</NuxtLink>
          </template>
        </nav>
      </div>
    </header>

    <main class="container mx-auto px-4 py-8">
      <slot />
    </main>

    <footer class="bg-white border-t mt-auto">
      <div class="container mx-auto px-4 py-6 text-center text-gray-500">
        &copy; {{ new Date().getFullYear() }} WishWay Clone
      </div>
    </footer>
  </div>
</template>

<script setup>
const user = useSupabaseUser()
const supabase = useSupabaseClient()

const logout = async () => {
  await supabase.auth.signOut()
  navigateTo('/login')
}
</script>
