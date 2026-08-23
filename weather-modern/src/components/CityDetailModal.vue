<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { fetchForecast, getWeatherIconUrl } from '@/api/weatherApi'
import RecommendationPanel from '@/components/RecommendationPanel.vue'
import type { WeatherData } from '@/types/weather'

const props = defineProps<{
  weather: WeatherData
}>()

const emit = defineEmits<{
  close: []
}>()

const forecastQuery = useQuery({
  queryKey: computed(() => ['forecast', props.weather.id]),
  queryFn: ({ signal }) => fetchForecast(props.weather, signal),
  staleTime: 1000 * 60 * 30,
})

const forecastList = computed(() => forecastQuery.data.value ?? [])

function formatForecastTime(dateTime: string): string {
  const date = new Date(dateTime.replace(' ', 'T'))
  return new Intl.DateTimeFormat('ko-KR', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

function handleKeydown(event: KeyboardEvent): void {
  if (event.key === 'Escape') emit('close')
}

onMounted(() => {
  document.body.classList.add('modal-open')
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.body.classList.remove('modal-open')
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <Teleport to="body">
    <div class="modal-backdrop" role="presentation" @click.self="emit('close')">
      <section class="city-modal" role="dialog" aria-modal="true" :aria-label="`${weather.name} 상세 날씨`">
        <header class="city-modal__header">
          <div>
            <span>{{ weather.area }} · {{ weather.country === 'KR' ? '대한민국' : '중국' }}</span>
            <h2>{{ weather.name }}</h2>
            <p v-if="weather.englishName">{{ weather.englishName }}</p>
          </div>
          <button class="icon-button" type="button" aria-label="상세 창 닫기" @click="emit('close')">×</button>
        </header>

        <div class="city-modal__current">
          <img :src="getWeatherIconUrl(weather.iconCode)" :alt="weather.description" />
          <strong>{{ Math.round(weather.temperature) }}°</strong>
          <div>
            <b>{{ weather.description }}</b>
            <span>체감 {{ Math.round(weather.feelsLike) }}° · 습도 {{ weather.humidity }}% · 풍속 {{ weather.windSpeed.toFixed(1) }}m/s</span>
          </div>
        </div>

        <RecommendationPanel :weather="weather" />

        <section class="forecast-section">
          <div class="section-heading">
            <div>
              <span>3-HOUR FORECAST</span>
              <h3>3시간 간격 예보</h3>
            </div>
            <span v-if="forecastQuery.isFetching.value" class="status-pill">업데이트 중</span>
          </div>

          <div v-if="forecastQuery.isPending.value" class="forecast-state">예보를 불러오고 있습니다.</div>
          <div v-else-if="forecastQuery.error.value" class="forecast-state forecast-state--error">
            예보를 불러오지 못했습니다.
          </div>
          <div v-else class="forecast-list">
            <article v-for="forecast in forecastList" :key="forecast.dateTime">
              <time>{{ formatForecastTime(forecast.dateTime) }}</time>
              <img :src="getWeatherIconUrl(forecast.iconCode)" :alt="forecast.description" />
              <strong>{{ Math.round(forecast.temperature) }}°</strong>
              <span>{{ forecast.description }}</span>
            </article>
          </div>
        </section>
      </section>
    </div>
  </Teleport>
</template>
