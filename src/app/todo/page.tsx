'use client'
import Tasks from '@/components/ui-parts/Tasks'
import TodoInput from '@/components/ui-parts/TodoInput'
import { getAll } from '@/features/todo/todoSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useEffect } from 'react'

export default function Todo() {
  const dispatch = useAppDispatch()
  const tasks = useAppSelector((state) => state.todo.value)

  useEffect(() => {
    dispatch(getAll())
  }, [dispatch])

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
      <TodoInput />
      <Tasks tasks={tasks} />
    </div>
  )
}
