'use client'

import React from 'react'
import Loading from './Loading'

interface LoadingOverlayProps {
  isLoading: boolean
  message?: string
  bgColor?: string
  bgOpacity?: string
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isLoading,
  message,
  bgColor = 'bg-gray-800',
  bgOpacity = 'bg-opacity-75',
}) => {
  if (!isLoading) return null

  return (
    <div
      className={`fixed inset-0 ${bgColor} ${bgOpacity} z-50 flex items-center justify-center flex-col`}
    >
      <Loading size="lg" />
      {message && (
        <p className="text-white mt-4 text-xl font-medium">{message}</p>
      )}
    </div>
  )
}

export default LoadingOverlay
