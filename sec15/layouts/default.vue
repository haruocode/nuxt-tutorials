<template>
  <div :class="{ dark: isDark }" class="min-h-screen">
    <main class="">
      <slot />
    </main>

    <footer class="bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-center py-4 text-sm">
      © 2025 WishWay Clone. No rights reserved at all.
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isDark = ref(false)

// 最初からユーザーのシステム設定を反映するなら
// if (process.client) {
//   isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
// }
</script>
