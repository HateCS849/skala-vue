import { computed, ref, type ComputedRef, type Ref } from 'vue'
import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import { fetchWeatherBatch } from '@/api/weatherApi'
import { useDebouncedValue } from '@/composables/useDebouncedValue'
import type { CityDefinition, CountryCode, WeatherData } from '@/types/weather'

interface WeatherDashboardState {
  searchQuery: Ref<string>
  visibleCount: Ref<number>
  targetCities: ComputedRef<CityDefinition[]>
  weatherList: ComputedRef<WeatherData[]>
  failedCityNames: ComputedRef<string[]>
  hasMoreCities: ComputedRef<boolean>
  isPending: Ref<boolean>
  isFetching: Ref<boolean>
  error: Ref<Error | null>
  loadMore: () => void
  refresh: () => void
}

export function useWeatherDashboard(
  country: CountryCode,
  cities: CityDefinition[],
  initialCount: number,
  loadCount: number,
): WeatherDashboardState {
  const searchQuery = ref('')
  const debouncedQuery = useDebouncedValue(searchQuery)
  const visibleCount = ref(initialCount)

  const targetCities = computed(() => {
    const keyword = debouncedQuery.value.trim().toLocaleLowerCase()

    if (!keyword) {
      return cities.slice(0, visibleCount.value)
    }

    return cities.filter((city) => {
      return [city.name, city.englishName, city.area]
        .filter(Boolean)
        .some((text) => text?.toLocaleLowerCase().includes(keyword))
    })
  })

  const cityIds = computed(() => targetCities.value.map((city) => city.id))
  const weatherQuery = useQuery({
    queryKey: computed(() => ['weather-list', country, cityIds.value]),
    queryFn: ({ signal }) => fetchWeatherBatch(targetCities.value, signal),
    enabled: computed(() => targetCities.value.length > 0),
    placeholderData: keepPreviousData,
  })

  const weatherList = computed(() => weatherQuery.data.value?.items ?? [])
  const failedCityNames = computed(
    () => weatherQuery.data.value?.failedCityNames ?? [],
  )
  const hasMoreCities = computed(() => {
    return !debouncedQuery.value.trim() && visibleCount.value < cities.length
  })

  function loadMore(): void {
    visibleCount.value = Math.min(visibleCount.value + loadCount, cities.length)
  }

  function refresh(): void {
    void weatherQuery.refetch()
  }

  return {
    searchQuery,
    visibleCount,
    targetCities,
    weatherList,
    failedCityNames,
    hasMoreCities,
    isPending: weatherQuery.isPending,
    isFetching: weatherQuery.isFetching,
    error: weatherQuery.error,
    loadMore,
    refresh,
  }
}
