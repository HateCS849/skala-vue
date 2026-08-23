<script setup>
import { ref, watch } from 'vue'

const user = ref({
  name: '홍길동',
  age: 20,
})
const logDeep = ref('아직 반응 없음')
const logTarget = ref('아직 반응 없음')

watch(
  user,
  (newValue) => {
    logDeep.value = `[deep 감지] 현재 이름: ${newValue.name}, 나이: ${newValue.age}`
  },
  { deep: true },
)

watch(
  () => user.value.age,
  (newAge, oldAge) => {
    logTarget.value = `[타겟 감지] 나이가 ${oldAge}세에서 ${newAge}세로 변경됨!`
  },
)
</script>

<template>
  <div class="practice-section">
    <h2>ref 객체 Deep Watch</h2>
    <p>이름: {{ user.name }} / 나이: {{ user.age }}세</p>
    <button @click="user.name = '이순신'">이름만 변경</button>&nbsp;
    <button @click="user.age++">나이만 변경</button>
    <div class="monitor">
      <p>전체 감시: {{ logDeep }}</p>
      <p>나이 감시: {{ logTarget }}</p>
    </div>
  </div>
</template>
