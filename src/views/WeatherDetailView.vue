<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import { weatherCityList } from '@/data/weatherCities'
import { useConfigStore } from '@/stores/configStore'
import LifestyleRecommendationPanel from '@/components/exercise/LifestyleRecommendationPanel.vue'

const route = useRoute()
const configStore = useConfigStore()
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather'

const targetCityInfo = ref(null)
const selectedCityInfo = ref(null)
const isLoading = ref(false)
const apiNotice = ref('')

const displayTemp = computed(() => {
  if (!selectedCityInfo.value) return ''

  const rawTemp = selectedCityInfo.value.temp
  const temperature = configStore.unit === 'fahrenheit' ? Math.round((rawTemp * 9) / 5 + 32) : Math.round(rawTemp)
  return `${temperature}${configStore.unitSymbol}`
})

const displayFeelsLike = computed(() => {
  if (!selectedCityInfo.value) return ''

  const rawTemp = selectedCityInfo.value.feelsLike
  const temperature = configStore.unit === 'fahrenheit' ? Math.round((rawTemp * 9) / 5 + 32) : Math.round(rawTemp)
  return `${temperature}${configStore.unitSymbol}`
})

const handleFetchWeather = async () => {
  apiNotice.value = ''
  selectedCityInfo.value = null
  targetCityInfo.value = weatherCityList.find((city) => city.id === route.params.cityId) || null

  if (!targetCityInfo.value) return

  if (!API_KEY) {
    apiNotice.value = '.env 파일에 VITE_OPENWEATHER_API_KEY를 설정해 주세요.'
    return
  }

  isLoading.value = true
  apiNotice.value = ''

  try {
    const response = await axios.get(WEATHER_URL, {
      params: {
        lat: targetCityInfo.value.lat,
        lon: targetCityInfo.value.lon,
        appid: API_KEY,
        units: 'metric',
        lang: 'kr',
      },
    })
    const weatherData = response.data

    selectedCityInfo.value = {
      id: targetCityInfo.value.id,
      name: targetCityInfo.value.name,
      lat: targetCityInfo.value.lat,
      lon: targetCityInfo.value.lon,
      temp: weatherData.main.temp,
      status: weatherData.weather[0] ? weatherData.weather[0].description : '정보 없음',
      humidity: weatherData.main.humidity,
      wind: `${weatherData.wind.speed}m/s`,
      feelsLike: weatherData.main.feels_like,
      observation: new Date().toString(),
    }
    configStore.updateLastUpdated()
  } catch (error) {
    console.error('상세 날씨 API 호출 실패:', error)
    apiNotice.value = '상세 날씨를 가져오지 못했습니다. API 키와 네트워크 상태를 확인하세요.'
  } finally {
    isLoading.value = false
  }
}

onMounted(handleFetchWeather)
watch(() => route.params.cityId, handleFetchWeather)
</script>

<template>
  <div class="detail-page">
    <el-alert v-if="apiNotice" :title="apiNotice" type="error" show-icon :closable="false" />

    <el-skeleton v-if="isLoading" :rows="6" animated />
    <section v-else-if="selectedCityInfo" class="detail-view">
      <RouterLink class="detail-view__back" to="/">← 날씨 목록으로</RouterLink>

      <header class="detail-view__header">
        <div>
          <p class="detail-view__eyebrow">LOCAL WEATHER</p>
          <h1>{{ selectedCityInfo.name }} 상세 날씨</h1>
          <p>{{ selectedCityInfo.status }} · {{ selectedCityInfo.observation }} 관측</p>
          <el-tag type="success">OpenWeather Live Data</el-tag>
        </div>
        <strong>{{ displayTemp }}</strong>
      </header>

      <dl class="detail-view__metrics">
        <div>
          <dt>체감 온도</dt>
          <dd>{{ displayFeelsLike }}</dd>
        </div>
        <div>
          <dt>습도</dt>
          <dd>{{ selectedCityInfo.humidity }}%</dd>
        </div>
        <div>
          <dt>바람</dt>
          <dd>{{ selectedCityInfo.wind }}</dd>
        </div>
      </dl>

      <div class="detail-view__recommendations">
        <h2>{{ selectedCityInfo.name }} 날씨 맞춤 생활 추천</h2>
        <LifestyleRecommendationPanel :city="selectedCityInfo" />
      </div>
    </section>

    <section v-else-if="targetCityInfo" class="detail-view detail-view--empty">
      <h1>{{ targetCityInfo.name }} 날씨를 불러오지 못했습니다.</h1>
      <p>API 연결 상태를 확인한 후 다시 시도해 주세요.</p>
      <el-button type="primary" @click="handleFetchWeather">다시 불러오기</el-button>
      <RouterLink class="detail-view__back" to="/">날씨 목록으로 돌아가기</RouterLink>
    </section>

    <section v-else class="detail-view detail-view--empty">
      <h1>도시 정보를 찾을 수 없습니다.</h1>
      <p>요청한 도시 코드와 일치하는 날씨 데이터가 없습니다.</p>
      <RouterLink class="detail-view__back" to="/">날씨 목록으로 돌아가기</RouterLink>
    </section>
  </div>
</template>

<style scoped>
.detail-page {
  display: grid;
  gap: 1.25rem;
}

.detail-view {
  position: relative;
  overflow: hidden;
  border: 1px solid rgb(148 196 255 / 17%);
  border-radius: 1.6rem;
  background: linear-gradient(145deg, rgb(15 38 75 / 82%), rgb(12 24 53 / 78%));
  box-shadow:
    0 28px 70px rgb(0 8 28 / 40%),
    inset 0 1px rgb(255 255 255 / 7%);
  backdrop-filter: blur(24px);
}

.detail-view__back {
  display: inline-block;
  margin: 1.25rem 1.5rem 0;
  padding: 0.5rem 0.75rem;
  border: 1px solid rgb(125 211 252 / 16%);
  border-radius: 0.7rem;
  color: #7dd3fc;
  background: rgb(14 116 144 / 12%);
  font-weight: 750;
}

.detail-view__back:hover {
  color: #ffffff;
  background: rgb(14 165 233 / 24%);
  box-shadow: 0 0 24px rgb(56 189 248 / 13%);
}

.detail-view__header {
  position: relative;
  isolation: isolate;
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: space-between;
  margin: 1.25rem;
  padding: clamp(1.5rem, 5vw, 3rem);
  overflow: hidden;
  border: 1px solid rgb(255 255 255 / 18%);
  border-radius: 1.35rem;
  color: #ffffff;
  background:
    radial-gradient(circle at 90% 15%, rgb(253 224 71 / 32%), transparent 24%),
    linear-gradient(135deg, #1d4ed8, #0e7490 58%, #6d28d9);
  box-shadow:
    0 20px 50px rgb(1 15 45 / 35%),
    inset 0 1px rgb(255 255 255 / 17%);
}

.detail-view__header::before,
.detail-view__header::after {
  position: absolute;
  z-index: -1;
  border: 1px solid rgb(255 255 255 / 10%);
  border-radius: 50%;
  content: '';
}

.detail-view__header::before {
  top: -7rem;
  right: -4rem;
  width: 19rem;
  height: 19rem;
}

.detail-view__header::after {
  right: 5rem;
  bottom: -8rem;
  width: 15rem;
  height: 15rem;
  background: rgb(255 255 255 / 4%);
}

.detail-view__eyebrow {
  font-size: 0.75rem;
  font-weight: 850;
  letter-spacing: 0.22em;
  opacity: 0.9;
}

h1 {
  margin: 0.25rem 0;
  font-size: clamp(1.65rem, 5vw, 2.5rem);
  font-weight: 900;
  letter-spacing: -0.04em;
}

.detail-view__header > strong {
  font-size: clamp(2.5rem, 8vw, 4.5rem);
  font-weight: 900;
  letter-spacing: -0.06em;
  line-height: 1;
  text-shadow: 0 0 35px rgb(186 230 253 / 36%);
}

.detail-view__header :deep(.el-tag) {
  margin-top: 0.8rem;
}

.detail-view__metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  padding: 0 1.25rem 1.25rem;
}

.detail-view__metrics > div {
  position: relative;
  overflow: hidden;
  padding: 1.35rem;
  border: 1px solid rgb(125 211 252 / 14%);
  border-radius: 1rem;
  background: linear-gradient(145deg, rgb(30 64 175 / 17%), rgb(14 116 144 / 9%));
  box-shadow: inset 0 1px rgb(255 255 255 / 6%);
  transition:
    transform 200ms ease,
    border-color 200ms ease;
}

.detail-view__metrics > div:hover {
  border-color: rgb(103 232 249 / 34%);
  transform: translateY(-4px);
}

.detail-view__recommendations {
  padding: 0 1.25rem 1.25rem;
}

.detail-view__recommendations h2 {
  margin-bottom: 1rem;
  color: #f0f7ff;
  font-size: 1.25rem;
  font-weight: 850;
}

dt {
  color: #89a2c0;
  font-size: 0.85rem;
}

dd {
  margin-top: 0.2rem;
  color: #dff7ff;
  font-size: 1.2rem;
  font-weight: 800;
}

.detail-view--empty {
  padding: 3rem;
  text-align: center;
}

.detail-view--empty p {
  margin: 0.5rem 0 1.5rem;
  color: #91a7c4;
}

.detail-view--empty .detail-view__back {
  margin: 0;
}

@media (max-width: 600px) {
  .detail-view__header {
    align-items: flex-start;
    flex-direction: column;
  }

  .detail-view__metrics {
    grid-template-columns: 1fr;
  }
}

.detail-view {
  border-color: var(--ink-200);
  border-radius: 22px;
  background: #ffffff;
  box-shadow: 0 18px 42px rgb(13 28 80 / 8%);
  backdrop-filter: none;
}

.detail-view__back {
  border-color: var(--brand-200);
  border-radius: 999px;
  color: var(--brand-700);
  background: var(--brand-50);
}

.detail-view__back:hover {
  color: #ffffff;
  background: var(--brand-500);
  box-shadow: none;
}

.detail-view__header {
  border: 0;
  border-radius: 22px;
  background:
    radial-gradient(circle at 88% 20%, rgb(132 168 250 / 38%), transparent 18rem),
    linear-gradient(120deg, var(--brand-950), var(--brand-900) 60%, var(--brand-700));
  box-shadow: none;
}

.detail-view__header h1,
.detail-view__header > strong {
  font-weight: 700;
  text-shadow: none;
}

.detail-view__metrics > div {
  border-color: var(--ink-200);
  background: var(--ink-50);
  box-shadow: none;
}

.detail-view__metrics > div:hover {
  border-color: var(--brand-300);
}

.detail-view__recommendations h2 {
  color: var(--ink-900);
  font-weight: 700;
}

dt {
  color: var(--ink-500);
}

dd {
  color: var(--ink-900);
}

.detail-view--empty p {
  color: var(--ink-500);
}
</style>
