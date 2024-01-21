<template>
  <div class="bg-gray-900 p-3">
    <AppHeader />
    <ContentsContainer>
      <FormContainer title="ユーザー登録">
        <div class="row">
          <label>名前</label>
          <input type="text" placeholder="名前" />
        </div>

        <div class="row">
          <label>生年月日</label>
          <select>
            <option value="">-</option>
          </select><span>年</span>
          <select>
            <option value="">-</option>
          </select><span>月</span>
          <select>
            <option value="">-</option>
          </select><span>日</span>
        </div>

        <div class="row">
          <label>性別</label>
          <input type="radio" name="gender" value="male" /><span> 男性👨‍⚕️</span> <input type="radio" name="gender" value="female" /><span> 女性👱‍♀️</span>
        </div>

        <div class="row">
          <label>趣味</label>
          <div class="occupation">
            <div><input type="checkbox" value="音楽" /><label class="checkbox-label"> 音楽</label></div>
            <div><input type="checkbox" value="映画" /><label class="checkbox-label"> 映画</label></div>
            <div><input type="checkbox" value="ドラマ" /><label class="checkbox-label"> ドラマ</label></div>
            <div><input type="checkbox" value="スポーツ" /><label class="checkbox-label"> スポーツ</label></div>
            <div><input type="checkbox" value="裁縫" /><label class="checkbox-label"> 裁縫</label></div>
            <div><input type="checkbox" value="演劇" /><label class="checkbox-label"> 演劇</label></div>
            <div><input type="checkbox" value="読書" /><label class="checkbox-label"> 読書</label></div>
            <div><input type="checkbox" value="旅行" /><label class="checkbox-label"> 旅行</label></div>
          </div>
        </div>

        <div class="row">
          <label>自己紹介</label>
          <textarea rows="5" placeholder="ポン吉って呼んでください。よろしくお願いします！"></textarea>
          <input type="checkbox" /><label class="checkbox-label"> 自己紹介を公開する</label>
        </div>

      </FormContainer>

      <FormContainer title="ユーザー登録">
        <label>名前</label>
        <div class="label">{{ user.name }}</div>

        <label>生年月日</label>
        <div class="label">{{ birth }}</div>

        <label>性別</label>
        <div class="label">{{ userGender }}</div>

        <label>趣味</label>
        <div class="label">{{ occupations }}</div>

        <label>自己紹介</label>
        <div class="label whitespace-pre">{{ user.detail }}</div>

        <div v-if="user.public" class="label">※ あなたの自己紹介は公開されます。</div>

        <button @click="register()" type="button" class="w-full text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
          登録
        </button>

      </FormContainer>
    </ContentsContainer>
  </div>
</template>

<script setup>

const user = reactive({
  name: '',
  birthYear: '',
  birthMonth: '',
  birthDate: '',
  gender: '',
  hobbies: [],
  detail: '',
  public: false,
})

const yearOptions = ref([])
const monthOptions = ref([])
const dateOptions = ref([])

const hobbies = ref(['音楽', '映画', 'ドラマ', 'スポーツ', '裁縫', '演劇', '読書', '旅行'])

const birth = computed(() => {
  if(!user.birthYear || !user.birthMonth || !user.birthDate) return ''
  return `${user.birthYear}年${user.birthMonth}月${user.birthDate}日`
})

const userGender = computed(() => {
  if(user.gender === 'male') return '男性'
  if(user.gender === 'female') return '女性'
  return ''
})

const occupations = computed(() => {
  return user.hobbies.join(' / ')
})

function register() {
  // 本来はユーザー登録のWeb APIを実行する
  console.log('登録ボタンが押下されました', toRaw(user))
}

onMounted(() => {
  // 選択リストの「年」の設定
  let years = []
  for(let i = 1940; i <= 2024; i++) {
    years.push(i)
  }
  yearOptions.value = years
  // 選択リストの「月」の設定
  let months = []
  for(let i = 1; i <= 12; i++) {
    months.push(i)
  }
  monthOptions.value = months
  // 選択リストの「日」の設定
  let dates = []
  for(let i = 1; i <= 31; i++) {
    dates.push(i)
  }
  dateOptions.value = dates
})

</script>

<style scoped>
h2, p, span, label {
  color: white;
}
label {
  display: block;
  font-size: 12px;
}
.label {
  min-height: 24px;
  color: white;
}
hr {
  margin: 8px;
}
input[type="text"], textarea {
  width: 100%;
}
textarea {
  padding: 6px;
}
.row {
  margin: 8px auto;
}
input[type="checkbox"] {
  vertical-align: middle;
}
.checkbox-label {
  display: inline;
}
.occupation {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}
</style>
