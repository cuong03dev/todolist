import React from 'react'
import TaskItem from './TaskItem'

interface Props {
  tasks: any[]
}

export default function Tasks({ tasks }: Props) {
  return (
    <div className="flex flex-col gap-3">
      {tasks?.map((task, index) => (
        <TaskItem key={index} task={task} />
      ))}
    </div>
  )
}
