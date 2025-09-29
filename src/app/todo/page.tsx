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
import { usePagination } from '@/hooks/usePagination'
import { TodoFormValues } from '@/schemas/todo.schema'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import type { Todo } from '@/types/todo.types'
import { useTranslations } from 'next-intl'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'

export default function Todo() {
  const dispatch = useAppDispatch()
  const {
    value: tasks,
    initialLoading,
    totalPages,
  } = useAppSelector((state) => state.todo)

  const t = useTranslations('Todo')
  const [isOpen, setIsOpen] = useState(false)

  const [filteredTasks, setFilteredTasks] = useState<Todo[]>([])
  const [isFiltered, setIsFiltered] = useState(false)

  useEffect(() => {
    const fetchTasks = async () => {
      await dispatch(getAll())
    }
    fetchTasks()
  }, [dispatch])

  useEffect(() => {
    if (!isFiltered) {
      setFilteredTasks(tasks)
    }
  }, [tasks, isFiltered])

  const pendingTasks = useMemo(
    () => filteredTasks.filter((task) => !task.is_finished),
    [filteredTasks],
  )

  const completedTasks = useMemo(
    () => filteredTasks.filter((task) => task.is_finished),
    [filteredTasks],
  )

  const isEmpty = !initialLoading && pendingTasks.length === 0
  const hasCompletedTasks = completedTasks.length > 0

  const handleClose = () => setIsOpen(!isOpen)

  const handleAdd = async (values: TodoFormValues) => {
    await dispatch(
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

  const handleFilter = (
    filterType: string,
    dateFrom?: string,
    dateTo?: string,
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
    setFilteredTasks(
      tasks.filter((task) =>
        task.title.toLowerCase().includes(value.toLowerCase()),
      ),
    )
  }

  const { currentPage, handlePageClick, isPageLoading } = usePagination({
    totalPages,
  })

  return (
    <>
      <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg pb-6">
        <div className="border border-gray-300 p-6 rounded-lg w-full">
          <div>
            <Modal
              title={t('add_task_placeholder')}
              open={isOpen}
              onClose={handleClose}
            >
              <TodoInput
                mode="add"
                t={t}
                onSubmit={handleAdd}
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
            <Filter onFilterChange={handleFilter} />

            {(initialLoading || isPageLoading) && <Loading />}
            {!isPageLoading && <Tasks tasks={pendingTasks} />}
            {isEmpty && !isPageLoading && (
              <Empty
                icon={<EmptyIcon className="w-10 h-10" />}
                title={t('empty')}
              />
            )}
          </div>
          <div className="mt-10">
            {hasCompletedTasks && (
              <div className="font-bold py-3 text-[20px]">Completed</div>
            )}
            {(initialLoading || isPageLoading) && <Loading />}
            {!initialLoading && !isPageLoading && (
              <Tasks isFinished tasks={completedTasks} />
            )}
          </div>
        </div>
        <div className="mt-5 flex justify-center">
          <Pagination
            onClick={handlePageClick}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>
      </div>
    </>
  )
}
