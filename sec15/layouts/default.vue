<template>
  <div :class="{ dark: isDark }" class="flex flex-col min-h-screen">
    <!-- ヘッダー -->
    <header class="flex items-center justify-between bg-white text-gray-900  px-6 py-4 shadow-md">
      <div class="flex items-center gap-2">
        <!-- ロゴ + サイト名 -->
        <!-- <img src="/logo.png" alt="WishWay" class="h-8 w-8" /> -->
        <NuxtLink to="/" class="text-2xl font-bold">WishWay</NuxtLink>
      </div>

      <div class="flex items-center gap-4">
        <template v-if="user">
          <div class="relative">
            <button @click="toggleMenu">
              <img
                v-if="user.user_metadata.avatar_url"
                :src="user.user_metadata.avatar_url"
                alt="Profile"
                class="w-10 h-10 rounded-full object-cover border"
              />
              <div v-else class="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center text-white text-sm">
                {{ userInitial }}
              </div>
            </button>

            <div v-if="showMenu" class="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
              <NuxtLink to="/my-wishlist" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-left">
                マイページ
              </NuxtLink>
              <NuxtLink to="/profile" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-left">
                プロフィール
              </NuxtLink>
              <button @click="logout" class="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                ログアウト
              </button>
            </div>
          </div>
        </template>

        <template v-else>
          <NuxtLink
            to="/login"
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm"
          >
            ログイン
          </NuxtLink>
        </template>
      </div>
    </header>

    <!-- メインコンテンツ -->
    <main class="flex-1 bg-gray-50 text-gray-900 transition-colors">
      <slot />
    </main>

    <!-- フッター -->
    <footer class="bg-gray-200 text-gray-600 text-center py-4 text-sm">
      © 2025 WishWay Clone. All rights reserved.
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useSupabaseClient, useSupabaseUser } from '#imports'
import { useRouter } from 'vue-router'

const isDark = ref(false)
const showMenu = ref(false)

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter()

// if (process.client) {
//   isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
// }

const logout = async () => {
  await supabase.auth.signOut()
  router.push('/')
}

const toggleMenu = () => {
  showMenu.value = !showMenu.value
}

const userInitial = computed(() => {
  if (user.value?.user_metadata?.full_name) {
    return user.value.user_metadata.full_name.charAt(0)
  }
  return 'U' // fallback
})
</script>
