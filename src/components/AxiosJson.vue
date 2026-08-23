<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts'
const items = ref([])
const textInput = ref('')

const handleRead = async () => {
  try {
    const response = await axios.get(BASE_URL, { params: { _limit: 3 } })
    items.value = response.data
    console.log('GET 성공:', response.data)
  } catch (error) {
    console.log('GET 실패:', error)
  }
}

const handleCreate = async () => {
  if (!textInput.value) return

  try {
    const response = await axios.post(BASE_URL, {
      title: textInput.value,
      body: '새로 생성한 게시글입니다.',
      userId: 1,
    })
    items.value.push(response.data)
    textInput.value = ''
    console.log('POST 성공:', response.data)
  } catch (error) {
    console.log('POST 실패:', error)
  }
}

const handleUpdate = async (item) => {
  try {
    const response = await axios.patch(`${BASE_URL}/${item.id}`, {
      title: item.title + ' 수정됨',
    })
    item.title = response.data.title
    console.log('PATCH 성공:', response.data)
  } catch (error) {
    console.log('PATCH 실패:', error)
  }
}

const handleDelete = async (itemId) => {
  try {
    await axios.delete(`${BASE_URL}/${itemId}`)
    items.value = items.value.filter((item) => item.id !== itemId)
    console.log('DELETE 성공:', itemId)
  } catch (error) {
    console.log('DELETE 실패:', error)
  }
}

onMounted(handleRead)
</script>

<template>
  <div class="practice-section">
    <h2>Axios REST API CRUD</h2>
    <input v-model.trim="textInput" type="text" placeholder="새 게시글 제목" />
    <button :disabled="!textInput" @click="handleCreate">게시글 생성</button>
    <button @click="handleRead">게시글 조회</button>
    <ul>
      <li v-for="item in items" :key="item.id">
        <strong>{{ item.title }}</strong>
        <button @click="handleUpdate(item)">수정</button>
        <button @click="handleDelete(item.id)">삭제</button>
      </li>
    </ul>
  </div>
</template>
