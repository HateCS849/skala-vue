<script setup>
import { computed } from 'vue'
import { useConfigStore } from '@/stores/configStore'

const props = defineProps({
  city: {
    type: Object,
    required: true,
  },
  isSelected: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['select-card', 'click-detail'])
const configStore = useConfigStore()

const displayTemp = computed(() => {
  const rawTemp = props.city.temp

  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32)
  }

  return Math.round(rawTemp)
})

const handleCardClick = () => {
  emit('select-card', props.city)
}

const handleDetailClick = () => {
  emit('click-detail', props.city.id)
}
</script>

<template>
  <article
    class="weather-card"
    :class="{ 'weather-card--selected': isSelected }"
    tabindex="0"
    @click="handleCardClick"
    @keydown.enter="handleCardClick"
    @keydown.space.prevent="handleCardClick"
  >
    <div class="weather-card__heading">
      <div>
        <p class="weather-card__city">{{ city.name }}</p>
        <p class="weather-card__status">{{ city.status }}</p>
      </div>
      <span class="weather-card__temperature">{{ displayTemp }}{{ configStore.unitSymbol }}</span>
    </div>

    <p v-if="city.temp >= 25" class="weather-card__condition weather-card__condition--hot">🔥 더움 (25도 이상)</p>
    <p v-else class="weather-card__condition weather-card__condition--cool">❄️ 선선함 (25도 미만)</p>

    <el-button type="primary" @click.stop="handleDetailClick">상세보기</el-button>
  </article>
</template>

<style scoped>
.weather-card {
  position: relative;
  isolation: isolate;
  display: grid;
  gap: 1rem;
  min-width: 0;
  overflow: hidden;
  padding: 1.3rem;
  border: 1px solid rgb(148 196 255 / 16%);
  border-radius: 1.1rem;
  background:
    radial-gradient(circle at 92% 8%, rgb(56 189 248 / 17%), transparent 40%),
    linear-gradient(145deg, rgb(21 52 94 / 82%), rgb(10 25 54 / 82%));
  box-shadow:
    0 14px 34px rgb(0 7 24 / 28%),
    inset 0 1px rgb(255 255 255 / 7%);
  cursor: pointer;
  transition:
    transform 240ms ease,
    border-color 240ms ease,
    box-shadow 240ms ease;
}

.weather-card::before {
  position: absolute;
  z-index: -1;
  top: -3rem;
  right: -3rem;
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  background: radial-gradient(circle, rgb(125 211 252 / 28%), transparent 68%);
  content: '';
  transition: transform 300ms ease;
}

.weather-card:hover,
.weather-card:focus-visible {
  border-color: rgb(103 232 249 / 58%);
  outline: none;
  box-shadow:
    0 22px 46px rgb(0 9 32 / 42%),
    0 0 28px rgb(14 165 233 / 14%),
    inset 0 1px rgb(255 255 255 / 12%);
  transform: translateY(-6px) scale(1.015);
}

.weather-card:hover::before {
  transform: scale(1.45);
}

.weather-card--selected {
  border-color: #67e8f9;
  background:
    radial-gradient(circle at 92% 8%, rgb(103 232 249 / 28%), transparent 42%),
    linear-gradient(145deg, rgb(30 64 175 / 72%), rgb(88 28 135 / 58%));
  box-shadow:
    0 0 0 2px rgb(34 211 238 / 13%),
    0 20px 45px rgb(37 99 235 / 25%),
    inset 0 1px rgb(255 255 255 / 14%);
}

.weather-card__heading {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  justify-content: space-between;
}

.weather-card__city,
.weather-card__temperature {
  color: #f4f9ff;
  font-size: 1.4rem;
  font-weight: 850;
  letter-spacing: -0.03em;
}

.weather-card__status {
  margin-top: 0.12rem;
  color: #9cb1ce;
  font-size: 0.9rem;
}

.weather-card__temperature {
  color: #a5f3fc;
  text-shadow: 0 0 25px rgb(34 211 238 / 30%);
}

.weather-card__condition {
  width: fit-content;
  padding: 0.35rem 0.6rem;
  border-radius: 999px;
  font-size: 0.88rem;
  font-weight: 750;
}

.weather-card__condition--hot {
  color: #fed7aa;
  background: rgb(234 88 12 / 15%);
}

.weather-card__condition--cool {
  color: #bae6fd;
  background: rgb(14 165 233 / 14%);
}

.weather-card :deep(.el-button) {
  justify-self: start;
  box-shadow: 0 10px 25px rgb(37 99 235 / 25%);
}

.weather-card {
  border-color: var(--ink-200);
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 8px 24px rgb(13 28 80 / 6%);
}

.weather-card::before {
  background: radial-gradient(circle, var(--brand-100), transparent 68%);
  opacity: 0.65;
}

.weather-card:hover,
.weather-card:focus-visible {
  border-color: var(--brand-300);
  box-shadow: 0 18px 40px rgb(13 28 80 / 12%);
  transform: translateY(-4px);
}

.weather-card--selected {
  border-color: var(--brand-500);
  background: var(--brand-50);
  box-shadow: 0 0 0 2px var(--brand-100);
}

.weather-card__city {
  color: var(--ink-900);
  font-weight: 700;
}

.weather-card__temperature {
  color: var(--brand-600);
  font-weight: 700;
  text-shadow: none;
}

.weather-card__status {
  color: var(--ink-500);
}

.weather-card__condition--hot {
  color: #b45309;
  background: #fff6e0;
}

.weather-card__condition--cool {
  color: var(--brand-700);
  background: var(--brand-50);
}

.weather-card :deep(.el-button) {
  box-shadow: none;
}
</style>
