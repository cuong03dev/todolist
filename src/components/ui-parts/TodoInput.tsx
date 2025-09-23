'use client'
import React from 'react'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { TodoFormValues, todoSchema } from '@/schemas/todo.schema'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

interface Props {
  onClose: () => void
  t: any
  onSubmit?: (data: TodoFormValues) => void
  defaultValues?: Partial<TodoFormValues>
  mode?: 'add' | 'edit'
  onDelete?: (id: string) => void
  onEdit?: (data: TodoFormValues) => void
}

export default function TodoInput({
  t,
  onSubmit,
  defaultValues,
  mode,
  onDelete,
  onEdit,
  ...props
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoFormValues>({
    defaultValues,
    resolver: yupResolver(todoSchema(t)),
  })

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 border-b border-gray-200"
    >
      <div className="">
        <Input
          {...props}
          {...register('title')}
          className="w-full px-3 py-2 text-gray-500 bg-white border border-gray-300 rounded outline-none"
          type="text"
          id="taskInput"
          placeholder={t('add_task_placeholder')}
        />
        {errors.title && (
          <p className="text-sm text-red-500 mt-2">{errors.title.message}</p>
        )}
        <textarea
          {...props}
          {...register('content')}
          className="w-full mt-5 px-3 py-2 text-gray-500 bg-white border border-gray-300 rounded outline-none"
          placeholder={t('add_task_content_placeholder')}
        />
        {errors.content && (
          <p className="text-sm text-red-500 mt-2">{errors.content.message}</p>
        )}
        <Input
          {...props}
          {...register('deadline')}
          defaultValue={new Date().toISOString().split('T')[0]}
          className="w-full mt-5 px-3 py-2 text-gray-500 bg-white border border-gray-300 rounded outline-none"
          type="date"
        />
        {errors.deadline && (
          <p className="text-sm text-red-500 mt-2">{errors.deadline.message}</p>
        )}
        {mode === 'add' && (
          <Button className="px-4 mt-5 py-2 cursor-pointer bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
            {t('add_task_button')}
          </Button>
        )}

        {mode === 'edit' && (
          <div className="flex gap-4 mt-5">
            <Button
              onClick={onDelete}
              className="text-white bg-red-700 px-4 py-2 rounded-xl text-sm font-medium "
            >
              {t('delete_button')}
            </Button>
            <Button className="text-white bg-blue-500 px-4 py-2 rounded-xl text-sm font-medium">
              {t('update_button')}
            </Button>
          </div>
        )}
      </div>
    </form>
  )
}
