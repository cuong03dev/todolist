'use client'
import LoadingOverlay from '@/components/ui-parts/LoadingOverlay'
import { useTranslations } from 'next-intl'
import React, { createContext, useContext, useState } from 'react'
type LoadingContextType = {
  isLoading: boolean
  setLoading: (value: boolean) => void
}
export const LoadingContext = createContext<LoadingContextType | undefined>(
  undefined,
)
export default function LoadingProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoading, setLoading] = useState(false)
  const t = useTranslations('Todo')
  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      {children}
      {isLoading && <LoadingOverlay message={t('loading')} />}
    </LoadingContext.Provider>
  )
}

export function useLoading() {
  const context = useContext(LoadingContext)
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider')
  }
  return context
}
