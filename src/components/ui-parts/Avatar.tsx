import React from 'react'

interface AvatarProps {
  character?: string
}

export default function Avatar({ character }: AvatarProps) {
  return (
    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold cursor-pointer">
      {character}
    </div>
  )
}
