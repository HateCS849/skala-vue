<script setup>
import { computed, watch } from 'vue'

const props = defineProps({
  city: {
    type: Object,
    required: true,
  },
})

const discomfortIndex = computed(() => {
  const temperature = props.city.temp
  const humidity = props.city.humidity
  const index = 0.81 * temperature + 0.01 * humidity * (0.99 * temperature - 14.3) + 46.3
  return Math.round(index * 10) / 10
})

const discomfortInfo = computed(() => {
  if (discomfortIndex.value < 68) {
    return { level: '쾌적', type: 'success', message: '기분 좋게 대화하기 좋은 날씨예요.' }
  }
  if (discomfortIndex.value < 75) {
    return { level: '보통', type: 'primary', message: '가벼운 야외 활동에 무난한 날씨예요.' }
  }
  if (discomfortIndex.value < 80) {
    return { level: '불쾌', type: 'warning', message: '시원한 실내에서 여유 있게 대화해 보세요.' }
  }

  return { level: '매우 불쾌', type: 'danger', message: '무리한 외출보다 쾌적한 장소를 먼저 찾아보세요.' }
})

const successChance = computed(() => {
  let chance = 65

  if (discomfortIndex.value < 68) chance += 15
  else if (discomfortIndex.value < 75) chance += 5
  else if (discomfortIndex.value < 80) chance -= 10
  else chance -= 25

  if (props.city.temp >= 18 && props.city.temp <= 25) chance += 8
  if (props.city.humidity >= 80) chance -= 8
  if (props.city.status.includes('비') || props.city.status.includes('눈')) chance -= 10

  if (chance > 95) chance = 95
  if (chance < 5) chance = 5

  return chance
})

const chanceMessage = computed(() => {
  if (successChance.value >= 75) return '날씨 분위기는 좋아요. 자연스럽고 예의 있게 말을 걸어보세요.'
  if (successChance.value >= 55) return '무난한 날이에요. 밝은 인사와 편안한 대화가 중요해요.'
  if (successChance.value >= 35) return '날씨가 조금 불편해요. 상대가 여유로운 상황인지 먼저 살펴보세요.'
  return '오늘은 날씨보다 컨디션 관리가 우선이에요. 다음 기회를 기다려도 좋아요.'
})

watch(discomfortIndex, (newValue, oldValue) => {
  console.log(`불쾌지수 변경 감지: ${oldValue} ➡️ ${newValue}`)
})
</script>

<template>
  <article class="recommendation-card recommendation-card--chance">
    <div class="recommendation-card__heading">
      <span>💘</span>
      <div>
        <p class="recommendation-card__label">날씨 기반 재미 지표</p>
        <h3>번호 교환 성공확률 {{ successChance }}%</h3>
      </div>
    </div>

    <el-progress :percentage="successChance" :stroke-width="12" />
    <div class="recommendation-card__index">
      <span>불쾌지수 {{ discomfortIndex }}</span>
      <el-tag :type="discomfortInfo.type">{{ discomfortInfo.level }}</el-tag>
    </div>
    <p>{{ discomfortInfo.message }}</p>
    <p>{{ chanceMessage }}</p>
    <small>날씨만 반영한 재미용 수치입니다. 실제 결과와 무관하며 상대방의 의사와 경계를 존중해 주세요.</small>
  </article>
</template>

<style scoped>
.recommendation-card {
  position: relative;
  isolation: isolate;
  display: grid;
  gap: 0.9rem;
  min-height: 100%;
  overflow: hidden;
  padding: 1.35rem;
  border: 1px solid rgb(244 114 182 / 30%);
  border-radius: 1.2rem;
  background:
    radial-gradient(circle at 100% 0, rgb(244 114 182 / 24%), transparent 42%),
    linear-gradient(145deg, rgb(157 23 77 / 42%), rgb(62 14 53 / 68%));
  box-shadow:
    0 18px 42px rgb(54 8 42 / 30%),
    inset 0 1px rgb(255 255 255 / 8%);
  transition:
    transform 240ms ease,
    box-shadow 240ms ease;
}

.recommendation-card::after {
  position: absolute;
  z-index: -1;
  right: -1.5rem;
  bottom: -2.7rem;
  color: rgb(251 207 232 / 6%);
  content: '♥';
  font-size: 8rem;
}

.recommendation-card:hover {
  box-shadow:
    0 25px 55px rgb(54 8 42 / 42%),
    0 0 28px rgb(236 72 153 / 14%);
  transform: translateY(-6px) rotateX(1deg);
}

.recommendation-card__heading {
  display: flex;
  gap: 0.8rem;
  align-items: center;
}

.recommendation-card__heading > span {
  display: grid;
  width: 3.2rem;
  height: 3.2rem;
  border: 1px solid rgb(251 207 232 / 18%);
  border-radius: 1rem;
  place-items: center;
  background: rgb(255 255 255 / 7%);
  box-shadow: 0 10px 25px rgb(80 7 45 / 28%);
  font-size: 2.15rem;
  animation: heart-beat 2.4s ease-in-out infinite;
}

.recommendation-card__label {
  color: #f9a8d4;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.06em;
}

h3 {
  color: #fdf2f8;
  font-size: 1.2rem;
  font-weight: 850;
}

.recommendation-card__index {
  display: flex;
  gap: 0.7rem;
  align-items: center;
  justify-content: space-between;
  padding: 0.55rem 0.7rem;
  border: 1px solid rgb(249 168 212 / 14%);
  border-radius: 0.75rem;
  color: #fbcfe8;
  background: rgb(80 7 45 / 18%);
  font-weight: 750;
}

.recommendation-card > p {
  color: #fbcfe8;
  font-size: 0.88rem;
}

small {
  padding-top: 0.7rem;
  border-top: 1px solid rgb(249 168 212 / 18%);
  color: #dba9c6;
  font-size: 0.72rem;
}

.recommendation-card :deep(.el-progress-bar__outer) {
  background: rgb(80 7 45 / 35%);
}

.recommendation-card :deep(.el-progress-bar__inner) {
  background: linear-gradient(90deg, #f43f5e, #ec4899, #a855f7);
  box-shadow: 0 0 20px rgb(244 114 182 / 40%);
}

.recommendation-card :deep(.el-progress__text) {
  color: #fce7f3;
  font-weight: 800;
}

@keyframes heart-beat {
  45% {
    transform: scale(1);
  }

  52% {
    transform: scale(1.13);
  }

  60% {
    transform: scale(1);
  }
}

.recommendation-card {
  border-color: #f2c8dc;
  border-radius: 20px;
  background: linear-gradient(145deg, #ffffff, #fff7fb);
  box-shadow: 0 10px 28px rgb(108 31 70 / 8%);
}

.recommendation-card::after {
  color: rgb(236 72 153 / 6%);
}

.recommendation-card:hover {
  box-shadow: 0 20px 40px rgb(108 31 70 / 13%);
  transform: translateY(-4px);
}

.recommendation-card__heading > span {
  border-color: #f2c8dc;
  background: #fff0f7;
  box-shadow: none;
  animation: none;
}

.recommendation-card__label {
  color: #b42368;
}

h3 {
  color: var(--ink-900);
  font-weight: 700;
}

.recommendation-card__index {
  border-color: #f2c8dc;
  color: #8f1d57;
  background: #fff0f7;
}

.recommendation-card > p,
small {
  color: var(--ink-600);
}

small {
  border-top-color: #f4dbe7;
}

.recommendation-card :deep(.el-progress-bar__outer) {
  background: #f6e3ed;
}

.recommendation-card :deep(.el-progress-bar__inner) {
  background: linear-gradient(90deg, #e44d89, #b42368);
  box-shadow: none;
}

.recommendation-card :deep(.el-progress__text) {
  color: #8f1d57;
}
</style>
