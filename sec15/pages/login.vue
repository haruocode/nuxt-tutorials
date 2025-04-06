<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <h1 class="text-2xl font-bold mb-6">ログイン</h1>
    <button
      class="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
      @click="loginWithGitHub"
    >
      GitHubでログイン
    </button>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()

const loginWithGitHub = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
  })
  if (error) {
    console.error('GitHubログインエラー:', error.message)
  }
}
</script>
