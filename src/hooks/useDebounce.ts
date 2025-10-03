import debounce from 'lodash.debounce'
import { useCallback, useRef } from 'react'


export function useDebounceCallback<T extends (...args: any) => any>(
  func: T,
  delay = 300
) {
  const debouncedRef = useRef<ReturnType<typeof debounce>>(debounce(func, delay))

  return useCallback((...args: Parameters<T>) => {
    if (!debouncedRef.current) {
      debouncedRef.current = debounce(func, delay)
    }
    return debouncedRef.current(...args)
  }, [func, delay])
}