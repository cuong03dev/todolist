import React from 'react'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { useTranslations } from 'next-intl'
import { deleteTodo } from '@/features/todo/todoSlice'
import { useAppDispatch } from '@/store/hooks'

interface Props {
  task?: any
}

export default function TaskItem({ task }: Props) {
  const t = useTranslations('Todo')
  const dispatch = useAppDispatch()
  const handleDelete = (id: string) => {
    dispatch(deleteTodo(id))
  }

  return (
    <div className="flex items-center justify-between p-4 group hover:bg-gray-50">
      <div className="flex items-center gap-3">
        <Input
          type="checkbox"
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
        />
        <span className="text-gray-900 font-medium">{task.title}</span>
      </div>
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          onClick={() => handleDelete(task._id)}
          className="text-red-500 hover:text-red-700 text-sm font-medium"
        >
          {t('delete_button')}
        </Button>
        <Button className="text-blue-500 hover:text-blue-700 text-sm font-medium">
          {t('update_button')}
        </Button>
      </div>
    </div>
  )
}
