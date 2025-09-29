import React, { useState } from 'react'
import Input from '../ui/Input'
import { useTranslations } from 'next-intl'
import { deleteTodo, editTodo } from '@/features/todo/todoSlice'
import { useAppDispatch } from '@/store/hooks'
import { toast } from 'sonner'
import Modal from './Modal'
import TodoInput from './TodoInput'
import { convertTime } from '@/utils/convertTime'
import type { Todo } from '@/types/todo.types'

interface Props {
  task?: Todo
  isFinished?: boolean
}

export default function TaskItem({ task, isFinished }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const t = useTranslations('Todo')
  const dispatch = useAppDispatch()
  const handleDelete = async (id: string) => {
    await dispatch(deleteTodo(id))
    toast.success(t('notify.delete_success'))
  }
  const handleClose = () => {
    setIsOpen(!isOpen)
  }

  const handleToggleTask = async (task: Todo) => {
    await dispatch(
      editTodo({
        _id: task._id,
        title: task.title,
        content: task.content,
        deadline: task.deadline,
        is_finished: !task.is_finished,
      }),
    )
    toast.success(t('notify.status_change_success'))
  }

  const handleEdit = async (values: Todo) => {
    await dispatch(editTodo({ ...task, ...values }))
    toast.success(t('notify.edit_success'))
    handleClose()
  }
  return (
    <div
      className={`justify-between cursor-pointer p-4 group hover:bg-gray-50 rounded-2xl border border-gray-300 ${isFinished && 'opacity-50'}`}
    >
      <div className=" gap-3 w-full">
        <div className="flex w-full items-center pr-5 gap-4">
          <label className="flex items-center cursor-pointer">
            <Input
              type="checkbox"
              checked={!!task?.is_finished}
              onClick={(e) => e.stopPropagation()}
              onChange={() => {
                handleToggleTask(task!)
              }}
              className="peer hidden"
            />
            <span
              className="w-8 h-8 rounded-full border-4 border-blue-600 relative
      peer-checked:after:content-[''] peer-checked:after:w-2.5 peer-checked:after:h-2.5
      peer-checked:after:bg-blue-600 peer-checked:after:rounded-full
      peer-checked:after:absolute peer-checked:after:top-1/2 peer-checked:after:left-1/2
      peer-checked:after:-translate-x-1/2 peer-checked:after:-translate-y-1/2"
            ></span>
          </label>

          <div onClick={() => setIsOpen(true)} className="w-full">
            <div
              className={`text-gray-900 font-bold text-xl ${isFinished && 'line-through'}`}
            >
              {task?.title}
            </div>
            <div
              className={`text-gray-600 font-medium text-[14px] ${isFinished && 'line-through'}`}
            >
              {convertTime(task?.deadline ?? '')}
            </div>
          </div>
        </div>
      </div>
      {!isFinished && (
        <Modal
          title={t('detail_task_title')}
          open={isOpen}
          onClose={handleClose}
        >
          <TodoInput
            mode="edit"
            t={t}
            defaultValues={task}
            onSubmit={(values) => {
              handleEdit(values as Todo)
            }}
            onClose={handleClose}
            onDelete={() => {
              handleDelete(task?._id ?? '')
              handleClose()
            }}
          />
        </Modal>
      )}
    </div>
  )
}
