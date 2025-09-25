'use client'
import Empty from '@/components/ui-parts/Empty'
import Filter from '@/components/ui-parts/Filter'
import Loading from '@/components/ui-parts/Loading'
import Modal from '@/components/ui-parts/Modal'
import Pagination from '@/components/ui-parts/Pagination'
import SearchBar from '@/components/ui-parts/SearchBar'
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
  const [filteredTasks, setFilteredTasks] = useState([])
  const [isFiltered, setIsFiltered] = useState(false)

  useEffect(() => {
    dispatch(getAll())
  }, [dispatch])

  useEffect(() => {
    if (!isFiltered) {
      setFilteredTasks(tasks)
    }
  }, [tasks, isFiltered])

  const handleClose = () => {
    setIsOpen(!isOpen)
  }
  const handleAdd = (values: TodoFormValues) => {
    dispatch(
      addTodo({
        title: values.title,
        content: values.content,
        deadline: values.deadline || '',
        is_finished: values.is_finished || false,
      }),
    )
    handleClose()
    toast.success(t('notify.created_success'))
  }
  const handlleFilter = (
    filterType: string,
    dateFrom: string,
    dateTo: string,
  ) => {
    if (dateFrom && dateTo) {
      const filtered = tasks.filter((task) => {
        if (!task.deadline) return false
        const taskDate = new Date(task.deadline)
        const fromDate = new Date(dateFrom)
        const toDate = new Date(dateTo)
        return taskDate >= fromDate && taskDate <= toDate
      })
      setFilteredTasks(filtered)
      setIsFiltered(true)
    } else if (filterType === 'all') {
      setFilteredTasks(tasks)
      setIsFiltered(false)
    }
  }
  const handleSearch = (value: string) => {
    setFilteredTasks(tasks.filter((task) => task.title.includes(value)))
  }
  return (
    <>
      <div className="max-w-3xl  mx-auto mt-10 bg-white shadow-lg pb-6">
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
                className="text-white bg-[#3a3a3c] focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              >
                {t('add_task_button')}
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
              <SearchBar onSearch={handleSearch} />
            </div>
            <Filter onFilterChange={handlleFilter} />

            {initialLoading && <Loading />}
            <Tasks tasks={filteredTasks.filter((task) => !task.is_finished)} />
            {!initialLoading &&
              filteredTasks.filter((task) => !task.is_finished).length ===
                0 && (
                <Empty
                  icon={<EmptyIcon className="w-10 h-10" />}
                  title={t('empty')}
                />
              )}
          </div>
          <div className="mt-10">
            {filteredTasks.filter((task) => task.is_finished).length > 0 && (
              <div className="font-bold py-3 text-[20px]">Completed</div>
            )}
            {initialLoading && <Loading />}
            {!initialLoading && (
              <Tasks
                isFinished
                tasks={filteredTasks.filter((task) => task.is_finished)}
              />
            )}
          </div>
        </div>
        <div className="mt-5 flex justify-center">
          <Pagination />
        </div>
      </div>
    </>
  )
}
