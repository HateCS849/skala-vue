<script setup>
import { ref } from 'vue'

const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름' },
])

const searchTerm = ref('')

const selectedCity = ref('')

const getFilteredList = () => {
  return weatherList.value.filter((city) => city.name.includes(searchTerm.value))
}

const selectCity = (name) => {
  selectedCity.value = name
}

const showDetail = (cityName, status) => {
  window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}
</script>

<template>
  <div class="subject-section">
    <h2>🌤️ 과제 1: 날씨 (Mockup)</h2>
    <h3>🔍 도시 검색</h3>
    <input
      type="text"
      :value="searchTerm"
      @input="searchTerm = $event.target.value"
      placeholder="검색할 도시 이름 입력"
    />
    <p>검색 중인 도시: {{ searchTerm }}</p>

    <h3>📍 지역별 날씨 현황</h3>
    <div v-for="city in getFilteredList()" :key="city.id" @click="selectCity(city.name)">
      <p>{{ city.name }} ({{ city.status }})</p>
      <p>현재 기온: {{ city.temp }}°C</p>

      <p v-if="city.temp >= 25" style="color: red; font-weight: bold">🔥 더움 (25도 이상)</p>
      <p v-else style="color: blue">❄️ 선선함 (25도 미만)</p>

      <button @click.stop="showDetail(city.name, city.status)">상세보기</button>
    </div>

    <p v-if="selectedCity">{{ selectedCity }}이 선택되었습니다.</p>
    <p v-else>카드를 클릭하거나 검색해 보세요.</p>
  </div>
</template>
