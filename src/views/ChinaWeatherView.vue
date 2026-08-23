<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import axios from 'axios'
import { chinaTravelCityList } from '@/data/chinaTravelCities'
import { useConfigStore } from '@/stores/configStore'
import BaseDashboardCard from '@/components/exercise/BaseDashboardCard.vue'
import ForecastPreview from '@/components/exercise/ForecastPreview.vue'
import LifestyleRecommendationPanel from '@/components/exercise/LifestyleRecommendationPanel.vue'
import SearchBar from '@/components/exercise/SearchBar.vue'
import ChinaWeatherCard from '@/components/ChinaWeatherCard.vue'

const configStore = useConfigStore()
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather'
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast'
const INITIAL_CITY_COUNT = 8
const CITY_LOAD_COUNT = 8

const weatherList = ref([])
const searchQuery = ref('')
const selectedArea = ref('전체')
const selectedCityInfo = ref(null)
const visibleCityCount = ref(INITIAL_CITY_COUNT)
const loadingCityIdList = ref([])
const apiNotice = ref('')
const forecastList = ref([])
const isForecastLoading = ref(false)

const areaList = ['전체', '화북', '화동', '화남', '중남', '서남', '서북', '동북']

const isLoading = computed(() => loadingCityIdList.value.length > 0)

const targetCityList = computed(() => {
  const normalizedQuery = searchQuery.value.trim().toUpperCase()

  if (!normalizedQuery && selectedArea.value === '전체') {
    return chinaTravelCityList.slice(0, visibleCityCount.value)
  }

  return chinaTravelCityList.filter((city) => {
    const isSameArea = selectedArea.value === '전체' || city.area === selectedArea.value
    const isSameQuery =
      !normalizedQuery ||
      city.name.includes(normalizedQuery) ||
      city.englishName.toUpperCase().includes(normalizedQuery) ||
      city.area.includes(normalizedQuery)
    return isSameArea && isSameQuery
  })
})

const filteredWeatherList = computed(() => {
  return targetCityList.value
    .map((city) => weatherList.value.find((weather) => weather.id === city.id))
    .filter((city) => city)
})

const hasMoreCities = computed(() => {
  return visibleCityCount.value < chinaTravelCityList.length
})

const resultMessage = computed(() => {
  return `현재 ${filteredWeatherList.value.length}곳 표시 · 등록 여행도시 ${chinaTravelCityList.length}곳`
})

const handleFetchWeather = async (cityList, isRefresh) => {
  if (!API_KEY) {
    apiNotice.value = '.env 파일에 VITE_OPENWEATHER_API_KEY를 설정해 주세요.'
    return
  }

  const requestCityList = cityList.filter((city) => {
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
        englishName: city.englishName,
        area: city.area,
        lat: city.lat,
        lon: city.lon,
        temp: weatherData.main.temp,
        feelsLike: weatherData.main.feels_like,
        status: weatherData.weather[0] ? weatherData.weather[0].description : '정보 없음',
        iconSrc: weatherData.weather[0]
          ? `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
          : '',
        humidity: weatherData.main.humidity,
        windSpeed: weatherData.wind.speed,
      }
    })

    weatherList.value = weatherList.value
      .filter((weather) => !fetchedWeatherList.find((fetchedWeather) => fetchedWeather.id === weather.id))
      .concat(fetchedWeatherList)
    configStore.updateLastUpdated()
  } catch (error) {
    console.error('중국 여행가이드 API 호출 실패:', error)
    apiNotice.value = '중국 여행가이드 정보를 가져오지 못했습니다. API 키와 네트워크 상태를 확인하세요.'
  } finally {
    loadingCityIdList.value = loadingCityIdList.value.filter(
      (cityId) => !requestCityList.find((city) => city.id === cityId),
    )
  }
}

const handleUpdateQuery = (query) => {
  searchQuery.value = query
}

const handleSelectCard = (city) => {
  selectedCityInfo.value = city
  handleFetchForecast(city)
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
    console.error('중국 도시 단기 예보 API 호출 실패:', error)
    apiNotice.value = '선택한 중국 도시의 단기 예보를 가져오지 못했습니다. 잠시 후 다시 시도하세요.'
  } finally {
    isForecastLoading.value = false
  }
}

const handleLoadMore = () => {
  const oldVisibleCityCount = visibleCityCount.value
  const nextVisibleCityCount = visibleCityCount.value + CITY_LOAD_COUNT
  visibleCityCount.value =
    nextVisibleCityCount > chinaTravelCityList.length ? chinaTravelCityList.length : nextVisibleCityCount

  const nextCityList = chinaTravelCityList.slice(oldVisibleCityCount, visibleCityCount.value)
  handleFetchWeather(nextCityList, false)
}

const handleRefreshWeather = () => {
  const loadedCityList = chinaTravelCityList.filter((city) =>
    weatherList.value.find((weather) => weather.id === city.id),
  )
  const refreshCityList = loadedCityList.length ? loadedCityList : targetCityList.value
  handleFetchWeather(refreshCityList, true)
}

watch([searchQuery, selectedArea], () => {
  handleFetchWeather(targetCityList.value, false)
})

onMounted(() => {
  handleFetchWeather(targetCityList.value, false)
})
</script>

<template>
  <section class="china-weather">
    <header class="china-weather__header">
      <div>
        <h1>중국 여행가이드</h1>
        <p>중국 주요 여행도시 50곳의 현재 날씨와 여행 준비 팁을 확인해 보세요.</p>
      </div>
      <div class="china-weather__actions">
        <el-tag type="warning">🇨🇳 OpenWeather Live</el-tag>
        <el-button :loading="isLoading" @click="handleRefreshWeather">날씨 새로고침</el-button>
      </div>
    </header>

    <el-alert v-if="apiNotice" :title="apiNotice" type="error" show-icon :closable="false" />

    <BaseDashboardCard title="중국 여행도시 검색" icon="🧭">
      <SearchBar :search-query="searchQuery" :city-list="chinaTravelCityList" @update-query="handleUpdateQuery" />
      <div class="china-weather__areas">
        <span>지역별 카테고리</span>
        <label v-for="area in areaList" :key="area">
          <input v-model="selectedArea" type="radio" :value="area" />
          {{ area }}
        </label>
      </div>
    </BaseDashboardCard>

    <BaseDashboardCard title="중국 주요 여행도시 현재 날씨" icon="🏮">
      <div class="china-weather__summary">
        <span>{{ resultMessage }}</span>
        <span>{{ configStore.lastUpdatedMessage }}</span>
      </div>

      <el-skeleton v-if="isLoading && !filteredWeatherList.length" :rows="5" animated />
      <div v-else-if="filteredWeatherList.length" class="china-weather__grid">
        <ChinaWeatherCard
          v-for="city in filteredWeatherList"
          :key="city.id"
          :city="city"
          :is-selected="selectedCityInfo && selectedCityInfo.id === city.id"
          @select-card="handleSelectCard"
        />
      </div>
      <el-empty v-else description="검색 조건과 일치하는 여행도시가 없습니다." />

      <div
        v-if="!searchQuery && selectedArea === '전체' && filteredWeatherList.length && hasMoreCities"
        class="china-weather__more"
      >
        <el-button type="warning" :loading="isLoading" @click="handleLoadMore">여행도시 8곳 더 보기</el-button>
      </div>
    </BaseDashboardCard>

    <p v-if="selectedCityInfo" class="china-weather__selection">
      {{ selectedCityInfo.name }}의 날씨를 기준으로 여행 맞춤 추천을 계산했습니다.
    </p>

    <BaseDashboardCard title="선택 도시 여행 맞춤 추천" icon="✨">
      <LifestyleRecommendationPanel v-if="selectedCityInfo" :city="selectedCityInfo" menu-type="chinese" />
      <el-empty v-else description="도시 카드를 선택하면 저녁 메뉴, 옷차림과 만남 지수를 추천해 드립니다." />
    </BaseDashboardCard>

    <BaseDashboardCard title="선택 도시 단기 예보" icon="🕒">
      <ForecastPreview
        :city-name="selectedCityInfo ? selectedCityInfo.name : '선택한 도시'"
        :forecast-list="forecastList"
        :is-loading="isForecastLoading"
      />
    </BaseDashboardCard>
  </section>
</template>

<style scoped>
.china-weather {
  display: grid;
  gap: 1.4rem;
}

.china-weather__header {
  position: relative;
  isolation: isolate;
  display: flex;
  gap: 2rem;
  align-items: flex-end;
  justify-content: space-between;
  min-height: 250px;
  overflow: hidden;
  padding: clamp(2rem, 5vw, 4rem);
  border: 1px solid rgb(251 191 36 / 30%);
  border-radius: 1.75rem;
  color: #ffffff;
  background:
    linear-gradient(115deg, rgb(69 10 10 / 35%), transparent 58%),
    linear-gradient(135deg, #991b1b 0%, #dc2626 38%, #b45309 72%, #7f1d1d 100%);
  box-shadow:
    0 28px 70px rgb(38 6 12 / 44%),
    inset 0 1px rgb(255 255 255 / 20%);
}

.china-weather__header::before {
  position: absolute;
  z-index: -1;
  top: -6rem;
  right: -3rem;
  width: 21rem;
  height: 21rem;
  border: 2rem solid rgb(251 191 36 / 12%);
  border-radius: 50%;
  content: '';
}

.china-weather__header::after {
  position: absolute;
  z-index: -1;
  right: 7%;
  bottom: -4.8rem;
  color: rgb(254 243 199 / 9%);
  content: '中国';
  font-size: 9rem;
  font-weight: 900;
  letter-spacing: -0.15em;
}

.china-weather__header h1 {
  margin: 0.25rem 0 0.75rem;
  font-size: clamp(2rem, 5vw, 3.4rem);
  font-weight: 900;
  letter-spacing: -0.05em;
}

.china-weather__header h1 + p {
  color: rgb(255 255 255 / 82%);
}

.china-weather__actions {
  display: flex;
  flex: 0 0 auto;
  gap: 0.7rem;
  align-items: center;
  padding: 0.6rem;
  border: 1px solid rgb(255 255 255 / 16%);
  border-radius: 1rem;
  background: rgb(69 10 10 / 25%);
  backdrop-filter: blur(15px);
}

.china-weather__areas {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  align-items: center;
  margin-top: 1rem;
}

.china-weather__areas > span {
  margin-right: 0.25rem;
  color: #d8e8fa;
  font-size: 0.82rem;
  font-weight: 800;
}

.china-weather__areas label {
  display: flex;
  gap: 0.3rem;
  align-items: center;
  padding: 0.38rem 0.6rem;
  border: 1px solid rgb(251 191 36 / 14%);
  border-radius: 999px;
  color: #c6d3e5;
  background: rgb(127 29 29 / 12%);
  cursor: pointer;
  font-size: 0.78rem;
}

.china-weather__areas input {
  accent-color: #f59e0b;
}

.china-weather__summary {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  justify-content: space-between;
  margin-bottom: 1.2rem;
  color: #a9bdd8;
  font-size: 0.82rem;
}

.china-weather__summary span {
  padding: 0.4rem 0.7rem;
  border: 1px solid rgb(251 191 36 / 12%);
  border-radius: 999px;
  background: rgb(127 29 29 / 10%);
}

.china-weather__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.china-weather__more {
  display: flex;
  justify-content: center;
  margin-top: 1.3rem;
}

@media (max-width: 720px) {
  .china-weather__header {
    align-items: flex-start;
    flex-direction: column;
  }

  .china-weather__actions {
    align-items: flex-start;
    flex-direction: column;
  }
}

.china-weather__header {
  min-height: 310px;
  border: 0;
  border-radius: 28px;
  background:
    radial-gradient(circle at 84% 28%, rgb(220 38 38 / 35%), transparent 17rem),
    linear-gradient(120deg, var(--brand-950), var(--brand-900) 62%, #5f1721);
  box-shadow: 0 24px 60px rgb(5 15 53 / 18%);
}

.china-weather__header::before {
  border-color: rgb(255 255 255 / 8%);
}

.china-weather__header::after {
  color: rgb(255 255 255 / 5%);
}

.china-weather__header h1 {
  font-weight: 700;
  letter-spacing: -0.035em;
}

.china-weather__actions {
  border-color: rgb(255 255 255 / 18%);
  border-radius: 999px;
  background: rgb(255 255 255 / 8%);
  backdrop-filter: none;
}

.china-weather__areas > span {
  color: var(--ink-700);
}

.china-weather__areas label {
  border-color: var(--ink-200);
  color: var(--ink-600);
  background: var(--ink-50);
}

.china-weather__areas label:has(input:checked) {
  border-color: #e8a7ad;
  color: #9f1d2b;
  background: #fff1f2;
}

.china-weather__areas input {
  accent-color: #c62836;
}

.china-weather__summary {
  color: var(--ink-500);
}

.china-weather__summary span {
  border-color: var(--ink-200);
  color: var(--ink-600);
  background: var(--ink-50);
}

.china-weather__grid {
  gap: 1.25rem;
}

.china-weather__selection {
  padding: 1rem 1.2rem;
  border: 1px solid #f1c6ca;
  border-left: 4px solid #c62836;
  border-radius: 14px;
  color: #8d1b27;
  background: #fff1f2;
  font-weight: 700;
}
</style>
