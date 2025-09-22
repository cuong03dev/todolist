import React from 'react'
import TaskItem from './TaskItem'

type Props = {}

export default function Tasks({}: Props) {
  return (
    <div className="divide-y divide-gray-200">
      <TaskItem />
      <TaskItem />
      <TaskItem />
    </div>
  )
}
