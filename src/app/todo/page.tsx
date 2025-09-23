'use client'
import Modal from '@/components/ui-parts/Modal'
import Tasks from '@/components/ui-parts/Tasks'
import TodoInput from '@/components/ui-parts/TodoInput'
import Button from '@/components/ui/Button'
import { addTodo, getAll } from '@/features/todo/todoSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

export default function Todo() {
  const dispatch = useAppDispatch()
  const tasks = useAppSelector((state) => state.todo.value)
  const t = useTranslations('Todo')
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    dispatch(getAll())
  }, [dispatch])

  const handleClose = () => {
    setIsOpen(!isOpen)
  }
  return (
    <div className="max-w-3xl flex mx-auto mt-10 bg-white  shadow-lg ">
      <div className="border border-gray-300 p-6 rounded-lg w-full ">
        <Modal
          title={t('add_task_placeholder')}
          open={isOpen}
          onClose={handleClose}
        >
          <TodoInput
            mode="add"
            t={t}
            onSubmit={(values) => {
              dispatch(addTodo(values))
              handleClose()
            }}
            onClose={handleClose}
          />
        </Modal>
        <div className="flex justify-between items-center mb-4">
          <div className="text-3xl font-medium">Todo</div>
          <Button
            onClick={() => setIsOpen(true)}
            type="button"
            className="text-white bg-[#3a3a3c]  focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
          >
            {t('add_task_button')}
          </Button>
        </div>
        <Tasks tasks={tasks} />
      </div>
    </div>
  )
}
