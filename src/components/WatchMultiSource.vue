<script setup>
import { ref, watch } from 'vue'

const city = ref('서울')
const dateType = ref('오늘')
const apiStatus = ref('대기 중...')

watch([city, dateType], ([newCity, newDate], [oldCity, oldDate]) => {
  apiStatus.value = `[변경 감지] ${oldCity}(${oldDate}) ➡️ ${newCity}(${newDate})`
  console.log(`[통합 API 호출] ${newCity}의 ${newDate} 날씨를 불러옵니다...`)
})
</script>

<template>
  <div class="practice-section">
    <h2>여러 개의 변수 동시 감시</h2>
    <label>
      도시:
      <select v-model="city">
        <option value="서울">서울</option>
        <option value="수원">수원</option>
        <option value="부산">부산</option>
      </select>
    </label>
    <label><input v-model="dateType" type="radio" value="오늘" /> 오늘</label>&nbsp;
    <label><input v-model="dateType" type="radio" value="내일" /> 내일</label>&nbsp;
    <label><input v-model="dateType" type="radio" value="주간예보" /> 주간예보</label>
    <div class="monitor">
      <h3>통합 모니터링 로그</h3>
      <p>현재 상태: {{ apiStatus }}</p>
    </div>
  </div>
</template>
