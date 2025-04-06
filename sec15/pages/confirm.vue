<template>
  <div class="text-center">
    <UCard class="max-w-md mx-auto">
      <template #header>
        <h1 class="text-xl font-semibold">認証完了</h1>
      </template>

      <div v-if="loading" class="flex flex-col items-center py-4">
        <UIcon name="i-heroicons-arrow-path" class="animate-spin h-8 w-8 text-indigo-600" />
        <p class="mt-2">ユーザー情報を確認中...</p>
      </div>

      <div v-else-if="error" class="text-red-600">
        {{ error }}
      </div>

      <template #footer>
        <div class="flex justify-center">
          <UButton color="indigo" to="/">ホームに戻る</UButton>
        </div>
      </template>
    </UCard>
  </div>
</template>

<script setup>
const loading = ref(true)
const error = ref(null)
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter()
const prisma = usePrisma()

// ユーザーのログイン情報が揃ったら、DBにユーザー情報を保存
onMounted(async () => {
  try {
    if (user.value) {
      const { data: existingUser } = await supabase
        .from('User')
        .select('id')
        .eq('email', user.value.email)
        .single()

      if (!existingUser) {
        // Prismaを使用してユーザーを作成
        await prisma.user.create({
          data: {
            name: user.value.user_metadata.name || user.value.email,
            email: user.value.email,
            provider: user.value.app_metadata.provider,
            oAuthId: user.value.id,
            wishlist: {
              create: {
                title: `${user.value.user_metadata.name || 'My'}の願いリスト`,
                isPublic: true
              }
            }
          }
        })
      }

      router.push('/my-wishlist')
    }
  } catch (err) {
    error.value = '処理中にエラーが発生しました'
    console.error('Error during auth confirmation:', err)
  } finally {
    loading.value = false
  }
})
</script>
