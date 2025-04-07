<template>
  <div class="flex flex-col items-center min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
    <h1 class="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">みんなの願いリスト</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
      <div v-for="wish in wishes" :key="wish.id" class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col justify-between">
        <h2 class="text-xl font-semibold mb-2">{{ wish.title }}</h2>
        <div class="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-sm">
          <span>♥ {{ wish.like }}</span>
          <button @click="likeWish(wish.id)" class="text-pink-500 hover:underline">
            いいね
          </button>
        </div>
      </div>
    </div>

    <div v-if="loading" class="my-6 text-gray-500 dark:text-gray-400">
      読み込み中...
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter()

const wishes = ref([])
const loading = ref(false)
const limit = 10
let offset = 0
let finished = false

const likeWish = async (id) => {
  const {
    data: { session },
    error
  } = await useSupabaseClient().auth.getSession()

  if (error || !session) {
    console.error('セッション取得エラー', error)
    return
  }

  const updated = await $fetch(`/api/wishes/${id}/like`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${session.access_token}`
    }
  })

  const index = wishes.value.findIndex(w => w.id === id)
  if (index !== -1) {
    wishes.value[index].like = updated.like
  }
}

// 初回ロード
onMounted(() => {
  loadMore()

  // スクロール監視
  window.addEventListener('scroll', handleScroll)
})

const loadMore = async () => {
  if (loading.value || finished) return

  loading.value = true
  const response = await $fetch('/api/wishes/public', {
    params: {
      limit,
      offset,
    }
  })

  if (response.length === 0) {
    finished = true
  } else {
    wishes.value.push(...response)
    offset += limit
  }

  loading.value = false
}

const handleScroll = () => {
  const bottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100
  if (bottom) {
    loadMore()
  }
}
</script>
