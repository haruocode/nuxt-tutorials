<template>
  <div class="flex flex-col items-center justify-center min-h-screen py-16 px-4">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-red-600 mb-4">{{ error.statusCode }}</h1>
      <h2 class="text-2xl font-semibold mb-6">{{ error.message || 'エラーが発生しました' }}</h2>
      <p class="text-gray-600 mb-8">申し訳ありませんが、問題が発生しました。</p>
      <UButton @click="handleError" color="indigo">ホームに戻る</UButton>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  error: Object
})

const handleError = () => {
  clearError({ redirect: '/' })
}
</script>
