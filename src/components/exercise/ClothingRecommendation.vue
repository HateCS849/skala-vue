<script setup>
import { computed } from 'vue'
import { useConfigStore } from '@/stores/configStore'

const props = defineProps({
  city: {
    type: Object,
    required: true,
  },
})

const configStore = useConfigStore()

const clothingInfo = computed(() => {
  const temperature = props.city.temp

  if (temperature >= 28) {
    return {
      icon: '🩳',
      title: '민소매·반팔·반바지',
      level: '한여름 옷차림',
      tip: '통풍이 잘되는 얇은 소재와 모자를 추천해요.',
    }
  }
  if (temperature >= 23) {
    return {
      icon: '👕',
      title: '반팔·얇은 셔츠',
      level: '여름 옷차림',
      tip: '실내 냉방에 대비해 얇은 겉옷을 챙겨도 좋아요.',
    }
  }
  if (temperature >= 20) {
    return {
      icon: '👔',
      title: '긴팔 티·가디건',
      level: '간절기 옷차림',
      tip: '일교차에 대응할 수 있도록 겹쳐 입어 보세요.',
    }
  }
  if (temperature >= 17) {
    return {
      icon: '🧥',
      title: '맨투맨·얇은 재킷',
      level: '선선한 날 옷차림',
      tip: '저녁에는 체감온도가 내려갈 수 있어 겉옷이 필요해요.',
    }
  }
  if (temperature >= 12) {
    return {
      icon: '🧶',
      title: '니트·재킷',
      level: '쌀쌀한 날 옷차림',
      tip: '얇은 옷을 여러 겹 입으면 온도 변화에 편해요.',
    }
  }
  if (temperature >= 5) {
    return { icon: '🧥', title: '코트·히트텍', level: '초겨울 옷차림', tip: '목과 손목을 따뜻하게 보호해 주세요.' }
  }

  return { icon: '🧣', title: '패딩·목도리·장갑', level: '한겨울 옷차림', tip: '보온에 집중하고 빙판길을 조심하세요.' }
})

const weatherItemMessage = computed(() => {
  if (props.city.status.includes('비')) return '우산과 방수 신발을 챙기세요.'
  if (props.city.status.includes('눈')) return '미끄럼 방지 신발을 추천해요.'
  if (props.city.humidity >= 80) return '습도가 높으니 통풍이 잘되는 소재가 좋아요.'
  return '추가 준비물 없이 가볍게 외출해도 좋아요.'
})

const displayTemp = computed(() => {
  const temperature =
    configStore.unit === 'fahrenheit' ? Math.round((props.city.temp * 9) / 5 + 32) : Math.round(props.city.temp)
  return `${temperature}${configStore.unitSymbol}`
})
</script>

<template>
  <article class="recommendation-card recommendation-card--clothing">
    <div class="recommendation-card__heading">
      <span>{{ clothingInfo.icon }}</span>
      <div>
        <p class="recommendation-card__label">{{ displayTemp }} 옷차림</p>
        <h3>{{ clothingInfo.title }}</h3>
      </div>
    </div>

    <el-tag type="primary">{{ clothingInfo.level }}</el-tag>
    <p>{{ clothingInfo.tip }}</p>
    <p class="recommendation-card__extra">{{ weatherItemMessage }}</p>
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
  border: 1px solid rgb(96 165 250 / 30%);
  border-radius: 1.2rem;
  background:
    radial-gradient(circle at 100% 0, rgb(34 211 238 / 21%), transparent 42%),
    linear-gradient(145deg, rgb(30 64 175 / 45%), rgb(10 31 68 / 68%));
  box-shadow:
    0 18px 42px rgb(3 19 54 / 30%),
    inset 0 1px rgb(255 255 255 / 8%);
  transition:
    transform 240ms ease,
    box-shadow 240ms ease;
}

.recommendation-card::after {
  position: absolute;
  z-index: -1;
  right: -2rem;
  bottom: -3rem;
  color: rgb(219 234 254 / 6%);
  content: '❄';
  font-size: 8rem;
}

.recommendation-card:hover {
  box-shadow:
    0 25px 55px rgb(3 19 54 / 42%),
    0 0 28px rgb(56 189 248 / 13%);
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
  border: 1px solid rgb(186 230 253 / 18%);
  border-radius: 1rem;
  place-items: center;
  background: rgb(255 255 255 / 7%);
  box-shadow: 0 10px 25px rgb(7 37 84 / 28%);
  font-size: 2.15rem;
}

.recommendation-card__label {
  color: #7dd3fc;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.06em;
}

h3 {
  color: #eff6ff;
  font-size: 1.2rem;
  font-weight: 850;
}

.recommendation-card > p {
  color: #bfdbfe;
  font-size: 0.88rem;
}

.recommendation-card__extra {
  padding-top: 0.7rem;
  border-top: 1px solid rgb(147 197 253 / 20%);
  color: #e0f2fe !important;
  font-weight: 750;
}

.recommendation-card {
  border-color: var(--brand-200);
  border-radius: 20px;
  background: linear-gradient(145deg, #ffffff, var(--brand-50));
  box-shadow: 0 10px 28px rgb(13 28 80 / 8%);
}

.recommendation-card::after {
  color: rgb(34 86 230 / 6%);
}

.recommendation-card:hover {
  box-shadow: 0 20px 40px rgb(13 28 80 / 13%);
  transform: translateY(-4px);
}

.recommendation-card__heading > span {
  border-color: var(--brand-200);
  background: var(--brand-50);
  box-shadow: none;
}

.recommendation-card__label {
  color: var(--brand-600);
}

h3 {
  color: var(--ink-900);
  font-weight: 700;
}

.recommendation-card > p {
  color: var(--ink-600);
}

.recommendation-card__extra {
  border-top-color: var(--brand-100);
  color: var(--brand-800) !important;
}
</style>
