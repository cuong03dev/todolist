import React from 'react'
import TaskItem from './TaskItem'
import { Todo } from '@/types/todo.types'

interface Props {
  tasks: Todo[]
  isFinished?: boolean
}

export default function Tasks({ tasks, isFinished }: Props) {
  return (
    <div className="flex flex-col gap-3">
      {tasks?.map((task, index) => (
        <TaskItem key={index} task={task} isFinished={isFinished} />
      ))}
    </div>
  )
}
