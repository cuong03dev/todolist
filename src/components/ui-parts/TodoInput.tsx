'use client'
import React, { useEffect } from 'react'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { useTranslations } from 'next-intl'
import { TodoFormValues, todoSchema } from '@/schemas/todo.schema'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { addTodo, editTodo } from '@/features/todo/todoSlice'

type Props = {}

export default function TodoInput({ ...props }: Props) {
  const dispatch = useAppDispatch()
  const t = useTranslations('Todo')
  const editingValue = useAppSelector((state) => state.todo.editingValue)
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoFormValues>({
    resolver: yupResolver(todoSchema(t)),
  })

  useEffect(() => {
    if (editingValue) {
      reset({
        title: editingValue.title,
        content: editingValue.content,
        deadline: editingValue.deadline,
      })
    }
  }, [editingValue, reset])
  const onSubmit = (data: TodoFormValues) => {
    const payload = {
      title: data.title,
      content: data.content ?? '',
      deadline: data.deadline ?? '',
      is_finished: data.is_finished ?? false,
    }

    if (editingValue) {
      dispatch(editTodo({ ...editingValue, ...payload }))
    } else {
      dispatch(addTodo(payload))
    }
    reset()
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 border-b border-gray-200"
    >
      <div className="">
        <Input
          {...props}
          {...register('title')}
          className="w-full px-3 py-2 text-gray-500 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
          className="w-full mt-5 px-3 py-2 text-gray-500 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder={t('add_task_content_placeholder')}
        />
        {errors.content && (
          <p className="text-sm text-red-500 mt-2">{errors.content.message}</p>
        )}
        <input
          {...props}
          {...register('deadline')}
          defaultValue={new Date().toISOString().split('T')[0]}
          className="w-full mt-5 px-3 py-2 text-gray-500 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          type="date"
        />
        {errors.deadline && (
          <p className="text-sm text-red-500 mt-2">{errors.deadline.message}</p>
        )}
        <Button className="px-4 mt-5 py-2 cursor-pointer bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
          {t('add_task_button')}
        </Button>
      </div>
    </form>
  )
}
