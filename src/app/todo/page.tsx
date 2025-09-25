'use client'
import Empty from '@/components/ui-parts/Empty'
import Loading from '@/components/ui-parts/Loading'
import Modal from '@/components/ui-parts/Modal'
import Tasks from '@/components/ui-parts/Tasks'
import TodoInput from '@/components/ui-parts/TodoInput'
import Button from '@/components/ui/Button'
import { EmptyIcon } from '@/components/ui/Icon'
import { addTodo, getAll } from '@/features/todo/todoSlice'
import { TodoFormValues } from '@/schemas/todo.schema'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function Todo() {
  const dispatch = useAppDispatch()
  const tasks = useAppSelector((state) => state.todo.value)
  const initialLoading = useAppSelector((state) => state.todo.initialLoading)
  const t = useTranslations('Todo')
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    dispatch(getAll())
  }, [dispatch])

  const handleClose = () => {
    setIsOpen(!isOpen)
  }
  const handleAdd = (values: TodoFormValues) => {
    dispatch(addTodo(values))
    handleClose()
    toast.success(t('notify.created_success'))
  }
  return (
    <div className="max-w-3xl flex mx-auto mt-10 bg-white  shadow-lg ">
      <div className="border border-gray-300 p-6 rounded-lg w-full">
        <div className=" ">
          <Modal
            title={t('add_task_placeholder')}
            open={isOpen}
            onClose={handleClose}
          >
            <TodoInput
              mode="add"
              t={t}
              onSubmit={(values) => handleAdd(values)}
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
          {initialLoading && <Loading />}
          <Tasks tasks={tasks.filter((task) => !task.is_finished)} />
          {!initialLoading &&
            tasks.filter((task) => !task.is_finished).length === 0 && (
              <Empty
                icon={<EmptyIcon className="w-10 h-10" />}
                title={t('empty')}
              />
            )}
        </div>
        <div className="mt-10">
          {tasks.filter((task) => task.is_finished).length > 0 && (
            <div className="font-bold py-3 text-[20px]">Completed</div>
          )}
          {initialLoading && <Loading />}
          {!initialLoading && (
            <Tasks
              isFinished
              tasks={tasks.filter((task) => task.is_finished)}
            />
          )}
        </div>
      </div>
    </div>
  )
}
