import { setCurrentPage } from '@/features/todo/todoSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import React from 'react'
import { NextIcon, PreviousIcon } from '../ui/Icon'

type Props = {
  onPageChange: (page: number) => void
}

export default function Pagination({ onPageChange }: Props) {
  const totalPages = useAppSelector((state) => state.todo.totalPages)
  const currentPage = useAppSelector((state) => state.todo.currentPage)
  const dispatch = useAppDispatch()
  const handlePageClick = (page: number) => {
    onPageChange(page)
    dispatch(setCurrentPage(page))
  }

  return (
    <>
      <nav aria-label="Page navigation example">
        <ul className="flex items-center -space-x-px h-8 text-sm">
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                handlePageClick(1)
              }}
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Previous</span>
              <PreviousIcon className="w-2.5 h-2.5 rtl:rotate-180" />
            </a>
          </li>
          {Array.from({ length: totalPages }, (_, i) => (
            <li key={i + 1}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  handlePageClick(i + 1)
                }}
                className={`flex items-center justify-center px-3 h-8 leading-tight border 
                  ${
                    i === currentPage - 1
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white text-gray-500 border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                  }
                `}
              >
                {i + 1}
              </a>
            </li>
          ))}

          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                handlePageClick(totalPages)
              }}
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Next</span>
              <NextIcon className="w-2.5 h-2.5 rtl:rotate-180" />
            </a>
          </li>
        </ul>
      </nav>
    </>
  )
}
