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
    <div className="justify-between p-4 group hover:bg-gray-50">
      <div className="flex items-center gap-3 w-full">
        <Input
          type="checkbox"
          className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
        />
        <div className="flex justify-between items-center w-full pr-5">
          <div className="text-gray-900 font-bold text-2xl">{task.title}</div>
        </div>
        <div className="text-gray-900 font-medium text-[14px] w-[100px] text-right">
          {task.deadline}
        </div>
      </div>
      <div className="px-3 py-1">{task.content}</div>

      <div className="flex gap-2 justify-end">
        <Button
          onClick={() => handleDelete(task._id)}
          className="text-white bg-red-700 px-4 py-2 rounded-xl text-sm font-medium "
        >
          {t('delete_button')}
        </Button>
        <Button className="text-white bg-blue-500 px-4 py-2 rounded-xl text-sm font-medium">
          {t('update_button')}
        </Button>
      </div>
    </div>
  )
}
