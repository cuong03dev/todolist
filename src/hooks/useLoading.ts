import { LoadingContext } from '@/contexts/LoadingContext'
import { useContext } from 'react'

export function useLoading() {
  const context = useContext(LoadingContext)
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider')
  }
  return context
}
