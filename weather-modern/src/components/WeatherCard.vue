<script setup lang="ts">
import { computed } from 'vue'
import { getWeatherIconUrl } from '@/api/weatherApi'
import type { WeatherData } from '@/types/weather'

const props = defineProps<{
  weather: WeatherData
}>()

const emit = defineEmits<{
  select: [weather: WeatherData]
}>()

const temperature = computed(() => `${Math.round(props.weather.temperature)}°`)
</script>

<template>
  <button class="weather-card" type="button" @click="emit('select', weather)">
    <span class="weather-card__area">{{ weather.area }}</span>
    <span class="weather-card__heading">
      <span>
        <strong>{{ weather.name }}</strong>
        <small v-if="weather.englishName">{{ weather.englishName }}</small>
      </span>
      <img :src="getWeatherIconUrl(weather.iconCode)" :alt="weather.description" />
    </span>
    <span class="weather-card__temperature">{{ temperature }}</span>
    <span class="weather-card__description">{{ weather.description }}</span>
    <span class="weather-card__metrics">
      <span>체감 {{ Math.round(weather.feelsLike) }}°</span>
      <span>습도 {{ weather.humidity }}%</span>
      <span>풍속 {{ weather.windSpeed.toFixed(1) }}m/s</span>
    </span>
    <span class="weather-card__action">자세히 보기 <span aria-hidden="true">→</span></span>
  </button>
</template>
