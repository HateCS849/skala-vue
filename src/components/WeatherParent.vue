<script setup>
import { computed, onMounted, ref, watch, watchEffect } from 'vue'
import axios from 'axios'
import { weatherCityList } from '@/data/weatherCities'
import { useConfigStore } from '@/stores/configStore'
import BaseDashboardCard from './exercise/BaseDashboardCard.vue'
import ForecastPreview from './exercise/ForecastPreview.vue'
import LifestyleRecommendationPanel from './exercise/LifestyleRecommendationPanel.vue'
import SearchBar from './exercise/SearchBar.vue'
import WeatherCard from './exercise/WeatherCard.vue'

const emit = defineEmits(['click-detail'])
const configStore = useConfigStore()
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather'
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast'
const INITIAL_CITY_COUNT = 10
const CITY_LOAD_COUNT = 10

const weatherList = ref([])
const searchQuery = ref('')
const selectedCityInfo = ref(null)
const searchCount = ref(0)
const visibleCityCount = ref(INITIAL_CITY_COUNT)
const loadingCityIdList = ref([])
const apiNotice = ref('')
const forecastList = ref([])
const isForecastLoading = ref(false)

const isLoading = computed(() => loadingCityIdList.value.length > 0)

const visibleCityList = computed(() => {
  return weatherCityList.slice(0, visibleCityCount.value)
})

const searchedCityList = computed(() => {
  const normalizedQuery = searchQuery.value.trim()

  if (!normalizedQuery) return visibleCityList.value

  return weatherCityList.filter((city) => city.name.includes(normalizedQuery))
})

const filteredWeatherList = computed(() => {
  return searchedCityList.value
    .map((city) => weatherList.value.find((weather) => weather.id === city.id))
    .filter((city) => city)
})

const resultCountMessage = computed(() => {
  return `검색 결과: ${filteredWeatherList.value.length}건 · 등록 지역: ${weatherCityList.length}곳`
})

const visibleCityMessage = computed(() => {
  return `현재 ${visibleCityCount.value}곳까지 표시`
})

const hasMoreCities = computed(() => {
  return visibleCityCount.value < weatherCityList.length
})

const selectedCityMessage = computed(() => {
  if (!selectedCityInfo.value) return '카드를 클릭하거나 검색해 보세요.'

  const city = selectedCityInfo.value
  return `${city.name}이(가) 선택되었습니다. (현재 기온: ${formatTemperature(city.temp)})`
})

watch(selectedCityInfo, (newCity, oldCity) => {
  const oldName = oldCity ? oldCity.name : '선택 없음'
  const newName = newCity ? newCity.name : '선택 없음'
  console.log(`상태바 변경 감지! [${oldName}] ➡️ [${newName}]`)
})

watchEffect(() => {
  console.log(`도시 검색어 변경 감지: "${searchQuery.value}"`)
})

watch(filteredWeatherList, () => {
  searchCount.value++
  console.log(`검색 결과 변경 횟수: ${searchCount.value}회`)
})

const handleUpdateQuery = (query) => {
  searchQuery.value = query

  const normalizedQuery = query.trim()

  if (!normalizedQuery) return

  const targetCityList = weatherCityList.filter((city) => city.name.includes(normalizedQuery))
  handleFetchWeather(targetCityList, false)
}

const handleSelectCard = (city) => {
  selectedCityInfo.value = city
  handleFetchForecast(city)
}

const formatTemperature = (temperature) => {
  const value = configStore.unit === 'celsius' ? Math.round(temperature) : Math.round((temperature * 9) / 5 + 32)
  return `${value}${configStore.unitSymbol}`
}

const handleClickDetail = (cityId) => {
  emit('click-detail', cityId)
}

const handleFetchWeather = async (targetCityList, isRefresh) => {
  if (!API_KEY) {
    apiNotice.value = '.env 파일에 VITE_OPENWEATHER_API_KEY를 설정해 주세요.'
    return
  }

  const requestCityList = targetCityList.filter((city) => {
    const isLoaded = weatherList.value.find((weather) => weather.id === city.id)
    const isCityLoading = loadingCityIdList.value.includes(city.id)
    return !isCityLoading && (isRefresh || !isLoaded)
  })

  if (!requestCityList.length) return

  loadingCityIdList.value = loadingCityIdList.value.concat(requestCityList.map((city) => city.id))
  apiNotice.value = ''

  try {
    const weatherRequestList = requestCityList.map((city) => {
      return axios.get(WEATHER_URL, {
        params: {
          lat: city.lat,
          lon: city.lon,
          appid: API_KEY,
          units: 'metric',
          lang: 'kr',
        },
      })
    })
    const weatherResponseList = await axios.all(weatherRequestList)

    const fetchedWeatherList = weatherResponseList.map((response, index) => {
      const city = requestCityList[index]
      const weatherData = response.data

      return {
        id: city.id,
        name: city.name,
        lat: city.lat,
        lon: city.lon,
        temp: weatherData.main.temp,
        status: weatherData.weather[0] ? weatherData.weather[0].description : '정보 없음',
        humidity: weatherData.main.humidity,
        windSpeed: weatherData.wind.speed,
        feelsLike: weatherData.main.feels_like,
      }
    })

    weatherList.value = weatherList.value
      .filter((weather) => !fetchedWeatherList.find((fetchedWeather) => fetchedWeather.id === weather.id))
      .concat(fetchedWeatherList)
    configStore.updateLastUpdated()
  } catch (error) {
    console.error('현재 날씨 API 호출 실패:', error)
    apiNotice.value = '실시간 날씨를 가져오지 못했습니다. API 키와 네트워크 상태를 확인하세요.'
  } finally {
    loadingCityIdList.value = loadingCityIdList.value.filter(
      (cityId) => !requestCityList.find((city) => city.id === cityId),
    )
  }
}

const handleRefreshWeather = () => {
  const loadedCityList = weatherCityList.filter((city) => {
    return weatherList.value.find((weather) => weather.id === city.id)
  })
  const targetCityList = loadedCityList.length ? loadedCityList : visibleCityList.value
  handleFetchWeather(targetCityList, true)
}

const handleLoadMore = () => {
  const oldVisibleCityCount = visibleCityCount.value
  const nextVisibleCityCount = visibleCityCount.value + CITY_LOAD_COUNT

  visibleCityCount.value = nextVisibleCityCount > weatherCityList.length ? weatherCityList.length : nextVisibleCityCount

  const nextCityList = weatherCityList.slice(oldVisibleCityCount, visibleCityCount.value)
  handleFetchWeather(nextCityList, false)
}

const handleFetchForecast = async (city) => {
  forecastList.value = []

  if (!API_KEY) return

  isForecastLoading.value = true

  try {
    const response = await axios.get(FORECAST_URL, {
      params: {
        lat: city.lat,
        lon: city.lon,
        appid: API_KEY,
        units: 'metric',
        lang: 'kr',
      },
    })

    forecastList.value = response.data.list.slice(0, 5).map((forecast) => {
      return {
        dateTime: forecast.dt_txt,
        temp: forecast.main.temp,
        status: forecast.weather[0] ? forecast.weather[0].description : '정보 없음',
      }
    })
  } catch (error) {
    console.error('단기 예보 API 호출 실패:', error)
    apiNotice.value = '단기 예보를 가져오지 못했습니다. 잠시 후 다시 시도하세요.'
  } finally {
    isForecastLoading.value = false
  }
}

onMounted(() => {
  handleFetchWeather(visibleCityList.value, false)
})
</script>

<template>
  <div class="weather-dashboard">
    <header class="weather-dashboard__header">
      <div>
        <h1>날씨의 모든 것</h1>
        <p>여러분의 도시를 검색해보세요.</p>
      </div>
      <div class="weather-dashboard__actions">
        <el-tag type="success">OpenWeather Live Data</el-tag>
        <el-button :loading="isLoading" @click="handleRefreshWeather">날씨 새로고침</el-button>
      </div>
    </header>

    <el-alert v-if="apiNotice" :title="apiNotice" type="error" show-icon :closable="false" />

    <BaseDashboardCard title="도시 검색" icon="🔍">
      <SearchBar :search-query="searchQuery" :city-list="weatherCityList" @update-query="handleUpdateQuery" />
    </BaseDashboardCard>

    <BaseDashboardCard title="지역별 날씨 현황" icon="🗺️">
      <div class="weather-dashboard__summary">
        <span>{{ resultCountMessage }}</span>
        <span v-if="!searchQuery">{{ visibleCityMessage }}</span>
        <span>검색 결과 변경 횟수: {{ searchCount }}회</span>
        <span>{{ configStore.lastUpdatedMessage }}</span>
      </div>

      <el-skeleton v-if="isLoading && !filteredWeatherList.length" :rows="4" animated />
      <div v-else-if="filteredWeatherList.length" class="weather-dashboard__grid">
        <WeatherCard
          v-for="city in filteredWeatherList"
          :key="city.id"
          :city="city"
          :is-selected="selectedCityInfo && selectedCityInfo.id === city.id"
          @select-card="handleSelectCard"
          @click-detail="handleClickDetail"
        />
      </div>
      <el-empty v-else description="검색 결과가 일치하는 도시가 없습니다." />

      <div v-if="!searchQuery && filteredWeatherList.length && hasMoreCities" class="weather-dashboard__more">
        <el-button type="primary" :loading="isLoading" @click="handleLoadMore">더 많은 지역 보기</el-button>
      </div>
    </BaseDashboardCard>

    <p class="weather-dashboard__selection">
      {{ selectedCityMessage }}
    </p>

    <BaseDashboardCard title="날씨 맞춤 생활 추천" icon="✨">
      <LifestyleRecommendationPanel v-if="selectedCityInfo" :city="selectedCityInfo" />
      <el-empty v-else description="도시 카드를 선택하면 저녁 메뉴, 옷차림과 만남 지수를 추천해 드립니다." />
    </BaseDashboardCard>

    <BaseDashboardCard title="선택 도시 단기 예보" icon="🕒">
      <ForecastPreview
        :city-name="selectedCityInfo ? selectedCityInfo.name : '선택한 도시'"
        :forecast-list="forecastList"
        :is-loading="isForecastLoading"
      />
    </BaseDashboardCard>
  </div>
</template>

<style scoped>
.weather-dashboard {
  display: grid;
  gap: 1.5rem;
}

.weather-dashboard__header {
  position: relative;
  isolation: isolate;
  display: flex;
  gap: 1.5rem;
  align-items: flex-end;
  justify-content: space-between;
  min-height: 240px;
  overflow: hidden;
  padding: clamp(2rem, 5vw, 4rem);
  border: 1px solid rgb(147 197 253 / 30%);
  border-radius: 1.75rem;
  color: #ffffff;
  background:
    linear-gradient(115deg, rgb(5 22 54 / 45%), transparent 60%),
    linear-gradient(135deg, #1d4ed8 0%, #2563eb 35%, #0891b2 68%, #7c3aed 100%);
  box-shadow:
    0 28px 70px rgb(4 19 52 / 48%),
    inset 0 1px rgb(255 255 255 / 22%);
}

.weather-dashboard__header::before {
  position: absolute;
  z-index: -1;
  top: -7rem;
  right: -5rem;
  width: 23rem;
  height: 23rem;
  border: 1px solid rgb(255 255 255 / 30%);
  border-radius: 50%;
  background: radial-gradient(circle, #fde68a 0 6%, #f59e0b 7%, rgb(250 204 21 / 30%) 24%, transparent 62%);
  box-shadow: 0 0 90px rgb(250 204 21 / 35%);
  content: '';
  animation: sun-pulse 6s ease-in-out infinite;
}

.weather-dashboard__header::after {
  position: absolute;
  z-index: -1;
  right: 5%;
  bottom: -3.5rem;
  width: 19rem;
  height: 7rem;
  border-radius: 50%;
  background: rgb(255 255 255 / 15%);
  box-shadow:
    -8rem -1rem 0 -1.2rem rgb(255 255 255 / 10%),
    7rem -1.5rem 0 -0.7rem rgb(255 255 255 / 12%);
  content: '';
  filter: blur(2px);
  animation: cloud-drift 8s ease-in-out infinite alternate;
}

h1 {
  font-size: clamp(2rem, 5vw, 3.45rem);
  font-weight: 900;
  letter-spacing: -0.045em;
  line-height: 1.08;
  text-shadow: 0 8px 32px rgb(1 12 36 / 32%);
}

.weather-dashboard__header h1 + p {
  margin-top: 0.8rem;
  color: rgb(255 255 255 / 84%);
  font-size: 1rem;
}

.weather-dashboard__actions {
  display: flex;
  flex: 0 0 auto;
  gap: 0.7rem;
  align-items: center;
  padding: 0.6rem;
  border: 1px solid rgb(255 255 255 / 18%);
  border-radius: 1rem;
  background: rgb(3 16 46 / 22%);
  backdrop-filter: blur(15px);
}

.weather-dashboard__summary {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  justify-content: space-between;
  margin-bottom: 1.25rem;
  color: #a9bdd8;
  font-size: 0.82rem;
}

.weather-dashboard__summary span {
  padding: 0.4rem 0.7rem;
  border: 1px solid rgb(125 211 252 / 12%);
  border-radius: 999px;
  background: rgb(30 64 175 / 10%);
}

.weather-dashboard__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(235px, 1fr));
  gap: 1rem;
}

.weather-dashboard__more {
  display: flex;
  justify-content: center;
  margin-top: 1.25rem;
}

.weather-dashboard__selection {
  position: relative;
  overflow: hidden;
  padding: 1rem 1.2rem 1rem 1.4rem;
  border: 1px solid rgb(56 189 248 / 28%);
  border-left: 4px solid #38bdf8;
  border-radius: 0.9rem;
  color: #d8f4ff;
  background: linear-gradient(90deg, rgb(14 116 144 / 28%), rgb(59 130 246 / 12%));
  box-shadow:
    0 12px 32px rgb(3 19 48 / 28%),
    inset 0 1px rgb(255 255 255 / 7%);
  font-weight: 700;
  backdrop-filter: blur(14px);
}

.weather-dashboard__selection::after {
  position: absolute;
  top: 0;
  left: -35%;
  width: 25%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgb(255 255 255 / 16%), transparent);
  content: '';
  animation: selection-shine 5s ease-in-out infinite;
}

@keyframes sun-pulse {
  50% {
    box-shadow: 0 0 130px rgb(250 204 21 / 50%);
    transform: scale(1.08);
  }
}

@keyframes cloud-drift {
  to {
    transform: translateX(-2.5rem);
  }
}

@keyframes selection-shine {
  55%,
  100% {
    left: 115%;
  }
}

@media (max-width: 720px) {
  .weather-dashboard__header {
    align-items: flex-start;
    flex-direction: column;
    min-height: 300px;
  }

  .weather-dashboard__actions {
    align-items: flex-start;
    flex-direction: column;
  }
}

.weather-dashboard {
  gap: 1.75rem;
}

.weather-dashboard__header {
  min-height: 310px;
  border: 0;
  border-radius: 28px;
  background:
    radial-gradient(circle at 82% 35%, rgb(77 125 244 / 42%), transparent 18rem),
    linear-gradient(120deg, var(--brand-950), var(--brand-900) 58%, var(--brand-700));
  box-shadow: 0 24px 60px rgb(5 15 53 / 18%);
}

.weather-dashboard__header::before {
  top: -8rem;
  right: -3rem;
  border-color: rgb(255 255 255 / 12%);
  background: radial-gradient(circle, #ffffff 0 4%, #84a8fa 5%, rgb(77 125 244 / 20%) 24%, transparent 62%);
  box-shadow: none;
  animation: none;
}

.weather-dashboard__header::after {
  right: 2%;
  background: rgb(255 255 255 / 8%);
  box-shadow:
    -8rem -1rem 0 -1.2rem rgb(255 255 255 / 6%),
    7rem -1.5rem 0 -0.7rem rgb(255 255 255 / 7%);
  animation: none;
}

h1 {
  font-weight: 700;
  letter-spacing: -0.035em;
  text-shadow: none;
}

.weather-dashboard__actions {
  border-color: rgb(255 255 255 / 18%);
  border-radius: 999px;
  background: rgb(255 255 255 / 8%);
  backdrop-filter: none;
}

.weather-dashboard__summary {
  color: var(--ink-500);
}

.weather-dashboard__summary span {
  border-color: var(--ink-200);
  color: var(--ink-600);
  background: var(--ink-50);
}

.weather-dashboard__grid {
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.25rem;
}

.weather-dashboard__selection {
  border-color: var(--brand-200);
  border-left-color: var(--brand-500);
  border-radius: 14px;
  color: var(--brand-800);
  background: var(--brand-50);
  box-shadow: none;
  backdrop-filter: none;
}

.weather-dashboard__selection::after {
  display: none;
}
</style>
