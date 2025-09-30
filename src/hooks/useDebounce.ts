import { useEffect, useState } from 'react'

interface UseDebounceProps {
  value: string
  delay: number
}

export const useDebounce = ({ value, delay }: UseDebounceProps) => {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => clearTimeout(timeout)
  }, [value, delay])

  return { debouncedValue }
}
