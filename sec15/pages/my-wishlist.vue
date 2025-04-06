<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <h1 class="text-2xl font-bold mb-4">マイ願いリスト</h1>
    <p>ここに願いリストを表示します（これから作る）✨</p>

    <button
      @click="logout"
      class="mt-6 bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
    >
      ログアウト
    </button>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const router = useRouter()

const logout = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('ログアウトエラー:', error.message)
    return
  }
  router.push('/login')
}
</script>
