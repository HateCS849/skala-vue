import type { CountryCode, RecommendationResult, WeatherData } from '@/types/weather'

export function getDinnerRecommendation(
  temperature: number,
  country: CountryCode,
): RecommendationResult {
  if (country === 'CN') {
    if (temperature <= 5) {
      return { title: '훠궈', description: '따뜻한 육수와 향신료로 몸을 데우기 좋은 저녁입니다.' }
    }
    if (temperature <= 15) {
      return { title: '마파두부', description: '알싸하고 따뜻한 소스가 선선한 날씨와 잘 어울립니다.' }
    }
    if (temperature <= 25) {
      return { title: '딤섬', description: '여러 종류를 가볍게 나누어 먹기 좋은 메뉴입니다.' }
    }
    return { title: '량피', description: '차갑고 새콤한 면 요리로 더운 날 입맛을 살려줍니다.' }
  }

  if (temperature <= 5) {
    return { title: '부대찌개', description: '뜨끈한 국물과 든든한 재료가 추운 저녁에 잘 어울립니다.' }
  }
  if (temperature <= 15) {
    return { title: '닭갈비', description: '따뜻하고 매콤한 한 끼로 쌀쌀한 저녁을 채워보세요.' }
  }
  if (temperature <= 25) {
    return { title: '불고기', description: '부담 없이 든든하게 즐기기 좋은 저녁 메뉴입니다.' }
  }
  return { title: '물회', description: '시원하고 산뜻한 맛으로 더운 날의 열기를 식혀줍니다.' }
}

export function getClothingRecommendation(temperature: number): RecommendationResult {
  if (temperature <= 0) {
    return { title: '패딩과 방한용품', description: '두꺼운 외투에 장갑과 목도리를 함께 준비하세요.' }
  }
  if (temperature <= 10) {
    return { title: '코트와 니트', description: '겹쳐 입을 수 있는 니트와 따뜻한 외투가 필요합니다.' }
  }
  if (temperature <= 20) {
    return { title: '재킷과 긴소매', description: '일교차에 대응할 수 있는 가벼운 겉옷을 챙기세요.' }
  }
  if (temperature <= 27) {
    return { title: '얇은 셔츠', description: '통기성이 좋은 얇은 상의와 가벼운 하의가 적당합니다.' }
  }
  return { title: '반소매와 자외선 차단', description: '시원한 옷과 모자, 자외선 차단제를 준비하세요.' }
}

export function calculateDiscomfortIndex(temperature: number, humidity: number): number {
  return Math.round(
    0.81 * temperature + 0.01 * humidity * (0.99 * temperature - 14.3) + 46.3,
  )
}

export function calculateMeetingScore(weather: WeatherData): number {
  const comfortPenalty = Math.abs(calculateDiscomfortIndex(weather.temperature, weather.humidity) - 68)
  const rainPenalty = weather.description.includes('비') ? 12 : 0
  const windPenalty = weather.windSpeed >= 8 ? 8 : 0
  return Math.max(5, Math.min(95, Math.round(86 - comfortPenalty * 1.4 - rainPenalty - windPenalty)))
}
