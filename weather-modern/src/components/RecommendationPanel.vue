<script setup lang="ts">
import { computed } from 'vue'
import {
  calculateDiscomfortIndex,
  calculateMeetingScore,
  getClothingRecommendation,
  getDinnerRecommendation,
} from '@/utils/recommendations'
import type { WeatherData } from '@/types/weather'

const props = defineProps<{
  weather: WeatherData
}>()

const dinner = computed(() => getDinnerRecommendation(props.weather.temperature, props.weather.country))
const clothing = computed(() => getClothingRecommendation(props.weather.temperature))
const discomfortIndex = computed(() => calculateDiscomfortIndex(props.weather.temperature, props.weather.humidity))
const meetingScore = computed(() => calculateMeetingScore(props.weather))
</script>

<template>
  <section class="recommendations" aria-label="생활 추천">
    <article>
      <span class="recommendations__label">DINNER</span>
      <h3>{{ dinner.title }}</h3>
      <p>{{ dinner.description }}</p>
    </article>
    <article>
      <span class="recommendations__label">OUTFIT</span>
      <h3>{{ clothing.title }}</h3>
      <p>{{ clothing.description }}</p>
    </article>
    <article>
      <span class="recommendations__label">MEETING</span>
      <h3>만남 지수 {{ meetingScore }}%</h3>
      <div class="score-bar" role="progressbar" :aria-valuenow="meetingScore" aria-valuemin="0" aria-valuemax="100">
        <span :style="{ width: `${meetingScore}%` }"></span>
      </div>
      <p>불쾌지수 {{ discomfortIndex }}를 날씨 조건과 함께 계산한 재미용 지표입니다.</p>
    </article>
  </section>
</template>
