import { describe, expect, it } from 'vitest'
import {
  calculateDiscomfortIndex,
  calculateMeetingScore,
  getClothingRecommendation,
  getDinnerRecommendation,
} from '@/utils/recommendations'
import type { WeatherData } from '@/types/weather'

const clearWeather: WeatherData = {
  id: 'test-city',
  name: '테스트 도시',
  area: '테스트',
  country: 'KR',
  lat: 37.5,
  lon: 127,
  temperature: 22,
  feelsLike: 22,
  humidity: 55,
  windSpeed: 2,
  description: '맑음',
  iconCode: '01d',
}

describe('생활 추천 계산', () => {
  it('국가에 맞는 저녁 메뉴를 추천한다', () => {
    expect(getDinnerRecommendation(30, 'KR').title).toBe('물회')
    expect(getDinnerRecommendation(30, 'CN').title).toBe('량피')
  })

  it('온도에 맞는 옷차림을 추천한다', () => {
    expect(getClothingRecommendation(-2).title).toBe('패딩과 방한용품')
    expect(getClothingRecommendation(23).title).toBe('얇은 셔츠')
  })

  it('불쾌지수와 만남 지수를 허용 범위로 계산한다', () => {
    expect(calculateDiscomfortIndex(25, 60)).toBeTypeOf('number')
    expect(calculateMeetingScore(clearWeather)).toBeGreaterThanOrEqual(5)
    expect(calculateMeetingScore(clearWeather)).toBeLessThanOrEqual(95)
  })
})
