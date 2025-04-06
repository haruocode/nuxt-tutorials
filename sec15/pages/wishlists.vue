<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">みんなの願いリスト</h1>

    <div v-if="loading" class="flex justify-center py-12">
      <UIcon name="i-heroicons-arrow-path" class="animate-spin h-8 w-8 text-indigo-600" />
    </div>

    <div v-else-if="wishlists.length === 0" class="text-center py-12">
      <p class="text-gray-500">公開されている願いリストはありません</p>
    </div>

    <div v-else class="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
      <UCard
        v-for="list in wishlists"
        :key="list.id"
        :to="`/wishlist/${list.id}`"
        class="hover:shadow-lg transition-shadow"
      >
        <template #header>
          <h2 class="text-lg font-semibold">{{ list.title }}</h2>
        </template>

        <p class="text-gray-600">
          クリックして願いリストを見る
        </p>

        <template #footer>
          <div class="flex justify-end">
            <UButton color="indigo" variant="ghost" :to="`/wishlist/${list.id}`">
              <template #leading>
                <UIcon name="i-heroicons-gift" />
              </template>
              見る
            </UButton>
          </div>
        </template>
      </UCard>
    </div>
  </div>
</template>

<script setup>
const loading = ref(true)
const wishlists = ref([])

onMounted(async () => {
  try {
    const { data } = await useFetch('/api/wishlists')
    wishlists.value = data.value || []
  } catch (error) {
    console.error('Error fetching wishlists:', error)
  } finally {
    loading.value = false
  }
})
</script>
