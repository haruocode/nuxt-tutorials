<template>
  <div :class="{ dark: isDark }" class="min-h-screen">
    <main class="">
      <slot />
    </main>
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
