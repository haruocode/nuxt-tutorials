<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <h1 class="text-2xl font-bold mb-6">トップページ</h1>
    <nuxtLink
      class="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
      to="/login"
    >
      ログイン画面へ
    </nuxtLink>
  </div>
</template>

<script setup>
const user = useSupabaseUser()
const { auth } = useSupabaseClient()

watchEffect(() => {
  if (user.value) {
    navigateTo('/my-wishlist')
  }
})
</script>
