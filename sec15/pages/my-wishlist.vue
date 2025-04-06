<template>
  <div>
    <div v-if="loading" class="flex justify-center py-12">
      <UIcon name="i-heroicons-arrow-path" class="animate-spin h-8 w-8 text-indigo-600" />
    </div>

    <div v-else-if="!user">
      <UAlert
        title="ログインが必要です"
        description="願いリストを表示するにはログインしてください"
        color="amber"
        class="mb-4"
      />
      <UButton to="/login" color="indigo">ログインする</UButton>
    </div>

    <div v-else>
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">マイ願いリスト</h1>

        <div class="flex items-center gap-4">
          <USwitch v-model="wishlist.isPublic" @change="updateVisibility">
            公開する
          </USwitch>

          <UButton v-if="shareUrl" color="indigo" @click="copyShareUrl">
            <template #leading>
              <UIcon name="i-heroicons-share" />
            </template>
            共有リンク
          </UButton>
        </div>
      </div>

      <div class="mb-8">
        <UInput
          v-model="wishlist.title"
          placeholder="リストのタイトル"
          class="text-xl font-semibold mb-2"
          @blur="updateTitle"
        />
      </div>

      <div class="mb-6">
        <h2 class="text-lg font-semibold mb-3">新しい願いを追加</h2>
        <form @submit.prevent="addWish" class="flex gap-2">
          <UInput v-model="newWish" placeholder="新しい願いを入力..." class="flex-1" />
          <UButton type="submit" color="indigo" :disabled="!newWish.trim()">追加</UButton>
        </form>
      </div>

      <div class="bg-white rounded-lg shadow p-4">
        <div v-if="wishes.length === 0" class="text-center py-8 text-gray-500">
          まだ願いがありません。新しい願いを追加しましょう。
        </div>

        <UCard v-for="wish in wishes" :key="wish.id" class="mb-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <UCheckbox
                v-model="wish.granted"
                :disabled="!isEditing(wish.id)"
                @change="updateWishStatus(wish)"
              />
              <div :class="{ 'line-through text-gray-400': wish.granted }">
                <UInput
                  v-if="isEditing(wish.id)"
                  v-model="wish.title"
                  class="font-medium"
                  @blur="updateWish(wish)"
                />
                <span v-else class="font-medium">{{ wish.title }}</span>
              </div>
            </div>

            <div class="flex gap-2">
              <UButton
                v-if="isEditing(wish.id)"
                color="indigo"
                variant="ghost"
                icon="i-heroicons-check"
                @click="updateWish(wish)"
              />
              <UButton
                v-else
                color="gray"
                variant="ghost"
                icon="i-heroicons-pencil"
                @click="startEditing(wish.id)"
              />
              <UButton
                color="red"
                variant="ghost"
                icon="i-heroicons-trash"
                @click="deleteWish(wish.id)"
              />
            </div>
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>

<script setup>
const user = useSupabaseUser()
const loading = ref(true)
const wishlist = ref({ id: null, title: '', isPublic: true })
const wishes = ref([])
const newWish = ref('')
const shareUrl = computed(() => wishlist.value.id ? `${useRuntimeConfig().public.siteUrl}/wishlist/${wishlist.value.id}` : null)
const editingWishId = ref(null)

onMounted(async () => {
  if (user.value) {
    await fetchWishlist()
  }
  loading.value = false
})

async function fetchWishlist() {
  try {
    // ユーザーのwishlistを取得
    const { data: userData } = await useFetch(`/api/user/${user.value.id}/wishlist`)
    if (userData.value) {
      wishlist.value = userData.value
      await fetchWishes()
    }
  } catch (error) {
    console.error('Error fetching wishlist:', error)
  }
}

async function fetchWishes() {
  try {
    const { data } = await useFetch(`/api/wishes/${wishlist.value.id}`)
    wishes.value = data.value || []
  } catch (error) {
    console.error('Error fetching wishes:', error)
  }
}

async function addWish() {
  if (!newWish.value.trim()) return

  try {
    const { data } = await useFetch('/api/wish', {
      method: 'POST',
      body: {
        wishlistId: wishlist.value.id,
        title: newWish.value.trim(),
      }
    })

    if (data.value) {
      wishes.value.push(data.value)
      newWish.value = ''
    }
  } catch (error) {
    console.error('Error adding wish:', error)
  }
}

async function updateWish(wish) {
  try {
    await useFetch(`/api/wish/${wish.id}`, {
      method: 'PUT',
      body: {
        title: wish.title,
        granted: wish.granted ? 1 : 0
      }
    })
    editingWishId.value = null
  } catch (error) {
    console.error('Error updating wish:', error)
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
  } catch (error) {
    console.error('Error updating wish status:', error)
  }
}

async function deleteWish(id) {
  try {
    await useFetch(`/api/wish/${id}`, {
      method: 'DELETE'
    })
    wishes.value = wishes.value.filter(wish => wish.id !== id)
  } catch (error) {
    console.error('Error deleting wish:', error)
  }
}

async function updateTitle() {
  try {
    await useFetch(`/api/wishlist/${wishlist.value.id}`, {
      method: 'PUT',
      body: {
        title: wishlist.value.title
      }
    })
  } catch (error) {
    console.error('Error updating wishlist title:', error)
  }
}

async function updateVisibility() {
  try {
    await useFetch(`/api/wishlist/${wishlist.value.id}/visibility`, {
      method: 'PUT',
      body: {
        isPublic: wishlist.value.isPublic
      }
    })
  } catch (error) {
    console.error('Error updating wishlist visibility:', error)
  }
}

function copyShareUrl() {
  navigator.clipboard.writeText(shareUrl.value)
}

function isEditing(wishId) {
  return editingWishId.value === wishId
}

function startEditing(wishId) {
  editingWishId.value = wishId
}
</script>
