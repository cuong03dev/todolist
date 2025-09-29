import { setCurrentPage } from '@/features/todo/todoSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import React, { useEffect } from 'react'
import { NextIcon, PreviousIcon } from '../ui/Icon'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

type Props = {
  onPageChange: (page: number) => void
}

export default function Pagination({ onPageChange }: Props) {
  const totalPages = useAppSelector((state) => state.todo.totalPages)
  const currentPage = useAppSelector((state) => state.todo.currentPage)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const searchParams = useSearchParams()

  const handlePageClick = (page: number) => {
    onPageChange(page)
    dispatch(setCurrentPage(page))

    const params = new URLSearchParams(searchParams.toString())
    params.set('page', page.toString())
    router.push(`?${params.toString()}`)
  }

  useEffect(() => {
    const pageParam = searchParams.get('page')
    if (pageParam) {
      const page = parseInt(pageParam, 10)
      if (
        !isNaN(page) &&
        page > 0 &&
        page <= totalPages &&
        page !== currentPage
      ) {
        onPageChange(page)
        dispatch(setCurrentPage(page))
      }
    }
  }, [searchParams, onPageChange, dispatch, currentPage, totalPages])

  return (
    <>
      <nav aria-label="Page navigation example">
        <ul className="flex items-center -space-x-px h-8 text-sm">
          <li>
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault()
                if (currentPage > 1) {
                  handlePageClick(currentPage - 1)
                }
              }}
              className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight border border-e-0 border-gray-300 rounded-s-lg ${
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
              }`}
              aria-disabled={currentPage === 1}
            >
              <span className="sr-only">Previous</span>
              <PreviousIcon className="w-2.5 h-2.5 rtl:rotate-180" />
            </Link>
          </li>
          {Array.from({ length: totalPages }, (_, i) => (
            <li key={i + 1}>
              <Link
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
              </Link>
            </li>
          ))}

          <li>
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault()
                if (currentPage < totalPages) {
                  handlePageClick(currentPage + 1)
                }
              }}
              className={`flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 rounded-e-lg ${
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
              }`}
              aria-disabled={currentPage === totalPages}
            >
              <span className="sr-only">Next</span>
              <NextIcon className="w-2.5 h-2.5 rtl:rotate-180" />
            </Link>
          </li>
        </ul>
      </nav>
    </>
  )
}
