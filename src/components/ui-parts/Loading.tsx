'use client'

import React from 'react'

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg'
  color?: string
  className?: string
}

const Loading: React.FC<LoadingProps> = ({
  size = 'md',
  color = 'border-gray-700',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`${sizeClasses[size]} border-4 ${color} border-t-transparent rounded-full animate-spin`}
        role="status"
        aria-label="loading"
      />
    </div>
  )
}

export default Loading
