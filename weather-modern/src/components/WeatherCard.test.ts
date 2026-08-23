import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import WeatherCard from '@/components/WeatherCard.vue'
import type { WeatherData } from '@/types/weather'

const weather: WeatherData = {
  id: 'kr-001',
  name: '서울',
  area: '수도권',
  country: 'KR',
  lat: 37.5665,
  lon: 126.978,
  temperature: 24.4,
  feelsLike: 25.1,
  humidity: 58,
  windSpeed: 2.4,
  description: '맑음',
  iconCode: '01d',
}

describe('WeatherCard', () => {
  it('날씨 정보와 반올림한 기온을 표시한다', () => {
    const wrapper = mount(WeatherCard, { props: { weather } })

    expect(wrapper.text()).toContain('서울')
    expect(wrapper.text()).toContain('24°')
    expect(wrapper.text()).toContain('습도 58%')
  })

  it('카드를 누르면 선택 이벤트를 보낸다', async () => {
    const wrapper = mount(WeatherCard, { props: { weather } })

    await wrapper.trigger('click')

    expect(wrapper.emitted('select')?.[0]).toEqual([weather])
  })
})
