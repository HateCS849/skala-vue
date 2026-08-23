<script setup>
import { computed } from 'vue'
import { useConfigStore } from '@/stores/configStore'

const props = defineProps({
  cityName: {
    type: String,
    required: true,
  },
  forecastList: {
    type: Array,
    default: () => [],
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
})

const configStore = useConfigStore()

const displayForecastList = computed(() => {
  return props.forecastList.map((forecast) => {
    const temperature =
      configStore.unit === 'fahrenheit' ? Math.round((forecast.temp * 9) / 5 + 32) : Math.round(forecast.temp)

    return {
      dateTime: forecast.dateTime,
      temp: forecast.temp,
      status: forecast.status,
      displayTemp: `${temperature}${configStore.unitSymbol}`,
    }
  })
})
</script>

<template>
  <div class="forecast-preview">
    <h3>{{ cityName }} 3시간 간격 예보</h3>

    <el-skeleton v-if="isLoading" :rows="3" animated />
    <el-timeline v-else-if="displayForecastList.length">
      <el-timeline-item v-for="forecast in displayForecastList" :key="forecast.dateTime" :timestamp="forecast.dateTime">
        {{ forecast.status }} · {{ forecast.displayTemp }}
      </el-timeline-item>
    </el-timeline>
    <el-empty v-else description="도시 카드를 선택하면 단기 예보를 확인할 수 있습니다." />
  </div>
</template>

<style scoped>
.forecast-preview {
  padding: 0.2rem;
}

.forecast-preview h3 {
  margin-bottom: 1.25rem;
  color: #e9f4ff;
  font-size: 1.05rem;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.forecast-preview :deep(.el-timeline-item__wrapper) {
  padding-bottom: 0.6rem;
}

.forecast-preview :deep(.el-timeline-item__content) {
  padding: 0.7rem 0.9rem;
  border: 1px solid rgb(125 211 252 / 12%);
  border-radius: 0.75rem;
  background: rgb(30 64 175 / 10%);
}

.forecast-preview h3 {
  color: var(--ink-800);
  font-weight: 700;
}

.forecast-preview :deep(.el-timeline-item__content) {
  border-color: var(--ink-200);
  background: var(--ink-50);
}
</style>
