import axios from 'axios'
import type {
  CityDefinition,
  ForecastItem,
  WeatherBatchResult,
  WeatherData,
} from '@/types/weather'

interface OpenWeatherCondition {
  description: string
  icon: string
}

interface OpenWeatherCurrentResponse {
  main: {
    temp: number
    feels_like: number
    humidity: number
  }
  weather: OpenWeatherCondition[]
  wind: {
    speed: number
  }
}

interface OpenWeatherForecastResponse {
  list: Array<{
    dt_txt: string
    main: {
      temp: number
      humidity: number
    }
    weather: OpenWeatherCondition[]
  }>
}

const weatherClient = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  timeout: 10000,
})

function getApiKey(): string {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY

  if (!apiKey) {
    throw new Error('VITE_OPENWEATHER_API_KEY가 설정되지 않았습니다.')
  }

  return apiKey
}

function getCondition(conditions: OpenWeatherCondition[]): OpenWeatherCondition {
  return conditions[0] ?? { description: '정보 없음', icon: '01d' }
}

export async function fetchCurrentWeather(
  city: CityDefinition,
  signal?: AbortSignal,
): Promise<WeatherData> {
  const response = await weatherClient.get<OpenWeatherCurrentResponse>('/weather', {
    params: {
      lat: city.lat,
      lon: city.lon,
      appid: getApiKey(),
      units: 'metric',
      lang: 'kr',
    },
    signal,
  })
  const condition = getCondition(response.data.weather)

  return {
    ...city,
    temperature: response.data.main.temp,
    feelsLike: response.data.main.feels_like,
    humidity: response.data.main.humidity,
    windSpeed: response.data.wind.speed,
    description: condition.description,
    iconCode: condition.icon,
  }
}

export async function fetchWeatherBatch(
  cities: CityDefinition[],
  signal?: AbortSignal,
): Promise<WeatherBatchResult> {
  const results = await Promise.allSettled(
    cities.map((city) => fetchCurrentWeather(city, signal)),
  )

  if (signal?.aborted) {
    throw new DOMException('날씨 요청이 취소되었습니다.', 'AbortError')
  }

  const items: WeatherData[] = []
  const failedCityNames: string[] = []

  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      items.push(result.value)
    } else {
      failedCityNames.push(cities[index]?.name ?? '알 수 없는 도시')
    }
  })

  if (cities.length > 0 && items.length === 0) {
    const firstFailure = results.find(
      (result): result is PromiseRejectedResult => result.status === 'rejected',
    )
    throw firstFailure?.reason instanceof Error
      ? firstFailure.reason
      : new Error('날씨 정보를 불러오지 못했습니다.')
  }

  return { items, failedCityNames }
}

export async function fetchForecast(
  city: CityDefinition,
  signal?: AbortSignal,
): Promise<ForecastItem[]> {
  const response = await weatherClient.get<OpenWeatherForecastResponse>('/forecast', {
    params: {
      lat: city.lat,
      lon: city.lon,
      appid: getApiKey(),
      units: 'metric',
      lang: 'kr',
    },
    signal,
  })

  return response.data.list.slice(0, 8).map((item) => {
    const condition = getCondition(item.weather)
    return {
      dateTime: item.dt_txt,
      temperature: item.main.temp,
      humidity: item.main.humidity,
      description: condition.description,
      iconCode: condition.icon,
    }
  })
}

export function getWeatherIconUrl(iconCode: string): string {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
}
