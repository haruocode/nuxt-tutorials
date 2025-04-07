<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-4">
    <h1 class="text-2xl font-bold mb-4">マイ願いリスト</h1>

    <!-- 願いを入力するフォーム -->
    <form @submit.prevent="addWish" class="flex gap-2 mb-6">
      <input v-model="newWish" type="text" placeholder="願いを入力..." class="border px-4 py-2 rounded w-80" />
      <button type="submit" class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
        登録
      </button>
    </form>

    <!-- 願いリストの表示 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
      <div v-for="wish in wishes" :key="wish.id"
        class="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between">
        <div v-if="editingId === wish.id">
          <input v-model="editedTitle" class="border px-2 py-1 w-full mb-2" placeholder="願いを編集..." />
          <div class="flex gap-2 justify-end text-sm">
            <button @click="saveWish(wish.id)" class="text-green-500 hover:underline">
              保存
            </button>
            <button @click="cancelEdit" class="text-gray-500 hover:underline">
              キャンセル
            </button>
          </div>
        </div>

        <div v-else>
          <h2 class="text-xl font-semibold mb-2">{{ wish.title }}</h2>
          <div class="flex items-center gap-2 text-gray-600 text-sm">
            <span>♥ {{ wish.like }}</span>
            <button @click="likeWish(wish.id)" class="text-pink-500 hover:underline">
              いいね
            </button>
          </div>

          <div class="flex gap-4 mt-4 justify-end text-sm">
            <button @click="startEdit(wish)" class="text-blue-500 hover:underline">
              編集
            </button>
            <button @click="deleteWish(wish.id)" class="text-red-500 hover:underline">
              削除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const supabase = useSupabaseClient()
const router = useRouter()

const newWish = ref('')
const wishes = ref([])
const editingId = ref(null)
const editedTitle = ref('')

// ログアウト処理
const logout = async () => {
  await supabase.auth.signOut()
  router.push('/login')
}

// 願いを追加する関数
const addWish = async () => {
  if (!newWish.value.trim()) return

  const {
    data: { session },
    error
  } = await supabase.auth.getSession()

  if (error || !session) {
    console.error('セッション取得エラー', error)
    return
  }

  const response = await $fetch('/api/wishes', {
    method: 'POST',
    body: { title: newWish.value },
    headers: {
      Authorization: `Bearer ${session.access_token}`
    }
  })

  wishes.value.unshift(response)
  newWish.value = ''
}

const deleteWish = async (id) => {
  const {
    data: { session },
    error
  } = await supabase.auth.getSession()

  if (error || !session) {
    console.error('セッション取得エラー', error)
    return
  }

  await $fetch(`/api/wishes/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${session.access_token}`
    }
  })

  // 削除後はリストから消す
  wishes.value = wishes.value.filter(w => w.id !== id)
}

const startEdit = (wish) => {
  editingId.value = wish.id
  editedTitle.value = wish.title
}

const cancelEdit = () => {
  editingId.value = null
  editedTitle.value = ''
}

const saveWish = async (id) => {
  const {
    data: { session },
    error
  } = await supabase.auth.getSession()

  if (error || !session) {
    console.error('セッション取得エラー', error)
    return
  }

  const updated = await $fetch(`/api/wishes/${id}`, {
    method: 'PUT',
    body: { title: editedTitle.value },
    headers: {
      Authorization: `Bearer ${session.access_token}`
    }
  })

  // ローカルリストも更新する
  const index = wishes.value.findIndex(w => w.id === id)
  if (index !== -1) {
    wishes.value[index].title = updated.title
  }

  cancelEdit()
}

const likeWish = async (id) => {
  const {
    data: { session },
    error
  } = await supabase.auth.getSession()

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

  // ローカルリストを更新
  const index = wishes.value.findIndex(w => w.id === id)
  if (index !== -1) {
    wishes.value[index].like = updated.like
  }
}

onMounted(async () => {
  const {
    data: { session },
    error
  } = await supabase.auth.getSession()

  if (error || !session) {
    console.error('セッション取得エラー', error)
    navigateTo('/login')
    return
  }

  // 願いリスト取得処理はここに続く
  const response = await $fetch('/api/wishes', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${session.access_token}`
    }
  })

  wishes.value = response
})

</script>
