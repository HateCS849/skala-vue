<script setup lang="ts">
import { computed, ref } from 'vue'
import CityDetailModal from '@/components/CityDetailModal.vue'
import WeatherCard from '@/components/WeatherCard.vue'
import { useWeatherDashboard } from '@/composables/useWeatherDashboard'
import type { CityDefinition, CountryCode, WeatherData } from '@/types/weather'

const props = defineProps<{
  country: CountryCode
  title: string
  eyebrow: string
  description: string
  cities: CityDefinition[]
  initialCount: number
  loadCount: number
}>()

const selectedWeather = ref<WeatherData | null>(null)
const dashboard = useWeatherDashboard(
  props.country,
  props.cities,
  props.initialCount,
  props.loadCount,
)

const resultMessage = computed(() => {
  return `${dashboard.weatherList.value.length}개 도시 표시 · 전체 ${props.cities.length}개 도시`
})

const areaList = computed(() => {
  return Array.from(new Set(props.cities.map((city) => city.area)))
})

function selectArea(area: string): void {
  dashboard.searchQuery.value = dashboard.searchQuery.value === area ? '' : area
}

function selectWeather(weather: WeatherData): void {
  selectedWeather.value = weather
}
</script>

<template>
  <section class="dashboard">
    <header class="hero">
      <div>
        <span class="eyebrow">{{ eyebrow }}</span>
        <h1>{{ title }}</h1>
        <p>{{ description }}</p>
      </div>
      <button class="refresh-button" type="button" :disabled="dashboard.isFetching.value" @click="dashboard.refresh">
        {{ dashboard.isFetching.value ? '업데이트 중' : '실시간 날씨 새로고침' }}
      </button>
    </header>

    <section class="search-panel" aria-label="도시 검색">
      <label for="city-search">도시 검색</label>
      <div class="search-control">
        <span aria-hidden="true">⌕</span>
        <input
          id="city-search"
          v-model="dashboard.searchQuery.value"
          type="search"
          :placeholder="country === 'KR' ? '서울, 부산, 제주를 검색해 보세요' : '베이징, Shanghai, 화동을 검색해 보세요'"
          autocomplete="off"
        />
        <button v-if="dashboard.searchQuery.value" type="button" @click="dashboard.searchQuery.value = ''">지우기</button>
      </div>
      <div class="area-list" aria-label="지역 빠른 선택">
        <button
          v-for="area in areaList"
          :key="area"
          type="button"
          :class="{ active: dashboard.searchQuery.value === area }"
          @click="selectArea(area)"
        >
          {{ area }}
        </button>
      </div>
    </section>

    <div class="dashboard__summary">
      <div>
        <span>LIVE CITY BOARD</span>
        <h2>지역별 날씨 현황</h2>
      </div>
      <p>{{ resultMessage }}</p>
    </div>

    <div v-if="dashboard.error.value" class="notice notice--error" role="alert">
      <strong>날씨 정보를 불러오지 못했습니다.</strong>
      <span>{{ dashboard.error.value.message }}</span>
      <button type="button" @click="dashboard.refresh">다시 시도</button>
    </div>

    <div v-else-if="dashboard.failedCityNames.value.length" class="notice" role="status">
      일부 도시를 불러오지 못했습니다: {{ dashboard.failedCityNames.value.join(', ') }}
    </div>

    <div v-if="dashboard.isPending.value" class="weather-grid" aria-label="날씨 로딩 중">
      <div v-for="number in initialCount" :key="number" class="weather-skeleton"></div>
    </div>

    <div v-else-if="dashboard.weatherList.value.length" class="weather-grid">
      <WeatherCard
        v-for="weather in dashboard.weatherList.value"
        :key="weather.id"
        :weather="weather"
        @select="selectWeather"
      />
    </div>

    <div v-else-if="!dashboard.error.value" class="empty-state">
      <strong>검색 결과가 없습니다.</strong>
      <p>도시 이름이나 지역명을 다시 확인해 주세요.</p>
    </div>

    <div v-if="dashboard.hasMoreCities.value" class="load-more">
      <button type="button" :disabled="dashboard.isFetching.value" @click="dashboard.loadMore">
        도시 {{ loadCount }}곳 더 보기
      </button>
    </div>

    <CityDetailModal
      v-if="selectedWeather"
      :key="selectedWeather.id"
      :weather="selectedWeather"
      @close="selectedWeather = null"
    />
  </section>
</template>
