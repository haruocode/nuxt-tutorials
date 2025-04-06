<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <h1 class="text-2xl font-bold mb-6">ログイン確認中...</h1>
    <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const errorMessage = ref('')

onMounted(async () => {
  // Supabase側で自動的にセッション復元（codeやaccess_token処理）
  const { data, error } = await supabase.auth.getSession()

  console.log("come here???")

  if (error) {
    errorMessage.value = 'ログインエラー: ' + error.message
    console.error(error)
    return
  }

  if (user.value) {
    // ユーザー情報が取れていれば、マイページ（例: /my-wishlist）へリダイレクト！
    router.push('/my-wishlist')
  } else {
    errorMessage.value = 'ユーザー情報が取得できませんでした'
  }
})
</script>
