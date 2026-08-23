export type CountryCode = 'KR' | 'CN'

export interface CityDefinition {
  id: string
  name: string
  englishName?: string
  area: string
  country: CountryCode
  lat: number
  lon: number
}

export interface WeatherData extends CityDefinition {
  temperature: number
  feelsLike: number
  humidity: number
  windSpeed: number
  description: string
  iconCode: string
}

export interface ForecastItem {
  dateTime: string
  temperature: number
  humidity: number
  description: string
  iconCode: string
}

export interface WeatherBatchResult {
  items: WeatherData[]
  failedCityNames: string[]
}

export interface RecommendationResult {
  title: string
  description: string
}
