<script setup>
import { ref, watchEffect } from 'vue'

const username = ref('홍길동')
const age = ref(20)
const logMessage = ref('대기 중...')

watchEffect(() => {
  logMessage.value = `[자동 감지] 이름: ${username.value} / 나이: ${age.value}세`
  console.log('watchEffect가 내부 변수 변경을 감지하여 실행되었습니다.')
})
</script>

<template>
  <div class="practice-section">
    <h2>자동 감시자 watchEffect()</h2>
    <p>이름: {{ username }} / 나이: {{ age }}세</p>
    <button @click="username = '이순신'">이름 변경</button>&nbsp;
    <button @click="age++">나이 한 살 추가</button>
    <div class="monitor">
      <p>{{ logMessage }}</p>
    </div>
  </div>
</template>
