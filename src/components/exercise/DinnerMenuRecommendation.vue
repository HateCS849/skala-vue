<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  city: {
    type: Object,
    required: true,
  },
  menuType: {
    type: String,
    default: 'korean',
  },
})

const menuIndex = ref(0)
const currentMonth = new Date().getMonth() + 1

const seasonName = computed(() => {
  if (currentMonth >= 3 && currentMonth <= 5) return '봄'
  if (currentMonth >= 6 && currentMonth <= 8) return '여름'
  if (currentMonth >= 9 && currentMonth <= 11) return '가을'
  return '겨울'
})

const temperatureLevel = computed(() => {
  const temperature = props.city.temp

  if (temperature >= 30) return '30℃ 이상 · 매우 더움'
  if (temperature >= 25) return '25~29℃ · 더움'
  if (temperature >= 20) return '20~24℃ · 따뜻함'
  if (temperature >= 15) return '15~19℃ · 선선함'
  if (temperature >= 10) return '10~14℃ · 쌀쌀함'
  if (temperature >= 5) return '5~9℃ · 추움'
  return '5℃ 미만 · 매우 추움'
})

const menuConditionMessage = computed(() => {
  return `${seasonName.value} · ${temperatureLevel.value}`
})

const chineseMenuList = computed(() => {
  const status = props.city.status
  const temperature = props.city.temp

  if (status.includes('비')) {
    if (temperature >= 25) {
      return [
        {
          icon: '🍜',
          name: '산시 량피',
          side: '파이황과',
          reason: '덥고 습한 비 오는 날에는 새콤하고 매콤한 차가운 면이 입맛을 살려줘요.',
        },
        {
          icon: '🥢',
          name: '단단몐',
          side: '빙펀',
          reason: '고소한 참깨와 매콤한 양념 뒤에 시원한 중국식 디저트를 곁들이기 좋아요.',
        },
        {
          icon: '🍲',
          name: '쏸라펀',
          side: '산메이탕',
          reason: '새콤하고 얼얼한 당면과 시원한 매실 음료가 습한 날씨에 잘 어울려요.',
        },
      ]
    }

    return [
      {
        icon: '🥟',
        name: '샤오룽바오',
        side: '중국식 달걀탕',
        reason: '서늘하게 비 오는 저녁에는 따뜻한 육즙이 가득한 딤섬이 잘 어울려요.',
      },
      {
        icon: '🍜',
        name: '란저우 뉴러우몐',
        side: '차예단',
        reason: '맑고 뜨거운 소고기 국물과 쫄깃한 면이 비 오는 날 몸을 데워줘요.',
      },
      {
        icon: '🍲',
        name: '마라탕',
        side: '궈쿠이',
        reason: '얼얼하고 뜨거운 국물에 바삭한 중국식 빵을 곁들이면 든든해요.',
      },
    ]
  }

  if (status.includes('눈')) {
    return [
      {
        icon: '🍲',
        name: '베이징 양고기 훠궈',
        side: '참깨장 소스',
        reason: '눈 오는 날에는 얇은 양고기를 뜨거운 육수에 익혀 먹는 훠궈가 제격이에요.',
      },
      {
        icon: '🥘',
        name: '쏸차이바이러우',
        side: '화쥐안',
        reason: '새콤한 절임 배추와 돼지고기를 끓인 동북식 전골이 추위를 녹여줘요.',
      },
      {
        icon: '🍖',
        name: '둥베이 톄궈둔',
        side: '옥수수빵',
        reason: '고기와 채소를 큰 솥에 푹 끓인 요리라 눈 오는 저녁에 나눠 먹기 좋아요.',
      },
    ]
  }

  if (temperature >= 30) {
    return [
      {
        icon: '🍜',
        name: '쓰촨 량몐',
        side: '파이황과',
        reason: '차갑게 식힌 면과 오이무침이 30℃가 넘는 날의 더위를 식혀줘요.',
      },
      {
        icon: '🥙',
        name: '량피와 로우자모',
        side: '산메이탕',
        reason: '시원한 면과 고기를 채운 중국식 빵을 함께 먹으면 가볍고 든든해요.',
      },
      {
        icon: '🍚',
        name: '하이난 원창지판',
        side: '둥과탕',
        reason: '담백한 닭고기밥과 깔끔한 동과국은 무더운 저녁에도 부담이 적어요.',
      },
    ]
  }

  if (temperature < 5) {
    return [
      {
        icon: '🍲',
        name: '충칭 마라 훠궈',
        side: '홍탕과 백탕',
        reason: '매콤하고 뜨거운 훠궈가 5℃ 미만의 차가운 날씨에 몸을 따뜻하게 해줘요.',
      },
      {
        icon: '🍖',
        name: '훙사오러우',
        side: '중국식 흰밥',
        reason: '진한 간장 양념으로 천천히 익힌 돼지고기는 추운 저녁에 든든해요.',
      },
      {
        icon: '🥣',
        name: '시안 양러우파오모',
        side: '탕수안',
        reason: '빵을 잘게 뜯어 양고기 국물에 말아 먹는 시안 음식이라 속까지 따뜻해져요.',
      },
    ]
  }

  if (seasonName.value === '봄') {
    if (temperature >= 20) {
      return [
        {
          icon: '🥞',
          name: '춘빙과 징장러우쓰',
          side: '대파와 오이채',
          reason: '따뜻한 봄에는 얇은 전병에 달콤 짭짤한 돼지고기와 채소를 싸 먹기 좋아요.',
        },
        {
          icon: '🍚',
          name: '유샹러우쓰',
          side: '중국식 흰밥',
          reason: '향긋하고 새콤달콤한 쓰촨식 돼지고기볶음이 봄철 입맛을 살려줘요.',
        },
        {
          icon: '🦐',
          name: '칭차오샤런',
          side: '달걀볶음밥',
          reason: '담백하게 볶은 새우와 고슬고슬한 볶음밥이 따뜻한 봄 저녁에 잘 어울려요.',
        },
      ]
    }

    return [
      {
        icon: '🍲',
        name: '상하이 옌두셴',
        side: '총유빙',
        reason: '봄 죽순과 돼지고기를 끓인 담백한 국물이 선선한 봄 저녁에 잘 어울려요.',
      },
      {
        icon: '🥟',
        name: '훈툰탕',
        side: '칭차오유차이',
        reason: '부드러운 완탕과 맑은 국물이 쌀쌀한 날 가볍고 따뜻한 한 끼가 되어줘요.',
      },
      {
        icon: '🍜',
        name: '쑤저우 탕몐',
        side: '장야',
        reason: '섬세하고 따뜻한 국물 면에 향신 간장으로 익힌 오리고기를 곁들이기 좋아요.',
      },
    ]
  }

  if (seasonName.value === '여름') {
    if (temperature >= 25) {
      return [
        {
          icon: '🍜',
          name: '베이징 즈마장 량몐',
          side: '탕추마늘',
          reason: '고소한 참깨장과 차가운 면이 더운 여름 저녁에 시원한 한 끼가 되어줘요.',
        },
        {
          icon: '🍢',
          name: '청두 보보지',
          side: '빙펀',
          reason: '차갑게 즐기는 매콤한 꼬치 뒤에 시원한 빙펀을 먹으면 더위를 달래기 좋아요.',
        },
        {
          icon: '🥗',
          name: '쏸라량펀',
          side: '로우자모',
          reason: '새콤하고 매콤한 차가운 묵과 고기빵의 조합이 무더운 날 입맛을 살려줘요.',
        },
      ]
    }

    return [
      {
        icon: '🍗',
        name: '광둥 바이잔지',
        side: '생강 파 소스',
        reason: '부드럽고 담백한 닭고기는 선선한 여름 저녁에 부담 없이 즐기기 좋아요.',
      },
      {
        icon: '🥣',
        name: '둥과갈비탕',
        side: '량반무얼',
        reason: '깔끔한 동과 국물과 새콤한 목이버섯무침이 여름 식탁을 산뜻하게 해줘요.',
      },
      {
        icon: '🍆',
        name: '디싼셴',
        side: '양저우 볶음밥',
        reason: '가지와 감자, 피망을 볶은 동북 요리를 볶음밥과 먹으면 든든해요.',
      },
    ]
  }

  if (seasonName.value === '가을') {
    if (temperature <= 10) {
      return [
        {
          icon: '🍗',
          name: '반리사오지',
          side: '화쥐안',
          reason: '밤과 닭고기를 함께 졸인 음식이라 쌀쌀한 가을에 달큰하고 든든해요.',
        },
        {
          icon: '🐟',
          name: '쏸차이위',
          side: '중국식 흰밥',
          reason: '새콤한 절임 채소와 생선을 끓인 뜨거운 국물이 차가워진 몸을 데워줘요.',
        },
        {
          icon: '🍄',
          name: '윈난 버섯 훠궈',
          side: '새우완자',
          reason: '향이 풍부한 여러 버섯을 따뜻한 육수에 끓여 가을의 풍미를 즐길 수 있어요.',
        },
      ]
    }

    return [
      {
        icon: '🦆',
        name: '베이징 카오야',
        side: '춘빙과 톈몐장',
        reason: '바삭한 오리고기를 전병에 싸 먹는 요리는 선선한 가을 저녁에 잘 어울려요.',
      },
      {
        icon: '🦀',
        name: '상하이 다자셰',
        side: '생강차',
        reason: '가을 제철 민물게의 진한 풍미를 따뜻한 생강차와 함께 즐기기 좋아요.',
      },
      {
        icon: '🥩',
        name: '꿔바오러우',
        side: '디싼셴',
        reason: '바삭하고 새콤달콤한 돼지고기와 채소볶음이 선선한 저녁에 든든해요.',
      },
    ]
  }

  if (temperature <= 10) {
    return [
      {
        icon: '🍲',
        name: '쓰촨 위안양 훠궈',
        side: '콴펀과 두부피',
        reason: '매운 홍탕과 담백한 백탕을 함께 즐기며 추운 겨울 저녁을 따뜻하게 보낼 수 있어요.',
      },
      {
        icon: '🥟',
        name: '둥베이 수이자오',
        side: '라바 마늘',
        reason: '따뜻하게 삶은 중국식 만두와 새콤한 절임 마늘은 겨울철 대표 조합이에요.',
      },
      {
        icon: '🥣',
        name: '푸젠 포탸오창',
        side: '푸저우 위완',
        reason: '여러 해산물과 고기를 오래 끓인 진한 국물이 추운 날 든든함을 더해줘요.',
      },
    ]
  }

  return [
    {
      icon: '🍜',
      name: '광둥 완탕몐',
      side: '칭차오제란',
      reason: '새우 완탕과 가는 면을 담은 맑은 국물이 선선한 겨울 저녁에 잘 어울려요.',
    },
    {
      icon: '🍖',
      name: '광둥 차사오',
      side: '양저우 볶음밥',
      reason: '달콤하고 짭짤하게 구운 돼지고기를 고슬고슬한 볶음밥과 즐기기 좋아요.',
    },
    {
      icon: '🥟',
      name: '광둥 딤섬',
      side: '피단서우러우저우',
      reason: '여러 종류의 따뜻한 딤섬과 중국식 죽을 함께 먹으면 편안하고 든든해요.',
    },
  ]
})

const menuList = computed(() => {
  if (props.menuType === 'chinese') return chineseMenuList.value

  const status = props.city.status
  const temperature = props.city.temp

  if (status.includes('비')) {
    if (temperature >= 25) {
      return [
        {
          icon: '🥞',
          name: '김치전',
          side: '시원한 식혜',
          reason: '더운 비 오는 날에는 바삭한 전과 시원한 음료가 잘 어울려요.',
        },
        {
          icon: '🍜',
          name: '비빔국수',
          side: '군만두',
          reason: '습도가 높은 날에는 새콤하고 매콤한 음식이 입맛을 살려줘요.',
        },
        {
          icon: '🥗',
          name: '냉모밀',
          side: '채소튀김',
          reason: '비가 와도 더운 날에는 시원하고 가벼운 면 요리가 좋아요.',
        },
      ]
    }

    return [
      {
        icon: '🥞',
        name: '해물파전',
        side: '막걸리 또는 식혜',
        reason: '빗소리와 가장 잘 어울리는 따뜻하고 바삭한 메뉴예요.',
      },
      { icon: '🍲', name: '국물 떡볶이', side: '모둠 튀김', reason: '습하고 서늘한 저녁에 매콤한 국물이 잘 어울려요.' },
      { icon: '🍜', name: '칼국수', side: '겉절이', reason: '비 오는 날에는 뜨끈한 면 요리가 제격이에요.' },
    ]
  }

  if (status.includes('눈')) {
    return [
      { icon: '🍢', name: '어묵전골', side: '주먹밥', reason: '눈 오는 저녁에 몸을 따뜻하게 데워주는 메뉴예요.' },
      { icon: '🥘', name: '부대찌개', side: '계란말이', reason: '추운 날 여럿이 나눠 먹기 좋은 든든한 메뉴예요.' },
      { icon: '🥟', name: '떡만둣국', side: '김치', reason: '눈 오는 날에는 뜨끈한 국물과 든든한 만두가 잘 어울려요.' },
    ]
  }

  if (temperature >= 30) {
    return [
      {
        icon: '🍜',
        name: '물냉면',
        side: '숯불고기',
        reason: '30℃가 넘는 날에는 차갑고 깔끔한 메뉴가 더위를 식혀줘요.',
      },
      {
        icon: '🥣',
        name: '콩국수',
        side: '오이무침',
        reason: '고소하고 시원한 콩국수는 무더운 날에도 든든하게 먹기 좋아요.',
      },
      { icon: '🐟', name: '물회', side: '소면', reason: '매콤하고 시원한 물회는 더위로 떨어진 입맛을 살려줘요.' },
    ]
  }

  if (temperature < 5) {
    return [
      {
        icon: '🍲',
        name: '설렁탕',
        side: '깍두기',
        reason: '5℃ 미만의 추운 날에는 오래 따뜻하게 먹을 수 있는 국물이 좋아요.',
      },
      { icon: '🥘', name: '매운탕', side: '공깃밥', reason: '얼큰하고 뜨거운 국물이 차가워진 몸을 따뜻하게 해줘요.' },
      { icon: '🍢', name: '어묵전골', side: '주먹밥', reason: '뜨거운 국물과 어묵은 매우 추운 저녁에 잘 어울려요.' },
    ]
  }

  if (seasonName.value === '봄') {
    if (temperature >= 20) {
      return [
        {
          icon: '🥗',
          name: '봄나물 비빔밥',
          side: '된장국',
          reason: '따뜻한 봄날에는 향긋한 봄나물을 가볍게 즐기기 좋아요.',
        },
        {
          icon: '🐙',
          name: '주꾸미 볶음',
          side: '날치알 볶음밥',
          reason: '따뜻해진 날씨에는 제철 주꾸미와 매콤한 양념이 잘 어울려요.',
        },
        {
          icon: '🥬',
          name: '월남쌈',
          side: '쌀국수',
          reason: '산뜻한 봄 저녁에는 채소를 풍성하게 즐기는 메뉴가 좋아요.',
        },
      ]
    }

    return [
      {
        icon: '🍲',
        name: '냉이 된장국',
        side: '제육볶음',
        reason: '선선한 봄에는 향긋하고 따뜻한 된장국이 잘 어울려요.',
      },
      {
        icon: '🍜',
        name: '바지락 칼국수',
        side: '겉절이',
        reason: '봄철 바지락과 따뜻한 국물은 쌀쌀한 저녁에 잘 어울려요.',
      },
      { icon: '🐙', name: '주꾸미 샤브샤브', side: '죽', reason: '제철 주꾸미를 따뜻하고 담백하게 즐길 수 있어요.' },
    ]
  }

  if (seasonName.value === '여름') {
    if (temperature >= 25) {
      return [
        {
          icon: '🍗',
          name: '초계국수',
          side: '메밀전병',
          reason: '더운 여름에는 차갑고 새콤한 국물이 입맛을 살려줘요.',
        },
        {
          icon: '🥗',
          name: '메밀소바',
          side: '새우튀김',
          reason: '가볍고 시원한 메밀소바는 더운 저녁에 부담이 적어요.',
        },
        {
          icon: '🍚',
          name: '회덮밥',
          side: '미소국',
          reason: '신선한 채소와 매콤한 양념을 함께 즐길 수 있는 여름 메뉴예요.',
        },
      ]
    }

    return [
      {
        icon: '🍗',
        name: '삼계탕',
        side: '오이무침',
        reason: '선선한 여름날에는 따뜻한 보양식으로 기운을 채우기 좋아요.',
      },
      {
        icon: '🥩',
        name: '보쌈',
        side: '막국수',
        reason: '따뜻한 고기와 시원한 막국수를 함께 즐기기 좋은 조합이에요.',
      },
      {
        icon: '🍛',
        name: '여름 채소 카레',
        side: '샐러드',
        reason: '제철 채소를 넣은 카레는 든든하면서도 부담이 적어요.',
      },
    ]
  }

  if (seasonName.value === '가을') {
    if (temperature <= 10) {
      return [
        {
          icon: '🦀',
          name: '꽃게탕',
          side: '계란찜',
          reason: '차가워진 가을 저녁에는 제철 꽃게와 뜨거운 국물이 잘 어울려요.',
        },
        { icon: '🍄', name: '버섯전골', side: '죽', reason: '향긋한 가을 버섯과 따뜻한 국물로 든든하게 먹기 좋아요.' },
        {
          icon: '🍲',
          name: '추어탕',
          side: '부추무침',
          reason: '쌀쌀한 가을에는 진하고 뜨거운 국물 음식이 잘 어울려요.',
        },
      ]
    }

    return [
      { icon: '🦐', name: '대하구이', side: '해물라면', reason: '선선한 가을에는 제철 대하를 고소하게 즐기기 좋아요.' },
      {
        icon: '🐟',
        name: '전어구이',
        side: '된장찌개',
        reason: '가을 제철 전어는 구수한 향과 선선한 날씨가 잘 어울려요.',
      },
      {
        icon: '🍄',
        name: '버섯 솥밥',
        side: '두부조림',
        reason: '향긋한 버섯과 따뜻한 솥밥으로 가을 분위기를 느낄 수 있어요.',
      },
    ]
  }

  if (temperature <= 10) {
    return [
      {
        icon: '🍲',
        name: '돼지국밥',
        side: '부추무침',
        reason: '추운 겨울 저녁에는 속까지 따뜻해지는 국밥이 잘 어울려요.',
      },
      {
        icon: '🥘',
        name: '부대찌개',
        side: '계란말이',
        reason: '뜨겁고 얼큰한 찌개는 추운 날 여럿이 나눠 먹기 좋아요.',
      },
      { icon: '🥟', name: '떡만둣국', side: '김치', reason: '겨울에는 따뜻한 국물과 든든한 떡, 만두가 잘 어울려요.' },
    ]
  }

  return [
    {
      icon: '🍜',
      name: '샤브샤브',
      side: '죽',
      reason: '선선한 겨울 저녁에는 따뜻한 국물과 채소를 함께 즐기기 좋아요.',
    },
    { icon: '🍗', name: '닭볶음탕', side: '볶음밥', reason: '매콤하고 뜨거운 닭볶음탕은 겨울 저녁에 든든한 메뉴예요.' },
    {
      icon: '🥘',
      name: '김치찌개',
      side: '계란말이',
      reason: '익숙하고 따뜻한 김치찌개는 겨울에 편안하게 즐기기 좋아요.',
    },
  ]
})

const selectedMenuInfo = computed(() => {
  return menuList.value[menuIndex.value]
})

const handleNextMenu = () => {
  menuIndex.value += 1

  if (menuIndex.value >= menuList.value.length) {
    menuIndex.value = 0
  }
}

watch(
  () => props.city.id,
  () => {
    menuIndex.value = 0
  },
)
</script>

<template>
  <article class="recommendation-card recommendation-card--dinner">
    <div class="recommendation-card__heading">
      <span>{{ selectedMenuInfo.icon }}</span>
      <div>
        <p class="recommendation-card__label">오늘 저녁 메뉴</p>
        <h3>{{ selectedMenuInfo.name }}</h3>
      </div>
    </div>

    <div class="recommendation-card__tags">
      <el-tag type="success">{{ menuConditionMessage }}</el-tag>
      <el-tag type="warning">곁들이기: {{ selectedMenuInfo.side }}</el-tag>
    </div>
    <p>{{ selectedMenuInfo.reason }}</p>
    <el-button plain type="warning" @click="handleNextMenu">다른 메뉴 추천</el-button>
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
  border: 1px solid rgb(251 191 36 / 28%);
  border-radius: 1.2rem;
  background:
    radial-gradient(circle at 100% 0, rgb(251 146 60 / 24%), transparent 42%),
    linear-gradient(145deg, rgb(124 45 18 / 48%), rgb(52 22 18 / 65%));
  box-shadow:
    0 18px 42px rgb(42 15 3 / 28%),
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
  color: rgb(255 237 213 / 6%);
  content: '✦';
  font-size: 9rem;
}

.recommendation-card:hover {
  box-shadow:
    0 25px 55px rgb(42 15 3 / 40%),
    0 0 28px rgb(249 115 22 / 12%);
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
  border: 1px solid rgb(254 215 170 / 18%);
  border-radius: 1rem;
  place-items: center;
  background: rgb(255 255 255 / 7%);
  box-shadow: 0 10px 25px rgb(67 20 7 / 25%);
  font-size: 2.15rem;
}

.recommendation-card__label {
  color: #fdba74;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.06em;
}

h3 {
  color: #fff7ed;
  font-size: 1.2rem;
  font-weight: 850;
}

.recommendation-card > p {
  color: #fed7aa;
  font-size: 0.88rem;
}

.recommendation-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.recommendation-card :deep(.el-button) {
  justify-self: start;
  --el-button-text-color: #fed7aa;
  --el-button-border-color: rgb(251 146 60 / 45%);
  --el-button-bg-color: rgb(124 45 18 / 24%);
  --el-button-hover-bg-color: rgb(234 88 12 / 42%);
}

.recommendation-card {
  border-color: #f2d89a;
  border-radius: 20px;
  background: linear-gradient(145deg, #ffffff, #fffaf0);
  box-shadow: 0 10px 28px rgb(120 72 18 / 8%);
}

.recommendation-card::after {
  color: rgb(245 158 11 / 8%);
}

.recommendation-card:hover {
  box-shadow: 0 20px 40px rgb(120 72 18 / 13%);
  transform: translateY(-4px);
}

.recommendation-card__heading > span {
  border-color: #f2d89a;
  background: #fff6e0;
  box-shadow: none;
}

.recommendation-card__label {
  color: #b66b00;
}

h3 {
  color: var(--ink-900);
  font-weight: 700;
}

.recommendation-card > p {
  color: var(--ink-600);
}

.recommendation-card :deep(.el-button) {
  --el-button-text-color: #9a5a00;
  --el-button-border-color: #f2d89a;
  --el-button-bg-color: #fff6e0;
  --el-button-hover-bg-color: #ffe8b3;
}
</style>
