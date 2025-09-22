import React from 'react'
import Input from '../ui/Input'
import Button from '../ui/Button'

type Props = {}

export default function TodoInput({}: Props) {
  return (
    <div className="p-4 border-b border-gray-200">
      <div className="flex gap-2">
        <Input
          className="flex-1 px-3 py-2 text-gray-500 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          type="text"
          id="taskInput"
          placeholder="Add new task"
        />
        <Button className="px-4 py-2 cursor-pointer bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
          Add
        </Button>
      </div>
    </div>
  )
}
