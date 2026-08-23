<script setup>
import { ref } from 'vue'
import axios from 'axios'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather'
const weatherData = ref(null)
const isLoading = ref(false)

const handleFetchWeather = async () => {
  if (!API_KEY) {
    window.alert('.env 파일에 VITE_OPENWEATHER_API_KEY를 설정해 주세요.')
    return
  }

  isLoading.value = true

  try {
    const response = await axios.get(WEATHER_URL, {
      params: {
        lat: 35.158582,
        lon: 126.804975,
        appid: API_KEY,
        units: 'metric',
        lang: 'kr',
      },
    })
    weatherData.value = response.data
    console.log('Axios 통신 응답:', response.data)
  } catch (error) {
    console.log('통신 중 에러가 발생했습니다:', error)
    window.alert('날씨 데이터를 가져오지 못했습니다.')
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="practice-section">
    <h2>Axios 날씨 API 통신</h2>
    <button :disabled="isLoading" @click="handleFetchWeather">
      {{ isLoading ? '데이터 로딩 중...' : '실시간 날씨 데이터 가져오기' }}
    </button>
    <div v-if="weatherData" class="result-card">
      <p>위치: {{ weatherData.name }}</p>
      <p>현재 기온: {{ weatherData.main.temp }}°C</p>
      <p>날씨 상태: {{ weatherData.weather[0].description }}</p>
      <p>습도: {{ weatherData.main.humidity }}%</p>
    </div>
    <p v-else>아직 가져온 데이터가 없습니다.</p>
  </div>
</template>
