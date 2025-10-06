import React from 'react'
import Button from '../ui/Button'

interface MenuProps {
  data: {
    label: string
    onClick: () => void
    separator?: boolean
  }[]
}

export default function Menu({ data }: MenuProps) {
  return (
    <ul className="py-1 text-sm text-gray-700">
      {data.map((item) => (
        <li key={item.label}>
          <Button
            className="block w-full px-4 py-2 text-left hover:bg-gray-200"
            type="button"
            onClick={item.onClick}
          >
            {item.label}
          </Button>
          {item.separator && <div className="h-[1px] bg-gray-200 my-1" />}
        </li>
      ))}
    </ul>
  )
}
