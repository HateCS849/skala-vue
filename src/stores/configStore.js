import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', () => {
  const unit = ref('celsius')
  const lastUpdatedAt = ref('')

  const unitSymbol = computed(() => (unit.value === 'celsius' ? '℃' : '℉'))
  const lastUpdatedMessage = computed(() => {
    return lastUpdatedAt.value ? `마지막 갱신: ${lastUpdatedAt.value}` : '아직 갱신되지 않았습니다.'
  })

  const toggleUnit = () => {
    unit.value = unit.value === 'celsius' ? 'fahrenheit' : 'celsius'
  }

  const updateLastUpdated = () => {
    lastUpdatedAt.value = new Date().toString()
  }

  return {
    unit,
    lastUpdatedAt,
    unitSymbol,
    lastUpdatedMessage,
    toggleUnit,
    updateLastUpdated,
  }
})
