<template>
  <div class="w-full h-[100vh] bg-white">
    <div class="w-full flex items-center justify-center p-5 border-b border-b-gray-300">
      <NuxtLink to="/">Supabase Auth Test</NuxtLink>
    </div>

    <div class="max-w-[400px] mx-auto px-2">
      <div class="text-center my-6">Top page</div>
      <div class="text-center">
        <NuxtLink to="/auth" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
          Go to Auth Page
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
