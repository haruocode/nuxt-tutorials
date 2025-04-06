<template>
  <div class="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
    <h1 class="text-2xl font-bold mb-6 text-center">WishWayにログイン</h1>

    <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {{ error }}
    </div>

    <div class="space-y-4">
      <UButton block color="black" @click="signInWithGithub">
        <template #leading>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </template>
        GitHubでログイン
      </UButton>

      <UButton block color="blue" @click="signInWithGoogle">
        <template #leading>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2.917 16.583c-2.258 0-4.083-1.825-4.083-4.083s1.825-4.083 4.083-4.083c1.103 0 2.027.402 2.735 1.067l-1.107 1.068c-.304-.292-.834-.63-1.628-.63-1.394 0-2.531 1.155-2.531 2.579 0 1.424 1.138 2.579 2.531 2.579 1.616 0 2.224-1.162 2.316-1.762h-2.316v-1.4h3.855c.036.204.064.408.064.677.001 2.332-1.563 3.988-3.919 3.988zm9.917-3.5h-1.75v1.75h-1.167v-1.75h-1.75v-1.166h1.75v-1.75h1.167v1.75h1.75v1.166z" />
          </svg>
        </template>
        Googleでログイン
      </UButton>
    </div>

    <p class="mt-6 text-center text-gray-600 text-sm">
      ログインすると、あなた専用の願いリストを作成できます。
    </p>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const error = ref(null)

const signInWithGithub = async () => {
  error.value = null
  try {
    const { error: err } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${useRuntimeConfig().public.siteUrl}/confirm`
      }
    })
    if (err) error.value = err.message
  } catch (e) {
    error.value = '認証中にエラーが発生しました'
  }
}

const signInWithGoogle = async () => {
  error.value = null
  try {
    const { error: err } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${useRuntimeConfig().public.siteUrl}/confirm`
      }
    })
    if (err) error.value = err.message
  } catch (e) {
    error.value = '認証中にエラーが発生しました'
  }
}
</script>
