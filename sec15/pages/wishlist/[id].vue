<template>
  <div>
    <div v-if="loading" class="flex justify-center py-12">
      <UIcon name="i-heroicons-arrow-path" class="animate-spin h-8 w-8 text-indigo-600" />
    </div>

    <div v-else-if="error">
      <UAlert
        title="エラーが発生しました"
        :description="error"
        color="red"
        class="mb-4"
      />
      <UButton to="/wishlists" color="indigo">願いリスト一覧に戻る</UButton>
    </div>

    <div v-else>
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="text-2xl font-bold">{{ wishlist.title }}</h1>
        </div>

        <UButton to="/wishlists" color="gray" variant="ghost">
          <template #leading>
            <UIcon name="i-heroicons-arrow-left" />
          </template>
          戻る
        </UButton>
      </div>

      <div class="bg-white rounded-lg shadow p-4">
        <div v-if="wishes.length === 0" class="text-center py-8 text-gray-500">
          まだ願いがありません。
        </div>

        <UCard v-for="wish in wishes" :key="wish.id" class="mb-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <UCheckbox
                v-model="wish.granted"
                @change="updateWishStatus(wish)"
              />
              <div :class="{ 'line-through text-gray-400': wish.granted }">
                <span class="font-medium">{{ wish.title }}</span>
              </div>
            </div>

            <UBadge v-if="wish.granted" color="green">
              <template #leading>
                <UIcon name="i-heroicons-check" />
              </template>
              叶った願い
            </UBadge>
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const loading = ref(true)
const error = ref(null)
const wishlist = ref({ id: null, title: '' })
const wishes = ref([])
const user = useSupabaseUser()

onMounted(async () => {
  await fetchData()
})

async function fetchData() {
  try {
    const id = route.params.id

    // wishlistデータを取得
    const { data: wishlistData, error: wishlistError } = await useFetch(`/api/wishlist/${id}`)

    if (wishlistError.value) {
      error.value = '願いリストの取得に失敗しました'
      loading.value = false
      return
    }

    if (!wishlistData.value) {
      error.value = '願いリストが見つかりません'
      loading.value = false
      return
    }

    wishlist.value = wishlistData.value

    // wishesデータを取得
    const { data: wishesData, error: wishesError } = await useFetch(`/api/wishes/${id}`)

    if (wishesError.value) {
      error.value = '願いデータの取得に失敗しました'
    } else {
      wishes.value = wishesData.value || []
    }
  } catch (e) {
    error.value = 'エラーが発生しました'
    console.error('Error fetching wishlist data:', e)
  } finally {
    loading.value = false
  }
}

async function updateWishStatus(wish) {
  try {
    await useFetch(`/api/wish/${wish.id}`, {
      method: 'PUT',
      body: {
        title: wish.title,
        granted: wish.granted ? 1 : 0
      }
    })
  } catch (e) {
    console.error('Error updating wish status:', e)
  }
}
</script>
