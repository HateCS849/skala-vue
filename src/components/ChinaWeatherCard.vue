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

const emit = defineEmits(['select-card'])
const configStore = useConfigStore()

const displayTemp = computed(() => {
  const rawTemp = props.city.temp
  if (configStore.unit === 'fahrenheit') return Math.round((rawTemp * 9) / 5 + 32)
  return Math.round(rawTemp)
})

const displayFeelsLike = computed(() => {
  const rawTemp = props.city.feelsLike
  if (configStore.unit === 'fahrenheit') return Math.round((rawTemp * 9) / 5 + 32)
  return Math.round(rawTemp)
})

const travelTip = computed(() => {
  if (props.city.status.includes('비')) return '우산과 미끄럼 방지 신발을 챙기세요.'
  if (props.city.status.includes('눈')) return '방한용품과 미끄럼 방지 신발이 필요해요.'
  if (props.city.temp >= 32) return '낮 시간 야외 일정을 줄이고 물을 자주 드세요.'
  if (props.city.temp <= 5) return '두꺼운 외투와 장갑을 준비하세요.'
  if (props.city.humidity >= 80) return '통풍이 잘되는 옷과 여분의 물을 준비하세요.'
  return '도보 여행하기 비교적 좋은 날씨예요.'
})

const handleCardClick = () => {
  emit('select-card', props.city)
}
</script>

<template>
  <article
    class="china-weather-card"
    :class="{ 'china-weather-card--selected': isSelected }"
    tabindex="0"
    @click="handleCardClick"
    @keydown.enter="handleCardClick"
    @keydown.space.prevent="handleCardClick"
  >
    <div class="china-weather-card__top">
      <div>
        <span class="china-weather-card__area">{{ city.area }}</span>
        <h2>{{ city.name }}</h2>
        <p>{{ city.englishName }}</p>
      </div>
      <img v-if="city.iconSrc" :src="city.iconSrc" :alt="city.status" />
    </div>

    <div class="china-weather-card__weather">
      <strong>{{ displayTemp }}{{ configStore.unitSymbol }}</strong>
      <span>{{ city.status }}</span>
    </div>

    <dl>
      <div>
        <dt>체감</dt>
        <dd>{{ displayFeelsLike }}{{ configStore.unitSymbol }}</dd>
      </div>
      <div>
        <dt>습도</dt>
        <dd>{{ city.humidity }}%</dd>
      </div>
      <div>
        <dt>바람</dt>
        <dd>{{ city.windSpeed }}m/s</dd>
      </div>
    </dl>

    <p class="china-weather-card__tip">✈️ {{ travelTip }}</p>
  </article>
</template>

<style scoped>
.china-weather-card {
  position: relative;
  isolation: isolate;
  display: grid;
  gap: 1rem;
  overflow: hidden;
  padding: 1.3rem;
  border: 1px solid rgb(251 191 36 / 20%);
  border-radius: 1.15rem;
  background:
    radial-gradient(circle at 100% 0, rgb(239 68 68 / 20%), transparent 40%),
    linear-gradient(145deg, rgb(69 20 31 / 78%), rgb(19 28 58 / 88%));
  box-shadow:
    0 16px 38px rgb(0 8 28 / 30%),
    inset 0 1px rgb(255 255 255 / 7%);
  transition:
    transform 220ms ease,
    border-color 220ms ease,
    box-shadow 220ms ease;
}

.china-weather-card:hover {
  border-color: rgb(251 191 36 / 52%);
  box-shadow:
    0 24px 48px rgb(0 8 28 / 42%),
    0 0 28px rgb(239 68 68 / 12%);
  transform: translateY(-5px);
}

.china-weather-card__top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.china-weather-card__top img {
  width: 4.2rem;
  height: 4.2rem;
  object-fit: contain;
  filter: drop-shadow(0 10px 14px rgb(0 8 30 / 38%));
}

.china-weather-card__area {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 999px;
  color: #fde68a;
  background: rgb(180 83 9 / 20%);
  font-size: 0.68rem;
  font-weight: 800;
}

.china-weather-card h2 {
  margin-top: 0.45rem;
  color: #fff7ed;
  font-size: 1.35rem;
  font-weight: 900;
}

.china-weather-card h2 + p {
  color: #9eafc8;
  font-size: 0.78rem;
}

.china-weather-card__weather {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}

.china-weather-card__weather strong {
  color: #fef3c7;
  font-size: 2.2rem;
  font-weight: 900;
  letter-spacing: -0.05em;
  text-shadow: 0 0 26px rgb(251 191 36 / 24%);
}

.china-weather-card__weather span {
  color: #e2e8f0;
  font-size: 0.88rem;
}

dl {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
}

dl > div {
  padding: 0.6rem;
  border: 1px solid rgb(251 191 36 / 10%);
  border-radius: 0.65rem;
  background: rgb(255 255 255 / 4%);
  text-align: center;
}

dt {
  color: #8295b0;
  font-size: 0.67rem;
}

dd {
  margin-top: 0.15rem;
  color: #f8fafc;
  font-size: 0.82rem;
  font-weight: 800;
}

.china-weather-card__tip {
  position: relative;
  z-index: 1;
  padding-top: 0.8rem;
  border-top: 1px solid rgb(251 191 36 / 12%);
  color: #d5deea;
  font-size: 0.82rem;
}

.china-weather-card {
  border-color: var(--ink-200);
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 8px 24px rgb(13 28 80 / 6%);
  cursor: pointer;
}

.china-weather-card:hover,
.china-weather-card:focus-visible {
  border-color: #e8a7ad;
  outline: none;
  box-shadow: 0 18px 40px rgb(108 31 40 / 10%);
  transform: translateY(-4px);
}

.china-weather-card--selected {
  border-color: #c62836;
  background: #fff7f7;
  box-shadow: 0 0 0 2px #ffe0e2;
}

.china-weather-card__area {
  color: #9f1d2b;
  background: #fff1f2;
}

.china-weather-card h2 {
  color: var(--ink-900);
  font-weight: 700;
}

.china-weather-card h2 + p,
.china-weather-card__weather span,
dt {
  color: var(--ink-500);
}

.china-weather-card__weather strong {
  color: var(--brand-700);
  font-weight: 700;
  text-shadow: none;
}

dl > div {
  border-color: var(--ink-200);
  background: var(--ink-50);
}

dd {
  color: var(--ink-800);
}

.china-weather-card__tip {
  border-top-color: var(--ink-200);
  color: var(--ink-600);
}
</style>
