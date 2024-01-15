<template>
  <div class="bg-gray-900 p-3">
    <AppHeader />
    <ContentsContainer>
      <FormContainer title="フォームバインディング">

        <h2>テキストフォーム</h2>
        <p>textMessage is: {{ textMessage }}</p>
        <input placeholder="edit me" />

        <hr />

        <h2>複数行テキスト(textarea)</h2>
        <span>textareaMessage is:</span>
        <p style="white-space: pre-line;">{{ textareaMessage }}</p>
        <textarea placeholder="add multiple lines"></textarea>

        <hr />

        <h2>チェックボックス</h2>
        <input type="checkbox" />
        <p>checked is: {{ checked }}</p>

        <hr />

        <h2>複数チェックボックス</h2>
        <p>CheckedNames is: {{ checkedNames }}</p>

        <input type="checkbox" value="吉田">
        <label for="吉田">吉田</label><br/>

        <input type="checkbox" value="山田">
        <label for="山田">山田</label><br/>

        <input type="checkbox" value="鈴木">
        <label for="鈴木">鈴木</label>

        <hr />

        <h2>ラジオボタン</h2>
        <p>radioPicked is: {{ radioPicked }}</p>

        <input type="radio" value="apple" />
        <label> 🍎</label><br/>

        <input type="radio" value="orange" />
        <label> 🍊</label>

        <hr />

        <h2>選択リスト</h2>
        <p>selectPicked is: {{ selectPicked }}</p>

        <select>
          <option value="">選択してください</option>
          <option value="りんご🍎">りんご🍎</option>
          <option value="みかん🍊">みかん🍊</option>
          <option value="パイナップル🍍">パイナップル🍍</option>
          <option value="ぶどう🍇">ぶどう🍇</option>
          <option value="キウイ🥝">キウイ🥝</option>
        </select>

      </FormContainer>
    </ContentsContainer>
  </div>
</template>

<script setup>

const textMessage = ref('') // テキスト入力
const textareaMessage = ref('') // テキストエリア
const checked = ref(null) // チェックボックス
const checkedNames = ref([]) // 複数チェックボックス
const radioPicked = ref('') // ラジオボタン
const selectPicked = ref('') // 選択リスト

</script>

<style>
h2, p, span, label {
  color: white;
}
hr {
  margin: 8px;
}
</style>
