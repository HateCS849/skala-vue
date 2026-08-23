<script setup>
import { ref, computed, watch, watchEffect } from 'vue'

const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름' },
])

const searchQuery = ref('')
const selectedCityInfo = ref('카드를 클릭하거나 검색해 보세요.')

const filteredWeatherList = computed(() => {
  return weatherList.value.filter((city) => city.name.includes(searchQuery.value))
})

watch(selectedCityInfo, (newValue, oldValue) => {
  console.log(`📍 상태바 변경 감지! [${oldValue}] ➡️ [${newValue}]`)
})

watchEffect(() => {
  console.log(`🔍 도시 검색어 변경 감지: "${searchQuery.value}"`)
})

const searchCount = ref(0)

const resultCountMessage = computed(() => {
  return `검색 결과: ${filteredWeatherList.value.length}건`
})

watch(filteredWeatherList, () => {
  searchCount.value++
  console.log(`🧮 검색 결과 변경 횟수: ${searchCount.value}회`)
})

const selectCity = (city) => {
  selectedCityInfo.value = `${city.name}이(가) 선택되었습니다. (현재 기온: ${city.temp}°C)`
}

const showDetail = (cityName, status) => {
  window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}
</script>

<template>
  <div class="subject-section">
    <h2>🌤️ 과제 2: 날씨 (Composition)</h2>
    <h3>🔍 도시 검색</h3>
    <input type="text" v-model="searchQuery" placeholder="검색할 도시 이름 입력" />
    <p>검색 중인 도시: {{ searchQuery }}</p>
    <p>{{ resultCountMessage }} (검색 결과 변경 횟수: {{ searchCount }})</p>

    <h3>📍 지역별 날씨 현황</h3>

    <div v-if="filteredWeatherList.length > 0">
      <div v-for="city in filteredWeatherList" :key="city.id" @click="selectCity(city)">
        <p>{{ city.name }} ({{ city.status }})</p>
        <p>현재 기온: {{ city.temp }}°C</p>

        <p v-if="city.temp >= 25" style="color: red; font-weight: bold">🔥 더움 (25도 이상)</p>
        <p v-else style="color: blue">❄️ 선선함 (25도 미만)</p>

        <button @click.stop="showDetail(city.name, city.status)">상세보기</button>
      </div>
    </div>

    <p v-else>🚫 검색 결과가 일치하는 도시가 없습니다.</p>

    <p>{{ selectedCityInfo }}</p>
  </div>
</template>
