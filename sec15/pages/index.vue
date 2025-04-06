<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-4">
    <h1 class="text-3xl font-bold mb-6">WishWay クローンへようこそ！</h1>

    <div v-if="!user">
      <NuxtLink
        to="/login"
        class="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
      >
        GitHubでログインする
      </NuxtLink>
    </div>

    <div v-else>
      <p class="text-gray-600 mb-4">すでにログイン済みです。</p>
      <NuxtLink
        to="/my-wishlist"
        class="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        マイ願いリストに移動
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter()

onMounted(() => {
  if (user.value) {
    router.push('/my-wishlist')
  }
})
</script>
