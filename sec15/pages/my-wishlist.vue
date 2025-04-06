<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-4">
    <h1 class="text-2xl font-bold mb-4">マイ願いリスト</h1>

    <!-- 願いを入力するフォーム -->
    <form @submit.prevent="addWish" class="flex gap-2 mb-6">
      <input
        v-model="newWish"
        type="text"
        placeholder="願いを入力..."
        class="border px-4 py-2 rounded w-80"
      />
      <button
        type="submit"
        class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        登録
      </button>
    </form>

    <!-- 願いリストの表示 -->
    <div v-if="wishes.length > 0" class="flex flex-col gap-2 w-80">
      <div v-for="wish in wishes" :key="wish.id" class="flex justify-between items-center border px-4 py-2 rounded">
        <div v-if="editingId === wish.id" class="flex gap-2 w-full">
          <input
            v-model="editedTitle"
            class="border px-2 py-1 flex-1"
          />
          <button @click="saveWish(wish.id)" class="text-green-500 hover:underline">
            保存
          </button>
          <button @click="cancelEdit" class="text-gray-500 hover:underline">
            キャンセル
          </button>
        </div>
        <div v-else class="flex justify-between w-full">
          <span>{{ wish.title }}</span>
          <div class="flex gap-2">
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
    <div v-else class="text-gray-500">まだ願いはありません。</div>

    <!-- ログアウトボタン -->
    <button
      @click="logout"
      class="mt-10 bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
    >
      ログアウト
    </button>
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

onMounted(async () => {
  const {
    data: { session },
    error
  } = await supabase.auth.getSession()

  if (error || !session) {
    console.error('セッション取得エラー', error)
    return
  }

  // 願いリストを取得
  const response = await $fetch('/api/wishes', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${session.access_token}`
    }
  })

  wishes.value = response
})

</script>
