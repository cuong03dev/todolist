'use client'
import Empty from '@/components/ui-parts/Empty'
import Loading from '@/components/ui-parts/Loading'
import Modal from '@/components/ui-parts/Modal'
import Pagination from '@/components/ui-parts/Pagination'
import Tasks from '@/components/ui-parts/Tasks'
import TodoInput from '@/components/ui-parts/TodoInput'
import TodoToolbar from '@/components/ui-parts/TodoToolbar'
import { EmptyIcon } from '@/components/ui/Icon'
import { addTodo, getAll } from '@/features/todo/todoSlice'
import { usePagination } from '@/hooks/usePagination'
import { TodoFormValues } from '@/schemas/todo.schema'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import type { Todo } from '@/types/todo.types'
import { useTranslations } from 'next-intl'
import { useCallback, useEffect, useMemo, useState } from 'react'
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

  const handleSearch = useCallback(
    (value: string) => {
      if (value) {
        setFilteredTasks(
          tasks.filter((task) =>
            task.title.toLowerCase().includes(value.toLowerCase()),
          ),
        )
      } else {
        setFilteredTasks(tasks)
      }
    },
    [tasks],
  )

  useEffect(() => {
    dispatch(getAll())
  }, [dispatch])

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
    await dispatch(getAll(currentPage))
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
    } else if (filterType === 'all') {
      setFilteredTasks(tasks)
    }
  }

  const handlePageChange = async (page: number) => {
    await dispatch(getAll(page))
  }
  const { currentPage, handlePageClick, isPageLoading } = usePagination({
    totalPages,
    onPageChange: handlePageChange,
    initialPage: 1,
  })

  return (
    <>
      <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg">
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
            <TodoToolbar
              onAddClick={() => setIsOpen(true)}
              onSearch={handleSearch}
              onFilterChange={handleFilter}
            />

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

            {!initialLoading && !isPageLoading && (
              <Tasks isFinished tasks={completedTasks} />
            )}
          </div>
        </div>
        {filteredTasks.length > 0 && totalPages > 1 && (
          <div className="mt-5 flex justify-center pb-6">
            <Pagination
              onClick={handlePageClick}
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </div>
        )}
      </div>
    </>
  )
}
