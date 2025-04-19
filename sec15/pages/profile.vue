<template>
  <div class="flex flex-col items-center min-h-screen p-4">
    <h1 class="text-2xl font-bold mb-6">プロフィール</h1>

    <div v-if="user">
      <img
        :src="user.user_metadata.avatar_url"
        alt="ユーザーアイコン"
        class="w-24 h-24 rounded-full mb-4"
      />
      <h2 class="text-xl font-semibold mb-2">{{ user.user_metadata.full_name }}</h2>
      <p class="text-gray-600">{{ user.email }}</p>
    </div>

    <NuxtLink to="/my-wishlist" class="mt-8 underline text-blue-500">
      マイ願いリストに戻る
    </NuxtLink>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter()

onMounted(() => {
  if (!user.value) {
    router.push('/login')
  }
})
</script>
