import React from 'react'

interface EmptyProps {
  icon?: React.ReactNode
  title: string
  className?: string
}

export default function Empty({ icon, title, className = '' }: EmptyProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-8 border border-dashed border-gray-300 rounded-2xl bg-gray-50 ${className}`}
    >
      {icon && <div className="mb-2 text-gray-400">{icon}</div>}

      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
    </div>
  )
}
