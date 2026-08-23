import { onScopeDispose, ref, watch, type Ref } from 'vue'

export function useDebouncedValue<T>(source: Ref<T>, delay = 350): Ref<T> {
  const debouncedValue = ref(source.value) as Ref<T>
  let timerId: ReturnType<typeof setTimeout> | undefined

  watch(source, (value) => {
    clearTimeout(timerId)
    timerId = setTimeout(() => {
      debouncedValue.value = value
    }, delay)
  })

  onScopeDispose(() => clearTimeout(timerId))

  return debouncedValue
}
